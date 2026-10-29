# AUDIT-02.3 Partial Results Implementation Plan

> Execute inline with superpowers:executing-plans, TDD and one final independent review. The user's supplied design and explicit execution/Git correction are the binding specification.

**Goal:** Retain partial audit findings without declaring full coverage or automatically resolving unobserved errors.

**Architecture:** Extend the existing callback contract and scoped handler, keeping technical success separate from semantic completeness. Use a small shared pure result-summary helper for readers, toast and UI; no new status/schema/environment routing system.

**Tech Stack:** Existing TypeScript, Zod, TanStack/React, Supabase and Node tests.

**Spec:** `C:/Users/lucad/Downloads/AUDIT-02_3_PROMPT_CODEX_COCKPIT.md`, amended by the user's current message: implement, commit and push on existing `codex/env-homolog-routing`; preserve the current Preview alias.

## Global constraints

- Base remote HEAD verified `f30730b6a601eb4695012451a911cb280ea1a3e6`; main remains `738f31261eac82e032e932d4298b9953e27f7376`. Clean existing checkout; do not create a branch/worktree.
- No main merge or production publication; no n8n workflow, secret, SSO/protection, schema, registry or source-access modifications.
- Preserve AUDIT-01, ENV-01/02/03, AUDIT-02.2, legacy callbacks, independent modes and scoped persistence.
- Ignored policies are not approved. Partial is technically success but incomplete. All-ignored means zero processed/approved and no full compliance.
- Partial runs cannot resolve by absence or serve as resolution baseline. Excluded/ignored scope is not proof of correction. Present findings can reopen resolutions.

## Review focus

1. Contradictory counts/status/list and enveloped technical errors must fail safely without publishing misleading success.
2. Baseline selection must skip partials beyond one page; read errors must never prove absence.
3. Retries must not duplicate findings or resolutions; document preexisting crash/concurrency limitations rather than claiming transactions.
4. A scope exclusion whose original snapshot would be overwritten must not become an auto-resolution.
5. All-ignored or partial with zero findings must remain visibly incomplete in overview, operation, history, status pill and final toast.

## Task 1 — Callback and persistence

Files: `src/lib/audit/callback-payload.ts`, `src/routes/api/public/audit-callback.ts`, small pure audit helper(s) if needed, `tests/audit-partial-results.test.mjs`, test-only callback transport harness.

Interface: CallbackPayloadSchema retains optional integer counts, ignored list and v2 metadata. Successful partial callbacks persist raw/results/findings in the registered scope; complete callbacks select only a valid complete predecessor. Technical failures remain failures.

- [x] Write RED schema/route tests for mixed findings+ignored, all ignored, invalid invariants/list/duplicates/zeros/envelopes, technical error, replay, partial no resolution, complete after partial, scope exclusion and source errors.
- [x] Extend validation with backwards compatibility and no inflated approvals; preserve snapshot exclusion scope in raw for resolution decisions.
- [x] Gate absence resolution on completeness and reliable baseline; retain reopening for present findings. Block duplicate terminal replay and cover its limitations.
- [x] GREEN focused route/contract tests plus baseline regression suite.

## Task 2 — Readers and UX

Files: `src/lib/audit/result-summary.ts`, `src/lib/audit/types.ts`, `src/lib/audit.functions.ts`, `src/hooks/use-audit.ts`, overview/operation/history/status presentation and focused component/read tests.

Interface: shared summary exposes partial, explicit counts, scoped approval rate/null and final notification; consumers never infer ignored count from findings or treat missing coverage as approval.

- [x] RED tests for read projection/raw preservation, warning toast, legacy outcomes and rendered partial warning/counts/no full-compliance claims.
- [x] Surface explicit audited/candidate/excluded/ignored counts and visible findings; amber incomplete labels; no full-wallet conformity for partial runs.
- [x] GREEN focused tests and full quality gates, then independent review, one RED/GREEN fix pass if needed.

## Task 3 — Publish same Preview

- [x] Document results, limitations and external callback gate.
- [ ] Run test:static (required PG), typecheck, lint, build, diff check; commit and push only existing branch.
- [ ] Verify READY/SHA/current alias, main/production unchanged. Browser demo only with mocked local data or an actual authorized callback; never create remote synthetic results or claim real n8n acceptance without a true callback.

## Ledger

- Ruling: the supplied implementation guide and current explicit execution instruction settle the architecture and Git workflow; execute without another design-approval cycle. Cost if wrong: user can review the bounded diff/Preview; no production or external security changes are authorized.
- Ruling: use the existing feature checkout exactly as requested, not a new worktree/branch. Cost if wrong: shared edits could overlap; clean status and matching remote HEAD verified.
- Pre-flight: Task 1's schema/raw completeness is Task 2's input; keep counts optional for legacy, explicit for v2. Callback scope and read-source capability remain unchanged.
- Known preexisting problem: callback currently inserts findings again on replay and marks run success before finding insertion; cover and narrow this safely without migrations or promising distributed transactions.
- Task 1/2: RED reproduced schema field loss, partial absence auto-resolution, partial baseline selection, duplicate replay and outer technical error masking. Focused GREEN before review: 50/50. Baseline: 213/213; first complete gate: 263/263, typecheck/build exit 0, lint exit 0 with one new PDF any warning identified for removal.
- Ruling: PDF/copy exports must not undo the partial disclosure on screen; share the summary and preserve the public export API. Cost if wrong: bounded report formatting change, verified with the real PDF builder and no actual file save.
- Review: 3 Important findings reproduced RED: incomplete current coverage could authorize absence; reopening read/write failure after terminal success hid findings; v2 rejected-list/count contradiction. Fixed in one pass with completeness gating/partial normalization, required retryable reopening before publication, and v2 list validation. Focused gate: 57/57; final full suite pending.
- Final: Ruling: regrade the down-state wording finding as Important, since a partial label must not mask another engine's technical failure. Fixed with precedence in a tested shared presentation helper. Cost if wrong: only explanatory label/tooltip changes; engine states/flows are unchanged.
- Final: Ruling: ENV routing/registry/source authorization are unchanged; retain their existing tests and inspect diffs for regressions, rather than redesign. Cost if wrong: inherited isolation risks remain; no new public access is introduced.
- Final: Ruling: real n8n callback/Preview protection and remote database isolation remain external acceptance gates, not inferred from HTTP mocks. Cost if wrong: overstated end-to-end acceptance; final report must explicitly leave this pending.
- Final: Ruling: atomic behavior for different concurrent runs/conflicting callbacks is preexisting and not solved without schema/transaction architecture; identical callback retries are covered, but do not claim distributed exactly-once processing. Cost if wrong: conflicting concurrent inputs may require reconciliation; documented explicitly.
- Final: Ruling: existing query limits for findings/ignores/resolutions and historical chart estimates remain outside this bounded adjustment. Cost if wrong: very large historic datasets can leave conservative resolutions pending; new baseline pagination is tested above 1,000.
- Final: Ruling: full test/static/PG/typecheck/lint/build results are root-owned, not inferred from the reviewer. Cost if wrong: compilation/integration failures could ship; rerun after the fix pass before commit/push.
- Final: fixed all review findings in one RED/GREEN pass, including the down-state precedence regraded Important. Final full suite 270/270, zero failures/skips with required PG 17.5; typecheck/build exit 0; lint exit 0, 24 baseline warnings (removed the report's any casts); diff check exit 0. No review findings deferred.
- Visual evidence: local-only fixture served the real notice and compiled CSS; browser confirmed counts 44/62/17/1, expanded reason/leading zeros and pending conformity. Screenshot retained outside Git. No synthetic remote callback or database row was created.
