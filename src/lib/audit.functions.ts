import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import type { AuditHistoryItem, AuditPayload, LatestAudit } from "./audit/types";
import type { WebhookMode } from "@/lib/webhook-mode";
import { auditResultSummary, isAuditContractV3 } from "./audit/result-summary";

/**
 * Dispara a auditoria de forma ASSÍNCRONA (implementação em audit-run.server.ts).
 * O n8n responde imediatamente e, ao terminar, POSTa em callback_url.
 */
export const runAudit = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d?: { mode?: WebhookMode }) =>
    z.object({ mode: z.enum(["test", "production"]).optional() }).parse(d ?? {}),
  )
  .handler(async ({ data }) => {
    const { runAuditImpl } = await import("./audit-run.server");
    return runAuditImpl("ole-copilot", data.mode);
  });

/** Verifica as runs ativas e registra timeout persistente (não apenas no navegador). */
export const getActiveAuditRun = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d?: { mode?: WebhookMode }) =>
    z.object({ mode: z.enum(["test", "production"]).optional() }).parse(d ?? {}),
  )
  .handler(async ({ data }) => {
    const { withIntegrationContext } = await import("./environment/context.server");
    return withIntegrationContext(data.mode, async () => {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const cutoff = new Date(Date.now() - 15 * 60_000).toISOString();
      const { error: expireError } = await supabaseAdmin
        .from("audit_runs")
        .update({
          status: "error",
          status_geral: "ERRO",
          mensagem_geral: "Auditoria expirada: sem callback em 15 minutos.",
          error_message: "Tempo limite de 15 minutos sem resultado final do n8n.",
        } as never)
        .eq("status", "running")
        .lt("created_at", cutoff);
      if (expireError) throw new Error("Falha ao encerrar auditorias expiradas.");
      const { data: row, error } = await supabaseAdmin
        .from("audit_runs")
        .select("id, created_at, status")
        .eq("status", "running")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw new Error("Falha ao consultar auditoria em andamento.");
      return row as { id: string; created_at: string; status: string } | null;
    });
  });

/** Cancelamento autenticado, sempre no ambiente registrado para a execução. */
export const cancelAudit = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { runId: string; reason?: "manual" | "timeout" }) =>
    z.object({
      runId: z.string().uuid(),
      reason: z.enum(["manual", "timeout"]).optional(),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    const { withRegisteredExecution } = await import("./environment/execution.server");
    return withRegisteredExecution(data.runId, "audit", async () => {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const timedOut = data.reason === "timeout";
      const { data: updated, error } = await supabaseAdmin
        .from("audit_runs")
        .update({
          status: timedOut ? "error" : "cancelled",
          status_geral: timedOut ? "ERRO" : "CANCELADA",
          mensagem_geral: timedOut
            ? "Auditoria expirada: sem callback em 15 minutos."
            : "Auditoria cancelada manualmente pelo operador.",
          error_message: timedOut ? "Tempo limite de 15 minutos sem resposta do n8n." : null,
        } as never)
        .eq("id", data.runId)
        .eq("status", "running")
        .select("id, status")
        .maybeSingle();
      if (error) throw new Error("Falha ao cancelar a auditoria.");
      if (updated) return { runId: data.runId, status: timedOut ? "error" : "cancelled", changed: true };
      const { data: existing, error: readError } = await supabaseAdmin
        .from("audit_runs")
        .select("status")
        .eq("id", data.runId)
        .maybeSingle();
      if (readError || !existing) throw new Error("Execução não encontrada.");
      return { runId: data.runId, status: existing.status, changed: false };
    });
  });

export const getAuditRunStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { runId: string; mode?: WebhookMode }) =>
    z
      .object({ runId: z.string().uuid(), mode: z.enum(["test", "production"]).optional() })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const { withRegisteredExecution } = await import("./environment/execution.server");
    return withRegisteredExecution(data.runId, "audit", async () => {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { adjustRunCounts, buildIgnoreSets } = await import("./audit/ignore-filter");
      const { resolutionsAsIgnoreEntries } = await import("./audit/resolution-filter");
      const { data: run, error } = await supabaseAdmin
        .from("audit_runs")
        .select(
          "id, status, status_geral, error_message, total_processado, aprovados, reprovados, raw",
        )
        .eq("id", data.runId)
        .maybeSingle();
      if (error) throw new Error(error.message);
      if (!run) return null;

      const r = run as {
        id: string;
        status: string;
        status_geral: string | null;
        error_message: string | null;
        total_processado: number;
        aprovados: number;
        reprovados: number;
        raw: AuditPayload | null;
      };

      // A v3 registra os contadores no fechamento, com as exceções do snapshot da execução.
      if (isAuditContractV3(r)) return r;

      // Mantém o desconto de exceções nos números do toast das execuções antigas.
      const [{ data: ignores }, { data: resolvidos }, { data: findings }] = await Promise.all([
        context.supabase.from("audit_ignores").select("apolice, tipo_erro"),
        context.supabase
          .from("audit_resolutions")
          .select("apolice, tipo_erro, endosso")
          .is("reopened_at", null),
        supabaseAdmin
          .from("audit_findings")
          .select("apolice, tipo_erro, endosso")
          .eq("run_id", r.id),
      ]);
      const sets = buildIgnoreSets([
        ...((ignores ?? []) as Array<{ apolice: string; tipo_erro: string | null }>),
        ...resolutionsAsIgnoreEntries(
          (resolvidos ?? []) as Array<{
            apolice: string;
            tipo_erro: string;
            endosso: string | null;
          }>,
        ),
      ]);
      const adj = adjustRunCounts(
        r,
        sets,
        (findings ?? []) as Array<{ apolice: string; tipo_erro: string; endosso: string | null }>,
      );

      return { ...r, ...adj };
    });
  });

export const getLatestAudit = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { adjustRunCounts, buildIgnoreSets, filterFindings } =
      await import("./audit/ignore-filter");
    const { resolutionsAsIgnoreEntries } = await import("./audit/resolution-filter");

    const { data: runs, error: runErr } = await supabaseAdmin
      .from("audit_runs")
      .select("*")
      .eq("status", "success")
      .order("created_at", { ascending: false })
      .limit(1);

    if (runErr) throw new Error(runErr.message);
    if (!runs || runs.length === 0) return null as LatestAudit | null;

    const run = runs[0] as Record<string, unknown> & {
      id: string;
      aprovados: number;
      reprovados: number;
      total_processado: number;
    };
    const { data: findings, error: findErr } = await supabaseAdmin
      .from("audit_findings")
      .select("*")
      .eq("run_id", run.id)
      .order("apolice", { ascending: true });

    if (findErr) throw new Error(findErr.message);

    const { data: ignores } = await context.supabase
      .from("audit_ignores")
      .select("apolice, tipo_erro");
    const { data: resolvidos } = await context.supabase
      .from("audit_resolutions")
      .select("apolice, tipo_erro, endosso")
      .is("reopened_at", null);
    const sets = buildIgnoreSets([
      ...((ignores ?? []) as Array<{ apolice: string; tipo_erro: string | null }>),
      ...resolutionsAsIgnoreEntries(
        (resolvidos ?? []) as Array<{ apolice: string; tipo_erro: string; endosso: string | null }>,
      ),
    ]);

    const all = (findings ?? []) as Array<{
      apolice: string;
      tipo_erro: string;
      endosso: string | null;
    }>;
    const filtered = filterFindings(sets, all);
    return {
      run: isAuditContractV3(run) ? run : { ...run, ...adjustRunCounts(run, sets, all) },
      findings: filtered,
    } as unknown as LatestAudit;
  });

export const getAuditHistory = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { adjustRunCounts, buildIgnoreSets } = await import("./audit/ignore-filter");
    const { resolutionsAsIgnoreEntries } = await import("./audit/resolution-filter");

    const { data, error } = await supabaseAdmin
      .from("audit_runs")
      .select(
        "id, created_at, data_auditoria, status_geral, total_processado, aprovados, reprovados, duration_ms, origem, raw",
      )
      .eq("status", "success")
      .order("created_at", { ascending: false })
      .limit(30);

    if (error) throw new Error(error.message);
    const runs = (data ?? []) as AuditHistoryItem[];
    const legacyRuns = runs.filter((run) => !isAuditContractV3(run));
    if (legacyRuns.length === 0) return runs;

    const { data: ignores } = await context.supabase
      .from("audit_ignores")
      .select("apolice, tipo_erro");
    const { data: resolvidos } = await context.supabase
      .from("audit_resolutions")
      .select("apolice, tipo_erro, endosso")
      .is("reopened_at", null);
    const sets = buildIgnoreSets([
      ...((ignores ?? []) as Array<{ apolice: string; tipo_erro: string | null }>),
      ...resolutionsAsIgnoreEntries(
        (resolvidos ?? []) as Array<{ apolice: string; tipo_erro: string; endosso: string | null }>,
      ),
    ]);
    if (sets.isEmpty) return runs;

    const { data: findings } = await supabaseAdmin
      .from("audit_findings")
      .select("run_id, apolice, tipo_erro, endosso")
      .in(
        "run_id",
        legacyRuns.map((r) => r.id),
      );

    const byRun = new Map<
      string,
      Array<{ apolice: string; tipo_erro: string; endosso: string | null }>
    >();
    for (const f of (findings ?? []) as Array<{
      run_id: string;
      apolice: string;
      tipo_erro: string;
      endosso: string | null;
    }>) {
      const list = byRun.get(f.run_id) ?? [];
      list.push({ apolice: f.apolice, tipo_erro: f.tipo_erro, endosso: f.endosso });
      byRun.set(f.run_id, list);
    }

    return runs.map((r) =>
      isAuditContractV3(r) ? r : { ...r, ...adjustRunCounts(r, sets, byRun.get(r.id) ?? []) },
    );
  });

export { CallbackPayloadSchema } from "./audit/callback-payload";

export const getSystemStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { adjustRunCounts, buildIgnoreSets } = await import("./audit/ignore-filter");
    const { resolutionsAsIgnoreEntries } = await import("./audit/resolution-filter");

    const [{ data: lastRun }, { data: lastSync }] = await Promise.all([
      supabaseAdmin
        .from("audit_runs")
        .select(
          "id, status, status_geral, error_message, created_at, aprovados, reprovados, total_processado, raw",
        )
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabaseAdmin
        .from("policy_sync_runs")
        .select("id, status, created_at")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle()
        .then(
          (r) => r,
          () => ({ data: null }),
        ),
    ]);

    const run = lastRun as {
      id: string;
      status: string;
      error_message: string | null;
      created_at: string;
      aprovados: number | null;
      reprovados: number | null;
      total_processado: number | null;
      status_geral: string | null;
      raw: unknown;
    } | null;
    const sync = lastSync as { status: string; created_at: string } | null;

    // Só os resultados antigos recalculam a taxa com exceções atuais.
    let aprovadosAjustado = run?.aprovados ?? 0;
    if (run && !isAuditContractV3(run) && (run.total_processado ?? 0) > 0) {
      const [{ data: ignores }, { data: resolvidos }, { data: findings }] = await Promise.all([
        context.supabase.from("audit_ignores").select("apolice, tipo_erro"),
        context.supabase
          .from("audit_resolutions")
          .select("apolice, tipo_erro, endosso")
          .is("reopened_at", null),
        supabaseAdmin
          .from("audit_findings")
          .select("apolice, tipo_erro, endosso")
          .eq("run_id", run.id),
      ]);
      const sets = buildIgnoreSets([
        ...((ignores ?? []) as Array<{ apolice: string; tipo_erro: string | null }>),
        ...resolutionsAsIgnoreEntries(
          (resolvidos ?? []) as Array<{
            apolice: string;
            tipo_erro: string;
            endosso: string | null;
          }>,
        ),
      ]);
      const adj = adjustRunCounts(
        {
          total_processado: run.total_processado ?? 0,
          aprovados: run.aprovados ?? 0,
          reprovados: run.reprovados ?? 0,
        },
        sets,
        (findings ?? []) as Array<{ apolice: string; tipo_erro: string; endosso: string | null }>,
      );
      aprovadosAjustado = adj.aprovados;
    }

    const coverage = auditResultSummary({ ...run, aprovados: aprovadosAjustado });
    const approvalRate = coverage.approvalRate;

    let state: "operational" | "degraded" | "down" = "operational";
    if (run?.status === "error" || sync?.status === "error") state = "down";
    else if (
      run?.status === "running" ||
      coverage.partial ||
      (approvalRate != null && approvalRate < 95)
    )
      state = "degraded";

    return {
      state,
      approvalRate,
      lastRunAt: run?.created_at ?? null,
      lastRunStatus: run?.status ?? null,
      lastRunPartial: coverage.partial,
      lastSyncAt: sync?.created_at ?? null,
      lastSyncStatus: sync?.status ?? null,
    };
  });
