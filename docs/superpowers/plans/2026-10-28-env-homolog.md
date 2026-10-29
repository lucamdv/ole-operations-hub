# ENV-01/02/03 Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans. Independent SQL/UI tasks use superpowers:dispatching-parallel-agents; root integrates and reviews.

**Goal:** Shared Auth, separate operational schemas, immutable async scope, safe Preview.

**Architecture:** Keep identity in the existing Auth/profiles/user_roles/user_invites. Explicit table allowlists and a server-only AsyncLocalStorage execution context choose public/homolog at the access boundary. Immutable registry in homolog binds run IDs to integration, origin and mode; callbacks authenticate then resolve that registry, never the browser's current toggle. No global dashboard toggle.

**Tech Stack:** Existing TanStack Start, TypeScript, supabase-js, PostgreSQL, Node tests.

**Spec:** `C:/Users/lucad/.codex/attachments/363fb92f-4de4-43e2-8b87-52863572f7dc/Texto colado.txt` (user-authorized autonomous execution, three phases).

## Global Constraints

- Base `64d7ed827e15138291ca7d3a5b69a973075e6dee`; branch `codex/env-homolog-routing`; no main merge or production deploy.
- Supabase `otljnpasmhkoehmwnjvl` / OleCockpit; only additive homolog structures, no production/auth row mutations.
- No copied real data, no new project, no active n8n edits, no real external mutations.
- Preview always homolog; local defaults homolog; unknown environments fail closed.
- Shared identity mutations disabled outside production. No fallback from homolog to public.
- Homolog external integrations require separately configured/validated endpoints; Excelsior requests blocked by default.

## Review Focus

1. Concurrent executions must not leak context between requests/background work.
2. Callback integration/origin/run mismatch must fail before operational access.
3. Cleanup, retry, scheduler and direct external paths cannot bypass routing.
4. Shared identity read access must not permit Preview user/admin mutations.
5. Data API exposure and grants must not broaden public/auth privileges.

## Inventory

17 operational tables: policies, endorsements, policy_billing, audit_runs, audit_findings, audit_ignores, audit_resolutions, audit_correction_responses, policy_sync_runs, policy_sync_changes, billing_sync_state, billing_sync_fallbacks, endorsement_extraction_runs, endorsement_extraction_items, endorsement_exceptions, exception_reason_tags, automation_schedules.

Shared identity: profiles, user_roles, user_invites, Supabase Auth. Infrastructure: environment variables, callback/hook authentication, webhook endpoints, deployment identity; never returned wholesale to browsers.

Operational access inventory: audit*.functions.ts, analytics.functions.ts, kpis.functions.ts, policies.functions.ts, billing.functions.ts, repasse-map.functions.ts, notifications.functions.ts, exception-tags.functions.ts, endorsement-extraction.functions.ts, automation.functions.ts; runners audit-run, policy-sync-runner, sync-legs, policy-sync-audit, motor-sync, billing-retry-worker, automation-scheduler; four callbacks and three public hook routes. Shared identity: admin.functions.ts, invites.functions.ts, assert-admin.ts, auth middleware/client. Browser client is used for Auth, not operational queries.

### Task 1: ENV-01 schema

- [x] Inspect live catalog, FKs/defaults/indexes/triggers/RLS/functions before SQL.
- [x] RED/GREEN migration tests; create migration with CLI, additive schema/constraints/grants/RLS/registry, deterministic synthetic seed.
- [x] Review/apply additive SQL and seed; verify catalogs and 20/20 public content hashes unchanged. Auth untouched; local PostgreSQL checks shared identity too. ENV-01 commit follows gates.

### Task 2: ENV-02 router and integration lifecycle

Files: src/lib/environment/{scope.ts,context.server.ts,access.ts,execution.server.ts,callback.server.ts}; Supabase clients/middleware; affected dispatchers/callbacks/hooks; environment.functions.ts; webhook preference hook/settings UI.

Interfaces: resolveOperationalScope({vercelEnvironment,webhookMode,source,requestedScope?}) -> immutable context; withOperationalContext(context,fn); getOperationalContext(); createScopedAccess(client,contextProvider); registerExecution(runId,integration); withScopedCallback(integration,handler).

- [x] RED tests for environment matrix, explicit public denial, concurrent scopes, table allowlist, identity write denial, no fallback.
- [x] Implement central explicit access facade (not a generic proxy), reuse real clients/business logic, guard external calls and automatic actions.
- [x] RED/GREEN async registry/callback tests for late callback, mismatch, missing IDs, retry, tampering and same-origin scope restrictions.
- [x] Integrate dispatch and polling without changing dashboard defaults; independent modes + migration of old preference.
- [ ] Commit after scoped tests/typecheck.

### Task 3: ENV-03 verification and Preview

- [x] RED/GREEN integration non-contamination tests using snapshots of complete rows, real Supabase transport boundary, scoped audit v2 and callbacks.
- [x] Run specific tests, test:static (203/203, zero skips; required PostgreSQL 17.5), typecheck, lint (0 errors, 25 baseline warnings), build, diff check; independent review. First sandbox build EPERM; permitted local retry passed.
- [ ] Stage branch-safe env/deploy sequencing before push; no inherited operational destinations. Restore shared Auth only after isolation tests pass.
- [ ] Verify Preview SHA/READY, authenticated authorized session if available, synthetic operational data, protection preserved, production unchanged; document incomplete gates honestly.
- [ ] Commit/push ENV-03, report architecture, schema, all files, tests, Preview and residual risks.

## Ledger

- Initial: correct base/clean worktree confirmed; new branch created in existing checkout, preserving base branch. No extra worktree requested/created.
- Design decision: user has supplied and authorized the architecture and autonomous execution; no redundant design approval pause. Existing global lazy Proxy clients will be replaced by explicit scoped method facades after inventory, not blind `.from()` replacements.
- Registry decision: one service-only immutable registry in homolog for both origins; billing callback is a policy_sync leg, not an audit execution. Legacy callbacks without registry may only target pre-existing production executions on a Production deployment; no search across schemas.
- Publication decision: homolog webhooks/native external APIs remain blocked unless explicitly configured as isolated; restoring Auth does not enable production workflows.
- Review rulings: three P2 findings accepted and reproduced RED/GREEN: nested callback run/scope conflicts, legacy production status polling, Preview retry HTTP falsely accepting work. All fixed. Root also reproduced/fixed orphan billing callback and explicit-config MOTOR bypass before fetch.
- Review limits: remote infrastructure/Auth/deployment were not independently judged; root verifies separately. n8n internal isolation is unverified, so external homolog dispatch remains disabled. Unchanged financial rules and callback transaction/idempotency semantics are out of scope, covered only by existing regression tests. No second reviewer is used after narrow fixes; final gates are root responsibility.
- SQL deployment: applied history version 20261029032034, exact reviewed SQL hash unchanged; local filename aligned without editing remote history. 18 RLS tables, seven synthetic policies, zero cross-operational FKs. Data API appends homolog only; existing exposure and settings preserved.
- Integration choice: user already explicitly authorized phase commits, push of the new branch and Preview only. No redundant merge/PR menu; main and production deployment remain untouched. Initial branch push disables its automatic deployments until branch-only safety overrides are verified.
