import assert from "node:assert/strict";
import { createClient } from "@supabase/supabase-js";

export const RUN_ID = "c162ea64-2342-4678-bb83-23d461930fcb";

/** Real Supabase query builder, with only its HTTP transport replaced. */
export function auditDatabase(tables = {}, options = {}) {
  const queries = [];
  const writes = [];
  const state = { status: null };
  const client = createClient("https://database.example", "test-key-only", {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: async (input, init) => {
        const url = new URL(input);
        const table = url.pathname.split("/").at(-1);
        const method = init?.method ?? "GET";
        assert.equal(url.origin, "https://database.example");
        if (method !== "GET") {
          assert.equal(table, "audit_runs", "only audit_runs may be written");
          const body = JSON.parse(init.body);
          writes.push({ method, body });
          if (options.failUpdate && method === "PATCH")
            return Response.json({ message: "write failure", code: "42501" }, { status: 403 });
          Object.assign(state, body);
          return Response.json(method === "POST" ? { id: RUN_ID } : null, { status: 200 });
        }
        queries.push({ table, search: url.searchParams });
        if (
          options.failTable === table &&
          (!options.failAfterCursor || url.searchParams.has("id"))
        ) {
          return Response.json(
            { message: "private-db-message TOKEN-SECRETO", code: "42501" },
            { status: 403 },
          );
        }
        assert.equal(url.searchParams.get("order"), "id.asc");
        const cursor = url.searchParams.get("id")?.replace(/^gt\./, "");
        let rows = [...(tables[table] ?? [])].sort((a, b) => (a.id < b.id ? -1 : 1));
        if (cursor) rows = rows.filter((row) => row.id > cursor);
        rows = rows.slice(
          0,
          Math.min(Number(url.searchParams.get("limit") ?? 1000), options.cap ?? 1000),
        );
        const fields = url.searchParams
          .get("select")
          .split(",")
          .map((key) => key.trim());
        return Response.json(
          rows.map((row) => Object.fromEntries(fields.map((key) => [key, row[key]]))),
        );
      },
    },
  });
  return { client, queries, writes, state };
}

export function cancelledPolicyData() {
  return {
    policies: [{ id: "p1", numero_apolice: "0001" }],
    endorsements: [
      {
        id: "e1",
        numero_apolice: "0001",
        proposta: {
          endosso_A: {
            proposta_endosso_A: { motivo_endosso: "RESILIÇÃO", proposta: { itens: [] } },
          },
        },
      },
    ],
    audit_ignores: [
      {
        id: "i1",
        scope: "apolice_tipo",
        apolice: "0001",
        tipo_erro: "PRÊMIO FORA DO PADRÃO",
        motivo: "Segurado Jovem",
      },
    ],
  };
}
