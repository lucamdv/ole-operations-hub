import { r as reactExports } from "../_libs/react.mjs";
import { DEFAULT_KPI_TARGETS } from "./derive-DGSsM_A8.mjs";
const KEY = "ole.kpi.targets.v1";
const listeners = /* @__PURE__ */ new Set();
function read() {
  if (typeof window === "undefined") return DEFAULT_KPI_TARGETS;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_KPI_TARGETS;
    return { ...DEFAULT_KPI_TARGETS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_KPI_TARGETS;
  }
}
function useKpiTargets() {
  const [targets, setTargets] = reactExports.useState(() => read());
  reactExports.useEffect(() => {
    const l = (t) => setTargets(t);
    listeners.add(l);
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
    listeners.forEach((l) => l(DEFAULT_KPI_TARGETS));
  }, []);
  return { targets, update, reset };
}
export {
  useKpiTargets as u
};
