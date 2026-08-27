import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAutomationSchedule } from "./use-automation-DR0lOfg-.mjs";
import { n as nextRunAt, o as formatCountdown } from "./router-C--tI9WT.mjs";
import { D as CalendarClock, H as Clock } from "../_libs/lucide-react.mjs";
const LABELS = {
  audit: "auditoria automática",
  policy_sync: "sincronização automática"
};
function NextRunCountdown({
  job,
  className = ""
}) {
  const { schedule } = useAutomationSchedule(job);
  const [now, setNow] = reactExports.useState(() => Date.now());
  reactExports.useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1e3);
    return () => clearInterval(i);
  }, []);
  const next = reactExports.useMemo(
    () => schedule ? nextRunAt(schedule, new Date(now)) : null,
    // recalcula a cada segundo é barato (poucas iterações) e mantém o alvo correto
    [schedule, now]
  );
  if (!schedule) return null;
  if (!schedule.enabled || !next) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-1.5 text-[11.5px] text-muted-foreground ${className}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "h-3.5 w-3.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Agendamento automático desativado" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/configuracoes",
          className: "text-primary hover:underline font-medium",
          children: "configurar"
        }
      )
    ] });
  }
  const targetLabel = next.toLocaleString("pt-BR", {
    timeZone: schedule.timezone,
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex flex-wrap items-center gap-1.5 text-[11.5px] text-muted-foreground ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5 text-primary" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      "Próxima ",
      LABELS[job],
      " em",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono tabular-nums text-foreground font-semibold", children: formatCountdown(next.getTime() - now) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground/70", children: [
      "· ",
      targetLabel
    ] })
  ] });
}
export {
  NextRunCountdown as N
};
