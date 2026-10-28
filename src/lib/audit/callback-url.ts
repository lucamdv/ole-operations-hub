export interface AuditCallbackEnvironment {
  VERCEL_ENV?: string;
  VERCEL_URL?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
  PUBLIC_APP_URL?: string;
}

export class AuditCallbackConfigurationError extends Error {}

function origin(value: string | undefined, key: string, local = false): string {
  try {
    if (!value?.trim()) throw new Error();
    const normalized = value.trim();
    const url = new URL(/^https?:\/\//.test(normalized) ? normalized : `https://${normalized}`);
    if (
      (url.protocol !== "https:" && !(local && url.protocol === "http:")) ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    )
      throw new Error();
    return url.origin;
  } catch {
    throw new AuditCallbackConfigurationError(`URL de callback inválida ou ausente em ${key}.`);
  }
}

/** Preview must never inherit a production callback, even when PUBLIC_APP_URL is shared. */
export function resolveAuditCallbackUrl(runId: string, env: AuditCallbackEnvironment): string {
  let base: string;
  if (env.VERCEL_ENV === "preview") {
    base = origin(env.VERCEL_URL, "VERCEL_URL (preview)");
    if (!new URL(base).hostname.endsWith(".vercel.app")) {
      throw new AuditCallbackConfigurationError(
        "VERCEL_URL deve identificar o deployment Preview.",
      );
    }
    for (const configured of [env.PUBLIC_APP_URL, env.VERCEL_PROJECT_PRODUCTION_URL]) {
      if (!configured) continue;
      // Invalid production config cannot redirect Preview; only a matching valid origin blocks it.
      let productionOrigin: string | undefined;
      try {
        productionOrigin = origin(configured, "domínio público");
      } catch {
        /* Not a fallback. */
      }
      if (base === productionOrigin) {
        throw new AuditCallbackConfigurationError(
          "VERCEL_URL do Preview coincide com o domínio de produção.",
        );
      }
    }
  } else if (env.VERCEL_ENV === "production") {
    base = origin(
      env.PUBLIC_APP_URL || env.VERCEL_PROJECT_PRODUCTION_URL || env.VERCEL_URL,
      "PUBLIC_APP_URL / domínio Vercel de produção",
    );
  } else {
    base = origin(env.PUBLIC_APP_URL, "PUBLIC_APP_URL", true);
  }
  return `${base}/api/public/audit-callback?run_id=${encodeURIComponent(runId)}`;
}
