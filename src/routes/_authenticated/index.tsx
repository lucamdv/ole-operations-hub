import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileDown,
  List,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { AuditEmptyState } from "@/components/audit/empty-state";
import { FindingsListDialog } from "@/components/audit/findings-list-dialog";
import { RunAuditButton } from "@/components/audit/run-audit-button";
import { NextRunCountdown } from "@/components/automation/next-run-countdown";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuditHistory, useLatestAudit } from "@/hooks/use-audit";
import { useProfile } from "@/hooks/use-settings";
import { countBySeverity, deriveKpis, groupByApolice, normalizeFinding } from "@/lib/audit/derive";
import type { LatestAudit } from "@/lib/audit/types";
import { formatDateTime, formatInt, formatPct, relativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/")({
  head: () => ({
    meta: [
      { title: "Visão Geral · OLÉ COPILOT" },
      {
        name: "description",
        content: "Leitura executiva do resultado mais recente da auditoria OLÉ.",
      },
    ],
  }),
  component: VisaoGeral,
});

function VisaoGeral() {
  const { data: latest, isLoading } = useLatestAudit();
  const { data: history = [] } = useAuditHistory();
  const { profile } = useProfile();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-8 w-72" />
          <Skeleton className="h-4 w-[min(100%,30rem)]" />
        </div>
        <Skeleton className="h-64 rounded-2xl" />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.75fr)]">
          <Skeleton className="h-80 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      </div>
    );
  }

  const firstName = (profile.nome || "").trim().split(/\s+/)[0] || "Operador";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

  return (
    <div className="space-y-8 sm:space-y-10">
      <PageHeader
        eyebrow={`${greeting}, ${firstName}`}
        title="Visão geral"
        description={
          latest?.run.created_at
            ? `Última auditoria ${relativeTime(latest.run.created_at)} · ${formatDateTime(latest.run.created_at)}`
            : "Execute uma auditoria para obter o primeiro diagnóstico da carteira."
        }
        actions={
          <div className="flex flex-col items-start gap-1.5 sm:items-end">
            <NextRunCountdown job="audit" />
            <RunAuditButton compact />
          </div>
        }
      />

      {!latest ? <AuditEmptyState /> : <AuditOverview latest={latest} history={history} />}
    </div>
  );
}

function AuditOverview({
  latest,
  history,
}: {
  latest: LatestAudit;
  history: NonNullable<ReturnType<typeof useAuditHistory>["data"]>;
}) {
  const kpis = deriveKpis({ latest, history });
  if (!kpis) return null;

  const severity = countBySeverity(latest.findings);
  const priorityPolicies = groupByApolice(latest.findings).slice(0, 5);
  const needsAttention = kpis.rejected > 0 || severity.erros > 0;
  const hasWarnings = !needsAttention && latest.findings.length > 0;
  const tone = needsAttention ? "danger" : hasWarnings ? "warning" : "success";
  const title = needsAttention
    ? "A auditoria encontrou pontos que exigem atenção."
    : hasWarnings
      ? "A carteira está estável, com ressalvas para revisar."
      : "A auditoria não encontrou desvios.";
  const description = needsAttention
    ? `${formatInt(kpis.affectedPolicies)} apólice${kpis.affectedPolicies === 1 ? " precisa" : "s precisam"} de revisão antes do próximo ciclo.`
    : hasWarnings
      ? "Não há falhas críticas, mas existem ocorrências informativas pendentes."
      : `${formatInt(kpis.audited)} apólices foram verificadas e estão em conformidade.`;

  return (
    <>
      <section
        className={cn(
          "relative overflow-hidden rounded-2xl border bg-surface px-5 py-6 shadow-soft sm:px-8 sm:py-8",
          tone === "danger" && "border-destructive/25",
          tone === "warning" && "border-warning/25",
          tone === "success" && "border-success/25",
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl",
            tone === "danger" && "bg-destructive/8",
            tone === "warning" && "bg-warning/8",
            tone === "success" && "bg-success/8",
          )}
        />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center">
          <div className="flex min-w-0 items-start gap-4 sm:gap-5">
            <div
              className={cn(
                "grid h-11 w-11 shrink-0 place-items-center rounded-xl border sm:h-12 sm:w-12",
                tone === "danger" && "border-destructive/25 bg-destructive/10 text-destructive",
                tone === "warning" && "border-warning/25 bg-warning/10 text-warning",
                tone === "success" && "border-success/25 bg-success/10 text-success",
              )}
            >
              {tone === "success" ? (
                <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <ShieldAlert className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </div>
            <div className="min-w-0">
              <div
                className={cn(
                  "mb-2 text-[10.5px] font-semibold uppercase tracking-[0.16em]",
                  tone === "danger" && "text-destructive",
                  tone === "warning" && "text-warning",
                  tone === "success" && "text-success",
                )}
              >
                Resultado da última auditoria
              </div>
              <h2 className="max-w-3xl text-xl font-semibold leading-tight tracking-[-0.025em] sm:text-2xl">
                {title}
              </h2>
              <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
                {description}
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div className="metric-label">Conformidade</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span
                className={cn(
                  "text-4xl font-semibold tracking-[-0.05em] tabular-nums",
                  tone === "success" ? "text-success" : "text-foreground",
                )}
              >
                {formatPct(kpis.approvedRate)}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {formatInt(kpis.approved)} de {formatInt(kpis.audited)} aprovadas
            </p>
          </div>
        </div>

        <div className="relative mt-7 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          <Signal
            label="Críticas"
            value={severity.erros}
            detail={severity.erros === 1 ? "ocorrência" : "ocorrências"}
            tone={severity.erros > 0 ? "danger" : "muted"}
          />
          <Signal
            label="Apólices afetadas"
            value={kpis.affectedPolicies}
            detail={`de ${formatInt(kpis.audited)} auditadas`}
            tone={kpis.affectedPolicies > 0 ? "warning" : "muted"}
          />
          <Signal
            label="Tipos de inconsistência"
            value={kpis.uniqueErrorTypes}
            detail={
              kpis.topErrorType
                ? `Mais frequente: ${kpis.topErrorType}`
                : "Nenhum desvio encontrado"
            }
            tone="muted"
          />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.75fr)]">
        <section className="panel overflow-hidden">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
            <div>
              <h2 className="section-title">Prioridades da auditoria</h2>
              <p className="caption mt-1">
                Apólices com maior volume de ocorrências na execução atual.
              </p>
            </div>
            {latest.findings.length > 0 && (
              <FindingsListDialog
                latest={latest}
                trigger={
                  <Button variant="ghost" size="sm" className="gap-1.5 text-[12px]">
                    <List className="h-3.5 w-3.5" /> Ver todos
                  </Button>
                }
              />
            )}
          </header>

          {priorityPolicies.length === 0 ? (
            <div className="flex min-h-56 flex-col items-center justify-center px-6 py-12 text-center">
              <CheckCircle2 className="mb-3 h-7 w-7 text-success" />
              <div className="text-sm font-semibold">Nada para tratar agora</div>
              <p className="mt-1 max-w-sm text-[12px] leading-relaxed text-muted-foreground">
                A execução mais recente terminou sem achados pendentes.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border/70">
              {priorityPolicies.map((group) => (
                <PriorityRow key={group.apolice} group={group} />
              ))}
            </div>
          )}
        </section>

        <aside className="panel h-fit overflow-hidden">
          <header className="border-b border-border px-5 py-4">
            <h2 className="section-title">Leitura rápida</h2>
            <p className="caption mt-1">Contexto suficiente para decidir o próximo passo.</p>
          </header>
          <div className="space-y-5 p-5">
            <div className="space-y-3">
              <AuditDetail
                icon={Clock3}
                label="Executada"
                value={formatDateTime(latest.run.created_at)}
              />
              <AuditDetail
                icon={CheckCircle2}
                label="Aprovadas"
                value={`${formatInt(latest.run.aprovados)} apólices`}
                tone="success"
              />
              <AuditDetail
                icon={AlertTriangle}
                label="Com inconsistências"
                value={`${formatInt(latest.run.reprovados)} apólices`}
                tone={latest.run.reprovados > 0 ? "danger" : "muted"}
              />
            </div>

            <div className="border-t border-border pt-5">
              <div className="metric-label mb-3">Próximo passo</div>
              <div className="space-y-2">
                {latest.findings.length > 0 && (
                  <Link
                    to="/alertas"
                    className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 text-[12.5px] font-medium transition hover:border-primary/30 hover:bg-surface-2"
                  >
                    Tratar ocorrências <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </Link>
                )}
                <Link
                  to="/operacao"
                  className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 text-[12.5px] font-medium transition hover:border-primary/30 hover:bg-surface-2"
                >
                  Acompanhar operação <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                </Link>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-[11.5px] text-muted-foreground transition hover:text-foreground"
              onClick={async () => {
                const { exportAuditPdf } = await import("@/lib/audit/export-pdf");
                exportAuditPdf(latest, history);
              }}
            >
              <FileDown className="h-3.5 w-3.5" /> Exportar relatório em PDF
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}

function Signal({
  label,
  value,
  detail,
  tone,
}: {
  label: string;
  value: number;
  detail: string;
  tone: "danger" | "warning" | "muted";
}) {
  return (
    <div className="min-w-0 bg-surface-2/70 px-4 py-4 sm:px-5">
      <div className="metric-label">{label}</div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span
          className={cn(
            "text-xl font-semibold tabular-nums",
            tone === "danger" && "text-destructive",
            tone === "warning" && "text-warning",
          )}
        >
          {formatInt(value)}
        </span>
        <span className="truncate text-[10.5px] text-muted-foreground">{detail}</span>
      </div>
    </div>
  );
}

function PriorityRow({ group }: { group: ReturnType<typeof groupByApolice>[number] }) {
  const severity = countBySeverity(group.findings);
  const lead = group.findings[0];
  const leadNormalized = lead ? normalizeFinding(lead) : null;
  const leadDetail = leadNormalized?.motivo || leadNormalized?.detalhe || "";
  const types = Array.from(new Set(group.findings.map((finding) => finding.tipo_erro)));

  return (
    <Link
      to="/apolices/$id"
      params={{ id: group.apolice }}
      className="group flex items-start gap-3 px-5 py-4 transition hover:bg-surface-2/60 sm:px-6"
    >
      <span
        className={cn(
          "mt-1.5 h-2 w-2 shrink-0 rounded-full",
          severity.erros > 0 ? "bg-destructive" : severity.alertas > 0 ? "bg-warning" : "bg-info",
        )}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-mono text-[12px] font-semibold text-foreground">
            {shortPolicy(group.apolice)}
          </span>
          <span className="text-[10.5px] text-muted-foreground">
            {formatInt(group.total)} {group.total === 1 ? "ocorrência" : "ocorrências"}
          </span>
        </div>
        <p className="mt-1 truncate text-[12px] font-medium text-foreground/90">
          {types.slice(0, 2).join(" · ")}
          {types.length > 2 ? ` +${types.length - 2}` : ""}
        </p>
        {leadDetail && (
          <p className="mt-1 line-clamp-1 text-[11px] text-muted-foreground">{leadDetail}</p>
        )}
      </div>
      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
    </Link>
  );
}

function AuditDetail({
  icon: Icon,
  label,
  value,
  tone = "muted",
}: {
  icon: typeof Clock3;
  label: string;
  value: string;
  tone?: "success" | "danger" | "muted";
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-muted/70 text-muted-foreground",
          tone === "success" && "bg-success/10 text-success",
          tone === "danger" && "bg-destructive/10 text-destructive",
        )}
      >
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="truncate text-[12.5px] font-medium">{value}</div>
      </div>
    </div>
  );
}

function shortPolicy(policy: string) {
  return policy.length > 18 ? `…${policy.slice(-16)}` : policy;
}
