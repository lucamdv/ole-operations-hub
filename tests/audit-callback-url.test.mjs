import assert from "node:assert/strict";
import test from "node:test";
import { resolveAuditCallbackUrl } from "../src/lib/audit/callback-url.ts";

const ID = "c162ea64-2342-4678-bb83-23d461930fcb";
const path = `/api/public/audit-callback?run_id=${ID}`;
const production = {
  PUBLIC_APP_URL: "https://production.example",
  VERCEL_PROJECT_PRODUCTION_URL: "production.example",
};

test("preview usa domínio do deployment mesmo com URLs produtivas configuradas", () => {
  assert.equal(
    resolveAuditCallbackUrl(ID, {
      ...production,
      VERCEL_ENV: "preview",
      VERCEL_URL: "cockpit-abc123-team.vercel.app",
    }),
    `https://cockpit-abc123-team.vercel.app${path}`,
  );
});
test("preview sem VERCEL_URL falha sem fallback para produção", () => {
  assert.throws(
    () => resolveAuditCallbackUrl(ID, { ...production, VERCEL_ENV: "preview" }),
    /VERCEL_URL/,
  );
});
test("preview rejeita domínio produtivo, protocolo inseguro e URLs malformadas", () => {
  for (const value of [
    "https://production.example",
    "production.example",
    "http://cockpit-abc-team.vercel.app",
    "https://user:secret@cockpit-abc-team.vercel.app",
    "https://cockpit-abc-team.vercel.app/path",
    "https://cockpit-abc-team.vercel.app?token=secret",
    "not a url",
  ]) {
    assert.throws(() =>
      resolveAuditCallbackUrl(ID, { ...production, VERCEL_ENV: "preview", VERCEL_URL: value }),
    );
  }
  assert.throws(() =>
    resolveAuditCallbackUrl(ID, {
      VERCEL_ENV: "preview",
      VERCEL_URL: "cockpit.vercel.app",
      VERCEL_PROJECT_PRODUCTION_URL: "cockpit.vercel.app",
    }),
  );
});
test("produção preserva domínio público configurado e fallback do projeto", () => {
  assert.equal(
    resolveAuditCallbackUrl(ID, {
      ...production,
      VERCEL_ENV: "production",
      VERCEL_URL: "cockpit-prodhash-team.vercel.app",
    }),
    `https://production.example${path}`,
  );
  assert.equal(
    resolveAuditCallbackUrl(ID, {
      VERCEL_ENV: "production",
      VERCEL_PROJECT_PRODUCTION_URL: "production.example",
    }),
    `https://production.example${path}`,
  );
});
test("local usa apenas PUBLIC_APP_URL própria, inclusive localhost", () => {
  assert.equal(
    resolveAuditCallbackUrl(ID, {
      PUBLIC_APP_URL: "http://localhost:3000/",
      VERCEL_ENV: "development",
      VERCEL_PROJECT_PRODUCTION_URL: "production.example",
    }),
    `http://localhost:3000${path}`,
  );
  assert.throws(
    () =>
      resolveAuditCallbackUrl(ID, {
        VERCEL_PROJECT_PRODUCTION_URL: "production.example",
        VERCEL_URL: "deployment.vercel.app",
      }),
    /PUBLIC_APP_URL/,
  );
});
test("configuração inválida falha sem expor valor ou segredo", () => {
  for (const value of [
    "",
    "not a url",
    "https://user:SECRET@production.example",
    "https://production.example/?token=SECRET",
    "https://production.example/path",
    "ftp://production.example",
  ]) {
    assert.throws(
      () => resolveAuditCallbackUrl(ID, { PUBLIC_APP_URL: value }),
      (error) => {
        assert.doesNotMatch(error.message, /SECRET|user:/);
        return true;
      },
    );
  }
});

test("preview prioriza alias estável da branch em deploys sucessivos", () => {
  const branch = "olexcockpit-git-codex-env-homolo-team.vercel.app";
  const base = { ...production, VERCEL_ENV: "preview", VERCEL_BRANCH_URL: branch };
  for (const deployment of ["cockpit-a1-team.vercel.app", "cockpit-b2-team.vercel.app"]) {
    assert.equal(
      resolveAuditCallbackUrl(ID, { ...base, VERCEL_URL: deployment }),
      `https://${branch}${path}`,
    );
  }
});

test("preview só faz fallback para VERCEL_URL quando branch ausente ou vazia", () => {
  for (const branch of [undefined, "", " "]) {
    assert.equal(
      resolveAuditCallbackUrl(ID, {
        ...production,
        VERCEL_ENV: "preview",
        VERCEL_BRANCH_URL: branch,
        VERCEL_URL: "cockpit-abc123-team.vercel.app",
      }),
      `https://cockpit-abc123-team.vercel.app${path}`,
    );
  }
});

test("preview falha fechado para branch inválida, mesmo com fallback válido", () => {
  for (const branch of [
    "production.example",
    "http://cockpit-git-branch-team.vercel.app",
    "https://user:SECRET@cockpit-git-branch-team.vercel.app",
    "https://cockpit-git-branch-team.vercel.app/path",
    "https://cockpit-git-branch-team.vercel.app?token=SECRET",
    "not a url",
  ]) {
    assert.throws(
      () => resolveAuditCallbackUrl(ID, {
        ...production,
        VERCEL_ENV: "preview",
        VERCEL_BRANCH_URL: branch,
        VERCEL_URL: "cockpit-abc123-team.vercel.app",
      }),
      (error) => {
        assert.doesNotMatch(error.message, /SECRET|user:/);
        return true;
      },
    );
  }
});

test("preview rejeita branch que aponta para o próprio domínio produtivo", () => {
  assert.throws(() => resolveAuditCallbackUrl(ID, {
    VERCEL_ENV: "preview",
    VERCEL_BRANCH_URL: "cockpit.vercel.app",
    VERCEL_PROJECT_PRODUCTION_URL: "cockpit.vercel.app",
  }));
});

test("produção e desenvolvimento ignoram VERCEL_BRANCH_URL", () => {
  assert.equal(
    resolveAuditCallbackUrl(ID, {
      ...production,
      VERCEL_ENV: "production",
      VERCEL_BRANCH_URL: "cockpit-git-branch-team.vercel.app",
      VERCEL_URL: "cockpit-other-team.vercel.app",
    }),
    `https://production.example${path}`,
  );
  assert.equal(
    resolveAuditCallbackUrl(ID, {
      VERCEL_ENV: "development",
      PUBLIC_APP_URL: "http://localhost:3000",
      VERCEL_BRANCH_URL: "cockpit-git-branch-team.vercel.app",
    }),
    `http://localhost:3000${path}`,
  );
});
