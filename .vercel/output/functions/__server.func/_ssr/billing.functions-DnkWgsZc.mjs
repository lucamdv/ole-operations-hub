import { c as createServerRpc } from "./createServerRpc-aKyz3faE.mjs";
import { c as createServerFn } from "./server-BxlZVXOU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BqwiLAOE.mjs";
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
const COLS = "numero_apolice, numero_endosso, numero_parcela, id_parcela_seguradora, numero_proposta, status_pagamento, situacao_emissao, data_quitacao, data_vencimento";
const getPolicyBilling_createServerFn_handler = createServerRpc({
  id: "253595f411443d4ca128c67aed97d33b1d74a5771d47d7d425490c6944b254da",
  name: "getPolicyBilling",
  filename: "src/lib/billing.functions.ts"
}, (opts) => getPolicyBilling.__executeServer(opts));
const getPolicyBilling = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(getPolicyBilling_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    data: rows,
    error
  } = await context.supabase.from("policy_billing").select(COLS).eq("numero_apolice", data.numero).order("numero_endosso", {
    ascending: true
  }).order("numero_parcela", {
    ascending: true
  });
  if (error) throw new Error(error.message);
  return rows ?? [];
});
const getBillingIndex_createServerFn_handler = createServerRpc({
  id: "b5e47136d01b651000c46dba30ebd939155f11ed50994990d028faf809d1d976",
  name: "getBillingIndex",
  filename: "src/lib/billing.functions.ts"
}, (opts) => getBillingIndex.__executeServer(opts));
const getBillingIndex = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getBillingIndex_createServerFn_handler, async ({
  context
}) => {
  const {
    data: rows,
    error
  } = await context.supabase.from("policy_billing").select(COLS).order("numero_endosso", {
    ascending: true
  }).order("numero_parcela", {
    ascending: true
  });
  if (error) throw new Error(error.message);
  return rows ?? [];
});
export {
  getBillingIndex_createServerFn_handler,
  getPolicyBilling_createServerFn_handler
};
