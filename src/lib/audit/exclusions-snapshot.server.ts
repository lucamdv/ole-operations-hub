import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../integrations/supabase/types.ts";
import type { BillingRecord } from "../billing/status.ts";
import { buildAuditExclusions, type AuditIgnoreSource } from "./trigger-payload.ts";

const PAGE_SIZE = 1_000;
type SourceTable = "policies" | "endorsements" | "policy_billing" | "audit_ignores";

/** Only controlled messages reach logs/audit_runs, never raw provider errors. */
export class AuditPreparationError extends Error {}

export async function loadAuditExclusionsSnapshot(
  client: SupabaseClient<Database>,
  snapshotAt = new Date().toISOString(),
) {
  const signal = AbortSignal.timeout(30_000);

  async function readPages<T>(table: SourceTable, columns: string): Promise<T[]> {
    const rows: T[] = [];
    let cursor: string | undefined;
    for (;;) {
      try {
        let query = client.from(table).select(columns).order("id", { ascending: true });
        if (cursor) query = query.gt("id", cursor);
        const { data, error } = await query.range(0, PAGE_SIZE - 1).abortSignal(signal);
        if (error) {
          const code = /^[A-Z0-9]{3,10}$/.test(error.code) ? ` (${error.code})` : "";
          throw new AuditPreparationError(
            `Falha ao consultar ${table}${code}. Snapshot de exclusões não preparado.`,
          );
        }
        if (!Array.isArray(data))
          throw new AuditPreparationError(`Resposta inválida ao consultar ${table}.`);
        if (data.length === 0) return rows;
        // A repeated/out-of-order cursor is an incomplete snapshot, not success.
        let previous = cursor;
        for (const row of data as unknown as Array<T & { id: string }>) {
          if (typeof row.id !== "string" || !row.id || (previous && row.id <= previous)) {
            throw new AuditPreparationError(
              `Paginação inconsistente em ${table}: id repetido ou fora de ordem.`,
            );
          }
          previous = row.id;
          rows.push(row);
        }
        cursor = previous;
        // Continue until EMPTY, even if the server caps responses below PAGE_SIZE.
      } catch (error) {
        if (error instanceof AuditPreparationError) throw error;
        throw new AuditPreparationError(`Falha de rede ou tempo limite ao consultar ${table}.`);
      }
    }
  }

  const [policies, endorsements, billing, ignores] = await Promise.all([
    readPages<{ numero_apolice: string }>("policies", "id, numero_apolice"),
    readPages<{ numero_apolice: string; proposta: unknown }>(
      "endorsements",
      "id, numero_apolice, proposta",
    ),
    readPages<BillingRecord>(
      "policy_billing",
      "id, numero_apolice, numero_endosso, numero_parcela, id_parcela_seguradora, numero_proposta, status_pagamento, situacao_emissao, data_quitacao, data_vencimento, updated_at",
    ),
    // Whole-policy entries are read ONLY for diagnostics, never mapped to a status.
    readPages<AuditIgnoreSource>("audit_ignores", "id, scope, apolice, tipo_erro, motivo"),
  ]);
  try {
    return buildAuditExclusions({
      policies,
      endorsements,
      billing,
      ignores,
      referenceAt: snapshotAt,
    });
  } catch {
    throw new AuditPreparationError(
      "Dados operacionais inválidos ao preparar o snapshot de exclusões.",
    );
  }
}
