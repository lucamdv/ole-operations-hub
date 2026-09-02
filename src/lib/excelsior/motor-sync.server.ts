import { ExcelsiorMotorClient } from "./motor-client.server";
import {
  basePolicyNumber,
  billingSettlementWindow,
  extractBasePolicies,
  flattenApiItems,
  normalizeBillingResponse,
  normalizeEmissionDocument,
  planBillingRefresh,
  selectMissingEndorsementDocuments,
  type JsonRecord,
} from "./motor-sync.core";

class SyncCancelledError extends Error {
  constructor() {
    super("Sincronização cancelada.");
    this.name = "SyncCancelledError";
  }
}

function concurrencyFromEnv(name: string, fallback: number) {
  const value = Number.parseInt(process.env[name] ?? "", 10);
  return Number.isFinite(value) && value > 0 ? Math.min(value, 12) : fallback;
}

async function mapWithConcurrency<T, R>(
  values: T[],
  concurrency: number,
  mapper: (value: T, index: number) => Promise<R>,
) {
  const results = new Array<R>(values.length);
  let cursor = 0;
  let firstError: unknown;

  const workers = Array.from(
    { length: Math.min(concurrency, Math.max(values.length, 1)) },
    async () => {
      while (cursor < values.length && !firstError) {
        const index = cursor++;
        try {
          results[index] = await mapper(values[index]!, index);
        } catch (error) {
          firstError = error;
        }
      }
    },
  );
  await Promise.all(workers);
  if (firstError) throw firstError;
  return results;
}

function lastEndorsementFromContract(contract: JsonRecord) {
  return (
    contract.ultimo_endosso ??
    contract.numero_ultimo_endosso ??
    contract.ultimoEndosso ??
    contract.numero_endosso ??
    0
  );
}

async function isRunCancelled(runId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("policy_sync_runs")
    .select("status")
    .eq("id", runId)
    .maybeSingle();
  if (error) throw error;
  return (data as { status: string } | null)?.status === "cancelled";
}

async function assertRunActive(runId: string) {
  if (await isRunCancelled(runId)) throw new SyncCancelledError();
}

interface BillingContext {
  window: { start: string; end: string };
  valueBackfillDocuments: string[];
  openInstallments: Array<{
    numero_documento: string;
    numero_parcela: string;
    id_parcela: string | null;
    numero_proposta: string | null;
    data_vencimento: string | null;
    status_pagamento: string;
    situacao_emissao: string;
  }>;
}

async function loadBillingContext(syncStartedAt: Date): Promise<BillingContext> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: previousRun, error: previousRunError } = await supabaseAdmin
    .from("policy_sync_runs")
    .select("cobrancas_finished_at")
    .eq("cobrancas_status", "success")
    .not("cobrancas_finished_at", "is", null)
    .order("cobrancas_finished_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (previousRunError) throw previousRunError;
  const previousFinishedAt = (previousRun as { cobrancas_finished_at: string | null } | null)
    ?.cobrancas_finished_at;
  const { data: syncState, error: syncStateError } = await supabaseAdmin
    .from("billing_sync_state")
    .select("reconciliation_start, reconciliation_completed_at")
    .eq("singleton", true)
    .maybeSingle();
  if (syncStateError) throw syncStateError;

  const { data: billing, error: billingError } = await supabaseAdmin
    .from("policy_billing")
    .select(
      "numero_apolice, numero_endosso, numero_parcela, id_parcela_seguradora, numero_proposta, data_vencimento, status_pagamento, situacao_emissao, valor_total",
    );
  if (billingError) throw billingError;

  const openInstallments: BillingContext["openInstallments"] = [];
  const valueBackfillDocuments = new Set<string>();
  for (const row of (billing ?? []) as Array<{
    numero_apolice: string;
    numero_endosso: string;
    numero_parcela: string;
    id_parcela_seguradora: string | null;
    numero_proposta: string | null;
    data_vencimento: string | null;
    status_pagamento: string | null;
    situacao_emissao: string | null;
    valor_total: number | null;
  }>) {
    const payment = (row.status_pagamento ?? "").trim().toLowerCase();
    const endorsement = String(row.numero_endosso).replace(/\D/g, "").slice(-6).padStart(6, "0");
    const document = `${row.numero_apolice.slice(0, -6)}${endorsement}`;
    if (payment.startsWith("total") && row.valor_total == null) {
      valueBackfillDocuments.add(document);
    }
    if (!payment.startsWith("abert")) continue;
    openInstallments.push({
      numero_documento: document,
      numero_parcela: row.numero_parcela,
      id_parcela: row.id_parcela_seguradora,
      numero_proposta: row.numero_proposta,
      data_vencimento: row.data_vencimento,
      status_pagamento: row.status_pagamento ?? "Aberta",
      situacao_emissao: row.situacao_emissao ?? "Ativa",
    });
  }

  const window = billingSettlementWindow(
    syncStartedAt,
    previousFinishedAt ?? null,
    openInstallments.map((item) => item.data_vencimento),
  );
  if (syncState && !syncState.reconciliation_completed_at) {
    window.start = [window.start, syncState.reconciliation_start].sort()[0]!;
  }

  return {
    window,
    valueBackfillDocuments: [...valueBackfillDocuments],
    openInstallments,
  };
}

async function syncPoliciesAndEndorsements(runId: string, client: ExcelsiorMotorClient) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: storedPolicies, error: storedPoliciesError } = await supabaseAdmin
    .from("policies")
    .select("numero_apolice, endorsements(numero_endosso)");
  if (storedPoliciesError) throw storedPoliciesError;

  const storedSequences = new Map<string, Set<string>>();
  for (const stored of (storedPolicies ?? []) as Array<{
    numero_apolice: string;
    endorsements: Array<{ numero_endosso: string }> | null;
  }>) {
    const policyNumber = basePolicyNumber({ numero_apolice: stored.numero_apolice });
    if (!policyNumber) continue;
    storedSequences.set(
      policyNumber,
      new Set((stored.endorsements ?? []).map((item) => item.numero_endosso)),
    );
  }

  const response = await client.listPolicies();
  const received = flattenApiItems(response);
  const policiesByNumber = new Map<string, JsonRecord>();
  for (const policy of extractBasePolicies(response)) {
    const policyNumber = basePolicyNumber(policy);
    if (policyNumber) policiesByNumber.set(policyNumber, policy);
  }
  const policies = [...policiesByNumber.values()];
  if (received.length > 0 && policies.length === 0) {
    throw new Error("Emissões: a API respondeu dados, mas nenhuma apólice base foi reconhecida.");
  }

  const policyConcurrency = concurrencyFromEnv("EXCELSIOR_POLICY_CONCURRENCY", 2);
  const documentConcurrency = concurrencyFromEnv("EXCELSIOR_DOCUMENT_CONCURRENCY", 4);
  const groups = await mapWithConcurrency(policies, policyConcurrency, async (policy) => {
    await assertRunActive(runId);
    const policyNumber = basePolicyNumber(policy);
    if (!policyNumber) throw new Error("Emissões: apólice sem número válido.");

    const contract = await client.getContract(policyNumber);
    const documents = selectMissingEndorsementDocuments(
      policyNumber,
      lastEndorsementFromContract(contract),
      storedSequences.get(policyNumber) ?? [],
    );
    return mapWithConcurrency(documents, documentConcurrency, async (documentNumber) => {
      await assertRunActive(runId);
      const raw = await client.getIssuanceDocument(documentNumber);
      return normalizeEmissionDocument(raw, policyNumber, documentNumber);
    });
  });

  await assertRunActive(runId);
  const updatedPolicies = groups.filter((documents) => documents.length > 0).length;
  const payload = {
    origem: "MOTOR OLÉ — API DIRETA",
    total_apolices: updatedPolicies,
    dados: groups.flat(),
  };
  const { persistPolicySyncPayload } = await import("@/routes/api/public/policy-sync-callback");
  return persistPolicySyncPayload(runId, payload);
}

async function syncBilling(runId: string, client: ExcelsiorMotorClient, syncStartedAt: Date) {
  const billingStartedAt = Date.now();
  const context = await loadBillingContext(syncStartedAt);
  await assertRunActive(runId);
  const { persistBillingSyncPayload } = await import("@/routes/api/public/billing-sync-callback");
  const { enqueueBillingFallbacks } = await import("@/lib/policy-sync-audit.server");
  const failures: Array<{ documentNumber: string; message: string }> = [];
  let persisted = 0;

  // Ordem intencional: primeiro descobrimos e persistimos parcelas novas; só
  // depois consultamos as quitações/renovações. Assim uma quitação sempre vence
  // uma fotografia anterior de parcela aberta.
  let openResponse: unknown = { items: [] };
  let openListSucceeded = false;
  try {
    openResponse = await client.listOpenBilling();
    openListSucceeded = true;
    const openPlan = planBillingRefresh(context.openInstallments, openResponse, { items: [] });
    const directOpen = normalizeBillingResponse(
      { items: openPlan.directOpenItems },
      { defaultPaymentStatus: "Aberta" },
    );
    const result = await persistBillingSyncPayload(
      runId,
      { atualizacoes: directOpen },
      { finalizeLeg: false },
    );
    persisted += Number(result.upserted ?? 0);
  } catch (error) {
    failures.push({
      documentNumber: "__OPEN_INSTALLMENTS__",
      message: errorMessage("Listagem de parcelas abertas", error),
    });
  }
  await assertRunActive(runId);

  let settledResponse: unknown = { items: [] };
  let settledListSucceeded = false;
  try {
    settledResponse = await client.listSettledBilling(context.window.start, context.window.end);
    settledListSucceeded = true;
    const settled = normalizeBillingResponse(settledResponse, {
      defaultPaymentStatus: "Total",
    });
    if (flattenApiItems(settledResponse).length > settled.length) {
      throw new Error("A listagem de quitadas contém parcela(s) sem identidade persistível.");
    }
    const result = await persistBillingSyncPayload(
      runId,
      { atualizacoes: settled },
      { finalizeLeg: false },
    );
    persisted += Number(result.upserted ?? 0);
    const { completeBillingReconciliation } = await import("@/lib/policy-sync-audit.server");
    await completeBillingReconciliation(context.window.start);
  } catch (error) {
    failures.push({
      documentNumber: `__SETTLED_WINDOW__#${context.window.start}#${context.window.end}`,
      message: errorMessage("Listagem de parcelas quitadas", error),
    });
  }
  await assertRunActive(runId);

  const plan = openListSucceeded
    ? planBillingRefresh(
        context.openInstallments,
        openResponse,
        settledListSucceeded ? settledResponse : { items: [] },
      )
    : { directOpenItems: [], detailDocuments: [] };
  const detailDocuments = [
    ...new Set([...plan.detailDocuments, ...context.valueBackfillDocuments]),
  ];

  // O detalhe individual é deliberadamente assíncrono. Uma execução anterior
  // tentou esperar todos os documentos aqui e foi encerrada pela Vercel após
  // 300 s antes de conseguir gravar o fallback. Enfileirar primeiro torna o
  // trabalho recuperável mesmo se a função inicial desaparecer em seguida.
  failures.push(
    ...detailDocuments.map((documentNumber) => ({
      documentNumber,
      message: "Consulta individual transferida para recuperação automática em background.",
    })),
  );
  await enqueueBillingFallbacks(runId, failures);

  if (detailDocuments.length > 0) {
    console.warn(
      "[motor-sync][billing] detalhes individuais enfileirados; dados locais preservados",
      {
        quantidade: failures.length,
        documentos: failures.slice(0, 10).map((failure) => failure.documentNumber),
        erros: failures.slice(0, 3).map((failure) => failure.message),
      },
    );
  }

  console.info("[motor-sync][billing] plano concluído", {
    abertasLocais: context.openInstallments.length,
    abertasEmLote: flattenApiItems(openResponse).length,
    listagemAbertasConcluida: openListSucceeded,
    consultasIndividuais: detailDocuments.length,
    valoresPendentes: context.valueBackfillDocuments.length,
    detalhesEnfileirados: detailDocuments.length,
    listagemQuitadasConcluida: settledListSucceeded,
    atualizacoesPersistidas: persisted,
    duracaoMs: Date.now() - billingStartedAt,
  });

  await assertRunActive(runId);
  const { markSyncLeg } = await import("@/lib/sync-legs.server");
  await markSyncLeg(runId, "cobrancas", {
    status: failures.length > 0 ? "partial" : "success",
    total: persisted,
    errorMessage:
      failures.length > 0
        ? `Cobranças: ${failures.length} consulta(s) em recuperação automática.`
        : undefined,
  });
  return { ok: true, upserted: persisted, fallbacks: failures.length };
}

function errorMessage(prefix: string, error: unknown) {
  const detail = error instanceof Error ? error.message : String(error);
  return `${prefix}: ${detail}`.slice(0, 500);
}

async function failLeg(
  runId: string,
  leg: "emissoes" | "cobrancas",
  prefix: string,
  error: unknown,
) {
  if (error instanceof SyncCancelledError || (await isRunCancelled(runId))) return;
  const { markSyncLeg } = await import("@/lib/sync-legs.server");
  await markSyncLeg(runId, leg, {
    status: "error",
    total: 0,
    errorMessage: errorMessage(prefix, error),
  });
}

/** Executa as duas pernas do MOTOR diretamente no backend, sem n8n ou self-HTTP. */
export async function executeDirectMotorSync(runId: string, syncStartedAt: Date) {
  try {
    const client = new ExcelsiorMotorClient();
    await Promise.all([
      syncPoliciesAndEndorsements(runId, client).catch((error) =>
        failLeg(runId, "emissoes", "Emissões", error),
      ),
      syncBilling(runId, client, syncStartedAt).catch((error) =>
        failLeg(runId, "cobrancas", "Cobranças", error),
      ),
    ]);
  } catch (error) {
    await Promise.all([
      failLeg(runId, "emissoes", "Emissões", error),
      failLeg(runId, "cobrancas", "Cobranças", error),
    ]);
  }
}
