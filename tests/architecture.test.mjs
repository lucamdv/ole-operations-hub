import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

test("Vercel não possui cron automático de 5 em 5 minutos", async () => {
  const config = JSON.parse(await read("vercel.json"));
  assert.equal(Object.hasOwn(config, "crons"), false);
});

test("Vercel mantém Fluid Compute e a duração máxima do plano", async () => {
  const vercel = JSON.parse(await read("vercel.json"));
  const vite = await read("vite.config.ts");
  assert.equal(vercel.fluid, true);
  assert.match(vite, /maxDuration:\s*"max"/);
});

test("uma falha em qualquer perna torna a sincronização geral um erro", async () => {
  const source = await read("src/lib/sync-legs.server.ts");
  assert.match(source, /r\.emissoes_status === "error"\s*\|\|\s*r\.cobrancas_status === "error"/);
  assert.doesNotMatch(
    source,
    /r\.emissoes_status === "error"\s*&&\s*r\.cobrancas_status === "error"/,
  );
});

test("Lovable não está presente nas dependências de runtime", async () => {
  const pkg = JSON.parse(await read("package.json"));
  const names = [...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.devDependencies ?? {})];
  assert.equal(
    names.some((name) => name.toLowerCase().includes("lovable")),
    false,
  );
});

test("service role do Supabase não é exposta como variável VITE", async () => {
  const envExample = await read(".env.example");
  assert.doesNotMatch(envExample, /^VITE_.*SERVICE_ROLE/m);
  assert.match(envExample, /^SUPABASE_SERVICE_ROLE_KEY=/m);
});

test("callback de apólices exige segredo antes de processar o payload", async () => {
  const source = await read("src/routes/api/public/policy-sync-callback.ts");
  assert.match(source, /request\.headers\.get\("x-callback-secret"\)/);
  assert.match(source, /process\.env\.AUDIT_CALLBACK_SECRET/);
  assert.match(source, /return json\(\{ error: "Unauthorized" \}, 401\)/);
});

test("callback de cobrança exige segredo e run_id", async () => {
  const source = await read("src/routes/api/public/billing-sync-callback.ts");
  assert.match(source, /process\.env\.BILLING_CALLBACK_SECRET/);
  assert.match(source, /request\.headers\.get\("x-callback-secret"\)/);
  assert.match(source, /searchParams\.get\("run_id"\)/);
  assert.match(source, /onConflict: "numero_apolice,numero_endosso,numero_parcela"/);
});

test("cobrança preserva identidade individual de cada parcela", async () => {
  const source = await read("src/routes/api/public/billing-sync-callback.ts");
  assert.match(source, /numero_parcela/);
  assert.match(source, /id_parcela/);
  assert.match(source, /billingPersistenceIdentity/);
  assert.match(source, /identity\.numero_apolice/);
});

test("proposta canônica preserva campos exclusivos da apólice", async () => {
  const source = await read("src/routes/api/public/policy-sync-callback.ts");
  assert.match(source, /DOCUMENT_ONLY_ROOT_FIELDS/);
  assert.match(source, /"datas"/);
  assert.match(source, /"data_emissao"/);
  assert.match(source, /"motivo_endosso"/);
  assert.match(source, /mergeCanonicalValue/);
});

test("scheduler permanece protegido mesmo sem cron da Vercel", async () => {
  const source = await read("src/routes/api/public/hooks/scheduler.ts");
  assert.match(source, /process\.env\.CRON_SECRET/);
  assert.match(source, /process\.env\.SCHEDULER_HOOK_SECRET/);
  assert.match(source, /return json\(\{ ok: false, error: "unauthorized" \}, 401\)/);
});

test("sincronização da carteira não depende mais do webhook n8n", async () => {
  const serverFn = await read("src/lib/policies.functions.ts");
  const runner = await read("src/lib/policy-sync-runner.server.ts");
  const envExample = await read(".env.example");
  assert.doesNotMatch(`${serverFn}\n${runner}`, /N8N_MOTOR_POLICIES_URL/);
  assert.doesNotMatch(envExample, /^N8N_MOTOR_POLICIES_URL=/m);
  assert.match(runner, /executeDirectMotorSync/);
});

test("SOLUCIONAR envia ocorrências reais ao webhook sem marcar resolução manual", async () => {
  const alertPage = await read("src/routes/_authenticated/alertas.tsx");
  const incidentRow = await read("src/components/alertas/incident-row.tsx");
  const incidentDetail = await read("src/components/alertas/incident-detail.tsx");
  const findingsDialog = await read("src/components/audit/findings-list-dialog.tsx");
  const serverFn = await read("src/lib/audit-corrections.functions.ts");
  const correctionHook = await read("src/hooks/use-audit-corrections.ts");
  const payload = await read("src/lib/audit/correction-payload.ts");
  const errorGroups = await read("src/lib/audit/error-groups.ts");
  const envExample = await read(".env.example");

  assert.match(alertPage, /Solucionar seleção/);
  assert.match(alertPage, /Solucionar/);
  assert.match(alertPage, /Ignorar apólice/);
  assert.doesNotMatch(
    `${alertPage}\n${incidentRow}\n${incidentDetail}\n${findingsDialog}`,
    /onResolve|doResolve|useResolveFinding/,
  );
  assert.doesNotMatch(alertPage, /useResolveFinding/);

  assert.match(serverFn, /process\.env\.N8N_CORRECTION_WEBHOOK_URL/);
  assert.match(serverFn, /resolveWebhookUrl\(rawWebhookUrl, data\.mode\)/);
  assert.match(serverFn, /modo teste/);
  assert.match(serverFn, /groups: payload\.total_grupos_erros/);
  assert.match(correctionHook, /useWebhookMode/);
  assert.match(correctionHook, /data: \{ \.\.\.input, mode \}/);
  assert.match(serverFn, /\.eq\("run_id", data\.run_id\)/);
  assert.match(serverFn, /\.in\("id", findingIds\)/);
  assert.doesNotMatch(serverFn, /resolveFinding|from\("audit_resolutions"\)\s*\.insert/);
  assert.match(serverFn, /from\("audit_correction_responses"\)/);
  assert.match(serverFn, /trackingRecorded/);
  assert.match(payload, /documento_problematico/);
  assert.match(payload, /relatorio_problema/);
  assert.match(payload, /campos_incorretos/);
  assert.match(payload, /tipo_erro/);
  assert.match(payload, /numero_apolice/);
  assert.match(payload, /versao: 2/);
  assert.match(payload, /total_grupos_erros/);
  assert.match(payload, /grupos_erros/);
  assert.match(payload, /codigo_grupo/);
  assert.match(payload, /classifyAuditError/);

  for (const group of ["PROPORCIONALIDADE", "VIGENCIA", "LIMITE", "PREMIO", "OUTROS"]) {
    assert.match(errorGroups, new RegExp(group));
  }
  for (const errorType of [
    "DUPLICIDADE DE VIGÊNCIA",
    "PROPORÇÃO DE PRÊMIO DIRETO INCORRETA",
    "MARGEM DE SERVIÇO CONTRATUAL INCORRETA",
    "SOMA DE INTERMEDIAÇÃO INCORRETA",
    "ADMINISTRAÇÃO ABAIXO DO MÍNIMO",
    "COMISSÃO DE CORRETAGEM BAIXA",
    "TAXA DE ADMINISTRAÇÃO INCORRETA",
    "TAXA DE DISTRIBUIÇÃO INCORRETA",
    "MARGEM DE SERVIÇO ADICIONAL INCORRETA",
    "GAP DE DIA",
    "VARIAÇÃO DE PRÊMIO",
    "LIMITE DE COBERTURA INVÁLIDO",
    "PRÊMIO FORA DO PADRÃO",
    "COBERTURA INATIVA",
  ]) {
    assert.match(errorGroups, new RegExp(errorType));
  }

  assert.match(envExample, /^N8N_CORRECTION_WEBHOOK_URL=/m);
  assert.doesNotMatch(envExample, /^VITE_N8N_CORRECTION_WEBHOOK_URL=/m);
});

test("analytics exibe somente os KPIs definidos para cada cadência", async () => {
  const analytics = await read("src/routes/_authenticated/analytics.tsx");
  const operation = await read("src/routes/_authenticated/operacao.tsx");
  const kpis = await read("src/lib/kpis/derive.ts");
  const kpiServer = await read("src/lib/kpis.functions.ts");
  const migration = await read(
    "supabase/migrations/20260828210350_add_audit_correction_responses.sql",
  );

  for (const label of [
    "Nº de inconsistências novas detectadas",
    "Nº de ocorrências críticas em aberto",
    "Tempo até a primeira resposta em ocorrência crítica",
    "Taxa de reincidência (% ocorrências repetidas vs. novas)",
    "% de ocorrências resolvidas dentro do SLA",
    "Nº de contratos inadimplentes",
    "Taxa de reincidência consolidada do mês",
    "Crescimento da carteira Olé no ano (nº de contratos e prêmio emitido)",
    "Redução ano a ano de incidentes críticos",
  ]) {
    assert.match(analytics, new RegExp(label.replace(/[()%]/g, "\\$&")));
  }

  for (const removed of [
    "Auditadas (última run)",
    "Risco operacional",
    "Apólices reincidentes",
    "Capacidade operacional",
    "Emissões no último mês",
    "Prêmio pago e ativo no ano",
  ]) {
    assert.doesNotMatch(analytics, new RegExp(removed.replace(/[()%]/g, "\\$&")));
  }

  assert.match(operation, /Tempo até a primeira resposta crítica/);
  assert.doesNotMatch(operation, /Resolvidas no ciclo|Velocidade de resolução/);
  assert.match(kpis, /businessHoursBetween/);
  assert.match(kpis, /resolvidasDentroSlaPct/);
  assert.match(kpiServer, /countDelinquentContracts/);
  assert.match(migration, /CREATE TABLE public\.audit_correction_responses/);
  assert.match(migration, /ENABLE ROW LEVEL SECURITY/);
  assert.match(migration, /REVOKE ALL.*anon, authenticated/);
});

test("cliente do MOTOR mantém credenciais apenas no servidor e usa HTTPS", async () => {
  const source = await read("src/lib/excelsior/motor-client.server.ts");
  assert.match(source, /process\.env\.EXCELSIOR_API_USERNAME/);
  assert.match(source, /process\.env\.EXCELSIOR_API_PASSWORD/);
  assert.match(source, /https:\/\/servicos-excelsior-prod\.azure-api\.net/);
  assert.doesNotMatch(source, /N8N_/);
});

test("motor usa o host direto da Excelsior em todas as chamadas", async () => {
  const source = await read("src/lib/excelsior/motor-client.server.ts");
  assert.doesNotMatch(source, /DEFAULT_API_BASE_URL/);
  assert.doesNotMatch(source, /this\.config\.apiBaseUrl/);
  assert.doesNotMatch(source, /this\.config\.contractsBaseUrl/);
  assert.equal((source.match(/this\.config\.servicesBaseUrl/g) ?? []).length, 7);
  assert.match(source, /EXCELSIOR_SERVICES_BASE_URL/);
  assert.match(source, /EXCELSIOR_BILLING_REQUEST_TIMEOUT_MS/);
  assert.match(source, /billingRequestTimeoutMs/);
});

test("motor direto cobre emissões, contratos, cobrança aberta, individual e quitada", async () => {
  const source = await read("src/lib/excelsior/motor-client.server.ts");
  assert.match(source, /\/backoffice\/ro\/emissao\//);
  assert.match(source, /\/backoffice\/ro\/contratos\//);
  assert.match(source, /\/backoffice\/cobranca\/parcelas\//);
  assert.match(source, /quitacao", "Aberta"/);
  assert.match(source, /quitacao", "Total"/);
  assert.match(source, /"Consulta de emissão", url, \{ method: "GET" \}/);
  assert.match(
    source,
    /Consulta individual de cobrança[\s\S]*timeoutMs: this\.config\.billingRequestTimeoutMs/,
  );
});

test("falha de cobrança entra em fila durável sem regravar dados locais antigos", async () => {
  const source = await read("src/lib/excelsior/motor-sync.server.ts");
  const worker = await read("src/lib/billing-retry-worker.server.ts");
  const migration = await read("supabase/migrations/20260902132917_billing_sync_retry_audit.sql");
  assert.match(source, /enqueueBillingFallbacks/);
  assert.match(source, /status: failures\.length > 0 \? "partial" : "success"/);
  assert.doesNotMatch(source, /localFallback/);
  assert.match(source, /valueBackfillDocuments/);
  assert.match(source, /detalhesEnfileirados: detailDocuments\.length/);
  assert.match(source, /Consulta individual transferida para recuperação automática/);
  assert.doesNotMatch(source, /await client\.getBillingDocument\(documentNumber\)/);
  assert.match(worker, /claim_billing_sync_fallbacks/);
  assert.match(worker, /lease_seconds: 300/);
  assert.match(worker, /requeueBillingFallback/);
  assert.match(worker, /resolveBillingFallback/);
  assert.match(migration, /FOR UPDATE SKIP LOCKED/);
  assert.match(migration, /billing-sync-fallback-worker/);
  assert.match(migration, /\* \* \* \* \*/);
});

test("cobrança processa novas parcelas antes das quitações e expõe detalhes", async () => {
  const source = await read("src/lib/excelsior/motor-sync.server.ts");
  const page = await read("src/routes/_authenticated/apolices.index.tsx");
  const details = await read("src/components/policies/sync-details-dialog.tsx");
  assert.ok(source.indexOf("listOpenBilling()") < source.indexOf("listSettledBilling("));
  assert.match(source, /shouldApplyBillingStatus|persistBillingSyncPayload/);
  assert.match(page, /SyncDetailsDialog/);
  assert.match(details, /Emissões adicionadas/);
  assert.match(details, /Parcelas atualizadas/);
  assert.match(details, /tentando em background/);
});

test("worker de fallback exige secret apenas no servidor", async () => {
  const route = await read("src/routes/api/public/hooks/billing-retry.ts");
  const env = await read(".env.example");
  assert.match(route, /process\.env\.BILLING_RETRY_HOOK_SECRET/);
  assert.match(route, /request\.headers\.get\("x-hook-secret"\)/);
  assert.match(route, /return json\(\{ error: "Unauthorized" \}, 401\)/);
  assert.match(env, /^BILLING_RETRY_HOOK_SECRET=/m);
  assert.doesNotMatch(env, /^VITE_BILLING_RETRY_HOOK_SECRET=/m);
});

test("fallback libera novas sincronizações enquanto continua em background", async () => {
  const legs = await read("src/lib/sync-legs.server.ts");
  const hook = await read("src/hooks/use-policies.ts");
  assert.match(legs, /s === "success" \|\| s === "partial" \|\| s === "error"/);
  assert.match(legs, /recovering \? "partial" : "success"/);
  assert.match(hook, /row\?\.status === "partial"/);
  assert.match(hook, /stopPolling\(\)/);
});

test("pipeline v2 faz reconciliação única desde abril e depois volta ao delta", async () => {
  const migration = await read("supabase/migrations/20260902132917_billing_sync_retry_audit.sql");
  const source = await read("src/lib/excelsior/motor-sync.server.ts");
  assert.match(migration, /CREATE TABLE public\.billing_sync_state/);
  assert.match(migration, /DATE '2026-04-01'/);
  assert.match(source, /reconciliation_completed_at/);
  assert.match(source, /completeBillingReconciliation/);
  assert.match(source, /previousFinishedAt/);
});

test("emissões consultam somente documentos ausentes na plataforma", async () => {
  const source = await read("src/lib/excelsior/motor-sync.server.ts");
  assert.match(source, /endorsements\(numero_endosso\)/);
  assert.match(source, /selectMissingEndorsementDocuments/);
  assert.doesNotMatch(source, /buildEndorsementDocumentNumbers\(/);
});

test("sincronização ativa é recuperada após F5 e possui trava contra concorrência", async () => {
  const hook = await read("src/hooks/use-policies.ts");
  const server = await read("src/lib/policy-sync-runner.server.ts");
  const migration = await read("supabase/migrations/20260826190000_single_active_policy_sync.sql");
  assert.match(hook, /latestFn\(\)/);
  assert.match(hook, /row\.status === "running"/);
  assert.match(hook, /setIsPolling\(true\)/);
  assert.match(server, /\.eq\("status", "running"\)/);
  assert.match(server, /reused: true/);
  assert.match(server, /STALE_RUN_AFTER_MS/);
  assert.match(server, /interrompida pelo limite de 300 s/);
  assert.match(migration, /CREATE UNIQUE INDEX IF NOT EXISTS policy_sync_runs_single_running/);
  assert.match(migration, /WHERE status = 'running'/);
});
