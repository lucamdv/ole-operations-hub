import type { BillingRecord } from "@/lib/billing/status";

export type PolicyStatus =
  "PAGA" | "ABERTA" | "ATRASADA" | "INADIMPLENTE" | "SUSPENSA" | "CANCELADA";

export interface PolicyEndorsementSignal {
  tipo_endosso: string | null;
  motivo_endosso: string | null;
}

export interface PolicyStatusRules {
  /** Dias corridos em atraso a partir dos quais a apólice fica inadimplente. */
  delinquencyAfterDays: number;
}

export interface PolicyStatusInfo {
  status: PolicyStatus;
  dataVencimento: string | null;
  oldestOverdueDate: string | null;
  daysOverdue: number;
  unpaidRecords: number;
}

export const DEFAULT_POLICY_STATUS_RULES: PolicyStatusRules = {
  delinquencyAfterDays: 10,
};

export const POLICY_STATUSES: PolicyStatus[] = [
  "PAGA",
  "ABERTA",
  "ATRASADA",
  "INADIMPLENTE",
  "SUSPENSA",
  "CANCELADA",
];

const POLICY_STATUS_STYLES: Record<PolicyStatus, string> = {
  PAGA: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/40",
  ABERTA: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/40",
  ATRASADA: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/40",
  INADIMPLENTE: "bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/40",
  SUSPENSA: "bg-violet-500/15 text-violet-700 dark:text-violet-400 border-violet-500/40",
  CANCELADA: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/40",
};

const DAY_MS = 86_400_000;
const FORTALEZA_OFFSET_MS = -3 * 3_600_000;

function normalized(value: string | null | undefined): string {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toUpperCase();
}

function civilDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const direct = value.match(/^(\d{4}-\d{2}-\d{2})/);
  if (direct?.[1]) return direct[1];
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return null;
  return new Date(timestamp + FORTALEZA_OFFSET_MS).toISOString().slice(0, 10);
}

function referenceDate(referenceAt: string | number | Date): string {
  const timestamp = referenceAt instanceof Date ? +referenceAt : new Date(referenceAt).getTime();
  return new Date(timestamp + FORTALEZA_OFFSET_MS).toISOString().slice(0, 10);
}

function differenceInCivilDays(later: string, earlier: string): number {
  return Math.floor(
    (Date.parse(`${later}T00:00:00Z`) - Date.parse(`${earlier}T00:00:00Z`)) / DAY_MS,
  );
}

function isCancelledBilling(row: BillingRecord): boolean {
  return normalized(row.situacao_emissao).startsWith("CANCEL");
}

function isPaidBilling(row: BillingRecord): boolean {
  const status = normalized(row.status_pagamento);
  return status.startsWith("TOTAL") || status.startsWith("PAG") || status.startsWith("QUIT");
}

function hasEndorsementReason(
  endorsements: PolicyEndorsementSignal[],
  type: "A" | "C",
  reasonFragment: string,
): boolean {
  return endorsements.some(
    (endorsement) =>
      normalized(endorsement.tipo_endosso) === type &&
      normalized(endorsement.motivo_endosso).includes(reasonFragment),
  );
}

/**
 * Consolida o estado da apólice inteira.
 *
 * Precedência: cancelamento contratual → suspensão por inadimplência → atraso
 * financeiro → aberto → pago. Endossos cancelados são históricos e não
 * impedem que os demais documentos ativos deixem a apólice paga.
 */
export function derivePolicyStatus(
  rows: BillingRecord[],
  endorsements: PolicyEndorsementSignal[],
  options: {
    delinquencyAfterDays?: number;
    referenceAt?: string | number | Date;
  } = {},
): PolicyStatusInfo {
  const delinquencyAfterDays = Math.max(
    0,
    Math.floor(options.delinquencyAfterDays ?? DEFAULT_POLICY_STATUS_RULES.delinquencyAfterDays),
  );
  const today = referenceDate(options.referenceAt ?? Date.now());
  const activeRows = rows.filter((row) => !isCancelledBilling(row));
  const unpaidRows = activeRows.filter((row) => !isPaidBilling(row));
  const unpaidDueDates = unpaidRows
    .map((row) => civilDate(row.data_vencimento))
    .filter((date): date is string => !!date)
    .sort();
  const dataVencimento = unpaidDueDates[0] ?? null;

  if (hasEndorsementReason(endorsements, "A", "RESILI")) {
    return {
      status: "CANCELADA",
      dataVencimento,
      oldestOverdueDate: null,
      daysOverdue: 0,
      unpaidRecords: unpaidRows.length,
    };
  }

  if (hasEndorsementReason(endorsements, "C", "INADIMPL")) {
    return {
      status: "SUSPENSA",
      dataVencimento,
      oldestOverdueDate: null,
      daysOverdue: 0,
      unpaidRecords: unpaidRows.length,
    };
  }

  const overdueDates = unpaidDueDates.filter((date) => date < today);
  const oldestOverdueDate = overdueDates[0] ?? null;
  const daysOverdue = oldestOverdueDate ? differenceInCivilDays(today, oldestOverdueDate) : 0;

  if (oldestOverdueDate && daysOverdue >= delinquencyAfterDays) {
    return {
      status: "INADIMPLENTE",
      dataVencimento,
      oldestOverdueDate,
      daysOverdue,
      unpaidRecords: unpaidRows.length,
    };
  }
  if (oldestOverdueDate) {
    return {
      status: "ATRASADA",
      dataVencimento,
      oldestOverdueDate,
      daysOverdue,
      unpaidRecords: unpaidRows.length,
    };
  }
  if (unpaidRows.length > 0 || activeRows.length === 0) {
    return {
      status: "ABERTA",
      dataVencimento,
      oldestOverdueDate: null,
      daysOverdue: 0,
      unpaidRecords: unpaidRows.length,
    };
  }
  return {
    status: "PAGA",
    dataVencimento: null,
    oldestOverdueDate: null,
    daysOverdue: 0,
    unpaidRecords: 0,
  };
}

export function policyStatusClass(status: PolicyStatus): string {
  return POLICY_STATUS_STYLES[status];
}

export function policyStatusDescription(
  info: PolicyStatusInfo,
  delinquencyAfterDays: number,
): string {
  switch (info.status) {
    case "CANCELADA":
      return "Endosso A com motivo de resilição";
    case "SUSPENSA":
      return "Endosso C com motivo de inadimplência";
    case "INADIMPLENTE":
      return `Pagamento vencido há ${info.daysOverdue} dias (limite: ${delinquencyAfterDays} dias)`;
    case "ATRASADA":
      return `Pagamento vencido há ${info.daysOverdue} dias; inadimplência a partir de ${delinquencyAfterDays} dias`;
    case "ABERTA":
      return `${info.unpaidRecords || 1} cobrança${info.unpaidRecords === 1 ? "" : "s"} ainda não paga${info.unpaidRecords === 1 ? "" : "s"}`;
    case "PAGA":
      return "Todos os documentos ativos estão pagos";
  }
}
