import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { dedupeBillingRecords, type BillingRecord } from "@/lib/billing/status";

const COLS =
  "numero_apolice, numero_endosso, numero_parcela, id_parcela_seguradora, numero_proposta, status_pagamento, situacao_emissao, data_quitacao, data_vencimento, updated_at";

/** Parcelas de cobrança de uma apólice. */
export const getPolicyBilling = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { numero: string }) => d)
  .handler(async ({ data, context }) => {
    const { data: rows, error } = await context.supabase
      .from("policy_billing")
      .select(COLS)
      .eq("numero_apolice", data.numero)
      .order("numero_endosso", { ascending: true })
      .order("numero_parcela", { ascending: true });
    if (error) throw new Error(error.message);
    return dedupeBillingRecords((rows ?? []) as BillingRecord[]);
  });

/** Todas as cobranças — usado para mostrar a tag vigente na listagem da carteira. */
export const getBillingIndex = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const rows: BillingRecord[] = [];
    const pageSize = 1_000;
    for (let from = 0; ; from += pageSize) {
      const { data, error } = await context.supabase
        .from("policy_billing")
        .select(COLS)
        .order("numero_apolice", { ascending: true })
        .order("numero_endosso", { ascending: true })
        .order("numero_parcela", { ascending: true })
        .range(from, from + pageSize - 1);
      if (error) throw new Error(error.message);
      const page = (data ?? []) as BillingRecord[];
      rows.push(...page);
      if (page.length < pageSize) break;
    }
    return dedupeBillingRecords(rows);
  });
