import { queryOptions, useQuery } from "@tanstack/react-query";
import { getOperationKpis } from "@/lib/kpis.functions";
import type { RecurrenceGranularity } from "@/lib/kpis/derive";

export interface RecurrencePeriodInput {
  granularity: RecurrenceGranularity;
  startDate: string;
  endDate: string;
}

export const operationKpisQuery = (slaHours = 24, recurrence?: RecurrencePeriodInput) =>
  queryOptions({
    queryKey: ["kpis", "operation", slaHours, recurrence] as const,
    queryFn: () => getOperationKpis({ data: { slaHours, recurrence } }),
    staleTime: 60_000,
  });

export function useOperationKpis(slaHours = 24, recurrence?: RecurrencePeriodInput) {
  return useQuery(operationKpisQuery(slaHours, recurrence));
}
