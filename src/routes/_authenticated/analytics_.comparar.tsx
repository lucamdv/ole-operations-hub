import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  ANALYTICS_CATALOG,
  AnalyticsChartView,
  type AnalyticsChartId,
} from "@/components/analytics/dashboard-charts";
import { DateRangeFilter } from "@/components/analytics/date-range-filter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { useAnalyticsAggregates } from "@/hooks/use-analytics";
import { useKpiTargets } from "@/hooks/use-kpi-targets";
import { useOperationKpis } from "@/hooks/use-operation-kpis";
import {
  defaultComparisonChart,
  findComparisonView,
  saveComparisonView,
  type ComparisonChartState,
} from "@/lib/analytics/comparison-views";
import { formatRangeBadge, resolveRange } from "@/lib/analytics/date-filter";
import { fortalezaDateKey } from "@/lib/kpis/derive";

interface ComparisonSearch {
  charts?: string;
  view?: string;
}

export const Route = createFileRoute("/_authenticated/analytics_/comparar")({
  validateSearch: (search: Record<string, unknown>): ComparisonSearch => ({
    charts: typeof search.charts === "string" ? search.charts : undefined,
    view: typeof search.view === "string" ? search.view : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Comparar gráficos · OLÉ COPILOT" },
      { name: "description", content: "Visualização comparativa personalizada do Analytics." },
    ],
  }),
  component: ComparisonPage,
});

const validIds = new Set(ANALYTICS_CATALOG.map((item) => item.id));

function currentMonthPeriod(month: string) {
  const [year, monthNumber] = month.split("-").map(Number);
  const safeYear = year || new Date().getFullYear();
  const safeMonth = monthNumber || new Date().getMonth() + 1;
  return {
    granularity: "month" as const,
    startDate: `${safeYear}-${String(safeMonth).padStart(2, "0")}-01`,
    endDate: new Date(Date.UTC(safeYear, safeMonth, 0)).toISOString().slice(0, 10),
  };
}

function chartsFromSearch(value: string | undefined) {
  const ids = (value ?? "")
    .split(",")
    .filter((id): id is AnalyticsChartId => validIds.has(id as AnalyticsChartId));
  const unique = [...new Set<AnalyticsChartId>(ids)];
  const selected: AnalyticsChartId[] = unique.length > 0 ? unique : ["issuances", "repasse"];
  return selected.map(defaultComparisonChart);
}

function ComparisonPage() {
  const search = Route.useSearch();
  const { targets } = useKpiTargets();
  const [charts, setCharts] = useState<ComparisonChartState[]>(() =>
    chartsFromSearch(search.charts),
  );
  const [savedViewId, setSavedViewId] = useState<string | undefined>();
  const [viewName, setViewName] = useState("Nova visualização");
  const [saveOpen, setSaveOpen] = useState(false);
  const [addId, setAddId] = useState<AnalyticsChartId>("financialHealth");
  const [exporting, setExporting] = useState(false);
  const [recurrenceMonth, setRecurrenceMonth] = useState(() => fortalezaDateKey().slice(0, 7));
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (search.view) return;
    setCharts(chartsFromSearch(search.charts));
    setSavedViewId(undefined);
    setViewName("Nova visualização");
  }, [search.charts, search.view]);

  useEffect(() => {
    const saved = findComparisonView(search.view);
    if (!saved) return;
    setCharts(saved.charts);
    setSavedViewId(saved.id);
    setViewName(saved.name);
    const recurrence = saved.charts.find((chart) => chart.id === "recurrence");
    if (recurrence) {
      const range = resolveRange(recurrence.range);
      setRecurrenceMonth((range.to ?? range.from ?? fortalezaDateKey()).slice(0, 7));
    }
  }, [search.view]);

  const aggregatesQuery = useAnalyticsAggregates(targets.inadimplenciaDias);
  const recurrencePeriod = useMemo(() => currentMonthPeriod(recurrenceMonth), [recurrenceMonth]);
  const operationQuery = useOperationKpis(targets.resolucaoSlaHoras, recurrencePeriod);

  const updateChart = (index: number, patch: Partial<ComparisonChartState>) => {
    setCharts((current) =>
      current.map((chart, chartIndex) => (chartIndex === index ? { ...chart, ...patch } : chart)),
    );
  };

  const moveChart = (index: number, direction: -1 | 1) => {
    setCharts((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target]!, next[index]!];
      return next;
    });
  };

  const handleExport = async () => {
    if (!exportRef.current) return;
    const nodes = Array.from(
      exportRef.current.querySelectorAll<HTMLElement>('[data-export="chart"]'),
    );
    if (nodes.length === 0) return;
    setExporting(true);
    try {
      const { exportChartsPdf } = await import("@/lib/analytics/export-charts");
      await exportChartsPdf(nodes, viewName);
      toast.success("Visualização exportada em PDF");
    } catch (error) {
      toast.error("Falha ao exportar a visualização", {
        description: (error as Error).message,
      });
    } finally {
      setExporting(false);
    }
  };

  const handleSave = () => {
    const saved = saveComparisonView(viewName, charts, savedViewId);
    setSavedViewId(saved.id);
    setViewName(saved.name);
    setSaveOpen(false);
    toast.success("Visualização salva neste dispositivo");
  };

  const availableToAdd = ANALYTICS_CATALOG.filter(
    (item) => !charts.some((chart) => chart.id === item.id),
  );
  const effectiveAddId = availableToAdd.some((item) => item.id === addId)
    ? addId
    : availableToAdd[0]?.id;

  return (
    <div className="mx-auto w-full max-w-[1540px] space-y-5">
      <header className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <Link
            to="/analytics"
            className="mb-2 inline-flex items-center gap-1.5 text-[10.5px] font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar ao Analytics
          </Link>
          <h1 className="page-title">{viewName}</h1>
          <p className="page-subtitle mt-1">
            Ajuste período, zoom e posição de cada painel antes de salvar ou exportar.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {availableToAdd.length > 0 ? (
            <div className="flex h-9 items-center rounded-lg border border-border bg-surface p-1">
              <select
                value={effectiveAddId}
                onChange={(event) => setAddId(event.target.value as AnalyticsChartId)}
                aria-label="Gráfico para adicionar"
                className="h-7 min-w-36 bg-transparent px-2 text-[11px] outline-none"
              >
                {availableToAdd.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => {
                  if (!effectiveAddId) return;
                  setCharts((current) => [...current, defaultComparisonChart(effectiveAddId)]);
                  const remaining = availableToAdd.find((item) => item.id !== effectiveAddId);
                  if (remaining) setAddId(remaining.id);
                }}
                className="flex h-7 items-center gap-1 rounded-md bg-surface-2 px-2 text-[10.5px] font-medium hover:bg-accent"
              >
                <Plus className="h-3 w-3" /> Adicionar
              </button>
            </div>
          ) : null}
          <Button variant="outline" className="h-9 gap-2 text-[11.5px]" onClick={handleExport}>
            {exporting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
            Exportar PDF
          </Button>
          <Button className="h-9 gap-2 text-[11.5px]" onClick={() => setSaveOpen(true)}>
            <Save className="h-3.5 w-3.5" />
            Salvar visualização
          </Button>
        </div>
      </header>

      {aggregatesQuery.isLoading || !aggregatesQuery.data ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="h-[500px] animate-pulse rounded-3xl bg-surface-2" />
          <div className="h-[500px] animate-pulse rounded-3xl bg-surface-2" />
        </div>
      ) : charts.length === 0 ? (
        <div className="panel flex min-h-72 flex-col items-center justify-center p-8 text-center">
          <p className="text-[13px] font-medium">Nenhum painel nesta visualização.</p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Adicione um gráfico pelo seletor no topo da página.
          </p>
        </div>
      ) : (
        <div ref={exportRef} className="grid items-start gap-4 xl:grid-cols-2">
          {charts.map((chart, index) => {
            const meta = ANALYTICS_CATALOG.find((item) => item.id === chart.id)!;
            const bounds = resolveRange(chart.range);
            return (
              <div
                key={chart.id}
                className="min-w-0 rounded-3xl border border-border bg-surface-2/20 p-2"
              >
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border bg-surface px-3 py-2">
                  <div className="min-w-0">
                    <div className="truncate text-[10.5px] font-semibold">{meta.title}</div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground">
                      {meta.categoryLabel} · {meta.chartType}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveChart(index, -1)}
                      disabled={index === 0}
                      aria-label="Mover painel para a esquerda"
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground disabled:opacity-30"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveChart(index, 1)}
                      disabled={index === charts.length - 1}
                      aria-label="Mover painel para a direita"
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground disabled:opacity-30"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCharts((current) =>
                          current.filter((_, itemIndex) => itemIndex !== index),
                        )
                      }
                      aria-label="Remover painel"
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:border-destructive/40 hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex w-full flex-col gap-2 border-t border-border/60 pt-2 lg:flex-row lg:items-center lg:justify-between">
                    <DateRangeFilter
                      value={chart.range}
                      onChange={(range) => {
                        updateChart(index, { range });
                        if (chart.id === "recurrence") {
                          const nextBounds = resolveRange(range);
                          setRecurrenceMonth(
                            (nextBounds.to ?? nextBounds.from ?? fortalezaDateKey()).slice(0, 7),
                          );
                        }
                      }}
                    />
                    <div className="flex min-w-44 items-center gap-2">
                      <span className="text-[9.5px] font-medium uppercase tracking-wider text-muted-foreground">
                        Zoom
                      </span>
                      <Slider
                        value={[chart.zoom]}
                        min={80}
                        max={135}
                        step={5}
                        onValueChange={(value) => updateChart(index, { zoom: value[0] ?? 100 })}
                        className="w-24"
                      />
                      <span className="w-9 text-right font-mono text-[10px] text-muted-foreground">
                        {chart.zoom}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="overflow-auto rounded-2xl">
                  <div
                    style={{
                      zoom: chart.zoom / 100,
                      minWidth: chart.zoom > 100 ? `${chart.zoom}%` : undefined,
                    }}
                  >
                    <AnalyticsChartView
                      id={chart.id}
                      aggregates={aggregatesQuery.data}
                      recurrence={operationQuery.data?.recurrence ?? null}
                      recurrenceMonth={recurrenceMonth}
                      onRecurrenceMonthChange={setRecurrenceMonth}
                      bounds={bounds}
                      loadingRecurrence={operationQuery.isFetching}
                    />
                  </div>
                </div>
                <div className="px-2 pb-1 pt-2 text-right font-mono text-[9px] text-muted-foreground">
                  {formatRangeBadge(chart.range) ?? "todo o período"}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={saveOpen} onOpenChange={setSaveOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[15px]">Salvar visualização</DialogTitle>
            <DialogDescription className="text-[11.5px]">
              O layout, os períodos e o zoom serão guardados neste dispositivo.
            </DialogDescription>
          </DialogHeader>
          <label className="space-y-1.5">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Nome
            </span>
            <input
              autoFocus
              value={viewName}
              onChange={(event) => setViewName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && viewName.trim()) handleSave();
              }}
              className="h-10 w-full rounded-lg border border-border bg-surface-2 px-3 text-[12px] outline-none focus:border-primary"
            />
          </label>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveOpen(false)}>
              Cancelar
            </Button>
            <Button disabled={!viewName.trim() || charts.length === 0} onClick={handleSave}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
