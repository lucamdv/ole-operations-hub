import { createFileRoute } from "@tanstack/react-router";
import { processBillingFallbacks } from "@/lib/billing-retry-worker.server";
import { keepRequestAlive } from "@/lib/request-lifecycle.server";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const Route = createFileRoute("/api/public/hooks/billing-retry")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const expected =
          process.env.BILLING_RETRY_HOOK_SECRET ?? process.env.POLICY_SYNC_HOOK_SECRET;
        const provided = request.headers.get("x-hook-secret");
        if (!expected || provided !== expected) return json({ error: "Unauthorized" }, 401);

        keepRequestAlive(
          processBillingFallbacks(2).catch((error) => {
            console.error("[billing-retry] worker falhou", error);
          }),
        );
        return json({ accepted: true }, 202);
      },
    },
  },
});
