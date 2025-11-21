# BAEBE Mystery Unlock Game - User Guide
## Complete Guide to Playing the BAEBE Interactive Experience

**Version:** v.20251112-0949  
**Last Updated:** 2025-11-12  
**Platform:** Web Browser (Next.js)  
**Location:** `/baebe-demo` (or production URL)

---

## TABLE OF CONTENTS

1. [Getting Started](#getting-started)
2. [How to Play](#how-to-play)
3. [Commands Reference](#commands-reference)
4. [Mystery System](#mystery-system)
5. [Frequency Tuning](#frequency-tuning)
6. [Visual Features](#visual-features)
7. [Tips & Tricks](#tips--tricks)
8. [Troubleshooting](#troubleshooting)

---

## GETTING STARTED

### First Time Setup

1. **Open the Game**
   - Navigate to the game URL (e.g., `http://localhost:9000/baebe-demo`)
   - The terminal window will appear automatically

2. **Boot Sequence**
   - Watch the automatic boot sequence (3-5 seconds)
   - System will connect to O1 Network (will fail - this is normal)
   - System switches to offline mode
   - You'll see: "System ready. Type 'help' for commands."

3. **Start Playing**
   - Type `help` to see all available commands
   - Type `scan` to find mysteries
   - Begin your journey!

---

## HOW TO PLAY

### Basic Gameplay Loop

```
1. Scan for mysteries → 2. Unlock a mystery → 3. Tune frequency → 
4. Mystery unlocks → 5. Read mystery text → 6. Continue to next mystery
```

### Step-by-Step Example

**Step 1: See Available Mysteries**
```
> scan
```
Shows all available mysteries and their status (locked/unlocked)

**Step 2: Choose a Mystery**
```
> unlock 1
```
Starts the unlock process for Mystery #001

**Step 3: Tune Frequency**
```
> tune 440
```
Tune to the required frequency (440 Hz for Mystery #001)

**Step 4: Mystery Unlocks**
- ASCII art sequence plays
- Road animation shows
- Mystery text is revealed

**Step 5: Continue**
- Type `status` to see your progress
- Type `unlock 2` for the next mystery
- Repeat!

---

## COMMANDS REFERENCE

### Core Commands

#### `help`
**Description:** Shows all available commands  
**Usage:** `help`  
**Example:**
```
> help

Available Commands:
  scan          - Scan for available mysteries
  unlock [num]  - Unlock mystery number [num]
  tune [freq]   - Tune to frequency [freq] Hz
  read [num]    - Read chapter [num]
  status        - See your progress
  clear         - Clear screen
```

#### `scan`
**Description:** Scans the system for available mysteries  
**Usage:** `scan`  
**Example:**
```
> scan

Scanning system...

Mysteries detected: 3

Available Mysteries:
  [1] Mystery #001 - "The Drop" (LOCKED)
  [2] Mystery #002 - "Awakening" (LOCKED)
  [3] Mystery #003 - "The Tower" (LOCKED)
```

#### `unlock [number]`
**Description:** Starts the unlock process for a specific mystery  
**Usage:** `unlock 1` (replace 1 with mystery number)  
**Example:**
```
> unlock 1

MYSTERY #001: "The Drop"
Frequency Required: 440 Hz

Tune to the correct frequency to unlock this mystery.
Type: tune [frequency]
```

**Notes:**
- Must use a valid mystery number
- Mystery must not already be unlocked
- Chapter must be released (for locked mysteries)

#### `tune [frequency]`
**Description:** Tunes to a specific frequency in Hz  
**Usage:** `tune 440` (replace 440 with desired frequency)  
**Example:**
```
> tune 440

Frequency: 440 Hz ✓
Resonance: 100%
MYSTERY UNLOCKED
```

**How It Works:**
- Enter the frequency in Hz (e.g., 440, 528, 639)
- Must be within ±5 Hz of target frequency
- Visual meter shows your progress
- Correct frequency unlocks the mystery

**Frequency Tips:**
- Each mystery has a specific frequency
- Frequencies relate to the story (characters, themes)
- Common frequencies: 440, 528, 639, 741, 852, 963

#### `status`
**Description:** Shows your current progress  
**Usage:** `status`  
**Example:**
```
> status

YOUR PROGRESS:
  Mysteries Unlocked: 2/3
  Current Frequency: 528 Hz
  Chapters Read: 1/3

Type 'scan' to see all mysteries.
```

#### `clear`
**Description:** Clears the terminal screen  
**Usage:** `clear`  
**Example:**
```
> clear
[Screen clears]
```

#### `read [number]`
**Description:** Links to read a specific chapter (future feature)  
**Usage:** `read 1`  
**Note:** Currently shows placeholder - will link to actual chapters

#### `test` (Demo Only)
**Description:** Tests the road animation directly  
**Usage:** `test`  
**Note:** Demo feature - shows road animation without unlocking mystery

---

## MYSTERY SYSTEM

### What Are Mysteries?

**Mysteries** are encrypted story fragments that unlock as you progress. Each mystery:
- Hints at a chapter in the BAEBE book
- Requires a specific frequency to unlock
- Reveals a poetic, mysterious text
- Creates curiosity to read the full chapter

### Mystery Structure

Each mystery contains:
- **ID Number:** Mystery #001, #002, etc.
- **Title:** Chapter title (e.g., "The Drop")
- **Frequency:** Required frequency to unlock (e.g., 440 Hz)
- **Mystery Text:** 1-3 sentences that hint at the chapter
- **Status:** Locked or Unlocked

### Mystery List

**Mystery #001: "The Drop"**
- Frequency: 440 Hz (Tonic - Baebe's frequency)
- Text: "Four bodies fall from near-space. One is different. One remembers. One will break everything."
- Chapter: Chapter 1

**Mystery #002: "Awakening"**
- Frequency: 528 Hz (Healing)
- Text: "A face. A vision. A memory breaking through. Who is she? Why does it hurt?"
- Chapter: Chapter 2

**Mystery #003: "The Tower"**
- Frequency: 639 Hz (Connection - Taivalu)
- Text: "Waveforms dance in the air. A woman transforms. Not death. Something else. What is he doing?"
- Chapter: Chapter 3

### Unlocking Mysteries

**Process:**
1. Type `unlock [number]` to select a mystery
2. System shows required frequency
3. Type `tune [frequency]` to tune
4. If correct (within ±5 Hz), mystery unlocks
5. ASCII art sequence plays
6. Road animation shows
7. Mystery text is revealed

**Tips:**
- Each mystery has a unique frequency
- Frequencies relate to story themes
- Unlock in order for best experience
- Read chapters to understand mysteries

---

## FREQUENCY TUNING

### What Are Frequencies?

**Frequencies** are sound waves measured in Hz (Hertz). In BAEBE:
- Each mystery requires a specific frequency
- Frequencies relate to characters and themes
- Tuning correctly unlocks mysteries
- Frequencies create resonance

### Frequency Meanings

**440 Hz - Tonic (Baebe)**
- Baebe's fundamental frequency
- Blue spectrum, cold, tactical
- Mystery #001: "The Drop"

**528 Hz - Healing**
- DNA repair frequency
- Green spectrum, healing
- Mystery #002: "Awakening"

**639 Hz - Connection (Taivalu)**
- Connection, relationships
- Amber spectrum, warm
- Mystery #003: "The Tower"

**741 Hz - Expression**
- Creativity, expression
- Purple spectrum
- Disrupts digital systems

**852 Hz - Intuition**
- Inner strength, intuition
- Gold spectrum

**963 Hz - Source**
- Oneness, source connection
- Red spectrum

### How to Tune

1. **Select Mystery**
   ```
   > unlock 1
   ```
   System shows required frequency

2. **Enter Frequency**
   ```
   > tune 440
   ```
   Type the frequency in Hz

3. **Check Result**
   - If correct: Mystery unlocks!
   - If incorrect: Try again (must be within ±5 Hz)

4. **Visual Feedback**
   - Frequency meter shows your tuning
   - Resonance percentage displayed
   - Color changes when aligned

### Frequency Meter

The frequency meter shows:
- **Current Frequency:** What you've tuned to
- **Target Frequency:** What's required
- **Resonance:** How close you are (0-100%)
- **Visual Bar:** Progress indicator

**Reading the Meter:**
- Bar fills as you get closer
- Green = correct frequency
- Red = too far off
- Yellow = getting close

---

## VISUAL FEATURES

### ASCII Art Sequences

**When They Appear:**
- Mystery unlocks
- Major milestones
- Achievements

**Types:**
- Mystery unlocked banners
- Character portraits
- System architecture diagrams
- World maps

**How They Work:**
- Scroll down automatically
- Line by line animation
- Creates dramatic reveal
- Duration: 3-5 seconds

### Road Animation

**When It Plays:**
- Mystery unlocks successfully
- Type `test` command (demo)

**What It Shows:**
- Perspective road (vanishing point)
- Forward movement illusion
- Creates sense of journey
- Duration: 5 seconds

**Visual Effect:**
- Road narrows as it goes away
- Center line dashes
- Roadside markers
- Smooth animation

### Terminal Aesthetic

**Design Elements:**
- Green/cyan text on black
- Monospace font
- CRT scanlines effect
- Screen flicker
- Glitch effects
- Typing animation

**Color Scheme:**
- Background: Pure black (#000000)
- Text: Green (#00ff41) or Cyan (#00ffff)
- Glitch: Magenta, Yellow
- Scanlines: Semi-transparent green

---

## TIPS & TRICKS

### For Beginners

1. **Start with Help**
   - Always type `help` first
   - Learn all available commands
   - Understand the system

2. **Scan First**
   - Type `scan` to see all mysteries
   - Note which are locked/unlocked
   - Plan your journey

3. **Unlock in Order**
   - Start with Mystery #001
   - Progress sequentially
   - Build understanding

4. **Frequency Hints**
   - Each mystery shows required frequency
   - Common frequencies: 440, 528, 639
   - Must be within ±5 Hz

5. **Use Status**
   - Type `status` regularly
   - Track your progress
   - See what you've unlocked

### For Advanced Players

1. **Frequency Patterns**
   - Frequencies relate to story themes
   - Characters have signature frequencies
   - Learn the patterns

2. **Mystery Connections**
   - Mysteries hint at chapters
   - Read chapters to understand
   - Connect the dots

3. **Visual Appreciation**
   - Watch ASCII art sequences
   - Enjoy road animations
   - Appreciate the aesthetic

4. **Experiment**
   - Try different frequencies
   - Test commands
   - Explore the system

### Pro Tips

- **Clear Screen:** Use `clear` to reset view
- **Check Progress:** `status` shows your journey
- **Read Mysteries:** Each mystery hints at a chapter
- **Frequency Accuracy:** Must be within ±5 Hz
- **Visual Feedback:** Watch the frequency meter

---

## TROUBLESHOOTING

### Common Issues

**Problem: "Unknown command"**
- **Solution:** Type `help` to see all commands
- **Check:** Make sure you're typing correctly
- **Note:** Commands are case-insensitive

**Problem: "Mystery not found"**
- **Solution:** Type `scan` to see available mysteries
- **Check:** Use correct mystery number
- **Note:** Some mysteries may be locked

**Problem: Frequency not working**
- **Solution:** Must be within ±5 Hz of target
- **Check:** Mystery shows required frequency
- **Example:** If target is 440, try 438-442

**Problem: Screen not clearing**
- **Solution:** Type `clear` command
- **Check:** Make sure you're in the terminal
- **Note:** Some animations may continue

**Problem: Road animation not showing**
- **Solution:** Unlock a mystery first
- **Check:** Type `test` to test directly
- **Note:** Animation plays automatically on unlock

### Getting Help

**In-Game Help:**
- Type `help` for commands
- Type `status` for progress
- Type `scan` for mysteries

**Technical Issues:**
- Check browser console for errors
- Refresh the page
- Clear browser cache

**Game Issues:**
- Make sure you're on correct URL
- Check internet connection
- Try different browser

---

## FREQUENTLY ASKED QUESTIONS

### Q: How do I start playing?
**A:** Open the game, wait for boot sequence, type `help` to see commands, then type `scan` to find mysteries.

### Q: What frequencies should I use?
**A:** Each mystery shows its required frequency. Common ones: 440, 528, 639 Hz.

### Q: How accurate do frequencies need to be?
**A:** Within ±5 Hz of the target frequency.

### Q: What happens when I unlock a mystery?
**A:** ASCII art plays, road animation shows, mystery text is revealed.

### Q: Can I unlock mysteries out of order?
**A:** Yes, but unlocking in order provides better story flow.

### Q: What do the mysteries mean?
**A:** Each mystery hints at a chapter. Read the chapters to understand fully.

### Q: How many mysteries are there?
**A:** Currently 3 in demo. More will be added as chapters release.

### Q: Can I replay animations?
**A:** Unlock the mystery again, or use `test` command for road animation.

### Q: What's the purpose of the game?
**A:** To create curiosity, drive book engagement, and provide interactive experience.

### Q: Is there sound?
**A:** Currently visual only. Sound may be added in future updates.

---

## ADVANCED FEATURES

### Future Features (Coming Soon)

**NFT Rewards:**
- Earn NFTs for unlocking mysteries
- Collect character portraits
- Achievement badges
- Distribution codes

**Sound Integration:**
- Frequency tones
- Unlock sounds
- Ambient background
- Glitch effects

**More Animations:**
- Character portraits
- System diagrams
- World maps
- Story moments

**Chapter Integration:**
- Direct links to chapters
- Read in-game
- Progress tracking
- Book purchase links

---

## GAME LEVELS / STORYLINES

### Level 1: The Drop (Mystery #001)
- **Frequency:** 440 Hz
- **Theme:** Beginning, falling, awakening
- **Visual:** Road animation (falling through space)
- **ASCII:** Mystery unlocked banner

### Level 2: Awakening (Mystery #002)
- **Frequency:** 528 Hz
- **Theme:** Memory breaking through
- **Visual:** Character portrait
- **ASCII:** Face emerging from static

### Level 3: The Tower (Mystery #003)
- **Frequency:** 639 Hz
- **Theme:** Meeting, connection, family
- **Visual:** System architecture
- **ASCII:** Network nodes connecting

---

## KEYBOARD SHORTCUTS

**Enter:** Submit command  
**Arrow Keys:** (Future: Command history)  
**Tab:** (Future: Auto-complete)  
**Ctrl+C:** (Future: Cancel command)

---

## SYSTEM REQUIREMENTS

**Browser:**
- Chrome (recommended)
- Firefox
- Safari
- Edge

**Features:**
- JavaScript enabled
- Modern browser (ES6+)
- No plugins required

**Performance:**
- Works on desktop and mobile
- Responsive design
- Fast loading

---

## CONTACT & SUPPORT

**For Issues:**
- Check this guide first
- Review troubleshooting section
- Check browser console

**For Questions:**
- See FAQ section
- Check command reference
- Try `help` command

---

## VERSION HISTORY

**v.20251112-0949** (Current)
- Initial release
- 3 mysteries available
- ASCII art sequences
- Road animation
- Frequency tuning
- Terminal interface

---

**Document Status:** Complete User Guide  
**Last Updated:** 2025-11-12  
**Related Documents:**
- Chapter Synchronized Mystery Unlock
- Text-Based Game NFT System
- Retro Terminal Visual System

