import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../integrations/supabase/types.ts";

/** The only production-source exception for audit preparation. Never use for result storage. */
export const AUDIT_SOURCE_COLUMNS = Object.freeze({
  policies: "id, numero_apolice",
  endorsements: "id, numero_apolice, proposta",
  policy_billing:
    "id, numero_apolice, numero_endosso, numero_parcela, id_parcela_seguradora, numero_proposta, status_pagamento, situacao_emissao, data_quitacao, data_vencimento, updated_at",
  audit_ignores: "id, scope, apolice, tipo_erro, motivo",
});
export type AuditSourceTable = keyof typeof AUDIT_SOURCE_COLUMNS;
type AuditPageResult = { data: unknown[] | null; error: { code: string } | null };
interface AuditSourceQuery extends PromiseLike<AuditPageResult> {
  order(column: "id", options: { ascending: true }): AuditSourceQuery;
  gt(column: "id", cursor: string): AuditSourceQuery;
  range(from: number, to: number): AuditSourceQuery;
  abortSignal(signal: AbortSignal): AuditSourceQuery;
}
export type AuditSnapshotClient = {
  from(table: AuditSourceTable): { select(columns: string): AuditSourceQuery };
};

/** Do not leak PostgREST's second select(), URL or mutable request properties. */
function restrictQuery(query: AuditSourceQuery): AuditSourceQuery {
  return Object.freeze({
    order(column: "id", options: { ascending: true }) {
      if (column !== "id" || options.ascending !== true)
        throw new Error("Ordenação de auditoria inválida.");
      return restrictQuery(query.order(column, options));
    },
    gt(column: "id", cursor: string) {
      if (column !== "id") throw new Error("Cursor de auditoria inválido.");
      return restrictQuery(query.gt(column, cursor));
    },
    range(from: number, to: number) {
      if (from !== 0 || !Number.isInteger(to) || to < 0 || to >= 1000)
        throw new Error("Página de auditoria inválida.");
      return restrictQuery(query.range(from, to));
    },
    abortSignal(signal: AbortSignal) {
      return restrictQuery(query.abortSignal(signal));
    },
    then: query.then.bind(query),
  });
}

/** Runtime SELECT-only capability: no CRUD, arbitrary tables, projections, schema or RPC. */
export function createAuditSourceReadAccess(
  client: Pick<SupabaseClient<Database>, "schema">,
): AuditSnapshotClient {
  return Object.freeze({
    from(table: AuditSourceTable) {
      if (!Object.hasOwn(AUDIT_SOURCE_COLUMNS, table))
        throw new Error("Fonte fora do escopo de leitura da auditoria.");
      return Object.freeze({
        select(columns: string) {
          if (columns !== AUDIT_SOURCE_COLUMNS[table])
            throw new Error("Projeção fora do escopo de leitura da auditoria.");
          return restrictQuery(client.schema("public").from(table).select(columns));
        },
      });
    },
  });
}
