import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Route, K as useEndorsementDetail, L as useEndorsementBilling, M as DocumentoHeader, N as BillingBadge, S as Section, O as CobrancaCard, P as MotivoEndossoCard, Q as DadosGeraisCard, T as CancelamentoCard, U as DatasCard, V as EndossoSemDadosAviso, W as LimiteApoliceCard, X as CotacaoCard, Y as PartesList, Z as ItensCoberturas, _ as PagamentoCard, $ as JsonExplorer } from "./router-C--tI9WT.mjs";
import { t as translateProposta, n as normalizeEndossoNum, p as parseDocumento } from "./translate-CoDrOLOt.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { A as ArrowLeft } from "../_libs/lucide-react.mjs";
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
import "./policy-sync-runner.server-qrVcf3rg.mjs";
import "./client.server-BIG6Ien0.mjs";
import "./motor-client.server--eqOBXIb.mjs";
import "./audit-run.server-DDaKmDPQ.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/zod.mjs";
function EndossoDetail() {
  const {
    id,
    num
  } = Route.useParams();
  const {
    data: endo,
    isLoading
  } = useEndorsementDetail(id, num);
  const {
    record: cobranca
  } = useEndorsementBilling(id, num);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-subtitle", children: "Carregando endosso…" });
  }
  if (!endo) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/apolices/$id", params: {
        id
      }, className: "inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
        " Voltar à apólice"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel p-12 text-center page-subtitle", children: "Endosso não encontrado." })
    ] });
  }
  const t = translateProposta(endo.proposta);
  const numeroDoc = t.numeroDocumento ?? endo.numero_apolice.slice(0, -6) + normalizeEndossoNum(num);
  const documento = parseDocumento(numeroDoc, t.tipoEndosso);
  const seguradoNome = t.partes.find((p) => p.papel === "SEGURADO")?.nome ?? null;
  const isCancelamento = t.tipoEndosso === "B" || t.tipoEndosso === "C";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "text-[12px] text-muted-foreground flex items-center gap-1.5 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/apolices", className: "hover:text-foreground transition", children: "Apólices" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/apolices/$id", params: {
        id
      }, className: "hover:text-foreground transition font-mono", children: id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-mono", children: [
        "Endosso ",
        documento.sequencial
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentoHeader, { documento, premioValor: isCancelamento ? void 0 : endo.premio_liquido, premioMoeda: endo.premio_moeda, seguradoNome, badge: cobranca ? /* @__PURE__ */ jsxRuntimeExports.jsx(BillingBadge, { statusPagamento: cobranca.status_pagamento, situacaoEmissao: cobranca.situacao_emissao }) : null }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Cobrança", subtitle: "Situação financeira registrada para este endosso", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CobrancaCard, { record: cobranca }) }),
    t.motivoEndosso && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Motivo do endosso", subtitle: "Justificativa registrada pela seguradora para a emissão deste documento", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MotivoEndossoCard, { motivo: t.motivoEndosso }) }),
    isCancelamento ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Dados gerais", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DadosGeraisCard, { dados: t.dadosGerais }) }),
      t.cancelamento && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: t.tipoEndosso === "C" ? "Cancelamento" : "Alteração", subtitle: t.tipoEndosso === "C" ? "Este endosso cancela um documento da apólice" : "Este endosso altera um documento da apólice", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CancelamentoCard, { cancelamento: t.cancelamento, tipoEndosso: t.tipoEndosso }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Datas", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DatasCard, { datas: t.datas }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      t.isWrapperVazio && /* @__PURE__ */ jsxRuntimeExports.jsx(EndossoSemDadosAviso, { numeroApolice: documento.numeroApolice }),
      !t.isWrapperVazio && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Dados gerais", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DadosGeraisCard, { dados: t.dadosGerais }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Datas", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DatasCard, { datas: t.datas }) }),
        t.limiteApolice && /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Limite & Cotação", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LimiteApoliceCard, { limite: t.limiteApolice }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CotacaoCard, { cotacoes: t.cotacoes })
        ] }),
        t.partes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Partes", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PartesList, { partes: t.partes }) }),
        t.itens.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Itens & coberturas", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItensCoberturas, { itens: t.itens }) }),
        t.pagamento.parcelas.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Pagamento", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PagamentoCard, { pagamento: t.pagamento }) })
      ] }),
      t.isWrapperVazio && (t.datas.inicioVigencia || t.datas.fimVigencia || t.datas.assinatura) && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Datas do endosso", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DatasCard, { datas: t.datas }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Dados brutos", subtitle: "Payload completo retornado pelo MOTOR OLÉ", children: /* @__PURE__ */ jsxRuntimeExports.jsx(JsonExplorer, { data: endo.proposta, title: "Endosso (raw)", defaultDepth: 1 }) })
  ] });
}
export {
  EndossoDetail as component
};
