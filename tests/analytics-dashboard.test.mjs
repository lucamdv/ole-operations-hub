import assert from "node:assert/strict";
import test from "node:test";

import {
  buildDynamicHistogram,
  classifyAEndorsements,
  deriveFinancialHealth,
} from "../src/lib/analytics/dashboard-core.ts";

test("endossos A respeitam uma fatura esperada por mês transcorrido", () => {
  const result = classifyAEndorsements(["AP-1"], new Map([["AP-1", "2025-12"]]), [
    { id: "1", numeroApolice: "AP-1", month: "2026-01", sequence: "000001" },
    { id: "2", numeroApolice: "AP-1", month: "2026-02", sequence: "000002" },
    { id: "3", numeroApolice: "AP-1", month: "2026-02", sequence: "000003" },
    { id: "4", numeroApolice: "AP-1", month: "2026-03", sequence: "000004" },
  ]);

  assert.deepEqual(
    result.classified.map((item) => item.classification),
    ["invoice", "invoice", "correction", "invoice"],
  );
  assert.equal(result.correctionsByPolicy[0].corrections, 1);
  assert.deepEqual(result.correctionsByPolicy[0].correctionMonths, ["2026-02"]);
});

test("histograma ajusta intervalos à amplitude e mantém políticas sem correção", () => {
  const buckets = buildDynamicHistogram([0, 0, 1, 2, 3, 9, 12]);
  assert.equal(
    buckets.reduce((sum, bucket) => sum + bucket.count, 0),
    7,
  );
  assert.equal(buckets[0].label, "0");
  assert.equal(buckets[0].count, 2);
  assert.ok(buckets.at(-1).max >= 12);
});

test("saúde financeira separa atraso, inadimplência e contratos cancelados", () => {
  const result = deriveFinancialHealth(
    ["ATIVA-1", "ATIVA-2", "CANCELADA"],
    [
      {
        numero_apolice: "ATIVA-1",
        numero_endosso: "000001",
        numero_parcela: "1",
        status_pagamento: "Aberta",
        situacao_emissao: "Ativa",
        data_quitacao: null,
        data_vencimento: "2026-09-10",
        valor_total: 100,
      },
      {
        numero_apolice: "ATIVA-2",
        numero_endosso: "000001",
        numero_parcela: "1",
        status_pagamento: "Aberta",
        situacao_emissao: "Ativa",
        data_quitacao: null,
        data_vencimento: "2026-09-01",
        valor_total: 250,
      },
      {
        numero_apolice: "CANCELADA",
        numero_endosso: "000004",
        numero_parcela: "1",
        status_pagamento: "Aberta",
        situacao_emissao: "Cancelada",
        data_quitacao: null,
        data_vencimento: "2026-08-01",
        valor_total: 999,
      },
    ],
    10,
    "2026-09-15",
  );

  assert.equal(result.activeContracts, 2);
  assert.equal(result.lateContracts, 1);
  assert.equal(result.delinquentContracts, 1);
  assert.equal(result.lateRevenueUsd, 100);
  assert.equal(result.delinquentRevenueUsd, 250);
});
