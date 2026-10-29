# ENV-01 — banco de homologação

## Catálogo e escopo

Base: `64d7ed827e15138291ca7d3a5b69a973075e6dee` (AUDIT-01 v2). Projeto confirmado pela API: **OleCockpit**, `otljnpasmhkoehmwnjvl`, PostgreSQL `17.6.1.155`, região `us-west-2`. A inspeção de 28/10/2026 consultou somente metadados: colunas/defaults/tipos, constraints, FKs, índices, sequências, triggers/funções, RLS e grants. Nenhuma linha real foi utilizada como fixture.

O catálogo de `public` possui 20 tabelas, sem views, sequências, identities ou defaults `nextval`. `profiles`, `user_roles` e `user_invites` são compartilhadas e não são copiadas. Os papéis existentes são `admin`, `manager` e `user`; nenhum papel novo é criado.

| Grupo         | Tabelas operacionais replicadas em `homolog`                                                       |
| ------------- | -------------------------------------------------------------------------------------------------- |
| Carteira      | `policies`, `endorsements`, `policy_billing`                                                       |
| Auditoria     | `audit_runs`, `audit_findings`, `audit_ignores`, `audit_resolutions`, `audit_correction_responses` |
| Sincronização | `policy_sync_runs`, `policy_sync_changes`, `billing_sync_state`, `billing_sync_fallbacks`          |
| Extração      | `endorsement_extraction_runs`, `endorsement_extraction_items`, `endorsement_exceptions`            |
| Configuração  | `exception_reason_tags`, `automation_schedules`                                                    |

Essas 17 tabelas possuem 47 índices, incluindo PKs/unique e índices parciais/de expressão, 15 FKs e nove triggers de timestamp. Das quatro funções em `public`, somente `touch_updated_at` e `claim_billing_sync_fallbacks` requerem versões locais. `has_role` e `handle_new_user` permanecem globais, sem alterações.

## Migration e dependências

`supabase/migrations/20261029032034_env_01_homolog_schema.sql` foi inicialmente criada com `supabase migration new` e alinhada à versão `20261029032034` atribuída pelo MCP na aplicação remota. O SQL não foi alterado nessa renomeação: SHA-256 `e47b8a58bae90210cd7d2ad2fb4424cf0d4fa1f7f243897acbb7ad5b6d3a2cd2`.

A migration cria objetos somente em `homolog`, em uma transação. Não lê linhas nem modifica objetos/dados de `public` ou `auth`, não instala extensões/jobs e não chama serviços externos. `lock_timeout = 5s` e `statement_timeout = 60s` limitam espera/execução. Locks `SHARE UPDATE EXCLUSIVE` nas 17 fontes permitem SELECT/INSERT/UPDATE/DELETE concorrentes, mas bloqueiam DDL, inclusive criação concorrente de índices, durante a inspeção/cópia. Também podem adiar brevemente VACUUM/ANALYZE; se a obtenção do lock ultrapassar cinco segundos, a migration falha e reverte. A compatibilidade é definida na [documentação de locks do PostgreSQL](https://www.postgresql.org/docs/17/explicit-locking.html).

`LIKE ... INCLUDING ALL` preserva colunas, tipos, defaults, NOT NULL, checks, PKs/unique, índices e atributos estruturais sem copiar dados. FKs, triggers, RLS e grants são recriados separadamente, como exige a semântica de [CREATE TABLE do PostgreSQL](https://www.postgresql.org/docs/17/sql-createtable.html).

O preflight recusa fonte ausente/particionada, identity, sequência compartilhada, tipo/collation fora de `pg_catalog`, default cruzado e função/operador/opclass/collation de expressão fora do catálogo. FKs operacionais são remapeadas para `homolog`, preservando nomes e ações; referências compartilhadas são permitidas apenas para `auth.users`. São 10 FKs locais e cinco para Auth. Relacionamento inesperado aborta toda a transação.

Os nove triggers de timestamp passam a executar `homolog.touch_updated_at`. Somente a forma conhecida `BEFORE UPDATE FOR EACH ROW`, sem argumentos/condição, é aceita; trigger inesperado também aborta a migration. As novas funções usam `SECURITY INVOKER`, `search_path = pg_catalog` e nomes qualificados. O RPC `homolog.claim_billing_sync_fallbacks` mantém lease e `FOR UPDATE SKIP LOCKED`, toca exclusivamente a fila local e só pode ser executado por `service_role`.

Um schema `homolog` já existente causa falha explícita; a migration não reutiliza silenciosamente estruturas desconhecidas. Sua aplicação é única, controlada pela migration history. O seed é um artefato separado.

## Privilégios e RLS

As 18 tabelas novas têm RLS. Não há grant para `anon`. Grants herdados da configuração do projeto são removidos dos objetos novos antes do commit; defaults/privilégios de produção não são alterados.

| Role / recurso                                            | Privilégios                                                                                                                                                                                       |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `service_role`, 17 tabelas operacionais                   | `SELECT`, `INSERT`, `UPDATE`, `DELETE`; sem `TRUNCATE`, `TRIGGER` ou `REFERENCES`                                                                                                                 |
| `service_role`, `execution_contexts`                      | Somente `SELECT`, `INSERT`                                                                                                                                                                        |
| `authenticated`, seis tabelas já acessíveis pelo cliente  | `SELECT` em `audit_ignores`, `audit_resolutions`, `automation_schedules`, `endorsement_exceptions`, `exception_reason_tags`, `policy_billing`, mediante papel global atribuído ao próprio usuário |
| `authenticated`, exceções/resoluções                      | DML próprio; admin também pode operar registros sem autor. UPDATE usa `USING` e `WITH CHECK`                                                                                                      |
| `authenticated`, tags/exceções de extração                | DML somente para `admin`                                                                                                                                                                          |
| `authenticated`, demais tabelas / registry / RPC de retry | Sem grants                                                                                                                                                                                        |

A autorização consulta apenas `public.user_roles` do próprio `auth.uid()`, sob a RLS existente. Não usa `user_metadata`, não duplica Auth e não cria funções `SECURITY DEFINER`. Usuário comum não pode criar registro sem autor ou atribuí-lo a outra pessoa. Os fixtures de autor nulo exigem backend/admin para alteração.

`service_role` ignora RLS; a seleção central do schema e recusas server-only do ENV-02 são obrigatórias. Privilégios locais não impedem que uma chave administrativa mal utilizada acesse `public`. Credenciais administrativas nunca devem chegar ao navegador.

## Registry imutável

`homolog.execution_contexts` armazena metadados de infraestrutura para **ambos os escopos**, com `run_id uuid` (PK), `integration`, `data_scope`, `webhook_mode`, `origin_environment` e `created_at`. Integrações: `audit`, `extraction`, `policy_sync`, `billing`, `correction`. As etapas atuais de emissão/cobrança compartilham um run cujo tipo canônico é `policy_sync`.

Não há FK para runs nem dados pessoais/propostas no registry. Assim o backend pode persistir o contexto antes de disparar uma execução. A constraint permite `data_scope = production` apenas com origem `production` e modo `production`. A PK impede substituir a integração/destino de um ID registrado.

Um trigger rejeita UPDATE/DELETE inclusive pelo proprietário. Workers recebem somente INSERT/SELECT, sem TRUNCATE; clientes não recebem leitura. O backend deve buscar a associação exata e validar integração/origem, recusando ausência/conflito, sem procurar o ID nos dois schemas ou confiar no scope externo. O registry não possui rotina de limpeza; qualquer retenção futura precisa preservar callbacks, retries e histórico.

## Exposição à Data API

Adicionar `homolog` à lista atual de schemas expostos é um gate de configuração separado, preservando os valores existentes. O acesso usa `supabase.schema('homolog')`, com tipos de custom schema. A [documentação Supabase](https://supabase.com/docs/guides/api/using-custom-schemas) descreve a combinação de schema exposto, USAGE e grants. Os grants amplos do exemplo não são adotados.

Verificar pela API real: leitura administrativa local, recusa de `anon`, recusa de registry pelo usuário e leitura autenticada autorizada. PostgreSQL local não substitui esse gate de PostgREST. O [changelog de grants explícitos](https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically) foi revisado: a alteração de defaults em `public` não afeta custom schemas nem integra este trabalho.

## Seed sintético

`supabase/seeds/homolog.sql` escreve somente em `homolog`. UUIDs, datas e números são fixos, sem CPF, e-mail ou dados pessoais reais, com marcador `SYNTHETIC_ENV_01`. Há fixtures nas 17 tabelas e seis registros de contexto. `ON CONFLICT DO NOTHING` permite repetir sem sobrescrever estado existente.

| Número fictício      | Cenário                                                     |
| -------------------- | ----------------------------------------------------------- |
| `000000000001000000` | Ativa/paga                                                  |
| `000000000002000000` | Cancelada por endosso A / resilição                         |
| `000000000003000000` | Suspensa por endosso C / inadimplência                      |
| `000000000004000000` | Inadimplente, sem suspensão; segue elegível à auditoria     |
| `000000000005000000` | Uma exceção específica                                      |
| `000000000006000000` | Dois tipos de exceção                                       |
| `000000000007000000` | Cancelada, exceção específica e exclusão integral histórica |

Inclui auditorias aprovada/reprovada/falha técnica, dois findings, raws de callbacks de auditoria/extração/sync, resolução, primeira resposta em teste e estado de cobrança. O único agendamento (`audit`) está desabilitado. O fallback pendente sintético valida o lease local; workers externos devem continuar bloqueados em Preview/homolog pelo ENV-02. O seed não chama integrações externas.

Números são `text`, preservando zeros. CANCELADA/SUSPENSA são reconhecidas pelo tradutor e motor real do AUDIT-01, sem campos artificiais de status.

## Validação reproduzível e limites

`tests/env-migration.test.mjs` combina safety checks estruturais e execução PostgreSQL real. A fase RED apresentou cinco falhas estruturais e ausência de `homolog.policies`. O gate usa `@electric-sql/pglite@0.3.14`, **PostgreSQL 17.5**, na mesma major do projeto remoto 17.6.1.155. O runtime é instalado somente em TEMP, sem dependência nova no aplicativo. O teste confere a major e imprime versão/hash para evitar validar acidentalmente com outro PostgreSQL.

Para exigir execução real, definir `ENV_PGLITE_MODULE` para o `dist/index.js` da instalação temporária e `ENV_REQUIRE_DATABASE_TESTS=1`, e executar `node --test tests/env-migration.test.mjs`. Sem runtime, esse modo falha. A execução comum informa explicitamente um skip caso não haja módulo; esse skip não cumpre o gate de integração. No ambiente desta entrega, o comando PowerShell é:

```powershell
$env:ENV_PGLITE_MODULE='C:\Users\lucad\AppData\Local\Temp\ole-env01-pglite-17\node_modules\@electric-sql\pglite\dist\index.js'
$env:ENV_REQUIRE_DATABASE_TESTS='1'
& 'C:\Users\lucad\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --test tests/env-migration.test.mjs
```

A rodada final registra 16 testes aprovados, zero falhas e zero skips. A versão minor/empacotamento local difere do Supabase gerenciado; exposição à Data API, autenticação real e ambiente de deployment continuam sendo gates próprios.

O teste aplica migration/seed, repete o seed e compara conteúdo completo canônico. Consulta `pg_locks` antes do COMMIT e comprova os 17 locks de proteção de metadados; esse caso também teve RED/GREEN. Verifica tabelas/RLS, colunas/defaults, 47 índices, 15 FKs, nove timestamp triggers mais imutabilidade, grants, ownership, checks, unicidade, cascatas e RPC. Deriva as exclusões v2 com código real da aplicação.

Cinco alterações perigosas na fonte descartável (default de sequência, função customizada em CHECK, operador customizado em CHECK, FK não autorizada e trigger não suportado) abortam a transação e não deixam `homolog` criado. O caso de operador customizado teve seu próprio RED/GREEN: expôs uma dependência indireta que passou a ser recusada. Esses testes não usam o Supabase remoto.

A prova de não contaminação compara SHA-256 do conteúdo completo das 17 tabelas operacionais de `public`, `public.user_roles` e `auth.users` antes/depois, inclusive após FK cruzada, escritas, limpeza e retry em `homolog`. Não usa apenas contagens. É evidência local reprodutível; aplicação remota, exposição PostgREST e Preview exigem evidências próprias no relatório final.

## Aplicação e reversão

Antes da aplicação, confirmar novamente o projeto e ausência do schema, revisar o arquivo exato/diff, executar o teste PostgreSQL obrigatório e conferir o catálogo atual. Aplicar apenas esta versão pelo mecanismo de history, sem reset nem execução indiscriminada de migrations antigas. O seed deve ser aplicado separadamente, conferindo os destinos qualificados.

Uma falha aborta toda a transação, sem limpeza destrutiva automática. Se a aplicação foi bem-sucedida, não apagar/recriar para repetir: inspecionar history/catálogo e corrigir por nova migração aditiva.

Após uso, preferir reversão de código ou correção aditiva. Remover `homolog` exigiria desabilitar disparos, preservar/exportar registry/resultados, aguardar callbacks em trânsito e revisar a remoção somente dos objetos novos. **Não remover o registry enquanto execuções de produção dependerem dele.** Este pacote não contém rollback que modifique `public` ou `auth`.

Novos objetos exigem revisão de allowlist, dependências, RLS e grants. Permissões de objetos futuros não são presumidas a partir das atuais.

## Aplicação remota de ENV-01

Em 29/10/2026 UTC, o projeto foi reconfirmado como `OleCockpit` / `otljnpasmhkoehmwnjvl`, PostgreSQL 17.6, sem schema homolog preexistente. A migration foi aplicada uma única vez com sucesso e registrada na history sob `20261029032034`. O seed separado foi carregado: sete apólices sintéticas, zero apólices sem marcador, seis contextos, 18 tabelas com RLS, 48 índices (47 operacionais e PK do registry), 15 FKs e nenhuma FK operacional para public.

Os hashes SHA-256 do conteúdo completo e ordenado das 20 tabelas preexistentes de public foram comparados antes/depois da migration e do seed: **20/20 idênticos**. Somente contagens/hashes foram retornados; nenhum dado pessoal foi usado como fixture ou incluído na evidência. Isso é uma evidência pontual, não uma promessa de que jobs normais de produção nunca mudarão essas tabelas posteriormente.

A Data API passou de `graphql_public, public` para `graphql_public, homolog, public`. `private` permaneceu não exposto; search_path `public, extensions`, max_rows 1000, pool automático e a opção global de exposição automática foram preservados. Os grants explícitos da migration foram conferidos após o salvamento: anon sem USAGE, authenticated sem leitura de execution_contexts, service_role sem UPDATE no registry ou TRUNCATE nas tabelas operacionais. A autenticação e autorização via PostgREST/Preview são gates separados da validação SQL.
