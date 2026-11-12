# AUDIT-01.1 — Preview e homologação

## Escopo e estado inicial

Projeto `lucamdv/ole-operations-hub`, branch `codex/audit-01-webhook-contract`, Vercel `olexcockpit`, equipe `luca-monteiros-projects`. Main preservada no commit `738f312`.

Autorizados nesta fase: correção do callback por ambiente, testes, commit, push da branch e deploy Preview. Proibidos: merge, produção, migrations e auditoria contra recursos produtivos.

## Auditoria de ambiente

A inspeção das definições da Vercel encontrou variáveis compartilhadas entre Production e Preview, sem overrides da branch: conexão Supabase e chave administrativa, webhook de auditoria, credenciais da Excelsior e segredos de callbacks/agendamento. `PUBLIC_APP_URL` está configurada somente em Production. As variáveis de sistema `VERCEL_ENV` e `VERCEL_URL` são fornecidas pela Vercel.

A conta Supabase conectada lista apenas `OleCockpit` ativo e dois projetos inativos de outros produtos; não há projeto de homologação Olé identificado. Nenhum segredo foi impresso e nenhum registro operacional foi consultado ou alterado para esta publicação.

**Conclusão:** não há isolamento adequado para um disparo integrado. O Preview desta entrega será de código/contrato, com acessos operacionais bloqueados por overrides exclusivamente de Preview e desta branch. Endereços reservados `.invalid` são marcadores de bloqueio, não serviços de homologação. O login completo não será validado contra Supabase produtivo.

## Sequência de publicação segura

1. Revalidar qualidade e criar commit AUDIT-01/AUDIT-01.1 com `git.deploymentEnabled[branch]=false` temporário em `vercel.json`.
2. Fazer push da branch sem deployment automático.
3. Criar overrides `target=preview`, `gitBranch=codex/audit-01-webhook-contract`: retirar credenciais/destinos reais, bloquear hooks/callbacks/agendamentos e usar configuração pública Supabase inerte para carregar a tela de autenticação.
4. Conferir escopo e preservação das definições Production.
5. Remover o bloqueio temporário do `vercel.json` em um segundo commit e fazer push; a integração GitHub/Vercel poderá gerar o Preview com os overrides já presentes.
6. Confirmar READY, SHA, target Preview, resposta HTTP, assets, formulário de login e logs. Não enviar credenciais, recuperar senha, autenticar usuários reais ou disparar auditoria.

O bloqueio temporário usa a configuração oficial `git.deploymentEnabled` por branch; não modifica main nem configurações globais de deploy.

Sequência conferida: o primeiro commit `2fb2f1019a15753dc8ed522068f48846263b44e7` foi enviado sem gerar deployment. Em seguida foram criados e lidos 22 overrides, todos exclusivamente `target=preview` e `gitBranch=codex/audit-01-webhook-contract`. As definições anteriores de Production mantiveram IDs, chaves, tipos e targets. Só então o bloqueio temporário de `vercel.json` foi removido para o segundo push; o arquivo retorna ao conteúdo original de main.

| Grupo | Configuração desta branch |
| --- | --- |
| Supabase público/servidor | URLs `.invalid`, chaves públicas fictícias e IDs de bloqueio; service role vazia. |
| n8n | URLs de auditoria, correção, motor e endosso vazias. |
| Excelsior | URLs-base `.invalid`; usuário e senha vazios. |
| Agendamentos e callbacks | `CRON_SECRET`, `SCHEDULER_HOOK_SECRET`, `POLICY_SYNC_HOOK_SECRET`, `BILLING_RETRY_HOOK_SECRET`, `AUDIT_CALLBACK_SECRET`, `BILLING_CALLBACK_SECRET` e `ENDORSEMENT_CALLBACK_SECRET` vazios. |

Essa configuração impede operações reais; não representa infraestrutura de homologação funcional. Não se deve habilitar login, auditoria ou sincronização neste Preview antes de substituir os bloqueios por serviços isolados.

## Resolução do callback

`src/lib/audit/callback-url.ts` resolve a URL sem acessar banco/rede:

- Preview: exige `VERCEL_URL` do deployment, HTTPS e hostname Vercel; ignora os domínios públicos como fallback e rejeita coincidência com produção.
- Production: preserva `PUBLIC_APP_URL`, com fallback para domínio de produção da Vercel e domínio do deployment.
- Local/development: exige `PUBLIC_APP_URL` próprio; permite HTTP local; não herda domínio produtivo da Vercel.
- URLs com credenciais, caminho, query, fragmento ou protocolo indevido falham com mensagem controlada que não reproduz o valor.

A assinatura de `runAuditImpl()` e a rota do callback permanecem iguais. Erros de configuração após a criação da execução usam o fechamento `status=error` já implementado.

TDD: os dois novos testes de integração de Preview falharam contra o dispatcher anterior (callback apontava para `PUBLIC_APP_URL`; ausência de `VERCEL_URL` não falhava). Após o resolver, ambos passaram. Há mais seis testes puros de resolução por ambiente; a suíte esperada passa de 120 para 128, e os testes específicos de AUDIT de 26 para 34.

## Homologação integrada — bloqueada

Supabase isolado: **não disponível**. Webhook n8n de homologação isolado: **não identificado/validado**. Callback: o código agora resolve o domínio Preview, porém o endpoint fica sem segredo operacional enquanto não houver infraestrutura de homologação.

Para AUDIT-02 + AUDIT-01: disponibilizar banco Supabase de homologação, dados sintéticos, usuário de teste e callback secret exclusivo; workflow n8n receptor sem operações produtivas; substituir os overrides desta branch pelos destinos/segredos de homologação; manter agendamentos desativados; redeploy Preview e executar exatamente um disparo controlado, comparando chaves/tipos/SHA e retorno do callback. A AUDIT-03 só deve tratar callback, indicadores, dupla filtragem e retenção após essa homologação coordenada.

## Evidências finais

O deployment automático do segundo push (`d08085d3cbaef8220c6df5ad7d04c59e7b47636d`, ID `dpl_9xJQmLWSguUxihYjAEC87oqhDfKj`) foi bloqueado pela Vercel antes do build com `BLOCKED_PACKAGE`: o lockfile ainda usava `@tanstack/react-start@1.168.49`, afetado pela CVE-2026-102989. O erro foi confirmado contra o [aviso oficial do TanStack](https://github.com/TanStack/router/security/advisories/GHSA-qx66-fv34-fjm8).

Correção estritamente necessária à publicação: fixar `@tanstack/react-start@1.168.61`, `@tanstack/react-router@1.170.42` e `@tanstack/router-plugin@1.168.43`, mantendo a família de versões e dependências alinhadas; o núcleo transitivo passou a `@tanstack/start-server-core@1.169.40`. Lockfile atualizado com scripts de instalação desativados. A opção de bypass de vulnerabilidade sugerida no erro **não foi configurada**. A atualização permanece apenas nesta branch; main/Production não foram modificadas. O gate completo é repetido após a atualização antes do novo push.

O Router corrigido tipa `ErrorComponentProps.error` como `unknown`. O typecheck detectou a assinatura antiga que exigia `Error` em `src/routes/__root.tsx`; a adaptação usa o tipo oficial e estreitamento `instanceof Error` ao exibir a mensagem. Essa é a única adaptação de componente necessária à atualização; não altera login, permissões, regras ou layout.

Após essa adaptação: 128/128 testes estáticos passaram novamente, typecheck passou, lint permaneceu sem erros (o arquivo adaptado também foi verificado isoladamente) e o build final completo passou com o código atualizado. Revisão independente confirmou o alinhamento manifesto/lockfile e ausência das versões antigas vulneráveis de Start/server-core no lockfile.

O relatório de publicação entregue após READY contém os commits, deployment ID/URL/SHA, smoke e configurações verificadas. O exemplo completo do contrato está em [audit-01-contract.md](audit-01-contract.md); o pedido real não inclui diagnósticos internos ou credenciais.

- Testes específicos de AUDIT: 34/34 passaram (26 originais + 6 de resolução + 2 de integração Preview).
- `npm run test:static`: 128/128 passaram.
- `npm run typecheck`: exit 0.
- `npm run lint`: exit 0, sem erros e com os mesmos 25 warnings em arquivos não alterados.
- `npm run build`: exit 0, cliente e SSR gerados; warnings anteriores de dependências/deprecações e tamanho de chunk.
- Diff selecionado: apenas AUDIT-01 e salvaguardas AUDIT-01.1; nenhum `.env` ou padrão de credencial real encontrado.
- Revisão independente da AUDIT-01.1: sem bug ou risco material novo identificado; exige confirmar os overrides remotos antes do segundo push.
