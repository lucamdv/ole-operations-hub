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
const runAudit_createServerFn_handler = createServerRpc({
  id: "60ed4426eb98aa4a457185d910927603318966809acf3b55378b9b508ccb3ab4",
  name: "runAudit",
  filename: "src/lib/audit.functions.ts"
}, (opts) => runAudit.__executeServer(opts));
const runAudit = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(runAudit_createServerFn_handler, async ({
  data
}) => {
  const {
    runAuditImpl
  } = await import("./audit-run.server-DDaKmDPQ.mjs");
  return runAuditImpl("ole-copilot", data.mode);
});
const getAuditRunStatus_createServerFn_handler = createServerRpc({
  id: "e7614179fefb75acc6a9a34d09d606c56c0257d637803a9b4316261251223f90",
  name: "getAuditRunStatus",
  filename: "src/lib/audit.functions.ts"
}, (opts) => getAuditRunStatus.__executeServer(opts));
const getAuditRunStatus = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(getAuditRunStatus_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const {
    adjustRunCounts,
    buildIgnoreSets
  } = await import("./ignore-filter-DcsZLvOm.mjs");
  const {
    resolutionsAsIgnoreEntries
  } = await import("./resolution-filter-CnX0EhgU.mjs");
  const {
    data: run,
    error
  } = await supabaseAdmin.from("audit_runs").select("id, status, status_geral, error_message, total_processado, aprovados, reprovados").eq("id", data.runId).maybeSingle();
  if (error) throw new Error(error.message);
  if (!run) return null;
  const r = run;
  const [{
    data: ignores
  }, {
    data: resolvidos
  }, {
    data: findings
  }] = await Promise.all([context.supabase.from("audit_ignores").select("apolice, tipo_erro"), context.supabase.from("audit_resolutions").select("apolice, tipo_erro, endosso").is("reopened_at", null), supabaseAdmin.from("audit_findings").select("apolice, tipo_erro, endosso").eq("run_id", r.id)]);
  const sets = buildIgnoreSets([...ignores ?? [], ...resolutionsAsIgnoreEntries(resolvidos ?? [])]);
  const adj = adjustRunCounts(r, sets, findings ?? []);
  return {
    ...r,
    ...adj
  };
});
const getLatestAudit_createServerFn_handler = createServerRpc({
  id: "097ca56136901e7debca9b17b38bbc47d873e47968b5dcccfa2b680fb0efec60",
  name: "getLatestAudit",
  filename: "src/lib/audit.functions.ts"
}, (opts) => getLatestAudit.__executeServer(opts));
const getLatestAudit = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getLatestAudit_createServerFn_handler, async ({
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const {
    adjustRunCounts,
    buildIgnoreSets,
    filterFindings
  } = await import("./ignore-filter-DcsZLvOm.mjs");
  const {
    resolutionsAsIgnoreEntries
  } = await import("./resolution-filter-CnX0EhgU.mjs");
  const {
    data: runs,
    error: runErr
  } = await supabaseAdmin.from("audit_runs").select("*").eq("status", "success").order("created_at", {
    ascending: false
  }).limit(1);
  if (runErr) throw new Error(runErr.message);
  if (!runs || runs.length === 0) return null;
  const run = runs[0];
  const {
    data: findings,
    error: findErr
  } = await supabaseAdmin.from("audit_findings").select("*").eq("run_id", run.id).order("apolice", {
    ascending: true
  });
  if (findErr) throw new Error(findErr.message);
  const {
    data: ignores
  } = await context.supabase.from("audit_ignores").select("apolice, tipo_erro");
  const {
    data: resolvidos
  } = await context.supabase.from("audit_resolutions").select("apolice, tipo_erro, endosso").is("reopened_at", null);
  const sets = buildIgnoreSets([...ignores ?? [], ...resolutionsAsIgnoreEntries(resolvidos ?? [])]);
  const all = findings ?? [];
  const filtered = filterFindings(sets, all);
  const adj = adjustRunCounts(run, sets, all);
  return {
    run: {
      ...run,
      aprovados: adj.aprovados,
      reprovados: adj.reprovados
    },
    findings: filtered
  };
});
const getAuditHistory_createServerFn_handler = createServerRpc({
  id: "e2264778fa5dfb8bf66537c89d22e9033378fe42625743f17b08f1848d61bd43",
  name: "getAuditHistory",
  filename: "src/lib/audit.functions.ts"
}, (opts) => getAuditHistory.__executeServer(opts));
const getAuditHistory = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getAuditHistory_createServerFn_handler, async ({
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const {
    adjustRunCounts,
    buildIgnoreSets
  } = await import("./ignore-filter-DcsZLvOm.mjs");
  const {
    resolutionsAsIgnoreEntries
  } = await import("./resolution-filter-CnX0EhgU.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("audit_runs").select("id, created_at, data_auditoria, status_geral, total_processado, aprovados, reprovados, duration_ms, origem").eq("status", "success").order("created_at", {
    ascending: false
  }).limit(30);
  if (error) throw new Error(error.message);
  const runs = data ?? [];
  if (runs.length === 0) return runs;
  const {
    data: ignores
  } = await context.supabase.from("audit_ignores").select("apolice, tipo_erro");
  const {
    data: resolvidos
  } = await context.supabase.from("audit_resolutions").select("apolice, tipo_erro, endosso").is("reopened_at", null);
  const sets = buildIgnoreSets([...ignores ?? [], ...resolutionsAsIgnoreEntries(resolvidos ?? [])]);
  if (sets.isEmpty) return runs;
  const {
    data: findings
  } = await supabaseAdmin.from("audit_findings").select("run_id, apolice, tipo_erro, endosso").in("run_id", runs.map((r) => r.id));
  const byRun = /* @__PURE__ */ new Map();
  for (const f of findings ?? []) {
    const list = byRun.get(f.run_id) ?? [];
    list.push({
      apolice: f.apolice,
      tipo_erro: f.tipo_erro,
      endosso: f.endosso
    });
    byRun.set(f.run_id, list);
  }
  return runs.map((r) => ({
    ...r,
    ...adjustRunCounts(r, sets, byRun.get(r.id) ?? [])
  }));
});
const getSystemStatus_createServerFn_handler = createServerRpc({
  id: "77a978f9dfdf7346df5d4f12ca8b02bf43c241d4955d569aca6e9e2897f0c25d",
  name: "getSystemStatus",
  filename: "src/lib/audit.functions.ts"
}, (opts) => getSystemStatus.__executeServer(opts));
const getSystemStatus = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getSystemStatus_createServerFn_handler, async ({
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const {
    adjustRunCounts,
    buildIgnoreSets
  } = await import("./ignore-filter-DcsZLvOm.mjs");
  const {
    resolutionsAsIgnoreEntries
  } = await import("./resolution-filter-CnX0EhgU.mjs");
  const [{
    data: lastRun
  }, {
    data: lastSync
  }] = await Promise.all([supabaseAdmin.from("audit_runs").select("id, status, error_message, created_at, aprovados, reprovados, total_processado").order("created_at", {
    ascending: false
  }).limit(1).maybeSingle(), supabaseAdmin.from("policy_sync_runs").select("id, status, created_at").order("created_at", {
    ascending: false
  }).limit(1).maybeSingle().then((r) => r, () => ({
    data: null
  }))]);
  const run = lastRun;
  const sync = lastSync;
  let aprovadosAjustado = run?.aprovados ?? 0;
  if (run && (run.total_processado ?? 0) > 0) {
    const [{
      data: ignores
    }, {
      data: resolvidos
    }, {
      data: findings
    }] = await Promise.all([context.supabase.from("audit_ignores").select("apolice, tipo_erro"), context.supabase.from("audit_resolutions").select("apolice, tipo_erro, endosso").is("reopened_at", null), supabaseAdmin.from("audit_findings").select("apolice, tipo_erro, endosso").eq("run_id", run.id)]);
    const sets = buildIgnoreSets([...ignores ?? [], ...resolutionsAsIgnoreEntries(resolvidos ?? [])]);
    const adj = adjustRunCounts({
      total_processado: run.total_processado ?? 0,
      aprovados: run.aprovados ?? 0,
      reprovados: run.reprovados ?? 0
    }, sets, findings ?? []);
    aprovadosAjustado = adj.aprovados;
  }
  const approvalRate = run && (run.total_processado ?? 0) > 0 ? aprovadosAjustado / run.total_processado * 100 : null;
  let state = "operational";
  if (run?.status === "error" || sync?.status === "error") state = "down";
  else if (run?.status === "running" || approvalRate != null && approvalRate < 95) state = "degraded";
  return {
    state,
    approvalRate,
    lastRunAt: run?.created_at ?? null,
    lastRunStatus: run?.status ?? null,
    lastSyncAt: sync?.created_at ?? null,
    lastSyncStatus: sync?.status ?? null
  };
});
export {
  getAuditHistory_createServerFn_handler,
  getAuditRunStatus_createServerFn_handler,
  getLatestAudit_createServerFn_handler,
  getSystemStatus_createServerFn_handler,
  runAudit_createServerFn_handler
};
