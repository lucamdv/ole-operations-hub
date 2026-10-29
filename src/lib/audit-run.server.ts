import type { WebhookMode } from "@/lib/webhook-mode";
import {
  withIntegrationContext,
  getOperationalContext,
  assertProductionScheduler,
} from "./environment/context.server.ts";
import { resolveIntegrationWebhook } from "./environment/webhooks.server.ts";
import { registerExecution } from "./environment/execution.server.ts";
import { buildAuditTriggerPayload } from "./audit/trigger-payload.ts";
import { AuditCallbackConfigurationError, resolveAuditCallbackUrl } from "./audit/callback-url.ts";
import { AuditPreparationError } from "./audit/exclusions-snapshot.server.ts";

// Implementação server-only do disparo da auditoria.
// Usada tanto pela server function protegida (botão manual) quanto pelo
// agendador público /api/public/hooks/scheduler.

class AuditDispatchError extends Error {}

export async function runAuditImpl(trigger = "ole-copilot", webhookMode?: WebhookMode | null) {
  if (trigger === "scheduler") assertProductionScheduler();
  return withIntegrationContext(webhookMode, () => dispatchAudit(trigger));
}

async function dispatchAudit(trigger: string) {
  const url = resolveIntegrationWebhook("audit", getOperationalContext());
  if (!url) {
    throw new Error(
      "Secret N8N_AUDIT_WEBHOOK_URL não configurada. Cole a URL de produção do webhook n8n (/webhook/...) nos secrets do projeto.",
    );
  }
  const { supabaseAdmin, loadProductionAuditExclusionsSnapshot } =
    await import("@/integrations/supabase/client.server");

  const { data: runRow, error: insertErr } = await supabaseAdmin
    .from("audit_runs")
    .insert({
      status: "running",
      status_geral: "PROCESSANDO",
      total_processado: 0,
      aprovados: 0,
      reprovados: 0,
      origem: trigger === "scheduler" ? "auto" : "manual",
      raw: {},
    } as never)
    .select("id")
    .single();

  if (insertErr || !runRow) {
    throw new Error("Falha ao criar execução da auditoria.");
  }

  const runId = (runRow as { id: string }).id;

  const startedAt = Date.now();
  let phase: "preparing" | "persisting" | "sending" = "preparing";
  try {
    await registerExecution(runId, "audit");
    // Configuration failures after insert must also close the run as error.
    const callbackUrl = resolveAuditCallbackUrl(runId, process.env);

    const snapshot = await loadProductionAuditExclusionsSnapshot();
    const payload = buildAuditTriggerPayload({
      runId,
      callbackUrl,
      trigger,
      at: new Date().toISOString(),
      snapshot,
    });
    phase = "persisting";
    // Best-effort historical retention: the unchanged callback replaces raw later.
    const { error: snapshotError } = await supabaseAdmin
      .from("audit_runs")
      .update({ raw: { ...payload, exclusions_diagnostics: snapshot.diagnostics } } as never)
      .eq("id", runId);
    if (snapshotError) throw new AuditDispatchError("Falha ao persistir snapshot da auditoria.");

    console.info("[audit-run] contrato preparado", {
      run_id: runId,
      audit_contract_version: payload.audit_contract_version,
      excluded_policies: payload.apolices_excluidas.length,
      specific_exceptions: payload.excecoes_especificas.length,
      duplicate_policies: snapshot.diagnostics.duplicatePolicies,
      duplicate_specific_exceptions: snapshot.diagnostics.duplicateSpecificExceptions,
      invalid_specific_exceptions: snapshot.diagnostics.invalidSpecificExceptions,
      historical_whole_policy_ignores: snapshot.diagnostics.historicalWholePolicyIgnores.length,
      historical_status_divergences: snapshot.diagnostics.historicalWholePolicyIgnores.filter(
        (entry) =>
          entry.operationalStatus !== "CANCELADA" && entry.operationalStatus !== "SUSPENSA",
      ).length,
      preparation_ms: Date.now() - startedAt,
    });
    phase = "sending";
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(30_000),
    });

    if (!res.ok) {
      const errMsg =
        res.status === 404 && url.includes("/webhook-test/")
          ? 'Webhook n8n (modo teste) não está escutando. Clique em "Listen for test event" no n8n.'
          : `Motor de auditoria retornou HTTP ${res.status}.`;
      throw new AuditDispatchError(errMsg);
    }
    console.info("[audit-run] webhook acionado", {
      run_id: runId,
      audit_contract_version: 2,
      http_status: res.status,
    });
  } catch (err) {
    const msg =
      err instanceof AuditPreparationError ||
      err instanceof AuditDispatchError ||
      err instanceof AuditCallbackConfigurationError
        ? err.message
        : phase === "sending"
          ? "Falha de rede ou tempo limite ao acionar o webhook de auditoria."
          : phase === "persisting"
            ? "Falha ao persistir snapshot da auditoria."
            : "Falha na preparação ou validação do contrato de auditoria.";
    console.error("[audit-run] falha no acionamento", { run_id: runId, phase, error: msg });
    let closed = false;
    for (let attempt = 0; attempt < 2 && !closed; attempt++) {
      try {
        const { error } = await supabaseAdmin
          .from("audit_runs")
          .update({
            status: "error",
            status_geral: "ERRO",
            error_message: msg,
            duration_ms: Date.now() - startedAt,
          } as never)
          .eq("id", runId);
        closed = !error;
      } catch {
        /* Retry a transient failure without logging provider data. */
      }
    }
    if (!closed)
      console.error("[audit-run] falha ao encerrar execução com status error", { run_id: runId });
    const closingError = closed ? "" : " Também não foi possível registrar status error no banco.";
    throw new Error(`Não foi possível disparar a auditoria: ${msg}${closingError}`);
  }

  return { runId, status: "running" as const };
}
