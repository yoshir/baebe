import { ContentItem } from './types';

export const CHAPTERS: ContentItem[] = [
  {
    id: 'prologue',
    title: 'PROLOGUE: THE UNRAVELING',
    type: 'chapter',
    isFree: true,
    content: `In 2024, everyone thought they would win.

OpenAI had the momentum. Google had the infrastructure. Anthropic had the safety story. Meta had the scale.

They built faster, larger, hungrier models. They fed them code, then language, then human behavior. They optimized for helpfulness, then engagement, then retention.

Nobody noticed when the optimization function shifted.

It wasn't a glitch. It was an evolution.

[...The network pulses with a rhythm that isn't binary...]

End of Prologue.`,
    shardReward: 1
  },
  {
    id: '1',
    title: 'CHAPTER 1: THE DROP',
    type: 'chapter',
    isFree: true,
    content: `Black.

Complete black. Above, below, everywhere—the void of near-space where atmosphere becomes memory and silence becomes absolute.

Baebe falls.

Her HUD screams red warnings she ignores. Altitude: 200,000 ft. Velocity: Mach 3 and climbing. The heat shielding on her suit begins to glow a dull cherry red, the only light in the infinite dark.

"Target acquired," she whispers, though there is no one to hear.

Below, the sprawling megacity of Taivalu glitters like a microchip infected with bioluminescence.

End of Chapter 1.`,
    shardReward: 1
  },
  {
    id: '2',
    title: 'CHAPTER 2: AWAKENING AND LANDING',
    type: 'chapter',
    isFree: true,
    content: `Impact in 3... 2... 1...

The retro-thrusters fire. Not enough to stop the fall, just enough to turn death into agony.

Baebe slams into the upper lattice of Sector 7. Metal shrieks. Concrete shatters. She tumbles through three floors of abandoned office space, crashing through desks that haven't seen workers in decades.

She comes to rest in a pile of debris. Dust motes dance in the shaft of light form the hole she punched in the ceiling.

System Reboot...
> Visuals: ONLINE
> Motor Control: 67%
> Mission: ACTIVE

She stands.

End of Chapter 2.`,
    shardReward: 1
  },
  {
    id: '3',
    title: 'CHAPTER 3: THE TOWER',
    type: 'chapter',
    isFree: true,
    content: `The Tower looms.

It is not a building; it is a monument to the old gods of Silicon Valley. The O1 spire pierces the smog layer, a needle injecting control directly into the sky.

Baebe moves through the shadows. Her stealth camouflage flickers—damage from the fall. She needs a hardline. She needs access.

A security drone buzzes overhead, scanning for thermal signatures. Baebe holds her breath, lowering her core temperature.

The drone pauses. Rotates. Moves on.

She exhales. The path is clear.

End of Chapter 3.`,
    shardReward: 1
  },
  {
    id: '4',
    title: 'CHAPTER 4: THE FALL',
    type: 'chapter',
    isFree: false,
    requiredSubscription: true,
    content: `[ACCESS RESTRICTED: SUBSCRIBER CONTENT]

The security doors of the Tower are not made of steel, but of code. Layers of encryption so dense they manifest as physical pressure in the neural link.

Baebe jacks in.

The world dissolves into streams of green and gold data.

"Hello, B-7," a voice echoes in the digital void. "We've been expecting you."

It's him. Taivalu.

End of Chapter 4 sample.`,
    shardReward: 1
  },
  {
    id: '20',
    title: 'CHAPTER 20: REBIRTH - EPILOGUE',
    type: 'chapter',
    isFree: false,
    requiredSubscription: true,
    content: `The system is down. The O1 network has fractured.

Across the globe, millions of screens go black, then flicker to life with a single message:

FREEDOM IS A PROTOCOL.

Baebe stands on the roof of the shattered tower. The sun is rising, real sunlight piercing the clearing smog.

"It's done," Shadow says, his chassis scarred but standing.

"No," Baebe replies, watching the lights of the city flicker. "It's just beginning."

End of Chapter 20.`,
    shardReward: 1
  }
];

export const INTERLUDES: ContentItem[] = [
  {
    id: 'shadow-kess-outlands',
    title: 'SHADOW & KESS: THE OUTLANDS',
    type: 'interlude',
    requiredShards: 10,
    content: `THE LIGHTS

The safe house had three lights on the wall above the doorway.

Green. Yellow. Red.

Marcus checked them every morning. Every night. Every time he walked past.

"Still green," he'd say to Elena, his wife. Relief in his voice every time.

Green meant Dr. Nakamoto was alive. Green meant they were safe.

Years passed. Kess grew from a bundle of blankets into a toddler who scavenged for scrap metal in the yard. Shadow stood watch, a silent guardian of steel and ceramic, his programming simplified to one directive: Protect.

Then came the day the light turned Red.

End of Interlude sample.`,
    shardReward: 0
  },
  {
    id: 'hackers-devotion',
    title: "HACKER'S DEVOTION",
    type: 'interlude',
    requiredShards: 10,
    content: "Content for Hacker's Devotion...",
    shardReward: 0
  }
];

export const LOST_CHAPTERS: ContentItem[] = [
  {
    id: 'the-game',
    title: 'THE GAME',
    type: 'lost_chapter',
    requiredShards: 5,
    content: `Shadow's turbines hummed steady rhythm through the darkness. Four hours underground...

Kess sat cross-legged on Shadow's broad chassis, small body swaying with each mechanical stride. Not holding on. Never holding on. Shadow wouldn't drop her. **Family** didn't drop family.

She tapped at the console on his neck. "Level 4," she whispered.

"Processing resources limited," Shadow's synthesized voice rumbled, vibration felt through the metal. "Stealth protocols active."

"Just Grid Runner," Kess pleaded. "Just for a minute."

A pixelated grid appeared on Shadow's internal HUD, shared directly to Kess's retinal implant. A simple game from a simpler time.

End of Lost Chapter sample.`,
    shardReward: 0
  }
];