type JsonRecord = Record<string, unknown>;

export interface PaidActiveBillingRow {
  numero_apolice: string;
  numero_endosso: string;
  numero_parcela: string;
  id_parcela_seguradora?: string | null;
  numero_proposta?: string | null;
  status_pagamento: string;
  situacao_emissao: string;
  data_quitacao: string | null;
  data_vencimento: string | null;
}

export interface FinancialDocument {
  numero_apolice: string;
  numero_endosso: string;
  proposta: unknown;
}

interface PremiumTotal {
  usd: number;
  brl: number;
  corretagemUsd: number;
  corretagemBrl: number;
}

export interface PaidActivePremiums {
  byMonth: Map<string, PremiumTotal & { policies: Set<string> }>;
  byPolicy: Map<string, PremiumTotal>;
  eligibleRows: number;
  matchedRows: number;
}

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function recordFrom(value: unknown): JsonRecord {
  if (isRecord(value)) return value;
  if (typeof value !== "string") return {};
  try {
    const parsed = JSON.parse(value) as unknown;
    return isRecord(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function resolveProposal(value: unknown): JsonRecord {
  const raw = recordFrom(value);
  if (raw.pagamento || raw.datas || raw.itens) return raw;

  for (const suffix of ["A", "B", "C", "D"] as const) {
    const wrapper = raw[`endosso_${suffix}`];
    if (!isRecord(wrapper)) continue;
    const inner = wrapper[`proposta_endosso_${suffix}`];
    if (!isRecord(inner)) continue;
    const proposal = isRecord(inner.proposta) ? inner.proposta : inner;
    if (proposal.pagamento || proposal.datas || proposal.itens) return proposal;
  }
  return raw;
}

function documentEmissionMonth(value: unknown): string | null {
  const raw = recordFrom(value);
  if (raw.pagamento || raw.datas || raw.itens) {
    const dates = isRecord(raw.datas) ? raw.datas : {};
    return monthOf(
      raw.data_emissao ?? dates.assinatura ?? dates.conclusao_subscricao ?? dates.registro_origem,
    );
  }

  for (const suffix of ["A", "B", "C", "D"] as const) {
    const wrapper = raw[`endosso_${suffix}`];
    if (!isRecord(wrapper)) continue;
    const inner = wrapper[`proposta_endosso_${suffix}`];
    if (!isRecord(inner)) continue;
    const proposal = isRecord(inner.proposta) ? inner.proposta : inner;
    const dates = isRecord(proposal.datas) ? proposal.datas : {};
    return monthOf(
      wrapper.data_emissao ??
        inner.data_emissao ??
        dates.assinatura ??
        dates.conclusao_subscricao ??
        dates.registro_origem,
    );
  }
  return null;
}

function normalizedText(value: unknown) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

function normalizedIdentity(value: unknown): string | null {
  const text = String(value ?? "").trim();
  if (!text) return null;
  return /^\d+$/.test(text) ? text.replace(/^0+(?=\d)/, "") : text.toLowerCase();
}

function dateOnly(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const iso = /^(\d{4}-\d{2}-\d{2})/.exec(value.trim());
  if (iso) return iso[1]!;
  const br = /^(\d{2})\/(\d{2})\/(\d{4})/.exec(value.trim());
  return br ? `${br[3]}-${br[2]}-${br[1]}` : null;
}

function monthOf(value: unknown): string | null {
  const day = dateOnly(value);
  return day ? day.slice(0, 7) : null;
}

function endorsementSequence(value: unknown) {
  const digits = String(value ?? "").replace(/\D/g, "");
  return digits.slice(-6).padStart(6, "0");
}

function documentKey(policy: unknown, endorsement: unknown) {
  return `${String(policy ?? "").trim()}#${endorsementSequence(endorsement)}`;
}

function installmentIdentity(item: JsonRecord): string | null {
  return normalizedIdentity(
    item.id_parcela ??
      item.parcela_id ??
      item.idParcela ??
      item.codigo_parcela ??
      item.numero_parcela ??
      item.sequencial_parcela ??
      item.numeroParcela ??
      item.parcela ??
      item.parcela_numero,
  );
}

function installmentDueDate(item: JsonRecord): string | null {
  return dateOnly(item.data_vencimento ?? item.vencimento);
}

function sumInstallment(item: JsonRecord): PremiumTotal {
  const composition = Array.isArray(item.composicao_premio_parcela)
    ? item.composicao_premio_parcela
    : [];
  let usd = 0;
  let brl = 0;
  let corretagemUsd = 0;
  let corretagemBrl = 0;
  for (const component of composition) {
    if (!isRecord(component)) continue;
    const componentUsd = Number(component.valor_premio) || 0;
    const componentBrl = Number(component.valor_premio_brl) || 0;
    usd += componentUsd;
    brl += componentBrl;
    if (normalizedText(component.tipo_premio) === "comissao_corretagem") {
      corretagemUsd += componentUsd;
      corretagemBrl += componentBrl;
    }
  }
  return { usd, brl, corretagemUsd, corretagemBrl };
}

function paidStatus(value: unknown) {
  const status = normalizedText(value);
  return status.startsWith("total") || status.startsWith("pag") || status.startsWith("quit");
}

/** Regra financeira oficial da Analytics: quitação paga e emissão ativa. */
export function isPaidAndActive(row: PaidActiveBillingRow) {
  return (
    paidStatus(row.status_pagamento) && normalizedText(row.situacao_emissao).startsWith("ativ")
  );
}

function matchingInstallment(
  row: PaidActiveBillingRow,
  installments: JsonRecord[],
  totalBillingRowsForDocument: number,
): JsonRecord | null {
  const identities = new Set(
    [row.id_parcela_seguradora, row.numero_parcela]
      .map(normalizedIdentity)
      .filter((value): value is string => value !== null),
  );
  const byIdentity = installments.filter((item) => {
    const identity = installmentIdentity(item);
    return identity !== null && identities.has(identity);
  });
  if (byIdentity.length === 1) return byIdentity[0]!;

  const compositeDueDate = String(row.numero_parcela ?? "")
    .split("@")
    .at(-1);
  const dueDate = dateOnly(row.data_vencimento) ?? dateOnly(compositeDueDate);
  if (dueDate) {
    const byDueDate = installments.filter((item) => installmentDueDate(item) === dueDate);
    if (byDueDate.length === 1) return byDueDate[0]!;
  }

  // Fallback seguro: um único registro de cobrança e uma única parcela no documento.
  return totalBillingRowsForDocument === 1 && installments.length === 1 ? installments[0]! : null;
}

/**
 * Cruza cobranças com seus documentos e agrega somente dinheiro efetivamente
 * quitado em documentos ativos. A competência segue o mês da emissão, como no
 * Mapa de Repasses; `data_quitacao` confirma que houve pagamento.
 */
export function derivePaidActivePremiums(
  billingRows: PaidActiveBillingRow[],
  documents: FinancialDocument[],
): PaidActivePremiums {
  const documentsByKey = new Map(
    documents.map((document) => [
      documentKey(document.numero_apolice, document.numero_endosso),
      document,
    ]),
  );
  const rowsPerDocument = new Map<string, number>();
  for (const row of billingRows) {
    const key = documentKey(row.numero_apolice, row.numero_endosso);
    rowsPerDocument.set(key, (rowsPerDocument.get(key) ?? 0) + 1);
  }

  const byMonth: PaidActivePremiums["byMonth"] = new Map();
  const byPolicy: PaidActivePremiums["byPolicy"] = new Map();
  const countedInstallments = new Set<string>();
  let eligibleRows = 0;
  let matchedRows = 0;

  for (const row of billingRows) {
    if (!isPaidAndActive(row)) continue;
    if (!monthOf(row.data_quitacao)) continue;
    eligibleRows += 1;

    const key = documentKey(row.numero_apolice, row.numero_endosso);
    const document = documentsByKey.get(key);
    if (!document) continue;
    const month = documentEmissionMonth(document.proposta);
    if (!month) continue;
    const proposal = resolveProposal(document.proposta);
    const payment = isRecord(proposal.pagamento) ? proposal.pagamento : {};
    const installments = Array.isArray(payment.parcelas) ? payment.parcelas.filter(isRecord) : [];
    const installment = matchingInstallment(row, installments, rowsPerDocument.get(key) ?? 0);
    if (!installment) continue;
    const installmentIndex = installments.indexOf(installment);
    const countedKey = `${key}#${installmentIndex}`;
    if (countedInstallments.has(countedKey)) continue;
    const total = sumInstallment(installment);
    if (total.usd <= 0 && total.brl <= 0) continue;
    countedInstallments.add(countedKey);
    matchedRows += 1;

    const monthly = byMonth.get(month) ?? {
      usd: 0,
      brl: 0,
      corretagemUsd: 0,
      corretagemBrl: 0,
      policies: new Set<string>(),
    };
    monthly.usd += total.usd;
    monthly.brl += total.brl;
    monthly.corretagemUsd += total.corretagemUsd;
    monthly.corretagemBrl += total.corretagemBrl;
    monthly.policies.add(row.numero_apolice);
    byMonth.set(month, monthly);

    const policy = byPolicy.get(row.numero_apolice) ?? {
      usd: 0,
      brl: 0,
      corretagemUsd: 0,
      corretagemBrl: 0,
    };
    policy.usd += total.usd;
    policy.brl += total.brl;
    policy.corretagemUsd += total.corretagemUsd;
    policy.corretagemBrl += total.corretagemBrl;
    byPolicy.set(row.numero_apolice, policy);
  }

  return { byMonth, byPolicy, eligibleRows, matchedRows };
}
