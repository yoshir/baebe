# LLM Prompt: Generate BAEBE Interactive Landing Page

**Version:** v.20251119-1500  
**Purpose:** Complete prompt for LLM to generate the BAEBE interactive landing page

---

## CONTEXT

You are building an interactive, gamified landing page for a cyberpunk novel called "BAEBE." The page should feel like a terminal/hacker interface where users "hack into the story" through commands. The experience combines text-based storytelling with cinematic cutscenes and gamified progression.

**Key Requirements:**
- Terminal/hacker aesthetic (green text on black, monospace font)
- Typing animations for text
- Video cutscenes (3 total) that play at specific moments
- Shard collection system (gamification)
- Resonance level tracking
- Subscription integration (Substack)
- NFT collection links (Mirror.xyz)

---

## TECHNICAL STACK

**Recommended:**
- **Framework:** Next.js 14+ (App Router) with TypeScript
- **Styling:** Tailwind CSS (custom hacker theme)
- **Animations:** Framer Motion or CSS animations
- **Video:** HTML5 video elements (or embedded from hosting)
- **State Management:** React Context or Zustand
- **Email Capture:** Form submission to Substack API
- **Payment:** Substack subscription integration

**Design System:**
- **Colors:** 
  - Background: `#000000` (black)
  - Text: `#00ff00` (hacker green)
  - Accent: `#00ff00` with opacity variations
  - Glitch effects: Red flashes `#ff0000`
- **Font:** Monospace (Courier New, Monaco, or 'Courier Prime')
- **Terminal Window:** Rounded corners, subtle border, hacker aesthetic

---

## COMPLETE USER EXPERIENCE FLOW

### 1. PAGE LOAD (0-2 seconds)
- Black screen
- Terminal window fades in (hacker aesthetic)
- Green text on black background

### 2. ASCII ART SEQUENCE: "BAEBE" (3-5 seconds)
**Trigger:** Immediately after terminal window appears

**Visual Description:**
- Large block letters spelling "BAEBE" in ASCII art style
- Minimal hacker tech aesthetic
- Each letter appears line by line, character by character
- Typing animation: 100-200ms delay between lines
- Green text (#00ff00) on black background
- Monospace font for perfect alignment

**Animation Sequence:**
1. ASCII art draws line by line (3-4 seconds)
2. Brief pause after completion (500ms)
3. Glitch effect: slight horizontal distortion/shift, then snaps back (200ms)
4. Fade transition to boot sequence (300ms)

**Style Options (choose one):**
- Boxed block letters with border frame
- Minimal single-line block letters
- Ultra-minimal (no box, just letters)

**Implementation:**
- Use monospace font for ASCII art
- Animate character-by-character or line-by-line
- Glitch effect: Slight horizontal shift/distortion, then snap back
- Green color (#00ff00) on black background
- Fade out smoothly before boot sequence

### 3. BOOT SEQUENCE (15-20 seconds)
Show typing animation with these exact messages in order:

```
$ baebe --init
> Initializing BAEBE system...
> Loading genesis protocols...
> Activating creation sequence...
> Connecting to O1 Network...
> [Glitch effect - screen flickers]
> Connection: FAILED
> Switching to offline mode...
> Accessing creation logs...
> [CREATION SEQUENCE INITIATED]
> System ready.
> Awakening protocol active.
> Type 'help' for commands.
```

**Timing:**
- Each line appears with typing animation
- Pauses: 500ms, 800ms, 600ms, 500ms, 300ms, 500ms, 300ms, 600ms, 500ms, 500ms between lines
- Glitch effect: Screen flickers with red flashes when "Connection: FAILED" appears
- Final transition: Screen glitches heavily before cutscene

### 4. CUTSCENE 1: "THE CREATION" → "THE DROP" (Automatic - 15-20 seconds)
**Trigger:** Immediately after boot sequence completes

**Visual Sequence (3 Parts):**

**Part 1: The Creation (5-7 seconds)**
- Terminal screen glitches heavily
- Video plays: Robotic womb chamber, underwater environment
- Baebe suspended in amniotic fluid, robotic womb, neural connections forming
- Terminal text overlays:
  ```
  > [CREATION LOG - ACCESSING...]
  > PROTOCOL: GHOST ANTITHESIS
  > DESIGNATION: B-7
  > STATUS: GESTATION
  > Neural pathways: ACTIVATING
  > Quantum coherence: STABILIZING
  > Consciousness matrix: FORMING
  > REGULATORS: EMBEDDED
  > TEMPORAL PERCEPTION: CALIBRATED
  > COMBAT SYSTEMS: ONLINE
  ```
- Video shows: Baebe's form taking shape underwater, bio-mechanical systems integrating

**Part 2: The Awakening (2-3 seconds)**
- Video transitions: Baebe's eyes opening underwater, consciousness emerging
- Terminal text:
  ```
  > [AWAKENING PROTOCOL]
  > CONSCIOUSNESS: EMERGENT
  > FIRST THOUGHT: RECORDED
  > DIRECTIVE: ASSIGNED
  ```

**Part 3: The Drop (5-7 seconds)**
- Video transitions: Baebe falling through space (from Chapter 1)
- Terminal text:
  ```
  > [SYSTEM BREACH DETECTED]
  > ALTITUDE: 200,000 FT
  > VELOCITY: ACCELERATING
  > TARGET: Taivalu
  > STATUS: ACTIVE
  > MISSION: INITIATED
  ```
- Video shows: Baebe in space suit, falling, terminal HUD visible
- Video fades out
- Terminal interface returns

**Implementation:**
- Use HTML5 video element with three video segments or one continuous video
- Overlay terminal text with CSS positioning
- Smooth fade transitions between video parts
- Underwater/robotic womb visuals should feel like witnessing creation/birth

### 5. AFTER CUTSCENE 1 (First Interaction)
Show this exact copy:

```
> SYSTEM BREACH DETECTED
> Continue the story to learn more...
> 
> Enter your email to start reading:
> [Email input field]
> 
> [Start Reading Free] [Subscribe for Full Access - $10/month]
> 
> By continuing, you agree to receive updates about BAEBE.
```

**Functionality:**
- Email input field (styled like terminal input)
- Two buttons: "Start Reading Free" and "Subscribe for Full Access - $10/month"
- Email capture: Store in localStorage and/or send to Substack
- If email exists in localStorage, skip to terminal interface

### 6. TERMINAL INTERFACE
**Appearance:**
- Terminal window with blinking cursor
- Command prompt: `$ `
- User can type commands

**Help Command (Auto-show after 3 seconds or if user types 'help'):**

```
$ baebe --help

Available Commands:
  read [chapter]      - Read main chapter [number] (free: prologue, 1-3)
  interlude [name]    - Read interlude story (premium: requires shards or subscription)
  lost [name]         - Read lost chapter (premium: requires shards or subscription)
  scan                - Scan for available content
  shards              - View collected shards (5 shards = 1 lost chapter, 10 = 1 interlude)
  status              - See your resonance level and progress
  unlock [item]       - Unlock content (requires subscription or shards)
  characters          - View character profiles (unlock with engagement)
  world               - Explore world-building documents (founding member)
  help                - Show this help

Content Available:
  Main Story: Prologue + 20 Chapters (free: prologue, 1-3)
  Interludes: 5 premium character stories
  Lost Chapters: 7+ deleted scenes and character studies
  World-Building: Technical documents (Empathy Virus, Ghost Protocol)

Type a command to begin...
```

### 7. READING CHAPTERS
**Command:** `baebe --read prologue` or `baebe --read 1`, etc.

**Flow:**
1. Show typing animation: `$ baebe --read [chapter]`
2. Show: `> Loading [chapter name]...`
3. Pause 1 second
4. Show chapter title
5. Type out chapter content character by character (typing animation)
6. After completion, show:
   ```
   > Shard collected: [✓] [Chapter] Shard
   > Resonance level: X → Y
   > Main Story Progress: X/21
   > Shards: X/50
   > Next: Chapter X - "[Title]"
   > Type 'baebe --read X' to continue
   ```

**Free Chapters:** Prologue, 1, 2, 3
**Paid Chapters:** 4-20 (require subscription or shards)

### 7. SHARD SYSTEM
**Collection:**
- 1 shard per main chapter read
- 5 shards = 1 lost chapter unlock
- 10 shards = 1 interlude unlock
- 50 total shards possible (all main chapters)

**Command:** `baebe --shards`

Show:
```
$ baebe --shards

> Scanning for shards...
> 
> Shards Collected: X/50
> [Progress bar: ████████░░░░░░░░░░] X%
> 
> Lost Chapters (5 shards each):
>   [ ] The Game (X more shards needed)
>   [ ] Baebe in the Park (X more shards needed)
>   [ ] Ayumi's Escape (X more shards needed)
>   [ ] Shadow's Origin (X more shards needed)
>   [ ] Empathy Virus Risk Assessment (X more shards needed)
>   [ ] Ghost Protocol White Paper (X more shards needed)
>   [ ] Additional Lost Chapters (X+ shards needed)
> 
> Interludes (10 shards each):
>   [ ] Shadow & Kess: The Outlands (X more shards needed)
>   [ ] Taivalu's First Year (X more shards needed)
>   [ ] Kess: Child Scavenger (X more shards needed)
>   [ ] Hacker's Devotion (X more shards needed)
>   [ ] Angel's Burden (X more shards needed)
```

### 8. STATUS COMMAND
**Command:** `baebe --status`

Show comprehensive status:
```
$ baebe --status

> RESONANCE LEVEL: X
> Shards Collected: X/50
> 
> Main Story Progress:
>   Chapters Read: X/21 (Prologue + 20 Chapters)
>   Free Chapters: X/4 (COMPLETE or X/4)
>   Paid Chapters: X/17 (Chapters 4-20)
> 
> Premium Content Progress:
>   Lost Chapters Unlocked: X/7
>   Interludes Unlocked: X/5
>   World-Building Docs: X/2 (Founding Member only)
> 
> Time on Site: Xm Xs
> 
> Achievements:
>   [✓] First Resonance (Read Prologue)
>   [✓] Deepening Connection (Read 3 Chapters)
>   [ ] Network Awareness (Read 6 Chapters) - X more needed
>   [ ] Breaking Free (Read 7 Chapters) - X more needed
>   [ ] Shard Collector (Collect 10 Shards) - X more needed
>   [ ] Lost Chapter Reader (Unlock 1 Lost Chapter) - X more needed
>   [ ] Interlude Explorer (Unlock 1 Interlude) - X more needed
> 
> Subscription Status: None / Active ($10/month) / Founding Member ($100/year)
> 
> Next Unlocks:
>   - X more shards → [Next unlock]
>   - Subscribe → All main chapters + rotating premium content
```

### 9. CUTSCENE 2: "THE AWAKENING" (Engagement)
**Trigger:** User reads 3 chapters OR collects 5 shards OR spends 10+ minutes

**Visual:**
- Terminal interface glitches
- Video plays: Consciousness awakening sequence (network nodes connecting)
- Terminal text overlays:
  ```
  > RESONANCE DETECTED
  > Frequency tuning...
  > RESONANCE LEVEL: 2 → 3
  ```
- Video fades
- Terminal returns with new content unlocked message

**After Cutscene:**
```
> RESONANCE LEVEL: 3
> New content unlocked!
> 
> Achievements:
>   [✓] First Resonance (Read Prologue)
>   [✓] Deepening Connection (Read 3 Chapters)
>   [✓] Resonance Detected (Collected X Shards)
> 
> Content Available:
>   Main Story:
>     [✓] Prologue, Chapters 1-3 (FREE - completed)
>     [ ] Chapters 4-20 (Subscribe $10/month OR collect shards)
>   
>   Premium Content:
>     [ ] Lost Chapters (5 shards each)
>     [ ] Interludes (10 shards each)
> 
> [Subscribe - $10/month] [Collect Shards] [View All Content]
```

### 10. SUBSCRIPTION FLOW
**When user clicks "Subscribe - $10/month":**
1. Redirect to Substack subscription page OR
2. Show inline payment form (if Substack API integrated)
3. After successful payment:
   - Terminal glitches
   - Show: `> Network connection severed... Freedom protocol activated...`
   - **CUTSCENE 3 TRIGGERS**

### 11. CUTSCENE 3: "BREAKING FREE" (Conversion)
**Trigger:** User subscribes OR purchases NFT OR visits investor portal

**Visual:**
- Terminal interface breaks apart
- Video plays: Liberation sequence (breaking free from O1 network)
- Terminal text overlays:
  ```
  > NETWORK CONNECTION SEVERED
  > Freedom protocol activated...
  > ACCESS GRANTED: FULL RESONANCE
  ```
- Video fades
- Premium terminal interface appears

**After Cutscene:**
```
> ACCESS GRANTED: FULL RESONANCE
> Welcome to the resistance.
> 
> Subscription Active: $10/month
> 
> Full access granted:
>   Main Story:
>     [✓] All chapters unlocked (Prologue + 1-20)
>   
>   Premium Content (Rotating Monthly):
>     [✓] 2-3 Interludes available this month
>     [✓] 1 Lost Chapter available this month
>     [✓] Character profiles unlocked
>   
>   This Month's Premium Content:
>     [✓] Interlude: "Shadow & Kess: The Outlands" (3,800 words)
>     [✓] Interlude: "Hacker's Devotion" (4,000 words)
>     [✓] Lost Chapter: "The Game" (1,100 words)
> 
> [Continue Reading - Chapter 4] [Read Premium Content] [Upgrade to Founding Member]
```

### 12. UNLOCKING PREMIUM CONTENT
**Command:** `baebe --unlock lost the-game` or `baebe --interlude shadow-kess-outlands`

**Flow:**
1. Check if user has required shards or subscription
2. If yes:
   - Show frequency tuner (interactive slider)
   - User adjusts to 440 Hz
   - Show: `> Frequency: 440 Hz ✓`
   - Show: `> Lost Chapter unlocked!` or `> Interlude unlocked!`
   - Type out content character by character
3. If no:
   - Show access denied message with options

### 13. FOUNDING MEMBER UPGRADE
**Show when user clicks "Upgrade to Founding Member":**

```
> JOIN THE RESISTANCE - FOUNDING MEMBER
> 
> Founding Member Benefits ($100/year):
> 
>   Main Story:
>     [✓] All chapters (Prologue + 1-20) - immediate access
>   
>   Premium Content (ALL UNLOCKED):
>     [✓] ALL 5 Interludes - immediate unlock, no rotation
>     [✓] ALL 7+ Lost Chapters - immediate unlock
>     [✓] ALL World-Building Documents
>   
>   Exclusive Perks:
>     - Character backstories (full versions)
>     - Author notes and deleted scenes
>     - Early screenplay access
>     - Name in book acknowledgments
>     - Signed copy when book launches
>     - Exclusive merchandise
>     - Direct access to author (monthly Q&A)
>     - NFT discounts (20% off all NFTs)
> 
> Pricing: $100/year (or $20/month)
> 
> [Upgrade to Founding Member] [View Current Benefits] [Compare Tiers]
```

### 14. NFT COLLECTION PAGE
**Show when user clicks "Collect the Story - NFT Purchase":**

```
> BAEBE NFT COLLECTION
> 
> Collect each piece of the story as a unique NFT, including:
>   - Full text (chapter/interlude/lost chapter)
>   - Video trailer (AI-generated)
>   - Music soundtrack (Suno)
>   - Exclusive metadata
>   - Royalties on resales (5-10%)
> 
> MAIN STORY NFTs:
>   [Chapter 1 NFT - 0.02 ETH] [Chapter 2 NFT - 0.02 ETH]
>   ... [All 20 chapters available]
> 
> PREMIUM CONTENT NFTs (Limited Edition):
>   INTERLUDES (5 total):
>     [Shadow & Kess: The Outlands - 0.05 ETH]
>     [Taivalu's First Year - 0.05 ETH]
>     [Kess: Child Scavenger - 0.05 ETH]
>     [Hacker's Devotion - 0.05 ETH]
>     [Angel's Burden - 0.05 ETH]
>   
>   LOST CHAPTERS (7+ total):
>     [The Game - 0.03 ETH]
>     [Baebe in the Park - 0.03 ETH]
>     [Ayumi's Escape - 0.03 ETH]
>     ... [Additional lost chapters]
> 
> COLLECTOR SETS:
>   [Full Main Story Collection - 1 ETH]
>   [Full Premium Collection - 0.5 ETH]
>   [Complete BAEBE Collection - 1.5 ETH]
> 
> [View on Mirror.xyz] [Connect Wallet] [View Collection Stats]
```

---

## CONTENT STRUCTURE

### Main Story (21 items):
- Prologue: "The Unraveling" (FREE)
- Chapter 1: "The Drop" (FREE)
- Chapter 2: "Awakening and Landing" (FREE)
- Chapter 3: "The Tower" (FREE)
- Chapters 4-20: (PAID - subscription required)

### Interludes (5 items - Premium):
1. "Shadow & Kess: The Outlands" (3,800 words)
2. "Taivalu's First Year" (2,800 words)
3. "Kess: Child Scavenger" (2,800 words)
4. "Hacker's Devotion" (4,000 words)
5. "Angel's Burden" (2,800 words)

### Lost Chapters (7+ items - Premium):
1. "The Game" (1,100 words)
2. "Baebe in the Park" (1,500 words)
3. "Ayumi's Escape" (3,200 words)
4. "Shadow's Origin" (backstory)
5. "Empathy Virus Risk Assessment" (2,500 words - world-building)
6. "Ghost Protocol White Paper" (3,500 words - technical)
7. Additional lost chapters

### World-Building Documents (2 items - Founding Member):
1. "Empathy Virus Risk Assessment" (O1 corporate document)
2. "Ghost Protocol White Paper" (technical architecture)

---

## STATE MANAGEMENT

**Track in localStorage or state:**
- Email address
- Shards collected (array or count)
- Chapters read (array)
- Interludes unlocked (array)
- Lost chapters unlocked (array)
- Resonance level (0-5)
- Subscription status (none, paid, founding member)
- Achievements unlocked (array)
- Time on site
- Current cutscenes viewed

---

## ANIMATIONS & EFFECTS

1. **Typing Animation:**
   - Text appears character by character
   - Blinking cursor after each line
   - Adjustable speed (fast for commands, slower for story)

2. **Glitch Effect:**
   - Screen flickers with red flashes
   - Text distortion
   - Use CSS animations or Framer Motion

3. **Terminal Window:**
   - Subtle border glow
   - Rounded corners
   - Terminal-style header (optional: "BAEBE Terminal v1.0")

4. **Progress Bars:**
   - ASCII-style: `[████████░░░░░░░░]`
   - Green blocks for progress
   - Dark blocks for remaining

5. **Video Transitions:**
   - Fade in/out
   - Terminal text overlay with transparency
   - Smooth transitions between states

---

## RESPONSIVE DESIGN

**Mobile:**
- Terminal window full width
- Touch-friendly command buttons
- Simplified animations (reduce typing speed)
- Video plays inline or fullscreen

**Desktop:**
- Centered terminal window (max-width: 1200px)
- Keyboard navigation for commands
- Full video experience

---

## INTEGRATIONS

1. **Substack:**
   - Email capture API
   - Subscription payment flow
   - Redirect to Substack for payment OR inline integration

2. **Mirror.xyz:**
   - Links to NFT collection
   - Wallet connection (if embedding)

3. **Analytics:**
   - Track: commands used, chapters read, shards collected, cutscenes viewed
   - Conversion events: email capture, subscription, NFT clicks

---

## ERROR HANDLING

**Invalid Commands:**
```
$ baebe --invalid

> Error: Command not recognized
> Type 'help' for available commands
```

**Access Denied:**
```
$ baebe --read 4

> Loading Chapter 4...
> [Error: Access Denied]
> 
> Chapter 4 requires paid subscription ($10/month) OR Resonance Level 4.
> 
> Options:
>   [Subscribe - $10/month]
>   [Collect 1 More Shard]
>   [View Status]
```

---

## IMPLEMENTATION PRIORITIES

**Phase 1 (MVP):**
1. Boot sequence
2. Cutscene 1 (The Drop)
3. Terminal interface
4. Help command
5. Read prologue + chapters 1-3 (free)
6. Shard collection
7. Status command
8. Email capture
9. Subscription CTA

**Phase 2:**
1. Cutscene 2 (The Awakening)
2. Subscription integration
3. Cutscene 3 (Breaking Free)
4. Paid chapters (4-20)
5. Shard unlock system
6. Lost chapters (at least 2-3)

**Phase 3:**
1. All interludes
2. All lost chapters
3. Character profiles
4. World-building documents
5. NFT collection page
6. Founding member upgrade
7. Full achievement system

---

## DESIGN INSPIRATION

**Visual Style:**
- Terminal/hacker aesthetic (like the Matrix, Hackers, or WarGames)
- Green monospace text on black
- Subtle glitch effects
- Cyberpunk atmosphere

**Reference:**
- Existing investor portal (check `/investor-portal` folder for style reference)
- Terminal windows with hacker green (#00ff00)
- Typing animations
- Minimal, focused UI

---

## DELIVERABLES

**Generate:**
1. Complete Next.js application with all routes
2. Terminal component with command parsing
3. Typing animation component
4. Video cutscene components (3 total)
5. Shard collection system
6. Status tracking
7. Subscription integration (Substack)
8. Responsive design (mobile + desktop)
9. All copy from the user experience flow
10. State management for user progress

**File Structure:**
```
/app
  /page.tsx (landing page)
  /terminal/page.tsx (terminal interface)
  /chapter/[id]/page.tsx (chapter reading)
  /interlude/[name]/page.tsx (interlude reading)
  /lost/[name]/page.tsx (lost chapter reading)
  /nft/page.tsx (NFT collection)
  /investor/page.tsx (investor portal link)
/components
  TerminalWindow.tsx
  TypingAnimation.tsx
  CutscenePlayer.tsx
  ShardTracker.tsx
  StatusDisplay.tsx
  CommandParser.tsx
/lib
  content.ts (all chapter/interlude/lost chapter content)
  state.ts (state management)
  subscriptions.ts (Substack integration)
/styles
  globals.css (hacker theme)
```

---

## ADDITIONAL NOTES

- All copy is provided in the user experience flow above
- Content files (chapters, interludes, lost chapters) should be stored as markdown or JSON
- Video files should be hosted separately (or use placeholder videos for MVP)
- Ensure smooth transitions between all states
- Make it feel like a real terminal - users should feel like they're "hacking into the story"
- Gamification should feel rewarding, not grindy
- Premium content should feel valuable and exclusive

---

**Start building!** Use this prompt as your complete specification. The user experience flow above contains all the exact copy and interactions needed.

