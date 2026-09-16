import { POLICY_STATUSES, policyStatusClass, type PolicyStatus } from "@/lib/policies/status";
import { cn } from "@/lib/utils";

export function PolicyStatusFilters({
  statuses,
  onToggleStatus,
  onClearStatuses,
  sort,
  onSort,
  sortOptions,
}: {
  statuses: PolicyStatus[];
  onToggleStatus: (status: PolicyStatus) => void;
  onClearStatuses: () => void;
  sort: string;
  onSort: (value: string) => void;
  sortOptions: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={onClearStatuses}
          className={cn(
            "inline-flex items-center rounded-md border px-2 py-1 font-mono text-[10.5px] font-semibold transition",
            statuses.length === 0
              ? "border-primary/40 bg-primary/10 text-primary"
              : "border-border bg-surface text-muted-foreground hover:text-foreground",
          )}
        >
          TODAS
        </button>
        {POLICY_STATUSES.map((status) => {
          const active = statuses.includes(status);
          return (
            <button
              key={status}
              type="button"
              onClick={() => onToggleStatus(status)}
              className={cn(
                "inline-flex items-center rounded-md border px-2 py-1 font-mono text-[10.5px] font-semibold transition",
                active
                  ? policyStatusClass(status)
                  : "border-border bg-surface text-muted-foreground hover:text-foreground",
              )}
            >
              {status}
            </button>
          );
        })}
      </div>

      <label className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <span className="uppercase tracking-wider">Ordenar</span>
        <select
          value={sort}
          onChange={(event) => onSort(event.target.value)}
          className="h-8 rounded-md border border-border bg-surface px-2 text-[11.5px] text-foreground outline-none focus:border-primary/40"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
