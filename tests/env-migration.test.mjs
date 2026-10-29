import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { pathToFileURL } from "node:url";
import test from "node:test";
import { buildAuditExclusions } from "../src/lib/audit/trigger-payload.ts";

const root = new URL("../", import.meta.url);
const migrations = await readdir(new URL("supabase/migrations/", root));
const migrationName = migrations.find((name) => name.endsWith("_env_01_homolog_schema.sql"));
const migration = migrationName
  ? await readFile(new URL("supabase/migrations/" + migrationName, root), "utf8")
  : "";
const seed = await readFile(new URL("supabase/seeds/homolog.sql", root), "utf8").catch(() => "");
const operationalTables = [
  "policies",
  "endorsements",
  "policy_billing",
  "audit_runs",
  "audit_findings",
  "audit_ignores",
  "audit_resolutions",
  "audit_correction_responses",
  "policy_sync_runs",
  "policy_sync_changes",
  "billing_sync_state",
  "billing_sync_fallbacks",
  "endorsement_extraction_runs",
  "endorsement_extraction_items",
  "endorsement_exceptions",
  "exception_reason_tags",
  "automation_schedules",
];

test("ENV-01: migration clones only the operational allowlist without copying rows", () => {
  assert.ok(migrationName, "versioned ENV-01 migration is missing");
  for (const table of operationalTables) {
    assert.match(
      migration,
      new RegExp(
        "CREATE TABLE homolog\\." + table + "\\s*\\(LIKE public\\." + table + " INCLUDING ALL\\)",
        "i",
      ),
    );
  }
  assert.doesNotMatch(migration, /CREATE TABLE homolog\.(profiles|user_roles|user_invites)\b/i);
  assert.doesNotMatch(
    migration,
    /\b(?:INSERT INTO homolog\.\w+[\s\S]*?SELECT [\s\S]*?FROM public\.|CREATE TABLE[\s\S]*?AS SELECT[\s\S]*?public\.)/i,
  );
});

test("ENV-01: migration and seed never mutate shared schemas or install external work", () => {
  for (const sql of [migration, seed]) {
    const executable = sql.replace(/--[^\n]*/g, "");
    assert.doesNotMatch(
      executable,
      /\b(?:ALTER TABLE|INSERT INTO|UPDATE|DELETE FROM|TRUNCATE(?: TABLE)?|DROP (?:TABLE|SCHEMA|FUNCTION))\s+(?:public|auth)\./i,
    );
    assert.doesNotMatch(executable, /\b(?:DROP|TRUNCATE|COPY)\b|\b(?:cron\.|net\.http_|vault\.)/i);
  }
  assert.match(migration, /pg_catalog\.pg_attrdef/);
  assert.match(migration, /nextval/i);
  assert.match(migration, /RAISE EXCEPTION/);
});

test("ENV-01: FKs and RPC stay local and privileges exclude anonymous writes", () => {
  assert.doesNotMatch(migration, /REFERENCES public\./i);
  assert.doesNotMatch(migration, /SECURITY DEFINER/i);
  assert.doesNotMatch(migration, /\bGRANT\b[^;]*\bTO\b[^;]*\banon\b/i);
  assert.doesNotMatch(migration, /GRANT ALL (?:ON|PRIVILEGES)/i);
  assert.match(migration, /RETURNS SETOF homolog\.billing_sync_fallbacks/i);
  assert.match(migration, /FOR UPDATE SKIP LOCKED/i);
  assert.match(migration, /ENABLE ROW LEVEL SECURITY/i);
});

test("ENV-01: execution registry is immutable and server-only", () => {
  assert.match(migration, /CREATE TABLE homolog\.execution_contexts/i);
  assert.match(migration, /BEFORE UPDATE OR DELETE ON homolog\.execution_contexts/i);
  assert.match(migration, /GRANT SELECT, INSERT ON homolog\.execution_contexts TO service_role/i);
  assert.doesNotMatch(
    migration,
    /GRANT[^;]*ON homolog\.execution_contexts TO (?:authenticated|anon)/i,
  );
  assert.match(migration, /origin_environment = 'production'/);
});

test("ENV-01: seed is synthetic, deterministic and idempotent", () => {
  assert.ok(seed.length > 100, "synthetic seed is missing");
  assert.doesNotMatch(seed, /\b(?:public|auth)\./i);
  assert.doesNotMatch(seed, /gen_random_uuid|random\(|now\(/i);
  assert.match(seed, /ON CONFLICT/i);
  assert.match(seed, /SYNTHETIC_ENV_01/);
});

const pgliteModule = process.env.ENV_PGLITE_MODULE;
test(
  "ENV-01 PostgreSQL: migration, seed, RLS, FKs, registry and non-contamination",
  {
    skip:
      !pgliteModule && !process.env.ENV_REQUIRE_DATABASE_TESTS
        ? "Set ENV_PGLITE_MODULE to temporary @electric-sql/pglite dist/index.js; no remote database is used"
        : false,
  },
  async (t) => {
    assert.ok(pgliteModule, "ENV_REQUIRE_DATABASE_TESTS requires ENV_PGLITE_MODULE");
    const { PGlite } = await import(pathToFileURL(pgliteModule).href);
    const db = new PGlite();
    t.after(() => db.close());
    const serverVersion = (await db.query("SELECT version() AS version")).rows[0].version;
    assert.match(
      serverVersion,
      /^PostgreSQL 17\./,
      "The gate requires the project's PostgreSQL 17 major",
    );
    t.diagnostic("Runtime: " + serverVersion);
    await db.exec(String.raw`
    CREATE ROLE anon;
    CREATE ROLE authenticated;
    CREATE ROLE service_role BYPASSRLS;
    CREATE SCHEMA auth;
    CREATE TABLE auth.users (id uuid PRIMARY KEY);
    CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS
      $$ SELECT nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
    GRANT USAGE ON SCHEMA auth TO authenticated;
    GRANT EXECUTE ON FUNCTION auth.uid() TO authenticated;
    CREATE TABLE public.user_roles (user_id uuid NOT NULL REFERENCES auth.users(id), role text NOT NULL, UNIQUE (user_id, role));
    ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
    GRANT SELECT ON public.user_roles TO authenticated;
    CREATE POLICY own_roles ON public.user_roles FOR SELECT TO authenticated USING (user_id = (SELECT auth.uid()));
    INSERT INTO auth.users VALUES
      ('11111111-1111-4111-8111-111111111111'), ('22222222-2222-4222-8222-222222222222');
    INSERT INTO public.user_roles VALUES
      ('11111111-1111-4111-8111-111111111111', 'admin'), ('22222222-2222-4222-8222-222222222222', 'user');
  `);
    // Metadata-only snapshot of the inspected catalog. No live rows are used.
    await db.exec(BASELINE_OPERATIONAL_SCHEMA);
    await db.exec(String.raw`
    INSERT INTO public.policies (id,numero_apolice,proposta) VALUES
      ('eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee','PRODUCTION_SENTINEL','{"sentinel":"unchanged"}');
    INSERT INTO public.audit_runs (id,status,raw) VALUES
      ('dddddddd-dddd-4ddd-8ddd-dddddddddddd','success','{"sentinel":"unchanged"}');
  `);
    const digest = async (tables) => {
      const values = [];
      for (const table of tables) {
        const { rows } = await db.query(
          "SELECT coalesce(jsonb_agg(to_jsonb(t) ORDER BY to_jsonb(t)::text), '[]'::jsonb) AS rows FROM " +
            table +
            " t",
        );
        values.push([table, rows[0].rows]);
      }
      return createHash("sha256").update(JSON.stringify(values)).digest("hex");
    };
    const sharedTables = operationalTables
      .map((name) => "public." + name)
      .concat(["public.user_roles", "auth.users"]);
    const before = await digest(sharedTables);
    await t.test("unsafe source drift aborts the entire migration", async () => {
      const rejectedMigration = async (pattern) => {
        await assert.rejects(db.exec(migration), pattern);
        await db.exec("ROLLBACK");
        assert.equal(
          (await db.query("SELECT to_regnamespace('homolog') AS schema")).rows[0].schema,
          null,
        );
      };
      await db.exec(
        "CREATE SEQUENCE public.env01_drift_sequence; ALTER TABLE public.policies ALTER COLUMN premio_liquido SET DEFAULT nextval('public.env01_drift_sequence')",
      );
      await rejectedMigration(/sequence\/identity/i);
      await db.exec(
        "ALTER TABLE public.policies ALTER COLUMN premio_liquido SET DEFAULT 0; DROP SEQUENCE public.env01_drift_sequence",
      );
      await db.exec(
        "CREATE FUNCTION public.env01_unsafe_expression(numeric) RETURNS boolean LANGUAGE sql IMMUTABLE AS 'SELECT true'; ALTER TABLE public.policies ADD CONSTRAINT env01_unsafe_expression_check CHECK (public.env01_unsafe_expression(premio_liquido))",
      );
      await rejectedMigration(/non-catalog function/i);
      await db.exec(
        "ALTER TABLE public.policies DROP CONSTRAINT env01_unsafe_expression_check; DROP FUNCTION public.env01_unsafe_expression(numeric)",
      );
      await db.exec(
        "CREATE FUNCTION public.env01_operator(numeric,numeric) RETURNS boolean LANGUAGE sql IMMUTABLE AS 'SELECT true'; CREATE OPERATOR public.=== (LEFTARG=numeric,RIGHTARG=numeric,FUNCTION=public.env01_operator); ALTER TABLE public.policies ADD CONSTRAINT env01_operator_check CHECK (premio_liquido OPERATOR(public.===) premio_liquido)",
      );
      await rejectedMigration(/non-catalog (function|operator|collation)/i);
      await db.exec(
        "ALTER TABLE public.policies DROP CONSTRAINT env01_operator_check; DROP OPERATOR public.===(numeric,numeric); DROP FUNCTION public.env01_operator(numeric,numeric)",
      );
      await db.exec(
        "CREATE TABLE public.env01_unapproved_reference (id uuid PRIMARY KEY); ALTER TABLE public.policies ADD CONSTRAINT env01_unapproved_fk FOREIGN KEY (last_sync_run_id) REFERENCES public.env01_unapproved_reference(id)",
      );
      await rejectedMigration(/unapproved FK/i);
      await db.exec(
        "ALTER TABLE public.policies DROP CONSTRAINT env01_unapproved_fk; DROP TABLE public.env01_unapproved_reference",
      );
      await db.exec(
        "CREATE TRIGGER env01_unsupported_trigger BEFORE INSERT ON public.policies FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at()",
      );
      await rejectedMigration(/unsupported trigger/i);
      await db.exec("DROP TRIGGER env01_unsupported_trigger ON public.policies");
      assert.equal(await digest(sharedTables), before);
    });
    const lockProbe =
      "SELECT count(DISTINCT l.relation)::int AS env01_source_locks FROM pg_catalog.pg_locks l " +
      "JOIN pg_catalog.pg_class c ON c.oid=l.relation JOIN pg_catalog.pg_namespace n ON n.oid=c.relnamespace " +
      // PGlite's single backend reports pg_backend_pid()=0 and NULL pg_locks.pid.
      "WHERE (l.pid=pg_backend_pid() OR (pg_backend_pid()=0 AND l.pid IS NULL)) " +
      "AND l.granted AND l.mode='ShareUpdateExclusiveLock' " +
      "AND n.nspname='public' AND c.relname IN (" +
      operationalTables.map((name) => "'" + name + "'").join(",") +
      ");";
    const migrationResults = await db.exec(
      migration.replace(/COMMIT;\s*$/i, lockProbe + "\nCOMMIT;"),
    );
    await t.test("migration holds metadata locks on all seventeen sources", () => {
      const probe = migrationResults.find(
        (result) => result.rows[0]?.env01_source_locks !== undefined,
      );
      assert.equal(probe?.rows[0]?.env01_source_locks, 17);
    });
    await db.exec(seed);
    const seeded = await digest(
      operationalTables.map((name) => "homolog." + name).concat(["homolog.execution_contexts"]),
    );
    await db.exec(seed);
    assert.equal(
      await digest(
        operationalTables.map((name) => "homolog." + name).concat(["homolog.execution_contexts"]),
      ),
      seeded,
      "second seed must be byte-equivalent",
    );
    // PostgREST uses JSON date strings; normalize the driver's Date objects at that boundary.
    const q = async (sql, params) => JSON.parse(JSON.stringify((await db.query(sql, params)).rows));
    await t.test("tables, columns and indexes are preserved and RLS is enabled", async () => {
      const tables = await q(
        "SELECT tablename,rowsecurity FROM pg_tables WHERE schemaname='homolog'",
      );
      assert.equal(tables.length, 18);
      assert.ok(tables.every((row) => row.rowsecurity));
      for (const table of operationalTables) {
        const columns = await q(
          "SELECT table_schema,column_name,data_type,column_default,is_nullable FROM information_schema.columns WHERE table_schema IN ('public','homolog') AND table_name=$1 ORDER BY ordinal_position",
          [table],
        );
        assert.deepEqual(
          columns
            .filter((r) => r.table_schema === "homolog")
            .map(({ table_schema: _schema, ...rest }) => rest),
          columns
            .filter((r) => r.table_schema === "public")
            .map(({ table_schema: _schema, ...rest }) => rest),
        );
        const counts = await q(
          "SELECT schemaname,count(*)::int AS n FROM pg_indexes WHERE schemaname IN ('public','homolog') AND tablename=$1 GROUP BY schemaname ORDER BY schemaname",
          [table],
        );
        assert.equal(counts[0].n, counts[1].n, table + " index count");
      }
      const triggers = await q(
        "SELECT count(*)::int AS n FROM pg_trigger t JOIN pg_class c ON c.oid=t.tgrelid JOIN pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname='homolog' AND NOT t.tgisinternal",
      );
      assert.equal(triggers[0].n, 10, "nine timestamp triggers and immutable registry trigger");
    });
    await t.test("foreign keys cannot reference production operational rows", async () => {
      const fks = await q(
        "SELECT rn.nspname AS target FROM pg_constraint c JOIN pg_class r ON r.oid=c.confrelid JOIN pg_namespace rn ON rn.oid=r.relnamespace JOIN pg_namespace n ON n.oid=c.connamespace WHERE n.nspname='homolog' AND c.contype='f'",
      );
      assert.equal(fks.length, 15);
      assert.ok(fks.every((r) => ["homolog", "auth"].includes(r.target)));
      await assert.rejects(
        db.query(
          "INSERT INTO homolog.endorsements (policy_id,numero_apolice,numero_endosso) VALUES ('eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee','PRODUCTION_SENTINEL','000001')",
        ),
        /foreign key/i,
      );
    });
    await t.test("seed exercises audit v2 exclusions and consistent callback totals", async () => {
      const policies = await q("SELECT * FROM homolog.policies");
      const endorsements = await q("SELECT * FROM homolog.endorsements");
      const billing = await q("SELECT * FROM homolog.policy_billing");
      const ignores = await q("SELECT * FROM homolog.audit_ignores");
      const result = buildAuditExclusions({
        policies,
        endorsements,
        billing,
        ignores,
        referenceAt: "2026-10-28T12:00:00Z",
      });
      assert.deepEqual(result.apolices_excluidas.map((r) => r.apolice).sort(), [
        "000000000002000000",
        "000000000003000000",
        "000000000007000000",
      ]);
      assert.equal(result.excecoes_especificas.length, 4);
      assert.ok(!result.apolices_excluidas.some((r) => r.apolice === "000000000004000000"));
      const runs = await q(
        "SELECT status,total_processado,aprovados,reprovados,raw FROM homolog.audit_runs ORDER BY id",
      );
      assert.deepEqual(
        runs.map((r) => r.status),
        ["success", "success", "error"],
      );
      assert.ok(
        runs
          .slice(0, 2)
          .every(
            (r) =>
              r.total_processado === r.aprovados + r.reprovados &&
              r.raw.fixture === "SYNTHETIC_ENV_01",
          ),
      );
    });
    const asRole = async (role, userId, action) => {
      await db.exec("BEGIN; SET LOCAL ROLE " + role);
      try {
        await db.query("SELECT set_config('request.jwt.claim.sub',$1,true)", [userId ?? ""]);
        return await action();
      } finally {
        await db.exec("ROLLBACK");
      }
    };
    await t.test("anon, unassigned users and registry clients are denied", async () => {
      await assert.rejects(
        asRole("anon", null, () => q("SELECT * FROM homolog.policy_billing")),
        /permission denied/i,
      );
      const invisible = await asRole("authenticated", "33333333-3333-4333-8333-333333333333", () =>
        q("SELECT * FROM homolog.audit_ignores"),
      );
      assert.equal(invisible.length, 0);
      await assert.rejects(
        asRole("authenticated", "22222222-2222-4222-8222-222222222222", () =>
          q("SELECT * FROM homolog.execution_contexts"),
        ),
        /permission denied/i,
      );
      await assert.rejects(
        asRole("authenticated", "22222222-2222-4222-8222-222222222222", () =>
          q("SELECT * FROM homolog.policies"),
        ),
        /permission denied/i,
      );
    });
    await t.test("shared roles govern reads, creator ownership and admin changes", async () => {
      assert.ok(
        (
          await asRole("authenticated", "22222222-2222-4222-8222-222222222222", () =>
            q("SELECT * FROM homolog.policy_billing"),
          )
        ).length > 0,
      );
      await asRole("authenticated", "22222222-2222-4222-8222-222222222222", async () => {
        await q(
          "INSERT INTO homolog.audit_ignores (apolice,scope,tipo_erro,created_by) VALUES ('TEST_OWNER','apolice_tipo','TEST','22222222-2222-4222-8222-222222222222')",
        );
        assert.equal(
          (
            await q(
              "UPDATE homolog.audit_ignores SET motivo='owner edit' WHERE apolice='TEST_OWNER' RETURNING id",
            )
          ).length,
          1,
        );
        assert.equal(
          (
            await q(
              "UPDATE homolog.audit_ignores SET motivo='blocked' WHERE apolice='000000000005000000' RETURNING id",
            )
          ).length,
          0,
        );
      });
      await assert.rejects(
        asRole("authenticated", "22222222-2222-4222-8222-222222222222", () =>
          q(
            "INSERT INTO homolog.audit_ignores (apolice,scope,created_by) VALUES ('FORGED','apolice','11111111-1111-4111-8111-111111111111')",
          ),
        ),
        /row-level security/i,
      );
      await asRole("authenticated", "11111111-1111-4111-8111-111111111111", async () => {
        assert.equal(
          (await q("UPDATE homolog.exception_reason_tags SET color='#123456' RETURNING id")).length,
          1,
        );
      });
    });
    await t.test("registry rejects scope tampering and workers only insert/read", async () => {
      await assert.rejects(
        db.query("UPDATE homolog.execution_contexts SET data_scope='production'"),
        /immutable/i,
      );
      await assert.rejects(db.query("DELETE FROM homolog.execution_contexts"), /immutable/i);
      await assert.rejects(
        asRole("service_role", null, () =>
          q("UPDATE homolog.execution_contexts SET webhook_mode='production'"),
        ),
        /permission denied/i,
      );
      await assert.rejects(
        asRole("service_role", null, () => q("TRUNCATE homolog.execution_contexts")),
        /permission denied/i,
      );
      await assert.rejects(
        asRole("service_role", null, () =>
          q(
            "INSERT INTO homolog.execution_contexts (run_id,integration,data_scope,webhook_mode,origin_environment) VALUES ('44444444-4444-4444-8444-444444444444','audit','production','test','production')",
          ),
        ),
        /check constraint/i,
      );
    });
    await t.test(
      "copied checks, unique indexes, cascades and local timestamp triggers work",
      async () => {
        await assert.rejects(
          db.query(
            "INSERT INTO homolog.policy_billing (numero_apolice,numero_endosso,numero_parcela,status_pagamento,situacao_emissao) VALUES ('BAD','1','1','Aberta','Ativa')",
          ),
          /check constraint/i,
        );
        await assert.rejects(
          db.query(
            "INSERT INTO homolog.audit_ignores (apolice,scope,tipo_erro) VALUES ('000000000005000000','apolice_tipo','PRÊMIO FORA DO PADRÃO')",
          ),
          /unique constraint/i,
        );
        await asRole("service_role", null, async () => {
          await q(
            "UPDATE homolog.policy_billing SET valor_total=123 WHERE numero_apolice='000000000001000000'",
          );
          const rows = await q(
            "SELECT updated_at FROM homolog.policy_billing WHERE numero_apolice='000000000001000000'",
          );
          assert.ok(Date.parse(rows[0].updated_at) > Date.parse("2026-10-28T09:00:00Z"));
          await q(
            "DELETE FROM homolog.endorsement_extraction_runs WHERE id='30000000-0000-4000-8000-000000000001'",
          );
          assert.equal(
            (await q("SELECT count(*)::int AS n FROM homolog.endorsement_extraction_items"))[0].n,
            0,
          );
        });
      },
    );
    await t.test("retry RPC updates homolog and leases each row once", async () => {
      await asRole("service_role", null, async () => {
        const claimed = await q("SELECT * FROM homolog.claim_billing_sync_fallbacks(1,60)");
        assert.equal(claimed.length, 1);
        assert.equal(claimed[0].status, "retrying");
        assert.equal(claimed[0].attempts, 1);
        assert.equal(
          (await q("SELECT * FROM homolog.claim_billing_sync_fallbacks(1,60)")).length,
          0,
        );
      });
      await assert.rejects(
        asRole("authenticated", "11111111-1111-4111-8111-111111111111", () =>
          q("SELECT * FROM homolog.claim_billing_sync_fallbacks(1,60)"),
        ),
        /permission denied/i,
      );
    });
    assert.equal(
      await digest(sharedTables),
      before,
      "every public operational row and shared identity row is unchanged, not only counts",
    );
    t.diagnostic("Synthetic public/Auth before/after SHA-256: " + before);
  },
);
const BASELINE_OPERATIONAL_SCHEMA = String.raw`
CREATE TABLE public.audit_correction_responses (
  id pg_catalog.uuid NOT NULL DEFAULT gen_random_uuid(),
  incident_key pg_catalog.text NOT NULL,
  finding_id pg_catalog.uuid,
  run_id pg_catalog.uuid,
  apolice pg_catalog.text NOT NULL,
  tipo_erro pg_catalog.text NOT NULL,
  endosso pg_catalog.text,
  nivel pg_catalog.text,
  detected_at pg_catalog.timestamptz NOT NULL,
  responded_at pg_catalog.timestamptz NOT NULL DEFAULT now(),
  requested_by pg_catalog.uuid,
  mode pg_catalog.text NOT NULL DEFAULT 'production'::text,
  created_at pg_catalog.timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.audit_findings (
  id pg_catalog.uuid NOT NULL DEFAULT gen_random_uuid(),
  run_id pg_catalog.uuid NOT NULL,
  apolice pg_catalog.text NOT NULL,
  tipo_erro pg_catalog.text NOT NULL,
  endosso pg_catalog.text,
  data_inicio pg_catalog.date,
  data_fim pg_catalog.date,
  detalhes pg_catalog.jsonb NOT NULL,
  created_at pg_catalog.timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.audit_ignores (
  id pg_catalog.uuid NOT NULL DEFAULT gen_random_uuid(),
  created_by pg_catalog.uuid,
  scope pg_catalog.text NOT NULL,
  apolice pg_catalog.text NOT NULL,
  tipo_erro pg_catalog.text,
  motivo pg_catalog.text,
  created_at pg_catalog.timestamptz NOT NULL DEFAULT now(),
  reason_tag_id pg_catalog.uuid
);
CREATE TABLE public.audit_resolutions (
  id pg_catalog.uuid NOT NULL DEFAULT gen_random_uuid(),
  apolice pg_catalog.text NOT NULL,
  tipo_erro pg_catalog.text NOT NULL,
  endosso pg_catalog.text,
  run_id pg_catalog.uuid,
  first_seen_at pg_catalog.timestamptz,
  resolved_at pg_catalog.timestamptz NOT NULL DEFAULT now(),
  resolved_by pg_catalog.uuid,
  motivo pg_catalog.text,
  reopened_at pg_catalog.timestamptz,
  created_at pg_catalog.timestamptz NOT NULL DEFAULT now(),
  updated_at pg_catalog.timestamptz NOT NULL DEFAULT now(),
  origem pg_catalog.text NOT NULL DEFAULT 'manual'::text
);
CREATE TABLE public.audit_runs (
  id pg_catalog.uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at pg_catalog.timestamptz NOT NULL DEFAULT now(),
  data_auditoria pg_catalog.timestamptz,
  status_geral pg_catalog.text,
  mensagem_geral pg_catalog.text,
  total_processado pg_catalog.int4 NOT NULL DEFAULT 0,
  aprovados pg_catalog.int4 NOT NULL DEFAULT 0,
  reprovados pg_catalog.int4 NOT NULL DEFAULT 0,
  duration_ms pg_catalog.int4,
  raw pg_catalog.jsonb,
  status pg_catalog.text NOT NULL,
  error_message pg_catalog.text,
  origem pg_catalog.text NOT NULL DEFAULT 'manual'::text
);
CREATE TABLE public.automation_schedules (
  id pg_catalog.uuid NOT NULL DEFAULT gen_random_uuid(),
  job pg_catalog.text NOT NULL,
  enabled pg_catalog.bool NOT NULL DEFAULT false,
  run_at_time pg_catalog.time NOT NULL DEFAULT '08:00:00'::time without time zone,
  weekdays pg_catalog._int4 NOT NULL DEFAULT '{0,1,2,3,4,5,6}'::integer[],
  timezone pg_catalog.text NOT NULL DEFAULT 'America/Sao_Paulo'::text,
  last_triggered_at pg_catalog.timestamptz,
  last_status pg_catalog.text,
  last_error pg_catalog.text,
  created_at pg_catalog.timestamptz NOT NULL DEFAULT now(),
  updated_at pg_catalog.timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.billing_sync_fallbacks (
  id pg_catalog.uuid NOT NULL DEFAULT gen_random_uuid(),
  run_id pg_catalog.uuid NOT NULL,
  numero_documento pg_catalog.text NOT NULL,
  status pg_catalog.text NOT NULL DEFAULT 'pending'::text,
  attempts pg_catalog.int4 NOT NULL DEFAULT 0,
  last_error pg_catalog.text,
  next_retry_at pg_catalog.timestamptz NOT NULL DEFAULT now(),
  lease_expires_at pg_catalog.timestamptz,
  first_failed_at pg_catalog.timestamptz NOT NULL DEFAULT now(),
  last_attempt_at pg_catalog.timestamptz,
  resolved_at pg_catalog.timestamptz,
  created_at pg_catalog.timestamptz NOT NULL DEFAULT now(),
  updated_at pg_catalog.timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.billing_sync_state (
  singleton pg_catalog.bool NOT NULL DEFAULT true,
  pipeline_version pg_catalog.int4 NOT NULL DEFAULT 2,
  reconciliation_start pg_catalog.date NOT NULL DEFAULT '2026-04-01'::date,
  reconciliation_completed_at pg_catalog.timestamptz,
  updated_at pg_catalog.timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.endorsement_exceptions (
  id pg_catalog.uuid NOT NULL DEFAULT gen_random_uuid(),
  policy_number pg_catalog.text NOT NULL,
  motivo pg_catalog.text,
  created_by pg_catalog.uuid,
  created_at pg_catalog.timestamptz NOT NULL DEFAULT now(),
  updated_at pg_catalog.timestamptz NOT NULL DEFAULT now(),
  reason_tag_id pg_catalog.uuid
);
CREATE TABLE public.endorsement_extraction_items (
  id pg_catalog.uuid NOT NULL DEFAULT gen_random_uuid(),
  run_id pg_catalog.uuid NOT NULL,
  policy_number pg_catalog.text NOT NULL,
  last_sequencial_endosso_used pg_catalog.int4,
  created_at pg_catalog.timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.endorsement_extraction_runs (
  id pg_catalog.uuid NOT NULL DEFAULT gen_random_uuid(),
  status pg_catalog.text NOT NULL DEFAULT 'running'::text,
  total_apolices pg_catalog.int4 NOT NULL DEFAULT 0,
  duration_ms pg_catalog.int4,
  error_message pg_catalog.text,
  raw pg_catalog.jsonb,
  finished_at pg_catalog.timestamptz,
  created_at pg_catalog.timestamptz NOT NULL DEFAULT now(),
  updated_at pg_catalog.timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.endorsements (
  id pg_catalog.uuid NOT NULL DEFAULT gen_random_uuid(),
  policy_id pg_catalog.uuid NOT NULL,
  numero_apolice pg_catalog.text NOT NULL,
  numero_endosso pg_catalog.text NOT NULL,
  ordem pg_catalog.int4 NOT NULL DEFAULT 0,
  premio_liquido pg_catalog.numeric DEFAULT 0,
  proposta pg_catalog.jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at pg_catalog.timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.exception_reason_tags (
  id pg_catalog.uuid NOT NULL DEFAULT gen_random_uuid(),
  name pg_catalog.text NOT NULL,
  color pg_catalog.text NOT NULL DEFAULT '#3B82F6'::text,
  created_by pg_catalog.uuid,
  created_at pg_catalog.timestamptz NOT NULL DEFAULT now(),
  updated_at pg_catalog.timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.policies (
  id pg_catalog.uuid NOT NULL DEFAULT gen_random_uuid(),
  numero_apolice pg_catalog.text NOT NULL,
  numero_endosso_atual pg_catalog.text,
  premio_liquido pg_catalog.numeric DEFAULT 0,
  proposta pg_catalog.jsonb NOT NULL DEFAULT '{}'::jsonb,
  last_sync_run_id pg_catalog.uuid,
  created_at pg_catalog.timestamptz NOT NULL DEFAULT now(),
  updated_at pg_catalog.timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.policy_billing (
  id pg_catalog.uuid NOT NULL DEFAULT gen_random_uuid(),
  numero_apolice pg_catalog.text NOT NULL,
  numero_endosso pg_catalog.text NOT NULL,
  numero_proposta pg_catalog.text,
  status_pagamento pg_catalog.text NOT NULL,
  situacao_emissao pg_catalog.text NOT NULL,
  data_quitacao pg_catalog.timestamptz,
  data_vencimento pg_catalog.date,
  created_at pg_catalog.timestamptz NOT NULL DEFAULT now(),
  updated_at pg_catalog.timestamptz NOT NULL DEFAULT now(),
  numero_parcela pg_catalog.text NOT NULL,
  id_parcela_seguradora pg_catalog.text,
  valor_total pg_catalog.numeric
);
CREATE TABLE public.policy_sync_changes (
  id pg_catalog.uuid NOT NULL DEFAULT gen_random_uuid(),
  run_id pg_catalog.uuid NOT NULL,
  leg pg_catalog.text NOT NULL,
  entity_type pg_catalog.text NOT NULL,
  action pg_catalog.text NOT NULL,
  numero_apolice pg_catalog.text,
  numero_endosso pg_catalog.text,
  numero_parcela pg_catalog.text,
  numero_documento pg_catalog.text,
  before_data pg_catalog.jsonb,
  after_data pg_catalog.jsonb,
  details pg_catalog.text,
  created_at pg_catalog.timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.policy_sync_runs (
  id pg_catalog.uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at pg_catalog.timestamptz NOT NULL DEFAULT now(),
  finished_at pg_catalog.timestamptz,
  status pg_catalog.text NOT NULL DEFAULT 'running'::text,
  total_apolices pg_catalog.int4 NOT NULL DEFAULT 0,
  duration_ms pg_catalog.int4,
  error_message pg_catalog.text,
  raw pg_catalog.jsonb,
  emissoes_status pg_catalog.text NOT NULL DEFAULT 'running'::text,
  emissoes_finished_at pg_catalog.timestamptz,
  cobrancas_status pg_catalog.text NOT NULL DEFAULT 'running'::text,
  cobrancas_finished_at pg_catalog.timestamptz,
  cobrancas_total pg_catalog.int4 NOT NULL DEFAULT 0,
  emissions_added pg_catalog.int4 NOT NULL DEFAULT 0,
  emissions_updated pg_catalog.int4 NOT NULL DEFAULT 0,
  billing_added pg_catalog.int4 NOT NULL DEFAULT 0,
  billing_updated pg_catalog.int4 NOT NULL DEFAULT 0,
  billing_fallback_total pg_catalog.int4 NOT NULL DEFAULT 0,
  billing_fallback_resolved pg_catalog.int4 NOT NULL DEFAULT 0
);
ALTER TABLE public.audit_correction_responses ADD CONSTRAINT audit_correction_responses_incident_key_detected_at_mode_key UNIQUE (incident_key, detected_at, mode);
ALTER TABLE public.audit_correction_responses ADD CONSTRAINT audit_correction_responses_mode_check CHECK ((mode = ANY (ARRAY['test'::text, 'production'::text])));
ALTER TABLE public.audit_correction_responses ADD CONSTRAINT audit_correction_responses_pkey PRIMARY KEY (id);
ALTER TABLE public.audit_findings ADD CONSTRAINT audit_findings_pkey PRIMARY KEY (id);
ALTER TABLE public.audit_ignores ADD CONSTRAINT audit_ignores_pkey PRIMARY KEY (id);
ALTER TABLE public.audit_ignores ADD CONSTRAINT audit_ignores_scope_check CHECK ((scope = ANY (ARRAY['apolice'::text, 'apolice_tipo'::text])));
ALTER TABLE public.audit_resolutions ADD CONSTRAINT audit_resolutions_pkey PRIMARY KEY (id);
ALTER TABLE public.audit_runs ADD CONSTRAINT audit_runs_origem_check CHECK ((origem = ANY (ARRAY['manual'::text, 'auto'::text])));
ALTER TABLE public.audit_runs ADD CONSTRAINT audit_runs_pkey PRIMARY KEY (id);
ALTER TABLE public.automation_schedules ADD CONSTRAINT automation_schedules_job_key UNIQUE (job);
ALTER TABLE public.automation_schedules ADD CONSTRAINT automation_schedules_pkey PRIMARY KEY (id);
ALTER TABLE public.billing_sync_fallbacks ADD CONSTRAINT billing_sync_fallbacks_attempts_check CHECK ((attempts >= 0));
ALTER TABLE public.billing_sync_fallbacks ADD CONSTRAINT billing_sync_fallbacks_pkey PRIMARY KEY (id);
ALTER TABLE public.billing_sync_fallbacks ADD CONSTRAINT billing_sync_fallbacks_run_id_numero_documento_key UNIQUE (run_id, numero_documento);
ALTER TABLE public.billing_sync_fallbacks ADD CONSTRAINT billing_sync_fallbacks_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'retrying'::text, 'resolved'::text])));
ALTER TABLE public.billing_sync_state ADD CONSTRAINT billing_sync_state_pkey PRIMARY KEY (singleton);
ALTER TABLE public.billing_sync_state ADD CONSTRAINT billing_sync_state_singleton_check CHECK (singleton);
ALTER TABLE public.endorsement_exceptions ADD CONSTRAINT endorsement_exceptions_pkey PRIMARY KEY (id);
ALTER TABLE public.endorsement_exceptions ADD CONSTRAINT endorsement_exceptions_policy_number_key UNIQUE (policy_number);
ALTER TABLE public.endorsement_extraction_items ADD CONSTRAINT endorsement_extraction_items_pkey PRIMARY KEY (id);
ALTER TABLE public.endorsement_extraction_runs ADD CONSTRAINT endorsement_extraction_runs_pkey PRIMARY KEY (id);
ALTER TABLE public.endorsements ADD CONSTRAINT endorsements_pkey PRIMARY KEY (id);
ALTER TABLE public.endorsements ADD CONSTRAINT endorsements_policy_id_numero_endosso_key UNIQUE (policy_id, numero_endosso);
ALTER TABLE public.exception_reason_tags ADD CONSTRAINT exception_reason_tags_pkey PRIMARY KEY (id);
ALTER TABLE public.policies ADD CONSTRAINT policies_numero_apolice_key UNIQUE (numero_apolice);
ALTER TABLE public.policies ADD CONSTRAINT policies_pkey PRIMARY KEY (id);
ALTER TABLE public.policy_billing ADD CONSTRAINT policy_billing_endosso_canonico CHECK ((numero_endosso ~ '^[0-9]{6}$'::text));
ALTER TABLE public.policy_billing ADD CONSTRAINT policy_billing_parcela_numerica_canonica CHECK (((numero_parcela !~ '^[0-9]+$'::text) OR (numero_parcela ~ '^(0|[1-9][0-9]*)$'::text)));
ALTER TABLE public.policy_billing ADD CONSTRAINT policy_billing_parcela_unica UNIQUE (numero_apolice, numero_endosso, numero_parcela);
ALTER TABLE public.policy_billing ADD CONSTRAINT policy_billing_pkey PRIMARY KEY (id);
ALTER TABLE public.policy_sync_changes ADD CONSTRAINT policy_sync_changes_action_check CHECK ((action = ANY (ARRAY['adicionado'::text, 'atualizado'::text, 'fallback'::text, 'recuperado'::text])));
ALTER TABLE public.policy_sync_changes ADD CONSTRAINT policy_sync_changes_entity_type_check CHECK ((entity_type = ANY (ARRAY['apolice'::text, 'endosso'::text, 'parcela'::text, 'fallback'::text])));
ALTER TABLE public.policy_sync_changes ADD CONSTRAINT policy_sync_changes_leg_check CHECK ((leg = ANY (ARRAY['emissoes'::text, 'cobrancas'::text])));
ALTER TABLE public.policy_sync_changes ADD CONSTRAINT policy_sync_changes_pkey PRIMARY KEY (id);
ALTER TABLE public.policy_sync_runs ADD CONSTRAINT policy_sync_runs_pkey PRIMARY KEY (id);
CREATE INDEX audit_correction_responses_production_responded_at_idx ON public.audit_correction_responses USING btree (responded_at DESC) WHERE (mode = 'production'::text);
CREATE INDEX audit_correction_responses_responded_at_idx ON public.audit_correction_responses USING btree (responded_at DESC);
CREATE INDEX audit_findings_apolice_idx ON public.audit_findings USING btree (apolice);
CREATE INDEX audit_findings_run_id_idx ON public.audit_findings USING btree (run_id);
CREATE INDEX audit_findings_tipo_erro_idx ON public.audit_findings USING btree (tipo_erro);
CREATE UNIQUE INDEX audit_ignores_global_unique_idx ON public.audit_ignores USING btree (apolice, COALESCE(tipo_erro, ''::text));
CREATE UNIQUE INDEX audit_resolutions_active_key ON public.audit_resolutions USING btree (apolice, tipo_erro, COALESCE(endosso, ''::text)) WHERE (reopened_at IS NULL);
CREATE INDEX audit_resolutions_resolved_at_idx ON public.audit_resolutions USING btree (resolved_at DESC);
CREATE INDEX audit_runs_created_at_idx ON public.audit_runs USING btree (created_at DESC);
CREATE INDEX idx_audit_runs_created_at ON public.audit_runs USING btree (created_at DESC);
CREATE INDEX idx_audit_runs_status ON public.audit_runs USING btree (status);
CREATE INDEX billing_sync_fallbacks_due_idx ON public.billing_sync_fallbacks USING btree (next_retry_at, created_at) WHERE (status = ANY (ARRAY['pending'::text, 'retrying'::text]));
CREATE INDEX billing_sync_fallbacks_run_id_idx ON public.billing_sync_fallbacks USING btree (run_id);
CREATE INDEX idx_endorsement_items_run ON public.endorsement_extraction_items USING btree (run_id);
CREATE INDEX idx_endorsements_policy ON public.endorsements USING btree (policy_id);
CREATE UNIQUE INDEX exception_reason_tags_name_key ON public.exception_reason_tags USING btree (lower(name));
CREATE INDEX idx_policies_numero ON public.policies USING btree (numero_apolice);
CREATE INDEX idx_policy_billing_apolice ON public.policy_billing USING btree (numero_apolice);
CREATE INDEX idx_policy_billing_parcela_id ON public.policy_billing USING btree (id_parcela_seguradora) WHERE (id_parcela_seguradora IS NOT NULL);
CREATE INDEX idx_policy_billing_quitacao_total ON public.policy_billing USING btree (data_quitacao) WHERE ((status_pagamento = 'Total'::text) AND (data_quitacao IS NOT NULL));
CREATE INDEX policy_sync_changes_run_id_idx ON public.policy_sync_changes USING btree (run_id, created_at DESC);
CREATE INDEX policy_sync_changes_run_leg_action_idx ON public.policy_sync_changes USING btree (run_id, leg, action);
CREATE UNIQUE INDEX policy_sync_runs_single_running ON public.policy_sync_runs USING btree (status) WHERE (status = 'running'::text);
ALTER TABLE public.audit_correction_responses ADD CONSTRAINT audit_correction_responses_finding_id_fkey FOREIGN KEY (finding_id) REFERENCES public.audit_findings(id) ON DELETE SET NULL;
ALTER TABLE public.audit_correction_responses ADD CONSTRAINT audit_correction_responses_requested_by_fkey FOREIGN KEY (requested_by) REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.audit_correction_responses ADD CONSTRAINT audit_correction_responses_run_id_fkey FOREIGN KEY (run_id) REFERENCES public.audit_runs(id) ON DELETE SET NULL;
ALTER TABLE public.audit_findings ADD CONSTRAINT audit_findings_run_id_fkey FOREIGN KEY (run_id) REFERENCES public.audit_runs(id) ON DELETE CASCADE;
ALTER TABLE public.audit_ignores ADD CONSTRAINT audit_ignores_reason_tag_id_fkey FOREIGN KEY (reason_tag_id) REFERENCES public.exception_reason_tags(id) ON DELETE SET NULL;
ALTER TABLE public.audit_resolutions ADD CONSTRAINT audit_resolutions_resolved_by_fkey FOREIGN KEY (resolved_by) REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.audit_resolutions ADD CONSTRAINT audit_resolutions_run_id_fkey FOREIGN KEY (run_id) REFERENCES public.audit_runs(id) ON DELETE SET NULL;
ALTER TABLE public.billing_sync_fallbacks ADD CONSTRAINT billing_sync_fallbacks_run_id_fkey FOREIGN KEY (run_id) REFERENCES public.policy_sync_runs(id) ON DELETE CASCADE;
ALTER TABLE public.endorsement_exceptions ADD CONSTRAINT endorsement_exceptions_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.endorsement_exceptions ADD CONSTRAINT endorsement_exceptions_reason_tag_id_fkey FOREIGN KEY (reason_tag_id) REFERENCES public.exception_reason_tags(id) ON DELETE SET NULL;
ALTER TABLE public.endorsement_extraction_items ADD CONSTRAINT endorsement_extraction_items_run_id_fkey FOREIGN KEY (run_id) REFERENCES public.endorsement_extraction_runs(id) ON DELETE CASCADE;
ALTER TABLE public.endorsements ADD CONSTRAINT endorsements_policy_id_fkey FOREIGN KEY (policy_id) REFERENCES public.policies(id) ON DELETE CASCADE;
ALTER TABLE public.exception_reason_tags ADD CONSTRAINT exception_reason_tags_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id);
ALTER TABLE public.policies ADD CONSTRAINT policies_last_sync_run_id_fkey FOREIGN KEY (last_sync_run_id) REFERENCES public.policy_sync_runs(id) ON DELETE SET NULL;
ALTER TABLE public.policy_sync_changes ADD CONSTRAINT policy_sync_changes_run_id_fkey FOREIGN KEY (run_id) REFERENCES public.policy_sync_runs(id) ON DELETE CASCADE;
CREATE FUNCTION public.touch_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN NEW.updated_at=now(); RETURN NEW; END $$;
CREATE TRIGGER touch_audit_resolutions BEFORE UPDATE ON public.audit_resolutions FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER touch_automation_schedules BEFORE UPDATE ON public.automation_schedules FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER touch_billing_sync_fallbacks BEFORE UPDATE ON public.billing_sync_fallbacks FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER touch_billing_sync_state BEFORE UPDATE ON public.billing_sync_state FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER touch_endorsement_exceptions BEFORE UPDATE ON public.endorsement_exceptions FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER touch_endorsement_extraction_runs BEFORE UPDATE ON public.endorsement_extraction_runs FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER touch_exception_reason_tags BEFORE UPDATE ON public.exception_reason_tags FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_policies_updated_at BEFORE UPDATE ON public.policies FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER touch_policy_billing BEFORE UPDATE ON public.policy_billing FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
`;
