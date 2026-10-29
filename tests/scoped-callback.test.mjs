import assert from "node:assert/strict";
import test from "node:test";
import { handleScopedCallback } from "../src/lib/environment/callback.server.ts";
import { getOperationalContext } from "../src/lib/environment/context.server.ts";
const id = "c162ea64-2342-4678-bb83-23d461930fcb";
const record = {
  run_id: id,
  integration: "audit",
  data_scope: "homolog",
  webhook_mode: "test",
  origin_environment: "production",
};
function setup(t) {
  const old = process.env.VERCEL_ENV;
  process.env.VERCEL_ENV = "production";
  t.after(() => {
    if (old === undefined) delete process.env.VERCEL_ENV;
    else process.env.VERCEL_ENV = old;
  });
}
function req(body = {}, headers = { "x-callback-secret": "test-secret" }, query = `?run_id=${id}`) {
  return new Request(`https://preview.example/callback${query}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}
function options(extra = {}) {
  return {
    integration: "audit",
    secrets: ["test-secret"],
    repository: { find: async () => record },
    handler: async () => new Response(JSON.stringify({ schema: getOperationalContext().schema })),
    ...extra,
  };
}
test("actual callback wrapper persists using original homolog context", async (t) => {
  setup(t);
  const r = await handleScopedCallback(req(), options());
  assert.equal(r.status, 200);
  assert.deepEqual(await r.json(), { schema: "homolog" });
});
test("unauthorized callback never reads database", async (t) => {
  setup(t);
  const r = await handleScopedCallback(
    req({}, {}),
    options({
      repository: {
        find() {
          assert.fail("unauthorized lookup");
        },
      },
    }),
  );
  assert.equal(r.status, 401);
});
test("missing, malformed and mismatched identifiers are rejected before mutation", async (t) => {
  setup(t);
  for (const request of [
    req({}, undefined, ""),
    req({ run_id: "invalid" }),
    req({}, undefined, "?run_id=nope"),
  ]) {
    const r = await handleScopedCallback(request, options());
    assert.equal(r.status, 400);
  }
});
test("external scope override is rejected", async (t) => {
  setup(t);
  const r = await handleScopedCallback(req({ scope: "public" }), options());
  assert.equal(r.status, 403);
});
test("all supported envelopes reject conflicting run IDs before handler invocation", async (t) => {
  setup(t);
  const other = "11111111-1111-4111-8111-111111111111";
  for (const body of [
    { run_id: id, payload: { run_id: other } },
    { body: { run_id: other } },
    { json: { body: { payload: { run_id: other } } } },
    [{ run_id: id }, { run_id: other }],
  ]) {
    const response = await handleScopedCallback(
      req(body),
      options({
        handler() {
          assert.fail("conflicting callback invoked handler");
        },
      }),
    );
    assert.equal(response.status, 400);
  }
});
test("scope tampering inside body/json/nested arrays is rejected", async (t) => {
  setup(t);
  for (const body of [
    { body: { data_scope: "public" } },
    { json: { payload: { scope: "production" } } },
    [{ payload: { body: { scope: "public" } } }],
  ]) {
    const response = await handleScopedCallback(
      req(body),
      options({
        handler() {
          assert.fail("scope-tampered callback invoked handler");
        },
      }),
    );
    assert.equal(response.status, 403);
  }
});
test("nonexistent registry entry is refused and handler not called", async (t) => {
  setup(t);
  const r = await handleScopedCallback(
    req(),
    options({
      repository: { find: async () => null },
      handler() {
        assert.fail("must not mutate");
      },
    }),
  );
  assert.equal(r.status, 404);
});
test("integration and origin mismatch are refused", async (t) => {
  setup(t);
  for (const changes of [{ integration: "extraction" }, { origin_environment: "preview" }]) {
    const r = await handleScopedCallback(
      req(),
      options({ repository: { find: async () => ({ ...record, ...changes }) } }),
    );
    assert.equal(r.status, 403);
  }
});
test("database failure is a technical error, not empty or public success", async (t) => {
  setup(t);
  const r = await handleScopedCallback(
    req(),
    options({
      repository: {
        find: async () => {
          throw new Error("secret-never-print");
        },
      },
    }),
  );
  assert.equal(r.status, 500);
  assert.ok(!(await r.text()).includes("secret-never-print"));
});
