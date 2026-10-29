# ENV-01/02/03 — operação e homologação

## Arquitetura

Auth e papéis continuam no projeto Supabase `otljnpasmhkoehmwnjvl`. O navegador usa somente a publishable key; o cliente administrativo permanece server-only. `profiles`, `user_roles` e `user_invites` são identidade compartilhada: mutações e administração ficam indisponíveis em homologação.

| Deployment | Modo da integração | Dados operacionais | Automação externa |
| --- | --- | --- | --- |
| Production | production | public | comportamento existente |
| Production | test | homolog | somente endpoint isolado autorizado |
| Preview | qualquer | homolog/test forçado | schedulers e MOTOR bloqueados |
| Desenvolvimento | padrão | homolog/test | schedulers e MOTOR bloqueados |
| Ambiente desconhecido | qualquer | erro | bloqueada |

O resolvedor puro valida o deployment real e cria um contexto congelado. AsyncLocalStorage propaga esse contexto por operação; não é a fonte durável dos callbacks. A fachada explícita de acesso permite somente 17 tabelas operacionais e um RPC, fixando o schema em cada consulta. Ela não expõe `.schema()`, nomes qualificados ou tabelas desconhecidas. Um erro em homolog nunca provoca fallback para public.

Dashboards normais de produção continuam em public. O modo individual afeta somente disparo, callback e polling daquela integração. Resultados de homologação podem ser vistos no Preview, sem alterar globalmente os KPIs produtivos.

## Execuções e callbacks

Antes do envio, `homolog.execution_contexts` registra `run_id`, integração, escopo, modo, origem e criação. Somente service_role pode inserir/ler; UPDATE/DELETE são negados por grants e trigger. O registry contém metadados dos dois escopos, não cópias de dados operacionais.

Callbacks autenticam antes de consultar o banco. Todos os identificadores e hints de scope nas estruturas aceitas (`payload`, `body`, `json` e arrays) são confrontados; conflito é recusado. O destino vem do registry e deve corresponder à integração e ao deployment de origem. Não há busca pelos dois schemas. Trocar o seletor depois do disparo não altera callback ou polling.

Compatibilidade legada: somente em Production, um ID sem registry pode consultar a tabela pública exata da integração para polling; callbacks legados exigem uma execução pública ainda `running`. Erro de consulta do registry nunca habilita fallback. Em Preview essa compatibilidade é recusada. Cobrança é uma perna de `policy_sync`, e seu callback também exige o run pai existente.

## Webhooks independentes

Preferências v2 por integração: auditoria, extração e correção. O legado migra preservando o modo salvo; storage inválido/indisponível não ativa produção silenciosamente. Preview força teste e exibe o schema de destino. O backend continua sendo a autoridade.

Produção mantém as variáveis existentes. Homologação exige as variáveis abaixo, HTTPS, caminho `/webhook-test/`, ausência de credenciais na URL e habilitação explícita:

```dotenv
N8N_AUDIT_HOMOLOG_WEBHOOK_URL=
N8N_ENDORSEMENT_HOMOLOG_WEBHOOK_URL=
N8N_CORRECTION_HOMOLOG_WEBHOOK_URL=
HOMOLOG_EXTERNAL_WEBHOOKS_ENABLED=false
```

**Não habilitar a flag apenas para fazer o botão funcionar.** Primeiro confirmar que os workflows de teste não chamam sistemas produtivos; configurar secrets de callback exclusivos no Preview e nos destinos isolados. Nenhum workflow ativo foi alterado nesta entrega. No Preview publicado, URLs, credenciais Excelsior e secrets herdados são anulados por overrides exclusivos da branch. A API nativa é bloqueada também na fronteira de cada requisição, inclusive com configuração explícita do cliente.

Callbacks atuais preservam o contrato de resposta. O AUDIT-01 v2 mantém `audit_contract_version`, `exclusions_snapshot_at`, `apolices_excluidas` e `excecoes_especificas`; o snapshot usa o mesmo schema do run. Os filtros antigos permanecem. `audit_runs.raw` ainda pode ser sobrescrito pelo callback: o registry preserva escopo, não todo o snapshot histórico. Persistência histórica completa requer fase específica futura.

## Banco e segurança

Ver `env-database.md` para inventário, SQL, privilégios, seed, riscos de lock e reversão. A migration aplicada é `20261029032034_env_01_homolog_schema.sql`; a versão corresponde à history remota. Os dados são exclusivamente sintéticos e marcados `SYNTHETIC_ENV_01`.

O backend usa service_role, que ignora RLS: a fachada e os guards são indispensáveis. Os grants de homolog não mudam privilégios/defaults de public/auth. Manter a proteção Vercel. Login compartilhado não autoriza administração da identidade em Preview; redefinição de senha e convites permanecem no ambiente produtivo.

## Verificação

TDD RED/GREEN cobre matriz de ambiente, isolamento concorrente, allowlist, mutações de identidade, modos independentes, registry, callbacks tardios, escopo adulterado, envelopes conflitantes, status legado e erros operacionais. O teste de integração executa dispatcher e callback reais com somente o transporte HTTP simulado, compara SHA-256 de todo o estado público e verifica auditoria v2, limpeza e workers recusados.

`tests/env-migration.test.mjs` executa SQL real em PostgreSQL 17.5 descartável. Requerer `ENV_PGLITE_MODULE` e `ENV_REQUIRE_DATABASE_TESTS=1` para o gate; um skip não equivale a validação. Nenhuma dependência de runtime foi adicionada ao aplicativo.

Resultado local da entrega: **203/203 testes, zero falhas/skips**; typecheck passou; lint passou com 25 avisos preexistentes; build passou (retry permitido após EPERM do sandbox); diff check passou. O teste arquitetural de correção passou a verificar o resolvedor central e é complementado pelos testes runtime dos destinos de extração/correção.

No Supabase real, 20/20 tabelas preexistentes de public mantiveram o hash completo após migration/seed. Catálogo confirmou 18 tabelas com RLS, 48 índices, 15 FKs, zero FKs operacionais para public, sete apólices sintéticas e registry sem permissões de alteração. Data API adicionou apenas homolog à exposição anterior.

## Publicação e gates restantes

Base `64d7ed827e15138291ca7d3a5b69a973075e6dee`; branch `codex/env-homolog-routing`. Commits separados ENV-01 banco, ENV-02 código e ENV-03 testes/publicação. O primeiro push bloqueia o deploy dessa branch; só se libera após conferir os 20 overrides Preview-only e a preservação das 51 definições existentes. Nenhum merge/push para main ou deploy produtivo é autorizado.

O relatório final contém SHA, deployment ID/URL e evidências do smoke. Login e papéis precisam de sessão autorizada real: não declarar esse gate completo apenas com tela de login, metadata, mocks ou uma sessão do painel Supabase. Não solicitar senha em mensagem/log nem gerar login administrativo por impersonação. Caso falte sessão, registrar o gate como pendente e pedir login diretamente no Preview.

Pendências intencionais: validação e configuração dos workflows n8n isolados; secrets exclusivos antes de ativação; verificação de login/papéis e telas autenticadas quando houver sessão. Os alertas de segurança preexistentes do projeto (pg_net em public e proteção de senha vazada desabilitada) não foram alterados. A próxima fase de consumo das exclusões no n8n e eventual remoção da dupla filtragem não faz parte desta entrega.
