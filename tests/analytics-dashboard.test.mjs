import assert from "node:assert/strict";
import test from "node:test";

import {
  ageAtDate,
  buildDynamicAgeHistogram,
  buildDynamicHistogram,
  classifyAEndorsements,
  deriveFinancialHealth,
  derivePortfolioAnalytics,
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

test("saúde financeira particiona somente contratos ativos em três faixas exclusivas", () => {
  const result = deriveFinancialHealth(
    ["ATIVA-1", "ATIVA-2", "ATIVA-3"],
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

  assert.equal(result.activeContracts, 3);
  assert.equal(result.compliantContracts, 1);
  assert.equal(result.lateContracts, 1);
  assert.equal(result.delinquentContracts, 1);
  assert.equal(
    result.compliantContracts + result.lateContracts + result.delinquentContracts,
    result.activeContracts,
  );
  assert.equal(result.lateRevenueUsd, 100);
  assert.equal(result.delinquentRevenueUsd, 250);
});

test("idade civil respeita o aniversário e descarta datas inválidas", () => {
  assert.equal(ageAtDate("1990-09-17", "2026-09-16"), 35);
  assert.equal(ageAtDate("1990-09-16", "2026-09-16"), 36);
  assert.equal(ageAtDate("2026-02-30", "2026-09-16"), null);
  assert.equal(ageAtDate("1800-01-01", "2026-09-16"), null);
});

test("carteira consolida estados, idades e prêmio apenas de apólices ativas", () => {
  const result = derivePortfolioAnalytics(
    [
      {
        numeroApolice: "ATIVA-1",
        state: "ATIVA",
        birthDate: "1990-09-17",
        issuanceMonth: "2026-08",
        coverages: [
          {
            code: "RC",
            name: "Responsabilidade Civil",
            components: [
              { nature: "PREMIO", type: "DIRETO", valueUsd: 100 },
              { nature: "INTERMEDIACAO", type: "ADMINISTRACAO", valueUsd: 20 },
              { nature: "INTERMEDIACAO", type: "COMISSAO_CORRETAGEM", valueUsd: 10 },
            ],
          },
          {
            code: "RC",
            name: "Responsabilidade Civil",
            components: [{ nature: "IMPOSTOS", type: "IOF", valueUsd: 5 }],
          },
        ],
      },
      {
        numeroApolice: "ATIVA-2",
        state: "ATIVA",
        birthDate: "1980-01-01",
        issuanceMonth: "2026-08",
        coverages: [
          {
            code: "RC",
            name: "Responsabilidade Civil",
            components: [
              { nature: "PREMIO", type: "DIRETO", valueUsd: 50 },
              { nature: "CUSTOS", type: "MARGEM_SERVICO_CONTRATUAL", valueUsd: 15 },
            ],
          },
        ],
      },
      {
        numeroApolice: "SUSPENSA-1",
        state: "SUSPENSA",
        birthDate: "1970-01-01",
        issuanceMonth: "2026-08",
        coverages: [
          {
            code: "RC",
            name: "Responsabilidade Civil",
            components: [{ nature: "PREMIO", type: "DIRETO", valueUsd: 999 }],
          },
        ],
      },
      {
        numeroApolice: "CANCELADA-1",
        state: "CANCELADA",
        birthDate: null,
        issuanceMonth: "2026-08",
        coverages: [],
      },
    ],
    "2026-09-16",
  );

  assert.deepEqual(result.status, {
    activePolicies: 2,
    cancelledPolicies: 1,
    suspendedPolicies: 1,
    totalPolicies: 4,
  });
  assert.deepEqual(
    result.policyAges.map((policy) => [policy.state, policy.age]),
    [
      ["ATIVA", 35],
      ["ATIVA", 46],
      ["SUSPENSA", 56],
    ],
  );
  assert.equal(result.coveragePremiums.length, 1);
  assert.equal(result.coveragePremiums[0].premiumUsd, 200);
  assert.equal(result.coveragePremiums[0].excelsiorUsd, 150);
  assert.equal(result.coveragePremiums[0].oleUsd, 40);
  assert.equal(result.coveragePremiums[0].brokerageUsd, 10);
  assert.equal(result.coveragePremiums[0].policies, 2);
});

test("histograma etário cria faixas dinâmicas sem perder segurados", () => {
  const buckets = buildDynamicAgeHistogram([18, 23, 24, 39, 41, 67, 68]);
  assert.equal(
    buckets.reduce((sum, bucket) => sum + bucket.count, 0),
    7,
  );
  assert.ok(buckets.length >= 4);
  assert.ok(buckets[0].min <= 18);
  assert.ok(buckets.at(-1).max >= 68);
});
