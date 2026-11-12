# AUDIT-01 — Contrato Cockpit → n8n, versão 2

Este documento registra a implementação inicial AUDIT-01. A publicação de Preview, correção do callback por ambiente e homologação bloqueada por infraestrutura estão descritas em [AUDIT-01.1](audit-01-1-preview.md); esse registro posterior substitui o estado inicial “sem commit/push” indicado abaixo.

Implementação local de 28/10/2026. Esta fase prepara o pedido de auditoria; não altera o motor n8n, o callback ou os indicadores. Nenhuma auditoria real, deploy, migration ou mutação de dados de produção foi executada para esta entrega.

## Arquivos e responsabilidades

Raiz absoluta: `C:/Users/lucad/Documents/Codex/2026-08-28/cha/work/ole-operations-hub`.

| Caminho completo                                                                                                      | Responsabilidade                                                                                            |
| --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `C:/Users/lucad/Documents/Codex/2026-08-28/cha/work/ole-operations-hub/src/lib/audit/trigger-payload.ts`              | Tipos e schemas Zod, derivação canônica, normalização, deduplicação, diagnóstico e builder puro do payload. |
| `C:/Users/lucad/Documents/Codex/2026-08-28/cha/work/ole-operations-hub/src/lib/audit/exclusions-snapshot.server.ts`   | Leitura server-only das quatro fontes, paginação por cursor e falhas seguras.                               |
| `C:/Users/lucad/Documents/Codex/2026-08-28/cha/work/ole-operations-hub/src/lib/audit-run.server.ts`                   | Preparar, validar, registrar snapshot e enviar pelo mecanismo existente; encerrar falhas.                   |
| `C:/Users/lucad/Documents/Codex/2026-08-28/cha/work/ole-operations-hub/tests/audit-trigger-payload.test.mjs`          | Testes unitários do contrato, status, exceções, precedência e segurança.                                    |
| `C:/Users/lucad/Documents/Codex/2026-08-28/cha/work/ole-operations-hub/tests/audit-exclusions-snapshot.test.mjs`      | Paginação >1.000, limite de servidor reduzido e falha de página posterior.                                  |
| `C:/Users/lucad/Documents/Codex/2026-08-28/cha/work/ole-operations-hub/tests/audit-run.test.mjs`                      | Integração real do dispatcher com os transportes Supabase e webhook simulados.                              |
| `C:/Users/lucad/Documents/Codex/2026-08-28/cha/work/ole-operations-hub/tests/helpers/audit-db.mjs`                    | Transporte HTTP de teste, usando o query builder real do Supabase e banco em memória.                       |
| `C:/Users/lucad/Documents/Codex/2026-08-28/cha/work/ole-operations-hub/package.json`                                  | Incluir os novos testes no quality gate `test:static`.                                                      |
| `C:/Users/lucad/Documents/Codex/2026-08-28/cha/work/ole-operations-hub/docs/superpowers/plans/2026-10-28-audit-01.md` | Plano, decisões e registro RED → GREEN.                                                                     |
| `C:/Users/lucad/Documents/Codex/2026-08-28/cha/work/ole-operations-hub/docs/audit-01-contract.md`                     | Contrato definitivo, limites e instruções da fase seguinte.                                                 |

## Contrato definitivo — exemplo fictício completo

```json
{
  "run_id": "c162ea64-2342-4678-bb83-23d461930fcb",
  "callback_url": "https://cockpit.example/api/public/audit-callback?run_id=c162ea64-2342-4678-bb83-23d461930fcb",
  "trigger": "scheduler",
  "mode": "async_callback",
  "status_geral": "PROCESSANDO",
  "mensagem_geral": "Auditoria em processamento.",
  "resumo": {
    "aprovados": 0,
    "reprovados": 0,
    "total_processado": 0
  },
  "apolices_com_erro": [],
  "at": "2026-10-28T11:00:01.000Z",
  "audit_contract_version": 2,
  "exclusions_snapshot_at": "2026-10-28T11:00:00.000Z",
  "apolices_excluidas": [
    {
      "apolice": "0000000000000000000001000000",
      "status": "CANCELADA",
      "motivo": "Status operacional: CANCELADA"
    },
    {
      "apolice": "0000000000000000000002000000",
      "status": "SUSPENSA",
      "motivo": "Status operacional: SUSPENSA"
    }
  ],
  "excecoes_especificas": [
    {
      "apolice": "0000000000000000000001000000",
      "tipo_erro": "PRÊMIO FORA DO PADRÃO",
      "motivo": "Segurado Jovem"
    },
    {
      "apolice": "0000000000000000000003000000",
      "tipo_erro": "TAXA DE ADMINISTRAÇÃO INCORRETA",
      "motivo": "VENDIDA VIA X5"
    }
  ]
}
```

As listas existem mesmo vazias. Motivo específico ausente é `null`. `trigger` continua `ole-copilot` no botão manual e `scheduler` no agendamento; `origem` da execução continua `manual`/`auto`. O timestamp `at` é o instante da construção final; `exclusions_snapshot_at` é o início da preparação das fontes desta execução. Nenhum CPF, nome, proposta, token, chave administrativa, configuração interna ou diagnóstico entra no pedido HTTP.

## Regras implementadas

1. `policies` fornece a relação de apólices; não se presume uma coluna de status. `endorsements.proposta` é traduzida por `translateProposta()` e agrupada por apólice, com os mesmos campos de motivo utilizados no Analytics. `policy_billing` é deduplicada por `dedupeBillingRecords()` e agrupada.
2. `derivePolicyStatus()` decide o estado. A prioridade canônica permanece: A com resilição → CANCELADA; C com inadimplência → SUSPENSA; em seguida os estados financeiros. Apenas CANCELADA/SUSPENSA entram em `apolices_excluidas`. Endosso C genérico, cobrança cancelada e inadimplência financeira isolada não bastam.
3. O prazo configurável de inadimplência hoje vive em localStorage, por usuário. O servidor usa o default canônico; esse prazo não afeta os dois estados excluídos, pois as regras contratuais precedem as financeiras. Não foi criada outra configuração ou regra de status.
4. Apenas `audit_ignores.scope = apolice_tipo`, com apólice e tipo de erro textuais não vazios, entram em `excecoes_especificas`. Nomes não são recategorizados, desacentuados ou convertidos para maiúsculas. A normalização remove apenas espaços nas extremidades; espaços internos e acentos são preservados. Motivo disponível é preservado. Entradas inválidas são contabilizadas no diagnóstico.
5. Registros `scope = apolice` são consultados somente para diagnóstico histórico em `audit_runs.raw.exclusions_diagnostics`; não geram tipos fictícios ou exclusão. São preservados apólice, status derivado atual (ou `null` se ausente da carteira) e motivo histórico. O log mostra apenas contagens.
6. Uma entrada por apólice excluída e por par `(apolice, tipo_erro)`. Em conflitos de exceções duplicadas, vence o menor `id` em ordem textual. As listas são ordenadas por apólice e, para exceções, por tipo. Números de apólice permanecem strings com zeros à esquerda. Uma exceção válida permanece no segundo array mesmo quando a apólice também está no primeiro.
7. Todas as fontes usam cursor `id > último_id`, `order(id asc)` e páginas de até 1.000. A leitura termina apenas na página vazia, inclusive se o servidor impuser limite menor. IDs repetidos ou fora de ordem interrompem a preparação. São quatro sequências de páginas em paralelo, sem consulta por apólice.
8. Erro de leitura, validação ou persistência do snapshot impede o webhook. Após criar a execução, o catch tenta registrar `status=error`, `status_geral=ERRO`, mensagem controlada e duração; uma falha transitória no fechamento recebe uma segunda tentativa. Não há envio parcial nem tratamento de falha como lista vazia legítima.
9. A preparação possui limite total de 30 segundos para as consultas, e o POST mantém o timeout original de 30 segundos. Erros HTTP continuam encerrando a execução e o 404 em `/webhook-test/` mantém a orientação `Listen for test event`. Corpos de erro externos e mensagens de rede cruas não são registrados, evitando exposição de segredos.

## Compatibilidade e limites

Todos os nove campos legados do pedido mantêm nomes, tipos e valores iniciais. `resolveWebhookUrl()` e a assinatura pública de `runAuditImpl()` continuam iguais. O botão autenticado e o scheduler continuam chamando essa implementação. O callback, os filtros locais, as resoluções, as exceções de endosso, os indicadores e o workflow n8n permanecem inalterados.

A compatibilidade foi validada nos transportes simulados; o n8n real não foi acionado. Os novos campos são aditivos, mas sua aplicação efetiva exige a próxima fase no n8n. Não se presume que o workflow já os interprete.

O payload e os diagnósticos são persistidos em `audit_runs.raw` antes do envio. O callback atual substitui `raw`: portanto esta fase **não oferece retenção histórica permanente** do snapshot após o callback. Uma falha antes do envio preserva o snapshot quando ele já foi gravado. Não foram adicionadas colunas ou migrations para alterar esse comportamento.

As consultas paginadas não formam uma transação Postgres única. O snapshot materializa uma vez os dados retornados durante a preparação; alterações concorrentes entre páginas/tabelas não têm isolamento transacional. Não se faz nova consulta durante a serialização ou envio.

Se o banco permanecer indisponível também nas duas tentativas de fechamento, nenhuma aplicação consegue garantir a gravação de `error`. O dispatcher informa explicitamente essa falha secundária, registra somente `run_id` e diagnóstico seguro, e não envia o webhook. Uma garantia de recuperação após indisponibilidade total/crash exige reconciliação durável, fora desta fase.

## Testes e gate

Os testes do builder e do loader foram escritos e executados em RED (módulos ausentes). Os 15 testes iniciais de integração falharam contra o dispatcher anterior por ausência do snapshot e da gestão de falhas, inclusive a execução presa em running quando faltava URL de callback. Depois da implementação, passaram em GREEN.

Os testes usam os builders e o dispatcher reais, query builder real do Supabase com transporte em memória e `fetch` do webhook mockado. Os únicos endereços de teste são `.example`; não são carregadas credenciais reais.

Comandos de aceitação e resultados finais:

- `node --test tests/audit-trigger-payload.test.mjs tests/audit-exclusions-snapshot.test.mjs tests/audit-run.test.mjs`
- `npm run test:static`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `git diff --check`

| Validação                      | Resultado                                                              |
| ------------------------------ | ---------------------------------------------------------------------- |
| Novos testes específicos       | 26/26 passaram; os 15 cenários do guia estão cobertos.                 |
| `npm run test:static`          | 120/120 passaram, exit 0.                                              |
| `npm run typecheck`            | Passou, exit 0.                                                        |
| `npm run lint`                 | Passou, exit 0; 0 erros, 25 warnings em arquivos fora desta alteração. |
| `npm run build`                | Passou, exit 0; cliente e SSR gerados.                                 |
| `git diff --check`             | Passou; apenas avisos de conversão LF/CRLF do Git.                     |
| Revisão independente read-only | Nenhum achado bloqueante; confirmou 26/26 testes novos.                |

O primeiro build encontrou bloqueio EPERM do sandbox ao resolver um arquivo do TanStack em `node_modules`. A repetição local autorizada fora do sandbox passou. Permanecem warnings do projeto/dependências: `inputValidator` depreciado, diretivas `use client` ignoradas no SSR e um chunk acima de 500 kB. Não foram feitas refatorações fora do escopo para silenciá-los.

Sugestões menores da revisão para cobertura futura: cursor repetido/fora de ordem, rejeição do transporte de consulta e recuperação na segunda tentativa de fechamento. Os caminhos estão implementados; a revisão não identificou defeito demonstrável nesses casos.

### Gate de aceitação

- [x] Status operacional calculado com a função canônica.
- [x] CANCELADA/SUSPENSA incluídas; estados financeiros não excluídos.
- [x] Exceções específicas consultadas dinamicamente do Supabase.
- [x] Grupos independentes, tipados e validados em runtime.
- [x] Arrays deduplicados e ordenados; zeros e tipos canônicos preservados.
- [x] Campos originais e mecanismo de disparo preservados.
- [x] Manual, scheduler e modos configurado/produção/teste cobertos.
- [x] Falhas de consulta impedem envio incompleto.
- [x] Falhas de preparação encerram a execução como error quando o banco permite escrita; indisponibilidade total é reportada explicitamente.
- [x] Todos os cenários obrigatórios cobertos e todos os testes passaram.
- [x] Typecheck, lint e build passaram, com os warnings descritos acima.
- [x] Nenhum serviço ou registro de produção alterado; nenhuma auditoria real, migration ou deploy.
- [x] Exemplo JSON completo documentado e próximas etapas delimitadas.

Entrega na branch local `codex/audit-01-webhook-contract`, sem commit/push. A main permanece no commit `738f312`.

## Próxima fase — instruções para o n8n (não implementada)

1. No webhook, ler `audit_contract_version`, `exclusions_snapshot_at`, `apolices_excluidas` e `excecoes_especificas` do mesmo pedido. Validar versão e arrays antes de buscar detalhes. Para versão 2 malformada, devolver erro pelo callback em vez de assumir arrays vazios. Preservar identificadores como texto. Definir separadamente o comportamento de compatibilidade com chamadas legadas.
2. Construir um Set de apólices excluídas. Ao receber a carteira candidata, deduplicar por apólice, separar as excluídas **antes** das chamadas detalhadas de emissão/auditoria e não processá-las. A exclusão integral prevalece sobre exceções específicas. Não tentar inferir status a partir dos motivos históricos.
3. Construir um Map de `apolice -> Set(tipo_erro)` para as exceções. Comparar o nome canônico exato, com acentos e espaços. Produzir os achados pelas regras atuais e desconsiderar apenas os tipos dispensados daquela apólice antes de consolidar o resultado. Uma dispensa de prêmio não dispensa vigência, duplicidade, administração ou cobertura. Não converter resoluções em exceções.
4. Consolidar por apólice distinta: `auditadas = candidatas - excluidas`; `reprovadas = auditadas com algum achado não dispensado`; `aprovadas = auditadas - reprovadas`. Garantir `aprovadas + reprovadas = auditadas` e `auditadas + excluidas = candidatas`, considerando somente apólices efetivamente presentes na carteira candidata. Definir tratamento explícito para erro técnico/incompleto; nunca aprovar silenciosamente. Exceções não multiplicam contagens.
5. Em uma mudança coordenada posterior, versionar/estender o callback para informar contagens de excluídas, achados dispensados e o snapshot aplicado, decidir retenção histórica e alinhar os denominadores dos indicadores da Visão Geral e Operação. Só remover/adaptar a pós-filtragem local quando o n8n confirmar o contrato aplicado; usar a versão da execução para impedir dupla filtragem e preservar o histórico legado. Não enviar excluídas como aprovadas nem classificar exceções como incidentes resolvidos.

Nenhuma dessas cinco etapas futuras foi executada nesta entrega.
