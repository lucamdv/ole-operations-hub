function resolutionsAsIgnoreEntries(rows) {
  return rows.map((r) => ({
    apolice: r.apolice,
    tipo_erro: r.tipo_erro,
    endosso: r.endosso ?? null
  }));
}
const HOUR = 36e5;
function horas(r) {
  if (!r.first_seen_at) return null;
  const delta = +new Date(r.resolved_at) - +new Date(r.first_seen_at);
  if (!Number.isFinite(delta) || delta < 0) return null;
  return delta / HOUR;
}
function media(vals) {
  if (vals.length === 0) return 0;
  return Math.round(vals.reduce((s, v) => s + v, 0) / vals.length * 10) / 10;
}
function mediana(vals) {
  if (vals.length === 0) return 0;
  const s = [...vals].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  const v = s.length % 2 === 0 ? (s[mid - 1] + s[mid]) / 2 : s[mid];
  return Math.round(v * 10) / 10;
}
function deriveResolutionTimes(rows) {
  const all = [];
  const perTipo = /* @__PURE__ */ new Map();
  const countPerTipo = /* @__PURE__ */ new Map();
  const validas = rows.filter((r) => !r.reopened_at);
  for (const r of validas) {
    countPerTipo.set(r.tipo_erro, (countPerTipo.get(r.tipo_erro) ?? 0) + 1);
    const h = horas(r);
    if (h == null) continue;
    all.push(h);
    const list = perTipo.get(r.tipo_erro) ?? [];
    list.push(h);
    perTipo.set(r.tipo_erro, list);
  }
  const byTipo = Array.from(countPerTipo.entries()).map(([tipo_erro, resolvidas]) => {
    const vals = perTipo.get(tipo_erro) ?? [];
    return {
      tipo_erro,
      resolvidas,
      mediaHoras: media(vals),
      medianaHoras: mediana(vals)
    };
  }).sort((a, b) => b.resolvidas - a.resolvidas || b.mediaHoras - a.mediaHoras);
  return {
    totalResolvidas: validas.length,
    mediaHoras: media(all),
    medianaHoras: mediana(all),
    byTipo
  };
}
function formatDuracaoHoras(h) {
  if (!h || h <= 0) return "—";
  if (h < 1) return `${Math.round(h * 60)}min`;
  if (h < 48) return `${Math.round(h * 10) / 10}h`;
  const dias = Math.floor(h / 24);
  const resto = Math.round(h % 24);
  return resto > 0 ? `${dias}d ${resto}h` : `${dias}d`;
}
export {
  deriveResolutionTimes,
  formatDuracaoHoras,
  resolutionsAsIgnoreEntries
};
