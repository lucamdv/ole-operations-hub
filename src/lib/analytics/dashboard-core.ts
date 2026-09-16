export interface BillingHealthRow {
  numero_apolice: string;
  numero_endosso: string;
  numero_parcela: string;
  status_pagamento: string;
  situacao_emissao: string;
  data_quitacao: string | null;
  data_vencimento: string | null;
  valor_total?: number | string | null;
}

export interface FinancialHealth {
  activeContracts: number;
  compliantContracts: number;
  lateContracts: number;
  delinquentContracts: number;
  lateRevenueUsd: number;
  delinquentRevenueUsd: number;
  thresholdDays: number;
  referenceDate: string;
}

export interface AEndorsementInput {
  id: string;
  numeroApolice: string;
  month: string;
  sequence: string;
}

export interface ClassifiedAEndorsement extends AEndorsementInput {
  classification: "invoice" | "correction";
}

export interface CorrectionPolicyBucket {
  numeroApolice: string;
  corrections: number;
  correctionMonths: string[];
}

export interface HistogramBucket {
  label: string;
  min: number;
  max: number;
  count: number;
}

export type PortfolioState = "ATIVA" | "CANCELADA" | "SUSPENSA";

export interface PortfolioCoverageInput {
  code: string | null;
  name: string;
  components: Array<{
    nature: string;
    type: string;
    valueUsd: number;
  }>;
}

export interface PortfolioPolicyInput {
  numeroApolice: string;
  state: PortfolioState;
  birthDate: string | null;
  issuanceMonth: string | null;
  coverages: PortfolioCoverageInput[];
}

export interface PortfolioStatusSummary {
  activePolicies: number;
  cancelledPolicies: number;
  suspendedPolicies: number;
  totalPolicies: number;
}

export interface PolicyAgePoint {
  state: PortfolioState;
  age: number;
}

export interface CoveragePremiumPoint {
  code: string | null;
  coverage: string;
  month: string | null;
  premiumUsd: number;
  excelsiorUsd: number;
  oleUsd: number;
  brokerageUsd: number;
  policies: number;
}

export interface PortfolioAnalytics {
  status: PortfolioStatusSummary;
  policyAges: PolicyAgePoint[];
  coveragePremiums: CoveragePremiumPoint[];
}

const DAY_MS = 86_400_000;

function normalized(value: unknown) {
  return String(value ?? "")
    .trim()
    .toLocaleLowerCase("pt-BR");
}

function endorsementNumber(value: unknown) {
  const digits = String(value ?? "").replace(/\D/g, "");
  return Number.parseInt(digits.slice(-6), 10) || 0;
}

function money(value: unknown) {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  const text = String(value ?? "").trim();
  if (!text) return 0;
  const normalizedNumber = text.includes(",") ? text.replace(/\./g, "").replace(",", ".") : text;
  const parsed = Number(normalizedNumber);
  return Number.isFinite(parsed) ? parsed : 0;
}

function round2(value: number) {
  return Math.round(value * 100) / 100;
}

function normalizedKey(value: unknown) {
  return normalized(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function dateAtNoonUtc(value: string) {
  return Date.parse(`${value.slice(0, 10)}T12:00:00.000Z`);
}

/**
 * Calcula a posição financeira atual da carteira.
 *
 * Atraso e inadimplência são faixas exclusivas. Uma parcela vence no dia
 * seguinte ao vencimento e se torna inadimplente ao alcançar o limite
 * configurado (10 dias por padrão).
 */
export function deriveFinancialHealth(
  activePolicyNumbers: string[],
  rows: BillingHealthRow[],
  thresholdDays: number,
  referenceDate: string,
): FinancialHealth {
  const safeThreshold = Math.max(1, Math.round(thresholdDays) || 10);
  const activePolicies = new Set(
    activePolicyNumbers.map((policy) => policy.trim()).filter(Boolean),
  );

  const reference = dateAtNoonUtc(referenceDate);
  const latePolicies = new Set<string>();
  const delinquentPolicies = new Set<string>();
  const countedRows = new Set<string>();
  let lateRevenueUsd = 0;
  let delinquentRevenueUsd = 0;

  for (const row of rows) {
    const policy = row.numero_apolice.trim();
    if (!activePolicies.has(policy)) continue;
    if (!normalized(row.situacao_emissao).startsWith("ativ")) continue;
    if (normalized(row.status_pagamento).startsWith("total")) continue;
    if (row.data_quitacao && row.data_quitacao.slice(0, 10) <= referenceDate) continue;
    if (!row.data_vencimento || row.data_vencimento.slice(0, 10) >= referenceDate) continue;

    const daysOverdue = Math.max(
      1,
      Math.floor((reference - dateAtNoonUtc(row.data_vencimento)) / DAY_MS),
    );
    const identity = [
      policy,
      endorsementNumber(row.numero_endosso),
      String(row.numero_parcela).trim().toLocaleLowerCase("pt-BR"),
      row.data_vencimento.slice(0, 10),
    ].join("#");
    if (countedRows.has(identity)) continue;
    countedRows.add(identity);

    if (daysOverdue >= safeThreshold) {
      delinquentPolicies.add(policy);
      latePolicies.delete(policy);
      delinquentRevenueUsd += money(row.valor_total);
    } else {
      if (!delinquentPolicies.has(policy)) latePolicies.add(policy);
      lateRevenueUsd += money(row.valor_total);
    }
  }

  const activeContracts = activePolicies.size;
  const lateContracts = latePolicies.size;
  const delinquentContracts = delinquentPolicies.size;
  return {
    activeContracts,
    compliantContracts: Math.max(0, activeContracts - lateContracts - delinquentContracts),
    lateContracts,
    delinquentContracts,
    lateRevenueUsd: round2(lateRevenueUsd),
    delinquentRevenueUsd: round2(delinquentRevenueUsd),
    thresholdDays: safeThreshold,
    referenceDate,
  };
}

function monthDistance(from: string, to: string) {
  const [fromYear, fromMonth] = from.split("-").map(Number);
  const [toYear, toMonth] = to.split("-").map(Number);
  if (!fromYear || !fromMonth || !toYear || !toMonth) return 0;
  return (toYear - fromYear) * 12 + toMonth - fromMonth;
}

/**
 * Uma apólice tem direito a um A de fatura por mês transcorrido desde a
 * vigência. Tudo que exceder esse limite acumulado é A de correção.
 */
export function classifyAEndorsements(
  policyNumbers: string[],
  startMonthByPolicy: Map<string, string>,
  endorsements: AEndorsementInput[],
): {
  classified: ClassifiedAEndorsement[];
  correctionsByPolicy: CorrectionPolicyBucket[];
} {
  const byPolicy = new Map<string, AEndorsementInput[]>();
  for (const endorsement of endorsements) {
    const list = byPolicy.get(endorsement.numeroApolice) ?? [];
    list.push(endorsement);
    byPolicy.set(endorsement.numeroApolice, list);
  }

  const classified: ClassifiedAEndorsement[] = [];
  const correctionCounts = new Map<string, number>();
  const correctionMonths = new Map<string, string[]>();

  for (const [policy, policyEndorsements] of byPolicy) {
    const ordered = [...policyEndorsements].sort(
      (left, right) =>
        left.month.localeCompare(right.month) ||
        endorsementNumber(left.sequence) - endorsementNumber(right.sequence) ||
        left.id.localeCompare(right.id),
    );
    const knownStart = startMonthByPolicy.get(policy);
    const fallbackStart = ordered[0]?.month;
    let invoices = 0;

    for (const endorsement of ordered) {
      const expectedInvoices = knownStart
        ? Math.max(0, monthDistance(knownStart, endorsement.month))
        : Math.max(1, monthDistance(fallbackStart ?? endorsement.month, endorsement.month) + 1);
      const isInvoice = invoices < expectedInvoices;
      if (isInvoice) invoices += 1;
      else {
        correctionCounts.set(policy, (correctionCounts.get(policy) ?? 0) + 1);
        correctionMonths.set(policy, [...(correctionMonths.get(policy) ?? []), endorsement.month]);
      }
      classified.push({
        ...endorsement,
        classification: isInvoice ? "invoice" : "correction",
      });
    }
  }

  const allPolicies = new Set([...policyNumbers, ...byPolicy.keys()]);
  return {
    classified,
    correctionsByPolicy: Array.from(allPolicies, (numeroApolice) => ({
      numeroApolice,
      corrections: correctionCounts.get(numeroApolice) ?? 0,
      correctionMonths: correctionMonths.get(numeroApolice) ?? [],
    })).sort((left, right) => left.numeroApolice.localeCompare(right.numeroApolice)),
  };
}

function niceStep(raw: number) {
  if (raw <= 1) return 1;
  const power = 10 ** Math.floor(Math.log10(raw));
  const fraction = raw / power;
  const nice = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
  return nice * power;
}

function civilDateParts(value: string | null | undefined) {
  const match = value?.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return null;
  }
  return { year, month, day };
}

export function ageAtDate(
  birthDate: string | null | undefined,
  referenceDate: string,
): number | null {
  const birth = civilDateParts(birthDate);
  const reference = civilDateParts(referenceDate);
  if (!birth || !reference) return null;
  let age = reference.year - birth.year;
  if (
    reference.month < birth.month ||
    (reference.month === birth.month && reference.day < birth.day)
  ) {
    age -= 1;
  }
  return age >= 0 && age <= 120 ? age : null;
}

/**
 * Consolida somente dados não identificáveis usados pelos painéis da carteira.
 * Prêmio por cobertura considera apólices ativas e linhas de prêmio positivo.
 */
export function derivePortfolioAnalytics(
  policies: PortfolioPolicyInput[],
  referenceDate: string,
): PortfolioAnalytics {
  const status: PortfolioStatusSummary = {
    activePolicies: 0,
    cancelledPolicies: 0,
    suspendedPolicies: 0,
    totalPolicies: policies.length,
  };
  const policyAges: PolicyAgePoint[] = [];
  const coverageBuckets = new Map<string, CoveragePremiumPoint & { policyNumbers: Set<string> }>();

  for (const policy of policies) {
    if (policy.state === "CANCELADA") status.cancelledPolicies += 1;
    else if (policy.state === "SUSPENSA") status.suspendedPolicies += 1;
    else status.activePolicies += 1;

    const age = ageAtDate(policy.birthDate, referenceDate);
    if (age !== null) policyAges.push({ state: policy.state, age });
    if (policy.state !== "ATIVA") continue;

    for (const coverage of policy.coverages) {
      let excelsiorUsd = 0;
      let oleUsd = 0;
      let brokerageUsd = 0;
      for (const component of coverage.components) {
        const valueUsd = money(component.valueUsd);
        if (valueUsd === 0) continue;
        const type = normalizedKey(component.type).replace(/[\s-]+/g, "_");
        if (type === "direto") excelsiorUsd += valueUsd;
        else if (type === "comissao_corretagem") brokerageUsd += valueUsd;
        else oleUsd += valueUsd;
      }
      const premiumUsd = excelsiorUsd + oleUsd + brokerageUsd;
      if (premiumUsd <= 0) continue;
      const name = coverage.name.trim() || coverage.code?.trim() || "Cobertura sem nome";
      const identity = normalizedKey(coverage.code) || normalizedKey(name);
      const month = policy.issuanceMonth;
      const key = `${identity}#${month ?? "sem-mes"}`;
      const current = coverageBuckets.get(key) ?? {
        code: coverage.code?.trim() || null,
        coverage: name,
        month,
        premiumUsd: 0,
        excelsiorUsd: 0,
        oleUsd: 0,
        brokerageUsd: 0,
        policies: 0,
        policyNumbers: new Set<string>(),
      };
      current.premiumUsd += premiumUsd;
      current.excelsiorUsd += excelsiorUsd;
      current.oleUsd += oleUsd;
      current.brokerageUsd += brokerageUsd;
      current.policyNumbers.add(policy.numeroApolice);
      coverageBuckets.set(key, current);
    }
  }

  const coveragePremiums = Array.from(coverageBuckets.values(), (bucket) => ({
    code: bucket.code,
    coverage: bucket.coverage,
    month: bucket.month,
    premiumUsd: round2(bucket.premiumUsd),
    excelsiorUsd: round2(bucket.excelsiorUsd),
    oleUsd: round2(bucket.oleUsd),
    brokerageUsd: round2(bucket.brokerageUsd),
    policies: bucket.policyNumbers.size,
  })).sort(
    (left, right) =>
      (left.month ?? "").localeCompare(right.month ?? "") ||
      right.premiumUsd - left.premiumUsd ||
      left.coverage.localeCompare(right.coverage, "pt-BR"),
  );

  return { status, policyAges, coveragePremiums };
}

/** Intervalos etários alinhados e adaptados à dispersão real da carteira. */
export function buildDynamicAgeHistogram(values: number[]): HistogramBucket[] {
  const safeValues = values
    .map((value) => Math.round(value))
    .filter((value) => Number.isFinite(value) && value >= 0 && value <= 120);
  if (safeValues.length === 0) return [];

  const minimum = Math.min(...safeValues);
  const maximum = Math.max(...safeValues);
  if (minimum === maximum) {
    return [{ label: String(minimum), min: minimum, max: maximum, count: safeValues.length }];
  }

  const desiredBins = Math.min(8, Math.max(4, Math.ceil(Math.sqrt(safeValues.length))));
  const step = niceStep((maximum - minimum + 1) / desiredBins);
  const start = Math.max(0, Math.floor(minimum / step) * step);
  const buckets: HistogramBucket[] = [];
  for (let min = start; min <= maximum; min += step) {
    const max = min + step - 1;
    buckets.push({
      label: min === max ? String(min) : `${min}–${max}`,
      min,
      max,
      count: 0,
    });
  }
  for (const value of safeValues) {
    const index = Math.min(buckets.length - 1, Math.floor((value - start) / step));
    buckets[index]!.count += 1;
  }
  return buckets;
}

/** Cria intervalos que crescem junto com a amplitude real da carteira. */
export function buildDynamicHistogram(values: number[]): HistogramBucket[] {
  if (values.length === 0) return [];
  const safeValues = values.map((value) => Math.max(0, Math.round(value) || 0));
  const max = Math.max(...safeValues);
  if (max === 0) return [{ label: "0", min: 0, max: 0, count: safeValues.length }];

  const desiredBins = Math.min(8, Math.max(4, Math.ceil(Math.sqrt(safeValues.length))));
  const step = niceStep(max / Math.max(1, desiredBins - 1));
  const buckets: HistogramBucket[] = [{ label: "0", min: 0, max: 0, count: 0 }];
  for (let min = 1; min <= max; min += step) {
    const upper = Math.min(max, min + step - 1);
    buckets.push({
      label: min === upper ? String(min) : `${min}–${upper}`,
      min,
      max: upper,
      count: 0,
    });
  }

  for (const value of safeValues) {
    const bucket = buckets.find((candidate) => value >= candidate.min && value <= candidate.max);
    if (bucket) bucket.count += 1;
  }
  return buckets;
}
