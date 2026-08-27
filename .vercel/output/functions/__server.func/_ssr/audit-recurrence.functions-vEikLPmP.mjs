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
const MAX_RUNS = 20;
const getFindingRecurrence_createServerFn_handler = createServerRpc({
  id: "d56309e99e6b4e4046c0dc00d9d1cb97f11bb20a62d93df13efae2405f9f3bc0",
  name: "getFindingRecurrence",
  filename: "src/lib/audit-recurrence.functions.ts"
}, (opts) => getFindingRecurrence.__executeServer(opts));
const getFindingRecurrence = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getFindingRecurrence_createServerFn_handler, async ({
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const {
    data: runRows,
    error: runErr
  } = await supabaseAdmin.from("audit_runs").select("id, created_at").eq("status", "success").order("created_at", {
    ascending: false
  }).limit(MAX_RUNS);
  if (runErr) throw new Error(runErr.message);
  const runs = (runRows ?? []).map((r) => ({
    id: r.id,
    created_at: r.created_at
  }));
  if (runs.length === 0) return {
    runs,
    items: []
  };
  const runIndex = new Map(runs.map((r, i) => [r.id, i]));
  const {
    data: findings,
    error: findErr
  } = await supabaseAdmin.from("audit_findings").select("apolice, tipo_erro, endosso, run_id").in("run_id", runs.map((r) => r.id));
  if (findErr) throw new Error(findErr.message);
  const {
    data: resolutions
  } = await context.supabase.from("audit_resolutions").select("apolice, tipo_erro, endosso, reopened_at");
  const resolvedCount = /* @__PURE__ */ new Map();
  for (const r of resolutions ?? []) {
    const k = `${r.apolice}||${r.tipo_erro}||${(r.endosso ?? "").trim()}`;
    resolvedCount.set(k, (resolvedCount.get(k) ?? 0) + 1);
    const kAny = `${r.apolice}||${r.tipo_erro}||`;
    if (kAny !== k) resolvedCount.set(kAny, (resolvedCount.get(kAny) ?? 0) + 1);
  }
  const map = /* @__PURE__ */ new Map();
  for (const f of findings ?? []) {
    const idx = runIndex.get(f.run_id);
    if (idx === void 0) continue;
    const endosso = (f.endosso ?? "").trim();
    const k = `${f.apolice}||${f.tipo_erro}||${endosso}`;
    const cur = map.get(k);
    if (!cur) {
      map.set(k, {
        apolice: f.apolice,
        tipo_erro: f.tipo_erro,
        endosso,
        runIdx: /* @__PURE__ */ new Set([idx])
      });
    } else {
      cur.runIdx.add(idx);
    }
  }
  const bases = [];
  for (const [key, v] of map) {
    const idxs = [...v.runIdx].sort((a, b) => a - b);
    let streak = 0;
    for (let i = 0; i < idxs.length; i++) {
      if (idxs[i] === i) streak++;
      else break;
    }
    bases.push({
      key,
      apolice: v.apolice,
      tipo_erro: v.tipo_erro,
      endosso: v.endosso,
      idxs,
      streak,
      firstSeenAt: runs[idxs[Math.max(0, streak - 1)]].created_at,
      firstSeenEverAt: runs[idxs[idxs.length - 1]].created_at,
      lastSeenAt: runs[idxs[0]].created_at
    });
  }
  const byPolicyType = /* @__PURE__ */ new Map();
  for (const b of bases) {
    const k = `${b.apolice}||${b.tipo_erro}`;
    const list = byPolicyType.get(k) ?? [];
    list.push(b);
    byPolicyType.set(k, list);
  }
  const items = bases.map((b) => {
    const siblings = (byPolicyType.get(`${b.apolice}||${b.tipo_erro}`) ?? []).filter((s) => s.endosso !== b.endosso);
    const policyHistory = siblings.map((s) => ({
      endosso: s.endosso || "—",
      firstSeenAt: s.firstSeenEverAt,
      lastSeenAt: s.lastSeenAt,
      audits: s.idxs.length
    })).sort((a, b2) => a.firstSeenAt < b2.firstSeenAt ? -1 : 1);
    const resolvedTimes = resolvedCount.get(b.key) ?? resolvedCount.get(`${b.apolice}||${b.tipo_erro}||`) ?? 0;
    return {
      key: b.key,
      apolice: b.apolice,
      tipo_erro: b.tipo_erro,
      endosso: b.endosso,
      runs: b.idxs.map((i) => runs[i].id),
      occurrences: Math.max(1, b.streak),
      totalOccurrences: b.idxs.length,
      streak: b.streak,
      firstSeenAt: b.firstSeenAt,
      firstSeenEverAt: b.firstSeenEverAt,
      lastSeenAt: b.lastSeenAt,
      recorrenteNaApolice: policyHistory.length > 0,
      policyHistory,
      reopened: resolvedTimes > 0,
      resolvedTimes
    };
  });
  return {
    runs,
    items
  };
});
export {
  getFindingRecurrence_createServerFn_handler
};
