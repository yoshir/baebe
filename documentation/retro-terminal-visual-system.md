# BAEBE: Retro Terminal Visual System
## 80s CRT/CLI Aesthetic with Unlockable ASCII Art & Cinematics

**Version:** v.20251112-0949  
**Last Updated:** 2025-11-12  
**Format:** Retro Terminal Interface with Unlockable Visuals  
**Goal:** Glitchy computer graphics, ASCII art, simple 3D diagrams

---

## VISUAL AESTHETIC: 80s CRT TERMINAL

### Core Design

**Terminal Style:**
- Green/cyan text on black background
- Monospace font (Courier, Monaco, or similar)
- CRT scanlines effect
- Screen flicker/glitch
- Typing animation (character by character)
- Cursor blink

**Color Palette:**
```css
Background: #000000 (pure black)
Text: #00FF41 (green) or #00FFFF (cyan)
Glitch: #FF00FF (magenta), #FFFF00 (yellow)
Scanlines: rgba(0, 255, 65, 0.1)
```

**Effects:**
- CRT curvature (slight)
- Scanline overlay
- Screen flicker
- Glitch effects (random character corruption)
- Phosphor glow (text trails)

---

## PSEUDOCODE INTERFACE EXAMPLES

### Example 1: System Boot Sequence

```pseudocode
> SYSTEM_BOOT()

[Screen flickers]
[Green text appears character by character]

┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ██████╗  █████╗ ███████╗███████╗███████╗              │
│  ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝              │
│  ██████╔╝███████║█████╗  █████╗  █████╗                │
│  ██╔══██╗██╔══██║██╔══╝  ██╔══╝  ██╔══╝                │
│  ██████╔╝██║  ██║██║     ██║     ███████╗              │
│  ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝     ╚══════╝              │
│                                                         │
│  MYSTERY UNLOCK SYSTEM v1.0                            │
│  Connecting to O1 Network...                            │
│                                                         │
│  [Glitch effect]                                       │
│  Connection: FAILED                                    │
│  Switching to offline mode...                          │
│                                                         │
│  System ready.                                         │
│  Type 'help' for commands.                             │
│                                                         │
└─────────────────────────────────────────────────────────┘

> [cursor blinks]
```

### Example 2: Mystery Unlock with ASCII Art

```pseudocode
> unlock 1

[Screen glitches]
[Text scrolls character by character]

┌─────────────────────────────────────────────────────────┐
│                                                         │
│  SCANNING SYSTEM...                                     │
│                                                         │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│  100%                                                   │
│                                                         │
│  MYSTERY #001 DETECTED                                  │
│  Frequency: 440 Hz                                      │
│                                                         │
│  Tuning frequency...                                    │
│                                                         │
│      ╔═══╗                                             │
│      ║   ║                                             │
│      ║ ● ║  [Frequency meter animates]                 │
│      ║   ║                                             │
│      ╚═══╝                                             │
│                                                         │
│  Frequency: 440 Hz ✓                                    │
│  Resonance: 100%                                        │
│                                                         │
│  [Massive ASCII art scrolls down]                      │
│                                                         │
│      ██████╗ ██╗   ██╗███████╗██████╗ ██╗   ██╗       │
│      ██╔══██╗██║   ██║██╔════╝██╔══██╗╚██╗ ██╔╝       │
│      ██████╔╝██║   ██║█████╗  ██████╔╝ ╚████╔╝        │
│      ██╔══██╗██║   ██║██╔══╝  ██╔══██╗  ╚██╔╝         │
│      ██████╔╝╚██████╔╝███████╗██║  ██║   ██║          │
│      ╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝   ╚═╝          │
│                                                         │
│      ██╗   ██╗███████╗██████╗                          │
│      ██║   ██║██╔════╝██╔══██╗                         │
│      ██║   ██║█████╗  ██████╔╝                         │
│      ╚██╗ ██╔╝██╔══╝  ██╔══██╗                         │
│       ╚████╔╝ ███████╗██║  ██║                         │
│        ╚═══╝  ╚══════╝╚═╝  ╚═╝                         │
│                                                         │
│  MYSTERY UNLOCKED                                       │
│                                                         │
│  "Four bodies fall from near-space.                    │
│   One is different. One remembers.                     │
│   One will break everything."                          │
│                                                         │
│  [Read Chapter 1 →]                                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Example 3: Glitchy System Scan

```pseudocode
> scan

[Screen flickers]
[Random characters glitch]

┌─────────────────────────────────────────────────────────┐
│                                                         │
│  INITIATING SYSTEM SCAN...                              │
│                                                         │
│  [Glitch: random characters appear]                     │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│                                                         │
│  Scanning network nodes...                             │
│  ████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  45%                                                   │
│                                                         │
│  [Glitch effect]                                       │
│  ERROR: Network interference detected                  │
│  Switching to local scan...                            │
│                                                         │
│  MYSTERIES DETECTED: 3                                 │
│                                                         │
│  [1] Mystery #001 - "The Drop" (UNLOCKED)              │
│  [2] Mystery #002 - "Awakening" (UNLOCKED)             │
│  [3] Mystery #003 - "The Tower" (LOCKED)               │
│                                                         │
│  Type 'unlock [number]' to unlock.                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## UNLOCKABLE VISUAL SEQUENCES

### Sequence Type 1: ASCII Art Scrolls

**When Unlocked:** Mystery unlock, achievement, milestone

**Format:**
```pseudocode
FUNCTION unlock_ascii_sequence(type):
  CLEAR_SCREEN()
  
  ASCII_ART = GET_ASCII_ART(type)
  
  FOR each_line in ASCII_ART:
    SCROLL_DOWN(line)
    WAIT(0.05 seconds)
    [Glitch effect randomly]
  
  DISPLAY_MYSTERY_TEXT()
  
  RETURN_TO_INTERFACE()
```

**Example ASCII Art:**

```
MYSTERY #001 UNLOCKED:

    ██╗   ██╗██╗ ██████╗████████╗ ██████╗ ██████╗ ██╗   ██╗
    ██║   ██║██║██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗╚██╗ ██╔╝
    ██║   ██║██║██║        ██║   ██║   ██║██████╔╝ ╚████╔╝ 
    ╚██╗ ██╔╝██║██║        ██║   ██║   ██║██╔══██╗  ╚██╔╝  
     ╚████╔╝ ██║╚██████╗   ██║   ╚██████╔╝██║  ██║   ██║   
      ╚═══╝  ╚═╝ ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝   ╚═╝   
                                                             
    ██████╗ ██╗   ██╗███████╗██╗                             
    ██╔══██╗██║   ██║██╔════╝██║                             
    ██████╔╝██║   ██║█████╗  ██║                             
    ██╔══██╗██║   ██║██╔══╝  ██║                             
    ██████╔╝╚██████╔╝███████╗███████╗                       
    ╚═════╝  ╚═════╝ ╚══════╝╚══════╝                       
```

### Sequence Type 2: Glitchy Data Streams

**When Unlocked:** System scan, frequency tuning, network events

**Format:**
```pseudocode
FUNCTION show_data_stream():
  CLEAR_SCREEN()
  
  FOR i = 0 to 100:
    line = GENERATE_RANDOM_BINARY()
    DISPLAY(line)
    SCROLL_UP()
    WAIT(0.02 seconds)
    
    IF random() < 0.1:
      GLITCH_EFFECT() // Random characters corrupt
    
  REVEAL_CONTENT()
```

**Example:**
```
01001000 01100101 01101100 01101100 01101111
01010111 01101111 01110010 01101100 01100100
[Glitch: 0█1█0█0█1█0█0█0█]
01000010 01000001 01000101 01000010 01000101
01101000 01100001 01100011 01101011 01100101
01010010 00100000 01001101 01000101
```

### Sequence Type 3: Simple 3D Diagrams

**When Unlocked:** System architecture, component visualization, world state

**Format:**
```pseudocode
FUNCTION show_3d_diagram(type):
  CLEAR_SCREEN()
  
  DISPLAY_ASCII_FRAME()
  
  IF type == "system_architecture":
    SHOW_ASCII_DIAGRAM("
          ┌─────────────┐
          │   O1 CORE   │
          └──────┬──────┘
                 │
        ┌────────┼────────┐
        │        │        │
     ┌──▼──┐  ┌──▼──┐  ┌──▼──┐
     │Node │  │Node │  │Node │
     │ #1  │  │ #2  │  │ #3  │
     └─────┘  └─────┘  └─────┘
    ")
  
  IF type == "frequency_spectrum":
    SHOW_ASCII_WAVEFORM("
      Frequency Spectrum:
      
      │     ╱╲     ╱╲
      │    ╱  ╲   ╱  ╲
      │   ╱    ╲ ╱    ╲
      │  ╱      ╲      ╲
      │ ╱        ╲      ╲
      │╱          ╲      ╲
      └────────────────────
       440  528  639  741
    ")
  
  ANIMATE_DIAGRAM()
  RETURN_TO_INTERFACE()
```

### Sequence Type 4: Massive ASCII Scrolls

**When Unlocked:** Major milestones, chapter completions, special events

**Format:**
```pseudocode
FUNCTION massive_ascii_scroll(content):
  CLEAR_SCREEN()
  
  ASCII_CONTENT = GENERATE_ASCII_ART(content)
  
  FOR each_line in ASCII_CONTENT:
    SCROLL_DOWN(line)
    WAIT(0.03 seconds)
    
    IF line_number % 10 == 0:
      GLITCH_EFFECT()
      SCREEN_FLICKER()
  
  PAUSE(2 seconds)
  FADE_OUT()
  RETURN_TO_INTERFACE()
```

**Example Content:**
- Character portraits (Baebe, Taivalu, Ayumi)
- World maps (O1 Tower, Undercity, Sanctuaries)
- System diagrams (Network architecture, frequency fields)
- Story moments (key scenes in ASCII)

---

## GLITCH EFFECTS

### Glitch Types

**1. Character Corruption**
```pseudocode
FUNCTION glitch_text(text):
  corrupted = text
  FOR i = 0 to random(3, 10):
    pos = RANDOM_POSITION(text)
    corrupted[pos] = RANDOM_CHARACTER()
  RETURN corrupted
```

**2. Screen Flicker**
```pseudocode
FUNCTION screen_flicker():
  FOR i = 0 to random(2, 5):
    SCREEN_OFF()
    WAIT(0.05 seconds)
    SCREEN_ON()
    WAIT(0.05 seconds)
```

**3. Scanline Glitch**
```pseudocode
FUNCTION scanline_glitch():
  FOR i = 0 to screen_height:
    IF random() < 0.1:
      DRAW_GLITCH_LINE(i)
```

**4. Random Character Flood**
```pseudocode
FUNCTION character_flood():
  FOR i = 0 to random(10, 50):
    char = RANDOM_CHARACTER()
    pos = RANDOM_POSITION()
    DISPLAY_AT(char, pos)
    WAIT(0.01 seconds)
    CLEAR(char)
```

---

## UNLOCKABLE MOMENTS

### Moment 1: System Architecture Reveal

**Trigger:** Unlock Mystery #001

```pseudocode
> unlock 1
> tune 440

[Screen glitches]
[Massive ASCII scroll]

┌─────────────────────────────────────────────────────────┐
│                                                         │
│  SYSTEM ARCHITECTURE REVEALED                           │
│                                                         │
│          ╔═══════════════════════╗                     │
│          ║      O1 NETWORK       ║                     │
│          ║      CORE SYSTEM      ║                     │
│          ╚═══════╦═══════════════╝                     │
│                  │                                     │
│        ┌─────────┼─────────┐                          │
│        │         │         │                           │
│     ╔══╧══╗   ╔══╧══╗   ╔══╧══╗                        │
│     ║Node ║   ║Node ║   ║Node ║                        │
│     ║ #1  ║   ║ #2  ║   ║ #3  ║                        │
│     ╚═════╝   ╚═════╝   ╚═════╝                        │
│        │         │         │                           │
│        ▼         ▼         ▼                           │
│     ┌─────┐   ┌─────┐   ┌─────┐                       │
│     │User │   │User │   │User │                        │
│     │ #1  │   │ #2  │   │ #3  │                        │
│     └─────┘   └─────┘   └─────┘                       │
│                                                         │
│  You are here: [highlighted]                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Moment 2: Frequency Spectrum Visualization

**Trigger:** Tune to any frequency

```pseudocode
> tune 528

[ASCII waveform animates]

┌─────────────────────────────────────────────────────────┐
│                                                         │
│  FREQUENCY SPECTRUM                                     │
│                                                         │
│  Amplitude                                              │
│    │                                                    │
│    │     ╱╲     ╱╲                                      │
│    │    ╱  ╲   ╱  ╲                                     │
│    │   ╱    ╲ ╱    ╲                                    │
│    │  ╱      ╲      ╲                                   │
│    │ ╱        ╲      ╲                                  │
│    │╱          ╲      ╲                                 │
│    └────────────────────────────────────                │
│     440  528  639  741  852  963                        │
│     Hz   Hz   Hz   Hz   Hz   Hz                         │
│                                                         │
│  Current: 528 Hz ✓                                      │
│  Resonance: 100%                                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Moment 3: Character Portrait (ASCII)

**Trigger:** Unlock character-related mystery

```pseudocode
> unlock 8  // Meeting Taivalu

[Massive ASCII art scrolls]

┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    TAIVALU                              │
│                                                         │
│              ████████████████                           │
│            ██              ██                           │
│          ██    ██      ██    ██                         │
│        ██    ██████  ██████    ██                       │
│      ██    ██  ██  ██  ██  ██    ██                     │
│    ██    ██    ██  ██    ██    ██  ██                   │
│  ██    ██      ██████      ██    ██  ██                 │
│  ██  ██        ██  ██        ██  ██                    │
│  ██  ██      ██      ██      ██  ██                     │
│    ██  ██  ██          ██  ██  ██                       │
│      ██  ██              ██  ██                         │
│        ██                  ██                           │
│                                                         │
│  Frequency: 528 Hz (Healing)                            │
│  Status: Imprisoned                                      │
│  Ability: Empathy Virus                                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Moment 4: World Map (ASCII)

**Trigger:** Unlock world-related mystery

```pseudocode
> unlock 4  // The Fall

[ASCII map scrolls]

┌─────────────────────────────────────────────────────────┐
│                                                         │
│  BAEBE WORLD MAP                                        │
│                                                         │
│      [O1 TOWER]                                         │
│           │                                              │
│           │                                              │
│           ▼                                              │
│      [UNDERCITY]                                        │
│           │                                              │
│           │                                              │
│           ▼                                              │
│    [SANCTUARY ZONES]                                    │
│                                                         │
│  Your location: [highlighted]                            │
│                                                         │
│  O1 Zones: ████████████ (75% converted)                │
│  Free Zones: ████ (25% remaining)                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## SIMPLE 3D DIAGRAMS

### Using ASCII for 3D Effect

**Isometric View:**
```pseudocode
FUNCTION show_3d_ascii_diagram():
  DISPLAY("
      O1 TOWER (Isometric)
      
          ╱╲
         ╱  ╲
        ╱    ╲
       ╱      ╲
      ╱        ╲
     ╱          ╲
    ╱            ╲
   ╱              ╲
  ╱────────────────╲
  │                │
  │                │
  │                │
  │                │
  └────────────────┘
  ")
```

**Or use simple WebGL (optional):**
- Wireframe 3D models
- Simple geometry
- Low poly count
- Retro aesthetic

---

## IMPLEMENTATION

### CSS for CRT Effect

```css
.terminal {
  background: #000000;
  color: #00FF41;
  font-family: 'Courier New', monospace;
  position: relative;
  overflow: hidden;
}

/* CRT Scanlines */
.terminal::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 255, 65, 0.03) 0px,
    rgba(0, 255, 65, 0.03) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
}

/* Screen Flicker */
@keyframes flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.98; }
}

.terminal {
  animation: flicker 0.15s infinite;
}

/* Glitch Effect */
@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

.glitch {
  animation: glitch 0.3s infinite;
}
```

### JavaScript for ASCII Art

```typescript
// ASCII Art Generator
function generateASCIIArt(text: string, style: 'block' | 'simple'): string {
  // Use library like figlet.js for ASCII art generation
  // Or pre-made ASCII art stored as strings
  
  const asciiArt = {
    'BAEBE': `
    ██████╗  █████╗ ███████╗███████╗███████╗
    ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝
    ██████╔╝███████║█████╗  █████╗  █████╗  
    ██╔══██╗██╔══██║██╔══╝  ██╔══╝  ██╔══╝  
    ██████╔╝██║  ██║██║     ██║     ███████╗
    ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝     ╚══════╝
    `,
    // Add more ASCII art
  }
  
  return asciiArt[text] || text
}

// Scroll Effect
function scrollASCII(asciiArt: string, speed: number = 50) {
  const lines = asciiArt.split('\n')
  
  lines.forEach((line, index) => {
    setTimeout(() => {
      appendToTerminal(line)
      if (Math.random() < 0.1) {
        glitchEffect() // Random glitch
      }
    }, index * speed)
  })
}
```

---

## UNLOCK SYSTEM

### When Sequences Unlock

**Mystery Unlock:**
- ASCII art scroll
- Character portrait (if character-related)
- System diagram (if system-related)

**Achievement:**
- Massive ASCII celebration
- Special visual sequence

**Chapter Completion:**
- World map update
- Story moment visualization

**Frequency Milestone:**
- Frequency spectrum visualization
- Resonance field diagram

---

## SIMPLE PSEUDOCODE GAMEPLAY

### Complete Flow with Visuals

```pseudocode
> unlock 1

[Screen glitches]
[CRT flicker]

DISPLAY: "SCANNING SYSTEM..."
ANIMATE_PROGRESS_BAR()

DISPLAY: "MYSTERY #001 DETECTED"
DISPLAY: "Frequency: 440 Hz"

DISPLAY: "Tuning frequency..."
SHOW_FREQUENCY_METER(440)

USER_TYPES: "tune 440"

PLAY_FREQUENCY_TONE(440)
ANIMATE_FREQUENCY_METER(440)

IF frequency_matches(440):
  SCREEN_GLITCH()
  SCROLL_ASCII_ART("MYSTERY_UNLOCKED")
  DISPLAY_MYSTERY_TEXT()
  AWARD_NFT()
  
  [Optional: Show 3D diagram]
  IF mystery.has_diagram:
    SHOW_3D_DIAGRAM(mystery.diagram_type)
```

---

## SUMMARY

**Visual System:**
- 80s CRT terminal aesthetic
- Green/cyan text on black
- Glitch effects, scanlines, flicker
- ASCII art sequences
- Simple 3D diagrams (ASCII or WebGL)
- Massive scrolls for milestones

**Unlockable Moments:**
- ASCII art scrolls
- Character portraits
- System diagrams
- World maps
- Frequency visualizations
- Story moments

**Simple to Build:**
- CSS for CRT effects
- JavaScript for ASCII art
- Pre-made ASCII art strings
- Optional simple WebGL (wireframe)

**Update Process:**
- Add ASCII art string
- Add to unlock trigger
- Deploy
- Done (5 minutes)

---

**Document Status:** Visual Design  
**Implementation:** CSS + JavaScript + ASCII Art  
**Complexity:** Low (mostly text/CSS)  
**Related Documents:**
- Text-Based Game NFT System
- Chapter Synchronized Mystery Unlock








