const endossoKey = (apolice, tipo, endosso) => `${apolice}::${tipo}::${endosso ?? ""}`;
function buildIgnoreSets(list) {
  const apoliceWhole = new Set(list.filter((i) => !i.tipo_erro).map((i) => i.apolice));
  const comTipo = list.filter((i) => i.tipo_erro);
  const apolicePlusTipo = new Set(
    comTipo.filter((i) => i.endosso === void 0).map((i) => `${i.apolice}::${i.tipo_erro}`)
  );
  const apolicePlusTipoPlusEndosso = new Set(
    comTipo.filter((i) => i.endosso !== void 0).map((i) => endossoKey(i.apolice, i.tipo_erro, i.endosso))
  );
  return {
    apoliceWhole,
    apolicePlusTipo,
    apolicePlusTipoPlusEndosso,
    isEmpty: apoliceWhole.size === 0 && apolicePlusTipo.size === 0 && apolicePlusTipoPlusEndosso.size === 0
  };
}
function isIgnoredFinding(sets, f) {
  return sets.apoliceWhole.has(f.apolice) || sets.apolicePlusTipo.has(`${f.apolice}::${f.tipo_erro}`) || sets.apolicePlusTipoPlusEndosso.has(endossoKey(f.apolice, f.tipo_erro, f.endosso ?? null));
}
function filterFindings(sets, findings) {
  if (sets.isEmpty) return findings;
  return findings.filter((f) => !isIgnoredFinding(sets, f));
}
function adjustRunCounts(run, sets, runFindings) {
  const antes = new Set(runFindings.map((f) => f.apolice));
  const depois = new Set(filterFindings(sets, runFindings).map((f) => f.apolice));
  const reprovados = depois.size;
  const removidos = antes.size - depois.size;
  const aprovados = (run.aprovados ?? 0) + removidos;
  return { total_processado: run.total_processado, aprovados, reprovados };
}
export {
  adjustRunCounts,
  buildIgnoreSets,
  filterFindings,
  isIgnoredFinding
};
