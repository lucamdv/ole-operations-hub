import assert from "node:assert/strict";
import test from "node:test";

import {
  basePolicyNumber,
  billingAmountFromIssuanceProposal,
  billingPersistenceIdentity,
  billingSettlementWindow,
  buildEndorsementDocumentNumbers,
  dedupeBillingItems,
  extractBasePolicies,
  normalizeBillingResponse,
  normalizeBillingInstallmentNumber,
  normalizeEmissionDocument,
  planBillingRefresh,
  selectMissingEndorsementDocuments,
  selectBillingDocumentsToRefresh,
  shouldApplyBillingStatus,
} from "../src/lib/excelsior/motor-sync.core.ts";

test("sequenciais numéricos de parcela têm uma identidade canônica", () => {
  assert.equal(normalizeBillingInstallmentNumber("0001"), "1");
  assert.equal(normalizeBillingInstallmentNumber(2), "2");
  assert.equal(normalizeBillingInstallmentNumber("parcela-001"), "parcela-001");
});

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
    ["123456000000", "777777000003"],
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

test("detecta parcela nova mesmo quando o documento continua aberto", () => {
  const plan = planBillingRefresh(
    [
      {
        numero_documento: "123456000001",
        numero_parcela: "1",
        status_pagamento: "Aberta",
        situacao_emissao: "Ativa",
      },
    ],
    {
      parcelas: [
        {
          numero_documento: "123456000001",
          numero_parcela: "1",
          situacao_quitacao: "Aberta",
        },
        {
          numero_documento: "123456000001",
          numero_parcela: "2",
          situacao_quitacao: "Aberta",
        },
      ],
    },
    { parcelas: [] },
  );

  assert.deepEqual(
    plan.directOpenItems.map((item) => item.numero_parcela),
    ["1", "2"],
  );
  assert.deepEqual(plan.detailDocuments, []);
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

test("normaliza valor_total da cobrança para persistência", () => {
  const [normalized] = normalizeBillingResponse(
    {
      numero_documento: "123456000004",
      numero_parcela: 1,
      situacao_quitacao: "Total",
      valor_total: "1.234,56",
    },
    { defaultPaymentStatus: "Total" },
  );
  assert.equal(normalized.valor_total, 1234.56);
});

test("recupera valor histórico pela composição exata da emissão persistida", () => {
  const amount = billingAmountFromIssuanceProposal(
    {
      endosso_A: {
        proposta_endosso_A: {
          proposta: {
            pagamento: {
              parcelas: [
                {
                  numero_parcela: 1,
                  composicao_premio_parcela: [
                    { valor_premio: "13.9467" },
                    { valor_premio: "0.1330" },
                    { valor_premio: "1.7434" },
                    { valor_premio: "10.4601" },
                    { valor_premio: "8.7168" },
                  ],
                },
              ],
            },
          },
        },
      },
    },
    "1",
  );
  assert.equal(amount, 35);
});

test("parcela comercial da apólice-base é persistida no endosso correspondente", () => {
  const [normalized] = normalizeBillingResponse(
    {
      poliza: "056902026000213910020147000000",
      parcela_ole: 3,
      identificador_pago: "OLEFI0000031",
      quitacao: "Total",
    },
    { defaultPaymentStatus: "Total" },
  );
  assert.equal(normalized.id_parcela, "OLEFI0000031");
  assert.equal(normalized.policy_installment_sequence, true);
  assert.deepEqual(billingPersistenceIdentity(normalized), {
    numero_apolice: "056902026000213910020147000000",
    numero_endosso: "000002",
    numero_parcela: "1",
  });
});

test("as 26 ocorrências do relatório do parceiro mantêm pagamento e endosso rastreáveis", () => {
  const partnerRows = [
    ["A", "056902026000213910020147000000", 2, "OLEFI0000030"],
    ["A", "056902026000213910016623000000", 3, "OLEFI0000023"],
    ["A", "056902026000213910022966000000", 2, "OLZ771066497"],
    ["A", "056902026000213910023903000000", 2, "OLEFI0000046"],
    ["A", "056902026000213910024831000000", 2, "OLEFI0000051"],
    ["A", "056902026000213910008160000000", 5, "OLZ947788446"],
    ["A", "056902026000213910024832000000", 2, "OLZ705347469"],
    ["A", "056902026000213910008834000000", 5, "OLZ764452475"],
    ["A", "056902026000213910008831000000", 5, "OLZ240573507"],
    ["A", "056902026000213910020147000000", 3, "OLEFI0000031"],
    ["A", "056902026000213910009475000000", 5, "OLZ242908420"],
    ["A", "056902026000213910027321000000", 2, "OLZ375378143"],
    ["A", "056902026000213910002122000000", 7, "OLZ447600533"],
    ["A", "056902026000213910023903000000", 3, "OLEFI0000047"],
    ["A", "056902026000213910024831000000", 3, "OLEFI0000052"],
    ["A", "056902026000213910035116000000", 2, "OLEFI0000069"],
    ["B", "056902026000213910008831000000", 2, "OLEFI0000016"],
    ["B", "056902026000213910009475000000", 2, "OLZ315802396"],
    ["B", "056902026000213910008834000000", 2, "OLZ393385596"],
    ["B", "056902026000213910013124000000", 2, "OLZ334132369"],
    ["B", "056902026000213910008831000000", 3, "OLEFI0000017"],
    ["B", "056902026000213910009475000000", 3, "OLZ328263978"],
    ["B", "056902026000213910008834000000", 3, "OLZ130840823"],
    ["B", "056902026000213910016623000000", 2, "OLEFI0000022"],
    ["C", "056902026000213910027321000000", 1, "OLZ850369042"],
    ["C", "056902026000213910031062000000", 1, "OLZ424817215"],
  ];

  for (const [group, policy, installment, paymentId] of partnerRows) {
    const [normalized] = normalizeBillingResponse(
      {
        poliza: policy,
        parcela_ole: installment,
        identificador_de_pago: paymentId,
        quitacao: group === "C" ? "Aberta" : "Total",
      },
      { defaultPaymentStatus: group === "C" ? "Aberta" : "Total" },
    );
    const identity = billingPersistenceIdentity(normalized);
    assert.equal(normalized.id_parcela, paymentId);
    assert.equal(identity.numero_endosso, String(Number(installment) - 1).padStart(6, "0"));
    assert.equal(identity.numero_parcela, "1");
  }
});

test("quitação confirmada nunca é rebaixada por fotografia atrasada de aberta", () => {
  assert.equal(shouldApplyBillingStatus("Total", "Aberta"), false);
  assert.equal(shouldApplyBillingStatus("Aberta", "Total"), true);
  assert.equal(shouldApplyBillingStatus("Aberta", "Aberta"), true);
});

test("janela de quitações sobrepõe o cursor e recupera parcelas antigas em aberto", () => {
  const window = billingSettlementWindow(new Date("2026-09-02T12:00:00Z"), "2026-09-01T22:00:00Z", [
    "2026-04-29",
    "2026-08-31",
  ]);
  assert.equal(window.start, "2026-04-27");
  assert.equal(window.end, "2026-09-02");
});

test("rejeita um sequencial impossível antes de disparar milhares de chamadas", () => {
  assert.throws(() => buildEndorsementDocumentNumbers("123456000000", 10_001), /limite seguro/);
});
