# Migração Lovable Cloud → Vercel + Supabase

## Arquitetura alvo

- **Vercel:** TanStack Start, SSR, server functions e rotas `/api/*` via Nitro.
- **Supabase:** Postgres, Auth, RLS e Storage.
- **MOTOR direto:** emissão, endossos e cobranças são sincronizados pela aplicação, sem n8n.
- **n8n:** permanece apenas nos fluxos de auditoria, extração avulsa e correção; callbacks apontam para a URL pública da Vercel.

## 1. Criar um projeto Supabase novo

1. Crie o projeto no Supabase.
2. Instale a Supabase CLI.
3. Autentique e vincule este repositório ao projeto.
4. Rode primeiro um dry-run das migrations e depois aplique-as.

```bash
supabase login
supabase link --project-ref SEU_PROJECT_REF
supabase db push --dry-run
supabase db push
```

As migrations existentes em `supabase/migrations` foram preservadas porque já descrevem o schema, policies, triggers e funções Postgres usados pelo app.

## 2. Auth

O login atual já usa `supabase.auth.signInWithPassword`. O SDK `@lovable.dev/cloud-auth-js` foi removido.

No Supabase, configure em **Authentication → URL Configuration**:

- Site URL: URL de produção da Vercel ou domínio próprio.
- Redirect URLs: produção e previews que você realmente utilizar.

## 3. Variáveis de ambiente

Copie `.env.example` para `.env.local` no desenvolvimento e configure os mesmos nomes na Vercel.

Nunca exponha `SUPABASE_SERVICE_ROLE_KEY` ou segredos do n8n com prefixo `VITE_`.

## 4. Deploy Vercel

O projeto agora usa a configuração oficial TanStack Start + Nitro.

```bash
npm install
npm run build
```

Depois importe o repositório na Vercel. TanStack Start/Nitro são detectados automaticamente.

## 5. Scheduler

O projeto **não usa Vercel Cron**. O `vercel.json` deve permanecer sem configuração `crons`, evitando limites de frequência/quantidade do plano da Vercel.

O job `billing-sync-fallback-worker`, instalado no Supabase pela migration de recuperação de cobranças, chama o backend a cada minuto. O mesmo tick agora avalia `automation_schedules`, portanto os toggles da tela **Configurações → Automação** executam auditoria e sincronização nos dias, horários e fusos configurados sem depender de n8n ou de outro agendador externo.

O endpoint `/api/public/hooks/scheduler` continua disponível para disparos externos via `POST` protegido por `x-hook-secret`, usando `SCHEDULER_HOOK_SECRET` (com fallback de compatibilidade para `POLICY_SYNC_HOOK_SECRET`).

O suporte a `GET` protegido por `CRON_SECRET` permanece no endpoint apenas por compatibilidade.

## 6. n8n

Atualize os callbacks/URLs de retorno dos workflows de auditoria, extração avulsa e correção para a URL pública nova. O app também envia `callback_url` dinamicamente usando `PUBLIC_APP_URL` (com fallback para as variáveis de URL da Vercel). Não configure webhook n8n para o MOTOR de apólices, endossos e cobranças.

## 7. Dados

As migrations recriam **estrutura**, não os registros do banco antigo. Se você precisa manter histórico de apólices, auditorias, usuários/perfis e configurações, faça export/import controlado do banco antigo para o novo antes do corte.

## 8. Qualidade e testes

O repositório possui validações automatizadas para:

- invariantes estruturais da migração e segurança dos callbacks;
- propagação correta de falhas entre emissão e cobrança;
- ausência de Cron automático da Vercel;
- TypeScript estrito;
- ESLint sem misturar erros de formatação;
- build de produção;
- auditoria de dependências;
- smoke tests não destrutivos dos endpoints públicos de produção.

Use:

```bash
npm run test:static
npm run typecheck
npm run lint
npm run build
npm run test:smoke
```

## 9. Checklist de corte

- Criar Supabase novo e aplicar migrations.
- Gerar/validar tipos se houver alteração de schema.
- Migrar dados necessários.
- Criar usuários Auth ou migrá-los por estratégia adequada.
- Configurar variáveis na Vercel.
- Atualizar secrets/URLs no n8n.
- Testar login, dashboard, auditoria manual, callbacks, sincronização, cobrança e extração de endossos.
- Validar o tick interno do Supabase e os agendamentos ativados em Configurações → Automação.
- Só depois trocar domínio/DNS e desligar publicação Lovable.
