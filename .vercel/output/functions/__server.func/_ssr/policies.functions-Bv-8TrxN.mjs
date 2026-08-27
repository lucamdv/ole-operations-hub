import { c as createServerRpc } from "./createServerRpc-aKyz3faE.mjs";
import { c as createServerFn } from "./server-BxlZVXOU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BqwiLAOE.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const runPolicySync_createServerFn_handler = createServerRpc({
  id: "d24a1a6b7e09d2230a60b2df6c008165f4356d0f35bd1187b69b6f8435c2e078",
  name: "runPolicySync",
  filename: "src/lib/policies.functions.ts"
}, (opts) => runPolicySync.__executeServer(opts));
const runPolicySync = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(runPolicySync_createServerFn_handler, async ({
  data
}) => {
  const {
    runPolicySyncImpl
  } = await import("./policy-sync-runner.server-qrVcf3rg.mjs");
  return runPolicySyncImpl(data.mode);
});
const getPolicySyncStatus_createServerFn_handler = createServerRpc({
  id: "02c3d98da6d80297359f488e59a79764e3d341df6491900d2df0b54828e1ec2c",
  name: "getPolicySyncStatus",
  filename: "src/lib/policies.functions.ts"
}, (opts) => getPolicySyncStatus.__executeServer(opts));
const getPolicySyncStatus = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(getPolicySyncStatus_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const {
    data: row,
    error
  } = await supabaseAdmin.from("policy_sync_runs").select("id, status, total_apolices, error_message, duration_ms, finished_at, emissoes_status, emissoes_finished_at, cobrancas_status, cobrancas_finished_at, cobrancas_total").eq("id", data.runId).maybeSingle();
  if (error) throw new Error(error.message);
  return row;
});
const cancelPolicySync_createServerFn_handler = createServerRpc({
  id: "4d5438db24682c887085adb79ba4662b976890060e2506e2a2df9fb8dc39b5c9",
  name: "cancelPolicySync",
  filename: "src/lib/policies.functions.ts"
}, (opts) => cancelPolicySync.__executeServer(opts));
const cancelPolicySync = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(cancelPolicySync_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const {
    error
  } = await supabaseAdmin.from("policy_sync_runs").update({
    status: "cancelled",
    error_message: "Sincronização cancelada pelo usuário.",
    finished_at: now,
    emissoes_status: "cancelled",
    cobrancas_status: "cancelled",
    emissoes_finished_at: now,
    cobrancas_finished_at: now
  }).eq("id", data.runId).eq("status", "running");
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const getLatestPolicySync_createServerFn_handler = createServerRpc({
  id: "3cf3a8225e68a7cd91e4189257483d894072a472d8d0019b7542475b4926b87d",
  name: "getLatestPolicySync",
  filename: "src/lib/policies.functions.ts"
}, (opts) => getLatestPolicySync.__executeServer(opts));
const getLatestPolicySync = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getLatestPolicySync_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("policy_sync_runs").select("id, status, total_apolices, error_message, duration_ms, finished_at, created_at, emissoes_status, emissoes_finished_at, cobrancas_status, cobrancas_finished_at, cobrancas_total").order("created_at", {
    ascending: false
  }).limit(1).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
});
const getPolicies_createServerFn_handler = createServerRpc({
  id: "1adc1e24bae9e0fed111d42b606bc4eb7d4cfcaffb55df4ebb15e7560bf46198",
  name: "getPolicies",
  filename: "src/lib/policies.functions.ts"
}, (opts) => getPolicies.__executeServer(opts));
const getPolicies = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getPolicies_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const {
    findSeguradoNome,
    computePremioLiquido,
    normalizeEndossoNum
  } = await import("./translate-CoDrOLOt.mjs").then((n) => n.a);
  const {
    data,
    error
  } = await supabaseAdmin.from("policies").select("id, numero_apolice, numero_endosso_atual, premio_liquido, proposta, updated_at, endorsements(numero_endosso, ordem)").order("updated_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return (data ?? []).map((p) => {
    const {
      valor,
      moeda
    } = computePremioLiquido(p.proposta ?? {});
    const endos = p.endorsements ?? [];
    const ultimo = endos.reduce((acc, e) => acc && acc.ordem >= e.ordem ? acc : e, null);
    const ultimoNum = ultimo ? normalizeEndossoNum(ultimo.numero_endosso) : null;
    return {
      id: p.id,
      numero_apolice: p.numero_apolice,
      numero_endosso_atual: ultimoNum ?? p.numero_endosso_atual,
      premio_liquido: valor,
      premio_moeda: moeda,
      endorsements_count: endos.length,
      updated_at: p.updated_at,
      segurado_nome: findSeguradoNome(p.proposta ?? {})
    };
  });
});
const getPolicyByNumero_createServerFn_handler = createServerRpc({
  id: "aed61386c5e36442776a0ae2522751e02dcfc7f66ca220d3ac36f26165ec388f",
  name: "getPolicyByNumero",
  filename: "src/lib/policies.functions.ts"
}, (opts) => getPolicyByNumero.__executeServer(opts));
const getPolicyByNumero = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(getPolicyByNumero_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const {
    data: p,
    error
  } = await supabaseAdmin.from("policies").select("id, numero_apolice, numero_endosso_atual, premio_liquido, proposta, updated_at, last_sync_run_id").eq("numero_apolice", data.numero).maybeSingle();
  if (error) throw new Error(error.message);
  if (!p) return null;
  const row = p;
  const {
    data: endos,
    error: errE
  } = await supabaseAdmin.from("endorsements").select("id, numero_endosso, premio_liquido, ordem, proposta, created_at").eq("policy_id", row.id).order("ordem", {
    ascending: true
  });
  if (errE) throw new Error(errE.message);
  let lastSyncAt = null;
  if (row.last_sync_run_id) {
    const {
      data: run
    } = await supabaseAdmin.from("policy_sync_runs").select("finished_at, created_at").eq("id", row.last_sync_run_id).maybeSingle();
    const r = run;
    lastSyncAt = r?.finished_at ?? r?.created_at ?? null;
  }
  const {
    computePremioLiquido
  } = await import("./translate-CoDrOLOt.mjs").then((n) => n.a);
  const headPL = computePremioLiquido(row.proposta ?? {});
  return {
    id: row.id,
    numero_apolice: row.numero_apolice,
    numero_endosso_atual: row.numero_endosso_atual,
    premio_liquido: headPL.valor,
    premio_moeda: headPL.moeda,
    proposta: row.proposta ?? {},
    updated_at: row.updated_at,
    last_sync_at: lastSyncAt,
    endorsements: (endos ?? []).map((e) => {
      const pl = computePremioLiquido(e.proposta ?? {});
      return {
        id: e.id,
        numero_endosso: e.numero_endosso,
        premio_liquido: pl.valor,
        premio_moeda: pl.moeda,
        ordem: e.ordem,
        proposta: e.proposta ?? {},
        created_at: e.created_at
      };
    })
  };
});
const getEndorsement_createServerFn_handler = createServerRpc({
  id: "028bd1610a9773a0a5256e5aee96ebb394a2cbc5778d95eb56042873b882f4e9",
  name: "getEndorsement",
  filename: "src/lib/policies.functions.ts"
}, (opts) => getEndorsement.__executeServer(opts));
const getEndorsement = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(getEndorsement_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const {
    data: p
  } = await supabaseAdmin.from("policies").select("id, numero_apolice").eq("numero_apolice", data.numero).maybeSingle();
  if (!p) return null;
  const policy = p;
  const {
    data: e,
    error
  } = await supabaseAdmin.from("endorsements").select("id, numero_endosso, premio_liquido, ordem, proposta, created_at").eq("policy_id", policy.id).eq("numero_endosso", data.endosso).maybeSingle();
  if (error) throw new Error(error.message);
  if (!e) return null;
  const row = e;
  const {
    computePremioLiquido
  } = await import("./translate-CoDrOLOt.mjs").then((n) => n.a);
  const pl = computePremioLiquido(row.proposta ?? {});
  return {
    numero_apolice: policy.numero_apolice,
    id: row.id,
    numero_endosso: row.numero_endosso,
    premio_liquido: pl.valor,
    premio_moeda: pl.moeda,
    ordem: row.ordem,
    proposta: row.proposta ?? {},
    created_at: row.created_at
  };
});
export {
  cancelPolicySync_createServerFn_handler,
  getEndorsement_createServerFn_handler,
  getLatestPolicySync_createServerFn_handler,
  getPolicies_createServerFn_handler,
  getPolicyByNumero_createServerFn_handler,
  getPolicySyncStatus_createServerFn_handler,
  runPolicySync_createServerFn_handler
};
