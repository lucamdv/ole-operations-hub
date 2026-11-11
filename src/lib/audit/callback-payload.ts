import { z } from "zod";
import { AuditCandidateNumberSchema, DispensedPolicySchema } from "./trigger-payload.ts";

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
    audit_contract_version: z.union([z.literal(2), z.literal(3)]).optional(),
    exclusions_snapshot_at: z.string().datetime().optional(),
    apolices_candidatas: z.array(AuditCandidateNumberSchema).optional(),
    resumo: z
      .object({
        aprovados: CountSchema.optional().default(0),
        reprovados: CountSchema.optional().default(0),
        total_processado: CountSchema.optional().default(0),
        total_candidatas: CountSchema.optional(),
        total_excluidas: CountSchema.optional(),
        total_dispensadas: CountSchema.optional(),
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
      .optional(),
  })
  .superRefine((payload, ctx) => {
    // A technical failure may carry diagnostic counters from an interrupted engine.
    if (payload.status === "error" || payload.error || payload.error_message) return;
    const add = (message: string, path: (string | number)[]) =>
      ctx.addIssue({ code: z.ZodIssueCode.custom, message, path });
    const summary = payload.resumo;
    const v3 = payload.audit_contract_version === 3;
    const findings = payload.apolices_com_erro ?? [];
    if (v3) {
      if (
        !payload.exclusions_snapshot_at ||
        !payload.apolices_candidatas ||
        !payload.apolices_ignoradas ||
        !payload.apolices_com_erro ||
        !summary ||
        summary.total_candidatas === undefined ||
        summary.total_excluidas === undefined ||
        summary.total_dispensadas === undefined ||
        summary.total_ignoradas === undefined
      )
        add("Resultado v3 exige a identificação do snapshot e a cobertura completa.", ["resumo"]);
      if (
        payload.apolices_candidatas &&
        (new Set(payload.apolices_candidatas).size !== payload.apolices_candidatas.length ||
          payload.apolices_candidatas.length !== summary?.total_candidatas)
      )
        add("Lista de candidatas duplicada ou divergente do total.", ["apolices_candidatas"]);
      if (summary) {
        const expectedStatus =
          (summary.total_ignoradas ?? 0) > 0
            ? "PARCIAL"
            : summary.reprovados > 0
              ? "ALERTA"
              : "SUCESSO";
        if (payload.status_geral !== expectedStatus)
          add("Status geral incompatível com o resultado v3.", ["status_geral"]);
      }
    } else if (
      payload.apolices_candidatas !== undefined ||
      summary?.total_dispensadas !== undefined
    ) {
      add("Candidatas identificadas e dispensas integrais exigem o contrato v3.", [
        "audit_contract_version",
      ]);
    }
    if (summary) {
      if (summary.aprovados + summary.reprovados !== summary.total_processado)
        add("Aprovadas e reprovadas devem somar as efetivamente auditadas.", ["resumo"]);
      if (
        summary.total_candidatas !== undefined &&
        summary.total_excluidas !== undefined &&
        summary.total_ignoradas !== undefined &&
        summary.total_processado +
          summary.total_excluidas +
          (v3 ? (summary.total_dispensadas ?? 0) : 0) +
          summary.total_ignoradas !==
          summary.total_candidatas
      )
        add("A soma da cobertura deve corresponder ao total de candidatas.", ["resumo"]);
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
    for (const policy of findings) {
      if (ignored.has(policy.apolice))
        add("Apólice ignorada não pode ser reprovada.", ["apolices_com_erro"]);
    }
    if (payload.audit_contract_version === 2 || v3) {
      const rejected = new Set<string>();
      for (const policy of findings) {
        if (!policy.apolice.trim() || rejected.has(policy.apolice) || policy.erros.length === 0)
          add("Lista de reprovadas contém apólice vazia, duplicada ou sem achados.", [
            "apolices_com_erro",
          ]);
        rejected.add(policy.apolice);
      }
      if (summary && rejected.size !== summary.reprovados)
        add("Quantidade de apólices reprovadas diverge dos achados.", ["apolices_com_erro"]);
    }
  })
  .transform((payload) => ({ ...payload, apolices_com_erro: payload.apolices_com_erro ?? [] }));

export function validateV3AuditCoverage(
  payload: z.infer<typeof CallbackPayloadSchema>,
  snapshot: Record<string, unknown>,
) {
  const dispensations = z.array(DispensedPolicySchema).safeParse(snapshot.apolices_dispensadas);
  const exclusions = z
    .array(z.object({ apolice: AuditCandidateNumberSchema }))
    .safeParse(snapshot.apolices_excluidas);
  if (
    !dispensations.success ||
    !exclusions.success ||
    !payload.exclusions_snapshot_at ||
    payload.exclusions_snapshot_at !== snapshot.exclusions_snapshot_at ||
    !payload.apolices_candidatas ||
    !payload.resumo
  )
    return null;

  const audited = new Set(payload.apolices_candidatas);
  let excluded = 0;
  let dispensed = 0;
  for (const entry of exclusions.data) if (audited.delete(entry.apolice)) excluded++;
  for (const entry of dispensations.data) if (audited.delete(entry.apolice)) dispensed++;
  if (excluded !== payload.resumo.total_excluidas || dispensed !== payload.resumo.total_dispensadas)
    return null;
  for (const { apolice } of payload.apolices_ignoradas ?? []) {
    if (!audited.delete(apolice)) return null;
  }
  if (
    audited.size !== payload.resumo.total_processado ||
    payload.apolices_com_erro.some(({ apolice }) => !audited.has(apolice))
  )
    return null;
  return audited;
}
