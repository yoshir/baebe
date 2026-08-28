# BAEBE Launch Strategy

**Status:** Draft canonical authority — approval required before implementation
**Owner:** Ryan
**Last updated:** 2026-08-28
**Scope:** Publishing, copyright/IP checkpoints, audience growth, discovery, distribution, content operations, launch velocity, and bestseller strategy

## Authority and non-goals

This document is the single decision authority for Baebe's launch strategy. It owns scope, sequencing, dependencies, gate definitions, distribution posture, budget posture, and the meaning of “ready.”

It does not replace the private creative canon, the manuscript, screenplay authority, an attorney, a filing confirmation, a platform agreement, or an application implementation plan. A plan, draft, generated derivative, or local code change is not proof of publication, filing, payment, deployment, or public release.

`TODO.md` is the dependency-ordered work queue. `IP_REGISTER.md` is the release-rights and copyright checkpoint record. `CONTENT_ENGINE.md` is the proposed technical shape for a future system. Accepted decisions in those documents must be reconciled back into this strategy.

The repository-wide execution authority is [`../docs/active/CANONICAL_ROADMAP.md`](../docs/active/CANONICAL_ROADMAP.md). This document remains the scoped launch-strategy authority and must not become a second repository roadmap.

## The commercial thesis

Baebe's primary commercial product is a finished **90,000–105,000-word science-fiction thriller**. The novel is the first complete, ownable, distributable expression of the property and the foundation for every later adaptation conversation.

The screenplay, anime, and live-action paths remain open. They are not competing launch products that dilute the novel's completion; they are adaptation paths preserved by protecting the underlying story, tracking contributions and licenses, and keeping the world and visual language legible across formats.

The growth strategy is to accumulate legitimate reader demand before publication, then concentrate that demand around a coordinated launch window. The primary growth target is **100,000 readers**. **NYT Bestseller-level launch velocity** is the stretch target: an ambition and operating design target, not a guarantee or a claim that can be forecast without verified audience, preorder, retailer, and reporting evidence.

## Agreed strategy

### 1. Protect the work before major public story releases

Complete the copyright/IP checkpoint before releasing a major chapter package, full public serialization, or other story material that materially exposes the work. The checkpoint must identify the manuscript version, human authorship, contributors, licenses, AI-assisted or AI-generated material, deposit copy, owner/claimant, release boundary, and evidence retained.

The default sequence is:

1. Freeze a dated manuscript candidate and its revision identity.
2. Prepare the appropriate copyright deposit and authorship/rights ledger.
3. Obtain any needed attorney review and make the filing decision.
4. Retain the exact submitted copy, receipt, case number, correspondence, and certificate when available.
5. Authorize only the approved public derivative set.
6. Reassess registration coverage at material manuscript expansion and completion, and register the screenplay and finished film as distinct works when those fixed works exist.

No document in this repository may call the work “filed,” “registered,” or “protected by registration” without the corresponding evidence record. The current `copyright/README.md` is a strong planning reference, but the repository audit did not establish a filing confirmation or certificate. The `[x]` line in `legal/Action-Checklist.md` is therefore not accepted as launch evidence by itself.

### 2. Finish the novel as the primary product

The manuscript is the center of gravity. Writing, revision, structural editing, copyediting, continuity, sensitivity/context review where appropriate, cover/package development, metadata, and production quality outrank premature channel complexity.

The launch system should support serialization and discovery without allowing daily derivative production to consume the time needed to finish the book. Public excerpts, transmissions, trailers, and chapter releases must be selected from approved source assets and must not accidentally publish unreleased twists, private canon, or material reserved for the final edition.

### 3. Preserve the adaptation path

The novel launch should create a clean rights and story record that can support:

- a screenplay or feature treatment;
- anime or animated-series development;
- live-action development;
- interactive or audiovisual experiences;
- future audio, visual, or game adaptations where rights and economics justify them.

The adaptation path is preserved through disciplined source control, not by publicly releasing every development document. Private treatments, visual bibles, unreleased character information, and adaptation-specific materials remain private until individually cleared.

### 4. Make the discovery site the central owned surface

The target is a Next.js-based discovery and lead-generation system that owns the primary public information architecture: the premise, approved transmissions, reader entry points, email capture, launch updates, press/influencer landing pages, retail links, and attribution-aware campaign destinations.

The repository audit changes the immediate implementation assumption: **there is currently no Next.js application in this repository.** The main interactive surface is a Vite + React + TypeScript prototype at `baebe-landing-ag/baebe---interactive-cyberpunk-experience 2`. The site decision is therefore a gated architecture choice:

- reuse its terminal, boot, cutscene, email-capture, audio, and interaction language through an incremental port or route migration; or
- retain it as a bounded standalone experience while building a separate Next.js discovery shell.

No choice is made by this planning slice. The decision must account for reuse, content security, ownership, build/deployment, durable lead storage, analytics, SEO, accessibility, and the cost of maintaining two public surfaces.

### 5. Use Substack for serialization and early audience development

Substack is the serialization, audience-development, and early-monetization channel. It should receive an approved release calendar, selected chapter or excerpt packages, author notes where appropriate, and clear paths back to the owned discovery site and eventual retail launch.

Substack is not the private canon repository and is not the sole audience record. Subscriber/export/consent handling, attribution, and platform-term review remain required. Platform terms and capabilities must be rechecked at execution time.

### 6. Build a canon-aware content engine

One approved source asset should be able to produce controlled derivatives for:

- the discovery site;
- Substack;
- email;
- Instagram;
- TikTok;
- YouTube Shorts;
- ARG/transmissions.

The source asset must carry a stable identity, source revision, rights status, spoiler level, approved channels, intended audience, call to action, attribution fields, and human approval state. The engine may transform approved material; it may not decide that private canon is public or publish without the required approval gate.

Automation should cover generation, transformation, resizing, captioning, scheduling, attribution, analytics collection, and reporting wherever platform APIs and account permissions permit. Human time should remain concentrated on writing/directing, approving content, community interaction, influencer/press relationships, interviews/podcasts, and strategic decisions.

### 7. Default to wide distribution

The default publishing posture is:

- **KDP** for Amazon reach and operational simplicity;
- **Ingram** for wider print distribution and bookstore/library access;
- **wide ebook and audio distribution** unless a compelling, documented, rights-aware reason supports exclusivity.

Any exclusive arrangement must be a documented decision that compares incremental reach, cash flow, discoverability, rights duration, territorial limits, reporting, reversibility, and adaptation implications. Exclusivity is not the default merely because a platform is easy to use.

### 8. Keep the operating budget lean

Recurring software and marketing spend should remain approximately **$100/month** until traction justifies additional spending. Free tiers, existing tools, manual review, and narrowly scoped automation are preferred during validation.

Spend increases require evidence: list growth, conversion, retention, content efficiency, sales, preorder behavior, or a documented launch requirement. One-time copyright, professional legal, editorial, production, or distribution costs are separate decisions and must not be hidden inside the recurring operating budget.

## Proposed audience funnel

```text
Private canonical source
        ↓
Approved source asset + rights/spoiler/attribution metadata
        ↓
Human approval gate
        ↓
Owned discovery site ───────→ lead capture and first-party attribution
        ↓                                      ↓
Substack serialization ─────→ email/community relationship
        ↓                                      ↓
Approved channel derivatives ────────────────┘
        ↓
Preorders and coordinated wide retail launch
        ↓
Sales, reader, and channel reporting → next strategic decision
```

The site is the owned discovery and conversion surface. Substack is the serialization and early monetization surface. Social/video/ARG channels are discovery and re-engagement surfaces. KDP, Ingram, and wide ebook/audio retailers are product-distribution surfaces. None of these channels is allowed to become the private canon authority.

## Human/system operating model

### Ryan owns

- writing and final story decisions;
- directing the visual, sonic, and audience experience;
- approving public content and launch timing;
- deciding what remains private;
- community interaction and reader trust;
- influencer, press, interview, and podcast relationships;
- rights, licensing, exclusivity, and strategic decisions;
- final publication, payment, filing, submission, and public-release authorization.

### The system may prepare

- derivative drafts from approved assets;
- alternate crops, captions, subtitles, subject lines, descriptions, and metadata;
- channel-specific formatting and queues;
- UTM/content IDs and attribution links;
- analytics collection and normalized reports;
- consistency checks for names, spoiler labels, rights status, and source revision;
- draft schedules and launch dashboards.

### The system must not do without approval

- publish unreleased story material;
- expose the private canon to an unapproved external processor;
- make ownership, authorship, licensing, or AI-disclosure claims;
- file copyright or trademark applications;
- spend money, accept platform terms, or create paid campaigns;
- send press/influencer outreach as Ryan;
- declare a manuscript ready, a launch successful, or a bestseller achieved.

## Dependency-ordered phases

### Phase 0 — Authority, canon, and rights checkpoint

Freeze the authority boundaries, reconcile the manuscript/story sources, establish the private canon packet, identify the 90–105K candidate, and complete the copyright/rights checkpoint before a major public story release.

**Exit evidence:** approved strategy; source map; dated manuscript candidate; authorship/contributor/AI ledger; filing decision and retained evidence; public derivative boundary.

### Phase 1 — Product completion

Complete the novel, editing, continuity, packaging, cover, metadata, accessibility, and adaptation-safe rights records. Keep the screenplay/anime/live-action paths preserved without allowing them to block novel completion unless a specific decision makes them co-dependent.

**Exit evidence:** finished release candidate; production files; retail metadata; rights/credit records; launch date window.

### Phase 2 — Owned discovery and lead system

Resolve the Vite-versus-Next.js architecture choice. Reuse the existing terminal/cutscene language where it helps. Establish durable lead capture, consent, first-party identifiers, SEO/discovery routes, accessibility, and a reliable path to Substack and retail destinations.

**Exit evidence:** approved architecture; local implementation evidence; privacy/security review; test lead capture; analytics event map; no secret exposure.

### Phase 3 — Serialization and audience accumulation

Launch or refine Substack only after the release boundary is approved. Accumulate readers through consistent serialization, approved transmissions, owned-site discovery, email, social/video derivatives, community interaction, and relationship-based outreach.

**Exit evidence:** verified channel accounts/terms; release calendar; approval queue; attribution links; baseline conversion and retention reporting; budget check.

### Phase 4 — Prelaunch demand concentration

Coordinate cover reveal, excerpt/transmission sequence, preorder or notification path, press/influencer materials, interviews, podcast appearances, reader activation, retailer metadata, and wide-distribution setup.

**Exit evidence:** final release files; retailer readiness; launch calendar; legitimate reader-demand signals; press/community packet; contingency plan.

### Phase 5 — Launch and reporting

Concentrate legitimate demand in the release window, keep channel messaging consistent, monitor retailer and reader signals, respond to the community, and report what is verified. Do not manufacture reviews, manipulate rankings, or claim bestseller status without qualifying evidence.

**Exit evidence:** retailer reports; reader/list growth; attribution; revenue/cost summary; lessons; next decision.

### Phase 6 — Adaptation and long-tail growth

Use verified audience and product evidence to support screenplay, anime, live-action, audio, interactive, or licensing conversations. Preserve ownership and avoid trading away adaptation optionality without a documented rights decision.

## Current repository findings that change the strategy

1. **No Next.js app exists.** There is no `next` dependency, `next.config.*`, App Router, Pages Router, or Next hosting configuration in the repository.
2. **The current interactive landing experience is Vite + React + TypeScript.** It uses `App.tsx` as the stateful orchestrator, `constants.ts` for hard-coded content, and components for boot, cutscenes, terminal interaction, email capture, and audio effects.
3. **Lead capture is not durable.** Email verification is mocked in the browser; the submitted email stays in React state and is not sent to a provider or database.
4. **Monetization is not real.** Subscription/payment is simulated, and the presale path opens `https://example.com/presale` as a placeholder.
5. **Progress and analytics are local-only.** Shards, reading progress, resonance, achievements, and time-on-site live in browser state; no durable identity, consent record, event pipeline, or reporting system was found.
6. **The app content is not a safe canon source.** Its hard-coded synopsis and chapter data contain older terminology, draft access rules, and a different commercialization model. It must be treated as a public prototype/reference until reconciled against the approved private canon.
7. **The Vite config exposes a secret-shaped value to the client build.** It maps `GEMINI_API_KEY` into client-visible definitions. No `.env.local` was read or modified, but this is a production security gate: private provider keys must remain server-side or in an approved secret manager.
8. **The repository has multiple historical strategy authorities.** Existing `gtm/`, monetization, legal, copyright, landing, novel, and screenplay documents are valuable evidence but contain conflicting dates, targets, assumptions, and status language. `BAEBE_LAUNCH` must be reconciled before any old checklist is treated as current.
9. **The worktree is already dirty.** Existing novel, screenplay, copyright, notes, animation, and `.DS_Store` changes are unrelated to this planning slice and must remain untouched.

## Decisions required before implementation

- Approve `BAEBE_LAUNCH` as the canonical launch authority.
- Approve the private-canon/public-derivative firewall.
- Confirm the current 90–105K manuscript candidate and release status.
- Confirm the copyright filing checkpoint and evidence standard.
- Choose the Next.js migration posture for the existing Vite experience.
- Approve lead provider, analytics, privacy, and attribution boundaries.
- Approve Substack serialization scope and cadence.
- Approve wide-distribution defaults and any exceptions.
- Approve any operating-budget increase beyond approximately $100/month.

## Readiness vocabulary

- **Planned:** described here, not implemented.
- **Prepared:** draft or packet exists locally and awaits review.
- **Approved:** Ryan has approved the bounded decision or content packet.
- **Filed/submitted/paid/published:** only when the external action and evidence are verified.
- **Ready for implementation:** architecture and dependencies are approved; no claim about launch readiness.
- **Launch-ready:** product, rights, distribution, channel, demand, and operational gates are all evidenced.
- **Bestseller:** a qualifying external result, never a planning assumption.

## Planning-slice evidence

On 2026-08-28, the repository was inspected before this planning folder was created. The audit confirmed the current Git worktree was already dirty and preserved all unrelated changes. It found no Next.js application, Next.js configuration, backend lead store, durable analytics pipeline, platform adapter, or verified filing record.

The bounded deliverable is now present as:

- `BAEBE_LAUNCH/README.md`
- `BAEBE_LAUNCH/TODO.md`
- `BAEBE_LAUNCH/STRATEGY.md`
- `BAEBE_LAUNCH/IP_REGISTER.md`
- `BAEBE_LAUNCH/CONTENT_ENGINE.md`

Validation completed: all five requested files are present, the new Markdown has no trailing whitespace, and the tracked worktree diff has no whitespace errors. No application code, marketing integration, platform account, public release, payment, filing, or secret file was modified. The plan remains blocked at the approval gate described in `TODO.md` order 1.
