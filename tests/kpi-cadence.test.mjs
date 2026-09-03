import test from "node:test";
import assert from "node:assert/strict";
import {
  businessHoursBetween,
  countDelinquentContracts,
  deriveDaily,
  deriveFirstResponse,
  deriveMonthlyReincidencia,
  deriveResolutionSla,
  deriveWeekly,
  fortalezaDateKey,
  ytdCutoff,
} from "../src/lib/kpis/derive.ts";

const runs = [
  { id: "r1", at: "2026-08-27T15:00:00.000Z" },
  { id: "r2", at: "2026-08-28T15:00:00.000Z" },
];
const finding = (run_id, apolice, tipo_erro, nivel = "ERRO") => ({
  run_id,
  apolice,
  tipo_erro,
  endosso: "000001",
  nivel,
});
const byRun = new Map([
  ["r1", [finding("r1", "A", "TIPO A"), finding("r1", "B", "TIPO B", "ALERTA")]],
  ["r2", [finding("r2", "A", "TIPO A"), finding("r2", "C", "TIPO C")]],
]);

test("KPIs diários contam somente ocorrências inéditas do dia", () => {
  const daily = deriveDaily(runs, byRun, Date.parse("2026-08-28T18:00:00.000Z"));
  assert.equal(daily.referenceDate, "2026-08-28");
  assert.equal(daily.novas, 1);
  assert.equal(daily.criticasAbertas, 2);
  assert.equal(daily.mediaMovel, 2);
  assert.equal(daily.desvioPct, -50);
});

test("reincidência semanal compara ocorrências repetidas e novas por execução", () => {
  const weekly = deriveWeekly(runs, byRun, 7);
  assert.equal(weekly.total, 4);
  assert.equal(weekly.repetidas, 1);
  assert.equal(weekly.novasUnicas, 3);
  assert.equal(weekly.reincidenciaPct, 25);
});

test("média mensal registra alta contra a média móvel anterior", () => {
  const points = deriveMonthlyReincidencia(runs, byRun);
  assert.equal(points.length, 1);
  assert.equal(points[0].reincidenciaPct, 25);
  assert.equal(points[0].deltaMm3, null);
});

test("horas úteis ignoram noites e fim de semana", () => {
  // Sexta 17h → segunda 10h, em Fortaleza.
  assert.equal(businessHoursBetween("2026-08-28T20:00:00.000Z", "2026-08-31T13:00:00.000Z"), 2);
});

test("datas de referência respeitam o dia civil de Fortaleza", () => {
  const instant = new Date("2027-01-01T01:30:00.000Z");
  assert.equal(fortalezaDateKey(instant), "2026-12-31");
  assert.equal(ytdCutoff(instant), "12-31");
});

test("primeira resposta considera qualquer nível e usa a média em horas úteis", () => {
  const response = deriveFirstResponse(
    [
      {
        nivel: "ERRO",
        detected_at: "2026-08-28T12:00:00.000Z",
        responded_at: "2026-08-28T14:00:00.000Z",
      },
      {
        nivel: "ALERTA",
        detected_at: "2026-08-28T12:00:00.000Z",
        responded_at: "2026-08-28T16:00:00.000Z",
      },
    ],
    "2026-08-28",
  );
  assert.deepEqual(response, { mediaHoras: 3, respondidas: 2 });
});

test("reincidência semanal fica sem base quando não há ocorrências", () => {
  const weekly = deriveWeekly(
    [{ id: "r-empty", at: "2026-08-28T15:00:00.000Z" }],
    new Map([["r-empty", []]]),
    7,
  );
  assert.equal(weekly.total, 0);
  assert.equal(weekly.reincidenciaPct, null);
});

test("SLA semanal considera apenas resoluções mensuráveis e não reabertas", () => {
  const reference = Date.parse("2026-08-28T18:00:00.000Z");
  const sla = deriveResolutionSla(
    [
      {
        first_seen_at: "2026-08-28T12:00:00.000Z",
        resolved_at: "2026-08-28T14:00:00.000Z",
        reopened_at: null,
      },
      {
        first_seen_at: "2026-08-24T12:00:00.000Z",
        resolved_at: "2026-08-28T18:00:00.000Z",
        reopened_at: null,
      },
      {
        first_seen_at: "2026-08-28T12:00:00.000Z",
        resolved_at: "2026-08-28T14:00:00.000Z",
        reopened_at: "2026-08-28T15:00:00.000Z",
      },
    ],
    24,
    reference,
  );
  assert.deepEqual(sla, { total: 2, within: 1, pct: 50 });
});

test("inadimplência conta contratos vencidos, não quitados e não cancelados", () => {
  const rows = [
    {
      numero_apolice: "A",
      situacao_emissao: "Ativa",
      data_vencimento: "2026-08-20",
      data_quitacao: null,
    },
    {
      numero_apolice: "A",
      situacao_emissao: "Ativa",
      data_vencimento: "2026-08-21",
      data_quitacao: null,
    },
    {
      numero_apolice: "B",
      situacao_emissao: "Ativa",
      data_vencimento: "2026-08-20",
      data_quitacao: "2026-08-22",
    },
    {
      numero_apolice: "C",
      situacao_emissao: "Cancelada",
      data_vencimento: "2026-08-20",
      data_quitacao: null,
    },
  ];
  assert.equal(countDelinquentContracts(rows, Date.parse("2026-08-28T18:00:00.000Z")), 1);
});
