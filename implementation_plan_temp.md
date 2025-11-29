# Implementation Plan: Optimal Anarchy Investor Pitch (Atari 2600 Edition)

## Goal
Create an immersive, interactive investor pitch deck styled as an early 80s Atari 2600 video game. The experience will present the "Optimal Anarchy" 10-slide pitch through a retro gaming interface, featuring pixel-art cutscenes, CRT effects, and interactive menus.

## User Review Required
- **Art Style:** Confirm the specific "IBM Bitmap Blocky" font and Atari 2600 color palette limitations (128 colors).
- **Cutscene Assets:** We will need to generate or create pixel art assets for the specific cutscenes (Baebe fighting, Gridrunner, etc.).
- **Content Mapping:** Verify the 10 slides from the provided markdown are the exact text to be used.

## Proposed Architecture

### Tech Stack
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS (with custom pixel-art configuration)
- **Animation:** Framer Motion (for transitions and cutscenes)
- **State Management:** React Context (for slide navigation and "game" state)
- **Assets:** SVG/Canvas for procedural pixel art, or static pixel images.

### Design System (The "Atari" Look)
- **Resolution:** Fixed aspect ratio (4:3) scaled up, with "pixel-perfect" rendering.
- **Colors:** Strict Atari 2600 palette (NTSC). High contrast, black backgrounds.
- **Typography:** "IBM Bitmap", "Press Start 2P", or similar blocky 8-bit fonts.
- **CRT Effects:** CSS-based scanlines, slight curvature, chromatic aberration, and phosphor glow.

## Feature Breakdown

### 1. Boot Sequence & Intro
- **Visual:** Black screen, blinking cursor.
- **Text:** "Presented by Optimal Anarchy, Corp." (IBM Bitmap Font).
- **Animation:** Blocky fade-in/out, perhaps a "cartridge load" glitch effect.

### 2. Main Menu (Interactivity)
A "Game Select" screen allowing the user to explore:
- **"START PITCH"** (Begins the 10-slide sequence)
- **"INVENTORY"** (Things we own)
    - Baebe
    - The Novel
    - Entertainment IP
- **"COMING SOON"** (Things we are planning)
    - Novel
    - Immersive Audio Visual Experience
    - Anime Film
    - Feature Film
    - Brand Extensions (Biome, Wellness App)
    - Gridrunner Physical Game

### 3. The Pitch (10 Slides)
The core content, presented as "levels" or "screens" in the game.
- **Navigation:** Arrow keys / On-screen Joystick to advance.
- **Content Strategy:** **Drastically simplified text.** Due to the low-fidelity font/resolution, we will condense the pitch content into punchy, arcade-style headlines and short bullet points (max 3-4 words per line).
- **Content Source:** `documentation/pitch/20250121-1954-optimal-anarchy-10-slide-pitch.md` (Adapted for brevity).
- **Layout:** Large, blocky headers. Bullet points as "score" or "stats".

### 4. Cutscenes (Transitions)
Short (<5s) pixel-art animations between slides to maintain energy.
- **Style:** Low-res, blocky, limited frames (12fps).
- **Scenes:**
    - *War Games* style expanding circles/explosions.
    - *Gridrunner* ship traversing a grid.
    - Alien ship cruising and exploding.
    - Baebe (pixel avatar) getting kicked off a tower.
    - Pixelated fighting sequence.
    - Delaney floating in void.

## Implementation Steps

### Phase 1: Setup & Core UI
- [ ] Initialize Next.js project in `baebe-landing-investor-ag`.
- [ ] Configure Tailwind with Atari colors and fonts.
- [ ] Create `CRTContainer` component for screen effects.
- [ ] Build `GameLoop` layout (TV frame, controls).

### Phase 2: The Slides & Content
- [ ] Create `SlideRenderer` component.
- [ ] Implement the 10 slides with retro typography.
- [ ] Build the `MainMenu` with navigation logic.

### Phase 3: Visuals & Cutscenes
- [ ] Implement `CutsceneManager` to trigger animations between slides.
- [ ] Create/Generate pixel art assets for:
    - Explosions (War Games style)
    - Gridrunner
    - Character sprites (Baebe, Alien)
- [ ] Animate transitions using Framer Motion.

### Phase 4: Polish
- [ ] Add sound effects (8-bit bleeps, bloops, and noise).
- [ ] Optimize performance.
- [ ] Final content review.

## Directory Structure
```
baebe-landing-investor-ag/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Intro -> Menu -> Pitch)
│   └── globals.css (Tailwind + Custom Fonts)
├── components/
│   ├── CRT/
│   │   ├── Screen.tsx
│   │   └── Scanlines.tsx
│   ├── Game/
│   │   ├── IntroSequence.tsx
│   │   ├── MainMenu.tsx
│   │   ├── SlideDeck.tsx
│   │   └── Cutscene.tsx
│   └── UI/
│       ├── PixelText.tsx
│       └── Sprite.tsx
├── lib/
│   ├── slides.ts (Content from markdown)
│   └── assets.ts
└── public/
    ├── fonts/
    └── sprites/
```
