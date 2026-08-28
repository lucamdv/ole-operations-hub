import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { requestAuditCorrection } from "@/lib/audit-corrections.functions";
import { useWebhookMode } from "@/hooks/use-webhook-mode";

export function useRequestAuditCorrection() {
  const requestFn = useServerFn(requestAuditCorrection);
  const { mode } = useWebhookMode();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: { run_id: string; finding_ids: string[] }) =>
      requestFn({ data: { ...input, mode } }),
    onSuccess: async (result) => {
      toast.success("Correção solicitada ao n8n", {
        description: `${result.policies} apólice(s) · ${result.occurrences} ocorrência(s) · ${result.groups} grupo(s). A conclusão será confirmada pela próxima auditoria.`,
      });
      if (!result.trackingRecorded) {
        toast.warning("Primeira resposta não registrada na KPI", {
          description:
            "A solicitação foi aceita pelo n8n, mas o histórico da KPI precisa ser verificado.",
        });
      }
      await queryClient.invalidateQueries({ queryKey: ["kpis", "operation"] });
    },
    onError: (error: Error) => {
      toast.error("Falha ao solicitar correção", { description: error.message });
    },
  });
}
