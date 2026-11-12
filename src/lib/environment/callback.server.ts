import { z } from "zod";
import { withOperationalContext } from "./context.server.ts";
import {
  executionRepository,
  resolveRegisteredExecution,
  type ExecutionRepository,
} from "./execution.server.ts";
import { resolveOperationalScope, type Integration } from "./scope.ts";

const json = (error: string, status: number) =>
  new Response(JSON.stringify({ error }), {
    status,
    headers: { "Content-Type": "application/json" },
  });

function envelopeIdentity(
  value: unknown,
  depth = 0,
  identity = { ids: [] as unknown[], scopes: [] as unknown[] },
) {
  if (depth > 12) throw new Error("Envelope de callback muito profundo.");
  if (Array.isArray(value)) {
    for (const item of value) envelopeIdentity(item, depth + 1, identity);
  } else if (value && typeof value === "object") {
    const row = value as Record<string, unknown>;
    if (row.run_id != null) identity.ids.push(row.run_id);
    if (row.scope != null) identity.scopes.push(row.scope);
    if (row.data_scope != null) identity.scopes.push(row.data_scope);
    // These are all structural envelopes accepted by the existing callbacks.
    for (const key of ["payload", "body", "json"]) {
      if (row[key] && typeof row[key] === "object") envelopeIdentity(row[key], depth + 1, identity);
    }
  }
  return identity;
}

export async function handleScopedCallback(
  request: Request,
  options: {
    integration: Integration;
    secrets: Array<string | undefined>;
    handler: () => Promise<Response>;
    repository?: ExecutionRepository;
  },
): Promise<Response> {
  const provided =
    request.headers.get("x-callback-secret") || request.headers.get("x-audit-secret");
  if (!provided || !options.secrets.some((secret) => !!secret && secret === provided))
    return json("Unauthorized", 401);
  let identity: ReturnType<typeof envelopeIdentity>;
  try {
    const body = await request.clone().json();
    identity = envelopeIdentity(body);
  } catch {
    return json("Invalid JSON", 400);
  }
  const url = new URL(request.url);
  const ids = [...url.searchParams.getAll("run_id"), ...identity.ids];
  const runId = ids[0];
  if (ids.some((id) => id !== runId)) return json("Identificadores da execução divergentes.", 400);
  if (!z.string().uuid().safeParse(runId).success)
    return json("Identificador de execução inválido ou ausente.", 400);
  try {
    const repository = options.repository ?? (await executionRepository());
    const record = await repository.find(runId as string);
    let context;
    if (record) {
      try {
        context = await resolveRegisteredExecution(
          runId as string,
          options.integration,
          { find: async () => record },
          process.env.VERCEL_ENV,
        );
      } catch {
        return json("Contexto, integração ou origem da execução incompatível.", 403);
      }
    } else {
      // Compatibility for already-running legacy production jobs only. Never search homolog.
      // New jobs register before dispatch; registration failures close them as error.
      if (options.repository || process.env.VERCEL_ENV !== "production")
        return json("Execução não encontrada.", 404);
      const { supabaseAdmin } = await import("../../integrations/supabase/client.server.ts");
      const table =
        options.integration === "audit"
          ? "audit_runs"
          : options.integration === "extraction"
            ? "endorsement_extraction_runs"
            : "policy_sync_runs";
      const { data, error } = await supabaseAdmin
        .from(table)
        .select("id, status")
        .eq("id", runId as string)
        .maybeSingle();
      if (error) return json("Falha ao consultar execução legada.", 500);
      if (!data || data.status !== "running") return json("Execução não encontrada.", 404);
      context = resolveOperationalScope({ vercelEnvironment: "production", source: "callback" });
    }
    const hints = [
      ...url.searchParams.getAll("scope"),
      ...url.searchParams.getAll("data_scope"),
      ...identity.scopes,
    ];
    if (hints.some((hint) => hint != null && hint !== context.scope && hint !== context.schema))
      return json("Tentativa de alterar o destino da execução.", 403);
    return await withOperationalContext(context, options.handler);
  } catch {
    return json("Falha técnica ao validar o contexto da execução.", 500);
  }
}
