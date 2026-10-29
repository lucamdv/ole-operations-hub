import { auditResultSummary, type AuditResultLike } from "@/lib/audit/result-summary";

/** Kept outside personalizable cards: incomplete coverage must always be disclosed. */
export function AuditCoverageNotice({ run }: { run: AuditResultLike }) {
  const summary = auditResultSummary(run);
  if (!summary.partial) return null;
  const raw = run.raw && typeof run.raw === "object" ? (run.raw as Record<string, unknown>) : {};
  const ignored = Array.isArray(raw.apolices_ignoradas)
    ? (raw.apolices_ignoradas as Array<{ apolice: string; motivo: string }>)
    : [];
  return (
    <section
      role="status"
      className="rounded-2xl border border-warning/30 bg-warning/10 px-5 py-4 text-sm"
    >
      <h2 className="font-semibold text-warning">Auditoria parcialmente concluída</h2>
      <p className="mt-1 text-muted-foreground">
        Os achados encontrados foram preservados. Apólice ignorada não é aprovada e sua ausência não
        comprova correção.
      </p>
      <dl aria-label="Escopo da auditoria" className="mt-3 flex flex-wrap gap-x-7 gap-y-2 text-xs">
        {[
          ["Efetivamente auditadas", summary.processed],
          ["Candidatas", summary.candidates],
          ["Excluídas", summary.excluded],
          ["Ignoradas", summary.ignored],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="mt-1 font-mono font-semibold">{value ?? "Não informado"}</dd>
          </div>
        ))}
      </dl>
      {ignored.length > 0 && (
        <details className="mt-3 text-xs">
          <summary className="cursor-pointer font-medium">Ver apólices ignoradas e motivos</summary>
          <ul className="mt-2 space-y-1">
            {ignored.map((policy) => (
              <li key={policy.apolice}>
                <span className="font-mono">{policy.apolice}</span> · {policy.motivo}
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}
