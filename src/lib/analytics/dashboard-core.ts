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
  policyNumbers: string[],
  rows: BillingHealthRow[],
  thresholdDays: number,
  referenceDate: string,
): FinancialHealth {
  const safeThreshold = Math.max(1, Math.round(thresholdDays) || 10);
  const rowsByPolicy = new Map<string, BillingHealthRow[]>();
  for (const row of rows) {
    const policy = row.numero_apolice.trim();
    if (!policy) continue;
    const list = rowsByPolicy.get(policy) ?? [];
    list.push(row);
    rowsByPolicy.set(policy, list);
  }

  const activePolicies = new Set(policyNumbers.map((policy) => policy.trim()).filter(Boolean));
  for (const [policy, policyRows] of rowsByPolicy) {
    const latestSequence = Math.max(
      ...policyRows.map((row) => endorsementNumber(row.numero_endosso)),
    );
    const latestRows = policyRows.filter(
      (row) => endorsementNumber(row.numero_endosso) === latestSequence,
    );
    if (
      latestRows.length > 0 &&
      latestRows.every((row) => normalized(row.situacao_emissao).startsWith("cancel"))
    ) {
      activePolicies.delete(policy);
    } else {
      activePolicies.add(policy);
    }
  }

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

  return {
    activeContracts: activePolicies.size,
    lateContracts: latePolicies.size,
    delinquentContracts: delinquentPolicies.size,
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
