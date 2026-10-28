import assert from "node:assert/strict";
import test from "node:test";
import { loadAuditExclusionsSnapshot } from "../src/lib/audit/exclusions-snapshot.server.ts";
import { auditDatabase, cancelledPolicyData } from "./helpers/audit-db.mjs";

const AT = "2026-10-28T11:00:00.000Z";

test("11: consulta mais de 1.000 registros de todas as fontes sem truncar e sem N+1", async () => {
  const data = { policies: [], endorsements: [], policy_billing: [], audit_ignores: [] };
  for (let i = 0; i < 1005; i++) {
    const id = String(i).padStart(5, "0");
    const number = `000${id}`;
    data.policies.push({ id, numero_apolice: number });
    data.endorsements.push({
      id,
      numero_apolice: number,
      proposta: { endosso_C: { proposta_endosso_C: { motivo_endosso: "INADIMPLENCIA" } } },
    });
    data.policy_billing.push({
      id,
      numero_apolice: number,
      numero_endosso: "000001",
      numero_parcela: "1",
      id_parcela_seguradora: null,
      numero_proposta: null,
      status_pagamento: "Total",
      situacao_emissao: "Ativa",
      data_quitacao: null,
      data_vencimento: null,
      updated_at: null,
    });
    data.audit_ignores.push({
      id,
      scope: "apolice_tipo",
      apolice: number,
      tipo_erro: "PRÊMIO FORA DO PADRÃO",
      motivo: null,
    });
  }
  const db = auditDatabase(data);
  const result = await loadAuditExclusionsSnapshot(db.client, AT);
  assert.equal(result.apolices_excluidas.length, 1005);
  assert.equal(result.apolices_excluidas.at(-1).apolice, "00001004");
  assert.equal(result.excecoes_especificas.length, 1005);
  assert.equal(db.queries.length, 12);
  assert.deepEqual([...new Set(db.queries.map((q) => q.table))].sort(), [
    "audit_ignores",
    "endorsements",
    "policies",
    "policy_billing",
  ]);
  assert.equal(db.writes.length, 0);
});

test("11: respeita servidor que retorna menos registros que a página solicitada", async () => {
  const data = cancelledPolicyData();
  data.policies.push({ id: "p2", numero_apolice: "0002" });
  data.endorsements.push({ ...data.endorsements[0], id: "e2", numero_apolice: "0002" });
  const db = auditDatabase(data, { cap: 1 });
  const result = await loadAuditExclusionsSnapshot(db.client, AT);
  assert.equal(result.apolices_excluidas.length, 2);
});

test("09: falha numa página posterior rejeita snapshot parcial com diagnóstico seguro", async () => {
  const db = auditDatabase(cancelledPolicyData(), {
    cap: 1,
    failTable: "audit_ignores",
    failAfterCursor: true,
  });
  await assert.rejects(loadAuditExclusionsSnapshot(db.client, AT), (error) => {
    assert.match(error.message, /audit_ignores.*42501/);
    assert.doesNotMatch(error.message, /TOKEN|private-db/);
    return true;
  });
});
