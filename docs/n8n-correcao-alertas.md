# Webhook n8n — correção de alertas

O botão **SOLUCIONAR** envia uma única requisição `POST` para o secret server-side
`N8N_CORRECTION_WEBHOOK_URL`. O corpo agrupa as ocorrências selecionadas por apólice.

O endpoint pode responder sem corpo (`200`, `202` ou `204`). O Cockpit considera apenas o status
HTTP de recebimento; a correção só é concluída quando o mesmo erro não aparece na auditoria
seguinte.

A opção **Modo dos webhooks n8n** em Configurações também se aplica a este fluxo. Em Produção, o
Cockpit usa o caminho `/webhook/` configurado no secret. Em Teste, troca somente o caminho para
`/webhook-test/`, preservando o identificador do webhook; o n8n precisa estar em **Listen for test
event**. Nenhum secret adicional é necessário.

## Exemplo de payload

```json
{
  "evento": "SOLICITAR_CORRECAO_AUDITORIA",
  "versao": 1,
  "origem": "ole-copilot",
  "solicitado_em": "2026-08-28T15:00:00.000Z",
  "solicitado_por": "00000000-0000-0000-0000-000000000000",
  "auditoria": {
    "run_id": "11111111-1111-1111-1111-111111111111"
  },
  "total_apolices": 1,
  "total_ocorrencias": 1,
  "apolices": [
    {
      "numero_apolice": "056902026000213910031062000000",
      "erros": [
        {
          "id_ocorrencia": "22222222-2222-2222-2222-222222222222",
          "tipo_erro": "PROPORÇÃO DE PRÊMIO DIRETO INCORRETA",
          "documento_problematico": {
            "tipo": "endosso",
            "numero": "000003"
          },
          "relatorio_problema": {
            "descricao": "No endosso 000003, o Prêmio Direto (USD 10.4600) difere do esperado (USD 13.9468 - 40% do Prêmio Líquido).",
            "campos_incorretos": [
              {
                "campo": "Prêmio Direto",
                "valor_incorreto": "USD 10.4600",
                "valor_correto": "USD 13.9468",
                "regra": "40% do Prêmio Líquido"
              }
            ],
            "vigencia": {
              "data_inicio": null,
              "data_fim": null
            },
            "dados_auditoria": {
              "nivel": "alerta",
              "tipo_erro": "PROPORÇÃO DE PRÊMIO DIRETO INCORRETA",
              "endosso_com_erro": "000003"
            }
          }
        }
      ]
    }
  ]
}
```

Quando a auditoria já fornecer `campos_incorretos`, `campos_errados` ou `incorrect_fields` de
forma estruturada, esses dados têm prioridade. Para os erros atuais de proporção, intermediação,
prêmio fora da faixa e cobertura inativa, o Cockpit também estrutura os valores a partir do texto
do relatório sem descartar o JSON original em `dados_auditoria`.
