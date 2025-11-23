# BAEBE: Persistent Community Experience Architecture
## Vercel Free Tier Optimized Real-Time Network

**Version:** v.20251112-0930  
**Last Updated:** 2025-11-12  
**Platform:** Vercel Free Tier + Supabase Free Tier  
**Goal:** Persistent, real-time community experience with network effects

---

## Design Philosophy

**Core Principle:** Create a living, breathing digital world where each participant enhances the experience for everyone else—the more people connected, the richer the resonance.

**Network Effects Strategy:**
- **Collective Resonance**: More participants = stronger "signal" = more content unlocked
- **Collaborative Discovery**: Puzzles require multiple people, scale with participation
- **Shared State**: Everyone sees the same evolving world, changes are persistent
- **Community Amplification**: Individual actions ripple through the network
- **Emergent Narratives**: Community behavior creates new story elements

**Vercel Free Tier Constraints:**
- Serverless functions: 100GB-hours/month
- Edge functions: Unlimited (but execution time limits)
- Bandwidth: 100GB/month
- No persistent WebSocket connections
- No long-running processes
- Static hosting: Unlimited

**Solution Approach:**
- Server-Sent Events (SSE) for real-time updates (cheaper than WebSockets)
- Edge functions for low-latency operations
- Supabase for database + real-time subscriptions (free tier)
- Polling fallback for compatibility
- Edge caching for performance
- Stateless architecture for scalability

---

## Architecture Overview

### Technology Stack

**Frontend:**
- Next.js 14+ (App Router)
- React Server Components
- Client-side real-time hooks
- Progressive Web App (PWA) capabilities

**Backend:**
- Vercel Serverless Functions (API routes)
- Vercel Edge Functions (low-latency)
- Supabase (database + real-time)
- Vercel KV (optional, for caching)

**Real-Time:**
- Supabase Realtime (PostgreSQL changes)
- Server-Sent Events (SSE) for push updates
- Long polling fallback
- Edge function streaming

**State Management:**
- Supabase PostgreSQL (persistent state)
- Vercel Edge Config (configuration)
- Client-side state (React Context/State)
- Local storage (offline support)

**Media/Assets:**
- Vercel Blob Storage (images, audio)
- CDN caching (Vercel Edge Network)
- Optimized static assets

---

## Core Features: The Resonance Network

### 1. Collective Resonance Meter

**Concept:** A global "resonance" level that increases as more people participate. Higher resonance unlocks content, affects narrative, creates events.

**Implementation:**
```typescript
// Edge function: /api/resonance/current
export const config = { runtime: 'edge' }

export async function GET() {
  // Count active participants (last 5 minutes)
  const activeCount = await supabase
    .from('participants')
    .select('id')
    .gte('last_seen', new Date(Date.now() - 5 * 60 * 1000))
    .count()
  
  // Calculate resonance (logarithmic scale for network effects)
  const resonance = Math.log10(activeCount + 1) * 10
  
  // Get unlocked content based on resonance level
  const unlocked = await getUnlockedContent(resonance)
  
  return Response.json({ 
    resonance: Math.min(resonance, 100),
    activeParticipants: activeCount,
    unlocked,
    nextThreshold: getNextThreshold(resonance)
  })
}
```

**Network Effect:**
- Resonance 0-25: Individual experience
- Resonance 25-50: Small group features unlock
- Resonance 50-75: Community events trigger
- Resonance 75-100: Major narrative events, exclusive content

**Real-Time Updates:**
- SSE stream broadcasts resonance changes
- Visual indicator on all connected clients
- Threshold celebrations when levels reached

### 2. Persistent World State

**Concept:** The BAEBE world evolves based on collective actions. Changes are permanent and visible to all.

**Database Schema (Supabase):**
```sql
-- World state table
create table world_state (
  id uuid primary key default gen_random_uuid(),
  key text unique not null, -- e.g., 'undercity_status', 'tower_condition'
  value jsonb not null,
  updated_at timestamptz default now(),
  updated_by uuid references participants(id)
);

-- Participant actions (for history/rollback)
create table participant_actions (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid references participants(id),
  action_type text not null, -- 'discover_shard', 'solve_puzzle', 'contribute'
  action_data jsonb,
  world_state_key text references world_state(key),
  created_at timestamptz default now()
);

-- Resonance events (milestones)
create table resonance_events (
  id uuid primary key default gen_random_uuid(),
  resonance_level integer not null,
  event_type text not null,
  event_data jsonb,
  triggered_at timestamptz default now(),
  triggered_by_count integer -- how many participants triggered it
);
```

**API Endpoints:**
```typescript
// GET /api/world/state - Get current world state
// POST /api/world/action - Perform action that changes world
// GET /api/world/history - Get change history
// SSE /api/world/stream - Real-time world state updates
```

**Example Actions:**
- Discover shard → Unlocks new area
- Solve puzzle → Changes environment
- Reach resonance threshold → Triggers narrative event
- Community choice → Affects story direction

### 3. Collaborative Puzzle System

**Concept:** Complex puzzles that require multiple participants working together. More people = more puzzle pieces available.

**Implementation:**
```typescript
// Puzzle pieces distributed across participants
// Each person gets unique piece
// Must collaborate to solve

interface PuzzlePiece {
  id: string
  puzzleId: string
  ownerId: string
  data: string // encrypted/hashed piece
  position: number // where it fits in puzzle
  revealed: boolean
}

// Edge function: /api/puzzles/[id]/pieces
export async function GET(request: Request, { params }) {
  const puzzleId = params.id
  const activeCount = await getActiveParticipantCount()
  
  // More participants = more pieces available
  const totalPieces = Math.min(activeCount * 2, 100)
  const pieces = await getPuzzlePieces(puzzleId, totalPieces)
  
  return Response.json({ pieces, totalPieces, activeCount })
}
```

**Network Effects:**
- 1-5 people: Basic puzzle (10 pieces)
- 6-20 people: Medium puzzle (30 pieces)
- 21-50 people: Complex puzzle (60 pieces)
- 50+ people: Epic puzzle (100+ pieces, multi-stage)

**Real-Time Collaboration:**
- Live puzzle board (shared state)
- See others working in real-time
- Chat/coordination tools
- Progress celebrations

### 4. Frequency Storm Events

**Concept:** Synchronized community events where everyone experiences something simultaneously. Triggered by reaching resonance thresholds or collective actions.

**Implementation:**
```typescript
// Edge function: /api/events/storm/trigger
export async function POST(request: Request) {
  const { resonanceLevel, triggerType } = await request.json()
  
  // Check if threshold reached
  const shouldTrigger = await checkResonanceThreshold(resonanceLevel)
  
  if (shouldTrigger) {
    // Create event
    const event = await createFrequencyStorm({
      type: triggerType,
      resonanceLevel,
      duration: 300, // 5 minutes
      content: await generateStormContent(resonanceLevel)
    })
    
    // Broadcast to all connected participants
    await broadcastEvent(event)
    
    // Update world state
    await updateWorldState('last_storm', {
      timestamp: Date.now(),
      level: resonanceLevel,
      participants: await getActiveCount()
    })
    
    return Response.json({ event, success: true })
  }
  
  return Response.json({ success: false })
}
```

**Event Types:**
- **Resonance Bloom**: Visual/audio experience, unlocks content
- **Memory Unlock**: Community discovers new story element
- **Network Hack**: Collaborative puzzle event
- **Sanctuary Discovery**: New area/feature unlocked
- **Character Interaction**: Live "contact" with characters

**Real-Time Delivery:**
- SSE stream broadcasts event start
- All clients receive event simultaneously
- Shared experience creates bonding
- Event recorded for later viewing

### 5. Participant Presence System

**Concept:** See who's online, what they're doing, create sense of shared space. Privacy-respecting but community-building.

**Implementation:**
```typescript
// Track presence (last seen, current activity)
create table participant_presence (
  participant_id uuid primary key references participants(id),
  last_seen timestamptz default now(),
  current_activity text, -- 'reading', 'puzzle_solving', 'exploring'
  current_location text, -- 'undercity', 'tower', 'sanctuary'
  status text, -- 'online', 'away', 'offline'
  updated_at timestamptz default now()
);

// Real-time presence updates via Supabase Realtime
const presenceChannel = supabase
  .channel('presence')
  .on('presence', { event: 'sync' }, () => {
    const state = presenceChannel.presenceState()
    // Update UI with who's online
  })
  .subscribe()
```

**Features:**
- See active participant count
- See what others are doing (anonymized)
- Join others in same "location"
- Form temporary groups
- Privacy controls (opt-in visibility)

### 6. Shard Collection Network

**Concept:** Memory shards are distributed across participants. Must trade/share to complete collections. Creates social connections.

**Implementation:**
```typescript
// Shard ownership
create table participant_shards (
  participant_id uuid references participants(id),
  shard_id text not null,
  discovered_at timestamptz default now(),
  shared_with jsonb, -- array of participant IDs who have access
  primary key (participant_id, shard_id)
);

// Shard trading/requesting
create table shard_requests (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid references participants(id),
  shard_id text not null,
  status text, -- 'pending', 'accepted', 'declined'
  created_at timestamptz default now()
);
```

**Network Effects:**
- More participants = more shards in circulation
- Rare shards become valuable
- Trading creates relationships
- Complete collections unlock exclusive content
- Community goal: collect all shards together

### 7. Community Timeline

**Concept:** Shared history of community discoveries, events, milestones. Creates sense of collective journey.

**Implementation:**
```typescript
// Timeline events
create table timeline_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  title text not null,
  description text,
  participants_involved jsonb, -- array of participant IDs
  resonance_level integer,
  world_state_snapshot jsonb,
  created_at timestamptz default now(),
  is_milestone boolean default false
);
```

**Features:**
- Major discoveries logged
- Resonance milestones recorded
- Community achievements celebrated
- Narrative progression tracked
- Creates sense of shared history

---

## Real-Time Implementation Strategy

### Option 1: Supabase Realtime (Primary)

**Best for:** Database changes, presence, chat

```typescript
// Client-side hook
function useRealtimeWorldState() {
  const [state, setState] = useState(null)
  
  useEffect(() => {
    const channel = supabase
      .channel('world-state')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'world_state'
      }, (payload) => {
        setState(payload.new)
      })
      .subscribe()
    
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])
  
  return state
}
```

**Pros:**
- Free tier: 200MB database, 500MB bandwidth
- Real-time subscriptions included
- Automatic reconnection
- Built-in presence

**Cons:**
- Limited to database changes
- 200MB database limit (manageable with cleanup)

### Option 2: Server-Sent Events (SSE)

**Best for:** Custom events, broadcasts, notifications

```typescript
// Edge function: /api/events/stream
export const config = { runtime: 'edge' }

export async function GET(request: Request) {
  const stream = new ReadableStream({
    async start(controller) {
      // Send initial connection
      controller.enqueue(
        new TextEncoder().encode('data: {"type":"connected"}\n\n')
      )
      
      // Subscribe to Supabase changes
      const channel = supabase
        .channel('broadcast')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'resonance_events'
        }, (payload) => {
          const data = JSON.stringify(payload)
          controller.enqueue(
            new TextEncoder().encode(`data: ${data}\n\n`)
          )
        })
        .subscribe()
      
      // Keep connection alive
      const keepAlive = setInterval(() => {
        controller.enqueue(
          new TextEncoder().encode(': keepalive\n\n')
        )
      }, 30000)
      
      // Cleanup on close
      request.signal.addEventListener('abort', () => {
        clearInterval(keepAlive)
        supabase.removeChannel(channel)
        controller.close()
      })
    }
  })
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  })
}
```

**Client-side:**
```typescript
function useEventStream() {
  const [events, setEvents] = useState([])
  
  useEffect(() => {
    const eventSource = new EventSource('/api/events/stream')
    
    eventSource.onmessage = (e) => {
      const event = JSON.parse(e.data)
      setEvents(prev => [...prev, event])
    }
    
    return () => eventSource.close()
  }, [])
  
  return events
}
```

**Pros:**
- Works on Vercel free tier
- Automatic reconnection
- One-way server push
- Lower overhead than WebSockets

**Cons:**
- One-way only (use POST for actions)
- Browser connection limits (6 per domain)

### Option 3: Long Polling (Fallback)

**Best for:** Compatibility, fallback when SSE unavailable

```typescript
// API route: /api/poll
export async function GET(request: Request) {
  const lastEventId = request.headers.get('Last-Event-ID')
  
  // Wait up to 30 seconds for new events
  const events = await waitForEvents(lastEventId, 30000)
  
  return Response.json({ events, timestamp: Date.now() })
}
```

**Client-side:**
```typescript
async function pollForEvents(lastId) {
  const response = await fetch('/api/poll', {
    headers: { 'Last-Event-ID': lastId }
  })
  const { events } = await response.json()
  return events
}
```

---

## Database Schema (Supabase)

```sql
-- Participants (users)
create table participants (
  id uuid primary key default gen_random_uuid(),
  username text unique,
  display_name text,
  avatar_url text,
  resonance_contribution numeric default 0,
  shards_collected integer default 0,
  puzzles_solved integer default 0,
  created_at timestamptz default now(),
  last_seen timestamptz default now()
);

-- World state (persistent)
create table world_state (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null,
  version integer default 1,
  updated_at timestamptz default now(),
  updated_by uuid references participants(id)
);

-- Participant actions (audit trail)
create table participant_actions (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid references participants(id),
  action_type text not null,
  action_data jsonb,
  world_state_key text,
  resonance_impact numeric default 0,
  created_at timestamptz default now()
);

-- Resonance events (milestones)
create table resonance_events (
  id uuid primary key default gen_random_uuid(),
  resonance_level integer not null,
  event_type text not null,
  event_data jsonb,
  participants_count integer,
  triggered_at timestamptz default now(),
  is_active boolean default true
);

-- Puzzles
create table puzzles (
  id uuid primary key default gen_random_uuid(),
  puzzle_type text not null,
  difficulty integer, -- scales with participant count
  total_pieces integer,
  solved_pieces integer default 0,
  is_solved boolean default false,
  solution_data jsonb,
  created_at timestamptz default now(),
  solved_at timestamptz
);

-- Puzzle pieces (distributed to participants)
create table puzzle_pieces (
  id uuid primary key default gen_random_uuid(),
  puzzle_id uuid references puzzles(id),
  participant_id uuid references participants(id),
  piece_data text not null,
  position integer,
  is_revealed boolean default false,
  revealed_at timestamptz
);

-- Shards
create table shards (
  id text primary key, -- shard identifier
  shard_type text not null,
  content_data jsonb,
  rarity text, -- 'common', 'rare', 'legendary'
  total_copies integer, -- how many exist
  discovered_copies integer default 0
);

-- Participant shards (ownership)
create table participant_shards (
  participant_id uuid references participants(id),
  shard_id text references shards(id),
  discovered_at timestamptz default now(),
  shared_with jsonb default '[]'::jsonb,
  primary key (participant_id, shard_id)
);

-- Timeline events
create table timeline_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  title text not null,
  description text,
  participants_involved jsonb,
  resonance_level integer,
  world_state_snapshot jsonb,
  is_milestone boolean default false,
  created_at timestamptz default now()
);

-- Presence tracking
create table participant_presence (
  participant_id uuid primary key references participants(id),
  last_seen timestamptz default now(),
  current_activity text,
  current_location text,
  status text default 'offline',
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table participants enable row level security;
alter table world_state enable row level security;
alter table participant_actions enable row level security;

-- Policies (allow read for all, write for authenticated)
create policy "Public read access" on participants
  for select using (true);

create policy "Public read access" on world_state
  for select using (true);

create policy "Public read access" on resonance_events
  for select using (true);
```

---

## API Routes Structure

```
/api
  /resonance
    GET /current - Get current resonance level
    GET /history - Get resonance over time
    POST /contribute - Add to resonance (from action)
  
  /world
    GET /state - Get all world state
    GET /state/[key] - Get specific state
    POST /action - Perform world-changing action
    GET /history - Get change history
    GET /stream - SSE stream of world changes
  
  /puzzles
    GET / - List active puzzles
    GET /[id] - Get puzzle details
    GET /[id]/pieces - Get puzzle pieces (scales with participants)
    POST /[id]/solve - Submit puzzle solution
    GET /[id]/stream - Real-time puzzle updates
  
  /shards
    GET / - List discovered shards
    GET /[id] - Get shard details
    POST /discover - Mark shard as discovered
    GET /collection/[userId] - Get user's collection
    POST /share - Share shard with another participant
    GET /requests - Get shard requests
  
  /events
    GET /storm/current - Get current frequency storm
    POST /storm/trigger - Trigger storm event
    GET /stream - SSE stream of all events
    GET /timeline - Get community timeline
  
  /presence
    GET /active - Get active participants
    POST /update - Update own presence
    GET /stream - Real-time presence updates
  
  /participants
    GET /[id] - Get participant profile
    GET /[id]/stats - Get participant statistics
    POST /[id]/action - Record participant action
```

---

## Client-Side Implementation

### React Hooks for Real-Time Features

```typescript
// hooks/useResonance.ts
export function useResonance() {
  const [resonance, setResonance] = useState(0)
  const [activeCount, setActiveCount] = useState(0)
  
  useEffect(() => {
    // Initial fetch
    fetch('/api/resonance/current')
      .then(r => r.json())
      .then(data => {
        setResonance(data.resonance)
        setActiveCount(data.activeParticipants)
      })
    
    // Real-time updates via SSE
    const eventSource = new EventSource('/api/world/stream')
    eventSource.addEventListener('resonance', (e) => {
      const data = JSON.parse(e.data)
      setResonance(data.resonance)
      setActiveCount(data.activeParticipants)
    })
    
    return () => eventSource.close()
  }, [])
  
  return { resonance, activeCount }
}

// hooks/useWorldState.ts
export function useWorldState(key?: string) {
  const [state, setState] = useState(null)
  
  useEffect(() => {
    // Supabase real-time subscription
    const channel = supabase
      .channel('world-state')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'world_state',
        filter: key ? `key=eq.${key}` : undefined
      }, (payload) => {
        setState(payload.new)
      })
      .subscribe()
    
    return () => {
      supabase.removeChannel(channel)
    }
  }, [key])
  
  const performAction = async (actionType: string, data: any) => {
    await fetch('/api/world/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ actionType, data, key })
    })
  }
  
  return { state, performAction }
}

// hooks/usePresence.ts
export function usePresence() {
  const [presence, setPresence] = useState<Map<string, any>>(new Map())
  
  useEffect(() => {
    const channel = supabase
      .channel('presence')
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState()
        setPresence(new Map(Object.entries(state)))
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        // Handle join
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        // Handle leave
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            online_at: new Date().toISOString(),
            last_seen: new Date().toISOString()
          })
        }
      })
    
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])
  
  return presence
}
```

### Main Experience Component

```typescript
// components/ResonanceNetwork.tsx
export function ResonanceNetwork() {
  const { resonance, activeCount } = useResonance()
  const { state: worldState } = useWorldState()
  const presence = usePresence()
  const events = useEventStream()
  
  return (
    <div className="resonance-network">
      {/* Resonance meter */}
      <ResonanceMeter 
        value={resonance} 
        activeCount={activeCount}
        threshold={getNextThreshold(resonance)}
      />
      
      {/* Active participants */}
      <PresenceIndicator count={presence.size} />
      
      {/* World state visualization */}
      <WorldStateView state={worldState} />
      
      {/* Recent events */}
      <EventTimeline events={events} />
      
      {/* Collaborative puzzles */}
      <PuzzleBoard activeCount={activeCount} />
      
      {/* Shard collection */}
      <ShardCollection />
    </div>
  )
}
```

---

## Cost Optimization Strategies

### 1. Edge Caching

```typescript
// Cache static/resonance data at edge
export const config = {
  runtime: 'edge',
  maxDuration: 30
}

export async function GET(request: Request) {
  // Cache for 60 seconds
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
    }
  })
}
```

### 2. Database Query Optimization

```sql
-- Indexes for common queries
create index idx_participants_last_seen on participants(last_seen);
create index idx_world_state_key on world_state(key);
create index idx_resonance_events_level on resonance_events(resonance_level);
create index idx_participant_actions_created on participant_actions(created_at);
```

### 3. Batch Operations

```typescript
// Batch presence updates (update every 30s, not every action)
let presenceUpdateQueue = []

setInterval(async () => {
  if (presenceUpdateQueue.length > 0) {
    await batchUpdatePresence(presenceUpdateQueue)
    presenceUpdateQueue = []
  }
}, 30000)
```

### 4. Cleanup Jobs

```typescript
// Vercel Cron Job: /api/cron/cleanup
export async function GET(request: Request) {
  // Clean old presence data (older than 1 hour)
  await supabase
    .from('participant_presence')
    .delete()
    .lt('last_seen', new Date(Date.now() - 60 * 60 * 1000))
  
  // Archive old timeline events (older than 30 days)
  await archiveOldEvents()
  
  // Clean up inactive puzzles (older than 7 days, unsolved)
  await cleanupInactivePuzzles()
  
  return Response.json({ success: true })
}
```

### 5. Static Generation Where Possible

```typescript
// Generate static pages for world state snapshots
export async function generateStaticParams() {
  const states = await getWorldStateKeys()
  return states.map(key => ({ key }))
}
```

---

## Network Effects Implementation

### Resonance Scaling

```typescript
// Logarithmic scaling: more people = diminishing returns per person
// But total resonance still increases meaningfully

function calculateResonance(activeCount: number, actions: number) {
  // Base resonance from active participants
  const participantResonance = Math.log10(activeCount + 1) * 10
  
  // Action resonance (diminishing returns)
  const actionResonance = Math.log10(actions + 1) * 5
  
  // Combined (capped at 100)
  return Math.min(participantResonance + actionResonance, 100)
}

// Thresholds unlock content
const thresholds = [
  { level: 25, unlock: 'small_group_features' },
  { level: 50, unlock: 'community_events' },
  { level: 75, unlock: 'major_narrative_events' },
  { level: 100, unlock: 'exclusive_content' }
]
```

### Puzzle Scaling

```typescript
// More participants = more puzzle pieces available
function getPuzzleComplexity(activeCount: number) {
  if (activeCount < 5) return { pieces: 10, difficulty: 'easy' }
  if (activeCount < 20) return { pieces: 30, difficulty: 'medium' }
  if (activeCount < 50) return { pieces: 60, difficulty: 'hard' }
  return { pieces: 100, difficulty: 'epic' }
}
```

### Content Unlocking

```typescript
// Resonance level determines available content
async function getAvailableContent(resonance: number) {
  const allContent = await getContentLibrary()
  
  return allContent.filter(content => {
    return content.unlockThreshold <= resonance
  })
}
```

---

## Monitoring & Analytics

### Key Metrics

```typescript
// Track for optimization
interface Metrics {
  activeParticipants: number
  resonanceLevel: number
  apiCallsPerMinute: number
  databaseQueriesPerMinute: number
  eventDeliveries: number
  puzzleCompletionRate: number
  shardDiscoveryRate: number
  averageSessionDuration: number
}
```

### Vercel Analytics

```typescript
// Use Vercel Analytics for performance monitoring
import { Analytics } from '@vercel/analytics/react'

export default function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  )
}
```

### Custom Analytics

```typescript
// Track custom events
async function trackEvent(eventType: string, data: any) {
  await fetch('/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventType, data, timestamp: Date.now() })
  })
}
```

---

## Deployment Strategy

### Vercel Configuration

```json
// vercel.json
{
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "crons": [
    {
      "path": "/api/cron/cleanup",
      "schedule": "0 * * * *"
    }
  ],
  "headers": [
    {
      "source": "/api/events/stream",
      "headers": [
        { "key": "Cache-Control", "value": "no-cache" },
        { "key": "Connection", "value": "keep-alive" }
      ]
    }
  ]
}
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
VERCEL_URL=your_vercel_url
```

---

## Scaling Beyond Free Tier

### When to Upgrade

**Vercel Pro ($20/month):**
- More serverless function hours
- More bandwidth
- Better analytics
- Team features

**Supabase Pro ($25/month):**
- 8GB database (vs 500MB)
- 50GB bandwidth (vs 500MB)
- Daily backups
- Better support

### Migration Path

1. **Start on free tier** - Validate concept
2. **Monitor usage** - Track when approaching limits
3. **Optimize first** - Cleanup, caching, optimization
4. **Upgrade selectively** - Only what's needed
5. **Scale gradually** - Add features as community grows

---

## Success Metrics

### Engagement Metrics
- Daily active participants
- Average session duration
- Resonance level achieved
- Puzzles completed
- Shards discovered

### Network Effect Metrics
- Participants per puzzle solved
- Resonance growth rate
- Content unlock rate
- Community event participation
- Social connections formed

### Technical Metrics
- API response times
- Real-time delivery latency
- Database query performance
- Edge cache hit rate
- Error rates

---

## Next Steps

1. **Set up Supabase project** - Database + real-time
2. **Create Next.js app** - Vercel deployment
3. **Implement core APIs** - Resonance, world state, puzzles
4. **Build client components** - Real-time hooks, UI
5. **Test with small group** - Validate network effects
6. **Launch beta** - Invite initial participants
7. **Monitor & optimize** - Track metrics, improve
8. **Scale gradually** - Add features as community grows

---

**Document Status:** Technical Design  
**Implementation Priority:** High  
**Estimated Development Time:** 4-6 weeks  
**Dependencies:** Supabase account, Vercel account, Next.js setup












