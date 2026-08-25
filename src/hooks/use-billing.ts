import { useMemo } from "react";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getBillingIndex, getPolicyBilling } from "@/lib/billing.functions";
import {
  billingTag,
  currentBilling,
  normalizeBillingEndosso,
  type BillingRecord,
  type BillingTag,
} from "@/lib/billing/status";

export const billingIndexQuery = queryOptions({
  queryKey: ["billing", "index"] as const,
  queryFn: () => getBillingIndex(),
  staleTime: 60_000,
});

/** Parcelas de uma apólice, ordenadas por endosso e parcela. */
export function usePolicyBilling(numero: string | undefined) {
  const query = useQuery({
    queryKey: ["billing", "policy", numero] as const,
    queryFn: () => getPolicyBilling({ data: { numero: numero! } }),
    enabled: !!numero,
    staleTime: 60_000,
  });

  const rows = useMemo<BillingRecord[]>(() => {
    const list = query.data ?? [];
    return [...list].sort((a, b) => {
      const endorsement =
        (parseInt(a.numero_endosso.replace(/\D/g, ""), 10) || 0) -
        (parseInt(b.numero_endosso.replace(/\D/g, ""), 10) || 0);
      if (endorsement !== 0) return endorsement;
      return (
        (parseInt(a.numero_parcela.replace(/\D/g, ""), 10) || 0) -
        (parseInt(b.numero_parcela.replace(/\D/g, ""), 10) || 0)
      );
    });
  }, [query.data]);

  const vigente = useMemo(() => currentBilling(rows), [rows]);

  return { ...query, rows, vigente };
}

/** Cobrança operacional vigente dentro de um endosso específico. */
export function useEndorsementBilling(numero: string | undefined, endosso: string | undefined) {
  const { rows, isLoading } = usePolicyBilling(numero);
  const seq = endosso ? normalizeBillingEndosso(endosso) : null;
  const record = useMemo(() => {
    if (!seq) return null;
    return currentBilling(rows.filter((r) => normalizeBillingEndosso(r.numero_endosso) === seq));
  }, [rows, seq]);
  return { record, isLoading };
}

export interface BillingInfo {
  tag: BillingTag;
  situacaoEmissao: string;
  statusPagamento: string;
  dataVencimento: string | null;
  dataQuitacao: string | null;
}

/** Mapa apólice → cobrança vigente (tag + campos), para a listagem da carteira. */
export function useBillingTagMap() {
  const query = useQuery(billingIndexQuery);
  const { map, infoMap } = useMemo(() => {
    const byPolicy = new Map<string, BillingRecord[]>();
    for (const r of query.data ?? []) {
      const list = byPolicy.get(r.numero_apolice);
      if (list) list.push(r);
      else byPolicy.set(r.numero_apolice, [r]);
    }
    const out = new Map<string, BillingTag>();
    const info = new Map<string, BillingInfo>();
    for (const [ap, list] of byPolicy) {
      const cur = currentBilling(list);
      if (!cur) continue;
      const tag = billingTag(cur.status_pagamento, cur.situacao_emissao);
      out.set(ap, tag);
      info.set(ap, {
        tag,
        situacaoEmissao: cur.situacao_emissao ?? "",
        statusPagamento: cur.status_pagamento ?? "",
        dataVencimento: cur.data_vencimento,
        dataQuitacao: cur.data_quitacao,
      });
    }
    return { map: out, infoMap: info };
  }, [query.data]);
  return { map, infoMap, isLoading: query.isLoading };
}
