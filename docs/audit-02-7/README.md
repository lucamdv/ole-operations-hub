# AUDIT-02.7 — Hardening e plano de promoção (sem deploy produtivo)

## Implementações no Preview

- Lockfile atualizado por `npm audit fix` (sem major forçado); validar `npm audit --audit-level=high` e gates.
- Callback: `homolog.commit_audit_callback` consolida achados, reabertura de resoluções e status terminal **na mesma transação PostgreSQL**. `SELECT ... FOR UPDATE` bloqueia o `audit_runs.id` que é usado por cancelamento manual, reinício e timeout. Se o cancelamento vencer, retorna `duplicate: true` **sem escrita lateral**; se o callback vencer, já não é uma execução `running`, então cancelá-la não é um cancelamento válido.
- Failures da operação RPC revertem toda a transação; o callback pode ser reenviado. O callback técnico `status:error` continua usando atualização condicional da run sem findings.
- O Supabase homolog usa `pg_cron` a cada minuto, encerrando runs `running` cuja criação foi há mais de 15 minutos. Não requer navegador aberto nem alteração em agendamentos da Vercel. O job afeta **somente** `homolog.audit_runs`.
- O snapshot agora é persistido com `status=running` no filtro da atualização: uma execução cancelada durante a preparação não pode receber snapshot posterior.
- O contrato v3 continua ativo somente na branch Preview com `AUDIT_TEST_CONTRACT_VERSION=3`; produção segue em v2 até `AUDIT_PRODUCTION_CONTRACT_VERSION=3` ser configurado explicitamente.

## Banco: situação e validação

A função `homolog.commit_audit_callback(uuid,jsonb,jsonb,uuid[])` foi instalada no schema `homolog`. Não foi criada em `public` nesta entrega.

A função `public.commit_audit_callback` está **apenas preparada** no arquivo
`supabase/migrations/20261111183000_audit_027_atomic_callback.sql`, mas sua aplicação exige aprovação específica para produção.

A role `service_role` recebe execução; `anon` e `authenticated` não recebem. O backend consulta a função somente pelo cliente com escopo derivado do registro imutável da execução.

Foi validada a execução SQL com **BEGIN/ROLLBACK** sobre linhas sintéticas: commit original, duplicata e callback de run cancelada. Nenhum dado dessa validação foi persistido.

## Watchdog de homologação

O job `audit-homolog-expire-15m` (criado no `pg_cron`) executa:

```sql
UPDATE homolog.audit_runs
SET status = 'error',
    status_geral = 'ERRO',
    mensagem_geral = 'Auditoria expirada: callback nao recebido em ate 15 minutos.',
    error_message = 'Tempo limite de 15 minutos sem resultado final do n8n.'
WHERE status = 'running'
  AND created_at < now() - interval '15 minutes';
```

O watchdog de produção **não** foi criado. Uma eventual implantação de produção deve usar outro nome e escopo explícito `public.audit_runs`.

## Promoção a produção — sequência obrigatória, sujeita à autorização

1. Congelar o SHA da branch e revisar o diff completo do PR para `main`; evitar merge automático.
2. Fazer backup/rollback do banco e do workflow n8n original; conferir secret de callback (não exportá-lo).
3. **Antes de publicar o código**, aprovar e instalar somente a parte da função **`public.commit_audit_callback`** do SQL versionado; conferir execução apenas para `service_role` e recarregar o schema do PostgREST. A função é necessária mesmo enquanto o n8n ainda envia v2, pois os callbacks novos de v2 também são finalizados pela RPC.
4. Promover código com `AUDIT_PRODUCTION_CONTRACT_VERSION` **não definido** (produção continua disparando **v2**). Garantir callback do n8n original, histórico e cancelamento. Não reutilizar a variável Preview.
5. Publicar os nodes n8n v3 no workflow original **após homologação e aprovação**. O validador v3 deve ser compatível com v2 durante o período de transição. Conferir callback oficial `https://olexcockpit.vercel.app`, headers/credentials, a identificação de apólices dispensadas e os controles cooperativos. Nunca copiar um `/webhook-test/` para produção.
6. Aprovar e configurar `AUDIT_PRODUCTION_CONTRACT_VERSION=3` somente no ambiente Production da Vercel; criar um novo deployment produtivo depois de validar o destino real do webhook e a função RPC. O gatilho falha fechado caso o callback não seja do domínio oficial ou o destino não tenha `/webhook/`.
7. Verificar uma auditoria real com contagens consistentes, resultado no schema `public`, ausência de findings indevidos após cancelamento e reenvio idempotente.
8. Agendar watchdog específico de produção, se aprovado, com query limitada a `public.audit_runs` e monitorar disparos. Não inferir que a existência do job homolog protege produção.

## Rollback

- Para **reverter o contrato v3**: remover somente `AUDIT_PRODUCTION_CONTRACT_VERSION` e efetuar um novo deployment; novos disparos voltam a v2. Manter aceitação de callbacks de runs v3 **já registradas**, para não perder resultados em trânsito.
- Para reverter o código: restaurar o commit anterior, preservando as funções SQL como infraestrutura reversível. Desligar temporariamente disparos antes de alterações que removam a função RPC.
- Para o n8n: manter export versionado do workflow original; restaurar nodes v2 com a mesma autenticação. Não confundir esse rollback com desfazer exclusões ou resoluções históricas.

## Pendências antes de go/no-go

- `npm run test:static`, `npm run typecheck`, `npm run lint`, `npm run build`, `npm audit --audit-level=high`, `git diff --check` no SHA definitivo.
- E2E do **reinício automático** em uma cópia isolada com webhook `/webhook/` ativo, pois `/webhook-test/` não permite disparos concorrentes repetíveis. Não alterar a operação original sem autorização.
- A revisão de dependências moderadas remanescentes, sem atualizações major automáticas.
- Aprovação de mudança de banco `public`, n8n original e deploy de produção explicitamente separadas.
