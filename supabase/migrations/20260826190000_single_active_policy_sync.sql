-- Impede duas sincronizações da carteira em paralelo, inclusive quando duas
-- abas disparam ao mesmo tempo antes de o front receber o estado da primeira.
-- Se houver resíduos históricos, preserva a execução mais recente e encerra as
-- demais antes de criar a garantia.
WITH ranked_running AS (
  SELECT id, row_number() OVER (ORDER BY created_at DESC) AS position
  FROM public.policy_sync_runs
  WHERE status = 'running'
)
UPDATE public.policy_sync_runs AS runs
SET
  status = 'error',
  error_message = 'Execução concorrente encerrada durante ativação da trava de sincronização.',
  finished_at = now(),
  emissoes_status = CASE
    WHEN runs.emissoes_status = 'running' THEN 'error'
    ELSE runs.emissoes_status
  END,
  cobrancas_status = CASE
    WHEN runs.cobrancas_status = 'running' THEN 'error'
    ELSE runs.cobrancas_status
  END,
  emissoes_finished_at = COALESCE(runs.emissoes_finished_at, now()),
  cobrancas_finished_at = COALESCE(runs.cobrancas_finished_at, now())
FROM ranked_running
WHERE runs.id = ranked_running.id
  AND ranked_running.position > 1;

CREATE UNIQUE INDEX IF NOT EXISTS policy_sync_runs_single_running
  ON public.policy_sync_runs ((status))
  WHERE status = 'running';
