import { runAuditImpl } from "@/lib/audit-run.server";
import { zonedParts, zonedTimeToUtc } from "@/lib/automation/next-run";
import { runPolicySyncImpl } from "@/lib/policy-sync-runner.server";

interface ScheduleRow {
  job: string;
  enabled: boolean;
  run_at_time: string;
  weekdays: number[];
  timezone: string;
  last_triggered_at: string | null;
}

export interface AutomationDispatchResult {
  job: string;
  fired: boolean;
  reason?: "disabled" | "weekday" | "not_due" | "already_today" | "locked";
  error?: string;
}

/**
 * Avalia e dispara os agendamentos persistidos. A atualização condicional de
 * `last_triggered_at` funciona como trava distribuída entre o endpoint público
 * e o tick interno do Supabase, mantendo no máximo um disparo por job/dia.
 */
export async function runDueAutomations(now = new Date()) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("automation_schedules")
    .select("job, enabled, run_at_time, weekdays, timezone, last_triggered_at");
  if (error) throw new Error(error.message);

  const results: AutomationDispatchResult[] = [];
  for (const row of (data ?? []) as unknown as ScheduleRow[]) {
    if (row.job !== "audit" && row.job !== "policy_sync") continue;
    if (!row.enabled) {
      results.push({ job: row.job, fired: false, reason: "disabled" });
      continue;
    }

    const timezone = row.timezone || "America/Sao_Paulo";
    try {
      const current = zonedParts(now, timezone);
      if (!(row.weekdays ?? []).includes(current.weekday)) {
        results.push({ job: row.job, fired: false, reason: "weekday" });
        continue;
      }

      const target = zonedTimeToUtc(current.dateKey, row.run_at_time, timezone);
      if (now.getTime() < target.getTime()) {
        results.push({ job: row.job, fired: false, reason: "not_due" });
        continue;
      }

      if (row.last_triggered_at) {
        const lastDate = zonedParts(new Date(row.last_triggered_at), timezone).dateKey;
        if (lastDate === current.dateKey) {
          results.push({ job: row.job, fired: false, reason: "already_today" });
          continue;
        }
      }

      const lockQuery = supabaseAdmin
        .from("automation_schedules")
        .update({
          last_triggered_at: now.toISOString(),
          last_status: "running",
          last_error: null,
        } as never)
        .eq("job", row.job);
      const { data: locked, error: lockError } = await (
        row.last_triggered_at
          ? lockQuery.eq("last_triggered_at", row.last_triggered_at)
          : lockQuery.is("last_triggered_at", null)
      ).select("job");

      if (lockError) throw new Error(lockError.message);
      if (!locked || locked.length === 0) {
        results.push({ job: row.job, fired: false, reason: "locked" });
        continue;
      }

      try {
        if (row.job === "audit") await runAuditImpl("scheduler");
        else await runPolicySyncImpl();
        await supabaseAdmin
          .from("automation_schedules")
          .update({ last_status: "success", last_error: null } as never)
          .eq("job", row.job);
        results.push({ job: row.job, fired: true });
      } catch (dispatchError) {
        const message =
          dispatchError instanceof Error ? dispatchError.message : String(dispatchError);
        await supabaseAdmin
          .from("automation_schedules")
          .update({ last_status: "error", last_error: message.slice(0, 500) } as never)
          .eq("job", row.job);
        results.push({ job: row.job, fired: false, error: message });
      }
    } catch (evaluationError) {
      results.push({
        job: row.job,
        fired: false,
        error: evaluationError instanceof Error ? evaluationError.message : String(evaluationError),
      });
    }
  }

  return { at: now.toISOString(), results };
}
