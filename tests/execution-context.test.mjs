import assert from "node:assert/strict";
import test from "node:test";
import {
  resolveRegisteredExecution,
  createExecutionRecord,
  resolveStatusExecution,
} from "../src/lib/environment/execution.server.ts";
import { resolveOperationalScope } from "../src/lib/environment/scope.ts";
const id = "c162ea64-2342-4678-bb83-23d461930fcb";
const row = {
  run_id: id,
  integration: "audit",
  data_scope: "homolog",
  webhook_mode: "test",
  origin_environment: "production",
  created_at: "2026-10-28T00:00:00Z",
};
function repo(record = row) {
  return {
    async find(runId) {
      assert.equal(runId, id);
      return record;
    },
  };
}
test("late callback uses original persisted test scope, not latest production toggle", async () => {
  const result = await resolveRegisteredExecution(id, "audit", repo(), "production");
  assert.equal(result.schema, "homolog");
  assert.equal(result.source, "callback");
  assert.equal(result.webhookMode, "test");
});
test("production original run stays public", async () => {
  const result = await resolveRegisteredExecution(
    id,
    "audit",
    repo({ ...row, data_scope: "production", webhook_mode: "production" }),
    "production",
  );
  assert.equal(result.schema, "public");
});
test("unknown execution is refused", async () => {
  await assert.rejects(resolveRegisteredExecution(id, "audit", repo(null), "production"));
});
test("integration mismatch cannot mutate other runs", async () => {
  await assert.rejects(resolveRegisteredExecution(id, "extraction", repo(), "production"));
});
test("Preview refuses production original run", async () => {
  await assert.rejects(
    resolveRegisteredExecution(
      id,
      "audit",
      repo({ ...row, data_scope: "production", webhook_mode: "production" }),
      "preview",
    ),
  );
});
test("callback arriving on a different deployment environment is refused", async () => {
  await assert.rejects(resolveRegisteredExecution(id, "audit", repo(), "preview"));
});
test("invalid stored scope/mode combination is refused without fallback", async () => {
  await assert.rejects(
    resolveRegisteredExecution(
      id,
      "audit",
      repo({ ...row, data_scope: "production" }),
      "production",
    ),
  );
});
test("invalid identifier fails before lookup", async () => {
  await assert.rejects(
    resolveRegisteredExecution(
      "not-uuid",
      "audit",
      {
        find() {
          throw new Error("must not call");
        },
      },
      "production",
    ),
    /identificador/i,
  );
});
test("record captures scope and integration, without secrets or PII", () => {
  const context = resolveOperationalScope({
    vercelEnvironment: "preview",
    webhookMode: "production",
    source: "manual",
  });
  assert.deepEqual(createExecutionRecord(id, "audit", context), {
    run_id: id,
    integration: "audit",
    data_scope: "homolog",
    webhook_mode: "test",
    origin_environment: "preview",
  });
});
test("registry failures propagate and never imply public", async () => {
  await assert.rejects(
    resolveRegisteredExecution(
      id,
      "audit",
      {
        find: async () => {
          throw new Error("offline");
        },
      },
      "production",
    ),
    /offline/,
  );
});
for (const integration of ["audit", "extraction"])
  for (const status of ["running", "success", "error"]) {
    test(`legacy ${integration}/${status} remains readable only in production`, async () => {
      const repository = {
        find: async () => null,
        findLegacy: async (runId, kind) => {
          assert.equal(runId, id);
          assert.equal(kind, integration);
          return { id, status };
        },
      };
      const context = await resolveStatusExecution(id, integration, repository, "production");
      assert.equal(context.schema, "public");
      await assert.rejects(resolveStatusExecution(id, integration, repository, "preview"));
    });
  }
test("legacy status does not turn absence or registry errors into production access", async () => {
  await assert.rejects(
    resolveStatusExecution(
      id,
      "audit",
      { find: async () => null, findLegacy: async () => null },
      "production",
    ),
  );
  await assert.rejects(
    resolveStatusExecution(
      id,
      "audit",
      {
        find: async () => {
          throw new Error("offline");
        },
        findLegacy() {
          assert.fail("no fallback on error");
        },
      },
      "production",
    ),
    /offline/,
  );
});
