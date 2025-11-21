# GRID RUNNER - Functional Requirements Document (FRD)

**Version:** v.20251116-0000  
**Last Updated:** 2025-11-16  
**Status:** Draft  
**Document Owner:** Technical Team

---

## 1. DOCUMENT PURPOSE

This Functional Requirements Document (FRD) specifies the detailed functional requirements for GRID RUNNER, including system behavior, user interactions, data requirements, and technical specifications. This document complements the Product Requirements Document (PRD) and Game Design Document (GDD).

---

## 2. SYSTEM OVERVIEW

### 2.1 System Architecture

**Component Structure:**
```
┌─────────────────────────────────────┐
│     Baebe Demo Website (Host)       │
│  ┌───────────────────────────────┐  │
│  │   Terminal Interface          │  │
│  │   - Command Handler           │  │
│  │   - State Management          │  │
│  └───────────┬───────────────────┘  │
│              │                        │
│  ┌───────────▼───────────────────┐  │
│  │   GRID RUNNER Game Component   │  │
│  │   - Game Engine                │  │
│  │   - Renderer                  │  │
│  │   - Input Handler             │  │
│  │   - Save System               │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### 2.2 Technology Stack

- **Frontend Framework:** React/Next.js (Baebe demo integration)
- **Game Engine:** Custom HTML5 Canvas-based engine
- **Language:** TypeScript
- **Audio:** Web Audio API
- **Storage:** localStorage API
- **Rendering:** Canvas 2D Context

---

## 3. FUNCTIONAL REQUIREMENTS

### 3.1 Game Initialization

#### FR-001: Game Launch
**Description:** Game launches from Baebe demo terminal via `gridrunner` command

**Input:**
- Command: `gridrunner` (case-insensitive)
- Current game state: `menu`

**Process:**
1. Terminal receives command
2. State transitions to `gridrunner`
3. Game component mounts
4. Game engine initializes
5. Load saved game data (if exists)
6. Display main menu or resume game

**Output:**
- Game screen rendered
- Game state: `gridrunner`
- Terminal output: "Starting GRID RUNNER..."

**Error Handling:**
- If initialization fails: Display error message, return to menu
- If save data corrupted: Reset to default, notify user

**Dependencies:**
- Baebe demo page.tsx command handler
- Game component availability
- localStorage access

---

#### FR-002: Game State Management
**Description:** Game maintains internal state for gameplay, UI, and progression

**State Variables:**
```typescript
interface GameState {
  currentWorld: number
  currentLevel: number
  playerPosition: { x: number, y: number }
  playerForm: 'beep' | 'tone' | 'spark' | string
  collectedShards: string[]
  unlockedWorlds: number[]
  credits: number
  abilities: string[]
  gameMode: 'menu' | 'playing' | 'paused' | 'gameover' | 'victory'
}
```

**State Transitions:**
- `menu` → `playing`: Start new game or continue
- `playing` → `paused`: Pause command
- `playing` → `gameover`: Player fails
- `playing` → `victory`: Level complete
- `playing` → `menu`: Back command

**Persistence:**
- State saved to localStorage on:
  - Level completion
  - Shard collection
  - World unlock
  - Manual save (pause menu)
  - Game exit

---

### 3.2 Input Handling

#### FR-003: Keyboard Input
**Description:** Process keyboard input for game controls

**Input Mapping:**
```
Movement:
- Arrow Up / W: Move up
- Arrow Down / S: Move down
- Arrow Left / A: Move left
- Arrow Right / D: Move right

Actions:
- Space: Jump / Interact
- Enter: Confirm / Select
- Escape: Pause / Back to menu
- Shift: Run (if implemented)
```

**Processing:**
1. Capture keydown events
2. Map to game actions
3. Update player state
4. Trigger animations
5. Handle collisions

**Response Time:**
- Input latency < 16ms (1 frame at 60 FPS)
- Smooth movement without lag

**Error Handling:**
- Ignore invalid key combinations
- Handle key repeat appropriately
- Prevent default browser behavior for game keys

---

#### FR-004: Touch Input
**Description:** Process touch input for mobile devices

**Input Mapping:**
```
On-Screen Controls:
- D-Pad: Directional movement
- Action Button: Jump / Interact
- Menu Button: Pause / Menu
```

**Processing:**
1. Detect touch start/end events
2. Map touch positions to controls
3. Convert to game actions
4. Provide visual feedback

**Requirements:**
- Touch targets minimum 44x44px
- Responsive to touch input
- Works on tablets and phones
- Supports multi-touch (if needed)

---

### 3.3 Rendering System

#### FR-005: Canvas Rendering
**Description:** Render game graphics to HTML5 Canvas

**Canvas Setup:**
- Base resolution: 280x192 pixels (Apple II standard)
- Scaling: Integer scaling (2x, 3x, 4x) based on screen size
- Pixel-perfect rendering
- Smooth scaling without blur

**Rendering Pipeline:**
1. Clear canvas
2. Render background
3. Render platforms/walls
4. Render collectibles
5. Render enemies (Grid Bots)
6. Render player
7. Render UI overlay
8. Present frame

**Performance:**
- Target: 60 FPS
- Minimum: 30 FPS
- Frame time: < 16.67ms per frame

**Color Palette:**
```typescript
const COLORS = {
  background: '#000000',  // Black
  walls: '#FF6600',       // Red/Orange
  player: '#FFFF00',      // Yellow
  collectibles: '#00FF00', // Green
  text: '#00FF00',        // Green
  ui: '#00FF00'           // Green
}
```

---

#### FR-006: Sprite Rendering
**Description:** Render character and object sprites

**Sprite Specifications:**
- Player (Beep): 16x16 or 24x24 pixels
- Enemies: 16x16 pixels
- Collectibles: 8x8 or 16x16 pixels
- Platforms: Variable size, tile-based

**Animation System:**
- Three-frame animation cycles
- 8 FPS animation speed
- Seamless looping
- Direction-based sprites (up, down, left, right)

**Sprite Data Structure:**
```typescript
interface Sprite {
  width: number
  height: number
  frames: ImageData[]  // Array of frame pixel data
  currentFrame: number
  animationSpeed: number
  loop: boolean
}
```

---

#### FR-007: UI Rendering
**Description:** Render game UI overlay

**UI Elements:**
- HUD (Health, Credits, Shards count)
- Pause menu
- Victory screen
- Game over screen
- Main menu
- Settings menu

**UI Specifications:**
- Green ASCII-style text (#00FF00)
- Monospace font (Courier, Monaco style)
- Pixelated, chunky characters
- Centered at bottom of screen
- Simple, readable messages

**UI Messages Examples:**
- "Shards: 5/10"
- "Credits: 250"
- "It will take 158 seconds!"
- "Level Complete!"

---

### 3.4 Gameplay Systems

#### FR-008: Player Movement
**Description:** Handle player character movement and physics

**Movement Parameters:**
```typescript
const MOVEMENT = {
  speed: 120,           // pixels per second
  jumpForce: 300,       // pixels per second
  gravity: 800,         // pixels per second squared
  friction: 0.85,       // ground friction coefficient
  airControl: 0.7       // air movement multiplier
}
```

**Movement Logic:**
1. Apply horizontal input (left/right)
2. Apply gravity
3. Check ground collision
4. Apply jump if on ground and jump pressed
5. Update position
6. Check wall collisions
7. Resolve collisions

**Collision Detection:**
- AABB (Axis-Aligned Bounding Box) collision
- Tile-based collision map
- Platform collision (top only)
- Wall collision (sides)

**Requirements:**
- Smooth, responsive movement
- No clipping through walls
- Proper jump mechanics
- Bounce on fall (no damage)

---

#### FR-009: Ability Absorption
**Description:** Kirby-style ability absorption system

**Absorption Process:**
1. Player contacts special character (Tone, Spark, etc.)
2. Trigger absorption animation
3. Transform player sprite
4. Grant new abilities
5. Update player form state
6. Start ability timer

**Ability Types:**
```typescript
interface Ability {
  name: string
  duration: number      // seconds, or -1 for permanent until lost
  sprite: Sprite
  actions: string[]    // ['jump', 'dash', 'tune', etc.]
  specialEffect?: string
}
```

**Ability Examples:**
- **Tone Form:** Can use Harmony Tones, musical abilities
- **Spark Form:** Increased speed, dash ability
- **Base Form (Beep):** Standard movement, basic abilities

**Ability Loss:**
- Timer expires (if timed)
- Hit by enemy
- Manual release (if implemented)
- Return to Beep form

---

#### FR-010: Maze Generation
**Description:** Procedurally generate maze levels

**Generation Algorithm:**
1. Create grid of cells
2. Mark cells as walls or paths
3. Use recursive backtracking or similar algorithm
4. Add rooms at intervals
5. Connect rooms with corridors
6. Place dead ends strategically
7. Add secret passages (10-20% chance)
8. Place collectibles
9. Place enemies
10. Set start and exit positions

**Maze Parameters:**
```typescript
interface MazeConfig {
  width: number        // cells wide
  height: number       // cells tall
  cellSize: number     // pixels per cell
  roomCount: number    // number of rooms
  roomSize: { min: number, max: number }
  secretPassageChance: number  // 0.0 to 1.0
  deadEndRatio: number // 0.0 to 1.0
}
```

**Requirements:**
- Always solvable (path from start to exit)
- Multiple valid paths
- Appropriate difficulty for level
- No impossible dead ends blocking progress

---

#### FR-011: Stealth System
**Description:** Stealth mechanics for avoiding Grid Bots

**Grid Bot Behavior:**
```typescript
interface GridBot {
  position: { x: number, y: number }
  patrolPath: { x: number, y: number }[]
  currentTarget: number  // index in patrolPath
  speed: number
  detectionRadius: number
  state: 'patrol' | 'chase' | 'search' | 'return'
}
```

**Detection System:**
1. Calculate distance from player to Grid Bot
2. Check if player in detection radius
3. Check line of sight (if player visible)
4. If detected: Enter chase state
5. If lost: Enter search state, then return to patrol

**Hiding Mechanics:**
- Designated hiding spots (bushes, shadows, etc.)
- Player in hiding spot = not detectable
- Harmony Tones can mask player presence
- Alternative paths avoid detection

**Requirements:**
- Fair detection (not too easy/hard)
- Clear visual feedback
- Multiple escape options
- Not overly punishing

---

#### FR-012: Harmony Tones System
**Description:** Musical puzzle system using Web Audio API

**Tone Generation:**
```typescript
interface Tone {
  frequency: number     // Hz
  duration: number      // seconds
  waveform: 'sine' | 'square' | 'triangle' | 'sawtooth'
  volume: number        // 0.0 to 1.0
}
```

**Puzzle Types:**
1. **Sequence Matching:** Player must match tone sequence
2. **Frequency Tuning:** Player adjusts frequency to match target
3. **Harmony Creation:** Player combines tones to create harmony

**Implementation:**
- Use Web Audio API OscillatorNode
- Generate tones on demand
- Visual representation (waveform, frequency display)
- Audio feedback for matches

**Requirements:**
- Multiple valid solutions (ternary thinking)
- Clear visual/audio feedback
- Accessible for children
- Positive, musical tone

---

### 3.5 Progression Systems

#### FR-013: Level Progression
**Description:** Handle level completion and progression

**Level Completion:**
1. Player reaches exit/goal
2. Check completion criteria (shards, time, etc.)
3. Calculate score/rewards
4. Award credits
5. Unlock next level (if applicable)
6. Save progress
7. Display victory screen

**Progression Logic:**
```typescript
interface LevelProgress {
  levelId: string
  completed: boolean
  shardsCollected: number
  timeElapsed: number
  bestTime?: number
  creditsEarned: number
}
```

**World Unlocking:**
- Complete all levels in world → Unlock next world
- Chapter-based unlocks override progression
- Visual indication of locked/unlocked worlds

---

#### FR-014: Shard Collection
**Description:** Collectible shard system

**Shard Types:**
- Environmental memories
- Exile stories
- Technical data
- Mystery fragments

**Collection Process:**
1. Player contacts shard
2. Play collection animation/sound
3. Add shard to inventory
4. Update shard count
5. Save to localStorage
6. Display collection message (optional)

**Shard Data:**
```typescript
interface Shard {
  id: string
  type: 'memory' | 'story' | 'data' | 'mystery'
  content: string      // Text content
  levelId: string      // Where found
  worldId: string      // Which world
  collected: boolean
}
```

**Requirements:**
- Shards visible and collectible
- Collection tracked persistently
- No spoilers in shard content
- Hints at book themes (positive)

---

#### FR-015: Chapter Unlock System
**Description:** Unlock content based on chapter releases

**Unlock Methods:**

**Method 1: Manual Update**
- Update game code with unlock flags
- Deploy new version
- Players receive update on next load

**Method 2: Date-Based**
```typescript
const CHAPTER_UNLOCKS = {
  'chapter-1': '2025-01-15',
  'chapter-2': '2025-01-22',
  'chapter-3': '2025-01-29',
  // ...
}
```
- Check current date vs unlock dates
- Automatically unlock if date passed
- No API required

**Method 3: API Integration**
- Query Substack API for chapter status
- Check if chapter published
- Unlock content automatically
- Requires API access

**Unlock Data:**
```typescript
interface ChapterUnlock {
  chapterNumber: number
  unlockDate: string
  contentUnlocked: string[]  // ['world-5', 'ability-spark', etc.]
  notificationShown: boolean
}
```

**Notification System:**
- In-game notification when content unlocks
- Link to Substack chapter
- Visual indicator of new content

---

### 3.6 Save System

#### FR-016: Local Storage
**Description:** Save and load game data using localStorage

**Save Data Structure:**
```typescript
interface SaveData {
  version: string           // Save format version
  playerName?: string
  currentWorld: number
  currentLevel: number
  unlockedWorlds: number[]
  collectedShards: string[]
  credits: number
  abilities: string[]
  levelProgress: LevelProgress[]
  settings: GameSettings
  lastPlayed: string        // ISO date string
}
```

**Save Operations:**
- **Auto-save:** On level completion, shard collection, world unlock
- **Manual save:** Via pause menu
- **On exit:** Save current state

**Load Operations:**
- Load on game start
- Validate save data version
- Handle corrupted saves gracefully
- Migrate old save formats if needed

**Storage Limits:**
- localStorage typically 5-10MB
- Compress save data if needed
- Handle quota exceeded errors

**Privacy:**
- All data stored locally
- No server transmission
- No personal information required

---

### 3.7 Credits System

#### FR-017: Resonance Credits
**Description:** Earn and track Resonance Credits

**Credit Earning:**
```typescript
const CREDIT_REWARDS = {
  levelComplete: 10,
  worldComplete: 50,
  shardCollected: 5,
  perfectLevel: 25,      // All shards + fast time
  achievement: 100
}
```

**Credit Tracking:**
- Display current balance in HUD
- Update on earning
- Save to localStorage
- Persist across sessions

**Redemption (Future):**
- Redemption catalog (separate system)
- Link to fulfillment system
- Track redemptions

---

### 3.8 Integration Requirements

#### FR-018: Baebe Demo Integration
**Description:** Integrate with Baebe demo website

**Integration Points:**

**1. Command Handler:**
```typescript
// In baebe-demo/page.tsx
case 'gridrunner':
  setGameState('gridrunner')
  addOutput([
    { text: '', type: 'text' },
    { text: 'Starting GRID RUNNER...', type: 'text' },
    { text: 'Type "back" to return to menu.', type: 'text' }
  ])
  break
```

**2. Help Menu:**
```typescript
{ text: '  gridrunner    - Play GRID RUNNER game', type: 'text' }
```

**3. Back Command:**
```typescript
case 'back':
  if (gameState === 'gridrunner') {
    setGameState('menu')
    addOutput([
      { text: '', type: 'text' },
      { text: 'Returned to main menu.', type: 'text' }
    ])
  }
  break
```

**4. Component Rendering:**
```typescript
{gameState === 'gridrunner' && (
  <GridRunnerGame
    onBack={() => {
      setGameState('menu')
      addOutput([
        { text: '', type: 'text' },
        { text: 'Returned to main menu.', type: 'text' }
      ])
    }}
  />
)}
```

**Requirements:**
- Full-screen overlay (z-50 or higher)
- Proper state management
- Clean exit to menu
- No interference with terminal

---

### 3.9 Audio System

#### FR-019: Audio Playback
**Description:** Play music and sound effects

**Audio Types:**
- Background music (chiptune, looping)
- Sound effects (jump, collect, victory, etc.)
- Harmony Tones (generated via Web Audio API)

**Audio Management:**
```typescript
interface AudioManager {
  playMusic(track: string, loop: boolean): void
  playSound(sound: string, volume: number): void
  stopMusic(): void
  setMasterVolume(volume: number): void
  mute(): void
  unmute(): void
}
```

**Requirements:**
- Volume controls
- Mute option
- Smooth transitions
- No audio lag
- Web Audio API for Harmony Tones

---

### 3.10 Settings & Configuration

#### FR-020: Game Settings
**Description:** User-configurable game settings

**Settings Options:**
```typescript
interface GameSettings {
  masterVolume: number      // 0.0 to 1.0
  musicVolume: number       // 0.0 to 1.0
  sfxVolume: number         // 0.0 to 1.0
  muted: boolean
  controls: 'keyboard' | 'touch'
  scaling: 2 | 3 | 4        // Integer scaling factor
  crtEffect: boolean        // Optional CRT scanlines
  showFPS: boolean
}
```

**Settings Persistence:**
- Save to localStorage
- Load on game start
- Apply immediately on change

---

## 4. DATA REQUIREMENTS

### 4.1 Level Data

**Level File Format:**
```typescript
interface LevelData {
  id: string
  worldId: number
  levelNumber: number
  name: string
  mazeConfig: MazeConfig
  startPosition: { x: number, y: number }
  exitPosition: { x: number, y: number }
  shardLocations: { x: number, y: number, shardId: string }[]
  enemyLocations: { x: number, y: number, type: string }[]
  unlockRequirements?: string[]
}
```

### 4.2 Asset Requirements

**Image Assets:**
- Character sprites (Beep, Tone, Spark, Grid Bots)
- Platform/wall tiles
- Collectible sprites
- UI elements
- Backgrounds

**Audio Assets:**
- Background music tracks
- Sound effect files
- (Harmony Tones generated, not stored)

**Data Assets:**
- Level definitions
- Shard content
- Dialogue text
- Achievement definitions

---

## 5. ERROR HANDLING

### 5.1 Error Types

**Initialization Errors:**
- Canvas not available → Fallback message
- Web Audio API not available → Disable audio, continue
- localStorage not available → No save functionality, continue

**Runtime Errors:**
- Save data corruption → Reset to defaults, notify user
- Asset loading failure → Retry, then show placeholder
- Performance issues → Reduce quality, notify user

**User Errors:**
- Invalid input → Ignore, no error message
- Impossible actions → Visual feedback only

---

## 6. PERFORMANCE REQUIREMENTS

### 6.1 Frame Rate

- **Target:** 60 FPS
- **Minimum:** 30 FPS
- **Measurement:** Consistent frame timing

### 6.2 Memory Usage

- **Target:** < 100MB total
- **Assets:** Lazy load where possible
- **Cleanup:** Dispose unused resources

### 6.3 Load Time

- **Initial Load:** < 3 seconds
- **Level Load:** < 1 second
- **Asset Loading:** Progressive where possible

---

## 7. TESTING REQUIREMENTS

### 7.1 Unit Testing

- Game logic functions
- Collision detection
- Maze generation
- Save/load system

### 7.2 Integration Testing

- Baebe demo integration
- Input handling
- Rendering pipeline
- Audio system

### 7.3 User Testing

- Target age group (7-12)
- Parent feedback
- Message retention
- Difficulty balance

---

## 8. DEPENDENCIES

### 8.1 External Libraries

- None required (vanilla TypeScript/Canvas)
- Optional: Utility libraries for math, etc.

### 8.2 Browser APIs

- Canvas API
- Web Audio API
- localStorage API
- RequestAnimationFrame

### 8.3 Integration Points

- Baebe demo page.tsx
- Baebe demo state management
- Terminal command system

---

## 9. APPENDICES

### 9.1 Data Structures Reference

See individual FR sections for detailed data structures.

### 9.2 API Reference

N/A (no external APIs required for core functionality)

### 9.3 Glossary

- **AABB:** Axis-Aligned Bounding Box (collision detection)
- **FPS:** Frames Per Second
- **HUD:** Heads-Up Display
- **localStorage:** Browser storage API
- **Sprite:** 2D image used for characters/objects

---

**Document Status:** Draft  
**Next Review Date:** TBD  
**Technical Approval Required From:** Technical Lead, Senior Developer


