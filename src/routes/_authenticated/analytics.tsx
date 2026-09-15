import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, CircleDollarSign, FolderKanban, RefreshCw } from "lucide-react";
import { useMemo, useState } from "react";
import { CompareChartsDialog } from "@/components/analytics/compare-dialog";
import {
  CorrectionHistogram,
  FinancialHealthPanel,
  IssuancesChart,
  RecurrencePanel,
  RepasseChart,
  type AnalyticsCategory,
} from "@/components/analytics/dashboard-charts";
import { DateRangeFilter } from "@/components/analytics/date-range-filter";
import { useAnalyticsAggregates } from "@/hooks/use-analytics";
import { useKpiTargets } from "@/hooks/use-kpi-targets";
import { useOperationKpis } from "@/hooks/use-operation-kpis";
import { DEFAULT_RANGE, resolveRange, type DateRangeState } from "@/lib/analytics/date-filter";
import { fortalezaDateKey } from "@/lib/kpis/derive";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics · OLÉ COPILOT" },
      {
        name: "description",
        content: "Inteligência operacional e financeira da carteira.",
      },
    ],
  }),
  component: AnalyticsPage,
});

function monthPeriod(month: string) {
  const [year, monthNumber] = month.split("-").map(Number);
  const safeYear = year || new Date().getFullYear();
  const safeMonth = monthNumber || new Date().getMonth() + 1;
  return {
    granularity: "month" as const,
    startDate: `${safeYear}-${String(safeMonth).padStart(2, "0")}-01`,
    endDate: new Date(Date.UTC(safeYear, safeMonth, 0)).toISOString().slice(0, 10),
  };
}

function AnalyticsPage() {
  const { targets } = useKpiTargets();
  const [category, setCategory] = useState<AnalyticsCategory>("operational");
  const [range, setRange] = useState<DateRangeState>(DEFAULT_RANGE);
  const [recurrenceMonth, setRecurrenceMonth] = useState(() => fortalezaDateKey().slice(0, 7));
  const bounds = useMemo(() => resolveRange(range), [range]);
  const recurrencePeriod = useMemo(() => monthPeriod(recurrenceMonth), [recurrenceMonth]);
  const aggregatesQuery = useAnalyticsAggregates(targets.inadimplenciaDias);
  const operationQuery = useOperationKpis(targets.resolucaoSlaHoras, recurrencePeriod);

  if (aggregatesQuery.isLoading && !aggregatesQuery.data) return <AnalyticsLoading />;

  if (aggregatesQuery.isError || !aggregatesQuery.data) {
    return (
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="panel flex min-h-72 flex-col items-center justify-center p-8 text-center">
          <BarChart3 className="mb-3 h-8 w-8 text-destructive" />
          <h1 className="text-[15px] font-semibold">Não foi possível carregar o Analytics</h1>
          <p className="mt-1 max-w-lg text-[12px] text-muted-foreground">
            {(aggregatesQuery.error as Error | undefined)?.message ??
              "Ocorreu uma falha ao consolidar os dados da carteira."}
          </p>
          <button
            type="button"
            onClick={() => aggregatesQuery.refetch()}
            className="mt-4 inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-[12px] font-medium text-primary-foreground"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  const aggregates = aggregatesQuery.data;

  return (
    <div className="mx-auto w-full max-w-[1320px] space-y-6">
      <header className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <h1 className="page-title">Analytics</h1>
            <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary">
              BI · LIVE
            </span>
          </div>
          <p className="page-subtitle max-w-2xl">
            Uma leitura objetiva da consistência operacional e da saúde financeira da carteira.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CompareChartsDialog />
          <DateRangeFilter value={range} onChange={setRange} />
        </div>
      </header>

      <div>
        <div
          role="tablist"
          aria-label="Categorias do Analytics"
          className="relative z-10 flex items-end gap-1 pl-3 sm:pl-5"
        >
          <FolderTab
            active={category === "operational"}
            icon={<FolderKanban className="h-3.5 w-3.5" />}
            label="Operacional"
            tone="operational"
            onClick={() => setCategory("operational")}
          />
          <FolderTab
            active={category === "financial"}
            icon={<CircleDollarSign className="h-3.5 w-3.5" />}
            label="Financeiro"
            tone="financial"
            onClick={() => setCategory("financial")}
          />
        </div>

        <div className="relative -mt-px rounded-3xl border border-border bg-surface-2/25 p-3 shadow-sm sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-border/70 pb-4">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Pasta {category === "operational" ? "operacional" : "financeira"}
              </div>
              <p className="mt-1 text-[11.5px] text-muted-foreground">
                {category === "operational"
                  ? "Consistência das auditorias, correções e cadência das emissões."
                  : "Exposição de cobrança e composição dos repasses realizados."}
              </p>
            </div>
            {aggregatesQuery.isFetching ? (
              <span className="inline-flex items-center gap-1.5 text-[10.5px] text-muted-foreground">
                <RefreshCw className="h-3 w-3 animate-spin" /> Atualizando dados
              </span>
            ) : null}
          </div>

          {category === "operational" ? (
            <div role="tabpanel" className="space-y-4">
              <RecurrencePanel
                recurrence={operationQuery.data?.recurrence ?? null}
                month={recurrenceMonth}
                onMonthChange={setRecurrenceMonth}
                loading={operationQuery.isFetching}
              />
              <div className="grid gap-4 xl:grid-cols-[minmax(320px,0.78fr)_minmax(0,1.22fr)]">
                <CorrectionHistogram aggregates={aggregates} bounds={bounds} />
                <IssuancesChart aggregates={aggregates} bounds={bounds} />
              </div>
            </div>
          ) : (
            <div role="tabpanel" className="space-y-4">
              <FinancialHealthPanel aggregates={aggregates} />
              <RepasseChart aggregates={aggregates} bounds={bounds} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FolderTab({
  active,
  icon,
  label,
  tone,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  tone: AnalyticsCategory;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "relative min-w-32 rounded-t-2xl border px-4 py-2.5 text-[11.5px] font-semibold transition sm:min-w-40",
        active
          ? "z-20 -mb-px border-border border-b-surface bg-surface pb-3 text-foreground shadow-sm"
          : "border-border/70 bg-surface-2/70 text-muted-foreground hover:bg-surface-2 hover:text-foreground",
      )}
    >
      <span
        className={cn(
          "absolute left-3 right-3 top-0 h-1 rounded-b-full",
          tone === "operational" ? "bg-amber-400" : "bg-emerald-400",
        )}
      />
      <span className="flex items-center justify-center gap-2">
        {icon}
        {label}
      </span>
    </button>
  );
}

function AnalyticsLoading() {
  return (
    <div className="mx-auto w-full max-w-[1320px] space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-44 animate-pulse rounded-lg bg-surface-2" />
          <div className="h-4 w-96 max-w-[70vw] animate-pulse rounded bg-surface-2" />
        </div>
        <div className="h-9 w-60 animate-pulse rounded-lg bg-surface-2" />
      </div>
      <div className="rounded-3xl border border-border bg-surface-2/25 p-5">
        <div className="h-48 animate-pulse rounded-2xl bg-surface" />
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="h-96 animate-pulse rounded-2xl bg-surface" />
          <div className="h-96 animate-pulse rounded-2xl bg-surface" />
        </div>
      </div>
    </div>
  );
}
