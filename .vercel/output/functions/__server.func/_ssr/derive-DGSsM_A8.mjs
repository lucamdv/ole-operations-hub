const DEFAULT_KPI_TARGETS = {
  reincidenciaMaxPct: 15,
  criticasAbertasMax: 0,
  capacidadeContratos: 100,
  picoDesvioPct: 30,
  crescimentoAnualMinPct: 10
};
function statusMax(value, max) {
  if (value <= max) return "ok";
  if (value <= max * 1.5 || max === 0) return value === 0 ? "ok" : max === 0 ? "bad" : "warn";
  return "bad";
}
function statusMin(value, min) {
  if (value >= min) return "ok";
  if (value >= min * 0.8) return "warn";
  return "bad";
}
const findingKey = (f) => `${f.apolice}::${f.tipo_erro}`;
const isCritical = (f) => (f.nivel ?? "").toUpperCase() === "ERRO";
function emptyYear(year) {
  return {
    year,
    contratos: 0,
    contratosYtd: 0,
    premioEmitidoUsd: 0,
    premioEmitidoYtdUsd: 0,
    premioDiretoUsd: 0,
    premioDiretoYtdUsd: 0,
    criticos: 0,
    criticosYtd: 0
  };
}
function ytdCutoff(ref = /* @__PURE__ */ new Date()) {
  return ref.toISOString().slice(5, 10);
}
function withinYtd(date, cutoffMonthDay) {
  return date.slice(5, 10) <= cutoffMonthDay;
}
function yoyPct(current, previous) {
  if (previous <= 0) return null;
  return Math.round((current - previous) / previous * 1e3) / 10;
}
function monthLabel(month) {
  const [y, m] = month.split("-").map(Number);
  if (!y || !m) return month;
  return new Intl.DateTimeFormat("pt-BR", { month: "short", year: "2-digit" }).format(new Date(y, m - 1, 1)).replace(".", "");
}
function deriveDaily(runsAsc, byRun) {
  if (runsAsc.length === 0) {
    return { runAt: null, novas: 0, criticasAbertas: 0, resolvidas: 0, mediaMovel: 0, desvioPct: 0 };
  }
  const current = runsAsc[runsAsc.length - 1];
  const cur = byRun.get(current.id) ?? [];
  const anteriores = runsAsc.slice(0, -1).slice(-5);
  const mediaMovel = anteriores.length > 0 ? anteriores.reduce((s, r) => s + (byRun.get(r.id)?.length ?? 0), 0) / anteriores.length : 0;
  const desvioPct = mediaMovel > 0 ? (cur.length - mediaMovel) / mediaMovel * 100 : 0;
  return {
    runAt: current.at,
    novas: cur.length,
    criticasAbertas: cur.filter(isCritical).length,
    resolvidas: 0,
    mediaMovel: Math.round(mediaMovel * 10) / 10,
    desvioPct: Math.round(desvioPct * 10) / 10
  };
}
function deriveWeekly(runsAsc, byRun, days = 7) {
  if (runsAsc.length === 0) {
    return {
      runs: 0,
      total: 0,
      repetidas: 0,
      novasUnicas: 0,
      reincidenciaPct: 0,
      apolicesReincidentes: 0
    };
  }
  const last = runsAsc[runsAsc.length - 1];
  const cutoff = +new Date(last.at) - days * 864e5;
  let window = runsAsc.filter((r) => +new Date(r.at) >= cutoff);
  if (window.length === 0) window = [last];
  const windowIds = new Set(window.map((r) => r.id));
  const before = runsAsc.filter((r) => !windowIds.has(r.id));
  const historico = /* @__PURE__ */ new Set();
  for (const r of before) for (const f of byRun.get(r.id) ?? []) historico.add(findingKey(f));
  const seen = /* @__PURE__ */ new Set();
  const apolices = /* @__PURE__ */ new Set();
  let repetidas = 0;
  let novasUnicas = 0;
  for (const r of window) {
    for (const f of byRun.get(r.id) ?? []) {
      const key = findingKey(f);
      if (seen.has(key)) continue;
      seen.add(key);
      if (historico.has(key)) {
        repetidas++;
        apolices.add(f.apolice);
      } else {
        novasUnicas++;
      }
    }
  }
  const total = repetidas + novasUnicas;
  return {
    runs: window.length,
    total,
    repetidas,
    novasUnicas,
    reincidenciaPct: total > 0 ? Math.round(repetidas / total * 1e3) / 10 : 0,
    apolicesReincidentes: apolices.size
  };
}
function deriveMonthlyReincidencia(runsAsc, byRun) {
  const historico = /* @__PURE__ */ new Set();
  const perMonth = /* @__PURE__ */ new Map();
  for (const r of runsAsc) {
    const month = r.at.slice(0, 7);
    const bucket = perMonth.get(month) ?? { total: /* @__PURE__ */ new Set(), repetidas: /* @__PURE__ */ new Set() };
    const keysDaRun = /* @__PURE__ */ new Set();
    for (const f of byRun.get(r.id) ?? []) {
      const key = findingKey(f);
      keysDaRun.add(key);
      if (!bucket.total.has(key)) {
        bucket.total.add(key);
        if (historico.has(key)) bucket.repetidas.add(key);
      }
    }
    perMonth.set(month, bucket);
    for (const k of keysDaRun) historico.add(k);
  }
  const rows = Array.from(perMonth.entries()).map(([month, v]) => {
    const total = v.total.size;
    const repetidas = v.repetidas.size;
    return {
      month,
      label: monthLabel(month),
      total,
      repetidas,
      reincidenciaPct: total > 0 ? Math.round(repetidas / total * 1e3) / 10 : 0,
      mm3: 0
    };
  }).sort((a, b) => a.month.localeCompare(b.month));
  return rows.map((r, i) => {
    const slice = rows.slice(Math.max(0, i - 2), i + 1);
    const mm3 = slice.reduce((s, x) => s + x.reincidenciaPct, 0) / slice.length;
    return { ...r, mm3: Math.round(mm3 * 10) / 10 };
  });
}
export {
  DEFAULT_KPI_TARGETS,
  deriveDaily,
  deriveMonthlyReincidencia,
  deriveWeekly,
  emptyYear,
  findingKey,
  isCritical,
  statusMax,
  statusMin,
  withinYtd,
  yoyPct,
  ytdCutoff
};
