import assert from "node:assert/strict";
import test from "node:test";
import { createHash, randomUUID } from "node:crypto";
import { registerHooks, stripTypeScriptTypes } from "node:module";
import { pathToFileURL, fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { existsSync } from "node:fs";
import { cancelledPolicyData } from "./helpers/audit-db.mjs";
import { CallbackPayloadSchema } from "../src/lib/audit/callback-payload.ts";
registerHooks({
  resolve(specifier, context, next) {
    if (specifier === "@tanstack/react-start")
      return {
        url: "data:text/javascript,export const createServerFn=()=>({middleware(){return this},validator(){return this},inputValidator(){return this},handler(fn){return fn}});",
        shortCircuit: true,
      };
    if (specifier === "@/integrations/supabase/auth-middleware")
      return {
        url: "data:text/javascript,export const requireSupabaseAuth={};",
        shortCircuit: true,
      };
    if (specifier === "@tanstack/react-router")
      return {
        url: "data:text/javascript,export const createFileRoute = () => config => config;",
        shortCircuit: true,
      };
    if (specifier === "@tanstack/react-start/server")
      return {
        url: "data:text/javascript,export function getRequest(){return{waitUntil(){}}}",
        shortCircuit: true,
      };
    if (specifier === "@/lib/policy-sync-runner.server")
      return {
        url: 'data:text/javascript,export function runPolicySyncImpl(){throw new Error("External sync must not be called in homolog")}',
        shortCircuit: true,
      };
    if (specifier.startsWith("@/"))
      return {
        url: pathToFileURL(
          resolve(fileURLToPath(new URL("../src/", import.meta.url)), specifier.slice(2) + ".ts"),
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
const { runAuditImpl } = await import("../src/lib/audit-run.server.ts");
const { Route } = await import("../src/routes/api/public/audit-callback.ts");
const { Route: RetryRoute } = await import("../src/routes/api/public/hooks/billing-retry.ts");
const { Route: BillingRoute } = await import("../src/routes/api/public/billing-sync-callback.ts");
const { supabaseAdmin } = await import("../src/integrations/supabase/client.server.ts");
const { withIntegrationContext } = await import("../src/lib/environment/context.server.ts");
const { runDueAutomations } = await import("../src/lib/automation-scheduler.server.ts");
const { processBillingFallbacks } = await import("../src/lib/billing-retry-worker.server.ts");
const { ExcelsiorMotorClient } = await import("../src/lib/excelsior/motor-client.server.ts");
const { requestAuditCorrection } = await import("../src/lib/audit-corrections.functions.ts");
const digest = (value) => createHash("sha256").update(JSON.stringify(value)).digest("hex");

for (const [deployment, requestedMode] of [
  ["production", "test"],
  ["preview", "production"],
])
  test(`${deployment}: audit reads public, writes only homolog, and preserves late callback scope`, async (t) => {
    const oldEnv = { ...process.env };
    const env = {
      VERCEL_ENV: deployment,
      VERCEL_URL: "cockpit-preview-team.vercel.app",
      SUPABASE_URL: "https://database.example",
      SUPABASE_SERVICE_ROLE_KEY: "fixture-private",
      PUBLIC_APP_URL: "https://cockpit.example",
      N8N_AUDIT_WEBHOOK_URL: "https://n8n.example/webhook/prod",
      N8N_CORRECTION_WEBHOOK_URL: "https://n8n.example/webhook/correction",
      AUDIT_CALLBACK_SECRET: "fixture-callback",
      BILLING_RETRY_HOOK_SECRET: "fixture-retry",
    };
    Object.assign(process.env, env);
    t.after(() => {
      for (const key of Object.keys(env)) {
        if (oldEnv[key] === undefined) delete process.env[key];
        else process.env[key] = oldEnv[key];
      }
    });
    t.mock.method(console, "info", () => {});
    t.mock.method(console, "error", () => {});
    t.mock.method(console, "log", () => {});
    const state = {
      public: {
        ...cancelledPolicyData(),
        policy_billing: [],
        audit_runs: [],
        audit_findings: [],
        audit_resolutions: [],
      },
      homolog: {
        ...cancelledPolicyData(),
        audit_runs: [],
        audit_findings: [],
        audit_resolutions: [],
        execution_contexts: [],
      },
    };
    state.public.audit_ignores[0].motivo = "REAL SOURCE EXCEPTION";
    state.homolog.policies = [];
    state.homolog.endorsements = [];
    state.homolog.audit_ignores[0].tipo_erro = "SYNTHETIC ONLY TYPE";
    const sent = [];
    const requests = [];
    let failPublicTable;
    t.mock.method(globalThis, "fetch", async (input, init = {}) => {
      const url = new URL(input);
      const headers = new Headers(init.headers);
      const method = init.method ?? "GET";
      if (url.origin !== "https://database.example") {
        assert.equal(url.origin, "https://n8n.example");
        sent.push({ url: String(url), body: JSON.parse(init.body) });
        return new Response("accepted", { status: 202 });
      }
      const schema =
        headers.get(method === "GET" ? "accept-profile" : "content-profile") ?? "public";
      const table = url.pathname.split("/").at(-1);
      requests.push({ schema, table, method });
      if (schema === "public" && method === "GET" && table === failPublicTable)
        return Response.json({ message: "private provider error", code: "42501" }, { status: 403 });
      const db = state[schema];
      assert.ok(db, "unknown schema");
      let rows = (db[table] ??= []);
      const matches = (row) =>
        [...url.searchParams].every(([k, v]) => {
          if (["select", "order", "limit", "offset", "on_conflict"].includes(k)) return true;
          if (v === "is.null") return row[k] == null;
          if (v.startsWith("eq.")) return String(row[k]) === v.slice(3);
          if (v.startsWith("neq.")) return String(row[k]) !== v.slice(4);
          if (v.startsWith("gt.")) return row[k] > v.slice(3);
          if (v.startsWith("lt.")) return row[k] < v.slice(3);
          return true;
        });
      let result;
      if (method === "POST") {
        const body = JSON.parse(init.body);
        const batch = Array.isArray(body) ? body : [body];
        result = batch.map((row) => ({
          id: randomUUID(),
          created_at: new Date().toISOString(),
          ...row,
        }));
        db[table] = [...rows, ...result];
      } else if (method === "PATCH") {
        const patch = JSON.parse(init.body);
        result = rows.filter(matches).map((row) => Object.assign(row, patch));
      } else if (method === "DELETE") {
        result = rows.filter(matches);
        db[table] = rows.filter((row) => !matches(row));
      } else {
        result = rows.filter(matches).sort((a, b) => (a.id < b.id ? -1 : 1));
        if (url.searchParams.has("limit"))
          result = result.slice(0, Number(url.searchParams.get("limit")));
      }
      const fields = url.searchParams.get("select");
      if (fields && fields !== "*")
        result = result.map((row) =>
          Object.fromEntries(fields.split(",").map((key) => [key, row[key]])),
        );
      if (headers.get("accept")?.includes("vnd.pgrst.object+json")) result = result[0] ?? null;
      return Response.json(result, { status: 200 });
    });
    const before = digest(state.public);
    const run = await runAuditImpl("ole-copilot", requestedMode);
    assert.equal(digest(state.public), before);
    assert.equal(state.homolog.audit_runs[0].id, run.runId);
    assert.equal(state.homolog.execution_contexts[0].data_scope, "homolog");
    assert.equal(sent[0].body.audit_contract_version, 2);
    assert.equal(sent[0].body.excecoes_especificas[0].tipo_erro, "PRÊMIO FORA DO PADRÃO");
    assert.equal(sent[0].url, "https://n8n.example/webhook-test/prod");
    assert.equal(sent[0].body.excecoes_especificas[0].motivo, "REAL SOURCE EXCEPTION");
    assert.deepEqual(sent[0].body.apolices_excluidas, [
      { apolice: "0001", status: "CANCELADA", motivo: "Status operacional: CANCELADA" },
    ]);
    assert.ok(!JSON.stringify(sent[0].body).includes("SYNTHETIC ONLY TYPE"));
    const payload = {
      run_id: run.runId,
      status: "success",
      resumo: { aprovados: 0, reprovados: 1, total_processado: 1 },
      apolices_com_erro: [{ apolice: "0001", erros: [{ tipo_erro: "COBERTURA INATIVA" }] }],
    };
    assert.ok(CallbackPayloadSchema.safeParse(payload).success);
    const response = await withIntegrationContext("production", () =>
      Route.server.handlers.POST({
        request: new Request(
          `https://cockpit.example/api/public/audit-callback?run_id=${run.runId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-callback-secret": "fixture-callback",
            },
            body: JSON.stringify(payload),
          },
        ),
      }),
    );
    assert.equal(response.status, 200, await response.clone().text());
    assert.equal(state.homolog.audit_runs[0].status, "success");
    assert.equal(state.homolog.audit_findings.length, 1);
    assert.equal(state.homolog.audit_runs[0].aprovados + state.homolog.audit_runs[0].reprovados, 1);
    assert.equal(digest(state.public), before);
    await withIntegrationContext("test", () =>
      supabaseAdmin.from("audit_findings").delete().eq("run_id", run.runId),
    );
    assert.equal(state.homolog.audit_findings.length, 0);
    assert.equal(digest(state.public), before);
    assert.deepEqual(
      [...new Set(requests.filter((q) => q.schema === "public").map((q) => q.table))].sort(),
      ["audit_ignores", "endorsements", "policies", "policy_billing"],
    );
    assert.ok(
      requests.every(
        (q) => q.schema === "homolog" || (q.schema === "public" && q.method === "GET"),
      ),
      "public is a SELECT-only source; all effects stay homolog",
    );
    assert.equal(state.public.audit_runs.length, 0);
    assert.equal(state.public.audit_findings.length, 0);
    assert.equal(state.public.audit_resolutions.length, 0);
    for (const table of ["policies", "endorsements", "policy_billing", "audit_ignores"]) {
      failPublicTable = table;
      await assert.rejects(runAuditImpl("ole-copilot", requestedMode), new RegExp(table));
      assert.equal(state.homolog.audit_runs.at(-1).status, "error");
      assert.equal(sent.length, 1, "a failed real source cannot dispatch or fall back to fixtures");
      assert.equal(digest(state.public), before);
    }
    failPublicTable = undefined;
    const requestCount = requests.length;
    await assert.rejects(
      withIntegrationContext("test", () => runDueAutomations()),
      /desabilitados|indisponíveis/,
    );
    await assert.rejects(
      withIntegrationContext("test", () => processBillingFallbacks()),
      /bloqueada|desabilitados/,
    );
    assert.throws(
      () => withIntegrationContext("test", () => new ExcelsiorMotorClient()),
      /bloqueada/,
    );
    await assert.rejects(
      withIntegrationContext("test", () =>
        new ExcelsiorMotorClient({
          username: "synthetic",
          password: "synthetic",
          servicesBaseUrl: "https://motor.example",
          systemId: "synthetic",
          requestTimeoutMs: 100,
          billingRequestTimeoutMs: 100,
        }).listPolicies(),
      ),
      /bloqueada/,
      "an explicitly configured client cannot bypass the request-time environment guard",
    );
    assert.throws(
      () => withIntegrationContext("test", () => supabaseAdmin.auth.admin),
      /bloqueadas/,
    );
    await assert.rejects(
      requestAuditCorrection({
        data: { run_id: run.runId, finding_ids: [randomUUID()], mode: "test" },
        context: { userId: randomUUID() },
      }),
      /bloqueada/,
      "read-only audit authorization must not enable external correction mutations",
    );
    assert.equal(
      requests.length,
      requestCount,
      "workers and identity mutations fail before transport",
    );
    process.env.VERCEL_ENV = "preview";
    const retry = await RetryRoute.server.handlers.POST({
      request: new Request("https://preview.example/api/public/hooks/billing-retry", {
        method: "POST",
        headers: { "x-hook-secret": "fixture-retry" },
      }),
    });
    assert.equal(retry.status, 403);
    assert.notEqual((await retry.json()).accepted, true);
    process.env.VERCEL_ENV = "production";
    await runAuditImpl("ole-copilot", "production");
    assert.equal(state.public.audit_runs.length, 1);
    await assert.rejects(
      requestAuditCorrection({
        data: {
          run_id: state.public.audit_runs[0].id,
          finding_ids: [randomUUID()],
          mode: "production",
        },
        context: { userId: randomUUID() },
      }),
      /auditoria exibida/,
      "production corrections still reach normal data validation, not the homolog guard",
    );
    assert.equal(sent[1].url, "https://n8n.example/webhook/prod");
    assert.equal(state.homolog.execution_contexts.at(-1).data_scope, "production");
    const orphanId = randomUUID();
    state.homolog.execution_contexts.push({
      run_id: orphanId,
      integration: "policy_sync",
      data_scope: "homolog",
      webhook_mode: "test",
      origin_environment: "production",
    });
    const orphan = await BillingRoute.server.handlers.POST({
      request: new Request(
        `https://cockpit.example/api/public/billing-sync-callback?run_id=${orphanId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-callback-secret": "fixture-callback" },
          body: "[]",
        },
      ),
    });
    assert.equal(orphan.status, 404, "registry without its run cannot accept a billing callback");
  });
