import { c as createServerRpc } from "./createServerRpc-aKyz3faE.mjs";
import { c as createServerFn } from "./server-BxlZVXOU.mjs";
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
const lookupInvite_createServerFn_handler = createServerRpc({
  id: "47075ae2d3122d99ee03f94b96f765166f1086578505d3336fe9e1bf0dd90afc",
  name: "lookupInvite",
  filename: "src/lib/invites.functions.ts"
}, (opts) => lookupInvite.__executeServer(opts));
const lookupInvite = createServerFn({
  method: "POST"
}).inputValidator((input) => object({
  token: string().min(10).max(200)
}).parse(input)).handler(lookupInvite_createServerFn_handler, async ({
  data
}) => {
  const crypto = await import("crypto");
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const tokenHash = crypto.createHash("sha256").update(data.token).digest("hex");
  const {
    data: invite
  } = await supabaseAdmin.from("user_invites").select("id, email, role, expires_at, used_at, revoked_at").eq("token_hash", tokenHash).maybeSingle();
  if (!invite) return {
    valid: false,
    reason: "not_found"
  };
  if (invite.revoked_at) return {
    valid: false,
    reason: "revoked"
  };
  if (invite.used_at) return {
    valid: false,
    reason: "used"
  };
  if (new Date(invite.expires_at).getTime() < Date.now()) return {
    valid: false,
    reason: "expired"
  };
  return {
    valid: true,
    email: invite.email,
    role: invite.role
  };
});
const consumeInvite_createServerFn_handler = createServerRpc({
  id: "cd65356f1b6bb70a3c5ad26f63deb3b26e87f76ccf4c1f418e2f23ef5fb0a78b",
  name: "consumeInvite",
  filename: "src/lib/invites.functions.ts"
}, (opts) => consumeInvite.__executeServer(opts));
const consumeInvite = createServerFn({
  method: "POST"
}).inputValidator((input) => object({
  token: string().min(10).max(200),
  full_name: string().min(1).max(120),
  password: string().min(8).max(72)
}).parse(input)).handler(consumeInvite_createServerFn_handler, async ({
  data
}) => {
  const crypto = await import("crypto");
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const tokenHash = crypto.createHash("sha256").update(data.token).digest("hex");
  const {
    data: invite,
    error
  } = await supabaseAdmin.from("user_invites").select("*").eq("token_hash", tokenHash).maybeSingle();
  if (error) throw error;
  if (!invite) throw new Error("Convite inválido");
  if (invite.revoked_at) throw new Error("Convite revogado");
  if (invite.used_at) throw new Error("Convite já utilizado");
  if (new Date(invite.expires_at).getTime() < Date.now()) throw new Error("Convite expirado");
  const {
    data: created,
    error: cErr
  } = await supabaseAdmin.auth.admin.createUser({
    email: invite.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      full_name: data.full_name
    }
  });
  if (cErr) throw cErr;
  const userId = created.user.id;
  await supabaseAdmin.from("profiles").update({
    full_name: data.full_name,
    created_by: invite.created_by
  }).eq("id", userId);
  if (invite.role !== "user") {
    await supabaseAdmin.from("user_roles").insert({
      user_id: userId,
      role: invite.role
    });
  }
  const {
    data: claimed,
    error: uErr
  } = await supabaseAdmin.from("user_invites").update({
    used_at: (/* @__PURE__ */ new Date()).toISOString(),
    used_by: userId
  }).eq("id", invite.id).is("used_at", null).select("id").maybeSingle();
  if (uErr || !claimed) {
    await supabaseAdmin.auth.admin.deleteUser(userId);
    throw new Error("Convite já utilizado");
  }
  return {
    ok: true
  };
});
export {
  consumeInvite_createServerFn_handler,
  lookupInvite_createServerFn_handler
};
