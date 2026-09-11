import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarRange,
  ChevronRight,
  Clock3,
  FileText,
  GitBranch,
  PackageCheck,
} from "lucide-react";
import { usePolicy } from "@/hooks/use-policies";
import { usePolicyBilling } from "@/hooks/use-billing";
import { formatDateTime, relativeTime } from "@/lib/format";
import { JsonDocumentPanel } from "@/components/json-explorer";
import {
  BillingBadge,
  CobrancaCard,
  CobrancasList,
  CotacaoCard,
  DadosGeraisCard,
  DatasCard,
  DocumentoFact,
  DocumentoHeader,
  EndossoBadge,
  fmtDateOnly,
  fmtNum,
  ItensCoberturas,
  LimiteApoliceCard,
  PagamentoCard,
  PartesList,
  Section,
} from "@/components/apolice/cards";
import {
  normalizeEndossoNum,
  parseDocumento,
  translateProposta,
  unwrapProposta,
} from "@/lib/excelsior/translate";

export const Route = createFileRoute("/_authenticated/apolices/$id/")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.id} · Apólice · OLÉ COPILOT` },
      { name: "description", content: `Detalhe da apólice ${params.id}.` },
    ],
  }),
  component: ApoliceDetail,
});

function ApoliceDetail() {
  const { id } = Route.useParams();
  const { data: policy, isLoading } = usePolicy(id);
  const { rows: cobrancas, vigente: cobrancaVigente } = usePolicyBilling(id);

  if (isLoading) {
    return <div className="page-subtitle">Carregando apólice…</div>;
  }

  if (!policy) {
    return (
      <div className="space-y-4">
        <Link
          to="/apolices"
          className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Voltar à carteira
        </Link>
        <div className="panel p-12 text-center">
          <FileText className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
          <div className="text-[13px] font-medium">Apólice não encontrada</div>
          <div className="mt-1 text-[11.5px] text-muted-foreground">
            Esta apólice não está na carteira sincronizada.
          </div>
        </div>
      </div>
    );
  }

  const t = translateProposta(policy.proposta ?? {});
  const documento = parseDocumento(policy.numero_apolice, t.tipoEndosso);
  const seguradoNome = t.partes.find((parte) => parte.papel === "SEGURADO")?.nome ?? null;
  const produto =
    t.dadosGerais.idProdutoOrigem ?? t.dadosGerais.idProduto ?? t.dadosGerais.tipoApolice;
  const updatedAt = policy.last_sync_at ?? policy.updated_at;
  const totalCoberturas = t.itens.reduce((total, item) => total + item.coberturas.length, 0);

  return (
    <div className="space-y-9 pb-10">
      <Link
        to="/apolices"
        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Voltar à carteira
      </Link>

      <DocumentoHeader
        documento={documento}
        premioValor={policy.premio_liquido}
        premioMoeda={policy.premio_moeda}
        seguradoNome={seguradoNome}
        badge={
          cobrancaVigente ? (
            <BillingBadge
              statusPagamento={cobrancaVigente.status_pagamento}
              situacaoEmissao={cobrancaVigente.situacao_emissao}
            />
          ) : null
        }
        extra={
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <DocumentoFact
              icon={CalendarRange}
              label="Vigência"
              value={`${fmtDateOnly(t.datas.inicioVigencia)} → ${fmtDateOnly(t.datas.fimVigencia)}`}
            />
            <DocumentoFact
              icon={PackageCheck}
              label="Produto"
              value={produto ?? "Não informado"}
              mono
            />
            <DocumentoFact
              icon={GitBranch}
              label="Histórico"
              value={`${policy.endorsements.length} documento${policy.endorsements.length === 1 ? "" : "s"}`}
              hint={`${totalCoberturas} cobertura${totalCoberturas === 1 ? "" : "s"}`}
            />
            <DocumentoFact
              icon={Clock3}
              label="Última sincronização"
              value={relativeTime(updatedAt)}
              hint={formatDateTime(updatedAt)}
            />
          </div>
        }
      />

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.75fr)]">
        <Section
          id="composicao"
          title="Composição das parcelas"
          subtitle="Valores, vencimentos e cada componente que forma o prêmio deste documento."
        >
          <PagamentoCard pagamento={t.pagamento} />
        </Section>
        <Section
          id="cobranca"
          title="Situação financeira"
          subtitle="A parcela operacional mais recente registrada pela cobrança."
        >
          <CobrancaCard record={cobrancaVigente} titulo="Cobrança vigente" />
        </Section>
      </div>

      {cobrancas.length > 0 ? (
        <Section
          title="Histórico financeiro"
          subtitle={`${cobrancas.length} registro${cobrancas.length === 1 ? "" : "s"} de cobrança na apólice.`}
        >
          <CobrancasList rows={cobrancas} />
        </Section>
      ) : null}

      <div className="grid items-start gap-6 xl:grid-cols-2">
        <Section title="Identificação da apólice" subtitle="Origem, produto e dados de subscrição.">
          <DadosGeraisCard dados={t.dadosGerais} />
        </Section>
        <Section title="Vigência e emissão" subtitle="Datas contratuais e marcos do processo.">
          <DatasCard datas={t.datas} />
        </Section>
      </div>

      <Section
        id="endossos"
        title="Histórico de documentos"
        subtitle="Emissão original e endossos em ordem cronológica."
      >
        <div className="panel-elevated overflow-hidden">
          {policy.endorsements.length === 0 ? (
            <div className="px-5 py-10 text-center text-[12px] text-muted-foreground">
              Apólice sem endossos adicionais.
            </div>
          ) : (
            <div className="divide-y divide-border/65">
              {policy.endorsements.map((endorsement) => {
                const sequence = normalizeEndossoNum(endorsement.numero_endosso);
                const isPolicy = sequence === "000000";
                const { tipoEndosso } = unwrapProposta(endorsement.proposta);
                return (
                  <Link
                    key={endorsement.id}
                    to="/apolices/$id/endossos/$num"
                    params={{ id: policy.numero_apolice, num: endorsement.numero_endosso }}
                    className="group grid gap-3 px-4 py-4 transition hover:bg-surface-2/55 sm:grid-cols-[44px_minmax(0,1fr)_auto] sm:items-center sm:px-5"
                  >
                    <div className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background font-mono text-[12px] font-semibold text-muted-foreground">
                      {String(endorsement.ordem).padStart(2, "0")}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <EndossoBadge
                          tipo={isPolicy ? "APOLICE" : "ENDOSSO"}
                          tipoEndosso={tipoEndosso}
                          size="sm"
                        />
                        <span className="font-mono text-[13px] font-semibold text-foreground">
                          {sequence}
                        </span>
                      </div>
                      <div className="mt-1 text-[11.5px] text-muted-foreground">
                        {isPolicy ? "Emissão original" : `Endosso sequencial ${sequence}`}
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <div className="text-left sm:text-right">
                        <div className="text-[9.5px] font-medium uppercase tracking-[0.11em] text-muted-foreground">
                          Prêmio
                        </div>
                        <div className="mt-1 font-mono text-[13px] font-semibold text-foreground">
                          {fmtNum(endorsement.premio_liquido, endorsement.premio_moeda)}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </Section>

      {t.limiteApolice ? (
        <Section title="Limite e cotação" subtitle="Referências financeiras da apólice.">
          <div className="grid items-start gap-4 xl:grid-cols-2">
            <LimiteApoliceCard limite={t.limiteApolice} />
            <CotacaoCard cotacoes={t.cotacoes} />
          </div>
        </Section>
      ) : null}

      <Section
        title="Itens e coberturas"
        subtitle={`${t.itens.length} item${t.itens.length === 1 ? "" : "s"} · ${totalCoberturas} cobertura${totalCoberturas === 1 ? "" : "s"}`}
      >
        <ItensCoberturas itens={t.itens} />
      </Section>

      <Section
        title="Partes relacionadas"
        subtitle={`${t.partes.length} participante${t.partes.length === 1 ? "" : "s"} no documento.`}
      >
        <PartesList partes={t.partes} />
      </Section>

      <JsonDocumentPanel
        data={policy.proposta}
        fileName={`apolice-${policy.numero_apolice}.json`}
        documentLabel="documento da apólice"
      />
    </div>
  );
}
