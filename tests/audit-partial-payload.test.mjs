import assert from "node:assert/strict";
import test from "node:test";
import { CallbackPayloadSchema } from "../src/lib/audit/callback-payload.ts";

const ignored = { apolice: "000000000001", motivo: "Sem coberturas válidas." };
const partial = () => ({
  status: "success",
  status_geral: "PARCIAL",
  audit_contract_version: 2,
  exclusions_snapshot_at: "2026-10-29T11:59:00.000Z",
  resumo: {
    aprovados: 1,
    reprovados: 1,
    total_processado: 2,
    total_candidatas: 4,
    total_excluidas: 1,
    total_ignoradas: 1,
    achados_dispensados: 3,
  },
  apolices_ignoradas: [ignored],
  apolices_com_erro: [
    {
      apolice: "000000000002",
      erros: [{ tipo_erro: "GAP DE DIA", endosso_com_erro: "000001", nivel: "erro" }],
    },
  ],
});

test("partial callback retains v2 counters, ignored reasons and leading zeros", () => {
  const parsed = CallbackPayloadSchema.parse(partial());
  assert.deepEqual(parsed.resumo, {
    aprovados: 1,
    reprovados: 1,
    total_processado: 2,
    total_candidatas: 4,
    total_excluidas: 1,
    total_ignoradas: 1,
    achados_dispensados: 3,
  });
  assert.deepEqual(parsed.apolices_ignoradas, [ignored]);
  assert.equal(parsed.audit_contract_version, 2);
  assert.equal(parsed.exclusions_snapshot_at, "2026-10-29T11:59:00.000Z");
  assert.equal(parsed.apolices_com_erro[0].erros[0].endosso_com_erro, "000001");
});

for (const [name, change] of [
  [
    "approved plus rejected mismatch",
    (p) => {
      p.resumo.aprovados = 2;
    },
  ],
  [
    "candidate coverage mismatch",
    (p) => {
      p.resumo.total_candidatas = 5;
    },
  ],
  [
    "negative ignored count",
    (p) => {
      p.resumo.total_ignoradas = -1;
    },
  ],
  [
    "fractional ignored count",
    (p) => {
      p.resumo.total_ignoradas = 1.5;
    },
  ],
  [
    "boolean counter",
    (p) => {
      p.resumo.total_excluidas = true;
    },
  ],
  [
    "empty counter",
    (p) => {
      p.resumo.total_excluidas = "";
    },
  ],
  [
    "null counter",
    (p) => {
      p.resumo.total_excluidas = null;
    },
  ],
  [
    "unsafe integer",
    (p) => {
      p.resumo.achados_dispensados = 9007199254740992;
    },
  ],
  [
    "ignored list mismatch",
    (p) => {
      p.apolices_ignoradas = [];
    },
  ],
  [
    "duplicate ignored policy",
    (p) => {
      p.apolices_ignoradas.push({ ...ignored });
      p.resumo.total_ignoradas = 2;
      p.resumo.total_candidatas = 5;
    },
  ],
  [
    "blank ignored policy",
    (p) => {
      p.apolices_ignoradas[0].apolice = "  ";
    },
  ],
  [
    "numeric ignored policy",
    (p) => {
      p.apolices_ignoradas[0].apolice = 1;
    },
  ],
  [
    "missing ignored reason",
    (p) => {
      delete p.apolices_ignoradas[0].motivo;
    },
  ],
  [
    "ignored is also rejected",
    (p) => {
      p.apolices_com_erro[0].apolice = ignored.apolice;
    },
  ],
  [
    "full success with ignored policies",
    (p) => {
      p.status_geral = "SUCESSO";
    },
  ],
])
  test(`callback rejects ${name}`, () => {
    const payload = partial();
    // isolate each fixture (ignored is shared only as a template)
    payload.apolices_ignoradas = [{ ...ignored }];
    change(payload);
    assert.equal(CallbackPayloadSchema.safeParse(payload).success, false);
  });

test("all ignored never counts as processed or approved", () => {
  const payload = partial();
  payload.resumo = {
    aprovados: 0,
    reprovados: 0,
    total_processado: 0,
    total_candidatas: 1,
    total_excluidas: 0,
    total_ignoradas: 1,
  };
  payload.apolices_com_erro = [];
  assert.equal(CallbackPayloadSchema.parse(payload).resumo.total_ignoradas, 1);
});

test("legacy success and alert callbacks remain accepted without new fields", () => {
  for (const status_geral of ["SUCESSO", "ALERTA"]) {
    const parsed = CallbackPayloadSchema.parse({
      status: "success",
      status_geral,
      resumo: { aprovados: "1", reprovados: "0", total_processado: "1" },
    });
    assert.equal(parsed.status_geral, status_geral);
    assert.equal(parsed.resumo.aprovados, 1);
    assert.equal(parsed.resumo.total_ignoradas, undefined);
  }
});

test("technical errors do not require successful count invariants", () => {
  assert.ok(
    CallbackPayloadSchema.safeParse({
      status: "error",
      error_message: "Engine unavailable",
      resumo: { aprovados: 1, reprovados: 0, total_processado: 0 },
    }).success,
  );
});

for (const problem of ["missing findings", "duplicate policy", "empty policy errors"])
  test(`v2 rejects ${problem} instead of proving absence`, () => {
    const p = partial();
    if (problem === "missing findings") p.apolices_com_erro = [];
    if (problem === "duplicate policy")
      p.apolices_com_erro.push(structuredClone(p.apolices_com_erro[0]));
    if (problem === "empty policy errors") p.apolices_com_erro[0].erros = [];
    assert.equal(CallbackPayloadSchema.safeParse(p).success, false);
  });
