import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  CreditCard,
  FileCheck2,
  ReceiptText,
  UserRound,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { NATUREZA_PREMIO_LABEL, TIPO_PESSOA_LABEL } from "@/lib/excelsior/codes";
import {
  billingInstallmentLabel,
  billingTagInfo,
  normalizeBillingEndosso,
  type BillingRecord,
  type BillingTag,
} from "@/lib/billing/status";
import {
  BillingFilters,
  matchSituacao,
  type SituacaoFilter,
} from "@/components/billing/billing-filters";

import type {
  CancelamentoInfo,
  CoberturaInfo,
  CotacaoInfo,
  DadosGerais,
  DatasInfo,
  DocumentoInfo,
  ItemInfo,
  LimiteApoliceInfo,
  MotivoEndossoInfo,
  PagamentoInfo,
  ParteInfo,
  TipoEndosso,
} from "@/lib/excelsior/translate";

// ============ Utilitários visuais ============
function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  try {
    return formatDateTime(iso);
  } catch {
    return iso;
  }
}
export function fmtNum(n: number | null | undefined, moeda = "BRL"): string {
  if (n === null || n === undefined) return "—";
  const opts: Intl.NumberFormatOptions = {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  };
  try {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: moeda,
      ...opts,
    }).format(n);
  } catch {
    return `${moeda} ${n.toLocaleString("pt-BR", opts)}`;
  }
}
function fmtCPFCNPJ(tipo: string, valor: string): string {
  const v = valor.replace(/\D/g, "");
  if (tipo === "CPF" && v.length === 11)
    return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9)}`;
  if (tipo === "CNPJ" && v.length === 14)
    return `${v.slice(0, 2)}.${v.slice(2, 5)}.${v.slice(5, 8)}/${v.slice(8, 12)}-${v.slice(12)}`;
  return valor;
}
function fmtCEP(v: string | null): string | null {
  if (!v) return null;
  const d = v.replace(/\D/g, "");
  if (d.length !== 8) return v;
  return `${d.slice(0, 5)}-${d.slice(5)}`;
}

// ============ Primitivas ============
export function Field({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="min-w-0 space-y-1">
      <div className="text-[10px] font-medium uppercase tracking-[0.11em] text-muted-foreground">
        {label}
      </div>
      <div
        className={cn(
          "break-words text-[13.5px] font-medium leading-snug text-foreground",
          mono && "font-mono text-[12.5px] font-normal tabular-nums",
        )}
      >
        {value === null || value === undefined || value === "" ? (
          <span className="text-muted-foreground">—</span>
        ) : (
          value
        )}
      </div>
    </div>
  );
}

export function Section({
  title,
  subtitle,
  children,
  id,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-4">
      <div className="space-y-1">
        <div className="text-[17px] font-semibold tracking-[-0.015em] text-foreground">{title}</div>
        {subtitle && (
          <div className="max-w-3xl text-[12px] leading-relaxed text-muted-foreground">
            {subtitle}
          </div>
        )}
      </div>
      {children}
    </section>
  );
}

export function DocumentoFact({
  icon: Icon,
  label,
  value,
  hint,
  mono = false,
}: {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-xl border border-border/70 bg-background/55 p-3.5">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/8 text-primary">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </div>
        <div
          className={cn(
            "mt-1 truncate text-[13px] font-semibold text-foreground",
            mono && "font-mono text-[12px] font-medium tabular-nums",
          )}
        >
          {value === null || value === undefined || value === "" ? "—" : value}
        </div>
        {hint ? (
          <div className="mt-0.5 truncate text-[10.5px] text-muted-foreground">{hint}</div>
        ) : null}
      </div>
    </div>
  );
}

// ============ Badge de tipo de documento ============
export function badgeStylesFor(
  tipo: "APOLICE" | "ENDOSSO",
  tipoEndosso: TipoEndosso | null,
): { label: string; className: string } {
  if (tipo === "APOLICE") {
    return {
      label: "APÓLICE",
      className: "bg-primary/10 text-primary border-primary/30",
    };
  }
  switch (tipoEndosso) {
    case "A":
      return {
        label: "ENDOSSO A",
        className: "bg-warning/10 text-warning border-warning/30",
      };
    case "B":
      return {
        label: "ENDOSSO B",
        className: "bg-accent/15 text-accent-foreground border-accent/40",
      };
    case "C":
      return {
        label: "ENDOSSO C",
        className: "bg-destructive/10 text-destructive border-destructive/30",
      };
    default:
      return {
        label: "ENDOSSO",
        className: "bg-muted text-muted-foreground border-border",
      };
  }
}

export function EndossoBadge({
  tipo,
  tipoEndosso,
  sequencial,
  size = "md",
}: {
  tipo: "APOLICE" | "ENDOSSO";
  tipoEndosso: TipoEndosso | null;
  sequencial?: string;
  size?: "sm" | "md";
}) {
  const { label, className } = badgeStylesFor(tipo, tipoEndosso);
  const sizeCls = size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-[10.5px]";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md font-mono font-semibold border whitespace-nowrap",
        sizeCls,
        className,
      )}
    >
      {label}
      {sequencial && tipo === "ENDOSSO" && <span className="ml-1 opacity-70">· {sequencial}</span>}
    </span>
  );
}

export function DocumentoHeader({
  documento,
  premioValor,
  premioMoeda,
  seguradoNome,
  badge,
  extra,
}: {
  documento: DocumentoInfo;
  premioValor?: number | null;
  premioMoeda?: string;
  seguradoNome?: string | null;
  badge?: ReactNode;
  extra?: ReactNode;
}) {
  const isApolice = documento.tipo === "APOLICE";
  return (
    <motion.section
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="panel-elevated relative overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary/55 to-transparent" />
      <div className="grid gap-7 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:p-7">
        <div className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <EndossoBadge
              tipo={documento.tipo}
              tipoEndosso={documento.tipoEndosso}
              sequencial={isApolice ? undefined : documento.sequencial}
            />
            {badge}
            {!isApolice && (
              <span className="text-[11.5px] text-muted-foreground">
                da apólice <span className="font-mono">{documento.numeroApolice}</span>
              </span>
            )}
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Número do documento
            </div>
            <h1 className="mt-1.5 break-all font-mono text-[23px] font-semibold tracking-[-0.035em] text-foreground sm:text-[30px] lg:text-[34px]">
              {documento.numeroCompleto}
            </h1>
          </div>
          {seguradoNome ? (
            <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
              <UserRound className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>Segurado</span>
              <span className="truncate font-semibold text-foreground">{seguradoNome}</span>
            </div>
          ) : null}
        </div>
        {premioValor !== undefined && (
          <div className="min-w-[220px] rounded-2xl border border-primary/15 bg-primary/[0.055] p-4 lg:text-right">
            <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground lg:justify-end">
              <CircleDollarSign className="h-4 w-4 text-primary" aria-hidden="true" />
              Prêmio total
            </div>
            <div className="mt-2 font-mono text-[23px] font-semibold tracking-[-0.035em] text-foreground sm:text-[27px]">
              {fmtNum(premioValor ?? 0, premioMoeda ?? "BRL")}
            </div>
          </div>
        )}
      </div>
      {extra ? (
        <div className="border-t border-border/70 bg-surface-2/35 p-4 sm:p-5">{extra}</div>
      ) : null}
    </motion.section>
  );
}

// ============ Motivo do endosso (A/B/C) ============
const MOTIVO_ENDOSSO_LABEL: Record<string, string> = {
  ERRO_EMISSAO: "Erro de emissão",
  AJUSTE: "Ajuste",
  FATURA: "Fatura",
  INADIMPLENCIA: "Inadimplência",
  CANCELAMENTO: "Cancelamento",
  ALTERACAO: "Alteração",
  INCLUSAO: "Inclusão",
  EXCLUSAO: "Exclusão",
  RENOVACAO: "Renovação",
  COBRANCA: "Cobrança",
  SUBSTITUICAO: "Substituição",
  REATIVACAO: "Reativação",
};

/** Cores por natureza do motivo — destaca alterações vs. correções. */
function motivoTone(codigo: string | null): string {
  switch (codigo) {
    case "ERRO_EMISSAO":
    case "INADIMPLENCIA":
      return "bg-destructive/10 text-destructive border-destructive/30";
    case "CANCELAMENTO":
    case "EXCLUSAO":
    case "FATURA":
      return "bg-warning/10 text-warning border-warning/30";
    case "AJUSTE":
    case "ALTERACAO":
    case "SUBSTITUICAO":
      return "bg-primary/10 text-primary border-primary/30";
    default:
      return "bg-surface-2 text-foreground border-border";
  }
}

export function MotivoEndossoCard({ motivo }: { motivo: MotivoEndossoInfo }) {
  const label = motivo.codigo
    ? (MOTIVO_ENDOSSO_LABEL[motivo.codigo] ?? motivo.codigo.replace(/_/g, " "))
    : "Não informado";
  return (
    <div className="panel overflow-hidden">
      <div className="px-5 py-3 border-b border-border bg-surface-2/50 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
        Motivo da emissão
      </div>
      <div className="p-5 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center rounded-md border px-2.5 py-1 text-[12px] font-semibold",
              motivoTone(motivo.codigo),
            )}
          >
            {label}
          </span>
          {motivo.codigo && (
            <code className="rounded bg-surface-2 border border-border px-2 py-0.5 text-[11px] font-mono text-muted-foreground">
              {motivo.codigo}
            </code>
          )}
          {motivo.tipoCancelamento && (
            <span className="inline-flex items-center rounded-md border border-border bg-surface-2 px-2 py-0.5 text-[11px] font-mono text-muted-foreground">
              {motivo.tipoCancelamento}
            </span>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Endosso afetado" value={motivo.numeroEndossoCancelado} mono />
          <Field label="Pagamento" value={motivo.pagamento} />
        </div>

        {motivo.descricao && (
          <div>
            <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground mb-1.5">
              Descrição do motivo
            </div>
            <p className="text-[13px] leading-relaxed text-foreground whitespace-pre-wrap border-l-2 border-primary/40 pl-3">
              {motivo.descricao}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ Cancelamento / alteração (endosso B/C) ============

export function CancelamentoCard({
  cancelamento,
  tipoEndosso,
}: {
  cancelamento: CancelamentoInfo;
  tipoEndosso: TipoEndosso | null;
}) {
  const titulo =
    tipoEndosso === "C"
      ? "Dados do cancelamento"
      : tipoEndosso === "B"
        ? "Dados da alteração"
        : "Dados do endosso";
  return (
    <div className="panel overflow-hidden">
      <div className="px-5 py-3 border-b border-border bg-surface-2/50 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
        {titulo}
      </div>
      <div className="p-5 grid sm:grid-cols-3 gap-4">
        <Field label="Endosso afetado" value={cancelamento.numeroEndossoCancelado} mono />
        <Field label="Motivo" value={cancelamento.motivo} />
        <Field label="Pagamento" value={cancelamento.pagamento} />
        {cancelamento.descricaoMotivo && (
          <div className="sm:col-span-3">
            <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground mb-1.5">
              Descrição
            </div>
            <p className="text-[13px] leading-relaxed text-foreground whitespace-pre-wrap">
              {cancelamento.descricaoMotivo}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ Dados gerais ============
export function DadosGeraisCard({ dados }: { dados: DadosGerais }) {
  return (
    <div className="panel p-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Field label="Nº proposta seguradora" value={dados.numeroPropostaSeguradora} mono />
      <Field label="Proposta origem" value={dados.idPropostaOrigem} mono />
      <Field label="Produto" value={dados.idProduto} mono />
      <Field
        label="SUSEP (grupo / ramo)"
        value={dados.grupoSusep ? `${dados.grupoSusep} / ${dados.ramoSusep ?? "—"}` : null}
        mono
      />
      <Field label="Sistema origem" value={dados.sistemaOrigem} />
      <Field label="Subscritor" value={dados.subscritor} />
      <Field
        label="Resultado subscrição"
        value={
          dados.resultadoSubscricao && (
            <span
              className={cn(
                "px-1.5 py-0.5 rounded text-[11px] font-mono",
                dados.resultadoSubscricao === "APROVADA"
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive",
              )}
            >
              {dados.resultadoSubscricao}
            </span>
          )
        }
      />
      <Field label="Tipo apólice" value={dados.tipoApolice} mono />
      <Field
        label="Emissão condicionada ao pagamento"
        value={
          dados.emissaoCondicionadaPagamento === null
            ? null
            : dados.emissaoCondicionadaPagamento
              ? "Sim"
              : "Não"
        }
      />
      {dados.condicoesGerais.length > 0 && (
        <div className="sm:col-span-2 lg:col-span-3">
          <Field
            label="Condições gerais"
            value={
              <div className="flex flex-wrap gap-1.5">
                {dados.condicoesGerais.map((c) => (
                  <span
                    key={c}
                    className="font-mono text-[10.5px] bg-muted/50 px-1.5 py-0.5 rounded"
                  >
                    {c}
                  </span>
                ))}
              </div>
            }
          />
        </div>
      )}
    </div>
  );
}

// ============ Datas ============
export function DatasCard({ datas }: { datas: DatasInfo }) {
  return (
    <div className="panel p-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Field label="Início da vigência" value={fmtDate(datas.inicioVigencia)} mono />
      <Field label="Fim da vigência" value={fmtDate(datas.fimVigencia)} mono />
      <Field label="Data de emissão" value={fmtDate(datas.dataEmissao)} mono />
      <Field label="Assinatura" value={fmtDate(datas.assinatura)} mono />
      <Field label="Conclusão subscrição" value={fmtDate(datas.conclusaoSubscricao)} mono />
      <Field label="Registro origem" value={fmtDate(datas.registroOrigem)} mono />
      <Field label="Protocolo origem" value={fmtDate(datas.protocoloOrigem)} mono />
    </div>
  );
}

// ============ Partes ============
export function PartesList({ partes }: { partes: ParteInfo[] }) {
  if (partes.length === 0)
    return (
      <div className="panel p-5 text-[12px] text-muted-foreground">Nenhuma parte registrada.</div>
    );
  return (
    <div className="panel">
      <Accordion type="multiple" className="divide-y divide-border">
        {partes.map((p) => (
          <AccordionItem key={p.id} value={p.id} className="border-b-0 px-4 first:pt-0 last:pb-0">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3 min-w-0 text-left">
                <span className="font-mono text-[10.5px] px-1.5 py-0.5 rounded bg-primary/10 text-primary shrink-0">
                  {p.papel} / {p.tipo}
                </span>
                <span className="text-[13px] font-medium truncate">{p.nome}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <Field
                  label="Tipo pessoa"
                  value={p.tipoPessoa ? (TIPO_PESSOA_LABEL[p.tipoPessoa] ?? p.tipoPessoa) : null}
                />
                <Field label="Nacionalidade" value={p.nacionalidade} mono />
                <Field
                  label={p.tipoPessoa === "JURIDICA" ? "Fundação" : "Nascimento"}
                  value={fmtDate(p.dataNascimentoFundacao)}
                  mono
                />
                <Field label="Exposição política" value={p.exposicaoPolitica} />
              </div>

              {p.documentos.length > 0 && (
                <div className="mb-4">
                  <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground mb-1.5">
                    Documentos
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.documentos.map((d, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-2 border border-border font-mono text-[11px]"
                      >
                        <span className="text-muted-foreground">{d.tipo}</span>
                        <span className="text-foreground">{fmtCPFCNPJ(d.tipo, d.valor)}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {p.contatos.length > 0 && (
                <div className="mb-4">
                  <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground mb-1.5">
                    Contatos
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {p.contatos.map((c, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-2 px-3 py-2 rounded-md bg-surface-2 border border-border text-[12px]"
                      >
                        <span className="text-muted-foreground font-mono text-[10.5px]">
                          {c.tipo}
                        </span>
                        <span className="text-foreground truncate">{c.valor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {p.enderecos.length > 0 && (
                <div>
                  <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground mb-1.5">
                    Endereços
                  </div>
                  <div className="space-y-2">
                    {p.enderecos.map((e, i) => (
                      <div
                        key={i}
                        className="rounded-md bg-surface-2 border border-border p-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-[12px]"
                      >
                        <Field label="Tipo" value={e.tipo} />
                        <Field
                          label="Logradouro"
                          value={[e.logradouro, e.numero].filter(Boolean).join(", ") || null}
                        />
                        <Field label="Complemento" value={e.complemento} />
                        <Field label="Bairro" value={e.bairro} />
                        <Field
                          label="Cidade / UF"
                          value={e.cidade ? `${e.cidade}${e.estado ? ` / ${e.estado}` : ""}` : null}
                        />
                        <Field label="CEP" value={fmtCEP(e.cep)} mono />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

// ============ Itens & Coberturas ============
function CoberturaCard({ c }: { c: CoberturaInfo }) {
  return (
    <div className="rounded-xl border border-border bg-surface-2/40 p-4 space-y-3">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0">
          <div className="text-[13.5px] font-semibold text-foreground">{c.nome}</div>
          <div className="font-mono text-[10.5px] text-muted-foreground mt-0.5">
            {c.codigo} · SUSEP {c.grupoSusep}/{c.ramoSusep}
          </div>
        </div>
        {c.processoSusep && (
          <span className="font-mono text-[10px] bg-muted/40 px-1.5 py-0.5 rounded text-muted-foreground">
            Processo {c.processoSusep}
          </span>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-[12px]">
        <Field label="Início" value={fmtDate(c.inicioVigencia)} mono />
        <Field label="Fim" value={fmtDate(c.fimVigencia)} mono />
        <Field label="Abrangência" value={c.abrangenciaGeografica} />
      </div>

      {c.limites.length > 0 && (
        <div>
          <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground mb-1.5">
            Limites
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {c.limites.map((l, i) => (
              <div
                key={i}
                className="rounded-md bg-background border border-border p-3 flex items-center justify-between text-[12px]"
              >
                <div>
                  <div className="font-mono text-[10.5px] text-muted-foreground">
                    {l.tipoLimite} · {l.tipoObrigacao}
                  </div>
                  <div className="font-mono text-foreground mt-0.5">
                    {fmtNum(l.valor, l.moeda ?? "BRL")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {c.beneficiarios.length > 0 && (
        <div>
          <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground mb-1.5">
            Beneficiários
          </div>
          <div className="space-y-1">
            {c.beneficiarios.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-md bg-background border border-border text-[12px]"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-foreground">{b.parentesco ?? "—"}</span>
                  <span className="font-mono text-[10.5px] text-muted-foreground truncate">
                    {b.id}
                  </span>
                </div>
                <span className="font-mono text-[12px] text-primary">
                  {b.participacao !== null ? `${b.participacao.toFixed(2)}%` : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {c.composicaoPremio.length > 0 && (
        <div>
          <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground mb-1.5">
            Composição do prêmio
          </div>
          <div className="overflow-hidden rounded-md border border-border">
            <table className="data-table text-[11.5px]">
              <thead className="bg-muted/30 text-muted-foreground">
                <tr>
                  <th className="text-left font-medium px-2 py-1.5">Natureza</th>
                  <th className="text-left font-medium px-2 py-1.5">Tipo</th>
                  <th className="text-right font-medium px-2 py-1.5">Valor</th>
                </tr>
              </thead>
              <tbody>
                {c.composicaoPremio.map((l, i) => (
                  <tr key={i} className="border-t border-border/60">
                    <td className="px-2 py-1.5">
                      {NATUREZA_PREMIO_LABEL[l.natureza] ?? l.natureza}
                    </td>
                    <td className="px-2 py-1.5 font-mono text-muted-foreground">{l.tipo}</td>
                    <td className="px-2 py-1.5 text-right font-mono">{fmtNum(l.valor, l.moeda)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export function ItensCoberturas({ itens }: { itens: ItemInfo[] }) {
  if (itens.length === 0)
    return <div className="panel p-5 text-[12px] text-muted-foreground">Nenhum item segurado.</div>;
  return (
    <div className="space-y-4">
      {itens.map((it, i) => (
        <div key={i} className="panel p-5 space-y-4">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="text-[13.5px] font-semibold">
                Item #{it.numero ?? i + 1} · {it.tipoObjeto ?? "Objeto"}
              </div>
              {it.classeRisco && (
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  Classe de risco: {it.classeRisco}
                </div>
              )}
            </div>
          </div>

          {it.dadosItem && Object.keys(it.dadosItem).length > 0 && (
            <div className="rounded-md bg-surface-2/60 border border-border p-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(it.dadosItem).map(([k, v]) => (
                <Field
                  key={k}
                  label={k.replace(/_/g, " ")}
                  value={typeof v === "boolean" ? (v ? "Sim" : "Não") : String(v ?? "—")}
                />
              ))}
            </div>
          )}

          <div className="space-y-3">
            {it.coberturas.map((c, j) => (
              <CoberturaCard key={j} c={c} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============ Pagamento ============
export function PagamentoCard({ pagamento }: { pagamento: PagamentoInfo }) {
  if (pagamento.parcelas.length === 0)
    return (
      <div className="panel-quiet flex min-h-40 items-center justify-center gap-3 p-6 text-[12.5px] text-muted-foreground">
        <WalletCards className="h-5 w-5" aria-hidden="true" />
        Sem composição de parcelas registrada neste documento.
      </div>
    );
  const moeda = pagamento.parcelas.find((p) => p.moeda)?.moeda ?? "BRL";
  const totalMoeda = pagamento.parcelas.reduce((acc, p) => acc + (p.valor ?? 0), 0);
  return (
    <div className="panel-elevated overflow-hidden">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/70 bg-surface-2/35 p-5">
        <div>
          <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">
            <WalletCards className="h-4 w-4 text-primary" aria-hidden="true" />
            Plano financeiro
          </div>
          <div className="mt-1.5 text-[13px] text-muted-foreground">
            {pagamento.parcelas.length} {pagamento.parcelas.length === 1 ? "parcela" : "parcelas"}{" "}
            no documento
          </div>
        </div>
        <div className="text-left sm:text-right">
          <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Total das parcelas
          </div>
          <div className="mt-1 font-mono text-[24px] font-semibold tracking-[-0.03em] text-foreground">
            {fmtNum(totalMoeda, moeda)}
          </div>
          {moeda !== "BRL" && pagamento.totalBRL > 0 ? (
            <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
              Equivalente a {fmtNum(pagamento.totalBRL, "BRL")}
            </div>
          ) : null}
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        {pagamento.parcelas.map((parcela, index) => (
          <article
            key={`${parcela.numero ?? index}-${parcela.vencimento ?? "sem-data"}`}
            className="overflow-hidden rounded-2xl border border-border bg-background/65"
          >
            <div className="grid gap-4 border-b border-border/70 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 font-mono text-[13px] font-semibold text-primary">
                  {String(parcela.numero ?? index + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0">
                  <div className="text-[14px] font-semibold text-foreground">
                    Parcela {parcela.numero ?? index + 1}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      Vence em {fmtDateOnly(parcela.vencimento)}
                    </span>
                    {parcela.agenteCobrador ? (
                      <span className="inline-flex items-center gap-1.5">
                        <FileCheck2 className="h-3.5 w-3.5" aria-hidden="true" />
                        {parcela.agenteCobrador}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="sm:text-right">
                <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  Valor da parcela
                </div>
                <div className="mt-1 font-mono text-[20px] font-semibold tracking-[-0.025em] text-foreground">
                  {fmtNum(parcela.valor, parcela.moeda ?? "BRL")}
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="mb-3 flex items-center gap-2">
                <ReceiptText className="h-4 w-4 text-primary" aria-hidden="true" />
                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground">
                  Composição da parcela
                </div>
              </div>
              {parcela.composicao.length > 0 ? (
                <div className="divide-y divide-border/60 rounded-xl border border-border/70 bg-surface-2/25">
                  {parcela.composicao.map((linha, lineIndex) => (
                    <div
                      key={`${linha.natureza}-${linha.tipo}-${lineIndex}`}
                      className="grid gap-2 px-3.5 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
                    >
                      <div className="min-w-0">
                        <div className="text-[13px] font-medium text-foreground">
                          {NATUREZA_PREMIO_LABEL[linha.natureza] ?? linha.natureza}
                        </div>
                        <div className="mt-0.5 font-mono text-[10.5px] text-muted-foreground">
                          {linha.tipo}
                        </div>
                      </div>
                      <div className="font-mono text-[14px] font-semibold tabular-nums text-foreground sm:text-right">
                        {fmtNum(linha.valor, linha.moeda)}
                        {linha.moeda !== "BRL" && linha.valorBRL ? (
                          <div className="mt-0.5 text-[10.5px] font-normal text-muted-foreground">
                            {fmtNum(linha.valorBRL, "BRL")}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border px-4 py-3 text-[12px] text-muted-foreground">
                  O MOTOR informou apenas o valor consolidado desta parcela.
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// ============ Cotação ============
export function CotacaoCard({ cotacoes }: { cotacoes: CotacaoInfo[] }) {
  if (cotacoes.length === 0) return null;
  return (
    <div className="panel p-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cotacoes.map((c, i) => (
        <div key={i} className="space-y-1">
          <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">
            {c.moeda}
          </div>
          <div className="font-mono text-[14px] text-foreground">
            1 {c.moeda} = R$ {c.taxaCambio.toLocaleString("pt-BR", { minimumFractionDigits: 4 })}
          </div>
          <div className="text-[10.5px] text-muted-foreground">
            {fmtDate(c.dataCotacao)} · {c.identificador ?? "—"}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============ Limite máximo da apólice ============
export function LimiteApoliceCard({ limite }: { limite: LimiteApoliceInfo | null }) {
  if (!limite) return null;
  return (
    <div className="panel p-5 flex items-center justify-between gap-4 flex-wrap">
      <div>
        <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">
          Limite máximo da apólice
        </div>
        <div className="text-[20px] font-semibold font-mono mt-1">
          {fmtNum(limite.valor, limite.moeda ?? "BRL")}
        </div>
      </div>
    </div>
  );
}

// ============ Aviso de wrapper vazio ============
export function EndossoSemDadosAviso({ numeroApolice }: { numeroApolice: string }) {
  return (
    <div className="rounded-xl border border-warning/40 bg-warning/5 p-5 text-[12.5px] text-foreground">
      <div className="font-semibold mb-1">Endosso sem corpo completo</div>
      <p className="text-muted-foreground">
        Este endosso do MOTOR OLÉ contém apenas o delta (geralmente novas datas). Para enxergar
        partes, itens e composição de prêmio, consulte a apólice mãe{" "}
        <span className="font-mono text-foreground">{numeroApolice}</span>.
      </p>
    </div>
  );
}

// ============ Cobrança ============
export function BillingBadge({
  statusPagamento,
  situacaoEmissao,
  size = "md",
}: {
  statusPagamento: string | null | undefined;
  situacaoEmissao: string | null | undefined;
  size?: "sm" | "md";
}) {
  const { label, className } = billingTagInfo(statusPagamento, situacaoEmissao);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md font-mono font-semibold border whitespace-nowrap",
        size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-[10.5px]",
        className,
      )}
    >
      {label}
    </span>
  );
}

/** Data pura (yyyy-mm-dd) sem deslocamento de fuso. */
export function fmtDateOnly(v: string | null | undefined): string {
  if (!v) return "—";
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(v);
  if (m) return `${m[3]}/${m[2]}/${m[1]}`;
  return fmtDate(v);
}

function statusPagamentoLabel(v: string | null | undefined): string {
  const s = (v ?? "").trim().toLowerCase();
  if (s.startsWith("total")) return "Total (quitado)";
  if (s.startsWith("parcial")) return "Parcial";
  if (s.startsWith("abert")) return "Aberta";
  return v ?? "—";
}

/** Card da parcela operacional vigente de um documento. */
export function CobrancaCard({
  record,
  titulo = "Cobrança",
}: {
  record: BillingRecord | null;
  titulo?: string;
}) {
  if (!record) {
    return (
      <div className="panel-quiet flex min-h-56 flex-col items-center justify-center gap-3 p-6 text-center text-[12.5px] text-muted-foreground">
        <CreditCard className="h-6 w-6 text-muted-foreground/60" aria-hidden="true" />
        <div>
          <div className="font-medium text-foreground">Cobrança ainda não registrada</div>
          <div className="mt-1">Não há situação financeira operacional para este documento.</div>
        </div>
      </div>
    );
  }
  const paymentStatus = statusPagamentoLabel(record.status_pagamento);
  const settled = (record.status_pagamento ?? "").trim().toLowerCase().startsWith("total");
  return (
    <div className="panel-elevated h-full overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-border/70 bg-surface-2/35 px-5 py-4">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">
          {titulo}
        </span>
        <BillingBadge
          statusPagamento={record.status_pagamento}
          situacaoEmissao={record.situacao_emissao}
        />
      </div>
      <div className="space-y-5 p-5">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {settled ? (
              <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
            ) : (
              <Clock3 className="h-4 w-4 text-warning" aria-hidden="true" />
            )}
            Status do pagamento
          </div>
          <div
            className={cn(
              "mt-2 text-[26px] font-semibold tracking-[-0.035em]",
              settled ? "text-success" : "text-foreground",
            )}
          >
            {paymentStatus}
          </div>
          <div className="mt-1 text-[12px] text-muted-foreground">
            Emissão {record.situacao_emissao || "sem situação informada"}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-background/60 p-3.5">
            <div className="text-[10px] font-medium uppercase tracking-[0.11em] text-muted-foreground">
              Parcela
            </div>
            <div className="mt-1.5 font-mono text-[18px] font-semibold text-foreground">
              {billingInstallmentLabel(record.numero_parcela)}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-background/60 p-3.5">
            <div className="text-[10px] font-medium uppercase tracking-[0.11em] text-muted-foreground">
              Vencimento
            </div>
            <div className="mt-1.5 font-mono text-[15px] font-semibold text-foreground">
              {fmtDateOnly(record.data_vencimento)}
            </div>
          </div>
        </div>

        <div className="grid gap-3 border-t border-border/70 pt-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
          <Field label="Nº da proposta" value={record.numero_proposta} mono />
          <Field label="Endosso" value={normalizeBillingEndosso(record.numero_endosso)} mono />
          <Field label="Quitação" value={fmtDate(record.data_quitacao)} mono />
          <Field label="Situação da emissão" value={record.situacao_emissao} />
        </div>
      </div>
    </div>
  );
}

/** Histórico de parcelas por endosso da apólice, com filtros por tag e situação. */
export function CobrancasList({ rows: allRows }: { rows: BillingRecord[] }) {
  const [tags, setTags] = useState<BillingTag[]>([]);
  const [situacao, setSituacao] = useState<SituacaoFilter>("todas");

  const rows = allRows.filter((r) => {
    const tag = billingTagInfo(r.status_pagamento, r.situacao_emissao).tag;
    if (tags.length > 0 && !tags.includes(tag)) return false;
    return matchSituacao(r.situacao_emissao, situacao);
  });

  if (allRows.length === 0) {
    return (
      <div className="panel p-5 text-[12.5px] text-muted-foreground">
        Nenhuma cobrança registrada para esta apólice.
      </div>
    );
  }
  return (
    <div className="panel-elevated overflow-hidden">
      <div className="border-b border-border/70 bg-surface-2/35 px-4 py-3.5 sm:px-5">
        <BillingFilters
          tags={tags}
          onToggleTag={(t) =>
            setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))
          }
          onClearTags={() => setTags([])}
          situacao={situacao}
          onSituacao={setSituacao}
        />
      </div>
      {rows.length === 0 && (
        <div className="px-4 py-8 text-center text-[12px] text-muted-foreground">
          Nenhuma cobrança corresponde aos filtros.
        </div>
      )}
      {rows.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="data-table min-w-[760px] text-[12px]">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left sm:px-5">Endosso</th>
                <th className="px-3 py-3 text-left">Parcela</th>
                <th className="px-3 py-3 text-left">Proposta</th>
                <th className="px-3 py-3 text-left">Status</th>
                <th className="px-3 py-3 text-right">Vencimento</th>
                <th className="px-4 py-3 text-right sm:px-5">Quitação</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((record) => (
                <tr
                  key={`${record.numero_apolice}-${record.numero_endosso}-${record.numero_parcela}`}
                >
                  <td className="px-4 py-3.5 font-mono font-medium text-foreground sm:px-5">
                    {normalizeBillingEndosso(record.numero_endosso)}
                  </td>
                  <td className="px-3 py-3.5 font-mono text-muted-foreground">
                    {billingInstallmentLabel(record.numero_parcela)}
                  </td>
                  <td className="max-w-48 truncate px-3 py-3.5 font-mono text-[11.5px] text-muted-foreground">
                    {record.numero_proposta ?? "—"}
                  </td>
                  <td className="px-3 py-3.5">
                    <BillingBadge
                      statusPagamento={record.status_pagamento}
                      situacaoEmissao={record.situacao_emissao}
                      size="sm"
                    />
                  </td>
                  <td className="px-3 py-3.5 text-right font-mono text-[11.5px]">
                    {fmtDateOnly(record.data_vencimento)}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-[11.5px] sm:px-5">
                    {fmtDate(record.data_quitacao)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
