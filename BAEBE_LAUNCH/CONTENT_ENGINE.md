# BAEBE Canon-Aware Content Engine

**Status:** Architecture proposal — not implemented
**Authority:** [`STRATEGY.md`](./STRATEGY.md)
**Scope:** Reuse of the existing discovery experience and a future approved-source pipeline for Next.js, Substack, email, social/video, ARG/transmissions, attribution, analytics, and reporting

This document proposes the smallest architecture that can support Baebe's launch strategy. It does not authorize application changes, provider accounts, platform API integrations, public posting, paid marketing, or exposure of private canon.

## Architectural finding first

The repository does **not** currently contain a Next.js application. The existing public-facing experience is a Vite + React + TypeScript app at:

`baebe-landing-ag/baebe---interactive-cyberpunk-experience 2`

Its current structure is useful but not yet a content engine:

- `App.tsx` owns the boot-to-terminal experience, user state, progression, cutscene transitions, local timer, command handling, and monetization simulations.
- `components/BootSequence.tsx`, `Cutscene.tsx`, `Terminal.tsx`, and `EmailCapture.tsx` contain reusable interaction and visual language.
- `constants.ts` contains hard-coded chapters, interludes, lost chapters, synopsis text, access rules, and shard rewards.
- `types.ts` has a simple `ContentItem` and browser-only `UserProgress` model.
- `utils/audioEffects.ts` contains client-side atmospheric audio effects.
- `EmailCapture.tsx` simulates verification; it does not send or persist an email.
- `App.tsx` simulates subscription/payment and uses a placeholder presale URL.
- The Vite config places `GEMINI_API_KEY` into client build definitions. A production engine must never move provider secrets into browser-visible code.
- No durable CMS/content store, public API, lead database, analytics pipeline, scheduler, platform adapter, or Next.js hosting configuration was found.

## Target architecture

```text
Private canon and rights records
             │
             ▼
Approved source-asset manifest
             │
             ├── validation: rights / spoiler / attribution / approval
             ▼
Derivative preparation layer
             │
             ├── Next.js discovery pages
             ├── Substack serial package
             ├── email package
             ├── Instagram package
             ├── TikTok package
             ├── YouTube Shorts package
             └── ARG / transmission package
             │
             ▼
Human approval queue
             │
             ▼
Channel adapters and schedules
             │
             ▼
Publication evidence + attribution events
             │
             ▼
Normalized analytics and reporting
             │
             └── strategy decisions and next approved source assets
```

The essential invariant is **one approved source asset, many controlled derivatives**. The system may transform a source; it may not invent public authority, bypass the rights checkpoint, or publish directly from private canon.

## Ownership boundaries

### Private canon and rights layer

Stores or references the complete manuscript, unreleased story decisions, source files, contributor records, licenses, AI-use records, and release restrictions. It is not a public runtime dependency. External processing is opt-in and bounded to the approved source asset.

### Approved source-asset layer

Creates a stable, versioned handoff from editorial work to distribution work. It should contain the minimum text/media needed for the approved derivative batch, not the entire story bible.

Suggested record:

```ts
type ApprovedSourceAsset = {
  id: string;
  work: "novel" | "screenplay" | "film" | "transmission" | "campaign";
  sourceRevision: string;
  title: string;
  material: string | AssetReference[];
  status: "draft" | "approved" | "published" | "blocked";
  rightsStatus: "unverified" | "cleared" | "restricted";
  humanAuthorshipStatus: "unverified" | "recorded" | "review-needed";
  aiUseRecord?: string;
  spoilerLevel: "hook" | "premise" | "early-story" | "major-reveal" | "private";
  approvedChannels: Channel[];
  approvedWindow?: { start: string; end?: string };
  audience: "new-reader" | "subscriber" | "reader" | "press" | "industry";
  callToAction: string;
  attribution: string;
  sourceOfTruthNote: string;
  approvedBy?: string;
  approvedAt?: string;
};
```

The exact implementation language and storage location are decisions for the approved architecture. The fields are the contract; a database, Markdown front matter, JSON, or CMS is an implementation detail.

### Transformation layer

Prepares derivatives without changing the source's story meaning or rights boundary. It may produce:

- shortened copy and channel descriptions;
- subject lines, preview text, and email blocks;
- SEO title/description/open-graph fields;
- social captions, hooks, alt text, and hashtags;
- vertical crops, subtitles, transcript excerpts, and short-form edits;
- terminal/transmission formatting and clue packaging;
- retailer-safe copy where the source and rights permit it.

Every output retains its source asset ID and becomes a draft until approved. The transformation layer must flag unsupported claims, missing credits, spoiler mismatches, names that disagree with the source, and any output that tries to use a private asset.

### Owned discovery layer

The target Next.js site should own:

- a clear Baebe premise and reader promise;
- approved transmissions and entry points;
- email capture with consent and a durable provider boundary;
- serial/release navigation and links to Substack;
- preorder and retail destinations;
- press/influencer landing pages;
- SEO, social previews, accessibility, and first-party attribution;
- a bounded interactive “terminal” experience if the current UI is migrated.

The current Vite experience should be treated as a reusable presentation layer, not as the future data or rights authority. If migrated, preserve its strongest language—boot sequence, terminal, cutscene rhythm, sound, and discovery interaction—while removing or isolating mock payment, old canon, browser-only identity, and insecure secret handling.

### Channel adapter layer

| Channel | Role | Derivatives | Automation boundary |
|---|---|---|---|
| Next.js | Owned discovery and lead generation | Pages, transmissions, SEO metadata, CTA variants, interactive entry points | Publish only approved assets; store durable lead/consent and attribution through approved services |
| Substack | Serialization, audience development, early monetization | Chapter/episode post, note, excerpt, bonus, email-compatible package | Prepare drafts and links; publish/schedule only when account/API/terms support it and Ryan approves |
| Email | Direct reader relationship and launch activation | Welcome, serial notification, excerpt, preorder, launch sequence | Automate delivery and segmentation after consent; Ryan owns sensitive replies and claims |
| Instagram | Visual discovery and re-engagement | Carousel, caption, Reel, cover/character/world fragment | Resize/caption/queue where supported; preserve credits and spoiler labels |
| TikTok | Hook and discovery | Vertical short, caption, sound/context, CTA | Prepare variations and schedule where supported; human review remains required |
| YouTube Shorts | Searchable short-form discovery | Short, title, description, subtitles, CTA | Render/package/report automatically where supported; approval before upload |
| ARG/transmissions | Narrative participation and retention | Terminal drops, clues, encoded messages, timed transmissions | System can format and queue; Ryan approves canon implications and puzzle state |
| KDP/Ingram/wide ebook/audio | Product distribution | Metadata, files, cover, retailer links | Validate package and report status; external upload/terms/price decisions are human-gated |

## Reuse plan

### Reuse directly or conceptually

- `BootSequence.tsx`: preserve the staged onboarding/identity experience as a possible discovery entry point.
- `Cutscene.tsx`: preserve the short cinematic reveal pattern for approved transmissions.
- `Terminal.tsx`: preserve command-driven discovery and the cyberpunk visual language.
- `EmailCapture.tsx`: preserve the user experience concept, but replace mock verification with a durable, consent-aware provider flow after the provider decision.
- `utils/audioEffects.ts`: preserve ambient interaction where browser policy, accessibility, and performance allow it.
- `ContentItem` shape in `types.ts`: use as a migration clue, not as the final rights-aware source schema.

### Do not carry forward without review

- hard-coded old synopsis, chapters, interludes, and character/status claims;
- browser-only `UserProgress` as an audience or subscription record;
- simulated payment success and `$10/month` access logic;
- `https://example.com/presale` placeholder;
- unverified email-code flow;
- client-visible provider-key definitions;
- assumptions that all content is free, paid, locked, or public;
- the current “i0” and older canon terminology until reconciled against the approved source.

### Other repository surfaces

- `novel/viewer` is an Express-based reader, not Next.js. It may be a reference or future reading surface, but it should not be fused into the launch engine without a separate content-security and access-control review.
- `baebe-landing-investor-ag` is a static HTML/JavaScript investor/novel surface, not a Next.js app. Reuse visual or copy ideas only after source and rights review.
- Existing `gtm/`, `legal/`, `copyright/`, novel, and screenplay files remain source/reference material with mixed status; the engine consumes only approved asset packets.

## Data flow and controls

1. Ryan or the approved editorial workflow creates or selects a source asset.
2. The rights layer attaches work identity, revision, authorship/AI record, spoiler level, approved channels, and attribution.
3. A validator rejects missing or blocked metadata before transformation.
4. The transformation layer generates channel drafts and records provenance.
5. Ryan reviews the derivative batch and approves, rejects, or edits it.
6. Channel adapters publish or schedule only approved derivatives.
7. The system records publication evidence, content IDs, destination URLs, timestamps, and UTM/attribution identifiers.
8. Analytics normalizes events without pulling private canon or sensitive contributor records into public reports.
9. Reporting feeds the next strategy decision; it does not silently rewrite the strategy.

## Security, privacy, and rights requirements

- Never read, print, commit, or expose `.env.local` or any secret value.
- Keep provider keys server-side or in an approved secret manager; never inject them into client bundles.
- Keep private canon out of public prompts, public builds, client bundles, logs, analytics payloads, and third-party tools unless the bounded use is approved.
- Store only the lead and consent data required for the chosen workflow.
- Record consent source, timestamp, purpose, and unsubscribe state where the provider supports it.
- Use stable content and campaign IDs rather than embedding private filenames or story details in URLs.
- Track contributor credits, licenses, releases, and AI-service commercial-use terms for every public asset.
- Provide a manual fallback for every automated adapter and an audit trail for retries or duplicate prevention.
- Do not automate replies that could make legal, ownership, health, political, or personal claims on Ryan's behalf.

## Rollout sequence after approval

### Stage 0 — Dry-run only

Define source-asset metadata, map current files, reconcile canon, and generate derivative drafts to local review artifacts. No API accounts, uploads, public sends, or application changes.

### Stage 1 — Owned discovery foundation

Resolve the Vite/Next.js decision, establish the approved content reader, implement the first discovery route and durable lead boundary, and migrate only the minimum reusable interactive pieces.

### Stage 2 — One-channel pilot

Run one approved Substack/email or site-to-email loop with attribution, consent, manual approval, reporting, and the approximately `$100/month` budget constraint.

### Stage 3 — Controlled derivatives

Add social/video/ARG outputs and adapters one at a time. Each adapter must pass dry-run, duplicate, failure, rights, and reporting checks before use.

### Stage 4 — Launch operations

Connect the approved prelaunch calendar, retailer links, wide-distribution package, launch dashboard, community workflow, press/influencer packet, and reporting cadence.

## Non-goals for this slice

- No Next.js application creation.
- No marketing automation implementation.
- No platform account creation or API integration.
- No public story release or Substack launch.
- No payment, preorder, retailer upload, filing, or external submission.
- No modification of the current Vite app.
- No secret inspection or migration.
