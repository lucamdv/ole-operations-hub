import assert from "node:assert/strict";
import test from "node:test";
import { resolveIntegrationWebhook } from "../src/lib/environment/webhooks.server.ts";
import { resolveOperationalScope } from "../src/lib/environment/scope.ts";
const preview = resolveOperationalScope({ vercelEnvironment: "preview", source: "manual" });
const prod = resolveOperationalScope({ vercelEnvironment: "production", source: "manual" });
const env = {
  N8N_AUDIT_WEBHOOK_URL: "https://n8n.example/webhook/prod",
  N8N_AUDIT_HOMOLOG_WEBHOOK_URL: "https://isolated.example/webhook-test/homolog",
  HOMOLOG_EXTERNAL_WEBHOOKS_ENABLED: "true",
};
test("production maintains existing destination", () => {
  assert.equal(resolveIntegrationWebhook("audit", prod, env), "https://n8n.example/webhook/prod");
});
test("Preview uses only explicitly authorized isolated test endpoint", () => {
  assert.equal(
    resolveIntegrationWebhook("audit", preview, env),
    "https://isolated.example/webhook-test/homolog",
  );
});
test("missing isolated endpoint fails before dispatch, never inherits production", () => {
  assert.throws(() =>
    resolveIntegrationWebhook("audit", preview, {
      N8N_AUDIT_WEBHOOK_URL: env.N8N_AUDIT_WEBHOOK_URL,
    }),
  );
});
test("homolog external activation must be explicit and endpoint must be test HTTPS", () => {
  for (const changes of [
    { HOMOLOG_EXTERNAL_WEBHOOKS_ENABLED: "false" },
    { N8N_AUDIT_HOMOLOG_WEBHOOK_URL: "https://prod.example/webhook/prod" },
    { N8N_AUDIT_HOMOLOG_WEBHOOK_URL: "http://isolated.example/webhook-test/test" },
  ])
    assert.throws(() => resolveIntegrationWebhook("audit", preview, { ...env, ...changes }));
});
test("each integration has distinct homolog config", () => {
  assert.throws(() => resolveIntegrationWebhook("correction", preview, env));
  assert.throws(() => resolveIntegrationWebhook("extraction", preview, env));
});
for (const [integration, prefix] of [
  ["correction", "N8N_CORRECTION"],
  ["extraction", "N8N_ENDORSEMENT"],
]) {
  test(`${integration} preserves production destination and uses its own isolated test URL`, () => {
    const config = {
      HOMOLOG_EXTERNAL_WEBHOOKS_ENABLED: "true",
      [`${prefix}_WEBHOOK_URL`]: `https://${integration}.example/webhook/live`,
      [`${prefix}_HOMOLOG_WEBHOOK_URL`]: `https://${integration}-test.example/webhook-test/isolated`,
    };
    assert.equal(
      resolveIntegrationWebhook(integration, prod, config),
      `https://${integration}.example/webhook/live`,
    );
    assert.equal(
      resolveIntegrationWebhook(integration, preview, config),
      `https://${integration}-test.example/webhook-test/isolated`,
    );
  });
}
