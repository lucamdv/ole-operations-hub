/** Derivação da tag de cobrança a partir dos dados da seguradora. */

export interface BillingRecord {
  numero_apolice: string;
  numero_endosso: string;
  numero_parcela: string;
  id_parcela_seguradora: string | null;
  numero_proposta: string | null;
  status_pagamento: string;
  situacao_emissao: string;
  data_quitacao: string | null;
  data_vencimento: string | null;
  updated_at?: string | null;
}

export type BillingTag = "PAGO" | "PARCIAL" | "ABERTA" | "CANCELADA";

export interface BillingTagInfo {
  tag: BillingTag;
  label: BillingTag;
  className: string;
}

const TAG_STYLES: Record<BillingTag, string> = {
  PAGO: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/40",
  PARCIAL: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/40",
  ABERTA: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/40",
  CANCELADA: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/40",
};

function norm(v: string | null | undefined): string {
  return (v ?? "").trim().toLowerCase();
}

/** Regra oficial: Total→PAGO, Parcial→PARCIAL, Aberta+Cancelada→CANCELADA, Aberta+Ativa→ABERTA. */
export function billingTag(
  statusPagamento: string | null | undefined,
  situacaoEmissao: string | null | undefined,
): BillingTag {
  const st = norm(statusPagamento);
  if (st.startsWith("total")) return "PAGO";
  if (st.startsWith("parcial")) return "PARCIAL";
  if (norm(situacaoEmissao).startsWith("cancel")) return "CANCELADA";
  return "ABERTA";
}

export function billingTagInfo(
  statusPagamento: string | null | undefined,
  situacaoEmissao: string | null | undefined,
): BillingTagInfo {
  const tag = billingTag(statusPagamento, situacaoEmissao);
  return { tag, label: tag, className: TAG_STYLES[tag] };
}

export function billingTagClass(tag: BillingTag): string {
  return TAG_STYLES[tag];
}

function sequence(value: string): number {
  return parseInt(String(value).replace(/\D/g, ""), 10) || 0;
}

/**
 * Cobrança operacional vigente:
 * - considera primeiro o endosso mais novo;
 * - dentro dele prioriza parcela ativa em aberto, depois parcial;
 * - se todas estiverem encerradas, usa a parcela de maior sequencial.
 */
export function currentBilling<
  T extends {
    numero_endosso: string;
    numero_parcela?: string;
    status_pagamento?: string | null;
    situacao_emissao?: string | null;
  },
>(rows: T[]): T | null {
  if (!rows || rows.length === 0) return null;
  const latestEndorsement = Math.max(...rows.map((row) => sequence(row.numero_endosso)));
  const latestRows = rows.filter((row) => sequence(row.numero_endosso) === latestEndorsement);
  const open = latestRows.find(
    (row) =>
      norm(row.status_pagamento).startsWith("abert") &&
      norm(row.situacao_emissao).startsWith("ativ"),
  );
  if (open) return open;
  const partial = latestRows.find((row) => norm(row.status_pagamento).startsWith("parcial"));
  if (partial) return partial;
  return latestRows.reduce((acc, row) =>
    sequence(row.numero_parcela ?? "") > sequence(acc.numero_parcela ?? "") ? row : acc,
  );
}

export function normalizeBillingEndosso(numero: string): string {
  const digits = String(numero).replace(/\D/g, "");
  return digits.slice(-6).padStart(6, "0");
}

function normalizePolicyNumber(numero: string): string {
  const digits = String(numero).replace(/\D/g, "");
  if (digits.length < 6) return String(numero).trim();
  return `${digits.slice(0, -6)}000000`;
}

function normalizeInstallmentIdentity(value: string): string {
  const text = String(value).trim();
  if (/^\d+$/.test(text)) return String(Number.parseInt(text, 10));
  return text.toLocaleLowerCase("pt-BR");
}

function isLegacyInstallment(value: string): boolean {
  return String(value).trim().toUpperCase() === "LEGACY";
}

function updatedAtValue(row: { updated_at?: string | null }): number {
  const value = row.updated_at ? Date.parse(row.updated_at) : Number.NaN;
  return Number.isFinite(value) ? value : 0;
}

function preferredBillingRecord<T extends BillingRecord>(current: T, candidate: T): T {
  const currentLegacy = isLegacyInstallment(current.numero_parcela);
  const candidateLegacy = isLegacyInstallment(candidate.numero_parcela);
  if (currentLegacy !== candidateLegacy) return candidateLegacy ? current : candidate;

  const currentUpdated = updatedAtValue(current);
  const candidateUpdated = updatedAtValue(candidate);
  if (currentUpdated !== candidateUpdated) {
    return candidateUpdated > currentUpdated ? candidate : current;
  }

  if (!!current.id_parcela_seguradora !== !!candidate.id_parcela_seguradora) {
    return candidate.id_parcela_seguradora ? candidate : current;
  }
  return candidate;
}

function billingDocumentKey(row: BillingRecord): string {
  return `${normalizePolicyNumber(row.numero_apolice)}#${normalizeBillingEndosso(row.numero_endosso)}`;
}

/**
 * Remove representações duplicadas da mesma parcela sem apagar dados:
 * - normaliza endosso completo e sequencial para o mesmo documento;
 * - cruza número e id da parcela quando ambos aparecem em versões diferentes;
 * - prefere a parcela atual a um registro LEGACY com o mesmo vencimento;
 * - mantém LEGACY quando não existe correspondência inequívoca.
 */
export function dedupeBillingRecords<T extends BillingRecord>(rows: T[]): T[] {
  const currentRows = rows.filter((row) => !isLegacyInstallment(row.numero_parcela));
  const legacyRows: T[] = [];
  for (const row of rows) {
    if (isLegacyInstallment(row.numero_parcela)) legacyRows.push(row);
  }

  const identitiesFor = (row: T) => {
    const document = billingDocumentKey(row);
    return [
      row.id_parcela_seguradora
        ? `${document}#id:${normalizeInstallmentIdentity(row.id_parcela_seguradora)}`
        : null,
      `${document}#numero:${normalizeInstallmentIdentity(row.numero_parcela)}`,
    ].filter((value): value is string => value !== null);
  };
  const parents = currentRows.map((_, index) => index);
  const find = (index: number): number => {
    let root = index;
    while (parents[root] !== root) root = parents[root]!;
    while (parents[index] !== index) {
      const next = parents[index]!;
      parents[index] = root;
      index = next;
    }
    return root;
  };
  const unite = (left: number, right: number) => {
    const leftRoot = find(left);
    const rightRoot = find(right);
    if (leftRoot !== rightRoot) parents[rightRoot] = leftRoot;
  };
  const identityOwners = new Map<string, number>();
  currentRows.forEach((row, index) => {
    for (const identity of identitiesFor(row)) {
      const owner = identityOwners.get(identity);
      if (owner === undefined) identityOwners.set(identity, index);
      else unite(index, owner);
    }
  });

  const groups = new Map<number, { first: number; row: T }>();
  currentRows.forEach((row, index) => {
    const root = find(index);
    const group = groups.get(root);
    if (!group) groups.set(root, { first: index, row });
    else group.row = preferredBillingRecord(group.row, row);
  });
  const result = [...groups.values()]
    .sort((left, right) => left.first - right.first)
    .map(({ row }) => row);
  const identityPositions = new Map<string, number>();
  result.forEach((row, index) => {
    identitiesFor(row).forEach((identity) => identityPositions.set(identity, index));
  });

  for (const legacy of legacyRows) {
    const document = billingDocumentKey(legacy);
    const insurerIdentity = legacy.id_parcela_seguradora
      ? `${document}#id:${normalizeInstallmentIdentity(legacy.id_parcela_seguradora)}`
      : null;
    const byInsurerId = insurerIdentity ? identityPositions.get(insurerIdentity) : undefined;
    if (byInsurerId !== undefined) {
      result[byInsurerId] = preferredBillingRecord(result[byInsurerId]!, legacy);
      continue;
    }

    const dueDateMatches = legacy.data_vencimento
      ? result
          .map((row, index) => ({ row, index }))
          .filter(
            ({ row }) =>
              billingDocumentKey(row) === document &&
              !isLegacyInstallment(row.numero_parcela) &&
              row.data_vencimento === legacy.data_vencimento,
          )
      : [];
    if (dueDateMatches.length === 1) continue;

    const legacyIdentity = [
      document,
      "legacy",
      legacy.numero_proposta ?? "",
      legacy.data_vencimento ?? "",
    ].join("#");
    const existingPosition = identityPositions.get(legacyIdentity);
    if (existingPosition === undefined) {
      identityPositions.set(legacyIdentity, result.length);
      result.push(legacy);
    } else {
      result[existingPosition] = preferredBillingRecord(result[existingPosition]!, legacy);
    }
  }

  return result;
}

/** Rótulo amigável para registros anteriores à identificação individual de parcelas. */
export function billingInstallmentLabel(value: string): string {
  return isLegacyInstallment(value) ? "Histórica" : value;
}
