-- Remove representações repetidas da mesma parcela e torna os identificadores
-- canônicos. As linhas descartadas ficam arquivadas fora do schema exposto.
SET lock_timeout = '10s';
SET statement_timeout = '120s';

BEGIN;

CREATE SCHEMA IF NOT EXISTS private;

CREATE TABLE IF NOT EXISTS private.policy_billing_duplicate_archive (
  archived_id uuid PRIMARY KEY,
  archived_at timestamptz NOT NULL DEFAULT now(),
  removal_reason text NOT NULL,
  row_data jsonb NOT NULL
);

ALTER TABLE private.policy_billing_duplicate_archive ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE private.policy_billing_duplicate_archive FROM PUBLIC, anon, authenticated;

-- Evita que uma sincronização altere o conjunto enquanto os vencedores são
-- escolhidos. A tabela é pequena e o bloqueio dura apenas esta migração.
LOCK TABLE public.policy_billing IN SHARE ROW EXCLUSIVE MODE;

CREATE TEMP TABLE policy_billing_cleanup_candidates ON COMMIT DROP AS
WITH normalized AS (
  SELECT
    pb.*,
    CASE
      WHEN length(regexp_replace(numero_apolice, '\D', '', 'g')) >= 6
        THEN left(regexp_replace(numero_apolice, '\D', '', 'g'), -6) || '000000'
      ELSE trim(numero_apolice)
    END AS policy_key,
    lpad(right(regexp_replace(numero_endosso, '\D', '', 'g'), 6), 6, '0') AS endorsement_key,
    CASE
      WHEN trim(numero_parcela) ~ '^[0-9]+$'
        THEN coalesce(nullif(ltrim(trim(numero_parcela), '0'), ''), '0')
      ELSE lower(trim(numero_parcela))
    END AS installment_key,
    upper(trim(numero_parcela)) = 'LEGACY' AS is_legacy
  FROM public.policy_billing AS pb
),
annotated AS (
  SELECT
    normalized.*,
    bool_or(NOT is_legacy) OVER (
      PARTITION BY policy_key, endorsement_key
    ) AS document_has_current,
    row_number() OVER (
      PARTITION BY policy_key, endorsement_key, installment_key
      ORDER BY
        (
          (numero_proposta IS NOT NULL)::int
          + (data_vencimento IS NOT NULL)::int
          + (data_quitacao IS NOT NULL)::int
          + (id_parcela_seguradora IS NOT NULL)::int
        ) DESC,
        updated_at DESC NULLS LAST,
        created_at DESC NULLS LAST,
        id
    ) AS identity_rank
  FROM normalized
)
SELECT
  id,
  CASE
    WHEN is_legacy AND document_has_current THEN 'legacy_substituido_por_parcela_atual'
    ELSE 'identidade_normalizada_repetida'
  END AS removal_reason
FROM annotated
WHERE (is_legacy AND document_has_current)
   OR (NOT (is_legacy AND document_has_current) AND identity_rank > 1);

INSERT INTO private.policy_billing_duplicate_archive (
  archived_id,
  removal_reason,
  row_data
)
SELECT
  pb.id,
  candidates.removal_reason,
  to_jsonb(pb)
FROM public.policy_billing AS pb
JOIN policy_billing_cleanup_candidates AS candidates USING (id)
ON CONFLICT (archived_id) DO NOTHING;

DELETE FROM public.policy_billing AS pb
USING policy_billing_cleanup_candidates AS candidates
WHERE pb.id = candidates.id;

-- A constraint única existente passa a proteger a identidade real depois que
-- apólice, endosso e sequenciais numéricos usam um único formato.
UPDATE public.policy_billing
SET
  numero_apolice = CASE
    WHEN length(regexp_replace(numero_apolice, '\D', '', 'g')) >= 6
      THEN left(regexp_replace(numero_apolice, '\D', '', 'g'), -6) || '000000'
    ELSE trim(numero_apolice)
  END,
  numero_endosso = lpad(right(regexp_replace(numero_endosso, '\D', '', 'g'), 6), 6, '0'),
  numero_parcela = CASE
    WHEN trim(numero_parcela) ~ '^[0-9]+$'
      THEN coalesce(nullif(ltrim(trim(numero_parcela), '0'), ''), '0')
    ELSE trim(numero_parcela)
  END;

ALTER TABLE public.policy_billing
  DROP CONSTRAINT IF EXISTS policy_billing_endosso_canonico,
  DROP CONSTRAINT IF EXISTS policy_billing_parcela_numerica_canonica;

ALTER TABLE public.policy_billing
  ADD CONSTRAINT policy_billing_endosso_canonico
    CHECK (numero_endosso ~ '^[0-9]{6}$'),
  ADD CONSTRAINT policy_billing_parcela_numerica_canonica
    CHECK (
      numero_parcela !~ '^[0-9]+$'
      OR numero_parcela ~ '^(0|[1-9][0-9]*)$'
    );

COMMIT;
