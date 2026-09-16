import { Link } from "@tanstack/react-router";
import { BarChart3, Check, GitCompareArrows, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  ANALYTICS_CATALOG,
  type AnalyticsCategory,
  type AnalyticsChartId,
} from "@/components/analytics/dashboard-charts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { readComparisonViews, type SavedComparisonView } from "@/lib/analytics/comparison-views";
import { cn } from "@/lib/utils";

type CategoryFilter = "all" | AnalyticsCategory;
type TypeFilter = "all" | (typeof ANALYTICS_CATALOG)[number]["chartType"];

export function CompareChartsDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [chartType, setChartType] = useState<TypeFilter>("all");
  const [selected, setSelected] = useState<AnalyticsChartId[]>([]);
  const [savedViews, setSavedViews] = useState<SavedComparisonView[]>([]);

  useEffect(() => {
    if (!open) return;
    setSavedViews(readComparisonViews());
  }, [open]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    return ANALYTICS_CATALOG.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (chartType !== "all" && item.chartType !== chartType) return false;
      if (!normalized) return true;
      return `${item.title} ${item.description} ${item.categoryLabel} ${item.chartType}`
        .toLocaleLowerCase("pt-BR")
        .includes(normalized);
    });
  }, [category, chartType, query]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-9 gap-2 bg-surface text-[12px]">
          <GitCompareArrows className="h-3.5 w-3.5" />
          Comparar gráficos
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[88vh] max-w-5xl overflow-hidden p-0">
        <DialogHeader className="border-b border-border px-5 pb-4 pt-5 pr-12">
          <DialogTitle className="text-[16px]">Montar comparação</DialogTitle>
          <DialogDescription className="text-[11.5px]">
            Pesquise, filtre e selecione os painéis que deseja manipular lado a lado.
          </DialogDescription>
        </DialogHeader>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-5">
          <div className="grid gap-2 border-b border-border py-4 md:grid-cols-[minmax(0,1fr)_170px_170px]">
            <label className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Pesquisar por título, tipo ou categoria"
                className="h-9 w-full rounded-lg border border-border bg-surface-2 pl-9 pr-3 text-[12px] outline-none focus:border-primary"
              />
            </label>
            <select
              value={chartType}
              onChange={(event) => setChartType(event.target.value as TypeFilter)}
              aria-label="Filtrar por tipo de gráfico"
              className="h-9 rounded-lg border border-border bg-surface-2 px-3 text-[11.5px] outline-none focus:border-primary"
            >
              <option value="all">Todos os tipos</option>
              {[...new Set(ANALYTICS_CATALOG.map((item) => item.chartType))].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as CategoryFilter)}
              aria-label="Filtrar por categoria"
              className="h-9 rounded-lg border border-border bg-surface-2 px-3 text-[11.5px] outline-none focus:border-primary"
            >
              <option value="all">Todas as categorias</option>
              <option value="operational">Operacional</option>
              <option value="financial">Financeiro</option>
            </select>
          </div>

          <div className="overflow-y-auto py-4">
            {savedViews.length > 0 ? (
              <div className="mb-4">
                <div className="mb-2 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Visualizações salvas
                </div>
                <div className="flex flex-wrap gap-2">
                  {savedViews.slice(0, 6).map((view) => (
                    <Link
                      key={view.id}
                      to="/analytics/comparar"
                      search={{ view: view.id }}
                      className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-[11px] transition hover:border-primary/50 hover:text-primary"
                    >
                      {view.name}
                      <span className="ml-2 font-mono text-[9px] text-muted-foreground">
                        {view.charts.length}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => {
                const active = selected.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setSelected((current) =>
                        current.includes(item.id)
                          ? current.filter((id) => id !== item.id)
                          : [...current, item.id],
                      )
                    }
                    className={cn(
                      "group overflow-hidden rounded-2xl border bg-surface text-left transition",
                      active
                        ? "border-primary ring-2 ring-primary/15"
                        : "border-border hover:border-primary/40",
                    )}
                  >
                    <ChartThumbnail values={item.thumbnail} active={active} />
                    <span className="block p-3.5">
                      <span className="flex items-start justify-between gap-3">
                        <span className="text-[12px] font-semibold leading-4">{item.title}</span>
                        <span
                          className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                            active
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border text-transparent",
                          )}
                        >
                          <Check className="h-3 w-3" />
                        </span>
                      </span>
                      <span className="mt-1.5 block text-[10.5px] leading-4 text-muted-foreground">
                        {item.description}
                      </span>
                      <span className="mt-3 flex items-center gap-2 text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                        <span>{item.categoryLabel}</span>
                        <span className="h-1 w-1 rounded-full bg-border" />
                        <span>{item.chartType}</span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            {filtered.length === 0 ? (
              <div className="flex min-h-52 flex-col items-center justify-center text-center text-muted-foreground">
                <BarChart3 className="mb-2 h-6 w-6" />
                <span className="text-[12px]">Nenhum gráfico corresponde aos filtros.</span>
              </div>
            ) : null}
          </div>
        </div>

        <DialogFooter className="border-t border-border px-5 py-4 sm:items-center sm:justify-between">
          <span className="text-[11px] text-muted-foreground">
            {selected.length === 0
              ? "Selecione pelo menos um painel"
              : `${selected.length} painel(is) selecionado(s)`}
          </span>
          {selected.length > 0 ? (
            <Button asChild className="h-9 gap-2 text-[12px]">
              <Link
                to="/analytics/comparar"
                search={{ charts: selected.join(",") }}
                onClick={() => setOpen(false)}
              >
                <GitCompareArrows className="h-3.5 w-3.5" />
                Abrir comparação
              </Link>
            </Button>
          ) : (
            <Button disabled className="h-9 gap-2 text-[12px]">
              <GitCompareArrows className="h-3.5 w-3.5" />
              Abrir comparação
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ChartThumbnail({ values, active }: { values: readonly number[]; active: boolean }) {
  return (
    <span className="relative flex h-24 items-end gap-2 overflow-hidden border-b border-border bg-surface-2/55 px-4 pb-3 pt-5">
      <span className="absolute inset-x-4 top-3 h-px bg-border/70" />
      <span className="absolute inset-x-4 top-10 h-px bg-border/50" />
      {values.map((value, index) => (
        <span
          key={`${value}-${index}`}
          className={cn(
            "flex-1 rounded-t-sm transition-colors",
            active ? "bg-primary" : index % 2 === 0 ? "bg-primary/55" : "bg-info/55",
          )}
          style={{ height: `${Math.max(12, value)}%` }}
        />
      ))}
    </span>
  );
}
