import { r as reactExports } from "../_libs/react.mjs";
const URGENCY_ORDER = ["baixa", "media", "alta", "critica"];
const URGENCY_LABEL = {
  baixa: "baixa",
  media: "média",
  alta: "alta",
  critica: "crítica"
};
const DEFAULT_ESCALATION_RULES = {
  auditsToEscalate: 3,
  daysToEscalate: 7,
  reopenedBump: true,
  policyRecurrenceBump: true,
  maxUrgency: "critica"
};
const BASE_FROM_SEVERITY = {
  erro: "alta",
  alerta: "media",
  info: "baixa"
};
function escalate(severity, ctx, rules = DEFAULT_ESCALATION_RULES) {
  const base = BASE_FROM_SEVERITY[severity];
  const reasons = [];
  let bumps = 0;
  if (rules.auditsToEscalate > 0 && ctx.occurrences >= rules.auditsToEscalate) {
    bumps++;
    reasons.push(`${ctx.occurrences} auditorias consecutivas em aberto`);
  }
  if (rules.daysToEscalate > 0 && ctx.daysOpen >= rules.daysToEscalate) {
    bumps++;
    reasons.push(`${ctx.daysOpen} dias sem resolução`);
  }
  if (rules.policyRecurrenceBump && ctx.recorrenteNaApolice) {
    bumps++;
    reasons.push("já ocorreu em endosso anterior da apólice");
  }
  if (rules.reopenedBump && ctx.reopened) {
    bumps++;
    reasons.push("reaberto após resolução");
  }
  const baseIdx = URGENCY_ORDER.indexOf(base);
  const capIdx = URGENCY_ORDER.indexOf(rules.maxUrgency);
  const idx = Math.min(
    URGENCY_ORDER.length - 1,
    Math.max(baseIdx, Math.min(baseIdx + bumps, Math.max(baseIdx, capIdx)))
  );
  return { urgency: URGENCY_ORDER[idx], base, bumps: idx - baseIdx, reasons };
}
function daysBetween(from, to = Date.now()) {
  if (!from) return 0;
  const d = new Date(from);
  if (!Number.isFinite(+d)) return 0;
  const startOfDay = (x) => Date.UTC(x.getFullYear(), x.getMonth(), x.getDate());
  return Math.max(0, Math.round((startOfDay(new Date(to)) - startOfDay(d)) / 864e5));
}
const KEY = "ole.alert.escalation.v1";
const listeners = /* @__PURE__ */ new Set();
function read() {
  if (typeof window === "undefined") return DEFAULT_ESCALATION_RULES;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_ESCALATION_RULES;
    return {
      ...DEFAULT_ESCALATION_RULES,
      ...JSON.parse(raw)
    };
  } catch {
    return DEFAULT_ESCALATION_RULES;
  }
}
function useEscalationRules() {
  const [rules, setRules] = reactExports.useState(() => read());
  reactExports.useEffect(() => {
    const l = (r) => setRules(r);
    listeners.add(l);
    setRules(read());
    return () => {
      listeners.delete(l);
    };
  }, []);
  const update = reactExports.useCallback((patch) => {
    const next = { ...read(), ...patch };
    localStorage.setItem(KEY, JSON.stringify(next));
    listeners.forEach((l) => l(next));
  }, []);
  const reset = reactExports.useCallback(() => {
    localStorage.removeItem(KEY);
    listeners.forEach((l) => l(DEFAULT_ESCALATION_RULES));
  }, []);
  return { rules, update, reset };
}
export {
  DEFAULT_ESCALATION_RULES as D,
  URGENCY_ORDER as U,
  URGENCY_LABEL as a,
  daysBetween as d,
  escalate as e,
  useEscalationRules as u
};
