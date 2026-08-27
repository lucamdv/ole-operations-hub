import { a as useServerFn, t as runAudit, m as useWebhookMode, v as getAuditRunStatus, q as getLatestAudit, s as getAuditHistory } from "./router-C--tI9WT.mjs";
import { r as reactExports } from "../_libs/react.mjs";
import { u as useQuery, q as queryOptions, a as useQueryClient, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
const latestAuditQuery = queryOptions({
  queryKey: ["audit", "latest"],
  queryFn: () => getLatestAudit(),
  staleTime: 3e4
});
const auditHistoryQuery = queryOptions({
  queryKey: ["audit", "history"],
  queryFn: () => getAuditHistory(),
  staleTime: 3e4
});
function useLatestAudit() {
  return useQuery(latestAuditQuery);
}
function useAuditHistory() {
  return useQuery(auditHistoryQuery);
}
function useRunAudit() {
  const qc = useQueryClient();
  const fireFn = useServerFn(runAudit);
  const { mode } = useWebhookMode();
  const statusFn = useServerFn(getAuditRunStatus);
  const [activeRunId, setActiveRunId] = reactExports.useState(null);
  const [isPolling, setIsPolling] = reactExports.useState(false);
  const pollTimer = reactExports.useRef(null);
  reactExports.useEffect(
    () => () => {
      if (pollTimer.current) clearTimeout(pollTimer.current);
    },
    []
  );
  const stopPolling = () => {
    if (pollTimer.current) {
      clearTimeout(pollTimer.current);
      pollTimer.current = null;
    }
    setIsPolling(false);
    setActiveRunId(null);
  };
  const pollOnce = async (runId, startedAt) => {
    try {
      const row = await statusFn({ data: { runId } });
      if (!row) {
      } else if (row.status === "success") {
        const reprov = row.reprovados ?? 0;
        const total = row.total_processado ?? 0;
        toast.success("Auditoria concluída", {
          description: reprov === 0 ? `${total} apólices · todas em conformidade.` : `${reprov} de ${total} com inconsistências.`
        });
        qc.invalidateQueries({ queryKey: ["audit"] });
        stopPolling();
        return;
      } else if (row.status === "error") {
        toast.error("Falha na auditoria", {
          description: row.error_message ?? "Erro desconhecido no motor.",
          duration: 3e4,
          style: { whiteSpace: "pre-wrap", fontFamily: "ui-monospace, SFMono-Regular, monospace", fontSize: "12px" }
        });
        stopPolling();
        return;
      }
    } catch (err) {
      console.error("[poll] erro consultando status:", err);
    }
    if (Date.now() - startedAt > 15 * 6e4) {
      toast.error("Auditoria expirou", {
        description: "Sem resposta do motor após 15 minutos."
      });
      stopPolling();
      return;
    }
    pollTimer.current = setTimeout(() => pollOnce(runId, startedAt), 3e3);
  };
  const mutation = useMutation({
    mutationFn: () => fireFn({ data: { mode } }),
    onSuccess: ({ runId }) => {
      setActiveRunId(runId);
      setIsPolling(true);
      toast.info("Auditoria iniciada", {
        description: "Aguardando retorno do motor n8n…"
      });
      const startedAt = Date.now();
      pollTimer.current = setTimeout(() => pollOnce(runId, startedAt), 3e3);
    },
    onError: (err) => {
      toast.error("Falha ao disparar auditoria", { description: err.message });
    }
  });
  return {
    ...mutation,
    isRunning: mutation.isPending || isPolling,
    activeRunId
  };
}
const pct = (n, d) => d === 0 ? 0 : n / d * 100;
const deltaPct = (cur, prev) => {
  if (prev === 0) return cur === 0 ? 0 : 100;
  return (cur - prev) / prev * 100;
};
function deriveKpis({ latest, history }) {
  if (!latest) return null;
  const r = latest.run;
  const findings = latest.findings;
  const audited = r.total_processado;
  const approved = r.aprovados;
  const rejected = r.reprovados;
  const approvedRate = pct(approved, audited);
  const operationalRisk = pct(rejected, audited);
  const affectedPolicies = new Set(findings.map((f) => f.apolice)).size;
  const uniqueErrorTypes = new Set(findings.map((f) => f.tipo_erro)).size;
  const counts = /* @__PURE__ */ new Map();
  for (const f of findings) counts.set(f.tipo_erro, (counts.get(f.tipo_erro) ?? 0) + 1);
  let topErrorType = null;
  let topErrorCount = 0;
  for (const [k, v] of counts) {
    if (v > topErrorCount) {
      topErrorType = k;
      topErrorCount = v;
    }
  }
  const prev = history.find((h) => h.id !== r.id) ?? null;
  const deltaApproved = prev ? deltaPct(approved, prev.aprovados) : 0;
  const deltaRejected = prev ? deltaPct(rejected, prev.reprovados) : 0;
  const prevRisk = prev ? pct(prev.reprovados, prev.total_processado) : operationalRisk;
  const deltaRisk = operationalRisk - prevRisk;
  const deltaAlerts = prev ? deltaPct(rejected, prev.reprovados) : 0;
  return {
    audited,
    approved,
    rejected,
    approvedRate,
    activeAlerts: findings.length,
    operationalRisk,
    uniqueErrorTypes,
    affectedPolicies,
    topErrorType,
    topErrorCount,
    deltaApproved,
    deltaRejected,
    deltaRisk,
    deltaAlerts
  };
}
function errorTypeBreakdown(findings) {
  const map = /* @__PURE__ */ new Map();
  for (const f of findings) {
    const cur = map.get(f.tipo_erro) ?? { count: 0, apolices: /* @__PURE__ */ new Set() };
    cur.count++;
    cur.apolices.add(f.apolice);
    map.set(f.tipo_erro, cur);
  }
  return Array.from(map.entries()).map(([tipo, v]) => ({ tipo, count: v.count, apolices: v.apolices.size })).sort((a, b) => b.count - a.count);
}
function groupByApolice(findings) {
  const map = /* @__PURE__ */ new Map();
  for (const f of findings) {
    const list = map.get(f.apolice) ?? [];
    list.push(f);
    map.set(f.apolice, list);
  }
  return Array.from(map.entries()).map(([apolice, list]) => ({
    apolice,
    total: list.length,
    tipos: Array.from(new Set(list.map((l) => l.tipo_erro))),
    findings: list
  })).sort((a, b) => b.total - a.total);
}
function runSeries(history) {
  const asc = [...history].sort((a, b) => +new Date(a.created_at) - +new Date(b.created_at));
  return asc.map((h, i) => ({
    id: h.id,
    label: `R${i + 1}`,
    date: h.created_at,
    approved: h.aprovados,
    rejected: h.reprovados,
    total: h.total_processado,
    risk: pct(h.reprovados, h.total_processado)
  }));
}
function buildHeatmap(latest, history, maxRuns = 12) {
  const runs = runSeries(history).slice(-maxRuns);
  if (!latest || runs.length === 0) return { runs, rows: [] };
  const breakdown = errorTypeBreakdown(latest.findings);
  const totalLatestErrors = breakdown.reduce((s, b) => s + b.count, 0) || 1;
  const latestRunId = latest.run.id;
  const rows = breakdown.map((b) => {
    const cells = runs.map((rp) => {
      if (rp.id === latestRunId) return b.count;
      const share = b.count / totalLatestErrors;
      return Math.round(rp.rejected * share);
    });
    return { tipo: b.tipo, cells };
  });
  return { runs, rows };
}
function normalizeFinding(f) {
  const d = f.detalhes ?? {};
  const s = (k) => typeof d[k] === "string" ? d[k].trim() : "";
  const motivo = s("motivo") || s("detalhe_erro") || s("mensagem") || s("message");
  const detalhe = s("detalhe") || s("descricao") || s("description") || "";
  const endosso = f.endosso?.trim() || s("endosso_com_erro") || s("endosso") || "" || null;
  const nivel = s("nivel") || null;
  const endossoAnterior = s("endosso_anterior") || null;
  return { motivo, detalhe, endosso, nivel, endossoAnterior };
}
function severityOf(f) {
  const d = f.detalhes ?? {};
  const nivel = typeof d.nivel === "string" ? d.nivel.toUpperCase() : "";
  if (nivel === "ERRO") return "erro";
  if (nivel === "ALERTA" || nivel === "WARN" || nivel === "ATENÇÃO") return "alerta";
  const hay = `${f.tipo_erro ?? ""} ${d.motivo ?? ""} ${d.detalhe ?? ""} ${d.detalhe_erro ?? ""}`.toUpperCase();
  if (hay.includes("ERRO")) return "erro";
  if (hay.includes("ALERTA") || hay.includes("ATENÇÃO") || hay.includes("WARN")) return "alerta";
  return "info";
}
function countBySeverity(findings) {
  const out = { erros: 0, alertas: 0, infos: 0 };
  for (const f of findings) {
    const s = severityOf(f);
    if (s === "erro") out.erros++;
    else if (s === "alerta") out.alertas++;
    else out.infos++;
  }
  return out;
}
function groupByEndosso(findings) {
  const map = /* @__PURE__ */ new Map();
  for (const f of findings) {
    const key = normalizeFinding(f).endosso || "—";
    const cur = map.get(key) ?? { items: [], apolices: /* @__PURE__ */ new Set() };
    cur.items.push(f);
    cur.apolices.add(f.apolice);
    map.set(key, cur);
  }
  return Array.from(map.entries()).map(([endosso, v]) => {
    const sev = countBySeverity(v.items);
    return {
      endosso,
      total: v.items.length,
      apolices: v.apolices.size,
      erros: sev.erros,
      alertas: sev.alertas
    };
  }).sort((a, b) => b.total - a.total);
}
function bucketByMonth(findings) {
  const map = /* @__PURE__ */ new Map();
  for (const f of findings) {
    const d = f.data_inicio || f.data_fim;
    if (!d) continue;
    const key = d.slice(0, 7);
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return Array.from(map.entries()).map(([key, count]) => {
    const [y, m] = key.split("-");
    const label = new Intl.DateTimeFormat("pt-BR", { month: "short", year: "2-digit" }).format(
      new Date(Number(y), Number(m) - 1, 1)
    );
    return { key, label, count };
  }).sort((a, b) => a.key.localeCompare(b.key));
}
export {
  useAuditHistory as a,
  useRunAudit as b,
  countBySeverity as c,
  deriveKpis as d,
  errorTypeBreakdown as e,
  groupByEndosso as f,
  groupByApolice as g,
  buildHeatmap as h,
  bucketByMonth as i,
  normalizeFinding as n,
  runSeries as r,
  severityOf as s,
  useLatestAudit as u
};
