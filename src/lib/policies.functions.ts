import { createServerFn } from "@tanstack/react-start";
import type { WebhookMode } from "@/lib/webhook-mode";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import type { Json } from "@/integrations/supabase/types";

export interface PolicyListItem {
  id: string;
  numero_apolice: string;
  numero_endosso_atual: string | null;
  premio_liquido: number;
  premio_moeda: string;
  endorsements_count: number;
  updated_at: string;
  segurado_nome: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JsonObject = Record<string, any>;

export interface PolicyDetail {
  id: string;
  numero_apolice: string;
  numero_endosso_atual: string | null;
  premio_liquido: number;
  premio_moeda: string;
  proposta: JsonObject;
  updated_at: string;
  last_sync_at: string | null;
  endorsements: Array<{
    id: string;
    numero_endosso: string;
    premio_liquido: number;
    premio_moeda: string;
    ordem: number;
    proposta: JsonObject;
    created_at: string;
  }>;
}

export interface PolicySyncStatus {
  id: string;
  status: string;
  total_apolices: number;
  error_message: string | null;
  duration_ms: number | null;
  finished_at: string | null;
  emissoes_status: string;
  emissoes_finished_at: string | null;
  cobrancas_status: string;
  cobrancas_finished_at: string | null;
  cobrancas_total: number;
  emissions_added: number;
  emissions_updated: number;
  billing_added: number;
  billing_updated: number;
  billing_fallback_total: number;
  billing_fallback_resolved: number;
}

export interface LatestPolicySync extends PolicySyncStatus {
  created_at: string;
}

export const runPolicySync = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d?: { mode?: WebhookMode }) => d ?? {})
  .handler(async ({ data }) => {
    const { runPolicySyncImpl } = await import("@/lib/policy-sync-runner.server");
    return runPolicySyncImpl(data.mode);
  });

export const getPolicySyncStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { runId: string }) => d)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("policy_sync_runs")
      .select(
        "id, status, total_apolices, error_message, duration_ms, finished_at, emissoes_status, emissoes_finished_at, cobrancas_status, cobrancas_finished_at, cobrancas_total, emissions_added, emissions_updated, billing_added, billing_updated, billing_fallback_total, billing_fallback_resolved",
      )
      .eq("id", data.runId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return row as PolicySyncStatus | null;
  });

export const cancelPolicySync = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { runId: string }) => d)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const now = new Date().toISOString();
    const { error } = await supabaseAdmin
      .from("policy_sync_runs")
      .update({
        status: "cancelled",
        error_message: "Sincronização cancelada pelo usuário.",
        finished_at: now,
        emissoes_status: "cancelled",
        cobrancas_status: "cancelled",
        emissoes_finished_at: now,
        cobrancas_finished_at: now,
      } as never)
      .eq("id", data.runId)
      .eq("status", "running");
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getLatestPolicySync = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("policy_sync_runs")
      .select(
        "id, status, total_apolices, error_message, duration_ms, finished_at, created_at, emissoes_status, emissoes_finished_at, cobrancas_status, cobrancas_finished_at, cobrancas_total, emissions_added, emissions_updated, billing_added, billing_updated, billing_fallback_total, billing_fallback_resolved",
      )
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data as LatestPolicySync | null;
  });

function displayValue(value: Json | undefined): Json {
  if (value === undefined) return null;
  if (typeof value === "string") return value.length > 500 ? `${value.slice(0, 497)}…` : value;
  return value;
}

function collectFieldDiffs(
  before: Json | undefined,
  after: Json | undefined,
  path = "",
  depth = 0,
): Array<{ field: string; before: Json; after: Json }> {
  if (Object.is(before, after)) return [];
  const beforeObject = before && typeof before === "object" && !Array.isArray(before);
  const afterObject = after && typeof after === "object" && !Array.isArray(after);
  if (beforeObject && afterObject && depth < 4) {
    const left = before as Record<string, Json | undefined>;
    const right = after as Record<string, Json | undefined>;
    const keys = new Set([...Object.keys(left), ...Object.keys(right)]);
    return [...keys].flatMap((key) =>
      collectFieldDiffs(left[key], right[key], path ? `${path}.${key}` : key, depth + 1),
    );
  }
  if (JSON.stringify(before) === JSON.stringify(after)) return [];
  return [{ field: path || "registro", before: displayValue(before), after: displayValue(after) }];
}

export const getPolicySyncDetails = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d?: { runId?: string }) => d ?? {})
  .handler(async ({ data: input }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let runId = input.runId;
    if (!runId) {
      const { data: latest, error } = await supabaseAdmin
        .from("policy_sync_runs")
        .select("id")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw new Error(error.message);
      runId = latest?.id;
    }
    if (!runId) return null;

    const [runResult, changesResult, fallbacksResult] = await Promise.all([
      supabaseAdmin.from("policy_sync_runs").select("*").eq("id", runId).maybeSingle(),
      supabaseAdmin
        .from("policy_sync_changes")
        .select("*")
        .eq("run_id", runId)
        .order("created_at", { ascending: false })
        .limit(2_000),
      supabaseAdmin
        .from("billing_sync_fallbacks")
        .select("*")
        .eq("run_id", runId)
        .order("created_at", { ascending: false }),
    ]);
    if (runResult.error) throw new Error(runResult.error.message);
    if (changesResult.error) throw new Error(changesResult.error.message);
    if (fallbacksResult.error) throw new Error(fallbacksResult.error.message);
    if (!runResult.data) return null;

    return {
      run: runResult.data,
      changes: (changesResult.data ?? []).map((change) => ({
        ...change,
        diffs: collectFieldDiffs(change.before_data, change.after_data).slice(0, 200),
      })),
      fallbacks: fallbacksResult.data ?? [],
    };
  });

export const getPolicies = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { findSeguradoNome, computePremioLiquido, normalizeEndossoNum } =
      await import("@/lib/excelsior/translate");
    const { data, error } = await supabaseAdmin
      .from("policies")
      .select(
        "id, numero_apolice, numero_endosso_atual, premio_liquido, proposta, updated_at, endorsements(numero_endosso, ordem)",
      )
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (
      (data ?? []) as Array<{
        id: string;
        numero_apolice: string;
        numero_endosso_atual: string | null;
        premio_liquido: number | string;
        proposta: JsonObject | null;
        updated_at: string;
        endorsements: Array<{ numero_endosso: string; ordem: number }>;
      }>
    ).map((p) => {
      const { valor, moeda } = computePremioLiquido(p.proposta ?? {});
      const endos = p.endorsements ?? [];
      // Último endosso = maior ordem (a apólice base tem ordem 0).
      const ultimo = endos.reduce<{ numero_endosso: string; ordem: number } | null>(
        (acc, e) => (acc && acc.ordem >= e.ordem ? acc : e),
        null,
      );
      const ultimoNum = ultimo ? normalizeEndossoNum(ultimo.numero_endosso) : null;
      return {
        id: p.id,
        numero_apolice: p.numero_apolice,
        numero_endosso_atual:
          ultimoNum ??
          (p.numero_endosso_atual ? normalizeEndossoNum(p.numero_endosso_atual) : null),
        premio_liquido: valor,
        premio_moeda: moeda,
        endorsements_count: endos.length,
        updated_at: p.updated_at,
        segurado_nome: findSeguradoNome(p.proposta ?? {}),
      };
    }) as PolicyListItem[];
  });

export const getPolicyByNumero = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { numero: string }) => d)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: p, error } = await supabaseAdmin
      .from("policies")
      .select(
        "id, numero_apolice, numero_endosso_atual, premio_liquido, proposta, updated_at, last_sync_run_id",
      )
      .eq("numero_apolice", data.numero)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!p) return null;

    const row = p as {
      id: string;
      numero_apolice: string;
      numero_endosso_atual: string | null;
      premio_liquido: number | string;
      proposta: Record<string, unknown>;
      updated_at: string;
      last_sync_run_id: string | null;
    };

    const { data: endos, error: errE } = await supabaseAdmin
      .from("endorsements")
      .select("id, numero_endosso, premio_liquido, ordem, proposta, created_at")
      .eq("policy_id", row.id)
      .order("ordem", { ascending: true });
    if (errE) throw new Error(errE.message);

    let lastSyncAt: string | null = null;
    if (row.last_sync_run_id) {
      const { data: run } = await supabaseAdmin
        .from("policy_sync_runs")
        .select("finished_at, created_at")
        .eq("id", row.last_sync_run_id)
        .maybeSingle();
      const r = run as { finished_at: string | null; created_at: string } | null;
      lastSyncAt = r?.finished_at ?? r?.created_at ?? null;
    }

    const { computePremioLiquido } = await import("@/lib/excelsior/translate");
    const headPL = computePremioLiquido(row.proposta ?? {});
    return {
      id: row.id,
      numero_apolice: row.numero_apolice,
      numero_endosso_atual: row.numero_endosso_atual,
      premio_liquido: headPL.valor,
      premio_moeda: headPL.moeda,
      proposta: row.proposta ?? {},
      updated_at: row.updated_at,
      last_sync_at: lastSyncAt,
      endorsements: (
        (endos ?? []) as Array<{
          id: string;
          numero_endosso: string;
          premio_liquido: number | string;
          ordem: number;
          proposta: Record<string, unknown>;
          created_at: string;
        }>
      ).map((e) => {
        const pl = computePremioLiquido(e.proposta ?? {});
        return {
          id: e.id,
          numero_endosso: e.numero_endosso,
          premio_liquido: pl.valor,
          premio_moeda: pl.moeda,
          ordem: e.ordem,
          proposta: e.proposta ?? {},
          created_at: e.created_at,
        };
      }),
    } as unknown as PolicyDetail;
  });

export const getEndorsement = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { numero: string; endosso: string }) => d)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: p } = await supabaseAdmin
      .from("policies")
      .select("id, numero_apolice")
      .eq("numero_apolice", data.numero)
      .maybeSingle();
    if (!p) return null;
    const policy = p as { id: string; numero_apolice: string };
    const { data: e, error } = await supabaseAdmin
      .from("endorsements")
      .select("id, numero_endosso, premio_liquido, ordem, proposta, created_at")
      .eq("policy_id", policy.id)
      .eq("numero_endosso", data.endosso)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!e) return null;
    const row = e as {
      id: string;
      numero_endosso: string;
      premio_liquido: number | string;
      ordem: number;
      proposta: Record<string, unknown>;
      created_at: string;
    };
    const { computePremioLiquido } = await import("@/lib/excelsior/translate");
    const pl = computePremioLiquido(row.proposta ?? {});
    return {
      numero_apolice: policy.numero_apolice,
      id: row.id,
      numero_endosso: row.numero_endosso,
      premio_liquido: pl.valor,
      premio_moeda: pl.moeda,
      ordem: row.ordem,
      proposta: row.proposta ?? {},
      created_at: row.created_at,
    } as unknown as EndorsementDetail;
  });

export interface EndorsementDetail {
  numero_apolice: string;
  id: string;
  numero_endosso: string;
  premio_liquido: number;
  premio_moeda: string;
  ordem: number;
  proposta: JsonObject;
  created_at: string;
}

// Schema do callback do MOTOR OLÉ — tolerante a variações de nomes de chave.
// `dados` pode ser: lista plana de endossos novos (formato atual) ou lista de
// apólices com `historico_endossos` aninhado (formato antigo).
export const PolicySyncCallbackSchema = z.object({
  origem: z.string().optional(),
  total_apolices: z.coerce.number().optional(),
  total_endossos_novos: z.coerce.number().optional(),
  dados: z.array(z.record(z.string(), z.unknown())).optional().default([]),
});
