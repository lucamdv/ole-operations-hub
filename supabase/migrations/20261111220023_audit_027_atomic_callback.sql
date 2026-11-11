-- AUDIT-02.7: transaction for audit findings, resolutions and run state.
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
  current_created_at timestamptz;
  automatic_count integer := 0;
  later_success boolean;
  inserted_count integer := 0;
  reopened_count integer := 0;
BEGIN
  -- Lock the SAME audit_runs row used by manual cancel, restart and timeout.
  -- A cancellation that wins this lock causes the entire callback to be skipped.
  PERFORM pg_catalog.pg_advisory_xact_lock(27027, pg_catalog.hashtext('homolog'));
  SELECT r.status, r.created_at INTO current_status, current_created_at
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

  SELECT EXISTS (
    SELECT 1 FROM homolog.audit_runs
    WHERE status = 'success' AND created_at > current_created_at
  ) INTO later_success;

  UPDATE homolog.audit_resolutions AS resolution
     SET reopened_at = pg_catalog.now()
   WHERE resolution.reopened_at IS NULL
     AND (
       resolution.id = ANY(p_reopen_ids)
       OR (
         NOT later_success AND resolution.origem = 'auto'
         AND EXISTS (
           SELECT 1 FROM homolog.audit_runs AS previous
            WHERE previous.id = resolution.run_id AND previous.created_at < current_created_at
         )
         AND EXISTS (
           SELECT 1 FROM homolog.audit_findings AS finding
            WHERE finding.run_id = p_run_id AND finding.apolice = resolution.apolice
              AND finding.tipo_erro = resolution.tipo_erro
              AND finding.endosso IS NOT DISTINCT FROM resolution.endosso
         )
       )
     );
  GET DIAGNOSTICS reopened_count = ROW_COUNT;

  IF NOT later_success AND p_result->>'auto_baseline_id' IS NOT NULL
     AND EXISTS (
       SELECT 1 FROM homolog.audit_runs AS baseline
        WHERE baseline.id = (p_result->>'auto_baseline_id')::uuid
          AND baseline.status = 'success' AND baseline.created_at < current_created_at
          AND NOT EXISTS (
            SELECT 1 FROM homolog.audit_runs AS intervening
             WHERE intervening.status = 'success'
               AND intervening.status_geral IN ('SUCESSO', 'ALERTA')
               AND intervening.total_processado > 0
               AND intervening.created_at > baseline.created_at
               AND intervening.created_at < current_created_at
          )
     ) THEN
    INSERT INTO homolog.audit_resolutions
      (run_id, apolice, tipo_erro, endosso, first_seen_at, resolved_at, origem, motivo)
    SELECT p_run_id, item.apolice, item.tipo_erro, item.endosso, item.first_seen_at,
           pg_catalog.now(), 'auto', 'Resolvido automaticamente: ausente na auditoria seguinte'
      FROM pg_catalog.jsonb_to_recordset(p_result->'auto_resolutions')
        AS item(apolice text, tipo_erro text, endosso text, first_seen_at timestamptz)
     WHERE NOT EXISTS (
       SELECT 1 FROM homolog.audit_resolutions AS active
        WHERE active.reopened_at IS NULL AND active.apolice = item.apolice
          AND active.tipo_erro = item.tipo_erro AND active.endosso IS NOT DISTINCT FROM item.endosso
     ) AND NOT EXISTS (
       SELECT 1 FROM homolog.audit_findings AS finding
        WHERE finding.run_id = p_run_id AND finding.apolice = item.apolice
          AND finding.tipo_erro = item.tipo_erro AND finding.endosso IS NOT DISTINCT FROM item.endosso
     );
    GET DIAGNOSTICS automatic_count = ROW_COUNT;
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
    'reopened_resolutions', reopened_count,
    'auto_resolutions', automatic_count
  );
END;
$audit27$;
REVOKE ALL ON FUNCTION homolog.commit_audit_callback(uuid,jsonb,jsonb,uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION homolog.commit_audit_callback(uuid,jsonb,jsonb,uuid[]) TO service_role;
COMMIT;
