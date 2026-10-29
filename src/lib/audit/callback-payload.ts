import { z } from "zod";

// Numeric strings remain compatible with legacy n8n; booleans/null/empty are not counts.
const CountSchema = z.preprocess(
  (value) => (typeof value === "string" && value.trim() ? Number(value) : value),
  z.number().int().nonnegative().safe(),
);

export const CallbackPayloadSchema = z
  .object({
    run_id: z.string().uuid().optional(),
    status: z.string().optional(),
    error: z.string().optional(),
    error_message: z.string().optional(),
    data_auditoria: z.string().optional(),
    audit_contract_version: z.literal(2).optional(),
    exclusions_snapshot_at: z.string().datetime().optional(),
    resumo: z
      .object({
        aprovados: CountSchema.optional().default(0),
        reprovados: CountSchema.optional().default(0),
        total_processado: CountSchema.optional().default(0),
        total_candidatas: CountSchema.optional(),
        total_excluidas: CountSchema.optional(),
        total_ignoradas: CountSchema.optional(),
        achados_dispensados: CountSchema.optional(),
      })
      .optional(),
    status_geral: z.string().optional(),
    mensagem_geral: z.string().optional(),
    apolices_ignoradas: z
      .array(
        z.object({
          apolice: z.string().trim().min(1),
          motivo: z.string().trim().min(1),
        }),
      )
      .optional(),
    apolices_com_erro: z
      .array(
        z.object({
          apolice: z.string(),
          total_erros: z.number().optional().default(0),
          erros: z
            .array(
              z
                .object({
                  tipo_erro: z.string(),
                  endosso: z.string().optional().nullable(),
                  dataInicio: z.string().optional().nullable(),
                  dataFim: z.string().optional().nullable(),
                })
                .passthrough(),
            )
            .optional()
            .default([]),
        }),
      )
      .optional()
      .default([]),
  })
  .superRefine((payload, ctx) => {
    // A technical failure may carry diagnostic counters from an interrupted engine.
    if (payload.status === "error" || payload.error || payload.error_message) return;
    const add = (message: string, path: (string | number)[]) =>
      ctx.addIssue({ code: z.ZodIssueCode.custom, message, path });
    const summary = payload.resumo;
    if (summary) {
      if (summary.aprovados + summary.reprovados !== summary.total_processado)
        add("Aprovadas e reprovadas devem somar as efetivamente auditadas.", ["resumo"]);
      if (
        summary.total_candidatas !== undefined &&
        summary.total_excluidas !== undefined &&
        summary.total_ignoradas !== undefined &&
        summary.total_processado + summary.total_excluidas + summary.total_ignoradas !==
          summary.total_candidatas
      )
        add("Auditadas, excluídas e ignoradas devem somar as candidatas.", ["resumo"]);
      if ((summary.total_ignoradas ?? 0) > 0 && payload.status_geral !== "PARCIAL")
        add("Apólices ignoradas exigem resultado PARCIAL.", ["status_geral"]);
      if (
        payload.apolices_ignoradas &&
        summary.total_ignoradas !== undefined &&
        payload.apolices_ignoradas.length !== summary.total_ignoradas
      )
        add("Lista de ignoradas divergente da contagem declarada.", ["apolices_ignoradas"]);
    }
    const ignored = new Set<string>();
    for (const [index, policy] of (payload.apolices_ignoradas ?? []).entries()) {
      if (ignored.has(policy.apolice))
        add("Apólice ignorada duplicada.", ["apolices_ignoradas", index]);
      ignored.add(policy.apolice);
    }
    if (ignored.size > 0 && payload.status_geral !== "PARCIAL")
      add("Lista de ignoradas exige resultado PARCIAL.", ["status_geral"]);
    for (const policy of payload.apolices_com_erro) {
      if (ignored.has(policy.apolice))
        add("Apólice ignorada não pode ser reprovada.", ["apolices_com_erro"]);
    }
    if (payload.audit_contract_version === 2) {
      const rejected = new Set<string>();
      for (const policy of payload.apolices_com_erro) {
        if (!policy.apolice.trim() || rejected.has(policy.apolice) || policy.erros.length === 0)
          add("Lista v2 de reprovadas contém apólice vazia, duplicada ou sem achados.", [
            "apolices_com_erro",
          ]);
        rejected.add(policy.apolice);
      }
      if (summary && rejected.size !== summary.reprovados)
        add("Quantidade de apólices reprovadas diverge dos achados v2.", ["apolices_com_erro"]);
    }
  });
