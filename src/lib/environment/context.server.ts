import { AsyncLocalStorage } from "node:async_hooks";
import { resolveOperationalScope, type OperationalContext } from "./scope.ts";

const contexts = new AsyncLocalStorage<OperationalContext>();
export function getOperationalContext(): OperationalContext {
  return (
    contexts.getStore() ??
    resolveOperationalScope({
      vercelEnvironment: process.env.VERCEL_ENV,
      source: "manual",
    })
  );
}
export function withOperationalContext<T>(context: OperationalContext, action: () => T): T {
  // Validate the server deployment independently of any caller's supplied context.
  const environment = process.env.VERCEL_ENV || "development";
  if (environment !== "production" && context.scope === "production")
    throw new Error("Acesso operacional à produção indisponível neste deployment.");
  return contexts.run(Object.freeze({ ...context }), action);
}
export function withIntegrationContext<T>(mode: string | null | undefined, action: () => T): T {
  return withOperationalContext(
    resolveOperationalScope({
      vercelEnvironment: process.env.VERCEL_ENV,
      webhookMode: mode,
      source: "manual",
    }),
    action,
  );
}
export function assertProductionIdentityMutation() {
  if (
    getOperationalContext().environment !== "production" ||
    getOperationalContext().scope !== "production"
  )
    throw new Error("Alterações da identidade compartilhada estão bloqueadas em homologação.");
}
export function assertProductionExternalAccess() {
  if (getOperationalContext().scope !== "production")
    throw new Error("Operação externa produtiva bloqueada em homologação.");
}
export function assertProductionScheduler() {
  if (
    getOperationalContext().environment !== "production" ||
    getOperationalContext().scope !== "production"
  )
    throw new Error("Agendamentos e workers automáticos desabilitados neste ambiente.");
}
