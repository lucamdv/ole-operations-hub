-- Uma solicitação no webhook de teste não pode impedir o registro posterior
-- da mesma ocorrência no webhook de produção. As KPIs continuam consultando
-- somente respostas de produção.
ALTER TABLE public.audit_correction_responses
  DROP CONSTRAINT audit_correction_responses_incident_key_detected_at_key;

ALTER TABLE public.audit_correction_responses
  ADD CONSTRAINT audit_correction_responses_incident_key_detected_at_mode_key
  UNIQUE (incident_key, detected_at, mode);

DROP INDEX IF EXISTS public.audit_correction_responses_critical_idx;

CREATE INDEX audit_correction_responses_production_responded_at_idx
  ON public.audit_correction_responses (responded_at DESC)
  WHERE mode = 'production';
