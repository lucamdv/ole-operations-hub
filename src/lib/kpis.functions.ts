import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type {
  BillingSlaLite,
  CorrectionResponseLite,
  DailyKpis,
  FindingLite,
  MonthlyReincidencia,
  ResolutionSlaLite,
  RunLite,
  WeeklyKpis,
  YearlyPoint,
} from "@/lib/kpis/derive";

export interface OperationKpis {
  daily: DailyKpis;
  weekly: WeeklyKpis;
  monthlyReincidencia: MonthlyReincidencia[];
  yearly: YearlyPoint[];
  /** Ano corrente do calendário (pode estar zerado se não houver dados). */
  yearCur: YearlyPoint;
  /** Ano anterior ao corrente. */
  yearPrev: YearlyPoint;
  /** Corte do acumulado do ano, em DD/MM. */
  ytdLabel: string;
}

const OperationKpisSchema = z.object({
  slaHours: z.number().min(1).max(720).default(24),
});

export const getOperationKpis = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((value: z.infer<typeof OperationKpisSchema>) => OperationKpisSchema.parse(value))
  .handler(async ({ data, context }): Promise<OperationKpis> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { buildIgnoreSets, filterFindings } = await import("@/lib/audit/ignore-filter");
    const {
      countDelinquentContracts,
      deriveDaily,
      deriveFirstCriticalResponse,
      deriveMonthlyReincidencia,
      deriveResolutionSla,
      deriveWeekly,
      emptyYear,
      findingKey,
      fortalezaDateKey,
      isCritical,
      withinYtd,
      ytdCutoff,
    } = await import("@/lib/kpis/derive");
    const { policyFacts, issuanceFacts } = await import("@/lib/kpis/policy-facts");

    const now = Date.now();
    const nowYear = Number(fortalezaDateKey(now).slice(0, 4));
    const historyStart = `${nowYear - 1}-01-01T00:00:00.000Z`;

    // Histórico necessário para as janelas semanal, mensal e anual.
    const { data: runRows, error: runErr } = await supabaseAdmin
      .from("audit_runs")
      .select("id, created_at, data_auditoria")
      .eq("status", "success")
      .gte("created_at", historyStart)
      .order("created_at", { ascending: true })
      .limit(2000);
    if (runErr) throw new Error(runErr.message);

    const runsAsc: RunLite[] = (
      (runRows ?? []) as Array<{
        id: string;
        created_at: string;
        data_auditoria: string | null;
      }>
    )
      .map((run) => ({ id: run.id, at: run.data_auditoria ?? run.created_at }))
      .sort((left, right) => +new Date(left.at) - +new Date(right.at));
    const runIds = new Set(runsAsc.map((run) => run.id));

    const byRun = new Map<string, FindingLite[]>();
    if (runsAsc.length > 0) {
      const [{ data: ignores, error: ignoreError }, { data: findings, error: findingsError }] =
        await Promise.all([
          context.supabase.from("audit_ignores").select("apolice, tipo_erro"),
          supabaseAdmin
            .from("audit_findings")
            .select("run_id, apolice, tipo_erro, endosso, detalhes")
            .gte("created_at", historyStart)
            .order("created_at", { ascending: true })
            .limit(10000),
        ]);
      if (ignoreError) throw new Error(ignoreError.message);
      if (findingsError) throw new Error(findingsError.message);

      const sets = buildIgnoreSets(
        (ignores ?? []) as Array<{ apolice: string; tipo_erro: string | null }>,
      );
      const all = (findings ?? []) as Array<{
        run_id: string;
        apolice: string;
        tipo_erro: string;
        endosso: string | null;
        detalhes: Record<string, unknown> | null;
      }>;
      for (const finding of filterFindings(sets, all)) {
        if (!runIds.has(finding.run_id)) continue;
        const rawLevel = (finding.detalhes ?? {})["nivel"];
        const lite: FindingLite = {
          run_id: finding.run_id,
          apolice: finding.apolice,
          tipo_erro: finding.tipo_erro,
          endosso: finding.endosso,
          nivel: typeof rawLevel === "string" ? rawLevel : null,
        };
        const list = byRun.get(finding.run_id) ?? [];
        list.push(lite);
        byRun.set(finding.run_id, list);
      }
    }

    const [resolutionResult, responseResult, billingResult] = await Promise.all([
      supabaseAdmin
        .from("audit_resolutions")
        .select("first_seen_at, resolved_at, reopened_at")
        .gte("resolved_at", new Date(now - 8 * 86_400_000).toISOString())
        .order("resolved_at", { ascending: false }),
      supabaseAdmin
        .from("audit_correction_responses")
        .select("nivel, detected_at, responded_at")
        .eq("mode", "production")
        .gte("responded_at", new Date(now - 31 * 86_400_000).toISOString())
        .order("responded_at", { ascending: false }),
      supabaseAdmin
        .from("policy_billing")
        .select("numero_apolice, situacao_emissao, data_vencimento, data_quitacao"),
    ]);
    if (resolutionResult.error) throw new Error(resolutionResult.error.message);
    if (responseResult.error) throw new Error(responseResult.error.message);
    if (billingResult.error) throw new Error(billingResult.error.message);

    const daily = deriveDaily(runsAsc, byRun, now);
    const firstResponse = deriveFirstCriticalResponse(
      (responseResult.data ?? []) as CorrectionResponseLite[],
      daily.referenceDate,
    );
    daily.primeiraRespostaCriticaHoras = firstResponse.mediaHoras;
    daily.criticasRespondidas = firstResponse.respondidas;

    const weekly = deriveWeekly(runsAsc, byRun, 7, now);
    const resolutionSla = deriveResolutionSla(
      (resolutionResult.data ?? []) as ResolutionSlaLite[],
      data.slaHours,
      now,
      7,
    );
    const billingRows = (billingResult.data ?? []) as BillingSlaLite[];
    weekly.resolvidas = resolutionSla.total;
    weekly.resolvidasDentroSla = resolutionSla.within;
    weekly.resolvidasDentroSlaPct = resolutionSla.pct;
    weekly.inadimplentes = countDelinquentContracts(billingRows, now);
    weekly.inadimplentesSemanaAnterior = countDelinquentContracts(
      billingRows,
      now - 7 * 86_400_000,
    );
    weekly.inadimplentesDelta = weekly.inadimplentes - weekly.inadimplentesSemanaAnterior;

    const monthlyReincidencia = deriveMonthlyReincidencia(runsAsc, byRun);

    // Carteira e prêmio emitido agregados por ano.
    const cutoff = ytdCutoff();
    const yearMap = new Map<number, YearlyPoint>();
    const yearOf = (date: string) => Number(date.slice(0, 4)) || null;
    const bucket = (year: number) => {
      const current = yearMap.get(year) ?? emptyYear(year);
      yearMap.set(year, current);
      return current;
    };
    bucket(nowYear);
    bucket(nowYear - 1);

    const { data: policies, error: policyError } = await supabaseAdmin
      .from("policies")
      .select("numero_apolice, proposta");
    if (policyError) throw new Error(policyError.message);

    for (const policy of (policies ?? []) as Array<{
      numero_apolice: string;
      proposta: unknown;
    }>) {
      const facts = policyFacts(policy.proposta);
      if (!facts.emissao) continue;
      const year = yearOf(facts.emissao);
      if (!year) continue;
      const current = bucket(year);
      current.contratos += 1;
      current.premioDiretoUsd += facts.premioUsd;
      if (withinYtd(facts.emissao, cutoff)) {
        current.contratosYtd += 1;
        current.premioDiretoYtdUsd += facts.premioUsd;
      }
    }

    const { data: emissions, error: emissionsError } = await supabaseAdmin
      .from("endorsements")
      .select("numero_endosso, proposta");
    if (emissionsError) throw new Error(emissionsError.message);

    for (const emission of (emissions ?? []) as Array<{ proposta: unknown }>) {
      const facts = issuanceFacts(emission.proposta);
      const addPremium = (date: string | null, value: number) => {
        if (!date || value <= 0) return;
        const year = yearOf(date);
        if (!year) return;
        const current = bucket(year);
        current.premioEmitidoUsd += value;
        if (withinYtd(date, cutoff)) current.premioEmitidoYtdUsd += value;
      };
      if (facts.parcelas.length > 0) {
        for (const installment of facts.parcelas) {
          addPremium(installment.data ?? facts.emissao, installment.valor);
        }
      } else {
        addPremium(facts.emissao, facts.premioTotalCoberturas);
      }
    }

    // Incidentes críticos distintos por ano, sem multiplicar o mesmo incidente por run.
    const criticalByYear = new Map<number, { all: Set<string>; ytd: Set<string> }>();
    for (const run of runsAsc) {
      const date = fortalezaDateKey(run.at);
      const year = yearOf(date);
      if (!year) continue;
      const sets = criticalByYear.get(year) ?? { all: new Set<string>(), ytd: new Set<string>() };
      for (const finding of byRun.get(run.id) ?? []) {
        if (!isCritical(finding)) continue;
        const key = findingKey(finding);
        sets.all.add(key);
        if (withinYtd(date, cutoff)) sets.ytd.add(key);
      }
      criticalByYear.set(year, sets);
    }
    for (const [year, sets] of criticalByYear) {
      const current = bucket(year);
      current.criticos = sets.all.size;
      current.criticosYtd = sets.ytd.size;
    }

    const round2 = (value: number) => Math.round(value * 100) / 100;
    const yearly = Array.from(yearMap.values())
      .map((year) => ({
        ...year,
        premioEmitidoUsd: round2(year.premioEmitidoUsd),
        premioEmitidoYtdUsd: round2(year.premioEmitidoYtdUsd),
        premioDiretoUsd: round2(year.premioDiretoUsd),
        premioDiretoYtdUsd: round2(year.premioDiretoYtdUsd),
      }))
      .sort((left, right) => left.year - right.year);

    return {
      daily,
      weekly,
      monthlyReincidencia,
      yearly,
      yearCur: yearly.find((year) => year.year === nowYear) ?? emptyYear(nowYear),
      yearPrev: yearly.find((year) => year.year === nowYear - 1) ?? emptyYear(nowYear - 1),
      ytdLabel: cutoff.split("-").reverse().join("/"),
    };
  });
