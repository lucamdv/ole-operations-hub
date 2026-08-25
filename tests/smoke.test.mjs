import assert from "node:assert/strict";
import test from "node:test";

const baseUrl = (process.env.SMOKE_BASE_URL ?? "https://olexcockpit.vercel.app").replace(/\/$/, "");

async function request(path, init) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    return await fetch(`${baseUrl}${path}`, {
      redirect: "manual",
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

test("login responde sem erro de servidor", async () => {
  const response = await request("/login");
  assert.ok(response.status >= 200 && response.status < 500, `status inesperado: ${response.status}`);
});

test("rota autenticada não quebra sem sessão", async () => {
  const response = await request("/apolices");
  assert.ok(response.status < 500, `rota autenticada retornou ${response.status}`);
});

test("callback de apólices rejeita chamada sem segredo", async () => {
  const response = await request("/api/public/policy-sync-callback?run_id=smoke-test", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ dados: [] }),
  });
  assert.equal(response.status, 401);
});

test("callback de cobrança rejeita chamada sem segredo", async () => {
  const response = await request("/api/public/billing-sync-callback?run_id=smoke-test", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify([]),
  });
  assert.equal(response.status, 401);
});

test("scheduler falha fechado sem autorização", async () => {
  const response = await request("/api/public/hooks/scheduler");
  assert.ok(
    response.status === 401 || response.status === 500,
    `scheduler deveria rejeitar a chamada, retornou ${response.status}`,
  );
});
