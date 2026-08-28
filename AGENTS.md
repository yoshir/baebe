# Baebe Repository Instructions

**Scope:** Project-specific tracking, documentation authority, review, and repository-safety rules. Global agent instructions remain applicable and are not duplicated here.

## Documentation and tracking authority

- `docs/active/CANONICAL_ROADMAP.md` is the canonical repository roadmap. It owns scope, sequencing, current execution slices, architectural decisions, dependencies, gates, implementation evidence, readiness, and remaining risks.
- `docs/active/PRODUCT_PRD.md` owns the public discovery and reader experience promise, requirements, acceptance criteria, and non-goals.
- `docs/active/ARCHITECTURE_CONTRACT.md` owns system boundaries, ownership, data flow, lifecycle, timing, failure behavior, security/privacy seams, and non-negotiable invariants.
- `BAEBE_LAUNCH/STRATEGY.md` remains the scoped authority for publishing, copyright/IP checkpoints, audience growth, distribution, and bestseller strategy. It does not replace the repository roadmap.
- `docs/README.md` is navigation-only. Do not create a parallel roadmap, `ACTIVE_SLICE.md`, status ledger, or execution authority.
- Historical plans, handoffs, reviews, and superseded proposals remain references until a documented archive migration preserves provenance and repairs links.

## Slice and pull-request rules

- Every PR maps to one exact bounded slice and gate in the canonical roadmap.
- Use one branch and one PR per bounded slice.
- A PR must preserve the repository's named architecture boundary, especially the separation between private canon, approved source assets, derivative preparation, human approval, channel adapters, and reporting.
- The PR body is a temporary implementation and evidence packet; durable decisions and evidence return to the canonical roadmap.
- Final adversarial review applies to the final diff and actual production path. Any later implementation change invalidates that review and requires a fresh final-state pass.
- Focused tests cannot promote phase, device, production, or release readiness.
- Merge requires the applicable architecture, lifecycle, build, security, deployment, device, and release gates.

## Repository safety and authorization

- Inspect the current branch, worktrees, remotes, dirty files, callers, and active authority before editing.
- Preserve unrelated work; do not reset, discard, broadly stage, or reorganize mixed work without a bounded plan and recoverable state.
- Do not push, open or modify a PR, approve, merge, create or modify remote issues, change GitHub Projects, change permissions, or perform another remote mutation without explicit authorization.
- Do not read, print, commit, or expose `.env.local` or secret values.
- Do not call drafts filed, submitted, paid, published, deployed, or registered without retained external evidence.

## Readiness vocabulary

Use these terms precisely: `Planned`, `Prepared`, `Approved`, `Filed/submitted/paid/published`, `Ready for implementation`, `Launch-ready`, and `Bestseller`. A local plan or green focused check is not evidence of a later readiness state.
