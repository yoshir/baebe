# Implementation Plan: Optimal Anarchy Home & Investor Portal

## Goal
Create a unified web presence for "Optimal Anarchy" that serves two distinct purposes:
1.  **Main Home Page:** A high-level gateway presenting the company and its products.
2.  **Investor Portal:** An immersive, Atari 2600-style interactive pitch deck.

## User Review Required
- **Home Page Aesthetic:** Should the Main Home Page also share the Atari 2600 aesthetic, or should it be more modern/cyberpunk (like Baebe) to contrast with the retro investor deck? *Assumption: Keeping it consistent with the "Optimal Anarchy" retro-tech brand, but perhaps cleaner.*
- **Content:** Confirm the specific products to list on the Home Page.

## Proposed Architecture

### Tech Stack
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **State Management:** React Context
- **Routing:** Next.js App Router

## Feature Breakdown

### 1. Main Home Page (`/`)
The entry point for the brand.
- **Header:** "Optimal Anarchy" Logo (IBM Bitmap Font).
- **Navigation/Menu:**
    - **Products:**
        - **Baebe:** Link to `baebe-landing-ag` (or internal page).
        - **The Novel:** Link/Info.
        - **Entertainment IP:** General info.
    - **Investor Portal:** Link to `/investor`.
- **Visual Style:** Minimalist retro-terminal or clean high-tech.

### 2. Investor Portal (`/investor`)
The interactive Atari 2600 experience.
- **Boot Sequence:** "Presented by Optimal Anarchy, Corp."
- **Game Menu:** "Start Pitch", "Inventory", "Coming Soon".
- **The Pitch (10 Slides):**
    - **Style:** Atari 2600 (128 colors, blocky fonts).
    - **Content:** Simplified text from the 10-slide deck.
    - **Controls:** Arrow keys / On-screen Joystick.
- **Cutscenes:** Pixel-art transitions (Explosions, Gridrunner, etc.).
- **Defender Animation:** A 5-second "Defender"-style animation plays underneath the title of each slide upon entry.
    - **Style:** Side-scrolling shooter (ship, enemies, terrain).
    - **Behavior:** Plays for 5 seconds then fades/stops.
    - **Elements:** Player ship, Landers, Mutants, Laser fire, Particle explosions.
- **After Pitch:** Compelling website with full details, resources, and CTAs.

## Implementation Steps

### Phase 1: Setup & Structure
- [ ] Initialize Next.js project (if not already done).
- [ ] Configure Tailwind with custom fonts (IBM Bitmap, Press Start 2P).
- [ ] Set up App Router structure:
    - `app/page.tsx` (Main Home)
    - `app/investor/page.tsx` (Investor Game)

### Phase 2: Main Home Page
- [ ] Build a clean, navigational landing page.
- [ ] Implement links to Products and Investor sections.

### Phase 3: Investor Portal (The Game)
- [ ] Implement `CRTContainer` and Atari design system.
- [ ] Build `GameLoop` and `SlideDeck` components.
- [ ] Implement the 10 simplified slides.
- [ ] Create pixel-art cutscenes and transitions.
- [ ] Implement "Defender" animation system:
    - [ ] `DefenderCanvas` component/class.
    - [ ] Entities: Ship, Enemy, Projectile, Particle.
    - [ ] Game loop for the 5-second intro.
    - [ ] Integration with `SlideDeck` to trigger on slide change.

### Phase 4: Polish & Deploy
- [ ] Add sound effects.
- [ ] Optimize assets.
- [ ] Final review.

## Wireframes

### Investor Portal Flow

#### Phase 1: The 10-Slide Pitch (Atari 2600 Style)

**WIREFRAME 1: Boot Sequence & Entry**
```
┌─────────────────────────────────────────────────────────┐
│  [CRT SCREEN - BLACK BACKGROUND]                        │
│                                                          │
│  ╔═══════════════════════════════════════════════╗       │
│  ║  OPTIMAL ANARCHY                             ║       │
│  ║  [ASCII ART LOGO TYPES OUT]                  ║       │
│  ╚═══════════════════════════════════════════════╝       │
│                                                          │
│  $ optimal-anarchy --init                               │
│  > Initializing investment portal...                     │
│  > Loading opportunity protocols...                      │
│  > Connection: ESTABLISHED                                │
│                                                          │
│  > [INVESTMENT OPPORTUNITY DETECTED]                     │
│  > Strategic Capital Allocation Required                │
│  > [Accredited Investor Access Only]                    │
│  > [Opportunity: Scalable IP Engine]                    │
│                                                          │
│  > Enter your email address:                            │
│  > [________________________] [Continue]                │
│                                                          │
│  Progress: [░░░░░░░░░░] 0/10                            │
│  [Defender Animation: Ship Launch Sequence]             │
└─────────────────────────────────────────────────────────┘
```

**WIREFRAME 2: Slide 1 - Title Slide**
```
┌─────────────────────────────────────────────────────────┐
│  [CRT SCREEN - ATARI 2600 STYLE]                        │
│                                                          │
│  ╔═══════════════════════════════════════════════╗       │
│  ║  OPTIMAL ANARCHY                             ║       │
│  ║  AI-Native Entertainment IP Development      ║       │
│  ╚═══════════════════════════════════════════════╝       │
│                                                          │
│  Baebe: Novel → Anime → Live-Action → Music → Games     │
│                                                          │
│  [PIXEL ART: Resonant frequency waveforms]                │
│                                                          │
│  Strategic Seed Round                                    │
│                                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  [ANIMATION: Ship flying through calm starfield]        │
│                                                          │
│  Progress: [██░░░░░░░░] 1/10                            │
│  [← Previous] [Next →] [Skip to Website]               │
└─────────────────────────────────────────────────────────┘
```

**WIREFRAME 3: Slide 2 - The Opportunity**
```
┌─────────────────────────────────────────────────────────┐
│  [CRT SCREEN - ATARI 2600 STYLE]                        │
│                                                          │
│  SCREEN 2/10: THE OPPORTUNITY                           │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                          │
│  Artist-Led, Technology-Enabled Entertainment IP       │
│                                                          │
│  Long-Term Sustainable Value                             │
│  Artistry & Community at the Forefront                  │
│                                                          │
│  Traditional: Siloed • Slow • Expensive                 │
│  AI-Native:   Unified • Fast • Scalable                 │
│                                                          │
│  [PIXEL ART: Split-screen comparison]                   │
│  [Left: Fragmented boxes] [Right: Unified core]         │
│                                                          │
│  We're Creating a New Category                           │
│                                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                          │
│  Progress: [████░░░░░░] 2/10                            │
│  Achievement Unlocked: Intelligence Gathering            │
│  [← Previous] [Next →] [Skip to Website]               │
└─────────────────────────────────────────────────────────┘
```

**WIREFRAME 4: Slide 3 - The Problem**
```
┌─────────────────────────────────────────────────────────┐
│  [CRT SCREEN - ATARI 2600 STYLE]                        │
│                                                          │
│  SCREEN 3/10: THE PROBLEM                               │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                          │
│  Traditional Entertainment is Broken                     │
│                                                          │
│  • Fragmented: Novels, films, games created separately  │
│  • Slow: Years from concept to market                   │
│  • Expensive: Each format needs separate teams          │
│                                                          │
│  [PIXEL ART: Broken puzzle pieces]                      │
│  [Data visualization: Time-to-market comparison]        │
│                                                          │
│  We're Solving This                                     │
│                                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                          │
│  Progress: [██████░░░░] 3/10                            │
│  [← Previous] [Next →] [Skip to Website]               │
└─────────────────────────────────────────────────────────┘
```

**WIREFRAME 5: Slide 4 - Our Solution**
```
┌─────────────────────────────────────────────────────────┐
│  [CRT SCREEN - ATARI 2600 STYLE]                        │
│                                                          │
│  SCREEN 4/10: OUR SOLUTION                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                          │
│  AI-Enabled Entertainment IP Development                 │
│                                                          │
│  • Leveraging AI for: Novel, anime, engagement           │
│  • Traditional methods: Live-action, top-tier production│
│  • Unified Core: One narrative → All formats            │
│  • Speed: Months, not years                             │
│                                                          │
│  [PIXEL ART: Unified core generating multiple formats]  │
│                                                          │
│  Technology Serves Artistry                              │
│                                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                          │
│  Progress: [████████░░] 4/10                            │
│  [← Previous] [Next →] [Skip to Website]               │
└─────────────────────────────────────────────────────────┘
```

**WIREFRAME 6: Slide 5 - First IP: BAEBE**
```
┌─────────────────────────────────────────────────────────┐
│  [CRT SCREEN - ATARI 2600 STYLE]                        │
│                                                          │
│  SCREEN 5/10: FIRST IP - BAEBE                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                          │
│  BAEBE: A Cyberpunk Thriller                            │
│                                                          │
│  Set after the first AI apocalypse:                     │
│  • 47 years after the Singularity                      │
│  • 75% of Earth converted to infrastructure            │
│  • Humanity being regulated out of existence           │
│                                                          │
│  Formats in Development:                                │
│  • Novel (90K words, Q2 2026)                          │
│  • Graphic Novel (200+ pages, Q3 2026)                 │
│  • Screenplay (feature-length)                          │
│  • Video Game (interactive narrative, 2027)             │
│                                                          │
│  [PIXEL ART: Baebe character or world visualization]    │
│                                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                          │
│  Progress: [██████████░░] 5/10                          │
│  [← Previous] [Next →] [Skip to Website]              │
└─────────────────────────────────────────────────────────┘
```

**WIREFRAME 7: Slide 6 - Market Opportunity**
```
┌─────────────────────────────────────────────────────────┐
│  [CRT SCREEN - ATARI 2600 STYLE]                        │
│                                                          │
│  SCREEN 6/10: MARKET OPPORTUNITY                        │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                          │
│  Entertainment IP Market: $200B+ annually                 │
│                                                          │
│  • Books: $25B market                                   │
│  • Film/TV: $100B+ market                               │
│  • Games: $180B+ market                                 │
│  • Music: $26B market                                  │
│                                                          │
│  Our Advantage:                                         │
│  • Unified IP across all formats                        │
│  • Faster time-to-market                                │
│  • Lower production costs                               │
│  • Multiple revenue streams                             │
│                                                          │
│  [PIXEL ART: Market size visualization]                │
│                                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                          │
│  Progress: [████████████░░] 6/10                        │
│  [← Previous] [Next →] [Skip to Website]               │
└─────────────────────────────────────────────────────────┘
```

**WIREFRAME 8: Slide 7 - Business Model**
```
┌─────────────────────────────────────────────────────────┐
│  [CRT SCREEN - ATARI 2600 STYLE]                        │
│                                                          │
│  SCREEN 7/10: BUSINESS MODEL                             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                          │
│  Revenue Streams:                                       │
│                                                          │
│  • Book Sales (direct + distribution)                   │
│  • Film/TV Licensing                                    │
│  • Game Development & Sales                             │
│  • Merchandise & Collectibles                           │
│  • Music & Soundtracks                                  │
│  • Live Experiences (DJ performances, immersive shows)  │
│                                                          │
│  [PIXEL ART: Revenue streams visualization]             │
│                                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                          │
│  Progress: [██████████████░░] 7/10                      │
│  [← Previous] [Next →] [Skip to Website]              │
└─────────────────────────────────────────────────────────┘
```

**WIREFRAME 9: Slide 8 - Traction & Progress**
```
┌─────────────────────────────────────────────────────────┐
│  [CRT SCREEN - ATARI 2600 STYLE]                        │
│                                                          │
│  SCREEN 8/10: TRACTION & PROGRESS                       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                          │
│  Current Status:                                         │
│                                                          │
│  • Novel: 90K words written, in editing                │
│  • Graphic Novel: Concept art complete                  │
│  • Screenplay: First draft complete                     │
│  • Game: Prototype in development                       │
│  • Community: Early audience engagement active          │
│                                                          │
│  [PIXEL ART: Progress bars or completion indicators]    │
│                                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                          │
│  Progress: [████████████████░░] 8/10                     │
│  [← Previous] [Next →] [Skip to Website]              │
└─────────────────────────────────────────────────────────┘
```

**WIREFRAME 10: Slide 9 - Team**
```
┌─────────────────────────────────────────────────────────┐
│  [CRT SCREEN - ATARI 2600 STYLE]                        │
│                                                          │
│  SCREEN 9/10: THE TEAM                                   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                          │
│  Founder: [Name]                                         │
│                                                          │
│  • VFX Artist (feature films, stadium shows)          │
│  • Music Producer (EDM, soundtracks)                    │
│  • Technical Creative (AI, automation)                   │
│  • Performance Experience (stadium productions)          │
│                                                          │
│  [PIXEL ART: Founder pixel portrait]                    │
│                                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                          │
│  Progress: [██████████████████░░] 9/10                   │
│  [← Previous] [Next →] [Skip to Website]              │
└─────────────────────────────────────────────────────────┘
```

**WIREFRAME 11: Slide 10 - Investment Ask**
```
┌─────────────────────────────────────────────────────────┐
│  [CRT SCREEN - ATARI 2600 STYLE]                        │
│                                                          │
│  SCREEN 10/10: INVESTMENT ASK                            │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                          │
│  Strategic Capital for IP Scaling                        │
│                                                          │
│  Structure:                                              │
│  • Optimal Anarchy = Holding Company                     │
│  • Baebe LLC = IP-Specific Entity                       │
│  • Flexible Licensing = Different partners, formats    │
│                                                          │
│  Use of Funds:                                           │
│  • IP Development (Novel, Screenplay)                   │
│  • Immersive Experiences (DJ, Film)                     │
│  • Visual Production (Anime, Art)                       │
│  • Operations & Legal                                    │
│                                                          │
│  [PIXEL ART: Pie chart or fund allocation]              │
│                                                          │
│  Ready to Move Fast                                     │
│                                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  [ANIMATION: Ship docking at massive space station]     │
│                                                          │
│  Progress: [████████████████████] 10/10                 │
│  Achievement Unlocked: Pitch Complete!                   │
│  [← Previous] [Continue to Website →]                  │
└─────────────────────────────────────────────────────────┘
```

#### Phase 2: The Compelling Website (After Pitch)

**WIREFRAME 12: Website Landing Page**
```
┌─────────────────────────────────────────────────────────┐
│  [MODERN WEB DESIGN - Clean, Professional]               │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │  OPTIMAL ANARCHY                    [Menu ☰]    │   │
│  │  AI-Native Entertainment IP Development          │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │                                                  │   │
│  │  Hero Section:                                   │   │
│  │  "Building Entertainment IP for the AI Era"     │   │
│  │                                                  │   │
│  │  [Hero Image/Video: Resonant frequencies,      │   │
│  │   Baebe world visualization]                     │   │
│  │                                                  │   │
│  │  [Download Full Pitch Deck] [Book a Call]      │   │
│  │  [View IP Excerpt] [Send Term Sheet]            │   │
│  │                                                  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Investment Opportunity                          │   │
│  │  ─────────────────────────────────────────────  │   │
│  │  Strategic Seed Round                            │   │
│  │  Scaling the AI-Native IP Engine                 │   │
│  │  Accredited Investors Only                       │   │
│  │  Limited Allocation Remaining                    │   │
│  │                                                  │   │
│  │  [Invest Now] [Learn More]                      │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │  The Opportunity                                 │   │
│  │  ─────────────────────────────────────────────  │   │
│  │  [Text content from pitch deck]                 │   │
│  │  [Visual: Comparison charts, timelines]          │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │  First IP: BAEBE                                 │   │
│  │  ─────────────────────────────────────────────  │   │
│  │  [Synopsis, formats, development status]        │   │
│  │  [Visual: Concept art, world-building]           │   │
│  │  [Read IP Excerpt] [View Trailer]                │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Resources & Downloads                           │   │
│  │  ─────────────────────────────────────────────  │   │
│  │  • Full Pitch Deck (PDF)                        │   │
│  │  • IP Excerpt (Protected)                        │   │
│  │  • Term Sheet Template                          │   │
│  │  • Financial Projections                        │   │
│  │  • Strategic Roadmap                             │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Contact & Next Steps                            │   │
│  │  ─────────────────────────────────────────────  │   │
│  │  [Book a Call] [Send Term Sheet]               │   │
│  │  [Email Contact] [Schedule Meeting]            │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Footer                                          │   │
│  │  © Optimal Anarchy | Privacy | Terms            │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**WIREFRAME 13: Website - IP Excerpt Page**
```
┌─────────────────────────────────────────────────────────┐
│  [MODERN WEB DESIGN]                                     │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │  OPTIMAL ANARCHY                    [Menu ☰]    │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │  BAEBE: IP Excerpt                               │   │
│  │  ─────────────────────────────────────────────  │   │
│  │                                                  │   │
│  │  [NDA Notice: Protected Content]                 │   │
│  │                                                  │   │
│  │  [Full IP Excerpt Text - Scrollable]            │   │
│  │                                                  │   │
│  │  [Watermarked PDF Download Available]           │   │
│  │                                                  │   │
│  │  [Give Feedback] [Book a Call]                 │   │
│  │  [Send Term Sheet]                              │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**WIREFRAME 14: Website - Resources Page**
```
┌─────────────────────────────────────────────────────────┐
│  [MODERN WEB DESIGN]                                     │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │  OPTIMAL ANARCHY                    [Menu ☰]    │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Investor Resources                              │   │
│  │  ─────────────────────────────────────────────  │   │
│  │                                                  │   │
│  │  ┌──────────────┐  ┌──────────────┐           │   │
│  │  │ Full Pitch   │  │ IP Excerpt   │           │   │
│  │  │ Deck (PDF)   │  │ (Protected)  │           │   │
│  │  │ [Download]   │  │ [View]       │           │   │
│  │  └──────────────┘  └──────────────┘           │   │
│  │                                                  │   │
│  │  ┌──────────────┐  ┌──────────────┐           │   │
│  │  │ Term Sheet   │  │ Financial    │           │   │
│  │  │ Template     │  │ Projections  │           │   │
│  │  │ [Download]   │  │ [View]       │           │   │
│  │  └──────────────┘  └──────────────┘           │   │
│  │                                                  │   │
│  │  ┌──────────────┐  ┌──────────────┐           │   │
│  │  │ Strategic    │  │ Team &       │           │   │
│  │  │ Roadmap      │  │ Background   │           │   │
│  │  │ [View]       │  │ [View]       │           │   │
│  │  └──────────────┘  └──────────────┘           │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**WIREFRAME 15: Website - Contact/CTA Page**
```
┌─────────────────────────────────────────────────────────┐
│  [MODERN WEB DESIGN]                                     │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │  OPTIMAL ANARCHY                    [Menu ☰]    │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Ready to Invest?                                │   │
│  │  ─────────────────────────────────────────────  │   │
│  │                                                  │   │
│  │  Investment Details:                             │   │
│  │  • Strategic Seed Round                         │   │
│  │  • SAFE Agreements                              │   │
│  │  • Flexible Terms                                │   │
│  │                                                  │   │
│  │  ┌──────────────────────────────────────────┐   │   │
│  │  │ [Book a Call with Founders]              │   │   │
│  │  │ Schedule a 30-minute conversation       │   │   │
│  │  └──────────────────────────────────────────┘   │   │
│  │                                                  │   │
│  │  ┌──────────────────────────────────────────┐   │   │
│  │  │ [Send Term Sheet]                        │   │   │
│  │  │ Generate and submit your term sheet       │   │   │
│  │  └──────────────────────────────────────────┘   │   │
│  │                                                  │   │
│  │  ┌──────────────────────────────────────────┐   │   │
│  │  │ [Email Us]                               │   │   │
│  │  │ investors@optimalanarchy.com              │   │   │
│  │  └──────────────────────────────────────────┘   │   │
│  │                                                  │   │
│  │  Current Status:                                │   │
│  │  • Allocation Closing Soon                      │   │
│  │  • Founding Investor Spots Available            │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Design Specifications

**Atari 2600 Pitch Deck:**
- **Resolution:** 320x240 (scaled to modern displays)
- **Color Palette:** 128 colors (Atari 2600 palette)
- **Fonts:** IBM Bitmap Font, Press Start 2P (8-bit style)
- **Controls:** Arrow keys, on-screen joystick, touch gestures
- **Transitions:** Pixel-art cutscenes between slides
- **Effects:** CRT scanlines, pixel-perfect rendering, retro sound effects

**Compelling Website:**
- **Style:** Modern, clean, professional
- **Color Palette:** Deep blues, warm golds/ambers (matching pitch deck)
- **Typography:** Modern sans-serif (clean, readable)
- **Layout:** Responsive, mobile-first
- **Interactivity:** Smooth animations, hover effects, scroll-triggered animations
- **CTAs:** Prominent, clear call-to-action buttons throughout

## Directory Structure
```
baebe-landing-investor-ag/
├── app/
│   ├── layout.tsx
│   ├── page.tsx           <-- Main Home Page
│   ├── investor/
│   │   ├── page.tsx       <-- Atari Pitch Deck Entry
│   │   ├── pitch/
│   │   │   └── page.tsx   <-- 10-Slide Pitch Experience
│   │   └── website/
│   │       ├── page.tsx   <-- Compelling Website Landing
│   │       ├── ip-excerpt/
│   │       │   └── page.tsx
│   │       ├── resources/
│   │       │   └── page.tsx
│   │       └── contact/
│   │           └── page.tsx
│   └── globals.css
├── components/
│   ├── Home/              <-- Home Page Components
│   │   └── ProductList.tsx
│   ├── Investor/          <-- Investor Game Components
│   │   ├── CRT/
│   │   │   ├── CRTContainer.tsx
│   │   │   └── CRTScanlines.tsx
│   │   ├── Game/
│   │   │   ├── GameLoop.tsx
│   │   │   ├── SlideDeck.tsx
│   │   │   └── SlideNavigation.tsx
│   │   ├── Slides/
│   │   │   ├── Slide1.tsx
│   │   │   ├── Slide2.tsx
│   │   │   ├── ... (Slides 3-10)
│   │   │   └── Slide10.tsx
│   │   └── Cutscenes/
│   │       ├── TransitionCutscene.tsx
│   │       └── PixelArtAnimation.tsx
│   ├── Website/           <-- Website Components
│   │   ├── Hero.tsx
│   │   ├── InvestmentOpportunity.tsx
│   │   ├── IPShowcase.tsx
│   │   ├── Resources.tsx
│   │   └── ContactCTA.tsx
│   └── UI/
│       ├── Button.tsx
│       └── Navigation.tsx
└── public/
    ├── fonts/
    │   ├── ibm-bitmap.woff2
    │   └── press-start-2p.woff2
    └── sprites/
        ├── cutscenes/
        └── pixel-art/

## In-Game Text & Camera Logic
The user wants the pitch content to be integrated into the game world, allowing the player to "fly" through the text.

### Camera Behavior
- **Approach:** Text is placed at a specific World X coordinate. As the player flies right, the text enters the screen.
- **Lock (Readability Zone):** When the text reaches the center of the screen, the camera "locks" its X position. The text remains centered.
- **Free Movement:** While locked, the player can fly freely within the screen bounds without the background/text scrolling.
- **Departure:** If the player pushes against the right edge of the screen, the camera unlocks and resumes scrolling, leaving the text behind.

### Text Rendering
- **Canvas Rendering:** Text will be rendered directly on the game canvas using the retro font.
- **Parsing:** The existing slide content strings will be parsed into lines and bullet points for rendering.
- **Integration:** `investor-portal.js` will pass the raw text to `animation.js` instead of rendering it to the DOM.

## Defender Animation Metaphors

Each slide will feature a 5-second "Defender"-style animation that metaphorically represents the slide's content.

| Slide | Content Theme | Defender Metaphor | Animation Description |
| :--- | :--- | :--- | :--- |
| **1. Title** | Launch / Beginning | **Liftoff** | The ship launches from a base, engines flaring, flying smoothly into a calm starfield. Represents the start of the journey. |
| **2. Opportunity** | Value / Potential | **Resource Scan** | The ship flies over a rich, alien landscape, scanning glowing crystals (value). No enemies, just potential. |
| **3. The Problem** | Fragmentation / Chaos | **Asteroid Field** | The ship navigates a chaotic field of asteroids and debris (fragmented market). It's difficult and crowded. |
| **4. Solution** | Unification / AI | **Shield Activation** | The ship activates a glowing "AI Shield" that vaporizes the debris, clearing a smooth path forward. |
| **5. First IP (Baebe)** | Cyberpunk World | **Neon City Run** | The ship flies low through a high-tech, neon-lit cyberpunk trench (like the Death Star run but neon). Fast and exciting. |
| **6. Market** | Growth / Scale | **Ascension** | The ship pulls up and flies vertically, passing altitude markers/clouds, accelerating towards space. |
| **7. Business Model** | Revenue Streams | **Power-Up Collection** | The ship collects various colored power-up pods (representing different revenue streams) that orbit it. |
| **8. Traction** | Progress / Speed | **Hyperspace** | The stars streak into lines (hyperspace effect). The ship is moving incredibly fast, leaving others behind. |
| **9. Team** | Expertise / System | **Wingmen** | A squadron of drone ships joins the player ship, flying in perfect formation. Represents the "System" multiplying the founder's capability. |
| **10. Ask** | The Goal / Partnership | **Docking** | The ship approaches and docks with a massive, majestic mothership (Optimal Anarchy). Mission complete. |

```
