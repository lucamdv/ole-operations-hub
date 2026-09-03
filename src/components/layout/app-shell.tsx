import { useEffect, useState, type ReactNode } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { CommandPalette } from "./command-palette";
import { useCurrentRole } from "@/hooks/use-current-role";
import { ForcePasswordChangeDialog } from "@/components/auth/force-password-change-dialog";

export function AppShell({ children }: { children: ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { data: roleInfo } = useCurrentRole();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if (e.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-transparent text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onOpenPalette={() => setPaletteOpen(true)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="mx-auto max-w-[1480px] px-3 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-5 sm:py-5 lg:px-6">
            {children}
          </div>
        </main>
      </div>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <ForcePasswordChangeDialog open={Boolean(roleInfo?.mustChangePassword)} />
    </div>
  );
}
