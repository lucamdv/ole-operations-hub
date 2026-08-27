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
const CRITICAL_TIPOS = ["gap_vigencia", "gap_de_vigencia", "duplicidade", "duplicado", "sobreposicao", "sobreposição", "vigencia_invalida"];
const getNotifications_createServerFn_handler = createServerRpc({
  id: "c0aad9f33018b8faf6632300a6819e56cab5d97dccf9d8d06ce4d7db41fcaec8",
  name: "getNotifications",
  filename: "src/lib/notifications.functions.ts"
}, (opts) => getNotifications.__executeServer(opts));
const getNotifications = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(getNotifications_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1e3).toISOString();
  const out = [];
  const {
    buildIgnoreSets,
    filterFindings,
    adjustRunCounts
  } = await import("./ignore-filter-DcsZLvOm.mjs");
  const {
    data: ignoreRows
  } = await supabaseAdmin.from("audit_ignores").select("apolice, tipo_erro");
  const ignoreSets = buildIgnoreSets(ignoreRows ?? []);
  const {
    data: runs
  } = await supabaseAdmin.from("audit_runs").select("id, status, error_message, total_processado, aprovados, reprovados, created_at").gte("created_at", since).in("status", ["success", "error"]).order("created_at", {
    ascending: false
  }).limit(30);
  const successRunIds = (runs ?? []).filter((r) => r.status === "success").map((r) => r.id);
  let allFindings = [];
  if (successRunIds.length > 0) {
    const {
      data: fr
    } = await supabaseAdmin.from("audit_findings").select("id, apolice, tipo_erro, endosso, created_at, run_id").in("run_id", successRunIds);
    allFindings = fr ?? [];
  }
  const byRun = /* @__PURE__ */ new Map();
  for (const f of allFindings) {
    const list = byRun.get(f.run_id) ?? [];
    list.push(f);
    byRun.set(f.run_id, list);
  }
  for (const r of runs ?? []) {
    if (r.status === "error") {
      out.push({
        id: `audit:${r.id}`,
        kind: "auditoria_erro",
        severity: "critical",
        text: `Falha na auditoria — ${(r.error_message ?? "erro desconhecido").slice(0, 140)}`,
        createdAt: r.created_at
      });
    } else {
      const adjusted = adjustRunCounts({
        total_processado: r.total_processado ?? 0,
        aprovados: r.aprovados ?? 0,
        reprovados: r.reprovados ?? 0
      }, ignoreSets, byRun.get(r.id) ?? []);
      const reprov = adjusted.reprovados;
      const total = adjusted.total_processado;
      out.push({
        id: `audit:${r.id}`,
        kind: "auditoria_concluida",
        severity: reprov > 0 ? "high" : "low",
        text: reprov === 0 ? `Auditoria concluída — ${total} apólices em conformidade` : `Auditoria concluída — ${reprov} de ${total} com inconsistências`,
        createdAt: r.created_at
      });
    }
  }
  const {
    data: syncs
  } = await supabaseAdmin.from("policy_sync_runs").select("id, status, total_apolices, error_message, created_at, finished_at").gte("created_at", since).in("status", ["success", "error"]).order("created_at", {
    ascending: false
  }).limit(20);
  for (const s of syncs ?? []) {
    if (s.status === "error") {
      out.push({
        id: `sync:${s.id}`,
        kind: "sync_carteira",
        severity: "critical",
        text: `Falha na sincronização da carteira — ${(s.error_message ?? "erro").slice(0, 140)}`,
        createdAt: s.finished_at ?? s.created_at
      });
    } else {
      out.push({
        id: `sync:${s.id}`,
        kind: "sync_carteira",
        severity: "info",
        text: `Carteira sincronizada — ${s.total_apolices ?? 0} apólices`,
        createdAt: s.finished_at ?? s.created_at
      });
    }
  }
  const recentRunIds = new Set(successRunIds.slice(0, 3));
  const criticalFindings = filterFindings(ignoreSets, allFindings.filter((f) => recentRunIds.has(f.run_id))).filter((f) => {
    const tipo = (f.tipo_erro ?? "").toLowerCase();
    return CRITICAL_TIPOS.some((t) => tipo.includes(t));
  }).sort((a, b) => a.created_at < b.created_at ? 1 : -1).slice(0, 40);
  for (const f of criticalFindings) {
    out.push({
      id: `finding:${f.id}`,
      kind: "achados_criticos",
      severity: "high",
      text: `Achado crítico em ${f.apolice}${f.endosso ? ` (end. ${f.endosso})` : ""} — ${f.tipo_erro}`,
      createdAt: f.created_at,
      link: `/apolices/${encodeURIComponent(f.apolice)}`
    });
  }
  if (data.lastSeenAt) {
    const {
      count
    } = await supabaseAdmin.from("policies").select("id", {
      count: "exact",
      head: true
    }).gt("updated_at", data.lastSeenAt);
    if ((count ?? 0) > 0) {
      out.push({
        id: `policies_updated:${data.lastSeenAt}`,
        kind: "apolices_atualizadas",
        severity: "info",
        text: `${count} apólice${(count ?? 0) > 1 ? "s" : ""} atualizada${(count ?? 0) > 1 ? "s" : ""} desde sua última visita`,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        link: "/apolices"
      });
    }
  }
  out.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);
  return out.slice(0, 50);
});
export {
  getNotifications_createServerFn_handler
};
