# Baebe

Baebe is a novel-first science-fiction thriller and cross-media story property. This repository contains the creative source material, screenplay development, reader and discovery prototypes, and the planning records that govern publishing and audience growth.

## Repository map

- `novel/` — manuscript, interludes, appendices, and reader-viewer material.
- `screenplay/` — screenplay scenes and adaptation development.
- `baebe-landing-ag/` — interactive discovery prototype.
- `novel/viewer/` — Express-based private reader prototype.
- `BAEBE_LAUNCH/` — publishing, copyright/IP checkpoint, audience-growth, content-engine, and bestseller strategy.
- `docs/active/` — current repository product, architecture, and execution authorities.
- `legal/`, `copyright/`, `gtm/`, `documentation/`, and archive directories — supporting or historical references until reconciled by the active authorities.

## Documentation authority

Read the active documents before making architecture, product, launch, or repository-process changes:

1. [`docs/active/CANONICAL_ROADMAP.md`](./docs/active/CANONICAL_ROADMAP.md) — repository scope, sequencing, slices, gates, evidence, and readiness.
2. [`docs/active/PRODUCT_PRD.md`](./docs/active/PRODUCT_PRD.md) — public discovery and reader experience promise, requirements, acceptance criteria, and non-goals.
3. [`docs/active/ARCHITECTURE_CONTRACT.md`](./docs/active/ARCHITECTURE_CONTRACT.md) — ownership, data flow, lifecycle, security, and failure boundaries.
4. [`BAEBE_LAUNCH/STRATEGY.md`](./BAEBE_LAUNCH/STRATEGY.md) — launch strategy within its publishing and audience-growth scope.

The documentation index at [`docs/README.md`](./docs/README.md) is navigation-only. Do not create another roadmap, status ledger, active-slice document, or competing authority.

## Local prototypes

The repository has no root package or single application command. The interactive discovery prototype is Vite + React + TypeScript:

```text
baebe-landing-ag/baebe---interactive-cyberpunk-experience 2/
```

From that directory, the available scripts are `npm run dev`, `npm run build`, and `npm run preview`. The private reader prototype is under `novel/viewer/` and uses its own Node/Express scripts.

The target public discovery architecture is Next.js, but no Next.js application currently exists. The migration or replacement decision is tracked in the active roadmap and architecture contract; do not assume that the current Vite prototype is already the target system.

## Repository safety

Preserve unrelated dirty work. Never read, print, commit, or expose `.env.local` or any secret value. External publication, copyright filing, payment, account changes, issue creation, project configuration, and remote Git mutations require the applicable authority and explicit authorization.
