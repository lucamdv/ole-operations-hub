import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { g as useParams, f as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { a as useServerFn, i as createSsrRpc } from "./router-C--tI9WT.mjs";
import { B as Button } from "./button-DxLsNwLg.mjs";
import { I as Input } from "./input-7ljYa1o2.mjs";
import { L as Label } from "./label-w_HgpYX6.mjs";
import { C as Card } from "./card-D8ih621p.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as createServerFn } from "./server-BxlZVXOU.mjs";
import "../_libs/seroval.mjs";
import { o as object, s as string } from "../_libs/zod.mjs";
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
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./audit-run.server-DDaKmDPQ.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-label.mjs";
const lookupInvite = createServerFn({
  method: "POST"
}).inputValidator((input) => object({
  token: string().min(10).max(200)
}).parse(input)).handler(createSsrRpc("47075ae2d3122d99ee03f94b96f765166f1086578505d3336fe9e1bf0dd90afc"));
const consumeInvite = createServerFn({
  method: "POST"
}).inputValidator((input) => object({
  token: string().min(10).max(200),
  full_name: string().min(1).max(120),
  password: string().min(8).max(72)
}).parse(input)).handler(createSsrRpc("cd65356f1b6bb70a3c5ad26f63deb3b26e87f76ccf4c1f418e2f23ef5fb0a78b"));
function InvitePage() {
  const {
    token
  } = useParams({
    from: "/invite/$token"
  });
  const navigate = useNavigate();
  const lookup = useServerFn(lookupInvite);
  const consume = useServerFn(consumeInvite);
  const [state, setState] = reactExports.useState({
    status: "loading"
  });
  const [fullName, setFullName] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirm, setConfirm] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    lookup({
      data: {
        token
      }
    }).then((res) => {
      if (res.valid) setState({
        status: "ready",
        email: res.email,
        role: res.role
      });
      else setState({
        status: "invalid",
        reason: res.reason
      });
    }).catch(() => setState({
      status: "invalid",
      reason: "error"
    }));
  }, [token, lookup]);
  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("As senhas não coincidem");
      return;
    }
    setSubmitting(true);
    try {
      await consume({
        data: {
          token,
          full_name: fullName,
          password
        }
      });
      toast.success("Conta criada! Faça login para continuar.");
      navigate({
        to: "/auth"
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao aceitar convite");
    } finally {
      setSubmitting(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-md p-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[24px] font-semibold tracking-tight", children: "OLÉ COPILOT" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] text-muted-foreground", children: "Aceitar convite" })
    ] }),
    state.status === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-[13px] text-muted-foreground", children: "Validando convite…" }),
    state.status === "invalid" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[14px] text-destructive", children: [
        state.reason === "expired" && "Este convite expirou.",
        state.reason === "used" && "Este convite já foi utilizado.",
        state.reason === "revoked" && "Este convite foi revogado.",
        state.reason === "not_found" && "Convite não encontrado.",
        state.reason === "error" && "Erro ao validar o convite."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => navigate({
        to: "/auth"
      }), children: "Ir para login" })
    ] }),
    state.status === "ready" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-muted/30 border border-border p-3 text-[12px]", children: [
        "Convite para ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: state.email }),
        " · perfil",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: state.role })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "full_name", children: "Nome completo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "full_name", value: fullName, onChange: (e) => setFullName(e.target.value), required: true, maxLength: 120 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Senha" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 8, autoComplete: "new-password" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "confirm", children: "Confirmar senha" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "confirm", type: "password", value: confirm, onChange: (e) => setConfirm(e.target.value), required: true, minLength: 8, autoComplete: "new-password" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: submitting, children: submitting ? "Criando conta…" : "Criar conta" })
    ] })
  ] }) });
}
export {
  InvitePage as component
};
