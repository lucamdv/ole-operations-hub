import assert from "node:assert/strict";
import test from "node:test";

import {
  buildRepasseWorkbook,
  filterEligibleBillingItems,
  mergeRepasseBillingItems,
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

test("filtra exclusivamente por data_quitacao no fuso de Fortaleza", () => {
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
        data_quitacao: "2026-08-01T03:00:00Z",
      },
    ],
  };

  const result = filterEligibleBillingItems(response, "2026-07-01", "2026-07-31");
  assert.equal(result.eligible.length, 3);
  assert.equal(result.ignoredInactiveOrUnsettled, 0);
  assert.equal(result.ignoredOutsidePeriod, 1);
});

test("reconcilia o banco e inclui parcela paga no período com vencimento anterior", () => {
  const apiItem = {
    numero_documento: DOCUMENT,
    numero_parcela: 1,
    id_parcela: "API-1",
    data_quitacao: "2026-08-10T12:00:00-03:00",
    valor_total: 24,
  };
  const databaseDuplicate = {
    numero_apolice: DOCUMENT,
    numero_endosso: "000000",
    numero_parcela: "1",
    id_parcela_seguradora: "API-1",
    data_quitacao: "2026-08-10T15:00:00Z",
    valor_total: 24,
  };
  const databaseFallback = {
    numero_apolice: DOCUMENT,
    numero_endosso: "000001",
    numero_parcela: "1",
    id_parcela_seguradora: "DB-2",
    data_vencimento: "2026-07-31",
    data_quitacao: "2026-08-03T14:00:00Z",
    valor_total: 48.5,
  };

  const result = mergeRepasseBillingItems([apiItem], [databaseDuplicate, databaseFallback]);
  assert.equal(result.merged.length, 2);
  assert.equal(result.databaseFallbackAdded, 1);
  assert.equal(result.databaseFallbackItems[0]?.valor_total, 48.5);
});

test("parcela comercial aponta para o documento de emissão correspondente", () => {
  assert.equal(
    repasseBillingDocumentNumber({ numero_documento: DOCUMENT, parcela_ole: 3 }),
    `${DOCUMENT.slice(0, -6)}000002`,
  );
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
      valor_total: "87,35",
      valor_corretagem: 0,
    },
    { apolice: { data_emissao: "2026-07-18T03:00:00Z", cpf: "00000000000" } },
  );

  assert.ok(row);
  assert.equal(row.policyNumber, DOCUMENT);
  assert.equal(row.insuredDocument, "12345678900");
  assert.equal(row.emissionDate, "2026-07-18");
  assert.equal(row.movementType, "Emissão de Apólice");
  assert.equal(row.movementReason, "EMISSÃO APÓLICE");
  assert.equal(row.emittedValue, 87.35);
  assert.equal(row.paidValue, 87.35);
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
