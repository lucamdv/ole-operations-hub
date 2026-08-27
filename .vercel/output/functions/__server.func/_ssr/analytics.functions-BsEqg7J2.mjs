import { c as createServerRpc } from "./createServerRpc-aKyz3faE.mjs";
import { c as createServerFn } from "./server-BxlZVXOU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BqwiLAOE.mjs";
import { c as computeRepasse } from "./repasse-rules-BsXb-PV5.mjs";
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
function monthLabel(month) {
  const [y, m] = month.split("-").map(Number);
  if (!y || !m) return month;
  return new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    year: "2-digit"
  }).format(new Date(y, m - 1, 1)).replace(".", "");
}
function pickMonth(iso) {
  if (!iso) return null;
  const m = iso.match(/^(\d{4})-(\d{2})/);
  return m ? `${m[1]}-${m[2]}` : null;
}
const getAnalyticsAggregates_createServerFn_handler = createServerRpc({
  id: "9b97897620f38b4ad17635d44b21119a7fc775950bfe58519b6d3487f3d2eb5d",
  name: "getAnalyticsAggregates",
  filename: "src/lib/analytics.functions.ts"
}, (opts) => getAnalyticsAggregates.__executeServer(opts));
const getAnalyticsAggregates = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getAnalyticsAggregates_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const {
    data: policies,
    error: pErr
  } = await supabaseAdmin.from("policies").select("numero_apolice, proposta");
  if (pErr) throw pErr;
  const apoliceMonth = /* @__PURE__ */ new Map();
  const revMap = /* @__PURE__ */ new Map();
  const policyPremiums = [];
  for (const p of policies ?? []) {
    const raw = typeof p.proposta === "string" ? safeJson(p.proposta) : p.proposta ?? {};
    const proposta = resolveProposta(raw);
    const datas = proposta.datas ?? {};
    const inicio = typeof datas.inicio_vigencia === "string" ? datas.inicio_vigencia : null;
    const month = pickMonth(inicio);
    if (month) apoliceMonth.set(p.numero_apolice, month);
    let usd = 0;
    let brl = 0;
    const itens = Array.isArray(proposta.itens) ? proposta.itens : [];
    for (const it of itens) {
      const coberturas = Array.isArray(it.coberturas) ? it.coberturas : [];
      for (const cob of coberturas) {
        const comps = Array.isArray(cob.composicao_premio_cobertura) ? cob.composicao_premio_cobertura : [];
        for (const c of comps) {
          if (c.tipo_premio === "DIRETO" && c.natureza_premio === "PREMIO") {
            const vUsd = Number(c.valor_premio) || 0;
            const vBrl = Number(c.valor_premio_brl) || 0;
            usd += vUsd;
            brl += vBrl;
          }
        }
      }
    }
    policyPremiums.push({
      numero_apolice: p.numero_apolice,
      usd: round2(usd),
      brl: round2(brl)
    });
    if (month && (usd > 0 || brl > 0)) {
      const cur = revMap.get(month) ?? {
        usd: 0,
        brl: 0,
        policies: /* @__PURE__ */ new Set()
      };
      cur.usd += usd;
      cur.brl += brl;
      cur.policies.add(p.numero_apolice);
      revMap.set(month, cur);
    }
  }
  const {
    data: latestRun,
    error: rErr
  } = await supabaseAdmin.from("audit_runs").select("id").eq("status", "success").order("created_at", {
    ascending: false
  }).limit(1).maybeSingle();
  if (rErr) throw rErr;
  const findingMap = /* @__PURE__ */ new Map();
  if (latestRun?.id) {
    const {
      data: findings,
      error: fErr
    } = await supabaseAdmin.from("audit_findings").select("apolice").eq("run_id", latestRun.id);
    if (fErr) throw fErr;
    for (const f of findings ?? []) {
      const month = apoliceMonth.get(f.apolice);
      if (!month) continue;
      findingMap.set(month, (findingMap.get(month) ?? 0) + 1);
    }
  }
  const findingsByVigencia = Array.from(findingMap.entries()).map(([month, count]) => ({
    month,
    label: monthLabel(month),
    count
  })).sort((a, b) => a.month.localeCompare(b.month));
  const revenueByMonth = Array.from(revMap.entries()).map(([month, v]) => ({
    month,
    label: monthLabel(month),
    usd: round2(v.usd),
    brl: round2(v.brl),
    policies: v.policies.size
  })).sort((a, b) => a.month.localeCompare(b.month));
  const {
    data: emissions,
    error: eErr
  } = await supabaseAdmin.from("endorsements").select("numero_endosso, proposta");
  if (eErr) throw eErr;
  const issMap = /* @__PURE__ */ new Map();
  const brutoByMonth = /* @__PURE__ */ new Map();
  for (const e of emissions ?? []) {
    const raw = typeof e.proposta === "string" ? safeJson(e.proposta) : e.proposta ?? {};
    const isApolice = e.numero_endosso === "000000";
    let endossoKey = null;
    for (const k of ["A", "B", "C", "D"]) {
      if (raw[`endosso_${k}`]) {
        endossoKey = k;
        break;
      }
    }
    let iso = null;
    if (isApolice) {
      const datas = raw.datas ?? {};
      iso = typeof datas.assinatura === "string" && datas.assinatura || typeof datas.conclusao_subscricao === "string" && datas.conclusao_subscricao || typeof datas.registro_origem === "string" && datas.registro_origem || null;
    } else if (endossoKey) {
      const wrapper = raw[`endosso_${endossoKey}`] ?? {};
      if (typeof wrapper.data_emissao === "string") {
        iso = wrapper.data_emissao;
      } else {
        const inner = wrapper[`proposta_endosso_${endossoKey}`]?.proposta;
        const innerDatas = inner?.datas ?? {};
        iso = typeof innerDatas.assinatura === "string" && innerDatas.assinatura || null;
      }
    }
    const proposta = resolveProposta(raw);
    const pagamento = proposta.pagamento ?? {};
    const parcelas = Array.isArray(pagamento.parcelas) ? pagamento.parcelas : [];
    let pagamentoMatched = false;
    for (const parc of parcelas) {
      const venc = typeof parc.data_vencimento === "string" ? parc.data_vencimento : null;
      const mes = pickMonth(venc) ?? pickMonth(iso);
      if (!mes) continue;
      const comp = Array.isArray(parc.composicao_premio_parcela) ? parc.composicao_premio_parcela : [];
      let valor = 0;
      for (const c of comp) {
        valor += Number(c.valor_premio) || 0;
      }
      if (valor > 0) {
        brutoByMonth.set(mes, (brutoByMonth.get(mes) ?? 0) + valor);
        pagamentoMatched = true;
      }
    }
    if (!pagamentoMatched) {
      const mes = pickMonth(iso);
      if (mes) {
        let valor = 0;
        const itens = Array.isArray(proposta.itens) ? proposta.itens : [];
        for (const it of itens) {
          const cobs = Array.isArray(it.coberturas) ? it.coberturas : [];
          for (const cob of cobs) {
            const comps = Array.isArray(cob.composicao_premio_cobertura) ? cob.composicao_premio_cobertura : [];
            for (const c of comps) {
              valor += Number(c.valor_premio) || 0;
            }
          }
        }
        if (valor > 0) {
          brutoByMonth.set(mes, (brutoByMonth.get(mes) ?? 0) + valor);
        }
      }
    }
    const month = pickMonth(iso);
    if (!month) continue;
    const cur = issMap.get(month) ?? {
      month,
      label: monthLabel(month),
      apolices: 0,
      endossoA: 0,
      endossoB: 0,
      endossoC: 0,
      endossoD: 0,
      endossosTotal: 0,
      total: 0
    };
    if (isApolice) {
      cur.apolices += 1;
    } else if (endossoKey) {
      if (endossoKey === "A") cur.endossoA += 1;
      else if (endossoKey === "B") cur.endossoB += 1;
      else if (endossoKey === "C") cur.endossoC += 1;
      else if (endossoKey === "D") cur.endossoD += 1;
      cur.endossosTotal += 1;
    } else {
      cur.endossosTotal += 1;
    }
    cur.total += 1;
    issMap.set(month, cur);
  }
  const issuancesByMonth = Array.from(issMap.values()).sort((a, b) => a.month.localeCompare(b.month));
  const repasseByMonth = buildRepasseByMonth(brutoByMonth);
  return {
    findingsByVigencia,
    revenueByMonth,
    policyPremiums,
    issuancesByMonth,
    repasseByMonth
  };
});
function safeJson(s) {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
function resolveProposta(raw) {
  if (raw.datas || raw.itens) return raw;
  for (const k of ["endosso_A", "endosso_B", "endosso_C", "endosso_D"]) {
    const wrapper = raw[k];
    if (!wrapper) continue;
    const inner = wrapper[`proposta_${k}`];
    const inside = inner?.proposta;
    if (inside && (inside.datas || inside.itens)) return inside;
  }
  return raw;
}
function round2(n) {
  return Math.round(n * 100) / 100;
}
function buildRepasseByMonth(brutoByMonth) {
  if (brutoByMonth.size === 0) return [];
  const months = Array.from(brutoByMonth.keys()).sort();
  const first = months[0];
  const now = /* @__PURE__ */ new Date();
  const currentMonth = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  const last = currentMonth.localeCompare(months[months.length - 1]) > 0 ? currentMonth : months[months.length - 1];
  const out = [];
  let [y, m] = first.split("-").map(Number);
  const [yLast, mLast] = last.split("-").map(Number);
  while (y < yLast || y === yLast && m <= mLast) {
    const key = `${y}-${String(m).padStart(2, "0")}`;
    const bruto = round2(brutoByMonth.get(key) ?? 0);
    const breakdown = computeRepasse(bruto);
    out.push({
      month: key,
      label: monthLabel(key),
      bruto,
      ...breakdown
    });
    m += 1;
    if (m > 12) {
      m = 1;
      y += 1;
    }
  }
  return out;
}
export {
  getAnalyticsAggregates_createServerFn_handler
};
