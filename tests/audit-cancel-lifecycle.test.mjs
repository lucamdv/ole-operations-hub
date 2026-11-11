import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

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
