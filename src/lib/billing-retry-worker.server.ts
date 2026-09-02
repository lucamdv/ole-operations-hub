import { ExcelsiorMotorClient } from "@/lib/excelsior/motor-client.server";
import {
  flattenApiItems,
  normalizeBillingResponse,
  planBillingRefresh,
} from "@/lib/excelsior/motor-sync.core";
import {
  completeBillingReconciliation,
  enqueueBillingFallbacks,
  requeueBillingFallback,
  resolveBillingFallback,
} from "@/lib/policy-sync-audit.server";

function messageFrom(error: unknown) {
  return (error instanceof Error ? error.message : String(error)).slice(0, 500);
}

function settledWindow(documentNumber: string) {
  const match = /^__SETTLED_WINDOW__#(\d{4}-\d{2}-\d{2})#(\d{4}-\d{2}-\d{2})$/.exec(documentNumber);
  return match ? { start: match[1]!, end: match[2]! } : null;
}

async function finishRecoveredRuns(runIds: Set<string>) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { markSyncLeg } = await import("@/lib/sync-legs.server");
  for (const runId of runIds) {
    const [{ count, error: countError }, { data: run, error: runError }] = await Promise.all([
      supabaseAdmin
        .from("billing_sync_fallbacks")
        .select("id", { count: "exact", head: true })
        .eq("run_id", runId)
        .neq("status", "resolved"),
      supabaseAdmin
        .from("policy_sync_runs")
        .select("billing_added, billing_updated")
        .eq("id", runId)
        .single(),
    ]);
    if (countError) throw countError;
    if (runError) throw runError;
    if ((count ?? 0) === 0) {
      await markSyncLeg(runId, "cobrancas", {
        status: "success",
        total: (run?.billing_added ?? 0) + (run?.billing_updated ?? 0),
      });
    }
  }
}

/** Processa um lote curto; o cron seguinte continua de onde o lease parou. */
export async function processBillingFallbacks(maxItems = 2) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: claimed, error } = await supabaseAdmin.rpc("claim_billing_sync_fallbacks", {
    max_items: maxItems,
    // Duas consultas podem consumir até 240 s. O lease cobre todo o limite da
    // função para que outro cron não reclame o segundo item ainda em andamento.
    lease_seconds: 300,
  });
  if (error) throw error;
  if (!claimed || claimed.length === 0) return { claimed: 0, resolved: 0, pending: 0 };

  const client = new ExcelsiorMotorClient();
  const touchedRuns = new Set<string>();
  let resolved = 0;
  for (const fallback of claimed) {
    touchedRuns.add(fallback.run_id);
    try {
      const window = settledWindow(fallback.numero_documento);
      let response: unknown;
      let defaultPaymentStatus: "Aberta" | "Total";
      let fallbackDocument: string | undefined;
      let responseForNormalization: unknown;
      if (fallback.numero_documento === "__OPEN_INSTALLMENTS__") {
        response = await client.listOpenBilling();
        defaultPaymentStatus = "Aberta";
        const plan = planBillingRefresh([], response, { items: [] });
        responseForNormalization = { items: plan.directOpenItems };
        await enqueueBillingFallbacks(
          fallback.run_id,
          plan.detailDocuments.map((documentNumber) => ({
            documentNumber,
            message: "A listagem de abertas não trouxe a identidade completa da parcela.",
          })),
        );
      } else if (window) {
        response = await client.listSettledBilling(window.start, window.end);
        defaultPaymentStatus = "Total";
        responseForNormalization = response;
      } else {
        response = await client.getBillingDocument(fallback.numero_documento);
        defaultPaymentStatus = "Aberta";
        fallbackDocument = fallback.numero_documento;
        responseForNormalization = response;
      }

      const updates = normalizeBillingResponse(responseForNormalization, {
        fallbackDocument,
        defaultPaymentStatus,
      });
      if (window && flattenApiItems(response).length > updates.length) {
        throw new Error("A listagem de quitadas contém parcela(s) sem identidade persistível.");
      }
      if (
        !window &&
        fallback.numero_documento !== "__OPEN_INSTALLMENTS__" &&
        updates.length === 0
      ) {
        throw new Error("A Excelsior respondeu sem uma parcela identificável.");
      }
      const { persistBillingSyncPayload } =
        await import("@/routes/api/public/billing-sync-callback");
      await persistBillingSyncPayload(
        fallback.run_id,
        { atualizacoes: updates },
        { finalizeLeg: false },
      );
      if (window) await completeBillingReconciliation(window.start);
      await resolveBillingFallback(fallback.id, fallback.run_id, fallback.numero_documento);
      resolved += 1;
    } catch (workerError) {
      await requeueBillingFallback(fallback.id, fallback.attempts, messageFrom(workerError));
    }
  }

  await finishRecoveredRuns(touchedRuns);
  return { claimed: claimed.length, resolved, pending: claimed.length - resolved };
}
