import assert from "node:assert/strict";
import test from "node:test";
import { registerHooks } from "node:module";
import { pathToFileURL, fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { auditDatabase, cancelledPolicyData, RUN_ID } from "./helpers/audit-db.mjs";

// Resolve the project's alias in Node and replace only the admin-client boundary.
// The production dispatcher, loaders, schemas and Supabase query builder remain real.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "@/integrations/supabase/client.server") {
      return {
        url: "data:text/javascript,export const supabaseAdmin = { from: (...args) => globalThis.__auditTestDbClient.from(...args) }; export const executionRegistry = () => ({ insert: async record => { globalThis.__auditRegistryRecords.push(record); return {error:null}; } });",
        shortCircuit: true,
      };
    }
    if (specifier.startsWith("@/")) {
      const path = resolve(
        fileURLToPath(new URL("../src/", import.meta.url)),
        `${specifier.slice(2)}.ts`,
      );
      return { url: pathToFileURL(path).href, shortCircuit: true };
    }
    return nextResolve(specifier, context);
  },
});
const { runAuditImpl } = await import("../src/lib/audit-run.server.ts");

function setup(t, data = cancelledPolicyData(), options = {}) {
  const db = auditDatabase(data, options);
  globalThis.__auditTestDbClient = db.client;
  globalThis.__auditRegistryRecords = [];
  const oldEnv = {};
  const env = {
    N8N_AUDIT_WEBHOOK_URL: "https://n8n.example/webhook/test-only",
    PUBLIC_APP_URL: "https://cockpit.example",
    VERCEL_PROJECT_PRODUCTION_URL: "",
    VERCEL_URL: "",
    VERCEL_ENV: "production",
    N8N_AUDIT_HOMOLOG_WEBHOOK_URL: "https://n8n.example/webhook-test/test-only",
    HOMOLOG_EXTERNAL_WEBHOOKS_ENABLED: "true",
    SUPABASE_SERVICE_ROLE_KEY: "SECRET-NEVER-SEND",
    AUDIT_CALLBACK_SECRET: "SECRET-CALLBACK",
  };
  for (const [key, value] of Object.entries(env)) {
    oldEnv[key] = process.env[key];
    process.env[key] = value;
  }
  t.after(() => {
    for (const [key, value] of Object.entries(oldEnv)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    delete globalThis.__auditTestDbClient;
    delete globalThis.__auditRegistryRecords;
  });
  const sent = [];
  const logs = [];
  t.mock.method(console, "info", (...args) => logs.push(args));
  t.mock.method(console, "error", (...args) => logs.push(args));
  t.mock.method(globalThis, "fetch", async (url, init) => {
    assert.match(String(url), /^https:\/\/n8n\.example\/webhook(?:-test)?\/test-only$/);
    assert.equal(init.method, "POST");
    assert.deepEqual(init.headers, { "Content-Type": "application/json" });
    assert.ok(init.signal instanceof AbortSignal);
    const body = JSON.parse(init.body);
    sent.push({ url, body });
    assert.ok(
      db.writes.some((write) => write.body.raw?.audit_contract_version === 2),
      "snapshot must be stored before HTTP send",
    );
    if (options.networkError) throw new Error("SECRET-NEVER-SEND https://private.example/token");
    return new Response(options.httpBody ?? "accepted", { status: options.httpStatus ?? 202 });
  });
  return { db, sent, logs };
}

for (const trigger of ["ole-copilot", "scheduler"]) {
  for (const mode of [undefined, "production", "test"]) {
    test(`12/13: ${trigger} / ${mode ?? "configurado"} envia contrato v2 completo`, async (t) => {
      const { db, sent, logs } = setup(t);
      assert.deepEqual(await runAuditImpl(trigger, mode), { runId: RUN_ID, status: "running" });
      assert.equal(sent.length, 1);
      const { body, url } = sent[0];
      assert.equal(body.run_id, RUN_ID);
      assert.equal(
        body.callback_url,
        `https://cockpit.example/api/public/audit-callback?run_id=${RUN_ID}`,
      );
      assert.equal(body.trigger, trigger);
      assert.equal(body.mode, "async_callback");
      assert.equal(body.status_geral, "PROCESSANDO");
      assert.equal(body.mensagem_geral, "Auditoria em processamento.");
      assert.deepEqual(body.resumo, { aprovados: 0, reprovados: 0, total_processado: 0 });
      assert.deepEqual(body.apolices_com_erro, []);
      assert.equal(body.audit_contract_version, 2);
      assert.ok(Number.isFinite(Date.parse(body.at)));
      assert.ok(Number.isFinite(Date.parse(body.exclusions_snapshot_at)));
      assert.deepEqual(body.apolices_excluidas, [
        { apolice: "0001", status: "CANCELADA", motivo: "Status operacional: CANCELADA" },
      ]);
      assert.deepEqual(body.excecoes_especificas, [
        { apolice: "0001", tipo_erro: "PRÊMIO FORA DO PADRÃO", motivo: "Segurado Jovem" },
      ]);
      assert.equal(db.writes[0].body.origem, trigger === "scheduler" ? "auto" : "manual");
      assert.equal(
        url,
        `https://n8n.example/${mode === "test" ? "webhook-test" : "webhook"}/test-only`,
      );
      assert.doesNotMatch(
        JSON.stringify({ body, logs }),
        /SECRET|Segurado Jovem.*Segurado Jovem|proposta|service_role/,
      );
      assert.doesNotMatch(JSON.stringify(logs), /0001|Segurado Jovem|PRÊMIO/);
    });
  }
}

for (const table of ["policies", "endorsements", "policy_billing", "audit_ignores"]) {
  test(`09: falha em ${table} impede webhook e encerra execução como error`, async (t) => {
    const { db, sent, logs } = setup(t, cancelledPolicyData(), { failTable: table });
    await assert.rejects(runAuditImpl("scheduler"), new RegExp(table));
    assert.equal(sent.length, 0);
    assert.equal(db.state.status, "error");
    assert.match(db.state.error_message, new RegExp(table));
    assert.doesNotMatch(
      JSON.stringify({ state: db.state, logs }),
      /TOKEN-SECRETO|private-db-message/,
    );
  });
}

test("08: banco vazio legítimo envia arrays vazios em vez de tratar como falha", async (t) => {
  const { sent } = setup(t, {});
  await runAuditImpl();
  assert.deepEqual(sent[0].body.apolices_excluidas, []);
  assert.deepEqual(sent[0].body.excecoes_especificas, []);
});

test("preview envia contrato v2 com callback do deployment e preserva os demais campos", async (t) => {
  const { sent } = setup(t);
  process.env.VERCEL_ENV = "preview";
  process.env.VERCEL_URL = "cockpit-abc123-team.vercel.app";
  process.env.VERCEL_PROJECT_PRODUCTION_URL = "production.example";
  await runAuditImpl("ole-copilot", "test");
  assert.equal(
    sent[0].body.callback_url,
    `https://cockpit-abc123-team.vercel.app/api/public/audit-callback?run_id=${RUN_ID}`,
  );
  assert.equal(sent[0].body.audit_contract_version, 2);
  assert.equal(sent[0].body.apolices_excluidas.length, 1);
  assert.equal(sent[0].body.excecoes_especificas.length, 1);
});

test("preview sem domínio próprio não envia e encerra execução como error", async (t) => {
  const { db, sent } = setup(t);
  process.env.VERCEL_ENV = "preview";
  await assert.rejects(runAuditImpl(), /VERCEL_URL/);
  assert.equal(sent.length, 0);
  assert.equal(db.state.status, "error");
});

test("erro de callback URL após criar run é persistido e não deixa running", async (t) => {
  const { db, sent } = setup(t);
  delete process.env.PUBLIC_APP_URL;
  await assert.rejects(runAuditImpl(), /PUBLIC_APP_URL/);
  assert.equal(db.state.status, "error");
  assert.equal(sent.length, 0);
});

test("falha ao persistir snapshot impede o envio e informa também falha de fechamento", async (t) => {
  const { sent, logs } = setup(t, cancelledPolicyData(), { failUpdate: true });
  await assert.rejects(runAuditImpl(), /persistir|registrar/);
  assert.equal(sent.length, 0);
  assert.match(JSON.stringify(logs), /status.*error|encerrar/);
});

test("HTTP 404 de webhook-test mantém orientação para ativar a escuta", async (t) => {
  const { db } = setup(t, {}, { httpStatus: 404 });
  await assert.rejects(runAuditImpl("ole-copilot", "test"), /Listen for test event/);
  assert.equal(db.state.status, "error");
});

test("falhas HTTP e de rede não expõem respostas ou URLs privadas", async (t) => {
  const { db, logs } = setup(t, {}, { networkError: true });
  await assert.rejects(runAuditImpl(), /rede/);
  assert.equal(db.state.status, "error");
  assert.doesNotMatch(JSON.stringify({ state: db.state, logs }), /SECRET|private.example/);
});
