import { c as createServerRpc } from "./createServerRpc-aKyz3faE.mjs";
import { c as createServerFn } from "./server-BxlZVXOU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BqwiLAOE.mjs";
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
const listAuditIgnores_createServerFn_handler = createServerRpc({
  id: "88edb9b4231b68ed0f9f60d341eb7b966d5c927c58a29cc5cf88410c4b733659",
  name: "listAuditIgnores",
  filename: "src/lib/audit-ignores.functions.ts"
}, (opts) => listAuditIgnores.__executeServer(opts));
const listAuditIgnores = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listAuditIgnores_createServerFn_handler, async ({
  context
}) => {
  const {
    data,
    error
  } = await context.supabase.from("audit_ignores").select("*").order("created_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return data ?? [];
});
const AddSchema = object({
  apolice: string().min(1).max(120),
  tipo_erro: string().min(1).max(200).optional().nullable(),
  motivo: string().trim().min(1, "Motivo obrigatório").max(500),
  reason_tag_id: string().uuid().optional().nullable()
});
const addAuditIgnore_createServerFn_handler = createServerRpc({
  id: "4b6fc12bbf21cd8d645e5e16ad0e6486cd7d7dff98801bbaa1dc95db99a1d753",
  name: "addAuditIgnore",
  filename: "src/lib/audit-ignores.functions.ts"
}, (opts) => addAuditIgnore.__executeServer(opts));
const addAuditIgnore = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => AddSchema.parse(d)).handler(addAuditIgnore_createServerFn_handler, async ({
  data,
  context
}) => {
  const scope = data.tipo_erro ? "apolice_tipo" : "apolice";
  const row = {
    created_by: context.userId,
    scope,
    apolice: data.apolice,
    tipo_erro: data.tipo_erro ?? null,
    motivo: data.motivo.trim(),
    reason_tag_id: data.reason_tag_id ?? null
  };
  let q = context.supabase.from("audit_ignores").select("id").eq("apolice", data.apolice);
  q = data.tipo_erro ? q.eq("tipo_erro", data.tipo_erro) : q.is("tipo_erro", null);
  const {
    data: existing,
    error: selErr
  } = await q.maybeSingle();
  if (selErr) throw new Error(selErr.message);
  if (existing) return {
    id: existing.id,
    alreadyExists: true
  };
  const {
    data: inserted,
    error
  } = await context.supabase.from("audit_ignores").insert(row).select("id").single();
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
const updateAuditIgnore_createServerFn_handler = createServerRpc({
  id: "f48ea7f0ef9a3ccaa7a179c39bbca8514d69a621727a97fe9bd195fe7955f991",
  name: "updateAuditIgnore",
  filename: "src/lib/audit-ignores.functions.ts"
}, (opts) => updateAuditIgnore.__executeServer(opts));
const updateAuditIgnore = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => UpdateSchema.parse(d)).handler(updateAuditIgnore_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    error
  } = await context.supabase.from("audit_ignores").update({
    motivo: data.motivo.trim(),
    reason_tag_id: data.reason_tag_id ?? null
  }).eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const removeAuditIgnore_createServerFn_handler = createServerRpc({
  id: "d9930ec315ddad261a9c3b58b7cc7bc3e338c351e0252329373a9262415dd71f",
  name: "removeAuditIgnore",
  filename: "src/lib/audit-ignores.functions.ts"
}, (opts) => removeAuditIgnore.__executeServer(opts));
const removeAuditIgnore = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => object({
  id: string().uuid()
}).parse(d)).handler(removeAuditIgnore_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    error
  } = await context.supabase.from("audit_ignores").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  addAuditIgnore_createServerFn_handler,
  listAuditIgnores_createServerFn_handler,
  removeAuditIgnore_createServerFn_handler,
  updateAuditIgnore_createServerFn_handler
};
