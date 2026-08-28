import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { requestAuditCorrection } from "@/lib/audit-corrections.functions";

export function useRequestAuditCorrection() {
  const requestFn = useServerFn(requestAuditCorrection);

  return useMutation({
    mutationFn: (input: { run_id: string; finding_ids: string[] }) => requestFn({ data: input }),
    onSuccess: (result) => {
      toast.success("Correção solicitada ao n8n", {
        description: `${result.policies} apólice(s) · ${result.occurrences} ocorrência(s). A conclusão será confirmada pela próxima auditoria.`,
      });
    },
    onError: (error: Error) => {
      toast.error("Falha ao solicitar correção", { description: error.message });
    },
  });
}
