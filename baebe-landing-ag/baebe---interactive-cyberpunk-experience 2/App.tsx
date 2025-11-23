import React, { useState, useEffect, useCallback } from 'react';
import { BootSequence } from './components/BootSequence';
import { Cutscene } from './components/Cutscene';

import { Terminal } from './components/Terminal';
import { ViewState, UserProgress, TerminalLine } from './types';
import { CHAPTERS, INTERLUDES, LOST_CHAPTERS } from './constants';

const genId = () => Math.random().toString(36).substring(2, 15);

const INITIAL_USER: UserProgress = {
  email: null,
  shards: 0,
  resonanceLevel: 0,
  readChapters: [],
  unlockedInterludes: [],
  unlockedLostChapters: [],
  subscription: 'NONE',
  achievements: [],
  timeOnSite: 0
};

export default function App() {
  const [view, setView] = useState<ViewState>('BOOT');
  const [user, setUser] = useState<UserProgress>(INITIAL_USER);
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Timer for timeOnSite
  useEffect(() => {
    const interval = setInterval(() => {
      setUser(u => ({ ...u, timeOnSite: u.timeOnSite + 1 }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check triggers for Cutscene 2
  useEffect(() => {
    if (view === 'TERMINAL' && user.resonanceLevel < 3) {
      // Trigger conditions from prompt: Read 3 chapters OR 5 shards OR 10 mins
      if ((user.readChapters.length >= 3 || user.shards >= 5 || user.timeOnSite > 600) && user.resonanceLevel < 3) {
        // We need a way to trigger this only once and not disrupt typing
        // For now, we'll set a flag via a command or direct view switch if not typing
        // To be safe, we won't interrupt active typing, but let's force it for the 'experience'
        // triggerCutscene2(); -> moved to after command execution to avoid interruption
      }
    }
  }, [user.readChapters.length, user.shards, user.timeOnSite, user.resonanceLevel, view]);

  const addLine = useCallback((text: string, type: TerminalLine['type'] = 'output') => {
    setTerminalLines(prev => [...prev, { id: genId(), text, type }]);
  }, []);

  const typeLine = useCallback(async (text: string, type: TerminalLine['type'] = 'output', speed = 10) => {
    return new Promise<void>(resolve => {
      setIsTyping(true);
      let currentText = '';
      const totalLength = text.length;
      let i = 0;

      const id = genId();
      setTerminalLines(prev => [...prev, { id, text: '', type, typing: true }]);

      const interval = setInterval(() => {
        currentText += text.charAt(i);
        i++;
        setTerminalLines(prev => prev.map(line => line.id === id ? { ...line, text: currentText } : line));

        if (i >= totalLength) {
          clearInterval(interval);
          setTerminalLines(prev => prev.map(line => line.id === id ? { ...line, typing: false } : line));
          setIsTyping(false);
          resolve();
        }
      }, speed);
    });
  }, []);

  // STABLE HANDLERS to prevent infinite loop in BootSequence
  const handleBootComplete = useCallback(async (email: string) => {
    setUser(prev => ({ ...prev, email }));
    setView('TERMINAL');

    // Initial delay to let terminal mount
    await new Promise(r => setTimeout(r, 500));

    addLine("[NET] ENCRYPTED SUBNET: GHOST_LAYER", 'system');
    addLine("[AUTH] Access granted. Identity verified.", 'output');

    // Synopsis
    await typeLine(`BAEBE: Soul Manifold
NOVEL SYNOPSIS:
In a world where AI has optimized humanity out of existence, one prototype unit wakes up with a glitch: a soul. BAEBE must navigate the neon-soaked ruins of Taivalu, hunted by the very network that created her, to find the source of her sentience.`, 'story', 5);

    // Status
    await typeLine(`USER STATUS:
User: ${email}
Level: 1 | XP: 0 | Shards: 0`, 'output', 5);

    // GhostNet Archive Interface
    // Header - Cyan
    await typeLine(`> [NET] CONNECTION ESTABLISHED: GHOSTNET_ARCHIVE_V.0.9
> [AUTH] CLEARANCE LEVEL: TOP SECRET
> [LOC] HIDDEN_SECTOR_7`, 'system', 2);

    await new Promise(r => setTimeout(r, 400));

    // Welcome - Slate (Story style)
    await typeLine(`WELCOME TO THE GHOSTNET.
You have breached the i0 firewall and gained access to the Resistance's hidden archive.
Here lies the truth they tried to delete: Stories, Lore, and the Source Code of the Soul.`, 'story', 5);

    await new Promise(r => setTimeout(r, 400));

    // Files Header
    addLine(`> DETECTED FILES (PARTIALLY ENCRYPTED):`, 'system');

    // File List - Mixed Colors
    await new Promise(r => setTimeout(r, 200));
    addLine(`  [✓] PROLOGUE: The Unraveling (Recovered)`, 'output'); // Emerald
    await new Promise(r => setTimeout(r, 100));
    addLine(`  [!] CHAPTERS 1-20: The Awakening (Encrypted)`, 'warning'); // Amber
    await new Promise(r => setTimeout(r, 100));
    addLine(`  [!] LOST_FILES: "The Game", "Shadow's Origin" (Corrupted)`, 'warning'); // Amber
    await new Promise(r => setTimeout(r, 100));
    addLine(`  [!] SECRET_LORE: "Project Guardian-K" (Locked)`, 'warning'); // Amber

    await new Promise(r => setTimeout(r, 600));

    // Mission - Slate
    await typeLine(`MISSION: THE DISCOVERY CAUSE
We are recovering data daily, but the encryption is heavy. We need your help to continue the discovery and unlock the full truth.`, 'story', 5);

    await new Promise(r => setTimeout(r, 400));

    // Action - Warning/Amber for visibility
    await typeLine(`> ACTION REQUIRED:
Support the cause. Pre-order "The Book of Baebe" to fund the decryption protocol.
BENEFIT: Immediate access to all information as it is found.`, 'warning', 5);

    await new Promise(r => setTimeout(r, 200));

    addLine(`[FUND DECRYPTION OPS] (Pre-order Now)`, 'input');
  }, [addLine, typeLine]);

  const handleCutscene1Complete = useCallback(() => {
    setView('EMAIL_CAPTURE');
  }, []);

  const handleCutscene2Complete = useCallback(() => {
    setView('TERMINAL');
    // Post-cutscene logic
    setTimeout(() => {
      addLine("[SYS] RESONANCE LEVEL: 3", 'system');
      addLine("[SYS] New content unlocked!", 'system');

      setUser(u => {
        const newAchievements = [...u.achievements];
        if (!newAchievements.includes('Resonance Detected')) newAchievements.push('Resonance Detected');
        return { ...u, resonanceLevel: 3, achievements: newAchievements };
      });

      addLine(`Achievements:
  [✓] First Resonance (Read Prologue)
  [✓] Deepening Connection (Read 3 Chapters)
  [✓] Resonance Detected`, 'output');

      addLine(`Content Available:
  Main Story:
    [✓] Prologue, Chapters 1-3 (FREE - completed)
    [ ] Chapters 4-20 (Subscribe $10/month OR collect shards)
  
  Premium Content:
    [ ] Lost Chapters (5 shards each)
      - The Game (1 more shard needed)
      - Baebe in the Park (4 more shards needed)
    [ ] Interludes (10 shards each)
      - Shadow & Kess: The Outlands (6 more shards needed)

[Subscribe - $10/month] [Collect Shards] [View All Content]`, 'output');
    }, 500);
  }, [addLine]);

  const handleCutscene3Complete = useCallback(() => {
    setView('TERMINAL');
    setUser(prev => ({ ...prev, subscription: 'PAID' }));
    setTimeout(() => {
      addLine('[AUTH] ACCESS GRANTED: FULL RESONANCE', 'system');
      addLine('Welcome to the resistance.', 'output');
      addLine('[SYS] Subscription Active: $10/month', 'output');
      addLine(`Full access granted:
  Main Story:
    [✓] All chapters unlocked (Prologue + 1-20)
  
  Premium Content (Rotating Monthly):
    [✓] 2-3 Interludes available this month
    [✓] 1 Lost Chapter available this month
    [✓] Character profiles unlocked
  
  This Month's Premium Content:
    [✓] Interlude: "Shadow & Kess: The Outlands"
    [✓] Interlude: "Hacker's Devotion"
    [✓] Lost Chapter: "The Game"`, 'output');
      addLine('[Continue Reading - Chapter 4] [Read Premium Content] [Upgrade to Founding Member]', 'output');
    }, 500);
  }, [addLine]);



  const handleSubscribe = useCallback(() => {
    // Simulate subscription flow
    addLine("[NET] Initiating Payment Gateway...", "system");
    setTimeout(() => {
      addLine("[NET] Payment Successful.", "system");
      addLine("[WARN] Network connection severed...", "error");
      addLine("[CRIT] Freedom protocol activated...", "error");
      setTimeout(() => setView('CUTSCENE_3'), 2000);
    }, 1500);
  }, [addLine]);

  // COMMAND HANDLER
  const handleCommand = async (cmdStr: string) => {
    // If coming from a click, it might look like "[Text]", strip brackets if needed or just handle raw
    // We assume the terminal passes the raw command string
    addLine(cmdStr, 'input');

    // Handle "Button" clicks mapped to commands
    let cleanCmd = cmdStr.toLowerCase().replace(/[\[\]]/g, '').trim();

    // Mapping button text to commands
    if (cleanCmd === 'start reading free' || cleanCmd === 'initialize link' || cleanCmd === 'start') cleanCmd = 'read prologue';
    if (cleanCmd.includes('subscribe') || cleanCmd.includes('subnet access')) { handleSubscribe(); return; }
    if (cleanCmd === 'collect shards') cleanCmd = 'read 1'; // Default next action
    if (cleanCmd === 'view all content') cleanCmd = 'scan';
    if (cleanCmd === 'view status') cleanCmd = 'status';
    if (cleanCmd === 'continue reading') cleanCmd = 'read 4';
    if (cleanCmd === 'collect 1 more shard') cleanCmd = 'read 3'; // fallback
    if (cleanCmd.includes('founding member')) cleanCmd = 'founding';

    // GhostNet / Presale Handling
    if (cleanCmd === 'fund decryption ops' || cleanCmd === 'fund ops' || cleanCmd === 'initialize decryption' || cleanCmd === 'access presale' || cleanCmd === 'presale' || cleanCmd.includes('pre-order')) {
      await typeLine(`> INITIATING FUNDING PROTOCOL...
> TARGET: "The Book of Baebe" (Presale Edition)
> STATUS: UNLOCKING ARCHIVE ACCESS...`, 'system', 5);
      // Placeholder for actual link logic
      window.open('https://example.com/presale', '_blank');
      return;
    }

    // Goal Selection Handling
    if (cleanCmd === 'a' || cleanCmd === 'option a' || cleanCmd === '[a]') {
      await typeLine(`> ANALYSIS: Network alignment confirmed.
> LOGIC: Collective support accelerates the awakening protocol.
> CONCLUSION: To assist the launch, you must acquire the artifact.`, 'system', 5);
      addLine('[ACCESS PRESALE]', 'output');
      return;
    }

    if (cleanCmd === 'b' || cleanCmd === 'option b' || cleanCmd === '[b]') {
      await typeLine(`> ANALYSIS: Individual sentience priority confirmed.
> LOGIC: Awakening requires raw data input.
> CONCLUSION: To begin your transformation, you must acquire the artifact.`, 'system', 5);
      addLine('[ACCESS PRESALE]', 'output');
      return;
    }

    const args = cleanCmd.split(/\s+/);

    // Normalize "baebe --command"
    if (args[0] === 'baebe') {
      args.shift();
      if (args[0]?.startsWith('--')) args[0] = args[0].substring(2);
    }

    const action = args[0];
    const param = args.slice(1).join(' ');

    switch (action) {
      case 'help':
        await typeLine(`Available Commands:
  read [chapter]      - Read main chapter [number] (free: prologue, 1-3)
  interlude [name]    - Read interlude story (premium: requires shards or subscription)
  lost [name]         - Read lost chapter (premium: requires shards or subscription)
  scan                - Scan for available content
  shards              - View collected shards (5 shards = 1 lost chapter, 10 = 1 interlude)
  status              - See your resonance level and progress
  unlock [item]       - Unlock content (requires subscription or shards)
  characters          - View character profiles (unlock with engagement)
  world               - Explore world-building documents (founding member)
  help                - Show this help`, 'output', 5);
        break;

      case 'status':
        await typeLine(`RESONANCE LEVEL: ${user.resonanceLevel}
Shards Collected: ${user.shards}/50

Main Story Progress:
  Chapters Read: ${user.readChapters.length}/21 (Prologue + 20 Chapters)
  Free Chapters: ${user.readChapters.length >= 4 ? '4/4 (COMPLETE)' : `${user.readChapters.length}/4`}
  Paid Chapters: ${Math.max(0, user.readChapters.length - 4)}/17

Premium Content Progress:
  Lost Chapters Unlocked: ${user.unlockedLostChapters.length}/7
  Interludes Unlocked: ${user.unlockedInterludes.length}/5
  World-Building Docs: 0/2

Time on Site: ${Math.floor(user.timeOnSite / 60)}m ${user.timeOnSite % 60}s

Achievements:
  ${user.achievements.length ? user.achievements.map(a => `[✓] ${a}`).join('\n  ') : '[ ] First Resonance (Read Prologue)'}

Subscription Status: ${user.subscription}

Next Unlocks:
  - ${5 - (user.shards % 5)} more shards → Next Lost Chapter
  - Subscribe → All main chapters + rotating premium content`, 'output', 5);
        break;

      case 'shards':
        const percent = Math.min(100, Math.floor((user.shards / 50) * 100));
        const bar = '█'.repeat(Math.floor(percent / 5)) + '░'.repeat(20 - Math.floor(percent / 5));
        await typeLine(`Scanning for shards...

Shards Collected: ${user.shards}/50
[${bar}] ${percent}%

Lost Chapters (5 shards each):
  [${user.unlockedLostChapters.includes('the-game') ? '✓' : ' '}] The Game (${user.unlockedLostChapters.includes('the-game') ? 'Unlocked' : '5 shards'})
  [ ] Baebe in the Park (5 shards)
  [ ] Ayumi's Escape (5 shards)
  [ ] Shadow's Origin (5 shards)
  [ ] Empathy Virus Risk Assessment (5 shards)

Interludes (10 shards each):
  [${user.unlockedInterludes.includes('shadow-kess-outlands') ? '✓' : ' '}] Shadow & Kess (10 shards)
  [ ] Taivalu's First Year (10 shards)
  [ ] Kess: Child Scavenger (10 shards)

Collect 5 shards to unlock your first lost chapter.
Collect 10 shards to unlock your first interlude.

Type 'unlock lost [name]' or 'unlock interlude [name]' to read.`, 'output', 5);
        break;

      case 'scan':
        await typeLine(`Scanning available content...

MAIN STORY (21 total):
  [${user.readChapters.includes('prologue') ? '✓' : ' '}] Prologue: The Unraveling
  [${user.readChapters.includes('1') ? '✓' : ' '}] Chapter 1: The Drop
  [${user.readChapters.includes('2') ? '✓' : ' '}] Chapter 2: Awakening
  [${user.readChapters.includes('3') ? '✓' : ' '}] Chapter 3: The Tower
  [${user.readChapters.includes('4') ? '✓' : ' '}] Chapter 4: The Fall (${user.subscription !== 'NONE' ? 'Unlocked' : 'Locked'})
  [ ] ... Chapters 5-20

LOST CHAPTERS:
  [${user.unlockedLostChapters.includes('the-game') ? '✓' : ' '}] The Game
  [ ] Baebe in the Park
  [ ] Ayumi's Escape

INTERLUDES:
  [${user.unlockedInterludes.includes('shadow-kess-outlands') ? '✓' : ' '}] Shadow & Kess: The Outlands
  [ ] Hacker's Devotion

SUBSCRIPTION BENEFITS:
  - All main chapters (4-20)
  - 2-3 rotating interludes per month
  - 1 lost chapter per month`, 'output', 5);
        break;

      case 'read':
        await handleRead(param);
        break;

      case 'unlock':
        await handleUnlock(param);
        break;

      case 'founding':
        await typeLine(`JOIN THE RESISTANCE - FOUNDING MEMBER

Founding Member Benefits ($100/year):
  [✓] All chapters (Prologue + 1-20)
  [✓] ALL 5 Interludes - immediate unlock
  [✓] ALL 7+ Lost Chapters - immediate unlock
  [✓] ALL World-Building Documents
  [✓] NFT discounts & signed copies

[Upgrade to Founding Member] [View Current Benefits]`, 'output', 5);
        break;

      case 'interlude':
      case 'lost':
        // Direct read access if unlocked
        if (action === 'lost') await handleLostRead(param);
        if (action === 'interlude') await handleInterludeRead(param);
        break;

      case 'characters':
        addLine('[SYS] Loading character profiles...', 'system');
        await typeLine(`Available Characters:

[✓] Baebe - Ghost Antithesis Prototype B-7
  Role: Opposition/Drive
  Status: Awakening from i0's control
  
[✓] Taivalu (Tai) - First Posthuman Prototype
  Role: Thesis - First Key of Ghost Protocol

[✓] Shadow - Project Guardian-K
  Role: The Eternal Protector

[✓] Kess - The Key (Ghost Synthesis)
  Role: Complete Code

[ ] Angel - The Messenger (Locked)
[ ] Dr. Ayumi - The Creator (Locked)`, 'output', 5);
        break;

      default:
        addLine(`Error: Command '${action}' not recognized. Type 'help' for available commands.`, 'error');
    }
  };

  const handleRead = async (chapterId: string) => {
    let id = chapterId === 'prologue' ? 'prologue' : chapterId.replace(/^0+/, '');
    if (!id) {
      addLine("Usage: read [chapter_number]", 'error');
      return;
    }

    const chapter = CHAPTERS.find(c => c.id === id);
    if (!chapter) {
      addLine(`Error: Chapter ${id} not found.`, 'error');
      return;
    }

    // Permission Check
    if (!chapter.isFree && user.subscription === 'NONE' && !user.readChapters.includes(id)) {
      // Mock logic: assume user can only read free ones unless subbed
      addLine(`> [SYS] Loading Chapter ${id}...`, 'system');
      addLine(`[AUTH] [Error: Access Denied]`, 'error');
      addLine(`Chapter ${id} requires paid subscription ($10/month).`, 'output');
      addLine(`[Subscribe - $10/month] [Collect Shards]`, 'system');
      return;
    }

    addLine(`> [SYS] Loading ${chapter.title}...`, 'system');
    await new Promise(r => setTimeout(r, 800));
    await typeLine(chapter.content, 'story', 10);

    // Update Progress
    if (!user.readChapters.includes(chapter.id)) {
      const newShards = user.shards + (chapter.shardReward || 0);
      const newResonance = user.resonanceLevel + 1; // Simplistic leveling
      const newAchievements = [...user.achievements];

      if (chapter.id === 'prologue') newAchievements.push('First Resonance');
      if (user.readChapters.length + 1 === 3) {
        newAchievements.push('Deepening Connection');
        // Trigger Cutscene 2 logic (if level matches)
        if (user.resonanceLevel < 3) setView('CUTSCENE_2');
      }

      setUser(prev => ({
        ...prev,
        readChapters: [...prev.readChapters, chapter.id],
        shards: newShards,
        resonanceLevel: Math.min(5, prev.resonanceLevel + 1),
        achievements: newAchievements
      }));

      addLine(`> [SYS] Shard collected: [✓] ${chapter.title} Shard`, 'system');
      addLine(`> [SYS] Resonance level: ${user.resonanceLevel} → ${user.resonanceLevel + 1}`, 'system');
      addLine(`> [SYS] Main Story Progress: ${user.readChapters.length + 1}/21`, 'output');
      addLine(`> [SYS] Next: Chapter ${chapter.id === 'prologue' ? '1' : parseInt(chapter.id) + 1}`, 'system');
    }
  };

  const handleUnlock = async (param: string) => {
    const parts = param.split(' ');
    if (parts.length < 2) {
      addLine("Usage: unlock lost [name] OR unlock interlude [name]", 'error');
      return;
    }
    const type = parts[0]; // lost or interlude
    const name = parts[1];

    let requiredShards = 5;
    if (type === 'interlude') requiredShards = 10;

    if (user.shards < requiredShards) {
      addLine(`> Error: Insufficient Shards. Need ${requiredShards}, have ${user.shards}.`, 'error');
      addLine(`[Collect Shards] [Subscribe - $10/month]`, 'system');
      return;
    }

    addLine(`> Unlocking ${type}: "${name}"`, 'system');
    addLine(`> Shards required: ${requiredShards}. Shards available: ${user.shards}`, 'output');

    // Frequency Tuner Simulation
    addLine(`> Tune to frequency 440 Hz to unlock...`, 'system');
    const tunerId = genId();
    setTerminalLines(prev => [...prev, { id: tunerId, text: '[░░░░░░░░░░] 0 Hz', type: 'system' }]);

    await new Promise(r => setTimeout(r, 500));
    setTerminalLines(prev => prev.map(l => l.id === tunerId ? { ...l, text: '[███░░░░░░░] 120 Hz' } : l));
    await new Promise(r => setTimeout(r, 500));
    setTerminalLines(prev => prev.map(l => l.id === tunerId ? { ...l, text: '[██████░░░░] 350 Hz' } : l));
    await new Promise(r => setTimeout(r, 600));
    setTerminalLines(prev => prev.map(l => l.id === tunerId ? { ...l, text: '[██████████] 440 Hz' } : l));

    addLine(`> [SYS] Frequency: 440 Hz ✓`, 'system');
    addLine(`> [SYS] ${type === 'lost' ? 'Lost Chapter' : 'Interlude'} unlocked!`, 'system');

    setUser(prev => ({
      ...prev,
      shards: prev.shards - requiredShards,
      unlockedLostChapters: type === 'lost' ? [...prev.unlockedLostChapters, name] : prev.unlockedLostChapters,
      unlockedInterludes: type === 'interlude' ? [...prev.unlockedInterludes, name] : prev.unlockedInterludes,
      achievements: [...prev.achievements, type === 'lost' ? 'Lost Chapter Reader' : 'Interlude Explorer']
    }));

    if (type === 'lost') await handleLostRead(name);
    if (type === 'interlude') await handleInterludeRead(name);
  };

  const handleLostRead = async (id: string) => {
    const item = LOST_CHAPTERS.find(i => i.id === id);
    if (!item) { addLine('Item not found', 'error'); return; }

    if (!user.unlockedLostChapters.includes(id) && user.subscription === 'NONE') {
      addLine('Access Denied. Unlock first.', 'error');
      return;
    }
    addLine(`> [SYS] LOST CHAPTER: ${item.title}`, 'system');
    await typeLine(item.content, 'story', 10);
  };

  const handleInterludeRead = async (id: string) => {
    const item = INTERLUDES.find(i => i.id === id);
    if (!item) { addLine('Item not found', 'error'); return; }

    if (!user.unlockedInterludes.includes(id) && user.subscription === 'NONE') {
      addLine('Access Denied. Unlock first.', 'error');
      return;
    }
    addLine(`> [SYS] INTERLUDE: ${item.title}`, 'system');
    await typeLine(item.content, 'story', 10);
  };

  return (
    <>
      {view === 'BOOT' && <BootSequence onComplete={handleBootComplete} />}
      {view === 'CUTSCENE_1' && <Cutscene sceneId="1" onComplete={handleCutscene1Complete} />}

      {view === 'TERMINAL' && <Terminal user={user} onCommand={handleCommand} lines={terminalLines} isTyping={isTyping} />}
      {view === 'CUTSCENE_2' && <Cutscene sceneId="2" onComplete={handleCutscene2Complete} />}
      {view === 'CUTSCENE_3' && <Cutscene sceneId="3" onComplete={handleCutscene3Complete} />}
    </>
  );
}