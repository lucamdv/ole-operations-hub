export interface AuditResultLike {
  status?: string | null;
  status_geral?: string | null;
  total_processado?: number | null;
  aprovados?: number | null;
  reprovados?: number | null;
  raw?: unknown;
}
const object = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
const count = (value: unknown): number | null =>
  typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : null;

/** Counts come from the stored callback, never guessed from findings or the portfolio. */
export function auditResultSummary(run: AuditResultLike) {
  const raw = object(run.raw);
  const summary = object(raw.resumo);
  const ignored = count(summary.total_ignoradas);
  const processed = run.total_processado ?? count(summary.total_processado) ?? 0;
  const candidates = count(summary.total_candidatas);
  const excluded = count(summary.total_excluidas);
  const unaccountedCoverage =
    candidates !== null && candidates !== processed + (excluded ?? 0) + (ignored ?? 0);
  const technicalError = run.status === "error" || raw.status === "error";
  const partial =
    !technicalError &&
    (run.status_geral?.toUpperCase() === "PARCIAL" ||
      raw.status_geral === "PARCIAL" ||
      unaccountedCoverage ||
      (ignored ?? 0) > 0 ||
      (Array.isArray(raw.apolices_ignoradas) && raw.apolices_ignoradas.length > 0));
  return {
    partial,
    technicalError,
    processed,
    candidates,
    excluded,
    ignored,
    waivedFindings: count(summary.achados_dispensados),
    approvalRate:
      !partial && !technicalError && processed > 0
        ? ((run.aprovados ?? 0) / processed) * 100
        : null,
  };
}

/** Failure in another engine must retain precedence over an incomplete audit warning. */
export function systemStatusPresentation(status?: {
  state: string;
  lastRunPartial?: boolean;
  approvalRate?: number | null;
}) {
  const state = status?.state ?? "operational";
  const partial = status?.lastRunPartial;
  const label =
    state === "down"
      ? "Sistema Instável"
      : partial
        ? "Auditoria parcial"
        : state === "operational"
          ? "Sistema Operacional"
          : "Sistema Degradado";
  const description =
    state === "down"
      ? `Falha técnica em uma das integrações.${partial ? " Auditoria também parcialmente concluída." : ""}`
      : partial
        ? "Auditoria parcialmente concluída; conformidade da carteira ainda não confirmada."
        : status?.approvalRate != null
          ? `Taxa de aprovação da última auditoria: ${status.approvalRate.toFixed(2)}%`
          : "Sem auditorias registradas";
  return { label, description };
}

/** Unknown/inconsistent results cannot prove that an absent finding was corrected. */
export function isCompleteAuditResult(run: AuditResultLike): boolean {
  const raw = object(run.raw);
  const summary = object(raw.resumo);
  const coverage = auditResultSummary(run);
  if (coverage.technicalError || raw.error || raw.error_message) return false;
  const coverageKeys = ["total_candidatas", "total_excluidas", "total_ignoradas"];
  if (
    coverageKeys.some((key) => summary[key] !== undefined) &&
    (coverage.candidates === null ||
      coverage.excluded === null ||
      coverage.ignored === null ||
      (run.total_processado ?? 0) + coverage.excluded + coverage.ignored !== coverage.candidates)
  )
    return false;
  return (
    run.status === "success" &&
    !auditResultSummary(run).partial &&
    ["SUCESSO", "ALERTA"].includes(run.status_geral?.toUpperCase() ?? "") &&
    count(run.aprovados) !== null &&
    count(run.reprovados) !== null &&
    count(run.total_processado) !== null &&
    run.aprovados! + run.reprovados! === run.total_processado
  );
}

export function auditCompletionNotice(run: AuditResultLike) {
  const summary = auditResultSummary(run);
  if (summary.technicalError)
    return {
      tone: "error" as const,
      title: "Falha na auditoria",
      description: "Falha técnica no processamento.",
    };
  if (summary.partial)
    return {
      tone: "warning" as const,
      title: "Auditoria parcialmente concluída",
      description: `${summary.processed} apólices efetivamente auditadas · ${summary.ignored === null ? "quantidade de ignoradas não informada" : `${summary.ignored} ignorada(s)`}. Achados preservados; a cobertura da auditoria está incompleta.`,
    };
  return {
    tone: "success" as const,
    title: "Auditoria concluída",
    description:
      (run.reprovados ?? 0) === 0
        ? `${summary.processed} apólices · todas em conformidade.`
        : `${run.reprovados} de ${summary.processed} com inconsistências.`,
  };
}
