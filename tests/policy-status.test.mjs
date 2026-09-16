import assert from "node:assert/strict";
import test from "node:test";

import { derivePolicyStatus } from "../src/lib/policies/status.ts";

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
