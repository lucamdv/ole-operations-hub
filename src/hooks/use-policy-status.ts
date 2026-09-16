import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { billingIndexQuery } from "@/hooks/use-billing";
import {
  derivePolicyStatus,
  type PolicyEndorsementSignal,
  type PolicyStatusInfo,
} from "@/lib/policies/status";

interface PolicyStatusSource {
  numero_apolice: string;
  endorsements: PolicyEndorsementSignal[];
}

export function usePolicyStatusMap(
  policies: PolicyStatusSource[] | undefined,
  delinquencyAfterDays: number,
) {
  const query = useQuery(billingIndexQuery);
  const infoMap = useMemo(() => {
    const billingByPolicy = new Map<string, NonNullable<typeof query.data>>();
    for (const record of query.data ?? []) {
      const list = billingByPolicy.get(record.numero_apolice);
      if (list) list.push(record);
      else billingByPolicy.set(record.numero_apolice, [record]);
    }

    const map = new Map<string, PolicyStatusInfo>();
    for (const policy of policies ?? []) {
      map.set(
        policy.numero_apolice,
        derivePolicyStatus(billingByPolicy.get(policy.numero_apolice) ?? [], policy.endorsements, {
          delinquencyAfterDays,
        }),
      );
    }
    return map;
  }, [query.data, policies, delinquencyAfterDays]);

  return { infoMap, isLoading: query.isLoading };
}
