import { auditResultSummary, type AuditResultLike } from "@/lib/audit/result-summary";
import type { AuditPayload } from "@/lib/audit/types";

/** Kept outside personalizable cards: incomplete coverage must always be disclosed. */
export function AuditCoverageNotice({ run }: { run: AuditResultLike }) {
  const summary = auditResultSummary(run);
  if (summary.technicalError || (!summary.partial && !summary.hasCoverageCounters)) return null;
  const raw = run.raw as AuditPayload | null | undefined;
  const counts = [
    { label: "Candidatas", value: summary.candidates },
    { label: "Excluídas por status", value: summary.excluded },
    ...(summary.contractV3
      ? [{ label: "Dispensadas por exceção integral", value: summary.dispensed }]
      : []),
    { label: "Efetivamente auditadas", value: summary.processed },
    { label: "Ignoradas por falha", value: summary.ignored },
  ];
  const lists = [
    { label: "Ver apólices ignoradas e motivos", policies: raw?.apolices_ignoradas },
    { label: "Ver apólices dispensadas e motivos", policies: raw?.apolices_dispensadas },
  ];
  return (
    <section
      role={summary.partial ? "status" : undefined}
      className={`rounded-2xl border px-5 py-4 text-sm ${summary.partial ? "border-warning/30 bg-warning/10" : "border-border bg-surface-2"}`}
    >
      <h2 className={`font-semibold ${summary.partial ? "text-warning" : ""}`}>
        {summary.partial ? "Auditoria parcialmente concluída" : "Cobertura da auditoria"}
      </h2>
      {summary.partial && (
        <p className="mt-1 text-muted-foreground">
          Os achados encontrados foram preservados. A ausência de achados em apólice ignorada não
          comprova correção.
        </p>
      )}
      <dl aria-label="Escopo da auditoria" className="mt-3 flex flex-wrap gap-x-7 gap-y-2 text-xs">
        {counts.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="mt-1 font-mono font-semibold">{value ?? "Não informado"}</dd>
          </div>
        ))}
      </dl>
      {lists.map(({ label, policies }) =>
        Array.isArray(policies) && policies.length > 0 ? (
          <details key={label} className="mt-3 text-xs">
            <summary className="cursor-pointer font-medium">{label}</summary>
            <ul className="mt-2 space-y-1">
              {policies.map((policy) => (
                <li key={policy.apolice}>
                  <span className="font-mono">{policy.apolice}</span> ·{" "}
                  {policy.motivo ?? "Motivo não informado"}
                </li>
              ))}
            </ul>
          </details>
        ) : null,
      )}
    </section>
  );
}
