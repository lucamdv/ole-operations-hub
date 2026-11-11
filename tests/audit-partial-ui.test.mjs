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

const fullyOutOfScope = {
  id: "fixture-v3",
  created_at: "2026-10-29T12:00:00Z",
  status_geral: "SUCESSO",
  total_processado: 0,
  aprovados: 0,
  reprovados: 0,
  raw: {
    audit_contract_version: 3,
    resumo: { total_candidatas: 2, total_excluidas: 1, total_dispensadas: 1, total_ignoradas: 0 },
    apolices_dispensadas: [
      { apolice: "000000000003", motivo: "Pré-suspensão", origem: "EXCECAO_INTEGRAL" },
    ],
  },
};

test("completed coverage renders integral dispenses with their reasons and without partial warning", () => {
  const html = renderToStaticMarkup(
    React.createElement(AuditCoverageNotice, { run: fullyOutOfScope }),
  );
  assert.match(html, /Excluídas por status/);
  assert.match(html, /Dispensadas por exceção integral/);
  assert.match(html, /Ignoradas por falha/);
  assert.match(html, /000000000003/);
  assert.match(html, /Pré-suspensão/);
  assert.doesNotMatch(html, /Auditoria parcialmente concluída|100%/);
});

test("v3 partial coverage discloses separate processing failures and integral dispenses", () => {
  const html = renderToStaticMarkup(
    React.createElement(AuditCoverageNotice, {
      run: {
        ...fullyOutOfScope,
        status_geral: "PARCIAL",
        raw: {
          ...fullyOutOfScope.raw,
          resumo: { ...fullyOutOfScope.raw.resumo, total_candidatas: 3, total_ignoradas: 1 },
          apolices_ignoradas: [{ apolice: "000000000004", motivo: "Sem cobertura" }],
        },
      },
    }),
  );
  assert.match(html, /Auditoria parcialmente concluída/);
  assert.match(html, /Dispensadas por exceção integral/);
  assert.match(html, /Ignoradas por falha/);
  assert.match(html, /Pré-suspensão/);
  assert.match(html, /Sem cobertura/);
});

test("exported PDF shows complete dispenses and no approval rate without any audited policies", async () => {
  const pdf = await import("../src/lib/audit/export-pdf.ts");
  const text = pdf.buildAuditPdf({ run: fullyOutOfScope, findings: [] }).output();
  assert.match(text, /Excluidas por status/);
  assert.match(text, /Dispensadas por excecao integral/);
  assert.match(text, /Ignoradas por falha/);
  assert.match(text, /Sem apolices auditadas/);
  assert.doesNotMatch(text, /Pendente|100\.0%/);
});

test("overview KPI has no approval rate when no policies were audited", async () => {
  const { deriveKpis } = await import("../src/lib/audit/derive.ts");
  const kpis = deriveKpis({ latest: { run: fullyOutOfScope, findings: [] }, history: [] });
  assert.equal(kpis.approvedRate, null);
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
