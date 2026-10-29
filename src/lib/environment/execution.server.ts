import { z } from "zod";
import { getOperationalContext, withOperationalContext } from "./context.server.ts";
import { resolveOperationalScope, type Integration, type OperationalContext } from "./scope.ts";

const RunId = z.string().uuid();
const RecordSchema = z.object({
  run_id: RunId,
  integration: z.enum(["audit", "extraction", "correction", "policy_sync"]),
  data_scope: z.enum(["production", "homolog"]),
  webhook_mode: z.enum(["production", "test"]),
  origin_environment: z.enum(["production", "preview", "development"]),
});
export type ExecutionRecord = z.infer<typeof RecordSchema>;
export interface ExecutionRepository {
  find(runId: string): Promise<unknown>;
  findLegacy?(runId: string, integration: Integration): Promise<unknown>;
}
export function createExecutionRecord(
  runId: string,
  integration: Integration,
  context: OperationalContext,
): ExecutionRecord {
  return RecordSchema.parse({
    run_id: runId,
    integration,
    data_scope: context.scope,
    webhook_mode: context.webhookMode,
    origin_environment: context.environment,
  });
}
export async function executionRepository(): Promise<ExecutionRepository> {
  const { executionRegistry } = await import("@/integrations/supabase/client.server");
  return {
    async find(runId) {
      const { data, error } = await executionRegistry()
        .select("*")
        .eq("run_id", runId)
        .maybeSingle();
      if (error) throw new Error("Falha ao consultar o contexto da execução.");
      return data;
    },
    async findLegacy(runId, integration) {
      // Read compatibility only: never search homolog or trust the browser's current mode.
      const context = getOperationalContext();
      if (context.environment !== "production" || context.scope !== "production") return null;
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const table =
        integration === "audit"
          ? "audit_runs"
          : integration === "extraction"
            ? "endorsement_extraction_runs"
            : "policy_sync_runs";
      const { data, error } = await supabaseAdmin
        .from(table)
        .select("id,status")
        .eq("id", runId)
        .maybeSingle();
      if (error) throw new Error("Falha ao consultar status da execução legada.");
      return data;
    },
  };
}
export async function registerExecution(runId: string, integration: Integration) {
  const record = createExecutionRecord(runId, integration, getOperationalContext());
  const { executionRegistry } = await import("@/integrations/supabase/client.server");
  const { error } = await executionRegistry().insert(record);
  if (error) throw new Error("Falha ao registrar o destino imutável da execução.");
}
export async function resolveRegisteredExecution(
  runId: string,
  integration: Integration,
  repository: ExecutionRepository,
  deploymentEnvironment: string | undefined,
): Promise<OperationalContext> {
  if (!RunId.safeParse(runId).success) throw new Error("Identificador de execução inválido.");
  const row = RecordSchema.safeParse(await repository.find(runId));
  if (!row.success) throw new Error("Contexto da execução não encontrado ou inválido.");
  const record = row.data;
  if (record.run_id !== runId || record.integration !== integration)
    throw new Error("Execução não pertence à integração solicitada.");
  if (record.origin_environment !== (deploymentEnvironment || "development"))
    throw new Error("Execução pertence a outro ambiente de origem.");
  return resolveOperationalScope({
    vercelEnvironment: deploymentEnvironment,
    webhookMode: record.webhook_mode,
    requestedScope: record.data_scope,
    source: "callback",
  });
}

export async function withRegisteredExecution<T>(
  runId: string,
  integration: Integration,
  action: () => T,
): Promise<Awaited<T>> {
  const repository = await executionRepository();
  const context = await resolveStatusExecution(
    runId,
    integration,
    repository,
    process.env.VERCEL_ENV,
  );
  return await withOperationalContext(context, action);
}

export async function resolveStatusExecution(
  runId: string,
  integration: Integration,
  repository: ExecutionRepository,
  deploymentEnvironment: string | undefined,
): Promise<OperationalContext> {
  if (!RunId.safeParse(runId).success) throw new Error("Identificador de execução inválido.");
  const record = await repository.find(runId);
  if (record)
    return resolveRegisteredExecution(
      runId,
      integration,
      { find: async () => record },
      deploymentEnvironment,
    );
  if (deploymentEnvironment === "production" && repository.findLegacy) {
    const legacy = z
      .object({
        id: RunId,
        status: z.enum(["running", "success", "error", "partial", "cancelled"]),
      })
      .safeParse(await repository.findLegacy(runId, integration));
    if (legacy.success && legacy.data.id === runId)
      return resolveOperationalScope({ vercelEnvironment: "production", source: "callback" });
  }
  throw new Error("Contexto da execução não encontrado ou inválido.");
}
