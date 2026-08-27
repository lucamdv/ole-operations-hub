import { c as createServerRpc } from "./createServerRpc-aKyz3faE.mjs";
import { c as createServerFn } from "./server-BxlZVXOU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BqwiLAOE.mjs";
import { a as assertAdmin } from "./assert-admin-D-zd5zKa.mjs";
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
const HEX = /^#[0-9a-fA-F]{6}$/;
const listExceptionReasonTags_createServerFn_handler = createServerRpc({
  id: "126b2803b4bb9a9b3bb9fd718879690ed19500f35f4de8154c22171a19a64bee",
  name: "listExceptionReasonTags",
  filename: "src/lib/exception-tags.functions.ts"
}, (opts) => listExceptionReasonTags.__executeServer(opts));
const listExceptionReasonTags = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listExceptionReasonTags_createServerFn_handler, async ({
  context
}) => {
  const {
    data,
    error
  } = await context.supabase.from("exception_reason_tags").select("id, name, color, created_at").order("name", {
    ascending: true
  });
  if (error) throw new Error(error.message);
  return data ?? [];
});
const AddTagSchema = object({
  name: string().trim().min(1).max(60),
  color: string().regex(HEX, "Cor inválida")
});
const addExceptionReasonTag_createServerFn_handler = createServerRpc({
  id: "2ea295ff8b3cb11662d55154cf637700b4819323f71b14140991795dc052d814",
  name: "addExceptionReasonTag",
  filename: "src/lib/exception-tags.functions.ts"
}, (opts) => addExceptionReasonTag.__executeServer(opts));
const addExceptionReasonTag = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => AddTagSchema.parse(d)).handler(addExceptionReasonTag_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    data: inserted,
    error
  } = await context.supabase.from("exception_reason_tags").insert({
    name: data.name,
    color: data.color,
    created_by: context.userId
  }).select("id").single();
  if (error) {
    if (error.code === "23505" || /duplicate|unique/i.test(error.message)) {
      throw new Error("Já existe uma tag com esse nome");
    }
    throw new Error(error.message);
  }
  return {
    id: inserted.id
  };
});
const UpdateTagSchema = object({
  id: string().uuid(),
  name: string().trim().min(1).max(60).optional(),
  color: string().regex(HEX, "Cor inválida").optional()
});
const updateExceptionReasonTag_createServerFn_handler = createServerRpc({
  id: "6614dac4b16812a4e50d24e80d06ba28d8b61804fdb30ed4fa494bb760fbecb2",
  name: "updateExceptionReasonTag",
  filename: "src/lib/exception-tags.functions.ts"
}, (opts) => updateExceptionReasonTag.__executeServer(opts));
const updateExceptionReasonTag = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => UpdateTagSchema.parse(d)).handler(updateExceptionReasonTag_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const patch = {};
  if (data.name) patch.name = data.name;
  if (data.color) patch.color = data.color;
  if (Object.keys(patch).length === 0) return {
    ok: true
  };
  const {
    error
  } = await context.supabase.from("exception_reason_tags").update(patch).eq("id", data.id);
  if (error) {
    if (error.code === "23505" || /duplicate|unique/i.test(error.message)) {
      throw new Error("Já existe uma tag com esse nome");
    }
    throw new Error(error.message);
  }
  return {
    ok: true
  };
});
const removeExceptionReasonTag_createServerFn_handler = createServerRpc({
  id: "b120782695f5867d4940aff0aee6e539a125c25fd9cca947c516a577fc058f9f",
  name: "removeExceptionReasonTag",
  filename: "src/lib/exception-tags.functions.ts"
}, (opts) => removeExceptionReasonTag.__executeServer(opts));
const removeExceptionReasonTag = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => object({
  id: string().uuid()
}).parse(d)).handler(removeExceptionReasonTag_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    error
  } = await context.supabase.from("exception_reason_tags").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  addExceptionReasonTag_createServerFn_handler,
  listExceptionReasonTags_createServerFn_handler,
  removeExceptionReasonTag_createServerFn_handler,
  updateExceptionReasonTag_createServerFn_handler
};
