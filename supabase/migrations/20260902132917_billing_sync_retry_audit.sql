-- Mantém rastreabilidade de cada sincronização e torna o fallback de cobrança
-- durável. A fila não possui limite de tentativas: um documento só deixa de ser
-- retomado quando a Excelsior devolve uma parcela válida.

ALTER TABLE public.policy_sync_runs
  ADD COLUMN IF NOT EXISTS emissions_added integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS emissions_updated integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS billing_added integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS billing_updated integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS billing_fallback_total integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS billing_fallback_resolved integer NOT NULL DEFAULT 0;

CREATE TABLE public.policy_sync_changes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id uuid NOT NULL REFERENCES public.policy_sync_runs(id) ON DELETE CASCADE,
  leg text NOT NULL CHECK (leg IN ('emissoes', 'cobrancas')),
  entity_type text NOT NULL CHECK (entity_type IN ('apolice', 'endosso', 'parcela', 'fallback')),
  action text NOT NULL CHECK (action IN ('adicionado', 'atualizado', 'fallback', 'recuperado')),
  numero_apolice text,
  numero_endosso text,
  numero_parcela text,
  numero_documento text,
  before_data jsonb,
  after_data jsonb,
  details text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX policy_sync_changes_run_id_idx
  ON public.policy_sync_changes (run_id, created_at DESC);
CREATE INDEX policy_sync_changes_run_leg_action_idx
  ON public.policy_sync_changes (run_id, leg, action);

CREATE TABLE public.billing_sync_fallbacks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id uuid NOT NULL REFERENCES public.policy_sync_runs(id) ON DELETE CASCADE,
  numero_documento text NOT NULL,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'retrying', 'resolved')),
  attempts integer NOT NULL DEFAULT 0 CHECK (attempts >= 0),
  last_error text,
  next_retry_at timestamptz NOT NULL DEFAULT now(),
  lease_expires_at timestamptz,
  first_failed_at timestamptz NOT NULL DEFAULT now(),
  last_attempt_at timestamptz,
  resolved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (run_id, numero_documento)
);

-- Reconcilia uma única vez as notificações HTTP 200 perdidas pelo cursor antigo.
-- Depois disso, o pipeline volta a consultar somente o delta entre execuções.
CREATE TABLE public.billing_sync_state (
  singleton boolean PRIMARY KEY DEFAULT true CHECK (singleton),
  pipeline_version integer NOT NULL DEFAULT 2,
  reconciliation_start date NOT NULL DEFAULT DATE '2026-04-01',
  reconciliation_completed_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.billing_sync_state (singleton)
VALUES (true)
ON CONFLICT (singleton) DO NOTHING;

CREATE INDEX billing_sync_fallbacks_run_id_idx
  ON public.billing_sync_fallbacks (run_id);
CREATE INDEX billing_sync_fallbacks_due_idx
  ON public.billing_sync_fallbacks (next_retry_at, created_at)
  WHERE status IN ('pending', 'retrying');

CREATE TRIGGER touch_billing_sync_fallbacks
  BEFORE UPDATE ON public.billing_sync_fallbacks
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER touch_billing_sync_state
  BEFORE UPDATE ON public.billing_sync_state
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

ALTER TABLE public.policy_sync_changes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.billing_sync_fallbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.billing_sync_state ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.policy_sync_changes FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.billing_sync_fallbacks FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.billing_sync_state FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.policy_sync_changes TO service_role;
GRANT ALL ON public.billing_sync_fallbacks TO service_role;
GRANT ALL ON public.billing_sync_state TO service_role;

-- Reserva atomicamente itens vencidos, inclusive leases abandonados por uma
-- função interrompida. SKIP LOCKED permite mais de um worker sem duplicação.
CREATE OR REPLACE FUNCTION public.claim_billing_sync_fallbacks(
  max_items integer DEFAULT 4,
  lease_seconds integer DEFAULT 150
)
RETURNS SETOF public.billing_sync_fallbacks
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH candidates AS (
    SELECT fallback.id
    FROM public.billing_sync_fallbacks AS fallback
    WHERE (
        fallback.status = 'pending'
        OR (
          fallback.status = 'retrying'
          AND fallback.lease_expires_at IS NOT NULL
          AND fallback.lease_expires_at <= now()
        )
      )
      AND fallback.next_retry_at <= now()
    ORDER BY fallback.next_retry_at, fallback.created_at
    FOR UPDATE SKIP LOCKED
    LIMIT greatest(1, least(max_items, 20))
  )
  UPDATE public.billing_sync_fallbacks AS fallback
  SET
    status = 'retrying',
    attempts = fallback.attempts + 1,
    last_attempt_at = now(),
    lease_expires_at = now() + make_interval(secs => greatest(30, lease_seconds))
  FROM candidates
  WHERE fallback.id = candidates.id
  RETURNING fallback.*;
END;
$$;

REVOKE ALL ON FUNCTION public.claim_billing_sync_fallbacks(integer, integer)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_billing_sync_fallbacks(integer, integer)
  TO service_role;

-- O agendamento usa apenas nomes de secrets do Vault. O valor nunca fica no
-- SQL/migration. Enquanto os dois secrets não existirem, a execução é um no-op.
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

DO $$
DECLARE
  existing_job bigint;
BEGIN
  SELECT jobid INTO existing_job
  FROM cron.job
  WHERE jobname = 'billing-sync-fallback-worker';

  IF existing_job IS NOT NULL THEN
    PERFORM cron.unschedule(existing_job);
  END IF;

  PERFORM cron.schedule(
    'billing-sync-fallback-worker',
    '* * * * *',
    $job$
      SELECT net.http_post(
        url := worker_url.decrypted_secret,
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'x-hook-secret', worker_secret.decrypted_secret
        ),
        body := '{}'::jsonb,
        timeout_milliseconds := 5000
      )
      FROM vault.decrypted_secrets AS worker_url
      CROSS JOIN vault.decrypted_secrets AS worker_secret
      WHERE worker_url.name = 'billing_retry_url'
        AND worker_secret.name = 'billing_retry_secret';
    $job$
  );
END;
$$;
