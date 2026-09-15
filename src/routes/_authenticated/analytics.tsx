import { createFileRoute, Link } from "@tanstack/react-router";
import type React from "react";
import { useMemo, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ResponsiveContainer } from "@/components/charts/in-view-container";
import { BarChart3, Download, EyeOff, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuditHistory, useLatestAudit } from "@/hooks/use-audit";
import { usePolicies } from "@/hooks/use-policies";
import { useAnalyticsAggregates } from "@/hooks/use-analytics";
import { useOperationKpis } from "@/hooks/use-operation-kpis";
import { useKpiTargets } from "@/hooks/use-kpi-targets";
import {
  fortalezaDateKey,
  type RecurrenceGranularity,
  type RecurrenceKpi,
} from "@/lib/kpis/derive";

import {
  buildHeatmap,
  countBySeverity,
  errorTypeBreakdown,
  groupByApolice,
  groupByEndosso,
  runSeries,
} from "@/lib/audit/derive";
import { formatCompact, formatInt, formatPct, formatUSD, relativeTime } from "@/lib/format";
import { REPASSE_RULES } from "@/lib/analytics/repasse-rules";
import { DateRangeFilter } from "@/components/analytics/date-range-filter";
import {
  AnalyticsPersonalizer,
  useAnalyticsPreferences,
} from "@/components/analytics/analytics-personalizer";
import {
  DEFAULT_RANGE,
  formatRangeBadge,
  monthWithinRange,
  resolveRange,
  withinRange,
  type DateRangeState,
} from "@/lib/analytics/date-filter";

export const Route = createFileRoute("/_authenticated/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics · OLÉ COPILOT" },
      {
        name: "description",
        content:
          "Inteligência estratégica sobre carteira, runs de auditoria, severidade e eficiência operacional.",
      },
    ],
  }),
  component: AnalyticsPage,
});

const DAY_MS = 86_400_000;

function utcDateKey(value: Date) {
  return value.toISOString().slice(0, 10);
}

function addDateDays(value: string, days: number) {
  const [year, month, day] = value.split("-").map(Number);
  return utcDateKey(new Date(Date.UTC(year!, month! - 1, day! + days)));
}

function isoWeekValue(value: string) {
  const date = new Date(`${value}T12:00:00.000Z`);
  const weekday = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - weekday);
  const year = date.getUTCFullYear();
  const yearStart = new Date(Date.UTC(year, 0, 1));
  const week = Math.ceil(((date.getTime() - yearStart.getTime()) / DAY_MS + 1) / 7);
  return `${year}-W${String(week).padStart(2, "0")}`;
}

function recurrencePeriod(granularity: RecurrenceGranularity, value: string) {
  if (granularity === "month") {
    const [year, month] = value.split("-").map(Number);
    const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
    const endDate = utcDateKey(new Date(Date.UTC(year!, month!, 0)));
    return { granularity, startDate, endDate };
  }

  const match = /^(\d{4})-W(\d{2})$/.exec(value);
  const year = Number(match?.[1]);
  const week = Number(match?.[2]);
  const januaryFourth = new Date(Date.UTC(year, 0, 4));
  const mondayWeekOne = addDateDays(
    utcDateKey(januaryFourth),
    -((januaryFourth.getUTCDay() + 6) % 7),
  );
  const startDate = addDateDays(mondayWeekOne, (week - 1) * 7);
  return { granularity, startDate, endDate: addDateDays(startDate, 6) };
}

function formatPeriodDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00.000Z`));
}

function AnalyticsPage() {
  const latestQ = useLatestAudit();
  const historyQ = useAuditHistory();
  const policiesQ = usePolicies();
  const aggregatesQ = useAnalyticsAggregates();
  const { targets } = useKpiTargets();
  const today = fortalezaDateKey();
  const [recurrenceGranularity, setRecurrenceGranularity] = useState<RecurrenceGranularity>("week");
  const [recurrenceWeek, setRecurrenceWeek] = useState(() => isoWeekValue(today));
  const [recurrenceMonth, setRecurrenceMonth] = useState(() => today.slice(0, 7));
  const selectedRecurrencePeriod = useMemo(
    () =>
      recurrencePeriod(
        recurrenceGranularity,
        recurrenceGranularity === "week" ? recurrenceWeek : recurrenceMonth,
      ),
    [recurrenceGranularity, recurrenceMonth, recurrenceWeek],
  );
  const opsQ = useOperationKpis(targets.resolucaoSlaHoras, selectedRecurrencePeriod);
  const { preferences, updatePreferences, resetPreferences } = useAnalyticsPreferences();

  const ops = opsQ.data ?? null;

  const [range, setRange] = useState<DateRangeState>(DEFAULT_RANGE);
  const bounds = useMemo(() => resolveRange(range), [range]);
  const rangeActive = bounds.from !== null || bounds.to !== null;

  const latestRaw = latestQ.data ?? null;
  const historyRaw = useMemo(() => historyQ.data ?? [], [historyQ.data]);
  const policies = useMemo(() => policiesQ.data ?? [], [policiesQ.data]);
  const aggregatesRaw = aggregatesQ.data ?? {
    findingsByVigencia: [],
    revenueByMonth: [],
    policyPremiums: [],
    issuancesByMonth: [],
    repasseByMonth: [],
  };

  const history = useMemo(
    () =>
      rangeActive
        ? historyRaw.filter((r) => withinRange(r.data_auditoria ?? r.created_at, bounds))
        : historyRaw,
    [historyRaw, bounds, rangeActive],
  );
  // A última auditoria só entra na visão filtrada se sua data estiver no intervalo.
  const latest = useMemo(() => {
    if (!latestRaw || !rangeActive) return latestRaw;
    const d = latestRaw.run.data_auditoria ?? latestRaw.run.created_at;
    return withinRange(d, bounds) ? latestRaw : { ...latestRaw, findings: [] };
  }, [latestRaw, bounds, rangeActive]);

  const findings = useMemo(() => latest?.findings ?? [], [latest]);
  const sev = useMemo(() => countBySeverity(findings), [findings]);
  const severityData = useMemo(
    () =>
      [
        { name: "Erros", value: sev.erros, color: "var(--destructive)" },
        { name: "Alertas", value: sev.alertas, color: "var(--warning)" },
        { name: "Info", value: sev.infos, color: "var(--info)" },
      ].filter((item) => item.value > 0),
    [sev],
  );
  const series = useMemo(() => runSeries(history).slice(-12), [history]);
  const errorTypes = useMemo(() => errorTypeBreakdown(findings).slice(0, 10), [findings]);
  const apoliceRank = useMemo(() => groupByApolice(findings).slice(0, 10), [findings]);
  const endossoRank = useMemo(() => groupByEndosso(findings).slice(0, 8), [findings]);
  const monthly = useMemo(
    () => aggregatesRaw.findingsByVigencia.filter((b) => monthWithinRange(b.month, bounds)),
    [aggregatesRaw.findingsByVigencia, bounds],
  );
  const repasse = useMemo(
    () => aggregatesRaw.repasseByMonth.filter((b) => monthWithinRange(b.month, bounds)),
    [aggregatesRaw.repasseByMonth, bounds],
  );
  const issuances = useMemo(
    () => aggregatesRaw.issuancesByMonth.filter((b) => monthWithinRange(b.month, bounds)),
    [aggregatesRaw.issuancesByMonth, bounds],
  );
  const totalApolices = useMemo(() => issuances.reduce((s, r) => s + r.apolices, 0), [issuances]);
  const totalEndossos = useMemo(
    () => issuances.reduce((s, r) => s + r.endossosTotal, 0),
    [issuances],
  );
  const repasseTotals = useMemo(
    () =>
      repasse.reduce(
        (acc, r) => ({
          carregamentoExcelsior: acc.carregamentoExcelsior + r.carregamentoExcelsior,
          premioDireto: acc.premioDireto + r.premioDireto,
          pisCofins: acc.pisCofins + r.pisCofins,
          excelsiorLiquido: acc.excelsiorLiquido + r.excelsiorLiquido,
          bruto: acc.bruto + r.bruto,
          premioTotalPago: acc.premioTotalPago + r.premioTotalPago,
        }),
        {
          carregamentoExcelsior: 0,
          premioDireto: 0,
          pisCofins: 0,
          excelsiorLiquido: 0,
          bruto: 0,
          premioTotalPago: 0,
        },
      ),
    [repasse],
  );
  const repasseAvg = repasse.length > 0 ? repasseTotals.excelsiorLiquido / repasse.length : 0;
  const repasseMax = useMemo(() => {
    const peak = repasse.reduce(
      (m, r) => Math.max(m, r.carregamentoExcelsior + r.premioDireto, r.excelsiorLiquido),
      0,
    );
    if (peak === 0) return 1000;
    const step = 500;
    return Math.ceil((peak * 1.12) / step) * step;
  }, [repasse]);
  const heatmap = useMemo(() => buildHeatmap(latest, history, 12), [latest, history]);

  // Distribuição por nº de endossos
  const endorsementsDist = useMemo(() => {
    const buckets = [
      { label: "0", count: 0 },
      { label: "1-2", count: 0 },
      { label: "3-5", count: 0 },
      { label: "6-10", count: 0 },
      { label: "> 10", count: 0 },
    ];
    for (const p of policies) {
      const n = p.endorsements_count ?? 0;
      const idx = n === 0 ? 0 : n <= 2 ? 1 : n <= 5 ? 2 : n <= 10 ? 3 : 4;
      buckets[idx].count++;
    }
    return buckets.filter((b) => b.count > 0);
  }, [policies]);

  // === Disponibilidade de dados por gráfico ===
  const charts = useMemo(() => {
    const hasIssuances = issuances.length > 0;
    return [
      { id: "runTrend", title: "Tendência de runs", has: series.length > 0 },
      { id: "severity", title: "Severidade", has: sev.erros + sev.alertas + sev.infos > 0 },
      { id: "conformity", title: "Conformidade ao longo do tempo", has: series.length > 0 },
      { id: "processedVolume", title: "Volume processado", has: series.length > 0 },
      { id: "errorTypes", title: "Top 10 tipos de erro", has: errorTypes.length > 0 },
      { id: "findingsByMonth", title: "Findings por mês de vigência", has: monthly.length > 0 },
      { id: "revenue", title: "Receita Excelsior (USD)", has: repasse.length > 0 },
      {
        id: "heatmap",
        title: "Heatmap · tipo de erro × runs",
        has: heatmap.rows.length > 0 && heatmap.runs.length > 0,
      },
      { id: "problemPolicies", title: "Apólices mais problemáticas", has: apoliceRank.length > 0 },
      {
        id: "problemEndorsements",
        title: "Top endossos com inconsistências",
        has: endossoRank.length > 0,
      },
      {
        id: "portfolioEndorsements",
        title: "Carteira por nº de endossos",
        has: endorsementsDist.length > 0,
      },
      {
        id: "policiesIssued",
        title: "Apólices emitidas por mês",
        has: issuances.some((i) => i.apolices > 0),
      },
      {
        id: "endorsementsIssued",
        title: "Endossos emitidos por mês",
        has: issuances.some((i) => i.endossosTotal > 0),
      },
      { id: "issuancesByType", title: "Emissões por mês e por tipo", has: hasIssuances },
    ] as const;
  }, [
    series,
    sev,
    errorTypes,
    monthly,
    repasse,
    heatmap,
    apoliceRank,
    endossoRank,
    endorsementsDist,
    issuances,
  ]);
  const hasData = useMemo(
    () => Object.fromEntries(charts.map((c) => [c.title, c.has])) as Record<string, boolean>,
    [charts],
  );
  const hiddenCharts = preferences.hideEmptyCharts
    ? charts.filter((c) => preferences.charts[c.id] && !c.has).map((c) => c.title)
    : [];
  const visibleChartCount = charts.filter((chart) => preferences.charts[chart.id]).length;

  const chartsRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState<"none" | "report" | "charts">("none");

  const handleExportReport = async () => {
    if (!latest) return;
    setExporting("report");
    try {
      const { exportAuditPdf } = await import("@/lib/audit/export-pdf");
      exportAuditPdf(latest, history);
      toast.success("Relatório gerado");
    } catch (e) {
      toast.error("Falha ao gerar relatório", { description: (e as Error).message });
    } finally {
      setExporting("none");
    }
  };

  const handleExportCharts = async () => {
    if (!chartsRef.current) return;
    const nodes = Array.from(
      chartsRef.current.querySelectorAll<HTMLElement>('[data-export="chart"]'),
    );
    if (nodes.length === 0) return;
    setExporting("charts");
    try {
      const { exportChartsPdf } = await import("@/lib/analytics/export-charts");
      await exportChartsPdf(nodes, formatRangeBadge(range));
      toast.success(`${nodes.length} gráficos exportados`);
    } catch (e) {
      toast.error("Falha ao exportar gráficos", { description: (e as Error).message });
    } finally {
      setExporting("none");
    }
  };

  const loading = latestQ.isLoading || historyQ.isLoading;
  const lastRunAt = latest?.run.data_auditoria ?? latest?.run.created_at;

  return (
    <div className="mx-auto w-full max-w-[1320px] space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="page-title">Analytics</h1>
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30">
              BI · LIVE
            </span>
          </div>
          <p className="page-subtitle">
            Inteligência estratégica sobre carteira, runs de auditoria, severidade e eficiência
            operacional.
            {history.length > 0 && (
              <>
                {" · "}
                <span className="font-mono">{history.length}</span> runs no histórico
                {lastRunAt && <> · última {relativeTime(lastRunAt)}</>}
              </>
            )}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <AnalyticsPersonalizer
            preferences={preferences}
            onChange={updatePreferences}
            onReset={resetPreferences}
          />
          <DateRangeFilter value={range} onChange={setRange} />
          <button
            onClick={handleExportCharts}
            disabled={!latest || visibleChartCount === 0 || exporting !== "none"}
            className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-border bg-surface hover:bg-surface-2 text-[12px] font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {exporting === "charts" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
            Exportar gráficos (PDF)
          </button>
          <button
            onClick={handleExportReport}
            disabled={!latest || exporting !== "none"}
            className="inline-flex items-center gap-2 h-9 px-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-[12px] font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {exporting === "report" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <FileText className="h-3.5 w-3.5" />
            )}
            Relatório completo (PDF)
          </button>
        </div>
      </div>

      {loading && !latest ? (
        <LoadingState />
      ) : !latest ? (
        <EmptyState />
      ) : (
        <>
          {(preferences.kpis.weeklyRecurrence || preferences.kpis.weeklyDelinquent) && (
            <>
              <SectionTitle
                title="Indicadores operacionais"
                subtitle="Reincidência absoluta por período e saúde financeira da carteira"
              />
              <div className="grid gap-4 lg:grid-cols-3 [&>*:first-child]:lg:col-span-2 [&>*:only-child]:lg:col-span-3">
                {preferences.kpis.weeklyRecurrence && (
                  <RecurrenceKpiCard
                    data={ops?.recurrence ?? null}
                    loading={opsQ.isFetching}
                    granularity={recurrenceGranularity}
                    week={recurrenceWeek}
                    month={recurrenceMonth}
                    onGranularityChange={setRecurrenceGranularity}
                    onWeekChange={setRecurrenceWeek}
                    onMonthChange={setRecurrenceMonth}
                  />
                )}
                {preferences.kpis.weeklyDelinquent && (
                  <Kpi
                    label="Nº de contratos inadimplentes"
                    value={formatInt(ops?.weekly.inadimplentes ?? 0)}
                    hint={`${formatInt(ops?.weekly.inadimplentesSemanaAnterior ?? 0)} há 7 dias · ${(ops?.weekly.inadimplentesDelta ?? 0) > 0 ? "+" : ""}${formatInt(ops?.weekly.inadimplentesDelta ?? 0)} na tendência`}
                    tone={(ops?.weekly.inadimplentesDelta ?? 0) > 0 ? "destructive" : "success"}
                  />
                )}
              </div>
            </>
          )}

          <div ref={chartsRef} className="space-y-6">
            <div className="grid grid-cols-1 items-stretch gap-4 sm:gap-6 empty:hidden xl:grid-cols-2 [&>*:only-child]:col-span-full">
              <ChartCard
                title="Tendência de runs"
                visible={preferences.charts.runTrend}
                hideWhenEmpty={preferences.hideEmptyCharts}
                empty={!hasData["Tendência de runs"]}
                subtitle="Aprovados vs reprovados nas últimas 12 auditorias"
              >
                <div className="h-[230px] w-full min-w-0 sm:h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={series} margin={cartesianChartMargin}>
                      <defs>
                        <linearGradient id="gApr" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--success)" stopOpacity={0.5} />
                          <stop offset="100%" stopColor="var(--success)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="gRej" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--destructive)" stopOpacity={0.5} />
                          <stop offset="100%" stopColor="var(--destructive)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        stroke="var(--border)"
                        strokeDasharray="3 3"
                        vertical={false}
                      />
                      <XAxis {...chartXAxisProps} dataKey="label" />
                      <YAxis {...chartYAxisProps} />
                      <Tooltip {...tooltipProps} />
                      <Area
                        type="monotone"
                        dataKey="approved"
                        stackId="1"
                        stroke="var(--success)"
                        fill="url(#gApr)"
                      />
                      <Area
                        type="monotone"
                        dataKey="rejected"
                        stackId="1"
                        stroke="var(--destructive)"
                        fill="url(#gRej)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>

              <ChartCard
                title="Severidade"
                visible={preferences.charts.severity}
                hideWhenEmpty={preferences.hideEmptyCharts}
                empty={!hasData["Severidade"]}
                subtitle="Distribuição na última auditoria"
              >
                <div className="mx-auto grid w-full max-w-[480px] flex-1 items-center gap-3 sm:grid-cols-[minmax(0,1fr)_9rem] sm:gap-4">
                  <div className="h-[210px] w-full min-w-0 sm:h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={severityData}
                          dataKey="value"
                          cx="50%"
                          cy="50%"
                          innerRadius={54}
                          outerRadius={84}
                          paddingAngle={3}
                          stroke="none"
                        >
                          {severityData.map((item) => (
                            <Cell key={item.name} fill={item.color} />
                          ))}
                        </Pie>
                        <Tooltip {...tooltipProps} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <SeverityLegend sev={sev} />
                </div>
              </ChartCard>
            </div>

            <div className="grid grid-cols-1 items-stretch gap-4 sm:gap-6 empty:hidden xl:grid-cols-2 [&>*:only-child]:col-span-full">
              <ChartCard
                title="Conformidade ao longo do tempo"
                visible={preferences.charts.conformity}
                hideWhenEmpty={preferences.hideEmptyCharts}
                empty={!hasData["Conformidade ao longo do tempo"]}
                subtitle="% aprovado por run"
              >
                <div className="h-[220px] w-full min-w-0 sm:h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={series.map((s) => ({
                        ...s,
                        conf: s.total ? (s.approved / s.total) * 100 : 0,
                      }))}
                      margin={cartesianChartMargin}
                    >
                      <CartesianGrid
                        stroke="var(--border)"
                        strokeDasharray="3 3"
                        vertical={false}
                      />
                      <XAxis {...chartXAxisProps} dataKey="label" />
                      <YAxis
                        {...chartYAxisProps}
                        domain={[0, 100]}
                        tickFormatter={(v) => `${v}%`}
                      />
                      <Tooltip {...tooltipProps} formatter={(v) => formatPct(Number(v), 1)} />
                      <Line
                        type="monotone"
                        dataKey="conf"
                        stroke="var(--primary)"
                        strokeWidth={2}
                        dot={{ fill: "var(--primary)", r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>

              <ChartCard
                title="Volume processado"
                visible={preferences.charts.processedVolume}
                hideWhenEmpty={preferences.hideEmptyCharts}
                empty={!hasData["Volume processado"]}
                subtitle="Apólices auditadas por run"
              >
                <div className="h-[220px] w-full min-w-0 sm:h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={series} margin={cartesianChartMargin}>
                      <CartesianGrid
                        stroke="var(--border)"
                        strokeDasharray="3 3"
                        vertical={false}
                      />
                      <XAxis {...chartXAxisProps} dataKey="label" />
                      <YAxis {...chartYAxisProps} />
                      <Tooltip {...tooltipProps} />
                      <Bar dataKey="total" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
            </div>

            <div className="grid grid-cols-1 items-stretch gap-4 sm:gap-6 empty:hidden xl:grid-cols-2 [&>*:only-child]:col-span-full">
              <ChartCard
                title="Top 10 tipos de erro"
                visible={preferences.charts.errorTypes}
                hideWhenEmpty={preferences.hideEmptyCharts}
                empty={!hasData["Top 10 tipos de erro"]}
                subtitle="Última auditoria"
              >
                {errorTypes.length === 0 ? (
                  <EmptyMsg text="Nenhum tipo de erro nesta run." />
                ) : (
                  <div className="h-[260px] w-full min-w-0 sm:h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={errorTypes} layout="vertical" margin={{ left: 8, right: 16 }}>
                        <CartesianGrid
                          stroke="var(--border)"
                          strokeDasharray="3 3"
                          horizontal={false}
                        />
                        <XAxis
                          type="number"
                          stroke="var(--muted-foreground)"
                          fontSize={11}
                          axisLine={false}
                          tickLine={false}
                          tickMargin={8}
                        />
                        <YAxis
                          type="category"
                          dataKey="tipo"
                          stroke="var(--muted-foreground)"
                          fontSize={10}
                          width={132}
                          axisLine={false}
                          tickLine={false}
                          tickMargin={8}
                          tickFormatter={(v: string) => (v.length > 22 ? v.slice(0, 22) + "…" : v)}
                        />
                        <Tooltip {...tooltipProps} />
                        <Bar dataKey="count" fill="var(--destructive)" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </ChartCard>

              <ChartCard
                title="Findings por mês de vigência"
                visible={preferences.charts.findingsByMonth}
                hideWhenEmpty={preferences.hideEmptyCharts}
                empty={!hasData["Findings por mês de vigência"]}
                subtitle="Distribuição temporal das inconsistências"
              >
                {monthly.length === 0 ? (
                  <EmptyMsg text="Sem datas de vigência nos findings." />
                ) : (
                  <div className="h-[260px] w-full min-w-0 sm:h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthly} margin={cartesianChartMargin}>
                        <CartesianGrid
                          stroke="var(--border)"
                          strokeDasharray="3 3"
                          vertical={false}
                        />
                        <XAxis {...chartXAxisProps} dataKey="label" fontSize={10} />
                        <YAxis {...chartYAxisProps} />
                        <Tooltip {...tooltipProps} />
                        <Bar dataKey="count" fill="var(--info)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </ChartCard>
            </div>

            <ChartCard
              title="Repasse Excelsior mês a mês (USD)"
              visible={preferences.charts.revenue}
              hideWhenEmpty={preferences.hideEmptyCharts}
              empty={!hasData["Receita Excelsior (USD)"]}
              subtitle="Mesma competência, fonte monetária e arredondamento do Mapa de Repasses: data_quitacao + valor_total das parcelas com quitação total."
            >
              {repasse.length === 0 ? (
                <EmptyMsg text="Sem parcelas com quitação total sincronizadas." />
              ) : (
                <div className="min-w-0">
                  <div className="mb-4 grid gap-2 sm:grid-cols-3">
                    <RevenueSummary
                      label="Repasse no período"
                      value={formatUSD(repasseTotals.excelsiorLiquido, {
                        maximumFractionDigits: 2,
                      })}
                    />
                    <RevenueSummary
                      label="Média mensal"
                      value={formatUSD(repasseAvg, { maximumFractionDigits: 2 })}
                    />
                    <RevenueSummary
                      label="Prêmio total pago"
                      value={formatUSD(repasseTotals.premioTotalPago, {
                        maximumFractionDigits: 2,
                      })}
                    />
                  </div>
                  <div className="h-[330px] w-full min-w-0 sm:h-[390px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={repasse}
                        margin={{ top: 36, right: 24, left: 8, bottom: 8 }}
                      >
                        <defs>
                          <linearGradient id="gCarregamento" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary)" stopOpacity={1} />
                            <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.65} />
                          </linearGradient>
                          <linearGradient id="gPremioDireto" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--success)" stopOpacity={1} />
                            <stop offset="100%" stopColor="var(--success)" stopOpacity={0.7} />
                          </linearGradient>
                          <linearGradient id="gLiquido" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--info)" stopOpacity={1} />
                            <stop offset="100%" stopColor="var(--primary)" stopOpacity={1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          stroke="var(--border)"
                          strokeDasharray="3 3"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="label"
                          stroke="var(--muted-foreground)"
                          fontSize={11}
                          tickMargin={10}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          stroke="var(--muted-foreground)"
                          fontSize={11}
                          tickFormatter={(v) => `$${formatCompact(Number(v))}`}
                          axisLine={false}
                          tickLine={false}
                          width={60}
                          domain={[0, repasseMax]}
                          tickCount={6}
                          allowDecimals={false}
                        />
                        <Tooltip
                          {...tooltipProps}
                          cursor={{ fill: "var(--muted)", fillOpacity: 0.22 }}
                          content={<RepasseTooltip />}
                        />
                        <Legend
                          wrapperStyle={{ fontSize: 11, paddingTop: 14 }}
                          iconType="circle"
                          iconSize={8}
                        />
                        <ReferenceLine
                          y={REPASSE_RULES.FIXO_SUPLEMENTAR_PISO}
                          stroke="var(--muted-foreground)"
                          strokeDasharray="5 5"
                          strokeOpacity={0.7}
                          label={{
                            value: "Piso contratual",
                            position: "insideTopRight",
                            fill: "var(--muted-foreground)",
                            fontSize: 9,
                          }}
                        />
                        <Bar
                          dataKey="carregamentoExcelsior"
                          name="Carregamento (piso)"
                          stackId="rec"
                          fill="url(#gCarregamento)"
                          maxBarSize={44}
                          isAnimationActive
                          animationDuration={900}
                        />
                        <Bar
                          dataKey="premioDireto"
                          name="Prêmio Direto"
                          stackId="rec"
                          fill="url(#gPremioDireto)"
                          maxBarSize={44}
                          isAnimationActive
                          animationDuration={900}
                        />
                        <Bar
                          dataKey="pisCofins"
                          name="PIS/COFINS do repasse"
                          stackId="rec"
                          fill="var(--warning)"
                          radius={[6, 6, 0, 0]}
                          maxBarSize={44}
                          isAnimationActive
                          animationDuration={900}
                        />
                        <Line
                          type="monotone"
                          dataKey="excelsiorLiquido"
                          name="Total do Repasse à Excelsior"
                          stroke="url(#gLiquido)"
                          strokeWidth={3}
                          dot={{
                            fill: "var(--info)",
                            r: 4,
                            strokeWidth: 2,
                            stroke: "var(--surface)",
                          }}
                          activeDot={{ r: 7 }}
                          isAnimationActive
                          animationDuration={1200}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </ChartCard>

            <ChartCard
              title="Heatmap · tipo de erro × runs"
              visible={preferences.charts.heatmap}
              hideWhenEmpty={preferences.hideEmptyCharts}
              empty={!hasData["Heatmap · tipo de erro × runs"]}
              subtitle="Intensidade de inconsistências por tipo nas últimas runs"
            >
              <Heatmap runs={heatmap.runs} rows={heatmap.rows} />
            </ChartCard>

            <div className="grid grid-cols-1 items-stretch gap-4 sm:gap-6 empty:hidden xl:grid-cols-2 [&>*:only-child]:col-span-full">
              <ChartCard
                title="Apólices mais problemáticas"
                visible={preferences.charts.problemPolicies}
                hideWhenEmpty={preferences.hideEmptyCharts}
                empty={!hasData["Apólices mais problemáticas"]}
                subtitle={`Top ${apoliceRank.length} por nº de inconsistências`}
              >
                {apoliceRank.length === 0 ? (
                  <EmptyMsg text="Nenhuma apólice com inconsistências." />
                ) : (
                  <div className="space-y-2.5">
                    {apoliceRank.map((g, i) => {
                      const max = apoliceRank[0].total;
                      const s = countBySeverity(g.findings);
                      return (
                        <div key={g.apolice} className="group">
                          <div className="flex items-baseline justify-between mb-1.5 gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="font-mono text-[10.5px] text-muted-foreground w-5">
                                #{i + 1}
                              </span>
                              <Link
                                to="/apolices/$id"
                                params={{ id: g.apolice }}
                                className="font-mono text-[11.5px] text-foreground hover:text-primary truncate"
                              >
                                {g.apolice}
                              </Link>
                              {s.erros > 0 && (
                                <span className="text-[10px] font-mono text-destructive bg-destructive/10 px-1.5 py-0.5 rounded">
                                  {s.erros}E
                                </span>
                              )}
                              {s.alertas > 0 && (
                                <span className="text-[10px] font-mono text-warning bg-warning/10 px-1.5 py-0.5 rounded">
                                  {s.alertas}A
                                </span>
                              )}
                            </div>
                            <span className="font-mono text-[12px] text-foreground">{g.total}</span>
                          </div>
                          <div className="h-1 rounded-full bg-background overflow-hidden">
                            <div
                              className="h-full bg-linear-to-r from-destructive to-warning transition-all"
                              style={{ width: `${(g.total / max) * 100}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </ChartCard>

              <ChartCard
                title="Top endossos com inconsistências"
                visible={preferences.charts.problemEndorsements}
                hideWhenEmpty={preferences.hideEmptyCharts}
                empty={!hasData["Top endossos com inconsistências"]}
                subtitle="Endossos que mais acumulam findings"
              >
                {endossoRank.length === 0 ? (
                  <EmptyMsg text="Sem endossos identificados." />
                ) : (
                  <div className="space-y-2.5">
                    {endossoRank.map((e, i) => {
                      const max = endossoRank[0].total;
                      return (
                        <div key={e.endosso} className="group">
                          <div className="flex items-baseline justify-between mb-1.5 gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="font-mono text-[10.5px] text-muted-foreground w-5">
                                #{i + 1}
                              </span>
                              <span className="font-mono text-[11.5px] text-foreground truncate">
                                {e.endosso}
                              </span>
                              <span className="text-[10px] text-muted-foreground">
                                {e.apolices} apólices
                              </span>
                            </div>
                            <span className="font-mono text-[12px] text-foreground">{e.total}</span>
                          </div>
                          <div className="h-1 rounded-full bg-background overflow-hidden">
                            <div
                              className="h-full bg-linear-to-r from-warning to-destructive transition-all"
                              style={{ width: `${(e.total / max) * 100}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </ChartCard>
            </div>

            <div className="grid grid-cols-1 items-stretch gap-4 sm:gap-6 empty:hidden xl:grid-cols-2 [&>*:only-child]:col-span-full">
              <ChartCard
                title="Carteira por nº de endossos"
                visible={preferences.charts.portfolioEndorsements}
                hideWhenEmpty={preferences.hideEmptyCharts}
                empty={!hasData["Carteira por nº de endossos"]}
                subtitle="Quantas alterações cada apólice acumulou"
              >
                {endorsementsDist.length === 0 ? (
                  <EmptyMsg text="Sem apólices na carteira." />
                ) : (
                  <div className="h-[230px] w-full min-w-0 sm:h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={endorsementsDist} margin={cartesianChartMargin}>
                        <CartesianGrid
                          stroke="var(--border)"
                          strokeDasharray="3 3"
                          vertical={false}
                        />
                        <XAxis {...chartXAxisProps} dataKey="label" />
                        <YAxis {...chartYAxisProps} />
                        <Tooltip {...tooltipProps} />
                        <Bar dataKey="count" fill="var(--info)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </ChartCard>

              <ChartCard
                title="Apólices emitidas por mês"
                visible={preferences.charts.policiesIssued}
                hideWhenEmpty={preferences.hideEmptyCharts}
                empty={!hasData["Apólices emitidas por mês"]}
                subtitle={`${formatInt(totalApolices)} apólices em ${issuances.filter((i) => i.apolices > 0).length} meses`}
              >
                {issuances.length === 0 ? (
                  <EmptyMsg text="Sem emissões registradas." />
                ) : (
                  <div className="h-[230px] w-full min-w-0 sm:h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={issuances} margin={cartesianChartMargin}>
                        <CartesianGrid
                          stroke="var(--border)"
                          strokeDasharray="3 3"
                          vertical={false}
                        />
                        <XAxis {...chartXAxisProps} dataKey="label" fontSize={10} />
                        <YAxis {...chartYAxisProps} allowDecimals={false} />
                        <Tooltip {...tooltipProps} formatter={(v) => formatInt(Number(v))} />
                        <Bar
                          dataKey="apolices"
                          name="Apólices"
                          fill="var(--primary)"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </ChartCard>
            </div>

            <div className="grid grid-cols-1 items-stretch gap-4 sm:gap-6 empty:hidden xl:grid-cols-2 [&>*:only-child]:col-span-full">
              <ChartCard
                title="Endossos emitidos por mês"
                visible={preferences.charts.endorsementsIssued}
                hideWhenEmpty={preferences.hideEmptyCharts}
                empty={!hasData["Endossos emitidos por mês"]}
                subtitle={`${formatInt(totalEndossos)} endossos em ${issuances.filter((i) => i.endossosTotal > 0).length} meses`}
              >
                {issuances.length === 0 ? (
                  <EmptyMsg text="Sem endossos registrados." />
                ) : (
                  <div className="h-[230px] w-full min-w-0 sm:h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={issuances} margin={cartesianChartMargin}>
                        <CartesianGrid
                          stroke="var(--border)"
                          strokeDasharray="3 3"
                          vertical={false}
                        />
                        <XAxis {...chartXAxisProps} dataKey="label" fontSize={10} />
                        <YAxis {...chartYAxisProps} allowDecimals={false} />
                        <Tooltip {...tooltipProps} formatter={(v) => formatInt(Number(v))} />
                        <Bar
                          dataKey="endossosTotal"
                          name="Endossos"
                          fill="var(--warning)"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </ChartCard>

              <ChartCard
                title="Emissões por mês e por tipo"
                visible={preferences.charts.issuancesByType}
                hideWhenEmpty={preferences.hideEmptyCharts}
                empty={!hasData["Emissões por mês e por tipo"]}
                subtitle="Apólices e endossos (A, B, C, D) lado a lado"
              >
                {issuances.length === 0 ? (
                  <EmptyMsg text="Sem emissões registradas." />
                ) : (
                  <>
                    <div className="h-[230px] w-full min-w-0 sm:h-[280px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={issuances} margin={cartesianChartMargin}>
                          <CartesianGrid
                            stroke="var(--border)"
                            strokeDasharray="3 3"
                            vertical={false}
                          />
                          <XAxis {...chartXAxisProps} dataKey="label" fontSize={10} />
                          <YAxis {...chartYAxisProps} allowDecimals={false} />
                          <Tooltip {...tooltipProps} formatter={(v) => formatInt(Number(v))} />
                          <Bar
                            dataKey="apolices"
                            name="Apólice"
                            stackId="emi"
                            fill="var(--primary)"
                          />
                          <Bar
                            dataKey="endossoA"
                            name="Endosso A"
                            stackId="emi"
                            fill="var(--info)"
                          />
                          <Bar
                            dataKey="endossoB"
                            name="Endosso B"
                            stackId="emi"
                            fill="var(--success)"
                          />
                          <Bar
                            dataKey="endossoC"
                            name="Endosso C"
                            stackId="emi"
                            fill="var(--warning)"
                          />
                          <Bar
                            dataKey="endossoD"
                            name="Endosso D"
                            stackId="emi"
                            fill="var(--destructive)"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <ul
                      aria-label="Legenda dos tipos de emissão"
                      className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-muted-foreground"
                    >
                      {issuanceLegendItems.map((item) => (
                        <li key={item.name} className="inline-flex items-center gap-1.5">
                          <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ background: item.color }}
                          />
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </ChartCard>
            </div>
          </div>

          {hiddenCharts.length > 0 && (
            <div className="flex items-start gap-2 rounded-lg border border-dashed border-border bg-surface/40 px-3 py-2 text-[11.5px] text-muted-foreground">
              <EyeOff className="h-3.5 w-3.5 mt-0.5 shrink-0" />
              <span>
                {hiddenCharts.length === 1
                  ? "1 gráfico oculto"
                  : `${hiddenCharts.length} gráficos ocultos`}{" "}
                por falta de informação relevante: {hiddenCharts.join(", ")}. Use o botão
                Personalizar para alterar esse comportamento.
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const tooltipProps = {
  contentStyle: {
    background: "var(--surface-2)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    fontSize: 12,
  },
  cursor: { fill: "var(--accent)", opacity: 0.3 },
} as const;

const cartesianChartMargin = { top: 8, right: 16, left: 0, bottom: 4 } as const;

const issuanceLegendItems = [
  { name: "Apólice", color: "var(--primary)" },
  { name: "Endosso A", color: "var(--info)" },
  { name: "Endosso B", color: "var(--success)" },
  { name: "Endosso C", color: "var(--warning)" },
  { name: "Endosso D", color: "var(--destructive)" },
] as const;

const chartXAxisProps = {
  stroke: "var(--muted-foreground)",
  fontSize: 11,
  axisLine: false,
  tickLine: false,
  tickMargin: 10,
} as const;

const chartYAxisProps = {
  stroke: "var(--muted-foreground)",
  fontSize: 11,
  axisLine: false,
  tickLine: false,
  tickMargin: 8,
  width: 42,
} as const;

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-1">
      <h2 className="text-[13px] font-semibold uppercase tracking-wider text-foreground">
        {title}
      </h2>
      {subtitle && <span className="text-[11px] text-muted-foreground">{subtitle}</span>}
    </div>
  );
}

const KPI_STATUS_STYLE: Record<"ok" | "warn" | "bad", string> = {
  ok: "text-success bg-success/10 border-success/30",
  warn: "text-warning bg-warning/10 border-warning/30",
  bad: "text-destructive bg-destructive/10 border-destructive/30",
};

const KPI_STATUS_LABEL: Record<"ok" | "warn" | "bad", string> = {
  ok: "na meta",
  warn: "atenção",
  bad: "fora da meta",
};

function RecurrenceKpiCard({
  data,
  loading,
  granularity,
  week,
  month,
  onGranularityChange,
  onWeekChange,
  onMonthChange,
}: {
  data: RecurrenceKpi | null;
  loading: boolean;
  granularity: RecurrenceGranularity;
  week: string;
  month: string;
  onGranularityChange: (value: RecurrenceGranularity) => void;
  onWeekChange: (value: string) => void;
  onMonthChange: (value: string) => void;
}) {
  const periodLabel = data
    ? `${formatPeriodDate(data.startDate)} a ${formatPeriodDate(data.endDate)}`
    : "Carregando período…";

  return (
    <section className="panel min-w-0 p-4 sm:p-5" aria-labelledby="recurrence-kpi-title">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div
            id="recurrence-kpi-title"
            className="text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground"
          >
            Número de reincidências
          </div>
          <div className="mt-1 flex items-end gap-2">
            <span className="text-[28px] font-semibold tabular-nums text-foreground">
              {formatInt(data?.total ?? 0)}
            </span>
            <span className="pb-1 text-[11px] text-muted-foreground">
              ocorrência(s) reincidente(s)
            </span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {periodLabel} · {formatInt(data?.runs ?? 0)} auditoria(s)
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <div
            className="inline-flex rounded-full border border-border bg-surface-2 p-0.5"
            aria-label="Periodicidade da reincidência"
          >
            {(["week", "month"] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={granularity === option}
                onClick={() => onGranularityChange(option)}
                className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition ${
                  granularity === option
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {option === "week" ? "Semanal" : "Mensal"}
              </button>
            ))}
          </div>
          <label className="sr-only" htmlFor="recurrence-period">
            {granularity === "week" ? "Semana analisada" : "Mês analisado"}
          </label>
          <input
            id="recurrence-period"
            type={granularity}
            value={granularity === "week" ? week : month}
            onChange={(event) => {
              if (!event.target.value) return;
              if (granularity === "week") onWeekChange(event.target.value);
              else onMonthChange(event.target.value);
            }}
            className="h-9 rounded-full border border-border bg-surface px-3 text-[11px] font-medium text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-border/80 bg-surface/55">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-b border-border/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:px-4">
          <span>Erro conhecido</span>
          <span>Reincidências</span>
        </div>
        <div className="max-h-64 divide-y divide-border/60 overflow-y-auto" aria-live="polite">
          {loading && !data ? (
            <div className="flex items-center justify-center gap-2 px-4 py-8 text-[11px] text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Atualizando indicador
            </div>
          ) : data?.porTipo.length ? (
            data.porTipo.map((item) => (
              <div
                key={item.tipoErro}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 py-2.5 text-[12px] sm:px-4"
              >
                <span className="min-w-0 truncate text-foreground" title={item.tipoErro}>
                  {item.tipoErro}
                </span>
                <span
                  className={`min-w-8 rounded-full px-2 py-0.5 text-center font-mono font-semibold tabular-nums ${
                    item.reincidencias > 0
                      ? "bg-destructive/10 text-destructive"
                      : "bg-surface-2 text-muted-foreground"
                  }`}
                >
                  {formatInt(item.reincidencias)}
                </span>
              </div>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-[11px] text-muted-foreground">
              Nenhum tipo de erro conhecido no histórico.
            </div>
          )}
        </div>
      </div>
      <p className="mt-3 text-[10.5px] leading-relaxed text-muted-foreground">
        Conta uma vez cada ocorrência cujo tipo já existia antes do período selecionado, mesmo que
        reapareça em outra apólice. Persistências da mesma ocorrência em várias auditorias não são
        duplicadas.
      </p>
    </section>
  );
}

function Kpi({
  label,
  value,
  hint,
  delta,
  deltaSuffix = "%",
  tone,
  invertDelta,
  target,
  status,
}: {
  label: string;
  value: string;
  hint?: string;
  delta?: number;
  deltaSuffix?: string;
  tone?: "success" | "warning" | "destructive";
  invertDelta?: boolean;
  target?: string;
  status?: "ok" | "warn" | "bad";
}) {
  const toneClass =
    tone === "success"
      ? "text-success"
      : tone === "warning"
        ? "text-warning"
        : tone === "destructive"
          ? "text-destructive"
          : "text-foreground";

  const showDelta = delta !== undefined && Number.isFinite(delta) && Math.abs(delta) >= 0.05;
  const positive = invertDelta ? (delta ?? 0) < 0 : (delta ?? 0) > 0;
  return (
    <div className="panel p-4">
      <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground font-medium">
        {label}
      </div>
      <div className={`mt-1.5 text-[18px] sm:text-[22px] font-semibold tabular-nums ${toneClass}`}>
        {value}
      </div>
      <div className="mt-1 flex items-center gap-2 text-[11px]">
        {showDelta && (
          <span className={`font-mono ${positive ? "text-success" : "text-destructive"}`}>
            {(delta ?? 0) > 0 ? "▲" : "▼"} {Math.abs(delta ?? 0).toFixed(1)}
            {deltaSuffix}
          </span>
        )}
        {hint && <span className="text-muted-foreground truncate">{hint}</span>}
      </div>
      {(target || status) && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {target && (
            <span className="text-[10px] font-mono text-muted-foreground/90">{target}</span>
          )}
          {status && (
            <span
              className={`rounded border px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide ${KPI_STATUS_STYLE[status]}`}
            >
              {KPI_STATUS_LABEL[status]}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  className,
  empty,
  visible,
  hideWhenEmpty,
  children,
}: {
  title: string;
  subtitle?: string;
  className?: string;
  /** true quando o gráfico não tem dados relevantes */
  empty?: boolean;
  visible: boolean;
  hideWhenEmpty: boolean;
  children: React.ReactNode;
}) {
  if (!visible || (empty && hideWhenEmpty)) return null;

  return (
    <div
      data-export="chart"
      data-title={title}
      className={`panel flex h-full min-w-0 flex-col overflow-hidden p-4 sm:p-5 ${className ?? ""}`}
    >
      <div className="mb-4 min-h-12 shrink-0">
        <div className="text-[13px] font-semibold leading-5">{title}</div>
        {subtitle && (
          <div className="mt-0.5 text-[11px] leading-4 text-muted-foreground">{subtitle}</div>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

function SeverityLegend({ sev }: { sev: { erros: number; alertas: number; infos: number } }) {
  const items = [
    { name: "Erros", value: sev.erros, color: "var(--destructive)" },
    { name: "Alertas", value: sev.alertas, color: "var(--warning)" },
    { name: "Info", value: sev.infos, color: "var(--info)" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-1 sm:gap-2">
      {items.map((it) => (
        <div key={it.name} className="flex min-w-0 items-center gap-2 text-[11.5px]">
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: it.color }} />
          <span className="min-w-0 flex-1 truncate text-muted-foreground">{it.name}</span>
          <span className="font-mono text-foreground">{it.value}</span>
        </div>
      ))}
    </div>
  );
}

function Heatmap({
  runs,
  rows,
}: {
  runs: ReturnType<typeof runSeries>;
  rows: { tipo: string; cells: number[] }[];
}) {
  if (rows.length === 0 || runs.length === 0) {
    return <EmptyMsg text="Sem dados suficientes para o heatmap." />;
  }
  const max = Math.max(1, ...rows.flatMap((r) => r.cells));
  return (
    <div className="overflow-x-auto">
      <table className="data-table text-[10.5px]">
        <thead>
          <tr>
            <th className="text-left font-normal text-muted-foreground pb-2 pr-3 sticky left-0 bg-surface">
              Tipo de erro
            </th>
            {runs.map((r) => (
              <th
                key={r.id}
                className="text-center font-mono font-normal text-muted-foreground pb-2 px-1 min-w-[42px]"
              >
                {r.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, 12).map((r) => (
            <tr key={r.tipo}>
              <td className="py-1 pr-3 text-foreground truncate max-w-[200px] sticky left-0 bg-surface">
                {r.tipo}
              </td>
              {r.cells.map((c, i) => {
                const intensity = c / max;
                const bg =
                  c === 0
                    ? "transparent"
                    : `color-mix(in oklab, var(--destructive) ${Math.round(
                        20 + intensity * 70,
                      )}%, transparent)`;
                return (
                  <td key={i} className="p-0.5">
                    <div
                      className="h-7 rounded flex items-center justify-center font-mono text-[10px] text-foreground border border-border/40"
                      style={{ background: bg }}
                      title={`${c} inconsistências`}
                    >
                      {c > 0 ? formatCompact(c) : ""}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EmptyMsg({ text }: { text: string }) {
  return (
    <div className="flex min-h-[240px] flex-1 items-center justify-center px-4 text-center text-[12px] text-muted-foreground">
      {text}
    </div>
  );
}

function RevenueSummary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-surface-2/55 px-3 py-2.5">
      <div className="text-[9.5px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 truncate font-mono text-[13px] font-semibold tabular-nums text-foreground sm:text-[14px]">
        {value}
      </div>
    </div>
  );
}

function RepasseTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: Record<string, number> & { label: string } }>;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const d = payload[0].payload;
  const row = (label: string, value: number, tone?: string) => (
    <div className="flex items-center justify-between gap-6 text-[11px]">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-mono tabular-nums ${tone ?? "text-foreground"}`}>
        {formatUSD(value, { maximumFractionDigits: 2 })}
      </span>
    </div>
  );
  return (
    <div className="min-w-[250px] rounded-2xl border border-border bg-surface/95 p-3.5 shadow-elevated backdrop-blur">
      <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-2.5">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {d.label}
          </div>
          <div className="mt-0.5 text-[11px] text-muted-foreground">Repasse Excelsior</div>
        </div>
        <div className="font-mono text-[14px] font-semibold tabular-nums text-info">
          {formatUSD(d.excelsiorLiquido, { maximumFractionDigits: 2 })}
        </div>
      </div>
      <div className="mt-2.5 space-y-1.5">
        {row("Prêmio total pago", d.premioTotalPago)}
        {d.premioRetidoCorretores > 0
          ? row("Corretagem identificada", d.premioRetidoCorretores, "text-muted-foreground")
          : null}
        <div className="my-2 h-px bg-border/70" />
        {row("Carregamento", d.carregamentoExcelsior, "text-primary")}
        {row("Prêmio direto", d.premioDireto, "text-success")}
        {row("PIS/COFINS", d.pisCofins, "text-warning")}
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-4">
      <div className="bento">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-24 panel animate-pulse" />
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 h-[250px] sm:h-[320px] panel animate-pulse" />
        <div className="h-[250px] sm:h-[320px] panel animate-pulse" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="panel p-12 text-center">
      <BarChart3 className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
      <div className="text-[14px] font-semibold mb-1">Sem auditorias ainda</div>
      <p className="text-[12.5px] text-muted-foreground mb-4">
        Execute uma auditoria para começar a ver indicadores e gráficos por aqui.
      </p>
      <Link
        to="/operacao"
        className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-[12px] font-medium"
      >
        Ir para Operação
      </Link>
    </div>
  );
}
