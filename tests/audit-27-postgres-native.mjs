import assert from "node:assert/strict";
import { execFile, spawn } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";

const exec = promisify(execFile);
const bin = process.env.AUDIT_TEST_PG_BIN;
assert.ok(bin, "Set AUDIT_TEST_PG_BIN to the local PostgreSQL 17.5 bin directory.");
const executable = (name) => resolve(bin, name + (process.platform === "win32" ? ".exe" : ""));
const root = resolve(process.env.AUDIT_TEST_PG_TMP ?? tmpdir());
const directory = await mkdtemp(join(root, "ole-audit27-"));
const data = join(directory, "data");
const port = await new Promise((resolvePort, reject) => {
  const probe = createServer();
  probe.on("error", reject);
  probe.listen(0, "127.0.0.1", () => {
    const port = probe.address().port;
    probe.close(() => resolvePort(port));
  });
});
const options = { windowsHide: true };
const driver = process.env.AUDIT_TEST_PG_DRIVER;
assert.ok(driver, "Set AUDIT_TEST_PG_DRIVER to the pg driver entry file.");
const { Client } = (await import(pathToFileURL(resolve(driver)).href)).default;
async function connect(application_name) {
  const client = new Client({
    host: "127.0.0.1",
    port,
    user: "postgres",
    database: "postgres",
    application_name,
    connectionTimeoutMillis: 10_000,
    ssl: false,
  });
  await client.connect();
  return client;
}
let observer;
const value = (input) => {
  if (input == null) return "";
  if (typeof input === "boolean") return input ? "t" : "f";
  if (typeof input === "object") return JSON.stringify(input);
  return String(input);
};
const output = (query) => query.rows.map((row) => row.map(value).join("|")).join("\n");
async function psql(sql) {
  const query = await observer.query({ text: sql, rowMode: "array" });
  return output(Array.isArray(query) ? query.at(-1) : query);
}
const id = (n) => `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`;
const result = {
  status: "success",
  data_auditoria: "2026-11-11T12:00:00Z",
  status_geral: "ALERTA",
  total_processado: 1,
  aprovados: 0,
  reprovados: 1,
  duration_ms: 100,
  raw: {},
};
const finding = (n) => ({
  id: id(n),
  apolice: "0001",
  tipo_erro: "GAP DE DIA",
  endosso: "000001",
  detalhes: {},
});
const callback = (
  run,
  { values = result, findings = [finding(run + 200)], reopen = [id(100)] } = {},
) =>
  `SELECT homolog.commit_audit_callback('${id(run)}', $j$${JSON.stringify(values)}$j$, $j$${JSON.stringify(findings)}$j$, ARRAY[${reopen.map((r) => `'${r}'`).join(",")}]::uuid[]);`;

async function race(firstSql, secondSql) {
  const [lead, follower] = await Promise.all([
    connect("audit27_holder"),
    connect("audit27_waiter"),
  ]);
  try {
    await lead.query("BEGIN");
    await lead.query(firstSql);
    const waiting = follower.query({ text: secondSql, rowMode: "array" });
    // A rejection still reaches the awaited result after the leader releases its lock.
    waiting.catch(() => {});
    try {
      let blocked = false;
      for (let attempt = 0; attempt < 100 && !blocked; attempt++) {
        blocked =
          (await psql(
            "SELECT count(*) FROM pg_stat_activity WHERE application_name = 'audit27_waiter' AND wait_event_type = 'Lock'",
          )) === "1";
        if (!blocked) await delay(30);
      }
      assert.ok(blocked, "The second PostgreSQL session must really block on a lock.");
    } finally {
      await lead.query("COMMIT");
    }
    return output(await waiting);
  } finally {
    await Promise.all([lead.end(), follower.end()]);
  }
}

let started = false;
try {
  await exec(
    executable("initdb"),
    ["-D", data, "-U", "postgres", "-A", "trust", "--no-locale", "--no-sync", "-E", "UTF8"],
    options,
  );
  const log = join(directory, "postgres.log");
  // Wait for pg_ctl's exit without capturing pipes inherited by postgres on Windows.
  const startup = spawn(
    executable("pg_ctl"),
    ["-D", data, "-l", log, "-o", `-h 127.0.0.1 -p ${port}`, "-w", "start"],
    { ...options, stdio: "ignore" },
  );
  const code = await new Promise((done, reject) => {
    startup.once("error", reject);
    startup.once("exit", done);
  });
  assert.equal(code, 0, code === 0 ? "" : await readFile(log, "utf8").catch(() => "pg_ctl failed"));
  started = true;
  observer = await connect("audit27_observer");
  assert.equal(await psql("SHOW server_version_num"), "170005");
  console.log("PostgreSQL 17.5: connected to the disposable loopback cluster.");
  await psql(`
    CREATE ROLE anon;
    CREATE ROLE authenticated;
    CREATE ROLE service_role;
    CREATE SCHEMA homolog;
    CREATE TABLE homolog.audit_runs (
      id uuid PRIMARY KEY, status text, created_at timestamptz, data_auditoria timestamptz,
      status_geral text, mensagem_geral text, total_processado integer, aprovados integer,
      reprovados integer, duration_ms integer, raw jsonb
    );
    CREATE TABLE homolog.audit_findings (
      id uuid PRIMARY KEY, run_id uuid REFERENCES homolog.audit_runs, apolice text, tipo_erro text,
      endosso text, data_inicio date, data_fim date, detalhes jsonb
    );
    CREATE TABLE homolog.audit_resolutions (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(), run_id uuid REFERENCES homolog.audit_runs,
      apolice text, tipo_erro text, endosso text, first_seen_at timestamptz, resolved_at timestamptz,
      reopened_at timestamptz, origem text, motivo text
    );
    CREATE TABLE public.audit_runs (LIKE homolog.audit_runs INCLUDING ALL);
    CREATE TABLE public.audit_findings (LIKE homolog.audit_findings INCLUDING ALL);
    CREATE TABLE public.audit_resolutions (LIKE homolog.audit_resolutions INCLUDING ALL);
    GRANT USAGE ON SCHEMA homolog TO service_role;
    GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA homolog TO service_role;
  `);
  for (const rel of [
    "../supabase/migrations/20261111220023_audit_027_atomic_callback.sql",
    "../docs/audit-02-7/public-commit-audit-callback.sql",
  ])
    await psql(await readFile(new URL(rel, import.meta.url), "utf8"));
  for (const schema of ["homolog", "public"]) {
    const fn = `'${schema}.commit_audit_callback(uuid,jsonb,jsonb,uuid[])'`;
    assert.equal(
      await psql(
        `SELECT has_function_privilege('anon', ${fn}, 'EXECUTE'), has_function_privilege('authenticated', ${fn}, 'EXECUTE'), has_function_privilege('service_role', ${fn}, 'EXECUTE')`,
      ),
      "f|f|t",
    );
  }

  await psql(`
    INSERT INTO homolog.audit_runs (id,status,created_at)
    SELECT ('00000000-0000-4000-8000-' || lpad(n::text,12,'0'))::uuid,
           'running', now() - interval '20 minutes' + n * interval '1 second'
    FROM generate_series(1,8) n;
    INSERT INTO public.audit_runs SELECT * FROM homolog.audit_runs WHERE id = '${id(4)}';
    INSERT INTO homolog.audit_resolutions (id,run_id,apolice,tipo_erro,endosso,origem)
    VALUES ('${id(100)}','${id(1)}','0001','GAP DE DIA','000001','manual');
  `);
  for (const [run, status, filter] of [
    [1, "cancelled", `id = '${id(1)}'`],
    [
      2,
      "cancelled",
      `created_at < (SELECT created_at FROM homolog.audit_runs WHERE id = '${id(3)}')`,
    ],
    [3, "error", `id = '${id(3)}' AND created_at < now() - interval '15 minutes'`],
  ]) {
    const reply = JSON.parse(
      await race(
        `UPDATE homolog.audit_runs SET status='${status}' WHERE status='running' AND ${filter};`,
        callback(run),
      ),
    );
    assert.deepEqual(reply, { duplicate: true, status });
  }
  assert.equal(await psql("SELECT count(*) FROM homolog.audit_findings"), "0");
  assert.equal(
    await psql(`SELECT reopened_at IS NULL FROM homolog.audit_resolutions WHERE id='${id(100)}'`),
    "t",
  );

  assert.equal(
    await race(
      callback(4),
      `UPDATE homolog.audit_runs SET status='cancelled' WHERE id='${id(4)}' AND status='running' RETURNING id;`,
    ),
    "",
  );
  assert.equal(await psql(`SELECT status FROM homolog.audit_runs WHERE id='${id(4)}'`), "success");
  assert.equal(await psql(`SELECT status FROM public.audit_runs WHERE id='${id(4)}'`), "running");
  assert.equal(await psql("SELECT count(*) FROM public.audit_findings"), "0");
  await assert.rejects(psql(callback(5, { values: { ...result, duration_ms: "invalid" } })));
  assert.equal(
    await psql(
      `SELECT status, (SELECT count(*) FROM homolog.audit_findings WHERE run_id='${id(5)}') FROM homolog.audit_runs WHERE id='${id(5)}'`,
    ),
    "running|0",
  );

  const resolution = { apolice: "0001", tipo_erro: "GAP DE DIA", endosso: "000001" };
  const absent = { ...result, auto_baseline_id: id(4), auto_resolutions: [resolution] };
  const next = JSON.parse(
    await race(
      callback(6, { values: absent, findings: [], reopen: [] }),
      callback(7, { reopen: [] }),
    ),
  );
  assert.equal(next.reopened_resolutions, 1);
  assert.equal(
    await psql(
      "SELECT count(*) FROM homolog.audit_resolutions WHERE origem='auto' AND reopened_at IS NULL",
    ),
    "0",
  );
  const late = JSON.parse(await psql(callback(5, { values: absent, findings: [], reopen: [] })));
  assert.equal(late.auto_resolutions, 0);
  console.log(
    "PostgreSQL 17.5: manual cancel, restart, timeout, callback winner, rollback, ordering and schema isolation passed.",
  );
} finally {
  if (observer) await observer.end();
  if (started) await exec(executable("pg_ctl"), ["-D", data, "-m", "fast", "-w", "stop"], options);
  if (dirname(directory) === root && basename(directory).startsWith("ole-audit27-"))
    await rm(directory, { recursive: true, force: true, maxRetries: 3 });
}
