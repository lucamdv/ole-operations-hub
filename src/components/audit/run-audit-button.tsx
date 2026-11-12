import { useEffect, useState } from "react";
import { Loader2, Play, RotateCcw, Sparkles, Square } from "lucide-react";
import { useRunAudit, useLatestAudit } from "@/hooks/use-audit";
import { cn } from "@/lib/utils";

export function RunAuditButton({ compact = false }: { compact?: boolean }) {
  const mutation = useRunAudit();
  const { data: latest } = useLatestAudit();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!mutation.isRunning) {
      setElapsed(0);
      return;
    }
    const start = mutation.activeRunCreatedAt
      ? new Date(mutation.activeRunCreatedAt).getTime()
      : Date.now();
    const since = Number.isFinite(start) ? start : Date.now();
    const refresh = () => setElapsed(Math.max(0, Math.floor((Date.now() - since) / 1000)));
    refresh();
    const interval = setInterval(refresh, 1_000);
    return () => clearInterval(interval);
  }, [mutation.isRunning, mutation.activeRunId, mutation.activeRunCreatedAt]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        if (!mutation.isRunning && !mutation.isStarting) mutation.mutate();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mutation]);

  const lastAt = latest?.run?.created_at
    ? new Date(latest.run.created_at).toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      })
    : null;
  const busy = mutation.isStarting || mutation.isCancelling;

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => mutation.mutate()}
          disabled={busy}
          className={cn(
            "h-9 px-3 rounded-lg bg-primary text-primary-foreground text-[12.5px] font-medium hover:opacity-95 transition shadow-glow flex items-center gap-2 disabled:opacity-70",
          )}
          title={mutation.isRunning ? "Cancelar a anterior e iniciar uma nova auditoria" : lastAt ? `Última auditoria: ${lastAt}` : "Disparar nova auditoria"}
        >
          {mutation.isStarting ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : mutation.isRunning ? (
            <RotateCcw className="h-3.5 w-3.5" />
          ) : (
            <Play className="h-3.5 w-3.5 fill-current" />
          )}
          {mutation.isRunning ? "Reiniciar Auditoria" : "Rodar Auditoria"}
          {mutation.isRunning && !mutation.isStarting && (
            <span className="font-mono tabular-nums text-primary-foreground/80">{elapsed}s</span>
          )}
        </button>
        {mutation.isRunning && (
          <button
            type="button"
            onClick={() => mutation.cancel()}
            disabled={busy || !mutation.activeRunId}
            className="h-9 px-3 rounded-lg border border-destructive/35 bg-destructive/10 text-destructive text-[12px] font-medium hover:bg-destructive/20 transition flex items-center gap-2 disabled:opacity-50"
            title="Cancelar auditoria em andamento"
          >
            {mutation.isCancelling ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Square className="h-3.5 w-3.5" />}
            Cancelar
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => mutation.mutate()}
        disabled={busy}
        className={cn(
          "relative group h-10 pl-4 pr-5 rounded-xl bg-primary text-primary-foreground text-[13px] font-semibold transition shadow-glow flex items-center gap-2.5 overflow-hidden disabled:opacity-70",
          !busy && "hover:bg-primary/90 hover:shadow-[0_0_40px_-8px_var(--primary)]",
        )}
      >
        <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
        {mutation.isStarting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : mutation.isRunning ? (
          <RotateCcw className="h-4 w-4" />
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
        <span>{mutation.isRunning ? "Reiniciar Auditoria" : "Rodar Auditoria"}</span>
        {mutation.isRunning && !mutation.isStarting && (
          <span className="font-mono tabular-nums text-primary-foreground/80 ml-1">{elapsed}s</span>
        )}
        {!mutation.isRunning && (
          <kbd className="ml-1 hidden md:inline-flex items-center gap-0.5 text-[9.5px] font-mono bg-white/15 px-1.5 py-0.5 rounded">
            ⌘⇧A
          </kbd>
        )}
      </button>
      {mutation.isRunning && (
        <button
          type="button"
          disabled={busy || !mutation.activeRunId}
          onClick={() => mutation.cancel()}
          className="h-10 px-4 rounded-xl border border-destructive/35 bg-destructive/10 text-destructive text-[12.5px] font-medium transition hover:bg-destructive/20 flex items-center gap-2 disabled:opacity-50"
        >
          {mutation.isCancelling ? <Loader2 className="h-4 w-4 animate-spin" /> : <Square className="h-4 w-4" />}
          Cancelar auditoria
        </button>
      )}
      {lastAt && !mutation.isRunning && (
        <div className="text-[11px] text-muted-foreground">
          Última run · <span className="font-mono text-foreground/80">{lastAt}</span>
        </div>
      )}
    </div>
  );
}
