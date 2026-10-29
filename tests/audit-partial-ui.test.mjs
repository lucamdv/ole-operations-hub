import assert from "node:assert/strict";
import test from "node:test";
import "./helpers/audit-callback-harness.mjs";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
const { AuditCoverageNotice } = await import("../src/components/audit/audit-coverage-notice.tsx");

test("partial warning renders actual counts and ignored policy reason without full compliance", () => {
  const html = renderToStaticMarkup(
    React.createElement(AuditCoverageNotice, {
      run: {
        status_geral: "PARCIAL",
        total_processado: 44,
        aprovados: 36,
        reprovados: 8,
        raw: {
          resumo: { total_candidatas: 62, total_excluidas: 17, total_ignoradas: 1 },
          apolices_ignoradas: [{ apolice: "000000000001", motivo: "Sem coberturas válidas" }],
        },
      },
    }),
  );
  assert.match(html, /Auditoria parcialmente concluída/);
  assert.match(html, /44/);
  assert.match(html, /62/);
  assert.match(html, /17/);
  assert.match(html, /1/);
  assert.match(html, /000000000001/);
  assert.match(html, /Sem coberturas válidas/);
  assert.match(html, /role="status"/);
  assert.doesNotMatch(html, /100%|todas em conformidade/);
});
test("all-ignored warning never substitutes ignored for approved", () => {
  const html = renderToStaticMarkup(
    React.createElement(AuditCoverageNotice, {
      run: {
        status_geral: "PARCIAL",
        total_processado: 0,
        aprovados: 0,
        raw: { resumo: { total_candidatas: 5, total_excluidas: 0, total_ignoradas: 5 } },
      },
    }),
  );
  assert.match(html, /Auditoria parcialmente concluída/);
  assert.match(html, /não comprova correção/);
  assert.doesNotMatch(html, /5 aprovadas|conformidade integral|100%/);
});
test("complete legacy audits render no partial warning", () => {
  assert.equal(
    renderToStaticMarkup(
      React.createElement(AuditCoverageNotice, {
        run: { status_geral: "SUCESSO", total_processado: 1, aprovados: 1 },
      }),
    ),
    "",
  );
});

test("exported PDF discloses partial coverage instead of a full approval rate", async () => {
  const pdf = await import("../src/lib/audit/export-pdf.ts");
  const latest = {
    run: {
      id: "fixture",
      created_at: "2026-10-29T12:00:00Z",
      data_auditoria: "2026-10-29T12:00:00Z",
      status_geral: "PARCIAL",
      total_processado: 1,
      aprovados: 1,
      reprovados: 0,
      raw: { resumo: { total_candidatas: 2, total_excluidas: 0, total_ignoradas: 1 } },
    },
    findings: [],
  };
  const text = pdf.buildAuditPdf(latest).output();
  assert.match(text, /PARCIAL/);
  assert.match(text, /Pendente/);
  assert.match(text, /Ignoradas/);
  assert.doesNotMatch(text, /100\.0%/);
});
