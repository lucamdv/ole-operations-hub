import { r as resolveWebhookUrl } from "./webhook-mode-DKZeQYsl.mjs";
const EMPTY_SUMMARY = {
  aprovados: 0,
  reprovados: 0,
  total_processado: 0
};
async function runAuditImpl(trigger = "ole-copilot", webhookMode) {
  const rawUrl = process.env.N8N_AUDIT_WEBHOOK_URL;
  const url = rawUrl ? resolveWebhookUrl(rawUrl, webhookMode) : rawUrl;
  if (!url) {
    throw new Error(
      "Secret N8N_AUDIT_WEBHOOK_URL não configurada. Cole a URL de produção do webhook n8n (/webhook/...) nos secrets do projeto."
    );
  }
  const { supabaseAdmin } = await import("./client.server-BIG6Ien0.mjs");
  const { data: runRow, error: insertErr } = await supabaseAdmin.from("audit_runs").insert({
    status: "running",
    status_geral: "PROCESSANDO",
    total_processado: 0,
    aprovados: 0,
    reprovados: 0,
    origem: trigger === "scheduler" ? "auto" : "manual",
    raw: {}
  }).select("id").single();
  if (insertErr || !runRow) {
    throw new Error("Falha ao criar run: " + (insertErr?.message ?? "sem id"));
  }
  const runId = runRow.id;
  const base = process.env.PUBLIC_APP_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (!base) throw new Error("PUBLIC_APP_URL não configurada e nenhuma URL da Vercel disponível.");
  const normalizedBase = /^https?:\/\//.test(base) ? base : `https://${base}`;
  const callbackUrl = `${normalizedBase.replace(/\/$/, "")}/api/public/audit-callback?run_id=${runId}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        run_id: runId,
        callback_url: callbackUrl,
        trigger,
        mode: "async_callback",
        status_geral: "PROCESSANDO",
        mensagem_geral: "Auditoria em processamento.",
        resumo: EMPTY_SUMMARY,
        apolices_com_erro: [],
        at: (/* @__PURE__ */ new Date()).toISOString()
      }),
      signal: AbortSignal.timeout(3e4)
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      const errMsg = res.status === 404 && url.includes("/webhook-test/") ? 'Webhook n8n (modo teste) não está escutando. Clique em "Listen for test event" no n8n.' : `Motor de auditoria retornou ${res.status}: ${body.slice(0, 200)}`;
      await supabaseAdmin.from("audit_runs").update({ status: "error", error_message: errMsg }).eq("id", runId);
      throw new Error(errMsg);
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Falha de rede";
    await supabaseAdmin.from("audit_runs").update({ status: "error", error_message: msg }).eq("id", runId);
    throw new Error(`Não foi possível disparar a auditoria: ${msg}`);
  }
  return { runId, status: "running" };
}
export {
  runAuditImpl
};
