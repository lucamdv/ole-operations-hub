import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useOperationKpis, R as ResponsiveContainer } from "./use-operation-kpis-B_hE3sMu.mjs";
import { u as useLatestAudit, a as useAuditHistory, e as errorTypeBreakdown, s as severityOf, n as normalizeFinding } from "./derive-CZZSw3Ap.mjs";
import { u as useKpiTargets } from "./use-kpi-targets-CLpxhBV_.mjs";
import { j as usePolicies, p as useLatestPolicySync, c as cn, d as formatInt, h as formatPct, r as relativeTime, f as formatDateTime } from "./router-C--tI9WT.mjs";
import { formatDuracaoHoras } from "./resolution-filter-CnX0EhgU.mjs";
import { S as Skeleton } from "./skeleton-DrKMsIWf.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import { R as Radio, ac as Activity, F as FileText, c as ShieldCheck, ad as OctagonAlert, r as CircleCheck, ae as TimerReset, af as Gauge, a7 as TrendingUp, ag as TrendingDown, ah as Cpu, J as RotateCcwClock } from "../_libs/lucide-react.mjs";
import { A as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, R as ReferenceLine, T as Tooltip, a as Area } from "../_libs/recharts.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./server-BxlZVXOU.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-BqwiLAOE.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./derive-DGSsM_A8.mjs";
import "./client-BQqbDqk4.mjs";
import "./webhook-mode-DKZeQYsl.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-accordion.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-effect-event+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "./translate-CoDrOLOt.mjs";
import "./policy-sync-runner.server-qrVcf3rg.mjs";
import "./client.server-BIG6Ien0.mjs";
import "./motor-client.server--eqOBXIb.mjs";
import "./audit-run.server-DDaKmDPQ.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/zod.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/reselect.mjs";
import "../_libs/es-toolkit.mjs";
import "../_libs/react-is.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/reduxjs__toolkit.mjs";
import "../_libs/redux.mjs";
import "../_libs/immer.mjs";
import "../_libs/redux-thunk.mjs";
import "../_libs/react-redux.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function formatDuration(ms) {
  if (!ms || ms <= 0) return "—";
  if (ms < 1e3) return `${ms} ms`;
  const s = ms / 1e3;
  if (s < 60) return `${s.toFixed(1)} s`;
  const m = Math.floor(s / 60);
  const rs = Math.round(s % 60);
  return `${m}m ${rs}s`;
}
function OperacaoPage() {
  const latestQ = useLatestAudit();
  const historyQ = useAuditHistory();
  const policiesQ = usePolicies();
  const syncQ = useLatestPolicySync();
  const operationKpisQ = useOperationKpis();
  const {
    targets
  } = useKpiTargets();
  const latest = latestQ.data ?? null;
  const history = historyQ.data ?? [];
  const policies = policiesQ.data ?? [];
  const sync = syncQ.data ?? null;
  const operationKpis = operationKpisQ.data;
  const isLoading = latestQ.isLoading || historyQ.isLoading || policiesQ.isLoading || operationKpisQ.isLoading;
  const run = latest?.run;
  const findings = latest?.findings ?? [];
  const total = run?.total_processado ?? 0;
  const reprov = run?.reprovados ?? 0;
  const aprov = run?.aprovados ?? 0;
  const durationMs = run?.duration_ms ?? null;
  const statusGeral = (run?.status_geral ?? "").toUpperCase();
  const conformity = total > 0 ? aprov / total * 100 : 0;
  const daily = operationKpis?.daily ?? {
    novas: 0,
    criticasAbertas: 0,
    resolvidas: 0,
    mediaMovel: 0,
    desvioPct: 0
  };
  const resolution = operationKpis?.resolutionTime;
  const weekly = operationKpis?.weekly ?? {
    runs: 0,
    repetidas: 0,
    novasUnicas: 0,
    reincidenciaPct: 0,
    apolicesReincidentes: 0
  };
  const healthSeries = [...history].sort((a, b) => +new Date(a.created_at) - +new Date(b.created_at)).slice(-20).map((item, index) => ({
    id: item.id,
    label: `R${index + 1}`,
    date: item.created_at,
    conformity: item.total_processado > 0 ? item.aprovados / item.total_processado * 100 : 0,
    total: item.total_processado,
    approved: item.aprovados,
    rejected: item.reprovados,
    durationMs: item.duration_ms
  }));
  const currentHealth = healthSeries.at(-1)?.conformity ?? conformity;
  const previousHealth = healthSeries.at(-2)?.conformity ?? currentHealth;
  const healthDelta = currentHealth - previousHealth;
  const healthFloor = Math.max(0, Math.floor(Math.min(100, ...healthSeries.map((point) => point.conformity)) - 3));
  const resolutionTypes = [...resolution?.byTipo ?? []].filter((item) => item.mediaHoras > 0).sort((a, b) => b.mediaHoras - a.mediaHoras).slice(0, 5);
  const maxResolutionHours = Math.max(1, ...resolutionTypes.map((item) => item.mediaHoras));
  const breakdown = errorTypeBreakdown(findings);
  const maxBucket = breakdown[0]?.count ?? 1;
  const criticalFindings = findings.filter((f) => severityOf(f) === "erro").slice(0, 8);
  const vazao = durationMs && durationMs > 0 ? (total / (durationMs / 1e3)).toFixed(1) : null;
  const avgDurationMs = history.length > 0 ? Math.round(history.reduce((s, h) => s + (h.duration_ms ?? 0), 0) / history.filter((h) => h.duration_ms).length || 0) : null;
  const healthTone = statusGeral === "SUCESSO" ? "success" : statusGeral === "ALERTA" ? "warning" : statusGeral === "ERRO" ? "destructive" : "default";
  const noData = !isLoading && !run;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: cn("h-4 w-4 animate-pulse-dot", healthTone === "success" && "text-success", healthTone === "warning" && "text-warning", healthTone === "destructive" && "text-destructive", healthTone === "default" && "text-primary") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("text-[11px] font-mono uppercase tracking-[0.2em]", healthTone === "success" && "text-success", healthTone === "warning" && "text-warning", healthTone === "destructive" && "text-destructive", healthTone === "default" && "text-primary"), children: [
          "NOC · ",
          statusGeral || "AGUARDANDO"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Operação" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "page-subtitle mt-1.5", children: run?.mensagem_geral ?? "Painel operacional · dados da última execução do motor de auditoria." })
    ] }),
    noData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-surface p-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-8 w-8 text-muted-foreground mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[14px] font-semibold mb-1", children: "Nenhuma execução de auditoria ainda" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[12px] text-muted-foreground", children: [
        "Dispare a primeira auditoria em",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/alertas", className: "text-primary underline-offset-2 hover:underline", children: "Alertas" }),
        " ",
        "para preencher este painel."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 lg:grid-cols-3 2xl:grid-cols-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[88px] rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[88px] rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[88px] rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[88px] rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[88px] rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[88px] rounded-xl" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricTile, { icon: FileText, label: "Carteira total", value: formatInt(operationKpis?.carteiraTotal ?? policies.length), tone: "default", hint: `${formatInt(operationKpis?.contratosAtivos ?? 0)} contratos ativos` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricTile, { icon: ShieldCheck, label: "Conformidade", value: `${conformity.toFixed(1)}%`, tone: conformity >= 99 ? "success" : conformity >= 95 ? "warning" : "destructive", hint: `${formatInt(reprov)} apólices com desvio` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricTile, { icon: Activity, label: "Novas inconsistências", value: formatInt(daily.novas), tone: daily.desvioPct > targets.picoDesvioPct ? "warning" : "info", hint: `média móvel ${formatInt(daily.mediaMovel)}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricTile, { icon: OctagonAlert, label: "Críticas em aberto", value: formatInt(daily.criticasAbertas), tone: daily.criticasAbertas > targets.criticasAbertasMax ? "destructive" : "warning", hint: `meta ≤ ${formatInt(targets.criticasAbertasMax)}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricTile, { icon: CircleCheck, label: "Resolvidas no ciclo", value: formatInt(daily.resolvidas), tone: "success", hint: `${formatInt(operationKpis?.resolvidasManuais ?? 0)} manuais · ${formatInt(operationKpis?.resolvidasAuto ?? 0)} automáticas` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricTile, { icon: TimerReset, label: "Tempo de resolução", value: formatDuracaoHoras(resolution?.mediaHoras ?? 0), tone: "info", hint: resolution?.totalResolvidas ? `${formatInt(resolution.totalResolvidas)} resoluções` : "sem histórico" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(310px,0.75fr)] sm:gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-start justify-between gap-3 border-b border-border px-5 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[13px] font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Gauge, { className: "h-4 w-4 text-primary" }),
              " Saúde da carteira no tempo"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 text-[11px] text-muted-foreground", children: [
              "Conformidade por execução · últimas ",
              healthSeries.length,
              " runs"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[20px] font-semibold tabular-nums", children: formatPct(currentHealth) }),
            healthSeries.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex items-center justify-end gap-0.5 text-[10.5px] font-mono", healthDelta > 0 && "text-success", healthDelta < 0 && "text-destructive", healthDelta === 0 && "text-muted-foreground"), children: [
              healthDelta > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }) : healthDelta < 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-3 w-3" }) : null,
              healthDelta > 0 ? "+" : "",
              healthDelta.toFixed(1),
              " pp vs. anterior"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[230px] px-2 pt-4 sm:h-[280px] sm:px-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-full w-full" }) : healthSeries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full place-items-center text-[12px] text-muted-foreground", children: "Sem histórico suficiente para exibir." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: healthSeries, margin: {
          top: 8,
          right: 14,
          left: 0,
          bottom: 4
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "health-area", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--success)", stopOpacity: 0.3 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--success)", stopOpacity: 0 })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { vertical: false, stroke: "var(--border)", strokeDasharray: "3 5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick: {
            fontSize: 10,
            fill: "var(--muted-foreground)"
          }, axisLine: false, tickLine: false, minTickGap: 18 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { domain: [healthFloor, 100], tick: {
            fontSize: 10,
            fill: "var(--muted-foreground)"
          }, tickFormatter: (value) => `${Number(value).toFixed(0)}%`, axisLine: false, tickLine: false, width: 42 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ReferenceLine, { y: 95, stroke: "var(--warning)", strokeDasharray: "4 4", strokeOpacity: 0.65 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(HealthTooltip, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "conformity", stroke: "var(--success)", strokeWidth: 2.25, fill: "url(#health-area)", dot: {
            r: 2.5,
            fill: "var(--surface)",
            strokeWidth: 2
          }, activeDot: {
            r: 4,
            strokeWidth: 2
          }, isAnimationActive: false })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-px border-t border-border bg-border sm:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendStat, { label: "Reincidência · 7 dias", value: formatPct(weekly.reincidenciaPct), hint: `meta ≤ ${targets.reincidenciaMaxPct}%`, tone: weekly.reincidenciaPct > targets.reincidenciaMaxPct ? "destructive" : "success" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendStat, { label: "Achados recorrentes", value: formatInt(weekly.repetidas), hint: `${formatInt(weekly.apolicesReincidentes)} apólices`, tone: weekly.repetidas > 0 ? "warning" : "success" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendStat, { label: "Novos no período", value: formatInt(weekly.novasUnicas), hint: `${formatInt(weekly.runs)} runs analisadas`, tone: "default" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel flex min-h-0 flex-col overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b border-border px-5 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[13px] font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TimerReset, { className: "h-4 w-4 text-info" }),
            " Velocidade de resolução"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-[11px] text-muted-foreground", children: "Da primeira detecção até o encerramento" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-surface-2/70 p-3.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "metric-label", children: "Média" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-[22px] font-semibold tabular-nums", children: formatDuracaoHoras(resolution?.mediaHoras ?? 0) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-surface-2/70 p-3.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "metric-label", children: "Mediana" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-[22px] font-semibold tabular-nums", children: formatDuracaoHoras(resolution?.medianaHoras ?? 0) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11.5px] font-semibold", children: "Gargalos por tipo" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] text-muted-foreground", children: "Mais lentos para resolver" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10.5px] font-mono text-muted-foreground", children: [
                formatInt(resolution?.totalResolvidas ?? 0),
                " resolvidas"
              ] })
            ] }),
            resolutionTypes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-dashed border-border px-3 py-7 text-center text-[11px] text-muted-foreground", children: "O histórico aparecerá conforme os achados forem resolvidos." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: resolutionTypes.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(ResolutionTypeRow, { item, maxHours: maxResolutionHours }, item.tipo_erro)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border px-5 py-3.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between text-[10.5px] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Resoluções do ciclo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
              formatInt(daily.resolvidas),
              " total"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-1.5 overflow-hidden rounded-full bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary", style: {
              width: `${daily.resolvidas > 0 ? (operationKpis?.resolvidasManuais ?? 0) / daily.resolvidas * 100 : 0}%`
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-success", style: {
              width: `${daily.resolvidas > 0 ? (operationKpis?.resolvidasAuto ?? 0) / daily.resolvidas * 100 : 0}%`
            } })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-4 text-[10px] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { dot: "var(--primary)", label: `${formatInt(operationKpis?.resolvidasManuais ?? 0)} manuais` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { dot: "var(--success)", label: `${formatInt(operationKpis?.resolvidasAuto ?? 0)} automáticas` })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 panel overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border flex flex-wrap items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] font-semibold", children: "Inconsistências por tipo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: run?.created_at ? `última run · ${relativeTime(run.created_at)}` : "—" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/60 max-h-[440px] overflow-y-auto", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 space-y-3", children: Array.from({
          length: 5
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, i)) }) : breakdown.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-10 text-center text-[12px] text-muted-foreground", children: "Nenhuma inconsistência na última execução." }) : breakdown.map((b) => {
          const pct = b.count / maxBucket * 100;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 hover:bg-surface-2/40 transition", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(OctagonAlert, { className: "h-3.5 w-3.5 text-destructive shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12.5px] font-medium text-foreground truncate", children: b.tipo })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-[11px] font-mono shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                  b.apolices,
                  " ap."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground tabular-nums", children: b.count })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 rounded-full bg-background overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-destructive/80", style: {
              width: `${pct}%`
            } }) })
          ] }, b.tipo);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border flex flex-wrap items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[13px] font-semibold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(OctagonAlert, { className: "h-4 w-4 text-destructive" }),
            " Findings críticos"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono text-muted-foreground", children: criticalFindings.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/60 max-h-[440px] overflow-y-auto", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: Array.from({
          length: 4
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full" }, i)) }) : criticalFindings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-10 text-center text-[12px] text-muted-foreground", children: "Sem findings críticos." }) : criticalFindings.map((f) => {
          const norm = normalizeFinding(f);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/apolices/$id", params: {
            id: f.apolice
          }, className: "block px-4 py-3 hover:bg-surface-2/40 transition", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full shrink-0 bg-destructive shadow-[0_0_6px_var(--destructive)]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] font-semibold text-foreground truncate", children: f.tipo_erro })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-foreground/80", children: [
                "…",
                f.apolice.slice(-10)
              ] }),
              norm.endosso && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                " · end. ",
                norm.endosso.slice(-6)
              ] })
            ] }),
            norm.motivo && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground mt-0.5 line-clamp-2", children: norm.motivo }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] text-muted-foreground mt-0.5", children: relativeTime(f.created_at) })
          ] }, f.id);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RunHistoryTable, { history }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel p-5 flex items-center gap-6 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] uppercase tracking-wider text-muted-foreground", children: "Motor de Auditoria" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] font-semibold", children: "MOTOR OLÉ · n8n callback" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Vazão", value: vazao ? `${vazao} ap/s` : "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Duração última run", value: formatDuration(durationMs) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Duração média", value: formatDuration(avgDurationMs) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Última sync", value: sync?.finished_at ? relativeTime(sync.finished_at) : "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("ml-auto flex items-center gap-1.5 text-[11px]", healthTone === "success" && "text-success", healthTone === "warning" && "text-warning", healthTone === "destructive" && "text-destructive", healthTone === "default" && "text-muted-foreground"), children: [
        healthTone === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(OctagonAlert, { className: "h-3.5 w-3.5" }),
        statusGeral || "Aguardando"
      ] })
    ] })
  ] });
}
function HealthTooltip({
  active,
  payload
}) {
  const point = payload?.[0]?.payload;
  if (!active || !point) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-48 rounded-lg border border-border bg-surface/95 p-3 shadow-elevated backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] text-muted-foreground", children: formatDateTime(point.date) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex items-baseline justify-between gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: "Conformidade" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[13px] font-semibold text-success", children: formatPct(point.conformity) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 grid grid-cols-3 gap-3 border-t border-border pt-2 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipStat, { label: "Total", value: formatInt(point.total) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipStat, { label: "Aprov.", value: formatInt(point.approved) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipStat, { label: "Desvios", value: formatInt(point.rejected), tone: "danger" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-[10px] text-muted-foreground", children: [
      "Duração · ",
      formatDuration(point.durationMs)
    ] })
  ] });
}
function TooltipStat({
  label,
  value,
  tone = "default"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("mt-0.5 font-mono text-[11px] text-foreground", tone === "danger" && "text-destructive"), children: value })
  ] });
}
function TrendStat({
  label,
  value,
  hint,
  tone
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface px-4 py-3.5 sm:px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-baseline gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-[16px] font-semibold tabular-nums", tone === "success" && "text-success", tone === "warning" && "text-warning", tone === "destructive" && "text-destructive"), children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-[10px] text-muted-foreground", children: hint })
    ] })
  ] });
}
function ResolutionTypeRow({
  item,
  maxHours
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1.5 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-[10.5px] font-medium", title: item.tipo_erro, children: item.tipo_erro }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 font-mono text-[10.5px] text-muted-foreground", children: [
        formatDuracaoHoras(item.mediaHoras),
        " · ",
        formatInt(item.resolvidas)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 overflow-hidden rounded-full bg-muted/70", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-info/80", style: {
      width: `${Math.max(6, item.mediaHoras / maxHours * 100)}%`
    } }) })
  ] });
}
function RunHistoryTable({
  history
}) {
  const rows = [...history].sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at)).slice(0, 10);
  if (rows.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[13px] font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcwClock, { className: "h-4 w-4 text-primary" }),
          " Histórico de runs"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 text-[11px] text-muted-foreground", children: [
          "Resultado, volume e performance das últimas ",
          rows.length,
          " execuções"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-md border border-border bg-surface-2 px-2 py-1 text-[10px] font-mono text-muted-foreground", children: [
        formatInt(history.length),
        " registradas"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data-table min-w-[840px] text-[12px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-2.5 text-left", children: "Execução" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left", children: "Origem" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left", children: "Resultado" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-right", children: "Processadas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-right", children: "Com desvio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-right", children: "Conformidade" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-right", children: "Duração" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-2.5 text-right", children: "Δ saúde" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((item, index) => {
        const older = rows[index + 1];
        const itemHealth = item.total_processado > 0 ? item.aprovados / item.total_processado * 100 : 0;
        const olderHealth = older?.total_processado ? older.aprovados / older.total_processado * 100 : itemHealth;
        const delta = itemHealth - olderHealth;
        const status = item.status_geral.toUpperCase();
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-mono text-[11px] text-muted-foreground", children: formatDateTime(item.created_at) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("rounded border px-1.5 py-0.5 text-[9.5px] font-medium", item.origem === "auto" ? "border-primary/25 bg-primary/10 text-primary" : "border-border bg-surface-2 text-muted-foreground"), children: item.origem === "auto" ? "Automática" : "Manual" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("rounded px-1.5 py-0.5 font-mono text-[9.5px] uppercase", status === "SUCESSO" && "bg-success/10 text-success", status === "ALERTA" && "bg-warning/10 text-warning", status === "ERRO" && "bg-destructive/10 text-destructive"), children: status || "—" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-right font-mono tabular-nums", children: formatInt(item.total_processado) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-right font-mono tabular-nums text-destructive", children: formatInt(item.reprovados) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-right font-mono tabular-nums", children: formatPct(itemHealth) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-right font-mono text-muted-foreground", children: formatDuration(item.duration_ms) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: cn("px-5 py-3 text-right font-mono tabular-nums", !older && "text-muted-foreground/40", older && delta > 0 && "text-success", older && delta < 0 && "text-destructive", older && delta === 0 && "text-muted-foreground"), children: older ? `${delta > 0 ? "+" : ""}${delta.toFixed(1)} pp` : "—" })
        ] }, item.id);
      }) })
    ] }) })
  ] });
}
function MetricTile({
  icon: Icon,
  label,
  value,
  tone,
  hint,
  delta
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("h-7 w-7 rounded-md grid place-items-center", tone === "success" && "bg-success/15 text-success", tone === "warning" && "bg-warning/15 text-warning", tone === "destructive" && "bg-destructive/15 text-destructive", tone === "info" && "bg-info/15 text-info", tone === "default" && "bg-primary/15 text-primary"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10.5px] uppercase tracking-wider text-muted-foreground", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[18px] sm:text-[22px] font-semibold tabular-nums", children: value }),
    (hint || delta !== void 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10.5px] text-muted-foreground mt-1 flex items-center gap-1.5", children: [
      delta !== void 0 && delta !== 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("flex items-center gap-0.5 font-mono", delta > 0 ? "text-destructive" : "text-success"), children: [
        delta > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-3 w-3" }),
        delta > 0 ? "+" : "",
        delta
      ] }),
      hint && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: hint })
    ] })
  ] });
}
function Legend({
  dot,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full", style: {
      background: dot
    } }),
    " ",
    label
  ] });
}
function Stat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] font-mono text-foreground", children: value })
  ] });
}
export {
  OperacaoPage as component
};
