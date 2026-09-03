import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/brand/brand-mark";
import { useCurrentRole } from "@/hooks/use-current-role";
import { ADMIN_NAV, NAV, isNavActive } from "./nav-items";
import { SystemStatusPill, UserChip } from "./system-status-pill";

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { data: roleInfo } = useCurrentRole();

  return (
    <aside className="hidden w-[84px] shrink-0 p-3 pr-0 md:flex xl:w-[268px]">
      <div className="glass-bar flex h-full w-full flex-col overflow-hidden rounded-3xl">
        <div className="border-b border-sidebar-border px-3 pb-5 pt-5 xl:px-5">
          <Link to="/" className="group flex flex-col items-center gap-1.5 xl:items-start">
            <BrandMark height={32} className="xl:h-9" />
            <div className="hidden items-center gap-1.5 pl-0.5 xl:flex">
              <span className="h-1 w-1 rounded-full bg-success shadow-[0_0_8px_var(--success)]" />
              <span className="eyebrow">Olé Copilot · Centro de Comando</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4 xl:px-3">
          <div className="eyebrow hidden px-3 pb-1.5 xl:block">Operação</div>
          {NAV.map((item) => {
            const active = isNavActive(pathname, item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                title={item.label}
                className={cn(
                  "group relative flex items-center justify-center gap-3 rounded-xl px-2 py-2.5 text-[13px] font-medium transition-all duration-300 ease-[var(--ease-apple)] xl:justify-start xl:px-3",
                  "text-muted-foreground hover:bg-sidebar-accent/70 hover:text-foreground",
                  active &&
                    "bg-primary text-primary-foreground shadow-[0_10px_24px_-14px_var(--primary)] hover:bg-primary hover:text-primary-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "h-[17px] w-[17px] shrink-0 transition-colors",
                    active
                      ? "text-primary-foreground"
                      : "text-muted-foreground/80 group-hover:text-foreground",
                  )}
                  strokeWidth={2}
                />
                <span className="hidden truncate xl:inline">{item.label}</span>
              </Link>
            );
          })}

          {roleInfo?.isAdmin && (
            <>
              <div className="eyebrow hidden px-3 pb-1.5 pt-5 xl:block">Administração</div>
              <div className="mx-2 my-3 border-t border-sidebar-border xl:hidden" />
              {ADMIN_NAV.map((item) => {
                const active = pathname.startsWith(item.to);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    title={item.label}
                    className={cn(
                      "group relative flex items-center justify-center gap-3 rounded-xl px-2 py-2.5 text-[13px] font-medium transition-all duration-300 ease-[var(--ease-apple)] xl:justify-start xl:px-3",
                      "text-muted-foreground hover:bg-sidebar-accent/70 hover:text-foreground",
                      active &&
                        "bg-primary text-primary-foreground shadow-[0_10px_24px_-14px_var(--primary)] hover:bg-primary hover:text-primary-foreground",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-[17px] w-[17px] shrink-0",
                        active ? "text-primary-foreground" : "text-muted-foreground/80",
                      )}
                    />
                    <span className="hidden truncate xl:inline">{item.label}</span>
                  </Link>
                );
              })}
            </>
          )}
        </nav>

        <div className="space-y-2 border-t border-sidebar-border p-2 xl:p-3">
          <div className="xl:hidden">
            <UserChip compact />
            <SystemStatusPill compact />
          </div>
          <div className="hidden space-y-2 xl:block">
            <UserChip />
            <SystemStatusPill />
          </div>
        </div>
      </div>
    </aside>
  );
}
