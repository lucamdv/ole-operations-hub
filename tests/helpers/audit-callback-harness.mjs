import assert from "node:assert/strict";
import { randomUUID, createHash } from "node:crypto";
import { registerHooks, stripTypeScriptTypes } from "node:module";
import { pathToFileURL, fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { existsSync, readFileSync } from "node:fs";
import ts from "typescript";

registerHooks({
  resolve(specifier, context, next) {
    if (specifier === "@tanstack/react-start")
      return {
        url: "data:text/javascript,export const createServerFn=()=>({middleware(){return this},inputValidator(){return this},handler(fn){return fn}})",
        shortCircuit: true,
      };
    if (specifier === "@/integrations/supabase/auth-middleware")
      return {
        url: "data:text/javascript,export const requireSupabaseAuth={}",
        shortCircuit: true,
      };
    if (specifier === "@tanstack/react-router")
      return {
        url: "data:text/javascript,export const createFileRoute=()=>config=>config",
        shortCircuit: true,
      };
    if (specifier.startsWith("@/"))
      return {
        url: pathToFileURL(
          resolve(
            fileURLToPath(new URL("../../src/", import.meta.url)),
            specifier.slice(2) + ".ts",
          ),
        ).href,
        shortCircuit: true,
      };
    if (specifier.startsWith(".") && !/\.(ts|js|mjs)$/.test(specifier)) {
      const url = new URL(specifier + ".ts", context.parentURL);
      if (existsSync(fileURLToPath(url))) return { url: url.href, shortCircuit: true };
    }
    return next(specifier, context);
  },
  load(url, context, next) {
    if (url.endsWith(".tsx"))
      return {
        format: "module",
        source: ts.transpileModule(readFileSync(fileURLToPath(url), "utf8"), {
          compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext },
        }).outputText,
        shortCircuit: true,
      };
    const result = next(url, context);
    if (result.format === "module-typescript")
      return {
        ...result,
        format: "module",
        source: stripTypeScriptTypes(String(result.source), {
          mode: "transform",
          disableExperimentalWarning: true,
        }),
      };
    return result;
  },
});

export const { Route } = await import("../../src/routes/api/public/audit-callback.ts");
export const readers = await import("../../src/lib/audit.functions.ts");
export const { supabaseAdmin } = await import("../../src/integrations/supabase/client.server.ts");
export const { withIntegrationContext } =
  await import("../../src/lib/environment/context.server.ts");
export const hash = (value) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
export const NOW = "2026-10-29T12:00:00.000Z";
export const PREV = "2026-10-28T12:00:00.000Z";
export const policyError = (apolice = "000002") => ({
  apolice,
  erros: [{ tipo_erro: "GAP DE DIA", endosso_com_erro: "000001", nivel: "erro" }],
});
export const resultPayload = (overrides = {}) => ({
  status: "success",
  status_geral: "PARCIAL",
  audit_contract_version: 2,
  resumo: {
    aprovados: 0,
    reprovados: 1,
    total_processado: 1,
    total_candidatas: 2,
    total_excluidas: 0,
    total_ignoradas: 1,
  },
  apolices_ignoradas: [{ apolice: "000001", motivo: "Sem coberturas válidas." }],
  apolices_com_erro: [policyError()],
  ...overrides,
});
export const completePayload = () =>
  resultPayload({
    status_geral: "SUCESSO",
    resumo: {
      aprovados: 2,
      reprovados: 0,
      total_processado: 2,
      total_candidatas: 2,
      total_excluidas: 0,
      total_ignoradas: 0,
    },
    apolices_ignoradas: [],
    apolices_com_erro: [],
  });

export function callbackHarness(t, deployment = "preview") {
  const saved = { ...process.env };
  const env = {
    VERCEL_ENV: deployment,
    SUPABASE_URL: "https://database.example",
    SUPABASE_SERVICE_ROLE_KEY: "fixture-only",
    AUDIT_CALLBACK_SECRET: "fixture-callback",
  };
  Object.assign(process.env, env);
  t.after(() => {
    for (const k of Object.keys(env))
      if (saved[k] === undefined) delete process.env[k];
      else process.env[k] = saved[k];
  });
  for (const name of ["info", "error", "log"]) t.mock.method(console, name, () => {});
  const state = {
    public: { audit_runs: [], audit_findings: [], audit_resolutions: [], audit_ignores: [] },
    homolog: {
      audit_runs: [],
      audit_findings: [],
      audit_resolutions: [],
      audit_ignores: [],
      execution_contexts: [],
    },
  };
  const requests = [];
  let fail;
  t.mock.method(globalThis, "fetch", async (input, init = {}) => {
    const url = new URL(input);
    assert.equal(url.origin, "https://database.example", "no real service/network calls");
    const headers = new Headers(init.headers),
      method = init.method ?? "GET";
    const schema = headers.get(method === "GET" ? "accept-profile" : "content-profile") ?? "public";
    const table = url.pathname.split("/").at(-1),
      query = url.searchParams;
    requests.push({ schema, table, method, query: new URLSearchParams(query) });
    if (fail?.({ schema, table, method, query }))
      return Response.json({ code: "42501", message: "fixture failure" }, { status: 403 });
    const db = state[schema];
    assert.ok(db);
    const rows = db[table] ?? [];
    const matches = (row) =>
      [...query].every(([k, v]) => {
        if (["select", "order", "limit", "offset", "on_conflict"].includes(k)) return true;
        if (v === "is.null") return row[k] == null;
        if (v === "not.is.null") return row[k] != null;
        if (v.startsWith("eq.")) return String(row[k]) === v.slice(3);
        if (v.startsWith("neq.")) return row[k] != null && String(row[k]) !== v.slice(4);
        if (v.startsWith("lt.")) return row[k] < v.slice(3);
        if (v.startsWith("gt.")) return row[k] > v.slice(3);
        if (v.startsWith("in.("))
          return v
            .slice(4, -1)
            .split(",")
            .map((x) => x.replaceAll('"', ""))
            .includes(String(row[k]));
        throw new Error(`unimplemented query ${k}=${v}`);
      });
    let result;
    if (method === "POST") {
      const body = JSON.parse(init.body),
        batch = Array.isArray(body) ? body : [body];
      result = [];
      for (const row of batch) {
        if (
          headers.get("prefer")?.includes("resolution=ignore-duplicates") &&
          rows.some((r) => r.id === row.id)
        )
          continue;
        const inserted = { id: randomUUID(), created_at: NOW, ...row };
        rows.push(inserted);
        result.push(inserted);
      }
      db[table] = rows;
    } else if (method === "PATCH")
      result = rows.filter(matches).map((row) => Object.assign(row, JSON.parse(init.body)));
    else if (method === "GET") {
      result = rows.filter(matches);
      const order = (query.get("order") ?? "").split(",").filter(Boolean);
      result.sort((a, b) => {
        for (const rule of order) {
          const [key, dir] = rule.split(".");
          if (a[key] !== b[key]) return (a[key] < b[key] ? -1 : 1) * (dir === "desc" ? -1 : 1);
        }
        return 0;
      });
      const offset = Number(query.get("offset") ?? 0);
      result = result.slice(offset, offset + Number(query.get("limit") ?? 1000));
    } else throw new Error(`Unexpected mutation: ${method}`);
    const fields = query.get("select");
    if (fields && fields !== "*")
      result = result.map((row) =>
        Object.fromEntries(fields.split(",").map((k) => [k.trim(), row[k.trim()]])),
      );
    if (headers.get("accept")?.includes("vnd.pgrst.object+json")) result = result[0] ?? null;
    return Response.json(result);
  });
  function addRun(overrides = {}) {
    const run = {
      id: randomUUID(),
      created_at: NOW,
      status: "running",
      status_geral: "PROCESSANDO",
      aprovados: 0,
      reprovados: 0,
      total_processado: 0,
      raw: { audit_contract_version: 2, apolices_excluidas: [], excecoes_especificas: [] },
      ...overrides,
    };
    state.homolog.audit_runs.push(run);
    state.homolog.execution_contexts.push({
      run_id: run.id,
      integration: "audit",
      data_scope: "homolog",
      webhook_mode: "test",
      origin_environment: deployment,
    });
    return run;
  }
  const send = (run, body) =>
    withIntegrationContext("production", () =>
      Route.server.handlers.POST({
        request: new Request(`https://preview.example/api/public/audit-callback?run_id=${run.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-callback-secret": "fixture-callback" },
          body: JSON.stringify(body),
        }),
      }),
    );
  return {
    state,
    requests,
    addRun,
    send,
    fail: (fn) => {
      fail = fn;
    },
  };
}
