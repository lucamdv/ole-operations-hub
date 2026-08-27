import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { O as Outlet, e as useRouterState, L as Link, f as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as cn, r as relativeTime, a as useServerFn, b as changeOwnPassword, g as getSystemStatus, u as useTheme } from "./router-C--tI9WT.mjs";
import { S as Sheet, a as SheetTrigger, b as SheetContent } from "./sheet-CnAlGDVm.mjs";
import { B as BrandMark } from "./brand-mark-DwTyOqZR.mjs";
import { u as useCurrentRole } from "./use-current-role-E51G92Oa.mjs";
import { u as useProfile, g as getInitials } from "./use-settings-CkvJQFhU.mjs";
import { u as useNotifications } from "./use-notifications-IlWXV-zG.mjs";
import { s as supabase } from "./client-BQqbDqk4.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { _ as _e } from "../_libs/cmdk.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-Cw2eQtk0.mjs";
import { B as Button } from "./button-DxLsNwLg.mjs";
import { I as Input } from "./input-7ljYa1o2.mjs";
import { L as Label } from "./label-w_HgpYX6.mjs";
import "../_libs/seroval.mjs";
import { L as LayoutDashboard, R as Radio, F as FileText, T as TriangleAlert, b as ChartColumn, W as Wrench, S as Settings, c as ShieldCheck, d as Search, e as Command, f as RefreshCw, B as Bell, g as CheckCheck, h as Trash2, X, i as Check, j as LogOut, M as Menu, k as Sun, l as Moon } from "../_libs/lucide-react.mjs";
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
import "./server-BxlZVXOU.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-BqwiLAOE.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: toggle,
      "aria-label": theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro",
      title: theme === "dark" ? "Tema claro" : "Tema escuro",
      className: "h-9 w-9 grid place-items-center rounded-md border border-border bg-surface/60 hover:bg-surface-2 transition",
      children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4 text-muted-foreground" })
    }
  );
}
const NAV$1 = [
  { to: "/", label: "Visão Geral", icon: LayoutDashboard },
  { to: "/operacao", label: "Operação", icon: Radio },
  { to: "/apolices", label: "Apólices", icon: FileText },
  { to: "/alertas", label: "Alertas", icon: TriangleAlert },
  { to: "/analytics", label: "Analytics", icon: ChartColumn },
  { to: "/ferramentas", label: "Ferramentas", icon: Wrench },
  { to: "/configuracoes", label: "Configurações", icon: Settings }
];
const ADMIN_NAV = [
  { to: "/admin/usuarios", label: "Usuários", icon: ShieldCheck }
];
function isNavActive(pathname, to) {
  return to === "/" ? pathname === "/" : pathname.startsWith(to);
}
function SystemStatusPill({ compact = false }) {
  const fetchStatus = useServerFn(getSystemStatus);
  const { data: status } = useQuery({
    queryKey: ["system-status"],
    queryFn: () => fetchStatus(),
    refetchInterval: 6e4,
    staleTime: 3e4
  });
  const state = status?.state ?? "operational";
  const tone = state === "operational" ? "success" : state === "degraded" ? "warning" : "destructive";
  const label = state === "operational" ? "Sistema Operacional" : state === "degraded" ? "Sistema Degradado" : "Sistema Instável";
  const metric = status?.approvalRate != null ? `${status.approvalRate.toFixed(status.approvalRate >= 99.95 ? 2 : 1)}%` : "—";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      title: status?.approvalRate != null ? `Taxa de aprovação da última auditoria: ${status.approvalRate.toFixed(2)}%` : "Sem auditorias registradas",
      className: cn(
        "flex items-center gap-2 rounded-md border",
        compact ? "justify-center px-1.5 py-2" : "px-2 py-1.5",
        tone === "success" && "bg-success/10 border-success/20",
        tone === "warning" && "bg-warning/10 border-warning/20",
        tone === "destructive" && "bg-destructive/10 border-destructive/20"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "absolute inline-flex h-full w-full rounded-full opacity-60 animate-pulse-dot",
                tone === "success" && "bg-success",
                tone === "warning" && "bg-warning",
                tone === "destructive" && "bg-destructive"
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "relative inline-flex rounded-full h-2 w-2",
                tone === "success" && "bg-success",
                tone === "warning" && "bg-warning",
                tone === "destructive" && "bg-destructive"
              )
            }
          )
        ] }),
        !compact && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "text-[11px] font-medium truncate",
                tone === "success" && "text-success",
                tone === "warning" && "text-warning",
                tone === "destructive" && "text-destructive"
              ),
              children: label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "ml-auto text-[10px] font-mono shrink-0",
                tone === "success" && "text-success/70",
                tone === "warning" && "text-warning/70",
                tone === "destructive" && "text-destructive/70"
              ),
              children: metric
            }
          )
        ] })
      ]
    }
  );
}
function UserChip({ compact = false }) {
  const { profile } = useProfile();
  const { data: roleInfo } = useCurrentRole();
  const roleLabel = roleInfo?.isAdmin ? "Admin" : roleInfo?.isManager ? "Manager" : "Usuário";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex items-center gap-2.5 rounded-md hover:bg-sidebar-accent/40 transition",
        compact ? "justify-center px-1 py-2" : "px-2 py-2"
      ),
      title: `${profile.nome} · ${roleLabel}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 shrink-0 rounded-full bg-linear-to-br from-primary to-info grid place-items-center text-[11px] font-semibold text-primary-foreground", children: getInitials(profile.nome) || "OL" }),
        !compact && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12.5px] font-medium text-foreground truncate", title: profile.nome, children: profile.nome }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10.5px] text-muted-foreground truncate", children: [
            profile.email,
            " · ",
            roleLabel
          ] })
        ] })
      ]
    }
  );
}
function MobileNav() {
  const [open, setOpen] = reactExports.useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { data: roleInfo } = useCurrentRole();
  reactExports.useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: "md:hidden h-10 w-10 shrink-0 grid place-items-center rounded-md border border-border bg-surface/60 text-muted-foreground hover:bg-surface-2 transition",
        "aria-label": "Abrir menu de navegação",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "left", className: "w-[85vw] max-w-[300px] p-0 flex flex-col bg-sidebar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pt-[max(1.25rem,calc(env(safe-area-inset-top)+0.75rem))] pb-4 border-b border-sidebar-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BrandMark, { height: 32 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold tracking-[0.18em] uppercase text-muted-foreground", children: "Centro de Comando" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 overflow-y-auto px-3 py-4 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 pb-1 text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground/60", children: "Operação" }),
        NAV$1.map((item) => {
          const active = isNavActive(pathname, item.to);
          const Icon = item.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: item.to,
              className: cn(
                "flex items-center gap-3 min-h-11 px-3 rounded-lg text-[14px] font-medium transition",
                "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60",
                active && "bg-sidebar-accent text-foreground"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("h-[18px] w-[18px] shrink-0", active && "text-primary") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: item.label })
              ]
            },
            item.to
          );
        }),
        roleInfo?.isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 pt-4 pb-1 text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground/60", children: "Administração" }),
          ADMIN_NAV.map((item) => {
            const active = pathname.startsWith(item.to);
            const Icon = item.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: item.to,
                className: cn(
                  "flex items-center gap-3 min-h-11 px-3 rounded-lg text-[14px] font-medium transition",
                  "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60",
                  active && "bg-sidebar-accent text-foreground"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("h-[18px] w-[18px] shrink-0", active && "text-primary") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: item.label })
                ]
              },
              item.to
            );
          })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-sidebar-border p-3 space-y-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserChip, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SystemStatusPill, {})
      ] })
    ] })
  ] });
}
function Header({ onOpenPalette }) {
  const [lastSync, setLastSync] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString());
  const [syncing, setSyncing] = reactExports.useState(false);
  const [openNotif, setOpenNotif] = reactExports.useState(false);
  const { items, unread, markAllRead, markRead, remove, clearAll } = useNotifications();
  const { profile } = useProfile();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  async function handleSignOut() {
    try {
      await queryClient.cancelQueries();
      queryClient.clear();
      await supabase.auth.signOut();
      navigate({ to: "/auth", replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao sair");
    }
  }
  reactExports.useEffect(() => {
    const i = setInterval(() => {
      setSyncing(true);
      setTimeout(() => {
        setLastSync((/* @__PURE__ */ new Date()).toISOString());
        setSyncing(false);
      }, 1100);
    }, 28e3);
    return () => clearInterval(i);
  }, []);
  reactExports.useEffect(() => {
    if (!openNotif || unread === 0) return;
    const t = setTimeout(() => markAllRead(), 800);
    return () => clearTimeout(t);
  }, [openNotif, unread, markAllRead]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "shrink-0 min-h-14 h-[calc(3.5rem+env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] border-b border-border bg-background/80 backdrop-blur-xl flex items-center px-3 sm:px-5 gap-2 sm:gap-3 sticky top-0 z-30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: onOpenPalette,
        className: "hidden sm:flex group items-center gap-2.5 flex-1 max-w-md h-9 px-3 rounded-lg bg-surface-2/70 border border-border hover:border-primary/40 hover:bg-surface transition text-left min-w-0",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 shrink-0 text-muted-foreground/70" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12.5px] text-muted-foreground/80 truncate", children: "Pesquisar apólice, endosso, corretor ou erro" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("kbd", { className: "ml-auto hidden md:flex items-center gap-1 text-[10.5px] text-muted-foreground/70 font-mono px-1.5 py-0.5 rounded border border-border bg-background shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Command, { className: "h-3 w-3" }),
            "K"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onOpenPalette,
        className: "sm:hidden h-10 w-10 shrink-0 grid place-items-center rounded-md border border-border bg-surface/60 text-muted-foreground hover:bg-surface-2 transition",
        "aria-label": "Pesquisar",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4.5 w-4.5" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-2 pr-3 mr-1 border-r border-border shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: cn("h-3.5 w-3.5 text-primary/70", syncing && "animate-spin") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "caption", children: "Sync" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono tabular-nums text-foreground", children: relativeTime(lastSync) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setOpenNotif((v) => !v),
          className: "relative h-9 w-9 grid place-items-center rounded-md border border-border bg-surface/60 hover:bg-surface-2 transition",
          "aria-label": `Notificações${unread ? ` (${unread} não lidas)` : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4 text-muted-foreground" }),
            unread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 grid place-items-center rounded-full bg-destructive text-[9.5px] font-semibold text-destructive-foreground shadow-[0_0_8px_var(--destructive)] tabular-nums", children: unread > 9 ? "9+" : unread })
          ]
        }
      ),
      openNotif && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-40", onClick: () => setOpenNotif(false) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed sm:absolute left-2 right-2 sm:left-auto top-[calc(3.5rem+env(safe-area-inset-top))] sm:top-11 sm:right-0 z-50 w-auto sm:w-[380px] rounded-xl border border-border bg-surface shadow-elevated overflow-hidden animate-in fade-in slide-in-from-top-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-border flex flex-wrap items-center justify-between gap-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] font-semibold", children: "Notificações" }),
              unread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono px-1.5 py-0.5 rounded bg-destructive/15 text-destructive", children: [
                unread,
                " novas"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: markAllRead,
                  disabled: unread === 0,
                  className: "flex items-center gap-1 text-[10.5px] text-muted-foreground hover:text-foreground disabled:opacity-40 px-1.5 py-1 rounded hover:bg-surface-2 transition",
                  title: "Marcar todas como lidas",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "h-3 w-3" }),
                    "Marcar lidas"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: clearAll,
                  disabled: items.length === 0,
                  className: "flex items-center gap-1 text-[10.5px] text-muted-foreground hover:text-destructive disabled:opacity-40 px-1.5 py-1 rounded hover:bg-surface-2 transition",
                  title: "Limpar tudo",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }),
                    "Limpar"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[60vh] sm:max-h-[420px] overflow-y-auto", children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-10 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-6 w-6 mx-auto text-muted-foreground/40 mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-muted-foreground", children: "Sem notificações" })
          ] }) : items.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              onClick: () => markRead(a.id),
              className: cn(
                "group/notif relative px-4 py-2.5 border-b border-border/60 last:border-0 hover:bg-surface-2/60 transition cursor-pointer",
                !a.read && "bg-primary/[0.04]"
              ),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "mt-1 h-1.5 w-1.5 rounded-full shrink-0",
                      a.severity === "critical" && "bg-destructive shadow-[0_0_6px_var(--destructive)]",
                      a.severity === "high" && "bg-warning",
                      a.severity === "info" && "bg-info",
                      a.severity === "low" && "bg-muted-foreground"
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 pr-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("text-[12.5px] leading-snug", a.read ? "text-muted-foreground" : "text-foreground font-medium"), children: a.text }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] text-muted-foreground mt-0.5", children: a.time })
                ] }),
                !a.read && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-9 top-3 h-1.5 w-1.5 rounded-full bg-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      remove(a.id);
                    },
                    className: "absolute right-2 top-2 h-6 w-6 grid place-items-center rounded opacity-0 group-hover/notif:opacity-100 hover:bg-surface-2 text-muted-foreground hover:text-destructive transition",
                    "aria-label": "Dispensar",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
                  }
                )
              ] })
            },
            a.id
          )) }),
          items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2 border-t border-border bg-background/40 text-[10.5px] text-muted-foreground flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }),
            items.length,
            " ",
            items.length === 1 ? "evento" : "eventos",
            " no histórico"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-1 flex items-center gap-2 border-l border-border pl-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex flex-col items-end leading-tight min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] font-medium text-foreground", children: profile.nome }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "Operações · Admin" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-8 w-8 rounded-full bg-gradient-primary grid place-items-center text-[11px] font-semibold text-primary-foreground",
          title: profile.nome,
          children: getInitials(profile.nome) || "OL"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleSignOut,
          className: "h-9 w-9 grid place-items-center rounded-md border border-border bg-surface/60 hover:bg-destructive/10 hover:border-destructive/40 hover:text-destructive text-muted-foreground transition",
          title: "Sair",
          "aria-label": "Sair",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" })
        }
      )
    ] })
  ] });
}
function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { data: roleInfo } = useCurrentRole();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden md:flex w-[72px] xl:w-[248px] shrink-0 flex-col border-r border-border bg-sidebar/80 backdrop-blur-xl transition-[width]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 xl:px-5 pt-5 pb-5 border-b border-sidebar-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex flex-col gap-1.5 group items-center xl:items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BrandMark, { height: 32, className: "xl:h-9" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden xl:flex items-center gap-1.5 pl-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "Olé Copilot · Centro de Comando" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 px-2 xl:px-3 py-4 space-y-0.5 overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden xl:block px-2 pb-2 eyebrow", children: "Operação" }),
      NAV$1.map((item) => {
        const active = isNavActive(pathname, item.to);
        const Icon = item.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: item.to,
            title: item.label,
            className: cn(
              "group relative flex items-center gap-2.5 rounded-md text-[13px] font-medium transition-colors",
              "justify-center xl:justify-start px-2 xl:px-2.5 py-2 xl:py-2",
              "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60",
              active && "bg-sidebar-accent text-foreground"
            ),
            children: [
              active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-0 top-1.5 bottom-1.5 w-[2.5px] rounded-full bg-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Icon,
                {
                  className: cn(
                    "h-4 w-4 shrink-0 transition-colors",
                    active ? "text-primary" : "text-muted-foreground/80 group-hover:text-foreground"
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden xl:inline truncate", children: item.label })
            ]
          },
          item.to
        );
      }),
      roleInfo?.isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden xl:block px-2 pt-4 pb-2 eyebrow", children: "Administração" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "xl:hidden my-2 mx-2 border-t border-sidebar-border" }),
        ADMIN_NAV.map((item) => {
          const active = pathname.startsWith(item.to);
          const Icon = item.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: item.to,
              title: item.label,
              className: cn(
                "group relative flex items-center gap-2.5 rounded-md text-[13px] font-medium transition-colors",
                "justify-center xl:justify-start px-2 xl:px-2.5 py-2 xl:py-2",
                "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60",
                active && "bg-sidebar-accent text-foreground"
              ),
              children: [
                active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-0 top-1.5 bottom-1.5 w-[2.5px] rounded-full bg-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Icon,
                  {
                    className: cn(
                      "h-4 w-4 shrink-0 transition-colors",
                      active ? "text-primary" : "text-muted-foreground/80 group-hover:text-foreground"
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden xl:inline truncate", children: item.label })
              ]
            },
            item.to
          );
        })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-sidebar-border p-2 xl:p-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "xl:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserChip, { compact: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SystemStatusPill, { compact: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden xl:block space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserChip, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SystemStatusPill, {})
      ] })
    ] })
  ] });
}
const AUDIT_RULES = [
  "Gap de Vigência",
  "Cobertura Inativa",
  "Duplicidade de Endosso",
  "Prêmio Fora do Padrão",
  "Limite de Cobertura Inválido",
  "Erro de Administração",
  "Erro de Distribuição",
  "Erro Financeiro",
  "Erro de Renovação",
  "Erro de Continuidade"
];
function mulberry32(seed) {
  return function() {
    let t = seed += 1831565813;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(42);
const pick = (arr) => arr[Math.floor(rng() * arr.length)];
const between = (a, b) => a + rng() * (b - a);
const intBetween = (a, b) => Math.floor(between(a, b));
const PRODUCTS = [
  "Vida Individual",
  "Vida em Grupo",
  "Vida Premiável",
  "Acidentes Pessoais",
  "Prestamista",
  "Funeral Familiar",
  "Doenças Graves"
];
const BROKERS = [
  { name: "Aliança Corretora", code: "BRK-0021" },
  { name: "Capital Seguros", code: "BRK-0034" },
  { name: "Horizonte Brokers", code: "BRK-0078" },
  { name: "Vértice Seguros", code: "BRK-0102" },
  { name: "Atlas Risk", code: "BRK-0145" },
  { name: "Núcleo Corretora", code: "BRK-0167" },
  { name: "Prisma Seguros", code: "BRK-0188" },
  { name: "Meridian Brokers", code: "BRK-0211" }
];
const COVERAGE_TYPES = [
  "Morte por Qualquer Causa",
  "Morte Acidental",
  "Invalidez Permanente Total",
  "Invalidez por Acidente",
  "Assistência Funeral",
  "Despesas Médicas",
  "Doenças Graves",
  "Diária de Internação"
];
const INSURED_NAMES = [
  "Construtora Vértice S.A.",
  "Logística Andrade Ltda.",
  "Indústria Mendes & Cia",
  "Cooperativa AgroSul",
  "Têxtil Bandeirantes",
  "Transportes Rio Verde",
  "Grupo Cordilheira",
  "Frigorífico Pampas",
  "Cerâmica Continental",
  "Energia Plena S.A."
];
function makeCoverages() {
  const n = intBetween(2, 5);
  const set = /* @__PURE__ */ new Set();
  const out = [];
  while (out.length < n) {
    const name = pick(COVERAGE_TYPES);
    if (set.has(name)) continue;
    set.add(name);
    const status = rng() > 0.92 ? "inativa" : rng() > 0.96 ? "suspensa" : "ativa";
    out.push({
      id: `cov-${Math.floor(rng() * 1e9)}`,
      name,
      insuredAmount: Math.round(between(5e4, 25e5) / 1e3) * 1e3,
      premium: Math.round(between(80, 3200)),
      startDate: "2024-01-15",
      endDate: "2025-01-14",
      status,
      compliant: status === "ativa" && rng() > 0.18
    });
  }
  return out;
}
function makeEndorsements(seed) {
  const n = intBetween(1, 6);
  const out = [];
  let currentPremium = Math.round(between(1200, 8500));
  for (let i = 0; i <= n; i++) {
    const type = i === 0 ? "Correção" : pick(["Alteração de Prêmio", "Alteração de Cobertura", "Alteração de Vigência", "Cancelamento", "Correção"]);
    const delta = type === "Alteração de Prêmio" ? Math.round(between(-450, 800)) : 0;
    currentPremium += delta;
    const failed = rng() > 0.78;
    out.push({
      id: `end-${seed}-${i}`,
      number: String(i).padStart(6, "0"),
      date: new Date(2024, 0, 1 + i * intBetween(8, 35)).toISOString(),
      type,
      description: type === "Cancelamento" ? "Cancelamento do endosso anterior por solicitação do segurado" : type === "Alteração de Cobertura" ? "Inclusão de cobertura de Doenças Graves" : type === "Alteração de Vigência" ? "Prorrogação de vigência por 90 dias" : type === "Alteração de Prêmio" ? `Reajuste de prêmio ${delta >= 0 ? "+" : ""}${delta.toLocaleString("pt-BR")}` : "Correção cadastral do segurado",
      premiumDelta: delta,
      newPremium: currentPremium,
      status: failed ? "REPROVADA" : "APROVADA",
      severity: failed ? pick(["high", "medium", "low"]) : void 0
    });
  }
  return out;
}
function makeFindings(approved) {
  if (approved) return [];
  const n = intBetween(1, 4);
  const out = [];
  const used = /* @__PURE__ */ new Set();
  while (out.length < n) {
    const rule = pick(AUDIT_RULES);
    if (used.has(rule)) continue;
    used.add(rule);
    out.push({
      rule,
      result: "REPROVADA",
      severity: pick(["critical", "high", "medium", "low"]),
      description: `Inconsistência detectada na regra "${rule}" durante a execução automatizada da auditoria.`,
      impact: `Exposição financeira potencial de R$ ${between(2500, 18e4).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}, com risco regulatório associado.`,
      recommendation: "Encaminhar para revisão manual da equipe de Operações e validação com o corretor responsável."
    });
  }
  return out;
}
const POLICIES = Array.from({ length: 84 }, (_, i) => {
  const broker = pick(BROKERS);
  const approved = rng() > 0.34;
  const endorsements = makeEndorsements(i);
  const premium = endorsements[endorsements.length - 1].newPremium;
  return {
    id: `pol-${i}`,
    number: `OLE-${String(24e5 + i).padStart(8, "0")}`,
    status: rng() > 0.92 ? "cancelada" : rng() > 0.94 ? "suspensa" : rng() > 0.85 ? "renovada" : "ativa",
    audit: approved ? "APROVADA" : "REPROVADA",
    product: pick(PRODUCTS),
    broker: broker.name,
    brokerCode: broker.code,
    insured: pick(INSURED_NAMES),
    startDate: "2024-01-15",
    endDate: "2025-01-14",
    premium,
    exposure: Math.round(between(12e4, 48e5)),
    coverages: makeCoverages(),
    endorsements,
    findings: makeFindings(approved),
    hasGap: !approved && rng() > 0.6,
    updatedAt: new Date(Date.now() - intBetween(6e4, 864e5 * 14)).toISOString()
  };
});
POLICIES.flatMap(
  (p) => p.findings.map((f, idx) => ({
    id: `alt-${p.id}-${idx}`,
    severity: f.severity,
    rule: f.rule,
    policyNumber: p.number,
    product: p.product,
    broker: p.broker,
    impact: Math.round(between(5e3, 22e4)),
    createdAt: new Date(Date.now() - intBetween(6e4, 864e5 * 7)).toISOString(),
    status: rng() > 0.7 ? "investigating" : rng() > 0.5 ? "open" : "resolved",
    title: f.rule,
    description: f.description
  }))
).sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
Array.from({ length: 24 }, (_, h) => ({
  hour: `${String(h).padStart(2, "0")}h`,
  processed: Math.round(between(120, 880)),
  failed: Math.round(between(3, 42))
}));
Array.from({ length: 12 }, (_, i) => ({
  week: `S${i + 1}`,
  approved: Math.round(between(620, 980)),
  rejected: Math.round(between(60, 220)),
  premium: Math.round(between(8e5, 18e5))
}));
AUDIT_RULES.map((rule) => ({
  rule,
  weeks: Array.from({ length: 12 }, () => Math.round(between(0, 48)))
}));
const NAV = [
  { to: "/", label: "Visão Geral", icon: LayoutDashboard, hint: "Dashboard executivo" },
  { to: "/operacao", label: "Operação", icon: Radio, hint: "Centro de monitoramento" },
  { to: "/apolices", label: "Apólices", icon: FileText, hint: "Lista e busca" },
  { to: "/alertas", label: "Alertas", icon: TriangleAlert, hint: "Incidentes operacionais" },
  { to: "/analytics", label: "Analytics", icon: ChartColumn, hint: "Rankings e tendências" },
  { to: "/ferramentas", label: "Ferramentas", icon: Wrench, hint: "Utilitários operacionais" },
  { to: "/configuracoes", label: "Configurações", icon: Settings, hint: "Preferências da plataforma" }
];
function CommandPalette({ open, onOpenChange }) {
  const navigate = useNavigate();
  const [q, setQ] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!open) setQ("");
  }, [open]);
  if (!open) return null;
  const go = (to) => {
    onOpenChange(false);
    navigate({ to });
  };
  const policyMatches = q ? POLICIES.filter(
    (p) => [p.number, p.broker, p.product, p.insured].some((s) => s.toLowerCase().includes(q.toLowerCase()))
  ).slice(0, 5) : POLICIES.slice(0, 4);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[100] grid place-items-start justify-center pt-[14vh] px-4 bg-background/60 backdrop-blur-md animate-in fade-in", onClick: () => onOpenChange(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      onClick: (e) => e.stopPropagation(),
      className: "w-full max-w-[620px] panel overflow-hidden animate-in zoom-in-95 slide-in-from-top-4",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(_e, { label: "Command Palette", className: "bg-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          _e.Input,
          {
            autoFocus: true,
            value: q,
            onValueChange: setQ,
            placeholder: "Pesquisar apólice, endosso, corretor, cobertura ou erro…",
            className: "w-full bg-transparent py-4 text-[14px] text-foreground placeholder:text-muted-foreground/70 outline-none"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(_e.List, { className: "max-h-[55vh] sm:max-h-[420px] overflow-y-auto p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(_e.Empty, { className: "py-8 text-center text-[13px] text-muted-foreground", children: "Nenhum resultado encontrado." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(_e.Group, { heading: "Navegação", className: "text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground/70 px-2 py-1.5", children: NAV.map((n) => {
            const Icon = n.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              _e.Item,
              {
                onSelect: () => go(n.to),
                className: "flex items-center gap-3 px-2.5 py-2 rounded-md cursor-pointer text-[13px] text-foreground aria-selected:bg-accent",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: n.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-[11px] text-muted-foreground", children: n.hint })
                ]
              },
              n.to
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(_e.Group, { heading: "Apólices", className: "text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground/70 px-2 py-1.5 mt-2", children: policyMatches.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            _e.Item,
            {
              onSelect: () => go(`/apolices/${p.id}`),
              value: `${p.number} ${p.broker} ${p.insured} ${p.product}`,
              className: "flex items-center gap-3 px-2.5 py-2 rounded-md cursor-pointer text-[13px] text-foreground aria-selected:bg-accent",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[12px]", children: p.number }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground truncate", children: [
                  "— ",
                  p.insured
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `ml-auto text-[10px] px-1.5 py-0.5 rounded font-medium ${p.audit === "APROVADA" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`,
                    children: p.audit
                  }
                )
              ]
            },
            p.id
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border px-4 py-2 flex items-center gap-3 text-[10.5px] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "px-1.5 py-0.5 rounded border border-border bg-background font-mono", children: "↑↓" }),
          "navegar",
          /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "px-1.5 py-0.5 rounded border border-border bg-background font-mono", children: "↵" }),
          "selecionar",
          /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "ml-auto px-1.5 py-0.5 rounded border border-border bg-background font-mono", children: "esc" }),
          "fechar"
        ] })
      ] })
    }
  ) });
}
function ForcePasswordChangeDialog({ open }) {
  const [password, setPassword] = reactExports.useState("");
  const [confirm, setConfirm] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const change = useServerFn(changeOwnPassword);
  const qc = useQueryClient();
  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("As senhas não coincidem");
      return;
    }
    setSubmitting(true);
    try {
      await change({ data: { new_password: password } });
      toast.success("Senha atualizada com sucesso");
      await qc.invalidateQueries({ queryKey: ["current-role"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao atualizar senha");
    } finally {
      setSubmitting(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", onInteractOutside: (e) => e.preventDefault(), onEscapeKeyDown: (e) => e.preventDefault(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Defina uma nova senha" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Sua conta foi criada por um administrador. Para continuar, escolha uma senha pessoal." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "new_password", children: "Nova senha" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "new_password",
            type: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            minLength: 8,
            required: true,
            autoComplete: "new-password"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "confirm_password", children: "Confirmar senha" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "confirm_password",
            type: "password",
            value: confirm,
            onChange: (e) => setConfirm(e.target.value),
            minLength: 8,
            required: true,
            autoComplete: "new-password"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: submitting, className: "w-full", children: submitting ? "Salvando…" : "Salvar nova senha" }) })
    ] })
  ] }) });
}
function AppShell({ children }) {
  const [paletteOpen, setPaletteOpen] = reactExports.useState(false);
  const { data: roleInfo } = useCurrentRole();
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if (e.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-dvh w-full bg-background text-foreground overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { onOpenPalette: () => setPaletteOpen(true) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1480px] px-3 sm:px-5 lg:px-6 py-4 sm:py-6 pb-[max(1rem,env(safe-area-inset-bottom))]", children }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommandPalette, { open: paletteOpen, onOpenChange: setPaletteOpen }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ForcePasswordChangeDialog, { open: Boolean(roleInfo?.mustChangePassword) })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
export {
  SplitComponent as component
};
