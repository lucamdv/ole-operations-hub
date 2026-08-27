import { c as createServerRpc } from "./createServerRpc-aKyz3faE.mjs";
import { c as createServerFn } from "./server-BxlZVXOU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BqwiLAOE.mjs";
import { a as assertAdmin } from "./assert-admin-D-zd5zKa.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { _ as _enum, o as object, s as string } from "../_libs/zod.mjs";
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
const roleSchema = _enum(["admin", "manager", "user"]);
const listUsers_createServerFn_handler = createServerRpc({
  id: "ae1d531e1714d053869d1e069815a71e199346ef621d80ab0f46be85080718ab",
  name: "listUsers",
  filename: "src/lib/admin.functions.ts"
}, (opts) => listUsers.__executeServer(opts));
const listUsers = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listUsers_createServerFn_handler, async ({
  context
}) => {
  await assertAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const {
    data: profiles,
    error
  } = await supabaseAdmin.from("profiles").select("id, email, full_name, must_change_password, created_at").order("created_at", {
    ascending: false
  });
  if (error) throw error;
  const {
    data: roles,
    error: rErr
  } = await supabaseAdmin.from("user_roles").select("user_id, role");
  if (rErr) throw rErr;
  const roleMap = /* @__PURE__ */ new Map();
  for (const r of roles ?? []) {
    const arr = roleMap.get(r.user_id) ?? [];
    arr.push(r.role);
    roleMap.set(r.user_id, arr);
  }
  return (profiles ?? []).map((p) => ({
    ...p,
    roles: roleMap.get(p.id) ?? []
  }));
});
const createUserManual_createServerFn_handler = createServerRpc({
  id: "d968795a9943bb294c68c9bf481d84d3103d5ea1373825cfedc553251779dfb3",
  name: "createUserManual",
  filename: "src/lib/admin.functions.ts"
}, (opts) => createUserManual.__executeServer(opts));
const createUserManual = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  email: string().email().max(255),
  full_name: string().min(1).max(120),
  role: roleSchema,
  password: string().min(8).max(72)
}).parse(input)).handler(createUserManual_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const {
    data: created,
    error
  } = await supabaseAdmin.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      full_name: data.full_name
    }
  });
  if (error) throw error;
  const userId = created.user.id;
  await supabaseAdmin.from("profiles").update({
    full_name: data.full_name,
    must_change_password: true,
    created_by: context.userId
  }).eq("id", userId);
  if (data.role !== "user") {
    await supabaseAdmin.from("user_roles").insert({
      user_id: userId,
      role: data.role
    });
  }
  return {
    id: userId
  };
});
const updateUser_createServerFn_handler = createServerRpc({
  id: "a0e7b3e2e2d2de9fd51fec8fd9758793248995520c49f064ef6c40d9e3fe4c28",
  name: "updateUser",
  filename: "src/lib/admin.functions.ts"
}, (opts) => updateUser.__executeServer(opts));
const updateUser = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  user_id: string().uuid(),
  full_name: string().min(1).max(120).optional(),
  role: roleSchema.optional()
}).parse(input)).handler(updateUser_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  if (data.full_name !== void 0) {
    await supabaseAdmin.from("profiles").update({
      full_name: data.full_name
    }).eq("id", data.user_id);
  }
  if (data.role) {
    await supabaseAdmin.from("user_roles").delete().eq("user_id", data.user_id);
    await supabaseAdmin.from("user_roles").insert({
      user_id: data.user_id,
      role: data.role
    });
  }
  return {
    ok: true
  };
});
const deleteUser_createServerFn_handler = createServerRpc({
  id: "5f15d9c6194c3264109b1c81741c60a8654b66a5caffc1ee319315a3a983394e",
  name: "deleteUser",
  filename: "src/lib/admin.functions.ts"
}, (opts) => deleteUser.__executeServer(opts));
const deleteUser = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  user_id: string().uuid()
}).parse(input)).handler(deleteUser_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  if (data.user_id === context.userId) throw new Error("Não pode remover a própria conta");
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const {
    error
  } = await supabaseAdmin.auth.admin.deleteUser(data.user_id);
  if (error) throw error;
  return {
    ok: true
  };
});
const listInvites_createServerFn_handler = createServerRpc({
  id: "3df19b731eca75ae30d6d88b184fd9045b8d6f7107fd063e8d21f5d30835df9f",
  name: "listInvites",
  filename: "src/lib/admin.functions.ts"
}, (opts) => listInvites.__executeServer(opts));
const listInvites = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listInvites_createServerFn_handler, async ({
  context
}) => {
  await assertAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("user_invites").select("id, email, role, expires_at, used_at, revoked_at, created_at").order("created_at", {
    ascending: false
  });
  if (error) throw error;
  return data ?? [];
});
const createInvite_createServerFn_handler = createServerRpc({
  id: "8d1f79275fdf5502f58ef20472ac22719103c8a4bf592e74a8c9052e9a9f1968",
  name: "createInvite",
  filename: "src/lib/admin.functions.ts"
}, (opts) => createInvite.__executeServer(opts));
const createInvite = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  email: string().email().max(255),
  role: roleSchema
}).parse(input)).handler(createInvite_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const crypto = await import("crypto");
  const token = crypto.randomBytes(32).toString("base64url");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1e3).toISOString();
  const {
    data: invite,
    error
  } = await supabaseAdmin.from("user_invites").insert({
    email: data.email,
    role: data.role,
    token_hash: tokenHash,
    expires_at: expiresAt,
    created_by: context.userId
  }).select("id, expires_at").single();
  if (error) throw error;
  return {
    id: invite.id,
    token,
    expires_at: invite.expires_at
  };
});
const revokeInvite_createServerFn_handler = createServerRpc({
  id: "f6e9c4c2e2c4e30fff84427a8a716067a15e6e651a76c96191d4c8424389bbab",
  name: "revokeInvite",
  filename: "src/lib/admin.functions.ts"
}, (opts) => revokeInvite.__executeServer(opts));
const revokeInvite = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  id: string().uuid()
}).parse(input)).handler(revokeInvite_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  await supabaseAdmin.from("user_invites").update({
    revoked_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("id", data.id);
  return {
    ok: true
  };
});
const getCurrentRole_createServerFn_handler = createServerRpc({
  id: "580016288dfebc01a7fcef2adc8a992bda2cf72a0b82855829bc8df91918caf4",
  name: "getCurrentRole",
  filename: "src/lib/admin.functions.ts"
}, (opts) => getCurrentRole.__executeServer(opts));
const getCurrentRole = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getCurrentRole_createServerFn_handler, async ({
  context
}) => {
  const {
    data,
    error
  } = await context.supabase.from("user_roles").select("role").eq("user_id", context.userId);
  if (error) throw error;
  const roles = (data ?? []).map((r) => r.role);
  const isAdmin = roles.includes("admin");
  const isManager = roles.includes("manager");
  const {
    data: profile
  } = await context.supabase.from("profiles").select("must_change_password, full_name, email").eq("id", context.userId).maybeSingle();
  return {
    roles,
    isAdmin,
    isManager,
    mustChangePassword: profile?.must_change_password ?? false,
    profile: profile ?? null
  };
});
const changeOwnPassword_createServerFn_handler = createServerRpc({
  id: "3af6fcdcfa9f296b18086f5d89f2e72bfd34e3b99e4ea078aa9e85515c957363",
  name: "changeOwnPassword",
  filename: "src/lib/admin.functions.ts"
}, (opts) => changeOwnPassword.__executeServer(opts));
const changeOwnPassword = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  new_password: string().min(8).max(72)
}).parse(input)).handler(changeOwnPassword_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const {
    error
  } = await supabaseAdmin.auth.admin.updateUserById(context.userId, {
    password: data.new_password
  });
  if (error) throw error;
  await context.supabase.from("profiles").update({
    must_change_password: false
  }).eq("id", context.userId);
  return {
    ok: true
  };
});
export {
  changeOwnPassword_createServerFn_handler,
  createInvite_createServerFn_handler,
  createUserManual_createServerFn_handler,
  deleteUser_createServerFn_handler,
  getCurrentRole_createServerFn_handler,
  listInvites_createServerFn_handler,
  listUsers_createServerFn_handler,
  revokeInvite_createServerFn_handler,
  updateUser_createServerFn_handler
};
