import { supabaseAdmin } from "./client.server-BIG6Ien0.mjs";
import { g as getExcelsiorMotorConfig, E as ExcelsiorMotorClient, b as basePolicyNumber, f as flattenApiItems, e as extractBasePolicies, s as selectBillingDocumentsToRefresh, n as normalizeBillingResponse, d as dedupeBillingItems, a as selectMissingEndorsementDocuments, c as normalizeEmissionDocument } from "./motor-client.server--eqOBXIb.mjs";
import { b as getRequest } from "./server-BxlZVXOU.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
class SyncCancelledError extends Error {
  constructor() {
    super("Sincronização cancelada.");
    this.name = "SyncCancelledError";
  }
}
function concurrencyFromEnv(name, fallback) {
  const value = Number.parseInt(process.env[name] ?? "", 10);
  return Number.isFinite(value) && value > 0 ? Math.min(value, 12) : fallback;
}
async function mapWithConcurrency(values, concurrency, mapper) {
  const results = new Array(values.length);
  let cursor = 0;
  let firstError;
  const workers = Array.from(
    { length: Math.min(concurrency, Math.max(values.length, 1)) },
    async () => {
      while (cursor < values.length && !firstError) {
        const index = cursor++;
        try {
          results[index] = await mapper(values[index], index);
        } catch (error) {
          firstError = error;
        }
      }
    }
  );
  await Promise.all(workers);
  if (firstError) throw firstError;
  return results;
}
function lastEndorsementFromContract(contract) {
  return contract.ultimo_endosso ?? contract.numero_ultimo_endosso ?? contract.ultimoEndosso ?? contract.numero_endosso ?? 0;
}
async function isRunCancelled(runId) {
  const { supabaseAdmin: supabaseAdmin2 } = await import("./client.server-BIG6Ien0.mjs");
  const { data, error } = await supabaseAdmin2.from("policy_sync_runs").select("status").eq("id", runId).maybeSingle();
  if (error) throw error;
  return data?.status === "cancelled";
}
async function assertRunActive(runId) {
  if (await isRunCancelled(runId)) throw new SyncCancelledError();
}
async function loadBillingContext(syncStartedAt) {
  const { supabaseAdmin: supabaseAdmin2 } = await import("./client.server-BIG6Ien0.mjs");
  let start = new Date(syncStartedAt.getTime() - 7 * 24 * 60 * 60 * 1e3);
  const { data: previousRun, error: previousRunError } = await supabaseAdmin2.from("policy_sync_runs").select("cobrancas_finished_at").eq("cobrancas_status", "success").not("cobrancas_finished_at", "is", null).order("cobrancas_finished_at", { ascending: false }).limit(1).maybeSingle();
  if (previousRunError) throw previousRunError;
  const previousFinishedAt = previousRun?.cobrancas_finished_at;
  if (previousFinishedAt) {
    const parsed = new Date(previousFinishedAt);
    if (!Number.isNaN(parsed.getTime())) start = parsed;
  }
  const { data: billing, error: billingError } = await supabaseAdmin2.from("policy_billing").select(
    "numero_apolice, numero_endosso, numero_parcela, id_parcela_seguradora, numero_proposta, data_vencimento, status_pagamento, situacao_emissao"
  );
  if (billingError) throw billingError;
  const openInstallments = [];
  for (const row of billing ?? []) {
    const payment = (row.status_pagamento ?? "").trim().toLowerCase();
    const issuance = (row.situacao_emissao ?? "").trim().toLowerCase();
    if (!payment.startsWith("abert") || !issuance.startsWith("ativ")) continue;
    const endorsement = String(row.numero_endosso).replace(/\D/g, "").slice(-6).padStart(6, "0");
    openInstallments.push({
      numero_documento: `${row.numero_apolice.slice(0, -6)}${endorsement}`,
      numero_parcela: row.numero_parcela,
      id_parcela: row.id_parcela_seguradora,
      numero_proposta: row.numero_proposta,
      data_vencimento: row.data_vencimento,
      status_pagamento: row.status_pagamento ?? "Aberta",
      situacao_emissao: row.situacao_emissao ?? "Ativa"
    });
  }
  return {
    window: {
      start: start.toISOString().slice(0, 10),
      end: syncStartedAt.toISOString().slice(0, 10)
    },
    openInstallments
  };
}
async function syncPoliciesAndEndorsements(runId, client) {
  const { supabaseAdmin: supabaseAdmin2 } = await import("./client.server-BIG6Ien0.mjs");
  const { data: storedPolicies, error: storedPoliciesError } = await supabaseAdmin2.from("policies").select("numero_apolice, endorsements(numero_endosso)");
  if (storedPoliciesError) throw storedPoliciesError;
  const storedSequences = /* @__PURE__ */ new Map();
  for (const stored of storedPolicies ?? []) {
    const policyNumber = basePolicyNumber({ numero_apolice: stored.numero_apolice });
    if (!policyNumber) continue;
    storedSequences.set(
      policyNumber,
      new Set((stored.endorsements ?? []).map((item) => item.numero_endosso))
    );
  }
  const response = await client.listPolicies();
  const received = flattenApiItems(response);
  const policiesByNumber = /* @__PURE__ */ new Map();
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
      storedSequences.get(policyNumber) ?? []
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
    dados: groups.flat()
  };
  const { persistPolicySyncPayload } = await import("./router-C--tI9WT.mjs").then((n) => n.a1);
  return persistPolicySyncPayload(runId, payload);
}
async function syncBilling(runId, client, syncStartedAt) {
  const context = await loadBillingContext(syncStartedAt);
  await assertRunActive(runId);
  const openResponse = await client.listOpenBilling();
  const documents = selectBillingDocumentsToRefresh(context.openInstallments, openResponse);
  const billingConcurrency = concurrencyFromEnv("EXCELSIOR_BILLING_CONCURRENCY", 4);
  const individualGroups = await mapWithConcurrency(
    documents,
    billingConcurrency,
    async (documentNumber) => {
      await assertRunActive(runId);
      const response = await client.getBillingDocument(documentNumber);
      return normalizeBillingResponse(response, {
        fallbackDocument: documentNumber,
        defaultPaymentStatus: "Aberta"
      });
    }
  );
  await assertRunActive(runId);
  const settledResponse = await client.listSettledBilling(context.window.start, context.window.end);
  const settled = normalizeBillingResponse(settledResponse, {
    defaultPaymentStatus: "Total"
  });
  const updates = dedupeBillingItems([...individualGroups.flat(), ...settled]);
  await assertRunActive(runId);
  const { persistBillingSyncPayload } = await import("./router-C--tI9WT.mjs").then((n) => n.a0);
  return persistBillingSyncPayload(runId, {
    janela: { inicio: context.window.start, fim: context.window.end },
    atualizacoes: updates
  });
}
function errorMessage(prefix, error) {
  const detail = error instanceof Error ? error.message : String(error);
  return `${prefix}: ${detail}`.slice(0, 500);
}
async function failLeg(runId, leg, prefix, error) {
  if (error instanceof SyncCancelledError || await isRunCancelled(runId)) return;
  const { markSyncLeg } = await import("./sync-legs.server-PAjmTRrt.mjs");
  await markSyncLeg(runId, leg, {
    status: "error",
    total: 0,
    errorMessage: errorMessage(prefix, error)
  });
}
async function executeDirectMotorSync(runId, syncStartedAt) {
  try {
    const client = new ExcelsiorMotorClient();
    await Promise.all([
      syncPoliciesAndEndorsements(runId, client).catch(
        (error) => failLeg(runId, "emissoes", "Emissões", error)
      ),
      syncBilling(runId, client, syncStartedAt).catch(
        (error) => failLeg(runId, "cobrancas", "Cobranças", error)
      )
    ]);
  } catch (error) {
    await Promise.all([
      failLeg(runId, "emissoes", "Emissões", error),
      failLeg(runId, "cobrancas", "Cobranças", error)
    ]);
  }
}
function keepRequestAlive(promise) {
  const request = getRequest();
  request.waitUntil?.(promise);
}
async function runPolicySyncImpl(_webhookMode) {
  const { data: activeRun, error: activeRunError } = await supabaseAdmin.from("policy_sync_runs").select("id").eq("status", "running").order("created_at", { ascending: false }).limit(1).maybeSingle();
  if (activeRunError) throw new Error(activeRunError.message);
  if (activeRun) {
    return {
      runId: activeRun.id,
      status: "running",
      reused: true
    };
  }
  getExcelsiorMotorConfig();
  const syncStartedAt = /* @__PURE__ */ new Date();
  const { data: runRow, error: insertError } = await supabaseAdmin.from("policy_sync_runs").insert({ status: "running" }).select("id").single();
  if (insertError || !runRow) {
    const { data: concurrentRun } = await supabaseAdmin.from("policy_sync_runs").select("id").eq("status", "running").order("created_at", { ascending: false }).limit(1).maybeSingle();
    if (concurrentRun) {
      return {
        runId: concurrentRun.id,
        status: "running",
        reused: true
      };
    }
    throw new Error(`Falha ao criar run: ${insertError?.message ?? "sem id"}`);
  }
  const runId = runRow.id;
  const work = (async () => {
    try {
      await executeDirectMotorSync(runId, syncStartedAt);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const now = (/* @__PURE__ */ new Date()).toISOString();
      await supabaseAdmin.from("policy_sync_runs").update({
        status: "error",
        error_message: `Motor direto: ${message}`.slice(0, 500),
        finished_at: now,
        emissoes_status: "error",
        emissoes_finished_at: now,
        cobrancas_status: "error",
        cobrancas_finished_at: now
      }).eq("id", runId).neq("status", "cancelled");
    }
  })();
  try {
    keepRequestAlive(work);
  } catch {
  }
  return { runId, status: "running", reused: false };
}
export {
  runPolicySyncImpl
};
