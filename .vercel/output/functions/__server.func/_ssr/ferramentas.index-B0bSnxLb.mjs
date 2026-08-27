import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { n as Sparkles, K as Layers, t as ArrowRight, ai as Hammer, W as Wrench } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
function FerramentasPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono uppercase tracking-[0.2em] text-primary", children: "OLÉ COPILOT" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-muted-foreground/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: "Ferramentas" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Ferramentas Operacionais" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-muted-foreground mt-1 max-w-2xl", children: "Um conjunto de ferramentas de produtividade, automação e análise — desenhadas para acelerar a operação OLÉ." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/ferramentas/extrator-endossos", className: "group relative overflow-hidden panel p-5 hover:border-primary/40 transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-primary/30 bg-primary/10 text-primary text-[11px] font-mono uppercase tracking-wider mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
            "Disponível"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-[18px] font-semibold tracking-tight mb-1.5 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-5 w-5 text-primary" }),
            "Extrator de Últimos Endossos"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-muted-foreground leading-relaxed", children: "Dispara o fluxo do MOTOR OLÉ e devolve o último endosso emitido de cada apólice, com exceções próprias e exportação em CSV ou PDF." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 inline-flex items-center gap-1.5 text-[12px] text-primary font-medium", children: [
            "Abrir ferramenta",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 group-hover:translate-x-0.5 transition" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden panel p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-border bg-muted/40 text-muted-foreground text-[11px] font-mono uppercase tracking-wider mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Hammer, { className: "h-3 w-3" }),
          "Em construção"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-[18px] font-semibold tracking-tight mb-1.5 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-5 w-5 text-muted-foreground" }),
          "Mais ferramentas a caminho"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-muted-foreground leading-relaxed", children: "Importadores em lote, validadores OLÉ e simuladores de prêmio/cobertura estão sendo preparados para esta área." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-3 gap-2", children: [{
          label: "Importadores"
        }, {
          label: "Validadores"
        }, {
          label: "Simuladores"
        }].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border/60 bg-surface/60 p-2 text-center text-[11px] text-muted-foreground", children: t.label }, t.label)) })
      ] }) })
    ] })
  ] });
}
export {
  FerramentasPage as component
};
