import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import type { Json } from "@/integrations/supabase/types";
import {
  billingPersistenceIdentity,
  normalizeBillingInstallmentNumber,
  shouldApplyBillingStatus,
} from "@/lib/excelsior/motor-sync.core";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-callback-secret",
  "Access-Control-Max-Age": "86400",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

/** Um registro de cobrança devolvido pelo MOTOR OLÉ. */
const ItemSchema = z
  .object({
    numero_apolice: z.string().min(6).max(60).optional(),
    documento: z.string().min(6).max(60).optional(),
    numero_documento: z.string().min(6).max(60).optional(),
    apolice: z.string().min(6).max(60).optional(),
    poliza: z.string().min(6).max(60).optional(),
    numero_endosso: z.union([z.string(), z.number()]).nullish(),
    numero_parcela: z.union([z.string(), z.number()]).optional(),
    id_parcela: z.union([z.string(), z.number()]).nullish(),
    numero_proposta: z.union([z.string(), z.number()]).nullish(),
    status_pagamento: z.string().max(40).nullish(),
    situacao_emissao: z.string().max(40).nullish(),
    data_vencimento: z.string().max(40).nullish(),
    data_quitacao: z.string().max(60).nullish(),
    policy_installment_sequence: z.boolean().optional(),
  })
  .passthrough();

const PayloadSchema = z.array(ItemSchema).max(20_000);

const ENVELOPE_KEYS = [
  "atualizacoes",
  "dados",
  "cobrancas",
  "billing",
  "items",
  "data",
  "results",
] as const;

/** Achata os envelopes aceitos sem deixar arrays aninhados passarem como itens. */
function flattenItems(value: unknown): unknown[] {
  if (Array.isArray(value)) return value.flatMap(flattenItems);
  if (!value || typeof value !== "object") return [value];

  const obj = value as Record<string, unknown>;
  const envelope = ENVELOPE_KEYS.find((key) => Array.isArray(obj[key]));
  return envelope ? flattenItems(obj[envelope]) : [obj];
}

function valueFrom(item: Record<string, unknown>, keys: string[]): unknown {
  for (const key of keys) {
    const value = item[key];
    if (value !== undefined && value !== null && String(value).trim() !== "") return value;
  }
  return null;
}

function identityText(value: unknown): string | null {
  if (value === undefined || value === null) return null;
  const normalized = String(value).trim().replace(/\s+/g, " ").slice(0, 120);
  return normalized || null;
}

/** yyyy-mm-dd a partir de ISO ou dd/mm/yyyy. */
function toDateOnly(v: unknown): string | null {
  if (typeof v !== "string" || !v.trim()) return null;
  const s = v.trim();
  const br = /^(\d{2})\/(\d{2})\/(\d{4})/.exec(s);
  if (br) return `${br[3]}-${br[2]}-${br[1]}`;
  const iso = /^(\d{4}-\d{2}-\d{2})/.exec(s);
  return iso ? iso[1]! : null;
}

function toTimestamp(v: unknown): string | null {
  if (typeof v !== "string" || !v.trim()) return null;
  const d = toDateOnly(v);
  if (/^\d{4}-\d{2}-\d{2}T/.test(v.trim())) return v.trim();
  return d ? `${d}T00:00:00Z` : null;
}

async function handleBillingSyncCallback(
  { request }: { request: Request },
  trustedInternalCall = false,
  finalizeLeg = true,
) {
  // BILLING_CALLBACK_SECRET passa a ser o secret oficial. Durante a troca
  // coordenada, o valor antigo da auditoria continua aceito sem interromper
  // execuções que já estavam em andamento no n8n.
  const acceptedSecrets = [
    process.env.BILLING_CALLBACK_SECRET,
    process.env.AUDIT_CALLBACK_SECRET,
  ].filter((value): value is string => !!value);
  const provided = request.headers.get("x-callback-secret");
  if (!trustedInternalCall && (!provided || !acceptedSecrets.includes(provided))) {
    return json({ error: "Unauthorized" }, 401);
  }

  const runId = new URL(request.url).searchParams.get("run_id");
  if (!runId) return json({ error: "run_id obrigatório" }, 400);

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const candidate = flattenItems(raw);
  const parsed = PayloadSchema.safeParse(candidate);
  if (!parsed.success) {
    const { markSyncLeg } = await import("@/lib/sync-legs.server");
    await markSyncLeg(runId, "cobrancas", {
      status: "error",
      total: 0,
      errorMessage: "Cobranças: payload inválido",
    });
    return json({ error: "Payload inválido", issues: parsed.error.issues }, 400);
  }

  type Row = {
    numero_apolice: string;
    numero_endosso: string;
    numero_parcela: string;
    id_parcela_seguradora: string | null;
    numero_proposta: string | null;
    status_pagamento: string;
    situacao_emissao: string;
    data_vencimento: string | null;
    data_quitacao: string | null;
    updated_at: string;
  };

  const byKey = new Map<string, Row>();
  const invalidItems: Array<{ index: number; reason: string }> = [];
  for (const [index, item] of parsed.data.entries()) {
    const docRaw =
      item.numero_apolice ?? item.apolice ?? item.poliza ?? item.documento ?? item.numero_documento;
    if (!docRaw) {
      invalidItems.push({ index, reason: "documento ausente" });
      continue;
    }
    const digits = String(docRaw).replace(/\D/g, "");
    if (digits.length < 12) {
      invalidItems.push({ index, reason: "documento inválido" });
      continue;
    }
    const rawItem = item as Record<string, unknown>;
    const parcelaRaw = valueFrom(rawItem, [
      "numero_parcela",
      "parcela",
      "sequencial_parcela",
      "numeroParcela",
      "parcela_numero",
      "parcela_ole",
    ]);
    const idParcela = identityText(
      valueFrom(rawItem, [
        "id_parcela",
        "parcela_id",
        "idParcela",
        "codigo_parcela",
        "identificador_pagamento",
        "identificador_pago",
        "identificador_de_pago",
        "id_pagamento",
        "payment_id",
      ]),
    );
    const numeroProposta = identityText(item.numero_proposta);
    const dataVencimento = toDateOnly(item.data_vencimento);
    // Proposta + vencimento é apenas fallback para APIs antigas que ainda
    // não expõem um sequencial; nunca voltamos a agrupar só por endosso.
    const parcelaText = identityText(parcelaRaw);
    const numeroParcela =
      (parcelaText && parcelaText === idParcela
        ? idParcela
        : normalizeBillingInstallmentNumber(parcelaText)) ??
      idParcela ??
      (numeroProposta && dataVencimento ? `${numeroProposta}@${dataVencimento}` : null);
    if (!numeroParcela) {
      invalidItems.push({ index, reason: "identidade da parcela ausente" });
      continue;
    }
    const identity = billingPersistenceIdentity({
      numero_documento: String(docRaw),
      numero_endosso: item.numero_endosso == null ? null : String(item.numero_endosso),
      numero_parcela: numeroParcela,
      policy_installment_sequence: item.policy_installment_sequence === true,
    });
    if (!identity) {
      invalidItems.push({ index, reason: "identidade do documento inválida" });
      continue;
    }
    const row: Row = {
      numero_apolice: identity.numero_apolice,
      numero_endosso: identity.numero_endosso,
      numero_parcela: identity.numero_parcela,
      id_parcela_seguradora: idParcela,
      numero_proposta: numeroProposta,
      status_pagamento: (item.status_pagamento ?? "").trim() || "Aberta",
      situacao_emissao: (item.situacao_emissao ?? "").trim() || "Ativa",
      data_vencimento: dataVencimento,
      data_quitacao: toTimestamp(item.data_quitacao),
      updated_at: new Date().toISOString(),
    };
    byKey.set(
      `${identity.numero_apolice}#${identity.numero_endosso}#${identity.numero_parcela}`,
      row,
    );
  }

  const rows = [...byKey.values()];
  const { markSyncLeg } = await import("@/lib/sync-legs.server");

  if (invalidItems.length > 0) {
    if (finalizeLeg) {
      await markSyncLeg(runId, "cobrancas", {
        status: "error",
        total: 0,
        errorMessage: `Cobranças: ${invalidItems.length} parcela(s) sem identidade válida`,
      });
    }
    return json(
      {
        error: "Existem parcelas sem documento ou identidade válida",
        received: parsed.data.length,
        invalid: invalidItems.slice(0, 50),
      },
      400,
    );
  }

  if (rows.length === 0) {
    if (finalizeLeg) await markSyncLeg(runId, "cobrancas", { status: "success", total: 0 });
    return json({ ok: true, upserted: 0 });
  }

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const policyNumbers = [...new Set(rows.map((row) => row.numero_apolice))];
  const { data: existingRows, error: existingError } = await supabaseAdmin
    .from("policy_billing")
    .select(
      "id, numero_apolice, numero_endosso, numero_parcela, id_parcela_seguradora, numero_proposta, status_pagamento, situacao_emissao, data_vencimento, data_quitacao, created_at, updated_at",
    )
    .in("numero_apolice", policyNumbers);
  if (existingError) throw existingError;

  const existingByKey = new Map(
    (existingRows ?? []).map((row) => [
      `${row.numero_apolice}#${row.numero_endosso}#${row.numero_parcela}`,
      row,
    ]),
  );
  const meaningfulFields = [
    "id_parcela_seguradora",
    "numero_proposta",
    "status_pagamento",
    "situacao_emissao",
    "data_vencimento",
    "data_quitacao",
  ] as const;
  const changedRows: Row[] = [];
  const legacyIds = new Set<string>();
  const changes: Array<{
    leg: "cobrancas";
    entity_type: "parcela";
    action: "adicionado" | "atualizado";
    numero_apolice: string;
    numero_endosso: string;
    numero_parcela: string;
    numero_documento: string;
    before_data: Json | null;
    after_data: Json;
  }> = [];
  for (const row of rows) {
    const key = `${row.numero_apolice}#${row.numero_endosso}#${row.numero_parcela}`;
    const exact = existingByKey.get(key);
    const legacy = (existingRows ?? []).find(
      (candidate) =>
        candidate.numero_apolice === row.numero_apolice &&
        candidate.numero_endosso === row.numero_endosso &&
        candidate.numero_parcela.toUpperCase() === "LEGACY",
    );
    const previous = exact ?? legacy;
    if (previous && !shouldApplyBillingStatus(previous.status_pagamento, row.status_pagamento)) {
      continue;
    }
    const changed =
      !previous ||
      meaningfulFields.some((field) => (previous[field] ?? null) !== (row[field] ?? null));
    if (!changed) continue;
    changedRows.push(row);
    if (!exact && legacy) legacyIds.add(legacy.id);
    changes.push({
      leg: "cobrancas",
      entity_type: "parcela",
      action: previous ? "atualizado" : "adicionado",
      numero_apolice: row.numero_apolice,
      numero_endosso: row.numero_endosso,
      numero_parcela: row.numero_parcela,
      numero_documento: `${row.numero_apolice.slice(0, -6)}${row.numero_endosso}`,
      before_data: previous ? (previous as unknown as Json) : null,
      after_data: row as unknown as Json,
    });
  }

  let upserted = 0;
  for (let i = 0; i < changedRows.length; i += 500) {
    const chunk = changedRows.slice(i, i + 500);
    const { error } = await supabaseAdmin.from("policy_billing").upsert(chunk as never, {
      onConflict: "numero_apolice,numero_endosso,numero_parcela",
    });
    if (error) {
      console.error("[billing-sync-callback] upsert falhou", error.message);
      if (finalizeLeg) {
        await markSyncLeg(runId, "cobrancas", {
          status: "error",
          total: upserted,
          errorMessage: `Cobranças: ${error.message}`,
        });
      }
      return json({ error: error.message, upserted }, 500);
    }
    upserted += chunk.length;
  }

  if (legacyIds.size > 0) {
    const { error } = await supabaseAdmin
      .from("policy_billing")
      .delete()
      .in("id", [...legacyIds]);
    if (error) throw error;
  }

  const { recordSyncChanges, refreshSyncRunCounters } =
    await import("@/lib/policy-sync-audit.server");
  await recordSyncChanges(runId, changes);
  await refreshSyncRunCounters(runId);

  if (finalizeLeg) {
    await markSyncLeg(runId, "cobrancas", { status: "success", total: upserted });
  }

  return json({
    ok: true,
    received: parsed.data.length,
    upserted,
    unchanged: rows.length - upserted,
  });
}

/** Persiste parcelas sem uma chamada HTTP intermediária dentro da aplicação. */
export async function persistBillingSyncPayload(
  runId: string,
  payload: unknown,
  options: { finalizeLeg?: boolean } = {},
) {
  const response = await handleBillingSyncCallback(
    {
      request: new Request(
        `https://internal.invalid/api/public/billing-sync-callback?run_id=${encodeURIComponent(runId)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      ),
    },
    true,
    options.finalizeLeg ?? true,
  );
  const body = (await response.json()) as Record<string, unknown>;
  if (!response.ok) {
    throw new Error(String(body.error ?? "Falha ao persistir cobranças."));
  }
  return body;
}

export const Route = createFileRoute("/api/public/billing-sync-callback")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      POST: (context) => handleBillingSyncCallback(context),
    },
  },
});
