import assert from "node:assert/strict";
import test from "node:test";

import { buildRepasseSeries, computeRepasse } from "../src/lib/analytics/repasse-rules.ts";

test("reconcilia exatamente o mapa de repasses de julho de 2026", () => {
  const july = computeRepasse(629, 12.55);

  assert.deepEqual(july, {
    premioTotalPago: 629,
    iof: 2.39,
    premioLiquidoIof: 626.61,
    remuneracaoOle: 219.31,
    custoAquisicao: 125.32,
    comissoesOle: 344.64,
    pisCofins: 16.03,
    pisCofinsDeducao: -16.03,
    totalRetencaoOle: 328.61,
    feeExcelsior: 31.33,
    fixoSuplementar: 8_302,
    carregamentoExcelsior: 8_333.33,
    premioRetidoCorretores: 12.55,
    premioDireto: 263.19,
    premioRetidoExcelsior: 26.32,
    premioCedidoMunich: 236.87,
    excelsiorLiquido: 8_612.55,
  });
});

test("série começa na primeira emissão, mesmo antes do primeiro pagamento", () => {
  const series = buildRepasseSeries(
    new Map([["2026-07", { premioTotalPago: 629, premioRetidoCorretores: 12.55 }]]),
    "2025-12",
    new Date("2026-08-27T00:00:00Z"),
  );

  assert.equal(series[0]?.month, "2025-12");
  assert.equal(series.at(-1)?.month, "2026-08");
  assert.equal(series.length, 9);
  assert.equal(series.find((month) => month.month === "2025-12")?.premioTotalPago, 0);
  assert.equal(series.find((month) => month.month === "2026-07")?.excelsiorLiquido, 8_612.55);
});
