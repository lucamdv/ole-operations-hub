const ENVELOPE_KEYS = [
  "parcelas",
  "dados",
  "data",
  "items",
  "results",
  "apolices",
  "policies"
];
function isJsonRecord(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
function flattenApiItems(value) {
  if (Array.isArray(value)) return value.flatMap(flattenApiItems);
  if (!isJsonRecord(value)) return [];
  for (const key of ENVELOPE_KEYS) {
    if (Array.isArray(value[key])) return flattenApiItems(value[key]);
  }
  return [value];
}
function firstValue(item, keys) {
  for (const key of keys) {
    const value = item[key];
    if (value !== void 0 && value !== null && String(value).trim() !== "") return value;
  }
  return null;
}
function normalizedText(value) {
  return String(value ?? "").trim();
}
function optionalText(value) {
  const text = normalizedText(value);
  return text || null;
}
function billingDocumentNumber(value) {
  if (typeof value === "string" || typeof value === "number") {
    return normalizedText(value) || null;
  }
  if (!isJsonRecord(value)) return null;
  const document = firstValue(value, ["numero_documento", "documento", "numero_apolice"]);
  return document === null ? null : normalizedText(document) || null;
}
function policyDocumentNumber(item) {
  const document = firstValue(item, [
    "numero_documento",
    "numero_apolice",
    "numero_apolice_seguradora"
  ]);
  return document === null ? null : normalizedText(document) || null;
}
function extractBasePolicies(value) {
  return flattenApiItems(value).filter((item) => {
    const document = policyDocumentNumber(item);
    return !!document && document.replace(/\D/g, "").endsWith("000000");
  });
}
function basePolicyNumber(item) {
  const raw = firstValue(item, ["numero_apolice", "numero_documento", "numero_apolice_seguradora"]);
  if (raw === null) return null;
  const digits = normalizedText(raw).replace(/\D/g, "");
  if (digits.length < 6) return null;
  return `${digits.slice(0, -6)}000000`;
}
function buildEndorsementDocumentNumbers(policyNumber, lastEndorsement) {
  const digits = policyNumber.replace(/\D/g, "");
  if (digits.length < 6) throw new Error("Número de apólice inválido retornado pela Excelsior.");
  const parsed = Number.parseInt(String(lastEndorsement ?? 0).replace(/\D/g, ""), 10);
  const maximum = Number.isFinite(parsed) ? parsed : 0;
  if (maximum < 0 || maximum > 1e4) {
    throw new Error(`Sequencial de endosso fora do limite seguro: ${maximum}.`);
  }
  const prefix = digits.slice(0, -6);
  return Array.from(
    { length: maximum + 1 },
    (_, index) => `${prefix}${String(index).padStart(6, "0")}`
  );
}
function normalizedEndorsementSequence(value) {
  const digits = String(value ?? "").replace(/\D/g, "");
  return digits ? digits.slice(-6).padStart(6, "0") : null;
}
function selectMissingEndorsementDocuments(policyNumber, lastEndorsement, existingSequences) {
  const existing = new Set(
    [...existingSequences].map(normalizedEndorsementSequence).filter((value) => value !== null)
  );
  return buildEndorsementDocumentNumbers(policyNumber, lastEndorsement).filter(
    (documentNumber) => !existing.has(documentNumber.slice(-6))
  );
}
function normalizeEmissionDocument(value, fallbackPolicyNumber, fallbackDocumentNumber) {
  const outer = isJsonRecord(value) ? value : {};
  const root = isJsonRecord(outer.apolice) ? outer.apolice : isJsonRecord(outer.endosso) ? outer.endosso : outer;
  const fallbackEndorsement = fallbackDocumentNumber.replace(/\D/g, "").slice(-6);
  const rawPolicy = firstValue(root, ["numero_apolice_seguradora", "numero_apolice"]);
  const policyDigits = String(rawPolicy ?? fallbackPolicyNumber).replace(/\D/g, "");
  const canonicalPolicy = policyDigits.length >= 6 ? `${policyDigits.slice(0, -6)}000000` : fallbackPolicyNumber;
  const rawEndorsement = firstValue(root, ["numero_endosso_seguradora", "numero_endosso"]);
  const endorsementDigits = String(rawEndorsement ?? fallbackEndorsement).replace(/\D/g, "");
  return {
    numero_apolice_seguradora: canonicalPolicy,
    numero_endosso_seguradora: (endorsementDigits || fallbackEndorsement).slice(-6).padStart(6, "0"),
    premio_liquido: Number(root.premio_liquido ?? 0) || 0,
    proposta: isJsonRecord(root.proposta) ? root.proposta : root
  };
}
function billingState(value) {
  const document = billingDocumentNumber(value);
  if (!document) return null;
  const item = isJsonRecord(value) ? value : {};
  return {
    document,
    paymentStatus: normalizedText(item.situacao_quitacao ?? item.status_pagamento).toLowerCase() || "aberta",
    issuanceStatus: normalizedText(item.situacao_emissao).toLowerCase() || "ativa"
  };
}
function selectBillingDocumentsToRefresh(currentOpen, remoteOpen) {
  const current = /* @__PURE__ */ new Map();
  for (const value of currentOpen) {
    const state = billingState(value);
    if (state) current.set(state.document, state);
  }
  const remote = /* @__PURE__ */ new Map();
  for (const value of flattenApiItems(remoteOpen)) {
    const state = billingState(value);
    if (state) remote.set(state.document, state);
  }
  const documents = /* @__PURE__ */ new Set();
  for (const [document, state] of remote) {
    const previous = current.get(document);
    if (!previous || previous.paymentStatus !== state.paymentStatus || previous.issuanceStatus !== state.issuanceStatus) {
      documents.add(document);
    }
  }
  for (const document of current.keys()) {
    if (!remote.has(document)) documents.add(document);
  }
  return [...documents];
}
function normalizeBillingResponse(value, options) {
  return flattenApiItems(value).flatMap((item, index) => {
    const document = billingDocumentNumber(item) ?? options.fallbackDocument ?? null;
    if (!document) return [];
    const installmentId = firstValue(item, [
      "id_parcela",
      "parcela_id",
      "idParcela",
      "codigo_parcela"
    ]);
    const explicitNumber = firstValue(item, [
      "numero_parcela",
      "sequencial_parcela",
      "numeroParcela",
      "parcela",
      "parcela_numero"
    ]);
    const fallback = item.numero_proposta && item.data_vencimento ? `${String(item.numero_proposta)}@${String(item.data_vencimento)}` : String(index + 1);
    return [
      {
        numero_documento: document,
        numero_endosso: optionalText(item.numero_endosso ?? item.numero_endosso_seguradora),
        numero_parcela: String(explicitNumber ?? installmentId ?? fallback),
        id_parcela: installmentId == null ? null : String(installmentId),
        numero_proposta: optionalText(item.numero_proposta),
        status_pagamento: normalizedText(
          item.situacao_quitacao ?? item.status_pagamento ?? options.defaultPaymentStatus
        ),
        situacao_emissao: normalizedText(item.situacao_emissao ?? "Ativa"),
        data_quitacao: optionalText(item.data_quitacao),
        data_vencimento: optionalText(item.data_vencimento)
      }
    ];
  });
}
function dedupeBillingItems(items) {
  const byInstallment = /* @__PURE__ */ new Map();
  for (const item of items) {
    const identity = item.id_parcela || item.numero_parcela;
    byInstallment.set(`${item.numero_documento}#${identity}`, item);
  }
  return [...byInstallment.values()];
}
const DEFAULT_API_BASE_URL = "https://api.sistemaexcelsior.com.br";
const DEFAULT_CONTRACTS_BASE_URL = "https://servicos-excelsior-prod.azure-api.net";
function positiveInteger(value, fallback) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
function secureBaseUrl(value, fallback, variableName) {
  const url = new URL(value || fallback);
  if (url.protocol !== "https:") {
    throw new Error(`${variableName} deve usar HTTPS.`);
  }
  return url.toString().replace(/\/$/, "");
}
function getExcelsiorMotorConfig() {
  const username = process.env.EXCELSIOR_API_USERNAME?.trim();
  const password = process.env.EXCELSIOR_API_PASSWORD;
  const missing = [
    ...!username ? ["EXCELSIOR_API_USERNAME"] : [],
    ...!password ? ["EXCELSIOR_API_PASSWORD"] : []
  ];
  if (missing.length > 0) {
    throw new Error(`Credenciais da API Excelsior não configuradas: ${missing.join(", ")}.`);
  }
  return {
    username,
    password,
    apiBaseUrl: secureBaseUrl(
      process.env.EXCELSIOR_API_BASE_URL,
      DEFAULT_API_BASE_URL,
      "EXCELSIOR_API_BASE_URL"
    ),
    contractsBaseUrl: secureBaseUrl(
      process.env.EXCELSIOR_CONTRACTS_BASE_URL,
      DEFAULT_CONTRACTS_BASE_URL,
      "EXCELSIOR_CONTRACTS_BASE_URL"
    ),
    systemId: process.env.EXCELSIOR_SYSTEM_ID?.trim() || "1009",
    requestTimeoutMs: positiveInteger(process.env.EXCELSIOR_REQUEST_TIMEOUT_MS, 3e4)
  };
}
function isExcelsiorMotorConfigured() {
  return !!(process.env.EXCELSIOR_API_USERNAME?.trim() && process.env.EXCELSIOR_API_PASSWORD);
}
class ExcelsiorApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = "ExcelsiorApiError";
  }
  status;
}
function retryDelay(response, attempt) {
  const retryAfter = response?.headers.get("retry-after");
  if (retryAfter) {
    const seconds = Number(retryAfter);
    if (Number.isFinite(seconds)) return Math.min(seconds * 1e3, 1e4);
  }
  return Math.min(400 * 2 ** attempt, 3e3);
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
class ExcelsiorMotorClient {
  constructor(config = getExcelsiorMotorConfig()) {
    this.config = config;
  }
  config;
  token = null;
  loginPromise = null;
  async requestJson(label, url, init, attempts = 3) {
    let lastError;
    for (let attempt = 0; attempt < attempts; attempt++) {
      let response = null;
      try {
        response = await fetch(url, {
          ...init,
          headers: { Accept: "application/json", ...init.headers },
          signal: AbortSignal.timeout(this.config.requestTimeoutMs)
        });
        if (response.ok) {
          const text = await response.text();
          if (!text.trim()) return {};
          try {
            return JSON.parse(text);
          } catch {
            throw new ExcelsiorApiError(`${label}: resposta JSON inválida.`, response.status);
          }
        }
        const retryable = response.status === 429 || response.status >= 500;
        if (!retryable || attempt === attempts - 1) {
          throw new ExcelsiorApiError(
            `${label}: API retornou HTTP ${response.status}.`,
            response.status
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
    if (lastError instanceof Error) throw lastError;
    throw new Error(`${label}: falha de rede.`);
  }
  async login(force = false) {
    if (!force && this.token) return this.token;
    if (!force && this.loginPromise) return this.loginPromise;
    this.loginPromise = (async () => {
      const response = await this.requestJson(
        "Autenticação Excelsior",
        new URL("/v1/login", this.config.apiBaseUrl),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuario: this.config.username,
            senha: this.config.password
          })
        },
        2
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
  async authorizedRequest(label, url, init = {}) {
    let token = await this.login();
    try {
      return await this.requestJson(label, url, {
        ...init,
        headers: { ...init.headers, Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      if (!(error instanceof ExcelsiorApiError) || error.status !== 401) throw error;
      token = await this.login(true);
      return this.requestJson(label, url, {
        ...init,
        headers: { ...init.headers, Authorization: `Bearer ${token}` }
      });
    }
  }
  async listPolicies() {
    const url = new URL("/backoffice/ro/emissao/", this.config.apiBaseUrl);
    url.searchParams.set("sistema", this.config.systemId);
    return this.authorizedRequest("Listagem de apólices", url);
  }
  async getContract(policyNumber) {
    const url = new URL(
      `/backoffice/ro/contratos/${encodeURIComponent(policyNumber)}`,
      this.config.contractsBaseUrl
    );
    const response = await this.authorizedRequest("Consulta de contrato", url);
    const responseIsContract = isJsonRecord(response) && ["ultimo_endosso", "numero_ultimo_endosso", "ultimoEndosso", "numero_apolice"].some(
      (key) => response[key] !== void 0
    );
    const item = responseIsContract ? response : Array.isArray(response) && isJsonRecord(response[0]) ? response[0] : flattenApiItems(response)[0];
    if (!item) throw new Error(`Contrato ${policyNumber}: resposta vazia.`);
    return item;
  }
  async getIssuanceDocument(documentNumber) {
    const url = new URL(
      `/backoffice/ro/emissao/${encodeURIComponent(documentNumber)}`,
      this.config.apiBaseUrl
    );
    const response = await this.authorizedRequest("Consulta de emissão", url, { method: "GET" });
    return Array.isArray(response) && response.length === 1 ? response[0] : response;
  }
  async listOpenBilling() {
    const url = new URL("/backoffice/cobranca/parcelas/", this.config.apiBaseUrl);
    url.searchParams.set("tipo", "Emissao");
    url.searchParams.set("quitacao", "Aberta");
    url.searchParams.set("situacao", "Ativo");
    url.searchParams.set("sistemaorigem", this.config.systemId);
    return this.authorizedRequest("Listagem de parcelas abertas", url);
  }
  async getBillingDocument(documentNumber) {
    const url = new URL(
      `/backoffice/cobranca/parcelas/${encodeURIComponent(documentNumber)}/1`,
      this.config.apiBaseUrl
    );
    return this.authorizedRequest("Consulta individual de cobrança", url);
  }
  async listSettledBilling(start, end) {
    const url = new URL("/backoffice/cobranca/parcelas/", this.config.apiBaseUrl);
    url.searchParams.set("tipo", "Emissao");
    url.searchParams.set("inicio", start);
    url.searchParams.set("fim", end);
    url.searchParams.set("quitacao", "Total");
    url.searchParams.set("sistemaorigem", this.config.systemId);
    return this.authorizedRequest("Listagem de parcelas quitadas", url);
  }
  async testConnection() {
    const response = await this.listPolicies();
    return { reachable: true, records: flattenApiItems(response).length };
  }
}
const motorClient_server = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ExcelsiorMotorClient,
  getExcelsiorMotorConfig,
  isExcelsiorMotorConfigured
}, Symbol.toStringTag, { value: "Module" }));
export {
  ExcelsiorMotorClient as E,
  selectMissingEndorsementDocuments as a,
  basePolicyNumber as b,
  normalizeEmissionDocument as c,
  dedupeBillingItems as d,
  extractBasePolicies as e,
  flattenApiItems as f,
  getExcelsiorMotorConfig as g,
  motorClient_server as m,
  normalizeBillingResponse as n,
  selectBillingDocumentsToRefresh as s
};
