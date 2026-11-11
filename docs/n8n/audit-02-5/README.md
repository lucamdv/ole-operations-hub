# AUDIT-02.5 no workflow n8n de teste

Use o workflow isolado de teste. Se o endereço `/webhook-test/` usado pelo Preview ainda apontar para o workflow ativo, confirme o roteamento para uma cópia isolada antes de ativar o v3.

## Instalação manual

Substitua todo o conteúdo JavaScript de cada Code node pelo arquivo correspondente. Use **Run Once for All Items** nos quatro nodes e preserve os nomes, pois os scripts usam referências pelo nome.

| Node                                  | Código a colar                                         |
| ------------------------------------- | ------------------------------------------------------ |
| `Validar Contrato AUDIT-02`           | [validar-contrato.js.txt](validar-contrato.js.txt)     |
| `Filtrar Carteira AUDIT-02`           | [filtrar-carteira.js.txt](filtrar-carteira.js.txt)     |
| `Montagem do Relatório1`              | [montagem-relatorio.js.txt](montagem-relatorio.js.txt) |
| `Callback contrato inválido AUDIT-02` | [callback-invalido.js.txt](callback-invalido.js.txt)   |

Confira as conexões do export AUDIT-02 v2 no workflow de teste.

- `Webhook` → `Validar Contrato AUDIT-02` → `Contrato v2 válido?`. O IF verifica `{{ $json._audit_contract_ok }}` como booleano. A saída verdadeira segue para `Autenticação - Prod` e `PUXA APÓLICES`. A falsa segue para `Callback contrato inválido AUDIT-02` e `HTTP Request`.
- `PUXA APÓLICES` → `Filtrar Carteira AUDIT-02` → `Carteira auditável?`. Habilite **Settings → Always Output Data** em `PUXA APÓLICES` na cópia de teste para que uma resposta bem-sucedida sem itens alcance o filtro. O IF verifica `{{ $json._audit_empty !== true }}` como booleano. A saída verdadeira segue para `Loop de apólice`. A falsa segue direto para `Montagem do Relatório1`.
- Use lote de tamanho `1` em `Loop de apólice`. A saída `loop` segue para `Pega o ult endosso` e a cadeia existente de endossos e auditoria. A saída `done` segue para `Montagem do Relatório1` → `HTTP Request`.
- `HTTP Request` envia o envelope JSON por POST para `{{ $('Validar Contrato AUDIT-02').first().json._audit_request.callback_url }}`. Preserve os parâmetros existentes de autenticação e credenciais.

## Ativação e verificação

1. Publique o Cockpit no Preview com a emissão de v2 padrão. A versão antiga do validador recusa v3 antes de consultar a Excelsior.
2. Aplique os quatro scripts juntos à cópia de teste. Valide com fixtures locais usando `node --test tests/audit-25-n8n.test.mjs`. Confirme a ligação com o webhook de teste e o destino de callback no alias estável do Preview.
3. Depois da verificação, ative `AUDIT_TEST_CONTRACT_VERSION=3` apenas para o Preview da branch de homologação e gere um novo deployment de Preview. A aplicação só emite v3 em Preview, no schema `homolog`, em modo `test` e com o alias estável. Para voltar a emitir v2, retire a configuração e gere outro deployment de Preview. Os scripts aceitam as duas versões durante a transição.
4. Execute o teste E2E com a carteira real somente após autorização. Compare os identificadores das candidatas com o snapshot da execução e confira que as dispensadas ficam fora da cadeia iniciada por `Pega o ult endosso`.

O callback v3 retorna os identificadores únicos em `apolices_candidatas`, o timestamp original do snapshot e `resumo.total_dispensadas`. O Cockpit preserva as justificativas do snapshot persistido. Uma apólice excluída por status tem precedência sobre a dispensa. `IGNORADO` preserva o resultado parcial e os demais achados. Resposta malformada da carteira ou resultado ausente ou duplicado do motor gera erro técnico. Sem apólices auditáveis, o relatório devolve zero processadas, aprovadas e reprovadas.
