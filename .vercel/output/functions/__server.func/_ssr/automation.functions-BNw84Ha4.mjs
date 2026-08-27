import { c as createServerRpc } from "./createServerRpc-aKyz3faE.mjs";
import { c as createServerFn } from "./server-BxlZVXOU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BqwiLAOE.mjs";
import { a as assertAdmin } from "./assert-admin-D-zd5zKa.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
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
const getAutomationSchedules_createServerFn_handler = createServerRpc({
  id: "a6691374db1e6f2781de2c0565132cf29160cb77c2bd743bf6996a2ac72b72a3",
  name: "getAutomationSchedules",
  filename: "src/lib/automation.functions.ts"
}, (opts) => getAutomationSchedules.__executeServer(opts));
const getAutomationSchedules = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getAutomationSchedules_createServerFn_handler, async ({
  context
}) => {
  const {
    data,
    error
  } = await context.supabase.from("automation_schedules").select("job, enabled, run_at_time, weekdays, timezone, last_triggered_at, last_status, last_error").order("job", {
    ascending: true
  });
  if (error) throw new Error(error.message);
  return data ?? [];
});
const updateAutomationSchedule_createServerFn_handler = createServerRpc({
  id: "acb922d13a5ff634c3eab89f3dc86b04f246c73750006e769eebc8106cffa916",
  name: "updateAutomationSchedule",
  filename: "src/lib/automation.functions.ts"
}, (opts) => updateAutomationSchedule.__executeServer(opts));
const updateAutomationSchedule = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(updateAutomationSchedule_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  if (data.job !== "audit" && data.job !== "policy_sync") {
    throw new Error("Job inválido");
  }
  const patch = {};
  if (typeof data.enabled === "boolean") patch.enabled = data.enabled;
  if (data.run_at_time) {
    if (!/^\d{2}:\d{2}(:\d{2})?$/.test(data.run_at_time)) {
      throw new Error("Horário inválido (use HH:MM)");
    }
    patch.run_at_time = data.run_at_time.length === 5 ? `${data.run_at_time}:00` : data.run_at_time;
  }
  if (data.weekdays) {
    const wd = [...new Set(data.weekdays.filter((n) => Number.isInteger(n) && n >= 0 && n <= 6))].sort();
    if (wd.length === 0) throw new Error("Selecione pelo menos um dia da semana");
    patch.weekdays = wd;
  }
  if (Object.keys(patch).length === 0) return {
    ok: true
  };
  const {
    supabaseAdmin
  } = await import("./client.server-BIG6Ien0.mjs");
  const {
    error
  } = await supabaseAdmin.from("automation_schedules").update(patch).eq("job", data.job);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  getAutomationSchedules_createServerFn_handler,
  updateAutomationSchedule_createServerFn_handler
};
