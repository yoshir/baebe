# BAEBE Mystery Unlock Demo - User Journey Script

**Version:** v.20251112-0949  
**Location:** `/baebe-demo`  
**Purpose:** Interactive demo of the BAEBE mystery unlock game experience

---

## USER JOURNEY SCRIPT

### Phase 1: System Boot (Automatic)

**What Happens:**
1. User arrives at `/baebe-demo`
2. Terminal window appears
3. Boot sequence plays automatically:
   - "BAEBE MYSTERY UNLOCK SYSTEM v1.0"
   - "Connecting to O1 Network..."
   - "[Glitch effect]"
   - "Connection: FAILED"
   - "Switching to offline mode..."
   - "System ready."
   - "Type 'help' for commands."

**Duration:** ~3 seconds
**User Action:** None (automatic)

---

### Phase 2: Discovery (User Explores)

**User Types:** `help`

**System Responds:**
```
Available Commands:
  scan          - Scan for available mysteries
  unlock [num]  - Unlock mystery number [num]
  tune [freq]   - Tune to frequency [freq] Hz
  read [num]    - Read chapter [num]
  status        - See your progress
  clear         - Clear screen
```

**User Action:** User learns available commands

---

### Phase 3: Scanning for Mysteries

**User Types:** `scan`

**System Responds:**
```
Scanning system...

Mysteries detected: 3

Available Mysteries:
  [1] Mystery #001 - "The Drop" (LOCKED)
  [2] Mystery #002 - "Awakening" (LOCKED)
  [3] Mystery #003 - "The Tower" (LOCKED)

Type 'unlock [number]' to unlock a mystery.
```

**User Action:** User sees available mysteries

---

### Phase 4: Unlocking a Mystery

**User Types:** `unlock 1`

**System Responds:**
```
MYSTERY #001: "The Drop"
Frequency Required: 440 Hz

Tune to the correct frequency to unlock this mystery.
Type: tune [frequency]
```

**User Action:** User must tune to correct frequency

---

### Phase 5: Frequency Tuning

**User Types:** `tune 440`

**System Responds:**
- Frequency meter appears
- Shows current frequency: 440 Hz
- If correct (within ±5 Hz):
  - "Frequency: 440 Hz ✓"
  - "Resonance: 100%"
  - "MYSTERY UNLOCKED"
  - ASCII art sequence scrolls down
  - Road animation plays (5 seconds)
  - Mystery text revealed

**If Incorrect:**
- "Frequency: [freq] Hz"
- "Target: 440 Hz"
- "Keep tuning..."

**User Action:** User tunes frequency until correct

---

### Phase 6: Mystery Revealed

**System Shows:**
1. **ASCII Art Sequence** (scrolls down):
   ```
   ╔═══════════════════════════════════════════════════════════╗
   ║                                                           ║
   ║  ███╗   ███╗██╗   ██╗███████╗████████╗███████╗██████╗     ║
   ║  ████╗ ████║╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔════╝██╔══██╗    ║
   ║  ██╔████╔██║ ╚████╔╝ ███████╗   ██║   █████╗  ██████╔╝    ║
   ║  ██║╚██╔╝██║  ╚██╔╝  ╚════██║   ██║   ██╔══╝  ██╔══██╗    ║
   ║  ██║ ╚═╝ ██║   ██║   ███████║   ██║   ███████╗██║  ██║    ║
   ║  ╚═╝     ╚═╝   ╚═╝   ╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝    ║
   ║                                                           ║
   ║  ██╗   ██╗██╗ ██████╗████████╗ ██████╗ ██████╗ ██╗   ██╗  ║
   ║  ██║   ██║██║██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗╚██╗ ██╔╝  ║
   ║  ██║   ██║██║██║        ██║   ██║   ██║██████╔╝ ╚████╔╝   ║
   ║  ╚██╗ ██╔╝██║██║        ██║   ██║   ██║██╔══██╗  ╚██╔╝    ║
   ║   ╚████╔╝ ██║╚██████╗   ██║   ╚██████╔╝██║  ██║   ██║     ║
   ║    ╚═══╝  ╚═╝ ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝   ╚═╝     ║
   ║                                                           ║
   ╚═══════════════════════════════════════════════════════════╝
   ```

2. **Road Animation** (forward movement):
   - ASCII road with perspective
   - Creates illusion of moving forward
   - Duration: 5 seconds

3. **Mystery Text:**
   ```
   "Four bodies fall from near-space.
    One is different. One remembers.
    One will break everything."
   
   [Read Chapter to understand this mystery]
   ```

**User Action:** User reads mystery, feels curiosity

---

### Phase 7: Continue Journey

**User Can:**
- Type `status` to see progress
- Type `unlock 2` to unlock next mystery
- Type `scan` to see all mysteries again
- Type `clear` to clear screen

**System Tracks:**
- Mysteries unlocked
- Progress percentage
- Current frequency

---

## VISUAL ELEMENTS

### ASCII Animations

**1. Road Animation:**
- Perspective road (vanishing point)
- Creates forward movement illusion
- Used when mystery unlocks
- Duration: 5 seconds

**2. ASCII Art Sequences:**
- Mystery unlocked banner
- Character portraits
- System architecture diagrams
- World maps

**3. Frequency Meter:**
- Visual bar showing frequency
- Updates in real-time
- Shows target vs current

---

## GAME LEVELS / STORYLINES

### Level 1: The Drop (Mystery #001)
- **Frequency:** 440 Hz (Tonic - Baebe's frequency)
- **Theme:** Beginning, falling, awakening
- **Visual:** Road animation (falling through space)
- **ASCII:** Mystery unlocked banner

### Level 2: Awakening (Mystery #002)
- **Frequency:** 528 Hz (Healing)
- **Theme:** Memory breaking through
- **Visual:** Character portrait (Baebe's face)
- **ASCII:** Face emerging from static

### Level 3: The Tower (Mystery #003)
- **Frequency:** 639 Hz (Connection - Taivalu)
- **Theme:** Meeting, connection, family
- **Visual:** System architecture diagram
- **ASCII:** Network nodes connecting

---

## FUTURE LEVEL IDEAS

### Simple ASCII Art Levels:
1. **Undercity Descent** - ASCII stairs going down
2. **Network Scan** - Binary code scrolling
3. **Frequency Storm** - Waveforms animating
4. **Memory Flash** - Glitchy text fragments
5. **Sanctuary Map** - ASCII world map

### 2D Levels:
1. **Side-scrolling escape** - Simple 2D platformer
2. **Frequency tuner** - Interactive slider
3. **Component diagram** - Clickable system parts
4. **Character portraits** - Animated faces

### Simple 3D Levels:
1. **O1 Tower** - Wireframe 3D tower
2. **Undercity** - Low-poly 3D environment
3. **Frequency field** - 3D visualization
4. **Network nodes** - 3D connection diagram

---

## TECHNICAL DETAILS

### Components Created:
1. **`/app/baebe-demo/page.tsx`** - Main demo page
2. **`/components/ASCIIRoadAnimation.tsx`** - Road movement animation
3. **`/components/ASCIIArtSequence.tsx`** - ASCII art scroll sequences

### How to Run:
```bash
cd investor-portal
npm run dev
# Visit: http://localhost:9000/baebe-demo
```

### Commands to Try:
- `help` - See all commands
- `scan` - Find mysteries
- `unlock 1` - Unlock first mystery
- `tune 440` - Tune to 440 Hz
- `status` - See progress
- `clear` - Clear screen

---

## NEXT STEPS

1. **Add More ASCII Animations:**
   - Character portraits
   - System diagrams
   - World maps
   - Story moments

2. **Add More Movement Animations:**
   - Stairs going down
   - Elevator going up
   - Flying through space
   - Running through undercity

3. **Add Sound:**
   - Frequency tones
   - Unlock sounds
   - Glitch effects
   - Ambient background

4. **Add More Mysteries:**
   - Connect to actual chapters
   - Add more frequencies
   - Create progression system

---

**Document Status:** User Journey Script  
**Demo Location:** `/baebe-demo`  
**Status:** Ready for Testing

