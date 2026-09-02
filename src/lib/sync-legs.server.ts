/**
 * Marca a conclusão de uma das duas vias assíncronas da sincronização
 * (emissões e cobranças) e fecha a run quando ambas terminarem.
 */
export async function markSyncLeg(
  runId: string,
  leg: "emissoes" | "cobrancas",
  outcome: {
    status: "success" | "partial" | "error";
    total?: number;
    errorMessage?: string;
  },
) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const now = new Date().toISOString();

  const { data: current } = await supabaseAdmin
    .from("policy_sync_runs")
    .select("status")
    .eq("id", runId)
    .maybeSingle();
  if ((current as { status: string } | null)?.status === "cancelled") return;

  const patch: Record<string, unknown> = {
    [`${leg}_status`]: outcome.status,
    [`${leg}_finished_at`]: outcome.status === "partial" ? null : now,
  };
  if (leg === "cobrancas" && typeof outcome.total === "number") {
    patch.cobrancas_total = outcome.total;
  }
  if (leg === "emissoes" && typeof outcome.total === "number") {
    patch.total_apolices = outcome.total;
  }
  if (outcome.errorMessage) patch.error_message = outcome.errorMessage.slice(0, 500);

  await supabaseAdmin
    .from("policy_sync_runs")
    .update(patch as never)
    .eq("id", runId)
    .neq("status", "cancelled");

  const { data: row } = await supabaseAdmin
    .from("policy_sync_runs")
    .select("status, emissoes_status, cobrancas_status, created_at")
    .eq("id", runId)
    .maybeSingle();
  const r = row as {
    status: string;
    emissoes_status: string;
    cobrancas_status: string;
    created_at: string;
  } | null;
  if (!r || r.status === "cancelled") return;

  const done = (s: string) => s === "success" || s === "partial" || s === "error";
  if (done(r.emissoes_status) && done(r.cobrancas_status)) {
    const failed = r.emissoes_status === "error" || r.cobrancas_status === "error";
    const recovering = r.emissoes_status === "partial" || r.cobrancas_status === "partial";
    await supabaseAdmin
      .from("policy_sync_runs")
      .update({
        status: failed ? "error" : recovering ? "partial" : "success",
        finished_at: now,
        duration_ms: Date.now() - new Date(r.created_at).getTime(),
      } as never)
      .eq("id", runId);
  }
}
