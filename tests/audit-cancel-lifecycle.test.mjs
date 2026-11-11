import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { callbackHarness, readers } from "./helpers/audit-callback-harness.mjs";
const { Route: auditControl } = await import("../src/routes/api/public/audit-control.ts");

test("timeout solicitado pelo cliente só encerra uma auditoria após o prazo", async (t) => {
  const h = callbackHarness(t);
  const fresh = h.addRun({ created_at: new Date().toISOString() });
  const expired = h.addRun({ created_at: new Date(Date.now() - 16 * 60_000).toISOString() });
  const cancel = (run) => readers.cancelAudit({ data: { runId: run.id, reason: "timeout" } });
  assert.deepEqual(await cancel(fresh), { runId: fresh.id, status: "running", changed: false });
  assert.deepEqual(await cancel(expired), { runId: expired.id, status: "error", changed: true });
});

test("controle n8n só consulta uma auditoria autenticada no schema registrado", async (t) => {
  const h = callbackHarness(t);
  const run = h.addRun({ created_at: new Date().toISOString() });
  const get = (secret) =>
    auditControl.server.handlers.GET({
      request: new Request(
        `https://preview.example/api/public/audit-control?run_id=${run.id}&apolice=0001`,
        {
          headers: { "x-audit-secret": secret },
        },
      ),
    });
  assert.equal((await get("invalid")).status, 401);
  assert.equal(h.requests.length, 0);
  h.state.homolog.execution_contexts[0].integration = "extraction";
  assert.equal((await get("fixture-callback")).status, 403);
  assert.ok(h.requests.every(({ table }) => table === "execution_contexts"));
  h.state.homolog.execution_contexts[0].integration = "audit";
  const response = await get("fixture-callback");
  assert.deepEqual(await response.json(), {
    continue: true,
    numero_apolice: "0001",
    status: "running",
  });
  assert.ok(h.requests.every(({ schema, method }) => schema === "homolog" && method === "GET"));
});

async function source(path) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

test("controle de auditoria exige autenticação e contexto registrado antes de ler", async () => {
  const actions = await source("src/lib/audit.functions.ts");
  assert.match(actions, /cancelAudit = createServerFn\(\{ method: "POST" \}\)/);
  assert.match(actions, /middleware\(\[requireSupabaseAuth\]\)/);
  assert.match(actions, /withRegisteredExecution\(data\.runId, "audit"/);
  assert.match(actions, /\.eq\("status", "running"\)/);
  assert.match(actions, /status: timedOut \? "error" : "cancelled"/);
  assert.match(actions, /15 \* 60_000/);
});

test("disparo cancela somente runs mais antigas e revalida estado antes de acionar n8n", async () => {
  const runner = await source("src/lib/audit-run.server.ts");
  assert.match(runner, /status: "cancelled"/);
  assert.match(runner, /\.neq\("id", runId\)/);
  assert.match(runner, /\.lt\("created_at", createdAt\)/);
  assert.match(runner, /if \(!stillRunning\) return/);
  assert.match(runner, /\.eq\("status", "running"\)/);
});

test("cancelamento continua funcionando após refresh ou mudança de aba", async () => {
  const hook = await source("src/hooks/use-audit.ts");
  const button = await source("src/components/audit/run-audit-button.tsx");
  assert.match(hook, /getActiveAuditRun/);
  assert.match(hook, /refetchInterval: 3_000/);
  assert.match(hook, /cancelAudit/);
  assert.match(hook, /row\?\.status === "cancelled"/);
  assert.match(button, /Reiniciar Auditoria/);
  assert.match(button, /Cancelar auditoria/);
});

test("n8n consulta estado autenticado e respeita paradas de execução", async () => {
  const control = await source("src/routes/api/public/audit-control.ts");
  assert.match(control, /process\.env\.AUDIT_CALLBACK_SECRET/);
  assert.match(control, /withRegisteredExecution\(id\.data, "audit"/);
  assert.match(control, /data\.status === "running"/);
  assert.match(control, /Cache-Control.*no-store/);
  const docs = await source("docs/n8n/audit-cancel-control/README.md");
  assert.match(docs, /Verificar execução ativa/);
  assert.match(docs, /Execução ainda ativa\?/);
  assert.match(docs, /não encerra automaticamente o processamento/);
});

test("cronômetro sempre pertence à execução nova e descarta cache da anterior", async () => {
  const hook = await source("src/hooks/use-audit.ts");
  const button = await source("src/components/audit/run-audit-button.tsx");
  assert.match(hook, /setActiveRunStartedAt\(startedAt\)/);
  assert.match(hook, /activeRunCreatedAt: activeRunId\s*\? activeRunStartedAt/);
  assert.match(hook, /setQueryData\(\["audit", "active", submittedMode\]/);
  assert.match(hook, /cached\?\.id === result\.runId \? null : cached/);
  assert.match(button, /mutation\.activeRunId, mutation\.activeRunCreatedAt/);
});
