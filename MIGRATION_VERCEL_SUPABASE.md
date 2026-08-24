# Migração Lovable Cloud → Vercel + Supabase

## Arquitetura alvo
- **Vercel:** TanStack Start, SSR, server functions e rotas `/api/*` via Nitro.
- **Supabase:** Postgres, Auth, RLS e Storage.
- **n8n:** motor externo de auditoria/sincronização; callbacks apontam para a URL pública da Vercel.

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
`vercel.json` chama `/api/public/hooks/scheduler` a cada 5 minutos. Configure `CRON_SECRET` na Vercel. O endpoint também continua aceitando POST com `x-hook-secret` para chamadas do n8n.

> Vercel Hobby não permite cron a cada 5 minutos. Nesse caso, remova o cron do `vercel.json` e faça o n8n chamar o endpoint por POST a cada 5 minutos.

## 6. n8n
Atualize todos os callbacks/URLs de retorno usados pelos workflows para a URL pública nova. O app também envia `callback_url` dinamicamente usando `PUBLIC_APP_URL` (com fallback para as variáveis de URL da Vercel).

## 7. Dados
As migrations recriam **estrutura**, não os registros do banco antigo. Se você precisa manter histórico de apólices, auditorias, usuários/perfis e configurações, faça export/import controlado do banco antigo para o novo antes do corte.

## 8. Checklist de corte
- Criar Supabase novo e aplicar migrations.
- Gerar/validar tipos se houver alteração de schema.
- Migrar dados necessários.
- Criar usuários Auth ou migrá-los por estratégia adequada.
- Configurar variáveis na Vercel.
- Atualizar secrets/URLs no n8n.
- Testar login, dashboard, auditoria manual, callbacks, sincronização, cobrança, extração de endossos e scheduler.
- Só depois trocar domínio/DNS e desligar publicação Lovable.
