import assert from "node:assert/strict";
import test from "node:test";
import * as webhook from "../src/lib/webhook-mode.ts";

function storage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    values,
  };
}

test("auditoria em teste preserva extração e correção em produção", () => {
  assert.equal(typeof webhook.resolveWebhookPreferences, "function");
  assert.deepEqual(
    webhook.resolveWebhookPreferences({
      audit: "test",
      extraction: "production",
      correction: "production",
    }),
    { audit: "test", extraction: "production", correction: "production" },
  );
});

test("extração ou correção em teste não muda o modo da auditoria", () => {
  assert.equal(typeof webhook.resolveWebhookPreferences, "function");
  assert.deepEqual(webhook.resolveWebhookPreferences({ extraction: "test" }), {
    audit: "production",
    extraction: "test",
    correction: "production",
  });
  assert.deepEqual(webhook.resolveWebhookPreferences({ correction: "test" }), {
    audit: "production",
    extraction: "production",
    correction: "test",
  });
});

test("alterar uma integração preserva as demais e o objeto anterior", () => {
  assert.equal(typeof webhook.updateWebhookPreference, "function");
  const original = Object.freeze({
    audit: "production",
    extraction: "test",
    correction: "production",
  });
  const updated = webhook.updateWebhookPreference(original, "correction", "test");
  assert.deepEqual(updated, { audit: "production", extraction: "test", correction: "test" });
  assert.deepEqual(original, { audit: "production", extraction: "test", correction: "production" });
});

test("migra o modo legado de teste para todas as integrações antes da primeira alteração", () => {
  assert.equal(typeof webhook.readWebhookPreferences, "function");
  const local = storage({ "ole.webhook.mode.v1": "test" });
  assert.deepEqual(webhook.readWebhookPreferences(local), {
    audit: "test",
    extraction: "test",
    correction: "test",
  });
  local.setItem("ole.webhook.mode.v2.audit", "production");
  local.setItem("ole.webhook.mode.v1", "production");
  assert.deepEqual(webhook.readWebhookPreferences(local), {
    audit: "production",
    extraction: "test",
    correction: "test",
  });
});

test("a migração preserva a preferência independente já salva", () => {
  assert.equal(typeof webhook.readWebhookPreferences, "function");
  const local = storage({
    "ole.webhook.mode.v1": "test",
    "ole.webhook.mode.v2.extraction": "production",
  });
  assert.deepEqual(webhook.readWebhookPreferences(local), {
    audit: "test",
    extraction: "production",
    correction: "test",
  });
});

test("a ausência de preferências e o legado produtivo preservam o padrão existente", () => {
  assert.equal(typeof webhook.readWebhookPreferences, "function");
  for (const initial of [{}, { "ole.webhook.mode.v1": "production" }]) {
    assert.deepEqual(webhook.readWebhookPreferences(storage(initial)), {
      audit: "production",
      extraction: "production",
      correction: "production",
    });
  }
});

test("preferências inválidas não ativam produção silenciosamente", () => {
  assert.equal(typeof webhook.resolveWebhookPreferences, "function");
  assert.deepEqual(
    webhook.resolveWebhookPreferences(
      { audit: "invalid", extraction: {}, correction: false },
      "production",
    ),
    { audit: "test", extraction: "test", correction: "test" },
  );
  assert.deepEqual(webhook.resolveWebhookPreferences({}, "invalid"), {
    audit: "test",
    extraction: "test",
    correction: "test",
  });
});

test("storage indisponível não interrompe a tela nem assume produção", () => {
  assert.equal(typeof webhook.readWebhookPreferences, "function");
  const denied = {
    getItem() {
      throw new Error("denied");
    },
    setItem() {
      throw new Error("denied");
    },
  };
  assert.deepEqual(webhook.readWebhookPreferences(denied), {
    audit: "test",
    extraction: "test",
    correction: "test",
  });
  const readOnly = storage({ "ole.webhook.mode.v1": "test" });
  readOnly.setItem = () => {
    throw new Error("quota");
  };
  assert.deepEqual(webhook.readWebhookPreferences(readOnly), {
    audit: "test",
    extraction: "test",
    correction: "test",
  });
});

test("a resolução de URL continua compatível com os fluxos existentes", () => {
  const url = "https://n8n.example/webhook/audit";
  assert.equal(webhook.resolveWebhookUrl(url, "test"), "https://n8n.example/webhook-test/audit");
  assert.equal(
    webhook.resolveWebhookUrl("https://n8n.example/webhook-test/audit", "production"),
    url,
  );
  assert.equal(webhook.resolveWebhookUrl(url), url);
});
