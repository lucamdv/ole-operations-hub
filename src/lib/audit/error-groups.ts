export const AUDIT_ERROR_GROUPS = {
  PROPORCIONALIDADE: {
    codigo: "PROPORCIONALIDADE",
    nome: "Erros de proporcionalidade",
  },
  VIGENCIA: {
    codigo: "VIGENCIA",
    nome: "Erros de vigência",
  },
  LIMITE: {
    codigo: "LIMITE",
    nome: "Erros de limite",
  },
  PREMIO: {
    codigo: "PREMIO",
    nome: "Erros de prêmio",
  },
  OUTROS: {
    codigo: "OUTROS",
    nome: "Outros erros",
  },
} as const;

export type AuditErrorGroupCode = keyof typeof AUDIT_ERROR_GROUPS;

export const AUDIT_ERROR_GROUP_ORDER: readonly AuditErrorGroupCode[] = [
  "PROPORCIONALIDADE",
  "VIGENCIA",
  "LIMITE",
  "PREMIO",
  "OUTROS",
];

const ERROR_TYPES_BY_GROUP: Record<AuditErrorGroupCode, readonly string[]> = {
  PROPORCIONALIDADE: [
    "PROPORÇÃO DE PRÊMIO DIRETO INCORRETA",
    "MARGEM DE SERVIÇO CONTRATUAL INCORRETA",
    "SOMA DE INTERMEDIAÇÃO INCORRETA",
    "ADMINISTRAÇÃO ABAIXO DO MÍNIMO",
    "COMISSÃO DE CORRETAGEM BAIXA",
    "TAXA DE ADMINISTRAÇÃO INCORRETA",
    "TAXA DE DISTRIBUIÇÃO INCORRETA",
    "MARGEM DE SERVIÇO ADICIONAL INCORRETA",
  ],
  VIGENCIA: ["DUPLICIDADE DE VIGÊNCIA", "GAP DE DIA", "COBERTURA INATIVA"],
  LIMITE: ["LIMITE DE COBERTURA INVÁLIDO"],
  PREMIO: ["VARIAÇÃO DE PRÊMIO", "PRÊMIO FORA DO PADRÃO"],
  OUTROS: [],
};

function normalizeErrorType(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, " ");
}

const ERROR_TYPE_GROUP = new Map<string, AuditErrorGroupCode>(
  AUDIT_ERROR_GROUP_ORDER.flatMap((groupCode) =>
    ERROR_TYPES_BY_GROUP[groupCode].map((errorType) => [
      normalizeErrorType(errorType),
      groupCode,
    ]),
  ),
);

export function classifyAuditError(errorType: string) {
  const normalized = normalizeErrorType(errorType);
  const exactGroup = ERROR_TYPE_GROUP.get(normalized);
  if (exactGroup) return AUDIT_ERROR_GROUPS[exactGroup];

  // Fallbacks mantêm tipos novos agrupados até a taxonomia ser atualizada explicitamente.
  if (/VIGENCIA|COBERTURA INATIVA|GAP DE DIA/.test(normalized)) {
    return AUDIT_ERROR_GROUPS.VIGENCIA;
  }
  if (/LIMITE/.test(normalized)) return AUDIT_ERROR_GROUPS.LIMITE;
  if (
    /PROPORCAO|TAXA|ADMINISTRACAO|DISTRIBUICAO|MARGEM|INTERMEDIACAO|CORRETAGEM/.test(
      normalized,
    )
  ) {
    return AUDIT_ERROR_GROUPS.PROPORCIONALIDADE;
  }
  if (/PREMIO/.test(normalized)) return AUDIT_ERROR_GROUPS.PREMIO;
  return AUDIT_ERROR_GROUPS.OUTROS;
}
