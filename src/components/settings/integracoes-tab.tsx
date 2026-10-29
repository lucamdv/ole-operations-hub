import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Copy,
  Zap,
  ExternalLink,
  FlaskConical,
  Rocket,
} from "lucide-react";
import { toast } from "sonner";
import {
  getIntegrationsStatus,
  pingMotorPolicies,
  type IntegrationStatus,
} from "@/lib/settings.functions";
import { relativeTime } from "@/lib/format";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useWebhookMode } from "@/hooks/use-webhook-mode";
import { getOperationalEnvironment } from "@/lib/environment.functions";
import type { WebhookIntegration } from "@/lib/webhook-mode";

export function IntegracoesTab() {
  const fetchFn = useServerFn(getIntegrationsStatus);
  const environmentFn = useServerFn(getOperationalEnvironment);
  const environmentQuery = useQuery({
    queryKey: ["operational-environment"],
    queryFn: () => environmentFn(),
    staleTime: 60_000,
  });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["integrations-status"],
    queryFn: () => fetchFn(),
    refetchInterval: 30_000,
  });

  const { data: roleInfo } = useCurrentRole();
  const isAdmin = !!roleInfo?.isAdmin;
  const environment = environmentQuery.data;

  const pingMotor = useServerFn(pingMotorPolicies);

  const motorMut = useMutation({
    mutationFn: () => pingMotor(),
    onSuccess: (r) => (r.ok ? toast.success(r.message) : toast.error(r.message)),
    onError: (e: Error) => toast.error(e.message),
  });
  if (isLoading || environmentQuery.isLoading) {
    return <div className="text-[13px] text-muted-foreground">Carregando integrações…</div>;
  }

  return (
    <div className="space-y-3 max-w-3xl">
      {environment && environment.environment !== "production" && (
        <div className="panel border-warning/30 bg-warning/5 p-4" role="status">
          <div className="flex items-center gap-2 text-[13.5px] font-semibold text-warning">
            <FlaskConical className="h-4 w-4" />
            Ambiente de homologação
            {environment.environment === "preview" ? " · Preview" : " · Local"}
          </div>
          <p className="mt-1.5 text-[12px] text-muted-foreground">
            Todas as operações utilizam dados de homologação (<code>homolog</code>). Acesso
            operacional à produção indisponível. Agendamentos operacionais{" "}
            {environment.schedulersEnabled ? "restritos à homologação" : "desabilitados"}.
          </p>
        </div>
      )}
      {environmentQuery.isError && (
        <div className="panel p-4 text-[12px] text-destructive" role="alert">
          Não foi possível confirmar o ambiente operacional. Os seletores ficam indisponíveis até a
          confirmação do servidor.
        </div>
      )}
      {isAdmin && environment && (
        <div className="panel p-4">
          <div className="text-[13.5px] font-semibold">Modo dos webhooks n8n</div>
          <p className="text-[12px] text-muted-foreground mt-1.5">
            Cada integração tem sua própria preferência neste navegador. Os seletores afetam somente
            os disparos manuais e seus resultados. Os dashboards de produção continuam exibindo
            dados produtivos; consulte os resultados de teste no Preview de homologação. Os
            agendamentos e os demais usuários mantêm sua configuração própria.
          </p>
          <div className="mt-3 divide-y divide-border">
            <WebhookModeControl
              integration="audit"
              label="Auditoria de emissão"
              allowProduction={environment.environment === "production"}
            />
            <WebhookModeControl
              integration="extraction"
              label="Extração de endossos"
              allowProduction={environment.environment === "production"}
            />
            <WebhookModeControl
              integration="correction"
              label="Solicitações de correção"
              allowProduction={environment.environment === "production"}
            />
          </div>
          <p className="mt-2 text-[11.5px] text-muted-foreground">
            O modo teste exige “Listen for test event” no n8n e utiliza exclusivamente dados de{" "}
            <code>homolog</code>.
          </p>
        </div>
      )}
      {(data ?? []).map((it) => (
        <IntegrationCard
          key={it.id}
          item={it}
          onPing={it.id === "motor_policies" ? () => motorMut.mutate() : undefined}
          pingPending={it.id === "motor_policies" && motorMut.isPending}
          onRefresh={() => refetch()}
        />
      ))}
      <p className="text-[11.5px] text-muted-foreground pt-2">
        A carteira usa a API Excelsior diretamente com as secrets
        <code className="mx-1 px-1.5 py-0.5 rounded bg-surface border border-border font-mono text-[11px]">
          EXCELSIOR_API_USERNAME
        </code>
        e
        <code className="mx-1 px-1.5 py-0.5 rounded bg-surface border border-border font-mono text-[11px]">
          EXCELSIOR_API_PASSWORD
        </code>
        . A auditoria e a correção de alertas continuam usando, respectivamente,
        <code className="mx-1 px-1.5 py-0.5 rounded bg-surface border border-border font-mono text-[11px]">
          N8N_AUDIT_WEBHOOK_URL
        </code>
        e
        <code className="mx-1 px-1.5 py-0.5 rounded bg-surface border border-border font-mono text-[11px]">
          N8N_CORRECTION_WEBHOOK_URL
        </code>
        no backend.
      </p>
    </div>
  );
}

function WebhookModeControl({
  integration,
  label,
  allowProduction,
}: {
  integration: WebhookIntegration;
  label: string;
  allowProduction: boolean;
}) {
  const preference = useWebhookMode(integration);
  const mode = allowProduction ? preference.mode : "test";
  const isProduction = mode === "production";
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-[13px] font-medium">
          {isProduction ? (
            <Rocket className="h-4 w-4 text-success" />
          ) : (
            <FlaskConical className="h-4 w-4 text-warning" />
          )}
          {label}
        </div>
        <div className={`mt-1 text-[11.5px] ${isProduction ? "text-success" : "text-warning"}`}>
          Modo: {isProduction ? "Produção" : "Teste"} · Webhook:{" "}
          <code>{isProduction ? "/webhook/" : "/webhook-test/"}</code> · Dados:{" "}
          <code>{isProduction ? "public" : "homolog"}</code>
        </div>
      </div>
      {allowProduction ? (
        <button
          type="button"
          role="switch"
          aria-checked={isProduction}
          aria-label={`Ativar modo de produção: ${label}`}
          onClick={() => {
            const next = isProduction ? "test" : "production";
            preference.setMode(next);
            toast.success(
              `${label}: modo ${next === "production" ? "produção" : "teste"} ativado neste navegador`,
            );
          }}
          className={`shrink-0 relative h-6 w-11 rounded-full transition ${isProduction ? "bg-primary" : "bg-surface-2 border border-border"}`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-background shadow transition-all ${isProduction ? "left-[22px]" : "left-0.5"}`}
          />
        </button>
      ) : (
        <span className="shrink-0 rounded border border-warning/30 px-2 py-1 text-[11px] text-warning">
          Teste fixo
        </span>
      )}
    </div>
  );
}

function IntegrationCard({
  item,
  onPing,
  pingPending,
  onRefresh,
}: {
  item: IntegrationStatus;
  onPing?: () => void;
  pingPending?: boolean;
  onRefresh: () => void;
}) {
  const Status = !item.configured
    ? { Icon: XCircle, color: "text-destructive", label: "Não configurado" }
    : item.lastStatus === "error"
      ? { Icon: AlertCircle, color: "text-destructive", label: "Erro na última execução" }
      : item.lastStatus === "success" || item.id === "audit_callback"
        ? {
            Icon: CheckCircle2,
            color: "text-success",
            label: item.id === "audit_callback" ? "Pronto" : "Operacional",
          }
        : {
            Icon: AlertCircle,
            color: "text-warning",
            label: item.lastStatus ?? "Aguardando primeiro evento",
          };

  return (
    <div className="panel p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Status.Icon className={`h-4 w-4 ${Status.color}`} />
            <div className="text-[13.5px] font-semibold">{item.label}</div>
          </div>
          <div className={`text-[11.5px] mt-1 ${Status.color}`}>{Status.label}</div>
          {item.lastDetail && (
            <div className="text-[12px] text-muted-foreground mt-2 truncate">{item.lastDetail}</div>
          )}
          {item.lastAt && (
            <div className="text-[10.5px] text-muted-foreground/80 font-mono mt-0.5">
              Última atividade: {relativeTime(item.lastAt)}
            </div>
          )}
          {item.publicCallback && (
            <div className="mt-3 flex items-center gap-2">
              <code className="text-[11px] font-mono bg-background border border-border rounded px-2 py-1 truncate flex-1">
                {item.publicCallback}
              </code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(item.publicCallback!);
                  toast.success("URL copiada");
                }}
                className="h-7 w-7 grid place-items-center rounded border border-border hover:bg-surface-2 transition"
                title="Copiar URL"
              >
                <Copy className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          {onPing && (
            <button
              onClick={onPing}
              disabled={!item.configured || pingPending}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-primary text-primary-foreground text-[12px] font-medium hover:bg-primary/90 disabled:opacity-50 transition"
            >
              <Zap className="h-3 w-3" />
              {pingPending ? "Testando…" : "Testar"}
            </button>
          )}
          <button
            onClick={onRefresh}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md border border-border text-[12px] hover:bg-surface-2 transition"
          >
            <ExternalLink className="h-3 w-3" />
            Atualizar
          </button>
        </div>
      </div>
    </div>
  );
}
