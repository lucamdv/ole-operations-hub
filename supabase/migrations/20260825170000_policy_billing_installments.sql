-- Uma cobrança pode conter múltiplas parcelas no mesmo endosso. Os registros
-- existentes representam o modelo legado agregado e recebem uma identidade
-- explícita para que a migração seja não destrutiva.
ALTER TABLE public.policy_billing
  ADD COLUMN numero_parcela text,
  ADD COLUMN id_parcela_seguradora text;

UPDATE public.policy_billing
SET numero_parcela = 'LEGACY'
WHERE numero_parcela IS NULL;

ALTER TABLE public.policy_billing
  ALTER COLUMN numero_parcela SET NOT NULL;

ALTER TABLE public.policy_billing
  DROP CONSTRAINT policy_billing_unico;

ALTER TABLE public.policy_billing
  ADD CONSTRAINT policy_billing_parcela_unica
  UNIQUE (numero_apolice, numero_endosso, numero_parcela);

CREATE INDEX idx_policy_billing_parcela_id
  ON public.policy_billing (id_parcela_seguradora)
  WHERE id_parcela_seguradora IS NOT NULL;
