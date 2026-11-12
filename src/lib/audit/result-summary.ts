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

export function isAuditContractV3(run: AuditResultLike): boolean {
  return object(run.raw).audit_contract_version === 3;
}

/** Counts come from the stored callback, never guessed from findings or the portfolio. */
export function auditResultSummary(run: AuditResultLike) {
  const raw = object(run.raw);
  const summary = object(raw.resumo);
  const contractV3 = raw.audit_contract_version === 3;
  const ignored = count(summary.total_ignoradas);
  const processedCount = count(run.total_processado ?? summary.total_processado);
  const processed = processedCount ?? 0;
  const approved = count(run.aprovados ?? summary.aprovados);
  const rejected = count(run.reprovados ?? summary.reprovados);
  const candidates = count(summary.total_candidatas);
  const excluded = count(summary.total_excluidas);
  const dispensed = contractV3 ? count(summary.total_dispensadas) : null;
  const unaccountedCoverage =
    candidates !== null &&
    candidates !== processed + (excluded ?? 0) + (dispensed ?? 0) + (ignored ?? 0);
  const invalidV3Coverage =
    contractV3 &&
    (candidates === null ||
      excluded === null ||
      dispensed === null ||
      ignored === null ||
      processedCount === null ||
      approved === null ||
      rejected === null ||
      approved + rejected !== processed);
  const technicalError = run.status === "error" || raw.status === "error";
  const partial =
    !technicalError &&
    run.status !== "running" &&
    (run.status_geral?.toUpperCase() === "PARCIAL" ||
      raw.status_geral === "PARCIAL" ||
      unaccountedCoverage ||
      invalidV3Coverage ||
      (ignored ?? 0) > 0 ||
      (Array.isArray(raw.apolices_ignoradas) && raw.apolices_ignoradas.length > 0));
  return {
    contractV3,
    partial,
    technicalError,
    processed,
    rejected,
    candidates,
    excluded,
    dispensed,
    ignored,
    hasCoverageCounters: contractV3 || candidates !== null || excluded !== null || ignored !== null,
    waivedFindings: count(summary.achados_dispensados),
    approvalRate:
      !partial && !technicalError && processed > 0 ? ((approved ?? 0) / processed) * 100 : null,
  };
}

/** Failure in another engine must retain precedence over an incomplete audit warning. */
export function systemStatusPresentation(status?: {
  state: string;
  lastRunPartial?: boolean;
  lastRunStatus?: string | null;
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
          : status?.lastRunStatus === "success"
            ? "Nenhuma apólice auditada na última execução."
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
    !coverage.contractV3 &&
    coverageKeys.some((key) => summary[key] !== undefined) &&
    (coverage.candidates === null ||
      coverage.excluded === null ||
      coverage.ignored === null ||
      (run.total_processado ?? 0) + coverage.excluded + coverage.ignored !== coverage.candidates)
  )
    return false;
  return (
    run.status === "success" &&
    !coverage.partial &&
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
  const coverageCounts = [
    [summary.candidates, "candidatas"],
    [summary.excluded, "excluídas por status"],
    [summary.dispensed, "dispensadas por exceção integral"],
  ]
    .filter(([value]) => value !== null)
    .map(([value, label]) => `${value} ${label}`);
  const ignored =
    summary.ignored === null
      ? "quantidade de ignoradas não informada"
      : `${summary.ignored} ignoradas por falha`;
  if (summary.partial)
    return {
      tone: "warning" as const,
      title: "Auditoria parcialmente concluída",
      description: `${[`${summary.processed} apólices efetivamente auditadas`, ...coverageCounts, ignored].join(" · ")}. Achados preservados. A cobertura da auditoria está incompleta.`,
    };
  const rejected = summary.rejected ?? 0;
  const result =
    summary.processed === 0
      ? "Nenhuma apólice foi auditada"
      : rejected === 0
        ? `${summary.processed} apólices auditadas · todas em conformidade`
        : `${rejected} de ${summary.processed} auditadas com inconsistências`;
  return {
    tone: "success" as const,
    title: "Auditoria concluída",
    description: `${[result, ...coverageCounts, ...(summary.ignored !== null ? [ignored] : [])].join(" · ")}.`,
  };
}
