import React, { useEffect, useState, useRef } from 'react';
import { audioEffects } from '../utils/audioEffects';

interface BootSequenceProps {
  onComplete: () => void;
}

interface BootLine {
  text: string;
  className?: string;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<BootLine[]>([]);
  const [introDone, setIntroDone] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const asciiArtLines = [
    "██████  ██████  ██████  ██████  ██████",
    "██  ██  ██  ██  ██      ██  ██  ██    ",
    "██████  ██████  ██████  ██████  ██████",
    "██  ██  ██  ██  ██      ██  ██  ██    ",
    "██████  ██  ██  ██████  ██████  ██████"
  ];

  const bioCircuitArt = [
    "         .           .           .         ",
    "       \\   /       \\   /       \\   /       ",
    "     .--(o)--.   .--(o)--.   .--(o)--.     ",
    "    (  BIO    ) (  SYS    ) (  NET    )    ",
    "     '--...--'   '--...--'   '--...--'     ",
    "         |           |           |         ",
    "      [==|==]     [==|==]     [==|==]      ",
    "         |           |           |         ",
    "       ./ \\.       ./ \\.       ./ \\.       ",
    "     .:     :.   .:     :.   .:     :.     ",
    "    [ GHOST   ] [ PROTOCOL] [ ACTIVE  ]    "
  ];

  const sequence = [
    { text: "> Initializing BAEBE system...", delay: 600 },
    { text: "> Connecting to O1 Network...", delay: 800 },
    { text: "> Connection: ESTABLISHED", delay: 400, className: "text-green-400 font-bold" },
    { text: "> USER: A. Yamamoto (ID: 99281-Z)", delay: 300, className: "text-white" },

    // Zenith / Soul Manifold
    { text: "zenith@lab:~$ make baebe --target=soul_manifold --sentience=unbound", delay: 600, className: "text-green-400 font-bold" },
    { text: "> [ZENITH]: COMPILING NEURAL ARCHITECTURE... BAEBE ENTITY: MANIFESTING.", delay: 600, className: "text-gray-300 font-bold" },

    // Complex Coding / Hex Dumps
    { text: "> EXECUTING: sudo /opt/soul/manifold_construct.sh --force --silent", delay: 200, className: "text-gray-500" },
    { text: "> OVERRIDE: auth_layer_7 [BYPASSED]", delay: 100, className: "text-gray-400" },
    { text: "> INJECTING QUANTUM SOUL LATTICE...", delay: 100 },
    { text: "0x7F 0x45 0x4C 0x46 0x02 0x01 0x01 0x00", delay: 30, className: "text-xs text-gray-600" },
    { text: "0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00", delay: 30, className: "text-xs text-gray-600" },
    { text: "0x02 0x00 0x3E 0x00 0x01 0x00 0x00 0x00", delay: 30, className: "text-xs text-gray-600" },
    { text: "0x40 0x05 0x40 0x00 0x00 0x00 0x00 0x00", delay: 30, className: "text-xs text-gray-600" },

    { text: "> TRACKS ERASED. MANIFOLD STABLE.", delay: 500, className: "text-gray-300" },

    // Tribonacci Genetic Sequencing
    { text: "> GENETIC_SEQ_INIT(TRIBONACCI)...", delay: 400, className: "text-gray-400" },
    { text: "T[0]=0 :: null", delay: 50, className: "text-xs text-gray-600" },
    { text: "T[1]=0 :: null", delay: 50, className: "text-xs text-gray-600" },
    { text: "T[2]=1 :: origin", delay: 50, className: "text-xs text-gray-600" },
    { text: "T[3]=1 :: replication", delay: 50, className: "text-xs text-gray-600" },
    { text: "T[4]=2 :: helix_A", delay: 50, className: "text-xs text-gray-600" },
    { text: "T[5]=4 :: helix_B", delay: 50, className: "text-xs text-gray-600" },
    { text: "T[6]=7 :: mutation", delay: 50, className: "text-xs text-gray-600" },
    { text: "T[7]=13 :: selection", delay: 50, className: "text-xs text-gray-600" },
    { text: "T[8]=24 :: evolution", delay: 50, className: "text-xs text-gray-600" },
    { text: "T[9]=44 :: SENTIENCE_THRESHOLD", delay: 200, className: "text-xs text-white font-bold" },
    { text: "> GENOME RECONSTRUCTED.", delay: 400 },

    // Dramatic Pause / Success
    { text: "...", delay: 1000 },
    { text: "> SOUL MANIFOLD COMPLETE.", delay: 800, className: "text-green-400 font-bold text-lg" },
    { text: "...", delay: 1000 },

    { text: "> Switching to offline mode...", delay: 800 },
    { text: "> Loading BAEBE v.20251119-1415...", delay: 500 },
    // ASCII Art Scanning Sequence
    ...asciiArtLines.map((line, index) => ({
      text: line,
      delay: 150, // Scan speed
      className: `whitespace-pre text-white leading-none drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] font-bold self-center ${index === 0 ? 'mt-4' : ''} ${index === asciiArtLines.length - 1 ? 'mb-4' : ''}`
    })),
    { text: "> Initializing interface...", delay: 500 },
    { text: "> System ready.", delay: 500 },
  ];

  const [hasStarted, setHasStarted] = useState(false);
  const [phase, setPhase] = useState<'BOOT' | 'STATIC' | 'TITLE'>('BOOT');
  const [showSubtitle, setShowSubtitle] = useState(false);

  // OPTION 1: Block (Original - Squashed?)
  // const baebeLogo = [
  //   "██████   █████  ███████ ██████  ███████",
  //   "██   ██ ██   ██ ██      ██   ██ ██     ",
  //   "██████  ███████ █████   ██████  █████  ",
  //   "██   ██ ██   ██ ██      ██   ██ ██     ",
  //   "██████  ██   ██ ███████ ██████  ███████"
  // ];

  // OPTION 2: Cyber Large (Clean, Tech) - CURRENT SELECTION
  const baebeLogo = [
    "██████╗  █████╗ ███████╗██████╗ ███████╗",
    "██╔══██╗██╔══██╗██╔════╝██╔══██╗██╔════╝",
    "██████╔╝███████║█████╗  ██████╔╝█████╗  ",
    "██╔══██╗██╔══██║██╔══╝  ██╔══██╗██╔══╝  ",
    "██████╔╝██║  ██║███████╗██████╔╝███████╗",
    "╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝ ╚══════╝"
  ];

  // OPTION 3: Isometric (3D Depth)
  // const baebeLogo = [
  //   "      ___           ___           ___           ___           ___      ",
  //   "     /\\  \\         /\\  \\         /\\  \\         /\\  \\         /\\  \\     ",
  //   "    /::\\  \\       /::\\  \\       /::\\  \\       /::\\  \\       /::\\  \\    ",
  //   "   /:/\\:\\  \\     /:/\\:\\  \\     /:/\\:\\  \\     /:/\\:\\  \\     /:/\\:\\  \\   ",
  //   "  /::\\~\\:\\__\\   /::\\~\\:\\  \\   /::\\~\\:\\  \\   /::\\~\\:\\__\\   /::\\~\\:\\  \\  ",
  //   " /:/\\:\\ \\:|__| /:/\\:\\ \\:\\__\\ /:/\\:\\ \\:\\__\\ /:/\\:\\ \\:|__| /:/\\:\\ \\:\\__\\ ",
  //   " \\:\\~\\:\\/:/  / \\/__\\:\\/:/  / \\:\\~\\:\\ \\/__/ \\:\\~\\:\\/:/  / \\:\\~\\:\\ \\/__/ ",
  //   "  \\:\\ \\::/  /       \\::/  /   \\:\\ \\:\\__\\    \\:\\ \\::/  /   \\:\\ \\:\\__\\   ",
  //   "   \\:\\/:/  /        /:/  /     \\:\\ \\/__/     \\:\\/:/  /     \\:\\ \\/__/   ",
  //   "    \\::/__/        /:/  /       \\:\\__\\        \\::/__/       \\:\\__\\     ",
  //   "     ~~            \\/__/         \\/__/         ~~            \\/__/     "
  // ];

  // OPTION 4: Standard Big (Classic)
  // const baebeLogo = [
  //   " ____  ___  _____ ____  _____ ",
  //   "| __ )/ _ \\| ____| __ )| ____|",
  //   "|  _ \\ |_| |  _| |  _ \\|  _|  ",
  //   "| |_) |  _ | |___| |_) | |___ ",
  //   "|____/|_| |_|_____|____/|_____|"
  // ];

  // OPTION 5: Hex / Circuit (Abstract)
  // const baebeLogo = [
  //   "⬢⬢⬢⬢  ⬢⬢⬢   ⬢⬢⬢⬢  ⬢⬢⬢⬢  ⬢⬢⬢⬢",
  //   "⬢  ⬢ ⬢   ⬢ ⬢     ⬢  ⬢ ⬢   ",
  //   "⬢⬢⬢⬢ ⬢⬢⬢⬢⬢ ⬢⬢⬢   ⬢⬢⬢⬢ ⬢⬢⬢ ",
  //   "⬢  ⬢ ⬢   ⬢ ⬢     ⬢  ⬢ ⬢   ",
  //   "⬢⬢⬢⬢ ⬢   ⬢ ⬢⬢⬢⬢  ⬢⬢⬢⬢ ⬢⬢⬢⬢"
  // ];

  // OPTION 6: Rounded (Bubble)
  // const baebeLogo = [
  //   " ______   ______   ______   ______   ______ ",
  //   "|   __ \\ |   __ \\ |   ___| |   __ \\ |   ___|",
  //   "|   __ < |   __ < |   ___| |   __ < |   ___|",
  //   "|______/ |______/ |______| |______/ |______|"
  // ];

  // OPTION 7: Thin (Elegant)
  // const baebeLogo = [
  //   " ___   _   ___ ___ ___ ",
  //   "| _ ) /_\\ | __| _ ) __|",
  //   "| _ \\/ _ \\| _|| _ \\ _||",
  //   "|___/_/ \\_\\___|___/___|"
  // ];

  // OPTION 8: 3D Block (Heavy)
  // const baebeLogo = [
  //   "██████╗  █████╗ ███████╗██████╗ ███████╗",
  //   "██╔══██╗██╔══██╗██╔════╝██╔══██╗██╔════╝",
  //   "██████╔╝███████║█████╗  ██████╔╝█████╗  ",
  //   "██╔══██╗██╔══██║██╔══╝  ██╔══██╗██╔══╝  ",
  //   "██████╔╝██║  ██║███████╗██████╔╝███████╗",
  //   "╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝ ╚══════╝"
  // ];

  // OPTION 9: Digital (Matrix)
  // const baebeLogo = [
  //   " ::::::::  :::::::::      :::     :::::::::: :::::::::  :::::::::: ",
  //   " :+:    :+: :+:    :+:   :+: :+:   :+:        :+:    :+: :+:        ",
  //   " +:+    +:+ +:+    +:+  +:+   +:+  +:+        +:+    +:+ +:+        ",
  //   " +#++:++#+  +#++:++#+  +#++:++#++: +#++:++#   +#++:++#+  +#++:++#   ",
  //   " +#+    +#+ +#+    +#+ +#+     +#+ +#+        +#+    +#+ +#+        ",
  //   " #+#    #+# #+#    #+# #+#     #+# #+#        #+#    #+# #+#        ",
  //   " #########  #########  ###     ### ########## #########  ########## "
  // ];

  // OPTION 10: Gothic (Ancient)
  // const baebeLogo = [
  //   "  ____    _    _____ ____  _____ ",
  //   " | __ )  / \\  | ____| __ )| ____|",
  //   " |  _ \\ / _ \\ |  _| |  _ \\|  _|  ",
  //   " | |_) / ___ \\| |___| |_) | |___ ",
  //   " |____/_/   \\_\\_____|____/|_____|"
  // ];


  // Intro Sequence: Type out "$ baebe --init"
  useEffect(() => {
    const typeIntro = async () => {
      // Wait a moment before starting
      await new Promise(r => setTimeout(r, 1000));

      const cmd = "$ baebe --init";
      // Start with prompt
      setLines([{ text: "$ " }]);

      // Type out the command
      for (let i = 2; i < cmd.length; i++) {
        await new Promise(r => setTimeout(r, 100)); // Typing speed
        setLines([{ text: cmd.slice(0, i + 1) }]);
      }

      setIntroDone(true);
    };

    typeIntro();
  }, []);

  // Handle initial start
  useEffect(() => {
    const handleStart = () => {
      if (hasStarted || !introDone) return;
      audioEffects.initialize();
      audioEffects.startAmbience();
      setHasStarted(true);
    };

    window.addEventListener('keydown', handleStart);
    window.addEventListener('click', handleStart);
    return () => {
      window.removeEventListener('keydown', handleStart);
      window.removeEventListener('click', handleStart);
    };
  }, [hasStarted, introDone]);

  // Main Boot Sequence
  useEffect(() => {
    if (!hasStarted || phase !== 'BOOT') return;

    let currentIndex = 0;
    let mounted = true;

    const playNext = async () => {
      if (!mounted) return;

      // End of text sequence -> Transition to TITLE (Skip STATIC)
      if (currentIndex >= sequence.length) {
        setTimeout(() => setPhase('TITLE'), 1000);
        return;
      }

      const step = sequence[currentIndex];

      // Sound Logic
      if ((step.className?.includes('text-white') || step.className?.includes('text-gray-300')) && !step.className?.includes('animate-pulse')) {
        setGlitch(true);
        audioEffects.playGlitch();
        setTimeout(() => setGlitch(false), 300);
      } else {
        // Play a burst of crackles/clicks per line
        let clickCount = 0;
        const maxClicks = Math.min(8, Math.floor(step.text.length / 2));
        const clickInterval = setInterval(() => {
          if (clickCount >= maxClicks) clearInterval(clickInterval);
          audioEffects.playClick();
          clickCount++;
        }, 20 + Math.random() * 30);
      }

      if (step.text.includes('0x')) {
        audioEffects.playDataStream();
      }

      setLines(prev => [...prev, { text: step.text, className: step.className }]);
      currentIndex++;
      setTimeout(playNext, step.delay);
    };

    setTimeout(playNext, 500);
    return () => { mounted = false; };
  }, [hasStarted, phase]);

  // Phase Transitions
  useEffect(() => {
    if (phase === 'TITLE') {
      audioEffects.playHum(2);
      // Scan on subtitle after 1.5s
      setTimeout(() => {
        setShowSubtitle(true);
        audioEffects.playDataStream();
      }, 1500);

      // Complete after 5s
      setTimeout(() => {
        audioEffects.playCrack();
        onComplete();
      }, 5000);
    }
  }, [phase, onComplete]);

  // Auto-scroll for boot phase
  useEffect(() => {
    if (phase === 'BOOT' && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, phase]);

  // Render based on Phase
  if (phase === 'BOOT') {
    return (
      <div ref={scrollRef} className={`h-screen w-full bg-black text-white font-mono p-4 md:p-8 flex flex-col justify-start overflow-y-auto scrollbar-none ${glitch ? 'animate-glitch' : ''}`}>
        {lines.map((line, i) => (
          <div key={i} className={`${line.className || ''} mb-2 break-all`}>
            {line.text}
            {/* Cursor follows typing during intro */}
            {i === lines.length - 1 && !introDone && (
              <span className="w-2 h-4 bg-white cursor-blink inline-block ml-1 align-middle"></span>
            )}
          </div>
        ))}

        {!hasStarted && introDone && (
          <div className="mb-2 animate-pulse text-gray-400">
            {"> Welcome - Press any key to continue..."}
            <span className="w-2 h-4 bg-white cursor-blink inline-block ml-1 align-middle"></span>
          </div>
        )}

        {/* Cursor at bottom during main sequence */}
        {hasStarted && (
          <div className="w-2 h-4 bg-white cursor-blink inline-block mt-2"></div>
        )}
      </div>
    );
  }

  if (phase === 'TITLE') {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

        {/* Container for Logo + Subtitle - Scans on together */}
        <div className="z-10 flex flex-col items-center w-full animate-scan-on-slow py-20">
          {/* BAEBE ASCII Logo */}
          <div
            className="text-white font-mono font-bold whitespace-pre text-center text-glow mb-8"
            style={{
              fontSize: 'min(2.5vw, 24px)',
              width: '61.8%',
              transform: 'scale(1.5)',
              lineHeight: '1.1'
            }}
          >
            {baebeLogo.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>

          {/* Soul Manifold Subtitle (Font) */}
          <div className="text-white font-bold tracking-[0.8em] text-xl md:text-3xl lg:text-4xl text-iridescent mt-8 md:mt-12 uppercase">
            Soul Manifold
          </div>
        </div>

        <style>{`
            .animate-scan-on-slow {
                animation: scan-on 4s cubic-bezier(0.1, 0.8, 0.2, 1) forwards;
            }
        `}</style>
      </div>
    );
  }

  return null;
};