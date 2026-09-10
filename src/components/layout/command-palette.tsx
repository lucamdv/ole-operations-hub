import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Command } from "cmdk";
import {
  AlertTriangle,
  BarChart3,
  FileText,
  LayoutDashboard,
  LoaderCircle,
  Radio,
  Settings,
  ShieldAlert,
  Wrench,
} from "lucide-react";
import { latestAuditQuery } from "@/hooks/use-audit";
import { policiesQuery } from "@/hooks/use-policies";
import { relativeTime } from "@/lib/format";

const NAV = [
  { to: "/", label: "Visão Geral", icon: LayoutDashboard, hint: "Dashboard executivo" },
  { to: "/operacao", label: "Operação", icon: Radio, hint: "Centro de monitoramento" },
  { to: "/apolices", label: "Apólices", icon: FileText, hint: "Lista e busca" },
  { to: "/alertas", label: "Alertas", icon: AlertTriangle, hint: "Incidentes operacionais" },
  { to: "/analytics", label: "Analytics", icon: BarChart3, hint: "Rankings e tendências" },
  { to: "/ferramentas", label: "Ferramentas", icon: Wrench, hint: "Utilitários operacionais" },
  {
    to: "/configuracoes",
    label: "Configurações",
    icon: Settings,
    hint: "Preferências da plataforma",
  },
] as const;

function normalized(value: unknown) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function includesQuery(query: string, values: unknown[]) {
  if (!query) return true;
  return normalized(values.join(" ")).includes(query);
}

function endorsementDocument(policyNumber: string, endorsementNumber: string) {
  const sequence = endorsementNumber.replace(/\D/g, "").padStart(6, "0").slice(-6);
  return policyNumber.length > 6 ? `${policyNumber.slice(0, -6)}${sequence}` : endorsementNumber;
}

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const deferredQuery = useDeferredValue(q);
  const policiesQueryResult = useQuery({ ...policiesQuery, enabled: open });
  const auditQueryResult = useQuery({ ...latestAuditQuery, enabled: open });

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  const query = normalized(deferredQuery.trim());
  const navMatches = NAV.filter((item) => includesQuery(query, [item.label, item.hint]));
  const policies = policiesQueryResult.data;
  const findings = auditQueryResult.data?.findings;

  const policyMatches = useMemo(
    () =>
      (policies ?? [])
        .filter((policy) =>
          includesQuery(query, [
            policy.numero_apolice,
            policy.numero_endosso_atual,
            policy.segurado_nome,
            policy.corretor_nome,
            policy.produto,
            ...policy.coberturas,
            ...policy.endorsements.map((endorsement) => endorsement.numero_endosso),
          ]),
        )
        .slice(0, query ? 6 : 4),
    [policies, query],
  );

  const endorsementMatches = useMemo(
    () =>
      query
        ? (policies ?? [])
            .flatMap((policy) =>
              policy.endorsements.map((endorsement) => ({ policy, endorsement })),
            )
            .filter(({ policy, endorsement }) =>
              includesQuery(query, [
                endorsement.numero_endosso,
                `${policy.numero_apolice} ${endorsement.numero_endosso}`,
                endorsementDocument(policy.numero_apolice, endorsement.numero_endosso),
              ]),
            )
            .slice(0, 5)
        : [],
    [policies, query],
  );

  const auditMatches = useMemo(
    () =>
      query
        ? (findings ?? [])
            .filter((finding) =>
              includesQuery(query, [
                finding.apolice,
                finding.endosso,
                finding.tipo_erro,
                finding.detalhes?.motivo,
                finding.detalhes?.detalhe,
              ]),
            )
            .slice(0, 5)
        : [],
    [findings, query],
  );

  if (!open) return null;

  const close = () => onOpenChange(false);
  const go = (to: (typeof NAV)[number]["to"]) => {
    close();
    navigate({ to });
  };
  const loading = policiesQueryResult.isLoading || auditQueryResult.isLoading;
  const failed = policiesQueryResult.isError || auditQueryResult.isError;
  const empty =
    !loading &&
    navMatches.length === 0 &&
    policyMatches.length === 0 &&
    endorsementMatches.length === 0 &&
    auditMatches.length === 0;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-start justify-center bg-background/60 px-4 pt-[14vh] backdrop-blur-md animate-in fade-in"
      onClick={close}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="panel w-full max-w-[620px] overflow-hidden animate-in zoom-in-95 slide-in-from-top-4"
      >
        <Command label="Pesquisa global" className="bg-transparent" shouldFilter={false}>
          <div className="border-b border-border px-4">
            <Command.Input
              autoFocus
              value={q}
              onValueChange={setQ}
              placeholder="Pesquisar apólice, endosso, corretor, cobertura ou erro…"
              className="w-full bg-transparent py-4 text-[14px] text-foreground outline-none placeholder:text-muted-foreground/70"
            />
          </div>
          <Command.List className="max-h-[55vh] overflow-y-auto p-2 sm:max-h-[420px]">
            {navMatches.length > 0 && (
              <Command.Group
                heading="Navegação"
                className="px-2 py-1.5 text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground/70"
              >
                {navMatches.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Command.Item
                      key={item.to}
                      onSelect={() => go(item.to)}
                      value={`nav-${item.to}`}
                      className="flex cursor-pointer items-center gap-3 rounded-md px-2.5 py-2 text-[13px] text-foreground aria-selected:bg-accent"
                    >
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span>{item.label}</span>
                      <span className="ml-auto text-[11px] text-muted-foreground">{item.hint}</span>
                    </Command.Item>
                  );
                })}
              </Command.Group>
            )}

            {policyMatches.length > 0 && (
              <Command.Group
                heading={query ? "Apólices" : "Apólices recentes"}
                className="mt-2 px-2 py-1.5 text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground/70"
              >
                {policyMatches.map((policy) => (
                  <Command.Item
                    key={policy.id}
                    onSelect={() => {
                      close();
                      navigate({
                        to: "/apolices/$id",
                        params: { id: policy.numero_apolice },
                      });
                    }}
                    value={`policy-${policy.numero_apolice}`}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-2.5 py-2 text-[13px] text-foreground aria-selected:bg-accent"
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="font-mono text-[12px]">{policy.numero_apolice}</span>
                    <span className="truncate text-muted-foreground">
                      — {policy.segurado_nome ?? "Segurado não informado"}
                    </span>
                    <span className="ml-auto shrink-0 text-[10px] text-muted-foreground">
                      {relativeTime(policy.updated_at)}
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {endorsementMatches.length > 0 && (
              <Command.Group
                heading="Endossos"
                className="mt-2 px-2 py-1.5 text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground/70"
              >
                {endorsementMatches.map(({ policy, endorsement }) => (
                  <Command.Item
                    key={endorsement.id}
                    onSelect={() => {
                      close();
                      navigate({
                        to: "/apolices/$id/endossos/$num",
                        params: {
                          id: policy.numero_apolice,
                          num: endorsement.numero_endosso,
                        },
                      });
                    }}
                    value={`endorsement-${policy.numero_apolice}-${endorsement.numero_endosso}`}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-2.5 py-2 text-[13px] text-foreground aria-selected:bg-accent"
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="font-mono text-[12px]">
                      {endorsementDocument(policy.numero_apolice, endorsement.numero_endosso)}
                    </span>
                    <span className="min-w-0 truncate text-muted-foreground">
                      — Endosso {endorsement.numero_endosso} ·{" "}
                      {policy.segurado_nome ?? "Segurado não informado"}
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {auditMatches.length > 0 && (
              <Command.Group
                heading="Alertas da última auditoria"
                className="mt-2 px-2 py-1.5 text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground/70"
              >
                {auditMatches.map((finding) => (
                  <Command.Item
                    key={finding.id}
                    onSelect={() => {
                      close();
                      navigate({ to: "/alertas", search: { q: finding.tipo_erro } });
                    }}
                    value={`finding-${finding.id}`}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-2.5 py-2 text-[13px] text-foreground aria-selected:bg-accent"
                  >
                    <ShieldAlert className="h-4 w-4 shrink-0 text-warning" />
                    <span className="min-w-0 truncate">{finding.tipo_erro}</span>
                    <span className="ml-auto shrink-0 font-mono text-[10.5px] text-muted-foreground">
                      {finding.apolice}
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {loading && (
              <div className="flex items-center justify-center gap-2 py-8 text-[13px] text-muted-foreground">
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Consultando dados da plataforma…
              </div>
            )}
            {failed && !loading && (
              <div className="py-6 text-center text-[13px] text-destructive">
                Não foi possível atualizar os resultados agora.
              </div>
            )}
            {empty && (
              <div className="py-8 text-center text-[13px] text-muted-foreground">
                Nenhum resultado encontrado.
              </div>
            )}
          </Command.List>
          <div className="flex items-center gap-3 border-t border-border px-4 py-2 text-[10.5px] text-muted-foreground">
            <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono">
              ↑↓
            </kbd>
            navegar
            <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono">
              ↵
            </kbd>
            selecionar
            <kbd className="ml-auto rounded border border-border bg-background px-1.5 py-0.5 font-mono">
              esc
            </kbd>
            fechar
          </div>
        </Command>
      </div>
    </div>
  );
}
