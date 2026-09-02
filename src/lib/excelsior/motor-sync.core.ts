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
  valor_total: number | null;
  /** A listagem por apólice usa parcela N para representar o endosso N - 1. */
  policy_installment_sequence: boolean;
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

/** Converte valores monetários tanto no formato da API quanto no formato pt-BR. */
export function normalizeBillingAmount(value: unknown): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  const text = normalizedText(value);
  if (!text || text === "-") return null;
  const normalized = /^-?\d{1,3}(\.\d{3})*,\d+$/.test(text)
    ? text.replace(/\./g, "").replace(",", ".")
    : text.replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

/** Canoniza sequenciais numéricos sem alterar identificadores alfanuméricos. */
export function normalizeBillingInstallmentNumber(value: unknown): string | null {
  const text = normalizedText(value);
  if (!text) return null;
  return /^\d+$/.test(text) ? text.replace(/^0+(?=\d)/, "") : text;
}

export function billingDocumentNumber(value: unknown): string | null {
  if (typeof value === "string" || typeof value === "number") {
    return normalizedText(value) || null;
  }
  if (!isJsonRecord(value)) return null;
  const document = firstValue(value, [
    "numero_documento",
    "documento",
    "numero_apolice",
    "apolice",
    "poliza",
    "numero_poliza",
  ]);
  return document === null ? null : normalizedText(document) || null;
}

/**
 * Identidade estável que permite persistir uma parcela vinda da listagem em
 * lote sem precisar consultar novamente o mesmo documento.
 */
export function billingInstallmentIdentity(value: unknown): string | null {
  if (!isJsonRecord(value)) return null;
  const explicit = firstValue(value, [
    "id_parcela",
    "parcela_id",
    "idParcela",
    "codigo_parcela",
    "identificador_pagamento",
    "identificador_pago",
    "identificador_de_pago",
    "id_pagamento",
    "payment_id",
    "id_parcela_seguradora",
    "numero_parcela",
    "sequencial_parcela",
    "numeroParcela",
    "parcela",
    "parcela_numero",
  ]);
  if (explicit !== null) return normalizedText(explicit) || null;

  const proposal = firstValue(value, ["numero_proposta"]);
  const dueDate = firstValue(value, ["data_vencimento"]);
  if (proposal === null || dueDate === null) return null;
  return `${normalizedText(proposal)}@${normalizedText(dueDate)}`;
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

export interface BillingRefreshPlan {
  /** Itens completos que a listagem de abertas já permite persistir. */
  directOpenItems: JsonRecord[];
  /** Únicos documentos que ainda exigem o endpoint individual. */
  detailDocuments: string[];
}

/**
 * Reduz o N+1 da cobrança sem sacrificar a identidade das parcelas:
 * - documentos novos com parcela identificável usam a própria lista em lote;
 * - documentos que saíram das abertas e aparecem nas quitadas já estão cobertos;
 * - somente respostas incompletas e mudanças não explicadas pedem detalhe.
 */
export function planBillingRefresh(
  currentOpen: unknown[],
  remoteOpen: unknown,
  remoteSettled: unknown,
): BillingRefreshPlan {
  const openByDocument = new Map<string, JsonRecord[]>();
  for (const item of flattenApiItems(remoteOpen)) {
    const document = billingDocumentNumber(item);
    if (!document) continue;
    const group = openByDocument.get(document);
    if (group) group.push(item);
    else openByDocument.set(document, [item]);
  }

  const settledDocuments = new Set<string>();
  for (const item of flattenApiItems(remoteSettled)) {
    const document = billingDocumentNumber(item);
    if (document) settledDocuments.add(document);
  }

  const directOpenItems: JsonRecord[] = [];
  const detailDocuments = new Set<string>();
  // Persistimos todas as parcelas identificáveis da listagem, inclusive quando
  // o documento já existia. Uma mesma apólice/endosso pode ganhar outra parcela
  // sem que o status agregado do documento mude; a persistência idempotente
  // elimina as linhas inalteradas sem perder essa inclusão.
  for (const [document, openItems] of openByDocument) {
    if (openItems.every((item) => billingInstallmentIdentity(item) !== null)) {
      directOpenItems.push(...openItems);
    } else {
      detailDocuments.add(document);
    }
  }

  for (const document of selectBillingDocumentsToRefresh(currentOpen, remoteOpen)) {
    const openItems = openByDocument.get(document);
    if (openItems?.length) {
      continue;
    }

    // A listagem Total já contém a atualização que fez o documento sair das
    // abertas. Consultamos o detalhe apenas para outras causas, como cancelamento.
    if (!settledDocuments.has(document)) detailDocuments.add(document);
  }

  return { directOpenItems, detailDocuments: [...detailDocuments] };
}

export function normalizeBillingResponse(
  value: unknown,
  options: { fallbackDocument?: string; defaultPaymentStatus: "Aberta" | "Total" },
): NormalizedBillingItem[] {
  return flattenApiItems(value).flatMap((item) => {
    const document = billingDocumentNumber(item) ?? options.fallbackDocument ?? null;
    if (!document) return [];

    const installmentId = firstValue(item, [
      "id_parcela",
      "parcela_id",
      "idParcela",
      "codigo_parcela",
      "identificador_pagamento",
      "identificador_pago",
      "identificador_de_pago",
      "id_pagamento",
      "payment_id",
    ]);
    const explicitNumber = firstValue(item, [
      "numero_parcela",
      "sequencial_parcela",
      "numeroParcela",
      "parcela",
      "parcela_numero",
      "parcela_ole",
    ]);
    const derivedIdentity =
      item.numero_proposta && item.data_vencimento
        ? `${String(item.numero_proposta)}@${String(item.data_vencimento)}`
        : null;

    const installmentNumber =
      explicitNumber !== null
        ? normalizeBillingInstallmentNumber(explicitNumber)
        : optionalText(installmentId ?? derivedIdentity);
    if (!installmentNumber) return [];
    const documentDigits = document.replace(/\D/g, "");
    const explicitEndorsement = firstValue(item, ["numero_endosso", "numero_endosso_seguradora"]);
    const explicitEndorsementDigits = normalizedText(explicitEndorsement).replace(/\D/g, "");
    const policyInstallmentSequence =
      documentDigits.length >= 6 &&
      documentDigits.endsWith("000000") &&
      (explicitEndorsement === null || explicitEndorsementDigits.endsWith("000000")) &&
      explicitNumber !== null &&
      /^\d+$/.test(normalizedText(explicitNumber));

    return [
      {
        numero_documento: document,
        numero_endosso: optionalText(item.numero_endosso ?? item.numero_endosso_seguradora),
        numero_parcela: installmentNumber,
        id_parcela: installmentId == null ? null : String(installmentId),
        numero_proposta: optionalText(item.numero_proposta),
        status_pagamento: normalizedText(
          item.situacao_quitacao ??
            item.status_pagamento ??
            item.quitacao ??
            item.status_quitacao ??
            options.defaultPaymentStatus,
        ),
        situacao_emissao: normalizedText(
          item.situacao_emissao ?? item.situacao ?? item.status_emissao ?? "Ativa",
        ),
        data_quitacao: optionalText(
          item.data_quitacao ?? item.data_pagamento ?? item.fecha_pago ?? item.fecha_pagamento,
        ),
        data_vencimento: optionalText(item.data_vencimento ?? item.fecha_vencimiento),
        valor_total: normalizeBillingAmount(
          item.valor_total ?? item.valorTotal ?? item.valor_parcela ?? item.valor_pago,
        ),
        policy_installment_sequence: policyInstallmentSequence,
      },
    ];
  });
}

export interface BillingPersistenceIdentity {
  numero_apolice: string;
  numero_endosso: string;
  numero_parcela: string;
}

/**
 * A listagem de quitadas da Excelsior pode devolver a apólice-base acompanhada
 * da parcela comercial (parcela 2 = endosso 000001). O detalhe por documento,
 * por outro lado, já traz o sequencial do endosso. Esta função unifica os dois
 * contratos antes da chave única do banco.
 */
export function billingPersistenceIdentity(
  item: Pick<
    NormalizedBillingItem,
    "numero_documento" | "numero_endosso" | "numero_parcela" | "policy_installment_sequence"
  >,
): BillingPersistenceIdentity | null {
  const digits = item.numero_documento.replace(/\D/g, "");
  if (digits.length < 12) return null;
  const numero_apolice = `${digits.slice(0, -6)}000000`;
  const explicitEndorsement = item.numero_endosso?.replace(/\D/g, "");
  let numero_endosso = explicitEndorsement
    ? explicitEndorsement.slice(-6).padStart(6, "0")
    : digits.slice(-6);
  let numero_parcela = normalizeBillingInstallmentNumber(item.numero_parcela);
  if (!numero_parcela) return null;

  if (item.policy_installment_sequence && /^\d+$/.test(numero_parcela)) {
    const commercialInstallment = Number.parseInt(numero_parcela, 10);
    if (commercialInstallment > 0 && commercialInstallment <= 10_001) {
      numero_endosso = String(commercialInstallment - 1).padStart(6, "0");
      numero_parcela = "1";
    }
  }

  return { numero_apolice, numero_endosso, numero_parcela };
}

function normalizedBillingStatus(value: string | null | undefined) {
  return (value ?? "").trim().toLocaleLowerCase("pt-BR");
}

/** Nunca deixa uma resposta de abertas rebaixar uma quitação já confirmada. */
export function shouldApplyBillingStatus(
  currentStatus: string | null | undefined,
  incomingStatus: string | null | undefined,
) {
  const current = normalizedBillingStatus(currentStatus);
  const incoming = normalizedBillingStatus(incomingStatus);
  if (current.startsWith("total") && incoming.startsWith("abert")) return false;
  return true;
}

export function dateOnlyInTimeZone(date: Date, timeZone = "America/Fortaleza") {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/**
 * Sobrepõe dois dias ao cursor e volta até a parcela aberta mais antiga (máximo
 * de 400 dias). Isso recupera notificações atrasadas sem reler toda a carteira.
 */
export function billingSettlementWindow(
  syncStartedAt: Date,
  previousFinishedAt: string | null,
  openDueDates: Array<string | null>,
) {
  const dayMs = 24 * 60 * 60 * 1_000;
  const floor = new Date(syncStartedAt.getTime() - 400 * dayMs);
  const candidates: Date[] = [];
  if (previousFinishedAt) {
    const previous = new Date(previousFinishedAt);
    if (!Number.isNaN(previous.getTime()))
      candidates.push(new Date(previous.getTime() - 2 * dayMs));
  } else {
    candidates.push(new Date(syncStartedAt.getTime() - 30 * dayMs));
  }
  for (const dueDate of openDueDates) {
    if (!dueDate) continue;
    const parsed = new Date(`${dueDate.slice(0, 10)}T12:00:00Z`);
    if (!Number.isNaN(parsed.getTime())) candidates.push(new Date(parsed.getTime() - 2 * dayMs));
  }
  const earliest = new Date(
    Math.max(floor.getTime(), Math.min(...candidates.map((d) => d.getTime()))),
  );
  return {
    start: dateOnlyInTimeZone(earliest),
    end: dateOnlyInTimeZone(syncStartedAt),
  };
}

/** Última atualização vence para a mesma parcela, como no payload final do n8n. */
export function dedupeBillingItems(items: NormalizedBillingItem[]) {
  const byInstallment = new Map<string, NormalizedBillingItem>();
  for (const item of items) {
    const document = item.numero_documento.replace(/\D/g, "") || item.numero_documento.trim();
    const identity =
      item.id_parcela ||
      normalizeBillingInstallmentNumber(item.numero_parcela) ||
      item.numero_parcela;
    byInstallment.set(`${document}#${identity}`, item);
  }
  return [...byInstallment.values()];
}
