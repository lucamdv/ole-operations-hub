export type OperationalScope = "production" | "homolog";
export type Integration = "audit" | "extraction" | "correction" | "policy_sync";
export type ExecutionSource = "manual" | "scheduler" | "callback";
export interface OperationalContext {
  readonly scope: OperationalScope;
  readonly schema: "public" | "homolog";
  readonly webhookMode: "production" | "test";
  readonly environment: "production" | "preview" | "development";
  readonly source: ExecutionSource;
}

export function resolveOperationalScope(input: {
  vercelEnvironment?: string;
  webhookMode?: string | null;
  source: ExecutionSource;
  requestedScope?: OperationalScope;
}): OperationalContext {
  const environment = input.vercelEnvironment || "development";
  if (!["manual", "scheduler", "callback"].includes(input.source))
    throw new Error("Origem operacional inválida.");
  if (!["production", "preview", "development"].includes(environment))
    throw new Error("Ambiente operacional desconhecido; operação bloqueada.");
  if (input.webhookMode && !["production", "test"].includes(input.webhookMode))
    throw new Error("Modo de webhook inválido.");
  if (input.source === "scheduler" && environment !== "production")
    throw new Error("Agendamentos indisponíveis neste ambiente.");
  const webhookMode =
    environment !== "production"
      ? "test"
      : input.source === "scheduler"
        ? "production"
        : (input.webhookMode ?? "production");
  const scope =
    environment === "production" && webhookMode === "production" ? "production" : "homolog";
  if (input.requestedScope && input.requestedScope !== scope)
    throw new Error("Destino operacional incompatível com o ambiente.");
  return Object.freeze({
    scope,
    schema: scope === "production" ? "public" : "homolog",
    environment: environment as OperationalContext["environment"],
    webhookMode: webhookMode as OperationalContext["webhookMode"],
    source: input.source,
  });
}
