import assert from "node:assert/strict";
import test from "node:test";
import {
  callbackHarness,
  resultPayload,
  readers,
  supabaseAdmin,
  withIntegrationContext,
} from "./helpers/audit-callback-harness.mjs";

test("poll, latest and history retain explicit coverage and partial findings", async (t) => {
  const h = callbackHarness(t),
    run = h.addRun();
  assert.equal((await h.send(run, resultPayload())).status, 200);
  const context = { supabase: supabaseAdmin };
  const polled = await readers.getAuditRunStatus({
    data: { runId: run.id, mode: "production" },
    context,
  });
  assert.equal(polled.raw.resumo.total_ignoradas, 1);
  const latest = await readers.getLatestAudit({ context });
  assert.equal(latest.run.status_geral, "PARCIAL");
  assert.equal(latest.findings.length, 1);
  assert.equal(latest.run.total_processado, 1);
  assert.equal(latest.run.aprovados, 0);
  const history = await readers.getAuditHistory({ context });
  assert.equal(history[0].raw.resumo.total_candidatas, 2);
  assert.equal(history[0].raw.resumo.total_ignoradas, 1);
});

test("partial with no findings cannot report full system approval", async (t) => {
  const h = callbackHarness(t);
  h.addRun({
    status: "success",
    status_geral: "PARCIAL",
    aprovados: 1,
    reprovados: 0,
    total_processado: 1,
    raw: resultPayload(),
  });
  const status = await readers.getSystemStatus({ context: { supabase: supabaseAdmin } });
  assert.equal(status.state, "degraded");
  assert.equal(status.approvalRate, null);
  assert.equal(status.lastRunPartial, true);
});

test("production+test polling does not change the immutable homolog result", async (t) => {
  const h = callbackHarness(t, "production"),
    run = h.addRun();
  await h.send(run, resultPayload());
  const before = JSON.stringify(h.state.public);
  const row = await withIntegrationContext("production", () =>
    readers.getAuditRunStatus({
      data: { runId: run.id, mode: "production" },
      context: { supabase: supabaseAdmin },
    }),
  );
  assert.equal(row.status_geral, "PARCIAL");
  assert.equal(row.raw.resumo.total_ignoradas, 1);
  assert.equal(JSON.stringify(h.state.public), before);
});

test("a sync failure retains down-state precedence beside a partial audit", async (t) => {
  const h = callbackHarness(t);
  h.addRun({
    status: "success",
    status_geral: "PARCIAL",
    aprovados: 1,
    reprovados: 0,
    total_processado: 1,
    raw: resultPayload(),
  });
  h.state.homolog.policy_sync_runs = [
    { id: crypto.randomUUID(), created_at: "2026-10-29T12:00:00Z", status: "error" },
  ];
  const status = await readers.getSystemStatus({ context: { supabase: supabaseAdmin } });
  const { systemStatusPresentation } = await import("../src/lib/audit/result-summary.ts");
  const display = systemStatusPresentation(status);
  assert.equal(status.state, "down");
  assert.match(display.label, /Instável/);
  assert.match(display.description, /parcial/i);
});

test("v3 readers keep the snapshot counts when an audited policy gets a later exception", async (t) => {
  const h = callbackHarness(t);
  const run = h.addRun({
    status: "success",
    status_geral: "ALERTA",
    aprovados: 1,
    reprovados: 1,
    total_processado: 2,
    raw: {
      audit_contract_version: 3,
      resumo: {
        aprovados: 1,
        reprovados: 1,
        total_processado: 2,
        total_candidatas: 4,
        total_excluidas: 1,
        total_dispensadas: 1,
        total_ignoradas: 0,
      },
      apolices_candidatas: ["0001", "0002", "0003", "0004"],
      apolices_dispensadas: [
        { apolice: "0003", motivo: "Pré-suspensão", origem: "EXCECAO_INTEGRAL" },
      ],
    },
  });
  h.state.homolog.audit_findings.push({
    run_id: run.id,
    apolice: "0002",
    tipo_erro: "GAP DE DIA",
    endosso: null,
  });
  h.state.homolog.audit_ignores.push({ apolice: "0002", tipo_erro: null, scope: "apolice" });
  const context = { supabase: supabaseAdmin };
  const polled = await readers.getAuditRunStatus({ data: { runId: run.id }, context });
  const latest = await readers.getLatestAudit({ context });
  const [previous] = await readers.getAuditHistory({ context });
  for (const row of [polled, latest.run, previous]) {
    assert.equal(row.aprovados, 1);
    assert.equal(row.reprovados, 1);
    assert.equal(row.raw.resumo.total_dispensadas, 1);
    assert.equal(row.raw.apolices_dispensadas[0].apolice, "0003");
  }
  assert.equal(latest.findings.length, 0);
  const status = await readers.getSystemStatus({ context });
  assert.equal(status.approvalRate, 50);
  assert.equal(status.lastRunPartial, false);
});

test("completed v3 coverage with only dispenses and exclusions sends a neutral notification", async (t) => {
  const h = callbackHarness(t);
  h.addRun({
    created_at: new Date().toISOString(),
    status: "success",
    status_geral: "SUCESSO",
    raw: {
      audit_contract_version: 3,
      resumo: {
        aprovados: 0,
        reprovados: 0,
        total_processado: 0,
        total_candidatas: 3,
        total_excluidas: 1,
        total_dispensadas: 2,
        total_ignoradas: 0,
      },
    },
  });
  const { getNotifications } = await import("../src/lib/notifications.functions.ts");
  const [notice] = await getNotifications({ data: {} });
  assert.equal(notice.kind, "auditoria_concluida");
  assert.equal(notice.severity, "low");
  assert.match(notice.text, /Nenhuma apólice foi auditada/);
  assert.match(notice.text, /2 dispensadas/);
  assert.doesNotMatch(notice.text, /em conformidade|parcial/i);
});
