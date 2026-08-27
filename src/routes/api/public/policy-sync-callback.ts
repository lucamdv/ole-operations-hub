import { createFileRoute } from "@tanstack/react-router";
import { PolicySyncCallbackSchema } from "@/lib/policies.functions";

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

type JsonMap = Record<string, any>;

const isPlainObject = (value: unknown): value is JsonMap =>
  !!value && typeof value === "object" && !Array.isArray(value);

const hasMeaningfulValue = (value: unknown) =>
  value !== undefined && value !== null && value !== "";

/**
 * Campos que pertencem ao documento específico (apólice/endosso), e não ao
 * estado consolidado da apólice. Um endosso nunca deve sobrescrevê-los no
 * registro principal de `policies`.
 *
 * Importante: `datas` aqui é SOMENTE o objeto de datas no topo da proposta.
 * Datas de coberturas ficam dentro de `itens[].coberturas[].datas` e continuam
 * sendo atualizadas normalmente pelos endossos.
 */
const DOCUMENT_ONLY_ROOT_FIELDS = new Set([
  "datas",
  "data_emissao",
  "motivo_endosso",
  "descricao_motivo_endosso",
  "tipo_cancelamento",
  "numero_endosso_cancelado",
  "numero_documento_seguradora",
  "numero_endosso_seguradora",
  "numero_apolice_seguradora",
  "numero_proposta_seguradora",
  "id_proposta_origem",
]);

function arrayIdentity(item: unknown, field: string): string | null {
  if (!isPlainObject(item)) return null;

  const candidates: Record<string, unknown[]> = {
    partes: [
      item.id_pessoa,
      item.id_pessoa_origem,
      item.numero_documento,
      item.nome_pessoa && item.papel_parte ? `${item.papel_parte}:${item.nome_pessoa}` : null,
    ],
    itens: [item.numero_item, item.id_item, item.id_item_origem],
    coberturas: [item.codigo_cobertura, item.id_cobertura, item.nome_cobertura],
    parcelas: [item.numero_parcela, item.id_parcela],
  };

  for (const value of candidates[field] ?? []) {
    if (hasMeaningfulValue(value)) return String(value);
  }
  return null;
}

/**
 * Faz merge de arrays de entidades conhecidas sem apagar registros que não
 * apareceram em um endosso parcial. Para arrays sem identidade estável, uma
 * lista nova e não vazia substitui a anterior.
 */
function mergeArray(
  base: unknown[],
  incoming: unknown[],
  field: string,
  path: string[],
): unknown[] {
  if (incoming.length === 0) return base;

  const supportsEntityMerge = ["partes", "itens", "coberturas", "parcelas"].includes(field);
  if (!supportsEntityMerge) return incoming;

  const result = [...base];
  const positions = new Map<string, number>();

  result.forEach((item, index) => {
    const id = arrayIdentity(item, field);
    if (id) positions.set(id, index);
  });

  for (const incomingItem of incoming) {
    const id = arrayIdentity(incomingItem, field);
    if (!id) {
      result.push(incomingItem);
      continue;
    }

    const position = positions.get(id);
    if (position === undefined) {
      positions.set(id, result.length);
      result.push(incomingItem);
      continue;
    }

    result[position] = mergeCanonicalValue(result[position], incomingItem, [
      ...path,
      `${field}[${id}]`,
    ]);
  }

  return result;
}

/**
 * Merge orientado à regra de negócio:
 * - valores ausentes no endosso herdam o estado anterior;
 * - objetos parciais são mesclados recursivamente;
 * - entidades como itens/coberturas/partes são mescladas por identidade;
 * - campos exclusivos do documento não contaminam a proposta consolidada.
 */
function mergeCanonicalValue(base: unknown, incoming: unknown, path: string[] = []): unknown {
  if (!hasMeaningfulValue(incoming)) return base;

  if (Array.isArray(incoming)) {
    const baseArray = Array.isArray(base) ? base : [];
    const field = path[path.length - 1] ?? "";
    return mergeArray(baseArray, incoming, field, path.slice(0, -1));
  }

  if (isPlainObject(incoming)) {
    const result: JsonMap = isPlainObject(base) ? { ...base } : {};
    const isRoot = path.length === 0;

    for (const [key, value] of Object.entries(incoming)) {
      if (isRoot && DOCUMENT_ONLY_ROOT_FIELDS.has(key)) continue;

      // Em alguns endossos `pagamento` aparece como metadado textual do motivo
      // do endosso. Só aceitamos `pagamento` no consolidado quando ele realmente
      // é o objeto de pagamento/parcelas da proposta.
      if (isRoot && key === "pagamento" && !isPlainObject(value)) continue;

      result[key] = mergeCanonicalValue(result[key], value, [...path, key]);
    }
    return result;
  }

  return incoming;
}

async function handlePolicySyncCallback(
  { request }: { request: Request },
  trustedInternalCall = false,
) {
  const reqUrl = new URL(request.url);
  const runIdQS = reqUrl.searchParams.get("run_id");
  // Reaproveita AUDIT_CALLBACK_SECRET para não exigir secret novo.
  const expected = process.env.AUDIT_CALLBACK_SECRET;
  const provided = request.headers.get("x-callback-secret");
  if (!trustedInternalCall && (!expected || provided !== expected)) {
    return json({ error: "Unauthorized" }, 401);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  // Normaliza várias formas possíveis vindas do n8n:
  // 1) array cru no topo → trata como `dados`
  // 2) { payload: {...} } ou { body: {...} } → desembrulha
  // 3) { dados | apolices | policies | items | data: [...] } → renomeia para `dados`
  // 4) objeto único de apólice → embrulha em array
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unwrap = (v: any): any => {
    if (!v || typeof v !== "object" || Array.isArray(v)) return v;
    if (v.payload && typeof v.payload === "object") return unwrap(v.payload);
    if (v.body && typeof v.body === "object") return unwrap(v.body);
    if (v.json && typeof v.json === "object") return unwrap(v.json);
    return v;
  };
  let candidate: unknown = unwrap(raw);
  if (Array.isArray(candidate)) {
    candidate = { dados: candidate };
  } else if (candidate && typeof candidate === "object") {
    const obj = candidate as Record<string, unknown>;
    if (!Array.isArray(obj.dados)) {
      const altKey = ["apolices", "policies", "items", "data", "results"].find((k) =>
        Array.isArray(obj[k]),
      );
      if (altKey) {
        obj.dados = obj[altKey];
      } else if (obj.numero_apolice_seguradora || obj.historico_endossos) {
        // Único objeto-apólice; embrulha em array
        candidate = { dados: [obj] };
      }
    }
  }

  const parsed = PolicySyncCallbackSchema.safeParse(candidate);
  if (!parsed.success) {
    // Persiste o raw para debug antes de falhar
    const { supabaseAdmin: sa } = await import("@/integrations/supabase/client.server");
    const runIdEarly = runIdQS;
    if (runIdEarly) {
      await sa
        .from("policy_sync_runs")
        .update({
          status: "error",
          emissoes_status: "error",
          emissoes_finished_at: new Date().toISOString(),
          error_message: "Payload inválido: " + JSON.stringify(parsed.error.issues).slice(0, 500),
          raw: (raw ?? {}) as unknown as Record<string, unknown>,
          finished_at: new Date().toISOString(),
        } as never)
        .eq("id", runIdEarly);
    }
    return json({ error: "Payload inválido", issues: parsed.error.issues }, 400);
  }
  const payload = parsed.data;

  const runId = runIdQS;
  if (!runId) {
    return json({ error: "run_id ausente na query string do callback_url" }, 400);
  }

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: existing, error: fetchErr } = await supabaseAdmin
    .from("policy_sync_runs")
    .select("id, created_at")
    .eq("id", runId)
    .maybeSingle();
  if (fetchErr) return json({ error: fetchErr.message }, 500);
  if (!existing) return json({ error: "run_id not found" }, 404);

  const startedAt = new Date((existing as { created_at: string }).created_at).getTime();
  const durationMs = Date.now() - startedAt;

  const { normalizeEndossoNum, unwrapProposta } = await import("@/lib/excelsior/translate");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pickNum = (o: any): string | undefined => {
    const v = o?.numero_apolice_seguradora ?? o?.numero_apolice ?? o?.numeroApolice ?? undefined;
    return v === undefined || v === null ? undefined : String(v);
  };

  // Extrai o sequencial do endosso de formatos diretos ou do número completo
  // do documento. Respostas da Excelsior podem trazer o número apenas dentro
  // do envelope endosso_A/B/C, por isso também reaproveitamos unwrapProposta.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pickEnd = (o: any): string | null => {
    const direct = o?.numero_endosso_seguradora ?? o?.numero_endosso ?? o?.numeroEndosso ?? null;
    if (direct !== undefined && direct !== null && String(direct).trim() !== "") {
      return String(direct);
    }

    const fullDocument =
      o?.numero_documento_seguradora ?? o?.numero_documento ?? o?.numeroDocumento ?? null;
    if (fullDocument !== undefined && fullDocument !== null) {
      const digits = String(fullDocument).replace(/\D/g, "");
      if (digits.length >= 6) return digits.slice(-6);
    }

    const parsedProposal = unwrapProposta(o?.proposta ?? o);
    if (parsedProposal.numeroDocumento) {
      const digits = parsedProposal.numeroDocumento.replace(/\D/g, "");
      if (digits.length >= 6) return digits.slice(-6);
    }

    return null;
  };

  type FlatEndo = {
    apolice: string;
    num: string;
    seq: number;
    premio: number;
    // Payload bruto do documento; `endorsements` preserva isso integralmente.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    proposta: any;
  };

  // `dados` agora é uma lista plana de endossos novos. Mantemos suporte ao
  // formato antigo (apólice com `historico_endossos` aninhado) expandindo-o.
  const flat: FlatEndo[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const item of payload.dados as Array<Record<string, any>>) {
    const apoliceNum = pickNum(item);
    if (!apoliceNum) continue;

    const historico = Array.isArray(item.historico_endossos)
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item.historico_endossos as Array<Record<string, any>>)
      : null;

    if (historico) {
      for (const [index, e] of historico.entries()) {
        const endRaw = pickEnd(e);
        // O MOTOR legado gera o histórico em ordem 0..N. O índice é somente
        // o último fallback para não colapsar todos os endossos em 000000
        // quando a API não expõe um campo de sequencial reconhecido.
        const num = normalizeEndossoNum(endRaw ?? String(index));
        const isBase = num === "000000";
        const proposta = isBase
          ? {
              ...(e.proposta ?? {}),
              data_emissao: item.data_emissao ?? e.proposta?.data_emissao,
            }
          : (e.proposta ?? {});
        flat.push({
          apolice: pickNum(e) ?? apoliceNum,
          num,
          seq: parseInt(num, 10) || 0,
          premio: Number(e.premio_liquido ?? 0) || 0,
          proposta,
        });
      }
      continue;
    }

    const endRaw = pickEnd(item);
    if (endRaw === null) continue;
    const num = normalizeEndossoNum(endRaw);
    flat.push({
      apolice: apoliceNum,
      num,
      seq: parseInt(num, 10) || 0,
      premio: Number(item.premio_liquido ?? 0) || 0,
      proposta: item.proposta ?? {},
    });
  }

  // Agrupa por apólice e deduplica por (apólice + endosso): um mesmo
  // endosso repetido no payload quebraria o ON CONFLICT DO UPDATE do
  // Postgres ("cannot affect row a second time"). Último item vence.
  const byPolicy = new Map<string, Map<string, FlatEndo>>();
  for (const e of flat) {
    let m = byPolicy.get(e.apolice);
    if (!m) {
      m = new Map<string, FlatEndo>();
      byPolicy.set(e.apolice, m);
    }
    m.set(e.num, e);
  }

  let processed = 0;
  let insertedEndos = 0;

  for (const [numero, endoMap] of byPolicy) {
    const endos = [...endoMap.values()].sort((a, b) => a.seq - b.seq);
    // Endosso de maior sequencial dita qual é o documento atual, mas NÃO
    // substitui sozinho a proposta consolidada da apólice.
    const top = endos[endos.length - 1]!;

    const { data: existingPolicy } = await supabaseAdmin
      .from("policies")
      .select("id, numero_endosso_atual, proposta")
      .eq("numero_apolice", numero)
      .maybeSingle();
    const existingRow = existingPolicy as {
      id: string;
      numero_endosso_atual: string | null;
      proposta: Record<string, unknown> | null;
    } | null;

    const existingSeq = existingRow?.numero_endosso_atual
      ? parseInt(existingRow.numero_endosso_atual.replace(/\D/g, ""), 10) || 0
      : -1;
    const isNewer = top.seq >= existingSeq;
    // Nunca rebaixa o endosso atual da apólice.
    const endossoAtualFinal = isNewer ? top.num : (existingRow?.numero_endosso_atual ?? top.num);

    /*
     * Estado canônico da apólice:
     * 1. Se a emissão 000000 veio no payload, ela é a base preferencial.
     * 2. Em sincronizações incrementais sem 000000, reutilizamos o estado já
     *    consolidado da policy.
     * 3. Aplicamos os endossos em ordem, preenchendo/atualizando apenas os
     *    campos de estado. Campos exclusivos do documento ficam preservados
     *    somente em `endorsements.proposta`.
     */
    const baseDocument = endos.find((e) => e.num === "000000");
    const baseProposal = baseDocument
      ? unwrapProposta(baseDocument.proposta ?? {}).proposta
      : (existingRow?.proposta ?? {});

    let canonicalProposal: unknown = { ...(baseProposal ?? {}) };
    for (const endorsement of endos) {
      if (endorsement.num === "000000") continue;
      const endorsementProposal = unwrapProposta(endorsement.proposta ?? {}).proposta;
      canonicalProposal = mergeCanonicalValue(canonicalProposal, endorsementProposal);
    }

    const patch: Record<string, unknown> = {
      numero_apolice: numero,
      numero_endosso_atual: endossoAtualFinal,
      last_sync_run_id: runId,
      updated_at: new Date().toISOString(),
    };
    // Só atualiza o estado da apólice quando o lote contém o documento mais
    // novo (ou o mesmo sequencial para permitir reconstruções/correções).
    if (isNewer) {
      patch.premio_liquido = top.premio;
      patch.proposta = canonicalProposal ?? {};
    }

    const { data: up, error: upErr } = await supabaseAdmin
      .from("policies")
      .upsert(patch as never, { onConflict: "numero_apolice" })
      .select("id")
      .single();
    if (upErr || !up) {
      console.error("[policy-sync-callback] upsert policy falhou", numero, upErr);
      continue;
    }
    const policyId = (up as { id: string }).id;

    // Histórico documental: cada endosso continua bruto e independente.
    // Assim motivo, datas próprias do endosso e demais metadados nunca são
    // perdidos pelo processo de consolidação da `policies.proposta`.
    const rows = endos.map((e) => ({
      policy_id: policyId,
      numero_apolice: numero,
      numero_endosso: e.num,
      premio_liquido: e.premio,
      proposta: e.proposta ?? {},
      ordem: e.seq,
    }));
    // Idempotente: a unique (policy_id, numero_endosso) garante que
    // reenvios atualizem a mesma linha em vez de duplicar.
    const { error: endErr } = await supabaseAdmin.from("endorsements").upsert(rows as never, {
      onConflict: "policy_id,numero_endosso",
      ignoreDuplicates: false,
    });
    if (endErr) {
      console.error("[policy-sync-callback] upsert endorsements", endErr);
      continue;
    }

    // Fonte da verdade do "endosso atual": o maior sequencial realmente
    // gravado no histórico. Corrige qualquer estado anterior inconsistente.
    const { data: allEndos } = await supabaseAdmin
      .from("endorsements")
      .select("numero_endosso")
      .eq("policy_id", policyId);
    const maxSeq = ((allEndos ?? []) as Array<{ numero_endosso: string }>).reduce((max, r) => {
      const n = parseInt(String(r.numero_endosso).replace(/\D/g, ""), 10);
      return Number.isFinite(n) && n > max ? n : max;
    }, -1);
    if (maxSeq >= 0) {
      const canonical = String(maxSeq).padStart(6, "0");
      if (canonical !== endossoAtualFinal) {
        await supabaseAdmin
          .from("policies")
          .update({ numero_endosso_atual: canonical } as never)
          .eq("id", policyId);
      }
    }

    insertedEndos += rows.length;
    processed++;
  }

  const { error: updErr } = await supabaseAdmin
    .from("policy_sync_runs")
    .update({
      total_apolices: processed,
      duration_ms: durationMs,
      raw: payload as unknown as Record<string, unknown>,
    } as never)
    .eq("id", runId);
  if (updErr) return json({ error: updErr.message }, 500);

  const { markSyncLeg } = await import("@/lib/sync-legs.server");
  await markSyncLeg(runId, "emissoes", { status: "success", total: processed });

  return json({
    ok: true,
    run_id: runId,
    processed,
    endorsements: insertedEndos,
    duration_ms: durationMs,
  });
}

/** Persiste emissões sem uma chamada HTTP intermediária dentro da aplicação. */
export async function persistPolicySyncPayload(runId: string, payload: unknown) {
  const response = await handlePolicySyncCallback(
    {
      request: new Request(
        `https://internal.invalid/api/public/policy-sync-callback?run_id=${encodeURIComponent(runId)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      ),
    },
    true,
  );
  const body = (await response.json()) as Record<string, unknown>;
  if (!response.ok) {
    throw new Error(String(body.error ?? "Falha ao persistir apólices e endossos."));
  }
  return body;
}

export const Route = createFileRoute("/api/public/policy-sync-callback")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      POST: (context) => handlePolicySyncCallback(context),
    },
  },
});
