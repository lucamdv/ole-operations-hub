import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import {
  CallbackPayloadSchema,
  validateV3AuditCoverage,
} from "../src/lib/audit/callback-payload.ts";

const nodes = {
  validator: "Validar Contrato AUDIT-02",
  filter: "Filtrar Carteira AUDIT-02",
  engine: "Auditoria de Vigência",
};
const runId = "ee1ff5ae-98ec-4efa-8b55-d31350e59f20";
const snapshotAt = "2026-11-10T13:00:00.000Z";
const preview = "olexcockpit-git-codex-env-homolo-3ffb4d-luca-monteiros-projects.vercel.app";
const production = "olexcockpit.vercel.app";
const callbackUrl = (host) => `https://${host}/api/public/audit-callback?run_id=${runId}`;

const policy = {
  canceled: "010000001",
  suspended: "010000002",
  overdue: "010000003",
  overdueDispensed: "010000004",
  paidDispensed: "010000005",
  specific: "010000006",
  both: "010000007",
  ignored: "010000008",
  rejected: "010000009",
  absent: "010000010",
};
const premium = "PRÊMIO FORA DO PADRÃO";
const premiumWithoutAccent = "PREMIO FORA DO PADRÃO";
const excluded = (apolice, status) => ({
  apolice,
  status,
  motivo: `Status operacional: ${status}`,
});
const dispensed = (apolice, motivo = null) => ({ apolice, motivo, origem: "EXCECAO_INTEGRAL" });
const specific = (apolice) => ({ apolice, tipo_erro: premium, motivo: "Exceção de prêmio" });

function request(overrides = {}) {
  return {
    run_id: runId,
    callback_url: callbackUrl(preview),
    audit_contract_version: 3,
    exclusions_snapshot_at: snapshotAt,
    apolices_excluidas: [],
    apolices_dispensadas: [],
    excecoes_especificas: [],
    ...overrides,
  };
}

function legacyRequest(overrides = {}) {
  const body = request({ audit_contract_version: 2 });
  delete body.apolices_dispensadas;
  return { ...body, ...overrides };
}

function asItem(json) {
  return { json };
}

function execute(script, input, outputs = {}) {
  const source = readFileSync(
    new URL(`../docs/n8n/audit-02-5/${script}.js.txt`, import.meta.url),
    "utf8",
  );
  const output = runInNewContext(`(function () {\n${source}\n})()`, {
    $input: { first: () => input[0], all: () => input },
    $(node) {
      assert.ok(Object.hasOwn(outputs, node), `Dependência inesperada do node ${node}`);
      return outputs[node];
    },
  });
  return JSON.parse(JSON.stringify(output));
}

function validate(body) {
  return execute("validar-contrato", [asItem({ body })])[0];
}

function document(id, status) {
  return { numero_documento: `${id}000000`, numero_apolice: id, status };
}

function filter(validation, docs) {
  return execute("filtrar-carteira", docs.map(asItem), {
    [nodes.validator]: { first: () => validation },
  });
}

function report(validation, filtered, engineRuns) {
  const output = {
    [nodes.validator]: { first: () => validation },
    [nodes.filter]: { all: () => filtered },
  };
  if (engineRuns) {
    output[nodes.engine] = {
      all(branch, runIndex) {
        assert.equal(branch, 0);
        const results = engineRuns[runIndex];
        if (!results) throw new Error("Iteração da auditoria indisponível");
        return results.map(asItem);
      },
    };
  }
  return execute("montagem-relatorio", [], output)[0].json;
}

function engine(id, status = "APROVADO", findings = []) {
  return { apolice: id, status_auditoria: status, erros_encontrados: findings };
}

test("validador aceita v3 com motivo nullable e preserva identificador e justificativa", () => {
  const result = validate(
    request({
      apolices_dispensadas: [
        dispensed(policy.paidDispensed, "Regra operacional"),
        dispensed(policy.both),
      ],
    }),
  ).json;
  assert.equal(result._audit_contract_ok, true);
  assert.equal(result._audit_request.audit_contract_version, 3);
  assert.equal(result._audit_request.exclusions_snapshot_at, snapshotAt);
  assert.deepEqual(result._audit_request.dispensedPolicies, [
    dispensed(policy.paidDispensed, "Regra operacional"),
    dispensed(policy.both),
  ]);
});

test("validador recusa v3 com dispensa ausente, inválida, duplicada ou sobreposta ao status", () => {
  const cases = [
    { apolices_dispensadas: undefined },
    { apolices_dispensadas: [dispensed(` ${policy.paidDispensed}`)] },
    { apolices_dispensadas: [{ apolice: policy.paidDispensed, origem: "EXCECAO_INTEGRAL" }] },
    { apolices_dispensadas: [{ ...dispensed(policy.paidDispensed), origem: "CANCELADA" }] },
    { apolices_dispensadas: [dispensed(policy.paidDispensed, 123)] },
    { apolices_dispensadas: [dispensed(policy.paidDispensed), dispensed(policy.paidDispensed)] },
    {
      apolices_excluidas: [excluded(policy.canceled, "CANCELADA")],
      apolices_dispensadas: [dispensed(policy.canceled)],
    },
  ];
  for (const overrides of cases) {
    const result = validate(request(overrides)).json;
    assert.equal(result._audit_contract_ok, false, JSON.stringify(overrides));
    assert.match(result._audit_error, /apolices_dispensadas/);
  }
});

test("validador mantém callbacks v2 autorizados e exige correspondência exata no Preview para v3", () => {
  for (const host of [
    preview,
    production,
    "olexcockpit-7p21zxefn-luca-monteiros-projects.vercel.app",
  ]) {
    assert.equal(
      validate(legacyRequest({ callback_url: callbackUrl(host) })).json._audit_contract_ok,
      true,
    );
  }
  assert.equal(
    validate(legacyRequest({ apolices_dispensadas: [] })).json._audit_contract_ok,
    false,
  );
  assert.throws(
    () => validate(request({ callback_url: callbackUrl(production) })),
    /callback_url não autorizada/,
  );
  assert.throws(
    () => validate(request({ callback_url: `${callbackUrl(preview)}&extra=1` })),
    /callback_url não autorizada/,
  );
  assert.throws(() => validate(request({ run_id: "invalid" })), /run_id ausente ou inválido/);
});

test("validador v3 exige um timestamp UTC válido que o Cockpit possa receber no callback", () => {
  for (const timestamp of ["2026-11-10", "2026-11-10T10:00:00-03:00", "2026-02-31T13:00:00Z"]) {
    const result = validate(request({ exclusions_snapshot_at: timestamp })).json;
    assert.equal(result._audit_contract_ok, false, timestamp);
    assert.match(result._audit_error, /exclusions_snapshot_at/);
  }
});

test("callback inválido usa envelope de erro para a versão recebida", () => {
  const validation = validate(request({ apolices_dispensadas: undefined }));
  const [result] = execute("callback-invalido", [], {
    [nodes.validator]: { first: () => validation },
  });
  assert.equal(result.json.run_id, runId);
  assert.equal(result.json.status, "error");
  assert.equal(result.json.payload.status, "error");
  assert.equal(result.json.payload.status_geral, "ERRO");
  assert.match(result.json.payload.error_message, /^Contrato v3 recusado: .*apolices_dispensadas/);
});

test("carteira filtrada dispensa somente candidatas e deixa inadimplente e exceção específica no loop", () => {
  const submitted = request({
    apolices_excluidas: [
      excluded(policy.canceled, "CANCELADA"),
      excluded(policy.suspended, "SUSPENSA"),
    ],
    apolices_dispensadas: [
      dispensed(policy.overdueDispensed),
      dispensed(policy.paidDispensed),
      dispensed(policy.both),
      dispensed(policy.absent),
    ],
    excecoes_especificas: [specific(policy.specific), specific(policy.both)],
  });
  const validation = validate(submitted);
  const filtered = filter(validation, [
    document(policy.canceled, "CANCELADA"),
    document(policy.suspended, "SUSPENSA"),
    [document(policy.overdue, "INADIMPLENTE"), document(policy.overdueDispensed, "INADIMPLENTE")],
    document(policy.paidDispensed, "PAGA"),
    document(policy.specific, "PAGA"),
    document(policy.both, "PAGA"),
    document(policy.specific, "PAGA"),
    { numero_documento: `${policy.absent}000001`, numero_apolice: policy.absent },
  ]);
  assert.deepEqual(
    filtered.map(({ json }) => json.numero_apolice),
    [policy.overdue, policy.specific],
  );
  assert.equal(filtered[0].json._audit_context.total_excluidas, 2);
  assert.equal(filtered[0].json._audit_context.total_dispensadas, 3);
  const result = report(validation, filtered, [
    [engine(policy.overdue)],
    [engine(policy.specific)],
  ]);
  assert.deepEqual(result.payload.apolices_candidatas, [
    policy.canceled,
    policy.suspended,
    policy.overdue,
    policy.overdueDispensed,
    policy.paidDispensed,
    policy.specific,
    policy.both,
  ]);
  const parsed = CallbackPayloadSchema.parse(result.payload);
  assert.deepEqual(
    [...validateV3AuditCoverage(parsed, submitted)],
    [policy.overdue, policy.specific],
  );
});

test("filtro dá precedência ao status mesmo se receber estado interno sobreposto", () => {
  const validation = validate(
    request({ apolices_excluidas: [excluded(policy.canceled, "CANCELADA")] }),
  );
  validation.json._audit_request.dispensedPolicies = [dispensed(policy.canceled)];
  const [result] = filter(validation, [document(policy.canceled, "CANCELADA")]);
  assert.equal(result.json._audit_empty, true);
  assert.equal(result.json._audit_context.total_excluidas, 1);
  assert.equal(result.json._audit_context.total_dispensadas, 0);
});

test("callback v3 reconcilia parcial, mantém achado distinto e não conta dispensas como ignoradas", () => {
  const validation = validate(
    request({
      apolices_excluidas: [excluded(policy.suspended, "SUSPENSA")],
      apolices_dispensadas: [dispensed(policy.overdueDispensed)],
      excecoes_especificas: [specific(policy.specific), specific(policy.rejected)],
    }),
  );
  const filtered = filter(validation, [
    document(policy.suspended),
    document(policy.overdueDispensed),
    document(policy.specific),
    document(policy.ignored),
    document(policy.rejected),
  ]);
  const differentFinding = { tipo_erro: premiumWithoutAccent, endosso: "000001" };
  const result = report(validation, filtered, [
    [engine(policy.specific, "REPROVADO", [{ tipo_erro: premium }])],
    [{ ...engine(policy.ignored, "IGNORADO"), motivo: "Sem cobertura ativa" }],
    [engine(policy.rejected, "REPROVADO", [{ tipo_erro: premium }, differentFinding])],
  ]);
  assert.equal(result.status, "success");
  assert.equal(result.payload.audit_contract_version, 3);
  assert.equal(result.payload.exclusions_snapshot_at, snapshotAt);
  assert.equal(result.payload.status_geral, "PARCIAL");
  assert.deepEqual(result.payload.resumo, {
    aprovados: 1,
    reprovados: 1,
    total_processado: 2,
    total_candidatas: 5,
    total_excluidas: 1,
    total_dispensadas: 1,
    total_ignoradas: 1,
    achados_dispensados: 2,
  });
  assert.deepEqual(result.payload.apolices_com_erro, [
    {
      apolice: policy.rejected,
      total_erros: 1,
      erros: [differentFinding],
    },
  ]);
  assert.deepEqual(result.payload.apolices_ignoradas, [
    { apolice: policy.ignored, motivo: "Sem cobertura ativa" },
  ]);
});

test("sem auditáveis, v3 emite sucesso com zero auditadas e não acessa o motor", () => {
  const validation = validate(
    request({
      apolices_excluidas: [excluded(policy.canceled, "CANCELADA")],
      apolices_dispensadas: [dispensed(policy.paidDispensed)],
    }),
  );
  const filtered = filter(validation, [document(policy.canceled), document(policy.paidDispensed)]);
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].json._audit_empty, true);
  const result = report(validation, filtered);
  assert.equal(result.payload.status_geral, "SUCESSO");
  assert.deepEqual(result.payload.apolices_candidatas, [policy.canceled, policy.paidDispensed]);
  assert.deepEqual(result.payload.resumo, {
    aprovados: 0,
    reprovados: 0,
    total_processado: 0,
    total_candidatas: 2,
    total_excluidas: 1,
    total_dispensadas: 1,
    total_ignoradas: 0,
    achados_dispensados: 0,
  });
});

test("carteira vazia produz callback v3 com lista explícita e contadores zerados", () => {
  const validation = validate(request({ apolices_dispensadas: [dispensed(policy.paidDispensed)] }));
  const filtered = filter(validation, [{}]);
  const result = report(validation, filtered);
  assert.equal(filtered[0].json._audit_empty, true);
  assert.deepEqual(result.payload.apolices_candidatas, []);
  assert.deepEqual(result.payload.resumo, {
    aprovados: 0,
    reprovados: 0,
    total_processado: 0,
    total_candidatas: 0,
    total_excluidas: 0,
    total_dispensadas: 0,
    total_ignoradas: 0,
    achados_dispensados: 0,
  });
});

test("v3 retorna erro técnico para resposta inesperada da carteira", () => {
  const validation = validate(request());
  for (const items of [
    [{ error: "upstream unavailable" }],
    [document(policy.overdue), {}],
    [[document(policy.overdue), { dados: [] }]],
  ]) {
    const filtered = filter(validation, items);
    assert.equal(filtered.length, 1);
    assert.equal(filtered[0].json._audit_empty, true);
    const result = report(validation, filtered);
    assert.equal(result.payload.status, "error");
    assert.match(result.payload.error_message, /carteira/);
  }
});

test("callback v3 falha quando metadados não correspondem à carteira filtrada", () => {
  const validation = validate(request({ apolices_dispensadas: [dispensed(policy.paidDispensed)] }));
  const filtered = filter(validation, [document(policy.overdue), document(policy.paidDispensed)]);
  filtered[0].json._audit_context.apolices_candidatas = [policy.overdue, policy.absent];
  const result = report(validation, filtered, [[engine(policy.overdue)]]);
  assert.equal(result.payload.status, "error");
  assert.match(result.payload.error_message, /carteira/);
});

test("resultados ausentes, duplicados ou de uma dispensada são erros técnicos", () => {
  const validation = validate(request({ apolices_dispensadas: [dispensed(policy.paidDispensed)] }));
  const filtered = filter(validation, [document(policy.overdue), document(policy.paidDispensed)]);
  for (const [engineRuns, message] of [
    [[], /auditoria incompleta/],
    [[[engine(policy.overdue), engine(policy.overdue)]], /resultado duplicado/],
    [[[engine(policy.paidDispensed)]], /fora do conjunto auditável/],
  ]) {
    const result = report(validation, filtered, engineRuns);
    assert.equal(result.status, "error");
    assert.equal(result.payload.status_geral, "ERRO");
    assert.match(result.payload.error_message, message);
  }
});

test("callback v2 mantém formato legado sem candidatas individuais nem contagem de dispensas", () => {
  const validation = validate(
    legacyRequest({ apolices_excluidas: [excluded(policy.canceled, "CANCELADA")] }),
  );
  const filtered = filter(validation, [
    document(policy.canceled),
    { numero_documento: "000123000000" },
  ]);
  assert.equal(filtered[0].json.numero_apolice, "000123000000");
  const result = report(validation, filtered, [[engine("000123000000")]]);
  assert.equal(result.payload.audit_contract_version, 2);
  assert.equal(result.payload.exclusions_snapshot_at, snapshotAt);
  assert.equal(Object.hasOwn(result.payload, "apolices_candidatas"), false);
  assert.equal(
    result.payload.mensagem_geral,
    "Auditoria concluída: 1 aprovada(s), 0 reprovada(s), 1 excluída(s) por status, 0 ignorada(s) sem coberturas válidas, 0 achado(s) dispensado(s).",
  );
  assert.deepEqual(result.payload.resumo, {
    aprovados: 1,
    reprovados: 0,
    total_processado: 1,
    total_candidatas: 2,
    total_excluidas: 1,
    total_ignoradas: 0,
    achados_dispensados: 0,
  });
});
