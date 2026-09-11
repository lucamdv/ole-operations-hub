import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  GitBranch,
  PackageCheck,
} from "lucide-react";
import { useEndorsementDetail, usePolicy } from "@/hooks/use-policies";
import { useEndorsementBilling } from "@/hooks/use-billing";
import { JsonDocumentPanel } from "@/components/json-explorer";
import {
  BillingBadge,
  CancelamentoCard,
  CobrancaCard,
  CotacaoCard,
  DadosGeraisCard,
  DatasCard,
  DocumentoFact,
  DocumentoHeader,
  EndossoSemDadosAviso,
  fmtDateOnly,
  ItensCoberturas,
  LimiteApoliceCard,
  MotivoEndossoCard,
  PagamentoCard,
  PartesList,
  Section,
} from "@/components/apolice/cards";
import { normalizeEndossoNum, parseDocumento, translateProposta } from "@/lib/excelsior/translate";

export const Route = createFileRoute("/_authenticated/apolices/$id/endossos/$num")({
  head: ({ params }) => ({
    meta: [
      { title: `Endosso ${params.num} · ${params.id} · OLÉ COPILOT` },
      { name: "description", content: `Detalhe do endosso ${params.num}.` },
    ],
  }),
  component: EndossoDetail,
});

function EndossoDetail() {
  const { id, num } = Route.useParams();
  const { data: endo, isLoading } = useEndorsementDetail(id, num);
  const { data: policy } = usePolicy(id);
  const { record: cobranca } = useEndorsementBilling(id, num);

  if (isLoading) {
    return <div className="page-subtitle">Carregando endosso…</div>;
  }

  if (!endo) {
    return (
      <div className="space-y-4">
        <Link
          to="/apolices/$id"
          params={{ id }}
          className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Voltar à apólice
        </Link>
        <div className="panel p-12 text-center page-subtitle">Endosso não encontrado.</div>
      </div>
    );
  }

  const t = translateProposta(endo.proposta);
  const numeroDoc =
    t.numeroDocumento ?? endo.numero_apolice.slice(0, -6) + normalizeEndossoNum(num);
  const documento = parseDocumento(numeroDoc, t.tipoEndosso);
  const seguradoNome = t.partes.find((parte) => parte.papel === "SEGURADO")?.nome ?? null;
  const isCancelamento = t.tipoEndosso === "B" || t.tipoEndosso === "C";
  const produto =
    t.dadosGerais.idProdutoOrigem ?? t.dadosGerais.idProduto ?? t.dadosGerais.tipoApolice;
  const totalCoberturas = t.itens.reduce((total, item) => total + item.coberturas.length, 0);
  const siblings = policy?.endorsements ?? [];
  const currentIndex = siblings.findIndex(
    (item) => normalizeEndossoNum(item.numero_endosso) === normalizeEndossoNum(num),
  );
  const previous = currentIndex > 0 ? siblings[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < siblings.length - 1 ? siblings[currentIndex + 1] : null;

  return (
    <div className="space-y-9 pb-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav
          aria-label="Navegação do documento"
          className="flex flex-wrap items-center gap-1.5 text-[12px] text-muted-foreground"
        >
          <Link to="/apolices" className="transition hover:text-foreground">
            Apólices
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            to="/apolices/$id"
            params={{ id }}
            className="font-mono transition hover:text-foreground"
          >
            {id}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-mono font-medium text-foreground">
            Endosso {documento.sequencial}
          </span>
        </nav>

        <div className="flex items-center gap-2">
          {previous ? (
            <Link
              to="/apolices/$id/endossos/$num"
              params={{ id, num: previous.numero_endosso }}
              aria-label={`Abrir endosso anterior, ${normalizeEndossoNum(previous.numero_endosso)}`}
              className="inline-flex h-8 items-center gap-1 rounded-lg border border-border bg-surface px-2.5 text-[11.5px] font-medium text-muted-foreground transition hover:border-primary/30 hover:text-foreground"
            >
              <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" /> Anterior
            </Link>
          ) : null}
          {next ? (
            <Link
              to="/apolices/$id/endossos/$num"
              params={{ id, num: next.numero_endosso }}
              aria-label={`Abrir próximo endosso, ${normalizeEndossoNum(next.numero_endosso)}`}
              className="inline-flex h-8 items-center gap-1 rounded-lg border border-border bg-surface px-2.5 text-[11.5px] font-medium text-muted-foreground transition hover:border-primary/30 hover:text-foreground"
            >
              Próximo <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </div>

      <DocumentoHeader
        documento={documento}
        premioValor={isCancelamento ? undefined : endo.premio_liquido}
        premioMoeda={endo.premio_moeda}
        seguradoNome={seguradoNome}
        badge={
          cobranca ? (
            <BillingBadge
              statusPagamento={cobranca.status_pagamento}
              situacaoEmissao={cobranca.situacao_emissao}
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
              icon={FileCheck2}
              label="Proposta"
              value={t.dadosGerais.numeroPropostaSeguradora ?? cobranca?.numero_proposta ?? "—"}
              mono
            />
            <DocumentoFact
              icon={GitBranch}
              label="Posição no histórico"
              value={
                currentIndex >= 0
                  ? `${currentIndex + 1} de ${siblings.length}`
                  : documento.sequencial
              }
              hint={`${totalCoberturas} cobertura${totalCoberturas === 1 ? "" : "s"}`}
            />
          </div>
        }
      />

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.75fr)]">
        <Section
          id="composicao"
          title="Composição das parcelas"
          subtitle="Detalhamento dos valores que formam o prêmio deste endosso."
        >
          <PagamentoCard pagamento={t.pagamento} />
        </Section>
        <Section
          id="cobranca"
          title="Situação financeira"
          subtitle="Status operacional da cobrança vinculada a este endosso."
        >
          <CobrancaCard record={cobranca} />
        </Section>
      </div>

      {t.motivoEndosso ? (
        <Section
          title="Motivo do endosso"
          subtitle="Justificativa registrada pela seguradora para a emissão deste documento."
        >
          <MotivoEndossoCard motivo={t.motivoEndosso} />
        </Section>
      ) : null}

      {t.isWrapperVazio ? <EndossoSemDadosAviso numeroApolice={documento.numeroApolice} /> : null}

      {isCancelamento && t.cancelamento ? (
        <Section
          title={t.tipoEndosso === "C" ? "Cancelamento" : "Alteração"}
          subtitle={
            t.tipoEndosso === "C"
              ? "Documento e condições afetados pelo cancelamento."
              : "Documento e condições afetados por esta alteração."
          }
        >
          <CancelamentoCard cancelamento={t.cancelamento} tipoEndosso={t.tipoEndosso} />
        </Section>
      ) : null}

      <div className="grid items-start gap-6 xl:grid-cols-2">
        <Section title="Identificação do endosso" subtitle="Origem, produto e dados de subscrição.">
          <DadosGeraisCard dados={t.dadosGerais} />
        </Section>
        <Section title="Vigência e emissão" subtitle="Datas contratuais e marcos deste documento.">
          <DatasCard datas={t.datas} />
        </Section>
      </div>

      {!t.isWrapperVazio && t.limiteApolice ? (
        <Section title="Limite e cotação" subtitle="Referências financeiras do endosso.">
          <div className="grid items-start gap-4 xl:grid-cols-2">
            <LimiteApoliceCard limite={t.limiteApolice} />
            <CotacaoCard cotacoes={t.cotacoes} />
          </div>
        </Section>
      ) : null}

      {!t.isWrapperVazio && t.itens.length > 0 ? (
        <Section
          title="Itens e coberturas"
          subtitle={`${t.itens.length} item${t.itens.length === 1 ? "" : "s"} · ${totalCoberturas} cobertura${totalCoberturas === 1 ? "" : "s"}`}
        >
          <ItensCoberturas itens={t.itens} />
        </Section>
      ) : null}

      {!t.isWrapperVazio && t.partes.length > 0 ? (
        <Section
          title="Partes relacionadas"
          subtitle={`${t.partes.length} participante${t.partes.length === 1 ? "" : "s"} neste documento.`}
        >
          <PartesList partes={t.partes} />
        </Section>
      ) : null}

      <JsonDocumentPanel
        data={endo.proposta}
        fileName={`apolice-${id}-endosso-${normalizeEndossoNum(num)}.json`}
        documentLabel="endosso"
      />
    </div>
  );
}
