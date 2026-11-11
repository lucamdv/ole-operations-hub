import { z } from "zod";
import { dedupeBillingRecords, type BillingRecord } from "../billing/status.ts";
import { policyEndorsementSignal } from "../excelsior/translate.ts";
import {
  derivePolicyStatus,
  type PolicyEndorsementSignal,
  type PolicyStatus,
} from "../policies/status.ts";

const PolicyNumberSchema = z.string().trim().min(1).max(120);
const ErrorTypeSchema = z.string().trim().min(1).max(200);
const ExcludedPolicySchema = z
  .object({
    apolice: PolicyNumberSchema,
    status: z.enum(["CANCELADA", "SUSPENSA"]),
    motivo: z.string(),
  })
  .strict();
const SpecificExceptionSchema = z
  .object({
    apolice: PolicyNumberSchema,
    tipo_erro: ErrorTypeSchema,
    motivo: z.string().nullable(),
  })
  .strict();
export const AuditCandidateNumberSchema = z.string().regex(/^\d+$/).max(120);
export const DispensedPolicySchema = z
  .object({
    apolice: AuditCandidateNumberSchema,
    motivo: z.string().nullable(),
    origem: z.literal("EXCECAO_INTEGRAL"),
  })
  .strict();

const AuditTriggerV2Schema = z
  .object({
    run_id: z.string().uuid(),
    callback_url: z.string().url(),
    trigger: z.string(),
    mode: z.literal("async_callback"),
    status_geral: z.literal("PROCESSANDO"),
    mensagem_geral: z.literal("Auditoria em processamento."),
    resumo: z
      .object({ aprovados: z.literal(0), reprovados: z.literal(0), total_processado: z.literal(0) })
      .strict(),
    apolices_com_erro: z.array(z.never()).length(0),
    at: z.string().datetime(),
    audit_contract_version: z.literal(2),
    exclusions_snapshot_at: z.string().datetime(),
    apolices_excluidas: z.array(ExcludedPolicySchema),
    excecoes_especificas: z.array(SpecificExceptionSchema),
  })
  .strict();

const AuditTriggerV3Schema = AuditTriggerV2Schema.extend({
  audit_contract_version: z.literal(3),
  apolices_dispensadas: z.array(DispensedPolicySchema),
});

export const AuditTriggerPayloadSchema = z
  .discriminatedUnion("audit_contract_version", [AuditTriggerV2Schema, AuditTriggerV3Schema])
  .superRefine((payload, ctx) => {
    if (payload.audit_contract_version !== 3) return;
    const used = new Set(payload.apolices_excluidas.map((entry) => entry.apolice));
    for (const [index, entry] of payload.apolices_dispensadas.entries()) {
      if (used.has(entry.apolice)) {
        ctx.addIssue({
          code: "custom",
          path: ["apolices_dispensadas", index, "apolice"],
          message: "Apólice dispensada duplicada ou já excluída por status.",
        });
      }
      used.add(entry.apolice);
    }
  });

export type AuditTriggerPayload = z.infer<typeof AuditTriggerPayloadSchema>;
export interface AuditIgnoreSource {
  id: string;
  scope: string;
  apolice: unknown;
  tipo_erro: unknown;
  motivo: unknown;
}
export interface AuditExclusionsInput {
  policies: Array<{ numero_apolice: string }>;
  endorsements: Array<{ numero_apolice: string; numero_endosso?: string; proposta: unknown }>;
  billing: BillingRecord[];
  ignores: AuditIgnoreSource[];
  referenceAt: string;
  delinquencyAfterDays?: number;
}
export interface AuditExclusionsSnapshot {
  exclusions_snapshot_at: string;
  apolices_excluidas: AuditTriggerPayload["apolices_excluidas"];
  apolices_dispensadas: Array<z.infer<typeof DispensedPolicySchema>>;
  excecoes_especificas: AuditTriggerPayload["excecoes_especificas"];
  diagnostics: {
    duplicatePolicies: number;
    duplicateSpecificExceptions: number;
    invalidSpecificExceptions: number;
    historicalWholePolicyIgnores: Array<{
      apolice: string;
      operationalStatus: PolicyStatus | null;
      motivo: string | null;
    }>;
  };
}

const compare = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);
const reason = (value: unknown) =>
  typeof value === "string" && value.trim() ? value.trim() : null;

/** Pure snapshot: status rules remain owned by derivePolicyStatus. */
export function buildAuditExclusions(input: AuditExclusionsInput): AuditExclusionsSnapshot {
  const billingByPolicy = new Map<string, BillingRecord[]>();
  for (const row of dedupeBillingRecords(input.billing)) {
    const rows = billingByPolicy.get(row.numero_apolice) ?? [];
    rows.push(row);
    billingByPolicy.set(row.numero_apolice, rows);
  }
  const signalsByPolicy = new Map<string, PolicyEndorsementSignal[]>();
  for (const row of input.endorsements) {
    const signals = signalsByPolicy.get(row.numero_apolice) ?? [];
    signals.push(policyEndorsementSignal(row));
    signalsByPolicy.set(row.numero_apolice, signals);
  }
  const statuses = new Map<string, PolicyStatus>();
  for (const policy of input.policies) {
    const number = PolicyNumberSchema.parse(policy.numero_apolice);
    statuses.set(
      number,
      derivePolicyStatus(billingByPolicy.get(number) ?? [], signalsByPolicy.get(number) ?? [], {
        referenceAt: input.referenceAt,
        delinquencyAfterDays: input.delinquencyAfterDays,
      }).status,
    );
  }
  const apolices_excluidas: AuditTriggerPayload["apolices_excluidas"] = [];
  for (const [apolice, status] of [...statuses].sort(([a], [b]) => compare(a, b))) {
    if (status === "CANCELADA" || status === "SUSPENSA") {
      apolices_excluidas.push({ apolice, status, motivo: `Status operacional: ${status}` });
    }
  }
  const diagnostics: AuditExclusionsSnapshot["diagnostics"] = {
    duplicatePolicies: input.policies.length - statuses.size,
    duplicateSpecificExceptions: 0,
    invalidSpecificExceptions: 0,
    historicalWholePolicyIgnores: [],
  };
  const specific = new Map<string, AuditTriggerPayload["excecoes_especificas"][number]>();
  const dispensed = new Map<string, AuditExclusionsSnapshot["apolices_dispensadas"][number]>();
  // The lowest id wins duplicate pairs; deterministic even if source order changes.
  for (const row of [...input.ignores].sort((a, b) => compare(a.id, b.id))) {
    const apolice = PolicyNumberSchema.safeParse(row.apolice);
    if (row.scope === "apolice") {
      if (!apolice.success) continue;
      const number = apolice.data;
      const status = statuses.get(number) ?? null;
      const motivo = reason(row.motivo);
      diagnostics.historicalWholePolicyIgnores.push({
        apolice: number,
        operationalStatus: status,
        motivo,
      });
      if (status && status !== "CANCELADA" && status !== "SUSPENSA" && !dispensed.has(number)) {
        const entry = DispensedPolicySchema.safeParse({
          apolice: number,
          motivo,
          origem: "EXCECAO_INTEGRAL",
        });
        if (entry.success) dispensed.set(number, entry.data);
      }
      continue;
    }
    if (row.scope !== "apolice_tipo") continue;
    const type = ErrorTypeSchema.safeParse(row.tipo_erro);
    if (!apolice.success || !type.success) {
      diagnostics.invalidSpecificExceptions++;
      continue;
    }
    const key = JSON.stringify([apolice.data, type.data]);
    if (specific.has(key)) {
      diagnostics.duplicateSpecificExceptions++;
      continue;
    }
    specific.set(key, { apolice: apolice.data, tipo_erro: type.data, motivo: reason(row.motivo) });
  }
  return {
    exclusions_snapshot_at: input.referenceAt,
    apolices_excluidas,
    apolices_dispensadas: [...dispensed.values()].sort((a, b) => compare(a.apolice, b.apolice)),
    excecoes_especificas: [...specific.values()].sort(
      (a, b) => compare(a.apolice, b.apolice) || compare(a.tipo_erro, b.tipo_erro),
    ),
    diagnostics,
  };
}

export function buildAuditTriggerPayload(input: {
  runId: string;
  callbackUrl: string;
  trigger: string;
  at: string;
  snapshot: AuditExclusionsSnapshot;
  version?: 2 | 3;
}): AuditTriggerPayload {
  const version = input.version ?? 2;
  return AuditTriggerPayloadSchema.parse({
    run_id: input.runId,
    callback_url: input.callbackUrl,
    trigger: input.trigger,
    mode: "async_callback",
    status_geral: "PROCESSANDO",
    mensagem_geral: "Auditoria em processamento.",
    resumo: { aprovados: 0, reprovados: 0, total_processado: 0 },
    apolices_com_erro: [],
    at: input.at,
    audit_contract_version: version,
    exclusions_snapshot_at: input.snapshot.exclusions_snapshot_at,
    apolices_excluidas: input.snapshot.apolices_excluidas,
    excecoes_especificas: input.snapshot.excecoes_especificas,
    ...(version === 3 ? { apolices_dispensadas: input.snapshot.apolices_dispensadas } : {}),
  });
}
