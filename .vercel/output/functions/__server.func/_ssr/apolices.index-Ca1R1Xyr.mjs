import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { j as usePolicies, p as useLatestPolicySync, D as useRunPolicySync, E as useBillingTagMap, F as matchSituacao, c as cn, r as relativeTime, G as BillingFilters, H as fmtNum, I as billingTagClass, f as formatDateTime } from "./router-C--tI9WT.mjs";
import { N as NextRunCountdown } from "./next-run-countdown-Bbef3m6j.mjs";
import { V as VirtualList } from "./virtual-list-FPUGudF8.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { f as RefreshCw, X, d as Search, F as FileText, i as Check, m as LoaderCircle } from "../_libs/lucide-react.mjs";
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
import "./server-BxlZVXOU.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-BqwiLAOE.mjs";
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
import "./use-automation-DR0lOfg-.mjs";
import "../_libs/tanstack__react-virtual.mjs";
import "../_libs/tanstack__virtual-core.mjs";
function LegIndicator({
  label,
  status
}) {
  const done = status === "success";
  const failed = status === "error";
  const cancelled = status === "cancelled";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("inline-flex items-center gap-1.5 h-6 px-2 rounded-full border text-[11px] font-medium", done ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : failed ? "border-destructive/40 bg-destructive/10 text-destructive" : cancelled ? "border-border bg-muted/50 text-muted-foreground" : "border-warning/40 bg-warning/10 text-warning"), children: [
    done ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) : failed || cancelled ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }),
    label
  ] });
}
const SORT_OPTIONS = [{
  value: "atualizado",
  label: "Atualizado"
}, {
  value: "status",
  label: "Status de pagamento"
}, {
  value: "vencimento",
  label: "Vencimento"
}, {
  value: "apolice",
  label: "Nº da apólice"
}, {
  value: "premio",
  label: "Prêmio total"
}];
const TAG_ORDER = {
  CANCELADA: 0,
  ABERTA: 1,
  PARCIAL: 2,
  PAGO: 3
};
function ApolicesPage() {
  const [q, setQ] = reactExports.useState("");
  const [tags, setTags] = reactExports.useState([]);
  const [situacao, setSituacao] = reactExports.useState("todas");
  const [sort, setSort] = reactExports.useState("atualizado");
  const {
    data: policies,
    isLoading
  } = usePolicies();
  const {
    data: lastSync
  } = useLatestPolicySync();
  const {
    mutate: runSync,
    isRunning,
    isCheckingSync,
    emissoes,
    cobrancas,
    cancel: cancelSync,
    isCancelling
  } = useRunPolicySync();
  const {
    map: billingTags,
    infoMap: billingInfo
  } = useBillingTagMap();
  const filtered = reactExports.useMemo(() => {
    if (!policies) return [];
    const s = q.toLowerCase();
    const list = policies.filter((p) => {
      if (s && !p.numero_apolice.toLowerCase().includes(s) && !(p.segurado_nome ?? "").toLowerCase().includes(s)) return false;
      const info = billingInfo.get(p.numero_apolice);
      if (tags.length > 0 && (!info || !tags.includes(info.tag))) return false;
      if (situacao !== "todas" && !matchSituacao(info?.situacaoEmissao, situacao)) return false;
      return true;
    });
    const sorted = [...list];
    sorted.sort((a, b) => {
      const ia = billingInfo.get(a.numero_apolice);
      const ib = billingInfo.get(b.numero_apolice);
      switch (sort) {
        case "status":
          return (ia ? TAG_ORDER[ia.tag] : 99) - (ib ? TAG_ORDER[ib.tag] : 99) || a.numero_apolice.localeCompare(b.numero_apolice);
        case "vencimento":
          return (ia?.dataVencimento ?? "9999").localeCompare(ib?.dataVencimento ?? "9999");
        case "apolice":
          return a.numero_apolice.localeCompare(b.numero_apolice);
        case "premio":
          return (b.premio_liquido ?? 0) - (a.premio_liquido ?? 0);
        default:
          return (b.updated_at ?? "").localeCompare(a.updated_at ?? "");
      }
    });
    return sorted;
  }, [policies, q, tags, situacao, sort, billingInfo]);
  const synced = !!lastSync?.finished_at;
  const syncLocked = isRunning || isCheckingSync;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-end md:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Apólices" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 flex items-center gap-2 text-[12.5px] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-block h-1.5 w-1.5 rounded-full", isRunning ? "bg-warning animate-pulse" : synced ? "bg-emerald-500" : "bg-muted-foreground/50") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: policies?.length ?? 0 }),
            " apólices na carteira"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isRunning || lastSync?.status === "running" ? "sincronização em andamento" : lastSync?.finished_at ? `última sincronização ${relativeTime(lastSync.finished_at)}` : "ainda não sincronizada" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start sm:items-end gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NextRunCountdown, { job: "policy_sync" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => runSync(), disabled: syncLocked, className: "inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-primary text-primary-foreground text-[12.5px] font-semibold shadow-lg shadow-primary/10 hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: cn("h-3.5 w-3.5", isRunning && "animate-spin") }),
            isCheckingSync ? "Verificando…" : isRunning ? "Sincronizando…" : "Sincronizar carteira"
          ] }),
          isRunning && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => cancelSync(), disabled: isCancelling, className: "inline-flex items-center gap-2 h-10 px-3 rounded-lg border border-border bg-card text-[12.5px] font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors disabled:opacity-60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
            "Cancelar"
          ] })
        ] }),
        (isRunning || emissoes || cobrancas) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LegIndicator, { label: "Emissões", status: emissoes }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LegIndicator, { label: "Cobranças", status: cobrancas })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/70 group-focus-within:text-primary transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), type: "text", placeholder: "Buscar por número da apólice ou segurado…", className: "w-full bg-surface/60 border border-border focus:border-primary/40 focus:ring-4 focus:ring-primary/10 rounded-xl py-3.5 pl-11 pr-4 text-[13px] text-foreground placeholder:text-muted-foreground/60 outline-none transition-all" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 right-4 hidden sm:flex items-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("kbd", { className: "inline-flex h-6 items-center gap-1 rounded border border-border bg-surface-2 px-1.5 font-mono text-[10px] font-medium text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "⌘" }),
        "K"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BillingFilters, { tags, onToggleTag: (t) => setTags((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]), onClearTags: () => setTags([]), situacao, onSituacao: setSituacao, sort, onSort: setSort, sortOptions: SORT_OPTIONS }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11.5px] text-muted-foreground", children: [
        filtered.length,
        " de ",
        policies?.length ?? 0
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:grid grid-cols-[1fr_140px_120px_200px_140px] text-[10.5px] font-semibold text-muted-foreground/80 uppercase tracking-[0.14em] pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-5", children: "Apólice" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: "Endosso atual" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: "Endossos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right pr-10", children: "Prêmio total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right pr-5", children: "Atualizado" })
      ] }),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-16 text-center text-[13px] text-muted-foreground bg-surface/40 border border-border/60 rounded-xl", children: "Carregando carteira…" }),
      !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-16 text-center bg-surface/40 border border-border/60 rounded-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-8 w-8 mx-auto text-muted-foreground/40 mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] text-foreground font-medium", children: policies && policies.length === 0 ? "Nenhuma apólice sincronizada ainda." : "Nenhuma apólice corresponde à busca." }),
        policies && policies.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11.5px] text-muted-foreground mt-1", children: 'Clique em "Sincronizar carteira" para puxar do MOTOR OLÉ.' })
      ] }),
      !isLoading && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(VirtualList, { items: filtered, getKey: (p) => p.id, estimateSize: 76, gap: 8, className: "max-h-[70dvh] rounded-xl", children: (p) => /* @__PURE__ */ jsxRuntimeExports.jsx(PolicyRow, { p, billingTag: billingTags.get(p.numero_apolice) }) })
    ] })
  ] });
}
const PolicyRow = reactExports.memo(function PolicyRow2({
  p,
  billingTag
}) {
  const formatted = fmtNum(p.premio_liquido, p.premio_moeda);
  const match = formatted.match(/^([^\d-]+)\s*(.+)$/);
  const currency = match?.[1]?.trim() ?? p.premio_moeda ?? "";
  const amount = match?.[2] ?? formatted;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "group text-[13px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/apolices/$id", params: {
    id: p.numero_apolice
  }, className: "grid grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[1fr_140px_120px_200px_140px] items-center bg-surface/50 hover:bg-surface-2/60 border border-border/60 hover:border-primary/30 rounded-xl transition-all shadow-sm relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-3 md:py-3.5 pl-4 md:pl-5 pr-3 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[12.5px] font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors truncate", children: p.numero_apolice }),
        billingTag && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-flex items-center rounded-md border px-1.5 py-0.5 font-mono text-[10px] font-semibold whitespace-nowrap", billingTagClass(billingTag)), children: billingTag })
      ] }),
      p.segurado_nome && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground truncate mt-0.5", children: p.segurado_nome }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden mt-1 flex items-center gap-1.5 text-[10.5px] text-muted-foreground font-mono", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "End. ",
          p.numero_endosso_atual ?? "—"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "•" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          p.endorsements_count,
          " endossos"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "•" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: relativeTime(p.updated_at) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block text-center py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center min-w-[2rem] px-2 py-0.5 rounded bg-surface-2 text-muted-foreground border border-border/60 font-mono text-[11px] font-medium", children: p.numero_endosso_atual ?? "—" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block text-center py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[12px] text-foreground/80 font-medium tabular-nums", children: p.endorsements_count }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right py-3 md:py-3.5 pr-4 md:pr-10 font-mono tabular-nums whitespace-nowrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary/70 text-[10px] mr-1 font-semibold", children: currency }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold text-[12.5px]", children: amount })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block text-right py-3.5 pr-5 text-[11px] text-muted-foreground italic", title: formatDateTime(p.updated_at), children: relativeTime(p.updated_at) })
  ] }) });
});
export {
  ApolicesPage as component
};
