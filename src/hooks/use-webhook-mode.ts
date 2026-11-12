import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_WEBHOOK_MODE,
  WEBHOOK_MODE_KEYS,
  readWebhookPreferences,
  updateWebhookPreference,
  type WebhookIntegration,
  type WebhookMode,
} from "@/lib/webhook-mode";

type Listener = (integration: WebhookIntegration, mode: WebhookMode) => void;
const listeners = new Set<Listener>();

function read(integration: WebhookIntegration): WebhookMode {
  if (typeof window === "undefined") return DEFAULT_WEBHOOK_MODE;
  try {
    return readWebhookPreferences(window.localStorage)[integration];
  } catch {
    return "test";
  }
}

/** Preferência por integração e navegador; não controla dashboards ou schedulers. */
export function useWebhookMode(integration: WebhookIntegration = "audit") {
  const [mode, setMode] = useState<WebhookMode>(DEFAULT_WEBHOOK_MODE);

  useEffect(() => {
    setMode(read(integration));
    const l: Listener = (changed, next) => {
      if (changed === integration) setMode(next);
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === WEBHOOK_MODE_KEYS[integration]) {
        setMode(read(integration));
      }
    };
    listeners.add(l);
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(l);
      window.removeEventListener("storage", onStorage);
    };
  }, [integration]);

  const update = useCallback(
    (next: WebhookMode) => {
      try {
        // Inicializa as demais preferências legadas antes da primeira alteração.
        const preferences = readWebhookPreferences(window.localStorage);
        const updated = updateWebhookPreference(preferences, integration, next);
        window.localStorage.setItem(WEBHOOK_MODE_KEYS[integration], updated[integration]);
      } catch {
        // Mantém a escolha em memória quando o navegador não permite persistência.
      }
      setMode(next);
      listeners.forEach((l) => l(integration, next));
    },
    [integration],
  );

  return { mode, setMode: update, isProduction: mode === "production" };
}
