import { c as createServerRpc } from "./createServerRpc-aKyz3faE.mjs";
import { c as createServerFn } from "./server-BxlZVXOU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BqwiLAOE.mjs";
import { a as assertAdmin } from "./assert-admin-D-zd5zKa.mjs";
import { r as resolveWebhookUrl } from "./webhook-mode-DKZeQYsl.mjs";
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
const getIntegrationsStatus_createServerFn_handler = createServerRpc({
  id: "da34154b13b7c137d141f7e52547e2556db37f5713d1798af26176b7bd79be7c",
  name: "getIntegrationsStatus",
  filename: "src/lib/settings.functions.ts"
}, (opts) => getIntegrationsStatus.__executeServer(opts));
const getIntegrationsStatus = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getIntegrationsStatus_createServerFn_handler, async ({
  context
}) => {
  await assertAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const [{
    data: lastSync
  }, {
    data: lastAudit
  }] = await Promise.all([supabaseAdmin.from("policy_sync_runs").select("status, total_apolices, error_message, created_at, finished_at").order("created_at", {
    ascending: false
  }).limit(1).maybeSingle(), supabaseAdmin.from("audit_runs").select("status, total_processado, error_message, created_at").order("created_at", {
    ascending: false
  }).limit(1).maybeSingle()]);
  const sync = lastSync;
  const audit = lastAudit;
  const {
    getRequestHost,
    getRequestHeader
  } = await import("./server-C0VIuWgh.mjs");
  const host = getRequestHost();
  const proto = getRequestHeader("x-forwarded-proto") || "https";
  const base = process.env.PUBLIC_APP_URL || `${proto}://${host}`;
  return [{
    id: "motor_policies",
    label: "MOTOR OLÉ — API direta da carteira",
    configured: !!(process.env.EXCELSIOR_API_USERNAME?.trim() && process.env.EXCELSIOR_API_PASSWORD),
    lastStatus: sync?.status ?? null,
    lastAt: sync?.finished_at ?? sync?.created_at ?? null,
    lastDetail: sync?.status === "error" ? sync?.error_message : sync ? `${sync.total_apolices ?? 0} apólices` : null
  }, {
    id: "n8n_audit",
    label: "N8N — Motor de Auditoria",
    configured: !!process.env.N8N_AUDIT_WEBHOOK_URL,
    lastStatus: audit?.status ?? null,
    lastAt: audit?.created_at ?? null,
    lastDetail: audit?.status === "error" ? audit?.error_message : audit ? `${audit.total_processado ?? 0} processadas` : null
  }, {
    id: "audit_callback",
    label: "Callback de Auditoria (n8n → OLÉ)",
    configured: !!process.env.AUDIT_CALLBACK_SECRET,
    lastStatus: null,
    lastAt: null,
    lastDetail: process.env.AUDIT_CALLBACK_SECRET ? "Secret configurado" : "Secret AUDIT_CALLBACK_SECRET ausente",
    publicCallback: `${base.replace(/\/$/, "")}/api/public/audit-callback`
  }];
});
async function pingWebhook(url, label) {
  if (!url) return {
    ok: false,
    status: 0,
    message: `${label}: secret não configurada`
  };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ping: true,
        source: "ole-config-test",
        at: (/* @__PURE__ */ new Date()).toISOString()
      }),
      signal: AbortSignal.timeout(8e3)
    });
    return {
      ok: res.ok,
      status: res.status,
      message: res.ok ? `${label}: HTTP ${res.status} — webhook respondeu` : `${label}: HTTP ${res.status}`
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      message: `${label}: ${err instanceof Error ? err.message : "falha de rede"}`
    };
  }
}
const pingMotorPolicies_createServerFn_handler = createServerRpc({
  id: "6f41c041a07731785d21b1c81dfac935e9b11e1e0df74adc32b79919b5f663de",
  name: "pingMotorPolicies",
  filename: "src/lib/settings.functions.ts"
}, (opts) => pingMotorPolicies.__executeServer(opts));
const pingMotorPolicies = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(pingMotorPolicies_createServerFn_handler, async ({
  context
}) => {
  await assertAdmin(context);
  try {
    const {
      ExcelsiorMotorClient
    } = await import("./motor-client.server--eqOBXIb.mjs").then((n) => n.m);
    const result = await new ExcelsiorMotorClient().testConnection();
    return {
      ok: true,
      status: 200,
      message: `MOTOR OLÉ: API autenticada · ${result.records} registro(s) acessível(is)`
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      message: `MOTOR OLÉ: ${error instanceof Error ? error.message : "falha de conexão"}`
    };
  }
});
const pingAuditWebhook_createServerFn_handler = createServerRpc({
  id: "9c7194898cebaccaf9ce235253ef0678b83d5c58566f68d149497c78c6a6046e",
  name: "pingAuditWebhook",
  filename: "src/lib/settings.functions.ts"
}, (opts) => pingAuditWebhook.__executeServer(opts));
const pingAuditWebhook = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(pingAuditWebhook_createServerFn_handler, async ({
  context,
  data
}) => {
  await assertAdmin(context);
  const raw = process.env.N8N_AUDIT_WEBHOOK_URL;
  return pingWebhook(raw ? resolveWebhookUrl(raw, data.mode) : raw, "N8N Auditoria");
});
const getDataCounters_createServerFn_handler = createServerRpc({
  id: "cef162a41e5739c71c20de005aabcff667590e7c4e3c5be965d9fcafe2d68666",
  name: "getDataCounters",
  filename: "src/lib/settings.functions.ts"
}, (opts) => getDataCounters.__executeServer(opts));
const getDataCounters = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getDataCounters_createServerFn_handler, async ({
  context
}) => {
  await assertAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const tables = ["audit_runs", "audit_findings", "policies", "endorsements"];
  const entries = await Promise.all(tables.map(async (t) => {
    const {
      count
    } = await supabaseAdmin.from(t).select("id", {
      count: "exact",
      head: true
    });
    return [t, count ?? 0];
  }));
  return Object.fromEntries(entries);
});
const purgeOldAudits_createServerFn_handler = createServerRpc({
  id: "b2ac59cdd580ee1312afa6dcdfa4882829a8fa68d83dbf2a60c9d0061fca096e",
  name: "purgeOldAudits",
  filename: "src/lib/settings.functions.ts"
}, (opts) => purgeOldAudits.__executeServer(opts));
const purgeOldAudits = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(purgeOldAudits_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const days = data.days ?? 90;
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1e3).toISOString();
  const {
    error,
    count
  } = await supabaseAdmin.from("audit_runs").delete({
    count: "exact"
  }).lt("created_at", cutoff);
  if (error) throw new Error(error.message);
  return {
    ok: true,
    removed: count ?? 0,
    cutoff
  };
});
const exportPoliciesCSV_createServerFn_handler = createServerRpc({
  id: "fb74ba961b323ca5471afae091ef998985698748aaa8fbc42cbe89644a165236",
  name: "exportPoliciesCSV",
  filename: "src/lib/settings.functions.ts"
}, (opts) => exportPoliciesCSV.__executeServer(opts));
const exportPoliciesCSV = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(exportPoliciesCSV_createServerFn_handler, async ({
  context
}) => {
  await assertAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const {
    translateProposta,
    computePremioTotal
  } = await import("./translate-CoDrOLOt.mjs").then((n) => n.a);
  const {
    csvDocument,
    csvNumber,
    csvDate,
    csvDateTime
  } = await import("./csv-BGeHLTQA.mjs");
  const PAGE = 1e3;
  const rows = [];
  for (let from = 0; ; from += PAGE) {
    const {
      data,
      error
    } = await supabaseAdmin.from("policies").select("numero_apolice, numero_endosso_atual, proposta, updated_at").order("numero_apolice", {
      ascending: true
    }).range(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    const batch = data ?? [];
    rows.push(...batch);
    if (batch.length < PAGE) break;
  }
  const endorsementCount = /* @__PURE__ */ new Map();
  const lastEndorsement = /* @__PURE__ */ new Map();
  for (let from = 0; ; from += PAGE) {
    const {
      data,
      error
    } = await supabaseAdmin.from("endorsements").select("numero_apolice, numero_endosso").range(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    const batch = data ?? [];
    for (const e of batch) {
      endorsementCount.set(e.numero_apolice, (endorsementCount.get(e.numero_apolice) ?? 0) + 1);
      const prev = lastEndorsement.get(e.numero_apolice);
      if (!prev || e.numero_endosso > prev) lastEndorsement.set(e.numero_apolice, e.numero_endosso);
    }
    if (batch.length < PAGE) break;
  }
  const header = ["numero_apolice", "endosso_atual", "qtd_endossos", "segurado", "documento_segurado", "corretor", "grupo_susep", "ramo_susep", "tipo_apolice", "inicio_vigencia", "fim_vigencia", "data_assinatura", "premio_total", "moeda", "limite_maximo_apolice", "moeda_limite", "atualizado_em"];
  const out = [header];
  for (const r of rows) {
    const t = translateProposta(r.proposta ?? {});
    const segurado = t.partes.find((p) => p.papel === "SEGURADO");
    const corretor = t.partes.find((p) => p.papel === "CORRETOR");
    const {
      valor,
      moeda
    } = computePremioTotal(r.proposta ?? {});
    out.push([r.numero_apolice, lastEndorsement.get(r.numero_apolice) ?? r.numero_endosso_atual ?? "", endorsementCount.get(r.numero_apolice) ?? 0, segurado?.nome ?? "", segurado?.documentos?.[0]?.valor ?? "", corretor?.nome ?? "", t.dadosGerais.grupoSusep ?? "", t.dadosGerais.ramoSusep ?? "", t.dadosGerais.tipoApolice ?? "", csvDate(t.datas.inicioVigencia), csvDate(t.datas.fimVigencia), csvDate(t.datas.assinatura), csvNumber(valor), moeda, csvNumber(t.limiteApolice?.valor ?? null), t.limiteApolice?.moeda ?? "", csvDateTime(r.updated_at)]);
  }
  return {
    csv: csvDocument(out),
    count: rows.length
  };
});
const exportLatestAuditJSON_createServerFn_handler = createServerRpc({
  id: "73049a84442114f6b14215429cf260e46c9744fb212979cf2b1d77276e2577b0",
  name: "exportLatestAuditJSON",
  filename: "src/lib/settings.functions.ts"
}, (opts) => exportLatestAuditJSON.__executeServer(opts));
const exportLatestAuditJSON = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(exportLatestAuditJSON_createServerFn_handler, async ({
  context
}) => {
  await assertAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const {
    data: runs
  } = await supabaseAdmin.from("audit_runs").select("*").eq("status", "success").order("created_at", {
    ascending: false
  }).limit(1);
  const run = (runs ?? [])[0];
  if (!run) return {
    json: null
  };
  const {
    data: findings
  } = await supabaseAdmin.from("audit_findings").select("*").eq("run_id", run.id);
  return {
    json: JSON.stringify({
      run,
      findings: findings ?? []
    }, null, 2)
  };
});
export {
  exportLatestAuditJSON_createServerFn_handler,
  exportPoliciesCSV_createServerFn_handler,
  getDataCounters_createServerFn_handler,
  getIntegrationsStatus_createServerFn_handler,
  pingAuditWebhook_createServerFn_handler,
  pingMotorPolicies_createServerFn_handler,
  purgeOldAudits_createServerFn_handler
};
