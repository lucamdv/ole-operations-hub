import assert from "node:assert/strict";
import test from "node:test";
import {
  callbackHarness,
  resultPayload,
  completePayload,
  policyError,
  NOW,
  PREV,
  hash,
} from "./helpers/audit-callback-harness.mjs";

const addFinding = (h, run, apolice = "000002") =>
  h.state.homolog.audit_findings.push({
    id: crypto.randomUUID(),
    run_id: run.id,
    apolice,
    tipo_erro: "GAP DE DIA",
    endosso: "000001",
    created_at: PREV,
  });
const addComplete = (h) =>
  h.addRun({
    created_at: PREV,
    status: "success",
    status_geral: "ALERTA",
    aprovados: 0,
    reprovados: 2,
    total_processado: 2,
    raw: { status_geral: "ALERTA" },
  });

for (const deployment of ["preview", "production"])
  test(`${deployment}: mixed partial callback preserves findings/raw in original homolog context`, async (t) => {
    const h = callbackHarness(t, deployment),
      run = h.addRun();
    const before = hash(h.state.public);
    const response = await h.send(run, {
      run_id: run.id,
      status: "success",
      payload: resultPayload(),
    });
    assert.equal(response.status, 200, await response.clone().text());
    assert.equal(run.status, "success");
    assert.equal(run.status_geral, "PARCIAL");
    assert.equal(run.raw.resumo.total_ignoradas, 1);
    assert.equal(run.raw.resumo.total_candidatas, 2);
    assert.equal(run.raw.apolices_ignoradas[0].apolice, "000001");
    assert.equal(run.aprovados, 0);
    assert.equal(run.total_processado, 1);
    assert.equal(h.state.homolog.audit_findings.length, 1);
    assert.equal(h.state.homolog.audit_findings[0].endosso, "000001");
    assert.equal(hash(h.state.public), before);
    assert.ok(
      h.requests.every((q) => q.schema === "homolog"),
      "registry callback never reads/writes public after selector change",
    );
  });

test("partial with no findings cannot resolve absent previous errors", async (t) => {
  const h = callbackHarness(t),
    previous = addComplete(h);
  addFinding(h, previous);
  const run = h.addRun();
  const payload = resultPayload({
    resumo: {
      aprovados: 1,
      reprovados: 0,
      total_processado: 1,
      total_candidatas: 2,
      total_excluidas: 0,
      total_ignoradas: 1,
    },
    apolices_com_erro: [],
  });
  assert.equal((await h.send(run, payload)).status, 200);
  assert.equal(h.state.homolog.audit_resolutions.length, 0);
  assert.equal(run.status_geral, "PARCIAL");
});

test("complete callback skips a previous partial baseline and resolves from prior complete", async (t) => {
  const h = callbackHarness(t),
    previous = addComplete(h);
  addFinding(h, previous);
  h.addRun({
    created_at: "2026-10-29T10:00:00.000Z",
    status: "success",
    status_geral: "PARCIAL",
    raw: resultPayload(),
  });
  const run = h.addRun();
  assert.equal((await h.send(run, completePayload())).status, 200);
  assert.equal(h.state.homolog.audit_resolutions.length, 1);
  assert.equal(h.state.homolog.audit_resolutions[0].apolice, "000002");
});

test("without a reliable complete baseline, absence stays pending", async (t) => {
  const h = callbackHarness(t),
    previous = h.addRun({
      created_at: PREV,
      status: "success",
      status_geral: "PARCIAL",
      raw: resultPayload(),
    });
  addFinding(h, previous);
  const run = h.addRun();
  await h.send(run, completePayload());
  assert.equal(h.state.homolog.audit_resolutions.length, 0);
});

test("baseline pagination skips more than 1000 partial runs", async (t) => {
  const h = callbackHarness(t),
    previous = addComplete(h);
  addFinding(h, previous);
  for (let i = 0; i < 1001; i++)
    h.addRun({
      created_at: new Date(Date.parse(PREV) + (i + 1) * 1000).toISOString(),
      status: "success",
      status_geral: "PARCIAL",
      raw: resultPayload(),
    });
  const run = h.addRun();
  await h.send(run, completePayload());
  assert.equal(h.state.homolog.audit_resolutions.length, 1);
});

test("all ignored is partial, with zero processed and no automatic resolution", async (t) => {
  const h = callbackHarness(t),
    previous = addComplete(h);
  addFinding(h, previous);
  const run = h.addRun();
  await h.send(
    run,
    resultPayload({
      resumo: {
        aprovados: 0,
        reprovados: 0,
        total_processado: 0,
        total_candidatas: 1,
        total_excluidas: 0,
        total_ignoradas: 1,
      },
      apolices_com_erro: [],
    }),
  );
  assert.equal(run.status_geral, "PARCIAL");
  assert.equal(run.aprovados, 0);
  assert.equal(run.total_processado, 0);
  assert.equal(h.state.homolog.audit_resolutions.length, 0);
});

test("present findings reopen resolutions even in a partial audit", async (t) => {
  const h = callbackHarness(t),
    run = h.addRun();
  const resolution = {
    id: crypto.randomUUID(),
    apolice: "000002",
    tipo_erro: "GAP DE DIA",
    endosso: "000001",
    reopened_at: null,
  };
  h.state.homolog.audit_resolutions.push(resolution);
  await h.send(run, resultPayload());
  assert.ok(resolution.reopened_at);
});

test("scope exclusions survive raw replacement and do not become resolutions", async (t) => {
  const h = callbackHarness(t),
    previous = addComplete(h);
  addFinding(h, previous);
  const exclusion = {
    apolice: "000002",
    status: "CANCELADA",
    motivo: "Status operacional: CANCELADA",
  };
  const run = h.addRun({
    raw: { audit_contract_version: 2, apolices_excluidas: [exclusion], excecoes_especificas: [] },
  });
  const payload = completePayload();
  payload.resumo = {
    aprovados: 1,
    reprovados: 0,
    total_processado: 1,
    total_excluidas: 1,
    total_ignoradas: 0,
    total_candidatas: 2,
  };
  await h.send(run, payload);
  assert.deepEqual(run.raw.apolices_excluidas, [exclusion]);
  assert.equal(h.state.homolog.audit_resolutions.length, 0);
});

test("baseline query failure cannot auto resolve", async (t) => {
  const h = callbackHarness(t),
    previous = addComplete(h);
  addFinding(h, previous);
  h.fail((q) => q.table === "audit_runs" && q.method === "GET" && q.query.has("created_at"));
  const run = h.addRun();
  await h.send(run, completePayload());
  assert.equal(h.state.homolog.audit_resolutions.length, 0);
});

test("duplicate completed callbacks do not duplicate findings or repeat resolution effects", async (t) => {
  const h = callbackHarness(t),
    run = h.addRun();
  const payload = resultPayload();
  await h.send(run, payload);
  const snapshot = hash(h.state);
  const replay = await h.send(run, payload);
  assert.equal(replay.status, 200);
  assert.equal(h.state.homolog.audit_findings.length, 1);
  assert.equal(hash(h.state), snapshot);
});

test("technical error envelope overrides nested success, and cannot overwrite a completed partial", async (t) => {
  const h = callbackHarness(t),
    run = h.addRun();
  const error = await h.send(run, {
    status: "error",
    error_message: "Engine failed",
    payload: completePayload(),
  });
  assert.equal(error.status, 200);
  assert.equal(run.status, "error");
  assert.equal(run.status_geral, "ERRO");
  assert.equal(h.state.homolog.audit_findings.length, 0);
  const next = h.addRun();
  await h.send(next, resultPayload());
  const before = hash(h.state);
  await h.send(next, { status: "error", error_message: "Late error" });
  assert.equal(hash(h.state), before);
});

test("legacy complete callbacks retain resolution behavior", async (t) => {
  const h = callbackHarness(t),
    previous = addComplete(h);
  addFinding(h, previous);
  const run = h.addRun();
  await h.send(run, {
    status: "success",
    status_geral: "SUCESSO",
    resumo: { aprovados: 2, reprovados: 0, total_processado: 2 },
  });
  assert.equal(run.status_geral, "SUCESSO");
  assert.equal(h.state.homolog.audit_resolutions.length, 1);
});

test("retry after run publication failure retains exactly one copy of each finding", async (t) => {
  const h = callbackHarness(t),
    run = h.addRun();
  let failOnce = true;
  h.fail((q) => {
    if (q.table === "audit_runs" && q.method === "PATCH" && failOnce) {
      failOnce = false;
      return true;
    }
    return false;
  });
  assert.equal((await h.send(run, resultPayload())).status, 500);
  assert.equal(run.status, "running");
  assert.equal(h.state.homolog.audit_findings.length, 1);
  assert.equal((await h.send(run, resultPayload())).status, 200);
  assert.equal(h.state.homolog.audit_findings.length, 1);
  assert.equal(run.status_geral, "PARCIAL");
});

test("concurrent identical callbacks persist one finding and elect one finalization", async (t) => {
  const h = callbackHarness(t),
    run = h.addRun();
  const responses = await Promise.all([h.send(run, resultPayload()), h.send(run, resultPayload())]);
  assert.ok(responses.every((r) => r.status === 200));
  assert.equal(h.state.homolog.audit_findings.length, 1);
  const bodies = await Promise.all(responses.map((r) => r.json()));
  assert.equal(bodies.filter((r) => r.duplicate).length, 1);
});

test("a racing technical error cannot overwrite a success published after its initial read", async (t) => {
  const h = callbackHarness(t),
    run = h.addRun();
  h.fail((q) => {
    if (q.table === "audit_runs" && q.method === "PATCH") {
      Object.assign(run, { status: "success", status_geral: "PARCIAL", raw: resultPayload() });
    }
    return false;
  });
  await h.send(run, { status: "error", error_message: "Late engine failure" });
  assert.equal(run.status, "success");
  assert.equal(run.status_geral, "PARCIAL");
});

test("an outer error message cannot be hidden by a nested successful payload", async (t) => {
  const h = callbackHarness(t),
    run = h.addRun();
  await h.send(run, { error_message: "Consolidation failed", payload: completePayload() });
  assert.equal(run.status, "error");
});

test("specific exceptions from the original real-source snapshot are not resolutions", async (t) => {
  const h = callbackHarness(t),
    previous = addComplete(h);
  addFinding(h, previous);
  const run = h.addRun({
    raw: {
      apolices_excluidas: [],
      excecoes_especificas: [
        { apolice: "000002", tipo_erro: "GAP DE DIA", motivo: "Exceção de teste" },
      ],
    },
  });
  await h.send(run, completePayload());
  assert.equal(h.state.homolog.audit_resolutions.length, 0);
  assert.equal(run.raw.excecoes_especificas[0].tipo_erro, "GAP DE DIA");
});

test("unaccounted optional v2 coverage remains partial and cannot resolve by absence", async (t) => {
  const h = callbackHarness(t),
    previous = addComplete(h);
  addFinding(h, previous);
  const run = h.addRun(),
    payload = completePayload();
  payload.resumo = {
    aprovados: 2,
    reprovados: 0,
    total_processado: 2,
    total_candidatas: 100,
    total_excluidas: 0,
  };
  assert.equal((await h.send(run, payload)).status, 200);
  assert.equal(run.status_geral, "PARCIAL");
  assert.equal(h.state.homolog.audit_resolutions.length, 0);
  assert.equal(
    run.raw.resumo.total_ignoradas,
    undefined,
    "never infer an ignored count from the gap",
  );
});

for (const operation of ["GET", "PATCH"])
  test(`failed resolution reopening ${operation} stays retryable without hiding a current finding`, async (t) => {
    const h = callbackHarness(t),
      run = h.addRun();
    h.state.homolog.audit_resolutions.push({
      id: crypto.randomUUID(),
      apolice: "000002",
      tipo_erro: "GAP DE DIA",
      endosso: "000001",
      reopened_at: null,
    });
    let failOnce = true;
    h.fail((q) => {
      if (q.table === "audit_resolutions" && q.method === operation && failOnce) {
        failOnce = false;
        return true;
      }
      return false;
    });
    assert.equal((await h.send(run, resultPayload())).status, 500);
    assert.equal(run.status, "running");
    assert.equal(h.state.homolog.audit_findings.length, 1);
    assert.equal((await h.send(run, resultPayload())).status, 200);
    assert.equal(run.status, "success");
    assert.equal(h.state.homolog.audit_findings.length, 1);
    assert.ok(h.state.homolog.audit_resolutions[0].reopened_at);
    const { readers, supabaseAdmin } = await import("./helpers/audit-callback-harness.mjs");
    const latest = await readers.getLatestAudit({ context: { supabase: supabaseAdmin } });
    assert.equal(latest.findings.length, 1);
    assert.equal(latest.run.reprovados, 1);
    assert.equal(latest.run.aprovados, 0);
  });
