async function markSyncLeg(runId, leg, outcome) {
  const { supabaseAdmin } = await import("./client.server-BIG6Ien0.mjs");
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const { data: current } = await supabaseAdmin.from("policy_sync_runs").select("status").eq("id", runId).maybeSingle();
  if (current?.status === "cancelled") return;
  const patch = {
    [`${leg}_status`]: outcome.status,
    [`${leg}_finished_at`]: now
  };
  if (leg === "cobrancas" && typeof outcome.total === "number") {
    patch.cobrancas_total = outcome.total;
  }
  if (leg === "emissoes" && typeof outcome.total === "number") {
    patch.total_apolices = outcome.total;
  }
  if (outcome.errorMessage) patch.error_message = outcome.errorMessage.slice(0, 500);
  await supabaseAdmin.from("policy_sync_runs").update(patch).eq("id", runId).neq("status", "cancelled");
  const { data: row } = await supabaseAdmin.from("policy_sync_runs").select("status, emissoes_status, cobrancas_status, created_at").eq("id", runId).maybeSingle();
  const r = row;
  if (!r || r.status === "cancelled") return;
  const done = (s) => s === "success" || s === "error";
  if (done(r.emissoes_status) && done(r.cobrancas_status)) {
    const failed = r.emissoes_status === "error" || r.cobrancas_status === "error";
    await supabaseAdmin.from("policy_sync_runs").update({
      status: failed ? "error" : "success",
      finished_at: now,
      duration_ms: Date.now() - new Date(r.created_at).getTime()
    }).eq("id", runId);
  }
}
export {
  markSyncLeg
};
