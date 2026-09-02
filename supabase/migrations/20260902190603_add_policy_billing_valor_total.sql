ALTER TABLE public.policy_billing
  ADD COLUMN IF NOT EXISTS valor_total numeric(18, 4);

COMMENT ON COLUMN public.policy_billing.valor_total IS
  'Valor total da parcela devolvido pela API de cobrança da Excelsior.';

CREATE INDEX IF NOT EXISTS idx_policy_billing_quitacao_total
  ON public.policy_billing (data_quitacao)
  WHERE status_pagamento = 'Total' AND data_quitacao IS NOT NULL;
