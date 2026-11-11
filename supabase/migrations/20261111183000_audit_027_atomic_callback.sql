-- AUDIT-02.7: atomic callback commit (transaction boundary for findings,
-- resolution reopening and final run state). Do not deploy to public until
-- the production n8n contract and rollback have been explicitly approved.
-- PostgreSQL guarantees each function call is a single transaction; the
-- FOR UPDATE lock serializes callback vs cancel and overlapping callbacks.
BEGIN;
-- Applies exclusively to the homolog operational scope.
CREATE OR REPLACE FUNCTION homolog.commit_audit_callback(
  p_run_id uuid,
  p_result jsonb,
  p_findings jsonb,
  p_reopen_ids uuid[]
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = pg_catalog
AS $audit27$
DECLARE
  current_status text;
  inserted_count integer := 0;
  reopened_count integer := 0;
BEGIN
  -- Lock the SAME audit_runs row used by manual cancel, restart and timeout.
  -- A cancellation that wins this lock causes the entire callback to be skipped.
  SELECT r.status INTO current_status
    FROM homolog.audit_runs AS r WHERE r.id = p_run_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'AUDIT-02.7: unknown run' USING ERRCODE = 'P0002';
  END IF;
  IF current_status <> 'running' THEN
    RETURN pg_catalog.jsonb_build_object('duplicate', true, 'status', current_status);
  END IF;
  IF p_result->>'status' IS DISTINCT FROM 'success'
     OR pg_catalog.jsonb_typeof(p_result->'raw') IS DISTINCT FROM 'object'
     OR pg_catalog.jsonb_typeof(p_findings) IS DISTINCT FROM 'array' THEN
    RAISE EXCEPTION 'AUDIT-02.7: invalid commit payload' USING ERRCODE = '22023';
  END IF;

  INSERT INTO homolog.audit_findings
    (id, run_id, apolice, tipo_erro, endosso, data_inicio, data_fim, detalhes)
  SELECT (f.value->>'id')::uuid,
         p_run_id,
         f.value->>'apolice',
         f.value->>'tipo_erro',
         f.value->>'endosso',
         (f.value->>'data_inicio')::date,
         (f.value->>'data_fim')::date,
         f.value->'detalhes'
    FROM pg_catalog.jsonb_array_elements(p_findings) AS f(value)
    ON CONFLICT (id) DO NOTHING;
  GET DIAGNOSTICS inserted_count = ROW_COUNT;

  IF coalesce(pg_catalog.array_length(p_reopen_ids, 1), 0) > 0 THEN
    UPDATE homolog.audit_resolutions SET reopened_at = pg_catalog.now()
     WHERE id = ANY(p_reopen_ids) AND reopened_at IS NULL;
    GET DIAGNOSTICS reopened_count = ROW_COUNT;
  END IF;

  UPDATE homolog.audit_runs
  SET status = 'success',
      data_auditoria = (p_result->>'data_auditoria')::timestamptz,
      status_geral = p_result->>'status_geral',
      mensagem_geral = p_result->>'mensagem_geral',
      total_processado = (p_result->>'total_processado')::integer,
      aprovados = (p_result->>'aprovados')::integer,
      reprovados = (p_result->>'reprovados')::integer,
      duration_ms = (p_result->>'duration_ms')::integer,
      raw = p_result->'raw'
  WHERE id = p_run_id;

  RETURN pg_catalog.jsonb_build_object(
    'duplicate', false,
    'findings_inserted', inserted_count,
    'reopened_resolutions', reopened_count
  );
END;
$audit27$;
REVOKE ALL ON FUNCTION homolog.commit_audit_callback(uuid,jsonb,jsonb,uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION homolog.commit_audit_callback(uuid,jsonb,jsonb,uuid[]) TO service_role;

-- Applies exclusively to the public operational scope.
CREATE OR REPLACE FUNCTION public.commit_audit_callback(
  p_run_id uuid,
  p_result jsonb,
  p_findings jsonb,
  p_reopen_ids uuid[]
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = pg_catalog
AS $audit27$
DECLARE
  current_status text;
  inserted_count integer := 0;
  reopened_count integer := 0;
BEGIN
  -- Lock the SAME audit_runs row used by manual cancel, restart and timeout.
  -- A cancellation that wins this lock causes the entire callback to be skipped.
  SELECT r.status INTO current_status
    FROM public.audit_runs AS r WHERE r.id = p_run_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'AUDIT-02.7: unknown run' USING ERRCODE = 'P0002';
  END IF;
  IF current_status <> 'running' THEN
    RETURN pg_catalog.jsonb_build_object('duplicate', true, 'status', current_status);
  END IF;
  IF p_result->>'status' IS DISTINCT FROM 'success'
     OR pg_catalog.jsonb_typeof(p_result->'raw') IS DISTINCT FROM 'object'
     OR pg_catalog.jsonb_typeof(p_findings) IS DISTINCT FROM 'array' THEN
    RAISE EXCEPTION 'AUDIT-02.7: invalid commit payload' USING ERRCODE = '22023';
  END IF;

  INSERT INTO public.audit_findings
    (id, run_id, apolice, tipo_erro, endosso, data_inicio, data_fim, detalhes)
  SELECT (f.value->>'id')::uuid,
         p_run_id,
         f.value->>'apolice',
         f.value->>'tipo_erro',
         f.value->>'endosso',
         (f.value->>'data_inicio')::date,
         (f.value->>'data_fim')::date,
         f.value->'detalhes'
    FROM pg_catalog.jsonb_array_elements(p_findings) AS f(value)
    ON CONFLICT (id) DO NOTHING;
  GET DIAGNOSTICS inserted_count = ROW_COUNT;

  IF coalesce(pg_catalog.array_length(p_reopen_ids, 1), 0) > 0 THEN
    UPDATE public.audit_resolutions SET reopened_at = pg_catalog.now()
     WHERE id = ANY(p_reopen_ids) AND reopened_at IS NULL;
    GET DIAGNOSTICS reopened_count = ROW_COUNT;
  END IF;

  UPDATE public.audit_runs
  SET status = 'success',
      data_auditoria = (p_result->>'data_auditoria')::timestamptz,
      status_geral = p_result->>'status_geral',
      mensagem_geral = p_result->>'mensagem_geral',
      total_processado = (p_result->>'total_processado')::integer,
      aprovados = (p_result->>'aprovados')::integer,
      reprovados = (p_result->>'reprovados')::integer,
      duration_ms = (p_result->>'duration_ms')::integer,
      raw = p_result->'raw'
  WHERE id = p_run_id;

  RETURN pg_catalog.jsonb_build_object(
    'duplicate', false,
    'findings_inserted', inserted_count,
    'reopened_resolutions', reopened_count
  );
END;
$audit27$;
REVOKE ALL ON FUNCTION public.commit_audit_callback(uuid,jsonb,jsonb,uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.commit_audit_callback(uuid,jsonb,jsonb,uuid[]) TO service_role;

COMMIT;
