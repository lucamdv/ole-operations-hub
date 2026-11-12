import type { Integration, OperationalContext } from "./scope.ts";
import { resolveWebhookUrl } from "../webhook-mode.ts";

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
  const key = `${prefix}_WEBHOOK_URL`;
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
  const resolved = resolveWebhookUrl(url.toString(), context.webhookMode);
  if (context.scope === "homolog" && !new URL(resolved).pathname.includes("/webhook-test/"))
    throw new Error(`URL de teste inválida em ${key}: esperado caminho /webhook-test/.`);
  return resolved;
}
