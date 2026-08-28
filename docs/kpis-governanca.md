# KPIs de governança operacional

Os painéis de Operação e Analytics usam somente os indicadores aprovados para as cadências diária,
semanal, mensal e anual.

## Regras de cálculo

- **Inconsistências novas no dia:** ocorrências `apólice + tipo de erro + endosso` que aparecem pela
  primeira vez no dia civil de Fortaleza. A média móvel considera os cinco dias de auditoria
  anteriores.
- **Críticas em aberto:** ocorrências de nível `ERRO` ainda presentes na auditoria mais recente,
  sem exceções cadastradas.
- **Primeira resposta crítica:** média das horas úteis entre o início do episódio e o primeiro
  webhook de correção aceito pelo n8n naquele dia.
- **Reincidência semanal:** ocorrências já vistas em uma execução anterior divididas pelo total de
  ocorrências das execuções dos últimos sete dias.
- **Resolvidas dentro do SLA:** resoluções confirmadas nos últimos sete dias cujo intervalo entre a
  primeira detecção e a resolução ficou dentro do prazo configurado.
- **Contratos inadimplentes:** apólices ativas com ao menos uma cobrança vencida e ainda não quitada.
  A tendência compara o mesmo cálculo com a fotografia de sete dias atrás.
- **Reincidência mensal:** consolidação mensal da regra semanal, acompanhada por média móvel de três
  meses e alerta quando essa média sobe.
- **Crescimento anual:** variação YTD contra o mesmo corte do ano anterior, tanto em contratos
  emitidos quanto em prêmio emitido.
- **Redução anual de críticos:** queda dos incidentes críticos distintos no YTD contra o mesmo corte
  do ano anterior.

## Horas úteis e metas

Horas úteis consideram segunda a sexta, das 09h às 18h, no horário de Fortaleza, sem calendário de
feriados. O SLA de resolução começa em 24 horas úteis e pode ser alterado em **Configurações → Metas
de KPI**. A primeira resposta crítica tem meta inicial inferior a 4 horas úteis; reincidência
semanal alerta acima de 15%; resoluções dentro do SLA têm meta superior a 90%.

O clique em `SOLUCIONAR` registra uma primeira resposta somente após o webhook responder com status
HTTP de sucesso. Esse registro não resolve nem oculta a ocorrência: a conclusão continua dependendo
da ausência do erro na auditoria seguinte. Chamadas feitas com o webhook de testes ficam registradas
para rastreabilidade, mas não entram nas KPIs operacionais.
