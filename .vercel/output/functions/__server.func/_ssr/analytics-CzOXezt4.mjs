import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useOperationKpis, R as ResponsiveContainer } from "./use-operation-kpis-B_hE3sMu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useLatestAudit, a as useAuditHistory, d as deriveKpis, c as countBySeverity, r as runSeries, e as errorTypeBreakdown, g as groupByApolice, f as groupByEndosso, h as buildHeatmap } from "./derive-CZZSw3Ap.mjs";
import { j as usePolicies, r as relativeTime, d as formatInt, h as formatPct, k as formatUSD, l as formatCompact, c as cn, i as createSsrRpc } from "./router-C--tI9WT.mjs";
import { u as useQuery, q as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { c as createServerFn } from "./server-BxlZVXOU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BqwiLAOE.mjs";
import { b as useChartPrefs } from "./use-settings-CkvJQFhU.mjs";
import { formatDuracaoHoras } from "./resolution-filter-CnX0EhgU.mjs";
import { u as useKpiTargets } from "./use-kpi-targets-CLpxhBV_.mjs";
import { yoyPct, statusMax, statusMin } from "./derive-DGSsM_A8.mjs";
import { R as REPASSE_RULES } from "./repasse-rules-BsXb-PV5.mjs";
import { B as Button, b as buttonVariants } from "./button-DxLsNwLg.mjs";
import { R as Root2, T as Trigger, P as Portal, C as Content2 } from "../_libs/radix-ui__react-popover.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BPFiSsdh.mjs";
import "../_libs/seroval.mjs";
import { m as LoaderCircle, I as Download, F as FileText, E as EyeOff, V as Calendar$1, X, b as ChartColumn, Y as ChevronLeft, a as ChevronRight, C as ChevronDown } from "../_libs/lucide-react.mjs";
import { A as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Area, P as PieChart, b as Pie, c as Cell, L as LineChart, d as Line, B as BarChart, e as Bar, f as ComposedChart, g as Legend, R as ReferenceLine, h as LabelList } from "../_libs/recharts.mjs";
import { g as getDefaultClassNames, D as DayPicker } from "../_libs/react-day-picker.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "./client-BQqbDqk4.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
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
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./audit-run.server-DDaKmDPQ.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/zod.mjs";
import "./use-current-role-E51G92Oa.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
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
import "../_libs/date-fns__tz.mjs";
import "../_libs/date-fns.mjs";
const getAnalyticsAggregates = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("9b97897620f38b4ad17635d44b21119a7fc775950bfe58519b6d3487f3d2eb5d"));
const analyticsAggregatesQuery = queryOptions({
  queryKey: ["analytics", "aggregates"],
  queryFn: () => getAnalyticsAggregates(),
  staleTime: 6e4
});
function useAnalyticsAggregates() {
  return useQuery(analyticsAggregatesQuery);
}
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn(
        "bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      ),
      captionLayout,
      formatters: {
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters
      },
      classNames: {
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn("bg-popover absolute inset-0 opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label" ? "text-sm" : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
          defaultClassNames.weekday
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
        week_number: cn(
          "text-muted-foreground select-none text-[0.8rem]",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          defaultClassNames.day
        ),
        range_start: cn("bg-accent rounded-l-md", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames
      },
      components: {
        Root: ({ className: className2, rootRef, ...props2 }) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-slot": "calendar", ref: rootRef, className: cn(className2), ...props2 });
        },
        Chevron: ({ className: className2, orientation, ...props2 }) => {
          if (orientation === "left") {
            return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: cn("size-4", className2), ...props2 });
          }
          if (orientation === "right") {
            return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: cn("size-4", className2), ...props2 });
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: cn("size-4", className2), ...props2 });
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props2 }) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { ...props2, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children }) });
        },
        ...components
      },
      ...props
    }
  );
}
function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      ref,
      variant: "ghost",
      size: "icon",
      "data-day": day.date.toLocaleDateString(),
      "data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
      "data-range-start": modifiers.range_start,
      "data-range-end": modifiers.range_end,
      "data-range-middle": modifiers.range_middle,
      className: cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-(--cell-size) flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      ),
      ...props
    }
  );
}
const Popover = Root2;
const PopoverTrigger = Trigger;
const PopoverContent = reactExports.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = Content2.displayName;
const DEFAULT_RANGE = { preset: "all", from: null, to: null };
const PRESET_LABELS = {
  all: "Todo o período",
  "3m": "Últimos 3 meses",
  "6m": "Últimos 6 meses",
  "12m": "Últimos 12 meses",
  ytd: "Ano atual",
  custom: "Período personalizado"
};
function pad(n) {
  return n.toString().padStart(2, "0");
}
function toISODate(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function resolveRange(state) {
  const now = /* @__PURE__ */ new Date();
  const today = toISODate(now);
  switch (state.preset) {
    case "all":
      return { from: null, to: null };
    case "3m":
    case "6m":
    case "12m": {
      const months = state.preset === "3m" ? 3 : state.preset === "6m" ? 6 : 12;
      const start = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1);
      return { from: toISODate(start), to: today };
    }
    case "ytd":
      return { from: `${now.getFullYear()}-01-01`, to: today };
    case "custom": {
      const from = state.from ?? null;
      const to = state.to ?? null;
      if (from && to && from > to) return { from: to, to: from };
      return { from, to };
    }
  }
}
function isRangeActive(state) {
  const { from, to } = resolveRange(state);
  return Boolean(from || to);
}
function withinRange(iso, range) {
  if (!range.from && !range.to) return true;
  if (!iso) return false;
  const day = iso.slice(0, 10);
  if (range.from && day < range.from) return false;
  if (range.to && day > range.to) return false;
  return true;
}
function monthWithinRange(month, range) {
  if (!range.from && !range.to) return true;
  if (!month) return false;
  const m = month.slice(0, 7);
  if (range.from && m < range.from.slice(0, 7)) return false;
  if (range.to && m > range.to.slice(0, 7)) return false;
  return true;
}
function monthShort(iso) {
  const [y, m] = iso.split("-").map(Number);
  if (!y || !m) return iso;
  return new Intl.DateTimeFormat("pt-BR", { month: "short", year: "2-digit" }).format(new Date(y, m - 1, 1)).replace(".", "");
}
function formatRangeBadge(state) {
  const { from, to } = resolveRange(state);
  if (!from && !to) return null;
  if (from && to) return `${monthShort(from)} – ${monthShort(to)}`;
  if (from) return `desde ${monthShort(from)}`;
  return `até ${monthShort(to)}`;
}
function parseISO(iso) {
  if (!iso) return void 0;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return void 0;
  return new Date(y, m - 1, d);
}
function fmt(iso, fallback) {
  const d = parseISO(iso);
  if (!d) return fallback;
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(d);
}
function DateRangeFilter({
  value,
  onChange
}) {
  const active = isRangeActive(value);
  const badge = formatRangeBadge(value);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Select,
      {
        value: value.preset,
        onValueChange: (p) => onChange(
          p === "custom" ? { preset: "custom", from: value.from, to: value.to } : { preset: p, from: null, to: null }
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectTrigger, { className: "h-9 w-[188px] text-[12px] bg-surface border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar$1, { className: "h-3.5 w-3.5 mr-1 opacity-70" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.keys(PRESET_LABELS).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p, className: "text-[12px]", children: PRESET_LABELS[p] }, p)) })
        ]
      }
    ),
    value.preset === "custom" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: cn(
              "h-9 px-3 text-[12px] font-normal bg-surface",
              !value.from && "text-muted-foreground"
            ),
            children: fmt(value.from, "Data inicial")
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Calendar,
          {
            mode: "single",
            selected: parseISO(value.from),
            onSelect: (d) => onChange({ ...value, preset: "custom", from: d ? toISODate(d) : null }),
            initialFocus: true,
            className: "p-3 pointer-events-auto"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] text-muted-foreground", children: "até" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: cn(
              "h-9 px-3 text-[12px] font-normal bg-surface",
              !value.to && "text-muted-foreground"
            ),
            children: fmt(value.to, "Data final")
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Calendar,
          {
            mode: "single",
            selected: parseISO(value.to),
            onSelect: (d) => onChange({ ...value, preset: "custom", to: d ? toISODate(d) : null }),
            initialFocus: true,
            className: "p-3 pointer-events-auto"
          }
        ) })
      ] })
    ] }),
    active && badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/30", children: badge }),
    (active || value.preset !== "all") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => onChange(DEFAULT_RANGE),
        className: "inline-flex items-center gap-1 h-9 px-2.5 rounded-lg border border-border bg-surface hover:bg-surface-2 text-[12px] text-muted-foreground transition",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
          "Limpar"
        ]
      }
    )
  ] });
}
function AnalyticsPage() {
  const latestQ = useLatestAudit();
  const historyQ = useAuditHistory();
  const policiesQ = usePolicies();
  const aggregatesQ = useAnalyticsAggregates();
  const opsQ = useOperationKpis();
  const {
    targets
  } = useKpiTargets();
  const ops = opsQ.data ?? null;
  const monthlyReinc = reactExports.useMemo(() => ops?.monthlyReincidencia ?? [], [ops]);
  const yearCur = ops?.yearCur ?? null;
  const yearPrev = ops?.yearPrev ?? null;
  const ytdLabel = ops?.ytdLabel ?? "";
  const crescimentoCarteira = yearCur && yearPrev ? yoyPct(yearCur.contratosYtd, yearPrev.contratosYtd) : null;
  const reducaoIncidentes = yearCur && yearPrev && yearPrev.criticosYtd > 0 ? Math.round((yearPrev.criticosYtd - yearCur.criticosYtd) / yearPrev.criticosYtd * 1e3) / 10 : null;
  const reincMensalAtual = monthlyReinc.length > 0 ? monthlyReinc[monthlyReinc.length - 1] : null;
  const [range, setRange] = reactExports.useState(DEFAULT_RANGE);
  const bounds = reactExports.useMemo(() => resolveRange(range), [range]);
  const rangeActive = bounds.from !== null || bounds.to !== null;
  const latestRaw = latestQ.data ?? null;
  const historyRaw = historyQ.data ?? [];
  const policies = policiesQ.data ?? [];
  const aggregatesRaw = aggregatesQ.data ?? {
    findingsByVigencia: [],
    revenueByMonth: [],
    issuancesByMonth: [],
    repasseByMonth: []
  };
  const history = reactExports.useMemo(() => rangeActive ? historyRaw.filter((r) => withinRange(r.data_auditoria ?? r.created_at, bounds)) : historyRaw, [historyRaw, bounds, rangeActive]);
  const latest = reactExports.useMemo(() => {
    if (!latestRaw || !rangeActive) return latestRaw;
    const d = latestRaw.run.data_auditoria ?? latestRaw.run.created_at;
    return withinRange(d, bounds) ? latestRaw : {
      ...latestRaw,
      findings: []
    };
  }, [latestRaw, bounds, rangeActive]);
  const kpis = reactExports.useMemo(() => deriveKpis({
    latest,
    history
  }), [latest, history]);
  const findings = latest?.findings ?? [];
  const sev = reactExports.useMemo(() => countBySeverity(findings), [findings]);
  const series = reactExports.useMemo(() => runSeries(history).slice(-12), [history]);
  const errorTypes = reactExports.useMemo(() => errorTypeBreakdown(findings).slice(0, 10), [findings]);
  const apoliceRank = reactExports.useMemo(() => groupByApolice(findings).slice(0, 10), [findings]);
  const endossoRank = reactExports.useMemo(() => groupByEndosso(findings).slice(0, 8), [findings]);
  const monthly = reactExports.useMemo(() => aggregatesRaw.findingsByVigencia.filter((b) => monthWithinRange(b.month, bounds)), [aggregatesRaw.findingsByVigencia, bounds]);
  const revenue = reactExports.useMemo(() => aggregatesRaw.revenueByMonth.filter((b) => monthWithinRange(b.month, bounds)), [aggregatesRaw.revenueByMonth, bounds]);
  const repasse = reactExports.useMemo(() => aggregatesRaw.repasseByMonth.filter((b) => monthWithinRange(b.month, bounds)), [aggregatesRaw.repasseByMonth, bounds]);
  const issuances = reactExports.useMemo(() => aggregatesRaw.issuancesByMonth.filter((b) => monthWithinRange(b.month, bounds)), [aggregatesRaw.issuancesByMonth, bounds]);
  const totalApolices = reactExports.useMemo(() => issuances.reduce((s, r) => s + r.apolices, 0), [issuances]);
  const totalEndossos = reactExports.useMemo(() => issuances.reduce((s, r) => s + r.endossosTotal, 0), [issuances]);
  reactExports.useMemo(() => revenue.reduce((s, r) => s + r.usd, 0), [revenue]);
  const repasseTotals = reactExports.useMemo(() => repasse.reduce((acc, r) => ({
    carregamentoExcelsior: acc.carregamentoExcelsior + r.carregamentoExcelsior,
    premioDireto: acc.premioDireto + r.premioDireto,
    pisCofins: acc.pisCofins + r.pisCofins,
    excelsiorLiquido: acc.excelsiorLiquido + r.excelsiorLiquido,
    bruto: acc.bruto + r.bruto
  }), {
    carregamentoExcelsior: 0,
    premioDireto: 0,
    pisCofins: 0,
    excelsiorLiquido: 0,
    bruto: 0
  }), [repasse]);
  const repasseAvg = repasse.length > 0 ? repasseTotals.excelsiorLiquido / repasse.length : 0;
  const repasseMax = reactExports.useMemo(() => {
    const peak = repasse.reduce((m, r) => Math.max(m, r.carregamentoExcelsior + r.premioDireto, r.excelsiorLiquido), 0);
    if (peak === 0) return 1e3;
    const step = 500;
    return Math.ceil(peak * 1.12 / step) * step;
  }, [repasse]);
  const heatmap = reactExports.useMemo(() => buildHeatmap(latest, history, 12), [latest, history]);
  const endorsementsDist = reactExports.useMemo(() => {
    const buckets = [{
      label: "0",
      count: 0
    }, {
      label: "1-2",
      count: 0
    }, {
      label: "3-5",
      count: 0
    }, {
      label: "6-10",
      count: 0
    }, {
      label: "> 10",
      count: 0
    }];
    for (const p of policies) {
      const n = p.endorsements_count ?? 0;
      const idx = n === 0 ? 0 : n <= 2 ? 1 : n <= 5 ? 2 : n <= 10 ? 3 : 4;
      buckets[idx].count++;
    }
    return buckets.filter((b) => b.count > 0);
  }, [policies]);
  const {
    prefs: chartPrefs
  } = useChartPrefs();
  const charts = reactExports.useMemo(() => {
    const hasIssuances = issuances.length > 0;
    return [{
      title: "Tendência de runs",
      has: series.length > 0
    }, {
      title: "Severidade",
      has: sev.erros + sev.alertas + sev.infos > 0
    }, {
      title: "Conformidade ao longo do tempo",
      has: series.length > 0
    }, {
      title: "Volume processado",
      has: series.length > 0
    }, {
      title: "Top 10 tipos de erro",
      has: errorTypes.length > 0
    }, {
      title: "Findings por mês de vigência",
      has: monthly.length > 0
    }, {
      title: "Receita Excelsior (USD)",
      has: repasse.length > 0
    }, {
      title: "Heatmap · tipo de erro × runs",
      has: heatmap.rows.length > 0 && heatmap.runs.length > 0
    }, {
      title: "Apólices mais problemáticas",
      has: apoliceRank.length > 0
    }, {
      title: "Top endossos com inconsistências",
      has: endossoRank.length > 0
    }, {
      title: "Carteira por nº de endossos",
      has: endorsementsDist.length > 0
    }, {
      title: "Apólices emitidas por mês",
      has: issuances.some((i) => i.apolices > 0)
    }, {
      title: "Endossos emitidos por mês",
      has: issuances.some((i) => i.endossosTotal > 0)
    }, {
      title: "Emissões por mês e por tipo",
      has: hasIssuances
    }];
  }, [series, sev, errorTypes, monthly, repasse, heatmap, apoliceRank, endossoRank, endorsementsDist, issuances]);
  const hasData = reactExports.useMemo(() => Object.fromEntries(charts.map((c) => [c.title, c.has])), [charts]);
  const hiddenCharts = chartPrefs.hideEmptyCharts ? charts.filter((c) => !c.has).map((c) => c.title) : [];
  const chartsRef = reactExports.useRef(null);
  const [exporting, setExporting] = reactExports.useState("none");
  const handleExportReport = async () => {
    if (!latest) return;
    setExporting("report");
    try {
      const {
        exportAuditPdf
      } = await import("./export-pdf-7L1sjaNi.mjs");
      exportAuditPdf(latest, history);
      toast.success("Relatório gerado");
    } catch (e) {
      toast.error("Falha ao gerar relatório", {
        description: e.message
      });
    } finally {
      setExporting("none");
    }
  };
  const handleExportCharts = async () => {
    if (!chartsRef.current) return;
    const nodes = Array.from(chartsRef.current.querySelectorAll('[data-export="chart"]'));
    if (nodes.length === 0) return;
    setExporting("charts");
    try {
      const {
        exportChartsPdf
      } = await import("./export-charts-DEr8_xTF.mjs");
      await exportChartsPdf(nodes, formatRangeBadge(range));
      toast.success(`${nodes.length} gráficos exportados`);
    } catch (e) {
      toast.error("Falha ao exportar gráficos", {
        description: e.message
      });
    } finally {
      setExporting("none");
    }
  };
  const loading = latestQ.isLoading || historyQ.isLoading;
  const lastRunAt = latest?.run.data_auditoria ?? latest?.run.created_at;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Analytics" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30", children: "BI · LIVE" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "page-subtitle", children: [
          "Inteligência estratégica sobre carteira, runs de auditoria, severidade e eficiência operacional.",
          history.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            " · ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: history.length }),
            " runs no histórico",
            lastRunAt && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              " · última ",
              relativeTime(lastRunAt)
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DateRangeFilter, { value: range, onChange: setRange }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleExportCharts, disabled: !latest || exporting !== "none", className: "inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-border bg-surface hover:bg-surface-2 text-[12px] font-medium disabled:opacity-50 disabled:cursor-not-allowed transition", children: [
          exporting === "charts" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
          "Exportar gráficos (PDF)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleExportReport, disabled: !latest || exporting !== "none", className: "inline-flex items-center gap-2 h-9 px-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-[12px] font-medium disabled:opacity-50 disabled:cursor-not-allowed transition", children: [
          exporting === "report" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5" }),
          "Relatório completo (PDF)"
        ] })
      ] })
    ] }),
    loading && !latest ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingState, {}) : !latest ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bento", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Apólices na carteira", value: formatInt(policies.length) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Auditadas (última run)", value: formatInt(kpis?.audited ?? 0), delta: kpis?.deltaApproved, deltaSuffix: "%" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Conformidade", value: formatPct(kpis?.approvedRate ?? 0, 1), delta: kpis ? -kpis.deltaRisk : void 0, deltaSuffix: " pp", tone: "success" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Risco operacional", value: formatPct(kpis?.operationalRisk ?? 0, 1), delta: kpis?.deltaRisk, deltaSuffix: " pp", tone: "warning", invertDelta: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Erros críticos", value: formatInt(sev.erros), tone: "destructive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Alertas", value: formatInt(sev.alertas), tone: "warning" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Tipos de erro únicos", value: formatInt(kpis?.uniqueErrorTypes ?? 0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Apólices impactadas", value: formatInt(kpis?.affectedPolicies ?? 0), hint: policies.length > 0 ? `${formatPct((kpis?.affectedPolicies ?? 0) / policies.length * 100, 1)} da carteira` : void 0, tone: "destructive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Receita acumulada Excelsior (USD)", value: formatUSD(repasseTotals.excelsiorLiquido, {
          maximumFractionDigits: 0
        }), hint: `${repasse.length} meses · média ${formatUSD(repasseAvg, {
          maximumFractionDigits: 0
        })}/mês`, tone: "success" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { title: "KPIs semanais", subtitle: "Reincidência de inconsistências e volume de repasse nos últimos 7 dias de execução" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bento", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Reincidência semanal", value: formatPct(ops?.weekly.reincidenciaPct ?? 0, 1), hint: `${formatInt(ops?.weekly.repetidas ?? 0)} de ${formatInt(ops?.weekly.total ?? 0)} achados`, tone: "warning", target: `meta ≤ ${targets.reincidenciaMaxPct}%`, status: statusMax(ops?.weekly.reincidenciaPct ?? 0, targets.reincidenciaMaxPct) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Apólices reincidentes", value: formatInt(ops?.weekly.apolicesReincidentes ?? 0), hint: `${formatInt(ops?.weekly.runs ?? 0)} run(s) na janela`, tone: "destructive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Inconsistências novas", value: formatInt(ops?.weekly.novasUnicas ?? 0), hint: "Ocorrências inéditas na semana" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Repasse do último mês (USD)", value: formatUSD(repasse.length ? repasse[repasse.length - 1].excelsiorLiquido : 0, {
          maximumFractionDigits: 0
        }), hint: repasse.length ? repasse[repasse.length - 1].label : "sem dados", tone: "success" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { title: "Tempo de resolução por tipo de problema", subtitle: "Da primeira detecção até a resolução (manual ou quando o erro deixa de aparecer)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Inconsistências resolvidas", value: formatInt(ops?.resolutionTime.totalResolvidas ?? 0), hint: "Manuais + automáticas (exceções não contam)", tone: "success" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Tempo médio de resolução", value: formatDuracaoHoras(ops?.resolutionTime.mediaHoras ?? 0), hint: "Média geral (primeira detecção → resolução)", tone: "success" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Tempo mediano", value: formatDuracaoHoras(ops?.resolutionTime.medianaHoras ?? 0), hint: "Metade das resoluções abaixo deste tempo" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel bg-surface/60 overflow-x-auto", children: (ops?.resolutionTime.byTipo.length ?? 0) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-6 text-[12.5px] text-muted-foreground", children: "Nenhuma inconsistência foi resolvida ainda. Marque um achado como “Resolvido” na auditoria — ou deixe que ele saia da próxima execução — para alimentar este indicador." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data-table text-[12.5px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-surface-2/60 text-[11px] uppercase tracking-wider text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 font-medium", children: "Tipo de problema" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 font-medium", children: "Resolvidas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 font-medium", children: "Tempo médio" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 font-medium", children: "Mediana" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: (ops?.resolutionTime.byTipo ?? []).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-foreground/90", children: t.tipo_erro }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right font-mono", children: formatInt(t.resolvidas) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right font-mono text-info", children: formatDuracaoHoras(t.mediaHoras) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right font-mono text-muted-foreground", children: formatDuracaoHoras(t.medianaHoras) })
        ] }, t.tipo_erro)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { title: "KPIs mensais", subtitle: "Reincidência consolidada e capacidade operacional da carteira" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bento", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Reincidência consolidada", value: formatPct(reincMensalAtual?.reincidenciaPct ?? 0, 1), hint: reincMensalAtual ? `${reincMensalAtual.label} · média 3m ${formatPct(reincMensalAtual.mm3, 1)}` : "sem dados", tone: "warning", target: `meta ≤ ${targets.reincidenciaMaxPct}%`, status: statusMax(reincMensalAtual?.reincidenciaPct ?? 0, targets.reincidenciaMaxPct) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Contratos ativos", value: formatInt(ops?.contratosAtivos ?? 0), hint: `${formatInt(ops?.carteiraTotal ?? 0)} apólices registradas`, tone: "success" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Capacidade operacional", value: formatPct(targets.capacidadeContratos > 0 ? (ops?.contratosAtivos ?? 0) / targets.capacidadeContratos * 100 : 0, 1), hint: `Capacidade declarada: ${formatInt(targets.capacidadeContratos)} contratos`, target: `meta ≤ 100%`, status: statusMax(targets.capacidadeContratos > 0 ? (ops?.contratosAtivos ?? 0) / targets.capacidadeContratos * 100 : 0, 100) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Emissões no último mês", value: formatInt(issuances.length ? issuances[issuances.length - 1].total : 0), hint: issuances.length ? issuances[issuances.length - 1].label : "sem dados" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { title: "KPIs anuais", subtitle: ytdLabel ? `Comparação do acumulado até ${ytdLabel} contra o mesmo período do ano anterior` : "Crescimento da carteira, redução de incidentes e prêmio consolidado" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bento", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Crescimento da carteira", value: crescimentoCarteira === null ? "—" : formatPct(crescimentoCarteira, 1), hint: crescimentoCarteira === null || !yearCur || !yearPrev ? "histórico insuficiente" : `${yearPrev.year}: ${formatInt(yearPrev.contratosYtd)} → ${yearCur.year}: ${formatInt(yearCur.contratosYtd)} contratos (YTD ${ytdLabel})`, tone: "success", target: `meta ≥ ${targets.crescimentoAnualMinPct}%`, status: crescimentoCarteira === null ? void 0 : statusMin(crescimentoCarteira, targets.crescimentoAnualMinPct) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Redução de incidentes", value: reducaoIncidentes === null ? "—" : formatPct(reducaoIncidentes, 1), hint: reducaoIncidentes === null || !yearCur || !yearPrev ? "histórico insuficiente" : `${formatInt(yearPrev.criticosYtd)} → ${formatInt(yearCur.criticosYtd)} críticos distintos (YTD ${ytdLabel})`, tone: (reducaoIncidentes ?? 0) >= 0 ? "success" : "destructive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Contratos emitidos no ano", value: formatInt(yearCur?.contratosYtd ?? 0), hint: yearCur ? `${yearCur.year} até ${ytdLabel} · ${formatInt(yearCur.contratos)} no ano` : "sem dados" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Prêmio emitido no ano (USD)", value: formatUSD(yearCur?.premioEmitidoYtdUsd ?? 0, {
          maximumFractionDigits: 0
        }), hint: yearCur ? `${yearCur.year} até ${ytdLabel} · prêmio direto ${formatUSD(yearCur.premioDiretoYtdUsd, {
          maximumFractionDigits: 0
        })}` : "sem dados", tone: "success" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: chartsRef, className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { className: "lg:col-span-2", title: "Tendência de runs", empty: !hasData["Tendência de runs"], subtitle: "Aprovados vs reprovados nas últimas 12 auditorias", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[210px] sm:h-[280px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: series, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "gApr", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--success)", stopOpacity: 0.5 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--success)", stopOpacity: 0 })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "gRej", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--destructive)", stopOpacity: 0.5 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--destructive)", stopOpacity: 0 })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--border)", strokeDasharray: "3 3", vertical: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", stroke: "var(--muted-foreground)", fontSize: 11 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 11 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { ...tooltipProps }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "approved", stackId: "1", stroke: "var(--success)", fill: "url(#gApr)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "rejected", stackId: "1", stroke: "var(--destructive)", fill: "url(#gRej)" })
          ] }) }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(ChartCard, { title: "Severidade", empty: !hasData["Severidade"], subtitle: "Distribuição na última auditoria", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[170px] sm:h-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: [{
                name: "Erros",
                value: sev.erros,
                color: "var(--destructive)"
              }, {
                name: "Alertas",
                value: sev.alertas,
                color: "var(--warning)"
              }, {
                name: "Info",
                value: sev.infos,
                color: "var(--info)"
              }].filter((d) => d.value > 0), dataKey: "value", innerRadius: 50, outerRadius: 80, paddingAngle: 3, stroke: "none", children: ["var(--destructive)", "var(--warning)", "var(--info)"].map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: c }, i)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { ...tooltipProps })
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SeverityLegend, { sev })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4 sm:gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Conformidade ao longo do tempo", empty: !hasData["Conformidade ao longo do tempo"], subtitle: "% aprovado por run", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[170px] sm:h-[220px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: series.map((s) => ({
            ...s,
            conf: s.total ? s.approved / s.total * 100 : 0
          })), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--border)", strokeDasharray: "3 3", vertical: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", stroke: "var(--muted-foreground)", fontSize: 11 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 11, domain: [0, 100], tickFormatter: (v) => `${v}%` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { ...tooltipProps, formatter: (v) => formatPct(Number(v), 1) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "conf", stroke: "var(--primary)", strokeWidth: 2, dot: {
              fill: "var(--primary)",
              r: 3
            } })
          ] }) }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Volume processado", empty: !hasData["Volume processado"], subtitle: "Apólices auditadas por run", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[170px] sm:h-[220px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: series, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--border)", strokeDasharray: "3 3", vertical: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", stroke: "var(--muted-foreground)", fontSize: 11 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 11 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { ...tooltipProps }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "total", fill: "var(--primary)", radius: [4, 4, 0, 0] })
          ] }) }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4 sm:gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Top 10 tipos de erro", empty: !hasData["Top 10 tipos de erro"], subtitle: "Última auditoria", children: errorTypes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyMsg, { text: "Nenhum tipo de erro nesta run." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[230px] sm:h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: errorTypes, layout: "vertical", margin: {
            left: 8,
            right: 16
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--border)", strokeDasharray: "3 3", horizontal: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { type: "number", stroke: "var(--muted-foreground)", fontSize: 11 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { type: "category", dataKey: "tipo", stroke: "var(--muted-foreground)", fontSize: 10, width: 140, tickFormatter: (v) => v.length > 22 ? v.slice(0, 22) + "…" : v }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { ...tooltipProps }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "count", fill: "var(--destructive)", radius: [0, 4, 4, 0] })
          ] }) }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Findings por mês de vigência", empty: !hasData["Findings por mês de vigência"], subtitle: "Distribuição temporal das inconsistências", children: monthly.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyMsg, { text: "Sem datas de vigência nos findings." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[230px] sm:h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: monthly, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--border)", strokeDasharray: "3 3", vertical: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", stroke: "var(--muted-foreground)", fontSize: 10 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 11 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { ...tooltipProps }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "count", fill: "var(--info)", radius: [4, 4, 0, 0] })
          ] }) }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Receita Excelsior (USD) por mês de pagamento", empty: !hasData["Receita Excelsior (USD)"], subtitle: `Total Repasse = Carregamento (US$ 8.333,33) + Prêmio Direto (40% líquido IOF) − PIS/COFINS (4,65% × comissões Olé+Nomad) · espelha o Mapa de Repasses · Total: ${formatUSD(repasseTotals.excelsiorLiquido, {
          maximumFractionDigits: 0
        })} · Média/mês: ${formatUSD(repasseAvg, {
          maximumFractionDigits: 0
        })} · ${repasse.length} meses`, children: repasse.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyMsg, { text: "Sem prêmios pagos sincronizados." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[370px] sm:h-[440px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ComposedChart, { data: repasse, margin: {
          top: 36,
          right: 24,
          left: 8,
          bottom: 8
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "gCarregamento", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--primary)", stopOpacity: 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--primary)", stopOpacity: 0.65 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "gPremioDireto", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--success)", stopOpacity: 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--success)", stopOpacity: 0.7 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "gLiquido", x1: "0", y1: "0", x2: "1", y2: "0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--info)", stopOpacity: 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--primary)", stopOpacity: 1 })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--border)", strokeDasharray: "3 3", vertical: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", stroke: "var(--muted-foreground)", fontSize: 11, tickMargin: 10, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 11, tickFormatter: (v) => `$${formatCompact(Number(v))}`, axisLine: false, tickLine: false, width: 60, domain: [0, repasseMax], tickCount: 6, allowDecimals: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { ...tooltipProps, cursor: {
            fill: "var(--muted)",
            fillOpacity: 0.22
          }, content: /* @__PURE__ */ jsxRuntimeExports.jsx(RepasseTooltip, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: {
            fontSize: 11,
            paddingTop: 14
          }, iconType: "circle", iconSize: 8 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ReferenceLine, { y: REPASSE_RULES.FIXO_SUPLEMENTAR_PISO, stroke: "var(--muted-foreground)", strokeDasharray: "5 5", strokeOpacity: 0.7, label: {
            value: "Piso US$ 8.333,33",
            position: "right",
            fill: "var(--muted-foreground)",
            fontSize: 10,
            dy: -6,
            dx: -6
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "carregamentoExcelsior", name: "Carregamento (piso)", stackId: "rec", fill: "url(#gCarregamento)", maxBarSize: 44, isAnimationActive: true, animationDuration: 900 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "premioDireto", name: "Prêmio Direto (40%)", stackId: "rec", fill: "url(#gPremioDireto)", radius: [6, 6, 0, 0], maxBarSize: 44, isAnimationActive: true, animationDuration: 900 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "excelsiorLiquido", name: "Total Excelsior (líq. PIS/COFINS)", stroke: "url(#gLiquido)", strokeWidth: 3, dot: {
            fill: "var(--info)",
            r: 4,
            strokeWidth: 2,
            stroke: "var(--surface)"
          }, activeDot: {
            r: 7
          }, isAnimationActive: true, animationDuration: 1200, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LabelList, { dataKey: "excelsiorLiquido", position: "top", offset: 14, fontSize: 11, fontWeight: 600, fill: "var(--foreground)", formatter: (v) => `$${formatCompact(Number(v))}` }) })
        ] }) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Heatmap · tipo de erro × runs", empty: !hasData["Heatmap · tipo de erro × runs"], subtitle: "Intensidade de inconsistências por tipo nas últimas runs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heatmap, { runs: heatmap.runs, rows: heatmap.rows }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4 sm:gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Apólices mais problemáticas", empty: !hasData["Apólices mais problemáticas"], subtitle: `Top ${apoliceRank.length} por nº de inconsistências`, children: apoliceRank.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyMsg, { text: "Nenhuma apólice com inconsistências." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: apoliceRank.map((g, i) => {
            const max = apoliceRank[0].total;
            const s = countBySeverity(g.findings);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between mb-1.5 gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10.5px] text-muted-foreground w-5", children: [
                    "#",
                    i + 1
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/apolices/$id", params: {
                    id: g.apolice
                  }, className: "font-mono text-[11.5px] text-foreground hover:text-primary truncate", children: g.apolice }),
                  s.erros > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-destructive bg-destructive/10 px-1.5 py-0.5 rounded", children: [
                    s.erros,
                    "E"
                  ] }),
                  s.alertas > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-warning bg-warning/10 px-1.5 py-0.5 rounded", children: [
                    s.alertas,
                    "A"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[12px] text-foreground", children: g.total })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 rounded-full bg-background overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-linear-to-r from-destructive to-warning transition-all", style: {
                width: `${g.total / max * 100}%`
              } }) })
            ] }, g.apolice);
          }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Top endossos com inconsistências", empty: !hasData["Top endossos com inconsistências"], subtitle: "Endossos que mais acumulam findings", children: endossoRank.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyMsg, { text: "Sem endossos identificados." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: endossoRank.map((e, i) => {
            const max = endossoRank[0].total;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between mb-1.5 gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10.5px] text-muted-foreground w-5", children: [
                    "#",
                    i + 1
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11.5px] text-foreground truncate", children: e.endosso }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
                    e.apolices,
                    " apólices"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[12px] text-foreground", children: e.total })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 rounded-full bg-background overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-linear-to-r from-warning to-destructive transition-all", style: {
                width: `${e.total / max * 100}%`
              } }) })
            ] }, e.endosso);
          }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4 sm:gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Carteira por nº de endossos", empty: !hasData["Carteira por nº de endossos"], subtitle: "Quantas alterações cada apólice acumulou", children: endorsementsDist.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyMsg, { text: "Sem apólices na carteira." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[190px] sm:h-[260px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: endorsementsDist, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--border)", strokeDasharray: "3 3", vertical: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", stroke: "var(--muted-foreground)", fontSize: 11 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 11 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { ...tooltipProps }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "count", fill: "var(--info)", radius: [4, 4, 0, 0] })
          ] }) }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Apólices emitidas por mês", empty: !hasData["Apólices emitidas por mês"], subtitle: `${formatInt(totalApolices)} apólices em ${issuances.filter((i) => i.apolices > 0).length} meses`, children: issuances.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyMsg, { text: "Sem emissões registradas." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[190px] sm:h-[260px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: issuances, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--border)", strokeDasharray: "3 3", vertical: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", stroke: "var(--muted-foreground)", fontSize: 10 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 11, allowDecimals: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { ...tooltipProps, formatter: (v) => formatInt(Number(v)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "apolices", name: "Apólices", fill: "var(--primary)", radius: [4, 4, 0, 0] })
          ] }) }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4 sm:gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Endossos emitidos por mês", empty: !hasData["Endossos emitidos por mês"], subtitle: `${formatInt(totalEndossos)} endossos em ${issuances.filter((i) => i.endossosTotal > 0).length} meses`, children: issuances.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyMsg, { text: "Sem endossos registrados." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[190px] sm:h-[260px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: issuances, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--border)", strokeDasharray: "3 3", vertical: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", stroke: "var(--muted-foreground)", fontSize: 10 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 11, allowDecimals: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { ...tooltipProps, formatter: (v) => formatInt(Number(v)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "endossosTotal", name: "Endossos", fill: "var(--warning)", radius: [4, 4, 0, 0] })
          ] }) }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Emissões por mês e por tipo", empty: !hasData["Emissões por mês e por tipo"], subtitle: "Apólices e endossos (A, B, C, D) lado a lado", children: issuances.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyMsg, { text: "Sem emissões registradas." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[190px] sm:h-[260px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: issuances, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--border)", strokeDasharray: "3 3", vertical: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", stroke: "var(--muted-foreground)", fontSize: 10 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 11, allowDecimals: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { ...tooltipProps, formatter: (v) => formatInt(Number(v)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: {
              fontSize: 11
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "apolices", name: "Apólice", stackId: "emi", fill: "var(--primary)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "endossoA", name: "Endosso A", stackId: "emi", fill: "var(--info)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "endossoB", name: "Endosso B", stackId: "emi", fill: "var(--success)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "endossoC", name: "Endosso C", stackId: "emi", fill: "var(--warning)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "endossoD", name: "Endosso D", stackId: "emi", fill: "var(--destructive)", radius: [4, 4, 0, 0] })
          ] }) }) }) })
        ] })
      ] }),
      hiddenCharts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 rounded-lg border border-dashed border-border bg-surface/40 px-3 py-2 text-[11.5px] text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-3.5 w-3.5 mt-0.5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          hiddenCharts.length === 1 ? "1 gráfico oculto" : `${hiddenCharts.length} gráficos ocultos`,
          " ",
          "por falta de informação relevante: ",
          hiddenCharts.join(", "),
          ".",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/configuracoes", className: "underline hover:text-foreground", children: "Ajustar em Configurações" }),
          "."
        ] })
      ] })
    ] })
  ] });
}
const tooltipProps = {
  contentStyle: {
    background: "var(--surface-2)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    fontSize: 12
  },
  cursor: {
    fill: "var(--accent)",
    opacity: 0.3
  }
};
function SectionTitle({
  title,
  subtitle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[13px] font-semibold uppercase tracking-wider text-foreground", children: title }),
    subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: subtitle })
  ] });
}
const KPI_STATUS_STYLE = {
  ok: "text-success bg-success/10 border-success/30",
  warn: "text-warning bg-warning/10 border-warning/30",
  bad: "text-destructive bg-destructive/10 border-destructive/30"
};
const KPI_STATUS_LABEL = {
  ok: "na meta",
  warn: "atenção",
  bad: "fora da meta"
};
function Kpi({
  label,
  value,
  hint,
  delta,
  deltaSuffix = "%",
  tone,
  invertDelta,
  target,
  status
}) {
  const toneClass = tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : tone === "destructive" ? "text-destructive" : "text-foreground";
  const showDelta = delta !== void 0 && Number.isFinite(delta) && Math.abs(delta) >= 0.05;
  const positive = invertDelta ? (delta ?? 0) < 0 : (delta ?? 0) > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] uppercase tracking-wider text-muted-foreground font-medium", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1.5 text-[18px] sm:text-[22px] font-semibold tabular-nums ${toneClass}`, children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2 text-[11px]", children: [
      showDelta && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-mono ${positive ? "text-success" : "text-destructive"}`, children: [
        (delta ?? 0) > 0 ? "▲" : "▼",
        " ",
        Math.abs(delta ?? 0).toFixed(1),
        deltaSuffix
      ] }),
      hint && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground truncate", children: hint })
    ] }),
    (target || status) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-1.5", children: [
      target && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground/90", children: target }),
      status && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded border px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wide ${KPI_STATUS_STYLE[status]}`, children: KPI_STATUS_LABEL[status] })
    ] })
  ] });
}
function ChartCard({
  title,
  subtitle,
  className,
  empty,
  children
}) {
  const {
    prefs
  } = useChartPrefs();
  if (empty && prefs.hideEmptyCharts) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-export": "chart", "data-title": title, className: `panel p-5 ${className ?? ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] font-semibold", children: title }),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: subtitle })
    ] }),
    children
  ] });
}
function SeverityLegend({
  sev
}) {
  const items = [{
    name: "Erros",
    value: sev.erros,
    color: "var(--destructive)"
  }, {
    name: "Alertas",
    value: sev.alertas,
    color: "var(--warning)"
  }, {
    name: "Info",
    value: sev.infos,
    color: "var(--info)"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-1.5", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[11.5px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full", style: {
      background: it.color
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground flex-1", children: it.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: it.value })
  ] }, it.name)) });
}
function Heatmap({
  runs,
  rows
}) {
  if (rows.length === 0 || runs.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyMsg, { text: "Sem dados suficientes para o heatmap." });
  }
  const max = Math.max(1, ...rows.flatMap((r) => r.cells));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data-table text-[10.5px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-normal text-muted-foreground pb-2 pr-3 sticky left-0 bg-surface", children: "Tipo de erro" }),
      runs.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center font-mono font-normal text-muted-foreground pb-2 px-1 min-w-[42px]", children: r.label }, r.id))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.slice(0, 12).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1 pr-3 text-foreground truncate max-w-[200px] sticky left-0 bg-surface", children: r.tipo }),
      r.cells.map((c, i) => {
        const intensity = c / max;
        const bg = c === 0 ? "transparent" : `color-mix(in oklab, var(--destructive) ${Math.round(20 + intensity * 70)}%, transparent)`;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 rounded flex items-center justify-center font-mono text-[10px] text-foreground border border-border/40", style: {
          background: bg
        }, title: `${c} inconsistências`, children: c > 0 ? formatCompact(c) : "" }) }, i);
      })
    ] }, r.tipo)) })
  ] }) });
}
function EmptyMsg({
  text
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[160px] flex items-center justify-center text-[12px] text-muted-foreground", children: text });
}
function RepasseTooltip({
  active,
  payload
}) {
  if (!active || !payload || payload.length === 0) return null;
  const d = payload[0].payload;
  const row = (label, value, tone) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-6 text-[11px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-mono tabular-nums ${tone ?? "text-foreground"}`, children: formatUSD(value, {
      maximumFractionDigits: 2
    }) })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-surface/95 backdrop-blur p-3 shadow-elevated min-w-[260px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] font-semibold mb-2", children: d.label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      row("Prêmio Total Pago", d.premioTotalPago, "text-muted-foreground"),
      row("(−) IOF (0,38%)", -d.iof, "text-muted-foreground"),
      row("(=) Prêmio Líquido IOF", d.premioLiquidoIof, "text-muted-foreground"),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border my-1.5" }),
      row("Carregamento Excelsior", d.carregamentoExcelsior),
      row("Prêmio Direto (40%)", d.premioDireto, "text-success"),
      row("Comissões Olé+Nomad (55%)", d.comissoesOle, "text-muted-foreground"),
      row("(−) PIS/COFINS (4,65%)", -d.pisCofins, "text-destructive"),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border my-1.5" }),
      row("Total Repasse Excelsior", d.excelsiorLiquido, "text-info font-semibold")
    ] })
  ] });
}
function LoadingState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bento", children: Array.from({
      length: 8
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 panel animate-pulse" }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 h-[250px] sm:h-[320px] panel animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[250px] sm:h-[320px] panel animate-pulse" })
    ] })
  ] });
}
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel p-12 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-10 w-10 text-muted-foreground mx-auto mb-3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[14px] font-semibold mb-1", children: "Sem auditorias ainda" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12.5px] text-muted-foreground mb-4", children: "Execute uma auditoria para começar a ver indicadores e gráficos por aqui." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/operacao", className: "inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-[12px] font-medium", children: "Ir para Operação" })
  ] });
}
export {
  AnalyticsPage as component
};
