# AUDIT-02.3 — Resultados parciais

## Contrato e significado

`status = success` indica processamento técnico concluído. `status_geral = PARCIAL` indica auditoria incompleta, não sucesso pleno nem falha técnica. `status = error`/erro no envelope continua sendo falha técnica, mesmo quando existe um payload interno.

O callback preserva em `audit_runs.raw` os campos opcionais `resumo.total_candidatas`, `total_excluidas`, `total_ignoradas`, `achados_dispensados`, `apolices_ignoradas`, `audit_contract_version` e `exclusions_snapshot_at`. Contagens são inteiros não negativos e seguros; strings numéricas legadas continuam aceitas. A lista de ignoradas mantém apólices como strings, seus zeros iniciais e motivos; duplicatas e sobreposição com reprovadas são recusadas.

Quando informados, os totais devem satisfazer:

- `aprovados + reprovados = total_processado`.
- `total_processado + total_ignoradas + total_excluidas = total_candidatas`.
- Lista de ignoradas e contagem declarada devem coincidir.
- Ignoradas exigem `PARCIAL` e nunca são convertidas em aprovadas.

As novas propriedades permanecem opcionais para compatibilidade com callbacks legados. Dados ausentes são apresentados como não informados, nunca estimados pela quantidade de findings.

No contrato v2, a quantidade de apólices distintas com erros deve corresponder a `reprovados`; apólices duplicadas ou entradas reprovadas sem erros são recusadas. Exemplos resumidos com `reprovados = 8` precisam incluir as oito apólices na mensagem efetiva. Cobertura opcional com candidatas não contabilizadas é preservada como PARCIAL, sem inferir quantas foram ignoradas e sem autorizar resolução por ausência.

## Persistência e resoluções

O callback continua autenticado e vinculado ao registry imutável. Não há nova decisão de schema: Preview e Production+Teste mantêm suas escritas em homolog. O acesso SELECT-only às quatro fontes públicas da AUDIT-02.2 não foi alterado.

Findings das apólices reprovadas são persistidos independentemente de existirem ignoradas. Uma parcial não executa resolução automática por ausência. Achados presentes continuam participando da reabertura. Uma execução completa posterior procura uma execução completa anterior válida, em páginas estáveis, ignorando parciais e resultados inconsistentes. Sem baseline confiável ou com erro de leitura, não se presume correção.

As exclusões e exceções específicas do snapshot original são preservadas durante a atualização de raw e respeitadas na resolução por ausência. Se há exclusões declaradas sem identidades suficientes para comprovar o escopo, as resoluções ficam pendentes.

Callbacks terminais repetidos não duplicam achados nem substituem um resultado final por erro tardio. UUIDs de conteúdo e o conflito na chave primária tornam reenvios idênticos idempotentes, inclusive após falha de publicação. A transição de execução é condicional. Isso não transforma múltiplas chamadas REST em uma transação distribuída; não há promessa de atomicidade global entre banco, n8n e ações posteriores.

Reabertura obrigatória ocorre antes da publicação terminal. Se sua consulta ou escrita falhar, o callback devolve HTTP 500, mantém os achados e a execução retryable; o remetente precisa reenviar o mesmo callback. Não se confirma sucesso escondendo um finding atrás de uma resolução antiga. Resta uma janela de crash após publicação e antes das resoluções automáticas por ausência, que são conservadoras/best-effort; replay terminal não repete esses efeitos. Execuções distintas concorrentes e payloads conflitantes para um mesmo run não possuem garantia transacional global. O ajuste não adiciona migrations/filas para resolver essas limitações preexistentes.

## Apresentação

Visão Geral, Operação e diálogo de achados exibem aviso persistente de conclusão parcial com auditadas, candidatas, excluídas, ignoradas e motivos disponíveis. O aviso não depende da personalização dos cards. A conformidade fica pendente em auditoria parcial; as ignoradas não elevam aprovação. Histórico distingue PARCIAL e as três novas contagens. O gráfico de conformidade da Operação usa somente execuções completas, identificado no título. O toast usa aviso e a contagem declarada de ignoradas. O status global não fica operacional em razão de aprovação parcial.

Relatório copiado e PDF mantêm o aviso de incompletude; exportação não publica taxa de conformidade plena para uma parcial. Os botões existentes e demais fluxos permanecem disponíveis.

## Testes e publicação

Casos executáveis: `tests/audit-partial-payload.test.mjs`, `tests/audit-partial-results.test.mjs`, `tests/audit-partial-readers.test.mjs`, `tests/audit-result-summary.test.mjs`, `tests/audit-partial-ui.test.mjs`. O harness usa handlers e Supabase builder reais, substituindo apenas o transporte HTTP e as fronteiras TanStack/Auth de invocação direta. Não representa autenticação de usuário ou uma execução real no n8n.

Executar `npm run test:static` com PostgreSQL descartável obrigatório, `npm run typecheck`, `npm run lint`, `npm run build` e `git diff --check`.

Somente a branch existente `codex/env-homolog-routing` deve receber commit/push. Alias preservado: https://olexcockpit-git-codex-env-homolo-3ffb4d-luca-monteiros-projects.vercel.app . Nenhum merge na main, deploy produtivo, migration, mudança de secrets, n8n ativo ou SSO/Protection Bypass faz parte desta entrega.

## Gate externo ainda pendente

A AUDIT-02.2 identificou `401 Protected deployment` no callback externo do Preview. Este ajuste não altera essa proteção nem ativa o callback do workflow. Homologação ponta a ponta só poderá ser declarada após callback verdadeiro, conferência do resultado parcial e verificação do isolamento real do banco. Build READY, sessão no Cockpit e testes com transporte simulado não substituem esse gate. SHA, deployment, comandos e evidências finais constam no relatório de entrega.
