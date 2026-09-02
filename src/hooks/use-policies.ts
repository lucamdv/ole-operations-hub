import { useWebhookMode } from "@/hooks/use-webhook-mode";
import { useEffect, useRef, useState } from "react";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  cancelPolicySync,
  getEndorsement,
  getLatestPolicySync,
  getPolicySyncDetails,
  getPolicies,
  getPolicyByNumero,
  getPolicySyncStatus,
  runPolicySync,
} from "@/lib/policies.functions";

export const policiesQuery = queryOptions({
  queryKey: ["policies", "list"] as const,
  queryFn: () => getPolicies(),
  staleTime: 30_000,
});

export const latestPolicySyncQuery = queryOptions({
  queryKey: ["policies", "latest-sync"] as const,
  queryFn: () => getLatestPolicySync(),
  staleTime: 30_000,
});

export function usePolicies() {
  return useQuery(policiesQuery);
}

export function useLatestPolicySync() {
  return useQuery(latestPolicySyncQuery);
}

export function usePolicy(numero: string | undefined) {
  return useQuery({
    queryKey: ["policies", "detail", numero] as const,
    queryFn: () => getPolicyByNumero({ data: { numero: numero! } }),
    enabled: !!numero,
    staleTime: 30_000,
  });
}

export function useEndorsementDetail(numero: string | undefined, endosso: string | undefined) {
  return useQuery({
    queryKey: ["policies", "endorsement", numero, endosso] as const,
    queryFn: () => getEndorsement({ data: { numero: numero!, endosso: endosso! } }),
    enabled: !!numero && !!endosso,
    staleTime: 30_000,
  });
}

export type LegStatus = "running" | "partial" | "success" | "error" | "cancelled";

export function usePolicySyncDetails(runId?: string, enabled = true) {
  return useQuery({
    queryKey: ["policies", "sync-details", runId ?? "latest"] as const,
    queryFn: () => getPolicySyncDetails({ data: { runId } }),
    enabled,
    refetchInterval: (query) => {
      const status = query.state.data?.run.status;
      return status === "running" || status === "partial" ? 10_000 : false;
    },
    staleTime: 5_000,
  });
}

function resolvedLegStatus(runStatus: string, legStatus: string | null | undefined): LegStatus {
  if (legStatus && legStatus !== "running") return legStatus as LegStatus;
  if (runStatus === "success" || runStatus === "error" || runStatus === "cancelled") {
    return runStatus;
  }
  return "running";
}

export function useRunPolicySync() {
  const qc = useQueryClient();
  const fireFn = useServerFn(runPolicySync);
  const { mode } = useWebhookMode();
  const statusFn = useServerFn(getPolicySyncStatus);
  const cancelFn = useServerFn(cancelPolicySync);
  const latestFn = useServerFn(getLatestPolicySync);

  const [activeRunId, setActiveRunId] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [isCheckingSync, setIsCheckingSync] = useState(true);
  const [emissoes, setEmissoes] = useState<LegStatus | null>(null);
  const [cobrancas, setCobrancas] = useState<LegStatus | null>(null);
  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hydrationVersion = useRef(0);

  useEffect(
    () => () => {
      if (pollTimer.current) clearTimeout(pollTimer.current);
    },
    [],
  );

  const stopPolling = () => {
    if (pollTimer.current) {
      clearTimeout(pollTimer.current);
      pollTimer.current = null;
    }
    setIsPolling(false);
    setActiveRunId(null);
  };

  function schedulePoll(runId: string, delayMs: number) {
    if (pollTimer.current) clearTimeout(pollTimer.current);
    pollTimer.current = setTimeout(() => {
      pollTimer.current = null;
      void pollOnce(runId);
    }, delayMs);
  }

  async function pollOnce(runId: string) {
    let nextDelayMs = 5_000;
    try {
      const row = await statusFn({ data: { runId } });
      if (row) {
        setEmissoes(resolvedLegStatus(row.status, row.emissoes_status));
        setCobrancas(resolvedLegStatus(row.status, row.cobrancas_status));
        const oneLegAlreadyFinished =
          row.emissoes_status !== "running" || row.cobrancas_status !== "running";
        if (oneLegAlreadyFinished) nextDelayMs = 10_000;
      }
      if (row?.status === "cancelled") {
        stopPolling();
        return;
      }
      if (row?.status === "success") {
        toast.success("Carteira sincronizada", {
          description: `${row.total_apolices} apólices atualizadas · ${row.cobrancas_total ?? 0} cobranças.`,
        });
        qc.invalidateQueries({ queryKey: ["policies"] });
        qc.invalidateQueries({ queryKey: ["billing"] });
        stopPolling();
        return;
      }
      if (row?.status === "partial") {
        toast.warning("Sincronização concluída com recuperação em background", {
          description: `${row.billing_fallback_total - row.billing_fallback_resolved} consulta(s) continuarão automaticamente até a Excelsior responder.`,
          duration: 15_000,
        });
        qc.invalidateQueries({ queryKey: ["policies"] });
        qc.invalidateQueries({ queryKey: ["billing"] });
        stopPolling();
        return;
      }
      if (row?.status === "error") {
        toast.error("Falha na sincronização", {
          description: row.error_message ?? "Erro desconhecido.",
          duration: 30_000,
        });
        qc.invalidateQueries({ queryKey: ["policies"] });
        qc.invalidateQueries({ queryKey: ["billing"] });
        stopPolling();
        return;
      }
    } catch (err) {
      console.error("[poll] erro consultando status:", err);
    }
    if (document.visibilityState === "hidden") nextDelayMs = Math.max(nextDelayMs, 15_000);
    schedulePoll(runId, nextDelayMs);
  }

  // Recupera o estado persistido da última run. Assim F5, troca de rota ou uma
  // segunda aba não liberam o botão enquanto o backend continua trabalhando.
  useEffect(() => {
    const version = ++hydrationVersion.current;
    setIsCheckingSync(true);
    void latestFn()
      .then((row) => {
        if (hydrationVersion.current !== version) return;
        if (!row) {
          setEmissoes(null);
          setCobrancas(null);
          return;
        }

        setEmissoes(resolvedLegStatus(row.status, row.emissoes_status));
        setCobrancas(resolvedLegStatus(row.status, row.cobrancas_status));
        if (row.status === "running") {
          setActiveRunId(row.id);
          setIsPolling(true);
          schedulePoll(row.id, 0);
        }
      })
      .catch((error) => {
        console.error("[policy-sync] falha ao recuperar execução ativa", error);
      })
      .finally(() => {
        if (hydrationVersion.current === version) setIsCheckingSync(false);
      });

    return () => {
      hydrationVersion.current = version + 1;
    };
    // A recuperação deve acontecer uma única vez por montagem da tela.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mutation = useMutation({
    mutationFn: () => fireFn({ data: { mode } }),
    onMutate: () => {
      setEmissoes("running");
      setCobrancas("running");
    },
    onSuccess: ({ runId, reused }) => {
      setActiveRunId(runId);
      setIsPolling(true);
      setEmissoes("running");
      setCobrancas("running");
      toast.info(reused ? "Sincronização já em andamento" : "Sincronização iniciada", {
        description: "Consultando as APIs da Excelsior…",
      });
      schedulePoll(runId, reused ? 0 : 1_000);
    },
    onError: (err: Error) => {
      setEmissoes("error");
      setCobrancas("error");
      toast.error("Falha ao disparar sincronização", { description: err.message });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async () => {
      if (!activeRunId) return { ok: true };
      return cancelFn({ data: { runId: activeRunId } });
    },
    onSuccess: () => {
      setEmissoes("cancelled");
      setCobrancas("cancelled");
      stopPolling();
      toast.warning("Sincronização cancelada");
    },
    onError: (err: Error) => {
      toast.error("Não foi possível cancelar", { description: err.message });
    },
  });

  return {
    ...mutation,
    isRunning: mutation.isPending || isPolling,
    isCheckingSync,
    activeRunId,
    emissoes,
    cobrancas,
    cancel: () => cancelMutation.mutate(),
    isCancelling: cancelMutation.isPending,
  };
}
