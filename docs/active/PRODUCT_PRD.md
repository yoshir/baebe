# Baebe Product PRD

**Status:** Draft active product authority — approval required before product implementation
**Authority:** [`CANONICAL_ROADMAP.md`](./CANONICAL_ROADMAP.md) owns repository scope and sequencing
**Scope:** Baebe's public discovery, reader-entry, lead-generation, and launch-support experience
**Superseded documents:** None; historical landing-page and GTM documents are references until reconciled

## Product promise

Give a prospective Baebe reader a compelling, legible entry into the world: understand the premise, encounter an approved transmission or excerpt, choose a meaningful next step, and remain connected for serialization and the eventual wide novel launch.

The experience should feel like an intentional threshold into Baebe's cinematic and cyberpunk language without making the public site the private canon repository or requiring the reader to understand the underlying production system.

## Users

- **New reader:** needs a clear hook, low-friction entry, and a reason to return.
- **Subscriber/serial reader:** needs reliable release navigation, email consent, and a consistent path to approved Substack material.
- **Press, influencer, or industry contact:** needs a concise, shareable, rights-safe project description and contact path.
- **Creator/operator:** needs approval control, source attribution, consent evidence, and useful reporting without exposing private canon.

## Requirements

1. Present a clear Baebe premise and reader promise.
2. Render only approved public assets with source identity, revision, rights, spoiler, attribution, and approval metadata.
3. Keep private canon, unreleased endings, reveal maps, contributor records, and rights documents outside the public runtime.
4. Provide an accessible discovery path that works without requiring audio, animation, or command interaction.
5. Provide consent-aware lead capture with a durable provider boundary once a provider is approved.
6. Preserve first-party campaign attribution without placing private filenames or story details in public URLs.
7. Link readers to approved Substack serialization, retail, preorder, and wide-distribution destinations when those destinations are ready.
8. Preserve the current terminal, boot, cutscene, audio, and interaction language as reusable presentation patterns, not as authorities for canon or identity.
9. Keep human approval before public story publication, automated scheduling, or claims about ownership, authorship, rights, or bestseller status.
10. Keep initial recurring software and marketing operations near the approximately `$100/month` constraint until evidence justifies expansion.

## Acceptance scenarios

### Approved discovery asset

**Given** a source asset has a stable revision, rights status, spoiler level, approved channels, attribution, and human approval
**When** the discovery experience requests public content
**Then** it renders only the approved derivative and preserves its provenance.

### Missing approval

**Given** an asset is private, blocked, missing rights metadata, or not approved
**When** a public route or derivative job requests it
**Then** the system refuses publication and records the missing gate without exposing the asset.

### Lead capture

**Given** a reader voluntarily provides an address and the consent language identifies the purpose
**When** the lead flow completes through an approved provider
**Then** the system records the consent and attribution boundary needed for the approved workflow and gives the reader a clear confirmation or failure state.

### Accessible entry

**Given** a reader does not use audio, animation, or terminal commands
**When** they open the public discovery experience
**Then** they can understand the premise and reach the approved reader or signup path through ordinary semantic navigation.

### Launch readiness

**Given** the manuscript, rights checkpoint, public derivatives, distribution metadata, and demand calendar are not all evidenced
**When** a launch action is considered
**Then** the system reports the open gates rather than declaring launch-ready.

## Non-goals

- This PRD does not define the private creative canon or replace manuscript/screenplay authority.
- It does not authorize a public release, copyright filing, payment, account creation, or platform upload.
- It does not require the current Vite prototype to become the final product.
- It does not make Next.js, Substack, or any provider a permanent technical choice before the roadmap gate.
- It does not automate community replies, legal/rights claims, press outreach, or strategic decisions.

## Required exit evidence

- Ryan-approved product promise, scope, requirements, and non-goals.
- Approved discovery architecture and content-source boundary.
- Accessibility, consent, privacy, attribution, and failure evidence for the implemented slice.
- Evidence that public content cannot bypass the rights and human-approval gates.
