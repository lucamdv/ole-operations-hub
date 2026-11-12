import { createServerFn } from "@tanstack/react-start";

export const getOperationalEnvironment = createServerFn({ method: "GET" })
  // Public deployment metadata only: useful before login; never returns configuration or secrets.
  .handler(async () => {
    const { getOperationalContext } = await import("./environment/context.server");
    const context = getOperationalContext();
    return {
      environment: context.environment,
      dataScope: context.scope,
      schema: context.schema,
      schedulersEnabled: context.environment === "production",
    };
  });
