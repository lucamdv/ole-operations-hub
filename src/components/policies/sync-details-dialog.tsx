import { useState } from "react";
import { AlertTriangle, CheckCircle2, History, LoaderCircle, Plus, RefreshCw } from "lucide-react";
import { usePolicySyncDetails } from "@/hooks/use-policies";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Value({ value }: { value: unknown }) {
  const text =
    value === null || value === undefined
      ? "—"
      : typeof value === "string"
        ? value
        : JSON.stringify(value);
  return <span className="break-all font-mono text-[11px]">{text}</span>;
}

function ChangeList({
  changes,
}: {
  changes: NonNullable<ReturnType<typeof usePolicySyncDetails>["data"]>["changes"];
}) {
  if (changes.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        Nenhuma alteração nesta categoria.
      </p>
    );
  }
  return (
    <div className="space-y-3 pr-3">
      {changes.map((change) => (
        <article key={change.id} className="rounded-xl border border-border bg-card/60 p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                {change.action === "adicionado" ? (
                  <Plus className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <RefreshCw className="h-3.5 w-3.5 text-sky-500" />
                )}
                <span className="text-sm font-semibold capitalize">{change.action}</span>
                <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] uppercase text-muted-foreground">
                  {change.entity_type}
                </span>
              </div>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {change.numero_documento ?? change.numero_apolice ?? "Registro sem documento"}
                {change.numero_parcela ? ` · parcela ${change.numero_parcela}` : ""}
              </p>
            </div>
            <time className="text-[11px] text-muted-foreground">
              {formatDateTime(change.created_at)}
            </time>
          </div>
          {change.diffs.length > 0 ? (
            <div className="mt-3 overflow-hidden rounded-lg border border-border/70">
              {change.diffs.map((diff, index) => (
                <div
                  key={`${change.id}-${diff.field}`}
                  className={cn(
                    "grid gap-1 px-3 py-2 text-xs sm:grid-cols-[minmax(130px,0.7fr)_1fr_1fr]",
                    index > 0 && "border-t border-border/70",
                  )}
                >
                  <span className="font-medium text-muted-foreground">{diff.field}</span>
                  <span className="rounded bg-destructive/5 px-2 py-1 text-destructive/80">
                    <Value value={diff.before} />
                  </span>
                  <span className="rounded bg-emerald-500/5 px-2 py-1 text-emerald-700 dark:text-emerald-400">
                    <Value value={diff.after} />
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function fallbackLabel(documentNumber: string) {
  if (documentNumber === "__OPEN_INSTALLMENTS__") return "Listagem de novas parcelas";
  const window = /^__SETTLED_WINDOW__#([^#]+)#([^#]+)$/.exec(documentNumber);
  return window ? `Quitações de ${window[1]} a ${window[2]}` : documentNumber;
}

export function SyncDetailsDialog({ runId }: { runId?: string }) {
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError, refetch, isFetching } = usePolicySyncDetails(runId, open);
  const run = data?.run;
  const emissions = data?.changes.filter((change) => change.leg === "emissoes") ?? [];
  const billing =
    data?.changes.filter(
      (change) => change.leg === "cobrancas" && change.entity_type === "parcela",
    ) ?? [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-3 text-[12.5px] font-semibold text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
        >
          <History className="h-3.5 w-3.5" />
          Detalhes
        </button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[88vh] w-[calc(100vw-2rem)] max-w-5xl flex-col gap-4 p-5 sm:p-6">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 pr-7">
            <div>
              <DialogTitle>Detalhes da sincronização</DialogTitle>
              <DialogDescription className="mt-1">
                Inclusões, atualizações e recuperações automáticas da execução mais recente.
              </DialogDescription>
            </div>
            <button
              type="button"
              onClick={() => void refetch()}
              disabled={isFetching}
              aria-label="Atualizar detalhes"
              className="rounded-md border border-border p-2 text-muted-foreground hover:text-foreground disabled:opacity-50"
            >
              <RefreshCw className={cn("h-3.5 w-3.5", isFetching && "animate-spin")} />
            </button>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="flex min-h-64 items-center justify-center gap-2 text-sm text-muted-foreground">
            <LoaderCircle className="h-4 w-4 animate-spin" /> Carregando histórico…
          </div>
        ) : isError || !data || !run ? (
          <div className="min-h-64 rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Não foi possível carregar os detalhes desta execução.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
              {[
                ["Emissões adicionadas", run.emissions_added],
                ["Emissões atualizadas", run.emissions_updated],
                ["Parcelas adicionadas", run.billing_added],
                ["Parcelas atualizadas", run.billing_updated],
                ["Fallbacks", run.billing_fallback_total],
                ["Recuperados", run.billing_fallback_resolved],
              ].map(([label, value]) => (
                <div
                  key={String(label)}
                  className="rounded-lg border border-border bg-muted/20 p-3"
                >
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    {label}
                  </p>
                  <p className="mt-1 text-xl font-semibold">{value}</p>
                </div>
              ))}
            </div>

            <Tabs defaultValue="billing" className="min-h-0 flex-1">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="billing">Parcelas ({billing.length})</TabsTrigger>
                <TabsTrigger value="emissions">Emissões ({emissions.length})</TabsTrigger>
                <TabsTrigger value="fallbacks">Fallback ({data.fallbacks.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="billing">
                <ScrollArea className="h-[48vh]">
                  <ChangeList changes={billing} />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="emissions">
                <ScrollArea className="h-[48vh]">
                  <ChangeList changes={emissions} />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="fallbacks">
                <ScrollArea className="h-[48vh]">
                  <div className="space-y-3 pr-3">
                    {data.fallbacks.length === 0 ? (
                      <p className="py-10 text-center text-sm text-muted-foreground">
                        Nenhuma consulta caiu em fallback.
                      </p>
                    ) : (
                      data.fallbacks.map((fallback) => {
                        const recovered = fallback.status === "resolved";
                        return (
                          <article
                            key={fallback.id}
                            className="rounded-xl border border-border bg-card/60 p-4"
                          >
                            <div className="flex items-start gap-3">
                              {recovered ? (
                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                              ) : (
                                <AlertTriangle className="mt-0.5 h-4 w-4 text-warning" />
                              )}
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap justify-between gap-2">
                                  <p className="break-all font-mono text-xs font-semibold">
                                    {fallbackLabel(fallback.numero_documento)}
                                  </p>
                                  <span
                                    className={cn(
                                      "rounded-full px-2 py-0.5 text-[10px] font-medium uppercase",
                                      recovered
                                        ? "bg-emerald-500/10 text-emerald-600"
                                        : "bg-warning/10 text-warning",
                                    )}
                                  >
                                    {recovered ? "recuperado" : "tentando em background"}
                                  </span>
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground">
                                  {fallback.attempts} tentativa(s)
                                  {fallback.last_error ? ` · ${fallback.last_error}` : ""}
                                </p>
                                <p className="mt-1 text-[11px] text-muted-foreground">
                                  Entrada: {formatDateTime(fallback.first_failed_at)}
                                  {fallback.resolved_at
                                    ? ` · resolução: ${formatDateTime(fallback.resolved_at)}`
                                    : ` · próxima tentativa: ${formatDateTime(fallback.next_retry_at)}`}
                                </p>
                              </div>
                            </div>
                          </article>
                        );
                      })
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
