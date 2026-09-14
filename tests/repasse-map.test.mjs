import assert from "node:assert/strict";
import test from "node:test";
import ExcelJS from "exceljs";

import {
  buildRepasseWorkbook,
  coerceRepasseEditedCell,
  editRepasseStructure,
  filterEligibleBillingItems,
  formatRepasseCell,
  mergeRepasseBillingItems,
  repasseDocumentCount,
  repasseBillingDocumentNumber,
  repasseSourceRow,
  summaryPreview,
  updateRepasseCell,
} from "../src/lib/repasse-map/core.ts";
import { createRepasseXlsx } from "../src/lib/repasse-map/xlsx.server.ts";

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
      numero_parcela: 1,
      situacao_quitacao: "Total",
      situacao_emissao: "Ativa",
      data_quitacao: "2026-07-19T12:00:00Z",
      valor_total: "87,35",
    },
    {
      apolice: { data_emissao: "2026-07-18T03:00:00Z" },
      proposta: {
        numero_proposta_seguradora: "10092026139100000507",
        partes: [
          {
            papel_parte: "CORRETOR",
            documentos_identificacao: [
              { tipo_identificacao: "CPF", valor_identificacao: "000.000.000-00" },
            ],
          },
          {
            papel_parte: "SEGURADO",
            documentos_identificacao: [
              { tipo_identificacao: "CPF", valor_identificacao: "123.456.789-00" },
            ],
          },
        ],
      },
    },
  );

  assert.ok(row);
  assert.equal(row.policyNumber, DOCUMENT);
  assert.equal(row.proposalNumber, "10092026139100000507");
  assert.equal(row.insuredDocument, "12345678900");
  assert.equal(row.emissionDate, "2026-07-18");
  assert.equal(row.movementType, "Emissão de Apólice");
  assert.equal(row.movementReason, "EMISSÃO APÓLICE");
  assert.equal(row.emittedValue, 87.35);
  assert.equal(row.paidValue, 87.35);
  assert.equal(row.hasBroker, false);
});

test("identifica corretor pela composição da emissão e calcula seu percentual do prêmio", () => {
  const row = repasseSourceRow(
    {
      numero_documento: DOCUMENT,
      numero_proposta: "10092026139100000507",
      data_quitacao: "2026-07-19T12:00:00Z",
      valor_total: 100,
    },
    {
      proposta: {
        itens: [
          {
            coberturas: [
              {
                composicao_premio_cobertura: [
                  {
                    natureza_premio: "INTERMEDIACAO",
                    tipo_premio: "COMISSAO_CORRETAGEM",
                    valor_premio: "10.00",
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  );

  assert.ok(row);
  assert.equal(row.hasBroker, true);
  assert.equal(row.brokerageValue, 10);
  assert.equal(row.brokeragePercentage, 0.1);
});

test("gera quatro abas, separa corretores sem duplicar e recalcula a capa", () => {
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
        brokeragePercentage: null,
        hasBroker: false,
        paymentDate: "2026-07-19",
      },
      {
        policyNumber: DOCUMENT.replace(/0$/, "1"),
        proposalNumber: "10092026139100000508",
        insuredDocument: "98765432100",
        emissionDate: "2026-07-20",
        movementType: "Emissão de Apólice",
        movementReason: "EMISSÃO APÓLICE",
        emittedValue: 100,
        paidValue: 100,
        brokerageValue: 10,
        brokeragePercentage: 0.1,
        hasBroker: true,
        paymentDate: "2026-07-21",
      },
    ],
    { start: "2026-07-01", end: "2026-07-31" },
  );

  assert.deepEqual(
    workbook.sheets.map((sheet) => sheet.name),
    ["Capa_Resumo", "Analitico_Dados", "Analitico_Dados_Corretores", "Regras do Contrato2026"],
  );
  assert.equal(workbook.sheets[0].rows[6][2].value, 124);
  assert.equal(workbook.sheets[0].rows[28][2].value, 10);
  assert.equal(workbook.sheets[1].rows[2][1].value, DOCUMENT);
  assert.equal(workbook.sheets[1].rows[3][1].value, null);
  assert.equal(workbook.sheets[2].rows[2][1].value, DOCUMENT.replace(/0$/, "1"));
  assert.equal(workbook.sheets[2].rows[3][1].value, null);
  assert.equal(workbook.sheets[2].rows[2][10].value, 0.1);

  const edited = updateRepasseCell(workbook, "analytic", 2, 8, 100);
  assert.equal(edited.sheets[0].rows[6][2].value, 200);
  assert.equal(edited.sheets[0].rows[30][2].formula, "ROUND((C16*-1)+C23+C26,2)");

  const editedBrokerage = updateRepasseCell(edited, "brokerAnalytic", 2, 9, 25);
  assert.equal(editedBrokerage.sheets[0].rows[28][2].value, 25);
  assert.equal(editedBrokerage.sheets[2].rows[2][10].value, 0.25);
});

test("exporta o XLSX com a quarta aba, fórmulas consolidadas e percentual formatado", async () => {
  const model = buildRepasseWorkbook(
    [
      {
        policyNumber: DOCUMENT,
        proposalNumber: "10092026139100000507",
        insuredDocument: "12345678900",
        emissionDate: "2026-07-18",
        movementType: "Emissão de Apólice",
        movementReason: "EMISSÃO APÓLICE",
        emittedValue: 100,
        paidValue: 100,
        brokerageValue: 10,
        brokeragePercentage: 0.1,
        hasBroker: true,
        paymentDate: "2026-07-19",
      },
    ],
    { start: "2026-07-01", end: "2026-07-31" },
  );
  const buffer = await createRepasseXlsx(model);
  const exported = new ExcelJS.Workbook();
  await exported.xlsx.load(buffer);

  assert.deepEqual(
    exported.worksheets.map((sheet) => sheet.name),
    ["Capa_Resumo", "Analitico_Dados", "Analitico_Dados_Corretores", "Regras do Contrato2026"],
  );
  assert.equal(
    exported.getWorksheet("Capa_Resumo").getCell("C7").value.formula,
    "ROUND(SUM(Analitico_Dados!I3:I1048576,Analitico_Dados_Corretores!I3:I1048576),2)",
  );
  assert.equal(
    exported.getWorksheet("Capa_Resumo").getCell("C29").value.formula,
    "ROUND(SUM(Analitico_Dados_Corretores!J3:J1048576),2)",
  );
  const brokerSheet = exported.getWorksheet("Analitico_Dados_Corretores");
  assert.equal(brokerSheet.getCell("D3").value, "12345678900");
  assert.equal(brokerSheet.getCell("J3").value, 10);
  assert.equal(brokerSheet.getCell("K3").value.formula, 'IF(H3=0,"",J3/H3)');
  assert.equal(brokerSheet.getCell("K3").numFmt, "0%");
});

test("capa preserva centavos em valores e fórmulas, e percentual é exibido como 30%", async () => {
  const model = buildRepasseWorkbook(
    [
      {
        policyNumber: DOCUMENT,
        proposalNumber: "1",
        insuredDocument: "12345678900",
        emissionDate: "2026-08-01",
        movementType: "Emissão",
        movementReason: "Emissão",
        emittedValue: 100,
        paidValue: 123.456,
        brokerageValue: 29.88888,
        brokeragePercentage: 0.2988888,
        hasBroker: true,
        paymentDate: "2026-08-02",
      },
    ],
    { start: "2026-08-01", end: "2026-08-31" },
  );
  const summary = model.sheets[0];
  const broker = model.sheets[2];
  assert.equal(summary.rows[6][2].value, 123.46);
  assert.equal(summary.rows[28][2].value, 29.89);
  assert.ok(summary.rows[6][2].formula.startsWith("ROUND("));
  assert.equal(formatRepasseCell(summary, 6, 2), "123,46");
  assert.equal(summaryPreview(model).premioTotalPago, 123.46);
  assert.equal(formatRepasseCell(broker, 2, 10), "30%");
  assert.equal(coerceRepasseEditedCell(broker, 2, 10, "30%"), 0.3);
  const exported = new ExcelJS.Workbook();
  await exported.xlsx.load(await createRepasseXlsx(model));
  assert.equal(exported.getWorksheet("Capa_Resumo").getCell("C7").value.result, 123.46);
  assert.equal(exported.getWorksheet("Analitico_Dados_Corretores").getCell("K3").numFmt, "0%");
});

test("edição estrutural remove documento de ambas as abas e atualiza a capa", async () => {
  const row = (policyNumber, hasBroker, paidValue) => ({
    policyNumber,
    proposalNumber: "1",
    insuredDocument: "12345678900",
    emissionDate: "2026-08-01",
    movementType: "Emissão",
    movementReason: "Emissão",
    emittedValue: paidValue,
    paidValue,
    brokerageValue: hasBroker ? 10 : null,
    brokeragePercentage: hasBroker ? 10 / paidValue : null,
    hasBroker,
    paymentDate: "2026-08-02",
  });
  const original = buildRepasseWorkbook(
    [
      row(DOCUMENT, false, 50),
      row(DOCUMENT, true, 100),
      row(DOCUMENT.replace(/0$/, "1"), true, 25),
    ],
    { start: "2026-08-01", end: "2026-08-31" },
  );
  assert.equal(repasseDocumentCount(original), 3);
  const added = editRepasseStructure(original, "brokerAnalytic", "addRow", 2, 1);
  assert.equal(added.sheets[2].rows[4][10].formula, 'IF(H5=0,"",J5/H5)');
  const blankBrokerSheet = added.sheets[2];
  assert.equal(coerceRepasseEditedCell(blankBrokerSheet, 3, 8, "100,25"), 100.25);
  let filledRow = updateRepasseCell(added, "brokerAnalytic", 3, 1, "DOCUMENTO-NOVO");
  filledRow = updateRepasseCell(filledRow, "brokerAnalytic", 3, 7, 100.25);
  filledRow = updateRepasseCell(
    filledRow,
    "brokerAnalytic",
    3,
    8,
    coerceRepasseEditedCell(blankBrokerSheet, 3, 8, "100,25"),
  );
  filledRow = updateRepasseCell(filledRow, "brokerAnalytic", 3, 9, 25);
  assert.equal(filledRow.sheets[0].rows[6][2].value, 275.25);
  assert.equal(filledRow.sheets[2].rows[3][10].value, 25 / 100.25);
  const filledExport = new ExcelJS.Workbook();
  await filledExport.xlsx.load(await createRepasseXlsx(filledRow));
  assert.equal(filledExport.getWorksheet("Analitico_Dados_Corretores").getCell("I4").value, 100.25);
  const removed = editRepasseStructure(added, "analytic", "removeDocument", 2, 1);
  assert.equal(repasseDocumentCount(removed), 1);
  assert.equal(removed.sheets[0].rows[6][2].value, 25);
  assert.equal(removed.sheets[0].rows[28][2].value, 10);
  assert.equal(repasseDocumentCount(original), 3);
  const withColumn = editRepasseStructure(removed, "rules", "addColumn", 0, 0);
  assert.equal(withColumn.sheets[3].columnWidths.length, 5);
  const withCell = editRepasseStructure(removed, "brokerAnalytic", "addCell", 3, 1);
  assert.equal(withCell.sheets[2].columnWidths.length, 17);
  const filled = updateRepasseCell(withCell, "brokerAnalytic", 3, 16, "Conferido");
  assert.equal(filled.sheets[2].rows[3][16].value, "Conferido");
  assert.equal(
    editRepasseStructure(filled, "brokerAnalytic", "removeCell", 3, 16).sheets[2].rows[3][16].value,
    null,
  );
  const withoutLastRow = editRepasseStructure(removed, "brokerAnalytic", "removeRow", 3, 1);
  assert.equal(repasseDocumentCount(withoutLastRow), 0);
  assert.equal(withoutLastRow.sheets[0].rows[6][2].value, 0);
  assert.equal(
    editRepasseStructure(withColumn, "rules", "removeColumn", 0, 4).sheets[3].columnWidths.length,
    4,
  );
  assert.equal(editRepasseStructure(withColumn, "rules", "removeColumn", 0, 1), withColumn);
  assert.equal(editRepasseStructure(removed, "brokerAnalytic", "removeCell", 3, 1), removed);
  const withSummaryColumn = editRepasseStructure(removed, "summary", "addColumn", 6, 2);
  const summaryExport = new ExcelJS.Workbook();
  await summaryExport.xlsx.load(await createRepasseXlsx(withSummaryColumn));
  assert.notEqual(summaryExport.getWorksheet("Capa_Resumo").getColumn(9).hidden, true);
  const exported = new ExcelJS.Workbook();
  await exported.xlsx.load(await createRepasseXlsx(removed));
  assert.equal(
    exported.getWorksheet("Analitico_Dados_Corretores").getCell("K4").value.formula,
    'IF(H4=0,"",J4/H4)',
  );
});
