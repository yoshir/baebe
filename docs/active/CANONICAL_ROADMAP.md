# Baebe Canonical Roadmap

**Status:** Draft active repository authority — local tracking process prepared; remote issue/project configuration awaits explicit authorization
**Owner:** Ryan
**Scope:** Repository-wide product, architecture, documentation, execution slices, gates, evidence, and readiness
**Superseded documents:** None; older plans and handoffs remain reference material until archived with provenance

## Authority boundary

This document is the single canonical roadmap for repository execution. It owns scope, sequencing, current execution slices, dependencies, gates, architectural decisions, implementation evidence, readiness, and remaining risks.

Scoped authorities retain non-overlapping ownership:

- [`PRODUCT_PRD.md`](./PRODUCT_PRD.md) owns the public discovery and reader experience promise, requirements, acceptance criteria, and non-goals.
- [`ARCHITECTURE_CONTRACT.md`](./ARCHITECTURE_CONTRACT.md) owns the active engineering boundary, ownership, lifecycle, timing, failures, security, privacy, and invariants.
- [`../../BAEBE_LAUNCH/STRATEGY.md`](../../BAEBE_LAUNCH/STRATEGY.md) owns publishing, copyright/IP checkpoints, audience growth, distribution, and bestseller strategy within that scope.
- [`../../BAEBE_LAUNCH/IP_REGISTER.md`](../../BAEBE_LAUNCH/IP_REGISTER.md) owns release-rights metadata and the private-canon/public-derivative firewall.
- [`../../BAEBE_LAUNCH/TODO.md`](../../BAEBE_LAUNCH/TODO.md) is a detailed launch backlog derived from the launch strategy; it is not a second repository roadmap.

## Current execution slice

| Slice | Owner | Status | Dependency | Gate / exit condition |
|---|---|---|---|---|
| `BAEBE-TRACK-001` — establish active documentation and project-tracking process | Ryan + Codex | Prepared locally | None | Active authority set, PR template, branch/worktree evidence, and remote-action proposal agree; no remote issue mutation without approval |

The current slice is documentation/process work only. It does not modify product code, move historical creative files, create remote issues, add project fields, add labels, or claim release readiness.

## Dependency-ordered roadmap

### Phase 0 — Authority and tracking

1. Establish and approve the active documentation set.
2. Reconcile the existing GitHub Project with the canonical slice model.
3. Create one bounded issue per approved execution slice.
4. Align branch, PR, evidence, and readiness vocabulary with the roadmap.

**Exit evidence:** active docs agree; PR template is present; project fields/labels/items map to exact slices; no competing authority remains.

### Phase 1 — Canon, product, and rights checkpoint

1. Select the private canonical story source and current 90–105K manuscript candidate.
2. Reconcile manuscript, screenplay, notes, and public-prototype terminology.
3. Freeze a dated manuscript candidate and authorship/contributor/AI/license record.
4. Complete the copyright/IP checkpoint before a major public story release.

**Exit evidence:** source map, dated candidate, rights/authorship ledger, filing decision/evidence, and approved public-derivative boundary.

### Phase 2 — Discovery architecture

1. Decide whether to port the existing Vite experience into a Next.js discovery shell or retain it as a bounded standalone surface.
2. Define the approved source-asset manifest and validation boundary.
3. Define durable lead capture, consent, attribution, analytics, and provider-secret boundaries.
4. Implement only the smallest approved discovery slice.

**Exit evidence:** architecture decision, BDD/TDD coverage, accessible discovery path, secret-boundary evidence, consent/lead evidence, and final adversarial review.

### Phase 3 — Audience accumulation and controlled derivatives

1. Approve serialization scope and calendar.
2. Generate channel-specific drafts from approved source assets.
3. Add one adapter at a time with dry-run, idempotency, audit, and manual fallback.
4. Keep recurring software/marketing operations near approximately `$100/month` until traction justifies expansion.

**Exit evidence:** approved release calendar, rights-safe derivative batches, attribution, consent, reporting, and workload evidence.

### Phase 4 — Wide product launch

1. Finish and package the 90–105K novel.
2. Prepare KDP, Ingram, and wide ebook/audio distribution by default.
3. Coordinate legitimate reader demand around launch.
4. Report verified reader, sales, channel, and cost evidence.

**Exit evidence:** final product files, rights and metadata, retailer readiness, launch calendar, demand signals, and verified reporting.

### Phase 5 — Adaptation and long-tail growth

Use verified audience and product evidence to support screenplay, anime, live-action, audio, interactive, or licensing conversations without surrendering adaptation optionality through undocumented rights decisions.

## Proposed initial bounded slices

These are proposed issue-sized slices; they are not remote issues yet.

| Slice ID | Objective | Depends on | Gate |
|---|---|---|---|
| `BAEBE-TRACK-001` | Establish active documentation, PR, branch, and evidence process | None | Local authority and process files validated |
| `BAEBE-CANON-002` | Reconcile private canon candidates and current manuscript source | `BAEBE-TRACK-001` | Ryan selects source authority; contradictions recorded |
| `BAEBE-IP-003` | Prepare and complete the copyright/IP checkpoint | `BAEBE-CANON-002` | Rights, authorship, AI, contributor, deposit, and filing evidence resolved |
| `BAEBE-ARCH-004` | Decide the Vite/Next.js discovery architecture | `BAEBE-TRACK-001`, `BAEBE-CANON-002` | Ownership, security, accessibility, deployment, and maintenance decision approved |
| `BAEBE-LEAD-005` | Define durable lead, consent, attribution, and analytics boundary | `BAEBE-ARCH-004` | Provider/data boundary approved; no secrets in client code |
| `BAEBE-CONTENT-006` | Build the approved source-asset manifest and dry-run derivative validation | `BAEBE-IP-003`, `BAEBE-ARCH-004` | Rights/spoiler/approval failures fail closed |
| `BAEBE-SERIAL-007` | Prepare the approved Substack serialization and audience calendar | `BAEBE-IP-003`, `BAEBE-CONTENT-006` | Ryan approves cadence, scope, and public release boundary |
| `BAEBE-LAUNCH-008` | Prepare wide publication, launch demand, and reporting package | `BAEBE-CONTENT-006`, product completion | KDP/Ingram/wide posture and launch evidence complete |

Each issue must contain the slice ID, objective, authority links, scope, non-goals, dependencies, Given/When/Then scenarios, tests/evidence, stop conditions, and readiness vocabulary. Do not create umbrella issues that mix unrelated ownership boundaries.

## GitHub Project mapping

The private user-owned project **Baebe Launch #2** is linked to `yoshir/baebe` and currently contains zero items. It is execution visibility only; this roadmap remains authoritative.

### Proposed fields

- **Status:** `Todo`, `In Progress`, `Review`, `Blocked`, `Done`.
- **Horizon:** `Now`, `Next`, `Later`.
- **Phase / Workstream:** `Tracking`, `Canon`, `IP`, `Architecture`, `Lead`, `Content`, `Serialization`, `Launch`, `Adaptation`.
- **Owner:** `Ryan`, `Codex`, `External`, or named collaborator.
- **Dependency:** slice ID or `None`.
- **Gate:** the exact roadmap gate or exit evidence.
- **Risk:** `Low`, `Medium`, `High`, `Blocker`.

The project currently has only GitHub defaults for `Status` (`Todo`, `In Progress`, `Done`). Adding fields or options requires explicit remote-change approval.

### Proposed label mapping

Reuse existing labels where they fit: `bug`, `documentation`, and `enhancement`. Add only the missing bounded taxonomy after approval: `slice`, `architecture`, `build`, `device`, `release`, `blocked`, `security`, `visual`, `audio`, and `backend`.

Existing generic labels such as `accessibility`, `duplicate`, `good first issue`, `help wanted`, `invalid`, `question`, and `wontfix` remain available but should not replace slice, gate, or risk metadata.

No milestones, issues, PRs, or project items currently exist. Milestone design is deferred until the slice list and launch timing are approved.

## Branch and worktree findings

- Current branch: `main`.
- Remote tracking: `origin/main`; local `main` matches the pushed remote commit.
- Worktrees: one worktree at the repository root.
- Other branches: no additional local or remote branches found during this audit.
- Pull requests: none found.
- Issues: none found.
- The worktree is dirty with pre-existing `.DS_Store`, novel, screenplay, copyright, notes, and animation changes. These are outside `BAEBE-TRACK-001` and must remain untouched.
- No branch/worktree cleanup is authorized or required for the documentation slice. Future bounded implementation slices should use one branch and PR per slice.

## Documentation and archive decisions

- The active set is `README.md`, `AGENTS.md`, `docs/README.md`, `docs/active/PRODUCT_PRD.md`, `docs/active/CANONICAL_ROADMAP.md`, and `docs/active/ARCHITECTURE_CONTRACT.md`, with the scoped `BAEBE_LAUNCH` authorities retained.
- No historical document was moved. Existing `gtm/archive/`, `notes/plot/archive-plot/`, `_archive/`, and other reference directories preserve provenance today.
- Archive migration is a future slice requiring a path map, reference/superseded/archived status, link repair, and validation before moving anything.
- Existing `implementation_plan*.md`, `MONETIZATION*.md`, `gtm/`, `legal/`, `copyright/`, and creative planning files are not silently promoted to active authorities.

## BDD for this tracking slice

### Authority set

**Given** the repository has mixed historical plans and no active tracking set
**When** this slice is prepared
**Then** exactly one canonical roadmap, one product authority, one architecture contract, one navigation index, and one project-specific `AGENTS.md` are present.

### Dirty-worktree safety

**Given** unrelated creative files are modified or untracked
**When** the tracking documents are created
**Then** unrelated files remain unchanged, unstaged, and uncommitted.

### Remote authorization boundary

**Given** the GitHub Project exists but has no items and remote issue/field/label changes are not authorized
**When** the local tracking process is prepared
**Then** the roadmap records the proposed mapping and the remote project remains unchanged.

### Slice mapping

**Given** a bounded slice is approved
**When** its GitHub issue is created later
**Then** the issue contains the slice ID, authority link, dependencies, BDD scenarios, evidence, stop conditions, and readiness vocabulary, and the project item maps to that issue.

## Current implementation evidence

This documentation slice is local and prepared, not committed or pushed. The existing `BAEBE_LAUNCH` planning folder is already committed and pushed in `1a21ed4`. No product code, historical creative file, secret, remote issue, project field, project item, label, milestone, branch, worktree, PR, or permission was changed by this tracking-process slice.

## Remaining risks and next actions

1. Ryan must review and approve the active authority hierarchy and initial slices.
2. Ryan must explicitly authorize any remote project-field, label, issue, milestone, or project-item changes.
3. Canon and manuscript sources remain unresolved until the `BAEBE-CANON-002` slice is approved.
4. Copyright/IP status remains unverified until the `BAEBE-IP-003` checkpoint has evidence.
5. The Vite-to-Next.js architecture decision remains open.
