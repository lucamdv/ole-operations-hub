import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

/**
 * Verificação cooperativa entre as iterações do n8n.
 * O token é o mesmo segredo do callback; cada run é lida no contexto imutável
 * registrado no disparo. Nunca permite ao n8n trocar homolog por public.
 */
export const Route = createFileRoute("/api/public/audit-control")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const expected = process.env.AUDIT_CALLBACK_SECRET;
        const provided =
          request.headers.get("x-callback-secret") || request.headers.get("x-audit-secret");
        if (!expected || provided !== expected) return json({ error: "Unauthorized" }, 401);

        const url = new URL(request.url);
        const id = z.string().uuid().safeParse(url.searchParams.get("run_id"));
        const policy = z.string().regex(/^\d{1,120}$/).safeParse(url.searchParams.get("apolice"));
        if (!id.success || !policy.success)
          return json({ error: "Identificador de execução ou apólice inválido." }, 400);

        try {
          const { withRegisteredExecution } = await import("@/lib/environment/execution.server");
          return await withRegisteredExecution(id.data, "audit", async () => {
            const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
            const { data, error } = await supabaseAdmin
              .from("audit_runs")
              .select("status, created_at")
              .eq("id", id.data)
              .maybeSingle();
            if (error) return json({ error: "Falha ao consultar execução." }, 500);
            if (!data) return json({ error: "Execução não encontrada." }, 404);

            const elapsed = Date.now() - new Date(data.created_at).getTime();
            if (data.status === "running" && elapsed > 15 * 60_000) {
              const { error: expireError } = await supabaseAdmin
                .from("audit_runs")
                .update({
                  status: "error",
                  status_geral: "ERRO",
                  mensagem_geral: "Auditoria expirada: sem callback em 15 minutos.",
                  error_message: "Tempo limite de 15 minutos sem resultado do n8n.",
                } as never)
                .eq("id", id.data)
                .eq("status", "running");
              if (expireError) return json({ error: "Falha ao encerrar execução expirada." }, 500);
              return json({ continue: false, numero_apolice: policy.data, status: "error" });
            }
            return json({
              continue: data.status === "running",
              numero_apolice: policy.data,
              status: data.status,
            });
          });
        } catch {
          return json({ error: "Contexto da execução indisponível." }, 403);
        }
      },
    },
  },
});
