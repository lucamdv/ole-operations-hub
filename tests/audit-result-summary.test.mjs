import assert from "node:assert/strict";
import test from "node:test";
import * as results from "../src/lib/audit/result-summary.ts";

const run = {
  status: "success",
  status_geral: "PARCIAL",
  total_processado: 1,
  aprovados: 1,
  reprovados: 0,
  raw: {
    resumo: { total_candidatas: 8, total_excluidas: 5, total_ignoradas: 2, achados_dispensados: 3 },
    apolices_ignoradas: [{ apolice: "00001", motivo: "Sem cobertura" }],
  },
};

test("partial notification is a warning with declared ignored count, not inferred list size", () => {
  const notice = results.auditCompletionNotice(run);
  assert.equal(notice.tone, "warning");
  assert.match(notice.title, /parcial/i);
  assert.match(notice.description, /2 ignorada/);
  assert.doesNotMatch(notice.description, /todas em conformidade/);
});
test("all ignored has no full approval rate and an explicit incomplete notification", () => {
  const all = { ...run, total_processado: 0, aprovados: 0 };
  assert.equal(results.auditResultSummary(all).approvalRate, null);
  assert.equal(results.auditCompletionNotice(all).tone, "warning");
});
test("missing ignored counter is unknown, not guessed from findings/list", () => {
  const unknown = { ...run, raw: { apolices_ignoradas: [{ apolice: "0001" }] } };
  assert.equal(results.auditResultSummary(unknown).ignored, null);
  assert.match(results.auditCompletionNotice(unknown).description, /não informada/);
});
test("legacy complete notification retains success semantics", () => {
  const complete = { ...run, status_geral: "SUCESSO", raw: {} };
  assert.equal(results.auditCompletionNotice(complete).tone, "success");
  assert.match(results.auditCompletionNotice(complete).description, /todas em conformidade/);
  assert.equal(results.auditResultSummary(complete).approvalRate, 100);
});
test("a technical error is not a partial completion notice", () => {
  assert.equal(results.auditCompletionNotice({ ...run, status: "error" }).tone, "error");
});

test("a complete resolution baseline rejects raw technical errors and inconsistent v2 coverage", () => {
  const complete = { ...run, status_geral: "SUCESSO", raw: { status: "error" } };
  assert.equal(results.isCompleteAuditResult(complete), false);
  assert.equal(
    results.isCompleteAuditResult({
      ...complete,
      raw: { resumo: { total_candidatas: 10, total_excluidas: 0, total_ignoradas: 0 } },
    }),
    false,
  );
});

const v3 = {
  status: "success",
  status_geral: "ALERTA",
  total_processado: 2,
  aprovados: 1,
  reprovados: 1,
  raw: {
    audit_contract_version: 3,
    resumo: { total_candidatas: 6, total_excluidas: 1, total_dispensadas: 3, total_ignoradas: 0 },
  },
};

test("v3 coverage counts integral dispenses outside the approval rate", () => {
  const summary = results.auditResultSummary(v3);
  assert.equal(summary.dispensed, 3);
  assert.equal(summary.ignored, 0);
  assert.equal(summary.approvalRate, 50);
  assert.equal(summary.partial, false);
  assert.equal(results.isCompleteAuditResult(v3), true);
  const notice = results.auditCompletionNotice(v3);
  assert.equal(notice.tone, "success");
  assert.match(notice.description, /3 dispensadas/);
});

test("the dispensed counter is unknown in legacy history and required in v3", () => {
  const raw = { ...v3.raw, resumo: { ...v3.raw.resumo, total_candidatas: 3 } };
  delete raw.resumo.total_dispensadas;
  assert.equal(results.auditResultSummary({ ...v3, raw }).partial, true);
  assert.equal(results.isCompleteAuditResult({ ...v3, raw }), false);
  const legacy = { ...v3, raw: { ...raw, audit_contract_version: 2 } };
  assert.equal(results.auditResultSummary(legacy).dispensed, null);
  assert.equal(results.isCompleteAuditResult(legacy), true);
});

test("reconciled v3 coverage with zero audited policies has no compliance rate or claim", () => {
  const noAudited = {
    ...v3,
    status_geral: "SUCESSO",
    total_processado: 0,
    aprovados: 0,
    reprovados: 0,
    raw: { ...v3.raw, resumo: { ...v3.raw.resumo, total_candidatas: 4 } },
  };
  assert.equal(results.isCompleteAuditResult(noAudited), true);
  assert.equal(results.auditResultSummary(noAudited).approvalRate, null);
  const notice = results.auditCompletionNotice(noAudited);
  assert.equal(notice.tone, "success");
  assert.match(notice.description, /Nenhuma apólice foi auditada/);
  assert.doesNotMatch(notice.description, /todas em conformidade|100%/);
});
