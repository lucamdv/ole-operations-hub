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
