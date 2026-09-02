import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { JsonRecord } from "@/lib/excelsior/motor-sync.core";
import {
  buildRepasseWorkbook,
  filterEligibleBillingItems,
  repasseBillingDocumentNumber,
  repasseSourceRow,
} from "@/lib/repasse-map/core";
import type {
  RepasseGenerationResult,
  RepasseWorkbook,
  RepasseXlsxExport,
} from "@/lib/repasse-map/types";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

const periodSchema = z.object({ start: isoDate, end: isoDate }).superRefine((value, context) => {
  if (value.start > value.end) {
    context.addIssue({
      code: "custom",
      path: ["end"],
      message: "A data final deve ser posterior à inicial.",
    });
  }
});

const cellValueSchema = z.union([z.string().max(10_000), z.number().finite(), z.null()]);
const workbookSchema = z.object({
  period: periodSchema,
  generatedAt: z.string().datetime(),
  sourceRows: z.number().int().min(0).max(50_000),
  sheets: z
    .array(
      z.object({
        id: z.enum(["summary", "analytic", "rules"]),
        name: z.string().min(1).max(31),
        columnWidths: z.array(z.number().positive().max(200)).max(32),
        rows: z
          .array(
            z
              .array(
                z.object({
                  value: cellValueSchema,
                  formula: z.string().max(250).optional(),
                }),
              )
              .max(32),
          )
          .max(50_002),
      }),
    )
    .length(3),
});

const expectedSheets = new Map([
  ["summary", "Capa_Resumo"],
  ["analytic", "Analitico_Dados"],
  ["rules", "Regras do Contrato2025"],
]);

const safeTemplateFormulas = new Set([
  "SUM(Analitico_Dados!I3:I1048576)",
  "C7*D8*-1",
  "$C$7-($C$8*-1)",
  "C9",
  "C12*0.35*-1",
  "($C$9*0.2) * -1",
  "SUM(C13:C14)*-1",
  "SUM(D12:D14)",
  "C15*0.0465*-1",
  "C15+C16",
  "C9*D21*-1",
  "8333.33-(C21*-1)",
  "(C21*-1)+C22",
  "(C9)-(C15)-(C21*-1)+ C29",
  "$C$26*0.1",
  "$C$26*0.9",
  "SUM(Analitico_Dados!J3:J1048576)",
  "(C16*-1)+C23+C26",
]);

function validatedWorkbook(input: RepasseWorkbook) {
  const parsed = workbookSchema.parse(input) as RepasseWorkbook;
  const seen = new Set<string>();
  for (const sheet of parsed.sheets) {
    if (seen.has(sheet.id) || expectedSheets.get(sheet.id) !== sheet.name) {
      throw new Error("Estrutura de abas inválida para o Mapa de Repasses.");
    }
    seen.add(sheet.id);
    for (const row of sheet.rows) {
      for (const item of row) {
        if (item.formula && !safeTemplateFormulas.has(item.formula)) {
          throw new Error("A exportação contém uma fórmula não reconhecida pelo modelo.");
        }
      }
    }
  }
  return parsed;
}

async function mapWithConcurrency<T, R>(
  values: T[],
  concurrency: number,
  mapper: (value: T) => Promise<R>,
) {
  const results = new Array<R>(values.length);
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(concurrency, Math.max(values.length, 1)) }, async () => {
      while (cursor < values.length) {
        const index = cursor++;
        results[index] = await mapper(values[index]!);
      }
    }),
  );
  return results;
}

export const generateRepasseMap = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: { start: string; end: string }) => periodSchema.parse(input))
  .handler(async ({ data }): Promise<RepasseGenerationResult> => {
    const { ExcelsiorMotorClient } = await import("@/lib/excelsior/motor-client.server");
    const client = new ExcelsiorMotorClient();
    const billingResponse = await client.listSettledBilling(data.start, data.end);
    const filtered = filterEligibleBillingItems(billingResponse, data.start, data.end);
    const documents = [
      ...new Set(
        filtered.eligible
          .map((item) => repasseBillingDocumentNumber(item))
          .filter((value): value is string => !!value),
      ),
    ];
    const warnings: string[] = [];
    const documentResponses = await mapWithConcurrency(documents, 6, async (document) => {
      try {
        return [document, await client.getIssuanceDocument(document)] as const;
      } catch (error) {
        warnings.push(
          `${document}: data de emissão indisponível (${error instanceof Error ? error.message : String(error)}).`,
        );
        return [document, null] as const;
      }
    });
    const emissions = new Map<string, unknown>(documentResponses);
    const rows = filtered.eligible.flatMap((item: JsonRecord) => {
      const document = repasseBillingDocumentNumber(item);
      const mapped = repasseSourceRow(item, document ? emissions.get(document) : null);
      return mapped ? [mapped] : [];
    });

    return {
      workbook: buildRepasseWorkbook(rows, data),
      stats: {
        billingReceived: filtered.received.length,
        settledActiveInPeriod: filtered.eligible.length,
        documentsConsulted: documents.length,
        rowsGenerated: rows.length,
        ignoredOutsidePeriod: filtered.ignoredOutsidePeriod,
        ignoredInactiveOrUnsettled: filtered.ignoredInactiveOrUnsettled,
      },
      warnings,
    };
  });

function safeFilenameDate(value: string) {
  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year.slice(-2)}`;
}

export const exportRepasseMapXlsx = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: { workbook: RepasseWorkbook }) => ({
    workbook: validatedWorkbook(input.workbook),
  }))
  .handler(async ({ data }): Promise<RepasseXlsxExport> => {
    const { createRepasseXlsx } = await import("@/lib/repasse-map/xlsx.server");
    const buffer = await createRepasseXlsx(data.workbook);
    return {
      filename: `Mapa de Repasses - ${safeFilenameDate(data.workbook.period.start)} a ${safeFilenameDate(data.workbook.period.end)}.xlsx`,
      mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      base64: buffer.toString("base64"),
    };
  });
