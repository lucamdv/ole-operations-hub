import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Button } from "./button-DxLsNwLg.mjs";
import { V as VirtualList } from "./virtual-list-FPUGudF8.mjs";
import { I as Input } from "./input-7ljYa1o2.mjs";
import { D as Dialog, f as DialogTrigger, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-Cw2eQtk0.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-OIaO8IaO.mjs";
import { u as useCurrentRole } from "./use-current-role-E51G92Oa.mjs";
import { c as cn, r as relativeTime, f as formatDateTime, a as useServerFn, m as useWebhookMode, i as createSsrRpc } from "./router-C--tI9WT.mjs";
import { u as useQuery, a as useQueryClient, b as useMutation, q as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as createServerFn } from "./server-BxlZVXOU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BqwiLAOE.mjs";
import { I as IgnoreReasonDialog, u as useExceptionTags, R as ReasonDisplay } from "./ignore-reason-dialog-C5zpw73G.mjs";
import "../_libs/seroval.mjs";
import { K as Layers, I as Download, u as FileDown, f as RefreshCw, d as Search, aj as ArrowUpDown, E as EyeOff, a9 as Plus, a3 as Pencil, h as Trash2 } from "../_libs/lucide-react.mjs";
import { o as object, s as string } from "../_libs/zod.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tanstack__react-virtual.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/tanstack__virtual-core.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-effect-event+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "./client-BQqbDqk4.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "./webhook-mode-DKZeQYsl.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-accordion.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
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
const runEndorsementExtraction = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(createSsrRpc("e82b6fe37b10f385029646bddeeb306a2fffa5b04b9bac4ccfe95da82e4c2cbb"));
const getExtractionStatus = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => object({
  runId: string().uuid()
}).parse(d)).handler(createSsrRpc("dbc7d37a66b1595c39f93132683cfc588ae0649948a6f858cdd972e6a55015c3"));
const getLatestExtraction = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("b29ee520bfee3bf30f61c45a01fd56e527aec9ae9802426cb685d79789aefce3"));
createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("8972cba1e7bd86457ab4fe2a35382b627bf9047c26a8a14e3ffda4c8036c4539"));
const listEndorsementExceptions = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("eee7ccdfb0d44ee559bce79076fab9edabf91d9dedaef9ed287bef89fc993039"));
const AddSchema = object({
  policy_number: string().min(1).max(120),
  motivo: string().trim().min(1, "Motivo obrigatório").max(500),
  reason_tag_id: string().uuid().optional().nullable()
});
const addEndorsementException = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => AddSchema.parse(d)).handler(createSsrRpc("fc4d84a2a7e10e4d01d1ca3e57eb76ace01b2e91cdd413cd0ee06af9e55469b7"));
const UpdateSchema = object({
  id: string().uuid(),
  motivo: string().trim().min(1, "Motivo obrigatório").max(500),
  reason_tag_id: string().uuid().optional().nullable()
});
const updateEndorsementException = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => UpdateSchema.parse(d)).handler(createSsrRpc("d63e2fd05520e37a6ae452ef881081244ec0419acd4b8bf6ec095508e97bb8e5"));
const removeEndorsementException = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => object({
  id: string().uuid()
}).parse(d)).handler(createSsrRpc("e9598f1c88e2dcdf6e37949cfdbd2526b83410dad0463ceb11739dcd11591dd7"));
const latestExtractionQuery = queryOptions({
  queryKey: ["endorsement-extraction", "latest"],
  queryFn: () => getLatestExtraction(),
  staleTime: 3e4
});
const endorsementExceptionsQuery = queryOptions({
  queryKey: ["endorsement-exceptions"],
  queryFn: () => listEndorsementExceptions(),
  staleTime: 6e4
});
function useLatestExtraction() {
  return useQuery(latestExtractionQuery);
}
function useEndorsementExceptions() {
  return useQuery(endorsementExceptionsQuery);
}
function useRunEndorsementExtraction() {
  const qc = useQueryClient();
  const fireFn = useServerFn(runEndorsementExtraction);
  const { mode } = useWebhookMode();
  const statusFn = useServerFn(getExtractionStatus);
  const [isPolling, setIsPolling] = reactExports.useState(false);
  const timer = reactExports.useRef(null);
  reactExports.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );
  const stop = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setIsPolling(false);
  };
  const pollOnce = async (runId, startedAt) => {
    try {
      const row = await statusFn({ data: { runId } });
      if (row?.status === "success") {
        toast.success("Extração concluída", {
          description: `${row.total_apolices} apólices retornadas.`
        });
        qc.invalidateQueries({ queryKey: ["endorsement-extraction"] });
        stop();
        return;
      }
      if (row?.status === "error") {
        toast.error("Falha na extração", {
          description: row.error_message ?? "Erro desconhecido.",
          duration: 3e4
        });
        stop();
        return;
      }
    } catch (err) {
      console.error("[extracao] erro consultando status:", err);
    }
    if (Date.now() - startedAt > 15 * 6e4) {
      toast.error("Extração expirou", { description: "Sem resposta após 15 minutos." });
      stop();
      return;
    }
    timer.current = setTimeout(() => pollOnce(runId, startedAt), 3e3);
  };
  const mutation = useMutation({
    mutationFn: () => fireFn({ data: { mode } }),
    onSuccess: ({ runId }) => {
      setIsPolling(true);
      toast.info("Extração iniciada", { description: "Aguardando o fluxo n8n…" });
      const startedAt = Date.now();
      timer.current = setTimeout(() => pollOnce(runId, startedAt), 3e3);
    },
    onError: (err) => {
      toast.error("Falha ao disparar extração", { description: err.message });
    }
  });
  return { ...mutation, isRunning: mutation.isPending || isPolling };
}
function useAddEndorsementException() {
  const qc = useQueryClient();
  const fn = useServerFn(addEndorsementException);
  return useMutation({
    mutationFn: (input) => fn({ data: input }),
    onSuccess: (res, vars) => {
      qc.invalidateQueries({ queryKey: ["endorsement-exceptions"] });
      qc.invalidateQueries({ queryKey: ["endorsement-extraction"] });
      toast.success(res.alreadyExists ? "Já estava na lista" : "Exceção registrada", {
        description: `Apólice ${vars.policy_number}`
      });
    },
    onError: (err) => {
      toast.error("Falha ao registrar exceção", {
        description: err.message === "Forbidden" ? "Apenas administradores." : err.message
      });
    }
  });
}
function useUpdateEndorsementException() {
  const qc = useQueryClient();
  const fn = useServerFn(updateEndorsementException);
  return useMutation({
    mutationFn: (input) => fn({ data: input }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["endorsement-exceptions"] });
      toast.success("Motivo atualizado");
    },
    onError: (err) => {
      toast.error("Falha ao atualizar motivo", {
        description: err.message === "Forbidden" ? "Apenas administradores." : err.message
      });
    }
  });
}
function useRemoveEndorsementException() {
  const qc = useQueryClient();
  const fn = useServerFn(removeEndorsementException);
  return useMutation({
    mutationFn: (input) => fn({ data: input }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["endorsement-exceptions"] });
      qc.invalidateQueries({ queryKey: ["endorsement-extraction"] });
      toast.success("Exceção removida");
    },
    onError: (err) => {
      toast.error("Falha ao remover exceção", {
        description: err.message === "Forbidden" ? "Apenas administradores." : err.message
      });
    }
  });
}
function ExtratorPage() {
  const {
    data: roleInfo
  } = useCurrentRole();
  const isAdmin = !!roleInfo?.isAdmin;
  const {
    data: latest,
    isLoading
  } = useLatestExtraction();
  const {
    mutate: run,
    isRunning
  } = useRunEndorsementExtraction();
  const addException = useAddEndorsementException();
  const [q, setQ] = reactExports.useState("");
  const [asc, setAsc] = reactExports.useState(true);
  const [pendingPolicy, setPendingPolicy] = reactExports.useState(null);
  const rows = reactExports.useMemo(() => {
    const items = latest?.items ?? [];
    const term = q.trim().toLowerCase();
    const filtered = term ? items.filter((i) => i.policy_number.toLowerCase().includes(term)) : items;
    return [...filtered].sort((a, b) => asc ? a.policy_number.localeCompare(b.policy_number) : b.policy_number.localeCompare(a.policy_number));
  }, [latest, q, asc]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-end md:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono uppercase tracking-[0.2em] text-primary", children: "Ferramentas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: "Extrator" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "page-title flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-5 w-5 text-primary" }),
          "Extrator de Últimos Endossos"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 flex flex-wrap items-center gap-2 text-[12.5px] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-block h-1.5 w-1.5 rounded-full", latest ? "bg-emerald-500" : isRunning ? "bg-warning animate-pulse" : "bg-muted-foreground/50") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: latest?.items.length ?? 0 }),
            " ",
            "apólices"
          ] }),
          !!latest?.hiddenCount && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              latest.hiddenCount,
              " ocultadas por exceção"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: latest?.run.finished_at ? formatDateTime(latest.run.finished_at) : void 0, children: latest?.run.finished_at ? `última extração ${relativeTime(latest.run.finished_at)}` : isRunning ? "extração em andamento" : "nenhuma extração ainda" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExceptionsDialog, { isAdmin }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-10 gap-2 text-[12.5px]", disabled: rows.length === 0, onClick: async () => {
          const {
            exportEndorsementsCsv
          } = await import("./export-endorsements-pTc0dOEQ.mjs");
          exportEndorsementsCsv(rows);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
          " CSV"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-10 gap-2 text-[12.5px]", disabled: rows.length === 0, onClick: async () => {
          const {
            exportEndorsementsPdf
          } = await import("./export-endorsements-pTc0dOEQ.mjs");
          exportEndorsementsPdf(rows, latest?.run.finished_at ?? null);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "h-3.5 w-3.5" }),
          " PDF"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "h-10 gap-2 text-[12.5px] font-semibold", disabled: isRunning, onClick: () => run(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: cn("h-3.5 w-3.5", isRunning && "animate-spin") }),
          isRunning ? "Extraindo…" : "Extrair últimos endossos"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full md:w-[380px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar apólice…", className: "pl-9 h-10 text-[12.5px]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: isAdmin ? "grid grid-cols-[minmax(0,1fr)_130px_110px] gap-2 px-4 py-2.5 border-b border-border bg-surface-2/40 text-[11px] font-medium text-muted-foreground" : "grid grid-cols-[minmax(0,1fr)_130px] gap-2 px-4 py-2.5 border-b border-border bg-surface-2/40 text-[11px] font-medium text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setAsc((v) => !v), className: "inline-flex items-center gap-1 hover:text-foreground transition-colors justify-self-start", children: [
          "PolicyNumber ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "h-3 w-3" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right truncate", children: "last_seq_endosso" }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: "Ações" })
      ] }),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-10 text-[12.5px] text-muted-foreground", children: "Carregando…" }),
      !isLoading && rows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-14 text-[12.5px] text-muted-foreground px-4", children: latest ? "Nenhuma apólice corresponde à busca." : 'Nenhuma extração ainda. Clique em "Extrair últimos endossos".' }),
      !isLoading && rows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(VirtualList, { items: rows, getKey: (r) => r.policy_number, estimateSize: 48, className: "max-h-[65dvh]", children: (r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("grid gap-2 items-center px-4 py-2.5 border-b border-border/60 hover:bg-surface-2/40 transition-colors", isAdmin ? "grid-cols-[minmax(0,1fr)_130px_110px]" : "grid-cols-[minmax(0,1fr)_130px]"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[12px] break-all min-w-0", children: r.policy_number }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right font-mono text-[12px] tabular-nums", children: r.last_sequencial_endosso_used ?? "—" }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", className: "h-8 text-[11.5px] gap-1 text-muted-foreground hover:text-foreground", disabled: addException.isPending, onClick: () => setPendingPolicy(r.policy_number), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-3.5 w-3.5" }),
          " Ignorar"
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(IgnoreReasonDialog, { open: !!pendingPolicy, onOpenChange: (v) => !v && setPendingPolicy(null), targetLabel: pendingPolicy ? `Apólice ${pendingPolicy}` : void 0, description: "A apólice deixa de aparecer na tabela, nas exportações e no envio ao fluxo. O motivo é obrigatório.", pending: addException.isPending, onConfirm: ({
      motivo,
      reason_tag_id
    }) => {
      if (!pendingPolicy) return;
      addException.mutate({
        policy_number: pendingPolicy,
        motivo,
        reason_tag_id
      }, {
        onSuccess: () => setPendingPolicy(null)
      });
    } })
  ] });
}
function ExceptionsDialog({
  isAdmin
}) {
  const {
    data: exceptions = [],
    isLoading
  } = useEndorsementExceptions();
  const add = useAddEndorsementException();
  const update = useUpdateEndorsementException();
  const remove = useRemoveEndorsementException();
  const {
    data: tags = []
  } = useExceptionTags();
  const [policy, setPolicy] = reactExports.useState("");
  const [askReasonFor, setAskReasonFor] = reactExports.useState(null);
  const [editing, setEditing] = reactExports.useState(null);
  const submit = () => {
    if (!policy.trim()) return;
    setAskReasonFor(policy.trim());
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-10 gap-2 text-[12.5px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-3.5 w-3.5" }),
      " Exceções",
      exceptions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-0.5 rounded bg-muted px-1.5 text-[11px] font-mono", children: exceptions.length })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-[15px]", children: "Exceções da extração" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-[12.5px]", children: "Apólices listadas aqui não aparecem na tabela nem nas exportações, e não são enviadas ao fluxo n8n. Esta lista é independente das exceções de auditoria." })
      ] }),
      isAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: policy, onChange: (e) => setPolicy(e.target.value), onKeyDown: (e) => e.key === "Enter" && submit(), placeholder: "Número da apólice", className: "h-9 text-[12.5px] sm:w-[240px] font-mono" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "h-9 gap-1 text-[12.5px]", disabled: add.isPending || !policy.trim(), onClick: submit, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
          " Adicionar com motivo"
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "Apenas administradores podem criar, editar ou remover exceções." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border overflow-hidden max-h-[50vh] overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-[11px]", children: "Apólice" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-[11px]", children: "Motivo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-[11px]", children: "Criada em" }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-[11px] w-[160px] text-right", children: "Ações" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: isAdmin ? 4 : 3, className: "text-center py-8 text-[12px] text-muted-foreground", children: "Carregando…" }) }),
          !isLoading && exceptions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: isAdmin ? 4 : 3, className: "text-center py-10 text-[12.5px] text-muted-foreground", children: "Nenhuma exceção registrada." }) }),
          exceptions.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-[12px] break-all", children: e.policy_number }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-[12.5px] max-w-[260px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReasonDisplay, { motivo: e.motivo, tagId: e.reason_tag_id, tags }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-[11.5px] font-mono text-muted-foreground", children: formatDateTime(e.created_at) }),
            isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right whitespace-nowrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", className: "h-8 text-[11.5px] gap-1 text-muted-foreground hover:text-foreground", onClick: () => setEditing(e), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
                " Editar"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "h-8 w-8 p-0 text-muted-foreground hover:text-destructive", disabled: remove.isPending, onClick: () => remove.mutate({
                id: e.id
              }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
            ] })
          ] }, e.id))
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IgnoreReasonDialog, { open: !!askReasonFor, onOpenChange: (v) => !v && setAskReasonFor(null), targetLabel: askReasonFor ? `Apólice ${askReasonFor}` : void 0, pending: add.isPending, onConfirm: ({
        motivo,
        reason_tag_id
      }) => {
        if (!askReasonFor) return;
        add.mutate({
          policy_number: askReasonFor,
          motivo,
          reason_tag_id
        }, {
          onSuccess: () => {
            setAskReasonFor(null);
            setPolicy("");
          }
        });
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IgnoreReasonDialog, { open: !!editing, onOpenChange: (v) => !v && setEditing(null), title: "Editar motivo da exceção", confirmLabel: "Salvar motivo", targetLabel: editing ? `Apólice ${editing.policy_number}` : void 0, initialMotivo: editing?.motivo ?? "", initialTagId: editing?.reason_tag_id ?? null, pending: update.isPending, onConfirm: ({
        motivo,
        reason_tag_id
      }) => {
        if (!editing) return;
        update.mutate({
          id: editing.id,
          motivo,
          reason_tag_id
        }, {
          onSuccess: () => setEditing(null)
        });
      } })
    ] })
  ] });
}
export {
  ExtratorPage as component
};
