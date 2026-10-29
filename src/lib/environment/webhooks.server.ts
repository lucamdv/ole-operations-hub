import type { Integration, OperationalContext } from "./scope.ts";

const names = {
  audit: "N8N_AUDIT",
  extraction: "N8N_ENDORSEMENT",
  correction: "N8N_CORRECTION",
  policy_sync: "N8N_MOTOR_POLICIES",
} as const;
export function resolveIntegrationWebhook(
  integration: Integration,
  context: OperationalContext,
  env: Record<string, string | undefined> = process.env,
): string {
  const prefix = names[integration];
  const key =
    context.scope === "homolog" ? `${prefix}_HOMOLOG_WEBHOOK_URL` : `${prefix}_WEBHOOK_URL`;
  const raw = env[key]?.trim();
  if (!raw) throw new Error(`Destino ${context.scope} da integração não configurado (${key}).`);
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`URL inválida em ${key}.`);
  }
  if (url.protocol !== "https:" || url.username || url.password)
    throw new Error(`URL insegura em ${key}.`);
  if (context.scope === "homolog") {
    if (
      env.HOMOLOG_EXTERNAL_WEBHOOKS_ENABLED !== "true" ||
      !url.pathname.includes("/webhook-test/")
    )
      throw new Error("Webhook isolado de homologação não habilitado. Operação externa bloqueada.");
    return url.toString();
  }
  return url.toString().replace("/webhook-test/", "/webhook/");
}
