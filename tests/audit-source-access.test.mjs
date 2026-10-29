import assert from "node:assert/strict";
import test from "node:test";
import { createClient } from "@supabase/supabase-js";

test("audit source capability only reads four public tables with fixed minimal projections", async () => {
  const { createAuditSourceReadAccess } = await import("../src/lib/audit/source-access.server.ts");
  const requests = [];
  const client = createClient("https://source.example", "synthetic-key", {
    auth: { persistSession: false },
    global: {
      fetch: async (input, init) => {
        requests.push({
          url: new URL(input),
          method: init.method,
          headers: new Headers(init.headers),
        });
        return Response.json([]);
      },
    },
  });
  const source = createAuditSourceReadAccess(client);
  const projections = {
    policies: "id, numero_apolice",
    endorsements: "id, numero_apolice, proposta",
    policy_billing:
      "id, numero_apolice, numero_endosso, numero_parcela, id_parcela_seguradora, numero_proposta, status_pagamento, situacao_emissao, data_quitacao, data_vencimento, updated_at",
    audit_ignores: "id, scope, apolice, tipo_erro, motivo",
  };
  for (const [table, columns] of Object.entries(projections)) {
    const query = source.from(table);
    for (const method of ["insert", "update", "upsert", "delete", "rpc", "schema"])
      assert.equal(query[method], undefined);
    assert.throws(() => query.select("*"));
    const selected = query.select(columns);
    assert.throws(
      () => selected.select("*"),
      TypeError,
      "approved projection cannot be widened by chaining select",
    );
    assert.throws(() => selected.order("cpf", { ascending: true }));
    assert.throws(() => selected.gt("cpf", ""));
    for (const method of ["insert", "update", "upsert", "delete"])
      assert.equal(selected[method], undefined);
    const ordered = selected.order("id", { ascending: true });
    const paged = ordered.gt("id", "cursor").range(0, 999);
    const abortable = paged.abortSignal(new AbortController().signal);
    for (const stage of [selected, ordered, paged, abortable]) {
      assert.throws(() => stage.select("*"), TypeError);
      assert.equal(stage.url, undefined);
      assert.equal(stage.method, undefined);
      for (const method of ["insert", "upsert", "update", "delete", "rpc", "schema"])
        assert.equal(stage[method], undefined);
    }
    await abortable;
  }
  for (const table of [
    "audit_runs",
    "audit_findings",
    "profiles",
    "user_roles",
    "execution_contexts",
    "public.policies",
    "unknown",
  ])
    assert.throws(() => source.from(table));
  assert.equal(source.schema, undefined);
  assert.equal(source.rpc, undefined);
  assert.equal(requests.length, 4);
  assert.deepEqual(
    requests.map((r) => r.url.pathname.split("/").at(-1)),
    Object.keys(projections),
  );
  for (const r of requests) {
    assert.equal(r.method, "GET");
    assert.equal(r.headers.get("accept-profile"), "public");
  }
});
