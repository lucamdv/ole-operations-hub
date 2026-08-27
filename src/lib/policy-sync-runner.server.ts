import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { getExcelsiorMotorConfig } from "@/lib/excelsior/motor-client.server";
import { executeDirectMotorSync } from "@/lib/excelsior/motor-sync.server";
import { keepRequestAlive } from "@/lib/request-lifecycle.server";
import type { WebhookMode } from "@/lib/webhook-mode";

// Implementação interna (sem auth). Usada tanto pela serverFn protegida quanto
// pelo hook público /api/public/hooks/policy-sync (que já valida shared-secret).
export async function runPolicySyncImpl(_webhookMode?: WebhookMode | null) {
  const { data: activeRun, error: activeRunError } = await supabaseAdmin
    .from("policy_sync_runs")
    .select("id")
    .eq("status", "running")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (activeRunError) throw new Error(activeRunError.message);
  if (activeRun) {
    return {
      runId: (activeRun as { id: string }).id,
      status: "running" as const,
      reused: true,
    };
  }

  // Falha antes de criar a run quando as credenciais diretas não existem.
  getExcelsiorMotorConfig();

  const syncStartedAt = new Date();
  const { data: runRow, error: insertError } = await supabaseAdmin
    .from("policy_sync_runs")
    .insert({ status: "running" } as never)
    .select("id")
    .single();
  if (insertError || !runRow) {
    // A unique parcial no banco resolve a corrida entre abas/requisições. Se
    // outra execução venceu o insert, reaproveitamos a run que já está ativa.
    const { data: concurrentRun } = await supabaseAdmin
      .from("policy_sync_runs")
      .select("id")
      .eq("status", "running")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (concurrentRun) {
      return {
        runId: (concurrentRun as { id: string }).id,
        status: "running" as const,
        reused: true,
      };
    }
    throw new Error(`Falha ao criar run: ${insertError?.message ?? "sem id"}`);
  }
  const runId = (runRow as { id: string }).id;

  const work = (async () => {
    try {
      await executeDirectMotorSync(runId, syncStartedAt);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const now = new Date().toISOString();
      await supabaseAdmin
        .from("policy_sync_runs")
        .update({
          status: "error",
          error_message: `Motor direto: ${message}`.slice(0, 500),
          finished_at: now,
          emissoes_status: "error",
          emissoes_finished_at: now,
          cobrancas_status: "error",
          cobrancas_finished_at: now,
        } as never)
        .eq("id", runId)
        .neq("status", "cancelled");
    }
  })();

  // Nitro injeta waitUntil no Request em produção (Vercel). No servidor local,
  // a Promise continua viva no processo Node após a resposta.
  try {
    keepRequestAlive(work);
  } catch {
    // Chamadas internas sem contexto HTTP ainda executam `work` no processo.
  }

  return { runId, status: "running" as const, reused: false };
}
