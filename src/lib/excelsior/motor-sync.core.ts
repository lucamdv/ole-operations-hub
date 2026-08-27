export type JsonRecord = Record<string, unknown>;

export interface NormalizedBillingItem {
  numero_documento: string;
  numero_endosso: string | null;
  numero_parcela: string;
  id_parcela: string | null;
  numero_proposta: string | null;
  status_pagamento: string;
  situacao_emissao: string;
  data_quitacao: string | null;
  data_vencimento: string | null;
}

const ENVELOPE_KEYS = [
  "parcelas",
  "dados",
  "data",
  "items",
  "results",
  "apolices",
  "policies",
] as const;

export function isJsonRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

/**
 * Normaliza as variações de envelope observadas nas APIs da Excelsior.
 * O MOTOR antigo fazia o mesmo achatamento dentro dos nodes de código do n8n.
 */
export function flattenApiItems(value: unknown): JsonRecord[] {
  if (Array.isArray(value)) return value.flatMap(flattenApiItems);
  if (!isJsonRecord(value)) return [];

  for (const key of ENVELOPE_KEYS) {
    if (Array.isArray(value[key])) return flattenApiItems(value[key]);
  }
  return [value];
}

function firstValue(item: JsonRecord, keys: string[]): unknown {
  for (const key of keys) {
    const value = item[key];
    if (value !== undefined && value !== null && String(value).trim() !== "") return value;
  }
  return null;
}

function normalizedText(value: unknown): string {
  return String(value ?? "").trim();
}

function optionalText(value: unknown): string | null {
  const text = normalizedText(value);
  return text || null;
}

export function billingDocumentNumber(value: unknown): string | null {
  if (typeof value === "string" || typeof value === "number") {
    return normalizedText(value) || null;
  }
  if (!isJsonRecord(value)) return null;
  const document = firstValue(value, ["numero_documento", "documento", "numero_apolice"]);
  return document === null ? null : normalizedText(document) || null;
}

export function policyDocumentNumber(item: JsonRecord): string | null {
  const document = firstValue(item, [
    "numero_documento",
    "numero_apolice",
    "numero_apolice_seguradora",
  ]);
  return document === null ? null : normalizedText(document) || null;
}

export function extractBasePolicies(value: unknown): JsonRecord[] {
  return flattenApiItems(value).filter((item) => {
    const document = policyDocumentNumber(item);
    return !!document && document.replace(/\D/g, "").endsWith("000000");
  });
}

export function basePolicyNumber(item: JsonRecord): string | null {
  const raw = firstValue(item, ["numero_apolice", "numero_documento", "numero_apolice_seguradora"]);
  if (raw === null) return null;
  const digits = normalizedText(raw).replace(/\D/g, "");
  if (digits.length < 6) return null;
  return `${digits.slice(0, -6)}000000`;
}

export function buildEndorsementDocumentNumbers(policyNumber: string, lastEndorsement: unknown) {
  const digits = policyNumber.replace(/\D/g, "");
  if (digits.length < 6) throw new Error("Número de apólice inválido retornado pela Excelsior.");

  const parsed = Number.parseInt(String(lastEndorsement ?? 0).replace(/\D/g, ""), 10);
  const maximum = Number.isFinite(parsed) ? parsed : 0;
  if (maximum < 0 || maximum > 10_000) {
    throw new Error(`Sequencial de endosso fora do limite seguro: ${maximum}.`);
  }

  const prefix = digits.slice(0, -6);
  return Array.from(
    { length: maximum + 1 },
    (_, index) => `${prefix}${String(index).padStart(6, "0")}`,
  );
}

function normalizedEndorsementSequence(value: unknown) {
  const digits = String(value ?? "").replace(/\D/g, "");
  return digits ? digits.slice(-6).padStart(6, "0") : null;
}

/**
 * Retorna somente documentos ainda ausentes na plataforma. Além dos endossos
 * posteriores ao maior sequencial local, inclui lacunas antigas para reparar um
 * histórico eventualmente incompleto sem baixar novamente documentos existentes.
 */
export function selectMissingEndorsementDocuments(
  policyNumber: string,
  lastEndorsement: unknown,
  existingSequences: Iterable<unknown>,
) {
  const existing = new Set(
    [...existingSequences]
      .map(normalizedEndorsementSequence)
      .filter((value): value is string => value !== null),
  );
  return buildEndorsementDocumentNumbers(policyNumber, lastEndorsement).filter(
    (documentNumber) => !existing.has(documentNumber.slice(-6)),
  );
}

/** Converte a emissão bruta no contrato já aceito pela persistência da aplicação. */
export function normalizeEmissionDocument(
  value: unknown,
  fallbackPolicyNumber: string,
  fallbackDocumentNumber: string,
): JsonRecord {
  const outer = isJsonRecord(value) ? value : {};
  const root = isJsonRecord(outer.apolice)
    ? outer.apolice
    : isJsonRecord(outer.endosso)
      ? outer.endosso
      : outer;
  const fallbackEndorsement = fallbackDocumentNumber.replace(/\D/g, "").slice(-6);
  const rawPolicy = firstValue(root, ["numero_apolice_seguradora", "numero_apolice"]);
  const policyDigits = String(rawPolicy ?? fallbackPolicyNumber).replace(/\D/g, "");
  const canonicalPolicy =
    policyDigits.length >= 6 ? `${policyDigits.slice(0, -6)}000000` : fallbackPolicyNumber;
  const rawEndorsement = firstValue(root, ["numero_endosso_seguradora", "numero_endosso"]);
  const endorsementDigits = String(rawEndorsement ?? fallbackEndorsement).replace(/\D/g, "");

  return {
    numero_apolice_seguradora: canonicalPolicy,
    numero_endosso_seguradora: (endorsementDigits || fallbackEndorsement)
      .slice(-6)
      .padStart(6, "0"),
    premio_liquido: Number(root.premio_liquido ?? 0) || 0,
    proposta: isJsonRecord(root.proposta) ? root.proposta : root,
  };
}

interface BillingState {
  document: string;
  paymentStatus: string;
  issuanceStatus: string;
}

function billingState(value: unknown): BillingState | null {
  const document = billingDocumentNumber(value);
  if (!document) return null;
  const item = isJsonRecord(value) ? value : {};
  return {
    document,
    paymentStatus:
      normalizedText(item.situacao_quitacao ?? item.status_pagamento).toLowerCase() || "aberta",
    issuanceStatus: normalizedText(item.situacao_emissao).toLowerCase() || "ativa",
  };
}

/**
 * Replica o delta por documento do MOTOR: consulta documentos novos, alterados
 * ou que desapareceram da listagem filtrada de Aberta + Ativa.
 */
export function selectBillingDocumentsToRefresh(currentOpen: unknown[], remoteOpen: unknown) {
  const current = new Map<string, BillingState>();
  for (const value of currentOpen) {
    const state = billingState(value);
    if (state) current.set(state.document, state);
  }

  const remote = new Map<string, BillingState>();
  for (const value of flattenApiItems(remoteOpen)) {
    const state = billingState(value);
    if (state) remote.set(state.document, state);
  }

  const documents = new Set<string>();
  for (const [document, state] of remote) {
    const previous = current.get(document);
    if (
      !previous ||
      previous.paymentStatus !== state.paymentStatus ||
      previous.issuanceStatus !== state.issuanceStatus
    ) {
      documents.add(document);
    }
  }
  for (const document of current.keys()) {
    if (!remote.has(document)) documents.add(document);
  }
  return [...documents];
}

export function normalizeBillingResponse(
  value: unknown,
  options: { fallbackDocument?: string; defaultPaymentStatus: "Aberta" | "Total" },
): NormalizedBillingItem[] {
  return flattenApiItems(value).flatMap((item, index) => {
    const document = billingDocumentNumber(item) ?? options.fallbackDocument ?? null;
    if (!document) return [];

    const installmentId = firstValue(item, [
      "id_parcela",
      "parcela_id",
      "idParcela",
      "codigo_parcela",
    ]);
    const explicitNumber = firstValue(item, [
      "numero_parcela",
      "sequencial_parcela",
      "numeroParcela",
      "parcela",
      "parcela_numero",
    ]);
    const fallback =
      item.numero_proposta && item.data_vencimento
        ? `${String(item.numero_proposta)}@${String(item.data_vencimento)}`
        : String(index + 1);

    return [
      {
        numero_documento: document,
        numero_endosso: optionalText(item.numero_endosso ?? item.numero_endosso_seguradora),
        numero_parcela: String(explicitNumber ?? installmentId ?? fallback),
        id_parcela: installmentId == null ? null : String(installmentId),
        numero_proposta: optionalText(item.numero_proposta),
        status_pagamento: normalizedText(
          item.situacao_quitacao ?? item.status_pagamento ?? options.defaultPaymentStatus,
        ),
        situacao_emissao: normalizedText(item.situacao_emissao ?? "Ativa"),
        data_quitacao: optionalText(item.data_quitacao),
        data_vencimento: optionalText(item.data_vencimento),
      },
    ];
  });
}

/** Última atualização vence para a mesma parcela, como no payload final do n8n. */
export function dedupeBillingItems(items: NormalizedBillingItem[]) {
  const byInstallment = new Map<string, NormalizedBillingItem>();
  for (const item of items) {
    const identity = item.id_parcela || item.numero_parcela;
    byInstallment.set(`${item.numero_documento}#${identity}`, item);
  }
  return [...byInstallment.values()];
}
