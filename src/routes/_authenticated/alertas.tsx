import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  EyeOff,
  History,
  Layers,
  Loader2,
  Search,
  Sparkles,
} from "lucide-react";
import { useLatestAudit } from "@/hooks/use-audit";
import { useFindingRecurrence } from "@/hooks/use-audit-recurrence";
import { useEscalationRules } from "@/hooks/use-escalation-rules";
import { useUrgencyOverrides } from "@/hooks/use-urgency-overrides";
import { useAddAuditIgnore, useAuditIgnores } from "@/hooks/use-audit-ignores";
import { useAuditResolutions } from "@/hooks/use-audit-resolutions";
import { useRequestAuditCorrection } from "@/hooks/use-audit-corrections";
import {
  buildAlertItems,
  keyOf,
  sortAlerts,
  type AlertItem,
  type SortKey,
} from "@/lib/audit/alert-view";
import { URGENCY_LABEL, URGENCY_ORDER, type Urgency } from "@/lib/audit/escalation";
import { downloadAlertsCsv } from "@/lib/audit/export-alerts";
import { relativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { IncidentRow } from "@/components/alertas/incident-row";
import { IncidentDetail } from "@/components/alertas/incident-detail";
import { ResolvedTab } from "@/components/alertas/resolved-tab";
import { ExceptionsTab } from "@/components/alertas/exceptions-tab";
import { URG_DOT, URG_TEXT } from "@/components/alertas/urgency-ui";
import {
  IgnoreReasonDialog,
  type IgnoreReasonResult,
} from "@/components/exceptions/ignore-reason-dialog";

export const Route = createFileRoute("/_authenticated/alertas")({
  head: () => ({
    meta: [
      { title: "Alertas · OLÉ COPILOT" },
      {
        name: "description",
        content:
          "Centro de operações: incidentes abertos com escalonamento de urgência, reincidência e histórico de resolvidos.",
      },
      { property: "og:title", content: "Alertas · OLÉ COPILOT" },
      {
        property: "og:description",
        content: "Incidentes abertos, reincidência por auditoria e histórico de erros resolvidos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AlertasPage,
});

type Tab = "abertos" | "resolvidos" | "excecoes";
type AgeFilter = "all" | "novo" | "1a7" | "mais7";

function AlertasPage() {
  const { data: latest, isLoading, error } = useLatestAudit();
  const { data: recurrence } = useFindingRecurrence();
  const { rules } = useEscalationRules();
  const { overrides, setOverride, clearOverride } = useUrgencyOverrides();
  const { data: resolutions = [] } = useAuditResolutions();
  const { data: ignores = [] } = useAuditIgnores();
  const correction = useRequestAuditCorrection();
  const addIgnore = useAddAuditIgnore();

  const [tab, setTab] = useState<Tab>("abertos");
  const [urg, setUrg] = useState<Urgency | "all">("all");
  const [tipo, setTipo] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [onlyRecurring, setOnlyRecurring] = useState(false);
  const [onlyReopened, setOnlyReopened] = useState(false);
  const [age, setAge] = useState<AgeFilter>("all");
  const [sort, setSort] = useState<SortKey>("urgencia");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [detail, setDetail] = useState<AlertItem | null>(null);
  const [ignoreTarget, setIgnoreTarget] = useState<AlertItem | null>(null);
  const [ignorePolicyTarget, setIgnorePolicyTarget] = useState<{
    apolice: string;
    total: number;
  } | null>(null);

  const run = latest?.run ?? null;

  const items = useMemo(
    () => buildAlertItems(latest?.findings ?? [], recurrence?.items ?? [], rules, overrides),
    [latest, recurrence, rules, overrides],
  );

  const tipos = useMemo(() => Array.from(new Set(items.map((i) => i.f.tipo_erro))).sort(), [items]);

  const counts = useMemo(() => {
    const c: Record<Urgency, number> = { baixa: 0, media: 0, alta: 0, critica: 0 };
    let reincidentes = 0;
    let novos = 0;
    for (const i of items) {
      c[i.urgency]++;
      if (i.recorrenteNaApolice) reincidentes++;
      if (i.occurrences <= 1 && !i.recorrenteNaApolice) novos++;
    }
    return { c, reincidentes, novos };
  }, [items]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const out = items.filter((i) => {
      if (urg !== "all" && i.urgency !== urg) return false;
      if (tipo !== "all" && i.f.tipo_erro !== tipo) return false;
      if (onlyRecurring && !i.recorrenteNaApolice) return false;
      if (onlyReopened && !i.reopened) return false;
      if (age === "novo" && i.daysOpen > 0) return false;
      if (age === "1a7" && (i.daysOpen < 1 || i.daysOpen > 7)) return false;
      if (age === "mais7" && i.daysOpen <= 7) return false;
      if (q) {
        const hay =
          `${i.f.apolice} ${i.f.tipo_erro} ${i.motivo} ${i.detalhe} ${i.endosso ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    return sortAlerts(out, sort);
  }, [items, urg, tipo, onlyRecurring, onlyReopened, age, search, sort]);

  const groups = useMemo(() => {
    const allByPolicy = new Map<string, AlertItem[]>();
    for (const item of items) {
      const list = allByPolicy.get(item.f.apolice) ?? [];
      list.push(item);
      allByPolicy.set(item.f.apolice, list);
    }

    const visibleByPolicy = new Map<string, AlertItem[]>();
    for (const i of filtered) {
      const list = visibleByPolicy.get(i.f.apolice) ?? [];
      list.push(i);
      visibleByPolicy.set(i.f.apolice, list);
    }
    return [...visibleByPolicy.entries()]
      .map(([apolice, visibleItems]) => ({
        apolice,
        visibleItems,
        allItems: allByPolicy.get(apolice) ?? visibleItems,
      }))
      .sort((a, b) => b.allItems.length - a.allItems.length);
  }, [filtered, items]);

  const toggleSelect = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const selectedItems = items.filter((i) => selected.has(i.f.id));

  const togglePolicy = (policyItems: AlertItem[]) =>
    setSelected((previous) => {
      const next = new Set(previous);
      const allSelected = policyItems.every((item) => next.has(item.f.id));
      for (const item of policyItems) {
        if (allSelected) next.delete(item.f.id);
        else next.add(item.f.id);
      }
      return next;
    });

  const requestCorrection = (targets: AlertItem[], clearSelection = false) => {
    if (!run || targets.length === 0) return;
    correction.mutate(
      {
        run_id: run.id,
        finding_ids: Array.from(new Set(targets.map((item) => item.f.id))),
      },
      {
        onSuccess: () => {
          if (clearSelection) setSelected(new Set());
        },
      },
    );
  };

  const confirmIgnore = (res: IgnoreReasonResult) => {
    if (ignorePolicyTarget) {
      addIgnore.mutate({
        apolice: ignorePolicyTarget.apolice,
        tipo_erro: null,
        motivo: res.motivo,
        reason_tag_id: res.reason_tag_id,
      });
    } else {
      const targets = ignoreTarget ? [ignoreTarget] : selectedItems;
      for (const i of targets) {
        addIgnore.mutate({
          apolice: i.f.apolice,
          tipo_erro: i.f.tipo_erro,
          motivo: res.motivo,
          reason_tag_id: res.reason_tag_id,
        });
      }
    }
    setIgnoreTarget(null);
    setIgnorePolicyTarget(null);
    setSelected(new Set());
    setBulkIgnoreOpen(false);
  };

  const [bulkIgnoreOpen, setBulkIgnoreOpen] = useState(false);

  const setUrgency = (i: AlertItem, u: Urgency) => setOverride(i.key, u);
  const clearUrgency = (i: AlertItem) => {
    clearOverride(i.key);
    // chave antiga (sem endosso), para overrides definidos antes desta versão
    clearOverride(`${i.f.apolice}||${i.f.tipo_erro}`);
  };

  const bulkSetUrgency = (u: Urgency) => {
    for (const i of selectedItems) setOverride(i.key, u);
    setSelected(new Set());
  };

  const detailKey = detail ? keyOf(detail.f.apolice, detail.f.tipo_erro, detail.f.endosso) : null;
  const detailRuns = (recurrence?.items ?? []).find((r) => r.key === detailKey)?.runs ?? [];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-warning">
              SOC · INCIDENT VIEW
            </span>
          </div>
          <h1 className="page-title">Alertas</h1>
          <p className="page-subtitle mt-1.5">
            {isLoading
              ? "Carregando incidentes…"
              : run
                ? `${filtered.length} de ${items.length} visíveis · última auditoria ${relativeTime(run.created_at)}`
                : "Nenhuma auditoria executada ainda."}
          </p>
        </div>
        {tab === "abertos" && (
          <div className="flex w-full flex-wrap items-center gap-2 md:w-auto">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por apólice, tipo, motivo…"
                className="h-9 w-full rounded-lg border border-border bg-surface pl-8 pr-3 text-[12.5px] placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none"
              />
            </div>
            <button
              onClick={() => downloadAlertsCsv(filtered)}
              disabled={filtered.length === 0}
              className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-surface px-3 text-[12px] transition hover:border-primary/60 disabled:opacity-50"
            >
              <Download className="h-3.5 w-3.5" /> CSV
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-border">
        {(
          [
            { id: "abertos", label: "Abertos", icon: AlertTriangle },
            { id: "resolvidos", label: "Resolvidos", icon: CheckCircle2 },
            { id: "excecoes", label: "Exceções", icon: EyeOff },
          ] as const
        ).map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "-mb-px inline-flex h-10 items-center gap-1.5 border-b-2 px-4 text-[13px] font-medium transition",
                tab === t.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === "resolvidos" && <ResolvedTab />}
      {tab === "excecoes" && <ExceptionsTab />}

      {tab === "abertos" && (
        <>
          {error && (
            <div className="rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-[12px] text-destructive">
              Falha ao carregar findings: {error.message}
            </div>
          )}

          {/* Urgency tiles */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
            <button
              onClick={() => setUrg("all")}
              className={cn(
                "rounded-xl border bg-surface p-4 text-left transition hover:border-primary/30",
                urg === "all" ? "border-primary/60 shadow-glow" : "border-border",
              )}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Todos
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              </div>
              <div className="text-[20px] font-semibold tabular-nums sm:text-[24px]">
                {isLoading ? <Skeleton className="h-7 w-12" /> : items.length}
              </div>
              <div className="text-[11px] text-muted-foreground">incidentes abertos</div>
            </button>
            {[...URGENCY_ORDER].reverse().map((u) => (
              <button
                key={u}
                onClick={() => setUrg(urg === u ? "all" : u)}
                className={cn(
                  "rounded-xl border bg-surface p-4 text-left transition hover:border-primary/30",
                  urg === u ? "border-primary/60 shadow-glow" : "border-border",
                )}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span
                    className={cn(
                      "text-[10.5px] font-semibold uppercase tracking-wider",
                      URG_TEXT[u],
                    )}
                  >
                    {URGENCY_LABEL[u]}
                  </span>
                  <span className={cn("h-1.5 w-1.5 rounded-full", URG_DOT[u])} />
                </div>
                <div className="text-[20px] font-semibold tabular-nums sm:text-[24px]">
                  {isLoading ? <Skeleton className="h-7 w-12" /> : counts.c[u]}
                </div>
                <div className="text-[11px] text-muted-foreground">urgência {URGENCY_LABEL[u]}</div>
              </button>
            ))}
            <button
              onClick={() => setOnlyRecurring((v) => !v)}
              className={cn(
                "rounded-xl border bg-surface p-4 text-left transition hover:border-primary/30",
                onlyRecurring ? "border-primary/60 shadow-glow" : "border-border",
              )}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10.5px] font-semibold uppercase tracking-wider text-warning">
                  reincidentes
                </span>
                <History className="h-3 w-3 text-warning" />
              </div>
              <div className="text-[20px] font-semibold tabular-nums sm:text-[24px]">
                {isLoading ? <Skeleton className="h-7 w-12" /> : counts.reincidentes}
              </div>
              <div className="text-[11px] text-muted-foreground">
                mesmo erro em endosso anterior · {counts.novos} novos
              </div>
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-muted-foreground">Tipo:</span>
            <button
              onClick={() => setTipo("all")}
              className={cn(
                "h-7 rounded-md border px-2.5 text-[11.5px] font-medium transition",
                tipo === "all"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-surface text-muted-foreground hover:text-foreground",
              )}
            >
              Todos
            </button>
            {tipos.map((t) => (
              <button
                key={t}
                onClick={() => setTipo(tipo === t ? "all" : t)}
                className={cn(
                  "h-7 rounded-md border px-2.5 text-[11.5px] font-medium transition",
                  tipo === t
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-surface text-muted-foreground hover:text-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={age}
              onChange={(e) => setAge(e.target.value as AgeFilter)}
              className="h-8 rounded-md border border-border bg-surface px-2 text-[12px] outline-none"
            >
              <option value="all">Qualquer idade</option>
              <option value="novo">Aberto hoje</option>
              <option value="1a7">1 a 7 dias</option>
              <option value="mais7">Mais de 7 dias</option>
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-8 rounded-md border border-border bg-surface px-2 text-[12px] outline-none"
            >
              <option value="urgencia">Ordenar por urgência</option>
              <option value="idade">Ordenar por idade</option>
              <option value="reincidencia">Ordenar por reincidência</option>
              <option value="apolice">Ordenar por apólice</option>
            </select>
            <button
              onClick={() => setOnlyReopened((v) => !v)}
              className={cn(
                "h-8 rounded-md border px-2.5 text-[12px] transition",
                onlyReopened
                  ? "border-destructive bg-destructive/10 text-destructive"
                  : "border-border bg-surface text-muted-foreground hover:text-foreground",
              )}
            >
              Só reabertos
            </button>
          </div>

          {/* Bulk bar */}
          {selectedItems.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-primary/40 bg-primary/5 px-4 py-2.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-[12.5px] font-medium">
                {selectedItems.length} ocorrência(s) selecionada(s) em{" "}
                {new Set(selectedItems.map((item) => item.f.apolice)).size} apólice(s)
              </span>
              <button
                onClick={() => requestCorrection(selectedItems, true)}
                disabled={correction.isPending || !run}
                className="inline-flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-[12px] font-semibold uppercase tracking-wide text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {correction.isPending ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Sparkles className="h-3.5 w-3.5" />
                )}
                Solucionar seleção
              </button>
              <button
                onClick={() => setBulkIgnoreOpen(true)}
                className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-[12px] transition hover:border-warning/60 hover:text-warning"
              >
                <EyeOff className="h-3.5 w-3.5" /> Ignorar em lote
              </button>
              <select
                defaultValue=""
                onChange={(e) => {
                  if (e.target.value) bulkSetUrgency(e.target.value as Urgency);
                }}
                className="h-8 rounded-md border border-border bg-surface px-2 text-[12px] outline-none"
              >
                <option value="">Definir nível…</option>
                {[...URGENCY_ORDER].reverse().map((u) => (
                  <option key={u} value={u}>
                    {URGENCY_LABEL[u]}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setSelected(new Set())}
                className="h-8 rounded-md px-2 text-[12px] text-muted-foreground hover:text-foreground"
              >
                Limpar seleção
              </button>
            </div>
          )}

          {/* List */}
          <div className="space-y-2">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-[96px] rounded-xl" />
              ))
            ) : filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-surface px-5 py-10 text-center">
                <AlertTriangle className="mx-auto mb-3 h-7 w-7 text-muted-foreground" />
                <div className="mb-1 text-[13px] font-semibold">
                  {items.length === 0
                    ? "Nenhum incidente na última auditoria"
                    : "Nenhum incidente com esses filtros"}
                </div>
                <p className="text-[11.5px] text-muted-foreground">
                  {items.length === 0
                    ? "Carteira em conformidade ou auditoria ainda não executada."
                    : "Ajuste os filtros para ver mais resultados."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {groups.map((group) => {
                  const selectedCount = group.allItems.filter((item) =>
                    selected.has(item.f.id),
                  ).length;
                  const allSelected = selectedCount === group.allItems.length;
                  const uniqueTypes = new Set(group.allItems.map((item) => item.f.tipo_erro)).size;

                  return (
                    <section
                      key={group.apolice}
                      className="overflow-hidden rounded-xl border border-border bg-surface"
                    >
                      <div className="flex flex-col gap-3 bg-surface-2/50 px-3 py-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex min-w-0 items-start gap-3">
                          <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={() => togglePolicy(group.allItems)}
                            aria-label={`Selecionar todas as ocorrências da apólice ${group.apolice}`}
                            title={`${selectedCount} de ${group.allItems.length} ocorrência(s) selecionada(s)`}
                            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--primary)]"
                          />
                          <Layers className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
                                Apólice
                              </span>
                              <span className="break-all font-mono text-[12.5px] font-semibold text-foreground">
                                {group.apolice}
                              </span>
                            </div>
                            <div className="mt-1 text-[11px] text-muted-foreground">
                              {group.allItems.length} ocorrência(s) · {uniqueTypes} tipo(s) de erro
                              {group.visibleItems.length !== group.allItems.length
                                ? ` · ${group.visibleItems.length} visível(is) com os filtros atuais`
                                : ""}
                              {selectedCount > 0 ? ` · ${selectedCount} selecionada(s)` : ""}
                            </div>
                          </div>
                        </div>

                        <div className="flex shrink-0 flex-wrap items-center gap-2 pl-7 lg:pl-0">
                          <button
                            onClick={() =>
                              setIgnorePolicyTarget({
                                apolice: group.apolice,
                                total: group.allItems.length,
                              })
                            }
                            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface px-3 text-[11.5px] transition hover:border-warning/60 hover:text-warning"
                          >
                            <EyeOff className="h-3.5 w-3.5" /> Ignorar apólice
                          </button>
                          <button
                            onClick={() => requestCorrection(group.allItems)}
                            disabled={correction.isPending || !run}
                            className="inline-flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-[11.5px] font-semibold uppercase tracking-wide text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {correction.isPending ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Sparkles className="h-3.5 w-3.5" />
                            )}
                            Solucionar
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 border-t border-border p-2">
                        {group.visibleItems.map((item) => (
                          <IncidentRow
                            key={item.f.id}
                            item={item}
                            selected={selected.has(item.f.id)}
                            onToggleSelect={toggleSelect}
                            onOpen={setDetail}
                            onIgnore={setIgnoreTarget}
                            onSetUrgency={setUrgency}
                            onClearUrgency={clearUrgency}
                          />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      <IncidentDetail
        item={detail}
        runs={recurrence?.runs ?? []}
        itemRuns={detailRuns}
        resolutions={resolutions.filter(
          (r) =>
            detail != null && r.apolice === detail.f.apolice && r.tipo_erro === detail.f.tipo_erro,
        )}
        ignores={ignores.filter(
          (g) =>
            detail != null &&
            g.apolice === detail.f.apolice &&
            (g.tipo_erro === null || g.tipo_erro === detail.f.tipo_erro),
        )}
        onOpenChange={(v) => !v && setDetail(null)}
        onIgnore={(i) => {
          setDetail(null);
          setIgnoreTarget(i);
        }}
        onSetUrgency={(i, u) => {
          setUrgency(i, u);
          setDetail({ ...i, urgency: u, manualUrgency: u });
        }}
        onClearUrgency={(i) => {
          clearUrgency(i);
          setDetail({ ...i, urgency: i.autoUrgency, manualUrgency: null });
        }}
      />

      <IgnoreReasonDialog
        open={!!ignoreTarget || !!ignorePolicyTarget || bulkIgnoreOpen}
        onOpenChange={(v) => {
          if (!v) {
            setIgnoreTarget(null);
            setIgnorePolicyTarget(null);
            setBulkIgnoreOpen(false);
          }
        }}
        targetLabel={
          ignorePolicyTarget
            ? `Apólice ${ignorePolicyTarget.apolice} · ${ignorePolicyTarget.total} ocorrência(s)`
            : ignoreTarget
              ? `${ignoreTarget.f.tipo_erro} · apólice …${ignoreTarget.f.apolice.slice(-12)}`
              : `${selectedItems.length} ocorrência(s) selecionada(s)`
        }
        pending={addIgnore.isPending}
        onConfirm={confirmIgnore}
      />
    </div>
  );
}
