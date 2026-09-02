import type { Json, TablesInsert } from "@/integrations/supabase/types";

export type SyncChange = Omit<TablesInsert<"policy_sync_changes">, "run_id">;

export async function recordSyncChanges(runId: string, changes: SyncChange[]) {
  if (changes.length === 0) return;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  for (let index = 0; index < changes.length; index += 500) {
    const rows = changes.slice(index, index + 500).map((change) => ({
      ...change,
      run_id: runId,
    }));
    const { error } = await supabaseAdmin.from("policy_sync_changes").insert(rows);
    if (error) throw error;
  }
}

export async function refreshSyncRunCounters(runId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const [{ data: changes, error: changesError }, { data: fallbacks, error: fallbackError }] =
    await Promise.all([
      supabaseAdmin.from("policy_sync_changes").select("leg, action").eq("run_id", runId),
      supabaseAdmin.from("billing_sync_fallbacks").select("status").eq("run_id", runId),
    ]);
  if (changesError) throw changesError;
  if (fallbackError) throw fallbackError;

  const count = (leg: string, action: string) =>
    (changes ?? []).filter((item) => item.leg === leg && item.action === action).length;
  const fallbackRows = fallbacks ?? [];
  const { error } = await supabaseAdmin
    .from("policy_sync_runs")
    .update({
      emissions_added: count("emissoes", "adicionado"),
      emissions_updated: count("emissoes", "atualizado"),
      billing_added: count("cobrancas", "adicionado"),
      billing_updated: count("cobrancas", "atualizado"),
      billing_fallback_total: fallbackRows.length,
      billing_fallback_resolved: fallbackRows.filter((item) => item.status === "resolved").length,
    })
    .eq("id", runId);
  if (error) throw error;
}

export async function enqueueBillingFallbacks(
  runId: string,
  failures: Array<{ documentNumber: string; message: string }>,
) {
  if (failures.length === 0) return;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const now = new Date().toISOString();
  const rows = failures.map((failure) => ({
    run_id: runId,
    numero_documento: failure.documentNumber,
    status: "pending",
    last_error: failure.message.slice(0, 500),
    next_retry_at: now,
    lease_expires_at: null,
  }));
  const { error } = await supabaseAdmin.from("billing_sync_fallbacks").upsert(rows, {
    onConflict: "run_id,numero_documento",
  });
  if (error) throw error;

  await recordSyncChanges(
    runId,
    failures.map((failure) => ({
      leg: "cobrancas",
      entity_type: "fallback",
      action: "fallback",
      numero_documento: failure.documentNumber,
      details: failure.message.slice(0, 500),
      after_data: { status: "pending" } satisfies Json,
    })),
  );
  await refreshSyncRunCounters(runId);
}

export async function resolveBillingFallback(
  fallbackId: string,
  runId: string,
  documentNumber: string,
) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const now = new Date().toISOString();
  const { error } = await supabaseAdmin
    .from("billing_sync_fallbacks")
    .update({
      status: "resolved",
      resolved_at: now,
      lease_expires_at: null,
      last_error: null,
    })
    .eq("id", fallbackId);
  if (error) throw error;
  await recordSyncChanges(runId, [
    {
      leg: "cobrancas",
      entity_type: "fallback",
      action: "recuperado",
      numero_documento: documentNumber,
      details: "A Excelsior respondeu e a parcela foi atualizada em background.",
      after_data: { status: "resolved" } satisfies Json,
    },
  ]);
  await refreshSyncRunCounters(runId);
}

export async function requeueBillingFallback(
  fallbackId: string,
  attempts: number,
  errorMessage: string,
) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const delayMinutes = Math.min(30, Math.max(1, 2 ** Math.min(attempts - 1, 5)));
  const nextRetryAt = new Date(Date.now() + delayMinutes * 60_000).toISOString();
  const { error } = await supabaseAdmin
    .from("billing_sync_fallbacks")
    .update({
      status: "pending",
      last_error: errorMessage.slice(0, 500),
      next_retry_at: nextRetryAt,
      lease_expires_at: null,
    })
    .eq("id", fallbackId);
  if (error) throw error;
}

export async function completeBillingReconciliation(windowStart: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin
    .from("billing_sync_state")
    .update({ reconciliation_completed_at: new Date().toISOString() })
    .eq("singleton", true)
    .is("reconciliation_completed_at", null)
    .gte("reconciliation_start", windowStart);
  if (error) throw error;
}
