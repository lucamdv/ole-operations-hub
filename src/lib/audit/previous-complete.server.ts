import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../integrations/supabase/types.ts";
import { isCompleteAuditResult } from "./result-summary.ts";

/** Stable pages, not limit(1): the immediately preceding technical success may be partial. */
export async function previousCompleteAudit(
  client: Pick<SupabaseClient<Database>, "from">,
  current: { id: string; created_at: string },
) {
  let offset = 0;
  for (;;) {
    const { data, error } = await client
      .from("audit_runs")
      .select("id, created_at, status, status_geral, aprovados, reprovados, total_processado, raw")
      .eq("status", "success")
      .neq("id", current.id)
      .lt("created_at", current.created_at)
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .range(offset, offset + 99);
    if (error) throw new Error("Falha ao consultar baseline completo da auditoria.");
    if (!data?.length) return null;
    const complete = data.find(isCompleteAuditResult);
    if (complete) return complete;
    offset += data.length;
  }
}
