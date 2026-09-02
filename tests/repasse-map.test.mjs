import assert from "node:assert/strict";
import test from "node:test";

import {
  buildRepasseWorkbook,
  filterEligibleBillingItems,
  repasseBillingDocumentNumber,
  repasseSourceRow,
  updateRepasseCell,
} from "../src/lib/repasse-map/core.ts";

const DOCUMENT = "056902026000213910030449000000";

test("reconstrói o documento quando cobrança separa apólice e endosso", () => {
  assert.equal(
    repasseBillingDocumentNumber({
      numero_apolice: DOCUMENT,
      numero_endosso: "000123",
    }),
    `${DOCUMENT.slice(0, -6)}000123`,
  );
});

test("mantém somente quitações totais e ativas rigorosamente dentro do período", () => {
  const response = {
    parcelas: [
      {
        numero_documento: DOCUMENT,
        numero_parcela: 1,
        situacao_quitacao: "Total",
        situacao_emissao: "Ativa",
        data_quitacao: "2026-07-31T23:59:59Z",
      },
      {
        numero_documento: DOCUMENT.replace(/0$/, "1"),
        numero_parcela: 1,
        situacao_quitacao: "Aberta",
        situacao_emissao: "Ativa",
        data_quitacao: "2026-07-15T00:00:00Z",
      },
      {
        numero_documento: DOCUMENT.replace(/0$/, "2"),
        numero_parcela: 1,
        situacao_quitacao: "Total",
        situacao_emissao: "Cancelada",
        data_quitacao: "2026-07-15T00:00:00Z",
      },
      {
        numero_documento: DOCUMENT.replace(/0$/, "3"),
        numero_parcela: 1,
        situacao_quitacao: "Total",
        situacao_emissao: "Ativa",
        data_quitacao: "2026-08-01T00:00:00Z",
      },
    ],
  };

  const result = filterEligibleBillingItems(response, "2026-07-01", "2026-07-31");
  assert.equal(result.eligible.length, 1);
  assert.equal(result.ignoredInactiveOrUnsettled, 2);
  assert.equal(result.ignoredOutsidePeriod, 1);
});

test("monta a linha analítica com cobrança e usa a emissão somente para a data", () => {
  const row = repasseSourceRow(
    {
      numero_documento: DOCUMENT,
      numero_proposta: "10092026139100000507",
      cpf_segurado: "123.456.789-00",
      numero_parcela: 1,
      situacao_quitacao: "Total",
      situacao_emissao: "Ativa",
      data_quitacao: "2026-07-19T12:00:00Z",
      valor_emitido: 24,
      valor_pago: 24,
      valor_corretagem: 0,
    },
    { apolice: { data_emissao: "2026-07-18T00:00:00Z", cpf: "00000000000" } },
  );

  assert.ok(row);
  assert.equal(row.policyNumber, DOCUMENT);
  assert.equal(row.insuredDocument, "12345678900");
  assert.equal(row.emissionDate, "2026-07-18");
  assert.equal(row.movementType, "Emissão de Apólice");
  assert.equal(row.movementReason, "EMISSÃO APÓLICE");
  assert.equal(row.paidValue, 24);
});

test("gera as três abas e recalcula o resumo após edição no analítico", () => {
  const workbook = buildRepasseWorkbook(
    [
      {
        policyNumber: DOCUMENT,
        proposalNumber: "10092026139100000507",
        insuredDocument: "12345678900",
        emissionDate: "2026-07-18",
        movementType: "Emissão de Apólice",
        movementReason: "EMISSÃO APÓLICE",
        emittedValue: 24,
        paidValue: 24,
        brokerageValue: null,
        paymentDate: "2026-07-19",
      },
    ],
    { start: "2026-07-01", end: "2026-07-31" },
  );

  assert.deepEqual(
    workbook.sheets.map((sheet) => sheet.name),
    ["Capa_Resumo", "Analitico_Dados", "Regras do Contrato2025"],
  );
  assert.equal(workbook.sheets[0].rows[6][2].value, 24);

  const edited = updateRepasseCell(workbook, "analytic", 2, 8, 100);
  assert.equal(edited.sheets[0].rows[6][2].value, 100);
  assert.equal(edited.sheets[0].rows[30][2].formula, "(C16*-1)+C23+C26");
});
