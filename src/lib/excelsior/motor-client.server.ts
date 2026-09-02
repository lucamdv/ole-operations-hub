import { flattenApiItems, isJsonRecord, type JsonRecord } from "./motor-sync.core";

// The public api.sistemaexcelsior.com.br hostname is protected by Cloudflare and
// rejects requests coming from Vercel with HTTP 403. The Azure hostname reaches
// the same Excelsior services directly and exposes every MOTOR endpoint used
// below, so all server-to-server traffic must use it.
const DEFAULT_SERVICES_BASE_URL = "https://servicos-excelsior-prod.azure-api.net";

interface MotorClientConfig {
  username: string;
  password: string;
  servicesBaseUrl: string;
  systemId: string;
  requestTimeoutMs: number;
  billingRequestTimeoutMs: number;
}

function positiveInteger(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function secureBaseUrl(value: string | undefined, fallback: string, variableName: string) {
  const url = new URL(value || fallback);
  if (url.protocol !== "https:") {
    throw new Error(`${variableName} deve usar HTTPS.`);
  }
  return url.toString().replace(/\/$/, "");
}

export function getExcelsiorMotorConfig(): MotorClientConfig {
  const username = process.env.EXCELSIOR_API_USERNAME?.trim();
  const password = process.env.EXCELSIOR_API_PASSWORD;
  const missing = [
    ...(!username ? ["EXCELSIOR_API_USERNAME"] : []),
    ...(!password ? ["EXCELSIOR_API_PASSWORD"] : []),
  ];
  if (missing.length > 0) {
    throw new Error(`Credenciais da API Excelsior não configuradas: ${missing.join(", ")}.`);
  }

  const requestTimeoutMs = positiveInteger(process.env.EXCELSIOR_REQUEST_TIMEOUT_MS, 30_000);
  return {
    username: username!,
    password: password!,
    // EXCELSIOR_CONTRACTS_BASE_URL is kept as a backwards-compatible alias so
    // the production deployment starts using the direct host without an env
    // migration. EXCELSIOR_SERVICES_BASE_URL is the canonical name going forward.
    servicesBaseUrl: secureBaseUrl(
      process.env.EXCELSIOR_SERVICES_BASE_URL ?? process.env.EXCELSIOR_CONTRACTS_BASE_URL,
      DEFAULT_SERVICES_BASE_URL,
      "EXCELSIOR_SERVICES_BASE_URL",
    ),
    systemId: process.env.EXCELSIOR_SYSTEM_ID?.trim() || "1009",
    requestTimeoutMs,
    // As listagens de cobrança são relatórios maiores e, em produção, podem
    // ultrapassar os 30 s usados pelas consultas unitárias do MOTOR.
    billingRequestTimeoutMs: positiveInteger(
      process.env.EXCELSIOR_BILLING_REQUEST_TIMEOUT_MS,
      Math.max(requestTimeoutMs, 120_000),
    ),
  };
}

export function isExcelsiorMotorConfigured() {
  return !!(process.env.EXCELSIOR_API_USERNAME?.trim() && process.env.EXCELSIOR_API_PASSWORD);
}

class ExcelsiorApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ExcelsiorApiError";
  }
}

function retryDelay(response: Response | null, attempt: number) {
  const retryAfter = response?.headers.get("retry-after");
  if (retryAfter) {
    const seconds = Number(retryAfter);
    if (Number.isFinite(seconds)) return Math.min(seconds * 1_000, 10_000);
  }
  return Math.min(400 * 2 ** attempt, 3_000);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function responseErrorDetail(response: Response) {
  const cloudflare = response.headers.get("server")?.toLowerCase() === "cloudflare";
  const text = await response.text();
  try {
    const body = JSON.parse(text) as unknown;
    if (isJsonRecord(body)) {
      const direct = body.mensagem ?? body.message;
      if (typeof direct === "string" && direct.trim()) return direct.trim().slice(0, 240);
      if (Array.isArray(body.erros)) {
        const messages = body.erros
          .filter(isJsonRecord)
          .map((item) => item.mensagem ?? item.message)
          .filter((item): item is string => typeof item === "string" && !!item.trim());
        if (messages.length > 0) return messages.join("; ").slice(0, 240);
      }
    }
  } catch {
    // HTML/proxy error pages are intentionally not propagated to the UI.
  }
  return cloudflare ? "requisição bloqueada pelo Cloudflare" : null;
}

export class ExcelsiorMotorClient {
  private token: string | null = null;
  private loginPromise: Promise<string> | null = null;

  constructor(private readonly config = getExcelsiorMotorConfig()) {}

  private async requestJson(
    label: string,
    url: URL,
    init: RequestInit,
    options: { attempts?: number; timeoutMs?: number } = {},
  ): Promise<unknown> {
    const attempts = options.attempts ?? 3;
    const timeoutMs = options.timeoutMs ?? this.config.requestTimeoutMs;
    let lastError: unknown;
    for (let attempt = 0; attempt < attempts; attempt++) {
      let response: Response | null = null;
      try {
        response = await fetch(url, {
          ...init,
          headers: { Accept: "application/json", ...init.headers },
          signal: AbortSignal.timeout(timeoutMs),
        });
        if (response.ok) {
          const text = await response.text();
          if (!text.trim()) return {};
          try {
            return JSON.parse(text) as unknown;
          } catch {
            throw new ExcelsiorApiError(`${label}: resposta JSON inválida.`, response.status);
          }
        }

        const retryable = response.status === 429 || response.status >= 500;
        if (!retryable || attempt === attempts - 1) {
          const detail = await responseErrorDetail(response);
          throw new ExcelsiorApiError(
            `${label}: API retornou HTTP ${response.status}${detail ? ` (${detail})` : ""}.`,
            response.status,
          );
        }
      } catch (error) {
        lastError = error;
        if (error instanceof ExcelsiorApiError && error.status < 500 && error.status !== 429) {
          throw error;
        }
        if (attempt === attempts - 1) break;
      }
      await delay(retryDelay(response, attempt));
    }

    if (lastError instanceof Error) {
      const timedOut =
        lastError.name === "TimeoutError" || /aborted due to timeout|timed? ?out/i.test(lastError.message);
      if (timedOut) {
        throw new Error(`${label}: tempo limite de ${Math.round(timeoutMs / 1_000)}s excedido.`);
      }
      throw new Error(`${label}: ${lastError.message}`);
    }
    throw new Error(`${label}: falha de rede.`);
  }

  private async login(force = false) {
    if (!force && this.token) return this.token;
    if (!force && this.loginPromise) return this.loginPromise;

    this.loginPromise = (async () => {
      const response = await this.requestJson(
        "Autenticação Excelsior",
        new URL("/v1/login", this.config.servicesBaseUrl),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuario: this.config.username,
            senha: this.config.password,
          }),
        },
        { attempts: 2 },
      );
      const token = isJsonRecord(response) ? response.token : null;
      if (typeof token !== "string" || !token.trim()) {
        throw new Error("Autenticação Excelsior: token ausente na resposta.");
      }
      this.token = token;
      return token;
    })();

    try {
      return await this.loginPromise;
    } finally {
      this.loginPromise = null;
    }
  }

  private async authorizedRequest(
    label: string,
    url: URL,
    init: RequestInit = {},
    options: { attempts?: number; timeoutMs?: number } = {},
  ): Promise<unknown> {
    let token = await this.login();
    try {
      return await this.requestJson(
        label,
        url,
        {
          ...init,
          headers: { ...init.headers, Authorization: `Bearer ${token}` },
        },
        options,
      );
    } catch (error) {
      if (!(error instanceof ExcelsiorApiError) || error.status !== 401) throw error;
      token = await this.login(true);
      return this.requestJson(
        label,
        url,
        {
          ...init,
          headers: { ...init.headers, Authorization: `Bearer ${token}` },
        },
        options,
      );
    }
  }

  async listPolicies() {
    const url = new URL("/backoffice/ro/emissao/", this.config.servicesBaseUrl);
    url.searchParams.set("sistema", this.config.systemId);
    return this.authorizedRequest("Listagem de apólices", url);
  }

  async getContract(policyNumber: string): Promise<JsonRecord> {
    const url = new URL(
      `/backoffice/ro/contratos/${encodeURIComponent(policyNumber)}`,
      this.config.servicesBaseUrl,
    );
    const response = await this.authorizedRequest("Consulta de contrato", url);
    const responseIsContract =
      isJsonRecord(response) &&
      ["ultimo_endosso", "numero_ultimo_endosso", "ultimoEndosso", "numero_apolice"].some(
        (key) => response[key] !== undefined,
      );
    const item = responseIsContract
      ? response
      : Array.isArray(response) && isJsonRecord(response[0])
        ? response[0]
        : flattenApiItems(response)[0];
    if (!item) throw new Error(`Contrato ${policyNumber}: resposta vazia.`);
    return item;
  }

  async getIssuanceDocument(documentNumber: string) {
    const url = new URL(
      `/backoffice/ro/emissao/${encodeURIComponent(documentNumber)}`,
      this.config.servicesBaseUrl,
    );
    // A prova estática fornecida validou este recurso por GET. Além de expressar
    // corretamente uma leitura, evita repetir o POST sem corpo do workflow legado.
    const response = await this.authorizedRequest("Consulta de emissão", url, { method: "GET" });
    return Array.isArray(response) && response.length === 1 ? response[0] : response;
  }

  async listOpenBilling() {
    const url = new URL("/backoffice/cobranca/parcelas/", this.config.servicesBaseUrl);
    url.searchParams.set("tipo", "Emissao");
    url.searchParams.set("quitacao", "Aberta");
    url.searchParams.set("situacao", "Ativo");
    url.searchParams.set("sistemaorigem", this.config.systemId);
    return this.authorizedRequest("Listagem de parcelas abertas", url, {}, {
      attempts: 2,
      timeoutMs: this.config.billingRequestTimeoutMs,
    });
  }

  async getBillingDocument(documentNumber: string) {
    const url = new URL(
      `/backoffice/cobranca/parcelas/${encodeURIComponent(documentNumber)}/1`,
      this.config.servicesBaseUrl,
    );
    // O detalhe é apenas um fallback para itens incompletos da listagem em lote.
    // Não deve bloquear toda a carteira quando um documento isolado fica preso.
    return this.authorizedRequest(`Consulta individual de cobrança ${documentNumber}`, url, {}, {
      attempts: 1,
    });
  }

  async listSettledBilling(start: string, end: string) {
    const url = new URL("/backoffice/cobranca/parcelas/", this.config.servicesBaseUrl);
    url.searchParams.set("tipo", "Emissao");
    url.searchParams.set("inicio", start);
    url.searchParams.set("fim", end);
    url.searchParams.set("quitacao", "Total");
    url.searchParams.set("situacao", "Ativo");
    url.searchParams.set("sistemaorigem", this.config.systemId);
    return this.authorizedRequest("Listagem de parcelas quitadas", url, {}, {
      attempts: 2,
      timeoutMs: this.config.billingRequestTimeoutMs,
    });
  }

  async testConnection() {
    const response = await this.listPolicies();
    return { reachable: true, records: flattenApiItems(response).length };
  }
}
