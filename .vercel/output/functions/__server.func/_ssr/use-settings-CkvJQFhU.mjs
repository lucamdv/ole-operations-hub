import { r as reactExports } from "../_libs/react.mjs";
import { u as useCurrentRole } from "./use-current-role-E51G92Oa.mjs";
const PREFS_KEY = "ole.profile.prefs.v1";
const NOTIF_PREFS_KEY = "ole.notif.prefs.v1";
const DEFAULT_LOCAL = {
  fuso: "America/Sao_Paulo",
  idioma: "pt-BR"
};
const FALLBACK_PROFILE = {
  nome: "Operador",
  email: "—",
  ...DEFAULT_LOCAL
};
const DEFAULT_PREFS = {
  auditoria_concluida: true,
  auditoria_erro: true,
  sync_carteira: true,
  achados_criticos: true,
  apolices_atualizadas: true,
  som: false
};
const prefsListeners = /* @__PURE__ */ new Set();
function readJSON(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) };
  } catch {
    return fallback;
  }
}
function useProfile() {
  const { data: roleInfo } = useCurrentRole();
  const [local, setLocal] = reactExports.useState(() => readJSON(PREFS_KEY, DEFAULT_LOCAL));
  const profile = reactExports.useMemo(() => {
    const p = roleInfo?.profile;
    if (!p) return { ...FALLBACK_PROFILE, ...local };
    return {
      nome: p.full_name || p.email || "Operador",
      email: p.email || "—",
      fuso: local.fuso,
      idioma: local.idioma
    };
  }, [roleInfo, local]);
  const update = reactExports.useCallback((patch) => {
    setLocal((prev) => {
      const next = {
        fuso: patch.fuso ?? prev.fuso,
        idioma: patch.idioma ?? prev.idioma
      };
      if (typeof window !== "undefined") {
        localStorage.setItem(PREFS_KEY, JSON.stringify(next));
      }
      return next;
    });
  }, []);
  return { profile, update };
}
function useNotifPrefs() {
  const [prefs, setPrefsState] = reactExports.useState(() => readJSON(NOTIF_PREFS_KEY, DEFAULT_PREFS));
  reactExports.useEffect(() => {
    const l = (p) => setPrefsState(p);
    prefsListeners.add(l);
    return () => {
      prefsListeners.delete(l);
    };
  }, []);
  const update = reactExports.useCallback((patch) => {
    const next = { ...readJSON(NOTIF_PREFS_KEY, DEFAULT_PREFS), ...patch };
    localStorage.setItem(NOTIF_PREFS_KEY, JSON.stringify(next));
    prefsListeners.forEach((l) => l(next));
  }, []);
  return { prefs, update };
}
const CHART_PREFS_KEY = "ole.chart.prefs.v1";
const DEFAULT_CHART_PREFS = { hideEmptyCharts: true };
const chartPrefsListeners = /* @__PURE__ */ new Set();
function useChartPrefs() {
  const [prefs, setPrefs] = reactExports.useState(
    () => readJSON(CHART_PREFS_KEY, DEFAULT_CHART_PREFS)
  );
  reactExports.useEffect(() => {
    const l = (p) => setPrefs(p);
    chartPrefsListeners.add(l);
    return () => {
      chartPrefsListeners.delete(l);
    };
  }, []);
  const update = reactExports.useCallback((patch) => {
    const next = { ...readJSON(CHART_PREFS_KEY, DEFAULT_CHART_PREFS), ...patch };
    localStorage.setItem(CHART_PREFS_KEY, JSON.stringify(next));
    chartPrefsListeners.forEach((l) => l(next));
  }, []);
  return { prefs, update };
}
function getInitials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");
}
function playNotifBeep() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.value = 1e-4;
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(1e-4, now + 0.35);
    osc.start(now);
    osc.stop(now + 0.4);
    setTimeout(() => ctx.close().catch(() => {
    }), 600);
  } catch {
  }
}
export {
  useNotifPrefs as a,
  useChartPrefs as b,
  getInitials as g,
  playNotifBeep as p,
  useProfile as u
};
