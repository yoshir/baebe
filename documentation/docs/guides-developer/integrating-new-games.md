# Integrating a New Game/Command into the Baebe Demo

**Version:** v.20250315-0000  
**Last Updated:** 2025-03-15

This guide explains how to add a new game or interactive command to the Baebe demo experience so it appears in the `help` command list and is accessible to users.

## Overview

The Baebe demo uses a command-based terminal interface. Users type commands like `scan`, `unlock`, `tune`, etc. To add a new game or command, you need to:

1. Add a new state to the `GameState` type
2. Add the command handler in the `handleCommand` function
3. Add the command to the `help` menu
4. Create any necessary components or game logic
5. Handle state transitions and rendering

## Step-by-Step Integration

### Step 1: Add New State to GameState Type

**File:** `investor-portal/app/baebe-demo/page.tsx`

Find the `GameState` type definition (around line 15) and add your new state:

```typescript
type GameState = 'intro' | 'boot' | 'menu' | 'scan' | 'unlock' | 'tuning' | 'unlocked' | 'road' | 'fonttest' | 'asciiedit' | 'yournewgame'
```

**Example:** If adding a "puzzle" game:
```typescript
type GameState = 'intro' | 'boot' | 'menu' | 'scan' | 'unlock' | 'tuning' | 'unlocked' | 'road' | 'fonttest' | 'asciiedit' | 'puzzle'
```

### Step 2: Add State Variable (if needed)

If your game needs to track additional state, add it near the top of the component (around line 24-35):

```typescript
const [gameState, setGameState] = useState<GameState>('intro')
const [yourGameState, setYourGameState] = useState<YourStateType>(initialValue)
```

### Step 3: Add Command Handler

**File:** `investor-portal/app/baebe-demo/page.tsx`

Find the `handleCommand` function (around line 114) and add a new `case` in the `switch` statement:

```typescript
case 'yourcommand':
  setGameState('yournewgame')
  addOutput([
    { text: '', type: 'text' },
    { text: 'Starting your game...', type: 'text' },
    // Add any initial output
  ])
  break
```

**Example:** For a puzzle game:
```typescript
case 'puzzle':
  setGameState('puzzle')
  addOutput([
    { text: '', type: 'text' },
    { text: 'Loading puzzle interface...', type: 'text' },
    { text: 'Type "back" to return to menu.', type: 'text' }
  ])
  break
```

### Step 4: Add to Help Menu

**File:** `investor-portal/app/baebe-demo/page.tsx`

Find the `case 'help':` section (around line 122) and add your command to the list:

```typescript
case 'help':
  addOutput([
    { text: '', type: 'text' },
    { text: 'Available Commands:', type: 'text' },
    { text: '  scan          - Scan for available mysteries', type: 'text' },
    { text: '  unlock [num]  - Unlock mystery number [num]', type: 'text' },
    { text: '  tune [freq]   - Tune to frequency [freq] Hz', type: 'text' },
    { text: '  read [num]    - Read chapter [num]', type: 'text' },
    { text: '  status        - See your progress', type: 'text' },
    { text: '  fonttest      - Open interactive font tester', type: 'text' },
    { text: '  clear         - Clear screen', type: 'text' },
    { text: '  art [name]    - Display ASCII art (ayumi, baebe, o1_tower, biomi_pod, network, drop, resonance)', type: 'text' },
    { text: '  yourcommand   - Description of what your command does', type: 'text' }, // ADD THIS LINE
    { text: '', type: 'text' }
  ])
  break
```

### Step 5: Handle "back" Command

**File:** `investor-portal/app/baebe-demo/page.tsx`

Find the `case 'back':` handler (around line 260) and add your game state:

```typescript
case 'back':
  if (gameState === 'fonttest' || gameState === 'asciiedit' || gameState === 'yournewgame') {
    setGameState('menu')
    addOutput([
      { text: '', type: 'text' },
      { text: 'Returned to main menu.', type: 'text' },
      { text: 'Type \'help\' for commands.', type: 'text' }
    ])
  }
  break
```

### Step 6: Add Rendering Logic

**File:** `investor-portal/app/baebe-demo/page.tsx`

Find the main render section (around line 350+) and add conditional rendering for your game:

```typescript
{gameState === 'yournewgame' && (
  <YourGameComponent
    onComplete={() => {
      setGameState('menu')
      addOutput([
        { text: '', type: 'text' },
        { text: 'Game completed. Returning to menu.', type: 'text' }
      ])
    }}
  />
)}
```

**Example:** For a puzzle game component:
```typescript
{gameState === 'puzzle' && (
  <PuzzleGame
    onBack={() => {
      setGameState('menu')
      addOutput([
        { text: '', type: 'text' },
        { text: 'Returned to main menu.', type: 'text' }
      ])
    }}
    onComplete={(score) => {
      setGameState('menu')
      addOutput([
        { text: '', type: 'text' },
        { text: `Puzzle completed! Score: ${score}`, type: 'text' },
        { text: 'Returned to main menu.', type: 'text' }
      ])
    }}
  />
)}
```

### Step 7: Create Your Game Component (if needed)

**File:** `investor-portal/components/YourGameComponent.tsx`

Create a new component file for your game:

```typescript
'use client'

interface YourGameComponentProps {
  onComplete: () => void
  onBack?: () => void
}

export default function YourGameComponent({ onComplete, onBack }: YourGameComponentProps) {
  // Your game logic here
  
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Your game UI here */}
      <button onClick={onBack || onComplete}>
        Back to Menu
      </button>
    </div>
  )
}
```

## Complete Example: Adding a "Memory" Game

Here's a complete example of adding a simple memory game:

### 1. Update GameState:
```typescript
type GameState = 'intro' | 'boot' | 'menu' | 'scan' | 'unlock' | 'tuning' | 'unlocked' | 'road' | 'fonttest' | 'asciiedit' | 'memory'
```

### 2. Add Command Handler:
```typescript
case 'memory':
  setGameState('memory')
  addOutput([
    { text: '', type: 'text' },
    { text: 'Starting Memory Game...', type: 'text' },
    { text: 'Type "back" to return to menu.', type: 'text' }
  ])
  break
```

### 3. Add to Help:
```typescript
{ text: '  memory        - Play the memory sequence game', type: 'text' },
```

### 4. Handle Back:
```typescript
if (gameState === 'fonttest' || gameState === 'asciiedit' || gameState === 'memory') {
```

### 5. Add Rendering:
```typescript
{gameState === 'memory' && (
  <MemoryGame
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

## Testing Checklist

- [ ] Command appears in `help` menu
- [ ] Command can be typed and executed
- [ ] Game state transitions correctly
- [ ] `back` command returns to menu
- [ ] Game component renders correctly
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Game logic works as expected

## Notes

- **Command names**: Use lowercase, single words or hyphenated words (e.g., `fonttest`, `asciiedit`)
- **State management**: Keep game-specific state in the component, not in the main page state unless it needs to persist
- **Output formatting**: Use the `addOutput` function to add text to the terminal output
- **Component placement**: Game components should typically be full-screen overlays with `z-50` or higher
- **Navigation**: Always provide a way to return to the menu (usually via `back` command)

## Related Files

- Main demo page: `investor-portal/app/baebe-demo/page.tsx`
- Component examples:
  - `investor-portal/components/FontTester.tsx` - Simple interactive component
  - `investor-portal/components/FrequencyTuner.tsx` - Complex game with state
  - `investor-portal/components/ASCIIEditor.tsx` - Editor component

## Questions?

If you need help integrating a specific type of game or have questions about the architecture, refer to existing game implementations or ask for clarification.





