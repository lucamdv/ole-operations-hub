import { queryOptions, useQuery } from "@tanstack/react-query";
import { getOperationKpis } from "@/lib/kpis.functions";

export const operationKpisQuery = (slaHours = 24) =>
  queryOptions({
    queryKey: ["kpis", "operation", slaHours] as const,
    queryFn: () => getOperationKpis({ data: { slaHours } }),
    staleTime: 60_000,
  });

export function useOperationKpis(slaHours = 24) {
  return useQuery(operationKpisQuery(slaHours));
}
