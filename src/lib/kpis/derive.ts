// Cálculos puros dos KPIs de acompanhamento da operação (cadências 5.1–5.4).
// Só usa dados já existentes: runs/achados de auditoria (sem exceções) e carteira.

export type KpiStatus = "ok" | "warn" | "bad";

export interface KpiTargets {
  /** Máximo aceitável de reincidência (%). */
  reincidenciaMaxPct: number;
  /** Máximo de ocorrências críticas em aberto. */
  criticasAbertasMax: number;
  /** Desvio (%) acima da média móvel que caracteriza pico de novas inconsistências. */
  picoDesvioPct: number;
  /** Tempo máximo até a primeira resposta de uma ocorrência, em horas úteis. */
  primeiraRespostaCriticaMaxHoras: number;
  /** Prazo padrão para resolver uma ocorrência, em horas úteis. */
  resolucaoSlaHoras: number;
  /** Percentual mínimo de resoluções que devem cumprir o SLA. */
  resolvidasSlaMinPct: number;
}

export const DEFAULT_KPI_TARGETS: KpiTargets = {
  reincidenciaMaxPct: 15,
  criticasAbertasMax: 0,
  picoDesvioPct: 30,
  primeiraRespostaCriticaMaxHoras: 4,
  resolucaoSlaHoras: 24,
  resolvidasSlaMinPct: 90,
};

/** Status por limite máximo: ok até o limite, warn até +50%, bad acima. */
export function statusMax(value: number, max: number): KpiStatus {
  if (value <= max) return "ok";
  if (value <= max * 1.5 || max === 0) return value === 0 ? "ok" : max === 0 ? "bad" : "warn";
  return "bad";
}

export interface FindingLite {
  run_id: string;
  apolice: string;
  tipo_erro: string;
  endosso: string | null;
  nivel: string | null;
}

export interface RunLite {
  id: string;
  at: string; // ISO
}

export const findingKey = (f: { apolice: string; tipo_erro: string; endosso?: string | null }) =>
  `${f.apolice}::${f.tipo_erro}::${(f.endosso ?? "").trim()}`;

export const isCritical = (f: FindingLite) => (f.nivel ?? "").toUpperCase() === "ERRO";

export interface DailyKpis {
  runAt: string | null;
  /** Dia civil de referência em Fortaleza (YYYY-MM-DD). */
  referenceDate: string;
  /** Ocorrências que apareceram pela primeira vez no dia. */
  novas: number;
  /** Ocorrências de nível ERRO ainda presentes na run mais recente. */
  criticasAbertas: number;
  /** Média móvel de novas ocorrências nos cinco dias de auditoria anteriores. */
  mediaMovel: number;
  /** Desvio (%) do dia sobre a média móvel. */
  desvioPct: number;
  /** Média do tempo útil até a primeira resposta das ocorrências respondidas no dia. */
  primeiraRespostaHoras: number | null;
  /** Quantidade de ocorrências respondidas no dia. */
  ocorrenciasRespondidas: number;
}

export interface WeeklyKpis {
  runs: number;
  total: number;
  repetidas: number;
  novasUnicas: number;
  /** null quando não houve nenhuma ocorrência na janela semanal. */
  reincidenciaPct: number | null;
  resolvidas: number;
  resolvidasDentroSla: number;
  resolvidasDentroSlaPct: number | null;
  inadimplentes: number;
  inadimplentesSemanaAnterior: number;
  inadimplentesDelta: number;
}

export interface MonthlyReincidencia {
  month: string; // YYYY-MM
  label: string;
  total: number;
  repetidas: number;
  reincidenciaPct: number;
  /** Média móvel de 3 meses da reincidência. */
  mm3: number;
  /** Variação da média móvel contra o mês anterior, em pontos percentuais. */
  deltaMm3: number | null;
}

export interface YearlyPoint {
  year: number;
  /** Contratos emitidos no ano (ano fechado). */
  contratos: number;
  /** Contratos emitidos até o mesmo dia/mês do ano de referência. */
  contratosYtd: number;
  /** Prêmio emitido (todos os componentes das parcelas) no ano. */
  premioEmitidoUsd: number;
  premioEmitidoYtdUsd: number;
  /** Prêmio direto puro (DIRETO/PREMIO) das apólices emitidas no ano. */
  premioDiretoUsd: number;
  premioDiretoYtdUsd: number;
  /** Achados críticos DISTINTOS (apólice + tipo de erro) no ano. */
  criticos: number;
  criticosYtd: number;
}

export function emptyYear(year: number): YearlyPoint {
  return {
    year,
    contratos: 0,
    contratosYtd: 0,
    premioEmitidoUsd: 0,
    premioEmitidoYtdUsd: 0,
    premioDiretoUsd: 0,
    premioDiretoYtdUsd: 0,
    criticos: 0,
    criticosYtd: 0,
  };
}

/** "MM-DD" da data de referência, usado para recortar o acumulado do ano (YTD). */
export function ytdCutoff(ref = new Date()): string {
  return fortalezaDateKey(ref).slice(5);
}

/** A data (YYYY-MM-DD) está dentro do acumulado até o corte MM-DD? */
export function withinYtd(date: string, cutoffMonthDay: string): boolean {
  return date.slice(5, 10) <= cutoffMonthDay;
}

/** Variação percentual ano a ano; null quando a base é zero (histórico insuficiente). */
export function yoyPct(current: number, previous: number): number | null {
  if (previous <= 0) return null;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

const HOUR_MS = 3_600_000;
const DAY_MS = 86_400_000;
const FORTALEZA_OFFSET_MS = -3 * HOUR_MS;

/** Chave de data civil em America/Fortaleza (UTC-3, sem horário de verão). */
export function fortalezaDateKey(value: string | number | Date = Date.now()): string {
  const ms = value instanceof Date ? +value : typeof value === "number" ? value : +new Date(value);
  if (!Number.isFinite(ms)) return "";
  return new Date(ms + FORTALEZA_OFFSET_MS).toISOString().slice(0, 10);
}

/**
 * Horas úteis entre dois instantes: segunda a sexta, 09h–18h, horário de Fortaleza.
 * Feriados não entram no cálculo porque o sistema ainda não possui calendário corporativo.
 */
export function businessHoursBetween(from: string, to: string): number | null {
  const fromMs = +new Date(from);
  const toMs = +new Date(to);
  if (!Number.isFinite(fromMs) || !Number.isFinite(toMs) || toMs < fromMs) return null;

  const localFrom = fromMs + FORTALEZA_OFFSET_MS;
  const localTo = toMs + FORTALEZA_OFFSET_MS;
  let day = Math.floor(localFrom / DAY_MS) * DAY_MS;
  const lastDay = Math.floor(localTo / DAY_MS) * DAY_MS;
  let totalMs = 0;

  while (day <= lastDay) {
    const weekday = new Date(day).getUTCDay();
    if (weekday >= 1 && weekday <= 5) {
      const workStartLocal = day + 9 * HOUR_MS;
      const workEndLocal = day + 18 * HOUR_MS;
      const overlapStart = Math.max(localFrom, workStartLocal);
      const overlapEnd = Math.min(localTo, workEndLocal);
      if (overlapEnd > overlapStart) totalMs += overlapEnd - overlapStart;
    }
    day += DAY_MS;
  }

  return Math.round((totalMs / HOUR_MS) * 10) / 10;
}

export interface CorrectionResponseLite {
  detected_at: string;
  responded_at: string;
}

export interface ResolutionSlaLite {
  first_seen_at: string | null;
  resolved_at: string;
  reopened_at: string | null;
}

export interface BillingSlaLite {
  numero_apolice: string;
  situacao_emissao: string;
  data_vencimento: string | null;
  data_quitacao: string | null;
}

export function deriveFirstResponse(
  rows: CorrectionResponseLite[],
  referenceDate: string,
): { mediaHoras: number | null; respondidas: number } {
  const hours = rows
    .filter((row) => fortalezaDateKey(row.responded_at) === referenceDate)
    .map((row) => businessHoursBetween(row.detected_at, row.responded_at))
    .filter((value): value is number => value !== null);

  if (hours.length === 0) return { mediaHoras: null, respondidas: 0 };
  return {
    mediaHoras: Math.round((hours.reduce((sum, value) => sum + value, 0) / hours.length) * 10) / 10,
    respondidas: hours.length,
  };
}

export function deriveResolutionSla(
  rows: ResolutionSlaLite[],
  slaHours: number,
  referenceAt = Date.now(),
  days = 7,
): { total: number; within: number; pct: number | null } {
  const cutoff = referenceAt - days * DAY_MS;
  const measurable = rows
    .filter(
      (row) =>
        !row.reopened_at &&
        row.first_seen_at &&
        +new Date(row.resolved_at) >= cutoff &&
        +new Date(row.resolved_at) <= referenceAt,
    )
    .map((row) => businessHoursBetween(row.first_seen_at!, row.resolved_at))
    .filter((value): value is number => value !== null);
  const within = measurable.filter((hours) => hours <= slaHours).length;
  return {
    total: measurable.length,
    within,
    pct: measurable.length > 0 ? Math.round((within / measurable.length) * 1000) / 10 : null,
  };
}

export function countDelinquentContracts(rows: BillingSlaLite[], referenceAt = Date.now()): number {
  const referenceDate = fortalezaDateKey(referenceAt);
  const policies = new Set<string>();
  for (const row of rows) {
    if ((row.situacao_emissao ?? "").trim().toLowerCase().startsWith("cancel")) continue;
    if (!row.data_vencimento || row.data_vencimento.slice(0, 10) >= referenceDate) continue;
    if (row.data_quitacao && row.data_quitacao.slice(0, 10) <= referenceDate) continue;
    policies.add(row.numero_apolice);
  }
  return policies.size;
}

function monthLabel(month: string): string {
  const [y, m] = month.split("-").map(Number);
  if (!y || !m) return month;
  return new Intl.DateTimeFormat("pt-BR", { month: "short", year: "2-digit" })
    .format(new Date(y, m - 1, 1))
    .replace(".", "");
}

/** runs em ordem crescente de data; findings de todas elas (já sem exceções). */
export function deriveDaily(
  runsAsc: RunLite[],
  byRun: Map<string, FindingLite[]>,
  referenceAt = Date.now(),
): DailyKpis {
  const referenceDate = fortalezaDateKey(referenceAt);
  const seen = new Set<string>();
  const newByDay = new Map<string, Set<string>>();

  for (const run of runsAsc) {
    const day = fortalezaDateKey(run.at);
    const runKeys = new Set((byRun.get(run.id) ?? []).map(findingKey));
    const dayKeys = newByDay.get(day) ?? new Set<string>();
    for (const key of runKeys) {
      if (!seen.has(key)) dayKeys.add(key);
    }
    newByDay.set(day, dayKeys);
    for (const key of runKeys) seen.add(key);
  }

  const latest = runsAsc.at(-1) ?? null;
  const latestFindings = latest ? (byRun.get(latest.id) ?? []) : [];
  const previousDays = Array.from(newByDay.entries())
    .filter(([day]) => day < referenceDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-5);
  const mediaMovel =
    previousDays.length > 0
      ? previousDays.reduce((sum, [, keys]) => sum + keys.size, 0) / previousDays.length
      : 0;
  const novas = newByDay.get(referenceDate)?.size ?? 0;
  const desvioPct =
    mediaMovel > 0 ? ((novas - mediaMovel) / mediaMovel) * 100 : novas > 0 ? 100 : 0;

  return {
    runAt: latest?.at ?? null,
    referenceDate,
    novas,
    criticasAbertas: new Set(latestFindings.filter(isCritical).map(findingKey)).size,
    mediaMovel: Math.round(mediaMovel * 10) / 10,
    desvioPct: Math.round(desvioPct * 10) / 10,
    primeiraRespostaHoras: null,
    ocorrenciasRespondidas: 0,
  };
}

/**
 * Reincidência: achado (apólice + tipo de erro) que já apareceu em alguma run
 * anterior à janela analisada.
 */
export function deriveWeekly(
  runsAsc: RunLite[],
  byRun: Map<string, FindingLite[]>,
  days = 7,
  referenceAt?: number,
): WeeklyKpis {
  if (runsAsc.length === 0) {
    return {
      runs: 0,
      total: 0,
      repetidas: 0,
      novasUnicas: 0,
      reincidenciaPct: null,
      resolvidas: 0,
      resolvidasDentroSla: 0,
      resolvidasDentroSlaPct: null,
      inadimplentes: 0,
      inadimplentesSemanaAnterior: 0,
      inadimplentesDelta: 0,
    };
  }
  const last = runsAsc[runsAsc.length - 1];
  const reference = referenceAt ?? +new Date(last.at);
  const cutoff = reference - days * 86_400_000;
  let window = runsAsc.filter((r) => +new Date(r.at) >= cutoff);
  if (window.length === 0 && referenceAt === undefined) window = [last];
  const windowIds = new Set(window.map((r) => r.id));
  const before = runsAsc.filter((r) => !windowIds.has(r.id));

  const historico = new Set<string>();
  for (const r of before) for (const f of byRun.get(r.id) ?? []) historico.add(findingKey(f));

  let repetidas = 0;
  let novasUnicas = 0;
  for (const r of window) {
    const keysDaRun = new Set((byRun.get(r.id) ?? []).map(findingKey));
    for (const key of keysDaRun) {
      if (historico.has(key)) {
        repetidas++;
      } else {
        novasUnicas++;
      }
    }
    for (const key of keysDaRun) historico.add(key);
  }
  const total = repetidas + novasUnicas;
  return {
    runs: window.length,
    total,
    repetidas,
    novasUnicas,
    reincidenciaPct: total > 0 ? Math.round((repetidas / total) * 1000) / 10 : null,
    resolvidas: 0,
    resolvidasDentroSla: 0,
    resolvidasDentroSlaPct: null,
    inadimplentes: 0,
    inadimplentesSemanaAnterior: 0,
    inadimplentesDelta: 0,
  };
}

export function deriveMonthlyReincidencia(
  runsAsc: RunLite[],
  byRun: Map<string, FindingLite[]>,
): MonthlyReincidencia[] {
  const historico = new Set<string>();
  const perMonth = new Map<string, { total: number; repetidas: number }>();

  for (const r of runsAsc) {
    const month = fortalezaDateKey(r.at).slice(0, 7);
    const bucket = perMonth.get(month) ?? { total: 0, repetidas: 0 };
    const keysDaRun = new Set((byRun.get(r.id) ?? []).map(findingKey));
    for (const key of keysDaRun) {
      bucket.total++;
      if (historico.has(key)) bucket.repetidas++;
    }
    perMonth.set(month, bucket);
    for (const k of keysDaRun) historico.add(k);
  }

  const rows = Array.from(perMonth.entries())
    .map(([month, v]) => {
      const total = v.total;
      const repetidas = v.repetidas;
      return {
        month,
        label: monthLabel(month),
        total,
        repetidas,
        reincidenciaPct: total > 0 ? Math.round((repetidas / total) * 1000) / 10 : 0,
        mm3: 0,
        deltaMm3: null,
      };
    })
    .sort((a, b) => a.month.localeCompare(b.month));

  return rows.map((r, i) => {
    const slice = rows.slice(Math.max(0, i - 2), i + 1);
    const mm3 = slice.reduce((s, x) => s + x.reincidenciaPct, 0) / slice.length;
    const roundedMm3 = Math.round(mm3 * 10) / 10;
    const previousSlice = rows.slice(Math.max(0, i - 3), i);
    const previousMm3 =
      previousSlice.length > 0
        ? previousSlice.reduce((sum, row) => sum + row.reincidenciaPct, 0) / previousSlice.length
        : null;
    return {
      ...r,
      mm3: roundedMm3,
      deltaMm3: previousMm3 === null ? null : Math.round((roundedMm3 - previousMm3) * 10) / 10,
    };
  });
}
