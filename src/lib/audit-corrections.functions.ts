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

    const { buildAuditCorrectionPayload } = await import("@/lib/audit/correction-payload");
    const payload = buildAuditCorrectionPayload({
      runId: data.run_id,
      requestedBy: context.userId,
      findings: (rows ?? []) as unknown as AuditFindingRow[],
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

    // O webhook confirma apenas o recebimento HTTP; não há payload de resposta.
    // A resolução continua sendo confirmada pela ausência do erro na auditoria seguinte.
    return {
      accepted: true as const,
      policies: payload.total_apolices,
      occurrences: payload.total_ocorrencias,
      groups: payload.total_grupos_erros,
    };
  });
