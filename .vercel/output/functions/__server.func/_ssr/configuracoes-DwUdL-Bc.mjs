import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useTheme, f as formatDateTime, a as useServerFn, m as useWebhookMode, i as createSsrRpc, r as relativeTime, n as nextRunAt, o as formatCountdown, c as cn } from "./router-C--tI9WT.mjs";
import { u as useProfile, b as useChartPrefs, a as useNotifPrefs, p as playNotifBeep } from "./use-settings-CkvJQFhU.mjs";
import { u as useNotifications } from "./use-notifications-IlWXV-zG.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useQuery, b as useMutation, a as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { c as createServerFn } from "./server-BxlZVXOU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BqwiLAOE.mjs";
import { u as useCurrentRole } from "./use-current-role-E51G92Oa.mjs";
import { R as Root2, P as Portal2, C as Content2, T as Title2, D as Description2, a as Cancel, A as Action$1, O as Overlay2 } from "../_libs/radix-ui__react-alert-dialog.mjs";
import { B as Button, b as buttonVariants } from "./button-DxLsNwLg.mjs";
import { a as useAutomationSchedules, b as useUpdateAutomationSchedule } from "./use-automation-DR0lOfg-.mjs";
import { I as Input } from "./input-7ljYa1o2.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BPFiSsdh.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-OIaO8IaO.mjs";
import { u as useAuditIgnores, b as useRemoveAuditIgnore, c as useUpdateAuditIgnore } from "./use-audit-ignores-BqmweSgK.mjs";
import { u as useExceptionTags, a as ReasonTagChip, R as ReasonDisplay, I as IgnoreReasonDialog, b as useAddExceptionTag, c as useUpdateExceptionTag, d as useRemoveExceptionTag } from "./ignore-reason-dialog-C5zpw73G.mjs";
import { u as useKpiTargets } from "./use-kpi-targets-CLpxhBV_.mjs";
import { u as useEscalationRules, U as URGENCY_ORDER, a as URGENCY_LABEL } from "./use-escalation-rules-Dt2mA-L9.mjs";
import { P as PageHeader } from "./page-header-CC7P6yQI.mjs";
import "../_libs/seroval.mjs";
import { Z as User, _ as Target, B as Bell, E as EyeOff, $ as Plug, H as Clock, a0 as Database, k as Sun, l as Moon, a1 as Monitor, N as RotateCcw, a2 as Volume2, d as Search, X, a3 as Pencil, h as Trash2, a4 as Rocket, a5 as FlaskConical, a6 as FileSearch, F as FileText, a7 as TrendingUp, a8 as Tags, a9 as Plus, i as Check, y as CircleX, aa as CircleAlert, r as CircleCheck, x as Copy, ab as Zap, Q as ExternalLink, f as RefreshCw, c as ShieldCheck, m as LoaderCircle } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "./dialog-Cw2eQtk0.mjs";
import "./derive-DGSsM_A8.mjs";
const FUSOS = [
  "America/Sao_Paulo",
  "America/Recife",
  "America/Manaus",
  "America/Belem",
  "America/Cuiaba",
  "America/Noronha",
  "UTC"
];
function PerfilTab() {
  const { profile, update } = useProfile();
  const { theme, setTheme } = useTheme();
  const { prefs: chartPrefs, update: updateChartPrefs } = useChartPrefs();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome do operador", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: profile.nome,
          readOnly: true,
          title: "Gerenciado pelo administrador",
          className: "w-full h-9 px-3 rounded-md border border-border bg-surface/40 text-[13px] text-muted-foreground cursor-not-allowed focus:outline-none"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "E-mail", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "email",
          value: profile.email,
          readOnly: true,
          title: "Gerenciado pelo administrador",
          className: "w-full h-9 px-3 rounded-md border border-border bg-surface/40 text-[13px] text-muted-foreground cursor-not-allowed focus:outline-none"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Fuso horário", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          value: profile.fuso,
          onChange: (e) => update({ fuso: e.target.value }),
          className: "w-full h-9 px-3 rounded-md border border-border bg-surface text-[13px] focus:outline-none focus:border-primary",
          children: FUSOS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: f, children: f }, f))
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Idioma", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: profile.idioma,
          onChange: (e) => update({ idioma: e.target.value }),
          className: "w-full h-9 px-3 rounded-md border border-border bg-surface text-[13px] focus:outline-none focus:border-primary",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pt-BR", children: "Português (BR)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "en-US", children: "English (US) — em breve" })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] font-medium text-muted-foreground mb-2 uppercase tracking-wider", children: "Tema" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex rounded-lg border border-border p-1 bg-surface/60", children: [
        [
          { v: "light", label: "Claro", icon: Sun },
          { v: "dark", label: "Escuro", icon: Moon }
        ].map((opt) => {
          const Icon = opt.icon;
          const active = theme === opt.v;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setTheme(opt.v),
              className: `flex items-center gap-1.5 px-3 h-8 rounded-md text-[12.5px] transition ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
                opt.label
              ]
            },
            opt.v
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            disabled: true,
            className: "flex items-center gap-1.5 px-3 h-8 rounded-md text-[12.5px] text-muted-foreground/50 cursor-not-allowed",
            title: "Em breve",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "h-3.5 w-3.5" }),
              "Sistema"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] font-medium text-muted-foreground mb-2 uppercase tracking-wider", children: "Visualização de gráficos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start justify-between gap-4 rounded-lg border border-border bg-surface/60 p-3 cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[13px] font-medium", children: "Ocultar gráficos sem dados suficientes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[12px] text-muted-foreground mt-0.5", children: "Quando ativo, gráficos sem informação relevante são escondidos e um aviso discreto lista quais ficaram de fora." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            role: "switch",
            "aria-checked": chartPrefs.hideEmptyCharts,
            onClick: () => updateChartPrefs({ hideEmptyCharts: !chartPrefs.hideEmptyCharts }),
            className: `relative shrink-0 h-5 w-9 rounded-full transition ${chartPrefs.hideEmptyCharts ? "bg-primary" : "bg-muted"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `absolute top-0.5 h-4 w-4 rounded-full bg-background transition-all ${chartPrefs.hideEmptyCharts ? "left-4.5" : "left-0.5"}`
              }
            )
          }
        )
      ] })
    ] })
  ] });
}
function Field({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[11px] font-medium text-muted-foreground mb-1.5 uppercase tracking-wider", children: label }),
    children
  ] });
}
const ITEMS = [
  { key: "auditoria_concluida", label: "Auditoria concluída", desc: "Notifica ao fim de cada rodada bem-sucedida." },
  { key: "auditoria_erro", label: "Falha em auditoria", desc: "Alerta crítico quando o motor retorna erro." },
  { key: "sync_carteira", label: "Sincronização da carteira", desc: "Resultado de cada execução do MOTOR OLÉ." },
  { key: "achados_criticos", label: "Achados críticos", desc: "Gap de vigência, duplicidade, sobreposição." },
  { key: "apolices_atualizadas", label: "Apólices novas/atualizadas", desc: "Resumo desde sua última visita." }
];
function NotificacoesTab() {
  const { prefs, update } = useNotifPrefs();
  const { resetReadHistory } = useNotifications();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel divide-y divide-border", children: [
      ITEMS.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Toggle,
        {
          label: it.label,
          desc: it.desc,
          checked: prefs[it.key] !== false,
          onChange: (v) => update({ [it.key]: v })
        },
        it.key
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Toggle,
        {
          label: "Som ao receber notificação crítica",
          desc: "Toca um beep curto para severidade alta/crítica.",
          checked: prefs.som,
          onChange: (v) => {
            update({ som: v });
            if (v) playNotifBeep();
          },
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "h-3.5 w-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => {
          resetReadHistory();
          toast.success("Histórico de leitura redefinido");
        },
        className: "inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-surface hover:bg-surface-2 text-[12.5px] transition",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
          "Resetar histórico de leitura"
        ]
      }
    )
  ] });
}
function Toggle({
  label,
  desc,
  checked,
  onChange,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[13px] font-medium flex items-center gap-1.5", children: [
        icon,
        label
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11.5px] text-muted-foreground mt-0.5", children: desc })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        role: "switch",
        "aria-checked": checked,
        onClick: () => onChange(!checked),
        className: `shrink-0 w-10 h-5.5 rounded-full transition relative ${checked ? "bg-primary" : "bg-muted"}`,
        style: { height: 22, width: 40 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "absolute top-0.5 left-0.5 h-4.5 w-4.5 rounded-full bg-background shadow transition-transform",
            style: { height: 18, width: 18, transform: checked ? "translateX(18px)" : "translateX(0)" }
          }
        )
      }
    )
  ] });
}
const getIntegrationsStatus = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("da34154b13b7c137d141f7e52547e2556db37f5713d1798af26176b7bd79be7c"));
const pingMotorPolicies = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(createSsrRpc("6f41c041a07731785d21b1c81dfac935e9b11e1e0df74adc32b79919b5f663de"));
const pingAuditWebhook = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(createSsrRpc("9c7194898cebaccaf9ce235253ef0678b83d5c58566f68d149497c78c6a6046e"));
const getDataCounters = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("cef162a41e5739c71c20de005aabcff667590e7c4e3c5be965d9fcafe2d68666"));
const purgeOldAudits = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("b2ac59cdd580ee1312afa6dcdfa4882829a8fa68d83dbf2a60c9d0061fca096e"));
const exportPoliciesCSV = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("fb74ba961b323ca5471afae091ef998985698748aaa8fbc42cbe89644a165236"));
const exportLatestAuditJSON = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("73049a84442114f6b14215429cf260e46c9744fb212979cf2b1d77276e2577b0"));
function IntegracoesTab() {
  const fetchFn = useServerFn(getIntegrationsStatus);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["integrations-status"],
    queryFn: () => fetchFn(),
    refetchInterval: 3e4
  });
  const { data: roleInfo } = useCurrentRole();
  const isAdmin = !!roleInfo?.isAdmin;
  const { mode, setMode } = useWebhookMode();
  const pingMotor = useServerFn(pingMotorPolicies);
  const pingAudit = useServerFn(pingAuditWebhook);
  const motorMut = useMutation({
    mutationFn: () => pingMotor({ data: { mode } }),
    onSuccess: (r) => r.ok ? toast.success(r.message) : toast.error(r.message),
    onError: (e) => toast.error(e.message)
  });
  const auditMut = useMutation({
    mutationFn: () => pingAudit({ data: { mode } }),
    onSuccess: (r) => r.ok ? toast.success(r.message) : toast.error(r.message),
    onError: (e) => toast.error(e.message)
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] text-muted-foreground", children: "Carregando integrações…" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 max-w-3xl", children: [
    isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          mode === "production" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "h-4 w-4 text-success" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-4 w-4 text-warning" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13.5px] font-semibold", children: "Modo da auditoria (somente para você)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[12px] text-muted-foreground mt-1.5", children: [
          "Esta preferência vale apenas para o webhook do motor de auditoria. Em produção, os disparos usam o caminho",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "mx-1 px-1 py-0.5 rounded bg-surface border border-border font-mono text-[11px]", children: "/webhook/" }),
          "do n8n. Desativado, usam",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "mx-1 px-1 py-0.5 rounded bg-surface border border-border font-mono text-[11px]", children: "/webhook-test/" }),
          "(exige “Listen for test event”). Essa preferência é salva apenas neste usuário/navegador e não afeta a sincronização direta da carteira, os outros usuários nem os disparos automáticos."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `text-[11.5px] mt-2 ${mode === "production" ? "text-success" : "text-warning"}`,
            children: [
              "Atualmente: ",
              mode === "production" ? "Produção" : "Teste"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          role: "switch",
          "aria-checked": mode === "production",
          "aria-label": "Ativar modo de produção do webhook",
          onClick: () => {
            const next = mode === "production" ? "test" : "production";
            setMode(next);
            toast.success(
              next === "production" ? "Modo de produção ativado para você" : "Modo de teste ativado para você"
            );
          },
          className: `shrink-0 relative h-6 w-11 rounded-full transition ${mode === "production" ? "bg-primary" : "bg-surface-2 border border-border"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `absolute top-0.5 h-5 w-5 rounded-full bg-background shadow transition-all ${mode === "production" ? "left-[22px]" : "left-0.5"}`
            }
          )
        }
      )
    ] }) }),
    (data ?? []).map((it) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      IntegrationCard,
      {
        item: it,
        onPing: it.id === "motor_policies" ? () => motorMut.mutate() : it.id === "n8n_audit" ? () => auditMut.mutate() : void 0,
        pingPending: it.id === "motor_policies" && motorMut.isPending || it.id === "n8n_audit" && auditMut.isPending,
        onRefresh: () => refetch()
      },
      it.id
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11.5px] text-muted-foreground pt-2", children: [
      "A carteira usa a API Excelsior diretamente com as secrets",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "mx-1 px-1.5 py-0.5 rounded bg-surface border border-border font-mono text-[11px]", children: "EXCELSIOR_API_USERNAME" }),
      "e",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "mx-1 px-1.5 py-0.5 rounded bg-surface border border-border font-mono text-[11px]", children: "EXCELSIOR_API_PASSWORD" }),
      ". A auditoria continua usando",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "mx-1 px-1.5 py-0.5 rounded bg-surface border border-border font-mono text-[11px]", children: "N8N_AUDIT_WEBHOOK_URL" }),
      "no backend."
    ] })
  ] });
}
function IntegrationCard({
  item,
  onPing,
  pingPending,
  onRefresh
}) {
  const Status = !item.configured ? { Icon: CircleX, color: "text-destructive", label: "Não configurado" } : item.lastStatus === "error" ? { Icon: CircleAlert, color: "text-destructive", label: "Erro na última execução" } : item.lastStatus === "success" || item.id === "audit_callback" ? {
    Icon: CircleCheck,
    color: "text-success",
    label: item.id === "audit_callback" ? "Pronto" : "Operacional"
  } : {
    Icon: CircleAlert,
    color: "text-warning",
    label: item.lastStatus ?? "Aguardando primeiro evento"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Status.Icon, { className: `h-4 w-4 ${Status.color}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13.5px] font-semibold", children: item.label })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-[11.5px] mt-1 ${Status.color}`, children: Status.label }),
      item.lastDetail && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-muted-foreground mt-2 truncate", children: item.lastDetail }),
      item.lastAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10.5px] text-muted-foreground/80 font-mono mt-0.5", children: [
        "Última atividade: ",
        relativeTime(item.lastAt)
      ] }),
      item.publicCallback && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-[11px] font-mono bg-background border border-border rounded px-2 py-1 truncate flex-1", children: item.publicCallback }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              navigator.clipboard.writeText(item.publicCallback);
              toast.success("URL copiada");
            },
            className: "h-7 w-7 grid place-items-center rounded border border-border hover:bg-surface-2 transition",
            title: "Copiar URL",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 shrink-0", children: [
      onPing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: onPing,
          disabled: !item.configured || pingPending,
          className: "inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-primary text-primary-foreground text-[12px] font-medium hover:bg-primary/90 disabled:opacity-50 transition",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3 w-3" }),
            pingPending ? "Testando…" : "Testar"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: onRefresh,
          className: "inline-flex items-center gap-1.5 h-8 px-3 rounded-md border border-border text-[12px] hover:bg-surface-2 transition",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" }),
            "Atualizar"
          ]
        }
      )
    ] })
  ] }) });
}
const AlertDialog = Root2;
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = Content2.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title2,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description2,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Action$1, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = Action$1.displayName;
const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = Cancel.displayName;
function download(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
function DadosTab() {
  const qc = useQueryClient();
  const fetchCounters = useServerFn(getDataCounters);
  const { data: counters } = useQuery({
    queryKey: ["data-counters"],
    queryFn: () => fetchCounters(),
    refetchInterval: 3e4
  });
  const auditFn = useServerFn(purgeOldAudits);
  const exportCSVFn = useServerFn(exportPoliciesCSV);
  const exportAuditFn = useServerFn(exportLatestAuditJSON);
  const [confirm2, setConfirm] = reactExports.useState(null);
  const purgeAuditMut = useMutation({
    mutationFn: () => auditFn({ data: { days: 90 } }),
    onSuccess: (r) => {
      toast.success(`${r.removed} rodadas de auditoria removidas (anteriores a 90 dias)`);
      qc.invalidateQueries({ queryKey: ["data-counters"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const exportCSVMut = useMutation({
    mutationFn: () => exportCSVFn(),
    onSuccess: (r) => {
      if (!r.count) return toast.info("Nenhuma apólice na carteira para exportar");
      download(
        `carteira-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`,
        r.csv,
        "text/csv;charset=utf-8"
      );
      toast.success(`${r.count} apólices exportadas`);
    },
    onError: (e) => toast.error(e.message)
  });
  const exportAuditMut = useMutation({
    mutationFn: () => exportAuditFn(),
    onSuccess: (r) => {
      if (!r.json) return toast.info("Nenhuma auditoria concluída para exportar");
      download(`auditoria-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, r.json, "application/json");
      toast.success("Auditoria exportada");
    },
    onError: (e) => toast.error(e.message)
  });
  const c = counters;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-medium text-muted-foreground mb-2 uppercase tracking-wider", children: "Volumes atuais" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Database, label: "Apólices", value: c?.policies }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Database, label: "Endossos", value: c?.endorsements }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: FileSearch, label: "Rodadas de auditoria", value: c?.audit_runs }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: FileSearch, label: "Achados", value: c?.audit_findings })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Exportar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Action,
        {
          icon: FileText,
          title: "Carteira (CSV)",
          desc: "Exporta todas as apólices: número, endosso atual, segurado, prêmio.",
          actionLabel: exportCSVMut.isPending ? "Gerando…" : "Baixar CSV",
          disabled: exportCSVMut.isPending,
          onClick: () => exportCSVMut.mutate()
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Action,
        {
          icon: FileText,
          title: "Última auditoria (JSON)",
          desc: "Última rodada concluída com sucesso e todos os achados.",
          actionLabel: exportAuditMut.isPending ? "Gerando…" : "Baixar JSON",
          disabled: exportAuditMut.isPending,
          onClick: () => exportAuditMut.mutate()
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Retenção & limpeza", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Action,
      {
        icon: Trash2,
        tone: "destructive",
        title: "Limpar auditorias com mais de 90 dias",
        desc: "Remove rodadas antigas e seus achados (cascade).",
        actionLabel: purgeAuditMut.isPending ? "Limpando…" : "Limpar",
        disabled: purgeAuditMut.isPending,
        onClick: () => setConfirm("audit")
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: confirm2 !== null, onOpenChange: (o) => !o && setConfirm(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Confirmar limpeza" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Todas as rodadas de auditoria anteriores a 90 dias e seus achados serão apagadas." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancelar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            onClick: () => {
              if (confirm2 === "audit") purgeAuditMut.mutate();
              setConfirm(null);
            },
            className: "bg-destructive hover:bg-destructive/90",
            children: "Confirmar"
          }
        )
      ] })
    ] }) })
  ] });
}
function Stat({ icon: Icon, label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-surface p-3 flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-md bg-primary/15 text-primary grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] uppercase tracking-wider text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[15px] font-semibold tabular-nums", children: value ?? "—" })
    ] })
  ] });
}
function Section({ title, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-medium text-muted-foreground mb-2 uppercase tracking-wider", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel divide-y divide-border", children })
  ] });
}
function Action({
  icon: Icon,
  title,
  desc,
  actionLabel,
  onClick,
  tone = "default",
  disabled
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `h-8 w-8 rounded-md grid place-items-center shrink-0 ${tone === "destructive" ? "bg-destructive/15 text-destructive" : "bg-primary/15 text-primary"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] font-medium", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11.5px] text-muted-foreground mt-0.5", children: desc })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick,
        disabled,
        className: `shrink-0 h-8 px-3 rounded-md text-[12px] font-medium transition disabled:opacity-50 ${tone === "destructive" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}`,
        children: actionLabel
      }
    )
  ] });
}
const JOB_META = {
  audit: {
    label: "Auditoria automática",
    desc: "Dispara o motor de auditoria (n8n) no horário definido.",
    Icon: ShieldCheck
  },
  policy_sync: {
    label: "Sincronização da carteira",
    desc: "Dispara o MOTOR OLÉ para atualizar apólices e endossos.",
    Icon: RefreshCw
  }
};
const WEEKDAY_LABELS = ["D", "S", "T", "Q", "Q", "S", "S"];
const WEEKDAY_NAMES = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
function AutomacaoTab() {
  const { data, isLoading } = useAutomationSchedules();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] text-muted-foreground", children: "Carregando agendamentos…" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 max-w-3xl", children: [
    (data ?? []).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(ScheduleCard, { schedule: s }, s.job)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11.5px] text-muted-foreground pt-2", children: "Os disparos acontecem no servidor, no fuso America/São_Paulo — não é necessário manter a plataforma aberta. Você continua podendo rodar manualmente a qualquer momento." })
  ] });
}
function ScheduleCard({ schedule }) {
  const meta = JOB_META[schedule.job];
  const mut = useUpdateAutomationSchedule();
  const [time, setTime] = reactExports.useState(schedule.run_at_time.slice(0, 5));
  reactExports.useEffect(() => {
    setTime(schedule.run_at_time.slice(0, 5));
  }, [schedule.run_at_time]);
  const next = nextRunAt(schedule);
  const Icon = meta.Icon;
  const toggleWeekday = (d) => {
    const wd = schedule.weekdays.includes(d) ? schedule.weekdays.filter((x) => x !== d) : [...schedule.weekdays, d];
    if (wd.length === 0) return;
    mut.mutate({ job: schedule.job, weekdays: wd });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13.5px] font-semibold", children: meta.label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-muted-foreground mt-1", children: meta.desc })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 shrink-0 cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11.5px] text-muted-foreground", children: schedule.enabled ? "Ativo" : "Inativo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            checked: schedule.enabled,
            onChange: (e) => mut.mutate({ job: schedule.job, enabled: e.target.checked }),
            className: "h-4 w-4 accent-[var(--primary)]"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-end gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground mb-1", children: "Horário do disparo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "time",
              value: time,
              onChange: (e) => setTime(e.target.value),
              className: "h-9 px-2 rounded-md bg-background border border-border text-[13px] font-mono"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => mut.mutate({ job: schedule.job, run_at_time: time }),
              disabled: mut.isPending || time === schedule.run_at_time.slice(0, 5),
              className: "h-9 px-3 rounded-md bg-primary text-primary-foreground text-[12px] font-medium disabled:opacity-50 hover:bg-primary/90 transition",
              children: mut.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : "Salvar"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground mb-1", children: "Dias da semana" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: WEEKDAY_LABELS.map((l, d) => {
          const on = schedule.weekdays.includes(d);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              title: WEEKDAY_NAMES[d],
              onClick: () => toggleWeekday(d),
              className: `h-8 w-8 rounded-md border text-[12px] font-medium transition ${on ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:bg-surface-2"}`,
              children: l
            },
            d
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground", children: [
        "Fuso: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: schedule.timezone })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-3 border-t border-border grid gap-1 text-[11.5px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "Próximo disparo:",
        " ",
        next ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
          next.toLocaleString("pt-BR", {
            timeZone: schedule.timezone,
            dateStyle: "short",
            timeStyle: "short"
          }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-mono", children: [
            "(em ",
            formatCountdown(next.getTime() - Date.now()),
            ")"
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground", children: [
        "Último disparo automático:",
        " ",
        schedule.last_triggered_at ? relativeTime(schedule.last_triggered_at) : "nunca",
        schedule.last_status ? ` · ${schedule.last_status}` : ""
      ] }),
      schedule.last_error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-destructive truncate", children: [
        "Erro: ",
        schedule.last_error
      ] })
    ] })
  ] });
}
const PALETTE = ["#2563EB", "#DC2626", "#16A34A", "#D97706", "#7C3AED", "#0891B2", "#DB2777", "#475569"];
function ReasonTagsManager() {
  const { data: roleInfo } = useCurrentRole();
  const isAdmin = !!roleInfo?.isAdmin;
  const { data: tags = [], isLoading } = useExceptionTags();
  const add = useAddExceptionTag();
  const update = useUpdateExceptionTag();
  const remove = useRemoveExceptionTag();
  const [name, setName] = reactExports.useState("");
  const [color, setColor] = reactExports.useState(PALETTE[0]);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [draftName, setDraftName] = reactExports.useState("");
  const [draftColor, setDraftColor] = reactExports.useState(PALETTE[0]);
  const submit = () => {
    if (!name.trim()) return;
    add.mutate({ name: name.trim(), color }, { onSuccess: () => setName("") });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-[14px] font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tags, { className: "h-4 w-4" }),
        " Tags de motivo"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[12.5px] text-muted-foreground mt-1 max-w-2xl", children: [
        "Motivos prontos, compartilhados por toda a equipe, usados ao registrar exceções na auditoria e no extrator de últimos endossos.",
        !isAdmin && " Apenas administradores podem criar, editar ou remover tags."
      ] })
    ] }),
    isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2 items-start sm:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: name,
          onChange: (e) => setName(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && submit(),
          placeholder: "Nome da tag",
          maxLength: 60,
          className: "h-9 text-[12.5px] sm:w-[220px]"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        PALETTE.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": `Cor ${c}`,
            onClick: () => setColor(c),
            className: `h-6 w-6 rounded-full border border-border transition ${color === c ? "ring-2 ring-primary ring-offset-1 ring-offset-background" : ""}`,
            style: { backgroundColor: c }
          },
          c
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "color",
            value: color,
            onChange: (e) => setColor(e.target.value.toUpperCase()),
            "aria-label": "Cor personalizada",
            className: "h-6 w-8 cursor-pointer rounded border border-border bg-transparent p-0"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "h-9 gap-1 text-[12.5px]",
          disabled: add.isPending || !name.trim(),
          onClick: submit,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
            " Adicionar tag"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel p-3", children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "Carregando…" }),
      !isLoading && tags.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12.5px] text-muted-foreground", children: "Nenhuma tag cadastrada." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: tags.map(
        (t) => editingId === t.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              autoFocus: true,
              value: draftName,
              onChange: (e) => setDraftName(e.target.value),
              maxLength: 60,
              className: "h-8 text-[12.5px] w-[200px]"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "color",
              value: draftColor,
              onChange: (e) => setDraftColor(e.target.value.toUpperCase()),
              "aria-label": "Cor da tag",
              className: "h-7 w-9 cursor-pointer rounded border border-border bg-transparent p-0"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "ghost",
              className: "h-8 text-[11.5px] gap-1 text-primary",
              disabled: update.isPending || !draftName.trim(),
              onClick: () => update.mutate(
                { id: t.id, name: draftName.trim(), color: draftColor },
                { onSuccess: () => setEditingId(null) }
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }),
                " Salvar"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "ghost",
              className: "h-8 w-8 p-0 text-muted-foreground",
              onClick: () => setEditingId(null),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
            }
          )
        ] }, t.id) : /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ReasonTagChip, { tag: t }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setEditingId(t.id);
                  setDraftName(t.name);
                  setDraftColor(t.color);
                },
                className: "text-[11.5px] text-muted-foreground hover:text-foreground",
                children: "Editar"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-7 w-7 p-0 text-muted-foreground hover:text-destructive",
                disabled: remove.isPending,
                onClick: () => {
                  if (confirm(`Remover a tag "${t.name}"?`)) remove.mutate({ id: t.id });
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
              }
            )
          ] })
        ] }, t.id)
      ) })
    ] })
  ] });
}
function ExcecoesTab() {
  const { data: ignores = [], isLoading } = useAuditIgnores();
  const { data: tags = [] } = useExceptionTags();
  const remove = useRemoveAuditIgnore();
  const update = useUpdateAuditIgnore();
  const [q, setQ] = reactExports.useState("");
  const [errorFilter, setErrorFilter] = reactExports.useState("__all__");
  const [tagFilter, setTagFilter] = reactExports.useState("__all__");
  const [editing, setEditing] = reactExports.useState(null);
  const errorOptions = reactExports.useMemo(() => {
    const set = /* @__PURE__ */ new Set();
    for (const i of ignores) {
      if (i.tipo_erro) set.add(i.tipo_erro);
    }
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [ignores]);
  const filtered = reactExports.useMemo(() => {
    let result = ignores;
    const term = q.trim().toLowerCase();
    if (term) {
      result = result.filter(
        (i) => `${i.apolice} ${i.tipo_erro ?? ""} ${i.motivo ?? ""}`.toLowerCase().includes(term)
      );
    }
    if (errorFilter !== "__all__") {
      result = result.filter((i) => i.tipo_erro === errorFilter || !i.tipo_erro && errorFilter === "__none__");
    }
    if (tagFilter !== "__all__") {
      result = result.filter(
        (i) => tagFilter === "__none__" ? !i.reason_tag_id : i.reason_tag_id === tagFilter
      );
    }
    return result;
  }, [ignores, q, errorFilter, tagFilter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-[15px] font-semibold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }),
          " Exceções de Auditoria"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12.5px] text-muted-foreground mt-1 max-w-2xl", children: "Achados aqui listados são ocultados nos relatórios de auditoria. Remover uma exceção faz o erro voltar a aparecer na próxima visualização do relatório." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2 w-full sm:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: errorFilter, onValueChange: setErrorFilter, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full sm:w-[220px] h-9 text-[12.5px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filtrar por erro" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__all__", children: "Todos os tipos de erro" }),
            errorOptions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__all__", disabled: true, children: "Nenhum erro disponível" }),
            errorOptions.map((tipo) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: tipo, children: tipo }, tipo))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: tagFilter, onValueChange: setTagFilter, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full sm:w-[220px] h-9 text-[12.5px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filtrar por tag" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__all__", children: "Todas as tags" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__none__", children: "Sem tag" }),
            tags.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__all__", disabled: true, children: "Nenhuma tag disponível" }),
            tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t.id, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ReasonTagChip, { tag: t }),
              " ",
              t.name
            ] }) }, t.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-[260px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: q,
              onChange: (e) => setQ(e.target.value),
              placeholder: "Buscar apólice, tipo ou motivo…",
              className: "pl-8 h-9 text-[12.5px]"
            }
          ),
          q && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setQ(""),
              className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-[11px]", children: "Apólice" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-[11px]", children: "Tipo de erro" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-[11px]", children: "Motivo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-[11px]", children: "Criada em" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-[11px] w-[180px] text-right", children: "Ações" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 5, className: "text-center py-8 text-[12px] text-muted-foreground", children: "Carregando…" }) }),
        !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 5, className: "text-center py-10 text-[12.5px] text-muted-foreground", children: ignores.length === 0 ? "Nenhuma exceção registrada. Use o botão Ignorar no relatório de auditoria para criar uma." : "Nenhuma exceção corresponde à busca." }) }),
        filtered.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-[12px] break-all", children: i.apolice }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-[12.5px]", children: i.tipo_erro ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11.5px]", children: i.tipo_erro }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "Todos os erros" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-[12.5px] max-w-[320px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReasonDisplay, { motivo: i.motivo, tagId: i.reason_tag_id, tags }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-[11.5px] font-mono text-muted-foreground", children: formatDateTime(i.created_at) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right whitespace-nowrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-8 text-[11.5px] gap-1 text-muted-foreground hover:text-foreground",
                onClick: () => setEditing(i),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
                  " Editar motivo"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-8 w-8 p-0 text-muted-foreground hover:text-destructive",
                disabled: remove.isPending,
                onClick: () => {
                  if (confirm(`Remover a exceção da apólice ${i.apolice}?`)) {
                    remove.mutate({ id: i.id });
                  }
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
              }
            )
          ] })
        ] }, i.id))
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      IgnoreReasonDialog,
      {
        open: !!editing,
        onOpenChange: (v) => !v && setEditing(null),
        title: "Editar motivo da exceção",
        confirmLabel: "Salvar motivo",
        targetLabel: editing ? editing.tipo_erro ? `${editing.tipo_erro} · apólice ${editing.apolice}` : `Todos os erros da apólice ${editing.apolice}` : void 0,
        initialMotivo: editing?.motivo ?? "",
        initialTagId: editing?.reason_tag_id ?? null,
        pending: update.isPending,
        onConfirm: ({ motivo, reason_tag_id }) => {
          if (!editing) return;
          update.mutate(
            { id: editing.id, motivo, reason_tag_id },
            { onSuccess: () => setEditing(null) }
          );
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReasonTagsManager, {}) })
  ] });
}
const FIELDS = [
  {
    key: "reincidenciaMaxPct",
    label: "Reincidência máxima",
    desc: "Percentual aceitável de achados que voltam a aparecer (semanal e mensal).",
    suffix: "%",
    min: 0,
    max: 100,
    step: 1
  },
  {
    key: "criticasAbertasMax",
    label: "Ocorrências críticas em aberto",
    desc: "Quantidade tolerada de achados de nível ERRO na última auditoria.",
    suffix: "achados",
    min: 0,
    max: 500,
    step: 1
  },
  {
    key: "picoDesvioPct",
    label: "Desvio máximo vs. média móvel",
    desc: "A partir deste desvio, o volume diário de inconsistências é sinalizado como pico.",
    suffix: "%",
    min: 0,
    max: 300,
    step: 5
  },
  {
    key: "capacidadeContratos",
    label: "Capacidade operacional",
    desc: "Número de contratos ativos que a operação atende com o time atual.",
    suffix: "contratos",
    min: 1,
    max: 1e5,
    step: 1
  },
  {
    key: "crescimentoAnualMinPct",
    label: "Crescimento anual mínimo",
    desc: "Meta de crescimento da carteira em contratos, ano contra ano.",
    suffix: "%",
    min: 0,
    max: 500,
    step: 1
  }
];
function MetasTab() {
  const { targets, update, reset } = useKpiTargets();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 panel bg-surface/60 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "As metas definem o selo de status exibido nos cartões de KPI da auditoria e do analytics. São preferências deste dispositivo e não alteram nenhum dado da operação." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel divide-y divide-border", children: FIELDS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-3.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] font-medium", children: f.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11.5px] text-muted-foreground", children: f.desc })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            value: targets[f.key],
            min: f.min,
            max: f.max,
            step: f.step,
            onChange: (e) => {
              const raw = Number(e.target.value);
              if (!Number.isFinite(raw)) return;
              const next = Math.min(f.max, Math.max(f.min, raw));
              update({ [f.key]: next });
            },
            className: "h-9 w-24 rounded-md border border-border bg-surface-2 px-2 text-right text-[13px] font-mono tabular-nums outline-none focus:border-primary"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-16 text-[11px] text-muted-foreground", children: f.suffix })
      ] })
    ] }, f.key)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => {
          reset();
          toast.success("Metas restauradas para o padrão");
        },
        className: "inline-flex h-9 items-center gap-2 rounded-md border border-border bg-surface px-3 text-[12.5px] transition hover:bg-surface-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
          "Restaurar padrões"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EscalationSection, {})
  ] });
}
function EscalationSection() {
  const { rules, update, reset } = useEscalationRules();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 panel bg-surface/60 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "mt-0.5 h-4 w-4 shrink-0 text-warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] font-medium", children: "Escalonamento de alertas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "Define quando a urgência de um incidente sobe de nível na página de Alertas (baixa → média → alta → crítica) por persistência em auditorias, tempo em aberto ou reabertura." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel divide-y divide-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-3.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] font-medium", children: "Auditorias para escalar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11.5px] text-muted-foreground", children: "A partir deste número de auditorias com o problema em aberto, sobe um nível." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              min: 0,
              max: 50,
              value: rules.auditsToEscalate,
              onChange: (e) => {
                const v = Number(e.target.value);
                if (Number.isFinite(v)) update({ auditsToEscalate: Math.min(50, Math.max(0, v)) });
              },
              className: "h-9 w-24 rounded-md border border-border bg-surface-2 px-2 text-right text-[13px] font-mono tabular-nums outline-none focus:border-primary"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-16 text-[11px] text-muted-foreground", children: "auditorias" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-3.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] font-medium", children: "Dias para escalar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11.5px] text-muted-foreground", children: "A partir deste tempo desde a primeira detecção, sobe um nível." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              min: 0,
              max: 365,
              value: rules.daysToEscalate,
              onChange: (e) => {
                const v = Number(e.target.value);
                if (Number.isFinite(v)) update({ daysToEscalate: Math.min(365, Math.max(0, v)) });
              },
              className: "h-9 w-24 rounded-md border border-border bg-surface-2 px-2 text-right text-[13px] font-mono tabular-nums outline-none focus:border-primary"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-16 text-[11px] text-muted-foreground", children: "dias" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-3.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] font-medium", children: "Escalar em reincidência na apólice" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11.5px] text-muted-foreground", children: "Sobe um nível quando o mesmo tipo de erro já ocorreu em endosso anterior da mesma apólice." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => update({ policyRecurrenceBump: !rules.policyRecurrenceBump }),
            className: `h-9 shrink-0 rounded-md border px-3 text-[12.5px] transition ${rules.policyRecurrenceBump ? "border-primary bg-primary/10 text-primary" : "border-border bg-surface-2 text-muted-foreground"}`,
            children: rules.policyRecurrenceBump ? "Ativado" : "Desativado"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-3.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] font-medium", children: "Escalar em reabertura" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11.5px] text-muted-foreground", children: "Sobe um nível extra quando o problema já foi resolvido e voltou a aparecer." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => update({ reopenedBump: !rules.reopenedBump }),
            className: `h-9 shrink-0 rounded-md border px-3 text-[12.5px] transition ${rules.reopenedBump ? "border-primary bg-primary/10 text-primary" : "border-border bg-surface-2 text-muted-foreground"}`,
            children: rules.reopenedBump ? "Ativado" : "Desativado"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-3.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] font-medium", children: "Urgência máxima automática" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11.5px] text-muted-foreground", children: "Teto que o escalonamento automático pode alcançar." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: rules.maxUrgency,
            onChange: (e) => update({ maxUrgency: e.target.value }),
            className: "h-9 shrink-0 rounded-md border border-border bg-surface-2 px-2 text-[12.5px] outline-none focus:border-primary",
            children: URGENCY_ORDER.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: u, children: URGENCY_LABEL[u] }, u))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => {
          reset();
          toast.success("Regras de escalonamento restauradas");
        },
        className: "inline-flex h-9 items-center gap-2 rounded-md border border-border bg-surface px-3 text-[12.5px] transition hover:bg-surface-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
          "Restaurar escalonamento"
        ]
      }
    )
  ] });
}
const TABS = [{
  id: "perfil",
  label: "Perfil",
  icon: User,
  Component: PerfilTab,
  adminOnly: false
}, {
  id: "metas",
  label: "Metas de KPI",
  icon: Target,
  Component: MetasTab,
  adminOnly: false
}, {
  id: "notificacoes",
  label: "Notificações",
  icon: Bell,
  Component: NotificacoesTab,
  adminOnly: false
}, {
  id: "excecoes",
  label: "Exceções",
  icon: EyeOff,
  Component: ExcecoesTab,
  adminOnly: false
}, {
  id: "integracoes",
  label: "Integrações",
  icon: Plug,
  Component: IntegracoesTab,
  adminOnly: true
}, {
  id: "automacao",
  label: "Automação",
  icon: Clock,
  Component: AutomacaoTab,
  adminOnly: true
}, {
  id: "dados",
  label: "Dados & Retenção",
  icon: Database,
  Component: DadosTab,
  adminOnly: true
}];
function ConfigPage() {
  const {
    data: roleInfo
  } = useCurrentRole();
  const isAdmin = !!roleInfo?.isAdmin;
  const tabs = reactExports.useMemo(() => TABS.filter((t) => !t.adminOnly || isAdmin), [isAdmin]);
  const [active, setActive] = reactExports.useState("perfil");
  const Active = (tabs.find((t) => t.id === active) ?? tabs[0]).Component;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { eyebrow: "Plataforma", title: "Configurações", description: "Preferências do operador, integrações com motores e gestão de dados." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-mx-1 overflow-x-auto px-1 pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "segmented w-max", children: tabs.map((t) => {
      const Icon = t.icon;
      const isActive = active === t.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActive(t.id), className: `inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-md px-3 text-[12.5px] font-medium transition-colors ${isActive ? "bg-surface text-foreground shadow-soft border border-border" : "text-muted-foreground hover:text-foreground hover:bg-surface/60"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
        t.label
      ] }, t.id);
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel p-4 sm:p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Active, {}) })
  ] });
}
export {
  ConfigPage as component
};
