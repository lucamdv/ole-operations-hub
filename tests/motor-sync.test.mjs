import assert from "node:assert/strict";
import test from "node:test";

import {
  basePolicyNumber,
  buildEndorsementDocumentNumbers,
  dedupeBillingItems,
  extractBasePolicies,
  normalizeBillingResponse,
  normalizeEmissionDocument,
  planBillingRefresh,
  selectMissingEndorsementDocuments,
  selectBillingDocumentsToRefresh,
} from "../src/lib/excelsior/motor-sync.core.ts";

test("seleciona apenas apólices base e enumera todos os documentos até o último endosso", () => {
  const policies = extractBasePolicies({
    dados: [
      { numero_documento: "123456000000", numero_apolice: "123456000000" },
      { numero_documento: "123456000001", numero_apolice: "123456000000" },
    ],
  });

  assert.equal(policies.length, 1);
  assert.equal(basePolicyNumber(policies[0]), "123456000000");
  assert.deepEqual(buildEndorsementDocumentNumbers("123456000000", "2"), [
    "123456000000",
    "123456000001",
    "123456000002",
  ]);
});

test("normaliza uma emissão para a apólice base e o sequencial correto", () => {
  const normalized = normalizeEmissionDocument(
    {
      endosso: {
        numero_apolice_seguradora: "123456000002",
        numero_endosso_seguradora: "123456000002",
        premio_liquido: "150.25",
        proposta: { motivo_endosso: "AJUSTE" },
      },
    },
    "123456000000",
    "123456000002",
  );

  assert.equal(normalized.numero_apolice_seguradora, "123456000000");
  assert.equal(normalized.numero_endosso_seguradora, "000002");
  assert.equal(normalized.premio_liquido, 150.25);
  assert.deepEqual(normalized.proposta, { motivo_endosso: "AJUSTE" });
});

test("busca somente endossos novos e lacunas ainda ausentes", () => {
  assert.deepEqual(
    selectMissingEndorsementDocuments("123456000000", 4, ["000000", "000001", "000003"]),
    ["123456000002", "123456000004"],
  );
  assert.deepEqual(
    selectMissingEndorsementDocuments("123456000000", 2, ["000000", "000001", "000002"]),
    [],
  );
});

test("delta de cobrança consulta documentos novos e os que saíram de Aberta + Ativa", () => {
  const documents = selectBillingDocumentsToRefresh(
    [
      {
        numero_documento: "123456000000",
        status_pagamento: "Aberta",
        situacao_emissao: "Ativa",
      },
      {
        numero_documento: "999999000001",
        status_pagamento: "Aberta",
        situacao_emissao: "Ativa",
      },
    ],
    {
      parcelas: [
        {
          numero_documento: "123456000000",
          situacao_quitacao: "Aberta",
          situacao_emissao: "Ativa",
        },
        {
          numero_documento: "777777000003",
          situacao_quitacao: "Aberta",
          situacao_emissao: "Ativa",
        },
      ],
    },
  );

  assert.deepEqual(new Set(documents), new Set(["999999000001", "777777000003"]));
});

test("cobrança aproveita lotes completos e não reconsulta documento já quitado", () => {
  const plan = planBillingRefresh(
    [
      {
        numero_documento: "123456000000",
        numero_parcela: "1",
        status_pagamento: "Aberta",
        situacao_emissao: "Ativa",
      },
      {
        numero_documento: "999999000001",
        numero_parcela: "1",
        status_pagamento: "Aberta",
        situacao_emissao: "Ativa",
      },
    ],
    {
      parcelas: [
        {
          numero_documento: "123456000000",
          numero_parcela: "1",
          situacao_quitacao: "Aberta",
          situacao_emissao: "Ativa",
        },
        {
          numero_documento: "777777000003",
          numero_parcela: "2",
          situacao_quitacao: "Aberta",
          situacao_emissao: "Ativa",
        },
      ],
    },
    {
      parcelas: [
        {
          numero_documento: "999999000001",
          numero_parcela: "1",
          situacao_quitacao: "Total",
        },
      ],
    },
  );

  assert.deepEqual(
    plan.directOpenItems.map((item) => item.numero_documento),
    ["777777000003"],
  );
  assert.deepEqual(plan.detailDocuments, []);
});

test("cobrança mantém consulta individual quando o lote não identifica a parcela", () => {
  const plan = planBillingRefresh(
    [
      {
        numero_documento: "999999000001",
        numero_parcela: "1",
        status_pagamento: "Aberta",
        situacao_emissao: "Ativa",
      },
    ],
    {
      parcelas: [
        {
          numero_documento: "777777000003",
          situacao_quitacao: "Aberta",
          situacao_emissao: "Ativa",
        },
      ],
    },
    { parcelas: [] },
  );

  assert.deepEqual(new Set(plan.detailDocuments), new Set(["999999000001", "777777000003"]));
  assert.deepEqual(plan.directOpenItems, []);
});

test("preserva parcelas distintas e a atualização total mais recente vence por identidade", () => {
  const open = normalizeBillingResponse(
    {
      parcelas: [
        { numero_parcela: 1, id_parcela: "p-1", data_vencimento: "2026-08-10" },
        { numero_parcela: 2, id_parcela: "p-2", data_vencimento: "2026-09-10" },
      ],
    },
    { fallbackDocument: "123456000004", defaultPaymentStatus: "Aberta" },
  );
  const settled = normalizeBillingResponse(
    {
      numero_documento: "123456000004",
      numero_parcela: 1,
      id_parcela: "p-1",
      situacao_quitacao: "Total",
      data_quitacao: "2026-08-12",
    },
    { defaultPaymentStatus: "Total" },
  );
  const result = dedupeBillingItems([...open, ...settled]);

  assert.equal(result.length, 2);
  assert.equal(result.find((item) => item.id_parcela === "p-1")?.status_pagamento, "Total");
  assert.equal(result.find((item) => item.id_parcela === "p-2")?.status_pagamento, "Aberta");
});

test("rejeita um sequencial impossível antes de disparar milhares de chamadas", () => {
  assert.throws(() => buildEndorsementDocumentNumbers("123456000000", 10_001), /limite seguro/);
});
