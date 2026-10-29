import { createFileRoute } from "@tanstack/react-router";
import { CallbackPayloadSchema } from "@/lib/audit/callback-payload";
import { auditResultSummary, isCompleteAuditResult } from "@/lib/audit/result-summary";
import { previousCompleteAudit } from "@/lib/audit/previous-complete.server";
import { auditFindingId } from "@/lib/audit/finding-id.server";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-callback-secret, x-audit-secret",
  "Access-Control-Max-Age": "86400",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

function parseIso(maybe?: string | null): string | null {
  if (!maybe) return null;
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(maybe)) {
    const [d, m, y] = maybe.split("/");
    return `${y}-${m}-${d}`;
  }
  const d = new Date(maybe);
  return isNaN(+d) ? null : d.toISOString().slice(0, 10);
}

export const Route = createFileRoute("/api/public/audit-callback")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),

      POST: async ({ request }) => {
        const { handleScopedCallback } = await import("@/lib/environment/callback.server");
        return handleScopedCallback(request, {
          integration: "audit",
          secrets: [process.env.AUDIT_CALLBACK_SECRET],
          handler: async () => {
            const url = new URL(request.url);
            const runIdQS = url.searchParams.get("run_id");
            // 1. Valida secret (aceita ambos os nomes de header para compatibilidade com fluxos n8n existentes)
            const expected = process.env.AUDIT_CALLBACK_SECRET;
            const provided =
              request.headers.get("x-callback-secret") || request.headers.get("x-audit-secret");
            console.log(
              `[audit-callback] hit run_id=${runIdQS ?? "(missing)"} secret_present=${!!provided} secret_match=${!!expected && provided === expected}`,
            );
            if (!expected || provided !== expected) {
              return json({ error: "Unauthorized" }, 401);
            }

            // 2. Parse body
            let raw: unknown;
            try {
              raw = await request.json();
            } catch {
              return json({ error: "Invalid JSON" }, 400);
            }
            const root = Array.isArray(raw) ? raw[0] : raw;
            // n8n às vezes envelopa o resultado em { run_id, status, payload: {...} }.
            // Desembrulha se o payload real estiver aninhado.
            const candidate =
              root &&
              typeof root === "object" &&
              "payload" in (root as Record<string, unknown>) &&
              (root as Record<string, unknown>).payload &&
              typeof (root as Record<string, unknown>).payload === "object"
                ? {
                    ...(root as { payload: Record<string, unknown> }).payload,
                    run_id:
                      (root as { run_id?: string }).run_id ??
                      (root as { payload: { run_id?: string } }).payload.run_id,
                    // A technical failure on either envelope layer must not become success.
                    ...((root as { status?: string }).status === "error" ||
                    (root as { error?: string }).error ||
                    (root as { error_message?: string }).error_message
                      ? {
                          status: "error",
                          error_message:
                            (root as { error_message?: string }).error_message ??
                            "Falha técnica no envelope do motor.",
                        }
                      : {}),
                  }
                : root;
            const parsed = CallbackPayloadSchema.safeParse(candidate);
            if (!parsed.success) {
              return json({ error: "Payload inválido", issues: parsed.error.issues }, 400);
            }
            const payload = parsed.data;

            // run_id pode vir no body OU na query string (?run_id=...) — n8n
            // sempre tem acesso ao callback_url original, então a query é mais robusta.
            const runId = payload.run_id ?? runIdQS ?? undefined;
            if (!runId) {
              return json(
                {
                  error:
                    "run_id ausente. Inclua run_id no body do POST OU na query string do callback_url (já é enviado automaticamente).",
                },
                400,
              );
            }

            const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

            // 3. Confirma run existente
            const { data: existing, error: fetchErr } = await supabaseAdmin
              .from("audit_runs")
              .select("id, created_at, status, raw")
              .eq("id", runId)
              .maybeSingle();

            if (fetchErr) return json({ error: fetchErr.message }, 500);
            if (!existing) return json({ error: "run_id not found" }, 404);
            // Terminal callbacks are immutable: no duplicated findings or late error overwrite.
            if (existing.status !== "running")
              return json({ ok: true, run_id: runId, duplicate: true, status: existing.status });

            const original =
              existing.raw && typeof existing.raw === "object" && !Array.isArray(existing.raw)
                ? (existing.raw as Record<string, unknown>)
                : {};
            const exclusions = Array.isArray(original.apolices_excluidas)
              ? (original.apolices_excluidas as Array<{ apolice: string }>)
              : [];
            const specifics = Array.isArray(original.excecoes_especificas)
              ? (original.excecoes_especificas as Array<{ apolice: string; tipo_erro: string }>)
              : [];
            const resultRaw = {
              ...payload,
              status_geral: auditResultSummary({ status_geral: payload.status_geral, raw: payload })
                .partial
                ? "PARCIAL"
                : (payload.status_geral ?? "SUCESSO"),
              apolices_excluidas: exclusions,
              excecoes_especificas: specifics,
            };

            const startedAt = new Date((existing as { created_at: string }).created_at).getTime();
            const durationMs = Date.now() - startedAt;

            if (payload.status === "error" || payload.error || payload.error_message) {
              // Monta mensagem com o máximo de pistas possível
              let message = payload.error_message ?? payload.error ?? "";
              if (!message) {
                const rawObj = candidate as Record<string, unknown>;
                const keys =
                  rawObj && typeof rawObj === "object"
                    ? Object.keys(rawObj).join(", ")
                    : "(payload não-objeto)";
                const preview = JSON.stringify(candidate).slice(0, 300);
                message = `n8n retornou status="error" sem detalhes. Chaves recebidas: [${keys}]. Payload: ${preview}`;
              }

              // Detecta uso do webhook de TESTE e adiciona dica
              const webhookUrl = process.env.N8N_AUDIT_WEBHOOK_URL || "";
              const isTestWebhook = webhookUrl.includes("/webhook-test/") || (!webhookUrl && true);
              if (isTestWebhook) {
                message +=
                  '\n\nDICA: você está usando o webhook de TESTE do n8n (/webhook-test/...). Ele só processa 1 execução por clique em "Listen for test event". Para uso contínuo, ative o workflow e troque para a URL de produção (/webhook/...).';
              }

              console.error("[audit-callback] n8n returned error", { runId });
              const { data: failed, error: errUpd } = await supabaseAdmin
                .from("audit_runs")
                .update({
                  status: "error",
                  status_geral: "ERRO",
                  error_message: message,
                  duration_ms: durationMs,
                  raw: resultRaw,
                } as never)
                .eq("id", runId)
                .eq("status", "running")
                .select("id")
                .maybeSingle();

              if (errUpd) return json({ error: errUpd.message }, 500);
              if (!failed) return json({ ok: true, run_id: runId, duplicate: true });
              return json({ ok: true, run_id: runId, status: "error", duration_ms: durationMs });
            }

            // 5. Insere findings (normaliza nomes alternativos vindos do n8n)
            const findings = payload.apolices_com_erro.flatMap((a) =>
              a.erros.map((e) => {
                const ex = e as Record<string, unknown>;
                const endossoVal =
                  (e.endosso as string | null | undefined) ??
                  (ex.endosso_com_erro as string | null | undefined) ??
                  null;
                return {
                  run_id: runId,
                  apolice: a.apolice,
                  tipo_erro: e.tipo_erro,
                  endosso: endossoVal,
                  data_inicio: parseIso(
                    (e.dataInicio as string | null | undefined) ??
                      (ex.data_inicio as string | null | undefined) ??
                      null,
                  ),
                  data_fim: parseIso(
                    (e.dataFim as string | null | undefined) ??
                      (ex.data_fim as string | null | undefined) ??
                      null,
                  ),
                  detalhes: e as unknown as Record<string, unknown>,
                };
              }),
            );

            if (findings.length > 0) {
              const { error: findErr } = await supabaseAdmin
                .from("audit_findings")
                .upsert(findings.map((f) => ({ id: auditFindingId(f), ...f })) as never, {
                  onConflict: "id",
                  ignoreDuplicates: true,
                });
              if (findErr) return json({ error: findErr.message }, 500);
            }

            // 6. Reabre automaticamente resoluções cujo problema voltou a aparecer
            //    (chave = apólice + tipo de erro + endosso).
            const chaveDe = (f: { apolice: string; tipo_erro: string; endosso?: string | null }) =>
              `${f.apolice}::${f.tipo_erro}::${f.endosso ?? ""}`;
            const chavesAtuais = new Set(findings.map(chaveDe));

            let reopened = 0;
            if (findings.length > 0) {
              const { data: ativas, error: reopenReadError } = await supabaseAdmin
                .from("audit_resolutions")
                .select("id, apolice, tipo_erro, endosso")
                .is("reopened_at", null);
              if (reopenReadError)
                return json(
                  { error: "Falha ao consultar resoluções para reabertura; reenvie o callback." },
                  500,
                );
              const paraReabrir = (
                (ativas ?? []) as Array<{
                  id: string;
                  apolice: string;
                  tipo_erro: string;
                  endosso: string | null;
                }>
              )
                .filter((r) => chavesAtuais.has(chaveDe(r)))
                .map((r) => r.id);
              if (paraReabrir.length > 0) {
                const { error: reopenErr } = await supabaseAdmin
                  .from("audit_resolutions")
                  .update({ reopened_at: new Date().toISOString() } as never)
                  .in("id", paraReabrir)
                  .is("reopened_at", null);
                if (reopenErr) {
                  return json({ error: "Falha ao reabrir resoluções; reenvie o callback." }, 500);
                } else {
                  reopened = paraReabrir.length;
                }
              }
            }

            // Publish only after findings AND required reopening. Failed reads/writes remain retryable.
            const result = {
              status: "success",
              data_auditoria: payload.data_auditoria ?? new Date().toISOString(),
              status_geral: resultRaw.status_geral,
              mensagem_geral: payload.mensagem_geral ?? null,
              total_processado: payload.resumo?.total_processado ?? 0,
              aprovados: payload.resumo?.aprovados ?? 0,
              reprovados: payload.resumo?.reprovados ?? 0,
              duration_ms: durationMs,
              raw: resultRaw,
            };
            const { data: finalized, error: updErr } = await supabaseAdmin
              .from("audit_runs")
              .update(result as never)
              .eq("id", runId)
              .eq("status", "running")
              .select("id")
              .maybeSingle();
            if (updErr) return json({ error: updErr.message }, 500);
            if (!finalized) return json({ ok: true, run_id: runId, duplicate: true });

            // 7. Resolução AUTOMÁTICA: achados presentes na auditoria anterior que
            //    não aparecem mais nesta. Exceções (audit_ignores) nunca contam como
            //    resolvidas, e resoluções ativas não são duplicadas.
            let autoResolved = 0;
            const summary = auditResultSummary({
              status_geral: payload.status_geral,
              raw: payload,
            });
            // Missing exclusion identities are not evidence of correction either.
            const reliableScope = (summary.excluded ?? 0) <= exclusions.length;
            if (payload.resumo && isCompleteAuditResult(result) && reliableScope) {
              try {
                const prevRun = await previousCompleteAudit(supabaseAdmin, existing);

                if (prevRun) {
                  const prevId = (prevRun as { id: string }).id;
                  const [
                    { data: prevFindings, error: prevError },
                    { data: ignores, error: ignoreError },
                    { data: ativas, error: activeError },
                  ] = await Promise.all([
                    supabaseAdmin
                      .from("audit_findings")
                      .select("apolice, tipo_erro, endosso")
                      .eq("run_id", prevId),
                    supabaseAdmin.from("audit_ignores").select("apolice, tipo_erro"),
                    supabaseAdmin
                      .from("audit_resolutions")
                      .select("apolice, tipo_erro, endosso")
                      .is("reopened_at", null),
                  ]);
                  if (prevError || ignoreError || activeError)
                    throw new Error("Leitura incompleta para resolução automática.");

                  const { buildIgnoreSets, isIgnoredFinding } =
                    await import("@/lib/audit/ignore-filter");
                  const { resolutionsAsIgnoreEntries } =
                    await import("@/lib/audit/resolution-filter");
                  const ignoreSets = buildIgnoreSets([
                    ...((ignores ?? []) as Array<{ apolice: string; tipo_erro: string | null }>),
                    ...exclusions.map((e) => ({ apolice: e.apolice, tipo_erro: null })),
                    ...specifics,
                  ]);
                  const resolvidasSets = buildIgnoreSets(
                    resolutionsAsIgnoreEntries(
                      (ativas ?? []) as Array<{
                        apolice: string;
                        tipo_erro: string;
                        endosso: string | null;
                      }>,
                    ),
                  );

                  const candidatos = new Map<
                    string,
                    { apolice: string; tipo_erro: string; endosso: string | null }
                  >();
                  for (const f of (prevFindings ?? []) as Array<{
                    apolice: string;
                    tipo_erro: string;
                    endosso: string | null;
                  }>) {
                    const chave = chaveDe(f);
                    if (chavesAtuais.has(chave)) continue; // ainda presente
                    if (isIgnoredFinding(ignoreSets, f)) continue; // exceção: não é resolução
                    if (isIgnoredFinding(resolvidasSets, f)) continue; // já resolvido
                    candidatos.set(chave, f);
                  }

                  if (candidatos.size > 0) {
                    const apolices = Array.from(
                      new Set(Array.from(candidatos.values()).map((c) => c.apolice)),
                    );
                    const { data: historico, error: historyError } = await supabaseAdmin
                      .from("audit_findings")
                      .select("apolice, tipo_erro, endosso, created_at")
                      .in("apolice", apolices);
                    if (historyError)
                      throw new Error("Histórico indisponível para resolução automática.");
                    const firstSeen = new Map<string, string>();
                    for (const h of (historico ?? []) as Array<{
                      apolice: string;
                      tipo_erro: string;
                      endosso: string | null;
                      created_at: string;
                    }>) {
                      const chave = chaveDe(h);
                      const atual = firstSeen.get(chave);
                      if (!atual || h.created_at < atual) firstSeen.set(chave, h.created_at);
                    }

                    const resolvedAt = new Date().toISOString();
                    const linhas = Array.from(candidatos.entries()).map(([chave, c]) => ({
                      apolice: c.apolice,
                      tipo_erro: c.tipo_erro,
                      endosso: c.endosso,
                      run_id: runId,
                      first_seen_at: firstSeen.get(chave) ?? null,
                      resolved_at: resolvedAt,
                      resolved_by: null,
                      origem: "auto",
                      motivo: "Resolvido automaticamente: ausente na auditoria seguinte",
                    }));
                    const { error: autoErr } = await supabaseAdmin
                      .from("audit_resolutions")
                      .insert(linhas as never);
                    if (autoErr) {
                      console.error(
                        "[audit-callback] falha ao registrar resoluções automáticas",
                        autoErr.message,
                      );
                    } else {
                      autoResolved = linhas.length;
                    }
                  }
                }
              } catch {
                console.error(
                  "[audit-callback] resolução automática pendente por falha de leitura/gravação",
                );
              }
            }

            return json({
              ok: true,
              run_id: runId,
              findings: findings.length,
              reopened_resolutions: reopened,
              auto_resolutions: autoResolved,
              duration_ms: durationMs,
            });
          },
        });
      },
    },
  },
});
