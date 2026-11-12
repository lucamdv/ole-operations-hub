-- Synthetic ENV-01 fixtures only. No policyholder data or shared identity writes.
-- Reserved fixture IDs/policy numbers; reruns never overwrite existing rows.
BEGIN;
SET LOCAL search_path = pg_catalog;
SET LOCAL lock_timeout = '5s';

INSERT INTO homolog.policy_sync_runs (
  id, created_at, finished_at, status, total_apolices, duration_ms, raw,
  emissoes_status, emissoes_finished_at, cobrancas_status, cobrancas_finished_at,
  cobrancas_total, emissions_added, billing_added, billing_fallback_total
) VALUES (
  '20000000-0000-4000-8000-000000000001', '2026-10-28T09:00:00Z', '2026-10-28T09:01:00Z',
  'success', 7, 60000, '{"fixture":"SYNTHETIC_ENV_01","callback":{"status":"success","received":7}}',
  'success', '2026-10-28T09:00:30Z', 'success', '2026-10-28T09:01:00Z', 7, 7, 7, 1
) ON CONFLICT DO NOTHING;

INSERT INTO homolog.policies (
  id, numero_apolice, numero_endosso_atual, premio_liquido, proposta,
  last_sync_run_id, created_at, updated_at
)
SELECT id::uuid, numero, atual, 100,
  jsonb_build_object(
    'fixture', 'SYNTHETIC_ENV_01', 'scenario', scenario,
    'numero_proposta_seguradora', 'SYNTHETIC_ENV_01-' || scenario,
    'datas', jsonb_build_object('inicio_vigencia', '2026-01-01', 'fim_vigencia', '2026-12-31'),
    'partes', jsonb_build_array(jsonb_build_object(
      'id_pessoa', 'SYNTHETIC_ENV_01-' || scenario, 'papel_parte', 'SEGURADO',
      'nome_pessoa', 'HOMOLOGACAO FICTICIA ' || scenario, 'documentos_identificacao', jsonb_build_array()
    )), 'itens', jsonb_build_array()
  ),
  '20000000-0000-4000-8000-000000000001'::uuid,
  '2026-10-28T09:00:00Z'::timestamptz, '2026-10-28T09:00:00Z'::timestamptz
FROM (VALUES
  ('10000000-0000-4000-8000-000000000001', '000000000001000000', '000000', 'active'),
  ('10000000-0000-4000-8000-000000000002', '000000000002000000', '000001', 'cancelled'),
  ('10000000-0000-4000-8000-000000000003', '000000000003000000', '000001', 'suspended'),
  ('10000000-0000-4000-8000-000000000004', '000000000004000000', '000000', 'delinquent_not_suspended'),
  ('10000000-0000-4000-8000-000000000005', '000000000005000000', '000000', 'specific_exception'),
  ('10000000-0000-4000-8000-000000000006', '000000000006000000', '000000', 'two_specific_exceptions'),
  ('10000000-0000-4000-8000-000000000007', '000000000007000000', '000001', 'exception_and_whole_exclusion')
) AS fixture(id, numero, atual, scenario)
ON CONFLICT DO NOTHING;

INSERT INTO homolog.endorsements (
  id, policy_id, numero_apolice, numero_endosso, ordem, premio_liquido, proposta, created_at
)
SELECT ('11000000-0000-4000-8000-' || lpad(i::text, 12, '0'))::uuid,
  ('10000000-0000-4000-8000-' || lpad(i::text, 12, '0'))::uuid,
  '00000000000' || i::text || '000000', '000000', 0, 100,
  '{"fixture":"SYNTHETIC_ENV_01","datas":{"inicio_vigencia":"2026-01-01","fim_vigencia":"2026-12-31"},"partes":[],"itens":[]}'::jsonb,
  '2026-10-28T09:00:00Z'::timestamptz
FROM generate_series(1, 7) AS fixture(i)
ON CONFLICT DO NOTHING;

INSERT INTO homolog.endorsements (
  id, policy_id, numero_apolice, numero_endosso, ordem, premio_liquido, proposta, created_at
) VALUES
  ('11000000-0000-4000-8000-000000000102', '10000000-0000-4000-8000-000000000002',
    '000000000002000000', '000001', 1, 0,
    '{"fixture":"SYNTHETIC_ENV_01","endosso_A":{"proposta_endosso_A":{"motivo_endosso":"RESILICAO","proposta":{"partes":[],"itens":[]}}}}',
    '2026-10-28T09:00:00Z'),
  ('11000000-0000-4000-8000-000000000103', '10000000-0000-4000-8000-000000000003',
    '000000000003000000', '000001', 1, 0,
    '{"fixture":"SYNTHETIC_ENV_01","endosso_C":{"proposta_endosso_C":{"motivo_endosso":"INADIMPLENCIA"}}}',
    '2026-10-28T09:00:00Z'),
  ('11000000-0000-4000-8000-000000000107', '10000000-0000-4000-8000-000000000007',
    '000000000007000000', '000001', 1, 0,
    '{"fixture":"SYNTHETIC_ENV_01","endosso_A":{"proposta_endosso_A":{"motivo_endosso":"RESILICAO","proposta":{"partes":[],"itens":[]}}}}',
    '2026-10-28T09:00:00Z')
ON CONFLICT DO NOTHING;

INSERT INTO homolog.policy_billing (
  id, numero_apolice, numero_endosso, numero_parcela, numero_proposta,
  status_pagamento, situacao_emissao, data_quitacao, data_vencimento, valor_total,
  created_at, updated_at
)
SELECT ('12000000-0000-4000-8000-' || lpad(i::text, 12, '0'))::uuid,
  '00000000000' || i::text || '000000', '000000', '1', 'SYNTHETIC_ENV_01-' || i::text,
  CASE WHEN i IN (3, 4) THEN 'Aberta' ELSE 'Total' END,
  CASE WHEN i IN (2, 7) THEN 'Cancelada' ELSE 'Ativa' END,
  CASE WHEN i IN (3, 4) THEN NULL ELSE '2026-09-01T12:00:00Z'::timestamptz END,
  '2026-09-01'::date, 100,
  '2026-10-28T09:00:00Z'::timestamptz, '2026-10-28T09:00:00Z'::timestamptz
FROM generate_series(1, 7) AS fixture(i)
ON CONFLICT DO NOTHING;

INSERT INTO homolog.exception_reason_tags (id, name, color, created_at, updated_at)
VALUES ('50000000-0000-4000-8000-000000000001', 'SYNTHETIC_ENV_01', '#3B82F6',
  '2026-10-28T09:00:00Z', '2026-10-28T09:00:00Z')
ON CONFLICT DO NOTHING;

INSERT INTO homolog.audit_ignores (id, scope, apolice, tipo_erro, motivo, reason_tag_id, created_at)
VALUES
  ('51000000-0000-4000-8000-000000000001', 'apolice_tipo', '000000000005000000', 'PRÊMIO FORA DO PADRÃO', 'SYNTHETIC_ENV_01: specific',
    '50000000-0000-4000-8000-000000000001', '2026-10-28T09:00:00Z'),
  ('51000000-0000-4000-8000-000000000002', 'apolice_tipo', '000000000006000000', 'PRÊMIO FORA DO PADRÃO', 'SYNTHETIC_ENV_01: first type',
    '50000000-0000-4000-8000-000000000001', '2026-10-28T09:00:00Z'),
  ('51000000-0000-4000-8000-000000000003', 'apolice_tipo', '000000000006000000', 'VIGÊNCIA INCONSISTENTE', 'SYNTHETIC_ENV_01: second type',
    '50000000-0000-4000-8000-000000000001', '2026-10-28T09:00:00Z'),
  ('51000000-0000-4000-8000-000000000004', 'apolice_tipo', '000000000007000000', 'PRÊMIO FORA DO PADRÃO', 'SYNTHETIC_ENV_01: specific and excluded',
    '50000000-0000-4000-8000-000000000001', '2026-10-28T09:00:00Z'),
  ('51000000-0000-4000-8000-000000000005', 'apolice', '000000000007000000', NULL, 'SYNTHETIC_ENV_01: historical whole policy',
    '50000000-0000-4000-8000-000000000001', '2026-10-28T09:00:00Z')
ON CONFLICT DO NOTHING;

INSERT INTO homolog.audit_runs (
  id, created_at, data_auditoria, status, status_geral, mensagem_geral,
  total_processado, aprovados, reprovados, duration_ms, raw, error_message, origem
) VALUES
  ('40000000-0000-4000-8000-000000000001', '2026-10-28T10:00:00Z', '2026-10-28T10:00:10Z',
    'success', 'APROVADO', 'SYNTHETIC_ENV_01: approved', 1, 1, 0, 10000,
    '{"fixture":"SYNTHETIC_ENV_01","run_id":"40000000-0000-4000-8000-000000000001","audit_contract_version":2,"status":"success","status_geral":"APROVADO","resumo":{"total_processado":1,"aprovados":1,"reprovados":0},"apolices_com_erro":[]}',
    NULL, 'manual'),
  ('40000000-0000-4000-8000-000000000002', '2026-10-28T10:01:00Z', '2026-10-28T10:01:10Z',
    'success', 'REPROVADO', 'SYNTHETIC_ENV_01: rejected', 3, 1, 2, 10000,
    '{"fixture":"SYNTHETIC_ENV_01","run_id":"40000000-0000-4000-8000-000000000002","audit_contract_version":2,"status":"success","status_geral":"REPROVADO","resumo":{"total_processado":3,"aprovados":1,"reprovados":2},"apolices_com_erro":[{"apolice":"000000000004000000","erros":[{"tipo_erro":"PRÊMIO FORA DO PADRÃO","endosso":"000000"}]},{"apolice":"000000000001000000","erros":[{"tipo_erro":"VIGÊNCIA INCONSISTENTE","endosso":"000000"}]}]}',
    NULL, 'manual'),
  ('40000000-0000-4000-8000-000000000003', '2026-10-28T10:02:00Z', NULL,
    'error', 'ERRO', 'SYNTHETIC_ENV_01: technical failure', 0, 0, 0, 10000,
    '{"fixture":"SYNTHETIC_ENV_01","run_id":"40000000-0000-4000-8000-000000000003","status":"error","error_message":"Synthetic upstream timeout"}',
    'Synthetic upstream timeout', 'manual')
ON CONFLICT DO NOTHING;

INSERT INTO homolog.audit_findings (id, run_id, apolice, tipo_erro, endosso, detalhes, created_at)
VALUES
  ('41000000-0000-4000-8000-000000000001', '40000000-0000-4000-8000-000000000002',
    '000000000004000000', 'PRÊMIO FORA DO PADRÃO', '000000',
    '{"fixture":"SYNTHETIC_ENV_01","tipo_erro":"PRÊMIO FORA DO PADRÃO"}', '2026-10-28T10:01:10Z'),
  ('41000000-0000-4000-8000-000000000002', '40000000-0000-4000-8000-000000000002',
    '000000000001000000', 'VIGÊNCIA INCONSISTENTE', '000000',
    '{"fixture":"SYNTHETIC_ENV_01","tipo_erro":"VIGÊNCIA INCONSISTENTE"}', '2026-10-28T10:01:10Z')
ON CONFLICT DO NOTHING;

INSERT INTO homolog.audit_resolutions (
  id, apolice, tipo_erro, endosso, run_id, first_seen_at, resolved_at,
  motivo, created_at, updated_at, origem
) VALUES (
  '42000000-0000-4000-8000-000000000001', '000000000006000000', 'PRÊMIO FORA DO PADRÃO', '000000',
  '40000000-0000-4000-8000-000000000001', '2026-10-28T09:00:00Z', '2026-10-28T10:00:10Z',
  'SYNTHETIC_ENV_01: resolved', '2026-10-28T10:00:10Z', '2026-10-28T10:00:10Z', 'manual'
) ON CONFLICT DO NOTHING;

INSERT INTO homolog.audit_correction_responses (
  id, incident_key, finding_id, run_id, apolice, tipo_erro, endosso,
  detected_at, responded_at, mode, created_at
) VALUES (
  '43000000-0000-4000-8000-000000000001', 'SYNTHETIC_ENV_01:incident:1',
  '41000000-0000-4000-8000-000000000001', '40000000-0000-4000-8000-000000000002',
  '000000000004000000', 'PRÊMIO FORA DO PADRÃO', '000000',
  '2026-10-28T10:01:10Z', '2026-10-28T10:03:00Z', 'test', '2026-10-28T10:03:00Z'
) ON CONFLICT DO NOTHING;

INSERT INTO homolog.endorsement_extraction_runs (
  id, status, total_apolices, duration_ms, raw, finished_at, created_at, updated_at
) VALUES (
  '30000000-0000-4000-8000-000000000001', 'success', 1, 10000,
  '{"fixture":"SYNTHETIC_ENV_01","items":[{"PolicyNumber":"000000000001000000","last_sequencial_endosso_used":0}]}',
  '2026-10-28T10:04:10Z', '2026-10-28T10:04:00Z', '2026-10-28T10:04:10Z'
) ON CONFLICT DO NOTHING;
INSERT INTO homolog.endorsement_extraction_items (
  id, run_id, policy_number, last_sequencial_endosso_used, created_at
) VALUES (
  '31000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000001',
  '000000000001000000', 0, '2026-10-28T10:04:10Z'
) ON CONFLICT DO NOTHING;
INSERT INTO homolog.endorsement_exceptions (
  id, policy_number, motivo, reason_tag_id, created_at, updated_at
) VALUES (
  '32000000-0000-4000-8000-000000000001', '000000000005000000', 'SYNTHETIC_ENV_01: extraction exception',
  '50000000-0000-4000-8000-000000000001', '2026-10-28T09:00:00Z', '2026-10-28T09:00:00Z'
) ON CONFLICT DO NOTHING;

INSERT INTO homolog.policy_sync_changes (
  id, run_id, leg, entity_type, action, numero_apolice, numero_endosso, after_data, details, created_at
) VALUES (
  '21000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001',
  'emissoes', 'apolice', 'adicionado', '000000000001000000', '000000',
  '{"fixture":"SYNTHETIC_ENV_01","premio_liquido":100}', 'Synthetic sync callback',
  '2026-10-28T09:00:30Z'
) ON CONFLICT DO NOTHING;
INSERT INTO homolog.billing_sync_fallbacks (
  id, run_id, numero_documento, status, attempts, next_retry_at,
  first_failed_at, created_at, updated_at
) VALUES (
  '22000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001',
  'SYNTHETIC_ENV_01-document', 'pending', 0, '2026-01-01T00:00:00Z',
  '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'
) ON CONFLICT DO NOTHING;
INSERT INTO homolog.billing_sync_state (
  singleton, pipeline_version, reconciliation_start, reconciliation_completed_at, updated_at
) VALUES (true, 2, '2026-04-01', '2026-10-28T09:01:00Z', '2026-10-28T09:01:00Z')
ON CONFLICT DO NOTHING;

INSERT INTO homolog.automation_schedules (
  id, job, enabled, run_at_time, weekdays, timezone, created_at, updated_at
) VALUES (
  '70000000-0000-4000-8000-000000000001', 'audit', false, '08:00:00',
  ARRAY[1,2,3,4,5], 'America/Fortaleza', '2026-10-28T09:00:00Z', '2026-10-28T09:00:00Z'
) ON CONFLICT DO NOTHING;

INSERT INTO homolog.execution_contexts (
  run_id, integration, data_scope, webhook_mode, origin_environment, created_at
) VALUES
  ('20000000-0000-4000-8000-000000000001', 'policy_sync', 'homolog', 'test', 'preview', '2026-10-28T09:00:00Z'),
  ('30000000-0000-4000-8000-000000000001', 'extraction', 'homolog', 'test', 'preview', '2026-10-28T10:04:00Z'),
  ('40000000-0000-4000-8000-000000000001', 'audit', 'homolog', 'test', 'preview', '2026-10-28T10:00:00Z'),
  ('40000000-0000-4000-8000-000000000002', 'audit', 'homolog', 'test', 'preview', '2026-10-28T10:01:00Z'),
  ('40000000-0000-4000-8000-000000000003', 'audit', 'homolog', 'test', 'preview', '2026-10-28T10:02:00Z'),
  ('43000000-0000-4000-8000-000000000001', 'correction', 'homolog', 'test', 'preview', '2026-10-28T10:03:00Z')
ON CONFLICT (run_id) DO NOTHING;
COMMIT;
