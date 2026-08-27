import { Q as QueryClientProvider, u as useQuery, a as useQueryClient, b as useMutation, q as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, L as Link } from "../_libs/tanstack__react-router.mjs";
import { V as redirect, I as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-BQqbDqk4.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-BxlZVXOU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BqwiLAOE.mjs";
import { D as DEFAULT_WEBHOOK_MODE, W as WEBHOOK_MODE_KEY } from "./webhook-mode-DKZeQYsl.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { R as Root2, I as Item, H as Header, T as Trigger2, C as Content2 } from "../_libs/radix-ui__react-accordion.mjs";
import { t as translateProposta, p as parseDocumento, n as normalizeEndossoNum, u as unwrapProposta, T as TIPO_PESSOA_LABEL, N as NATUREZA_PREMIO_LABEL } from "./translate-CoDrOLOt.mjs";
import { runPolicySyncImpl } from "./policy-sync-runner.server-qrVcf3rg.mjs";
import { runAuditImpl } from "./audit-run.server-DDaKmDPQ.mjs";
import { A as ArrowLeft, F as FileText, G as GitBranch, C as ChevronDown, a as ChevronRight } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { o as object, a as array, s as string, n as number, b as number$1, r as record, _ as _enum, u as union, c as unknown } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
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
import "./client.server-BIG6Ien0.mjs";
import "./motor-client.server--eqOBXIb.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function useServerFn(serverFn) {
  const router2 = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router2.stores.location.get();
        return router2.navigate(router2.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router2, serverFn]);
}
const appCss = "/assets/styles-CbXvyW36.css";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const ThemeContext = reactExports.createContext(null);
const STORAGE_KEY = "ole-copilot-theme";
function ThemeProvider({ children }) {
  const [theme, setThemeState] = reactExports.useState("light");
  reactExports.useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") {
      setThemeState(stored);
    }
  }, []);
  reactExports.useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const body = document.body;
    if (theme === "dark") {
      root.classList.add("dark");
      body.classList.add("dark");
    } else {
      root.classList.remove("dark");
      body.classList.remove("dark");
    }
  }, [theme]);
  const setTheme = (t) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeContext.Provider, { value: { theme, setTheme, toggle: () => setTheme(theme === "dark" ? "light" : "dark") }, children });
}
function useTheme() {
  const ctx = reactExports.useContext(ThemeContext);
  if (!ctx) return { theme: "light", setTheme: () => {
  }, toggle: () => {
  } };
  return ctx;
}
const SW_URL = "/sw.js";
function isRegistrationAllowed() {
  if (typeof window === "undefined") return false;
  if (!("serviceWorker" in navigator)) return false;
  if (window.self !== window.top) return false;
  if (new URLSearchParams(window.location.search).get("sw") === "off") return false;
  return true;
}
async function unregisterAppServiceWorkers() {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.allSettled(
      registrations.filter((registration) => {
        const scriptURL = registration.active?.scriptURL ?? registration.waiting?.scriptURL ?? registration.installing?.scriptURL ?? "";
        return scriptURL.endsWith(SW_URL);
      }).map((registration) => registration.unregister())
    );
  } catch {
  }
}
function setupPwa({ onNeedRefresh, onOfflineReady }) {
  let stopped = false;
  if (!isRegistrationAllowed()) {
    void unregisterAppServiceWorkers();
    return () => {
      stopped = true;
    };
  }
  void (async () => {
    try {
      const { registerSW } = await import("./virtual_pwa-register-BsSE6A1N.mjs");
      if (stopped) return;
      const updateSW = registerSW({
        immediate: true,
        onNeedRefresh() {
          onNeedRefresh(() => void updateSW(true));
        },
        onOfflineReady() {
          onOfflineReady?.();
        }
      });
    } catch {
    }
  })();
  return () => {
    stopped = true;
  };
}
function PwaUpdatePrompt() {
  reactExports.useEffect(() => {
    return setupPwa({
      onNeedRefresh: (applyUpdate) => {
        toast("Nova versão disponível", {
          description: "Atualize para carregar a versão mais recente do Olé Copilot.",
          duration: Infinity,
          action: {
            label: "Atualizar",
            onClick: () => applyUpdate()
          }
        });
      },
      onOfflineReady: () => {
        toast.success("App pronto para uso offline", {
          description: "O painel já pode ser aberto mesmo sem conexão."
        });
      }
    });
  }, []);
  return null;
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[80px] font-semibold tracking-tight text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[14px] text-muted-foreground", children: "Rota não encontrada no Centro de Comando." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "inline-block mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-[13px] font-medium", children: "Voltar à Visão Geral" })
  ] }) });
}
function ErrorComponent({ error }) {
  reactExports.useEffect(() => {
    console.error(error);
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-destructive/30 bg-destructive/5 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[14px] font-semibold text-destructive", children: "Falha no carregamento" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-muted-foreground mt-1", children: error.message })
  ] }) });
}
const Route$m = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: "Olé Copilot" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "application-name", content: "Olé Copilot" },
      { title: "OLÉ COPILOT — Centro de Comando Operacional" },
      { name: "description", content: "Plataforma de inteligência operacional para emissão de seguros: monitoramento, auditoria e analytics em tempo real." },
      { name: "theme-color", content: "#2C2B7C" },
      { property: "og:title", content: "OLÉ COPILOT — Centro de Comando Operacional" },
      { property: "og:description", content: "Plataforma de inteligência operacional para emissão de seguros: monitoramento, auditoria e analytics em tempo real." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "OLÉ COPILOT — Centro de Comando Operacional" },
      { name: "twitter:description", content: "Plataforma de inteligência operacional para emissão de seguros: monitoramento, auditoria e analytics em tempo real." },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "pt-BR", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("head", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "link",
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$m.useRouteContext();
  const router2 = useRouter();
  reactExports.useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router2.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => data.subscription.unsubscribe();
  }, [router2, queryClient]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PwaUpdatePrompt, {})
  ] });
}
const $$splitComponentImporter$d = () => import("./route-BgXAfFV9.mjs");
const Route$l = createFileRoute()({
  ssr: false,
  beforeLoad: async () => {
    const {
      data,
      error
    } = await supabase.auth.getUser();
    if (error || !data.user) {
      throw redirect({
        to: "/auth"
      });
    }
    return {
      user: data.user
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./auth-CzkiFRov.mjs");
const Route$k = createFileRoute()({
  ssr: false,
  beforeLoad: async () => {
    const {
      data
    } = await supabase.auth.getUser();
    if (data.user) throw redirect({
      to: "/"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./index-BlKcYz99.mjs");
const Route$j = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Visão Geral · OLÉ COPILOT"
    }, {
      name: "description",
      content: "Leitura executiva do resultado mais recente da auditoria OLÉ."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./alertas-7f-bTLNQ.mjs");
const Route$i = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Alertas · OLÉ COPILOT"
    }, {
      name: "description",
      content: "Centro de operações: incidentes abertos com escalonamento de urgência, reincidência e histórico de resolvidos."
    }, {
      property: "og:title",
      content: "Alertas · OLÉ COPILOT"
    }, {
      property: "og:description",
      content: "Incidentes abertos, reincidência por auditoria e histórico de erros resolvidos."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./analytics-CzOXezt4.mjs");
const Route$h = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Analytics · OLÉ COPILOT"
    }, {
      name: "description",
      content: "Inteligência estratégica sobre carteira, runs de auditoria, severidade e eficiência operacional."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./configuracoes-DwUdL-Bc.mjs");
const Route$g = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Configurações · OLÉ COPILOT"
    }, {
      name: "description",
      content: "Preferências da plataforma, integrações e retenção de dados."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const Route$f = createFileRoute()({
  beforeLoad: () => {
    throw redirect({ to: "/apolices", replace: true });
  }
});
const $$splitComponentImporter$7 = () => import("./ferramentas-BFsOu0JM.mjs");
const Route$e = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./operacao-CRwx9CEA.mjs");
const Route$d = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Operação · OLÉ COPILOT"
    }, {
      name: "description",
      content: "Centro de monitoramento operacional em tempo real."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./invite._token-BniEa_GJ.mjs");
const Route$c = createFileRoute()({
  ssr: false,
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const roleSchema = _enum(["admin", "manager", "user"]);
const listUsers = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("ae1d531e1714d053869d1e069815a71e199346ef621d80ab0f46be85080718ab"));
const createUserManual = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  email: string().email().max(255),
  full_name: string().min(1).max(120),
  role: roleSchema,
  password: string().min(8).max(72)
}).parse(input)).handler(createSsrRpc("d968795a9943bb294c68c9bf481d84d3103d5ea1373825cfedc553251779dfb3"));
const updateUser = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  user_id: string().uuid(),
  full_name: string().min(1).max(120).optional(),
  role: roleSchema.optional()
}).parse(input)).handler(createSsrRpc("a0e7b3e2e2d2de9fd51fec8fd9758793248995520c49f064ef6c40d9e3fe4c28"));
const deleteUser = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  user_id: string().uuid()
}).parse(input)).handler(createSsrRpc("5f15d9c6194c3264109b1c81741c60a8654b66a5caffc1ee319315a3a983394e"));
const listInvites = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("3df19b731eca75ae30d6d88b184fd9045b8d6f7107fd063e8d21f5d30835df9f"));
const createInvite = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  email: string().email().max(255),
  role: roleSchema
}).parse(input)).handler(createSsrRpc("8d1f79275fdf5502f58ef20472ac22719103c8a4bf592e74a8c9052e9a9f1968"));
const revokeInvite = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  id: string().uuid()
}).parse(input)).handler(createSsrRpc("f6e9c4c2e2c4e30fff84427a8a716067a15e6e651a76c96191d4c8424389bbab"));
const getCurrentRole = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("580016288dfebc01a7fcef2adc8a992bda2cf72a0b82855829bc8df91918caf4"));
const changeOwnPassword = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  new_password: string().min(8).max(72)
}).parse(input)).handler(createSsrRpc("3af6fcdcfa9f296b18086f5d89f2e72bfd34e3b99e4ea078aa9e85515c957363"));
const $$splitComponentImporter$4 = () => import("./admin.usuarios-D7-U2f2K.mjs");
const Route$b = createFileRoute()({
  beforeLoad: async () => {
    try {
      const r = await getCurrentRole();
      if (!r.isAdmin) throw redirect({
        to: "/"
      });
    } catch (err) {
      throw redirect({
        to: "/"
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./apolices.index-Ca1R1Xyr.mjs");
const Route$a = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Apólices · OLÉ COPILOT"
    }, {
      name: "description",
      content: "Carteira de apólices sincronizada com o MOTOR OLÉ."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./ferramentas.index-B0bSnxLb.mjs");
const Route$9 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Ferramentas · OLÉ COPILOT"
    }, {
      name: "description",
      content: "Conjunto de ferramentas operacionais da plataforma OLÉ — em breve."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./ferramentas.extrator-endossos-D38Nnslp.mjs");
const Route$8 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Extrator de Últimos Endossos · OLÉ COPILOT"
    }, {
      name: "description",
      content: "Extraia o último endosso emitido de cada apólice da carteira e exporte em CSV ou PDF."
    }, {
      property: "og:title",
      content: "Extrator de Últimos Endossos · OLÉ COPILOT"
    }, {
      property: "og:description",
      content: "Último endosso emitido por apólice, com exceções e exportação CSV/PDF."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const runAudit = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(createSsrRpc("60ed4426eb98aa4a457185d910927603318966809acf3b55378b9b508ccb3ab4"));
const getAuditRunStatus = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("e7614179fefb75acc6a9a34d09d606c56c0257d637803a9b4316261251223f90"));
const getLatestAudit = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("097ca56136901e7debca9b17b38bbc47d873e47968b5dcccfa2b680fb0efec60"));
const getAuditHistory = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("e2264778fa5dfb8bf66537c89d22e9033378fe42625743f17b08f1848d61bd43"));
const CallbackPayloadSchema = object({
  run_id: string().uuid().optional(),
  status: string().optional(),
  error: string().optional(),
  error_message: string().optional(),
  data_auditoria: string().optional(),
  resumo: object({
    aprovados: number$1().optional().default(0),
    reprovados: number$1().optional().default(0),
    total_processado: number$1().optional().default(0)
  }).optional(),
  status_geral: string().optional(),
  mensagem_geral: string().optional(),
  apolices_com_erro: array(object({
    apolice: string(),
    total_erros: number().optional().default(0),
    erros: array(object({
      tipo_erro: string(),
      endosso: string().optional().nullable(),
      dataInicio: string().optional().nullable(),
      dataFim: string().optional().nullable()
    }).passthrough()).optional().default([])
  })).optional().default([])
});
const getSystemStatus = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("77a978f9dfdf7346df5d4f12ca8b02bf43c241d4955d569aca6e9e2897f0c25d"));
const CORS$3 = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-callback-secret, x-audit-secret",
  "Access-Control-Max-Age": "86400"
};
function json$3(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS$3 }
  });
}
function parseIso(maybe) {
  if (!maybe) return null;
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(maybe)) {
    const [d2, m, y] = maybe.split("/");
    return `${y}-${m}-${d2}`;
  }
  const d = new Date(maybe);
  return isNaN(+d) ? null : d.toISOString().slice(0, 10);
}
const Route$7 = createFileRoute()({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS$3 }),
      POST: async ({ request }) => {
        const url = new URL(request.url);
        const runIdQS = url.searchParams.get("run_id");
        const expected = process.env.AUDIT_CALLBACK_SECRET;
        const provided = request.headers.get("x-callback-secret") || request.headers.get("x-audit-secret");
        console.log(
          `[audit-callback] hit run_id=${runIdQS ?? "(missing)"} secret_present=${!!provided} secret_match=${!!expected && provided === expected}`
        );
        if (!expected || provided !== expected) {
          return json$3({ error: "Unauthorized" }, 401);
        }
        let raw;
        try {
          raw = await request.json();
        } catch {
          return json$3({ error: "Invalid JSON" }, 400);
        }
        const root = Array.isArray(raw) ? raw[0] : raw;
        const candidate = root && typeof root === "object" && "payload" in root && root.payload && typeof root.payload === "object" ? { ...root.payload, run_id: root.run_id ?? root.payload.run_id } : root;
        const parsed = CallbackPayloadSchema.safeParse(candidate);
        if (!parsed.success) {
          return json$3(
            { error: "Payload inválido", issues: parsed.error.issues },
            400
          );
        }
        const payload = parsed.data;
        const runId = payload.run_id ?? runIdQS ?? void 0;
        if (!runId) {
          return json$3(
            {
              error: "run_id ausente. Inclua run_id no body do POST OU na query string do callback_url (já é enviado automaticamente)."
            },
            400
          );
        }
        const { supabaseAdmin } = await import("./client.server-BIG6Ien0.mjs");
        const { data: existing, error: fetchErr } = await supabaseAdmin.from("audit_runs").select("id, created_at").eq("id", runId).maybeSingle();
        if (fetchErr) return json$3({ error: fetchErr.message }, 500);
        if (!existing) return json$3({ error: "run_id not found" }, 404);
        const startedAt = new Date(
          existing.created_at
        ).getTime();
        const durationMs = Date.now() - startedAt;
        if (payload.status === "error" || payload.error || payload.error_message) {
          let message = payload.error_message ?? payload.error ?? "";
          if (!message) {
            const rawObj = candidate;
            const keys = rawObj && typeof rawObj === "object" ? Object.keys(rawObj).join(", ") : "(payload não-objeto)";
            const preview = JSON.stringify(candidate).slice(0, 300);
            message = `n8n retornou status="error" sem detalhes. Chaves recebidas: [${keys}]. Payload: ${preview}`;
          }
          const webhookUrl = process.env.N8N_AUDIT_WEBHOOK_URL || "";
          const isTestWebhook = webhookUrl.includes("/webhook-test/") || !webhookUrl && true;
          if (isTestWebhook) {
            message += '\n\nDICA: você está usando o webhook de TESTE do n8n (/webhook-test/...). Ele só processa 1 execução por clique em "Listen for test event". Para uso contínuo, ative o workflow e troque para a URL de produção (/webhook/...).';
          }
          console.error("[audit-callback] n8n returned error", { runId, raw: candidate });
          const { error: errUpd } = await supabaseAdmin.from("audit_runs").update({
            status: "error",
            status_geral: "ERRO",
            error_message: message,
            duration_ms: durationMs,
            raw: payload
          }).eq("id", runId);
          if (errUpd) return json$3({ error: errUpd.message }, 500);
          return json$3({ ok: true, run_id: runId, status: "error", duration_ms: durationMs });
        }
        const { error: updErr } = await supabaseAdmin.from("audit_runs").update({
          status: "success",
          data_auditoria: payload.data_auditoria ?? (/* @__PURE__ */ new Date()).toISOString(),
          status_geral: payload.status_geral ?? "SUCESSO",
          mensagem_geral: payload.mensagem_geral ?? null,
          total_processado: payload.resumo?.total_processado ?? 0,
          aprovados: payload.resumo?.aprovados ?? 0,
          reprovados: payload.resumo?.reprovados ?? 0,
          duration_ms: durationMs,
          raw: payload
        }).eq("id", runId);
        if (updErr) return json$3({ error: updErr.message }, 500);
        const findings = payload.apolices_com_erro.flatMap(
          (a) => a.erros.map((e) => {
            const ex = e;
            const endossoVal = e.endosso ?? ex.endosso_com_erro ?? null;
            return {
              run_id: runId,
              apolice: a.apolice,
              tipo_erro: e.tipo_erro,
              endosso: endossoVal,
              data_inicio: parseIso(e.dataInicio ?? ex.data_inicio ?? null),
              data_fim: parseIso(e.dataFim ?? ex.data_fim ?? null),
              detalhes: e
            };
          })
        );
        if (findings.length > 0) {
          const { error: findErr } = await supabaseAdmin.from("audit_findings").insert(findings);
          if (findErr) return json$3({ error: findErr.message }, 500);
        }
        const chaveDe = (f) => `${f.apolice}::${f.tipo_erro}::${f.endosso ?? ""}`;
        const chavesAtuais = new Set(findings.map(chaveDe));
        let reopened = 0;
        if (findings.length > 0) {
          const { data: ativas } = await supabaseAdmin.from("audit_resolutions").select("id, apolice, tipo_erro, endosso").is("reopened_at", null);
          const paraReabrir = (ativas ?? []).filter((r) => chavesAtuais.has(chaveDe(r))).map((r) => r.id);
          if (paraReabrir.length > 0) {
            const { error: reopenErr } = await supabaseAdmin.from("audit_resolutions").update({ reopened_at: (/* @__PURE__ */ new Date()).toISOString() }).in("id", paraReabrir);
            if (reopenErr) {
              console.error("[audit-callback] falha ao reabrir resoluções", reopenErr.message);
            } else {
              reopened = paraReabrir.length;
            }
          }
        }
        let autoResolved = 0;
        try {
          const { data: prevRun } = await supabaseAdmin.from("audit_runs").select("id, created_at").eq("status", "success").neq("id", runId).lt("created_at", existing.created_at).order("created_at", { ascending: false }).limit(1).maybeSingle();
          if (prevRun) {
            const prevId = prevRun.id;
            const [{ data: prevFindings }, { data: ignores }, { data: ativas }] = await Promise.all([
              supabaseAdmin.from("audit_findings").select("apolice, tipo_erro, endosso").eq("run_id", prevId),
              supabaseAdmin.from("audit_ignores").select("apolice, tipo_erro"),
              supabaseAdmin.from("audit_resolutions").select("apolice, tipo_erro, endosso").is("reopened_at", null)
            ]);
            const { buildIgnoreSets, isIgnoredFinding } = await import("./ignore-filter-DcsZLvOm.mjs");
            const { resolutionsAsIgnoreEntries } = await import("./resolution-filter-CnX0EhgU.mjs");
            const ignoreSets = buildIgnoreSets(
              ignores ?? []
            );
            const resolvidasSets = buildIgnoreSets(
              resolutionsAsIgnoreEntries(
                ativas ?? []
              )
            );
            const candidatos = /* @__PURE__ */ new Map();
            for (const f of prevFindings ?? []) {
              const chave = chaveDe(f);
              if (chavesAtuais.has(chave)) continue;
              if (isIgnoredFinding(ignoreSets, f)) continue;
              if (isIgnoredFinding(resolvidasSets, f)) continue;
              candidatos.set(chave, f);
            }
            if (candidatos.size > 0) {
              const apolices = Array.from(new Set(Array.from(candidatos.values()).map((c) => c.apolice)));
              const { data: historico } = await supabaseAdmin.from("audit_findings").select("apolice, tipo_erro, endosso, created_at").in("apolice", apolices);
              const firstSeen = /* @__PURE__ */ new Map();
              for (const h of historico ?? []) {
                const chave = chaveDe(h);
                const atual = firstSeen.get(chave);
                if (!atual || h.created_at < atual) firstSeen.set(chave, h.created_at);
              }
              const resolvedAt = (/* @__PURE__ */ new Date()).toISOString();
              const linhas = Array.from(candidatos.entries()).map(([chave, c]) => ({
                apolice: c.apolice,
                tipo_erro: c.tipo_erro,
                endosso: c.endosso,
                run_id: runId,
                first_seen_at: firstSeen.get(chave) ?? null,
                resolved_at: resolvedAt,
                resolved_by: null,
                origem: "auto",
                motivo: "Resolvido automaticamente: ausente na auditoria seguinte"
              }));
              const { error: autoErr } = await supabaseAdmin.from("audit_resolutions").insert(linhas);
              if (autoErr) {
                console.error("[audit-callback] falha ao registrar resoluções automáticas", autoErr.message);
              } else {
                autoResolved = linhas.length;
              }
            }
          }
        } catch (e) {
          console.error("[audit-callback] erro na resolução automática", e);
        }
        return json$3({
          ok: true,
          run_id: runId,
          findings: findings.length,
          reopened_resolutions: reopened,
          auto_resolutions: autoResolved,
          duration_ms: durationMs
        });
      }
    }
  }
});
const CORS$2 = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-callback-secret",
  "Access-Control-Max-Age": "86400"
};
function json$2(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS$2 }
  });
}
const ItemSchema = object({
  numero_apolice: string().min(6).max(60).optional(),
  documento: string().min(6).max(60).optional(),
  numero_documento: string().min(6).max(60).optional(),
  numero_endosso: union([string(), number()]).nullish(),
  numero_parcela: union([string(), number()]).optional(),
  id_parcela: union([string(), number()]).nullish(),
  numero_proposta: union([string(), number()]).nullish(),
  status_pagamento: string().max(40).nullish(),
  situacao_emissao: string().max(40).nullish(),
  data_vencimento: string().max(40).nullish(),
  data_quitacao: string().max(60).nullish()
}).passthrough();
const PayloadSchema = array(ItemSchema).max(2e4);
const ENVELOPE_KEYS = [
  "atualizacoes",
  "dados",
  "cobrancas",
  "billing",
  "items",
  "data",
  "results"
];
function flattenItems(value) {
  if (Array.isArray(value)) return value.flatMap(flattenItems);
  if (!value || typeof value !== "object") return [value];
  const obj = value;
  const envelope = ENVELOPE_KEYS.find((key) => Array.isArray(obj[key]));
  return envelope ? flattenItems(obj[envelope]) : [obj];
}
function valueFrom(item, keys) {
  for (const key of keys) {
    const value = item[key];
    if (value !== void 0 && value !== null && String(value).trim() !== "") return value;
  }
  return null;
}
function identityText(value) {
  if (value === void 0 || value === null) return null;
  const normalized = String(value).trim().replace(/\s+/g, " ").slice(0, 120);
  return normalized || null;
}
function toDateOnly(v) {
  if (typeof v !== "string" || !v.trim()) return null;
  const s = v.trim();
  const br = /^(\d{2})\/(\d{2})\/(\d{4})/.exec(s);
  if (br) return `${br[3]}-${br[2]}-${br[1]}`;
  const iso = /^(\d{4}-\d{2}-\d{2})/.exec(s);
  return iso ? iso[1] : null;
}
function toTimestamp(v) {
  if (typeof v !== "string" || !v.trim()) return null;
  const d = toDateOnly(v);
  if (/^\d{4}-\d{2}-\d{2}T/.test(v.trim())) return v.trim();
  return d ? `${d}T00:00:00Z` : null;
}
async function handleBillingSyncCallback({ request }, trustedInternalCall = false) {
  const acceptedSecrets = [
    process.env.BILLING_CALLBACK_SECRET,
    process.env.AUDIT_CALLBACK_SECRET
  ].filter((value) => !!value);
  const provided = request.headers.get("x-callback-secret");
  if (!trustedInternalCall && (!provided || !acceptedSecrets.includes(provided))) {
    return json$2({ error: "Unauthorized" }, 401);
  }
  const runId = new URL(request.url).searchParams.get("run_id");
  if (!runId) return json$2({ error: "run_id obrigatório" }, 400);
  let raw;
  try {
    raw = await request.json();
  } catch {
    return json$2({ error: "Invalid JSON" }, 400);
  }
  const candidate = flattenItems(raw);
  const parsed = PayloadSchema.safeParse(candidate);
  if (!parsed.success) {
    const { markSyncLeg: markSyncLeg2 } = await import("./sync-legs.server-PAjmTRrt.mjs");
    await markSyncLeg2(runId, "cobrancas", {
      status: "error",
      total: 0,
      errorMessage: "Cobranças: payload inválido"
    });
    return json$2({ error: "Payload inválido", issues: parsed.error.issues }, 400);
  }
  const byKey = /* @__PURE__ */ new Map();
  const invalidItems = [];
  for (const [index, item] of parsed.data.entries()) {
    const docRaw = item.numero_apolice ?? item.documento ?? item.numero_documento;
    if (!docRaw) {
      invalidItems.push({ index, reason: "documento ausente" });
      continue;
    }
    const digits = String(docRaw).replace(/\D/g, "");
    if (digits.length < 12) {
      invalidItems.push({ index, reason: "documento inválido" });
      continue;
    }
    const seq = item.numero_endosso != null ? String(item.numero_endosso).replace(/\D/g, "").slice(-6).padStart(6, "0") : digits.slice(-6);
    const apolice = digits.slice(0, -6) + "000000";
    const rawItem = item;
    const parcelaRaw = valueFrom(rawItem, [
      "numero_parcela",
      "parcela",
      "sequencial_parcela",
      "numeroParcela",
      "parcela_numero"
    ]);
    const idParcela = identityText(
      valueFrom(rawItem, ["id_parcela", "parcela_id", "idParcela", "codigo_parcela"])
    );
    const numeroProposta = identityText(item.numero_proposta);
    const dataVencimento = toDateOnly(item.data_vencimento);
    const numeroParcela = identityText(parcelaRaw) ?? idParcela ?? (numeroProposta && dataVencimento ? `${numeroProposta}@${dataVencimento}` : null);
    if (!numeroParcela) {
      invalidItems.push({ index, reason: "identidade da parcela ausente" });
      continue;
    }
    const row = {
      numero_apolice: apolice,
      numero_endosso: seq,
      numero_parcela: numeroParcela,
      id_parcela_seguradora: idParcela,
      numero_proposta: numeroProposta,
      status_pagamento: (item.status_pagamento ?? "").trim() || "Aberta",
      situacao_emissao: (item.situacao_emissao ?? "").trim() || "Ativa",
      data_vencimento: dataVencimento,
      data_quitacao: toTimestamp(item.data_quitacao),
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    byKey.set(`${apolice}#${seq}#${numeroParcela}`, row);
  }
  const rows = [...byKey.values()];
  const { markSyncLeg } = await import("./sync-legs.server-PAjmTRrt.mjs");
  if (invalidItems.length > 0) {
    await markSyncLeg(runId, "cobrancas", {
      status: "error",
      total: 0,
      errorMessage: `Cobranças: ${invalidItems.length} parcela(s) sem identidade válida`
    });
    return json$2(
      {
        error: "Existem parcelas sem documento ou identidade válida",
        received: parsed.data.length,
        invalid: invalidItems.slice(0, 50)
      },
      400
    );
  }
  if (rows.length === 0) {
    await markSyncLeg(runId, "cobrancas", { status: "success", total: 0 });
    return json$2({ ok: true, upserted: 0 });
  }
  const { supabaseAdmin } = await import("./client.server-BIG6Ien0.mjs");
  let upserted = 0;
  for (let i = 0; i < rows.length; i += 500) {
    const chunk = rows.slice(i, i + 500);
    const { error } = await supabaseAdmin.from("policy_billing").upsert(chunk, {
      onConflict: "numero_apolice,numero_endosso,numero_parcela"
    });
    if (error) {
      console.error("[billing-sync-callback] upsert falhou", error.message);
      await markSyncLeg(runId, "cobrancas", {
        status: "error",
        total: upserted,
        errorMessage: `Cobranças: ${error.message}`
      });
      return json$2({ error: error.message, upserted }, 500);
    }
    upserted += chunk.length;
  }
  await markSyncLeg(runId, "cobrancas", { status: "success", total: upserted });
  return json$2({ ok: true, received: parsed.data.length, upserted });
}
async function persistBillingSyncPayload(runId, payload) {
  const response = await handleBillingSyncCallback(
    {
      request: new Request(
        `https://internal.invalid/api/public/billing-sync-callback?run_id=${encodeURIComponent(runId)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      )
    },
    true
  );
  const body = await response.json();
  if (!response.ok) {
    throw new Error(String(body.error ?? "Falha ao persistir cobranças."));
  }
  return body;
}
const Route$6 = createFileRoute()({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS$2 }),
      POST: (context) => handleBillingSyncCallback(context)
    }
  }
});
const billingSyncCallback = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Route: Route$6,
  persistBillingSyncPayload
}, Symbol.toStringTag, { value: "Module" }));
const CORS$1 = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-callback-secret",
  "Access-Control-Max-Age": "86400"
};
function json$1(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS$1 }
  });
}
function pick(row, keys) {
  const lower = new Map(Object.keys(row).map((k) => [k.toLowerCase(), k]));
  for (const k of keys) {
    const real = lower.get(k.toLowerCase());
    if (real !== void 0 && row[real] !== void 0 && row[real] !== null) return row[real];
  }
  return void 0;
}
function toRows(raw) {
  if (Array.isArray(raw)) {
    if (raw.length === 1 && raw[0] && typeof raw[0] === "object" && !Array.isArray(raw[0])) {
      const inner = toRowsFromObject(raw[0]);
      if (inner) return inner;
    }
    return raw.filter((r) => r && typeof r === "object");
  }
  if (raw && typeof raw === "object") {
    const inner = toRowsFromObject(raw);
    if (inner) return inner;
    return [raw];
  }
  return [];
}
function toRowsFromObject(obj) {
  for (const key of ["payload", "data", "items", "results", "apolices", "policies"]) {
    const v = obj[key];
    if (Array.isArray(v)) return v.filter((r) => r && typeof r === "object");
  }
  return null;
}
const Route$5 = createFileRoute()({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS$1 }),
      POST: async ({ request }) => {
        const url = new URL(request.url);
        const runId = url.searchParams.get("run_id");
        const expected = process.env.ENDORSEMENT_CALLBACK_SECRET;
        const provided = request.headers.get("x-callback-secret");
        if (!expected || provided !== expected) return json$1({ error: "Unauthorized" }, 401);
        if (!runId) return json$1({ error: "run_id ausente" }, 400);
        let raw;
        try {
          raw = await request.json();
        } catch {
          return json$1({ error: "Invalid JSON" }, 400);
        }
        const { supabaseAdmin } = await import("./client.server-BIG6Ien0.mjs");
        const { data: runRow } = await supabaseAdmin.from("endorsement_extraction_runs").select("id, created_at").eq("id", runId).maybeSingle();
        if (!runRow) return json$1({ error: "Execução não encontrada" }, 404);
        const rows = toRows(raw);
        const items = rows.map((r) => {
          const policy = pick(r, [
            "PolicyNumber",
            "policy_number",
            "policynumber",
            "NumeroApolice",
            "numero_apolice",
            "apolice"
          ]);
          const last = pick(r, [
            "last_sequencial_endosso_used",
            "lastSequencialEndossoUsed",
            "last_endosso",
            "ultimo_endosso",
            "numero_endosso_atual"
          ]);
          if (policy === void 0) return null;
          const parsed = last === void 0 || last === "" ? null : Number.parseInt(String(last), 10);
          return {
            run_id: runId,
            policy_number: String(policy).trim(),
            last_sequencial_endosso_used: Number.isFinite(parsed) ? parsed : null
          };
        }).filter(Boolean);
        if (items.length === 0) {
          await supabaseAdmin.from("endorsement_extraction_runs").update({
            status: "error",
            error_message: "Callback recebido sem apólices válidas.",
            raw,
            finished_at: (/* @__PURE__ */ new Date()).toISOString()
          }).eq("id", runId);
          return json$1({ error: "Nenhuma apólice válida no payload" }, 422);
        }
        await supabaseAdmin.from("endorsement_extraction_items").delete().eq("run_id", runId);
        for (let i = 0; i < items.length; i += 500) {
          const chunk = items.slice(i, i + 500);
          const { error } = await supabaseAdmin.from("endorsement_extraction_items").insert(chunk);
          if (error) {
            await supabaseAdmin.from("endorsement_extraction_runs").update({
              status: "error",
              error_message: error.message,
              finished_at: (/* @__PURE__ */ new Date()).toISOString()
            }).eq("id", runId);
            return json$1({ error: error.message }, 500);
          }
        }
        const startedAt = new Date(runRow.created_at).getTime();
        await supabaseAdmin.from("endorsement_extraction_runs").update({
          status: "success",
          total_apolices: items.length,
          duration_ms: Date.now() - startedAt,
          raw,
          error_message: null,
          finished_at: (/* @__PURE__ */ new Date()).toISOString()
        }).eq("id", runId);
        return json$1({ ok: true, received: items.length });
      }
    }
  }
});
const runPolicySync = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(createSsrRpc("d24a1a6b7e09d2230a60b2df6c008165f4356d0f35bd1187b69b6f8435c2e078"));
const getPolicySyncStatus = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("02c3d98da6d80297359f488e59a79764e3d341df6491900d2df0b54828e1ec2c"));
const cancelPolicySync = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("4d5438db24682c887085adb79ba4662b976890060e2506e2a2df9fb8dc39b5c9"));
const getLatestPolicySync = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("3cf3a8225e68a7cd91e4189257483d894072a472d8d0019b7542475b4926b87d"));
const getPolicies = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("1adc1e24bae9e0fed111d42b606bc4eb7d4cfcaffb55df4ebb15e7560bf46198"));
const getPolicyByNumero = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("aed61386c5e36442776a0ae2522751e02dcfc7f66ca220d3ac36f26165ec388f"));
const getEndorsement = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("028bd1610a9773a0a5256e5aee96ebb394a2cbc5778d95eb56042873b882f4e9"));
const PolicySyncCallbackSchema = object({
  origem: string().optional(),
  total_apolices: number$1().optional(),
  total_endossos_novos: number$1().optional(),
  dados: array(record(string(), unknown())).optional().default([])
});
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-callback-secret",
  "Access-Control-Max-Age": "86400"
};
function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS }
  });
}
const isPlainObject = (value) => !!value && typeof value === "object" && !Array.isArray(value);
const hasMeaningfulValue = (value) => value !== void 0 && value !== null && value !== "";
const DOCUMENT_ONLY_ROOT_FIELDS = /* @__PURE__ */ new Set([
  "datas",
  "data_emissao",
  "motivo_endosso",
  "descricao_motivo_endosso",
  "tipo_cancelamento",
  "numero_endosso_cancelado",
  "numero_documento_seguradora",
  "numero_endosso_seguradora",
  "numero_apolice_seguradora",
  "numero_proposta_seguradora",
  "id_proposta_origem"
]);
function arrayIdentity(item, field) {
  if (!isPlainObject(item)) return null;
  const candidates = {
    partes: [
      item.id_pessoa,
      item.id_pessoa_origem,
      item.numero_documento,
      item.nome_pessoa && item.papel_parte ? `${item.papel_parte}:${item.nome_pessoa}` : null
    ],
    itens: [item.numero_item, item.id_item, item.id_item_origem],
    coberturas: [item.codigo_cobertura, item.id_cobertura, item.nome_cobertura],
    parcelas: [item.numero_parcela, item.id_parcela]
  };
  for (const value of candidates[field] ?? []) {
    if (hasMeaningfulValue(value)) return String(value);
  }
  return null;
}
function mergeArray(base, incoming, field, path) {
  if (incoming.length === 0) return base;
  const supportsEntityMerge = ["partes", "itens", "coberturas", "parcelas"].includes(field);
  if (!supportsEntityMerge) return incoming;
  const result = [...base];
  const positions = /* @__PURE__ */ new Map();
  result.forEach((item, index) => {
    const id = arrayIdentity(item, field);
    if (id) positions.set(id, index);
  });
  for (const incomingItem of incoming) {
    const id = arrayIdentity(incomingItem, field);
    if (!id) {
      result.push(incomingItem);
      continue;
    }
    const position = positions.get(id);
    if (position === void 0) {
      positions.set(id, result.length);
      result.push(incomingItem);
      continue;
    }
    result[position] = mergeCanonicalValue(result[position], incomingItem, [
      ...path,
      `${field}[${id}]`
    ]);
  }
  return result;
}
function mergeCanonicalValue(base, incoming, path = []) {
  if (!hasMeaningfulValue(incoming)) return base;
  if (Array.isArray(incoming)) {
    const baseArray = Array.isArray(base) ? base : [];
    const field = path[path.length - 1] ?? "";
    return mergeArray(baseArray, incoming, field, path.slice(0, -1));
  }
  if (isPlainObject(incoming)) {
    const result = isPlainObject(base) ? { ...base } : {};
    const isRoot = path.length === 0;
    for (const [key, value] of Object.entries(incoming)) {
      if (isRoot && DOCUMENT_ONLY_ROOT_FIELDS.has(key)) continue;
      if (isRoot && key === "pagamento" && !isPlainObject(value)) continue;
      result[key] = mergeCanonicalValue(result[key], value, [...path, key]);
    }
    return result;
  }
  return incoming;
}
async function handlePolicySyncCallback({ request }, trustedInternalCall = false) {
  const reqUrl = new URL(request.url);
  const runIdQS = reqUrl.searchParams.get("run_id");
  const expected = process.env.AUDIT_CALLBACK_SECRET;
  const provided = request.headers.get("x-callback-secret");
  if (!trustedInternalCall && (!expected || provided !== expected)) {
    return json({ error: "Unauthorized" }, 401);
  }
  let raw;
  try {
    raw = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  const unwrap = (v) => {
    if (!v || typeof v !== "object" || Array.isArray(v)) return v;
    if (v.payload && typeof v.payload === "object") return unwrap(v.payload);
    if (v.body && typeof v.body === "object") return unwrap(v.body);
    if (v.json && typeof v.json === "object") return unwrap(v.json);
    return v;
  };
  let candidate = unwrap(raw);
  if (Array.isArray(candidate)) {
    candidate = { dados: candidate };
  } else if (candidate && typeof candidate === "object") {
    const obj = candidate;
    if (!Array.isArray(obj.dados)) {
      const altKey = ["apolices", "policies", "items", "data", "results"].find(
        (k) => Array.isArray(obj[k])
      );
      if (altKey) {
        obj.dados = obj[altKey];
      } else if (obj.numero_apolice_seguradora || obj.historico_endossos) {
        candidate = { dados: [obj] };
      }
    }
  }
  const parsed = PolicySyncCallbackSchema.safeParse(candidate);
  if (!parsed.success) {
    const { supabaseAdmin: sa } = await import("./client.server-BIG6Ien0.mjs");
    const runIdEarly = runIdQS;
    if (runIdEarly) {
      await sa.from("policy_sync_runs").update({
        status: "error",
        emissoes_status: "error",
        emissoes_finished_at: (/* @__PURE__ */ new Date()).toISOString(),
        error_message: "Payload inválido: " + JSON.stringify(parsed.error.issues).slice(0, 500),
        raw: raw ?? {},
        finished_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", runIdEarly);
    }
    return json({ error: "Payload inválido", issues: parsed.error.issues }, 400);
  }
  const payload = parsed.data;
  const runId = runIdQS;
  if (!runId) {
    return json({ error: "run_id ausente na query string do callback_url" }, 400);
  }
  const { supabaseAdmin } = await import("./client.server-BIG6Ien0.mjs");
  const { data: existing, error: fetchErr } = await supabaseAdmin.from("policy_sync_runs").select("id, created_at").eq("id", runId).maybeSingle();
  if (fetchErr) return json({ error: fetchErr.message }, 500);
  if (!existing) return json({ error: "run_id not found" }, 404);
  const startedAt = new Date(existing.created_at).getTime();
  const durationMs = Date.now() - startedAt;
  const { normalizeEndossoNum: normalizeEndossoNum2, unwrapProposta: unwrapProposta2 } = await import("./translate-CoDrOLOt.mjs").then((n) => n.a);
  const pickNum = (o) => {
    const v = o?.numero_apolice_seguradora ?? o?.numero_apolice ?? o?.numeroApolice ?? void 0;
    return v === void 0 || v === null ? void 0 : String(v);
  };
  const pickEnd = (o) => {
    const direct = o?.numero_endosso_seguradora ?? o?.numero_endosso ?? o?.numeroEndosso ?? null;
    if (direct !== void 0 && direct !== null && String(direct).trim() !== "") {
      return String(direct);
    }
    const fullDocument = o?.numero_documento_seguradora ?? o?.numero_documento ?? o?.numeroDocumento ?? null;
    if (fullDocument !== void 0 && fullDocument !== null) {
      const digits = String(fullDocument).replace(/\D/g, "");
      if (digits.length >= 6) return digits.slice(-6);
    }
    const parsedProposal = unwrapProposta2(o?.proposta ?? o);
    if (parsedProposal.numeroDocumento) {
      const digits = parsedProposal.numeroDocumento.replace(/\D/g, "");
      if (digits.length >= 6) return digits.slice(-6);
    }
    return null;
  };
  const flat = [];
  for (const item of payload.dados) {
    const apoliceNum = pickNum(item);
    if (!apoliceNum) continue;
    const historico = Array.isArray(item.historico_endossos) ? (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      item.historico_endossos
    ) : null;
    if (historico) {
      for (const [index, e] of historico.entries()) {
        const endRaw2 = pickEnd(e);
        const num2 = normalizeEndossoNum2(endRaw2 ?? String(index));
        const isBase = num2 === "000000";
        const proposta = isBase ? {
          ...e.proposta ?? {},
          data_emissao: item.data_emissao ?? e.proposta?.data_emissao
        } : e.proposta ?? {};
        flat.push({
          apolice: pickNum(e) ?? apoliceNum,
          num: num2,
          seq: parseInt(num2, 10) || 0,
          premio: Number(e.premio_liquido ?? 0) || 0,
          proposta
        });
      }
      continue;
    }
    const endRaw = pickEnd(item);
    if (endRaw === null) continue;
    const num = normalizeEndossoNum2(endRaw);
    flat.push({
      apolice: apoliceNum,
      num,
      seq: parseInt(num, 10) || 0,
      premio: Number(item.premio_liquido ?? 0) || 0,
      proposta: item.proposta ?? {}
    });
  }
  const byPolicy = /* @__PURE__ */ new Map();
  for (const e of flat) {
    let m = byPolicy.get(e.apolice);
    if (!m) {
      m = /* @__PURE__ */ new Map();
      byPolicy.set(e.apolice, m);
    }
    m.set(e.num, e);
  }
  let processed = 0;
  let insertedEndos = 0;
  for (const [numero, endoMap] of byPolicy) {
    const endos = [...endoMap.values()].sort((a, b) => a.seq - b.seq);
    const top = endos[endos.length - 1];
    const { data: existingPolicy } = await supabaseAdmin.from("policies").select("id, numero_endosso_atual, proposta").eq("numero_apolice", numero).maybeSingle();
    const existingRow = existingPolicy;
    const existingSeq = existingRow?.numero_endosso_atual ? parseInt(existingRow.numero_endosso_atual.replace(/\D/g, ""), 10) || 0 : -1;
    const isNewer = top.seq >= existingSeq;
    const endossoAtualFinal = isNewer ? top.num : existingRow?.numero_endosso_atual ?? top.num;
    const baseDocument = endos.find((e) => e.num === "000000");
    const baseProposal = baseDocument ? unwrapProposta2(baseDocument.proposta ?? {}).proposta : existingRow?.proposta ?? {};
    let canonicalProposal = { ...baseProposal ?? {} };
    for (const endorsement of endos) {
      if (endorsement.num === "000000") continue;
      const endorsementProposal = unwrapProposta2(endorsement.proposta ?? {}).proposta;
      canonicalProposal = mergeCanonicalValue(canonicalProposal, endorsementProposal);
    }
    const patch = {
      numero_apolice: numero,
      numero_endosso_atual: endossoAtualFinal,
      last_sync_run_id: runId,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    if (isNewer) {
      patch.premio_liquido = top.premio;
      patch.proposta = canonicalProposal ?? {};
    }
    const { data: up, error: upErr } = await supabaseAdmin.from("policies").upsert(patch, { onConflict: "numero_apolice" }).select("id").single();
    if (upErr || !up) {
      console.error("[policy-sync-callback] upsert policy falhou", numero, upErr);
      continue;
    }
    const policyId = up.id;
    const rows = endos.map((e) => ({
      policy_id: policyId,
      numero_apolice: numero,
      numero_endosso: e.num,
      premio_liquido: e.premio,
      proposta: e.proposta ?? {},
      ordem: e.seq
    }));
    const { error: endErr } = await supabaseAdmin.from("endorsements").upsert(rows, {
      onConflict: "policy_id,numero_endosso",
      ignoreDuplicates: false
    });
    if (endErr) {
      console.error("[policy-sync-callback] upsert endorsements", endErr);
      continue;
    }
    const { data: allEndos } = await supabaseAdmin.from("endorsements").select("numero_endosso").eq("policy_id", policyId);
    const maxSeq = (allEndos ?? []).reduce((max, r) => {
      const n = parseInt(String(r.numero_endosso).replace(/\D/g, ""), 10);
      return Number.isFinite(n) && n > max ? n : max;
    }, -1);
    if (maxSeq >= 0) {
      const canonical = String(maxSeq).padStart(6, "0");
      if (canonical !== endossoAtualFinal) {
        await supabaseAdmin.from("policies").update({ numero_endosso_atual: canonical }).eq("id", policyId);
      }
    }
    insertedEndos += rows.length;
    processed++;
  }
  const { error: updErr } = await supabaseAdmin.from("policy_sync_runs").update({
    total_apolices: processed,
    duration_ms: durationMs,
    raw: payload
  }).eq("id", runId);
  if (updErr) return json({ error: updErr.message }, 500);
  const { markSyncLeg } = await import("./sync-legs.server-PAjmTRrt.mjs");
  await markSyncLeg(runId, "emissoes", { status: "success", total: processed });
  return json({
    ok: true,
    run_id: runId,
    processed,
    endorsements: insertedEndos,
    duration_ms: durationMs
  });
}
async function persistPolicySyncPayload(runId, payload) {
  const response = await handlePolicySyncCallback(
    {
      request: new Request(
        `https://internal.invalid/api/public/policy-sync-callback?run_id=${encodeURIComponent(runId)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      )
    },
    true
  );
  const body = await response.json();
  if (!response.ok) {
    throw new Error(String(body.error ?? "Falha ao persistir apólices e endossos."));
  }
  return body;
}
const Route$4 = createFileRoute()({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      POST: (context) => handlePolicySyncCallback(context)
    }
  }
});
const policySyncCallback = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Route: Route$4,
  persistPolicySyncPayload
}, Symbol.toStringTag, { value: "Module" }));
const listeners = /* @__PURE__ */ new Set();
function read() {
  if (typeof window === "undefined") return DEFAULT_WEBHOOK_MODE;
  const raw = localStorage.getItem(WEBHOOK_MODE_KEY);
  return raw === "test" || raw === "production" ? raw : DEFAULT_WEBHOOK_MODE;
}
function useWebhookMode() {
  const [mode, setMode] = reactExports.useState(DEFAULT_WEBHOOK_MODE);
  reactExports.useEffect(() => {
    setMode(read());
    const l = (m) => setMode(m);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  const update = reactExports.useCallback((next) => {
    localStorage.setItem(WEBHOOK_MODE_KEY, next);
    listeners.forEach((l) => l(next));
  }, []);
  return { mode, setMode: update, isProduction: mode === "production" };
}
const policiesQuery = queryOptions({
  queryKey: ["policies", "list"],
  queryFn: () => getPolicies(),
  staleTime: 3e4
});
const latestPolicySyncQuery = queryOptions({
  queryKey: ["policies", "latest-sync"],
  queryFn: () => getLatestPolicySync(),
  staleTime: 3e4
});
function usePolicies() {
  return useQuery(policiesQuery);
}
function useLatestPolicySync() {
  return useQuery(latestPolicySyncQuery);
}
function usePolicy(numero) {
  return useQuery({
    queryKey: ["policies", "detail", numero],
    queryFn: () => getPolicyByNumero({ data: { numero } }),
    enabled: !!numero,
    staleTime: 3e4
  });
}
function useEndorsementDetail(numero, endosso) {
  return useQuery({
    queryKey: ["policies", "endorsement", numero, endosso],
    queryFn: () => getEndorsement({ data: { numero, endosso } }),
    enabled: !!numero && !!endosso,
    staleTime: 3e4
  });
}
function resolvedLegStatus(runStatus, legStatus) {
  if (legStatus && legStatus !== "running") return legStatus;
  if (runStatus === "success" || runStatus === "error" || runStatus === "cancelled") {
    return runStatus;
  }
  return "running";
}
function useRunPolicySync() {
  const qc = useQueryClient();
  const fireFn = useServerFn(runPolicySync);
  const { mode } = useWebhookMode();
  const statusFn = useServerFn(getPolicySyncStatus);
  const cancelFn = useServerFn(cancelPolicySync);
  const latestFn = useServerFn(getLatestPolicySync);
  const [activeRunId, setActiveRunId] = reactExports.useState(null);
  const [isPolling, setIsPolling] = reactExports.useState(false);
  const [isCheckingSync, setIsCheckingSync] = reactExports.useState(true);
  const [emissoes, setEmissoes] = reactExports.useState(null);
  const [cobrancas, setCobrancas] = reactExports.useState(null);
  const pollTimer = reactExports.useRef(null);
  const hydrationVersion = reactExports.useRef(0);
  reactExports.useEffect(
    () => () => {
      if (pollTimer.current) clearTimeout(pollTimer.current);
    },
    []
  );
  const stopPolling = () => {
    if (pollTimer.current) {
      clearTimeout(pollTimer.current);
      pollTimer.current = null;
    }
    setIsPolling(false);
    setActiveRunId(null);
  };
  const pollOnce = async (runId) => {
    try {
      const row = await statusFn({ data: { runId } });
      if (row) {
        setEmissoes(resolvedLegStatus(row.status, row.emissoes_status));
        setCobrancas(resolvedLegStatus(row.status, row.cobrancas_status));
      }
      if (row?.status === "cancelled") {
        stopPolling();
        return;
      }
      if (row?.status === "success") {
        toast.success("Carteira sincronizada", {
          description: `${row.total_apolices} apólices atualizadas · ${row.cobrancas_total ?? 0} cobranças.`
        });
        qc.invalidateQueries({ queryKey: ["policies"] });
        qc.invalidateQueries({ queryKey: ["billing"] });
        stopPolling();
        return;
      }
      if (row?.status === "error") {
        toast.error("Falha na sincronização", {
          description: row.error_message ?? "Erro desconhecido.",
          duration: 3e4
        });
        qc.invalidateQueries({ queryKey: ["policies"] });
        qc.invalidateQueries({ queryKey: ["billing"] });
        stopPolling();
        return;
      }
    } catch (err) {
      console.error("[poll] erro consultando status:", err);
    }
    pollTimer.current = setTimeout(() => pollOnce(runId), 3e3);
  };
  reactExports.useEffect(() => {
    const version = ++hydrationVersion.current;
    setIsCheckingSync(true);
    void latestFn().then((row) => {
      if (hydrationVersion.current !== version) return;
      if (!row) {
        setEmissoes(null);
        setCobrancas(null);
        return;
      }
      setEmissoes(resolvedLegStatus(row.status, row.emissoes_status));
      setCobrancas(resolvedLegStatus(row.status, row.cobrancas_status));
      if (row.status === "running") {
        setActiveRunId(row.id);
        setIsPolling(true);
        pollTimer.current = setTimeout(() => pollOnce(row.id), 0);
      }
    }).catch((error) => {
      console.error("[policy-sync] falha ao recuperar execução ativa", error);
    }).finally(() => {
      if (hydrationVersion.current === version) setIsCheckingSync(false);
    });
    return () => {
      hydrationVersion.current = version + 1;
    };
  }, []);
  const mutation = useMutation({
    mutationFn: () => fireFn({ data: { mode } }),
    onMutate: () => {
      setEmissoes("running");
      setCobrancas("running");
    },
    onSuccess: ({ runId, reused }) => {
      setActiveRunId(runId);
      setIsPolling(true);
      setEmissoes("running");
      setCobrancas("running");
      toast.info(reused ? "Sincronização já em andamento" : "Sincronização iniciada", {
        description: "Consultando as APIs da Excelsior…"
      });
      pollTimer.current = setTimeout(() => pollOnce(runId), reused ? 0 : 1e3);
    },
    onError: (err) => {
      setEmissoes("error");
      setCobrancas("error");
      toast.error("Falha ao disparar sincronização", { description: err.message });
    }
  });
  const cancelMutation = useMutation({
    mutationFn: async () => {
      if (!activeRunId) return { ok: true };
      return cancelFn({ data: { runId: activeRunId } });
    },
    onSuccess: () => {
      setEmissoes("cancelled");
      setCobrancas("cancelled");
      stopPolling();
      toast.warning("Sincronização cancelada");
    },
    onError: (err) => {
      toast.error("Não foi possível cancelar", { description: err.message });
    }
  });
  return {
    ...mutation,
    isRunning: mutation.isPending || isPolling,
    isCheckingSync,
    activeRunId,
    emissoes,
    cobrancas,
    cancel: () => cancelMutation.mutate(),
    isCancelling: cancelMutation.isPending
  };
}
const getPolicyBilling = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("253595f411443d4ca128c67aed97d33b1d74a5771d47d7d425490c6944b254da"));
const getBillingIndex = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("b5e47136d01b651000c46dba30ebd939155f11ed50994990d028faf809d1d976"));
const TAG_STYLES = {
  PAGO: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/40",
  PARCIAL: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/40",
  ABERTA: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/40",
  CANCELADA: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/40"
};
function norm(v) {
  return (v ?? "").trim().toLowerCase();
}
function billingTag(statusPagamento, situacaoEmissao) {
  const st = norm(statusPagamento);
  if (st.startsWith("total")) return "PAGO";
  if (st.startsWith("parcial")) return "PARCIAL";
  if (norm(situacaoEmissao).startsWith("cancel")) return "CANCELADA";
  return "ABERTA";
}
function billingTagInfo(statusPagamento, situacaoEmissao) {
  const tag = billingTag(statusPagamento, situacaoEmissao);
  return { tag, label: tag, className: TAG_STYLES[tag] };
}
function billingTagClass(tag) {
  return TAG_STYLES[tag];
}
function sequence(value) {
  return parseInt(String(value).replace(/\D/g, ""), 10) || 0;
}
function currentBilling(rows) {
  if (!rows || rows.length === 0) return null;
  const latestEndorsement = Math.max(...rows.map((row) => sequence(row.numero_endosso)));
  const latestRows = rows.filter((row) => sequence(row.numero_endosso) === latestEndorsement);
  const open = latestRows.find(
    (row) => norm(row.status_pagamento).startsWith("abert") && norm(row.situacao_emissao).startsWith("ativ")
  );
  if (open) return open;
  const partial = latestRows.find((row) => norm(row.status_pagamento).startsWith("parcial"));
  if (partial) return partial;
  return latestRows.reduce(
    (acc, row) => sequence(row.numero_parcela ?? "") > sequence(acc.numero_parcela ?? "") ? row : acc
  );
}
function normalizeBillingEndosso(numero) {
  const digits = String(numero).replace(/\D/g, "");
  return digits.slice(-6).padStart(6, "0");
}
const billingIndexQuery = queryOptions({
  queryKey: ["billing", "index"],
  queryFn: () => getBillingIndex(),
  staleTime: 6e4
});
function usePolicyBilling(numero) {
  const query = useQuery({
    queryKey: ["billing", "policy", numero],
    queryFn: () => getPolicyBilling({ data: { numero } }),
    enabled: !!numero,
    staleTime: 6e4
  });
  const rows = reactExports.useMemo(() => {
    const list = query.data ?? [];
    return [...list].sort((a, b) => {
      const endorsement = (parseInt(a.numero_endosso.replace(/\D/g, ""), 10) || 0) - (parseInt(b.numero_endosso.replace(/\D/g, ""), 10) || 0);
      if (endorsement !== 0) return endorsement;
      return (parseInt(a.numero_parcela.replace(/\D/g, ""), 10) || 0) - (parseInt(b.numero_parcela.replace(/\D/g, ""), 10) || 0);
    });
  }, [query.data]);
  const vigente = reactExports.useMemo(() => currentBilling(rows), [rows]);
  return { ...query, rows, vigente };
}
function useEndorsementBilling(numero, endosso) {
  const { rows, isLoading } = usePolicyBilling(numero);
  const seq = endosso ? normalizeBillingEndosso(endosso) : null;
  const record2 = reactExports.useMemo(() => {
    if (!seq) return null;
    return currentBilling(rows.filter((r) => normalizeBillingEndosso(r.numero_endosso) === seq));
  }, [rows, seq]);
  return { record: record2, isLoading };
}
function useBillingTagMap() {
  const query = useQuery(billingIndexQuery);
  const { map, infoMap } = reactExports.useMemo(() => {
    const byPolicy = /* @__PURE__ */ new Map();
    for (const r of query.data ?? []) {
      const list = byPolicy.get(r.numero_apolice);
      if (list) list.push(r);
      else byPolicy.set(r.numero_apolice, [r]);
    }
    const out = /* @__PURE__ */ new Map();
    const info = /* @__PURE__ */ new Map();
    for (const [ap, list] of byPolicy) {
      const cur = currentBilling(list);
      if (!cur) continue;
      const tag = billingTag(cur.status_pagamento, cur.situacao_emissao);
      out.set(ap, tag);
      info.set(ap, {
        tag,
        situacaoEmissao: cur.situacao_emissao ?? "",
        statusPagamento: cur.status_pagamento ?? "",
        dataVencimento: cur.data_vencimento,
        dataQuitacao: cur.data_quitacao
      });
    }
    return { map: out, infoMap: info };
  }, [query.data]);
  return { map, infoMap, isLoading: query.isLoading };
}
const formatUSD = (n, opts = {}) => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
  ...opts
}).format(n);
const formatCompact = (n) => new Intl.NumberFormat("pt-BR", { notation: "compact", maximumFractionDigits: 1 }).format(n);
const formatInt = (n) => new Intl.NumberFormat("pt-BR").format(n);
const formatPct = (n, digits = 1) => `${n.toFixed(digits)}%`;
const formatDate = (iso) => new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(new Date(iso));
const formatDateTime = (iso) => new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(iso));
const relativeTime = (iso) => {
  const diff = Date.now() - +new Date(iso);
  const m = Math.floor(diff / 6e4);
  if (m < 1) return "agora";
  if (m < 60) return `há ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `há ${h}h`;
  const d = Math.floor(h / 24);
  return `há ${d}d`;
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function JsonExplorer({ data, omitKeys = [], title, defaultDepth = 1 }) {
  const filtered = reactExports.useMemo(() => {
    if (!data || typeof data !== "object" || Array.isArray(data)) return data;
    const obj = data;
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      if (omitKeys.includes(k)) continue;
      if (v === null || v === void 0 || v === "") continue;
      out[k] = v;
    }
    return out;
  }, [data, omitKeys]);
  const isEmpty = !filtered || typeof filtered === "object" && !Array.isArray(filtered) && Object.keys(filtered).length === 0;
  if (isEmpty) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel", children: [
    title && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2.5 border-b border-border/60 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] font-semibold tracking-tight", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground uppercase", children: "campos adicionais" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 font-mono text-[12px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Node, { value: filtered, depth: 0, defaultDepth }) })
  ] });
}
function Node({
  value,
  label,
  depth,
  defaultDepth
}) {
  const [open, setOpen] = reactExports.useState(depth < defaultDepth);
  if (value === null || value === void 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { label, text: "—", muted: true });
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { label, text: "[]", muted: true });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collapsible,
      {
        label,
        summary: `[${value.length} itens]`,
        open,
        onToggle: () => setOpen(!open),
        children: value.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Node, { label: `[${i}]`, value: v, depth: depth + 1, defaultDepth }, i))
      }
    );
  }
  if (typeof value === "object") {
    const entries = Object.entries(value).filter(
      ([, v]) => v !== null && v !== void 0 && v !== ""
    );
    if (entries.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { label, text: "{}", muted: true });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collapsible,
      {
        label,
        summary: `{${entries.length} campos}`,
        open,
        onToggle: () => setOpen(!open),
        children: entries.map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx(Node, { label: k, value: v, depth: depth + 1, defaultDepth }, k))
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { label, text: String(value) });
}
function Leaf({ label, text, muted }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2 py-0.5 pl-5", children: [
    label && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground shrink-0", children: [
      label,
      ":"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("break-all", muted ? "text-muted-foreground/60" : "text-foreground"), children: text })
  ] });
}
function Collapsible({
  label,
  summary,
  open,
  onToggle,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: onToggle,
        className: "flex items-center gap-1 text-left hover:text-foreground transition w-full",
        children: [
          open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" }),
          label && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            label,
            ":"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/70", children: summary })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-3 border-l border-border/40 pl-2", children })
  ] });
}
const Accordion = Root2;
const AccordionItem = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger2,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = Trigger2.displayName;
const AccordionContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = Content2.displayName;
const BILLING_TAGS = ["PAGO", "PARCIAL", "ABERTA", "CANCELADA"];
const SITUACOES = ["Ativa", "Cancelada"];
function matchSituacao(situacao, filter) {
  if (filter === "todas") return true;
  const s = (situacao ?? "").trim().toLowerCase();
  return filter === "Cancelada" ? s.startsWith("cancel") : !s.startsWith("cancel");
}
function BillingFilters({
  tags,
  onToggleTag,
  onClearTags,
  situacao,
  onSituacao,
  sort,
  onSort,
  sortOptions,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex flex-wrap items-center gap-2", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onClearTags,
          className: cn(
            "inline-flex items-center rounded-md border px-2 py-1 font-mono text-[10.5px] font-semibold transition",
            tags.length === 0 ? "border-primary/40 bg-primary/10 text-primary" : "border-border bg-surface text-muted-foreground hover:text-foreground"
          ),
          children: "TODOS"
        }
      ),
      BILLING_TAGS.map((t) => {
        const active = tags.includes(t);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onToggleTag(t),
            className: cn(
              "inline-flex items-center rounded-md border px-2 py-1 font-mono text-[10.5px] font-semibold transition",
              active ? billingTagClass(t) : "border-border bg-surface text-muted-foreground hover:text-foreground"
            ),
            children: t
          },
          t
        );
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-1.5 text-[11px] text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase tracking-wider", children: "Emissão" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: situacao,
          onChange: (e) => onSituacao(e.target.value),
          className: "h-8 rounded-md border border-border bg-surface px-2 text-[11.5px] text-foreground outline-none focus:border-primary/40",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "todas", children: "Todas" }),
            SITUACOES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
          ]
        }
      )
    ] }),
    sortOptions && onSort && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-1.5 text-[11px] text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase tracking-wider", children: "Ordenar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          value: sort,
          onChange: (e) => onSort(e.target.value),
          className: "h-8 rounded-md border border-border bg-surface px-2 text-[11.5px] text-foreground outline-none focus:border-primary/40",
          children: sortOptions.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, children: o.label }, o.value))
        }
      )
    ] })
  ] });
}
function fmtDate(iso) {
  if (!iso) return "—";
  try {
    return formatDateTime(iso);
  } catch {
    return iso;
  }
}
function fmtNum(n, moeda = "BRL") {
  if (n === null || n === void 0) return "—";
  const opts = {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4
  };
  try {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: moeda,
      ...opts
    }).format(n);
  } catch {
    return `${moeda} ${n.toLocaleString("pt-BR", opts)}`;
  }
}
function fmtCPFCNPJ(tipo, valor) {
  const v = valor.replace(/\D/g, "");
  if (tipo === "CPF" && v.length === 11)
    return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9)}`;
  if (tipo === "CNPJ" && v.length === 14)
    return `${v.slice(0, 2)}.${v.slice(2, 5)}.${v.slice(5, 8)}/${v.slice(8, 12)}-${v.slice(12)}`;
  return valor;
}
function fmtCEP(v) {
  if (!v) return null;
  const d = v.replace(/\D/g, "");
  if (d.length !== 8) return v;
  return `${d.slice(0, 5)}-${d.slice(5)}`;
}
function Field({
  label,
  value,
  mono = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("text-[13px] text-foreground", mono && "font-mono text-[12.5px]"), children: value === null || value === void 0 || value === "" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) : value })
  ] });
}
function Section({
  title,
  subtitle,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[14px] font-semibold", children: title }),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: subtitle })
    ] }),
    children
  ] });
}
function badgeStylesFor(tipo, tipoEndosso) {
  if (tipo === "APOLICE") {
    return {
      label: "APÓLICE",
      className: "bg-primary/10 text-primary border-primary/30"
    };
  }
  switch (tipoEndosso) {
    case "A":
      return {
        label: "ENDOSSO A",
        className: "bg-warning/10 text-warning border-warning/30"
      };
    case "B":
      return {
        label: "ENDOSSO B",
        className: "bg-accent/15 text-accent-foreground border-accent/40"
      };
    case "C":
      return {
        label: "ENDOSSO C",
        className: "bg-destructive/10 text-destructive border-destructive/30"
      };
    default:
      return {
        label: "ENDOSSO",
        className: "bg-muted text-muted-foreground border-border"
      };
  }
}
function EndossoBadge({
  tipo,
  tipoEndosso,
  sequencial,
  size = "md"
}) {
  const { label, className } = badgeStylesFor(tipo, tipoEndosso);
  const sizeCls = size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-[10.5px]";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center rounded-md font-mono font-semibold border whitespace-nowrap",
        sizeCls,
        className
      ),
      children: [
        label,
        sequencial && tipo === "ENDOSSO" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 opacity-70", children: [
          "· ",
          sequencial
        ] })
      ]
    }
  );
}
function DocumentoHeader({
  documento,
  premioValor,
  premioMoeda,
  seguradoNome,
  badge,
  extra
}) {
  const isApolice = documento.tipo === "APOLICE";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: -4 },
      animate: { opacity: 1, y: 0 },
      className: "panel bg-gradient-surface p-5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-6 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EndossoBadge,
                {
                  tipo: documento.tipo,
                  tipoEndosso: documento.tipoEndosso,
                  sequencial: isApolice ? void 0 : documento.sequencial
                }
              ),
              badge,
              !isApolice && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground", children: [
                "da apólice ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: documento.numeroApolice })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[18px] sm:text-[22px] font-semibold tracking-tight break-all", children: documento.numeroCompleto }),
            seguradoNome && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[13px] text-muted-foreground mt-1", children: [
              "Segurado: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: seguradoNome })
            ] })
          ] }),
          premioValor !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] uppercase tracking-wider text-muted-foreground", children: "Prêmio total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[18px] sm:text-[22px] font-semibold text-foreground font-mono", children: fmtNum(premioValor ?? 0, premioMoeda ?? "BRL") })
          ] })
        ] }),
        extra && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: extra })
      ]
    }
  );
}
const MOTIVO_ENDOSSO_LABEL = {
  ERRO_EMISSAO: "Erro de emissão",
  AJUSTE: "Ajuste",
  FATURA: "Fatura",
  INADIMPLENCIA: "Inadimplência",
  CANCELAMENTO: "Cancelamento",
  ALTERACAO: "Alteração",
  INCLUSAO: "Inclusão",
  EXCLUSAO: "Exclusão",
  RENOVACAO: "Renovação",
  COBRANCA: "Cobrança",
  SUBSTITUICAO: "Substituição",
  REATIVACAO: "Reativação"
};
function motivoTone(codigo) {
  switch (codigo) {
    case "ERRO_EMISSAO":
    case "INADIMPLENCIA":
      return "bg-destructive/10 text-destructive border-destructive/30";
    case "CANCELAMENTO":
    case "EXCLUSAO":
    case "FATURA":
      return "bg-warning/10 text-warning border-warning/30";
    case "AJUSTE":
    case "ALTERACAO":
    case "SUBSTITUICAO":
      return "bg-primary/10 text-primary border-primary/30";
    default:
      return "bg-surface-2 text-foreground border-border";
  }
}
function MotivoEndossoCard({ motivo }) {
  const label = motivo.codigo ? MOTIVO_ENDOSSO_LABEL[motivo.codigo] ?? motivo.codigo.replace(/_/g, " ") : "Não informado";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3 border-b border-border bg-surface-2/50 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold", children: "Motivo da emissão" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "inline-flex items-center rounded-md border px-2.5 py-1 text-[12px] font-semibold",
              motivoTone(motivo.codigo)
            ),
            children: label
          }
        ),
        motivo.codigo && /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "rounded bg-surface-2 border border-border px-2 py-0.5 text-[11px] font-mono text-muted-foreground", children: motivo.codigo }),
        motivo.tipoCancelamento && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-md border border-border bg-surface-2 px-2 py-0.5 text-[11px] font-mono text-muted-foreground", children: motivo.tipoCancelamento })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Endosso afetado", value: motivo.numeroEndossoCancelado, mono: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Pagamento", value: motivo.pagamento })
      ] }),
      motivo.descricao && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] uppercase tracking-wider text-muted-foreground mb-1.5", children: "Descrição do motivo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] leading-relaxed text-foreground whitespace-pre-wrap border-l-2 border-primary/40 pl-3", children: motivo.descricao })
      ] })
    ] })
  ] });
}
function CancelamentoCard({
  cancelamento,
  tipoEndosso
}) {
  const titulo = tipoEndosso === "C" ? "Dados do cancelamento" : tipoEndosso === "B" ? "Dados da alteração" : "Dados do endosso";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3 border-b border-border bg-surface-2/50 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold", children: titulo }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 grid sm:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Endosso afetado", value: cancelamento.numeroEndossoCancelado, mono: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Motivo", value: cancelamento.motivo }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Pagamento", value: cancelamento.pagamento }),
      cancelamento.descricaoMotivo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] uppercase tracking-wider text-muted-foreground mb-1.5", children: "Descrição" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] leading-relaxed text-foreground whitespace-pre-wrap", children: cancelamento.descricaoMotivo })
      ] })
    ] })
  ] });
}
function DadosGeraisCard({ dados }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel p-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nº proposta seguradora", value: dados.numeroPropostaSeguradora, mono: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Proposta origem", value: dados.idPropostaOrigem, mono: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Produto", value: dados.idProduto, mono: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Field,
      {
        label: "SUSEP (grupo / ramo)",
        value: dados.grupoSusep ? `${dados.grupoSusep} / ${dados.ramoSusep ?? "—"}` : null,
        mono: true
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Sistema origem", value: dados.sistemaOrigem }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Subscritor", value: dados.subscritor }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Field,
      {
        label: "Resultado subscrição",
        value: dados.resultadoSubscricao && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "px-1.5 py-0.5 rounded text-[11px] font-mono",
              dados.resultadoSubscricao === "APROVADA" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            ),
            children: dados.resultadoSubscricao
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tipo apólice", value: dados.tipoApolice, mono: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Field,
      {
        label: "Emissão condicionada ao pagamento",
        value: dados.emissaoCondicionadaPagamento === null ? null : dados.emissaoCondicionadaPagamento ? "Sim" : "Não"
      }
    ),
    dados.condicoesGerais.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2 lg:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Field,
      {
        label: "Condições gerais",
        value: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: dados.condicoesGerais.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "font-mono text-[10.5px] bg-muted/50 px-1.5 py-0.5 rounded",
            children: c
          },
          c
        )) })
      }
    ) })
  ] });
}
function DatasCard({ datas }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel p-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Início da vigência", value: fmtDate(datas.inicioVigencia), mono: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Fim da vigência", value: fmtDate(datas.fimVigencia), mono: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Data de emissão", value: fmtDate(datas.dataEmissao), mono: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Assinatura", value: fmtDate(datas.assinatura), mono: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Conclusão subscrição", value: fmtDate(datas.conclusaoSubscricao), mono: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Registro origem", value: fmtDate(datas.registroOrigem), mono: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Protocolo origem", value: fmtDate(datas.protocoloOrigem), mono: true })
  ] });
}
function PartesList({ partes }) {
  if (partes.length === 0)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel p-5 text-[12px] text-muted-foreground", children: "Nenhuma parte registrada." });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "multiple", className: "divide-y divide-border", children: partes.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AccordionItem,
    {
      value: p.id,
      className: "border-b-0 px-4 first:pt-0 last:pb-0",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "hover:no-underline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10.5px] px-1.5 py-0.5 rounded bg-primary/10 text-primary shrink-0", children: [
            p.papel,
            " / ",
            p.tipo
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-medium truncate", children: p.nome })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionContent, { className: "pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                label: "Tipo pessoa",
                value: p.tipoPessoa ? TIPO_PESSOA_LABEL[p.tipoPessoa] ?? p.tipoPessoa : null
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nacionalidade", value: p.nacionalidade, mono: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                label: p.tipoPessoa === "JURIDICA" ? "Fundação" : "Nascimento",
                value: fmtDate(p.dataNascimentoFundacao),
                mono: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Exposição política", value: p.exposicaoPolitica })
          ] }),
          p.documentos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] uppercase tracking-wider text-muted-foreground mb-1.5", children: "Documentos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: p.documentos.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-2 border border-border font-mono text-[11px]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: d.tipo }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: fmtCPFCNPJ(d.tipo, d.valor) })
                ]
              },
              i
            )) })
          ] }),
          p.contatos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] uppercase tracking-wider text-muted-foreground mb-1.5", children: "Contatos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-2", children: p.contatos.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between gap-2 px-3 py-2 rounded-md bg-surface-2 border border-border text-[12px]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-mono text-[10.5px]", children: c.tipo }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground truncate", children: c.valor })
                ]
              },
              i
            )) })
          ] }),
          p.enderecos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] uppercase tracking-wider text-muted-foreground mb-1.5", children: "Endereços" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: p.enderecos.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-md bg-surface-2 border border-border p-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-[12px]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tipo", value: e.tipo }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Field,
                    {
                      label: "Logradouro",
                      value: [e.logradouro, e.numero].filter(Boolean).join(", ") || null
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Complemento", value: e.complemento }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Bairro", value: e.bairro }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Field,
                    {
                      label: "Cidade / UF",
                      value: e.cidade ? `${e.cidade}${e.estado ? ` / ${e.estado}` : ""}` : null
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "CEP", value: fmtCEP(e.cep), mono: true })
                ]
              },
              i
            )) })
          ] })
        ] })
      ]
    },
    p.id
  )) }) });
}
function CoberturaCard({ c }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-surface-2/40 p-4 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13.5px] font-semibold text-foreground", children: c.nome }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[10.5px] text-muted-foreground mt-0.5", children: [
          c.codigo,
          " · SUSEP ",
          c.grupoSusep,
          "/",
          c.ramoSusep
        ] })
      ] }),
      c.processoSusep && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] bg-muted/40 px-1.5 py-0.5 rounded text-muted-foreground", children: [
        "Processo ",
        c.processoSusep
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-[12px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Início", value: fmtDate(c.inicioVigencia), mono: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Fim", value: fmtDate(c.fimVigencia), mono: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Abrangência", value: c.abrangenciaGeografica })
    ] }),
    c.limites.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] uppercase tracking-wider text-muted-foreground mb-1.5", children: "Limites" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-2", children: c.limites.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rounded-md bg-background border border-border p-3 flex items-center justify-between text-[12px]",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[10.5px] text-muted-foreground", children: [
              l.tipoLimite,
              " · ",
              l.tipoObrigacao
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-foreground mt-0.5", children: fmtNum(l.valor, l.moeda ?? "BRL") })
          ] })
        },
        i
      )) })
    ] }),
    c.beneficiarios.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] uppercase tracking-wider text-muted-foreground mb-1.5", children: "Beneficiários" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: c.beneficiarios.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between gap-2 px-3 py-1.5 rounded-md bg-background border border-border text-[12px]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: b.parentesco ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10.5px] text-muted-foreground truncate", children: b.id })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[12px] text-primary", children: b.participacao !== null ? `${b.participacao.toFixed(2)}%` : "—" })
          ]
        },
        b.id
      )) })
    ] }),
    c.composicaoPremio.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] uppercase tracking-wider text-muted-foreground mb-1.5", children: "Composição do prêmio" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-md border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data-table text-[11.5px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/30 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-medium px-2 py-1.5", children: "Natureza" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-medium px-2 py-1.5", children: "Tipo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right font-medium px-2 py-1.5", children: "Valor" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: c.composicaoPremio.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5", children: NATUREZA_PREMIO_LABEL[l.natureza] ?? l.natureza }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 font-mono text-muted-foreground", children: l.tipo }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 text-right font-mono", children: fmtNum(l.valor, l.moeda) })
        ] }, i)) })
      ] }) })
    ] })
  ] });
}
function ItensCoberturas({ itens }) {
  if (itens.length === 0)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel p-5 text-[12px] text-muted-foreground", children: "Nenhum item segurado." });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: itens.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel p-5 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[13.5px] font-semibold", children: [
        "Item #",
        it.numero ?? i + 1,
        " · ",
        it.tipoObjeto ?? "Objeto"
      ] }),
      it.classeRisco && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground mt-0.5", children: [
        "Classe de risco: ",
        it.classeRisco
      ] })
    ] }) }),
    it.dadosItem && Object.keys(it.dadosItem).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md bg-surface-2/60 border border-border p-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3", children: Object.entries(it.dadosItem).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Field,
      {
        label: k.replace(/_/g, " "),
        value: typeof v === "boolean" ? v ? "Sim" : "Não" : String(v ?? "—")
      },
      k
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: it.coberturas.map((c, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(CoberturaCard, { c }, j)) })
  ] }, i)) });
}
function PagamentoCard({ pagamento }) {
  if (pagamento.parcelas.length === 0)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel p-5 text-[12px] text-muted-foreground", children: "Sem parcelas registradas." });
  const moeda = pagamento.parcelas.find((p) => p.moeda)?.moeda ?? "BRL";
  const totalMoeda = pagamento.parcelas.reduce((acc, p) => acc + (p.valor ?? 0), 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data-table text-[12px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-surface-2/60 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-medium px-3 py-2", children: "#" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-medium px-3 py-2", children: "Vencimento" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-medium px-3 py-2", children: "Agente" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right font-medium px-3 py-2", children: "Valor" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
      pagamento.parcelas.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-mono", children: p.numero ?? i + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-mono", children: fmtDate(p.vencimento) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-mono text-muted-foreground", children: p.agenteCobrador ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right font-mono", children: fmtNum(p.valor, p.moeda ?? "BRL") })
      ] }, i)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border bg-surface-2/40 font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 3, className: "px-3 py-2 text-right", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right font-mono", children: fmtNum(totalMoeda, moeda) })
      ] })
    ] })
  ] }) });
}
function CotacaoCard({ cotacoes }) {
  if (cotacoes.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel p-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: cotacoes.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] uppercase tracking-wider text-muted-foreground", children: c.moeda }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[14px] text-foreground", children: [
      "1 ",
      c.moeda,
      " = R$ ",
      c.taxaCambio.toLocaleString("pt-BR", { minimumFractionDigits: 4 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10.5px] text-muted-foreground", children: [
      fmtDate(c.dataCotacao),
      " · ",
      c.identificador ?? "—"
    ] })
  ] }, i)) });
}
function LimiteApoliceCard({ limite }) {
  if (!limite) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel p-5 flex items-center justify-between gap-4 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] uppercase tracking-wider text-muted-foreground", children: "Limite máximo da apólice" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[20px] font-semibold font-mono mt-1", children: fmtNum(limite.valor, limite.moeda ?? "BRL") })
  ] }) });
}
function EndossoSemDadosAviso({ numeroApolice }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-warning/40 bg-warning/5 p-5 text-[12.5px] text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold mb-1", children: "Endosso sem corpo completo" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
      "Este endosso do MOTOR OLÉ contém apenas o delta (geralmente novas datas). Para enxergar partes, itens e composição de prêmio, consulte a apólice mãe",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: numeroApolice }),
      "."
    ] })
  ] });
}
function BillingBadge({
  statusPagamento,
  situacaoEmissao,
  size = "md"
}) {
  const { label, className } = billingTagInfo(statusPagamento, situacaoEmissao);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center rounded-md font-mono font-semibold border whitespace-nowrap",
        size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-[10.5px]",
        className
      ),
      children: label
    }
  );
}
function fmtDateOnly(v) {
  if (!v) return "—";
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(v);
  if (m) return `${m[3]}/${m[2]}/${m[1]}`;
  return fmtDate(v);
}
function statusPagamentoLabel(v) {
  const s = (v ?? "").trim().toLowerCase();
  if (s.startsWith("total")) return "Total (quitado)";
  if (s.startsWith("parcial")) return "Parcial";
  if (s.startsWith("abert")) return "Aberta";
  return v ?? "—";
}
function CobrancaCard({
  record: record2,
  titulo = "Cobrança"
}) {
  if (!record2) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel p-5 text-[12.5px] text-muted-foreground", children: "Sem dados de cobrança para este documento." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 border-b border-border bg-surface-2/50 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold", children: titulo }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BillingBadge,
        {
          statusPagamento: record2.status_pagamento,
          situacaoEmissao: record2.situacao_emissao
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Status do pagamento", value: statusPagamentoLabel(record2.status_pagamento) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Situação da emissão", value: record2.situacao_emissao || "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nº da proposta", value: record2.numero_proposta ?? "—", mono: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Parcela", value: record2.numero_parcela, mono: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Vencimento", value: fmtDateOnly(record2.data_vencimento), mono: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Quitação", value: fmtDate(record2.data_quitacao), mono: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Endosso", value: record2.numero_endosso, mono: true })
    ] })
  ] });
}
function CobrancasList({ rows: allRows }) {
  const [tags, setTags] = reactExports.useState([]);
  const [situacao, setSituacao] = reactExports.useState("todas");
  const rows = allRows.filter((r) => {
    const tag = billingTagInfo(r.status_pagamento, r.situacao_emissao).tag;
    if (tags.length > 0 && !tags.includes(tag)) return false;
    return matchSituacao(r.situacao_emissao, situacao);
  });
  if (allRows.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel p-5 text-[12.5px] text-muted-foreground", children: "Nenhuma cobrança registrada para esta apólice." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-border bg-surface-2/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      BillingFilters,
      {
        tags,
        onToggleTag: (t) => setTags((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]),
        onClearTags: () => setTags([]),
        situacao,
        onSituacao: setSituacao
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 px-4 py-2.5 text-[10.5px] uppercase tracking-wider text-muted-foreground bg-surface-2/60 border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2", children: "Endosso" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1", children: "Parcela" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2", children: "Proposta" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2", children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-right", children: "Vencimento" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3 text-right", children: "Quitação" })
    ] }),
    rows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-8 text-center text-[12px] text-muted-foreground", children: "Nenhuma cobrança corresponde aos filtros." }),
    rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-12 items-center px-4 py-2.5 border-b border-border/40 last:border-0 text-[12px]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 font-mono text-muted-foreground", children: r.numero_endosso }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1 font-mono text-muted-foreground", children: r.numero_parcela }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 font-mono text-[11.5px] text-muted-foreground truncate", children: r.numero_proposta ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            BillingBadge,
            {
              statusPagamento: r.status_pagamento,
              situacaoEmissao: r.situacao_emissao,
              size: "sm"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-right font-mono text-[11.5px]", children: fmtDateOnly(r.data_vencimento) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3 text-right font-mono text-[11.5px]", children: fmtDate(r.data_quitacao) })
        ]
      },
      `${r.numero_apolice}-${r.numero_endosso}-${r.numero_parcela}`
    ))
  ] });
}
const Route$3 = createFileRoute()({
  head: ({ params }) => ({
    meta: [
      { title: `${params.id} · Apólice · OLÉ COPILOT` },
      { name: "description", content: `Detalhe da apólice ${params.id}.` }
    ]
  }),
  component: ApoliceDetail
});
function ApoliceDetail() {
  const { id } = Route$3.useParams();
  const { data: policy, isLoading } = usePolicy(id);
  const { rows: cobrancas, vigente: cobrancaVigente } = usePolicyBilling(id);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-subtitle", children: "Carregando apólice…" });
  }
  if (!policy) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/apolices",
          className: "inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
            " Voltar à carteira"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel p-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-8 w-8 mx-auto text-muted-foreground/50 mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] font-medium", children: "Apólice não encontrada" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11.5px] text-muted-foreground mt-1", children: "Esta apólice não está na carteira sincronizada." })
      ] })
    ] });
  }
  const proposta = policy.proposta ?? {};
  const t = translateProposta(proposta);
  const documento = parseDocumento(policy.numero_apolice, t.tipoEndosso);
  const seguradoNome = t.partes.find((p) => p.papel === "SEGURADO")?.nome ?? null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/apolices",
        className: "inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
          " Voltar à carteira"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DocumentoHeader,
      {
        documento,
        premioValor: policy.premio_liquido,
        premioMoeda: policy.premio_moeda,
        seguradoNome,
        badge: cobrancaVigente ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          BillingBadge,
          {
            statusPagamento: cobrancaVigente.status_pagamento,
            situacaoEmissao: cobrancaVigente.situacao_emissao
          }
        ) : null,
        extra: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-px bg-border/60 rounded-xl overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            HeaderFact,
            {
              label: "Vigência",
              value: t.datas.inicioVigencia && t.datas.fimVigencia ? `${formatDateTime(t.datas.inicioVigencia)} → ${formatDateTime(t.datas.fimVigencia)}` : "—"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(HeaderFact, { label: "Endossos", value: String(policy.endorsements.length) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            HeaderFact,
            {
              label: "Produto",
              value: t.dadosGerais.idProduto ?? "—",
              mono: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            HeaderFact,
            {
              label: "Sincronizada",
              value: relativeTime(policy.last_sync_at ?? policy.updated_at),
              hint: formatDateTime(policy.last_sync_at ?? policy.updated_at)
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Section,
      {
        title: "Cobrança",
        subtitle: cobrancaVigente ? "Situação financeira vigente da apólice e histórico por endosso" : "Sem dados de cobrança para esta apólice",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CobrancaCard, { record: cobrancaVigente, titulo: "Cobrança vigente" }),
          cobrancas.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(CobrancasList, { rows: cobrancas })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Dados gerais", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DadosGeraisCard, { dados: t.dadosGerais }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Datas", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DatasCard, { datas: t.datas }) }),
    t.limiteApolice && /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Limite & Cotação", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LimiteApoliceCard, { limite: t.limiteApolice }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CotacaoCard, { cotacoes: t.cotacoes })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Partes", subtitle: `${t.partes.length} envolvidos`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PartesList, { partes: t.partes }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Section,
      {
        title: "Itens & coberturas",
        subtitle: `${t.itens.length} item(ns) · ${t.itens.reduce((a, i) => a + i.coberturas.length, 0)} cobertura(s)`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItensCoberturas, { itens: t.itens })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Pagamento", subtitle: `${t.pagamento.parcelas.length} parcela(s)`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PagamentoCard, { pagamento: t.pagamento }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Endossos", subtitle: `${policy.endorsements.length} no histórico`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 px-4 py-2.5 text-[10.5px] uppercase tracking-wider text-muted-foreground bg-surface-2/60 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2", children: "#" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-7", children: "Identificador" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-right", children: "Prêmio total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1 text-right", children: "→" })
      ] }),
      policy.endorsements.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-8 text-center text-[12px] text-muted-foreground", children: "Apólice sem endossos adicionais (apenas a emissão original)." }),
      policy.endorsements.map((e) => {
        const seq = normalizeEndossoNum(e.numero_endosso);
        const isApolice = seq === "000000";
        const { tipoEndosso } = unwrapProposta(e.proposta);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/apolices/$id/endossos/$num",
            params: { id: policy.numero_apolice, num: e.numero_endosso },
            className: "grid grid-cols-12 items-center px-4 py-2.5 border-b border-border/40 last:border-0 hover:bg-surface-2/50 transition",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 font-mono text-[11.5px] text-muted-foreground flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { className: "h-3 w-3" }),
                " ",
                e.ordem
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-7 flex items-center gap-2 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EndossoBadge,
                  {
                    tipo: isApolice ? "APOLICE" : "ENDOSSO",
                    tipoEndosso,
                    size: "sm"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11.5px] text-muted-foreground truncate", children: policy.numero_apolice.slice(0, -6) + seq })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-right font-mono text-[12px]", children: fmtNum(e.premio_liquido, e.premio_moeda) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1 text-right text-muted-foreground", children: "›" })
            ]
          },
          e.id
        );
      })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Dados brutos", subtitle: "Payload completo retornado pelo MOTOR OLÉ", children: /* @__PURE__ */ jsxRuntimeExports.jsx(JsonExplorer, { data: t.raw, title: "Proposta (raw)", defaultDepth: 1 }) })
  ] });
}
function HeaderFact({
  label,
  value,
  hint,
  mono
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `text-[13px] font-semibold text-foreground mt-0.5 truncate ${mono ? "font-mono text-[12px]" : ""}`,
        children: value
      }
    ),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] font-mono text-muted-foreground mt-0.5", children: hint })
  ] });
}
const Route$2 = createFileRoute()({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const expected = process.env.POLICY_SYNC_HOOK_SECRET;
        if (!expected) {
          return new Response(
            JSON.stringify({ ok: false, error: "POLICY_SYNC_HOOK_SECRET não configurado" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
        const provided = request.headers.get("x-hook-secret");
        if (!provided || provided !== expected) {
          return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" }
          });
        }
        try {
          const result = await runPolicySyncImpl();
          return new Response(JSON.stringify({ ok: true, ...result }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          return new Response(JSON.stringify({ ok: false, error: msg }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
          });
        }
      }
    }
  }
});
function zonedParts(date, timeZone) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    weekday: "short"
  });
  const parts = Object.fromEntries(
    fmt.formatToParts(date).map((p) => [p.type, p.value])
  );
  const wdMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return {
    dateKey: `${parts.year}-${parts.month}-${parts.day}`,
    hour: Number(parts.hour === "24" ? "0" : parts.hour),
    minute: Number(parts.minute),
    second: Number(parts.second),
    weekday: wdMap[parts.weekday ?? "Sun"] ?? 0
  };
}
function zoneOffsetMs(date, timeZone) {
  const p = zonedParts(date, timeZone);
  const [y, m, d] = p.dateKey.split("-").map(Number);
  const asUTC = Date.UTC(y, (m ?? 1) - 1, d, p.hour, p.minute, p.second);
  return asUTC - Math.floor(date.getTime() / 1e3) * 1e3;
}
function parseTime(t) {
  const [h, m] = t.split(":");
  return { h: Number(h ?? 0), m: Number(m ?? 0) };
}
function zonedTimeToUtc(dateKey, time, timeZone) {
  const [y, mo, d] = dateKey.split("-").map(Number);
  const { h, m } = parseTime(time);
  const guess = new Date(Date.UTC(y, (mo ?? 1) - 1, d, h, m, 0));
  const offset = zoneOffsetMs(guess, timeZone);
  return new Date(guess.getTime() - offset);
}
function addDaysKey(dateKey, days) {
  const [y, m, d] = dateKey.split("-").map(Number);
  const dt = new Date(Date.UTC(y, (m ?? 1) - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt.toISOString().slice(0, 10);
}
function nextRunAt(schedule, now = /* @__PURE__ */ new Date()) {
  if (!schedule.enabled || !schedule.weekdays?.length) return null;
  const tz = schedule.timezone || "America/Sao_Paulo";
  const cur = zonedParts(now, tz);
  for (let i = 0; i <= 8; i++) {
    const key = addDaysKey(cur.dateKey, i);
    const weekday = (cur.weekday + i) % 7;
    if (!schedule.weekdays.includes(weekday)) continue;
    const candidate = zonedTimeToUtc(key, schedule.run_at_time, tz);
    if (candidate.getTime() > now.getTime()) return candidate;
  }
  return null;
}
function formatCountdown(ms) {
  const total = Math.max(0, Math.floor(ms / 1e3));
  const h = Math.floor(total / 3600);
  const m = Math.floor(total % 3600 / 60);
  const s = total % 60;
  const pad = (n) => String(n).padStart(2, "0");
  if (h > 0) return `${h}h ${pad(m)}m ${pad(s)}s`;
  if (m > 0) return `${m}m ${pad(s)}s`;
  return `${s}s`;
}
async function handleScheduler(request, viaVercelCron = false) {
  const expected = viaVercelCron ? process.env.CRON_SECRET : process.env.SCHEDULER_HOOK_SECRET || process.env.POLICY_SYNC_HOOK_SECRET;
  const json2 = (body, status = 200) => new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
  if (!expected) {
    return json2({ ok: false, error: "segredo do agendador não configurado" }, 500);
  }
  const provided = viaVercelCron ? request.headers.get("authorization") : request.headers.get("x-hook-secret");
  const valid = viaVercelCron ? provided === `Bearer ${expected}` : provided === expected;
  if (!valid) return json2({ ok: false, error: "unauthorized" }, 401);
  const { supabaseAdmin } = await import("./client.server-BIG6Ien0.mjs");
  const { data, error } = await supabaseAdmin.from("automation_schedules").select("job, enabled, run_at_time, weekdays, timezone, last_triggered_at");
  if (error) return json2({ ok: false, error: error.message }, 500);
  const now = /* @__PURE__ */ new Date();
  const results = [];
  for (const row of data ?? []) {
    if (row.job !== "audit" && row.job !== "policy_sync") continue;
    if (!row.enabled) {
      results.push({ job: row.job, fired: false, reason: "disabled" });
      continue;
    }
    const tz = row.timezone || "America/Sao_Paulo";
    const cur = zonedParts(now, tz);
    if (!(row.weekdays ?? []).includes(cur.weekday)) {
      results.push({ job: row.job, fired: false, reason: "weekday" });
      continue;
    }
    const target = zonedTimeToUtc(cur.dateKey, row.run_at_time, tz);
    if (now.getTime() < target.getTime()) {
      results.push({ job: row.job, fired: false, reason: "not_due" });
      continue;
    }
    if (row.last_triggered_at) {
      const lastKey = zonedParts(new Date(row.last_triggered_at), tz).dateKey;
      if (lastKey === cur.dateKey) {
        results.push({ job: row.job, fired: false, reason: "already_today" });
        continue;
      }
    }
    const lockQuery = supabaseAdmin.from("automation_schedules").update({
      last_triggered_at: now.toISOString(),
      last_status: "running",
      last_error: null
    }).eq("job", row.job);
    const { data: locked, error: lockErr } = await (row.last_triggered_at ? lockQuery.eq("last_triggered_at", row.last_triggered_at) : lockQuery.is("last_triggered_at", null)).select("job");
    if (lockErr) {
      results.push({ job: row.job, fired: false, error: lockErr.message });
      continue;
    }
    if (!locked || locked.length === 0) {
      results.push({ job: row.job, fired: false, reason: "locked" });
      continue;
    }
    try {
      if (row.job === "audit") await runAuditImpl("scheduler");
      else await runPolicySyncImpl();
      await supabaseAdmin.from("automation_schedules").update({ last_status: "success" }).eq("job", row.job);
      results.push({ job: row.job, fired: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      await supabaseAdmin.from("automation_schedules").update({ last_status: "error", last_error: msg }).eq("job", row.job);
      results.push({ job: row.job, fired: false, error: msg });
    }
  }
  return json2({ ok: true, at: now.toISOString(), results });
}
const Route$1 = createFileRoute()({
  server: {
    handlers: {
      GET: async ({ request }) => handleScheduler(request, true),
      POST: async ({ request }) => handleScheduler(request, false)
    }
  }
});
const $$splitComponentImporter = () => import("./apolices._id.endossos._num-Dl3gD7vc.mjs");
const Route = createFileRoute()({
  head: ({
    params
  }) => ({
    meta: [{
      title: `Endosso ${params.num} · ${params.id} · OLÉ COPILOT`
    }, {
      name: "description",
      content: `Detalhe do endosso ${params.num}.`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const AuthenticatedRouteRoute = Route$l.update({
  id: "/_authenticated",
  getParentRoute: () => Route$m
});
const AuthRoute = Route$k.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$m
});
const AuthenticatedIndexRoute = Route$j.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAlertasRoute = Route$i.update({
  id: "/alertas",
  path: "/alertas",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAnalyticsRoute = Route$h.update({
  id: "/analytics",
  path: "/analytics",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedConfiguracoesRoute = Route$g.update({
  id: "/configuracoes",
  path: "/configuracoes",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedEndossosRoute = Route$f.update({
  id: "/endossos",
  path: "/endossos",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedFerramentasRoute = Route$e.update({
  id: "/ferramentas",
  path: "/ferramentas",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedOperacaoRoute = Route$d.update({
  id: "/operacao",
  path: "/operacao",
  getParentRoute: () => AuthenticatedRouteRoute
});
const InviteTokenRoute = Route$c.update({
  id: "/invite/$token",
  path: "/invite/$token",
  getParentRoute: () => Route$m
});
const AuthenticatedAdminUsuariosRoute = Route$b.update({
  id: "/admin/usuarios",
  path: "/admin/usuarios",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedApolicesIndexRoute = Route$a.update({
  id: "/apolices/",
  path: "/apolices/",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedFerramentasIndexRoute = Route$9.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthenticatedFerramentasRoute
});
const AuthenticatedFerramentasExtratorEndossosRoute = Route$8.update({
  id: "/extrator-endossos",
  path: "/extrator-endossos",
  getParentRoute: () => AuthenticatedFerramentasRoute
});
const ApiPublicAuditCallbackRoute = Route$7.update({
  id: "/api/public/audit-callback",
  path: "/api/public/audit-callback",
  getParentRoute: () => Route$m
});
const ApiPublicBillingSyncCallbackRoute = Route$6.update({
  id: "/api/public/billing-sync-callback",
  path: "/api/public/billing-sync-callback",
  getParentRoute: () => Route$m
});
const ApiPublicEndorsementExtractionCallbackRoute = Route$5.update({
  id: "/api/public/endorsement-extraction-callback",
  path: "/api/public/endorsement-extraction-callback",
  getParentRoute: () => Route$m
});
const ApiPublicPolicySyncCallbackRoute = Route$4.update({
  id: "/api/public/policy-sync-callback",
  path: "/api/public/policy-sync-callback",
  getParentRoute: () => Route$m
});
const AuthenticatedApolicesIdIndexRoute = Route$3.update({
  id: "/apolices/$id/",
  path: "/apolices/$id/",
  getParentRoute: () => AuthenticatedRouteRoute
});
const ApiPublicHooksPolicySyncRoute = Route$2.update({
  id: "/api/public/hooks/policy-sync",
  path: "/api/public/hooks/policy-sync",
  getParentRoute: () => Route$m
});
const ApiPublicHooksSchedulerRoute = Route$1.update({
  id: "/api/public/hooks/scheduler",
  path: "/api/public/hooks/scheduler",
  getParentRoute: () => Route$m
});
const AuthenticatedApolicesIdEndossosNumRoute = Route.update({
  id: "/apolices/$id/endossos/$num",
  path: "/apolices/$id/endossos/$num",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedFerramentasRouteChildren = {
  AuthenticatedFerramentasExtratorEndossosRoute,
  AuthenticatedFerramentasIndexRoute
};
const AuthenticatedFerramentasRouteWithChildren = AuthenticatedFerramentasRoute._addFileChildren(
  AuthenticatedFerramentasRouteChildren
);
const AuthenticatedRouteRouteChildren = {
  AuthenticatedAlertasRoute,
  AuthenticatedAnalyticsRoute,
  AuthenticatedConfiguracoesRoute,
  AuthenticatedEndossosRoute,
  AuthenticatedFerramentasRoute: AuthenticatedFerramentasRouteWithChildren,
  AuthenticatedOperacaoRoute,
  AuthenticatedIndexRoute,
  AuthenticatedAdminUsuariosRoute,
  AuthenticatedApolicesIndexRoute,
  AuthenticatedApolicesIdIndexRoute,
  AuthenticatedApolicesIdEndossosNumRoute
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const rootRouteChildren = {
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AuthRoute,
  InviteTokenRoute,
  ApiPublicAuditCallbackRoute,
  ApiPublicBillingSyncCallbackRoute,
  ApiPublicEndorsementExtractionCallbackRoute,
  ApiPublicPolicySyncCallbackRoute,
  ApiPublicHooksPolicySyncRoute,
  ApiPublicHooksSchedulerRoute
};
const routeTree = Route$m._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 6e4,
        gcTime: 10 * 6e4,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: false
      }
    }
  });
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  JsonExplorer as $,
  updateUser as A,
  deleteUser as B,
  revokeInvite as C,
  useRunPolicySync as D,
  useBillingTagMap as E,
  matchSituacao as F,
  BillingFilters as G,
  fmtNum as H,
  billingTagClass as I,
  getCurrentRole as J,
  useEndorsementDetail as K,
  useEndorsementBilling as L,
  DocumentoHeader as M,
  BillingBadge as N,
  CobrancaCard as O,
  MotivoEndossoCard as P,
  DadosGeraisCard as Q,
  Route as R,
  Section as S,
  CancelamentoCard as T,
  DatasCard as U,
  EndossoSemDadosAviso as V,
  LimiteApoliceCard as W,
  CotacaoCard as X,
  PartesList as Y,
  ItensCoberturas as Z,
  PagamentoCard as _,
  useServerFn as a,
  billingSyncCallback as a0,
  policySyncCallback as a1,
  router as a2,
  changeOwnPassword as b,
  cn as c,
  formatInt as d,
  formatDate as e,
  formatDateTime as f,
  getSystemStatus as g,
  formatPct as h,
  createSsrRpc as i,
  usePolicies as j,
  formatUSD as k,
  formatCompact as l,
  useWebhookMode as m,
  nextRunAt as n,
  formatCountdown as o,
  useLatestPolicySync as p,
  getLatestAudit as q,
  relativeTime as r,
  getAuditHistory as s,
  runAudit as t,
  useTheme as u,
  getAuditRunStatus as v,
  listUsers as w,
  listInvites as x,
  createUserManual as y,
  createInvite as z
};
