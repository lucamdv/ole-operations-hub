import { c as createServerRpc } from "./createServerRpc-aKyz3faE.mjs";
import { c as createServerFn } from "./server-BxlZVXOU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BqwiLAOE.mjs";
import { a as assertAdmin } from "./assert-admin-D-zd5zKa.mjs";
import { r as resolveWebhookUrl } from "./webhook-mode-DKZeQYsl.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as object, s as string } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const runEndorsementExtraction_createServerFn_handler = createServerRpc({
  id: "e82b6fe37b10f385029646bddeeb306a2fffa5b04b9bac4ccfe95da82e4c2cbb",
  name: "runEndorsementExtraction",
  filename: "src/lib/endorsement-extraction.functions.ts"
}, (opts) => runEndorsementExtraction.__executeServer(opts));
const runEndorsementExtraction = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(runEndorsementExtraction_createServerFn_handler, async ({
  context,
  data
}) => {
  const rawUrl = process.env.N8N_ENDORSEMENT_WEBHOOK_URL;
  const url = rawUrl ? resolveWebhookUrl(rawUrl, data.mode) : rawUrl;
  if (!url) {
    throw new Error("Secret N8N_ENDORSEMENT_WEBHOOK_URL não configurada. Cole a URL de produção do webhook n8n (/webhook/...).");
  }
  const secret = process.env.ENDORSEMENT_CALLBACK_SECRET;
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const {
    data: exc
  } = await context.supabase.from("endorsement_exceptions").select("policy_number");
  const excluded = (exc ?? []).map((e) => e.policy_number);
  const {
    data: runRow,
    error: insErr
  } = await supabaseAdmin.from("endorsement_extraction_runs").insert({
    status: "running",
    total_apolices: 0,
    raw: {}
  }).select("id").single();
  if (insErr || !runRow) {
    throw new Error("Falha ao criar execução: " + (insErr?.message ?? "sem id"));
  }
  const runId = runRow.id;
  let base = process.env.PUBLIC_APP_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (!process.env.PUBLIC_APP_URL) {
    try {
      const {
        getRequest
      } = await import("./server-C0VIuWgh.mjs");
      const origin = new URL(getRequest().url).origin;
      if (/^https:\/\//.test(origin) && !origin.includes("localhost")) base = origin;
    } catch {
    }
  }
  if (!base) throw new Error("PUBLIC_APP_URL não configurada e nenhuma URL da Vercel disponível.");
  const normalizedBase = /^https?:\/\//.test(base) ? base : `https://${base}`;
  const callbackUrl = `${normalizedBase.replace(/\/$/, "")}/api/public/endorsement-extraction-callback?run_id=${runId}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        run_id: runId,
        callback_url: callbackUrl,
        callback_secret_header: "x-callback-secret",
        // O n8n devolve este valor no header x-callback-secret ao chamar a callback_url.
        callback_secret: secret ?? null,
        trigger: "ole-copilot",
        tool: "extrator-ultimos-endossos",
        mode: "async_callback",
        excluded_policies: excluded
      })
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`n8n respondeu ${res.status}. ${body.slice(0, 300)}`);
    }
  } catch (err) {
    await supabaseAdmin.from("endorsement_extraction_runs").update({
      status: "error",
      error_message: err instanceof Error ? err.message : String(err),
      finished_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id", runId);
    throw err instanceof Error ? err : new Error(String(err));
  }
  if (!secret) {
    console.warn("[extracao-endossos] ENDORSEMENT_CALLBACK_SECRET não configurado.");
  }
  return {
    runId,
    status: "running"
  };
});
const getExtractionStatus_createServerFn_handler = createServerRpc({
  id: "dbc7d37a66b1595c39f93132683cfc588ae0649948a6f858cdd972e6a55015c3",
  name: "getExtractionStatus",
  filename: "src/lib/endorsement-extraction.functions.ts"
}, (opts) => getExtractionStatus.__executeServer(opts));
const getExtractionStatus = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => object({
  runId: string().uuid()
}).parse(d)).handler(getExtractionStatus_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const {
    data: run,
    error
  } = await supabaseAdmin.from("endorsement_extraction_runs").select("id, status, total_apolices, error_message, finished_at, duration_ms, created_at").eq("id", data.runId).maybeSingle();
  if (error) throw new Error(error.message);
  return run ?? null;
});
const getLatestExtraction_createServerFn_handler = createServerRpc({
  id: "b29ee520bfee3bf30f61c45a01fd56e527aec9ae9802426cb685d79789aefce3",
  name: "getLatestExtraction",
  filename: "src/lib/endorsement-extraction.functions.ts"
}, (opts) => getLatestExtraction.__executeServer(opts));
const getLatestExtraction = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getLatestExtraction_createServerFn_handler, async ({
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const {
    data: runs,
    error: runErr
  } = await supabaseAdmin.from("endorsement_extraction_runs").select("id, status, total_apolices, duration_ms, error_message, finished_at, created_at").eq("status", "success").order("created_at", {
    ascending: false
  }).limit(1);
  if (runErr) throw new Error(runErr.message);
  if (!runs || runs.length === 0) return null;
  const run = runs[0];
  const {
    data: items,
    error: itemErr
  } = await supabaseAdmin.from("endorsement_extraction_items").select("policy_number, last_sequencial_endosso_used").eq("run_id", run.id).order("policy_number", {
    ascending: true
  });
  if (itemErr) throw new Error(itemErr.message);
  const {
    data: exc
  } = await context.supabase.from("endorsement_exceptions").select("policy_number");
  const excluded = new Set((exc ?? []).map((e) => e.policy_number));
  const all = items ?? [];
  const filtered = all.filter((i) => !excluded.has(i.policy_number));
  return {
    run: {
      ...run,
      total_apolices: filtered.length
    },
    items: filtered,
    hiddenCount: all.length - filtered.length
  };
});
const getExtractionHistory_createServerFn_handler = createServerRpc({
  id: "8972cba1e7bd86457ab4fe2a35382b627bf9047c26a8a14e3ffda4c8036c4539",
  name: "getExtractionHistory",
  filename: "src/lib/endorsement-extraction.functions.ts"
}, (opts) => getExtractionHistory.__executeServer(opts));
const getExtractionHistory = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getExtractionHistory_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("endorsement_extraction_runs").select("id, status, total_apolices, duration_ms, error_message, finished_at, created_at").order("created_at", {
    ascending: false
  }).limit(20);
  if (error) throw new Error(error.message);
  return data ?? [];
});
const listEndorsementExceptions_createServerFn_handler = createServerRpc({
  id: "eee7ccdfb0d44ee559bce79076fab9edabf91d9dedaef9ed287bef89fc993039",
  name: "listEndorsementExceptions",
  filename: "src/lib/endorsement-extraction.functions.ts"
}, (opts) => listEndorsementExceptions.__executeServer(opts));
const listEndorsementExceptions = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listEndorsementExceptions_createServerFn_handler, async ({
  context
}) => {
  const {
    data,
    error
  } = await context.supabase.from("endorsement_exceptions").select("id, policy_number, motivo, reason_tag_id, created_by, created_at").order("created_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return data ?? [];
});
const AddSchema = object({
  policy_number: string().min(1).max(120),
  motivo: string().trim().min(1, "Motivo obrigatório").max(500),
  reason_tag_id: string().uuid().optional().nullable()
});
const addEndorsementException_createServerFn_handler = createServerRpc({
  id: "fc4d84a2a7e10e4d01d1ca3e57eb76ace01b2e91cdd413cd0ee06af9e55469b7",
  name: "addEndorsementException",
  filename: "src/lib/endorsement-extraction.functions.ts"
}, (opts) => addEndorsementException.__executeServer(opts));
const addEndorsementException = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => AddSchema.parse(d)).handler(addEndorsementException_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const policy = data.policy_number.trim();
  const {
    data: existing,
    error: selErr
  } = await context.supabase.from("endorsement_exceptions").select("id").eq("policy_number", policy).maybeSingle();
  if (selErr) throw new Error(selErr.message);
  if (existing) return {
    id: existing.id,
    alreadyExists: true
  };
  const {
    data: inserted,
    error
  } = await context.supabase.from("endorsement_exceptions").insert({
    policy_number: policy,
    motivo: data.motivo.trim(),
    reason_tag_id: data.reason_tag_id ?? null,
    created_by: context.userId
  }).select("id").single();
  if (error) throw new Error(error.message);
  return {
    id: inserted.id,
    alreadyExists: false
  };
});
const UpdateSchema = object({
  id: string().uuid(),
  motivo: string().trim().min(1, "Motivo obrigatório").max(500),
  reason_tag_id: string().uuid().optional().nullable()
});
const updateEndorsementException_createServerFn_handler = createServerRpc({
  id: "d63e2fd05520e37a6ae452ef881081244ec0419acd4b8bf6ec095508e97bb8e5",
  name: "updateEndorsementException",
  filename: "src/lib/endorsement-extraction.functions.ts"
}, (opts) => updateEndorsementException.__executeServer(opts));
const updateEndorsementException = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => UpdateSchema.parse(d)).handler(updateEndorsementException_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    error
  } = await context.supabase.from("endorsement_exceptions").update({
    motivo: data.motivo.trim(),
    reason_tag_id: data.reason_tag_id ?? null
  }).eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const removeEndorsementException_createServerFn_handler = createServerRpc({
  id: "e9598f1c88e2dcdf6e37949cfdbd2526b83410dad0463ceb11739dcd11591dd7",
  name: "removeEndorsementException",
  filename: "src/lib/endorsement-extraction.functions.ts"
}, (opts) => removeEndorsementException.__executeServer(opts));
const removeEndorsementException = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => object({
  id: string().uuid()
}).parse(d)).handler(removeEndorsementException_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    error
  } = await context.supabase.from("endorsement_exceptions").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  addEndorsementException_createServerFn_handler,
  getExtractionHistory_createServerFn_handler,
  getExtractionStatus_createServerFn_handler,
  getLatestExtraction_createServerFn_handler,
  listEndorsementExceptions_createServerFn_handler,
  removeEndorsementException_createServerFn_handler,
  runEndorsementExtraction_createServerFn_handler,
  updateEndorsementException_createServerFn_handler
};
