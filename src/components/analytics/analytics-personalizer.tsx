import { useEffect, useState } from "react";
import { BarChart3, Gauge, RotateCcw, Settings2, Sparkles } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";

export const ANALYTICS_KPI_OPTIONS = [
  {
    id: "dailyNewFindings",
    group: "Diários",
    label: "Inconsistências novas detectadas",
    description: "Volume de ocorrências inéditas detectadas no dia.",
  },
  {
    id: "dailyOpenCritical",
    group: "Diários",
    label: "Ocorrências críticas em aberto",
    description: "Backlog crítico presente na auditoria mais recente.",
  },
  {
    id: "dailyFirstResponse",
    group: "Diários",
    label: "Tempo até a primeira resposta",
    description: "Tempo médio de reação para qualquer ocorrência respondida no dia.",
  },
  {
    id: "weeklyRecurrence",
    group: "Semanais",
    label: "Taxa de reincidência",
    description: "Proporção entre ocorrências repetidas e novas nos últimos 7 dias.",
  },
  {
    id: "weeklySla",
    group: "Semanais",
    label: "Resoluções dentro do SLA",
    description: "Percentual de ocorrências resolvidas dentro do prazo definido.",
  },
  {
    id: "weeklyDelinquent",
    group: "Semanais",
    label: "Contratos inadimplentes",
    description: "Contratos vencidos, não quitados e ainda ativos.",
  },
  {
    id: "monthlyRecurrence",
    group: "Mensais",
    label: "Reincidência consolidada",
    description: "Tendência mensal e média móvel de reincidência.",
  },
  {
    id: "yearlyPortfolioGrowth",
    group: "Anuais",
    label: "Crescimento da carteira",
    description: "Variação anual de contratos e prêmio emitido.",
  },
  {
    id: "yearlyCriticalReduction",
    group: "Anuais",
    label: "Redução de incidentes críticos",
    description: "Comparação anual de ocorrências críticas distintas.",
  },
] as const;

export const ANALYTICS_CHART_OPTIONS = [
  {
    id: "runTrend",
    label: "Tendência de runs",
    description: "Aprovados e reprovados por auditoria.",
  },
  {
    id: "severity",
    label: "Severidade",
    description: "Distribuição dos níveis na última auditoria.",
  },
  {
    id: "conformity",
    label: "Conformidade ao longo do tempo",
    description: "Percentual aprovado em cada auditoria.",
  },
  {
    id: "processedVolume",
    label: "Volume processado",
    description: "Apólices auditadas por execução.",
  },
  {
    id: "errorTypes",
    label: "Top 10 tipos de erro",
    description: "Erros mais frequentes na auditoria atual.",
  },
  {
    id: "findingsByMonth",
    label: "Findings por mês de vigência",
    description: "Ocorrências distribuídas pela vigência.",
  },
  {
    id: "revenue",
    label: "Dinheiro pago e repasse Excelsior",
    description: "Composição mensal do repasse em dólar.",
  },
  {
    id: "heatmap",
    label: "Heatmap de erros",
    description: "Intensidade por tipo de erro e auditoria.",
  },
  {
    id: "problemPolicies",
    label: "Apólices mais problemáticas",
    description: "Apólices com maior quantidade de inconsistências.",
  },
  {
    id: "problemEndorsements",
    label: "Endossos com inconsistências",
    description: "Endossos que mais acumulam ocorrências.",
  },
  {
    id: "portfolioEndorsements",
    label: "Carteira por nº de endossos",
    description: "Distribuição das alterações acumuladas por apólice.",
  },
  {
    id: "policiesIssued",
    label: "Apólices emitidas por mês",
    description: "Volume mensal de novas apólices.",
  },
  {
    id: "endorsementsIssued",
    label: "Endossos emitidos por mês",
    description: "Volume mensal de endossos.",
  },
  {
    id: "issuancesByType",
    label: "Emissões por mês e tipo",
    description: "Apólices e endossos A, B, C e D.",
  },
] as const;

export type AnalyticsKpiId = (typeof ANALYTICS_KPI_OPTIONS)[number]["id"];
export type AnalyticsChartId = (typeof ANALYTICS_CHART_OPTIONS)[number]["id"];

export interface AnalyticsPreferences {
  kpis: Record<AnalyticsKpiId, boolean>;
  charts: Record<AnalyticsChartId, boolean>;
  hideEmptyCharts: boolean;
}

const STORAGE_KEY = "ole-copilot:analytics-preferences:v1";
const LEGACY_CHART_PREFS_KEY = "ole.chart.prefs.v1";

function allEnabled<T extends readonly { id: PropertyKey }[]>(options: T) {
  return Object.fromEntries(options.map(({ id }) => [id, true])) as Record<
    T[number]["id"],
    boolean
  >;
}

export const DEFAULT_ANALYTICS_PREFERENCES: AnalyticsPreferences = {
  kpis: allEnabled(ANALYTICS_KPI_OPTIONS),
  charts: allEnabled(ANALYTICS_CHART_OPTIONS),
  hideEmptyCharts: true,
};

function mergeBooleanOptions<T extends string>(
  value: unknown,
  defaults: Record<T, boolean>,
): Record<T, boolean> {
  if (!value || typeof value !== "object") return defaults;
  const candidate = value as Partial<Record<T, unknown>>;
  return Object.fromEntries(
    (Object.keys(defaults) as T[]).map((key) => [
      key,
      typeof candidate[key] === "boolean" ? candidate[key] : defaults[key],
    ]),
  ) as Record<T, boolean>;
}

function readPreferences(): AnalyticsPreferences {
  if (typeof window === "undefined") return DEFAULT_ANALYTICS_PREFERENCES;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<AnalyticsPreferences>;
      return {
        kpis: mergeBooleanOptions(parsed.kpis, DEFAULT_ANALYTICS_PREFERENCES.kpis),
        charts: mergeBooleanOptions(parsed.charts, DEFAULT_ANALYTICS_PREFERENCES.charts),
        hideEmptyCharts:
          typeof parsed.hideEmptyCharts === "boolean"
            ? parsed.hideEmptyCharts
            : DEFAULT_ANALYTICS_PREFERENCES.hideEmptyCharts,
      };
    }

    // Migra a preferência que antes ficava em Configurações > Perfil.
    const legacy = window.localStorage.getItem(LEGACY_CHART_PREFS_KEY);
    if (!legacy) return DEFAULT_ANALYTICS_PREFERENCES;
    const parsedLegacy = JSON.parse(legacy) as { hideEmptyCharts?: unknown };
    return {
      ...DEFAULT_ANALYTICS_PREFERENCES,
      hideEmptyCharts:
        typeof parsedLegacy.hideEmptyCharts === "boolean"
          ? parsedLegacy.hideEmptyCharts
          : DEFAULT_ANALYTICS_PREFERENCES.hideEmptyCharts,
    };
  } catch {
    return DEFAULT_ANALYTICS_PREFERENCES;
  }
}

export function useAnalyticsPreferences() {
  const [preferences, setPreferences] = useState<AnalyticsPreferences>(
    DEFAULT_ANALYTICS_PREFERENCES,
  );

  useEffect(() => {
    setPreferences(readPreferences());
  }, []);

  function updatePreferences(next: AnalyticsPreferences) {
    setPreferences(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.localStorage.removeItem(LEGACY_CHART_PREFS_KEY);
    } catch {
      // A personalização continua funcionando em memória quando o storage está indisponível.
    }
  }

  function resetPreferences() {
    updatePreferences(DEFAULT_ANALYTICS_PREFERENCES);
  }

  return { preferences, updatePreferences, resetPreferences };
}

export function AnalyticsPersonalizer({
  preferences,
  onChange,
  onReset,
}: {
  preferences: AnalyticsPreferences;
  onChange: (preferences: AnalyticsPreferences) => void;
  onReset: () => void;
}) {
  const visibleKpis = ANALYTICS_KPI_OPTIONS.filter(({ id }) => preferences.kpis[id]).length;
  const visibleCharts = ANALYTICS_CHART_OPTIONS.filter(({ id }) => preferences.charts[id]).length;

  const setAllKpis = (visible: boolean) =>
    onChange({ ...preferences, kpis: mapVisibility(ANALYTICS_KPI_OPTIONS, visible) });
  const setAllCharts = (visible: boolean) =>
    onChange({ ...preferences, charts: mapVisibility(ANALYTICS_CHART_OPTIONS, visible) });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="apple-button-secondary rounded-full">
          <Settings2 className="h-4 w-4" />
          Personalizar
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-panel max-h-[88vh] max-w-2xl grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-3xl border-border/80 p-0 shadow-elevated">
        <DialogHeader className="border-b border-border/70 px-6 pb-5 pt-6 text-left">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/12 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <DialogTitle className="text-xl tracking-[-0.025em]">Personalizar Analytics</DialogTitle>
          <DialogDescription className="pt-1 text-[13px] leading-relaxed">
            Escolha os KPIs e gráficos que fazem sentido para sua rotina. A preferência fica salva
            apenas neste navegador.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 overflow-y-auto px-4 py-4 sm:px-6">
          <PreferenceGroup
            icon={Gauge}
            title="KPIs"
            count={`${visibleKpis} de ${ANALYTICS_KPI_OPTIONS.length}`}
            onShowAll={() => setAllKpis(true)}
            onHideAll={() => setAllKpis(false)}
          >
            {ANALYTICS_KPI_OPTIONS.map((option) => (
              <PreferenceRow
                key={option.id}
                label={option.label}
                description={`${option.group} · ${option.description}`}
                checked={preferences.kpis[option.id]}
                onCheckedChange={(checked) =>
                  onChange({
                    ...preferences,
                    kpis: { ...preferences.kpis, [option.id]: checked },
                  })
                }
              />
            ))}
          </PreferenceGroup>

          <PreferenceGroup
            icon={BarChart3}
            title="Gráficos"
            count={`${visibleCharts} de ${ANALYTICS_CHART_OPTIONS.length}`}
            onShowAll={() => setAllCharts(true)}
            onHideAll={() => setAllCharts(false)}
          >
            <PreferenceRow
              label="Ocultar gráficos sem dados suficientes"
              description="Esconde temporariamente um gráfico selecionado quando ele não tem informação relevante."
              checked={preferences.hideEmptyCharts}
              onCheckedChange={(checked) => onChange({ ...preferences, hideEmptyCharts: checked })}
            />
            {ANALYTICS_CHART_OPTIONS.map((option) => (
              <PreferenceRow
                key={option.id}
                label={option.label}
                description={option.description}
                checked={preferences.charts[option.id]}
                onCheckedChange={(checked) =>
                  onChange({
                    ...preferences,
                    charts: { ...preferences.charts, [option.id]: checked },
                  })
                }
              />
            ))}
          </PreferenceGroup>
        </div>

        <DialogFooter className="flex-row items-center justify-between gap-3 border-t border-border/70 px-6 py-4 sm:justify-between sm:space-x-0">
          <span className="text-[11px] text-muted-foreground">
            {visibleKpis + visibleCharts} itens visíveis
          </span>
          <Button variant="ghost" size="sm" className="rounded-full" onClick={onReset}>
            <RotateCcw className="h-3.5 w-3.5" />
            Restaurar padrão
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function mapVisibility<T extends readonly { id: PropertyKey }[]>(options: T, visible: boolean) {
  return Object.fromEntries(options.map(({ id }) => [id, visible])) as Record<
    T[number]["id"],
    boolean
  >;
}

function PreferenceGroup({
  icon: Icon,
  title,
  count,
  onShowAll,
  onHideAll,
  children,
}: {
  icon: typeof Gauge;
  title: string;
  count: string;
  onShowAll: () => void;
  onHideAll: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6 last:mb-0">
      <div className="mb-2 flex flex-wrap items-center gap-2 px-1">
        <Icon className="h-4 w-4 text-primary" />
        <h3 className="text-[13px] font-semibold">{title}</h3>
        <span className="text-[11px] text-muted-foreground">{count}</span>
        <span className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={onShowAll}
            className="rounded-full px-2 py-1 text-[10.5px] text-primary hover:bg-primary/10"
          >
            Mostrar todos
          </button>
          <button
            type="button"
            onClick={onHideAll}
            className="rounded-full px-2 py-1 text-[10.5px] text-muted-foreground hover:bg-surface-2"
          >
            Ocultar todos
          </button>
        </span>
      </div>
      <div className="divide-y divide-border/70 rounded-2xl border border-border/80 bg-surface/55">
        {children}
      </div>
    </section>
  );
}

function PreferenceRow({
  label,
  description,
  checked,
  onCheckedChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-4 px-3 py-3 transition hover:bg-surface-2/70 sm:px-4">
      <span className="min-w-0 flex-1">
        <span className="block text-[12.5px] font-semibold">{label}</span>
        <span className="mt-0.5 block text-[11px] leading-relaxed text-muted-foreground">
          {description}
        </span>
      </span>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={`Exibir ${label.toLowerCase()}`}
      />
    </label>
  );
}
