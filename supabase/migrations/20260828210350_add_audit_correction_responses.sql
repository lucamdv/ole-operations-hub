CREATE TABLE public.audit_correction_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  incident_key text NOT NULL,
  finding_id uuid REFERENCES public.audit_findings(id) ON DELETE SET NULL,
  run_id uuid REFERENCES public.audit_runs(id) ON DELETE SET NULL,
  apolice text NOT NULL,
  tipo_erro text NOT NULL,
  endosso text,
  nivel text,
  detected_at timestamptz NOT NULL,
  responded_at timestamptz NOT NULL DEFAULT now(),
  requested_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  mode text NOT NULL DEFAULT 'production' CHECK (mode IN ('test', 'production')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (incident_key, detected_at)
);

CREATE INDEX audit_correction_responses_responded_at_idx
  ON public.audit_correction_responses (responded_at DESC);

CREATE INDEX audit_correction_responses_critical_idx
  ON public.audit_correction_responses (responded_at DESC)
  WHERE upper(coalesce(nivel, '')) = 'ERRO';

ALTER TABLE public.audit_correction_responses ENABLE ROW LEVEL SECURITY;

-- O histórico de resposta é técnico e só é lido/escrito pelas funções server-side.
REVOKE ALL ON public.audit_correction_responses FROM anon, authenticated;
GRANT ALL ON public.audit_correction_responses TO service_role;

COMMENT ON TABLE public.audit_correction_responses IS
  'Primeira resposta operacional registrada após o webhook de correção aceitar uma ocorrência.';
