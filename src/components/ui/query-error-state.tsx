import { AlertTriangle, RefreshCw } from "lucide-react";

interface QueryErrorStateProps {
  title: string;
  description: string;
  onRetry: () => void;
  isRetrying?: boolean;
}

export function QueryErrorState({
  title,
  description,
  onRetry,
  isRetrying = false,
}: QueryErrorStateProps) {
  return (
    <div
      role="alert"
      className="panel flex min-h-56 flex-col items-center justify-center rounded-2xl p-8 text-center"
    >
      <AlertTriangle className="mb-3 h-8 w-8 text-destructive" aria-hidden="true" />
      <h2 className="text-[15px] font-semibold text-foreground">{title}</h2>
      <p className="mt-1 max-w-lg text-[12px] text-muted-foreground">{description}</p>
      <button
        type="button"
        onClick={onRetry}
        disabled={isRetrying}
        className="mt-4 inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-[12px] font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
      >
        <RefreshCw
          className={`h-3.5 w-3.5 ${isRetrying ? "animate-spin" : ""}`}
          aria-hidden="true"
        />
        {isRetrying ? "Tentando novamente…" : "Tentar novamente"}
      </button>
    </div>
  );
}
