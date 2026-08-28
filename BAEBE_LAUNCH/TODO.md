# BAEBE Launch TODO

**Status:** Dependency-ordered planning backlog
**Authority:** [`STRATEGY.md`](./STRATEGY.md)
**Current gate:** Planning only. No marketing-system implementation is authorized until Ryan approves the strategy and architecture.

Each task has one primary ownership label:

- `[AUTO]` Cursor/Next.js or the approved system can automate it.
- `[HUMAN]` Ryan must decide, create, approve, communicate, file, pay, or publish it.
- `[HYBRID]` the system prepares a bounded draft or analysis and Ryan approves it.
- `[BLOCKED]` an external, legal, account, rights, architecture, or approval dependency must be cleared first.

## Execution order

| Order | Task | Dependency / completion condition |
|---:|---|---|
| 1 | `[HUMAN]` Approve `BAEBE_LAUNCH` as the canonical authority for publishing, IP checkpoints, audience growth, distribution, and bestseller strategy. | Ryan approves scope and authority boundaries in `STRATEGY.md`. |
| 2 | `[HUMAN]` Confirm the private canonical story source and the current 90–105K manuscript candidate. | One named manuscript/source packet is selected; competing drafts remain reference. |
| 3 | `[HYBRID]` Reconcile `Outline.md`, novel notes, screenplay materials, app `constants.ts`, and relevant historical strategy documents into a source map. | Each source is marked canonical candidate, public prototype, reference, superseded, or unresolved; contradictions are listed. |
| 4 | `[HUMAN]` Freeze a dated manuscript release candidate and record word count, version identity, authorship, contributors, and intended publication status. | The candidate is complete enough for a rights/copyright checkpoint; unknowns are explicit. |
| 5 | `[HYBRID]` Prepare the IP/copyright packet: deposit copy, revision record, human-authorship/AI ledger, contributor/license inventory, and public-release boundary. | `IP_REGISTER.md` has a complete packet checklist and every missing item has an owner. |
| 6 | `[BLOCKED]` Complete the copyright filing checkpoint before a major public story release. | Blocked until the manuscript packet is frozen, ownership/AI/contributor questions are reviewed, and Ryan authorizes the filing decision; retain external evidence if filed. |
| 7 | `[HUMAN]` Approve the private-canon/public-derivative policy, spoiler levels, and the list of materials allowed for serialization and marketing. | Ryan approves the release taxonomy and escalation rules. |
| 8 | `[HYBRID]` Decide whether to incrementally port the existing Vite experience into a Next.js discovery shell or retain it as a bounded standalone experience. | Architecture decision records reuse, security, SEO, accessibility, deployment, maintenance, and migration cost. |
| 9 | `[AUTO]` Define and validate the approved source-asset manifest shape against representative Baebe assets. | A dry-run manifest carries source ID, revision, rights, spoiler, channels, CTA, attribution, and approval state without publishing. |
| 10 | `[HYBRID]` Design the owned-site information architecture, lead-capture boundary, consent model, attribution IDs, and analytics event map. | Provider-neutral design is reviewed for privacy, security, durable storage, and low operating cost. |
| 11 | `[HUMAN]` Confirm Substack publication identity, serialization scope, cadence, pricing, terms review, and relationship to the owned site. | Ryan approves the editorial and monetization posture; no story release happens before the IP gate. |
| 12 | `[BLOCKED]` Resolve the lead provider, analytics, and hosting accounts. | Blocked until Ryan approves providers, budget, data handling, and secret-management approach. |
| 13 | `[AUTO]` Extract reusable presentation pieces from the current Vite app: terminal, boot sequence, cutscenes, email-capture UX, audio language, and command interaction. | A migration inventory identifies what can move without carrying mock payment, old canon, or insecure secret handling. |
| 14 | `[AUTO]` Build the approved content repository/manifest reader for the chosen site architecture. | The system can render only approved public assets and rejects missing rights, spoiler, or approval metadata. |
| 15 | `[HYBRID]` Create the first discovery-site content package: premise, author/project framing, approved transmission, reader CTA, email promise, and retail/serialization links. | System drafts; Ryan approves copy, imagery, claims, and spoiler boundary. |
| 16 | `[AUTO]` Generate channel-specific derivative drafts from the approved source asset for Next.js, Substack, email, Instagram, TikTok, YouTube Shorts, and ARG/transmissions. | Outputs retain source identity, attribution, rights, spoiler level, and draft status; no automatic public send. |
| 17 | `[HYBRID]` Review and approve the derivative package and schedule. | Ryan approves every public campaign batch, with exceptions only for a later documented low-risk policy. |
| 18 | `[AUTO]` Add platform adapters and scheduling only where APIs, permissions, terms, and rate limits support reliable operation. | Each adapter has dry-run, retry, idempotency, audit, failure, and manual fallback behavior. |
| 19 | `[AUTO]` Normalize first-party attribution and channel analytics into a reporting model. | Reports connect source asset, derivative, channel, CTA, campaign, lead, reader action, and cost without exposing private canon. |
| 20 | `[HYBRID]` Run a small content-and-lead pilot under the approximately `$100/month` operating budget. | Ryan reviews deliverability, consent, conversion, content quality, workload, and failure modes before expansion. |
| 21 | `[HUMAN]` Prepare retail metadata, cover/package files, ISBN/distribution decisions, and wide-release setup for KDP, Ingram, and wide ebook/audio. | Product is final enough for accurate metadata; any exclusivity exception is documented and approved. |
| 22 | `[BLOCKED]` Open or finalize retailer/distributor accounts and upload release files. | Blocked until final manuscript/package, rights, metadata, accounts, and Ryan's explicit external-submission approval are complete. |
| 23 | `[HYBRID]` Build the prelaunch demand calendar around serialization, approved derivatives, email, community, press, influencer, interview, and podcast opportunities. | Calendar is source-linked, attribution-aware, rights-cleared, and timed to the launch window. |
| 24 | `[HUMAN]` Conduct community interaction, relationship-based outreach, interviews, podcasts, and strategic partnerships. | Ryan personally handles trust-sensitive communication; the system may prepare briefs and drafts. |
| 25 | `[AUTO]` Produce launch-week dashboards and daily/weekly reports. | Dashboard separates verified sales/readers/leads from estimates, projections, and unavailable evidence. |
| 26 | `[HYBRID]` Review launch performance and decide whether additional spend, content, distribution, or adaptation work is justified. | Decision records actual evidence, cost, risks, and next action in `STRATEGY.md`. |
| 27 | `[BLOCKED]` Pursue bestseller-level launch velocity or adaptation conversations. | Blocked until the novel, rights, distribution, audience evidence, and relationship/market gates support the specific outreach or claim. |

## Stop conditions

- Stop public story release when the relevant IP checkpoint is incomplete.
- Stop automated generation when the source asset lacks approval, rights, spoiler, or attribution metadata.
- Stop external API work when provider terms, credentials, permissions, or data handling are unresolved.
- Stop budget expansion when traction evidence does not justify it.
- Stop bestseller or adaptation claims when the underlying external evidence is not verified.
