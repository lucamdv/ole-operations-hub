import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  buildRepasseSeries,
  type MonthlyRepasse,
  type MonthlyRepasseInput,
} from "@/lib/analytics/repasse-rules";
import { derivePaidActivePremiums } from "@/lib/analytics/paid-active";

export interface MonthBucket {
  month: string; // YYYY-MM
  label: string;
  count: number;
}

export interface RevenueBucket {
  month: string;
  label: string;
  usd: number;
  brl: number;
  policies: number;
}

export interface PolicyPremium {
  numero_apolice: string;
  usd: number;
  brl: number;
}

export interface IssuanceBucket {
  month: string;
  label: string;
  apolices: number;
  endossoA: number;
  endossoB: number;
  endossoC: number;
  endossoD: number;
  endossosTotal: number;
  total: number;
}

export type RepasseBucket = MonthlyRepasse;

export interface AnalyticsAggregates {
  findingsByVigencia: MonthBucket[];
  revenueByMonth: RevenueBucket[];
  policyPremiums: PolicyPremium[];
  issuancesByMonth: IssuanceBucket[];
  repasseByMonth: RepasseBucket[];
}

function monthLabel(month: string): string {
  const [y, m] = month.split("-").map(Number);
  if (!y || !m) return month;
  return new Intl.DateTimeFormat("pt-BR", { month: "short", year: "2-digit" })
    .format(new Date(y, m - 1, 1))
    .replace(".", "");
}

function pickMonth(iso: string | null | undefined): string | null {
  if (!iso) return null;
  // aceita "YYYY-MM-DD..." ou ISO completo
  const m = iso.match(/^(\d{4})-(\d{2})/);
  return m ? `${m[1]}-${m[2]}` : null;
}

export const getAnalyticsAggregates = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async (): Promise<AnalyticsAggregates> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // 1) carrega apólices com proposta (precisamos da vigência e do prêmio em USD)
    const { data: policies, error: pErr } = await supabaseAdmin
      .from("policies")
      .select("numero_apolice, proposta");
    if (pErr) throw pErr;

    // mapa apolice -> mês de vigência inicial
    const apoliceMonth = new Map<string, string>();
    for (const p of policies ?? []) {
      const raw =
        typeof p.proposta === "string"
          ? safeJson(p.proposta)
          : ((p.proposta ?? {}) as Record<string, unknown>);
      const proposta = resolveProposta(raw);

      const datas = (proposta.datas ?? {}) as Record<string, unknown>;
      const inicio = typeof datas.inicio_vigencia === "string" ? datas.inicio_vigencia : null;
      const month = pickMonth(inicio);
      if (month) apoliceMonth.set(p.numero_apolice, month);
    }

    // 2) carrega findings da última run de auditoria
    const { data: latestRun, error: rErr } = await supabaseAdmin
      .from("audit_runs")
      .select("id")
      .eq("status", "success")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (rErr) throw rErr;

    const findingMap = new Map<string, number>();
    if (latestRun?.id) {
      const { data: findings, error: fErr } = await supabaseAdmin
        .from("audit_findings")
        .select("apolice")
        .eq("run_id", latestRun.id);
      if (fErr) throw fErr;
      for (const f of findings ?? []) {
        const month = apoliceMonth.get(f.apolice);
        if (!month) continue;
        findingMap.set(month, (findingMap.get(month) ?? 0) + 1);
      }
    }

    const findingsByVigencia: MonthBucket[] = Array.from(findingMap.entries())
      .map(([month, count]) => ({ month, label: monthLabel(month), count }))
      .sort((a, b) => a.month.localeCompare(b.month));

    // 3) emissões por mês (apólices + endossos por tipo)
    const [{ data: emissions, error: eErr }, { data: billing, error: bErr }] = await Promise.all([
      supabaseAdmin.from("endorsements").select("numero_apolice, numero_endosso, proposta"),
      supabaseAdmin
        .from("policy_billing")
        .select(
          "numero_apolice, numero_endosso, numero_parcela, id_parcela_seguradora, numero_proposta, status_pagamento, situacao_emissao, data_quitacao, data_vencimento",
        ),
    ]);
    if (eErr) throw eErr;
    if (bErr) throw bErr;

    const paidActive = derivePaidActivePremiums(billing ?? [], emissions ?? []);
    const revenueByMonth: RevenueBucket[] = Array.from(paidActive.byMonth.entries())
      .map(([month, value]) => ({
        month,
        label: monthLabel(month),
        usd: round2(value.usd),
        brl: round2(value.brl),
        policies: value.policies.size,
      }))
      .sort((a, b) => a.month.localeCompare(b.month));
    const policyPremiums: PolicyPremium[] = Array.from(paidActive.byPolicy.entries())
      .map(([numero_apolice, value]) => ({
        numero_apolice,
        usd: round2(value.usd),
        brl: round2(value.brl),
      }))
      .sort((a, b) => a.numero_apolice.localeCompare(b.numero_apolice));

    const issMap = new Map<string, IssuanceBucket>();
    // Fonte única para toda informação monetária da Analytics: parcelas
    // quitadas em documentos ativos, na competência de emissão do mapa.
    const repasseInputByMonth = new Map<string, MonthlyRepasseInput>(
      Array.from(paidActive.byMonth, ([month, value]) => [
        month,
        {
          premioTotalPago: value.usd,
          premioRetidoCorretores: value.corretagemUsd,
        },
      ]),
    );

    console.info("[analytics][financeiro] base paga e ativa", {
      cobrancasElegiveis: paidActive.eligibleRows,
      parcelasAssociadas: paidActive.matchedRows,
      meses: paidActive.byMonth.size,
    });

    for (const e of emissions ?? []) {
      const raw =
        typeof e.proposta === "string"
          ? safeJson(e.proposta)
          : ((e.proposta ?? {}) as Record<string, unknown>);

      const isApolice = e.numero_endosso === "000000";

      // determinar wrapper de endosso (se houver)
      let endossoKey: "A" | "B" | "C" | "D" | null = null;
      for (const k of ["A", "B", "C", "D"] as const) {
        if (raw[`endosso_${k}`]) {
          endossoKey = k;
          break;
        }
      }

      const month = pickMonth(resolveEmissionDate(raw));
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
        total: 0,
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

    const issuancesByMonth: IssuanceBucket[] = Array.from(issMap.values()).sort((a, b) =>
      a.month.localeCompare(b.month),
    );

    // A série nasce com a operação, não com o primeiro pagamento. Assim meses
    // de competência sem quitação aparecem com prêmio zero e garantia mínima.
    const firstOperationMonth =
      [...issMap.keys(), ...apoliceMonth.values(), ...repasseInputByMonth.keys()].sort()[0] ?? null;
    const repasseByMonth = buildRepasseSeries(repasseInputByMonth, firstOperationMonth);

    return {
      findingsByVigencia,
      revenueByMonth,
      policyPremiums,
      issuancesByMonth,
      repasseByMonth,
    };
  });

function safeJson(s: string): Record<string, unknown> {
  try {
    return JSON.parse(s) as Record<string, unknown>;
  } catch {
    return {};
  }
}

/**
 * O JSON da apólice pode vir no formato "achatado" ({datas, itens, ...}) ou
 * encapsulado em endosso_A / endosso_C → proposta_endosso_X → proposta.
 * Esta função retorna o objeto que efetivamente contém `datas` + `itens`.
 */
function resolveProposta(raw: Record<string, unknown>): Record<string, unknown> {
  if (raw.datas || raw.itens) return raw;
  for (const k of ["endosso_A", "endosso_B", "endosso_C", "endosso_D"]) {
    const wrapper = raw[k] as Record<string, unknown> | undefined;
    if (!wrapper) continue;
    const inner = wrapper[`proposta_${k}`] as Record<string, unknown> | undefined;
    const inside = inner?.proposta as Record<string, unknown> | undefined;
    if (inside && (inside.datas || inside.itens)) return inside;
  }
  return raw;
}

function resolveEmissionDate(raw: Record<string, unknown>): string | null {
  for (const suffix of ["A", "B", "C", "D"] as const) {
    const wrapper = raw[`endosso_${suffix}`] as Record<string, unknown> | undefined;
    if (!wrapper) continue;
    const inner = wrapper[`proposta_endosso_${suffix}`] as Record<string, unknown> | undefined;
    const proposal = (inner?.proposta ?? inner ?? {}) as Record<string, unknown>;
    const dates = (proposal.datas ?? {}) as Record<string, unknown>;
    return (
      (typeof wrapper.data_emissao === "string" && wrapper.data_emissao) ||
      (typeof inner?.data_emissao === "string" && inner.data_emissao) ||
      (typeof dates.assinatura === "string" && dates.assinatura) ||
      (typeof dates.conclusao_subscricao === "string" && dates.conclusao_subscricao) ||
      (typeof dates.registro_origem === "string" && dates.registro_origem) ||
      null
    );
  }

  const proposal = resolveProposta(raw);
  const dates = (proposal.datas ?? {}) as Record<string, unknown>;
  return (
    (typeof raw.data_emissao === "string" && raw.data_emissao) ||
    (typeof dates.assinatura === "string" && dates.assinatura) ||
    (typeof dates.conclusao_subscricao === "string" && dates.conclusao_subscricao) ||
    (typeof dates.registro_origem === "string" && dates.registro_origem) ||
    null
  );
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}
