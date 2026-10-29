import { z } from "zod";

// Existing callback contract, unchanged. Kept pure for route/dispatcher integration tests.
export const CallbackPayloadSchema = z.object({
  run_id: z.string().uuid().optional(),
  status: z.string().optional(),
  error: z.string().optional(),
  error_message: z.string().optional(),
  data_auditoria: z.string().optional(),
  resumo: z
    .object({
      aprovados: z.coerce.number().optional().default(0),
      reprovados: z.coerce.number().optional().default(0),
      total_processado: z.coerce.number().optional().default(0),
    })
    .optional(),
  status_geral: z.string().optional(),
  mensagem_geral: z.string().optional(),
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
});
