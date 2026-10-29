import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../integrations/supabase/types.ts";
import type { OperationalContext } from "./scope.ts";

export const OPERATIONAL_TABLES = new Set([
  "policies",
  "endorsements",
  "policy_billing",
  "audit_runs",
  "audit_findings",
  "audit_ignores",
  "audit_resolutions",
  "audit_correction_responses",
  "policy_sync_runs",
  "policy_sync_changes",
  "billing_sync_state",
  "billing_sync_fallbacks",
  "endorsement_extraction_runs",
  "endorsement_extraction_items",
  "endorsement_exceptions",
  "exception_reason_tags",
  "automation_schedules",
]);
const IDENTITY_TABLES = new Set(["profiles", "user_roles", "user_invites"]);

/** Deliberate boundary: exposes only known tables and one operational RPC, never schema().
 * Public generated row signatures are also valid for the structurally matching homolog tables.
 */
export function createScopedAccess(
  client: SupabaseClient<Database>,
  context: () => OperationalContext,
) {
  return {
    from(table: string) {
      const current = context();
      if (OPERATIONAL_TABLES.has(table)) {
        // The closed schema union is runtime-derived, not a browser-provided PostgREST profile.
        return client.schema(current.schema as "public").from(table as "policies");
      }
      if (!IDENTITY_TABLES.has(table)) throw new Error("Tabela fora do escopo autorizado.");
      const query = client.schema("public").from(table as "profiles");
      if (current.environment === "production" && current.scope === "production") return query;
      const denied = () => {
        throw new Error("Alterações de identidade bloqueadas em homologação.");
      };
      return {
        select: query.select.bind(query),
        insert: denied,
        update: denied,
        upsert: denied,
        delete: denied,
      };
    },
    rpc(name: string, args?: Record<string, unknown>) {
      if (name !== "claim_billing_sync_fallbacks")
        throw new Error("RPC fora do escopo autorizado.");
      return client.schema(context().schema as "public").rpc(name, args);
    },
  } as Pick<SupabaseClient<Database>, "from" | "rpc">;
}
