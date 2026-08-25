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

test("uma falha em qualquer perna torna a sincronização geral um erro", async () => {
  const source = await read("src/lib/sync-legs.server.ts");
  assert.match(
    source,
    /r\.emissoes_status === "error"\s*\|\|\s*r\.cobrancas_status === "error"/,
  );
  assert.doesNotMatch(
    source,
    /r\.emissoes_status === "error"\s*&&\s*r\.cobrancas_status === "error"/,
  );
});

test("Lovable não está presente nas dependências de runtime", async () => {
  const pkg = JSON.parse(await read("package.json"));
  const names = [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.devDependencies ?? {}),
  ];
  assert.equal(names.some((name) => name.toLowerCase().includes("lovable")), false);
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
