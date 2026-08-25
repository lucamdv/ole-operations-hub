import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  AlertOctagon,
  CheckCircle2,
  Cpu,
  FileText,
  Gauge,
  History,
  Radio,
  ShieldCheck,
  TimerReset,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";
import { ResponsiveContainer } from "@/components/charts/in-view-container";
import { useAuditHistory, useLatestAudit } from "@/hooks/use-audit";
import { useKpiTargets } from "@/hooks/use-kpi-targets";
import { useOperationKpis } from "@/hooks/use-operation-kpis";
import { useLatestPolicySync, usePolicies } from "@/hooks/use-policies";
import { errorTypeBreakdown, normalizeFinding, severityOf } from "@/lib/audit/derive";
import { formatDuracaoHoras, type ResolutionTimeStat } from "@/lib/audit/resolution-filter";
import type { AuditHistoryItem } from "@/lib/audit/types";
import { formatDateTime, formatInt, formatPct, relativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/operacao")({
  head: () => ({
    meta: [
      { title: "Operação · OLÉ COPILOT" },
      { name: "description", content: "Centro de monitoramento operacional em tempo real." },
    ],
  }),
  component: OperacaoPage,
});

function formatDuration(ms: number | null | undefined): string {
  if (!ms || ms <= 0) return "—";
  if (ms < 1000) return `${ms} ms`;
  const s = ms / 1000;
  if (s < 60) return `${s.toFixed(1)} s`;
  const m = Math.floor(s / 60);
  const rs = Math.round(s % 60);
  return `${m}m ${rs}s`;
}

interface HealthPoint {
  id: string;
  label: string;
  date: string;
  conformity: number;
  total: number;
  approved: number;
  rejected: number;
  durationMs: number | null;
}

function OperacaoPage() {
  const latestQ = useLatestAudit();
  const historyQ = useAuditHistory();
  const policiesQ = usePolicies();
  const syncQ = useLatestPolicySync();
  const operationKpisQ = useOperationKpis();
  const { targets } = useKpiTargets();

  const latest = latestQ.data ?? null;
  const history = historyQ.data ?? [];
  const policies = policiesQ.data ?? [];
  const sync = syncQ.data ?? null;
  const operationKpis = operationKpisQ.data;

  const isLoading =
    latestQ.isLoading || historyQ.isLoading || policiesQ.isLoading || operationKpisQ.isLoading;

  const run = latest?.run;
  const findings = latest?.findings ?? [];
  const total = run?.total_processado ?? 0;
  const reprov = run?.reprovados ?? 0;
  const aprov = run?.aprovados ?? 0;
  const durationMs = run?.duration_ms ?? null;
  const statusGeral = (run?.status_geral ?? "").toUpperCase();
  const conformity = total > 0 ? (aprov / total) * 100 : 0;
  const daily = operationKpis?.daily ?? {
    runAt: null,
    novas: 0,
    criticasAbertas: 0,
    resolvidas: 0,
    mediaMovel: 0,
    desvioPct: 0,
  };
  const resolution = operationKpis?.resolutionTime;
  const weekly = operationKpis?.weekly ?? {
    runs: 0,
    total: 0,
    repetidas: 0,
    novasUnicas: 0,
    reincidenciaPct: 0,
    apolicesReincidentes: 0,
  };

  const healthSeries: HealthPoint[] = [...history]
    .sort((a, b) => +new Date(a.created_at) - +new Date(b.created_at))
    .slice(-20)
    .map((item, index) => ({
      id: item.id,
      label: `R${index + 1}`,
      date: item.created_at,
      conformity: item.total_processado > 0 ? (item.aprovados / item.total_processado) * 100 : 0,
      total: item.total_processado,
      approved: item.aprovados,
      rejected: item.reprovados,
      durationMs: item.duration_ms,
    }));
  const currentHealth = healthSeries.at(-1)?.conformity ?? conformity;
  const previousHealth = healthSeries.at(-2)?.conformity ?? currentHealth;
  const healthDelta = currentHealth - previousHealth;
  const healthFloor = Math.max(
    0,
    Math.floor(Math.min(100, ...healthSeries.map((point) => point.conformity)) - 3),
  );
  const resolutionTypes = [...(resolution?.byTipo ?? [])]
    .filter((item) => item.mediaHoras > 0)
    .sort((a, b) => b.mediaHoras - a.mediaHoras)
    .slice(0, 5);
  const maxResolutionHours = Math.max(1, ...resolutionTypes.map((item) => item.mediaHoras));
  const breakdown = errorTypeBreakdown(findings);
  const maxBucket = breakdown[0]?.count ?? 1;

  const criticalFindings = findings.filter((f) => severityOf(f) === "erro").slice(0, 8);

  const vazao = durationMs && durationMs > 0 ? (total / (durationMs / 1000)).toFixed(1) : null;
  const avgDurationMs =
    history.length > 0
      ? Math.round(
          history.reduce((s, h) => s + (h.duration_ms ?? 0), 0) /
            history.filter((h) => h.duration_ms).length || 0,
        )
      : null;

  const healthTone =
    statusGeral === "SUCESSO"
      ? "success"
      : statusGeral === "ALERTA"
        ? "warning"
        : statusGeral === "ERRO"
          ? "destructive"
          : "default";

  const noData = !isLoading && !run;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Radio
            className={cn(
              "h-4 w-4 animate-pulse-dot",
              healthTone === "success" && "text-success",
              healthTone === "warning" && "text-warning",
              healthTone === "destructive" && "text-destructive",
              healthTone === "default" && "text-primary",
            )}
          />
          <span
            className={cn(
              "text-[11px] font-mono uppercase tracking-[0.2em]",
              healthTone === "success" && "text-success",
              healthTone === "warning" && "text-warning",
              healthTone === "destructive" && "text-destructive",
              healthTone === "default" && "text-primary",
            )}
          >
            NOC · {statusGeral || "AGUARDANDO"}
          </span>
        </div>
        <h1 className="page-title">Operação</h1>
        <p className="page-subtitle mt-1.5">
          {run?.mensagem_geral ??
            "Painel operacional · dados da última execução do motor de auditoria."}
        </p>
      </div>

      {/* Empty state */}
      {noData && (
        <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
          <Activity className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <div className="text-[14px] font-semibold mb-1">Nenhuma execução de auditoria ainda</div>
          <p className="text-[12px] text-muted-foreground">
            Dispare a primeira auditoria em{" "}
            <Link to="/alertas" className="text-primary underline-offset-2 hover:underline">
              Alertas
            </Link>{" "}
            para preencher este painel.
          </p>
        </div>
      )}

      {/* Indicadores essenciais movidos da Visão Geral */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 2xl:grid-cols-6">
        {isLoading ? (
          <>
            <Skeleton className="h-[88px] rounded-xl" />
            <Skeleton className="h-[88px] rounded-xl" />
            <Skeleton className="h-[88px] rounded-xl" />
            <Skeleton className="h-[88px] rounded-xl" />
            <Skeleton className="h-[88px] rounded-xl" />
            <Skeleton className="h-[88px] rounded-xl" />
          </>
        ) : (
          <>
            <MetricTile
              icon={FileText}
              label="Carteira total"
              value={formatInt(operationKpis?.carteiraTotal ?? policies.length)}
              tone="default"
              hint={`${formatInt(operationKpis?.contratosAtivos ?? 0)} contratos ativos`}
            />
            <MetricTile
              icon={ShieldCheck}
              label="Conformidade"
              value={`${conformity.toFixed(1)}%`}
              tone={conformity >= 99 ? "success" : conformity >= 95 ? "warning" : "destructive"}
              hint={`${formatInt(reprov)} apólices com desvio`}
            />
            <MetricTile
              icon={Activity}
              label="Novas inconsistências"
              value={formatInt(daily.novas)}
              tone={daily.desvioPct > targets.picoDesvioPct ? "warning" : "info"}
              hint={`média móvel ${formatInt(daily.mediaMovel)}`}
            />
            <MetricTile
              icon={AlertOctagon}
              label="Críticas em aberto"
              value={formatInt(daily.criticasAbertas)}
              tone={daily.criticasAbertas > targets.criticasAbertasMax ? "destructive" : "warning"}
              hint={`meta ≤ ${formatInt(targets.criticasAbertasMax)}`}
            />
            <MetricTile
              icon={CheckCircle2}
              label="Resolvidas no ciclo"
              value={formatInt(daily.resolvidas)}
              tone="success"
              hint={`${formatInt(operationKpis?.resolvidasManuais ?? 0)} manuais · ${formatInt(operationKpis?.resolvidasAuto ?? 0)} automáticas`}
            />
            <MetricTile
              icon={TimerReset}
              label="Tempo de resolução"
              value={formatDuracaoHoras(resolution?.mediaHoras ?? 0)}
              tone="info"
              hint={
                resolution?.totalResolvidas
                  ? `${formatInt(resolution.totalResolvidas)} resoluções`
                  : "sem histórico"
              }
            />
          </>
        )}
      </div>

      {/* Tendência de saúde + capacidade de resolução */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(310px,0.75fr)] sm:gap-6">
        <section className="panel overflow-hidden">
          <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-5 py-4">
            <div>
              <div className="flex items-center gap-2 text-[13px] font-semibold">
                <Gauge className="h-4 w-4 text-primary" /> Saúde da carteira no tempo
              </div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">
                Conformidade por execução · últimas {healthSeries.length} runs
              </div>
            </div>
            <div className="text-right">
              <div className="text-[20px] font-semibold tabular-nums">
                {formatPct(currentHealth)}
              </div>
              {healthSeries.length > 1 && (
                <div
                  className={cn(
                    "flex items-center justify-end gap-0.5 text-[10.5px] font-mono",
                    healthDelta > 0 && "text-success",
                    healthDelta < 0 && "text-destructive",
                    healthDelta === 0 && "text-muted-foreground",
                  )}
                >
                  {healthDelta > 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : healthDelta < 0 ? (
                    <TrendingDown className="h-3 w-3" />
                  ) : null}
                  {healthDelta > 0 ? "+" : ""}
                  {healthDelta.toFixed(1)} pp vs. anterior
                </div>
              )}
            </div>
          </header>

          <div className="h-[230px] px-2 pt-4 sm:h-[280px] sm:px-4">
            {isLoading ? (
              <Skeleton className="h-full w-full" />
            ) : healthSeries.length === 0 ? (
              <div className="grid h-full place-items-center text-[12px] text-muted-foreground">
                Sem histórico suficiente para exibir.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={healthSeries} margin={{ top: 8, right: 14, left: 0, bottom: 4 }}>
                  <defs>
                    <linearGradient id="health-area" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--success)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="var(--success)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 5" />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                    minTickGap={18}
                  />
                  <YAxis
                    domain={[healthFloor, 100]}
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                    tickFormatter={(value) => `${Number(value).toFixed(0)}%`}
                    axisLine={false}
                    tickLine={false}
                    width={42}
                  />
                  <ReferenceLine
                    y={95}
                    stroke="var(--warning)"
                    strokeDasharray="4 4"
                    strokeOpacity={0.65}
                  />
                  <Tooltip content={<HealthTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="conformity"
                    stroke="var(--success)"
                    strokeWidth={2.25}
                    fill="url(#health-area)"
                    dot={{ r: 2.5, fill: "var(--surface)", strokeWidth: 2 }}
                    activeDot={{ r: 4, strokeWidth: 2 }}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="grid gap-px border-t border-border bg-border sm:grid-cols-3">
            <TrendStat
              label="Reincidência · 7 dias"
              value={formatPct(weekly.reincidenciaPct)}
              hint={`meta ≤ ${targets.reincidenciaMaxPct}%`}
              tone={weekly.reincidenciaPct > targets.reincidenciaMaxPct ? "destructive" : "success"}
            />
            <TrendStat
              label="Achados recorrentes"
              value={formatInt(weekly.repetidas)}
              hint={`${formatInt(weekly.apolicesReincidentes)} apólices`}
              tone={weekly.repetidas > 0 ? "warning" : "success"}
            />
            <TrendStat
              label="Novos no período"
              value={formatInt(weekly.novasUnicas)}
              hint={`${formatInt(weekly.runs)} runs analisadas`}
              tone="default"
            />
          </div>
        </section>

        <section className="panel flex min-h-0 flex-col overflow-hidden">
          <header className="border-b border-border px-5 py-4">
            <div className="flex items-center gap-2 text-[13px] font-semibold">
              <TimerReset className="h-4 w-4 text-info" /> Velocidade de resolução
            </div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">
              Da primeira detecção até o encerramento
            </div>
          </header>

          <div className="flex-1 p-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-surface-2/70 p-3.5">
                <div className="metric-label">Média</div>
                <div className="mt-2 text-[22px] font-semibold tabular-nums">
                  {formatDuracaoHoras(resolution?.mediaHoras ?? 0)}
                </div>
              </div>
              <div className="rounded-xl bg-surface-2/70 p-3.5">
                <div className="metric-label">Mediana</div>
                <div className="mt-2 text-[22px] font-semibold tabular-nums">
                  {formatDuracaoHoras(resolution?.medianaHoras ?? 0)}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11.5px] font-semibold">Gargalos por tipo</div>
                  <div className="text-[10.5px] text-muted-foreground">
                    Mais lentos para resolver
                  </div>
                </div>
                <span className="text-[10.5px] font-mono text-muted-foreground">
                  {formatInt(resolution?.totalResolvidas ?? 0)} resolvidas
                </span>
              </div>

              {resolutionTypes.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border px-3 py-7 text-center text-[11px] text-muted-foreground">
                  O histórico aparecerá conforme os achados forem resolvidos.
                </div>
              ) : (
                <div className="space-y-3">
                  {resolutionTypes.map((item) => (
                    <ResolutionTypeRow
                      key={item.tipo_erro}
                      item={item}
                      maxHours={maxResolutionHours}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-border px-5 py-3.5">
            <div className="mb-2 flex items-center justify-between text-[10.5px] text-muted-foreground">
              <span>Resoluções do ciclo</span>
              <span className="font-mono">{formatInt(daily.resolvidas)} total</span>
            </div>
            <div className="flex h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="bg-primary"
                style={{
                  width: `${daily.resolvidas > 0 ? ((operationKpis?.resolvidasManuais ?? 0) / daily.resolvidas) * 100 : 0}%`,
                }}
              />
              <div
                className="bg-success"
                style={{
                  width: `${daily.resolvidas > 0 ? ((operationKpis?.resolvidasAuto ?? 0) / daily.resolvidas) * 100 : 0}%`,
                }}
              />
            </div>
            <div className="mt-2 flex items-center gap-4 text-[10px] text-muted-foreground">
              <Legend
                dot="var(--primary)"
                label={`${formatInt(operationKpis?.resolvidasManuais ?? 0)} manuais`}
              />
              <Legend
                dot="var(--success)"
                label={`${formatInt(operationKpis?.resolvidasAuto ?? 0)} automáticas`}
              />
            </div>
          </div>
        </section>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Error type breakdown */}
        <div className="lg:col-span-2 panel overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex flex-wrap items-center justify-between gap-2">
            <div className="text-[13px] font-semibold">Inconsistências por tipo</div>
            <div className="text-[11px] text-muted-foreground">
              {run?.created_at ? `última run · ${relativeTime(run.created_at)}` : "—"}
            </div>
          </div>
          <div className="divide-y divide-border/60 max-h-[440px] overflow-y-auto">
            {isLoading ? (
              <div className="p-5 space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : breakdown.length === 0 ? (
              <div className="px-5 py-10 text-center text-[12px] text-muted-foreground">
                Nenhuma inconsistência na última execução.
              </div>
            ) : (
              breakdown.map((b) => {
                const pct = (b.count / maxBucket) * 100;
                return (
                  <div key={b.tipo} className="px-5 py-3 hover:bg-surface-2/40 transition">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <AlertOctagon className="h-3.5 w-3.5 text-destructive shrink-0" />
                        <span className="text-[12.5px] font-medium text-foreground truncate">
                          {b.tipo}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] font-mono shrink-0">
                        <span className="text-muted-foreground">{b.apolices} ap.</span>
                        <span className="text-foreground tabular-nums">{b.count}</span>
                      </div>
                    </div>
                    <div className="h-1 rounded-full bg-background overflow-hidden">
                      <div
                        className="h-full rounded-full bg-destructive/80"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Critical findings */}
        <div className="panel overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex flex-wrap items-center justify-between gap-2">
            <div className="text-[13px] font-semibold flex items-center gap-2">
              <AlertOctagon className="h-4 w-4 text-destructive" /> Findings críticos
            </div>
            <span className="text-[11px] font-mono text-muted-foreground">
              {criticalFindings.length}
            </span>
          </div>
          <div className="divide-y divide-border/60 max-h-[440px] overflow-y-auto">
            {isLoading ? (
              <div className="p-4 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))}
              </div>
            ) : criticalFindings.length === 0 ? (
              <div className="px-4 py-10 text-center text-[12px] text-muted-foreground">
                Sem findings críticos.
              </div>
            ) : (
              criticalFindings.map((f) => {
                const norm = normalizeFinding(f);
                return (
                  <Link
                    key={f.id}
                    to="/apolices/$id"
                    params={{ id: f.apolice }}
                    className="block px-4 py-3 hover:bg-surface-2/40 transition"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="h-1.5 w-1.5 rounded-full shrink-0 bg-destructive shadow-[0_0_6px_var(--destructive)]" />
                      <span className="text-[12px] font-semibold text-foreground truncate">
                        {f.tipo_erro}
                      </span>
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      <span className="font-mono text-foreground/80">…{f.apolice.slice(-10)}</span>
                      {norm.endosso && (
                        <span className="font-mono"> · end. {norm.endosso.slice(-6)}</span>
                      )}
                    </div>
                    {norm.motivo && (
                      <div className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
                        {norm.motivo}
                      </div>
                    )}
                    <div className="text-[10.5px] text-muted-foreground mt-0.5">
                      {relativeTime(f.created_at)}
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>

      <RunHistoryTable history={history} />

      {/* Motor strip */}
      <div className="panel p-5 flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-primary" />
          <div>
            <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">
              Motor de Auditoria
            </div>
            <div className="text-[13px] font-semibold">MOTOR OLÉ · n8n callback</div>
          </div>
        </div>
        <Stat label="Vazão" value={vazao ? `${vazao} ap/s` : "—"} />
        <Stat label="Duração última run" value={formatDuration(durationMs)} />
        <Stat label="Duração média" value={formatDuration(avgDurationMs)} />
        <Stat
          label="Última sync"
          value={sync?.finished_at ? relativeTime(sync.finished_at) : "—"}
        />
        <div
          className={cn(
            "ml-auto flex items-center gap-1.5 text-[11px]",
            healthTone === "success" && "text-success",
            healthTone === "warning" && "text-warning",
            healthTone === "destructive" && "text-destructive",
            healthTone === "default" && "text-muted-foreground",
          )}
        >
          {healthTone === "success" ? (
            <CheckCircle2 className="h-3.5 w-3.5" />
          ) : (
            <AlertOctagon className="h-3.5 w-3.5" />
          )}
          {statusGeral || "Aguardando"}
        </div>
      </div>
    </div>
  );
}

function HealthTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: ReadonlyArray<{ payload?: HealthPoint }>;
}) {
  const point = payload?.[0]?.payload;
  if (!active || !point) return null;

  return (
    <div className="min-w-48 rounded-lg border border-border bg-surface/95 p-3 shadow-elevated backdrop-blur">
      <div className="text-[10.5px] text-muted-foreground">{formatDateTime(point.date)}</div>
      <div className="mt-1.5 flex items-baseline justify-between gap-5">
        <span className="text-[11px] text-muted-foreground">Conformidade</span>
        <span className="font-mono text-[13px] font-semibold text-success">
          {formatPct(point.conformity)}
        </span>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-3 border-t border-border pt-2 text-center">
        <TooltipStat label="Total" value={formatInt(point.total)} />
        <TooltipStat label="Aprov." value={formatInt(point.approved)} />
        <TooltipStat label="Desvios" value={formatInt(point.rejected)} tone="danger" />
      </div>
      <div className="mt-2 text-[10px] text-muted-foreground">
        Duração · {formatDuration(point.durationMs)}
      </div>
    </div>
  );
}

function TooltipStat({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "danger";
}) {
  return (
    <div>
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div
        className={cn(
          "mt-0.5 font-mono text-[11px] text-foreground",
          tone === "danger" && "text-destructive",
        )}
      >
        {value}
      </div>
    </div>
  );
}

function TrendStat({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint: string;
  tone: "success" | "warning" | "destructive" | "default";
}) {
  return (
    <div className="bg-surface px-4 py-3.5 sm:px-5">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <span
          className={cn(
            "text-[16px] font-semibold tabular-nums",
            tone === "success" && "text-success",
            tone === "warning" && "text-warning",
            tone === "destructive" && "text-destructive",
          )}
        >
          {value}
        </span>
        <span className="truncate text-[10px] text-muted-foreground">{hint}</span>
      </div>
    </div>
  );
}

function ResolutionTypeRow({ item, maxHours }: { item: ResolutionTimeStat; maxHours: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className="truncate text-[10.5px] font-medium" title={item.tipo_erro}>
          {item.tipo_erro}
        </span>
        <span className="shrink-0 font-mono text-[10.5px] text-muted-foreground">
          {formatDuracaoHoras(item.mediaHoras)} · {formatInt(item.resolvidas)}
        </span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-muted/70">
        <div
          className="h-full rounded-full bg-info/80"
          style={{ width: `${Math.max(6, (item.mediaHoras / maxHours) * 100)}%` }}
        />
      </div>
    </div>
  );
}

function RunHistoryTable({ history }: { history: AuditHistoryItem[] }) {
  const rows = [...history]
    .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
    .slice(0, 10);

  if (rows.length === 0) return null;

  return (
    <section className="panel overflow-hidden">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <div className="flex items-center gap-2 text-[13px] font-semibold">
            <History className="h-4 w-4 text-primary" /> Histórico de runs
          </div>
          <div className="mt-0.5 text-[11px] text-muted-foreground">
            Resultado, volume e performance das últimas {rows.length} execuções
          </div>
        </div>
        <span className="rounded-md border border-border bg-surface-2 px-2 py-1 text-[10px] font-mono text-muted-foreground">
          {formatInt(history.length)} registradas
        </span>
      </header>

      <div className="overflow-x-auto">
        <table className="data-table min-w-[840px] text-[12px]">
          <thead>
            <tr>
              <th className="px-5 py-2.5 text-left">Execução</th>
              <th className="px-3 py-2.5 text-left">Origem</th>
              <th className="px-3 py-2.5 text-left">Resultado</th>
              <th className="px-3 py-2.5 text-right">Processadas</th>
              <th className="px-3 py-2.5 text-right">Com desvio</th>
              <th className="px-3 py-2.5 text-right">Conformidade</th>
              <th className="px-3 py-2.5 text-right">Duração</th>
              <th className="px-5 py-2.5 text-right">Δ saúde</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item, index) => {
              const older = rows[index + 1];
              const itemHealth =
                item.total_processado > 0 ? (item.aprovados / item.total_processado) * 100 : 0;
              const olderHealth = older?.total_processado
                ? (older.aprovados / older.total_processado) * 100
                : itemHealth;
              const delta = itemHealth - olderHealth;
              const status = item.status_geral.toUpperCase();

              return (
                <tr key={item.id}>
                  <td className="px-5 py-3 font-mono text-[11px] text-muted-foreground">
                    {formatDateTime(item.created_at)}
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={cn(
                        "rounded border px-1.5 py-0.5 text-[9.5px] font-medium",
                        item.origem === "auto"
                          ? "border-primary/25 bg-primary/10 text-primary"
                          : "border-border bg-surface-2 text-muted-foreground",
                      )}
                    >
                      {item.origem === "auto" ? "Automática" : "Manual"}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 font-mono text-[9.5px] uppercase",
                        status === "SUCESSO" && "bg-success/10 text-success",
                        status === "ALERTA" && "bg-warning/10 text-warning",
                        status === "ERRO" && "bg-destructive/10 text-destructive",
                      )}
                    >
                      {status || "—"}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right font-mono tabular-nums">
                    {formatInt(item.total_processado)}
                  </td>
                  <td className="px-3 py-3 text-right font-mono tabular-nums text-destructive">
                    {formatInt(item.reprovados)}
                  </td>
                  <td className="px-3 py-3 text-right font-mono tabular-nums">
                    {formatPct(itemHealth)}
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-muted-foreground">
                    {formatDuration(item.duration_ms)}
                  </td>
                  <td
                    className={cn(
                      "px-5 py-3 text-right font-mono tabular-nums",
                      !older && "text-muted-foreground/40",
                      older && delta > 0 && "text-success",
                      older && delta < 0 && "text-destructive",
                      older && delta === 0 && "text-muted-foreground",
                    )}
                  >
                    {older ? `${delta > 0 ? "+" : ""}${delta.toFixed(1)} pp` : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function MetricTile({
  icon: Icon,
  label,
  value,
  tone,
  hint,
  delta,
}: {
  icon: typeof Activity;
  label: string;
  value: string;
  tone: "success" | "warning" | "destructive" | "info" | "default";
  hint?: string;
  delta?: number;
}) {
  return (
    <div className="panel p-4">
      <div className="flex items-center gap-2 mb-3">
        <div
          className={cn(
            "h-7 w-7 rounded-md grid place-items-center",
            tone === "success" && "bg-success/15 text-success",
            tone === "warning" && "bg-warning/15 text-warning",
            tone === "destructive" && "bg-destructive/15 text-destructive",
            tone === "info" && "bg-info/15 text-info",
            tone === "default" && "bg-primary/15 text-primary",
          )}
        >
          <Icon className="h-3.5 w-3.5" />
        </div>
        <span className="text-[10.5px] uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="text-[18px] sm:text-[22px] font-semibold tabular-nums">{value}</div>
      {(hint || delta !== undefined) && (
        <div className="text-[10.5px] text-muted-foreground mt-1 flex items-center gap-1.5">
          {delta !== undefined && delta !== 0 && (
            <span
              className={cn(
                "flex items-center gap-0.5 font-mono",
                delta > 0 ? "text-destructive" : "text-success",
              )}
            >
              {delta > 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {delta > 0 ? "+" : ""}
              {delta}
            </span>
          )}
          {hint && <span>{hint}</span>}
        </div>
      )}
    </div>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <span className="h-2 w-2 rounded-full" style={{ background: dot }} /> {label}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-[13px] font-mono text-foreground">{value}</div>
    </div>
  );
}
