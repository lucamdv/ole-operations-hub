import assert from "node:assert/strict";
import test from "node:test";
import { callbackHarness, NOW, PREV, policyError } from "./helpers/audit-callback-harness.mjs";

const waiver = { apolice: "000001", motivo: "Pré-suspensão", origem: "EXCECAO_INTEGRAL" };
const exclusion = {
  apolice: "000003",
  motivo: "Status operacional: CANCELADA",
  status: "CANCELADA",
};
const original = {
  audit_contract_version: 3,
  exclusions_snapshot_at: NOW,
  apolices_dispensadas: [waiver, { ...waiver, apolice: "000099" }],
  apolices_excluidas: [exclusion],
  excecoes_especificas: [],
};
const summary = {
  aprovados: 1,
  reprovados: 0,
  total_processado: 1,
  total_candidatas: 3,
  total_excluidas: 1,
  total_dispensadas: 1,
  total_ignoradas: 0,
};
const result = (overrides = {}) => ({
  status: "success",
  status_geral: "SUCESSO",
  audit_contract_version: 3,
  exclusions_snapshot_at: NOW,
  resumo: summary,
  apolices_candidatas: ["000001", "000002", "000003"],
  apolices_ignoradas: [],
  apolices_com_erro: [],
  ...overrides,
});

function addPrior(h) {
  const previous = h.addRun({
    created_at: PREV,
    status: "success",
    status_geral: "ALERTA",
    total_processado: 3,
    aprovados: 0,
    reprovados: 3,
    raw: {},
  });
  for (const apolice of ["000001", "000002", "000004"]) {
    h.state.homolog.audit_findings.push({
      id: apolice,
      run_id: previous.id,
      apolice,
      tipo_erro: "GAP DE DIA",
      endosso: "000001",
      created_at: PREV,
    });
  }
}

test("v3 preserva achados históricos e resolve por ausência somente apólices efetivamente auditadas", async (t) => {
  const h = callbackHarness(t);
  addPrior(h);
  const run = h.addRun({ raw: original });
  const response = await h.send(run, result({ apolices_dispensadas: [] }));
  assert.equal(response.status, 200, await response.clone().text());
  assert.deepEqual(run.raw.apolices_dispensadas, original.apolices_dispensadas);
  assert.deepEqual(run.raw.apolices_candidatas, ["000001", "000002", "000003"]);
  assert.equal(h.state.homolog.audit_findings.length, 3);
  assert.deepEqual(
    h.state.homolog.audit_resolutions.map(({ apolice }) => apolice),
    ["000002"],
  );
  assert.equal(
    h.requests.some(({ schema }) => schema === "public"),
    false,
  );
  const duplicate = await h.send(run, { status: "error", error_message: "Reenvio tardio" });
  assert.equal((await duplicate.json()).duplicate, true);
  assert.equal(run.status, "success");
  assert.equal(h.state.homolog.audit_resolutions.length, 1);
});

test("v3 mantém achados válidos em resultado parcial com dispensadas e ignoradas", async (t) => {
  const h = callbackHarness(t);
  addPrior(h);
  const run = h.addRun({ raw: original });
  const partial = result({
    status_geral: "PARCIAL",
    resumo: { ...summary, aprovados: 0, reprovados: 1, total_candidatas: 4, total_ignoradas: 1 },
    apolices_candidatas: ["000001", "000002", "000003", "000005"],
    apolices_com_erro: [policyError("000002")],
    apolices_ignoradas: [{ apolice: "000005", motivo: "Sem coberturas válidas" }],
  });
  const response = await h.send(run, partial);
  assert.equal(response.status, 200, await response.clone().text());
  assert.equal(run.status_geral, "PARCIAL");
  assert.equal(run.raw.resumo.total_dispensadas, 1);
  assert.equal(h.state.homolog.audit_findings.length, 4);
  assert.equal(h.state.homolog.audit_resolutions.length, 0);
  assert.equal((await (await h.send(run, partial)).json()).duplicate, true);
  assert.equal(h.state.homolog.audit_findings.length, 4);
});

test("v3 rejeita callback de versão antiga, snapshot divergente ou cobertura forjada antes de escrever", async (t) => {
  const h = callbackHarness(t);
  const run = h.addRun({ raw: original });
  for (const body of [
    result({
      audit_contract_version: 2,
      apolices_candidatas: undefined,
      resumo: { ...summary, total_candidatas: 2, total_dispensadas: undefined },
    }),
    result({ exclusions_snapshot_at: PREV }),
    result({ apolices_candidatas: ["000002", "000003", "000004"] }),
    result({ apolices_candidatas: ["000001", "000002", "000002"] }),
    result({ resumo: { ...summary, total_dispensadas: undefined } }),
    result({ apolices_com_erro: undefined }),
    result({ status_geral: "PARCIAL" }),
    result({
      status_geral: "ALERTA",
      resumo: { ...summary, aprovados: 0, reprovados: 1 },
      apolices_com_erro: [policyError("000001")],
    }),
    result({
      status_geral: "PARCIAL",
      resumo: { ...summary, aprovados: 0, total_processado: 0, total_ignoradas: 1 },
      apolices_ignoradas: [{ apolice: "000001", motivo: "x" }],
    }),
  ]) {
    const response = await h.send(run, body);
    assert.equal(response.status, 400, await response.clone().text());
  }
  assert.equal(run.status, "running");
  assert.equal(
    h.requests.some(({ method }) => method !== "GET"),
    false,
  );
});

test("v3 permite zero auditadas e preserva o snapshot também em erro técnico", async (t) => {
  const h = callbackHarness(t);
  addPrior(h);
  const empty = h.addRun({ raw: original });
  const zero = await h.send(
    empty,
    result({
      resumo: { ...summary, aprovados: 0, total_processado: 0, total_candidatas: 2 },
      apolices_candidatas: ["000001", "000003"],
    }),
  );
  assert.equal(zero.status, 200, await zero.clone().text());
  assert.equal(empty.status_geral, "SUCESSO");
  assert.equal(empty.total_processado, 0);
  assert.equal(h.state.homolog.audit_resolutions.length, 0);
  const failed = h.addRun({ raw: original });
  const error = await h.send(failed, { status: "error", error_message: "Falha do motor" });
  assert.equal(error.status, 200);
  assert.equal(failed.status, "error");
  assert.equal(failed.raw.audit_contract_version, 3);
  assert.deepEqual(failed.raw.apolices_dispensadas, original.apolices_dispensadas);
});

test("v3 callback atrasado registra seu histórico sem sobrescrever resoluções de execução mais nova", async (t) => {
  const h = callbackHarness(t);
  addPrior(h);
  const run = h.addRun({ raw: original });
  h.addRun({ created_at: "2026-10-30T12:00:00.000Z", status: "success" });
  const late = await h.send(run, result());
  assert.equal(late.status, 200, await late.clone().text());
  assert.equal(run.status, "success");
  assert.equal(h.state.homolog.audit_resolutions.length, 0);
});

test("v3 achado de callback atrasado permanece no histórico sem reabrir resolução recente", async (t) => {
  const h = callbackHarness(t);
  const run = h.addRun({ raw: original });
  const newer = h.addRun({ created_at: "2026-10-30T12:00:00.000Z", raw: original });
  assert.equal((await h.send(newer, result())).status, 200);
  h.state.homolog.audit_resolutions.push({
    id: "recent-resolution",
    run_id: newer.id,
    apolice: "000002",
    tipo_erro: "GAP DE DIA",
    endosso: "000001",
    reopened_at: null,
  });
  const late = await h.send(
    run,
    result({
      status_geral: "ALERTA",
      resumo: { ...summary, aprovados: 0, reprovados: 1 },
      apolices_com_erro: [policyError("000002")],
    }),
  );
  assert.equal(late.status, 200, await late.clone().text());
  assert.equal(h.state.homolog.audit_findings[0].apolice, "000002");
  assert.equal(h.state.homolog.audit_resolutions[0].reopened_at, null);
});

test("v3 parcial mais nova não esconde achado recebido depois de apólice que ela ignorou", async (t) => {
  const h = callbackHarness(t);
  const run = h.addRun({ raw: original });
  const newer = h.addRun({ created_at: "2026-10-30T12:00:00.000Z", raw: original });
  h.state.homolog.audit_resolutions.push({
    id: "old-resolution",
    apolice: "000002",
    tipo_erro: "GAP DE DIA",
    endosso: "000001",
    reopened_at: null,
    resolved_at: PREV,
  });
  const partial = result({
    status_geral: "PARCIAL",
    resumo: { ...summary, aprovados: 0, total_processado: 0, total_ignoradas: 1 },
    apolices_ignoradas: [{ apolice: "000002", motivo: "Sem coberturas válidas" }],
  });
  assert.equal((await h.send(newer, partial)).status, 200);
  const late = await h.send(
    run,
    result({
      status_geral: "ALERTA",
      resumo: { ...summary, aprovados: 0, reprovados: 1 },
      apolices_com_erro: [policyError("000002")],
    }),
  );
  assert.equal(late.status, 200);
  assert.equal((await late.json()).reopened_resolutions, 1);
  assert.ok(h.state.homolog.audit_resolutions[0].reopened_at);
});
