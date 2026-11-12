import assert from "node:assert/strict";
import test from "node:test";
import { resolveIntegrationWebhook } from "../src/lib/environment/webhooks.server.ts";
import { resolveOperationalScope } from "../src/lib/environment/scope.ts";

for (const [integration, prefix] of [
  ["audit", "N8N_AUDIT"],
  ["extraction", "N8N_ENDORSEMENT"],
  ["correction", "N8N_CORRECTION"],
]) {
  for (const [environment, mode, path] of [
    ["production", "production", "webhook"],
    ["production", "test", "webhook-test"],
    ["preview", "production", "webhook-test"],
    ["preview", "test", "webhook-test"],
  ]) {
    test(`${integration}: ${environment}/${mode} reuses the original ${path} without extra flags`, () => {
      const context = resolveOperationalScope({
        vercelEnvironment: environment,
        webhookMode: mode,
        source: "manual",
      });
      const env = {
        [`${prefix}_WEBHOOK_URL`]: `https://n8n.example/webhook/${integration}?version=original`,
      };
      assert.equal(
        resolveIntegrationWebhook(integration, context, env),
        `https://n8n.example/${path}/${integration}?version=original`,
      );
    });
  }
}
test("an original test URL is preserved in test and restored in production", () => {
  const env = { N8N_AUDIT_WEBHOOK_URL: "https://n8n.example/webhook-test/original" };
  for (const [mode, path] of [
    ["test", "webhook-test"],
    ["production", "webhook"],
  ])
    assert.equal(
      resolveIntegrationWebhook(
        "audit",
        resolveOperationalScope({
          vercelEnvironment: "production",
          webhookMode: mode,
          source: "manual",
        }),
        env,
      ),
      `https://n8n.example/${path}/original`,
    );
});
test("missing, insecure and non-webhook test destinations fail closed", () => {
  const context = resolveOperationalScope({ vercelEnvironment: "preview", source: "manual" });
  for (const url of [
    undefined,
    "",
    "not a URL",
    "http://n8n.example/webhook/a",
    "https://user:password@n8n.example/webhook/a",
    "https://n8n.example/production-only",
  ])
    assert.throws(() =>
      resolveIntegrationWebhook("audit", context, { N8N_AUDIT_WEBHOOK_URL: url }),
    );
});
test("selecting audit test never inherits an extraction or correction URL", () => {
  const context = resolveOperationalScope({ vercelEnvironment: "preview", source: "manual" });
  assert.throws(() =>
    resolveIntegrationWebhook("audit", context, {
      N8N_ENDORSEMENT_WEBHOOK_URL: "https://n8n.example/webhook/other",
      N8N_CORRECTION_WEBHOOK_URL: "https://n8n.example/webhook/correction",
    }),
  );
});
