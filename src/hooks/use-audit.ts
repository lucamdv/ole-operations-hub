import { useWebhookMode } from "@/hooks/use-webhook-mode";
import type { WebhookMode } from "@/lib/webhook-mode";
import { useEffect, useRef, useState } from "react";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { auditCompletionNotice } from "@/lib/audit/result-summary";
import {
  cancelAudit,
  getActiveAuditRun,
  getAuditHistory,
  getAuditRunStatus,
  getLatestAudit,
  runAudit,
} from "@/lib/audit.functions";

export const latestAuditQuery = queryOptions({
  queryKey: ["audit", "latest"] as const,
  queryFn: () => getLatestAudit(),
  staleTime: 30_000,
});

export const auditHistoryQuery = queryOptions({
  queryKey: ["audit", "history"] as const,
  queryFn: () => getAuditHistory(),
  staleTime: 30_000,
});

export function useLatestAudit() {
  return useQuery(latestAuditQuery);
}

export function useAuditHistory() {
  return useQuery(auditHistoryQuery);
}

/**
 * Executa auditorias com acompanhamento global entre abas e terminação persistida.
 * Um reinício substitui a execução anterior; cancelamento não depende de callback.
 */
export function useRunAudit() {
  const qc = useQueryClient();
  const fireFn = useServerFn(runAudit);
  const activeFn = useServerFn(getActiveAuditRun);
  const cancelFn = useServerFn(cancelAudit);
  const statusFn = useServerFn(getAuditRunStatus);
  const { mode } = useWebhookMode("audit");

  const [activeRunId, setActiveRunId] = useState<string | null>(null);
  // Local start time belongs to the SAME run as activeRunId, never an old cached query.
  const [activeRunStartedAt, setActiveRunStartedAt] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollingRun = useRef<string | null>(null);

  const activeQuery = useQuery({
    queryKey: ["audit", "active", mode] as const,
    queryFn: () => activeFn({ data: { mode } }),
    refetchInterval: 3_000,
    staleTime: 1_000,
  });

  useEffect(
    () => () => {
      if (pollTimer.current) clearTimeout(pollTimer.current);
    },
    [],
  );

  const stopPolling = (runId: string) => {
    if (pollingRun.current !== runId) return;
    pollingRun.current = null;
    if (pollTimer.current) {
      clearTimeout(pollTimer.current);
      pollTimer.current = null;
    }
    setIsPolling(false);
    setActiveRunId(null);
    setActiveRunStartedAt(null);
    // A consulta anterior pode estar em cache durante alguns segundos.
    // Limpa apenas se ela ainda apontar para a run que acabou.
    qc.setQueryData<{ id: string; created_at: string; status: string } | null>(
      ["audit", "active", mode],
      (cached) => (cached?.id === runId ? null : cached),
    );
  };

  const refreshAudit = () => {
    qc.invalidateQueries({ queryKey: ["audit"] });
    qc.invalidateQueries({ queryKey: ["system-status"] });
  };

  const pollOnce = async (runId: string, startedAt: number, submittedMode: WebhookMode) => {
    if (pollingRun.current !== runId) return;
    try {
      const row = await statusFn({ data: { runId, mode: submittedMode } });
      if (pollingRun.current !== runId) return;
      if (row?.status === "success") {
        const notice = auditCompletionNotice(row);
        toast[notice.tone](notice.title, { description: notice.description });
        refreshAudit();
        stopPolling(runId);
        return;
      }
      if (row?.status === "cancelled") {
        toast.info("Auditoria cancelada", {
          description: "Esta execução não aceitará novos resultados do n8n.",
        });
        refreshAudit();
        stopPolling(runId);
        return;
      }
      if (row?.status === "error") {
        toast.error("Falha na auditoria", {
          description: row.error_message ?? "Erro desconhecido no motor.",
          duration: 30_000,
        });
        refreshAudit();
        stopPolling(runId);
        return;
      }
    } catch (err) {
      console.error("[audit-poll] erro consultando status:", err);
    }

    if (Date.now() - startedAt > 15 * 60_000) {
      try {
        await cancelFn({ data: { runId, reason: "timeout" } });
      } catch (err) {
        console.error("[audit-poll] falha encerrando timeout:", err);
      }
      toast.error("Auditoria expirada", {
        description: "Sem resposta do motor após 15 minutos. O encerramento foi solicitado no servidor.",
      });
      refreshAudit();
      stopPolling(runId);
      return;
    }

    pollTimer.current = setTimeout(() => pollOnce(runId, startedAt, submittedMode), 3_000);
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const submittedMode = mode;
      const result = await fireFn({ data: { mode: submittedMode } });
      return { ...result, submittedMode };
    },
    onSuccess: ({ runId, submittedMode, status }) => {
      if (pollTimer.current) clearTimeout(pollTimer.current);
      const startedAt = new Date().toISOString();
      pollingRun.current = runId;
      setActiveRunId(runId);
      setActiveRunStartedAt(startedAt);
      setIsPolling(status === "running");
      // Substitui imediatamente o cache da run antiga, sem esperar o refetch de 3 s.
      qc.setQueryData(["audit", "active", submittedMode], {
        id: runId,
        created_at: startedAt,
        status,
      });
      refreshAudit();
      if (status === "cancelled") {
        toast.info("Execução substituída", {
          description: "Uma solicitação mais recente já substituiu esta auditoria.",
        });
        stopPolling(runId);
        return;
      }
      toast.info("Auditoria iniciada", {
        description: "Aguardando retorno do motor n8n…",
      });
      pollTimer.current = setTimeout(
        () => pollOnce(runId, new Date(startedAt).getTime(), submittedMode),
        3_000,
      );
    },
    onError: (err: Error) => {
      refreshAudit();
      toast.error("Falha ao disparar auditoria", { description: err.message });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async () => {
      const runId = activeRunId ?? activeQuery.data?.id;
      if (!runId) throw new Error("Nenhuma auditoria em andamento.");
      return cancelFn({ data: { runId, reason: "manual" } });
    },
    onSuccess: (result) => {
      stopPolling(result.runId);
      qc.setQueryData<{ id: string; created_at: string; status: string } | null>(
        ["audit", "active", mode],
        (cached) => (cached?.id === result.runId ? null : cached),
      );
      refreshAudit();
      if (result.status === "cancelled") {
        toast.info("Auditoria cancelada", {
          description: "O Cockpit ignorará qualquer callback tardio desta execução.",
        });
      } else {
        toast.info("Auditoria já encerrada", {
          description: "A execução terminou antes do pedido de cancelamento.",
        });
      }
    },
    onError: (err: Error) => {
      toast.error("Não foi possível cancelar a auditoria", { description: err.message });
    },
  });

  return {
    ...mutation,
    isRunning: mutation.isPending || isPolling || Boolean(activeQuery.data?.id),
    isStarting: mutation.isPending,
    isCancelling: cancelMutation.isPending,
    activeRunId: activeRunId ?? activeQuery.data?.id ?? null,
    activeRunCreatedAt: activeRunId
      ? activeRunStartedAt
      : (activeQuery.data?.created_at ?? null),
    cancel: () => cancelMutation.mutate(),
  };
}
