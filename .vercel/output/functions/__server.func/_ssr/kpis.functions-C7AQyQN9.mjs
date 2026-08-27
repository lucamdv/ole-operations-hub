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
const getOperationKpis_createServerFn_handler = createServerRpc({
  id: "b045d17174f00cbdc7ede0531012d8f28adc5b6e81de952b6de2491814d84db4",
  name: "getOperationKpis",
  filename: "src/lib/kpis.functions.ts"
}, (opts) => getOperationKpis.__executeServer(opts));
const getOperationKpis = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getOperationKpis_createServerFn_handler, async ({
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const {
    buildIgnoreSets,
    filterFindings
  } = await import("./ignore-filter-DcsZLvOm.mjs");
  const {
    deriveResolutionTimes,
    resolutionsAsIgnoreEntries
  } = await import("./resolution-filter-CnX0EhgU.mjs");
  const {
    deriveDaily,
    deriveMonthlyReincidencia,
    deriveWeekly,
    findingKey,
    isCritical
  } = await import("./derive-DGSsM_A8.mjs");
  const {
    isActive,
    policyFacts
  } = await import("./policy-facts-tR1iIyfT.mjs");
  const {
    data: runRows,
    error: runErr
  } = await supabaseAdmin.from("audit_runs").select("id, created_at, data_auditoria").eq("status", "success").order("created_at", {
    ascending: false
  }).limit(60);
  if (runErr) throw new Error(runErr.message);
  const runsAsc = (runRows ?? []).map((r) => ({
    id: r.id,
    at: r.data_auditoria ?? r.created_at
  })).sort((a, b) => +new Date(a.at) - +new Date(b.at));
  const byRun = /* @__PURE__ */ new Map();
  if (runsAsc.length > 0) {
    const [{
      data: ignores
    }, {
      data: resolvidosAtivos
    }, {
      data: findings
    }] = await Promise.all([context.supabase.from("audit_ignores").select("apolice, tipo_erro"), context.supabase.from("audit_resolutions").select("apolice, tipo_erro, endosso").is("reopened_at", null), supabaseAdmin.from("audit_findings").select("run_id, apolice, tipo_erro, endosso, detalhes").in("run_id", runsAsc.map((r) => r.id))]);
    const sets = buildIgnoreSets([...ignores ?? [], ...resolutionsAsIgnoreEntries(resolvidosAtivos ?? [])]);
    const all = findings ?? [];
    for (const f of filterFindings(sets, all)) {
      const nivelRaw = (f.detalhes ?? {})["nivel"];
      const lite = {
        run_id: f.run_id,
        apolice: f.apolice,
        tipo_erro: f.tipo_erro,
        nivel: typeof nivelRaw === "string" ? nivelRaw : null
      };
      const list = byRun.get(f.run_id) ?? [];
      list.push(lite);
      byRun.set(f.run_id, list);
    }
  }
  const {
    data: resolucoes
  } = await context.supabase.from("audit_resolutions").select("apolice, tipo_erro, first_seen_at, resolved_at, reopened_at, origem").order("resolved_at", {
    ascending: false
  }).limit(2e3);
  const resolucoesRows = resolucoes ?? [];
  const resolutionTime = deriveResolutionTimes(resolucoesRows);
  const daily = deriveDaily(runsAsc, byRun);
  const prevRunAt = runsAsc.length > 1 ? runsAsc[runsAsc.length - 2].at : null;
  const desde = prevRunAt ? +new Date(prevRunAt) : Date.now() - 864e5;
  const doCiclo = resolucoesRows.filter((r) => !r.reopened_at && +new Date(r.resolved_at) >= desde);
  const resolvidasAuto = doCiclo.filter((r) => r.origem === "auto").length;
  const resolvidasManuais = doCiclo.length - resolvidasAuto;
  daily.resolvidas = resolvidasManuais + resolvidasAuto;
  const weekly = deriveWeekly(runsAsc, byRun, 7);
  const monthlyReincidencia = deriveMonthlyReincidencia(runsAsc, byRun);
  const {
    emptyYear,
    withinYtd,
    ytdCutoff
  } = await import("./derive-DGSsM_A8.mjs");
  const {
    issuanceFacts
  } = await import("./policy-facts-tR1iIyfT.mjs");
  const cutoff = ytdCutoff();
  const nowYear = (/* @__PURE__ */ new Date()).getUTCFullYear();
  const yearMap = /* @__PURE__ */ new Map();
  const yearOf = (date) => Number(date.slice(0, 4)) || null;
  const bucket = (year) => {
    const cur = yearMap.get(year) ?? emptyYear(year);
    yearMap.set(year, cur);
    return cur;
  };
  bucket(nowYear);
  bucket(nowYear - 1);
  const {
    data: policies,
    error: pErr
  } = await supabaseAdmin.from("policies").select("numero_apolice, proposta");
  if (pErr) throw new Error(pErr.message);
  let contratosAtivos = 0;
  const rows = policies ?? [];
  for (const p of rows) {
    const facts = policyFacts(p.proposta);
    if (isActive(facts)) contratosAtivos++;
    if (!facts.emissao) continue;
    const year = yearOf(facts.emissao);
    if (!year) continue;
    const cur = bucket(year);
    cur.contratos += 1;
    cur.premioDiretoUsd += facts.premioUsd;
    if (withinYtd(facts.emissao, cutoff)) {
      cur.contratosYtd += 1;
      cur.premioDiretoYtdUsd += facts.premioUsd;
    }
  }
  const {
    data: emissions,
    error: emErr
  } = await supabaseAdmin.from("endorsements").select("numero_endosso, proposta");
  if (emErr) throw new Error(emErr.message);
  for (const e of emissions ?? []) {
    const facts = issuanceFacts(e.proposta);
    const addPremio = (date, valor) => {
      if (!date || valor <= 0) return;
      const year = yearOf(date);
      if (!year) return;
      const cur = bucket(year);
      cur.premioEmitidoUsd += valor;
      if (withinYtd(date, cutoff)) cur.premioEmitidoYtdUsd += valor;
    };
    if (facts.parcelas.length > 0) {
      for (const parc of facts.parcelas) addPremio(parc.data ?? facts.emissao, parc.valor);
    } else {
      addPremio(facts.emissao, facts.premioTotalCoberturas);
    }
  }
  const criticosPorAno = /* @__PURE__ */ new Map();
  for (const r of runsAsc) {
    const date = r.at.slice(0, 10);
    const year = yearOf(date);
    if (!year) continue;
    const sets = criticosPorAno.get(year) ?? {
      all: /* @__PURE__ */ new Set(),
      ytd: /* @__PURE__ */ new Set()
    };
    for (const f of byRun.get(r.id) ?? []) {
      if (!isCritical(f)) continue;
      const key = findingKey(f);
      sets.all.add(key);
      if (withinYtd(date, cutoff)) sets.ytd.add(key);
    }
    criticosPorAno.set(year, sets);
  }
  for (const [year, sets] of criticosPorAno) {
    const cur = bucket(year);
    cur.criticos = sets.all.size;
    cur.criticosYtd = sets.ytd.size;
  }
  const round2 = (n) => Math.round(n * 100) / 100;
  const yearly = Array.from(yearMap.values()).map((y) => ({
    ...y,
    premioEmitidoUsd: round2(y.premioEmitidoUsd),
    premioEmitidoYtdUsd: round2(y.premioEmitidoYtdUsd),
    premioDiretoUsd: round2(y.premioDiretoUsd),
    premioDiretoYtdUsd: round2(y.premioDiretoYtdUsd)
  })).sort((a, b) => a.year - b.year);
  return {
    daily,
    weekly,
    monthlyReincidencia,
    contratosAtivos,
    carteiraTotal: rows.length,
    yearly,
    yearCur: yearly.find((y) => y.year === nowYear) ?? emptyYear(nowYear),
    yearPrev: yearly.find((y) => y.year === nowYear - 1) ?? emptyYear(nowYear - 1),
    ytdLabel: cutoff.split("-").reverse().join("/"),
    resolutionTime,
    resolvidasManuais,
    resolvidasAuto
  };
});
export {
  getOperationKpis_createServerFn_handler
};
