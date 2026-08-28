# Baebe Architecture Contract

**Status:** Draft active architecture contract — no implementation authorized by this document alone
**Authority:** [`CANONICAL_ROADMAP.md`](./CANONICAL_ROADMAP.md) owns repository sequencing and gates
**Scope:** Ownership, data flow, lifecycle, failure, security, privacy, and public-content boundaries for Baebe's future discovery/content system
**Superseded documents:** None; `BAEBE_LAUNCH/CONTENT_ENGINE.md` is a scoped proposal referenced by this contract

## Target boundary

```text
Private canon and rights records
        ↓
Approved source asset
        ↓
Rights / spoiler / attribution / approval validation
        ↓
Derivative preparation
        ↓
Human approval
        ↓
Channel adapters and schedules
        ↓
Publication evidence and attribution events
        ↓
Normalized analytics and reporting
```

The invariant is **one approved source asset, many controlled derivatives**. A derivative may be shortened, reformatted, captioned, cropped, or translated within its approved rights boundary. It may not promote private canon to public authority, change story meaning without review, or publish without approval.

## Current implementation boundary

- No Next.js application, Next configuration, durable content store, lead database, analytics pipeline, scheduler, or platform adapter exists in the repository.
- The main interactive discovery prototype is Vite + React + TypeScript at `baebe-landing-ag/baebe---interactive-cyberpunk-experience 2`.
- `App.tsx` is the stateful orchestrator; `constants.ts` contains hard-coded content; the reusable presentation pieces include boot, cutscene, terminal, email-capture, and audio-effects components.
- Email verification, subscription/payment, and presale behavior are simulated or placeholder-only. Browser-local progress is not an audience system.
- The Vite config currently maps a `GEMINI_API_KEY` value into client-visible build definitions. No provider secret may cross the browser boundary.
- `novel/viewer` is an Express-based private reader with session/password controls; it is not the public discovery architecture.

## Ownership boundaries

### Private canon and rights layer

Owns manuscripts, unreleased chapters, screenplay/treatment development, reveal maps, contributor records, licenses, releases, AI-use records, and internal strategy. It is never a public runtime dependency.

### Approved source-asset layer

Owns the handoff from editorial work to distribution work. Each asset needs a stable ID, source revision, work type, rights status, authorship/AI status, spoiler level, approved channels, audience, CTA, attribution, and approval evidence.

### Transformation layer

Owns bounded derivative preparation and provenance. It must flag missing rights, unsupported claims, spoiler mismatch, inconsistent names, missing credits, and attempts to use private assets.

### Public channel layer

Owns only approved derivatives for the Next.js discovery target, Substack, email, Instagram, TikTok, YouTube Shorts, ARG/transmissions, and eventual retail links. No channel becomes the canon authority.

### Analytics layer

Owns first-party attribution and aggregate reporting. It must not ingest complete private canon, contributor agreements, or unnecessary personal data.

## Lifecycle and failure behavior

Asset states are `draft → approved → scheduled → published` with `blocked` available from any state. A rejected or expired asset returns to `draft` or `blocked`; it never silently publishes an older version.

The system must fail closed when rights, approval, spoiler, attribution, consent, credentials, provider permissions, or destination identity is missing. Every adapter needs dry-run, idempotency, retry, audit, and manual fallback behavior.

## Security and privacy invariants

- Secrets stay server-side or in an approved secret manager; never in client bundles, public content, logs, URLs, or analytics events.
- Private canon is not sent to an external processor unless the bounded use is approved and documented.
- Lead capture records only the minimum necessary address, consent purpose, timestamp, source, attribution, and unsubscribe state.
- Public IDs do not reveal private filenames, contributor records, or unreleased story structure.
- Platform terms, third-party licenses, AI-service terms, credits, releases, and commercial-use scope are recorded before publication.
- Public automation never makes legal, ownership, authorship, medical, political, or personal claims on Ryan's behalf.

## Architecture BDD

### Single public authority

**Given** a private canon file and an approved source-asset record both exist
**When** a public derivative is generated
**Then** the derivative references the approved asset ID and never reads directly from the private canon at runtime.

### Approval gate

**Given** a derivative is missing approval or has a blocked rights/spoiler state
**When** a channel adapter requests publication
**Then** publication is rejected with an auditable reason.

### Secret boundary

**Given** a provider key is required for a server-side operation
**When** the application is built for a browser
**Then** the key is absent from client-visible output and browser source.

### Version integrity

**Given** a source asset has revision `R1` and a later revision `R2` is approved
**When** a derivative is published
**Then** the publication evidence identifies the exact source and derivative revisions used.

### Adapter failure

**Given** a channel API times out or rejects a request
**When** the scheduler retries
**Then** the operation is idempotent, retains the failure evidence, and exposes a manual recovery path without duplicating a post.

## Non-goals

- This contract does not choose Next.js versus incremental Vite migration; that is a roadmap decision.
- It does not implement the marketing system, platform adapters, analytics, or lead provider.
- It does not define creative canon, copyright claims, trademark strategy, or contributor ownership.
- It does not authorize remote account changes, public release, spending, filing, or publication.

## Required exit evidence

- Approved architecture decision recorded in the canonical roadmap.
- BDD scenarios converted into regression coverage for each implemented failure mode.
- Focused tests plus proportionate build, browser, lifecycle, security, privacy, and deployment evidence.
- Final adversarial review of the final diff and actual public path.
