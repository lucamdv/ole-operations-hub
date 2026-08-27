import assert from "node:assert/strict";
import test from "node:test";

import {
  billingInstallmentLabel,
  dedupeBillingRecords,
  normalizeBillingEndosso,
} from "../src/lib/billing/status.ts";
import { normalizeEndossoNum, translateProposta } from "../src/lib/excelsior/translate.ts";

function billing(overrides = {}) {
  return {
    numero_apolice: "123456000000",
    numero_endosso: "000001",
    numero_parcela: "1",
    id_parcela_seguradora: null,
    numero_proposta: "PROP-1",
    status_pagamento: "Aberta",
    situacao_emissao: "Ativa",
    data_quitacao: null,
    data_vencimento: "2026-08-10",
    updated_at: "2026-08-20T12:00:00Z",
    ...overrides,
  };
}

test("endosso completo é apresentado somente pelo sequencial de seis dígitos", () => {
  assert.equal(normalizeEndossoNum("123456000042"), "000042");
  assert.equal(normalizeBillingEndosso("123456000042"), "000042");
  assert.equal(normalizeEndossoNum("42"), "000042");
});

test("histórico de cobrança unifica o mesmo endosso e parcela em formatos diferentes", () => {
  const rows = dedupeBillingRecords([
    billing({ numero_endosso: "123456000001", updated_at: "2026-08-19T12:00:00Z" }),
    billing({ numero_endosso: "000001", status_pagamento: "Total" }),
  ]);

  assert.equal(rows.length, 1);
  assert.equal(rows[0]?.status_pagamento, "Total");
});

test("id da seguradora liga uma identidade antiga à parcela numerada atual", () => {
  const rows = dedupeBillingRecords([
    billing({ numero_parcela: "1", updated_at: "2026-08-18T12:00:00Z" }),
    billing({ numero_parcela: "parcela-abc", id_parcela_seguradora: "parcela-abc" }),
    billing({
      numero_parcela: "1",
      id_parcela_seguradora: "parcela-abc",
      updated_at: "2026-08-21T12:00:00Z",
    }),
  ]);

  assert.equal(rows.length, 1);
  assert.equal(rows[0]?.numero_parcela, "1");
});

test("LEGACY correspondente é ocultado, mas histórico sem correspondência é preservado", () => {
  const matched = dedupeBillingRecords([
    billing({ numero_endosso: "123456000001", numero_parcela: "LEGACY" }),
    billing(),
  ]);
  assert.equal(matched.length, 1);
  assert.equal(matched[0]?.numero_parcela, "1");

  const unmatched = dedupeBillingRecords([
    billing({ numero_parcela: "LEGACY", data_vencimento: "2026-07-10" }),
    billing(),
  ]);
  assert.equal(unmatched.length, 2);
  assert.equal(billingInstallmentLabel("LEGACY"), "Histórica");
});

test("parcelas diferentes com o mesmo vencimento não são colapsadas", () => {
  const rows = dedupeBillingRecords([
    billing({ numero_parcela: "1" }),
    billing({ numero_parcela: "2" }),
  ]);
  assert.equal(rows.length, 2);
});

test("pagamento remove parcelas repetidas antes de calcular o total", () => {
  const parcela = {
    numero_parcela: 1,
    data_vencimento: "2026-08-10",
    agente_cobrador: "SEGURADORA",
    composicao_premio_parcela: [{ moeda_premio: "USD", valor_premio: 100, valor_premio_brl: 550 }],
  };
  const translated = translateProposta({ pagamento: { parcelas: [parcela, { ...parcela }] } });

  assert.equal(translated.pagamento.parcelas.length, 1);
  assert.equal(translated.pagamento.parcelas[0]?.valor, 100);
  assert.equal(translated.pagamento.totalBRL, 550);
});
