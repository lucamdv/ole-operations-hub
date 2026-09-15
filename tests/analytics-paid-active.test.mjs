import assert from "node:assert/strict";
import test from "node:test";

import { derivePaidActivePremiums, isRepasseEligible } from "../src/lib/analytics/paid-active.ts";

function documentWithInstallments() {
  return {
    numero_apolice: "123456000000",
    numero_endosso: "000001",
    proposta: {
      datas: { assinatura: "2026-07-01T10:00:00Z" },
      pagamento: {
        parcelas: [
          {
            numero_parcela: 1,
            data_vencimento: "2026-07-10",
            composicao_premio_parcela: [
              { valor_premio: 100, valor_premio_brl: 550 },
              {
                natureza_premio: "INTERMEDIACAO",
                tipo_premio: "COMISSAO_CORRETAGEM",
                valor_premio: 25,
                valor_premio_brl: 137.5,
              },
            ],
          },
          {
            numero_parcela: 2,
            data_vencimento: "2026-08-10",
            composicao_premio_parcela: [{ valor_premio: 200, valor_premio_brl: 1_100 }],
          },
        ],
      },
    },
  };
}

test("regra financeira segue o mapa e aceita somente cobrança com quitação total", () => {
  assert.equal(isRepasseEligible({ status_pagamento: "Total", situacao_emissao: "Ativa" }), true);
  assert.equal(isRepasseEligible({ status_pagamento: "Aberta", situacao_emissao: "Ativa" }), false);
  assert.equal(
    isRepasseEligible({ status_pagamento: "Total", situacao_emissao: "Cancelada" }),
    true,
  );
});

test("dinheiro pago usa valor_total e a competência da data de quitação", () => {
  const result = derivePaidActivePremiums(
    [
      {
        numero_apolice: "123456000000",
        numero_endosso: "000001",
        numero_parcela: "2",
        status_pagamento: "Total",
        situacao_emissao: "Ativa",
        data_quitacao: "2026-08-21T12:00:00Z",
        data_vencimento: "2026-08-10",
        valor_total: 215.75,
      },
    ],
    [documentWithInstallments()],
  );

  assert.equal(result.eligibleRows, 1);
  assert.equal(result.matchedRows, 1);
  assert.equal(result.byMonth.get("2026-08")?.usd, 215.75);
  assert.equal(result.byMonth.get("2026-08")?.brl, 1_100);
  assert.equal(result.byPolicy.get("123456000000")?.usd, 215.75);
});

test("abertas e pagamentos sem data de quitação não entram no gráfico", () => {
  const base = {
    numero_apolice: "123456000000",
    numero_endosso: "000001",
    numero_parcela: "1",
    data_vencimento: "2026-07-10",
  };
  const result = derivePaidActivePremiums(
    [
      {
        ...base,
        status_pagamento: "Aberta",
        situacao_emissao: "Ativa",
        data_quitacao: null,
      },
      {
        ...base,
        status_pagamento: "Total",
        situacao_emissao: "Ativa",
        data_quitacao: null,
      },
    ],
    [documentWithInstallments()],
  );

  assert.equal(result.eligibleRows, 0);
  assert.equal(result.matchedRows, 0);
  assert.equal(result.byMonth.size, 0);
});

test("não estima valor quando múltiplas parcelas não podem ser associadas com precisão", () => {
  const result = derivePaidActivePremiums(
    [
      {
        numero_apolice: "123456000000",
        numero_endosso: "000001",
        numero_parcela: "desconhecida",
        status_pagamento: "Total",
        situacao_emissao: "Ativa",
        data_quitacao: "2026-08-21",
        data_vencimento: null,
      },
    ],
    [documentWithInstallments()],
  );

  assert.equal(result.eligibleRows, 1);
  assert.equal(result.matchedRows, 0);
  assert.equal(result.byMonth.size, 0);
});

test("a mesma parcela não é contabilizada duas vezes por registros legados duplicados", () => {
  const duplicate = {
    numero_apolice: "123456000000",
    numero_endosso: "000001",
    numero_parcela: "1",
    status_pagamento: "Total",
    situacao_emissao: "Ativa",
    data_quitacao: "2026-08-15T12:00:00Z",
    data_vencimento: "2026-08-10",
    valor_total: 125,
  };

  const result = derivePaidActivePremiums(
    [duplicate, { ...duplicate }],
    [documentWithInstallments()],
  );

  assert.equal(result.matchedRows, 1);
  assert.equal(result.byMonth.get("2026-08")?.usd, 125);
  assert.equal(result.byMonth.get("2026-08")?.corretagemUsd, 25);
});

test("registro LEGACY mantém a competência na data de quitação", () => {
  const wrapperDocument = {
    numero_apolice: "123456000000",
    numero_endosso: "000001",
    proposta: {
      endosso_A: {
        data_emissao: "2026-07-03T12:00:00Z",
        proposta_endosso_A: {
          proposta: documentWithInstallments().proposta,
        },
      },
    },
  };
  const result = derivePaidActivePremiums(
    [
      {
        numero_apolice: "123456000000",
        numero_endosso: "123456000001",
        numero_parcela: "LEGACY",
        status_pagamento: "Total",
        situacao_emissao: "Ativa",
        data_quitacao: "2026-08-04T12:00:00Z",
        data_vencimento: "2026-07-10",
        valor_total: 125,
      },
    ],
    [wrapperDocument],
  );

  assert.equal(result.matchedRows, 1);
  assert.equal(result.byMonth.get("2026-08")?.usd, 125);
  assert.equal(result.byMonth.has("2026-07"), false);
});
