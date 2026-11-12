# ENV-01/02/03 — operação e homologação

Atualizado por **AUDIT-02.2**: a auditoria usa a carteira real como fonte, mantendo os resultados de teste em homolog. As restrições anteriores de endpoint isolado e fonte exclusivamente sintética foram substituídas explicitamente pelo usuário. O plano/relatório ENV original permanece como registro histórico, não como configuração atual.

## Arquitetura

Auth e papéis continuam no projeto Supabase `otljnpasmhkoehmwnjvl`. O navegador usa somente a publishable key; o cliente administrativo permanece server-only. `profiles`, `user_roles` e `user_invites` são identidade compartilhada: mutações e administração ficam indisponíveis em homologação.

| Deployment | Modo da integração | Dados operacionais | Automação externa |
| --- | --- | --- | --- |
| Production | production | public | comportamento existente |
| Production | test | homolog | webhook-test original; auditoria somente leitura |
| Preview | qualquer | homolog/test forçado | schedulers e MOTOR bloqueados |
| Desenvolvimento | padrão | homolog/test | schedulers e MOTOR bloqueados |
| Ambiente desconhecido | qualquer | erro | bloqueada |

O resolvedor puro valida o deployment real e cria um contexto congelado. AsyncLocalStorage propaga esse contexto por operação; não é a fonte durável dos callbacks. A fachada explícita de acesso permite somente 17 tabelas operacionais e um RPC, fixando o schema em cada consulta. Ela não expõe `.schema()`, nomes qualificados ou tabelas desconhecidas. Um erro em homolog nunca provoca fallback para public.

Dashboards normais de produção continuam em public. O modo individual afeta somente disparo, callback e polling daquela integração. Resultados de homologação podem ser vistos no Preview, sem alterar globalmente os KPIs produtivos.

**Exceção de leitura AUDIT-02.2:** somente a preparação do payload v2 acessa `public.policies`, `public.endorsements`, `public.policy_billing` e `public.audit_ignores`, por capability server-only com SELECT e projeções fixas. Ela retorna o snapshot consolidado, não um cliente público. O cliente operacional normal permanece escopado e não ganha acesso genérico a public. Não há fallback para o seed se a consulta real falhar. As consultas de detalhe à Excelsior continuam no workflow n8n real, sem substituição por mocks/fixtures na aplicação.

## Execuções e callbacks

Antes do envio, `homolog.execution_contexts` registra `run_id`, integração, escopo, modo, origem e criação. Somente service_role pode inserir/ler; UPDATE/DELETE são negados por grants e trigger. O registry contém metadados dos dois escopos, não cópias de dados operacionais.

Callbacks autenticam antes de consultar o banco. Todos os identificadores e hints de scope nas estruturas aceitas (`payload`, `body`, `json` e arrays) são confrontados; conflito é recusado. O destino vem do registry e deve corresponder à integração e ao deployment de origem. Não há busca pelos dois schemas. Trocar o seletor depois do disparo não altera callback ou polling.

Compatibilidade legada: somente em Production, um ID sem registry pode consultar a tabela pública exata da integração para polling; callbacks legados exigem uma execução pública ainda `running`. Erro de consulta do registry nunca habilita fallback. Em Preview essa compatibilidade é recusada. Cobrança é uma perna de `policy_sync`, e seu callback também exige o run pai existente.

## Webhooks independentes

Preferências v2 por integração: auditoria, extração e correção. O legado migra preservando o modo salvo; storage inválido/indisponível não ativa produção silenciosamente. Preview força teste e exibe o schema de destino. O backend continua sendo a autoridade.

Todos os modos reutilizam as variáveis originais, com HTTPS e sem credenciais embutidas na URL:

```dotenv
N8N_AUDIT_WEBHOOK_URL=
N8N_ENDORSEMENT_WEBHOOK_URL=
N8N_CORRECTION_WEBHOOK_URL=
```

Produção converte `/webhook-test/` para `/webhook/`; Teste e Preview usam `/webhook-test/`, inclusive quando a URL original já está nesse formato. Não há novas flags ou variáveis HOMOLOG. No n8n, o endpoint de teste deve estar em "Listen for test event"; HTTP 404 mantém essa orientação, sem mascarar falha como sucesso. Nenhum workflow foi criado ou alterado.

No Preview restaurar apenas a herança das configurações existentes de auditoria/callback. Overrides de MOTOR, workers, extração e correção permanecem intactos. A autorização de consultas reais NÃO permite alterações financeiras, emissão ou endossos: MOTOR nativo e schedulers continuam bloqueados; `SOLUCIONAR` recusa correções externas em homolog antes de consultar/alterar dados ou chamar o webhook. Produção mantém o comportamento autorizado de correção. Os seletores continuam independentes.

Callbacks atuais preservam o contrato de resposta. O AUDIT-01 v2 mantém `audit_contract_version`, `exclusions_snapshot_at`, `apolices_excluidas` e `excecoes_especificas`; o snapshot representa as quatro fontes reais e é persistido no schema do run. Os filtros antigos permanecem. `audit_runs.raw` ainda pode ser sobrescrito pelo callback: o registry preserva escopo, não todo o snapshot histórico. Persistência histórica completa requer fase específica futura.

## Banco e segurança

Ver `env-database.md` para inventário, SQL, privilégios, seed, riscos de lock e reversão. A migration aplicada é `20261029032034_env_01_homolog_schema.sql`; a versão corresponde à history remota. O seed inicial é sintético e marcado `SYNTHETIC_ENV_01`; novas auditorias de teste contêm resultados da carteira real, exclusivamente em homolog. AUDIT-02.2 não modifica schema, grants ou dados produtivos.

O backend usa service_role, que ignora RLS: a fachada e os guards são indispensáveis. Os grants de homolog não mudam privilégios/defaults de public/auth. Manter a proteção Vercel. Login compartilhado não autoriza administração da identidade em Preview; redefinição de senha e convites permanecem no ambiente produtivo.

## Verificação

TDD RED/GREEN cobre matriz de ambiente, isolamento concorrente, allowlist, mutações de identidade, modos independentes, registry, callbacks tardios, escopo adulterado, envelopes conflitantes, status legado e erros operacionais. O teste de integração executa dispatcher e callback reais com somente o transporte HTTP simulado, compara SHA-256 de todo o estado público e verifica auditoria v2, limpeza e workers recusados.

`tests/env-migration.test.mjs` executa SQL real em PostgreSQL 17.5 descartável. Requerer `ENV_PGLITE_MODULE` e `ENV_REQUIRE_DATABASE_TESTS=1` para o gate; um skip não equivale a validação. Nenhuma dependência de runtime foi adicionada ao aplicativo.

Baseline ENV: **203/203 testes, zero falhas/skips**, typecheck/lint/build aprovados, 25 avisos preexistentes de lint. AUDIT-02.2 acrescenta testes de capability SELECT-only, fontes reais nos dois deployments, falha sem fallback, destinos originais, isolamento de todas as escritas e proteção contra correções externas. Consultar o relatório AUDIT-02.2 para o resultado da rodada atual.

No Supabase real, 20/20 tabelas preexistentes de public mantiveram o hash completo após migration/seed. Catálogo confirmou 18 tabelas com RLS, 48 índices, 15 FKs, zero FKs operacionais para public, sete apólices sintéticas e registry sem permissões de alteração. Data API adicionou apenas homolog à exposição anterior.

## Publicação e gates restantes

Base ENV `64d7ed827e15138291ca7d3a5b69a973075e6dee`; branch `codex/env-homolog-routing`. Os commits ENV-01/02/03 inicialmente usaram 20 overrides Preview-only. Em AUDIT-02.2 foram removidos, com autorização específica, somente os dois overrides vazios de auditoria/callback e as quatro configurações homolog obsoletas. As demais 65 definições existentes foram conferidas sem alterações, inclusive Production; os outros 14 overrides da branch permanecem. Nenhum merge/push para main ou deploy produtivo é autorizado.

O relatório final contém SHA, deployment ID/URL e evidências do smoke. Login e papéis precisam de sessão autorizada real: não declarar esse gate completo apenas com tela de login, metadata, mocks ou uma sessão do painel Supabase. Não solicitar senha em mensagem/log nem gerar login administrativo por impersonação. Caso falte sessão, registrar o gate como pendente e pedir login diretamente no Preview.

Validação real requer sessão autorizada, listener do webhook-test ativo e callback acessível ao n8n. Proteção da Vercel não deve ser desligada silenciosamente; eventual barreira de SSO no callback é um gate de infraestrutura a relatar, não motivo para enviar resultados ao callback produtivo. Os alertas de segurança preexistentes do projeto não foram alterados. O consumo das exclusões no n8n e a remoção da dupla filtragem continuam fora deste ajuste.
