import { queryOptions, useQuery } from "@tanstack/react-query";
import { getAnalyticsAggregates } from "@/lib/analytics.functions";

export const analyticsAggregatesQuery = (delinquencyDays = 10) =>
  queryOptions({
    queryKey: ["analytics", "aggregates", delinquencyDays] as const,
    queryFn: () => getAnalyticsAggregates({ data: { delinquencyDays } }),
    staleTime: 60_000,
  });

export function useAnalyticsAggregates(delinquencyDays = 10) {
  return useQuery(analyticsAggregatesQuery(delinquencyDays));
}
