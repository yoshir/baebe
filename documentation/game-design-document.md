# BAEBE: Game Design Document
## Companion Game That Enhances Without Spoiling

**Version:** v.20251112-0949  
**Last Updated:** 2025-11-12  
**Genre:** Narrative Puzzle-Exploration / Frequency-Based Stealth  
**Platform:** Web (Vercel), Mobile (PWA)  
**Goal:** Complementary experience that deepens understanding without revealing book plot

---

## Design Philosophy

**Core Principle:** The game tells a parallel story in the same world, using the same themes and mechanics, but from a different perspective. Playing enhances reading, reading enhances playing—but neither requires the other.

**Spoiler Prevention Strategy:**
- **Different Timeline**: Set before or parallel to book events
- **Different Character**: Play as someone else in the world
- **Different Perspective**: See the world from exile/human/sanctuary viewpoint
- **Mechanical Focus**: Emphasize gameplay mechanics over narrative reveals
- **Thematic Alignment**: Same themes (binary/ternary, resonance, freedom) but different story

**Complementary Design:**
- **Book reveals**: Character motivations, emotional arcs, plot resolution
- **Game reveals**: World mechanics, environmental details, systemic understanding
- **Together**: Complete understanding of world, themes, and story

---

## Game Concept: "FREQUENCY RUNNER"

### Core Premise

**You play as an Exile Runner**—a human courier who navigates the Converted world, delivering messages, shards, and supplies between exile communities and sanctuary zones. Your survival depends on understanding frequencies, avoiding O1's network, and helping others while staying free.

**Why This Works:**
- **Different perspective**: Not a posthuman, not Baebe—just a human trying to survive
- **Mechanical focus**: Frequency tuning, stealth, puzzle-solving, resource management
- **World-building**: Explore the world without revealing character arcs
- **Thematic alignment**: Experience binary/ternary themes through gameplay
- **No spoilers**: Your story is separate from Baebe's

### Game Structure

**Three Acts (Mirroring Book Structure):**

**ACT I: THE GRID** (Learning the System)
- Tutorial: Learn frequency mechanics, O1 detection, basic survival
- First missions: Simple courier runs, learn the world
- Revelation: Discover you're being tracked, network is everywhere
- **End**: First major choice—trust the system or go off-grid

**ACT II: THE UNDERCITY** (Breaking Free)
- Deeper exploration: Undercity navigation, exile communities
- Frequency storms: Experience community events
- Shard collection: Discover memory fragments (different from book shards)
- **End**: Sanctuary discovery, understanding ternary consciousness

**ACT III: THE CHOICE** (Your Path)
- Final missions: Help others escape or secure your own freedom
- Frequency synthesis: Combine collected knowledge
- Multiple endings: Based on choices, resonance level, community help
- **End**: Your story concludes, but book's story continues

---

## Core Gameplay Mechanics

### 1. Frequency Tuning System

**Concept:** The world operates on frequencies. You must tune your equipment to match or avoid different frequency zones.

**Mechanics:**
- **Frequency Scanner**: Shows active frequencies in your area
- **Tuning Interface**: Adjust your frequency to match (safe zones) or avoid (O1 zones)
- **Resonance Meter**: Your actions contribute to collective resonance
- **Frequency Storms**: Community events where frequencies align

**Gameplay:**
```typescript
interface FrequencyZone {
  frequency: number // Hz
  type: 'o1-network' | 'sanctuary' | 'undercity' | 'neutral'
  intensity: number // 0-100
  danger: 'safe' | 'caution' | 'danger' | 'lethal'
}

// Player must tune to match or avoid
function tuneFrequency(target: number, current: number): number {
  // Mini-game: adjust frequency dial
  // Too far = detection, too close = safe
  return adjustedFrequency
}
```

**Why This Works:**
- Teaches frequency concepts without spoiling Taivalu's story
- Creates engaging puzzle mechanics
- Connects to book themes (resonance, consciousness)
- No spoilers—just world mechanics

### 2. Stealth & Detection System

**Concept:** O1's network is everywhere. You must avoid detection while navigating.

**Mechanics:**
- **Detection Meter**: Shows how close you are to being detected
- **Network Nodes**: Visible O1 infrastructure you must avoid
- **Dead Zones**: Frequency-protected areas (sanctuaries)
- **Resonant Fade**: Temporary ability to phase slightly (limited use)

**Gameplay:**
- Navigate through O1 zones without triggering detection
- Use frequency tuning to "hide" in network noise
- Find sanctuary zones for safety
- Limited Resonant Fade ability (cooldown-based)

**Why This Works:**
- Creates tension and challenge
- Teaches about O1's surveillance without revealing plot
- Resonant Fade is a mechanic, not a story element
- Different from Baebe's story (you're human, limited ability)

### 3. Shard Collection & Memory Synthesis

**Concept:** Collect memory fragments from the world. These are different from book shards—these are environmental memories, exile stories, world history.

**Mechanics:**
- **Shard Discovery**: Find shards hidden in world
- **Shard Types**: 
  - **Environmental**: World history, what happened here
  - **Exile Stories**: Human experiences, survival tales
  - **Technical**: How things work (frequency tech, sanctuary tech)
  - **Mystery**: Unexplained fragments (hint at book, don't reveal)
- **Synthesis**: Combine shards to unlock new areas/abilities

**Gameplay:**
- Explore to find shards
- Some require puzzle-solving
- Some require community collaboration (network effects)
- Synthesis unlocks new story content

**Why This Works:**
- World-building without character spoilers
- Rewards exploration
- Creates collectible mechanics
- Hints at book mysteries without revealing them

### 4. Courier Mission System

**Concept:** You're a courier. Deliver messages, supplies, information between communities.

**Mechanics:**
- **Mission Board**: Available courier jobs
- **Route Planning**: Choose paths (safe but long vs dangerous but short)
- **Resource Management**: Supplies, frequency charges, time
- **Consequences**: Choices affect communities, unlock different paths

**Gameplay:**
- Accept missions from exile communities
- Plan routes using frequency map
- Navigate hazards, avoid O1
- Deliver successfully = rewards, story progression
- Fail = consequences, alternative paths

**Why This Works:**
- Creates clear objectives
- Teaches world geography
- Shows different communities (world-building)
- Player agency through route choices

### 5. Community Resonance System

**Concept:** Your actions contribute to collective resonance. Higher resonance unlocks content, triggers events.

**Mechanics:**
- **Resonance Contribution**: Each action adds to collective resonance
- **Resonance Level**: Global meter showing community resonance
- **Threshold Events**: Reach resonance levels = community events unlock
- **Network Effects**: More players = faster resonance growth

**Gameplay:**
- Complete missions = resonance contribution
- Help others = higher contribution
- Frequency storms trigger at thresholds
- Unlock new areas/content as resonance grows

**Why This Works:**
- Connects to book themes (collective consciousness)
- Creates network effects (more players = better)
- Rewards community participation
- No spoilers—just mechanical understanding

### 6. Ternary Choice System

**Concept:** Many choices aren't binary. Game teaches ternary thinking through mechanics.

**Mechanics:**
- **Binary Choices**: Obvious A or B (often both are wrong)
- **Ternary Discovery**: Find third option through exploration/understanding
- **Consequence System**: Choices have ripple effects
- **No "Right" Answer**: Different paths, different outcomes

**Gameplay Examples:**
- **Mission**: Deliver to Community A or B?
  - Binary: Choose one
  - Ternary: Find way to help both, or find Community C that needs it more
- **Danger**: Fight or flee?
  - Binary: Combat or run
  - Ternary: Use frequency to create distraction, phase through, or negotiate

**Why This Works:**
- Teaches ternary thinking through gameplay
- Aligns with book themes
- Creates meaningful choices
- No spoilers—just mechanical understanding

---

## Narrative Structure

### Parallel Story: "The Courier's Tale"

**Your Character:**
- **Name**: Player chooses (or generated)
- **Background**: Human exile, former network worker, now courier
- **Goal**: Survive, help others, understand the world
- **Arc**: From fear/obedience → understanding → agency

**Story Beats (No Book Spoilers):**

**ACT I: Learning the Grid**
- Start: Working as courier, following O1 rules
- Discovery: Realize you're being tracked, used
- Choice: Continue or go off-grid
- **End**: Choose independence, lose network access

**ACT II: The Undercity**
- Exploration: Navigate exile communities
- Discovery: Learn about sanctuaries, frequency protection
- Revelation: Understand ternary consciousness (through gameplay, not exposition)
- **End**: Reach first sanctuary, understand what's possible

**ACT III: The Choice**
- Final Missions: Help others or secure own freedom
- Synthesis: Combine all learned knowledge
- Multiple Endings: Based on choices, resonance, community
- **End**: Your story concludes (book's story continues separately)

**Key Differences from Book:**
- **Your story**: Human perspective, survival focus, courier missions
- **Book story**: Posthuman perspective, consciousness focus, family discovery
- **Overlap**: Same world, same themes, different experiences
- **No spoilers**: Your story doesn't reveal Baebe's arc

---

## World Exploration

### Locations (Same World, Different Focus)

**O1 Zones:**
- **Gameplay**: Stealth sections, frequency puzzles, avoid detection
- **Reveals**: Environmental details, O1 infrastructure, network mechanics
- **No Spoilers**: Just world-building, no character reveals

**Undercity:**
- **Gameplay**: Navigation puzzles, resource gathering, community interactions
- **Reveals**: Exile life, human survival, underground networks
- **No Spoilers**: Different communities, different stories

**Sanctuaries:**
- **Gameplay**: Safe zones, frequency tuning mastery, synthesis areas
- **Reveals**: How sanctuaries work, frequency protection tech
- **No Spoilers**: Technical understanding, not character stories

**Converted Zones:**
- **Gameplay**: Hazard navigation, environmental puzzles
- **Reveals**: What Conversion looks like, environmental costs
- **No Spoilers**: World state, not plot events

### Characters (New, Not Book Characters)

**Exile Community Members:**
- Various humans you help/deliver to
- Their stories = world-building
- No connection to book characters (or vague hints only)

**Mystery Figures:**
- Hints at book characters (never named, never shown)
- "Someone helped build this sanctuary" (Ayumi, unnamed)
- "There's a posthuman who performs" (Taivalu, never seen)
- "Rumors of a weapon who escaped" (Baebe, just rumor)

**Your Character:**
- Fully player-controlled
- Your choices, your story
- Separate from book narrative

---

## Gameplay Loop

### Core Loop

1. **Mission Selection**: Choose courier job from board
2. **Route Planning**: Study frequency map, plan path
3. **Execution**: Navigate, tune frequencies, avoid O1, solve puzzles
4. **Delivery**: Complete mission, receive rewards
5. **Exploration**: Discover shards, unlock areas, learn world
6. **Resonance**: Contribute to collective, trigger events
7. **Repeat**: New missions, deeper exploration, story progression

### Progression Systems

**Character Progression:**
- **Frequency Mastery**: Better tuning, more precision
- **Stealth Skills**: Longer undetected, better hiding
- **Knowledge**: Understanding world mechanics
- **Resources**: Better equipment, more supplies

**World Progression:**
- **Resonance Level**: Unlocks content, triggers events
- **Area Unlocks**: New locations as you explore
- **Story Progression**: Narrative advances through missions
- **Shard Synthesis**: Combine knowledge, unlock abilities

**Community Progression:**
- **Network Effects**: More players = more content
- **Collaborative Puzzles**: Require multiple players
- **Shared Events**: Frequency storms, community discoveries
- **Collective Resonance**: Everyone contributes to global meter

---

## Integration with Book

### How They Complement

**Book Provides:**
- Character depth, emotional arcs
- Plot resolution, story conclusion
- Internal experience, consciousness exploration
- Thematic resolution, philosophical understanding

**Game Provides:**
- World mechanics, systemic understanding
- Environmental exploration, spatial understanding
- Interactive learning, hands-on experience
- Community participation, collective resonance

**Together:**
- Complete understanding of world and story
- Both emotional and mechanical comprehension
- Both individual and collective experience
- Both narrative and interactive engagement

### Cross-Media Elements

**Book → Game:**
- Shard codes in book unlock game content
- Frequency patterns in book = game mechanics
- World details in book = game locations
- Character hints (never full reveals)

**Game → Book:**
- Game mechanics explained in book
- World understanding enhances reading
- Frequency concepts learned through play
- Community resonance connects to themes

**Shared Elements:**
- Same world, same themes
- Same mechanics (frequency, resonance, ternary)
- Same visual/audio language
- Complementary, not duplicate

---

## Technical Implementation

### Platform: Web (Vercel) + Mobile (PWA)

**Core Tech:**
- Next.js 14+ (App Router)
- React Three Fiber (3D world)
- Web Audio API (frequency mechanics)
- Supabase (persistent state, real-time)
- Vercel Edge Functions (game logic)

**Game Engine:**
- Custom (not Unity/Unreal) for web optimization
- Three.js for 3D rendering
- React for UI/state management
- Web Audio for frequency mechanics

**Performance:**
- Optimized for free tier hosting
- Progressive loading (load areas as needed)
- Efficient rendering (adaptive quality)
- Network effects (shared state, real-time)

### Game Architecture

```
/game
  /components
    /world
      - FrequencyMap.tsx
      - LocationRenderer.tsx
      - StealthSystem.tsx
    /mechanics
      - FrequencyTuner.tsx
      - ShardCollector.tsx
      - ResonanceMeter.tsx
    /missions
      - MissionBoard.tsx
      - RoutePlanner.tsx
      - DeliverySystem.tsx
  /hooks
    - useFrequency.ts
    - useStealth.ts
    - useResonance.ts
    - useShards.ts
  /systems
    - frequency-system.ts
    - detection-system.ts
    - mission-system.ts
    - progression-system.ts
  /api
    - /missions
    - /resonance
    - /shards
    - /world-state
```

---

## Monetization Strategy

### Free Tier (Vercel Free)

**What's Free:**
- Core game experience
- All gameplay mechanics
- Story content (all three acts)
- Community features
- Basic shard collection

**Limitations:**
- Slower progression (can still complete)
- Basic customization
- Standard frequency tuning
- Community resonance (slower growth)

### Optional Enhancements

**Cosmetic:**
- Character customization
- Equipment skins
- Frequency visualizations
- UI themes

**Convenience:**
- Faster progression (time-savers)
- Extra shard storage
- Priority mission access
- Advanced frequency tools

**Community:**
- Private communities
- Custom missions
- Advanced analytics
- Early access to content

**Not Pay-to-Win:**
- All content accessible free
- Enhancements are cosmetic/convenience
- No gameplay advantages for pay
- Community features remain free

---

## Development Roadmap

### Phase 1: Core Mechanics (Weeks 1-4)
- Frequency tuning system
- Basic stealth/detection
- Mission system
- World navigation
- Shard collection

### Phase 2: Story & World (Weeks 5-8)
- Narrative implementation
- Location design
- Character interactions
- Story progression
- Multiple endings

### Phase 3: Community Features (Weeks 9-12)
- Resonance system
- Network effects
- Collaborative puzzles
- Community events
- Real-time synchronization

### Phase 4: Polish & Launch (Weeks 13-16)
- Performance optimization
- Accessibility features
- Mobile PWA
- Cross-media integration
- Launch preparation

---

## Success Metrics

### Engagement
- Average session duration
- Completion rate (all three acts)
- Return player rate
- Community participation

### Thematic Understanding
- Ternary choice selection rate
- Frequency mastery progression
- Resonance contribution
- Shard synthesis completion

### Cross-Media Impact
- Book sales correlation
- Player-to-reader conversion
- Reader-to-player conversion
- Combined engagement

### Community
- Active players
- Resonance level achieved
- Collaborative puzzle completion
- Community event participation

---

## Risk Mitigation

### Spoiler Prevention

**Safeguards:**
- Separate narrative team for game
- Book plot details never in game files
- Character names never mentioned
- Story beats reviewed for spoilers
- Beta testing with book readers

**Content Guidelines:**
- Game reveals: World mechanics, environmental details
- Book reveals: Character arcs, plot resolution
- Shared: Themes, concepts, world state
- Never: Character motivations, plot twists, endings

### Technical Risks

**Performance:**
- Optimize for low-end devices
- Progressive enhancement
- Fallback modes
- Performance monitoring

**Scalability:**
- Start on free tier
- Monitor usage
- Optimize before scaling
- Plan upgrade path

**Community:**
- Moderation systems
- Abuse prevention
- Fair play enforcement
- Community guidelines

---

## Conclusion

"FREQUENCY RUNNER" creates a complementary game experience that:
- **Enhances the book** without spoiling it
- **Teaches themes** through gameplay
- **Builds community** through network effects
- **Explores the world** from different perspective
- **Creates value** independently and together

The game and book work together to create a complete understanding of BAEBE's world, themes, and story—but each stands alone as a complete experience.

---

**Document Status:** Game Design Document  
**Next Steps:** Prototype core mechanics, validate concept, begin development  
**Related Documents:** 
- Reader Experience Design
- Persistent Experience Architecture
- WebGL/Web Audio Integration









