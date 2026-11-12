import assert from "node:assert/strict";
import test from "node:test";
import { createClient } from "@supabase/supabase-js";
import { resolveOperationalScope } from "../src/lib/environment/scope.ts";
import {
  withOperationalContext,
  getOperationalContext,
} from "../src/lib/environment/context.server.ts";
import { createScopedAccess } from "../src/lib/environment/access.ts";

for (const [environment, mode, schema] of [
  ["production", "production", "public"],
  ["production", "test", "homolog"],
  ["preview", "production", "homolog"],
  ["preview", "test", "homolog"],
  ["development", undefined, "homolog"],
  [undefined, undefined, "homolog"],
])
  test(`${environment}/${mode} routes only ${schema}`, () => {
    assert.equal(
      resolveOperationalScope({
        vercelEnvironment: environment,
        webhookMode: mode,
        source: "manual",
      }).schema,
      schema,
    );
  });
test("unknown deployment or invalid mode fail closed", () => {
  assert.throws(() => resolveOperationalScope({ vercelEnvironment: "staging", source: "manual" }));
  assert.throws(() =>
    resolveOperationalScope({
      vercelEnvironment: "production",
      webhookMode: "oops",
      source: "manual",
    }),
  );
});
test("Preview rejects explicitly requested production", () => {
  assert.throws(() =>
    resolveOperationalScope({
      vercelEnvironment: "preview",
      requestedScope: "production",
      source: "manual",
    }),
  );
});
test("scheduler ignores browser modes and is disabled outside production", () => {
  assert.throws(() =>
    resolveOperationalScope({ vercelEnvironment: "preview", source: "scheduler" }),
  );
  assert.equal(
    resolveOperationalScope({
      vercelEnvironment: "production",
      webhookMode: "test",
      source: "scheduler",
    }).schema,
    "public",
  );
});
test("concurrent async scopes never bleed and are immutable", async (t) => {
  const previous = process.env.VERCEL_ENV;
  process.env.VERCEL_ENV = "production";
  t.after(() => {
    if (previous === undefined) delete process.env.VERCEL_ENV;
    else process.env.VERCEL_ENV = previous;
  });
  const production = resolveOperationalScope({ vercelEnvironment: "production", source: "manual" });
  const homolog = resolveOperationalScope({ vercelEnvironment: "preview", source: "manual" });
  let release;
  const barrier = new Promise((r) => {
    release = r;
  });
  const a = withOperationalContext(production, async () => {
    await barrier;
    return getOperationalContext().schema;
  });
  const b = withOperationalContext(homolog, async () => {
    release();
    await Promise.resolve();
    return getOperationalContext().schema;
  });
  assert.deepEqual(await Promise.all([a, b]), ["public", "homolog"]);
  assert.throws(() => {
    homolog.scope = "production";
  });
});
function transport(scope, fail = false) {
  const requests = [];
  const client = createClient("https://synthetic.example", "synthetic-key", {
    auth: { persistSession: false },
    global: {
      fetch: async (url, init) => {
        requests.push({
          url: String(url),
          method: init.method,
          headers: new Headers(init.headers),
          body: init.body,
        });
        return new Response(
          fail ? JSON.stringify({ message: "Schema unavailable", code: "PGRST106" }) : "[]",
          { status: fail ? 406 : 200, headers: { "Content-Type": "application/json" } },
        );
      },
    },
  });
  return {
    requests,
    db: createScopedAccess(client, () =>
      resolveOperationalScope({ vercelEnvironment: scope, source: "manual" }),
    ),
  };
}
test("operational read/write/delete all use homolog profiles, never public", async () => {
  const { db, requests } = transport("preview");
  await db.from("policies").select("id");
  await db.from("audit_runs").insert({ status: "running" });
  await db.from("audit_findings").delete().eq("run_id", "fake");
  assert.equal(requests.length, 3);
  assert.equal(requests[0].headers.get("accept-profile"), "homolog");
  assert.equal(requests[1].headers.get("content-profile"), "homolog");
  assert.equal(requests[2].headers.get("content-profile"), "homolog");
});
test("production default uses public while test operations are separate", async () => {
  const { db, requests } = transport("production");
  await db.from("policies").select("id");
  assert.equal(requests[0].headers.get("accept-profile"), "public");
});
test("shared roles remain readable in public but identity writes are blocked", async () => {
  const { db, requests } = transport("preview");
  await db.from("user_roles").select("role");
  assert.equal(requests[0].headers.get("accept-profile"), "public");
  for (const table of ["user_roles", "profiles", "user_invites"])
    for (const method of ["insert", "upsert", "update", "delete"])
      assert.throws(() => db.from(table)[method]({ role: "admin" }));
  assert.equal(requests.length, 1);
});
test("unknown and qualified tables cannot escape the allowlist", () => {
  const { db } = transport("preview");
  for (const table of ["public.policies", "auth.users", "execution_contexts", "unknown"])
    assert.throws(() => db.from(table));
  assert.equal(db.schema, undefined);
});
test("homolog errors do not fall back to public", async () => {
  const { db, requests } = transport("preview", true);
  const { error } = await db.from("policies").select("id");
  assert.equal(error.code, "PGRST106");
  assert.equal(requests.length, 1);
  assert.equal(requests[0].headers.get("accept-profile"), "homolog");
});
test("RPC is schema-scoped and unapproved functions are blocked", async () => {
  const { db, requests } = transport("preview");
  await db.rpc("claim_billing_sync_fallbacks", { max_items: 1 });
  assert.equal(requests[0].headers.get("content-profile"), "homolog");
  assert.throws(() => db.rpc("has_role", {}));
});
