/**
 * Modo do webhook n8n por usuário (preferência local, não afeta outros users).
 * - "production": usa o caminho /webhook/ (fluxo ativo do n8n)
 * - "test": usa o caminho /webhook-test/ (requer "Listen for test event" no n8n)
 */
export type WebhookMode = "test" | "production";
export type WebhookIntegration = "audit" | "extraction" | "correction";
export type WebhookPreferences = Record<WebhookIntegration, WebhookMode>;

/** Chave legada: somente leitura para migrar a preferência global existente. */
export const WEBHOOK_MODE_KEY = "ole.webhook.mode.v1";
export const DEFAULT_WEBHOOK_MODE: WebhookMode = "production";
export const WEBHOOK_MODE_KEYS: Record<WebhookIntegration, string> = {
  audit: "ole.webhook.mode.v2.audit",
  extraction: "ole.webhook.mode.v2.extraction",
  correction: "ole.webhook.mode.v2.correction",
};

function normalizeMode(value: unknown): WebhookMode {
  if (value === null || value === undefined) return DEFAULT_WEBHOOK_MODE;
  return value === "production" ? "production" : "test";
}

/** Resolve cada preferência isoladamente; valores corrompidos falham em modo teste. */
export function resolveWebhookPreferences(
  preferences: Partial<Record<WebhookIntegration, unknown>>,
  legacyMode?: unknown,
): WebhookPreferences {
  return {
    audit: normalizeMode(preferences.audit ?? legacyMode),
    extraction: normalizeMode(preferences.extraction ?? legacyMode),
    correction: normalizeMode(preferences.correction ?? legacyMode),
  };
}

export function updateWebhookPreference(
  preferences: WebhookPreferences,
  integration: WebhookIntegration,
  mode: WebhookMode,
): WebhookPreferences {
  return { ...preferences, [integration]: normalizeMode(mode) };
}

/** Migra todas as chaves juntas, antes de permitir a alteração de uma integração. */
export function readWebhookPreferences(
  storage: Pick<Storage, "getItem" | "setItem">,
): WebhookPreferences {
  let stored: Partial<Record<WebhookIntegration, unknown>>;
  let legacy: string | null;
  try {
    legacy = storage.getItem(WEBHOOK_MODE_KEY);
    stored = {
      audit: storage.getItem(WEBHOOK_MODE_KEYS.audit),
      extraction: storage.getItem(WEBHOOK_MODE_KEYS.extraction),
      correction: storage.getItem(WEBHOOK_MODE_KEYS.correction),
    };
  } catch {
    return { audit: "test", extraction: "test", correction: "test" };
  }
  const preferences = resolveWebhookPreferences(stored, legacy);
  for (const integration of Object.keys(WEBHOOK_MODE_KEYS) as WebhookIntegration[]) {
    if (stored[integration] !== preferences[integration]) {
      try {
        storage.setItem(WEBHOOK_MODE_KEYS[integration], preferences[integration]);
      } catch {
        // Navegadores com storage restrito ainda podem usar a preferência nesta sessão.
      }
    }
  }
  return preferences;
}

export function resolveWebhookUrl(url: string, mode?: WebhookMode | null): string {
  if (!mode) return url;
  if (mode === "production") return url.replace("/webhook-test/", "/webhook/");
  return url.includes("/webhook-test/") ? url : url.replace("/webhook/", "/webhook-test/");
}
