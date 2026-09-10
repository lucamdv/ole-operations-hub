import { createFileRoute } from "@tanstack/react-router";
import { runDueAutomations } from "@/lib/automation-scheduler.server";

/**
 * Entrada protegida para chamadas manuais/externas. O mesmo avaliador também é
 * acionado pelo tick interno do Supabase usado pelo worker de cobrança.
 */
async function handleScheduler(request: Request, viaVercelCron = false) {
  const expected = viaVercelCron
    ? process.env.CRON_SECRET
    : process.env.SCHEDULER_HOOK_SECRET || process.env.POLICY_SYNC_HOOK_SECRET;
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  if (!expected) {
    return json({ ok: false, error: "segredo do agendador não configurado" }, 500);
  }
  const provided = viaVercelCron
    ? request.headers.get("authorization")
    : request.headers.get("x-hook-secret");
  const valid = viaVercelCron ? provided === `Bearer ${expected}` : provided === expected;
  if (!valid) return json({ ok: false, error: "unauthorized" }, 401);

  try {
    const result = await runDueAutomations();
    return json({ ok: true, ...result });
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : String(error) }, 500);
  }
}

export const Route = createFileRoute("/api/public/hooks/scheduler")({
  server: {
    handlers: {
      GET: async ({ request }) => handleScheduler(request, true),
      POST: async ({ request }) => handleScheduler(request, false),
    },
  },
});
