# AUDIT-02.6 — Cancelamento cooperativo da auditoria (workflow de teste)

## Objetivo

O Cockpit marca a execução como `cancelled` imediatamente quando o operador cancela ou inicia outra auditoria. O callback de uma execução cancelada não é aceito.

**O cancelamento do banco não encerra automaticamente o processamento que já começou no n8n.** Esta etapa acrescenta um ponto de verificação **antes de cada consulta de endosso**, permitindo parar a execução n8n entre apólices. Uma apólice já em processamento poderá concluir.

## Instalação na CÓPIA de teste (não no workflow ativo)

Na saída `loop` do node `Loop de apólice`, substitua a conexão direta `Pega o ult endosso` por:

```
Loop de apólice (loop)
  ↓
Verificar execução ativa (HTTP Request - GET)
  ↓
Execução ainda ativa? (IF)
  ├─ true  → Pega o ult endosso → (...) → Loop de apólice
  └─ false → sem conexão (para o processamento; não chama o callback)
```

A saída `done` do Loop e a cadeia do relatório permanecem como estão.

### Node HTTP Request: Verificar execução ativa

- Method: `GET`
- URL (Expression):

```js
={{ $('Validar Contrato AUDIT-02').first().json._audit_request.callback_url.replace('/api/public/audit-callback?', '/api/public/audit-control?') + '&apolice=' + $json.numero_apolice }}
```

- Envie `x-callback-secret` com **o mesmo segredo** já utilizado no node de callback existente.
- Se o callback atual envia `x-vercel-protection-bypass`, mantenha também esse header na consulta de controle (mesmo valor, sem expor o segredo).
- Não inclua credenciais no repositório nem na documentação.
- Mantenha `Continue On Fail` **desligado**, para falhar fechado se o controle ficar indisponível.
- O endpoint retorna `{ "continue": true|false, "numero_apolice": "...", "status": "..." }`.
- Ao devolver `numero_apolice`, ele preserva o campo exigido pela URL do node `Pega o ult endosso`.

### Node IF: Execução ainda ativa?

- Condição booleana `={{ $json.continue === true }}` igual a `true`.
- Saída verdadeira → `Pega o ult endosso`.
- Saída falsa → **sem conexão**, pois a execução foi cancelada ou expirou.
- Não conecte a saída falsa à montagem do relatório: uma execução cancelada não deve se tornar uma auditoria parcialmente ou totalmente concluída.

## Validação segura

1. Apenas no Preview `codex/env-homolog-routing`.
2. Confirme `AUDIT_TEST_CONTRACT_VERSION=3`, modo Teste e cópia n8n isolada.
3. Teste uma auditoria normal com controle respondendo `continue: true`.
4. Inicie outra e pressione `Cancelar` ou `Reiniciar Auditoria` ainda durante o Loop. A próxima passagem pelo HTTP Request deve retornar `continue: false` para a execução anterior.
5. Confira `homolog.audit_runs.status = 'cancelled'` para a antiga e que callbacks tardios não alteram findings ou resolutions.
6. O cancelamento não mata uma requisição de endosso já iniciada; o limite de interrupção cooperativa é **entre apólices**.
7. Nunca ative a alteração no workflow produtivo sem nova homologação e autorização.

## Segurança e disponibilidade

A rota `GET /api/public/audit-control` exige segredo do callback, UUID válido e contexto da execução registrado. Só lê/escreve o schema operacional associado ao `run_id`; Preview não recebe permissão de escrita em `public`.

Também faz expirar runs `running` com mais de 15 minutos, caso o controle seja consultado pelo n8n mesmo sem navegador aberto. Falha de consulta interrompe o workflow de forma conservadora.
