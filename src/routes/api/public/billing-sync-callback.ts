import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

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
    numero_endosso: z.union([z.string(), z.number()]).optional(),
    numero_parcela: z.union([z.string(), z.number()]).optional(),
    id_parcela: z.union([z.string(), z.number()]).nullish(),
    numero_proposta: z.union([z.string(), z.number()]).nullish(),
    status_pagamento: z.string().max(40).nullish(),
    situacao_emissao: z.string().max(40).nullish(),
    data_vencimento: z.string().max(40).nullish(),
    data_quitacao: z.string().max(60).nullish(),
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

export const Route = createFileRoute("/api/public/billing-sync-callback")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),

      POST: async ({ request }) => {
        // BILLING_CALLBACK_SECRET passa a ser o secret oficial. Durante a troca
        // coordenada, o valor antigo da auditoria continua aceito sem interromper
        // execuções que já estavam em andamento no n8n.
        const acceptedSecrets = [
          process.env.BILLING_CALLBACK_SECRET,
          process.env.AUDIT_CALLBACK_SECRET,
        ].filter((value): value is string => !!value);
        const provided = request.headers.get("x-callback-secret");
        if (!provided || !acceptedSecrets.includes(provided)) {
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
          const docRaw = item.numero_apolice ?? item.documento ?? item.numero_documento;
          if (!docRaw) {
            invalidItems.push({ index, reason: "documento ausente" });
            continue;
          }
          const digits = String(docRaw).replace(/\D/g, "");
          if (digits.length < 12) {
            invalidItems.push({ index, reason: "documento inválido" });
            continue;
          }
          const seq =
            item.numero_endosso != null
              ? String(item.numero_endosso).replace(/\D/g, "").slice(-6).padStart(6, "0")
              : digits.slice(-6);
          // A apólice é sempre gravada com sequencial 000000.
          const apolice = digits.slice(0, -6) + "000000";
          const rawItem = item as Record<string, unknown>;
          const parcelaRaw = valueFrom(rawItem, [
            "numero_parcela",
            "parcela",
            "sequencial_parcela",
            "numeroParcela",
            "parcela_numero",
          ]);
          const idParcela = identityText(
            valueFrom(rawItem, ["id_parcela", "parcela_id", "idParcela", "codigo_parcela"]),
          );
          const numeroProposta = identityText(item.numero_proposta);
          const dataVencimento = toDateOnly(item.data_vencimento);
          // Proposta + vencimento é apenas fallback para APIs antigas que ainda
          // não expõem um sequencial; nunca voltamos a agrupar só por endosso.
          const numeroParcela =
            identityText(parcelaRaw) ??
            idParcela ??
            (numeroProposta && dataVencimento ? `${numeroProposta}@${dataVencimento}` : null);
          if (!numeroParcela) {
            invalidItems.push({ index, reason: "identidade da parcela ausente" });
            continue;
          }
          const row: Row = {
            numero_apolice: apolice,
            numero_endosso: seq,
            numero_parcela: numeroParcela,
            id_parcela_seguradora: idParcela,
            numero_proposta: numeroProposta,
            status_pagamento: (item.status_pagamento ?? "").trim() || "Aberta",
            situacao_emissao: (item.situacao_emissao ?? "").trim() || "Ativa",
            data_vencimento: dataVencimento,
            data_quitacao: toTimestamp(item.data_quitacao),
            updated_at: new Date().toISOString(),
          };
          byKey.set(`${apolice}#${seq}#${numeroParcela}`, row);
        }

        const rows = [...byKey.values()];
        const { markSyncLeg } = await import("@/lib/sync-legs.server");

        if (invalidItems.length > 0) {
          await markSyncLeg(runId, "cobrancas", {
            status: "error",
            total: 0,
            errorMessage: `Cobranças: ${invalidItems.length} parcela(s) sem identidade válida`,
          });
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
          await markSyncLeg(runId, "cobrancas", { status: "success", total: 0 });
          return json({ ok: true, upserted: 0 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        let upserted = 0;
        for (let i = 0; i < rows.length; i += 500) {
          const chunk = rows.slice(i, i + 500);
          const { error } = await supabaseAdmin.from("policy_billing").upsert(chunk as never, {
            onConflict: "numero_apolice,numero_endosso,numero_parcela",
          });
          if (error) {
            console.error("[billing-sync-callback] upsert falhou", error.message);
            await markSyncLeg(runId, "cobrancas", {
              status: "error",
              total: upserted,
              errorMessage: `Cobranças: ${error.message}`,
            });
            return json({ error: error.message, upserted }, 500);
          }
          upserted += chunk.length;
        }

        await markSyncLeg(runId, "cobrancas", { status: "success", total: upserted });

        return json({ ok: true, received: parsed.data.length, upserted });
      },
    },
  },
});
