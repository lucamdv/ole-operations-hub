import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../integrations/supabase/types.ts";
import { isAuditContractV3, isCompleteAuditResult } from "./result-summary.ts";
import { CallbackPayloadSchema, validateV3AuditCoverage } from "./callback-payload.ts";

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
    const complete = data.find(
      (run) => (!isAuditContractV3(run) || run.total_processado > 0) && isCompleteAuditResult(run),
    );
    if (complete) return complete;
    offset += data.length;
  }
}

/** Only a policy actually audited in a later run supersedes a delayed finding. */
export async function laterAuditEvidence(
  client: Pick<SupabaseClient<Database>, "from">,
  createdAt: string,
  policies: Set<string>,
) {
  const audited = new Set<string>();
  let hasLaterResult = false;
  let offset = 0;
  while (audited.size < policies.size) {
    const { data, error } = await client
      .from("audit_runs")
      .select("id, raw")
      .eq("status", "success")
      .gt("created_at", createdAt)
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .range(offset, offset + 99);
    if (error) throw new Error("Falha ao consultar execuções posteriores.");
    if (!data?.length) break;
    hasLaterResult = true;
    for (const { raw } of data) {
      if (!raw || typeof raw !== "object" || Array.isArray(raw) || raw.audit_contract_version !== 3)
        continue;
      const result = CallbackPayloadSchema.safeParse(raw);
      const coverage = result.success ? validateV3AuditCoverage(result.data, raw) : null;
      for (const apolice of coverage ?? []) if (policies.has(apolice)) audited.add(apolice);
    }
    offset += data.length;
  }
  return { audited, hasLaterResult };
}
