import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  buildRepasseSeries,
  type MonthlyRepasse,
  type MonthlyRepasseInput,
} from "@/lib/analytics/repasse-rules";
import { derivePaidActivePremiums } from "@/lib/analytics/paid-active";
import {
  classifyAEndorsements,
  deriveFinancialHealth,
  derivePortfolioAnalytics,
  type BillingHealthRow,
  type CorrectionPolicyBucket,
  type CoveragePremiumPoint,
  type FinancialHealth,
  type PolicyAgePoint,
  type PortfolioPolicyInput,
  type PortfolioState,
  type PortfolioStatusSummary,
} from "@/lib/analytics/dashboard-core";
import { dedupeBillingRecords, type BillingRecord } from "@/lib/billing/status";
import { translateProposta } from "@/lib/excelsior/translate";
import { derivePolicyStatus, type PolicyEndorsementSignal } from "@/lib/policies/status";

export interface IssuanceBucket {
  month: string;
  label: string;
  apolices: number;
  endossoAFatura: number;
  endossoACorrecao: number;
  endossoC: number;
  total: number;
}

export type RepasseBucket = MonthlyRepasse;

export interface AnalyticsAggregates {
  issuancesByMonth: IssuanceBucket[];
  correctionsByPolicy: CorrectionPolicyBucket[];
  financialHealth: FinancialHealth;
  repasseByMonth: RepasseBucket[];
  portfolioStatus: PortfolioStatusSummary;
  policyAges: PolicyAgePoint[];
  coveragePremiums: CoveragePremiumPoint[];
}

interface PolicyRow {
  id: string;
  numero_apolice: string;
  proposta: unknown;
}

interface EndorsementRow {
  id: string;
  numero_apolice: string;
  numero_endosso: string;
  proposta: unknown;
  created_at: string;
}

interface BillingRow extends BillingRecord, BillingHealthRow {
  id: string;
  valor_total: number | string | null;
  updated_at: string | null;
}

const AnalyticsInputSchema = z.object({
  delinquencyDays: z.number().int().min(1).max(365).default(10),
});

const PAGE_SIZE = 1_000;

async function readAllPages<T>(
  load: (
    from: number,
    to: number,
  ) => PromiseLike<{
    data: T[] | null;
    error: { message: string } | null;
  }>,
): Promise<T[]> {
  const rows: T[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await load(from, from + PAGE_SIZE - 1);
    if (error) throw new Error(error.message);
    rows.push(...(data ?? []));
    if ((data?.length ?? 0) < PAGE_SIZE) return rows;
  }
}

function monthLabel(month: string): string {
  const [year, monthNumber] = month.split("-").map(Number);
  if (!year || !monthNumber) return month;
  return new Intl.DateTimeFormat("pt-BR", { month: "short", year: "2-digit" })
    .format(new Date(year, monthNumber - 1, 1))
    .replace(".", "");
}

function pickMonth(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const match = iso.match(/^(\d{4})-(\d{2})/);
  return match ? `${match[1]}-${match[2]}` : null;
}

function monthSequence(start: string, end: string) {
  const [startYear, startMonth] = start.split("-").map(Number);
  const [endYear, endMonth] = end.split("-").map(Number);
  const cursor = new Date(Date.UTC(startYear!, startMonth! - 1, 1));
  const limit = new Date(Date.UTC(endYear!, endMonth! - 1, 1));
  const months: string[] = [];
  while (cursor <= limit) {
    months.push(`${cursor.getUTCFullYear()}-${String(cursor.getUTCMonth() + 1).padStart(2, "0")}`);
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }
  return months;
}

function currentFortalezaDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Fortaleza",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function normalizedText(value: unknown) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toUpperCase();
}

function portfolioState(status: ReturnType<typeof derivePolicyStatus>["status"]): PortfolioState {
  if (status === "CANCELADA") return "CANCELADA";
  if (status === "SUSPENSA") return "SUSPENSA";
  return "ATIVA";
}

export const getAnalyticsAggregates = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((value: z.infer<typeof AnalyticsInputSchema>) => AnalyticsInputSchema.parse(value))
  .handler(async ({ data }): Promise<AnalyticsAggregates> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const [policies, emissions, billing] = await Promise.all([
      readAllPages<PolicyRow>((from, to) =>
        supabaseAdmin
          .from("policies")
          .select("id, numero_apolice, proposta")
          .order("id", { ascending: true })
          .range(from, to),
      ),
      readAllPages<EndorsementRow>((from, to) =>
        supabaseAdmin
          .from("endorsements")
          .select("id, numero_apolice, numero_endosso, proposta, created_at")
          .order("id", { ascending: true })
          .range(from, to),
      ),
      readAllPages<BillingRow>((from, to) =>
        supabaseAdmin
          .from("policy_billing")
          .select(
            "id, numero_apolice, numero_endosso, numero_parcela, id_parcela_seguradora, numero_proposta, status_pagamento, situacao_emissao, data_quitacao, data_vencimento, valor_total, updated_at",
          )
          .order("id", { ascending: true })
          .range(from, to),
      ),
    ]);

    const policyNumbers = policies.map((policy) => policy.numero_apolice);
    const startMonthByPolicy = new Map<string, string>();
    for (const policy of policies) {
      const proposal = resolveProposta(recordFrom(policy.proposta));
      const dates = recordFrom(proposal.datas);
      const startMonth = pickMonth(
        typeof dates.inicio_vigencia === "string" ? dates.inicio_vigencia : null,
      );
      if (startMonth) startMonthByPolicy.set(policy.numero_apolice, startMonth);
    }

    const normalizedEmissions = emissions.map((emission) => {
      const raw = recordFrom(emission.proposta);
      return {
        ...emission,
        month: pickMonth(resolveEmissionDate(raw) ?? emission.created_at),
        type: resolveEndorsementType(raw),
        isPolicy: Number.parseInt(emission.numero_endosso.replace(/\D/g, ""), 10) === 0,
      };
    });

    const classifiedA = classifyAEndorsements(
      policyNumbers,
      startMonthByPolicy,
      normalizedEmissions
        .filter(
          (emission): emission is typeof emission & { month: string } =>
            !emission.isPolicy && emission.type === "A" && emission.month !== null,
        )
        .map((emission) => ({
          id: emission.id,
          numeroApolice: emission.numero_apolice,
          month: emission.month,
          sequence: emission.numero_endosso,
        })),
    );
    const aClassification = new Map(
      classifiedA.classified.map((endorsement) => [endorsement.id, endorsement.classification]),
    );

    const issuanceMap = new Map<string, IssuanceBucket>();
    const policyBaseSeen = new Set<string>();
    const bucket = (month: string) => {
      const current = issuanceMap.get(month) ?? {
        month,
        label: monthLabel(month),
        apolices: 0,
        endossoAFatura: 0,
        endossoACorrecao: 0,
        endossoC: 0,
        total: 0,
      };
      issuanceMap.set(month, current);
      return current;
    };

    for (const emission of normalizedEmissions) {
      if (!emission.month) continue;
      const current = bucket(emission.month);
      if (emission.isPolicy) {
        if (!policyBaseSeen.has(emission.numero_apolice)) {
          current.apolices += 1;
          current.total += 1;
          policyBaseSeen.add(emission.numero_apolice);
        }
        continue;
      }
      if (emission.type === "A") {
        if (aClassification.get(emission.id) === "correction") current.endossoACorrecao += 1;
        else current.endossoAFatura += 1;
        current.total += 1;
      } else if (emission.type === "C") {
        current.endossoC += 1;
        current.total += 1;
      }
    }

    // Bases antigas podem não existir como endosso 000000. Ainda assim a
    // emissão original precisa aparecer no mês de início da operação.
    for (const policy of policies) {
      if (policyBaseSeen.has(policy.numero_apolice)) continue;
      const startMonth = startMonthByPolicy.get(policy.numero_apolice);
      if (!startMonth) continue;
      const current = bucket(startMonth);
      current.apolices += 1;
      current.total += 1;
    }

    const observedMonths = [...issuanceMap.keys(), ...startMonthByPolicy.values()].sort();
    const firstOperationMonth = observedMonths[0] ?? null;
    const lastOperationMonth = observedMonths.at(-1) ?? firstOperationMonth;
    const issuancesByMonth =
      firstOperationMonth && lastOperationMonth
        ? monthSequence(firstOperationMonth, lastOperationMonth).map(
            (month) =>
              issuanceMap.get(month) ?? {
                month,
                label: monthLabel(month),
                apolices: 0,
                endossoAFatura: 0,
                endossoACorrecao: 0,
                endossoC: 0,
                total: 0,
              },
          )
        : [];

    // O Repasse Excelsior permanece com a mesma fonte e regra já validada:
    // valor_total quitado, competência em data_quitacao e composição do mapa.
    const paidActive = derivePaidActivePremiums(billing, emissions);
    const repasseInputByMonth = new Map<string, MonthlyRepasseInput>(
      Array.from(paidActive.byMonth, ([month, value]) => [
        month,
        {
          premioTotalPago: value.usd,
          premioRetidoCorretores: value.corretagemUsd,
        },
      ]),
    );
    const repasseStartMonth =
      [...startMonthByPolicy.values(), ...repasseInputByMonth.keys()].sort()[0] ??
      firstOperationMonth;
    const repasseByMonth = buildRepasseSeries(repasseInputByMonth, repasseStartMonth ?? null);

    const referenceDate = currentFortalezaDate();
    const dedupedBilling = dedupeBillingRecords(billing);
    const financialHealth = deriveFinancialHealth(
      policyNumbers,
      dedupedBilling,
      data.delinquencyDays,
      referenceDate,
    );

    const billingByPolicy = new Map<string, BillingRecord[]>();
    for (const row of dedupedBilling) {
      const rows = billingByPolicy.get(row.numero_apolice) ?? [];
      rows.push(row);
      billingByPolicy.set(row.numero_apolice, rows);
    }

    const endorsementSignalsByPolicy = new Map<string, PolicyEndorsementSignal[]>();
    for (const emission of emissions) {
      const translated = translateProposta(emission.proposta);
      const signals = endorsementSignalsByPolicy.get(emission.numero_apolice) ?? [];
      signals.push({
        tipo_endosso: translated.tipoEndosso,
        motivo_endosso: [
          translated.motivoEndosso?.codigo,
          translated.motivoEndosso?.descricao,
          translated.motivoEndosso?.tipoCancelamento,
          translated.cancelamento?.motivo,
          translated.cancelamento?.descricaoMotivo,
        ]
          .filter(Boolean)
          .join(" "),
      });
      endorsementSignalsByPolicy.set(emission.numero_apolice, signals);
    }

    const portfolioInput: PortfolioPolicyInput[] = policies.map((policy) => {
      const translated = translateProposta(policy.proposta);
      const insured = translated.partes.find(
        (party) => normalizedText(party.papel) === "SEGURADO",
      );
      const status = derivePolicyStatus(
        billingByPolicy.get(policy.numero_apolice) ?? [],
        endorsementSignalsByPolicy.get(policy.numero_apolice) ?? [],
        { delinquencyAfterDays: data.delinquencyDays, referenceAt: `${referenceDate}T12:00:00Z` },
      );
      const issuanceMonth =
        pickMonth(
          translated.datas.dataEmissao ??
            translated.datas.assinatura ??
            translated.datas.conclusaoSubscricao ??
            translated.datas.registroOrigem,
        ) ?? startMonthByPolicy.get(policy.numero_apolice) ?? null;

      return {
        numeroApolice: policy.numero_apolice,
        state: portfolioState(status.status),
        birthDate: insured?.dataNascimentoFundacao ?? null,
        issuanceMonth,
        coverages: translated.itens.flatMap((item) =>
          item.coberturas.map((coverage) => ({
            code: coverage.codigo,
            name: coverage.nome,
            premiumUsd: coverage.composicaoPremio
              .filter((line) => normalizedText(line.natureza) === "PREMIO")
              .reduce((sum, line) => sum + line.valor, 0),
          })),
        ),
      };
    });
    const portfolio = derivePortfolioAnalytics(portfolioInput, referenceDate);

    console.info("[analytics] agregados calculados", {
      policies: policies.length,
      emissions: emissions.length,
      billing: billing.length,
      paidBilling: paidActive.eligibleRows,
      matchedPaidBilling: paidActive.matchedRows,
      activePolicies: portfolio.status.activePolicies,
      cancelledPolicies: portfolio.status.cancelledPolicies,
      suspendedPolicies: portfolio.status.suspendedPolicies,
      knownAges: portfolio.policyAges.length,
      coverageBuckets: portfolio.coveragePremiums.length,
    });

    return {
      issuancesByMonth,
      correctionsByPolicy: classifiedA.correctionsByPolicy,
      financialHealth,
      repasseByMonth,
      portfolioStatus: portfolio.status,
      policyAges: portfolio.policyAges,
      coveragePremiums: portfolio.coveragePremiums,
    };
  });

function recordFrom(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  if (typeof value !== "string") return {};
  try {
    const parsed = JSON.parse(value) as unknown;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}

function resolveProposta(raw: Record<string, unknown>): Record<string, unknown> {
  if (raw.datas || raw.itens) return raw;
  for (const suffix of ["A", "B", "C", "D"] as const) {
    const wrapper = recordFrom(raw[`endosso_${suffix}`]);
    if (Object.keys(wrapper).length === 0) continue;
    const inner = recordFrom(wrapper[`proposta_endosso_${suffix}`]);
    const inside = recordFrom(inner.proposta);
    if (inside.datas || inside.itens) return inside;
  }
  return raw;
}

function resolveEndorsementType(raw: Record<string, unknown>): "A" | "B" | "C" | "D" | null {
  for (const suffix of ["A", "B", "C", "D"] as const) {
    if (raw[`endosso_${suffix}`]) return suffix;
  }
  return null;
}

function resolveEmissionDate(raw: Record<string, unknown>): string | null {
  for (const suffix of ["A", "B", "C", "D"] as const) {
    const wrapper = recordFrom(raw[`endosso_${suffix}`]);
    if (Object.keys(wrapper).length === 0) continue;
    const inner = recordFrom(wrapper[`proposta_endosso_${suffix}`]);
    const proposal = recordFrom(inner.proposta ?? inner);
    const dates = recordFrom(proposal.datas);
    return (
      (typeof wrapper.data_emissao === "string" && wrapper.data_emissao) ||
      (typeof inner.data_emissao === "string" && inner.data_emissao) ||
      (typeof dates.assinatura === "string" && dates.assinatura) ||
      (typeof dates.conclusao_subscricao === "string" && dates.conclusao_subscricao) ||
      (typeof dates.registro_origem === "string" && dates.registro_origem) ||
      null
    );
  }

  const proposal = resolveProposta(raw);
  const dates = recordFrom(proposal.datas);
  return (
    (typeof raw.data_emissao === "string" && raw.data_emissao) ||
    (typeof dates.assinatura === "string" && dates.assinatura) ||
    (typeof dates.conclusao_subscricao === "string" && dates.conclusao_subscricao) ||
    (typeof dates.registro_origem === "string" && dates.registro_origem) ||
    null
  );
}
