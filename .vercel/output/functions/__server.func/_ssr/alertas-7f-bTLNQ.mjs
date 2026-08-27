import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useLatestAudit, s as severityOf, n as normalizeFinding } from "./derive-CZZSw3Ap.mjs";
import { u as useQuery, q as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { r as relativeTime, c as cn, f as formatDateTime, i as createSsrRpc } from "./router-C--tI9WT.mjs";
import { c as createServerFn } from "./server-BxlZVXOU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BqwiLAOE.mjs";
import { u as useEscalationRules, D as DEFAULT_ESCALATION_RULES, U as URGENCY_ORDER, a as URGENCY_LABEL, d as daysBetween, e as escalate } from "./use-escalation-rules-Dt2mA-L9.mjs";
import { a as useAuditResolutions, u as useResolveFinding, b as useUnresolveFinding } from "./use-audit-resolutions-Db3hMTgq.mjs";
import { u as useAuditIgnores, a as useAddAuditIgnore, b as useRemoveAuditIgnore } from "./use-audit-ignores-BqmweSgK.mjs";
import { S as Skeleton } from "./skeleton-DrKMsIWf.mjs";
import { V as VirtualList } from "./virtual-list-FPUGudF8.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as Sheet, b as SheetContent, c as SheetHeader, d as SheetTitle, e as SheetDescription } from "./sheet-CnAlGDVm.mjs";
import { I as IgnoreReasonDialog, u as useExceptionTags, R as ReasonDisplay } from "./ignore-reason-dialog-C5zpw73G.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { T as TriangleAlert, d as Search, I as Download, r as CircleCheck, E as EyeOff, J as RotateCcwClock, K as Layers, n as Sparkles, N as RotateCcw, h as Trash2, O as Repeat, a as ChevronRight, H as Clock, Q as ExternalLink, U as Lock } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
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
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
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
import "../_libs/isbot.mjs";
import "./audit-run.server-DDaKmDPQ.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/zod.mjs";
import "../_libs/tanstack__react-virtual.mjs";
import "../_libs/tanstack__virtual-core.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/class-variance-authority.mjs";
import "./button-DxLsNwLg.mjs";
import "./dialog-Cw2eQtk0.mjs";
const getFindingRecurrence = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("d56309e99e6b4e4046c0dc00d9d1cb97f11bb20a62d93df13efae2405f9f3bc0"));
const findingRecurrenceQuery = queryOptions({
  queryKey: ["audit", "recurrence"],
  queryFn: () => getFindingRecurrence(),
  staleTime: 6e4
});
function useFindingRecurrence() {
  return useQuery(findingRecurrenceQuery);
}
const KEY = "ole.alert.urgency.overrides.v1";
const listeners = /* @__PURE__ */ new Set();
function read() {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
function write(next) {
  localStorage.setItem(KEY, JSON.stringify(next));
  listeners.forEach((l) => l(next));
}
function useUrgencyOverrides() {
  const [overrides, setOverrides] = reactExports.useState(() => read());
  reactExports.useEffect(() => {
    const l = (o) => setOverrides(o);
    listeners.add(l);
    setOverrides(read());
    return () => {
      listeners.delete(l);
    };
  }, []);
  const setOverride = reactExports.useCallback((key, urgency) => {
    write({ ...read(), [key]: urgency });
  }, []);
  const clearOverride = reactExports.useCallback((key) => {
    const next = { ...read() };
    delete next[key];
    write(next);
  }, []);
  const clearAll = reactExports.useCallback(() => write({}), []);
  return { overrides, setOverride, clearOverride, clearAll };
}
function keyOf(apolice, tipo, endosso) {
  return `${apolice}||${tipo}||${(endosso ?? "").trim()}`;
}
function buildAlertItems(findings, recurrence, rules = DEFAULT_ESCALATION_RULES, overrides = {}) {
  const rec = new Map(recurrence.map((r) => [r.key, r]));
  return findings.map((f) => {
    const key = keyOf(f.apolice, f.tipo_erro, f.endosso);
    const r = rec.get(key);
    const severity = severityOf(f);
    const firstSeenAt = r?.firstSeenAt ?? f.created_at;
    const daysOpen = daysBetween(firstSeenAt);
    const occurrences = r?.occurrences ?? 1;
    const totalOccurrences = r?.totalOccurrences ?? occurrences;
    const reopened = r?.reopened ?? false;
    const recorrenteNaApolice = r?.recorrenteNaApolice ?? false;
    const esc2 = escalate(
      severity,
      { occurrences, daysOpen, reopened, recorrenteNaApolice },
      rules
    );
    const norm = normalizeFinding(f);
    const legacyKey = `${f.apolice}||${f.tipo_erro}`;
    const manualUrgency = overrides[key] ?? overrides[legacyKey] ?? null;
    return {
      f,
      severity,
      urgency: manualUrgency ?? esc2.urgency,
      autoUrgency: esc2.urgency,
      manualUrgency,
      baseUrgency: esc2.base,
      bumps: esc2.bumps,
      escalationReasons: esc2.reasons,
      occurrences,
      totalOccurrences,
      recorrenteNaApolice,
      policyHistory: r?.policyHistory ?? [],
      streak: r?.streak ?? 1,
      firstSeenAt,
      firstSeenEverAt: r?.firstSeenEverAt ?? firstSeenAt,
      daysOpen,
      reopened,
      resolvedTimes: r?.resolvedTimes ?? 0,
      motivo: norm.motivo,
      detalhe: norm.detalhe,
      endosso: norm.endosso,
      key
    };
  });
}
function sortAlerts(items, key) {
  const u = (i) => URGENCY_ORDER.indexOf(i.urgency);
  const out = [...items];
  out.sort((a, b) => {
    switch (key) {
      case "idade":
        return b.daysOpen - a.daysOpen || u(b) - u(a);
      case "reincidencia":
        return b.occurrences - a.occurrences || u(b) - u(a);
      case "apolice":
        return a.f.apolice.localeCompare(b.f.apolice);
      case "urgencia":
      default:
        return u(b) - u(a) || b.occurrences - a.occurrences || b.daysOpen - a.daysOpen;
    }
  });
  return out;
}
const HEADERS = [
  "apolice",
  "tipo_erro",
  "urgencia",
  "severidade_base",
  "auditorias_consecutivas_em_aberto",
  "auditorias_total",
  "dias_em_aberto",
  "reaberto",
  "reincidente_na_apolice",
  "endossos_anteriores_com_erro",
  "endosso",
  "motivo",
  "detalhe",
  "primeira_deteccao",
  "detectado_em"
];
const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
function alertsToCsv(items) {
  const lines = [HEADERS.join(";")];
  for (const i of items) {
    lines.push(
      [
        i.f.apolice,
        i.f.tipo_erro,
        URGENCY_LABEL[i.urgency],
        i.severity,
        i.occurrences,
        i.totalOccurrences,
        i.daysOpen,
        i.reopened ? "sim" : "não",
        i.recorrenteNaApolice ? "sim" : "não",
        i.policyHistory.map((h) => h.endosso).join(" / "),
        i.endosso ?? "",
        i.motivo,
        i.detalhe,
        i.firstSeenAt,
        i.f.created_at
      ].map(esc).join(";")
    );
  }
  return "\uFEFF" + lines.join("\n");
}
function downloadAlertsCsv(items) {
  const blob = new Blob([alertsToCsv(items)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alertas-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
const URG_TEXT = {
  critica: "text-destructive",
  alta: "text-destructive",
  media: "text-warning",
  baixa: "text-info"
};
const URG_BG = {
  critica: "bg-destructive/15",
  alta: "bg-destructive/10",
  media: "bg-warning/10",
  baixa: "bg-info/10"
};
const URG_DOT = {
  critica: "bg-destructive",
  alta: "bg-destructive/70",
  media: "bg-warning",
  baixa: "bg-info"
};
const URG_BORDER = {
  critica: "border-l-destructive shadow-[inset_4px_0_0_var(--destructive),0_0_30px_-12px_var(--destructive)]",
  alta: "border-l-destructive/70 shadow-[inset_4px_0_0_var(--destructive)]",
  media: "border-l-warning shadow-[inset_4px_0_0_var(--warning)]",
  baixa: "border-l-info shadow-[inset_4px_0_0_var(--info)]"
};
function UrgencyPicker({
  value,
  manual,
  onSet,
  onClear,
  size = "sm"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
    manual && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: "Nível definido manualmente", className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3 shrink-0 text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "select",
      {
        value,
        onChange: (e) => onSet(e.target.value),
        onClick: (e) => e.stopPropagation(),
        "aria-label": "Definir nível de alerta",
        className: cn(
          "rounded-md border bg-surface px-1.5 font-medium capitalize outline-none transition focus:border-primary/60",
          size === "sm" ? "h-7 text-[11px]" : "h-8 text-[12px]",
          manual ? "border-primary/60" : "border-border",
          URG_TEXT[value],
          manual && URG_BG[value]
        ),
        children: [...URGENCY_ORDER].reverse().map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: u, className: "text-foreground", children: URGENCY_LABEL[u] }, u))
      }
    ),
    manual && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: (e) => {
          e.stopPropagation();
          onClear();
        },
        title: "Voltar ao nível automático",
        className: "inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground transition hover:text-foreground",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3 w-3" })
      }
    )
  ] });
}
const IncidentRow = reactExports.memo(function IncidentRow2({
  item,
  selected,
  onToggleSelect,
  onOpen,
  onResolve,
  onIgnore,
  onSetUrgency,
  onClearUrgency
}) {
  const { f } = item;
  const id = `${f.id}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "panel transition hover:bg-surface-2/60 border-l-4 pl-3 pr-3 py-3",
        URG_BORDER[item.urgency],
        selected && "ring-1 ring-primary/60"
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            checked: selected,
            onChange: () => onToggleSelect(id),
            "aria-label": "Selecionar incidente",
            className: "mt-1 h-3.5 w-3.5 shrink-0 accent-[var(--primary)]"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onOpen(item), className: "min-w-0 flex-1 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex flex-wrap items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase",
                  URG_TEXT[item.urgency],
                  URG_BG[item.urgency]
                ),
                children: URGENCY_LABEL[item.urgency]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-semibold text-foreground", children: f.tipo_erro }),
            item.occurrences > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded bg-warning/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-warning", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcwClock, { className: "h-3 w-3" }),
              item.occurrences,
              "ª auditoria seguida"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-info/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-info", children: "novo" }),
            item.recorrenteNaApolice && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                title: `Mesmo erro já ocorreu em endosso anterior desta apólice: ${item.policyHistory.map((h) => h.endosso).join(", ")}`,
                className: "inline-flex items-center gap-1 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-primary",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Repeat, { className: "h-3 w-3" }),
                  " reincidente na apólice"
                ]
              }
            ),
            item.reopened && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded bg-destructive/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-destructive", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3 w-3" }),
              " reaberto"
            ] }),
            item.bumps > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted-foreground", children: [
              "escalado +",
              item.bumps
            ] }),
            item.endosso && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted-foreground", children: [
              "end. ",
              item.endosso.slice(-6)
            ] })
          ] }),
          (item.motivo || item.detalhe) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "line-clamp-2 text-[11.5px] text-muted-foreground", children: item.motivo || item.detalhe }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-foreground/80", children: [
              "apólice …",
              f.apolice.slice(-12)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.daysOpen === 0 ? "aberto hoje" : `${item.daysOpen} d em aberto` }),
            f.data_inicio && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "vig. ",
                new Date(f.data_inicio).toLocaleDateString("pt-BR"),
                f.data_fim ? ` → ${new Date(f.data_fim).toLocaleDateString("pt-BR")}` : ""
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 flex-col items-end gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: relativeTime(f.created_at) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              UrgencyPicker,
              {
                value: item.urgency,
                manual: item.manualUrgency,
                onSet: (u) => onSetUrgency(item, u),
                onClear: () => onClearUrgency(item)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => onResolve(item),
                title: "Marcar como resolvido",
                className: "inline-flex h-7 items-center gap-1 rounded-md border border-border bg-surface px-2 text-[11px] transition hover:border-success/60 hover:text-success",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Resolver" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => onIgnore(item),
                title: "Registrar exceção",
                className: "inline-flex h-7 items-center gap-1 rounded-md border border-border bg-surface px-2 text-[11px] transition hover:border-warning/60 hover:text-warning",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-3.5 w-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Ignorar" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => onOpen(item),
                title: "Ver detalhes",
                className: "inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface transition hover:border-primary/60",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
              }
            )
          ] })
        ] })
      ] })
    }
  );
});
function Field({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 break-words text-[12.5px]", children })
  ] });
}
function IncidentDetail({
  item,
  runs,
  itemRuns,
  resolutions,
  ignores,
  onOpenChange,
  onResolve,
  onIgnore,
  onSetUrgency,
  onClearUrgency
}) {
  if (!item) return null;
  const { f } = item;
  const present = new Set(itemRuns);
  const timeline = [...runs].reverse();
  const extra = f.detalhes ?? {};
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: !!item, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { className: "w-full overflow-y-auto sm:max-w-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "flex flex-wrap items-center gap-2 text-[15px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase",
              URG_TEXT[item.urgency],
              URG_BG[item.urgency]
            ),
            children: URGENCY_LABEL[item.urgency]
          }
        ),
        f.tipo_erro
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetDescription, { className: "text-[12px]", children: [
        "Endosso ",
        item.endosso ?? "—",
        " · em aberto desde ",
        formatDateTime(item.firstSeenAt),
        " (",
        item.occurrences,
        " auditoria",
        item.occurrences > 1 ? "s" : "",
        " seguida",
        item.occurrences > 1 ? "s" : "",
        ") · detectado ",
        relativeTime(f.created_at)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-surface p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[10.5px] uppercase tracking-wider text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcwClock, { className: "h-3 w-3" }),
            " auditorias seguidas"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[18px] font-semibold tabular-nums", children: item.occurrences })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-surface p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[10.5px] uppercase tracking-wider text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
            " dias abertos"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[18px] font-semibold tabular-nums", children: item.daysOpen })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-surface p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[10.5px] uppercase tracking-wider text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3 w-3" }),
            " resolvido antes"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-[18px] font-semibold tabular-nums", children: [
            item.resolvedTimes,
            "x"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-surface p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground", children: "Nível de alerta" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-[11.5px] text-muted-foreground", children: item.manualUrgency ? `Definido manualmente · automático seria ${URGENCY_LABEL[item.autoUrgency]}` : "Calculado automaticamente pelas regras de escalonamento" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          UrgencyPicker,
          {
            size: "md",
            value: item.urgency,
            manual: item.manualUrgency,
            onSet: (u) => onSetUrgency(item, u),
            onClear: () => onClearUrgency(item)
          }
        )
      ] }),
      item.escalationReasons.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-warning/40 bg-warning/5 p-3 text-[12px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 font-semibold text-warning", children: [
          "Urgência escalada de ",
          URGENCY_LABEL[item.baseUrgency],
          " para",
          " ",
          URGENCY_LABEL[item.autoUrgency]
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-inside list-disc text-muted-foreground", children: item.escalationReasons.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: r }, r)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 rounded-lg border border-border bg-surface p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Apólice", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: f.apolice }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Endosso", children: item.endosso ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Vigência", children: f.data_inicio ? `${new Date(f.data_inicio).toLocaleDateString("pt-BR")}${f.data_fim ? ` → ${new Date(f.data_fim).toLocaleDateString("pt-BR")}` : ""}` : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Severidade base", children: item.severity }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Motivo", children: item.motivo || "—" }) }),
        item.detalhe && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Detalhe", children: item.detalhe }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground", children: "Aparições por auditoria" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-end gap-1", children: timeline.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            title: `${formatDateTime(r.created_at)} · ${present.has(r.id) ? "presente" : "ausente"}`,
            className: cn(
              "h-6 w-4 rounded-sm",
              present.has(r.id) ? "bg-destructive/80" : "bg-muted/40"
            )
          },
          r.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-[11px] text-muted-foreground", children: [
          timeline.length,
          " auditorias analisadas · sequência atual: ",
          item.streak,
          " · total",
          " ",
          item.totalOccurrences
        ] })
      ] }),
      item.policyHistory.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-lg border border-primary/40 bg-primary/5 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[12px] font-semibold text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Repeat, { className: "h-3.5 w-3.5" }),
          " Reincidente nesta apólice"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11.5px] text-muted-foreground", children: "O mesmo tipo de erro já ocorreu em outro(s) endosso(s) desta apólice:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 text-[12px]", children: item.policyHistory.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
            "end. ",
            h.endosso
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            formatDateTime(h.firstSeenAt),
            h.lastSeenAt !== h.firstSeenAt ? ` → ${formatDateTime(h.lastSeenAt)}` : "",
            " ·",
            " ",
            h.audits,
            " auditoria",
            h.audits > 1 ? "s" : ""
          ] })
        ] }, h.endosso)) })
      ] }),
      (resolutions.length > 0 || ignores.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground", children: "Histórico deste problema" }),
        resolutions.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-lg border border-border bg-surface p-2.5 text-[12px]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-success", children: r.origem === "auto" ? "Resolvido automaticamente" : "Resolvido" }),
              " ",
              formatDateTime(r.resolved_at),
              r.reopened_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-destructive", children: [
                " ",
                "· reaberto ",
                formatDateTime(r.reopened_at)
              ] }),
              r.motivo && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: r.motivo })
            ]
          },
          r.id
        )),
        ignores.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-lg border border-border bg-surface p-2.5 text-[12px]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-warning", children: "Exceção" }),
              " ",
              formatDateTime(i.created_at),
              i.motivo && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: i.motivo })
            ]
          },
          i.id
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "rounded-lg border border-border bg-surface p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "cursor-pointer text-[12px] font-medium", children: "Dados técnicos do achado" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "mt-2 max-h-64 overflow-auto whitespace-pre-wrap break-all text-[11px] text-muted-foreground", children: JSON.stringify(extra, null, 2) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => onResolve(item),
            className: "inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-surface px-3 text-[12.5px] transition hover:border-success/60 hover:text-success",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
              " Marcar como resolvido"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => onIgnore(item),
            className: "inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-surface px-3 text-[12.5px] transition hover:border-warning/60 hover:text-warning",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-3.5 w-3.5" }),
              " Registrar exceção"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/apolices/$id",
            params: { id: f.apolice },
            className: "inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-surface px-3 text-[12.5px] transition hover:border-primary/60",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }),
              " Abrir apólice"
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
const HOUR = 36e5;
function tempo(first, resolved) {
  if (!first) return "—";
  const h = (+new Date(resolved) - +new Date(first)) / HOUR;
  if (!Number.isFinite(h) || h < 0) return "—";
  if (h < 24) return `${Math.round(h)} h`;
  return `${Math.round(h / 24)} d`;
}
function ResolvedTab() {
  const { data = [], isLoading } = useAuditResolutions();
  const unresolve = useUnresolveFinding();
  const [q, setQ] = reactExports.useState("");
  const [onlyReopened, setOnlyReopened] = reactExports.useState(false);
  const rows = reactExports.useMemo(() => {
    const s = q.trim().toLowerCase();
    return data.filter((r) => {
      if (onlyReopened && !r.reopened_at) return false;
      if (!s) return true;
      return `${r.apolice} ${r.tipo_erro} ${r.motivo ?? ""}`.toLowerCase().includes(s);
    });
  }, [data, q, onlyReopened]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-72", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: q,
            onChange: (e) => setQ(e.target.value),
            placeholder: "Buscar no histórico…",
            className: "h-9 w-full rounded-lg border border-border bg-surface pl-8 pr-3 text-[12.5px] outline-none focus:border-primary/60"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setOnlyReopened((v) => !v),
          className: `h-9 rounded-md border px-3 text-[12px] transition ${onlyReopened ? "border-destructive bg-destructive/10 text-destructive" : "border-border bg-surface text-muted-foreground hover:text-foreground"}`,
          children: "Só reabertos"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11.5px] text-muted-foreground", children: [
        rows.length,
        " de ",
        data.length,
        " registros"
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[74px] rounded-xl" }, i)) }) : rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-dashed border-border bg-surface px-5 py-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto mb-3 h-7 w-7 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 text-[13px] font-semibold", children: "Nenhum erro resolvido ainda" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11.5px] text-muted-foreground", children: "Ao marcar um incidente como resolvido, ele aparece aqui com o tempo de resolução." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      VirtualList,
      {
        items: rows,
        getKey: (r) => r.id,
        estimateSize: 82,
        gap: 8,
        className: "max-h-[70dvh]",
        children: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border border-l-4 border-l-success bg-surface px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-success/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase text-success", children: r.origem === "auto" ? "resolvido automaticamente" : "resolvido" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-semibold", children: r.tipo_erro }),
              r.reopened_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded bg-destructive/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-destructive", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3 w-3" }),
                " reaberto"
              ] })
            ] }),
            r.motivo && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "line-clamp-2 text-[11.5px] text-muted-foreground", children: r.motivo }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-foreground/80", children: [
                "apólice …",
                r.apolice.slice(-12)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "resolvido em ",
                formatDateTime(r.resolved_at)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "tempo ",
                tempo(r.first_seen_at, r.resolved_at)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => unresolve.mutate({ id: r.id }),
              disabled: unresolve.isPending,
              className: "inline-flex h-7 shrink-0 items-center gap-1 rounded-md border border-border bg-surface px-2 text-[11px] transition hover:border-destructive/60 hover:text-destructive disabled:opacity-50",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
                " Reabrir"
              ]
            }
          )
        ] }) })
      }
    )
  ] });
}
function ExceptionsTab() {
  const { data = [], isLoading } = useAuditIgnores();
  const { data: tags = [] } = useExceptionTags();
  const remove = useRemoveAuditIgnore();
  const [q, setQ] = reactExports.useState("");
  const rows = reactExports.useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return data;
    return data.filter(
      (r) => `${r.apolice} ${r.tipo_erro ?? ""} ${r.motivo ?? ""}`.toLowerCase().includes(s)
    );
  }, [data, q]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-72", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: q,
            onChange: (e) => setQ(e.target.value),
            placeholder: "Buscar exceções…",
            className: "h-9 w-full rounded-lg border border-border bg-surface pl-8 pr-3 text-[12.5px] outline-none focus:border-primary/60"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11.5px] text-muted-foreground", children: [
        rows.length,
        " exceção(ões) ativas · não entram nos indicadores"
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[68px] rounded-xl" }, i)) }) : rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-dashed border-border bg-surface px-5 py-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "mx-auto mb-3 h-7 w-7 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 text-[13px] font-semibold", children: "Nenhuma exceção registrada" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11.5px] text-muted-foreground", children: "Incidentes ignorados aparecem aqui com o motivo informado." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-3 rounded-xl border border-border border-l-4 border-l-warning bg-surface px-4 py-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-warning/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase text-warning", children: r.scope === "apolice" ? "apólice inteira" : "tipo específico" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-semibold", children: r.tipo_erro ?? "Todos os tipos" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11.5px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReasonDisplay, { motivo: r.motivo, tagId: r.reason_tag_id, tags }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-foreground/80", children: [
                "apólice …",
                r.apolice.slice(-12)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "desde ",
                formatDateTime(r.created_at)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => remove.mutate({ id: r.id }),
              disabled: remove.isPending,
              className: "inline-flex h-7 shrink-0 items-center gap-1 rounded-md border border-border bg-surface px-2 text-[11px] transition hover:border-destructive/60 hover:text-destructive disabled:opacity-50",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                " Remover"
              ]
            }
          )
        ]
      },
      r.id
    )) })
  ] });
}
function AlertasPage() {
  const {
    data: latest,
    isLoading,
    error
  } = useLatestAudit();
  const {
    data: recurrence
  } = useFindingRecurrence();
  const {
    rules
  } = useEscalationRules();
  const {
    overrides,
    setOverride,
    clearOverride
  } = useUrgencyOverrides();
  const {
    data: resolutions = []
  } = useAuditResolutions();
  const {
    data: ignores = []
  } = useAuditIgnores();
  const resolve = useResolveFinding();
  const addIgnore = useAddAuditIgnore();
  const [tab, setTab] = reactExports.useState("abertos");
  const [urg, setUrg] = reactExports.useState("all");
  const [tipo, setTipo] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const [onlyRecurring, setOnlyRecurring] = reactExports.useState(false);
  const [onlyReopened, setOnlyReopened] = reactExports.useState(false);
  const [age, setAge] = reactExports.useState("all");
  const [sort, setSort] = reactExports.useState("urgencia");
  const [grouped, setGrouped] = reactExports.useState(false);
  const [selected, setSelected] = reactExports.useState(/* @__PURE__ */ new Set());
  const [detail, setDetail] = reactExports.useState(null);
  const [ignoreTarget, setIgnoreTarget] = reactExports.useState(null);
  const run = latest?.run ?? null;
  const items = reactExports.useMemo(() => buildAlertItems(latest?.findings ?? [], recurrence?.items ?? [], rules, overrides), [latest, recurrence, rules, overrides]);
  const tipos = reactExports.useMemo(() => Array.from(new Set(items.map((i) => i.f.tipo_erro))).sort(), [items]);
  const counts = reactExports.useMemo(() => {
    const c = {
      baixa: 0,
      media: 0,
      alta: 0,
      critica: 0
    };
    let reincidentes = 0;
    let novos = 0;
    for (const i of items) {
      c[i.urgency]++;
      if (i.recorrenteNaApolice) reincidentes++;
      if (i.occurrences <= 1 && !i.recorrenteNaApolice) novos++;
    }
    return {
      c,
      reincidentes,
      novos
    };
  }, [items]);
  const filtered = reactExports.useMemo(() => {
    const q = search.trim().toLowerCase();
    const out = items.filter((i) => {
      if (urg !== "all" && i.urgency !== urg) return false;
      if (tipo !== "all" && i.f.tipo_erro !== tipo) return false;
      if (onlyRecurring && !i.recorrenteNaApolice) return false;
      if (onlyReopened && !i.reopened) return false;
      if (age === "novo" && i.daysOpen > 0) return false;
      if (age === "1a7" && (i.daysOpen < 1 || i.daysOpen > 7)) return false;
      if (age === "mais7" && i.daysOpen <= 7) return false;
      if (q) {
        const hay = `${i.f.apolice} ${i.f.tipo_erro} ${i.motivo} ${i.detalhe} ${i.endosso ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    return sortAlerts(out, sort);
  }, [items, urg, tipo, onlyRecurring, onlyReopened, age, search, sort]);
  const groups = reactExports.useMemo(() => {
    if (!grouped) return [];
    const map = /* @__PURE__ */ new Map();
    for (const i of filtered) {
      const list = map.get(i.f.apolice) ?? [];
      list.push(i);
      map.set(i.f.apolice, list);
    }
    return [...map.entries()].sort((a, b) => b[1].length - a[1].length);
  }, [filtered, grouped]);
  const toggleSelect = (id) => setSelected((prev) => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  });
  const selectedItems = filtered.filter((i) => selected.has(i.f.id));
  const doResolve = (i) => resolve.mutate({
    apolice: i.f.apolice,
    tipo_erro: i.f.tipo_erro,
    endosso: i.endosso,
    run_id: run?.id ?? null
  });
  const bulkResolve = () => {
    for (const i of selectedItems) doResolve(i);
    setSelected(/* @__PURE__ */ new Set());
  };
  const confirmIgnore = (res) => {
    const targets = ignoreTarget ? [ignoreTarget] : selectedItems;
    for (const i of targets) {
      addIgnore.mutate({
        apolice: i.f.apolice,
        tipo_erro: i.f.tipo_erro,
        motivo: res.motivo,
        reason_tag_id: res.reason_tag_id
      });
    }
    setIgnoreTarget(null);
    setSelected(/* @__PURE__ */ new Set());
    setBulkIgnoreOpen(false);
  };
  const [bulkIgnoreOpen, setBulkIgnoreOpen] = reactExports.useState(false);
  const setUrgency = (i, u) => setOverride(i.key, u);
  const clearUrgency = (i) => {
    clearOverride(i.key);
    clearOverride(`${i.f.apolice}||${i.f.tipo_erro}`);
  };
  const bulkSetUrgency = (u) => {
    for (const i of selectedItems) setOverride(i.key, u);
    setSelected(/* @__PURE__ */ new Set());
  };
  const detailKey = detail ? keyOf(detail.f.apolice, detail.f.tipo_erro, detail.f.endosso) : null;
  const detailRuns = (recurrence?.items ?? []).find((r) => r.key === detailKey)?.runs ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-warning" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] uppercase tracking-[0.2em] text-warning", children: "SOC · INCIDENT VIEW" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Alertas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "page-subtitle mt-1.5", children: isLoading ? "Carregando incidentes…" : run ? `${filtered.length} de ${items.length} visíveis · última auditoria ${relativeTime(run.created_at)}` : "Nenhuma auditoria executada ainda." })
      ] }),
      tab === "abertos" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full flex-wrap items-center gap-2 md:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full md:w-72", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Buscar por apólice, tipo, motivo…", className: "h-9 w-full rounded-lg border border-border bg-surface pl-8 pr-3 text-[12.5px] placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => downloadAlertsCsv(filtered), disabled: filtered.length === 0, className: "inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-surface px-3 text-[12px] transition hover:border-primary/60 disabled:opacity-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
          " CSV"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 border-b border-border", children: [{
      id: "abertos",
      label: "Abertos",
      icon: TriangleAlert
    }, {
      id: "resolvidos",
      label: "Resolvidos",
      icon: CircleCheck
    }, {
      id: "excecoes",
      label: "Exceções",
      icon: EyeOff
    }].map((t) => {
      const Icon = t.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab(t.id), className: cn("-mb-px inline-flex h-10 items-center gap-1.5 border-b-2 px-4 text-[13px] font-medium transition", tab === t.id ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
        t.label
      ] }, t.id);
    }) }),
    tab === "resolvidos" && /* @__PURE__ */ jsxRuntimeExports.jsx(ResolvedTab, {}),
    tab === "excecoes" && /* @__PURE__ */ jsxRuntimeExports.jsx(ExceptionsTab, {}),
    tab === "abertos" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-[12px] text-destructive", children: [
        "Falha ao carregar findings: ",
        error.message
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setUrg("all"), className: cn("rounded-xl border bg-surface p-4 text-left transition hover:border-primary/30", urg === "all" ? "border-primary/60 shadow-glow" : "border-border"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground", children: "Todos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[20px] font-semibold tabular-nums sm:text-[24px]", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-12" }) : items.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: "incidentes abertos" })
        ] }),
        [...URGENCY_ORDER].reverse().map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setUrg(urg === u ? "all" : u), className: cn("rounded-xl border bg-surface p-4 text-left transition hover:border-primary/30", urg === u ? "border-primary/60 shadow-glow" : "border-border"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-[10.5px] font-semibold uppercase tracking-wider", URG_TEXT[u]), children: URGENCY_LABEL[u] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("h-1.5 w-1.5 rounded-full", URG_DOT[u]) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[20px] font-semibold tabular-nums sm:text-[24px]", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-12" }) : counts.c[u] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground", children: [
            "urgência ",
            URGENCY_LABEL[u]
          ] })
        ] }, u)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOnlyRecurring((v) => !v), className: cn("rounded-xl border bg-surface p-4 text-left transition hover:border-primary/30", onlyRecurring ? "border-primary/60 shadow-glow" : "border-border"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10.5px] font-semibold uppercase tracking-wider text-warning", children: "reincidentes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcwClock, { className: "h-3 w-3 text-warning" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[20px] font-semibold tabular-nums sm:text-[24px]", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-12" }) : counts.reincidentes }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground", children: [
            "mesmo erro em endosso anterior · ",
            counts.novos,
            " novos"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: "Tipo:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTipo("all"), className: cn("h-7 rounded-md border px-2.5 text-[11.5px] font-medium transition", tipo === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface text-muted-foreground hover:text-foreground"), children: "Todos" }),
        tipos.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTipo(tipo === t ? "all" : t), className: cn("h-7 rounded-md border px-2.5 text-[11.5px] font-medium transition", tipo === t ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface text-muted-foreground hover:text-foreground"), children: t }, t))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: age, onChange: (e) => setAge(e.target.value), className: "h-8 rounded-md border border-border bg-surface px-2 text-[12px] outline-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Qualquer idade" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "novo", children: "Aberto hoje" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1a7", children: "1 a 7 dias" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "mais7", children: "Mais de 7 dias" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: sort, onChange: (e) => setSort(e.target.value), className: "h-8 rounded-md border border-border bg-surface px-2 text-[12px] outline-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "urgencia", children: "Ordenar por urgência" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "idade", children: "Ordenar por idade" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "reincidencia", children: "Ordenar por reincidência" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "apolice", children: "Ordenar por apólice" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOnlyReopened((v) => !v), className: cn("h-8 rounded-md border px-2.5 text-[12px] transition", onlyReopened ? "border-destructive bg-destructive/10 text-destructive" : "border-border bg-surface text-muted-foreground hover:text-foreground"), children: "Só reabertos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setGrouped((v) => !v), className: cn("inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-[12px] transition", grouped ? "border-primary bg-primary/10 text-primary" : "border-border bg-surface text-muted-foreground hover:text-foreground"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-3.5 w-3.5" }),
          " Agrupar por apólice"
        ] })
      ] }),
      selected.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 rounded-xl border border-primary/40 bg-primary/5 px-4 py-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[12.5px] font-medium", children: [
          selected.size,
          " selecionado(s)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: bulkResolve, className: "inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-[12px] transition hover:border-success/60 hover:text-success", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
          " Resolver em lote"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setBulkIgnoreOpen(true), className: "inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-[12px] transition hover:border-warning/60 hover:text-warning", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-3.5 w-3.5" }),
          " Ignorar em lote"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { defaultValue: "", onChange: (e) => {
          if (e.target.value) bulkSetUrgency(e.target.value);
        }, className: "h-8 rounded-md border border-border bg-surface px-2 text-[12px] outline-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Definir nível…" }),
          [...URGENCY_ORDER].reverse().map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: u, children: URGENCY_LABEL[u] }, u))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelected(/* @__PURE__ */ new Set()), className: "h-8 rounded-md px-2 text-[12px] text-muted-foreground hover:text-foreground", children: "Limpar seleção" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: isLoading ? Array.from({
        length: 6
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[96px] rounded-xl" }, i)) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-dashed border-border bg-surface px-5 py-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mx-auto mb-3 h-7 w-7 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 text-[13px] font-semibold", children: items.length === 0 ? "Nenhum incidente na última auditoria" : "Nenhum incidente com esses filtros" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11.5px] text-muted-foreground", children: items.length === 0 ? "Carteira em conformidade ou auditoria ainda não executada." : "Ajuste os filtros para ver mais resultados." })
      ] }) : grouped ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: groups.map(([apolice, list]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[12px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-foreground/80", children: [
            "apólice …",
            apolice.slice(-12)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded bg-muted/40 px-1.5 py-0.5 text-[10.5px] text-muted-foreground", children: [
            list.length,
            " incidente(s)"
          ] })
        ] }),
        list.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(IncidentRow, { item: i, selected: selected.has(i.f.id), onToggleSelect: toggleSelect, onOpen: setDetail, onResolve: doResolve, onIgnore: setIgnoreTarget, onSetUrgency: setUrgency, onClearUrgency: clearUrgency }, i.f.id))
      ] }, apolice)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(VirtualList, { items: filtered, getKey: (i) => i.f.id, estimateSize: 112, gap: 8, className: "max-h-[70dvh]", children: (i) => /* @__PURE__ */ jsxRuntimeExports.jsx(IncidentRow, { item: i, selected: selected.has(i.f.id), onToggleSelect: toggleSelect, onOpen: setDetail, onResolve: doResolve, onIgnore: setIgnoreTarget, onSetUrgency: setUrgency, onClearUrgency: clearUrgency }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(IncidentDetail, { item: detail, runs: recurrence?.runs ?? [], itemRuns: detailRuns, resolutions: resolutions.filter((r) => detail != null && r.apolice === detail.f.apolice && r.tipo_erro === detail.f.tipo_erro), ignores: ignores.filter((g) => detail != null && g.apolice === detail.f.apolice && (g.tipo_erro === null || g.tipo_erro === detail.f.tipo_erro)), onOpenChange: (v) => !v && setDetail(null), onResolve: (i) => {
      doResolve(i);
      setDetail(null);
    }, onIgnore: (i) => {
      setDetail(null);
      setIgnoreTarget(i);
    }, onSetUrgency: (i, u) => {
      setUrgency(i, u);
      setDetail({
        ...i,
        urgency: u,
        manualUrgency: u
      });
    }, onClearUrgency: (i) => {
      clearUrgency(i);
      setDetail({
        ...i,
        urgency: i.autoUrgency,
        manualUrgency: null
      });
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(IgnoreReasonDialog, { open: !!ignoreTarget || bulkIgnoreOpen, onOpenChange: (v) => {
      if (!v) {
        setIgnoreTarget(null);
        setBulkIgnoreOpen(false);
      }
    }, targetLabel: ignoreTarget ? `${ignoreTarget.f.tipo_erro} · apólice …${ignoreTarget.f.apolice.slice(-12)}` : `${selected.size} incidente(s) selecionados`, pending: addIgnore.isPending, onConfirm: confirmIgnore })
  ] });
}
export {
  AlertasPage as component
};
