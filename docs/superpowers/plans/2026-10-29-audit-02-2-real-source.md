# AUDIT-02.2 Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline, with TDD and one final independent review.

**Goal:** Audit real policies via the original n8n test webhook, storing every test effect only in homolog.

**Architecture:** Keep the operational scoped client and immutable registry unchanged. Give only the audit snapshot builder a separate server-only, SELECT-only capability over four public sources and fixed projections. Derive webhook paths from existing URLs with the existing converter; no homolog URL variables or enable flag.

**Tech Stack:** Existing TanStack Start, TypeScript, Supabase, Node tests and Vercel Git Preview.

**Spec:** User's AUDIT-02.2 message in this chat (2026-10-29), which supersedes the previous synthetic-only audit source and isolated-endpoint requirements.

## Global constraints

- Work in the requested existing branch codex/env-homolog-routing, base 5744d27137bd48e59944f72b9e8f15d8ba231033; clean checkout verified, no new worktree needed/requested.
- No schema, table, project, endpoint or workflow creation. No n8n edits. No main merge or production deploy.
- Only public.policies, public.endorsements, public.policy_billing and public.audit_ignores may feed the audit snapshot. No public writes; all test lifecycle effects stay homolog.
- Preserve canonical status, v2 contract, pagination, independent selectors, shared Auth, callback/polling destination and production motors.
- n8n retains its real read-only Excelsior queries. Cockpit must not replace actual workflow data with mocks/seed. MOTOR mutations and automatic workers stay blocked in Preview.
- Restore only existing audit URL/callback configuration in Preview, by removing exactly those branch overrides; no secret retrieval/copying.

## Review focus

1. The source capability must not expose CRUD, arbitrary tables/columns or generic public access.
2. A source read failure must close the homolog run as error without dispatch or synthetic fallback.
3. Late callbacks/polling must remain bound to homolog even when the selector changes.
4. Original test URL already containing webhook-test must not be corrupted or sent to webhook.
5. Preview config restoration must not enable production schedulers, native MOTOR or other integrations.

## Task 1 — Read source and destinations (RED/GREEN)

Files: src/lib/audit/source-access.server.ts; src/integrations/supabase/client.server.ts; src/lib/audit-run.server.ts; src/lib/environment/webhooks.server.ts; tests/environment-external.test.mjs; tests/environment-audit-integration.test.mjs; tests/audit-run.test.mjs; tests/audit-source-access.test.mjs.

Interfaces: loadProductionAuditExclusionsSnapshot(snapshotAt?) returns the existing snapshot, not a public client. createAuditSourceReadAccess(client) permits only SELECT on the four source tables; the normal scoped facade remains unchanged.

- [x] Run the existing baseline suite: 203/203, zero skips.
- [x] RED observed for old URL requirements, synthetic source in v2, missing capability and missing external correction guard. Tests cover both Production+test and forced-test Preview, source failures and late callback after selector change.
- [x] Implement the narrow source reader and route only audit preparation through it. Reuse resolveWebhookUrl for all three independent modes; remove old variable requirements.
- [x] Focused tests passed; final full suite after independent review fix: 213/213, zero skips, PostgreSQL 17.5 required.

## Task 2 — Verification and Preview

- [x] Update .env.example and current routing docs to supersede the old external-blocking instructions; keep historical plan/report provenance.
- [x] test:static 213/213 (zero skips), typecheck exit 0, lint exit 0 (25 baseline warnings), build exit 0 and diff check exit 0. One independent review; one important fix reproduced RED/GREEN, no minors.
- [x] Verified Vercel project/team and branch-only overrides. Removed exactly six authorized entries; 65 existing definitions unchanged. Did not retrieve/copy private secrets or change Production definitions.
- [ ] Commit/push this branch only; verify Preview READY, SHA, main/production unchanged. Validate with authorized browser session when available; do not claim a live n8n execution without evidence or activate/change its workflow.

## Ledger

- Ruling: the user explicitly replaces the earlier synthetic-only/isolated-endpoint design; restore original webhook-test and allow four SELECT-only public sources solely for audit preparation. Generic homolog operational access remains isolated. Cost if wrong: snapshot could diverge from the real audited portfolio; guarded by lifecycle and capability tests.
- Ruling: reuse the existing feature checkout/branch named by the user, without a second worktree or integration approval menu. Cost if wrong: unrelated edits could overlap; clean status verified before work.
- Ruling: real Excelsior reads live inside the unchanged n8n workflow; do not broaden the native MOTOR guard or restore its credentials to Preview. Cost if wrong: future native audit code would need its own explicit read-only capability, not generic API access.
- Pre-flight: source and dispatcher share the snapshot interface; webhook resolver and lifecycle tests share original URLs. Registry, callbacks and normal data facade are deliberately not changed.
- Ruling: correction is an upstream mutation, not an audit read. Its homolog handler now reuses assertProductionExternalAccess before data access/HTTP; production corrections retain existing validation. Cost if wrong: a user cannot use SOLUCIONAR against real systems from test mode, which is required by rule 12.
- Final review: one Important finding, no minors: raw PostgREST builder allowed chaining select('*') after a validated projection. Reproduced RED and fixed with a closed frozen pagination/await interface, hiding select, URL, method, CRUD, schema and RPC at every chain stage. Focused capability/lifecycle/pagination tests GREEN; final full suite pending.
- Final: Ruling: Vercel env restoration and real Auth/n8n callback reachability were set aside by reviewer; root verifies them separately and will report incomplete smoke gates. Cost if wrong: code-only success could be mistaken for end-to-end acceptance.
- Final: Ruling: n8n Excelsior internals are unchanged and outside the Cockpit change; no mocks are introduced in real dispatch. Cost if wrong: upstream workflow behavior still needs a live listener/execution inspection, not just mocked tests.
- Final: Ruling: callback raw snapshot retention remains documented/out of scope. Cost if wrong: registry preserves destination, not full historical input after raw overwrite.
- Final: Ruling: full PostgreSQL/typecheck/lint/build evidence is root-owned, not inferred from the reviewer's 55 passing focused tests.
- Preview change approval: user explicitly authorized deletion of exactly six branch-only overrides (two empty audit URL/callback overrides and four obsolete homolog config entries). No other entries may be removed or changed.
- Final: fixed projection escape — regression asserts chained select('*') cannot widen data after any pagination/abort stage, and URL/method/CRUD are absent; RED→GREEN, full suite 213/213. No re-review, per one-fix-pass workflow.
