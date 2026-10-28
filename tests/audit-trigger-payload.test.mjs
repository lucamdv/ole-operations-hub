import assert from "node:assert/strict";
import test from "node:test";
import {
  buildAuditExclusions,
  buildAuditTriggerPayload,
  AuditTriggerPayloadSchema,
} from "../src/lib/audit/trigger-payload.ts";

const AT = "2026-10-28T11:00:00.000Z";
const RUN_ID = "c162ea64-2342-4678-bb83-23d461930fcb";
const policy = (numero_apolice) => ({ numero_apolice });
const endorsement = (numero_apolice, type, reason) => ({
  numero_apolice,
  proposta: {
    [`endosso_${type}`]: {
      [`proposta_endosso_${type}`]: { motivo_endosso: reason, proposta: { itens: [] } },
    },
  },
});
const billing = (numero_apolice, overrides = {}) => ({
  numero_apolice,
  numero_endosso: "000001",
  numero_parcela: "1",
  id_parcela_seguradora: null,
  numero_proposta: null,
  status_pagamento: "Total",
  situacao_emissao: "Ativa",
  data_quitacao: null,
  data_vencimento: "2026-11-01",
  ...overrides,
});
const ignore = (apolice, tipo_erro, overrides = {}) => ({
  id: "1",
  scope: "apolice_tipo",
  apolice,
  tipo_erro,
  motivo: "Segurado Jovem",
  ...overrides,
});
function exclusions(overrides = {}) {
  return buildAuditExclusions({
    policies: [],
    endorsements: [],
    billing: [],
    ignores: [],
    referenceAt: AT,
    ...overrides,
  });
}
function payload(snapshot = exclusions()) {
  return buildAuditTriggerPayload({
    runId: RUN_ID,
    callbackUrl: `https://cockpit.example/api/public/audit-callback?run_id=${RUN_ID}`,
    trigger: "scheduler",
    at: AT,
    snapshot,
  });
}

test("01/02/03/04: exclui somente CANCELADA e SUSPENSA pela derivação canônica", () => {
  const result = exclusions({
    policies: ["0001", "0002", "0003", "0004", "0005", "0006", "0007"].map(policy),
    endorsements: [
      endorsement("0001", "A", "RESILIÇÃO"),
      endorsement("0002", "C", "INADIMPLENCIA"),
      endorsement("0007", "C", "ERRO_EMISSAO"),
    ],
    billing: [
      billing("0003"),
      billing("0004", { status_pagamento: "Aberta" }),
      billing("0005", { status_pagamento: "Aberta", data_vencimento: "2026-10-01" }),
      billing("0006", { status_pagamento: "Aberta", data_vencimento: "2026-10-27" }),
      billing("0007", { situacao_emissao: "Cancelada" }),
    ],
  });
  assert.deepEqual(result.apolices_excluidas, [
    { apolice: "0001", status: "CANCELADA", motivo: "Status operacional: CANCELADA" },
    { apolice: "0002", status: "SUSPENSA", motivo: "Status operacional: SUSPENSA" },
  ]);
});

test("05/06: preserva nomes canônicos e múltiplos tipos da mesma apólice", () => {
  const result = exclusions({
    ignores: [
      ignore("0003", "PRÊMIO FORA DO PADRÃO"),
      ignore("0003", "TAXA DE ADMINISTRAÇÃO INCORRETA"),
      ignore("0003", "TAXA DE DISTRIBUIÇÃO INCORRETA", { motivo: null }),
    ],
  });
  assert.deepEqual(result.excecoes_especificas, [
    { apolice: "0003", tipo_erro: "PRÊMIO FORA DO PADRÃO", motivo: "Segurado Jovem" },
    { apolice: "0003", tipo_erro: "TAXA DE ADMINISTRAÇÃO INCORRETA", motivo: "Segurado Jovem" },
    { apolice: "0003", tipo_erro: "TAXA DE DISTRIBUIÇÃO INCORRETA", motivo: null },
  ]);
});

test("07: exclusão e exceção específica coexistem e cancelamento precede suspensão", () => {
  const result = payload(
    exclusions({
      policies: [policy("0001")],
      endorsements: [
        endorsement("0001", "A", "RESILICAO"),
        endorsement("0001", "C", "INADIMPLENCIA"),
      ],
      ignores: [ignore("0001", "PRÊMIO FORA DO PADRÃO")],
    }),
  );
  const serialized = JSON.parse(JSON.stringify(result));
  assert.equal(serialized.apolices_excluidas[0].status, "CANCELADA");
  assert.equal(serialized.excecoes_especificas[0].apolice, "0001");
});

test("08: arrays obrigatórios vazios quando não há exceções válidas", () => {
  const result = payload(
    exclusions({
      ignores: [
        ignore("", "ERRO"),
        ignore("0001", "  "),
        ignore(123, "ERRO"),
        ignore("0001", null),
        ignore("0001", "ERRO", { scope: "apolice" }),
      ],
    }),
  );
  assert.deepEqual(result.apolices_excluidas, []);
  assert.deepEqual(result.excecoes_especificas, []);
  assert.equal(result.audit_contract_version, 2);
  assert.equal(result.exclusions_snapshot_at, AT);
});

test("10: deduplica sem remover zeros e ordena deterministicamente", () => {
  const input = {
    policies: [policy("0002"), policy("0001"), policy("0001")],
    endorsements: [
      endorsement("0001", "A", "RESILIÇÃO"),
      endorsement("0002", "C", "INADIMPLÊNCIA"),
    ],
    ignores: [
      ignore("0002", "ERRO", { id: "b", motivo: "B" }),
      ignore("0002", "ERRO", { id: "a", motivo: "A" }),
      ignore("0001", "ERRO", { id: "c" }),
    ],
  };
  const first = exclusions(input);
  const reversed = exclusions({
    policies: [...input.policies].reverse(),
    endorsements: [...input.endorsements].reverse(),
    ignores: [...input.ignores].reverse(),
  });
  assert.deepEqual(first, reversed);
  assert.equal(first.apolices_excluidas.length, 2);
  assert.equal(first.excecoes_especificas.length, 2);
  assert.equal(first.excecoes_especificas[1].motivo, "A");
  assert.equal(first.diagnostics.duplicatePolicies, 1);
  assert.equal(first.diagnostics.duplicateSpecificExceptions, 1);
});

test("13/15: mantém todos os campos legados e não serializa propostas, credenciais ou diagnósticos", () => {
  const result = payload(
    exclusions({
      policies: [
        {
          numero_apolice: "0001",
          cpf: "CPF-SECRETO",
          nome: "NOME-SECRETO",
          token: "TOKEN-SECRETO",
        },
      ],
      ignores: [ignore("0001", "ERRO", { service_role: "CHAVE-SECRETA", reason_tag_id: "tag" })],
    }),
  );
  assert.deepEqual(result, {
    run_id: RUN_ID,
    callback_url: `https://cockpit.example/api/public/audit-callback?run_id=${RUN_ID}`,
    trigger: "scheduler",
    mode: "async_callback",
    status_geral: "PROCESSANDO",
    mensagem_geral: "Auditoria em processamento.",
    resumo: { aprovados: 0, reprovados: 0, total_processado: 0 },
    apolices_com_erro: [],
    at: AT,
    audit_contract_version: 2,
    exclusions_snapshot_at: AT,
    apolices_excluidas: [],
    excecoes_especificas: [{ apolice: "0001", tipo_erro: "ERRO", motivo: "Segurado Jovem" }],
  });
  assert.doesNotMatch(JSON.stringify(result), /SECRETO|SECRETA|diagnostics|reason_tag_id|proposta/);
});

test("14: motivo histórico divergente fica disponível no diagnóstico, sem excluir apólice ativa", () => {
  const result = exclusions({
    policies: [policy("0001")],
    ignores: [ignore("0001", null, { scope: "apolice", motivo: "Apólice Suspensa" })],
  });
  assert.deepEqual(result.apolices_excluidas, []);
  assert.deepEqual(result.excecoes_especificas, []);
  assert.deepEqual(result.diagnostics.historicalWholePolicyIgnores, [
    { apolice: "0001", operationalStatus: "ABERTA", motivo: "Apólice Suspensa" },
  ]);
});

test("validação runtime rejeita contrato incompleto e status de exclusão inválido", () => {
  const valid = payload();
  assert.equal(
    AuditTriggerPayloadSchema.safeParse({ ...valid, apolices_excluidas: undefined }).success,
    false,
  );
  assert.equal(
    AuditTriggerPayloadSchema.safeParse({
      ...valid,
      apolices_excluidas: [{ apolice: "0001", status: "INADIMPLENTE", motivo: "x" }],
    }).success,
    false,
  );
  assert.throws(() =>
    buildAuditTriggerPayload({
      runId: "inválido",
      callbackUrl: "sem-url",
      trigger: "scheduler",
      at: AT,
      snapshot: exclusions(),
    }),
  );
});
