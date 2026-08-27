const REPASSE_RULES = {
  FIXO_SUPLEMENTAR_PISO: 8333.33,
  PIS_COFINS_PCT: 0.0465,
  IOF_PCT: 38e-4,
  FEE_OLE_PCT: 0.35,
  /** Comissão Nomad (custo de aquisição) — 20% do prêmio líquido de IOF. */
  NOMAD_PCT: 0.2,
  FEE_EXCELSIOR_PCT: 0.05
};
function computeRepasse(premioTotalPagoBruto) {
  const r = REPASSE_RULES;
  const premioTotalPago = Math.max(0, premioTotalPagoBruto);
  const iof = premioTotalPago * r.IOF_PCT;
  const premioLiquidoIof = premioTotalPago - iof;
  const comissoesOle = premioLiquidoIof * (r.FEE_OLE_PCT + r.NOMAD_PCT);
  const pisCofins = comissoesOle * r.PIS_COFINS_PCT;
  const feeExcelsior = premioLiquidoIof * r.FEE_EXCELSIOR_PCT;
  const fixoSuplementar = r.FIXO_SUPLEMENTAR_PISO - feeExcelsior;
  const carregamentoExcelsior = feeExcelsior + fixoSuplementar;
  const premioDireto = premioLiquidoIof - comissoesOle - feeExcelsior;
  const excelsiorLiquido = carregamentoExcelsior + premioDireto - pisCofins;
  return {
    premioTotalPago: round2(premioTotalPago),
    iof: round2(iof),
    premioLiquidoIof: round2(premioLiquidoIof),
    comissoesOle: round2(comissoesOle),
    pisCofins: round2(pisCofins),
    pisCofinsDeducao: round2(-pisCofins),
    feeExcelsior: round2(feeExcelsior),
    fixoSuplementar: round2(fixoSuplementar),
    carregamentoExcelsior: round2(carregamentoExcelsior),
    premioDireto: round2(premioDireto),
    excelsiorLiquido: round2(excelsiorLiquido)
  };
}
function round2(n) {
  return Math.round(n * 100) / 100;
}
export {
  REPASSE_RULES as R,
  computeRepasse as c
};
