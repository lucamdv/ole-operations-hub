import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useLatestAudit, a as useAuditHistory, b as useRunAudit, d as deriveKpis, c as countBySeverity, g as groupByApolice, s as severityOf, n as normalizeFinding } from "./derive-CZZSw3Ap.mjs";
import { r as relativeTime, f as formatDateTime, c as cn, d as formatInt, h as formatPct, e as formatDate } from "./router-C--tI9WT.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button } from "./button-DxLsNwLg.mjs";
import { D as Dialog, f as DialogTrigger, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Cw2eQtk0.mjs";
import { I as Input } from "./input-7ljYa1o2.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BPFiSsdh.mjs";
import { T as Table$1, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-OIaO8IaO.mjs";
import { u as useAuditIgnores, a as useAddAuditIgnore } from "./use-audit-ignores-BqmweSgK.mjs";
import { I as IgnoreReasonDialog } from "./ignore-reason-dialog-C5zpw73G.mjs";
import { u as useResolveFinding } from "./use-audit-resolutions-Db3hMTgq.mjs";
import { N as NextRunCountdown } from "./next-run-countdown-Bbef3m6j.mjs";
import { P as PageHeader } from "./page-header-CC7P6yQI.mjs";
import { S as Skeleton } from "./skeleton-DrKMsIWf.mjs";
import { u as useProfile } from "./use-settings-CkvJQFhU.mjs";
import "../_libs/seroval.mjs";
import { m as LoaderCircle, P as Play, n as Sparkles, o as ShieldQuestionMark, c as ShieldCheck, p as ShieldAlert, q as List, r as CircleCheck, s as Clock3, T as TriangleAlert, t as ArrowRight, u as FileDown, d as Search, v as LayoutList, w as Table, x as Copy, E as EyeOff, a as ChevronRight, C as ChevronDown, y as CircleX } from "../_libs/lucide-react.mjs";
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
import "../_libs/class-variance-authority.mjs";
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
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "./use-automation-DR0lOfg-.mjs";
import "./use-current-role-E51G92Oa.mjs";
function RunAuditButton({ compact = false }) {
  const mutation = useRunAudit();
  const { data: latest } = useLatestAudit();
  const [elapsed, setElapsed] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!mutation.isRunning) {
      setElapsed(0);
      return;
    }
    const start = Date.now();
    const i = setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1e3)), 250);
    return () => clearInterval(i);
  }, [mutation.isRunning]);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        if (!mutation.isRunning) mutation.mutate();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mutation]);
  const lastAt = latest?.run?.created_at ? new Date(latest.run.created_at).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  }) : null;
  if (compact) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => mutation.mutate(),
        disabled: mutation.isRunning,
        className: cn(
          "h-9 px-3 rounded-lg bg-primary text-primary-foreground text-[12.5px] font-medium hover:opacity-95 transition shadow-glow flex items-center gap-2 disabled:opacity-70"
        ),
        title: lastAt ? `Última auditoria: ${lastAt}` : "Disparar nova auditoria",
        children: mutation.isRunning ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono tabular-nums", children: [
            elapsed,
            "s"
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3.5 w-3.5 fill-current" }),
          "Rodar Auditoria"
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => mutation.mutate(),
        disabled: mutation.isRunning,
        className: cn(
          "relative group h-10 pl-4 pr-5 rounded-xl bg-primary text-primary-foreground text-[13px] font-semibold transition shadow-glow flex items-center gap-2.5 overflow-hidden disabled:cursor-wait",
          !mutation.isRunning && "hover:bg-primary/90 hover:shadow-[0_0_40px_-8px_var(--primary)]"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" }),
          mutation.isRunning ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Auditando carteira" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono tabular-nums text-primary-foreground/80 ml-1", children: [
              elapsed,
              "s"
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Rodar Auditoria" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "ml-1 hidden md:inline-flex items-center gap-0.5 text-[9.5px] font-mono bg-white/15 px-1.5 py-0.5 rounded", children: "⌘⇧A" })
          ] })
        ]
      }
    ),
    lastAt && !mutation.isRunning && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground", children: [
      "Última run · ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground/80", children: lastAt })
    ] })
  ] });
}
function AuditEmptyState({ title, description }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-surface/60 backdrop-blur p-12 text-center relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-glow opacity-40 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-md mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 mx-auto rounded-2xl bg-primary/10 border border-primary/30 grid place-items-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldQuestionMark, { className: "h-7 w-7 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[18px] font-semibold tracking-tight", children: title ?? "Nenhuma auditoria executada ainda" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-muted-foreground mt-2 mb-6", children: description ?? "Dispare a primeira auditoria para que o motor processe a carteira e o Centro de Comando passe a operar com dados reais." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RunAuditButton, {}) })
    ] })
  ] });
}
function FindingsListDialog({
  latest,
  trigger
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [q, setQ] = reactExports.useState("");
  const { data: history = [] } = useAuditHistory();
  const { data: ignores = [] } = useAuditIgnores();
  const addIgnore = useAddAuditIgnore();
  const resolve = useResolveFinding();
  const [tipo, setTipo] = reactExports.useState("__all__");
  const [sev, setSev] = reactExports.useState("__all__");
  const [view, setView] = reactExports.useState("agrupado");
  const [collapsed, setCollapsed] = reactExports.useState({});
  const [pendingIgnore, setPendingIgnore] = reactExports.useState(null);
  const handleIgnore = (apolice, tipo_erro) => {
    setPendingIgnore({ apolice, tipo_erro: tipo_erro ?? null });
  };
  const handleResolve = (f) => {
    resolve.mutate({
      apolice: f.apolice,
      tipo_erro: f.tipo_erro,
      endosso: f.endosso,
      run_id: latest.run.id
    });
  };
  const tipos = reactExports.useMemo(
    () => Array.from(new Set(latest.findings.map((f) => f.tipo_erro))).sort(),
    [latest.findings]
  );
  const filtered = reactExports.useMemo(() => {
    const term = q.trim().toLowerCase();
    return latest.findings.filter((f) => {
      if (tipo !== "__all__" && f.tipo_erro !== tipo) return false;
      if (sev !== "__all__" && severityOf(f) !== sev) return false;
      if (term) {
        const n = normalizeFinding(f);
        const hay = `${f.apolice} ${f.tipo_erro} ${n.motivo} ${n.detalhe} ${n.endosso ?? ""}`.toLowerCase();
        if (!hay.includes(term)) return false;
      }
      return true;
    });
  }, [latest.findings, q, tipo, sev]);
  const grouped = reactExports.useMemo(() => groupByApolice(filtered), [filtered]);
  const totals = countBySeverity(latest.findings);
  const copy = async (txt, msg = "Copiado") => {
    try {
      await navigator.clipboard.writeText(txt);
      toast.success(msg);
    } catch {
      toast.error("Falha ao copiar");
    }
  };
  const copyAll = () => {
    const lines = [];
    lines.push(`Relatório Consolidado de Auditoria — ${formatDateTime(latest.run.data_auditoria ?? latest.run.created_at)}`);
    lines.push(
      `✅ ${latest.run.aprovados} OK | ⚠️ ${latest.run.reprovados} Intervenções Necessárias`
    );
    for (const g of grouped) {
      lines.push("");
      lines.push(`🔍 Apólice: ${g.apolice}`);
      for (const f of g.findings) {
        const icon = severityOf(f) === "erro" ? "🔴" : "⚠️";
        const nrm = normalizeFinding(f);
        const detalhe = nrm.motivo || nrm.detalhe || "";
        lines.push(`  ${icon} ${f.tipo_erro}${nrm.endosso ? ` (end. ${nrm.endosso})` : ""} — ${detalhe}`);
      }
    }
    copy(lines.join("\n"), "Relatório copiado");
  };
  const toggleAll = (collapse) => {
    setCollapsed(Object.fromEntries(grouped.map((g) => [g.apolice, collapse])));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-6xl w-[95vw] max-h-[92vh] flex flex-col p-0 gap-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "px-6 py-4 border-b border-border bg-linear-to-r from-surface-2 to-surface", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-[15px] flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📊" }),
          " Relatório Consolidado de Auditoria"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-2 text-[12px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            "Data: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: formatDateTime(latest.run.data_auditoria ?? latest.run.created_at) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/40", children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Chip, { tone: "success", children: [
            "✅ ",
            formatInt(latest.run.aprovados),
            " OK"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Chip, { tone: "warning", children: [
            "⚠️ ",
            formatInt(latest.run.reprovados),
            " Intervenções"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Chip, { tone: "destructive", children: [
            "🔴 ",
            formatInt(totals.erros),
            " erros"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Chip, { tone: "warning", children: [
            "⚠️ ",
            formatInt(totals.alertas),
            " alertas"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Chip, { tone: "info", children: [
            "🔍 ",
            formatInt(grouped.length),
            " apólices"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Chip, { tone: "default", children: [
            "📋 ",
            formatInt(filtered.length),
            " achados"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-3 border-b border-border flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[220px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: q,
              onChange: (e) => setQ(e.target.value),
              placeholder: "Buscar por nº de apólice ou texto do motivo…",
              className: "pl-8 h-9 text-[12.5px]"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sev, onValueChange: (v) => setSev(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-9 w-[140px] text-[12.5px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__all__", children: "Todas severidades" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "erro", children: "🔴 Erros" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "alerta", children: "⚠️ Alertas" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "info", children: "ℹ️ Info" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: tipo, onValueChange: setTipo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-9 w-[240px] text-[12.5px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Todos os tipos" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__all__", children: "Todos os tipos" }),
            tipos.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: t }, t))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center rounded-md border border-border overflow-hidden h-9 ml-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setView("agrupado"),
              className: cn(
                "px-2.5 h-full text-[11.5px] font-medium flex items-center gap-1.5 transition",
                view === "agrupado" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/40"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutList, { className: "h-3.5 w-3.5" }),
                " Agrupado"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setView("tabela"),
              className: cn(
                "px-2.5 h-full text-[11.5px] font-medium flex items-center gap-1.5 transition border-l border-border",
                view === "tabela" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/40"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Table, { className: "h-3.5 w-3.5" }),
                " Tabela"
              ]
            }
          )
        ] }),
        view === "agrupado" && grouped.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "h-9 text-[11.5px]", onClick: () => toggleAll(false), children: "Expandir" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "h-9 text-[11.5px]", onClick: () => toggleAll(true), children: "Recolher" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "gap-1.5", onClick: copyAll, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" }),
          " Copiar tudo"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: async () => {
          const { exportAuditPdf } = await import("./export-pdf-7L1sjaNi.mjs");
          exportAuditPdf(latest, history);
        }, className: "gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "h-4 w-4" }),
          " Exportar PDF"
        ] })
      ] }),
      ignores.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-2 border-b border-border bg-muted/30 text-[11.5px] text-muted-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-3.5 w-3.5" }),
        ignores.length,
        " ",
        ignores.length === 1 ? "exceção aplicada" : "exceções aplicadas",
        " ·",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/configuracoes", className: "text-primary hover:underline", children: "gerenciar em Configurações" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-auto bg-background/40", children: view === "agrupado" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        GroupedView,
        {
          groups: grouped,
          collapsed,
          onToggle: (k) => setCollapsed((s) => ({ ...s, [k]: !s[k] })),
          onCopy: copy,
          onIgnore: handleIgnore,
          onResolve: handleResolve
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        TableView,
        {
          findings: filtered,
          onCopy: copy,
          onIgnore: handleIgnore,
          onResolve: handleResolve
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        IgnoreReasonDialog,
        {
          open: !!pendingIgnore,
          onOpenChange: (v) => !v && setPendingIgnore(null),
          targetLabel: pendingIgnore ? pendingIgnore.tipo_erro ? `${pendingIgnore.tipo_erro} · apólice ${pendingIgnore.apolice}` : `Todos os erros da apólice ${pendingIgnore.apolice}` : void 0,
          description: "Esta exceção oculta o achado nas próximas auditorias. O motivo é obrigatório.",
          pending: addIgnore.isPending,
          onConfirm: ({ motivo, reason_tag_id }) => {
            if (!pendingIgnore) return;
            addIgnore.mutate(
              {
                apolice: pendingIgnore.apolice,
                tipo_erro: pendingIgnore.tipo_erro,
                motivo,
                reason_tag_id
              },
              { onSuccess: () => setPendingIgnore(null) }
            );
          }
        }
      )
    ] })
  ] });
}
function Chip({
  children,
  tone
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono border",
        tone === "success" && "bg-success/10 text-success border-success/30",
        tone === "warning" && "bg-warning/10 text-warning border-warning/30",
        tone === "destructive" && "bg-destructive/10 text-destructive border-destructive/30",
        tone === "info" && "bg-info/10 text-info border-info/30",
        tone === "default" && "bg-muted/40 text-muted-foreground border-border"
      ),
      children
    }
  );
}
function GroupedView({
  groups,
  collapsed,
  onToggle,
  onCopy,
  onIgnore,
  onResolve
}) {
  if (groups.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-16 text-[12.5px] text-success", children: "✅ Nenhum achado para o filtro atual." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: groups.map((g) => {
    const sev = countBySeverity(g.findings);
    const isCollapsed = collapsed[g.apolice];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-surface/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-5 py-3 flex items-start gap-3 sticky top-0 z-10 bg-surface/95 backdrop-blur border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onToggle(g.apolice),
            className: "mt-0.5 text-muted-foreground hover:text-foreground transition",
            children: isCollapsed ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: "🔍 Apólice" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[13px] text-foreground break-all", children: g.apolice }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onCopy(g.apolice, "Apólice copiada"),
                className: "opacity-60 hover:opacity-100",
                title: "Copiar número",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1.5 text-[11px]", children: [
            sev.erros > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Chip, { tone: "destructive", children: [
              "🔴 ",
              sev.erros,
              " erros"
            ] }),
            sev.alertas > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Chip, { tone: "warning", children: [
              "⚠️ ",
              sev.alertas,
              " alertas"
            ] }),
            sev.infos > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Chip, { tone: "info", children: [
              "ℹ️ ",
              sev.infos,
              " info"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/apolices/$id",
                params: { id: g.apolice },
                className: "ml-1 text-[11px] text-primary hover:underline",
                children: "Abrir detalhes →"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "ghost",
            className: "h-7 px-2 text-[11px] gap-1 text-muted-foreground hover:text-foreground",
            onClick: () => onIgnore(g.apolice),
            title: "Ignorar apólice em futuras auditorias",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-3.5 w-3.5" }),
              " Ignorar apólice"
            ]
          }
        )
      ] }),
      !isCollapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "px-5 py-3 space-y-2.5", children: g.findings.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(FindingBullet, { f, onIgnore, onResolve }, f.id)) })
    ] }, g.apolice);
  }) });
}
function FindingBullet({
  f,
  onIgnore,
  onResolve
}) {
  const sev = severityOf(f);
  const Icon = sev === "erro" ? CircleX : TriangleAlert;
  const n = normalizeFinding(f);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2.5 text-[12.5px] leading-relaxed", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Icon,
      {
        className: cn(
          "h-4 w-4 shrink-0 mt-0.5",
          sev === "erro" && "text-destructive",
          sev === "alerta" && "text-warning",
          sev === "info" && "text-info"
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "font-mono text-[10.5px] uppercase tracking-wider px-1.5 py-0.5 rounded",
              sev === "erro" && "bg-destructive/10 text-destructive",
              sev === "alerta" && "bg-warning/10 text-warning",
              sev === "info" && "bg-info/10 text-info"
            ),
            children: sev === "erro" ? "ERRO" : sev === "alerta" ? "ALERTA" : "INFO"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: f.tipo_erro }),
        n.endosso && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center font-mono text-[10.5px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20", children: [
          "Endosso ",
          n.endosso
        ] }),
        n.endossoAnterior && n.endossoAnterior !== "N/A" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-muted text-muted-foreground border", children: [
          "Anterior ",
          n.endossoAnterior
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onIgnore(f.apolice, f.tipo_erro),
            className: "ml-auto inline-flex items-center gap-1 text-[10.5px] text-muted-foreground hover:text-foreground opacity-70 hover:opacity-100 transition",
            title: "Ignorar este erro em futuras auditorias",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-3 w-3" }),
              " Ignorar"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onResolve(f),
            className: "inline-flex items-center gap-1 text-[10.5px] text-success/80 hover:text-success opacity-80 hover:opacity-100 transition",
            title: "Marcar como resolvido (alimenta os KPIs de resolução)",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
              " Resolvido"
            ]
          }
        )
      ] }),
      n.motivo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-[12.5px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10.5px] uppercase tracking-wider text-muted-foreground/70 mr-1.5", children: "Motivo:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/90", children: n.motivo })
      ] }),
      n.detalhe && n.detalhe !== n.motivo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 text-[12px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10.5px] uppercase tracking-wider text-muted-foreground/70 mr-1.5", children: "Detalhe:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: n.detalhe })
      ] }),
      !n.motivo && !n.detalhe && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[12px] text-muted-foreground italic", children: "Sem mensagem adicional." }),
      (f.data_inicio || f.data_fim) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-[11px] font-mono text-muted-foreground/80 flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase tracking-wider text-muted-foreground/60", children: "Vigência:" }),
        f.data_inicio && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(f.data_inicio) }),
        f.data_inicio && f.data_fim && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "→" }),
        f.data_fim && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(f.data_fim) })
      ] })
    ] })
  ] });
}
function TableView({
  findings,
  onCopy,
  onIgnore,
  onResolve
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Table$1, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { className: "sticky top-0 bg-surface z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-[11px]", children: "Sev" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-[11px]", children: "Apólice" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-[11px]", children: "Tipo de erro" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-[11px]", children: "Endosso" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-[11px]", children: "Início" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-[11px]", children: "Fim" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-[11px]", children: "Detalhe" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-[11px] w-[110px]" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
      findings.map((f) => {
        const sev = severityOf(f);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "align-top", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "font-mono text-[10px] uppercase px-1.5 py-0.5 rounded",
                sev === "erro" && "bg-destructive/10 text-destructive",
                sev === "alerta" && "bg-warning/10 text-warning",
                sev === "info" && "bg-info/10 text-info"
              ),
              children: sev
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-[11.5px] align-top", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "break-all", children: f.apolice }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onCopy(f.apolice, "Apólice copiada"),
                className: "opacity-50 hover:opacity-100 shrink-0",
                title: "Copiar",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3" })
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-[12px] align-top", children: f.tipo_erro }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-[12px] font-mono align-top", children: normalizeFinding(f).endosso ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-[12px] font-mono align-top", children: f.data_inicio ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-[12px] font-mono align-top", children: f.data_fim ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-[12px] align-top max-w-[420px]", children: (() => {
            const n = normalizeFinding(f);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              n.motivo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-foreground/90", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/70 mr-1", children: "Motivo:" }),
                n.motivo
              ] }),
              n.detalhe && n.detalhe !== n.motivo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground mt-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground/70 mr-1", children: "Detalhe:" }),
                n.detalhe
              ] }),
              !n.motivo && !n.detalhe && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" })
            ] });
          })() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "align-top", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onIgnore(f.apolice, f.tipo_erro),
                className: "inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground",
                title: "Ignorar este erro",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-3.5 w-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onResolve(f),
                className: "inline-flex items-center gap-1 text-[11px] text-success/80 hover:text-success",
                title: "Marcar como resolvido",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" })
              }
            )
          ] }) })
        ] }, f.id);
      }),
      findings.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 8, className: "text-center py-8 text-[12px] text-muted-foreground", children: "Nenhum achado para o filtro atual." }) })
    ] })
  ] });
}
function VisaoGeral() {
  const {
    data: latest,
    isLoading
  } = useLatestAudit();
  const {
    data: history = []
  } = useAuditHistory();
  const {
    profile
  } = useProfile();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-72" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-[min(100%,30rem)]" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.75fr)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-80 rounded-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-80 rounded-2xl" })
      ] })
    ] });
  }
  const firstName = (profile.nome || "").trim().split(/\s+/)[0] || "Operador";
  const hour = (/* @__PURE__ */ new Date()).getHours();
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 sm:space-y-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { eyebrow: `${greeting}, ${firstName}`, title: "Visão geral", description: latest?.run.created_at ? `Última auditoria ${relativeTime(latest.run.created_at)} · ${formatDateTime(latest.run.created_at)}` : "Execute uma auditoria para obter o primeiro diagnóstico da carteira.", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start gap-1.5 sm:items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(NextRunCountdown, { job: "audit" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RunAuditButton, { compact: true })
    ] }) }),
    !latest ? /* @__PURE__ */ jsxRuntimeExports.jsx(AuditEmptyState, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(AuditOverview, { latest, history })
  ] });
}
function AuditOverview({
  latest,
  history
}) {
  const kpis = deriveKpis({
    latest,
    history
  });
  if (!kpis) return null;
  const severity = countBySeverity(latest.findings);
  const priorityPolicies = groupByApolice(latest.findings).slice(0, 5);
  const needsAttention = kpis.rejected > 0 || severity.erros > 0;
  const hasWarnings = !needsAttention && latest.findings.length > 0;
  const tone = needsAttention ? "danger" : hasWarnings ? "warning" : "success";
  const title = needsAttention ? "A auditoria encontrou pontos que exigem atenção." : hasWarnings ? "A carteira está estável, com ressalvas para revisar." : "A auditoria não encontrou desvios.";
  const description = needsAttention ? `${formatInt(kpis.affectedPolicies)} apólice${kpis.affectedPolicies === 1 ? " precisa" : "s precisam"} de revisão antes do próximo ciclo.` : hasWarnings ? "Não há falhas críticas, mas existem ocorrências informativas pendentes." : `${formatInt(kpis.audited)} apólices foram verificadas e estão em conformidade.`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: cn("relative overflow-hidden rounded-2xl border bg-surface px-5 py-6 shadow-soft sm:px-8 sm:py-8", tone === "danger" && "border-destructive/25", tone === "warning" && "border-warning/25", tone === "success" && "border-success/25"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl", tone === "danger" && "bg-destructive/8", tone === "warning" && "bg-warning/8", tone === "success" && "bg-success/8") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-start gap-4 sm:gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid h-11 w-11 shrink-0 place-items-center rounded-xl border sm:h-12 sm:w-12", tone === "danger" && "border-destructive/25 bg-destructive/10 text-destructive", tone === "warning" && "border-warning/25 bg-warning/10 text-warning", tone === "success" && "border-success/25 bg-success/10 text-success"), children: tone === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5 sm:h-6 sm:w-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-5 w-5 sm:h-6 sm:w-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("mb-2 text-[10.5px] font-semibold uppercase tracking-[0.16em]", tone === "danger" && "text-destructive", tone === "warning" && "text-warning", tone === "success" && "text-success"), children: "Resultado da última auditoria" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "max-w-3xl text-xl font-semibold leading-tight tracking-[-0.025em] sm:text-2xl", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-[13px] leading-relaxed text-muted-foreground sm:text-sm", children: description })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "metric-label", children: "Conformidade" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex items-baseline gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-4xl font-semibold tracking-[-0.05em] tabular-nums", tone === "success" ? "text-success" : "text-foreground"), children: formatPct(kpis.approvedRate) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-[11px] text-muted-foreground", children: [
            formatInt(kpis.approved),
            " de ",
            formatInt(kpis.audited),
            " aprovadas"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-7 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Signal, { label: "Críticas", value: severity.erros, detail: severity.erros === 1 ? "ocorrência" : "ocorrências", tone: severity.erros > 0 ? "danger" : "muted" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Signal, { label: "Apólices afetadas", value: kpis.affectedPolicies, detail: `de ${formatInt(kpis.audited)} auditadas`, tone: kpis.affectedPolicies > 0 ? "warning" : "muted" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Signal, { label: "Tipos de inconsistência", value: kpis.uniqueErrorTypes, detail: kpis.topErrorType ? `Mais frequente: ${kpis.topErrorType}` : "Nenhum desvio encontrado", tone: "muted" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.75fr)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "panel overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: "Prioridades da auditoria" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "caption mt-1", children: "Apólices com maior volume de ocorrências na execução atual." })
          ] }),
          latest.findings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(FindingsListDialog, { latest, trigger: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "gap-1.5 text-[12px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-3.5 w-3.5" }),
            " Ver todos"
          ] }) })
        ] }),
        priorityPolicies.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-56 flex-col items-center justify-center px-6 py-12 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mb-3 h-7 w-7 text-success" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: "Nada para tratar agora" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-sm text-[12px] leading-relaxed text-muted-foreground", children: "A execução mais recente terminou sem achados pendentes." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/70", children: priorityPolicies.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsx(PriorityRow, { group }, group.apolice)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "panel h-fit overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b border-border px-5 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: "Leitura rápida" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "caption mt-1", children: "Contexto suficiente para decidir o próximo passo." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AuditDetail, { icon: Clock3, label: "Executada", value: formatDateTime(latest.run.created_at) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AuditDetail, { icon: CircleCheck, label: "Aprovadas", value: `${formatInt(latest.run.aprovados)} apólices`, tone: "success" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AuditDetail, { icon: TriangleAlert, label: "Com inconsistências", value: `${formatInt(latest.run.reprovados)} apólices`, tone: latest.run.reprovados > 0 ? "danger" : "muted" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "metric-label mb-3", children: "Próximo passo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              latest.findings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/alertas", className: "flex items-center justify-between rounded-lg border border-border px-3 py-2.5 text-[12.5px] font-medium transition hover:border-primary/30 hover:bg-surface-2", children: [
                "Tratar ocorrências ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 text-muted-foreground" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/operacao", className: "flex items-center justify-between rounded-lg border border-border px-3 py-2.5 text-[12.5px] font-medium transition hover:border-primary/30 hover:bg-surface-2", children: [
                "Acompanhar operação ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 text-muted-foreground" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "inline-flex items-center gap-1.5 text-[11.5px] text-muted-foreground transition hover:text-foreground", onClick: async () => {
            const {
              exportAuditPdf
            } = await import("./export-pdf-7L1sjaNi.mjs");
            exportAuditPdf(latest, history);
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "h-3.5 w-3.5" }),
            " Exportar relatório em PDF"
          ] })
        ] })
      ] })
    ] })
  ] });
}
function Signal({
  label,
  value,
  detail,
  tone
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 bg-surface-2/70 px-4 py-4 sm:px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "metric-label", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex items-baseline gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-xl font-semibold tabular-nums", tone === "danger" && "text-destructive", tone === "warning" && "text-warning"), children: formatInt(value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-[10.5px] text-muted-foreground", children: detail })
    ] })
  ] });
}
function PriorityRow({
  group
}) {
  const severity = countBySeverity(group.findings);
  const lead = group.findings[0];
  const leadNormalized = lead ? normalizeFinding(lead) : null;
  const leadDetail = leadNormalized?.motivo || leadNormalized?.detalhe || "";
  const types = Array.from(new Set(group.findings.map((finding) => finding.tipo_erro)));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/apolices/$id", params: {
    id: group.apolice
  }, className: "group flex items-start gap-3 px-5 py-4 transition hover:bg-surface-2/60 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", severity.erros > 0 ? "bg-destructive" : severity.alertas > 0 ? "bg-warning" : "bg-info") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[12px] font-semibold text-foreground", children: shortPolicy(group.apolice) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10.5px] text-muted-foreground", children: [
          formatInt(group.total),
          " ",
          group.total === 1 ? "ocorrência" : "ocorrências"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 truncate text-[12px] font-medium text-foreground/90", children: [
        types.slice(0, 2).join(" · "),
        types.length > 2 ? ` +${types.length - 2}` : ""
      ] }),
      leadDetail && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-1 text-[11px] text-muted-foreground", children: leadDetail })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "mt-1 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" })
  ] });
}
function AuditDetail({
  icon: Icon,
  label,
  value,
  tone = "muted"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-muted/70 text-muted-foreground", tone === "success" && "bg-success/10 text-success", tone === "danger" && "bg-destructive/10 text-destructive"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-[12.5px] font-medium", children: value })
    ] })
  ] });
}
function shortPolicy(policy) {
  return policy.length > 18 ? `…${policy.slice(-16)}` : policy;
}
export {
  VisaoGeral as component
};
