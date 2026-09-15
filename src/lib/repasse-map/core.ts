import { computeRepasse, REPASSE_RULES } from "../analytics/repasse-rules.ts";
import {
  billingDocumentNumber,
  billingInstallmentIdentity,
  flattenApiItems,
  isJsonRecord,
  type JsonRecord,
} from "../excelsior/motor-sync.core.ts";
import type { RepasseCell, RepasseCellValue, RepasseSheet, RepasseWorkbook } from "./types";

export const REPASSE_ANALYTIC_HEADERS = [
  "Num. Apólice",
  "Num. Proposta",
  "CPF Segurado",
  "Data Emissão",
  "Tipo Movimento",
  "Motivo Movimento",
  "Valor emitido (USD)",
  "Valor Pago (USD)",
  "Valor da corretagem (USD)",
  "% do prêmio referente ao corretor",
  "Data do pagamento",
  "Data de processamento do pagamento (Data que a Olé foi informada do pagamento)",
  "Data de reconhecimento da alocação de pagamento (data em que a Olé reconheceu o pagamento)",
] as const;

const CONTRACT_RULE_ROWS: RepasseCellValue[][] = [
  ["Conceito", "Valor", "Natureza", "Condições"],
  [
    "Remuneração da Olé ",
    0.2,
    "Custo de Aquisição",
    "Poderá ser majorado através da dedução de até 5% do fee Olé",
  ],
  [
    null,
    "30-35%",
    "Fee Olé",
    "Variável de acordo com o índice de sinistralidade (p. 42 e ss do Acordo Operacional)",
  ],
  [
    "Remuneração da Excelsior ",
    "5-10%",
    "Fee Exc",
    "Variável de acordo com o índice de sinistralidade (p. 42 e ss do Acordo Operacional); Mínimo mensal de USD 25,000. Durante o Piloto, o mínimo mensal é de USD 8,333,33.",
  ],
  [null, 0.1, "Retenção do risco", null],
  ["Remuneração da Munich", 0.9, "Cessão do risco", null],
  [
    "Sinistralidade",
    "-",
    "Cálculo de sinistralidade",
    '"O  “índice de sinistralidade” é definido como a razão entre o valor bruto dos sinistros ocorridos no período de avaliação e o prêmio bruto com provisões sobre o prêmio ganho" (item 2.8 do Anexo I do Acordo Op)',
  ],
  [
    null,
    "-",
    "Periodicidade do cálculo de sinistralidade",
    '"O índice de sinistralidade será apurado com periodicidade mensal, a partir do  7º mês da operação, observando-se os dados acumulados nos seis meses anteriores (m-1)." (item 3.1 do Anexo I do Acordo Op)',
  ],
  [
    null,
    "Até 40%",
    "Sinistralidade Referência",
    "Ultrapassar a sinistralidade referência pode autorizar a suspensão temporária de novas emissões de apólices, mediante a execução de um plano de contenção de sinistralidade. (item 4.2 do Anexo I do Acordo Op)",
  ],
  [
    null,
    null,
    "Nota 2026",
    "Condições herdadas do modelo anterior. Confirmar os parâmetros no contrato de 2026 antes do uso externo.",
  ],
];

export interface RepasseSourceRow {
  policyNumber: string;
  proposalNumber: string;
  insuredDocument: string;
  emissionDate: string;
  movementType: string;
  movementReason: string;
  emittedValue: number;
  paidValue: number;
  brokerageValue: number | null;
  brokeragePercentage: number | null;
  hasBroker: boolean;
  paymentDate: string;
}

const FORTALEZA_TIME_ZONE = "America/Fortaleza";
const FORTALEZA_DATE_FORMATTER = new Intl.DateTimeFormat("en", {
  timeZone: FORTALEZA_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function cell(value: RepasseCellValue, formula?: string): RepasseCell {
  return formula ? { value, formula } : { value };
}

function blankMatrix(rows: number, columns: number) {
  return Array.from({ length: rows }, () => Array.from({ length: columns }, () => cell(null)));
}

export function dateOnly(value: unknown): string | null {
  const fortalezaDate = (date: Date) => {
    const parts = FORTALEZA_DATE_FORMATTER.formatToParts(date);
    const part = (type: Intl.DateTimeFormatPartTypes) =>
      parts.find((item) => item.type === type)?.value;
    const year = part("year");
    const month = part("month");
    const day = part("day");
    return year && month && day ? `${year}-${month}-${day}` : null;
  };
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return fortalezaDate(value);
  }
  const text = String(value ?? "").trim();
  if (!text) return null;
  if (/^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:?\d{2})$/i.test(text)) {
    const parsed = new Date(text);
    if (!Number.isNaN(parsed.getTime())) return fortalezaDate(parsed);
  }
  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(text);
  if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;
  const br = /^(\d{2})\/(\d{2})\/(\d{4})/.exec(text);
  if (br) return `${br[3]}-${br[2]}-${br[1]}`;
  return null;
}

function normalizedText(value: unknown) {
  return String(value ?? "")
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function directValue(record: JsonRecord, keys: readonly string[]) {
  for (const key of keys) {
    const value = record[key];
    if (value !== undefined && value !== null && String(value).trim() !== "") return value;
  }
  return null;
}

function deepValue(value: unknown, keys: readonly string[], depth = 0): unknown {
  if (depth > 5) return null;
  if (isJsonRecord(value)) {
    const direct = directValue(value, keys);
    if (direct !== null) return direct;
    for (const child of Object.values(value)) {
      const found = deepValue(child, keys, depth + 1);
      if (found !== null) return found;
    }
    return null;
  }
  if (Array.isArray(value)) {
    for (const child of value) {
      const found = deepValue(child, keys, depth + 1);
      if (found !== null) return found;
    }
  }
  return null;
}

function deepScalarValue(value: unknown, keys: readonly string[], depth = 0): unknown {
  if (depth > 8) return null;
  if (isJsonRecord(value)) {
    for (const key of keys) {
      const candidate = value[key];
      if (
        (typeof candidate === "string" ||
          typeof candidate === "number" ||
          typeof candidate === "boolean") &&
        String(candidate).trim() !== ""
      ) {
        return candidate;
      }
    }
    for (const child of Object.values(value)) {
      const found = deepScalarValue(child, keys, depth + 1);
      if (found !== null) return found;
    }
    return null;
  }
  if (Array.isArray(value)) {
    for (const child of value) {
      const found = deepScalarValue(child, keys, depth + 1);
      if (found !== null) return found;
    }
  }
  return null;
}

function numericValue(value: unknown): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  const text = String(value ?? "").trim();
  if (!text || text === "-") return null;
  const normalized = /^-?\d{1,3}(\.\d{3})*,\d+$/.test(text)
    ? text.replace(/\./g, "").replace(",", ".")
    : text.replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function premiumCompositionSections(value: unknown, field: string) {
  const compositions: unknown[][] = [];
  const visit = (value: unknown, depth = 0) => {
    if (depth > 8) return;
    if (isJsonRecord(value)) {
      const composition = value[field];
      if (Array.isArray(composition)) compositions.push(composition);
      for (const child of Object.values(value)) visit(child, depth + 1);
    } else if (Array.isArray(value)) {
      for (const child of value) visit(child, depth + 1);
    }
  };
  visit(value);
  return compositions;
}

function amountFromComposition(record: JsonRecord) {
  const compositions = premiumCompositionSections(record, "composicao_premio_parcela");

  let total = 0;
  for (const composition of compositions) {
    for (const item of composition) {
      if (!isJsonRecord(item)) continue;
      const amount = numericValue(item.valor_premio) ?? 0;
      total += amount;
    }
  }
  return total;
}

function brokerageFromPremiumComposition(value: unknown) {
  for (const field of ["composicao_premio_cobertura", "composicao_premio_parcela"]) {
    let brokerage = 0;
    let hasBroker = false;
    for (const composition of premiumCompositionSections(value, field)) {
      for (const item of composition) {
        if (!isJsonRecord(item)) continue;
        if (normalizedText(item.tipo_premio) !== "comissao_corretagem") continue;
        hasBroker = true;
        brokerage +=
          numericValue(
            directValue(item, [
              "valor_premio",
              "valor_corretagem",
              "valor_comissao_corretagem",
              "valor",
            ]),
          ) ?? 0;
      }
    }
    if (hasBroker) return { hasBroker, brokerage };
  }
  return { hasBroker: false, brokerage: 0 };
}

function digits(value: unknown) {
  const normalized = String(value ?? "").replace(/\D/g, "");
  return normalized || null;
}

function identificationValue(value: unknown) {
  if (!isJsonRecord(value)) return null;
  return digits(
    directValue(value, [
      "valor_identificacao",
      "numero_documento",
      "documento",
      "valor",
      "cpf",
      "cpf_cnpj",
    ]),
  );
}

function insuredDocumentFrom(value: unknown, depth = 0): string | null {
  if (depth > 8) return null;
  if (Array.isArray(value)) {
    for (const child of value) {
      const found = insuredDocumentFrom(child, depth + 1);
      if (found) return found;
    }
    return null;
  }
  if (!isJsonRecord(value)) return null;

  const direct = digits(
    directValue(value, [
      "cpf_segurado",
      "cpf_cnpj_segurado",
      "documento_segurado",
      "documento_seg",
    ]),
  );
  if (direct) return direct;

  const role = normalizedText(directValue(value, ["papel_parte", "papel", "role"]));
  if (role === "segurado") {
    const partyDirect = digits(directValue(value, ["cpf", "cpf_cnpj", "documento"]));
    if (partyDirect) return partyDirect;

    const documents = [value.documentos_identificacao, value.documentos]
      .filter(Array.isArray)
      .flat() as unknown[];
    const cpf = documents.find(
      (document) =>
        isJsonRecord(document) &&
        normalizedText(
          directValue(document, ["tipo_identificacao", "tipo_documento", "tipo"]),
        ).includes("cpf"),
    );
    const preferred = identificationValue(cpf);
    if (preferred) return preferred;
    for (const document of documents) {
      const fallback = identificationValue(document);
      if (fallback) return fallback;
    }
  }

  for (const [key, child] of Object.entries(value)) {
    if (normalizedText(key) === "segurado" && isJsonRecord(child)) {
      const found = insuredDocumentFrom({ ...child, papel_parte: "SEGURADO" }, depth + 1);
      if (found) return found;
    }
  }
  for (const child of Object.values(value)) {
    const found = insuredDocumentFrom(child, depth + 1);
    if (found) return found;
  }
  return null;
}

function documentParts(documentNumber: string) {
  const digits = documentNumber.replace(/\D/g, "");
  const endorsement = digits.slice(-6).padStart(6, "0");
  return {
    policyNumber: digits.length >= 6 ? `${digits.slice(0, -6)}000000` : documentNumber,
    endorsement,
  };
}

/** Reconstrói o documento quando a cobrança separa apólice e sequencial de endosso. */
export function repasseBillingDocumentNumber(record: JsonRecord): string | null {
  const raw = billingDocumentNumber(record);
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 6) return raw;
  const endorsementRaw = deepValue(record, [
    "numero_endosso",
    "numero_endosso_seguradora",
    "sequencial_endosso",
  ]);
  const endorsementDigits = String(endorsementRaw ?? "").replace(/\D/g, "");
  const commercialInstallment = String(record.parcela_ole ?? "").replace(/\D/g, "");
  const endorsement = endorsementDigits
    ? endorsementDigits.slice(-6).padStart(6, "0")
    : digits.endsWith("000000") && commercialInstallment && Number(commercialInstallment) > 0
      ? String(Number(commercialInstallment) - 1).padStart(6, "0")
      : null;
  if (!endorsement) return raw;
  return `${digits.slice(0, -6)}${endorsement}`;
}

function sourcePaymentDate(record: JsonRecord) {
  return dateOnly(
    deepValue(record, [
      "data_quitacao",
      "data_pagamento",
      "data_do_pagamento",
      "data_processamento_pagamento",
    ]),
  );
}

export function filterEligibleBillingItems(response: unknown, start: string, end: string) {
  const received = flattenApiItems(response);
  const byInstallment = new Map<string, JsonRecord>();
  let ignoredOutsidePeriod = 0;
  const ignoredInactiveOrUnsettled = 0;

  for (const item of received) {
    const paymentDate = sourcePaymentDate(item);
    if (!paymentDate || paymentDate < start || paymentDate > end) {
      ignoredOutsidePeriod += 1;
      continue;
    }
    const document = repasseBillingDocumentNumber(item);
    if (!document) continue;
    const identity = billingInstallmentIdentity(item) ?? paymentDate;
    byInstallment.set(`${document}#${identity}`, item);
  }

  return {
    received,
    eligible: [...byInstallment.values()],
    ignoredOutsidePeriod,
    ignoredInactiveOrUnsettled,
  };
}

function repasseIdentityAliases(record: JsonRecord) {
  const document = repasseBillingDocumentNumber(record);
  if (!document) return [];
  const aliases = new Set<string>();
  const externalId = deepValue(record, [
    "id_parcela",
    "id_parcela_seguradora",
    "identificador_pagamento",
    "identificador_pago",
    "identificador_de_pago",
    "payment_id",
  ]);
  if (externalId !== null) aliases.add(`${document}#id:${String(externalId).trim()}`);
  const installment = deepValue(record, [
    "numero_parcela",
    "sequencial_parcela",
    "numeroParcela",
    "parcela",
    "parcela_numero",
  ]);
  if (installment !== null) aliases.add(`${document}#parcela:${String(installment).trim()}`);
  const proposal = deepValue(record, ["numero_proposta"]);
  const dueDate = dateOnly(deepValue(record, ["data_vencimento"]));
  if (proposal !== null && dueDate) {
    aliases.add(`${document}#proposta:${String(proposal).trim()}@${dueDate}`);
  }
  if (aliases.size === 0) {
    aliases.add(`${document}#quitacao:${sourcePaymentDate(record) ?? "sem-data"}`);
  }
  return [...aliases];
}

function mergeRecordMissingValues(fallback: JsonRecord, preferred: JsonRecord): JsonRecord {
  const result = { ...fallback };
  for (const [key, value] of Object.entries(preferred)) {
    if (value !== undefined && value !== null && String(value).trim() !== "") result[key] = value;
  }
  return result;
}

/** Une a API ao espelho local sem duplicar a mesma parcela; a resposta da API prevalece. */
export function mergeRepasseBillingItems(apiItems: JsonRecord[], databaseItems: JsonRecord[]) {
  const merged: JsonRecord[] = [];
  const indexByAlias = new Map<string, number>();
  const add = (item: JsonRecord) => {
    const index = merged.push(item) - 1;
    for (const alias of repasseIdentityAliases(item)) indexByAlias.set(alias, index);
    return index;
  };

  for (const item of apiItems) add(item);

  const databaseFallbackItems: JsonRecord[] = [];
  for (const item of databaseItems) {
    const aliases = repasseIdentityAliases(item);
    const existingIndex = aliases
      .map((alias) => indexByAlias.get(alias))
      .find((value) => value != null);
    if (existingIndex == null) {
      add(item);
      databaseFallbackItems.push(item);
      continue;
    }
    const combined = mergeRecordMissingValues(item, merged[existingIndex]!);
    merged[existingIndex] = combined;
    for (const alias of repasseIdentityAliases(combined)) indexByAlias.set(alias, existingIndex);
  }

  return {
    merged,
    databaseFallbackItems,
    databaseFallbackAdded: databaseFallbackItems.length,
  };
}

export function emissionDateFromDocument(value: unknown): string | null {
  if (!isJsonRecord(value)) return null;
  const direct = dateOnly(value.data_emissao);
  if (direct) return direct;
  for (const key of ["apolice", "endosso", "endosso_A", "endosso_B", "endosso_C", "endosso_D"]) {
    const child = value[key];
    if (!isJsonRecord(child)) continue;
    const date = dateOnly(child.data_emissao);
    if (date) return date;
    const nested = emissionDateFromDocument(child);
    if (nested) return nested;
  }
  return dateOnly(
    deepValue(value, ["data_emissao", "conclusao_subscricao", "assinatura", "registro_origem"]),
  );
}

export function repasseSourceRow(
  billing: JsonRecord,
  emissionResponse: unknown,
): RepasseSourceRow | null {
  const documentNumber = repasseBillingDocumentNumber(billing);
  const paymentDate = sourcePaymentDate(billing);
  if (!documentNumber || !paymentDate) return null;

  const { policyNumber, endorsement } = documentParts(documentNumber);
  const proposalKeys = ["numero_proposta", "numero_proposta_seguradora", "proposta"];
  const proposalNumber = String(
    deepScalarValue(billing, proposalKeys) ?? deepScalarValue(emissionResponse, proposalKeys) ?? "",
  ).trim();
  const insuredDocument =
    insuredDocumentFrom(billing) ?? insuredDocumentFrom(emissionResponse) ?? "";

  const compositionTotal = amountFromComposition(billing);
  const emittedValue =
    numericValue(
      deepValue(billing, [
        "valor_total",
        "valor_emitido",
        "valor_emissao",
        "premio_emitido",
        "premio_total",
        "valor_parcela",
      ]),
    ) ?? compositionTotal;
  const paidValue =
    numericValue(
      deepValue(billing, [
        "valor_total",
        "valor_pago",
        "valor_quitado",
        "valor_pagamento",
        "valor_recebido",
        "total_pago",
      ]),
    ) ?? emittedValue;
  const billingBrokerage = brokerageFromPremiumComposition(billing);
  const emissionBrokerage = brokerageFromPremiumComposition(emissionResponse);
  const brokerage = billingBrokerage.hasBroker ? billingBrokerage : emissionBrokerage;

  const movementType =
    String(deepValue(billing, ["tipo_movimento"]) ?? "").trim() ||
    (endorsement === "000000" ? "Emissão de Apólice" : "Emissão de Endosso");
  const explicitReason = String(deepValue(billing, ["motivo_movimento"]) ?? "").trim();
  const movementReason =
    explicitReason ||
    (endorsement === "000000" || !proposalNumber.startsWith("1009")
      ? "EMISSÃO APÓLICE"
      : "FATURA MENSAL");

  return {
    policyNumber,
    proposalNumber,
    insuredDocument,
    emissionDate: emissionDateFromDocument(emissionResponse) ?? "",
    movementType,
    movementReason,
    emittedValue,
    paidValue,
    brokerageValue: brokerage.hasBroker ? brokerage.brokerage : null,
    brokeragePercentage:
      brokerage.hasBroker && emittedValue > 0 ? brokerage.brokerage / emittedValue : null,
    hasBroker: brokerage.hasBroker,
    paymentDate,
  };
}

const SUMMARY_MONEY_ROWS = new Set([
  6, 7, 8, 11, 12, 13, 14, 15, 16, 19, 20, 21, 22, 25, 26, 27, 28, 30,
]);

function round(value: number) {
  return (Math.sign(value) * Math.round((Math.abs(value) + Number.EPSILON) * 100)) / 100;
}

function exactSummary(paid: number, brokerage: number) {
  const summary = computeRepasse(paid, brokerage);
  return {
    paid: summary.premioTotalPago,
    iof: summary.iof,
    liquid: summary.premioLiquidoIof,
    ole: summary.remuneracaoOle,
    acquisition: summary.custoAquisicao,
    commissions: summary.comissoesOle,
    pis: summary.pisCofins,
    totalOle: summary.totalRetencaoOle,
    excelsiorFee: summary.feeExcelsior,
    supplementary: summary.fixoSuplementar,
    loading: summary.carregamentoExcelsior,
    direct: summary.premioDireto,
    retained: summary.premioRetidoExcelsior,
    ceded: summary.premioCedidoMunich,
    brokerage: summary.premioRetidoCorretores,
    total: summary.excelsiorLiquido,
  };
}

function moneyCell(value: number, formula: string): RepasseCell {
  return cell(value, `ROUND(${formula},2)`);
}

function buildSummarySheet(rows: RepasseSourceRow[], start: string, end: string): RepasseSheet {
  const grid = blankMatrix(37, 8);
  const paid = rows.reduce((total, row) => total + row.paidValue, 0);
  const brokerage = rows.reduce((total, row) => total + (row.brokerageValue ?? 0), 0);
  const summary = exactSummary(paid, brokerage);

  grid[0]![1] = cell("MAPA DE REPASSE - EXCELSIOR PARA OLÉ");
  grid[1]![1] = cell("Competência:");
  grid[1]![2] = cell(`${formatDateBr(start)} a ${formatDateBr(end)}`);
  grid[2]![1] = cell("Emissor:");
  grid[2]![2] = cell("Excelsior");
  grid[3]![1] = cell("Receptor:");
  grid[3]![2] = cell("Olé");

  grid[5]![1] = cell("RESUMO FINANCEIRO - Valores expressos em USD (Dólar Americano)");
  grid[5]![2] = cell("VALOR");
  grid[5]![3] = cell("BASE DE CALCULO");
  grid[5]![4] = cell("DESCRIÇÃO");
  grid[6]![1] = cell("(+) Valor total dos prêmios faturados e pagos");
  grid[6]![2] = moneyCell(
    summary.paid,
    "SUM(Analitico_Dados!I3:I1048576,Analitico_Dados_Corretores!I3:I1048576)",
  );
  grid[6]![4] = cell("Valor total pago pelos clientes");
  grid[7]![1] = cell("(-) IOF");
  grid[7]![2] = moneyCell(-summary.iof, "C7*D8*-1");
  grid[7]![3] = cell(REPASSE_RULES.IOF_PCT);
  grid[7]![4] = cell("5.03% (0.38% IOF + 4.65% PIS/COFINS)");
  grid[8]![1] = cell("(=) Prêmio líquido de IOF");
  grid[8]![2] = moneyCell(summary.liquid, "$C$7-($C$8*-1)");

  grid[10]![1] = cell("TOTAL DE COMISSÕES E RETENÇÃO OLÉ");
  grid[11]![1] = cell("(=) Prêmio líquido de IOF");
  grid[11]![2] = moneyCell(summary.liquid, "C9");
  grid[11]![4] = cell("Prêmio Líquido de IOF");
  grid[12]![1] = cell("(-) Remuneração Olé (30 a 35%)");
  grid[12]![2] = moneyCell(-summary.ole, "C12*0.35*-1");
  grid[12]![3] = cell(REPASSE_RULES.FEE_OLE_PCT);
  grid[12]![4] = cell("Comissão Olé");
  grid[13]![1] = cell("(-) Custo de Aquisição (20 a 25%)");
  grid[13]![2] = moneyCell(-summary.acquisition, "($C$9*0.2) * -1");
  grid[13]![3] = cell(REPASSE_RULES.NOMAD_PCT);
  grid[13]![4] = cell("Comissão Canal de vendas");
  grid[14]![1] = cell("(=) Total de comissões Olé (50 a 55%)");
  grid[14]![2] = moneyCell(summary.commissions, "SUM(C13:C14)*-1");
  grid[14]![3] = cell(REPASSE_RULES.FEE_OLE_PCT + REPASSE_RULES.NOMAD_PCT, "SUM(D12:D14)");
  grid[14]![4] = cell("Valor total retido pela Olé");
  grid[15]![1] = cell("(-) PIS/COFINS Olé e Nomad");
  grid[15]![2] = moneyCell(-summary.pis, "C15*0.0465*-1");
  grid[15]![3] = cell("4,65%");
  grid[15]![4] = cell("PIS/COFINS sobre a soma de comissões de Olé e Nomad");
  grid[16]![1] = cell("(=) Total de retenção Olé");
  grid[16]![2] = moneyCell(summary.totalOle, "C15+C16");

  grid[18]![1] = cell("FEE EXCELSIOR");
  grid[19]![1] = cell("(=) Prêmio líquido de IOF");
  grid[19]![2] = moneyCell(summary.liquid, "C9");
  grid[20]![1] = cell("(-) Fee Excelsior (5 a 10%)");
  grid[20]![2] = moneyCell(-summary.excelsiorFee, "C9*D21*-1");
  grid[20]![3] = cell(REPASSE_RULES.FEE_EXCELSIOR_PCT);
  grid[21]![1] = cell("(=) Fixo Suplementar");
  grid[21]![2] = moneyCell(summary.supplementary, "8333.33-(C21*-1)");
  grid[21]![3] = cell("8.333,33 ");
  grid[21]![4] = cell(
    "Garantia mínima contratual (Diferença entre 8.333,33 e os 5% do Fee Excelsior)",
  );
  grid[22]![1] = cell("(=) Total de carregamento Excelsior");
  grid[22]![2] = moneyCell(summary.loading, "(C21*-1)+C22");
  grid[22]![4] = cell("Fee Excelsior + PIS/COFINS do Fee Excelsior + Fixo Suplementar");

  grid[24]![1] = cell("PRÊMIO DIRETO SEGURADORA E RESSEGURADORA");
  grid[25]![1] = cell("(=) Prêmio Direto (40% do prêmio líquido de IOF)");
  grid[25]![2] = moneyCell(summary.direct, "(C9)-(C15)-(C21*-1)+ C29");
  grid[25]![3] = cell(0.4);
  grid[26]![1] = cell("(-) Prêmio Retido Excelsior");
  grid[26]![2] = moneyCell(summary.retained, "$C$26*0.1");
  grid[26]![3] = cell(0.1);
  grid[27]![1] = cell("(-) Prêmio Cedido Munich RE");
  grid[27]![2] = moneyCell(summary.ceded, "$C$26*0.9");
  grid[27]![3] = cell(0.9);
  grid[28]![1] = cell("(-) Prêmio Retido Corretores");
  grid[28]![2] = moneyCell(summary.brokerage, "SUM(Analitico_Dados_Corretores!J3:J1048576)");

  grid[30]![1] = cell("Total do Repasse à Excelsior");
  grid[30]![2] = moneyCell(summary.total, "(C16*-1)+C23+C26");
  grid[30]![4] = cell(
    "Total (Comissões, Garantia Mínima, Impostos, Valores pendentes de PIS/COFINS e Prêmio Direto e Repasses Munich RE)",
  );

  grid[33]![1] = cell("Autor:");
  grid[33]![2] = cell("Luca Monteiro");
  grid[34]![1] = cell("Aprovador:");
  grid[34]![2] = cell("Olé Life");
  grid[35]![1] = cell("Status:");
  grid[35]![2] = cell("Em análise");

  return {
    id: "summary",
    name: "Capa_Resumo",
    rows: grid,
    columnWidths: [3, 67, 22, 20, 73, 19, 12, 16],
  };
}

function buildAnalyticSheet(
  rows: RepasseSourceRow[],
  options: { id: "analytic" | "brokerAnalytic"; name: string; title: string },
): RepasseSheet {
  const grid = blankMatrix(Math.max(43, rows.length + 2), 16);
  grid[0]![1] = cell(options.title);
  REPASSE_ANALYTIC_HEADERS.forEach((header, index) => {
    grid[1]![index + 1] = cell(header);
  });
  rows.forEach((row, index) => {
    const target = grid[index + 2]!;
    const values: RepasseCellValue[] = [
      row.policyNumber,
      row.proposalNumber,
      row.insuredDocument,
      row.emissionDate,
      row.movementType,
      row.movementReason,
      row.emittedValue,
      row.paidValue,
      row.brokerageValue ?? "-",
      row.brokeragePercentage ?? "-",
      row.paymentDate,
      row.paymentDate,
      row.paymentDate,
    ];
    values.forEach((value, column) => {
      target[column + 1] = cell(value);
    });
    if (row.hasBroker) {
      const excelRow = index + 3;
      target[10] = cell(row.brokeragePercentage, `IF(H${excelRow}=0,"",J${excelRow}/H${excelRow})`);
    }
  });
  return {
    id: options.id,
    name: options.name,
    rows: grid,
    columnWidths: [3, 33, 23, 16, 18, 23, 24, 18, 17, 27, 22, 19, 50, 50, 27, 37],
  };
}

function buildRulesSheet(): RepasseSheet {
  return {
    id: "rules",
    name: "Regras do Contrato2026",
    rows: CONTRACT_RULE_ROWS.map((row) => row.map((value) => cell(value))),
    columnWidths: [14, 11, 35, 59],
  };
}

export function buildRepasseWorkbook(
  rows: RepasseSourceRow[],
  period: { start: string; end: string },
): RepasseWorkbook {
  const brokerRows = rows.filter((row) => row.hasBroker);
  const regularRows = rows.filter((row) => !row.hasBroker);
  return {
    period,
    generatedAt: new Date().toISOString(),
    sourceRows: rows.length,
    sheets: [
      buildSummarySheet(rows, period.start, period.end),
      buildAnalyticSheet(regularRows, {
        id: "analytic",
        name: "Analitico_Dados",
        title:
          "DETALHAMENTO - Apólices e endossos sem comissão de corretagem que geraram movimento financeiro no período",
      }),
      buildAnalyticSheet(brokerRows, {
        id: "brokerAnalytic",
        name: "Analitico_Dados_Corretores",
        title:
          "DETALHAMENTO - Apólices e endossos com comissão de corretagem que geraram movimento financeiro no período",
      }),
      buildRulesSheet(),
    ],
  };
}

function numericCell(sheet: RepasseSheet, row: number, column: number) {
  return numericValue(sheet.rows[row]?.[column]?.value) ?? 0;
}

function setFormulaResult(sheet: RepasseSheet, row: number, column: number, value: number) {
  const target = sheet.rows[row]?.[column];
  if (target?.formula) target.value = value;
}

/** Atualiza os resultados visíveis sem restaurar fórmulas substituídas manualmente. */
export function recalculateRepasseWorkbook(
  workbook: RepasseWorkbook,
  clone = true,
): RepasseWorkbook {
  const copy = clone ? structuredClone(workbook) : workbook;
  const summary = copy.sheets.find((sheet) => sheet.id === "summary");
  const analyticSheets = copy.sheets.filter(
    (sheet) => sheet.id === "analytic" || sheet.id === "brokerAnalytic",
  );
  if (!summary || analyticSheets.length === 0) return copy;

  let paid = 0;
  let brokerage = 0;
  for (const analytic of analyticSheets) {
    for (let row = 2; row < analytic.rows.length; row++) {
      const emitted = numericCell(analytic, row, 7);
      const rowBrokerage = numericCell(analytic, row, 9);
      paid += numericCell(analytic, row, 8);
      if (analytic.id === "brokerAnalytic") brokerage += rowBrokerage;
      const percentage = analytic.rows[row]?.[10];
      if (percentage?.formula) percentage.value = emitted > 0 ? rowBrokerage / emitted : null;
    }
  }
  const values = exactSummary(paid, brokerage);
  setFormulaResult(summary, 6, 2, values.paid);
  setFormulaResult(summary, 7, 2, -values.iof);
  setFormulaResult(summary, 8, 2, values.liquid);
  setFormulaResult(summary, 11, 2, values.liquid);
  setFormulaResult(summary, 12, 2, -values.ole);
  setFormulaResult(summary, 13, 2, -values.acquisition);
  setFormulaResult(summary, 14, 2, values.commissions);
  setFormulaResult(summary, 15, 2, -values.pis);
  setFormulaResult(summary, 16, 2, values.totalOle);
  setFormulaResult(summary, 19, 2, values.liquid);
  setFormulaResult(summary, 20, 2, -values.excelsiorFee);
  setFormulaResult(summary, 21, 2, values.supplementary);
  setFormulaResult(summary, 22, 2, values.loading);
  setFormulaResult(summary, 25, 2, values.direct);
  setFormulaResult(summary, 26, 2, values.retained);
  setFormulaResult(summary, 27, 2, values.ceded);
  setFormulaResult(summary, 28, 2, values.brokerage);
  setFormulaResult(summary, 30, 2, values.total);
  return copy;
}

export function updateRepasseCell(
  workbook: RepasseWorkbook,
  sheetId: RepasseSheet["id"],
  rowIndex: number,
  columnIndex: number,
  value: RepasseCellValue,
) {
  const copy = structuredClone(workbook);
  const sheet = copy.sheets.find((item) => item.id === sheetId);
  const target = sheet?.rows[rowIndex]?.[columnIndex];
  if (!target) return workbook;
  target.value =
    sheetId === "summary" &&
    columnIndex === 2 &&
    SUMMARY_MONEY_ROWS.has(rowIndex) &&
    typeof value === "number"
      ? round(value)
      : value;
  delete target.formula;
  return sheetId === "analytic" || sheetId === "brokerAnalytic"
    ? recalculateRepasseWorkbook(copy, false)
    : copy;
}

export type RepasseStructureAction =
  | "addCell"
  | "removeCell"
  | "addRow"
  | "removeRow"
  | "addColumn"
  | "removeColumn"
  | "removeDocument";

export function repasseDocumentCount(workbook: RepasseWorkbook) {
  return workbook.sheets
    .filter((sheet) => sheet.id === "analytic" || sheet.id === "brokerAnalytic")
    .reduce(
      (count, sheet) =>
        count + sheet.rows.slice(2).filter((row) => String(row[1]?.value ?? "").trim()).length,
      0,
    );
}

/** Preserva as colunas financeiras e a estrutura contratual; só extensões podem ser removidas. */
export function editRepasseStructure(
  workbook: RepasseWorkbook,
  sheetId: RepasseSheet["id"],
  action: RepasseStructureAction,
  rowIndex: number,
  columnIndex: number,
): RepasseWorkbook {
  const copy = structuredClone(workbook);
  const sheet = copy.sheets.find((item) => item.id === sheetId);
  if (!sheet || !sheet.rows[rowIndex]?.[columnIndex]) return workbook;
  const analytic = sheetId === "analytic" || sheetId === "brokerAnalytic";
  const templateRows = sheetId === "summary" ? 37 : sheetId === "rules" ? 10 : 2;
  const templateColumns = sheetId === "summary" ? 8 : sheetId === "rules" ? 4 : 16;
  const blankRow = () => {
    const row = Array.from({ length: sheet.columnWidths.length }, () => cell(null));
    if (sheetId === "brokerAnalytic") row[10] = cell(null, 'IF(H3=0,"",J3/H3)');
    return row;
  };

  switch (action) {
    case "addCell": {
      const row = sheet.rows[rowIndex]!;
      const firstBlank = row.findIndex(
        (item, index) => index >= templateColumns && item.value === null,
      );
      if (firstBlank < 0) {
        if (sheet.columnWidths.length >= 32) return workbook;
        sheet.columnWidths.push(18);
        for (const item of sheet.rows) item.push(cell(null));
      }
      break;
    }
    case "removeCell":
      if (
        (columnIndex < templateColumns && rowIndex < templateRows) ||
        (analytic && rowIndex >= 2 && columnIndex === 1)
      )
        return workbook;
      sheet.rows[rowIndex]![columnIndex] = cell(null);
      break;
    case "addRow":
      if (sheet.rows.length >= 50_002) return workbook;
      sheet.rows.splice(analytic ? Math.max(2, rowIndex + 1) : sheet.rows.length, 0, blankRow());
      break;
    case "removeRow":
      if (rowIndex < templateRows) return workbook;
      sheet.rows.splice(rowIndex, 1);
      break;
    case "addColumn":
      if (sheet.columnWidths.length >= 32) return workbook;
      sheet.columnWidths.push(18);
      for (const row of sheet.rows) row.push(cell(null));
      break;
    case "removeColumn":
      if (columnIndex < templateColumns) return workbook;
      sheet.columnWidths.splice(columnIndex, 1);
      for (const row of sheet.rows) row.splice(columnIndex, 1);
      break;
    case "removeDocument": {
      if (!analytic || rowIndex < 2) return workbook;
      const document = String(sheet.rows[rowIndex]?.[1]?.value ?? "").trim();
      if (!document) return workbook;
      for (const item of copy.sheets.filter(
        (candidate) => candidate.id === "analytic" || candidate.id === "brokerAnalytic",
      )) {
        item.rows = [
          ...item.rows.slice(0, 2),
          ...item.rows.slice(2).filter((row) => String(row[1]?.value ?? "").trim() !== document),
        ];
      }
      break;
    }
  }

  // Linhas inseridas/removidas mudam o número Excel usado na fórmula do percentual.
  for (const item of copy.sheets.filter((candidate) => candidate.id === "brokerAnalytic")) {
    item.rows.forEach((row, index) => {
      if (index >= 2 && row[10]?.formula) {
        const excelRow = index + 1;
        row[10]!.formula = `IF(H${excelRow}=0,"",J${excelRow}/H${excelRow})`;
      }
    });
  }
  return recalculateRepasseWorkbook(copy, false);
}

export function formatRepasseCell(sheet: RepasseSheet, rowIndex: number, columnIndex: number) {
  const value = sheet.rows[rowIndex]?.[columnIndex]?.value;
  if (value === null || value === undefined) return "";
  if (typeof value !== "number") return value;
  if (
    (sheet.id === "analytic" || sheet.id === "brokerAnalytic") &&
    columnIndex === 10 &&
    rowIndex >= 2
  ) {
    return `${Math.round(value * 100)}%`;
  }
  if (sheet.id === "summary" && columnIndex === 2 && SUMMARY_MONEY_ROWS.has(rowIndex)) {
    return value.toFixed(2).replace(".", ",");
  }
  return String(value).replace(".", ",");
}

export function coerceRepasseEditedCell(
  sheet: RepasseSheet,
  rowIndex: number,
  columnIndex: number,
  input: string,
) {
  if (!input.trim()) return null;
  if (
    (sheet.id === "analytic" || sheet.id === "brokerAnalytic") &&
    columnIndex === 10 &&
    rowIndex >= 2
  ) {
    const percent = numericValue(input.replace("%", ""));
    return percent === null ? input : percent / 100;
  }
  if (
    ((sheet.id === "analytic" || sheet.id === "brokerAnalytic") &&
      rowIndex >= 2 &&
      [7, 8, 9].includes(columnIndex)) ||
    (sheet.id === "summary" && columnIndex === 2 && SUMMARY_MONEY_ROWS.has(rowIndex))
  ) {
    return numericValue(input) ?? input;
  }
  return coerceEditedCell(input, sheet.rows[rowIndex]?.[columnIndex]?.value ?? null);
}

export function coerceEditedCell(value: string, previous: RepasseCellValue): RepasseCellValue {
  if (value === "") return null;
  if (typeof previous === "number") return numericValue(value) ?? value;
  return value;
}

export function formatDateBr(value: string) {
  const [year, month, day] = value.split("-");
  return year && month && day ? `${day}/${month}/${year}` : value;
}

export function summaryPreview(workbook: RepasseWorkbook) {
  const summary = workbook.sheets.find((sheet) => sheet.id === "summary");
  const analyticSheets = workbook.sheets.filter(
    (sheet) => sheet.id === "analytic" || sheet.id === "brokerAnalytic",
  );
  if (analyticSheets.length === 0) return computeRepasse(0, 0);
  let paid = 0;
  let brokerage = 0;
  for (const analytic of analyticSheets) {
    for (let row = 2; row < analytic.rows.length; row++) {
      paid += numericCell(analytic, row, 8);
      if (analytic.id === "brokerAnalytic") brokerage += numericCell(analytic, row, 9);
    }
  }
  const calculated = computeRepasse(paid, brokerage);
  return summary
    ? {
        ...calculated,
        premioTotalPago: numericCell(summary, 6, 2),
        excelsiorLiquido: numericCell(summary, 30, 2),
      }
    : calculated;
}
