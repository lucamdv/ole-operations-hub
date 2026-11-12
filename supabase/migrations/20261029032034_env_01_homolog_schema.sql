-- ENV-01: operational homologation in the existing shared Supabase project.
-- Reviewed against OleCockpit / otljnpasmhkoehmwnjvl, PostgreSQL 17, 2026-10-28.
-- Read metadata from public; never copy rows or change shared Auth/production objects.
BEGIN;
SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '60s';
SET LOCAL search_path = pg_catalog;

-- LIKE can retain sequence defaults and functions bound to another schema.
-- Fail closed on source drift that needs an explicit design/review.
DO $preflight$
DECLARE
  source_name text;
  source_tables constant text[] := ARRAY[
    'policies', 'endorsements', 'policy_billing', 'audit_runs', 'audit_findings',
    'audit_ignores', 'audit_resolutions', 'audit_correction_responses',
    'policy_sync_runs', 'policy_sync_changes', 'billing_sync_state',
    'billing_sync_fallbacks', 'endorsement_extraction_runs',
    'endorsement_extraction_items', 'endorsement_exceptions',
    'exception_reason_tags', 'automation_schedules'
  ];
BEGIN
  FOREACH source_name IN ARRAY source_tables LOOP
    IF NOT EXISTS (
      SELECT 1 FROM pg_catalog.pg_class c
      JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname = 'public' AND c.relname = source_name AND c.relkind = 'r'
    ) THEN
      RAISE EXCEPTION 'ENV-01: missing or unsupported public table %', source_name;
    END IF;
    -- Row-level DML continues; schema changes (including concurrent indexes)
    -- and maintenance wait so inspected expressions cannot drift before LIKE.
    EXECUTE format('LOCK TABLE public.%I IN SHARE UPDATE EXCLUSIVE MODE', source_name);
  END LOOP;

  IF EXISTS (
    SELECT 1 FROM pg_catalog.pg_attribute a
    JOIN pg_catalog.pg_class c ON c.oid = a.attrelid
    JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
    JOIN pg_catalog.pg_type t ON t.oid = a.atttypid
    JOIN pg_catalog.pg_namespace tn ON tn.oid = t.typnamespace
    LEFT JOIN pg_catalog.pg_collation coll ON coll.oid = a.attcollation
    LEFT JOIN pg_catalog.pg_namespace cn ON cn.oid = coll.collnamespace
    LEFT JOIN pg_catalog.pg_attrdef d ON d.adrelid = a.attrelid AND d.adnum = a.attnum
    WHERE n.nspname = 'public' AND c.relname = ANY(source_tables)
      AND a.attnum > 0 AND NOT a.attisdropped
      AND (
        a.attidentity <> '' OR tn.nspname <> 'pg_catalog'
        OR coalesce(cn.nspname, 'pg_catalog') <> 'pg_catalog'
        OR coalesce(pg_catalog.pg_get_expr(d.adbin, d.adrelid), '') ~* 'nextval|public[.]|auth[.]'
      )
  ) THEN
    RAISE EXCEPTION 'ENV-01: review sequence/identity, custom type/collation or cross-schema default before cloning';
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_catalog.pg_depend dep
    LEFT JOIN pg_catalog.pg_proc p
      ON dep.refclassid = 'pg_catalog.pg_proc'::regclass AND p.oid = dep.refobjid
    LEFT JOIN pg_catalog.pg_operator op
      ON dep.refclassid = 'pg_catalog.pg_operator'::regclass AND op.oid = dep.refobjid
    LEFT JOIN pg_catalog.pg_opclass opc
      ON dep.refclassid = 'pg_catalog.pg_opclass'::regclass AND opc.oid = dep.refobjid
    LEFT JOIN pg_catalog.pg_collation coll
      ON dep.refclassid = 'pg_catalog.pg_collation'::regclass AND coll.oid = dep.refobjid
    JOIN pg_catalog.pg_namespace pn
      ON pn.oid = coalesce(p.pronamespace, op.oprnamespace, opc.opcnamespace, coll.collnamespace)
    WHERE pn.nspname <> 'pg_catalog' AND (
      (dep.classid = 'pg_catalog.pg_attrdef'::regclass AND dep.objid IN (
        SELECT d.oid FROM pg_catalog.pg_attrdef d
        JOIN pg_catalog.pg_class c ON c.oid = d.adrelid
        JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public' AND c.relname = ANY(source_tables)
      )) OR
      (dep.classid = 'pg_catalog.pg_constraint'::regclass AND dep.objid IN (
        SELECT k.oid FROM pg_catalog.pg_constraint k
        JOIN pg_catalog.pg_class c ON c.oid = k.conrelid
        JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public' AND c.relname = ANY(source_tables)
      )) OR
      (dep.classid = 'pg_catalog.pg_class'::regclass AND dep.objid IN (
        SELECT i.indexrelid FROM pg_catalog.pg_index i
        JOIN pg_catalog.pg_class c ON c.oid = i.indrelid
        JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public' AND c.relname = ANY(source_tables)
      ))
    )
  ) THEN
    RAISE EXCEPTION 'ENV-01: a copied expression depends on a non-catalog function/operator/opclass/collation';
  END IF;
END;
$preflight$;

-- No IF NOT EXISTS: a pre-existing schema must be inspected, never silently reused.
CREATE SCHEMA homolog;
REVOKE ALL ON SCHEMA homolog FROM PUBLIC, anon, authenticated, service_role;
GRANT USAGE ON SCHEMA homolog TO authenticated, service_role;

-- LIKE INCLUDING ALL preserves types, defaults, NOT NULL, checks, PK/unique,
-- expression/partial indexes, comments and storage. It does not copy rows,
-- foreign keys, triggers, RLS policies or grants.
CREATE TABLE homolog.policies (LIKE public.policies INCLUDING ALL);
CREATE TABLE homolog.endorsements (LIKE public.endorsements INCLUDING ALL);
CREATE TABLE homolog.policy_billing (LIKE public.policy_billing INCLUDING ALL);
CREATE TABLE homolog.audit_runs (LIKE public.audit_runs INCLUDING ALL);
CREATE TABLE homolog.audit_findings (LIKE public.audit_findings INCLUDING ALL);
CREATE TABLE homolog.audit_ignores (LIKE public.audit_ignores INCLUDING ALL);
CREATE TABLE homolog.audit_resolutions (LIKE public.audit_resolutions INCLUDING ALL);
CREATE TABLE homolog.audit_correction_responses (LIKE public.audit_correction_responses INCLUDING ALL);
CREATE TABLE homolog.policy_sync_runs (LIKE public.policy_sync_runs INCLUDING ALL);
CREATE TABLE homolog.policy_sync_changes (LIKE public.policy_sync_changes INCLUDING ALL);
CREATE TABLE homolog.billing_sync_state (LIKE public.billing_sync_state INCLUDING ALL);
CREATE TABLE homolog.billing_sync_fallbacks (LIKE public.billing_sync_fallbacks INCLUDING ALL);
CREATE TABLE homolog.endorsement_extraction_runs (LIKE public.endorsement_extraction_runs INCLUDING ALL);
CREATE TABLE homolog.endorsement_extraction_items (LIKE public.endorsement_extraction_items INCLUDING ALL);
CREATE TABLE homolog.endorsement_exceptions (LIKE public.endorsement_exceptions INCLUDING ALL);
CREATE TABLE homolog.exception_reason_tags (LIKE public.exception_reason_tags INCLUDING ALL);
CREATE TABLE homolog.automation_schedules (LIKE public.automation_schedules INCLUDING ALL);

-- One durable registry is used by both scopes. This is infrastructure metadata,
-- not a copy of production operational data. No FK crosses into run tables.
CREATE TABLE homolog.execution_contexts (
  run_id uuid PRIMARY KEY,
  integration text NOT NULL CHECK (integration IN ('audit', 'extraction', 'policy_sync', 'billing', 'correction')),
  data_scope text NOT NULL CHECK (data_scope IN ('production', 'homolog')),
  webhook_mode text NOT NULL CHECK (webhook_mode IN ('production', 'test')),
  origin_environment text NOT NULL CHECK (origin_environment IN ('production', 'preview', 'development')),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT execution_contexts_production_guard CHECK (
    data_scope = 'homolog' OR (origin_environment = 'production' AND webhook_mode = 'production')
  )
);

CREATE FUNCTION homolog.reject_execution_context_mutation()
RETURNS trigger LANGUAGE plpgsql SECURITY INVOKER SET search_path = pg_catalog
AS $function$
BEGIN
  RAISE EXCEPTION 'ENV-01: execution context is immutable' USING ERRCODE = '23514';
END;
$function$;
CREATE TRIGGER execution_contexts_immutable
  BEFORE UPDATE OR DELETE ON homolog.execution_contexts
  FOR EACH ROW EXECUTE FUNCTION homolog.reject_execution_context_mutation();

CREATE FUNCTION homolog.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql SECURITY INVOKER SET search_path = pg_catalog
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Recreate every inspected FK explicitly in the new schema. Non-operational
-- shared references are restricted to auth.users; future unexpected FKs abort.
DO $dependencies$
DECLARE
  item record;
  definition text;
  source_tables constant text[] := ARRAY[
    'policies', 'endorsements', 'policy_billing', 'audit_runs', 'audit_findings',
    'audit_ignores', 'audit_resolutions', 'audit_correction_responses',
    'policy_sync_runs', 'policy_sync_changes', 'billing_sync_state',
    'billing_sync_fallbacks', 'endorsement_extraction_runs',
    'endorsement_extraction_items', 'endorsement_exceptions',
    'exception_reason_tags', 'automation_schedules'
  ];
BEGIN
  FOR item IN
    SELECT k.oid, k.conname, c.relname AS source_table,
      rn.nspname AS target_schema, r.relname AS target_table
    FROM pg_catalog.pg_constraint k
    JOIN pg_catalog.pg_class c ON c.oid = k.conrelid
    JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
    JOIN pg_catalog.pg_class r ON r.oid = k.confrelid
    JOIN pg_catalog.pg_namespace rn ON rn.oid = r.relnamespace
    WHERE k.contype = 'f' AND n.nspname = 'public' AND c.relname = ANY(source_tables)
    ORDER BY c.relname, k.conname
  LOOP
    definition := pg_catalog.pg_get_constraintdef(item.oid);
    IF item.target_schema = 'public' AND item.target_table = ANY(source_tables) THEN
      definition := replace(
        definition,
        format('REFERENCES %I.%I', item.target_schema, item.target_table),
        format('REFERENCES homolog.%I', item.target_table)
      );
    ELSIF NOT (item.target_schema = 'auth' AND item.target_table = 'users') THEN
      RAISE EXCEPTION 'ENV-01: unapproved FK %.% -> %.%',
        item.source_table, item.conname, item.target_schema, item.target_table;
    END IF;
    EXECUTE format('ALTER TABLE homolog.%I ADD CONSTRAINT %I %s',
      item.source_table, item.conname, definition);
  END LOOP;

  FOR item IN
    SELECT t.*, c.relname AS source_table, p.proname, pn.nspname AS function_schema
    FROM pg_catalog.pg_trigger t
    JOIN pg_catalog.pg_class c ON c.oid = t.tgrelid
    JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
    JOIN pg_catalog.pg_proc p ON p.oid = t.tgfoid
    JOIN pg_catalog.pg_namespace pn ON pn.oid = p.pronamespace
    WHERE n.nspname = 'public' AND c.relname = ANY(source_tables) AND NOT t.tgisinternal
  LOOP
    IF item.function_schema <> 'public' OR item.proname <> 'touch_updated_at'
      OR item.tgtype <> 19 OR item.tgnargs <> 0 OR item.tgqual IS NOT NULL
      OR item.tgattr::text <> '' OR item.tgenabled <> 'O'
    THEN
      RAISE EXCEPTION 'ENV-01: unsupported trigger %.%', item.source_table, item.tgname;
    END IF;
    EXECUTE format(
      'CREATE TRIGGER %I BEFORE UPDATE ON homolog.%I FOR EACH ROW EXECUTE FUNCTION homolog.touch_updated_at()',
      item.tgname, item.source_table
    );
  END LOOP;

  IF EXISTS (
    SELECT 1 FROM pg_catalog.pg_constraint k
    JOIN pg_catalog.pg_namespace n ON n.oid = k.connamespace
    JOIN pg_catalog.pg_class r ON r.oid = k.confrelid
    JOIN pg_catalog.pg_namespace rn ON rn.oid = r.relnamespace
    WHERE n.nspname = 'homolog' AND k.contype = 'f'
      AND NOT (rn.nspname = 'homolog' OR (rn.nspname = 'auth' AND r.relname = 'users'))
  ) THEN
    RAISE EXCEPTION 'ENV-01: cross-schema operational FK rejected';
  END IF;
END;
$dependencies$;

CREATE FUNCTION homolog.claim_billing_sync_fallbacks(
  max_items integer DEFAULT 4, lease_seconds integer DEFAULT 150
)
RETURNS SETOF homolog.billing_sync_fallbacks
LANGUAGE plpgsql SECURITY INVOKER SET search_path = pg_catalog
AS $function$
BEGIN
  RETURN QUERY
  WITH candidates AS (
    SELECT fallback.id FROM homolog.billing_sync_fallbacks AS fallback
    WHERE (
      fallback.status = 'pending'
      OR (fallback.status = 'retrying' AND fallback.lease_expires_at IS NOT NULL
        AND fallback.lease_expires_at <= now())
    ) AND fallback.next_retry_at <= now()
    ORDER BY fallback.next_retry_at, fallback.created_at
    FOR UPDATE SKIP LOCKED
    LIMIT greatest(1, least(max_items, 20))
  )
  UPDATE homolog.billing_sync_fallbacks AS fallback
  SET status = 'retrying', attempts = fallback.attempts + 1,
    last_attempt_at = now(),
    lease_expires_at = now() + make_interval(secs => greatest(30, lease_seconds))
  FROM candidates WHERE fallback.id = candidates.id
  RETURNING fallback.*;
END;
$function$;

-- Remove inherited project default grants from these newly-created objects.
REVOKE ALL ON ALL TABLES IN SCHEMA homolog FROM PUBLIC, anon, authenticated, service_role;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA homolog FROM PUBLIC, anon, authenticated, service_role;

DO $access$
DECLARE
  table_name text;
  readable_tables constant text[] := ARRAY[
    'audit_ignores', 'audit_resolutions', 'automation_schedules',
    'endorsement_exceptions', 'exception_reason_tags', 'policy_billing'
  ];
BEGIN
  FOR table_name IN
    SELECT c.relname FROM pg_catalog.pg_class c
    JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'homolog' AND c.relkind = 'r'
  LOOP
    EXECUTE format('ALTER TABLE homolog.%I ENABLE ROW LEVEL SECURITY', table_name);
    IF table_name <> 'execution_contexts' THEN
      EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON homolog.%I TO service_role', table_name);
    END IF;
  END LOOP;

  FOREACH table_name IN ARRAY readable_tables LOOP
    EXECUTE format('GRANT SELECT ON homolog.%I TO authenticated', table_name);
    EXECUTE format(
      'CREATE POLICY assigned_users_read ON homolog.%I FOR SELECT TO authenticated USING (
        EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = (SELECT auth.uid())
          AND ur.role::text IN (''admin'', ''manager'', ''user''))
      )', table_name
    );
  END LOOP;
END;
$access$;

GRANT INSERT, UPDATE, DELETE ON homolog.audit_ignores, homolog.audit_resolutions TO authenticated;
CREATE POLICY creator_insert ON homolog.audit_ignores FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = (SELECT auth.uid())
    AND (ur.role::text = 'admin' OR (ur.role::text IN ('manager', 'user') AND created_by = (SELECT auth.uid()))))
);
CREATE POLICY creator_update ON homolog.audit_ignores FOR UPDATE TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = (SELECT auth.uid())
    AND (ur.role::text = 'admin' OR (ur.role::text IN ('manager', 'user') AND created_by = (SELECT auth.uid()))))
)
WITH CHECK (
  EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = (SELECT auth.uid())
    AND (ur.role::text = 'admin' OR (ur.role::text IN ('manager', 'user') AND created_by = (SELECT auth.uid()))))
);
CREATE POLICY creator_delete ON homolog.audit_ignores FOR DELETE TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = (SELECT auth.uid())
    AND (ur.role::text = 'admin' OR (ur.role::text IN ('manager', 'user') AND created_by = (SELECT auth.uid()))))
);
CREATE POLICY creator_insert ON homolog.audit_resolutions FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = (SELECT auth.uid())
    AND (ur.role::text = 'admin' OR (ur.role::text IN ('manager', 'user') AND resolved_by = (SELECT auth.uid()))))
);
CREATE POLICY creator_update ON homolog.audit_resolutions FOR UPDATE TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = (SELECT auth.uid())
    AND (ur.role::text = 'admin' OR (ur.role::text IN ('manager', 'user') AND resolved_by = (SELECT auth.uid()))))
)
WITH CHECK (
  EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = (SELECT auth.uid())
    AND (ur.role::text = 'admin' OR (ur.role::text IN ('manager', 'user') AND resolved_by = (SELECT auth.uid()))))
);
CREATE POLICY creator_delete ON homolog.audit_resolutions FOR DELETE TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = (SELECT auth.uid())
    AND (ur.role::text = 'admin' OR (ur.role::text IN ('manager', 'user') AND resolved_by = (SELECT auth.uid()))))
);

DO $admin_access$
DECLARE table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY['endorsement_exceptions', 'exception_reason_tags'] LOOP
    EXECUTE format('GRANT INSERT, UPDATE, DELETE ON homolog.%I TO authenticated', table_name);
    EXECUTE format(
      'CREATE POLICY admin_insert ON homolog.%I FOR INSERT TO authenticated WITH CHECK (
        EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = (SELECT auth.uid()) AND ur.role::text = ''admin'')
      )', table_name
    );
    EXECUTE format(
      'CREATE POLICY admin_update ON homolog.%I FOR UPDATE TO authenticated USING (
        EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = (SELECT auth.uid()) AND ur.role::text = ''admin'')
      ) WITH CHECK (
        EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = (SELECT auth.uid()) AND ur.role::text = ''admin'')
      )', table_name
    );
    EXECUTE format(
      'CREATE POLICY admin_delete ON homolog.%I FOR DELETE TO authenticated USING (
        EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = (SELECT auth.uid()) AND ur.role::text = ''admin'')
      )', table_name
    );
  END LOOP;
END;
$admin_access$;

GRANT SELECT, INSERT ON homolog.execution_contexts TO service_role;
GRANT EXECUTE ON FUNCTION homolog.claim_billing_sync_fallbacks(integer, integer) TO service_role;
-- Trigger functions are not callable RPCs. PostgreSQL checks EXECUTE when the
-- owner creates the trigger, not on every row modification.
COMMIT;
