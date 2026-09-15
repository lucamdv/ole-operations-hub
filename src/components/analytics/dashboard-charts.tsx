import { Link } from "@tanstack/react-router";
import { AlertTriangle, ChevronDown, Clock3, ShieldCheck } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Legend,
  Line,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ResponsiveContainer } from "@/components/charts/in-view-container";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { REPASSE_RULES } from "@/lib/analytics/repasse-rules";
import { buildDynamicHistogram } from "@/lib/analytics/dashboard-core";
import type { AnalyticsAggregates } from "@/lib/analytics.functions";
import { KNOWN_AUDIT_ERROR_TYPES } from "@/lib/audit/error-groups";
import { formatCompact, formatInt, formatUSD } from "@/lib/format";
import type { RecurrenceKpi } from "@/lib/kpis/derive";
import { cn } from "@/lib/utils";

export type AnalyticsCategory = "operational" | "financial";
export type AnalyticsChartId =
  "financialHealth" | "repasse" | "recurrence" | "corrections" | "issuances";

export interface AnalyticsCatalogItem {
  id: AnalyticsChartId;
  title: string;
  description: string;
  category: AnalyticsCategory;
  categoryLabel: "Operacional" | "Financeiro";
  chartType: "Indicadores" | "Lista" | "Histograma" | "Barras" | "Composto";
  thumbnail: readonly number[];
}

export const ANALYTICS_CATALOG: readonly AnalyticsCatalogItem[] = [
  {
    id: "recurrence",
    title: "Reincidências por tipo de erro",
    description: "Ocorrências reincidentes no mês selecionado.",
    category: "operational",
    categoryLabel: "Operacional",
    chartType: "Lista",
    thumbnail: [35, 72, 48, 86, 54],
  },
  {
    id: "corrections",
    title: "Endossos de correção por apólice",
    description: "Distribuição dinâmica das correções na carteira.",
    category: "operational",
    categoryLabel: "Operacional",
    chartType: "Histograma",
    thumbnail: [88, 66, 43, 25, 12],
  },
  {
    id: "issuances",
    title: "Emissões por mês e por tipo",
    description: "Apólices, A de fatura, A de correção e C.",
    category: "operational",
    categoryLabel: "Operacional",
    chartType: "Barras",
    thumbnail: [42, 64, 53, 78, 68],
  },
  {
    id: "financialHealth",
    title: "Saúde financeira da carteira",
    description: "Contratos ativos, atrasados e inadimplentes.",
    category: "financial",
    categoryLabel: "Financeiro",
    chartType: "Indicadores",
    thumbnail: [82, 48, 23],
  },
  {
    id: "repasse",
    title: "Repasse Excelsior mês a mês",
    description: "Repasse líquido e sua composição mensal.",
    category: "financial",
    categoryLabel: "Financeiro",
    chartType: "Composto",
    thumbnail: [32, 51, 44, 71, 83],
  },
] as const;

export interface AnalyticsRangeBounds {
  from: string | null;
  to: string | null;
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
  allowDecimals: false,
} as const;

function monthInRange(month: string, bounds: AnalyticsRangeBounds) {
  if (bounds.from && month < bounds.from.slice(0, 7)) return false;
  if (bounds.to && month > bounds.to.slice(0, 7)) return false;
  return true;
}

function numberLabel(value: unknown) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? formatInt(number) : "";
}

function normalizedError(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLocaleUpperCase("pt-BR")
    .replace(/\s+/g, " ");
}

export function AnalyticsCard({
  title,
  subtitle,
  actions,
  className,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      data-export="chart"
      data-title={title}
      className={cn("panel flex h-full min-w-0 flex-col overflow-hidden p-4 sm:p-5", className)}
    >
      <div className="mb-4 flex min-h-12 shrink-0 flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-[13px] font-semibold leading-5">{title}</h2>
          {subtitle ? (
            <p className="mt-0.5 max-w-3xl text-[11px] leading-4 text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
        </div>
        {actions}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </section>
  );
}

function EmptyChart({ text }: { text: string }) {
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

export function FinancialHealthPanel({ aggregates }: { aggregates: AnalyticsAggregates }) {
  const health = aggregates.financialHealth;
  const referenceLabel = new Intl.DateTimeFormat("pt-BR").format(
    new Date(`${health.referenceDate}T12:00:00.000Z`),
  );
  return (
    <AnalyticsCard
      title="Saúde financeira da carteira"
      subtitle={`Posição em ${referenceLabel}. Inadimplência a partir de ${health.thresholdDays} dias após o vencimento.`}
      actions={
        <Link
          to="/configuracoes"
          className="rounded-lg border border-border bg-surface-2 px-2.5 py-1.5 text-[10.5px] font-medium text-muted-foreground transition hover:text-foreground"
        >
          Alterar prazo
        </Link>
      }
    >
      <div className="grid gap-3 md:grid-cols-3">
        <HealthMetric
          icon={<ShieldCheck className="h-4 w-4" />}
          label="Contratos ativos"
          value={formatInt(health.activeContracts)}
          tone="success"
          hint="apólices em situação ativa"
        />
        <HealthMetric
          icon={<Clock3 className="h-4 w-4" />}
          label="Contratos atrasados"
          value={formatInt(health.lateContracts)}
          tone="warning"
          hint={`1 a ${Math.max(1, health.thresholdDays - 1)} dias`}
          money={formatUSD(health.lateRevenueUsd, { maximumFractionDigits: 2 })}
        />
        <HealthMetric
          icon={<AlertTriangle className="h-4 w-4" />}
          label="Contratos inadimplentes"
          value={formatInt(health.delinquentContracts)}
          tone="destructive"
          hint={`${health.thresholdDays}+ dias`}
          money={formatUSD(health.delinquentRevenueUsd, { maximumFractionDigits: 2 })}
        />
      </div>
      <div className="mt-3 rounded-xl border border-border/70 bg-surface-2/35 px-3 py-2 text-[11px] text-muted-foreground">
        Contratos são contados uma vez na faixa mais crítica. A receita soma somente parcelas
        ativas, não quitadas e vencidas.
      </div>
    </AnalyticsCard>
  );
}

function HealthMetric({
  icon,
  label,
  value,
  tone,
  hint,
  money,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  tone: "success" | "warning" | "destructive";
  hint: string;
  money?: string;
}) {
  const styles = {
    success: "border-success/25 bg-success/5 text-success",
    warning: "border-warning/25 bg-warning/5 text-warning",
    destructive: "border-destructive/25 bg-destructive/5 text-destructive",
  };
  return (
    <div className={cn("rounded-2xl border p-4", styles[tone])}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span>
        {icon}
      </div>
      <div className="mt-3 font-mono text-[30px] font-semibold leading-none tabular-nums">
        {value}
      </div>
      <div className="mt-2 text-[10.5px] text-muted-foreground">{hint}</div>
      {money ? (
        <div className="mt-3 border-t border-current/15 pt-3">
          <div className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
            Receita exposta
          </div>
          <div className="mt-1 font-mono text-[14px] font-semibold tabular-nums text-foreground">
            {money}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function RecurrencePanel({
  recurrence,
  month,
  onMonthChange,
  loading,
}: {
  recurrence: RecurrenceKpi | null;
  month: string;
  onMonthChange?: (month: string) => void;
  loading?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rows = useMemo(() => {
    const counts = new Map(
      (recurrence?.porTipo ?? []).map((item) => [
        normalizedError(item.tipoErro),
        item.reincidencias,
      ]),
    );
    return KNOWN_AUDIT_ERROR_TYPES.map((tipoErro) => ({
      tipoErro,
      reincidencias: counts.get(normalizedError(tipoErro)) ?? 0,
    })).sort(
      (left, right) =>
        right.reincidencias - left.reincidencias ||
        left.tipoErro.localeCompare(right.tipoErro, "pt-BR"),
    );
  }, [recurrence]);
  const max = Math.max(1, ...rows.map((row) => row.reincidencias));

  return (
    <AnalyticsCard
      title="Reincidências por tipo de erro"
      subtitle="Visão mensal dos erros conhecidos. Persistências da mesma ocorrência dentro do mês são contadas uma única vez."
      actions={
        <label className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Mês
          <input
            type="month"
            value={month}
            onChange={(event) => onMonthChange?.(event.target.value)}
            disabled={!onMonthChange}
            className="h-8 rounded-lg border border-border bg-surface-2 px-2 font-mono text-[11px] text-foreground outline-none focus:border-primary disabled:opacity-70"
          />
        </label>
      }
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <MiniMetric label="Reincidências" value={formatInt(recurrence?.total ?? 0)} />
        <MiniMetric label="Runs no mês" value={formatInt(recurrence?.runs ?? 0)} />
        <MiniMetric label="Tipos monitorados" value={formatInt(rows.length)} />
      </div>

      <Collapsible open={open} onOpenChange={setOpen} className="mt-4">
        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-xl border border-border bg-surface-2/45 px-3 py-2.5 text-left transition hover:bg-surface-2">
          <span>
            <span className="block text-[11.5px] font-medium">
              {open ? "Recolher erros monitorados" : "Ver todos os erros monitorados"}
            </span>
            <span className="mt-0.5 block text-[10px] text-muted-foreground">
              {loading
                ? "Atualizando…"
                : `${rows.filter((row) => row.reincidencias > 0).length} com ocorrência no mês`}
            </span>
          </span>
          <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-2 divide-y divide-border/70 overflow-hidden rounded-xl border border-border">
            {rows.map((row) => (
              <div
                key={row.tipoErro}
                className="grid grid-cols-[minmax(0,1fr)_80px_34px] items-center gap-3 px-3 py-2.5"
              >
                <span className="text-[10.5px] font-medium leading-4">{row.tipoErro}</span>
                <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                  <div
                    className="h-full rounded-full bg-primary transition-[width]"
                    style={{ width: `${(row.reincidencias / max) * 100}%` }}
                  />
                </div>
                <span className="text-right font-mono text-[11px] font-semibold tabular-nums">
                  {formatInt(row.reincidencias)}
                </span>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </AnalyticsCard>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-surface-2/45 px-3 py-3">
      <div className="text-[9.5px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1.5 font-mono text-[20px] font-semibold tabular-nums">{value}</div>
    </div>
  );
}

export function CorrectionHistogram({
  aggregates,
  bounds,
}: {
  aggregates: AnalyticsAggregates;
  bounds: AnalyticsRangeBounds;
}) {
  const data = useMemo(
    () =>
      buildDynamicHistogram(
        aggregates.correctionsByPolicy.map(
          (policy) => policy.correctionMonths.filter((month) => monthInRange(month, bounds)).length,
        ),
      ),
    [aggregates.correctionsByPolicy, bounds],
  );
  const totalCorrections = aggregates.correctionsByPolicy.reduce(
    (sum, policy) =>
      sum + policy.correctionMonths.filter((month) => monthInRange(month, bounds)).length,
    0,
  );

  return (
    <AnalyticsCard
      title="Endossos de correção por apólice"
      subtitle="Histograma da quantidade de emissões A acima da cadência mensal esperada. Os intervalos se ajustam à amplitude real da carteira."
      actions={
        <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
          {formatInt(totalCorrections)} correções
        </span>
      }
    >
      {data.length === 0 ? (
        <EmptyChart text="Sem apólices para compor o histograma." />
      ) : (
        <div className="h-[300px] w-full min-w-0 sm:h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 28, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis {...chartXAxisProps} dataKey="label" />
              <YAxis {...chartYAxisProps} />
              <Tooltip
                {...tooltipProps}
                formatter={(value) => [formatInt(Number(value)), "Apólices"]}
                labelFormatter={(label) => `${label} correção(ões)`}
              />
              <Bar dataKey="count" name="Apólices" fill="var(--primary)" radius={[6, 6, 0, 0]}>
                <LabelList
                  dataKey="count"
                  position="top"
                  formatter={numberLabel}
                  fill="var(--foreground)"
                  fontSize={11}
                  fontWeight={600}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </AnalyticsCard>
  );
}

type IssuanceFilter = "all" | "A" | "C" | "policy";

export function IssuancesChart({
  aggregates,
  bounds,
}: {
  aggregates: AnalyticsAggregates;
  bounds: AnalyticsRangeBounds;
}) {
  const [filter, setFilter] = useState<IssuanceFilter>("all");
  const data = useMemo(
    () =>
      aggregates.issuancesByMonth
        .filter((row) => monthInRange(row.month, bounds))
        .map((row) => ({
          ...row,
          trend:
            filter === "A"
              ? row.endossoAFatura + row.endossoACorrecao
              : filter === "C"
                ? row.endossoC
                : filter === "policy"
                  ? row.apolices
                  : 0,
        })),
    [aggregates.issuancesByMonth, bounds, filter],
  );

  return (
    <AnalyticsCard
      title="Emissões por mês e por tipo"
      subtitle="A separa a cadência regular de faturas das correções excedentes. Selecione uma família para exibir sua linha de tendência."
      actions={
        <div className="flex items-center gap-1 rounded-xl border border-border bg-surface-2 p-1">
          {(
            [
              ["all", "Todos"],
              ["A", "A"],
              ["C", "C"],
              ["policy", "Apólice"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              aria-pressed={filter === value}
              className={cn(
                "h-7 rounded-lg px-2.5 text-[10.5px] font-medium transition",
                filter === value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      }
    >
      {data.length === 0 ? (
        <EmptyChart text="Sem emissões no período selecionado." />
      ) : (
        <div className="h-[330px] w-full min-w-0 sm:h-[390px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 30, right: 22, left: 0, bottom: 8 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis {...chartXAxisProps} dataKey="label" />
              <YAxis {...chartYAxisProps} />
              <Tooltip {...tooltipProps} />
              <Legend
                wrapperStyle={{ fontSize: 11, paddingTop: 14 }}
                iconType="circle"
                iconSize={8}
              />
              {(filter === "all" || filter === "policy") && (
                <Bar dataKey="apolices" name="Apólice" fill="var(--primary)" radius={[4, 4, 0, 0]}>
                  <LabelList
                    dataKey="apolices"
                    position="top"
                    formatter={numberLabel}
                    fontSize={10}
                  />
                </Bar>
              )}
              {(filter === "all" || filter === "A") && (
                <Bar
                  dataKey="endossoAFatura"
                  name="A (Fatura)"
                  fill="var(--info)"
                  radius={[4, 4, 0, 0]}
                >
                  <LabelList
                    dataKey="endossoAFatura"
                    position="top"
                    formatter={numberLabel}
                    fontSize={10}
                  />
                </Bar>
              )}
              {(filter === "all" || filter === "A") && (
                <Bar
                  dataKey="endossoACorrecao"
                  name="A (Correção)"
                  fill="var(--destructive)"
                  radius={[4, 4, 0, 0]}
                >
                  <LabelList
                    dataKey="endossoACorrecao"
                    position="top"
                    formatter={numberLabel}
                    fontSize={10}
                  />
                </Bar>
              )}
              {(filter === "all" || filter === "C") && (
                <Bar dataKey="endossoC" name="C" fill="var(--warning)" radius={[4, 4, 0, 0]}>
                  <LabelList
                    dataKey="endossoC"
                    position="top"
                    formatter={numberLabel}
                    fontSize={10}
                  />
                </Bar>
              )}
              {filter !== "all" ? (
                <Line
                  type="monotone"
                  dataKey="trend"
                  name="Tendência"
                  stroke="var(--foreground)"
                  strokeWidth={2.5}
                  dot={{
                    fill: "var(--surface)",
                    stroke: "var(--foreground)",
                    strokeWidth: 2,
                    r: 4,
                  }}
                  activeDot={{ r: 6 }}
                />
              ) : null}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </AnalyticsCard>
  );
}

export function RepasseChart({
  aggregates,
  bounds,
}: {
  aggregates: AnalyticsAggregates;
  bounds: AnalyticsRangeBounds;
}) {
  const repasse = aggregates.repasseByMonth.filter((row) => monthInRange(row.month, bounds));
  const totals = repasse.reduce(
    (accumulator, row) => ({
      carregamentoExcelsior: accumulator.carregamentoExcelsior + row.carregamentoExcelsior,
      premioDireto: accumulator.premioDireto + row.premioDireto,
      pisCofins: accumulator.pisCofins + row.pisCofins,
      excelsiorLiquido: accumulator.excelsiorLiquido + row.excelsiorLiquido,
      bruto: accumulator.bruto + row.bruto,
      premioTotalPago: accumulator.premioTotalPago + row.premioTotalPago,
    }),
    {
      carregamentoExcelsior: 0,
      premioDireto: 0,
      pisCofins: 0,
      excelsiorLiquido: 0,
      bruto: 0,
      premioTotalPago: 0,
    },
  );
  const average = repasse.length > 0 ? totals.excelsiorLiquido / repasse.length : 0;
  const peak = repasse.reduce(
    (maximum, row) =>
      Math.max(maximum, row.carregamentoExcelsior + row.premioDireto, row.excelsiorLiquido),
    0,
  );
  const repasseMax = peak === 0 ? 1_000 : Math.ceil((peak * 1.12) / 500) * 500;

  return (
    <AnalyticsCard
      title="Repasse Excelsior mês a mês (USD)"
      subtitle="Mesma competência, fonte monetária e arredondamento do Mapa de Repasses: data_quitacao + valor_total das parcelas com quitação total."
    >
      {repasse.length === 0 ? (
        <EmptyChart text="Sem parcelas com quitação total sincronizadas." />
      ) : (
        <div className="min-w-0">
          <div className="mb-4 grid gap-2 sm:grid-cols-3">
            <RevenueSummary
              label="Repasse no período"
              value={formatUSD(totals.excelsiorLiquido, { maximumFractionDigits: 2 })}
            />
            <RevenueSummary
              label="Média mensal"
              value={formatUSD(average, { maximumFractionDigits: 2 })}
            />
            <RevenueSummary
              label="Prêmio total pago"
              value={formatUSD(totals.premioTotalPago, { maximumFractionDigits: 2 })}
            />
          </div>
          <div className="h-[330px] w-full min-w-0 sm:h-[390px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={repasse} margin={{ top: 36, right: 24, left: 8, bottom: 8 }}>
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
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
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
                  tickFormatter={(value) => `$${formatCompact(Number(value))}`}
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
    </AnalyticsCard>
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
  const data = payload[0].payload;
  const row = (label: string, value: number, tone?: string) => (
    <div className="flex items-center justify-between gap-6 text-[11px]">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-mono tabular-nums", tone ?? "text-foreground")}>
        {formatUSD(value, { maximumFractionDigits: 2 })}
      </span>
    </div>
  );
  return (
    <div className="min-w-[250px] rounded-2xl border border-border bg-surface/95 p-3.5 shadow-elevated backdrop-blur">
      <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-2.5">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {data.label}
          </div>
          <div className="mt-0.5 text-[11px] text-muted-foreground">Repasse Excelsior</div>
        </div>
        <div className="font-mono text-[14px] font-semibold tabular-nums text-info">
          {formatUSD(data.excelsiorLiquido, { maximumFractionDigits: 2 })}
        </div>
      </div>
      <div className="mt-2.5 space-y-1.5">
        {row("Prêmio total pago", data.premioTotalPago)}
        {data.premioRetidoCorretores > 0
          ? row("Corretagem identificada", data.premioRetidoCorretores, "text-muted-foreground")
          : null}
        <div className="my-2 h-px bg-border/70" />
        {row("Carregamento", data.carregamentoExcelsior, "text-primary")}
        {row("Prêmio direto", data.premioDireto, "text-success")}
        {row("PIS/COFINS", data.pisCofins, "text-warning")}
      </div>
    </div>
  );
}

export function AnalyticsChartView({
  id,
  aggregates,
  recurrence,
  recurrenceMonth,
  onRecurrenceMonthChange,
  bounds,
  loadingRecurrence,
}: {
  id: AnalyticsChartId;
  aggregates: AnalyticsAggregates;
  recurrence: RecurrenceKpi | null;
  recurrenceMonth: string;
  onRecurrenceMonthChange?: (month: string) => void;
  bounds: AnalyticsRangeBounds;
  loadingRecurrence?: boolean;
}) {
  switch (id) {
    case "financialHealth":
      return <FinancialHealthPanel aggregates={aggregates} />;
    case "repasse":
      return <RepasseChart aggregates={aggregates} bounds={bounds} />;
    case "recurrence":
      return (
        <RecurrencePanel
          recurrence={recurrence}
          month={recurrenceMonth}
          onMonthChange={onRecurrenceMonthChange}
          loading={loadingRecurrence}
        />
      );
    case "corrections":
      return <CorrectionHistogram aggregates={aggregates} bounds={bounds} />;
    case "issuances":
      return <IssuancesChart aggregates={aggregates} bounds={bounds} />;
  }
}
