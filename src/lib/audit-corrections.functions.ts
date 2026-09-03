import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { AuditFindingRow } from "@/lib/audit/types";
import { resolveWebhookUrl } from "@/lib/webhook-mode";

const RequestCorrectionSchema = z.object({
  run_id: z.string().uuid(),
  finding_ids: z.array(z.string().uuid()).min(1).max(500),
  mode: z.enum(["test", "production"]).optional(),
});

function correctionIncidentKey(
  finding: Pick<AuditFindingRow, "apolice" | "tipo_erro" | "endosso">,
) {
  return `${finding.apolice}||${finding.tipo_erro}||${(finding.endosso ?? "").trim()}`;
}

export const requestAuditCorrection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((value: z.infer<typeof RequestCorrectionSchema>) =>
    RequestCorrectionSchema.parse(value),
  )
  .handler(async ({ data, context }) => {
    const rawWebhookUrl = process.env.N8N_CORRECTION_WEBHOOK_URL?.trim();
    if (!rawWebhookUrl) {
      throw new Error("Secret N8N_CORRECTION_WEBHOOK_URL não configurada no servidor.");
    }
    const webhookUrl = resolveWebhookUrl(rawWebhookUrl, data.mode);
    let parsedWebhookUrl: URL;
    try {
      parsedWebhookUrl = new URL(webhookUrl);
    } catch {
      throw new Error("Secret N8N_CORRECTION_WEBHOOK_URL contém uma URL inválida.");
    }
    if (parsedWebhookUrl.protocol !== "https:") {
      throw new Error("O webhook de correção deve usar HTTPS.");
    }

    const findingIds = Array.from(new Set(data.finding_ids));
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [{ data: rows, error }, { data: latestRun, error: runError }] = await Promise.all([
      supabaseAdmin
        .from("audit_findings")
        .select(
          "id, run_id, apolice, tipo_erro, endosso, data_inicio, data_fim, detalhes, created_at",
        )
        .eq("run_id", data.run_id)
        .in("id", findingIds),
      supabaseAdmin
        .from("audit_runs")
        .select("id")
        .eq("status", "success")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);

    if (error) throw new Error(`Falha ao carregar ocorrências: ${error.message}`);
    if (runError) throw new Error(`Falha ao validar a auditoria: ${runError.message}`);
    if ((latestRun as { id: string } | null)?.id !== data.run_id) {
      throw new Error(
        "A auditoria exibida não é mais a mais recente. Atualize a tela e tente novamente.",
      );
    }
    if ((rows ?? []).length !== findingIds.length) {
      throw new Error("Uma ou mais ocorrências não pertencem à auditoria selecionada.");
    }

    const selectedFindings = (rows ?? []) as unknown as AuditFindingRow[];
    const correctionMode = data.mode ?? "production";
    const { buildAuditCorrectionPayload } = await import("@/lib/audit/correction-payload");
    const payload = buildAuditCorrectionPayload({
      runId: data.run_id,
      requestedBy: context.userId,
      findings: selectedFindings,
    });

    let response: Response;
    try {
      response = await fetch(parsedWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(30_000),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha de rede";
      throw new Error(`Não foi possível solicitar a correção: ${message}`);
    }

    if (!response.ok) {
      if (response.status === 404 && data.mode === "test") {
        throw new Error(
          'Webhook n8n (modo teste) não está escutando. Clique em "Listen for test event" no n8n.',
        );
      }
      throw new Error(`Webhook de correção retornou HTTP ${response.status}.`);
    }

    // Registra a primeira resposta operacional somente depois que o n8n aceita o pedido.
    // Isso não resolve nem silencia o achado; a auditoria seguinte continua sendo a
    // única confirmação de conclusão.
    const policies = Array.from(new Set(selectedFindings.map((finding) => finding.apolice)));
    const errorTypes = Array.from(new Set(selectedFindings.map((finding) => finding.tipo_erro)));
    const [{ data: history, error: historyError }, { data: resolutions, error: resolutionError }] =
      await Promise.all([
        supabaseAdmin
          .from("audit_findings")
          .select("apolice, tipo_erro, endosso, created_at")
          .in("apolice", policies)
          .in("tipo_erro", errorTypes)
          .order("created_at", { ascending: true }),
        supabaseAdmin
          .from("audit_resolutions")
          .select("apolice, tipo_erro, endosso, reopened_at")
          .in("apolice", policies)
          .in("tipo_erro", errorTypes)
          .not("reopened_at", "is", null),
      ]);

    let trackingRecorded = false;
    if (historyError || resolutionError) {
      console.error("Falha ao preparar o registro de primeira resposta", {
        historyError: historyError?.message,
        resolutionError: resolutionError?.message,
      });
    } else {
      const reopenedAtByIncident = new Map<string, number>();
      for (const resolution of (resolutions ?? []) as Array<{
        apolice: string;
        tipo_erro: string;
        endosso: string | null;
        reopened_at: string | null;
      }>) {
        if (!resolution.reopened_at) continue;
        const key = correctionIncidentKey(resolution);
        const timestamp = +new Date(resolution.reopened_at);
        if (Number.isFinite(timestamp)) {
          reopenedAtByIncident.set(key, Math.max(reopenedAtByIncident.get(key) ?? 0, timestamp));
        }
      }

      const firstSeenByIncident = new Map<string, string>();
      for (const finding of (history ?? []) as Array<{
        apolice: string;
        tipo_erro: string;
        endosso: string | null;
        created_at: string;
      }>) {
        const key = correctionIncidentKey(finding);
        const createdAt = +new Date(finding.created_at);
        if (createdAt < (reopenedAtByIncident.get(key) ?? 0)) continue;
        if (!firstSeenByIncident.has(key)) firstSeenByIncident.set(key, finding.created_at);
      }

      const respondedAt = new Date().toISOString();
      const responseRows = selectedFindings.map((finding) => {
        const details = (finding.detalhes ?? {}) as unknown as Record<string, unknown>;
        const rawLevel = details["nivel"];
        const incidentKey = correctionIncidentKey(finding);
        return {
          incident_key: incidentKey,
          finding_id: finding.id,
          run_id: finding.run_id,
          apolice: finding.apolice,
          tipo_erro: finding.tipo_erro,
          endosso: finding.endosso,
          nivel: typeof rawLevel === "string" ? rawLevel : null,
          detected_at: firstSeenByIncident.get(incidentKey) ?? finding.created_at,
          responded_at: respondedAt,
          requested_by: context.userId,
          mode: correctionMode,
        };
      });
      const { error: trackingError } = await supabaseAdmin
        .from("audit_correction_responses")
        .upsert(responseRows, {
          onConflict: "incident_key,detected_at,mode",
          ignoreDuplicates: true,
        });
      trackingRecorded = !trackingError;
      if (trackingError) {
        console.error("Webhook aceito, mas a primeira resposta não foi registrada", {
          message: trackingError.message,
        });
      }
    }

    // O webhook confirma apenas o recebimento HTTP; não há payload de resposta.
    // A resolução continua sendo confirmada pela ausência do erro na auditoria seguinte.
    return {
      accepted: true as const,
      policies: payload.total_apolices,
      occurrences: payload.total_ocorrencias,
      groups: payload.total_grupos_erros,
      trackingRecorded,
    };
  });
