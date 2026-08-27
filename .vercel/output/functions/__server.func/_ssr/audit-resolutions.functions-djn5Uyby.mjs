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
const listAuditResolutions_createServerFn_handler = createServerRpc({
  id: "d2888893047f221536c7c8206a44a09f9c024af4bd03447c28733743d15d38e0",
  name: "listAuditResolutions",
  filename: "src/lib/audit-resolutions.functions.ts"
}, (opts) => listAuditResolutions.__executeServer(opts));
const listAuditResolutions = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listAuditResolutions_createServerFn_handler, async ({
  context
}) => {
  const {
    data,
    error
  } = await context.supabase.from("audit_resolutions").select("*").order("resolved_at", {
    ascending: false
  }).limit(500);
  if (error) throw new Error(error.message);
  return data ?? [];
});
const ResolveSchema = object({
  apolice: string().min(1).max(120),
  tipo_erro: string().min(1).max(200),
  endosso: string().max(120).optional().nullable(),
  run_id: string().uuid().optional().nullable(),
  motivo: string().max(500).optional().nullable()
});
const resolveFinding_createServerFn_handler = createServerRpc({
  id: "f4fb64a4ac46c1192657ca4449dd4a8ca48bdcd5546b0d0ebc86369a99ba3d9f",
  name: "resolveFinding",
  filename: "src/lib/audit-resolutions.functions.ts"
}, (opts) => resolveFinding.__executeServer(opts));
const resolveFinding = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => ResolveSchema.parse(d)).handler(resolveFinding_createServerFn_handler, async ({
  data,
  context
}) => {
  let existingQuery = context.supabase.from("audit_resolutions").select("id").eq("apolice", data.apolice).eq("tipo_erro", data.tipo_erro).is("reopened_at", null);
  existingQuery = data.endosso ? existingQuery.eq("endosso", data.endosso) : existingQuery.is("endosso", null);
  const {
    data: existing,
    error: selErr
  } = await existingQuery.maybeSingle();
  if (selErr) throw new Error(selErr.message);
  if (existing) return {
    id: existing.id,
    alreadyExists: true
  };
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  let firstQuery = supabaseAdmin.from("audit_findings").select("created_at").eq("apolice", data.apolice).eq("tipo_erro", data.tipo_erro);
  firstQuery = data.endosso ? firstQuery.eq("endosso", data.endosso) : firstQuery.is("endosso", null);
  const {
    data: first
  } = await firstQuery.order("created_at", {
    ascending: true
  }).limit(1).maybeSingle();
  const firstSeenAt = first?.created_at ?? null;
  const {
    data: inserted,
    error
  } = await context.supabase.from("audit_resolutions").insert({
    apolice: data.apolice,
    tipo_erro: data.tipo_erro,
    endosso: data.endosso ?? null,
    run_id: data.run_id ?? null,
    first_seen_at: firstSeenAt,
    resolved_at: (/* @__PURE__ */ new Date()).toISOString(),
    resolved_by: context.userId,
    origem: "manual",
    motivo: data.motivo?.trim() ? data.motivo.trim() : null
  }).select("id").single();
  if (error) throw new Error(error.message);
  return {
    id: inserted.id,
    alreadyExists: false
  };
});
const unresolveFinding_createServerFn_handler = createServerRpc({
  id: "729ceb73ec9e2cb220145cd50035031e97b0d4c651f95437dce6f7f2753cf84e",
  name: "unresolveFinding",
  filename: "src/lib/audit-resolutions.functions.ts"
}, (opts) => unresolveFinding.__executeServer(opts));
const unresolveFinding = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => object({
  id: string().uuid()
}).parse(d)).handler(unresolveFinding_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    error
  } = await context.supabase.from("audit_resolutions").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const getResolutionTimeStats_createServerFn_handler = createServerRpc({
  id: "c1444affb35ef1659daf20980ad3599f011226becc8d8ef8948b3750257a9b32",
  name: "getResolutionTimeStats",
  filename: "src/lib/audit-resolutions.functions.ts"
}, (opts) => getResolutionTimeStats.__executeServer(opts));
const getResolutionTimeStats = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getResolutionTimeStats_createServerFn_handler, async ({
  context
}) => {
  const {
    deriveResolutionTimes
  } = await import("./resolution-filter-CnX0EhgU.mjs");
  const {
    data,
    error
  } = await context.supabase.from("audit_resolutions").select("apolice, tipo_erro, first_seen_at, resolved_at, reopened_at, origem").order("resolved_at", {
    ascending: false
  }).limit(2e3);
  if (error) throw new Error(error.message);
  return deriveResolutionTimes(data ?? []);
});
export {
  getResolutionTimeStats_createServerFn_handler,
  listAuditResolutions_createServerFn_handler,
  resolveFinding_createServerFn_handler,
  unresolveFinding_createServerFn_handler
};
