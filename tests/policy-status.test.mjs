import assert from "node:assert/strict";
import test from "node:test";

import { derivePolicyStatus, policyStatusDescription } from "../src/lib/policies/status.ts";

const REFERENCE = "2026-09-16T12:00:00-03:00";

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
    data_vencimento: "2026-10-01",
    ...overrides,
  };
}

function status(rows, endorsements = [], delinquencyAfterDays = 10) {
  return derivePolicyStatus(rows, endorsements, {
    referenceAt: REFERENCE,
    delinquencyAfterDays,
  }).status;
}

test("apólice fica paga somente quando todos os documentos ativos estão pagos", () => {
  assert.equal(
    status([
      billing({ numero_endosso: "000001", status_pagamento: "Total" }),
      billing({ numero_endosso: "000002", status_pagamento: "Pago" }),
      billing({
        numero_endosso: "000003",
        status_pagamento: "Aberta",
        situacao_emissao: "Cancelada",
      }),
    ]),
    "PAGA",
  );
  assert.equal(
    status([
      billing({ numero_endosso: "000001", status_pagamento: "Total" }),
      billing({ numero_endosso: "000002", status_pagamento: "Aberta" }),
    ]),
    "ABERTA",
  );
});

test("endosso A por resilição cancela a apólice independentemente da cobrança", () => {
  assert.equal(
    status(
      [billing({ status_pagamento: "Total" })],
      [{ tipo_endosso: "A", motivo_endosso: "RESILIÇÃO" }],
    ),
    "CANCELADA",
  );
});

test("endosso C por inadimplência suspende a apólice", () => {
  assert.equal(
    status(
      [billing({ status_pagamento: "Total" })],
      [{ tipo_endosso: "c", motivo_endosso: "Suspensão por INADIMPLÊNCIA" }],
    ),
    "SUSPENSA",
  );
});

test("prazo configurável separa apólice atrasada de inadimplente", () => {
  const row = billing({ data_vencimento: "2026-09-01" });
  assert.equal(status([row], [], 16), "ATRASADA");
  assert.equal(status([row], [], 15), "INADIMPLENTE");
});

test("cobrança em aberto ainda não vencida permanece aberta", () => {
  assert.equal(status([billing({ data_vencimento: "2026-09-16" })]), "ABERTA");
  assert.equal(status([billing({ data_vencimento: "2026-09-17" })]), "ABERTA");
});

test("apólice sem cobrança não é marcada como paga", () => {
  assert.equal(status([]), "ABERTA");
});

test("cancelamento tem precedência sobre suspensão e atraso", () => {
  assert.equal(
    status(
      [billing({ data_vencimento: "2026-01-01" })],
      [
        { tipo_endosso: "C", motivo_endosso: "INADIMPLENCIA" },
        { tipo_endosso: "A", motivo_endosso: "RESILICAO" },
      ],
      1,
    ),
    "CANCELADA",
  );
});

const issuance = (sequencial, tipo_endosso = "A") => ({
  sequencial,
  tipo_endosso,
  motivo_endosso: null,
});
const cancellation = (sequencial, numero_endosso_cancelado, motivo_endosso = null) => ({
  sequencial,
  numero_endosso_cancelado,
  tipo_endosso: "C",
  motivo_endosso,
});
const original = (overrides = {}) => billing({ numero_endosso: "000000", ...overrides });

test("C com alvo na emissão original e sem substituição cancela apesar do pagamento em aberto", () => {
  const info = derivePolicyStatus(
    [original({ situacao_emissao: "Cancelada", data_vencimento: "2025-12-08" })],
    [issuance("000000", null), cancellation("000001", "000000", "ERRO_EMISSAO")],
    { referenceAt: REFERENCE },
  );
  assert.equal(info.status, "CANCELADA");
  assert.match(policyStatusDescription(info, 10), /document/i);
});

test("C documental inequívoco cancela a emissão mesmo sem cobrança", () => {
  assert.equal(status([], [cancellation("000001", "000000")]), "CANCELADA");
});

test("C seguido de A vigente usa a cobrança do documento substituto", () => {
  const docs = [cancellation("000001", "000000"), issuance("000002")];
  const staleOriginal = original({ data_vencimento: "2025-12-08" });
  assert.equal(
    status([staleOriginal, billing({ numero_endosso: "000002", status_pagamento: "Total" })], docs),
    "PAGA",
  );
  assert.equal(
    status([staleOriginal, billing({ numero_endosso: "000002" })], docs),
    "ABERTA",
  );
  assert.equal(status([], docs), "ABERTA");
});

test("C que cancela apenas documento secundário não cancela a emissão original", () => {
  assert.equal(
    status(
      [original({ status_pagamento: "Total" }), billing({ data_vencimento: "2025-12-08" })],
      [issuance("000001", "B"), cancellation("000002", "000001")],
    ),
    "PAGA",
  );
});

test("substituto cancelado também não mantém a apólice ativa; ordem e duplicatas não importam", () => {
  const docs = [
    cancellation("000001", "000000"),
    issuance("000002"),
    cancellation("000003", "000002"),
  ];
  const rows = [
    original({ situacao_emissao: "Cancelada" }),
    billing({ numero_endosso: "000002", situacao_emissao: "Cancelada" }),
  ];
  assert.equal(status(rows, docs), "CANCELADA");
  assert.equal(status([...rows, rows[0]].reverse(), [...docs, docs[0]].reverse()), "CANCELADA");
});

test("substituto sem baixa documental impede concluir cancelamento apenas pela cobrança", () => {
  assert.equal(
    status(
      [original({ situacao_emissao: "Cancelada" }), billing({ numero_endosso: "000002", situacao_emissao: "Cancelada" })],
      [cancellation("000001", "000000"), issuance("000002")],
    ),
    "ABERTA",
  );
});

test("C por inadimplência continua suspenso mesmo fechando a emissão original", () => {
  assert.equal(
    status(
      [original({ situacao_emissao: "Cancelada" })],
      [cancellation("000001", "000000", "INADIMPLÊNCIA")],
    ),
    "SUSPENSA",
  );
});

test("não converte evidência ambígua ou incompleta em cancelamento", () => {
  const cancelledBilling = [original({ situacao_emissao: "Cancelada" })];
  for (const docs of [
    [],
    [cancellation("000001", null)],
    [cancellation(null, "000000")],
    [cancellation("000001", "000002")],
    [cancellation("000002", "000000")],
    [cancellation("000001", "000000"), issuance("000002", null)],
    [cancellation("000001", "000000"), cancellation("000001", "000002")],
    [cancellation("000001", "000000"), issuance("000001")],
    [cancellation("000001", "000000"), cancellation("000002", "000001")],
  ]) {
    assert.equal(status(cancelledBilling, docs), "ABERTA", JSON.stringify(docs));
  }
  assert.equal(status([original()], [cancellation("000001", "000000")]), "ABERTA");
  assert.equal(
    status(
      [...cancelledBilling, billing({ numero_endosso: "000002", situacao_emissao: "Cancelada" })],
      [cancellation("000001", "000000")],
    ),
    "ABERTA",
  );
});
