import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/brand/brand-mark";
import { useCurrentRole } from "@/hooks/use-current-role";
import { ADMIN_NAV, NAV, isNavActive } from "./nav-items";
import { SystemStatusPill, UserChip } from "./system-status-pill";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { data: roleInfo } = useCurrentRole();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-surface/60 text-muted-foreground transition duration-300 ease-[var(--ease-apple)] hover:bg-surface-2 md:hidden"
          aria-label="Abrir menu de navegação"
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="glass-bar inset-y-2 m-0 flex h-auto w-[85vw] max-w-[300px] flex-col overflow-hidden rounded-3xl border p-0"
      >
        <div className="px-5 pt-[max(1.25rem,calc(env(safe-area-inset-top)+0.75rem))] pb-4 border-b border-sidebar-border">
          <BrandMark height={32} />
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="h-1 w-1 rounded-full bg-primary" />
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-muted-foreground">
              Centro de Comando
            </span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-2 pb-1 text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground/60">
            Operação
          </div>
          {NAV.map((item) => {
            const active = isNavActive(pathname, item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-xl px-3 text-[14px] font-medium transition-all duration-300 ease-[var(--ease-apple)]",
                  "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60",
                  active && "bg-primary text-primary-foreground shadow-soft",
                )}
              >
                <Icon
                  className={cn("h-[18px] w-[18px] shrink-0", active && "text-primary-foreground")}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}

          {roleInfo?.isAdmin && (
            <>
              <div className="px-2 pt-4 pb-1 text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground/60">
                Administração
              </div>
              {ADMIN_NAV.map((item) => {
                const active = pathname.startsWith(item.to);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "flex min-h-11 items-center gap-3 rounded-xl px-3 text-[14px] font-medium transition-all duration-300 ease-[var(--ease-apple)]",
                      "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60",
                      active && "bg-primary text-primary-foreground shadow-soft",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-[18px] w-[18px] shrink-0",
                        active && "text-primary-foreground",
                      )}
                    />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </>
          )}
        </nav>

        <div className="border-t border-sidebar-border p-3 space-y-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <UserChip />
          <SystemStatusPill />
        </div>
      </SheetContent>
    </Sheet>
  );
}
