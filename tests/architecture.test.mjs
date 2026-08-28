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
  assert.match(source, /byKey\.set\(`\$\{apolice\}#\$\{seq\}#\$\{numeroParcela\}`/);
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
  assert.doesNotMatch(serverFn, /resolveFinding|audit_resolutions/);
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
});

test("falha de um detalhe de cobrança preserva dados locais sem derrubar o lote", async () => {
  const source = await read("src/lib/excelsior/motor-sync.server.ts");
  assert.match(source, /detalhes individuais indisponíveis; dados locais preservados/);
  assert.match(source, /context\.openInstallments\.filter/);
  assert.match(source, /falhasIndividuais: detailFailures\.length/);
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
  assert.match(migration, /CREATE UNIQUE INDEX IF NOT EXISTS policy_sync_runs_single_running/);
  assert.match(migration, /WHERE status = 'running'/);
});
