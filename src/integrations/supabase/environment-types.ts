import type { Database } from "./types";

export interface ExecutionRegistryRow {
  run_id: string;
  integration: "audit" | "extraction" | "correction" | "policy_sync";
  data_scope: "production" | "homolog";
  webhook_mode: "production" | "test";
  origin_environment: "production" | "preview" | "development";
  created_at: string;
}
/** homolog is structurally mirrored by ENV-01; shared identity tables are intentionally absent. */
export type EnvironmentDatabase = Database & {
  homolog: Omit<Database["public"], "Tables"> & {
    Tables: Omit<Database["public"]["Tables"], "profiles" | "user_roles" | "user_invites"> & {
      execution_contexts: {
        Row: ExecutionRegistryRow;
        Insert: Omit<ExecutionRegistryRow, "created_at"> & { created_at?: string };
        Update: never;
        Relationships: [];
      };
    };
  };
};
