/**
 * Regras contábeis Excelsior — visão do gráfico de receita.
 *
 * Espelha a planilha "Mapa de Repasses" (aba Capa_Resumo):
 *
 *   (+) Prêmio Total Pago               = premioTotalPago
 *   (−) IOF                             = premioTotalPago × 0,38%
 *   (=) Prêmio Líquido de IOF           = premioTotalPago − IOF
 *
 *   Remuneração Olé                     = Prêmio Líquido × 35%
 *   Custo de Aquisição                  = Prêmio Líquido × 20%
 *   Comissões Olé + Nomad               = Prêmio Líquido × 55%
 *   PIS/COFINS (Olé + Nomad)            = comissões × 4,65%
 *
 *   Fee Excelsior                       = Prêmio Líquido × 5%
 *   Fixo Suplementar                    = 8.333,33 − Fee Excelsior
 *   Carregamento Excelsior              = Fee Excelsior + Fixo Suplementar = 8.333,33
 *
 *   Prêmio Direto (Seguradora + RE)     = Prêmio Líquido − Comissões − Fee Excelsior
 *                                        + corretagem retida
 *
 *   Total Repasse Excelsior             = Carregamento + Prêmio Direto + PIS/COFINS
 */

export const REPASSE_RULES = {
  FIXO_SUPLEMENTAR_PISO: 8333.33,
  PIS_COFINS_PCT: 0.0465,
  IOF_PCT: 0.0038,
  FEE_OLE_PCT: 0.35,
  /** Comissão Nomad (custo de aquisição) — 20% do prêmio líquido de IOF. */
  NOMAD_PCT: 0.2,
  FEE_EXCELSIOR_PCT: 0.05,
} as const;

export interface RepasseBreakdown {
  /** Prêmio total pago no mês (bruto, antes de IOF). */
  premioTotalPago: number;
  /** IOF retido sobre o prêmio total pago (0,38%). */
  iof: number;
  /** Prêmio líquido de IOF. */
  premioLiquidoIof: number;
  /** Remuneração Olé: Prêmio Líquido × 35%. */
  remuneracaoOle: number;
  /** Custo de aquisição/Nomad: Prêmio Líquido × 20%. */
  custoAquisicao: number;
  /** Comissões Olé + Nomad: Prêmio Líquido × 55%. */
  comissoesOle: number;
  /** PIS/COFINS = 4,65% sobre comissões Olé + Nomad. */
  pisCofins: number;
  /** Mesmo valor de pisCofins com sinal negativo, para visualizar como abatimento. */
  pisCofinsDeducao: number;
  /** Total retido pela Olé após PIS/COFINS. */
  totalRetencaoOle: number;
  /** Fee Excelsior (5% do prêmio líquido de IOF). */
  feeExcelsior: number;
  /** Fixo Suplementar = 8.333,33 − Fee Excelsior. */
  fixoSuplementar: number;
  /** Carregamento Excelsior = Fee Excelsior + Fixo Suplementar (= 8.333,33). */
  carregamentoExcelsior: number;
  /** Corretagem identificada na composição das parcelas pagas. */
  premioRetidoCorretores: number;
  /** Prêmio Direto = líquido − comissões − fee + corretagem retida. */
  premioDireto: number;
  /** Parcela de 10% do prêmio direto retida pela Excelsior. */
  premioRetidoExcelsior: number;
  /** Parcela de 90% do prêmio direto cedida à Munich RE. */
  premioCedidoMunich: number;
  /** Total do repasse = Carregamento + Prêmio Direto + PIS/COFINS. */
  excelsiorLiquido: number;
}

export interface MonthlyRepasseInput {
  premioTotalPago: number;
  premioRetidoCorretores?: number;
}

export interface MonthlyRepasse extends RepasseBreakdown {
  month: string;
  label: string;
  bruto: number;
}

/**
 * Recebe o prêmio total pago no mês e devolve a composição da receita Excelsior
 * exatamente como no Mapa de Repasses.
 *
 * Mesmo com `premioTotalPagoBruto = 0`, o carregamento Excelsior de USD
 * 8.333,33 continua sendo aplicado (garantia contratual mínima).
 */
export function computeRepasse(
  premioTotalPagoBruto: number,
  premioRetidoCorretoresBruto = 0,
): RepasseBreakdown {
  const r = REPASSE_RULES;
  const premioTotalPago = round2(Math.max(0, premioTotalPagoBruto));
  const premioRetidoCorretores = round2(Math.max(0, premioRetidoCorretoresBruto));

  const iof = premioTotalPago * r.IOF_PCT;
  const premioLiquidoIof = premioTotalPago - iof;

  const remuneracaoOle = premioLiquidoIof * r.FEE_OLE_PCT;
  const custoAquisicao = premioLiquidoIof * r.NOMAD_PCT;
  const comissoesOle = remuneracaoOle + custoAquisicao;
  const pisCofins = comissoesOle * r.PIS_COFINS_PCT;
  const totalRetencaoOle = comissoesOle - pisCofins;

  const feeExcelsior = premioLiquidoIof * r.FEE_EXCELSIOR_PCT;
  const fixoSuplementar = Math.max(0, r.FIXO_SUPLEMENTAR_PISO - feeExcelsior);
  const carregamentoExcelsior = feeExcelsior + fixoSuplementar;

  const premioDireto = premioLiquidoIof - comissoesOle - feeExcelsior + premioRetidoCorretores;
  const premioRetidoExcelsior = premioDireto * 0.1;
  const premioCedidoMunich = premioDireto * 0.9;

  const excelsiorLiquido = carregamentoExcelsior + premioDireto + pisCofins;

  return {
    premioTotalPago: round2(premioTotalPago),
    iof: round2(iof),
    premioLiquidoIof: round2(premioLiquidoIof),
    remuneracaoOle: round2(remuneracaoOle),
    custoAquisicao: round2(custoAquisicao),
    comissoesOle: round2(comissoesOle),
    pisCofins: round2(pisCofins),
    pisCofinsDeducao: round2(-pisCofins),
    totalRetencaoOle: round2(totalRetencaoOle),
    feeExcelsior: round2(feeExcelsior),
    fixoSuplementar: round2(fixoSuplementar),
    carregamentoExcelsior: round2(carregamentoExcelsior),
    premioRetidoCorretores,
    premioDireto: round2(premioDireto),
    premioRetidoExcelsior: round2(premioRetidoExcelsior),
    premioCedidoMunich: round2(premioCedidoMunich),
    excelsiorLiquido: round2(excelsiorLiquido),
  };
}

export function buildRepasseSeries(
  byMonth: Map<string, MonthlyRepasseInput>,
  firstOperationMonth: string | null,
  currentDate = new Date(),
): MonthlyRepasse[] {
  const dataMonths = [...byMonth.keys()].filter(validMonth).sort();
  const possibleFirst = [firstOperationMonth, dataMonths[0]].filter(
    (month): month is string => !!month && validMonth(month),
  );
  if (possibleFirst.length === 0) return [];

  const first = possibleFirst.sort()[0]!;
  const currentMonth = `${currentDate.getUTCFullYear()}-${String(currentDate.getUTCMonth() + 1).padStart(2, "0")}`;
  const last = [currentMonth, dataMonths.at(-1), first]
    .filter((month): month is string => !!month && validMonth(month))
    .sort()
    .at(-1)!;

  const output: MonthlyRepasse[] = [];
  let [year, month] = first.split("-").map(Number);
  const [lastYear, lastMonth] = last.split("-").map(Number);
  while (year < lastYear || (year === lastYear && month <= lastMonth)) {
    const key = `${year}-${String(month).padStart(2, "0")}`;
    const input = byMonth.get(key);
    const bruto = round2(input?.premioTotalPago ?? 0);
    output.push({
      month: key,
      label: monthLabel(key),
      bruto,
      ...computeRepasse(bruto, input?.premioRetidoCorretores ?? 0),
    });
    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
  }
  return output;
}

function validMonth(value: string) {
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(value);
}

function monthLabel(month: string) {
  const [year, monthNumber] = month.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", { month: "short", year: "2-digit" })
    .format(new Date(year, monthNumber - 1, 1))
    .replace(".", "");
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}
