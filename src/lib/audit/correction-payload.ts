import { normalizeFinding } from "./derive";
import type { AuditFindingRow } from "./types";

export interface IncorrectFieldReport {
  campo: string;
  valor_incorreto: unknown;
  valor_correto: unknown;
  regra?: string | null;
}

export interface AuditCorrectionOccurrence {
  id_ocorrencia: string;
  tipo_erro: string;
  documento_problematico: {
    tipo: "endosso" | "apolice";
    numero: string;
  };
  relatorio_problema: {
    descricao: string;
    campos_incorretos: IncorrectFieldReport[];
    vigencia: {
      data_inicio: string | null;
      data_fim: string | null;
    };
    dados_auditoria: Record<string, unknown>;
  };
}

export interface AuditCorrectionPolicy {
  numero_apolice: string;
  erros: AuditCorrectionOccurrence[];
}

export interface AuditCorrectionPayload {
  evento: "SOLICITAR_CORRECAO_AUDITORIA";
  versao: 1;
  origem: "ole-copilot";
  solicitado_em: string;
  solicitado_por: string;
  auditoria: { run_id: string };
  total_apolices: number;
  total_ocorrencias: number;
  apolices: AuditCorrectionPolicy[];
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function nonEmpty(value: unknown): unknown | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "string") return value.trim() || null;
  return value;
}

function firstValue(record: Record<string, unknown>, keys: string[]): unknown | null {
  for (const key of keys) {
    const value = nonEmpty(record[key]);
    if (value !== null) return value;
  }
  return null;
}

function explicitIncorrectFields(details: Record<string, unknown>): IncorrectFieldReport[] {
  const source = details.campos_incorretos ?? details.campos_errados ?? details.incorrect_fields;
  const rows = Array.isArray(source) ? source : source ? [source] : [];

  return rows.flatMap((raw, index) => {
    const row = asRecord(raw);
    const current = firstValue(row, [
      "valor_incorreto",
      "valor_atual",
      "valor_encontrado",
      "encontrado",
      "actual",
    ]);
    const expected = firstValue(row, ["valor_correto", "valor_esperado", "esperado", "expected"]);
    if (current === null && expected === null) return [];

    return [
      {
        campo: String(
          firstValue(row, ["campo", "nome_campo", "field", "nome"]) ?? `campo_${index + 1}`,
        ),
        valor_incorreto: current,
        valor_correto: expected,
        regra: String(firstValue(row, ["regra", "criterio", "rule"]) ?? "") || null,
      },
    ];
  });
}

function inferredIncorrectFields(description: string): IncorrectFieldReport[] {
  const directPremium = description.match(
    /(?:o\s+)?pr[eê]mio\s+direto\s*\(USD\s*([\d.,]+)\)\s+difere\s+do\s+esperado\s*\(USD\s*([\d.,]+)\s*-\s*([^)]+)\)/i,
  );
  if (directPremium) {
    return [
      {
        campo: "Prêmio Direto",
        valor_incorreto: `USD ${directPremium[1]}`,
        valor_correto: `USD ${directPremium[2]}`,
        regra: directPremium[3].trim(),
      },
    ];
  }

  const intermediation = description.match(
    /soma\s+de\s+(.+?)\s*\(USD\s*([\d.,]+)\)\s+n[aã]o\s+corresponde\s+a\s+(.+?)\s*\(USD\s*([\d.,]+)\)/i,
  );
  if (intermediation) {
    return [
      {
        campo: `Soma de ${intermediation[1].trim()}`,
        valor_incorreto: `USD ${intermediation[2]}`,
        valor_correto: `USD ${intermediation[4]}`,
        regra: intermediation[3].trim(),
      },
    ];
  }

  const outOfRange = description.match(
    /pr[eê]mio\s+na\s+cobertura\s+'([^']+)'.*?resultou\s+em\s+USD\s*([\d.,]+).*?m[ií]n:\s*USD\s*([\d.,]+)\s*\/\s*m[aá]x:\s*USD\s*([\d.,]+)/i,
  );
  if (outOfRange) {
    return [
      {
        campo: `Prêmio da cobertura ${outOfRange[1]}`,
        valor_incorreto: `USD ${outOfRange[2]}`,
        valor_correto: `Entre USD ${outOfRange[3]} e USD ${outOfRange[4]}`,
        regra: "Margem permitida para o prêmio da cobertura",
      },
    ];
  }

  const inactiveCoverage = description.match(
    /a\s+'([^']+)'\s+no\s+.*?n[aã]o\s+est[aá]\s+ativa.*?per[ií]odo\s+coberto.*?de\s+(\d{2}\/\d{2}\/\d{4})\s+a\s+(\d{2}\/\d{2}\/\d{4})/i,
  );
  if (inactiveCoverage) {
    return [
      {
        campo: `Vigência da cobertura ${inactiveCoverage[1]}`,
        valor_incorreto: `${inactiveCoverage[2]} a ${inactiveCoverage[3]}`,
        valor_correto: "Cobertura ativa na data da correção",
        regra: "A cobertura vigente deve incluir a data atual",
      },
    ];
  }

  return [];
}

export function buildProblemReport(finding: AuditFindingRow) {
  const details = asRecord(finding.detalhes);
  const normalized = normalizeFinding(finding);
  const description =
    normalized.motivo || normalized.detalhe || "Inconsistência detectada pela auditoria";
  const explicit = explicitIncorrectFields(details);

  return {
    descricao: description,
    campos_incorretos: explicit.length > 0 ? explicit : inferredIncorrectFields(description),
    vigencia: {
      data_inicio: finding.data_inicio,
      data_fim: finding.data_fim,
    },
    dados_auditoria: details,
  };
}

export function buildAuditCorrectionPayload(input: {
  runId: string;
  requestedBy: string;
  requestedAt?: string;
  findings: AuditFindingRow[];
}): AuditCorrectionPayload {
  const grouped = new Map<string, AuditCorrectionOccurrence[]>();

  for (const finding of input.findings) {
    const normalized = normalizeFinding(finding);
    const documentNumber = normalized.endosso || finding.apolice;
    const errors = grouped.get(finding.apolice) ?? [];
    errors.push({
      id_ocorrencia: finding.id,
      tipo_erro: finding.tipo_erro,
      documento_problematico: {
        tipo: normalized.endosso ? "endosso" : "apolice",
        numero: documentNumber,
      },
      relatorio_problema: buildProblemReport(finding),
    });
    grouped.set(finding.apolice, errors);
  }

  const apolices = Array.from(grouped.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([numero_apolice, erros]) => ({ numero_apolice, erros }));

  return {
    evento: "SOLICITAR_CORRECAO_AUDITORIA",
    versao: 1,
    origem: "ole-copilot",
    solicitado_em: input.requestedAt ?? new Date().toISOString(),
    solicitado_por: input.requestedBy,
    auditoria: { run_id: input.runId },
    total_apolices: apolices.length,
    total_ocorrencias: input.findings.length,
    apolices,
  };
}
