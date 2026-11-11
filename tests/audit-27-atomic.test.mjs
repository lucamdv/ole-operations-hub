import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { callbackHarness, resultPayload } from "./helpers/audit-callback-harness.mjs";

const sql = readFileSync(
  new URL("../supabase/migrations/20261111183000_audit_027_atomic_callback.sql", import.meta.url),
  "utf8",
);

test("AUDIT-02.7 SQL finalizes each run under a PostgreSQL row lock", () => {
  for (const schema of ["homolog", "public"]) {
    const part = sql.split(`-- Applies exclusively to the ${schema} operational scope.`)[1]?.split("-- Applies exclusively")[0];
    assert.ok(part, `missing ${schema} transaction`);
    assert.match(part, /FOR UPDATE/);
    assert.match(part, /IF current_status <> 'running' THEN/);
    assert.match(part, new RegExp(`INSERT INTO ${schema}\\.audit_findings`));
    assert.match(part, new RegExp(`UPDATE ${schema}\\.audit_resolutions`));
    assert.match(part, new RegExp(`UPDATE ${schema}\\.audit_runs`));
    assert.match(part, /ON CONFLICT \(id\) DO NOTHING/);
    assert.match(part, /SECURITY INVOKER/);
    assert.match(part, new RegExp(`REVOKE ALL ON FUNCTION ${schema}`));
    assert.match(part, new RegExp(`GRANT EXECUTE ON FUNCTION ${schema}`));
  }
  assert.match(sql, /^BEGIN;/m);
  assert.match(sql, /^COMMIT;/m);
});

test("cancelled run cannot acquire findings even when cancellation wins just before SQL commit", async (t) => {
  const h = callbackHarness(t);
  const run = h.addRun();
  let cancellationInjected = false;
  h.fail(({ table, method }) => {
    if (!cancellationInjected && table === "audit_runs" && method === "PATCH") {
      cancellationInjected = true;
      run.status = "cancelled";
      run.status_geral = "CANCELADA";
    }
    return false;
  });
  const callback = await h.send(run, resultPayload());
  assert.equal(callback.status, 200, await callback.clone().text());
  const body = await callback.json();
  assert.equal(body.duplicate, true);
  assert.equal(run.status, "cancelled");
  assert.equal(h.state.homolog.audit_findings.length, 0);
  assert.equal(h.state.homolog.audit_resolutions.length, 0);
});

test("retry after any SQL stage failure leaves zero partial findings or reopenings", async (t) => {
  const h = callbackHarness(t);
  const run = h.addRun();
  let once = true;
  h.fail(({ table, method }) => {
    if (once && table === "audit_runs" && method === "PATCH") {
      once = false;
      return true;
    }
    return false;
  });
  const first = await h.send(run, resultPayload());
  assert.equal(first.status, 500);
  assert.equal(run.status, "running");
  assert.equal(h.state.homolog.audit_findings.length, 0);
  assert.equal((await h.send(run, resultPayload())).status, 200);
  assert.equal(run.status, "success");
  assert.equal(h.state.homolog.audit_findings.length, 1);
});

test("production v3 requires a dedicated opt-in; preview remains isolated", () => {
  const trigger = readFileSync(new URL("../src/lib/audit-run.server.ts", import.meta.url), "utf8");
  const callback = readFileSync(new URL("../src/routes/api/public/audit-callback.ts", import.meta.url), "utf8");
  assert.match(trigger, /process\.env\.AUDIT_PRODUCTION_CONTRACT_VERSION === "3"/);
  assert.match(trigger, /context\.schema === "public"/);
  assert.match(trigger, /"https:\/\/olexcockpit\.vercel\.app"/);
  assert.match(trigger, /!destination\.pathname\.includes\("\/webhook\/"/);
  assert.match(callback, /context\.schema === "public"/);
  assert.match(callback, /context\.schema === "homolog"/);
});
