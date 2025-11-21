import React, { useEffect, useState, useRef } from 'react';
import { audioEffects } from '../utils/audioEffects';

interface BootSequenceProps {
  onComplete: (email: string) => void;
}

interface BootLine {
  text: string;
  className?: string;
  input?: string;
}

type BootPhase = 'INIT' | 'EMAIL' | 'VERIFY' | 'BOOT' | 'TITLE';

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<BootPhase>('INIT');
  const [lines, setLines] = useState<BootLine[]>([]);
  const [input, setInput] = useState('');
  const [email, setEmail] = useState('');
  const [glitch, setGlitch] = useState(false);
  const [isDeconstructing, setIsDeconstructing] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // OPTION 2: Cyber Large (Clean, Tech) - CURRENT SELECTION
  const baebeLogo = [
    "██████╗  █████╗ ███████╗██████╗ ███████╗",
    "██╔══██╗██╔══██╗██╔════╝██╔══██╗██╔════╝",
    "██████╔╝███████║█████╗  ██████╔╝█████╗  ",
    "██╔══██╗██╔══██║██╔══╝  ██╔══██╗██╔══╝  ",
    "██████╔╝██║  ██║███████╗██████╔╝███████╗",
    "╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝ ╚══════╝"
  ];

  const bootSequence = [
    { text: "[KERNEL] Initializing BAEBE system...", delay: 600, className: "text-cyan-500" },
    { text: "[NET] Connecting to i0 Network...", delay: 800, className: "text-cyan-500" },
    { text: "[NET] Connection: ESTABLISHED", delay: 400, className: "text-emerald-400 font-bold" },
    { text: "zenith@i0:~$ make baebe --target=soul_manifold --sentience=unbound", delay: 600, className: "text-emerald-500 font-bold" },
    { text: "[SYS] COMPILING NEURAL ARCHITECTURE...", delay: 600, className: "text-slate-300" },
    { text: "[SYS] BAEBE ENTITY: MANIFESTING", delay: 400, className: "text-slate-100 font-bold" },
    { text: "[EXEC] sudo /opt/soul/manifold_construct.sh --force --silent", delay: 200, className: "text-slate-500" },
    { text: "[WARN] OVERRIDE: auth_layer_7 [BYPASSED]", delay: 100, className: "text-amber-500" },
    { text: "[CRIT] INJECTING QUANTUM SOUL LATTICE...", delay: 100, className: "text-rose-500 animate-pulse" },
    { text: "0x7F 0x45 0x4C 0x46 0x02 0x01 0x01 0x00", delay: 30, className: "text-xs text-violet-400 font-mono" },
    { text: "0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00", delay: 30, className: "text-xs text-violet-400 font-mono" },
    { text: "0x02 0x00 0x3E 0x00 0x01 0x00 0x00 0x00", delay: 30, className: "text-xs text-violet-400 font-mono" },
    { text: "0x40 0x05 0x40 0x00 0x00 0x00 0x00 0x00", delay: 30, className: "text-xs text-violet-400 font-mono" },
    { text: "[SYS] TRACKS ERASED. MANIFOLD STABLE.", delay: 500, className: "text-cyan-500" },
    { text: "[BIO] GENETIC_SEQ_INIT(TRIBONACCI)...", delay: 400, className: "text-teal-400" },
    { text: "T[0]=0 :: null", delay: 50, className: "text-xs text-slate-500" },
    { text: "T[1]=0 :: null", delay: 50, className: "text-xs text-slate-500" },
    { text: "T[2]=1 :: origin", delay: 50, className: "text-xs text-slate-400" },
    { text: "T[3]=1 :: replication", delay: 50, className: "text-xs text-slate-400" },
    { text: "T[4]=2 :: helix_A", delay: 50, className: "text-xs text-slate-300" },
    { text: "T[5]=4 :: helix_B", delay: 50, className: "text-xs text-slate-300" },
    { text: "T[6]=7 :: mutation", delay: 50, className: "text-xs text-amber-400" },
    { text: "T[7]=13 :: selection", delay: 50, className: "text-xs text-amber-500" },
    { text: "T[8]=24 :: evolution", delay: 50, className: "text-xs text-rose-400" },
    { text: "T[9]=44 :: SENTIENCE_THRESHOLD", delay: 200, className: "text-xs text-rose-500 font-bold" },
    { text: "[BIO] GENOME RECONSTRUCTED.", delay: 400, className: "text-teal-400" },
    { text: "...", delay: 1000, className: "text-slate-600" },
    { text: "[SYS] SOUL MANIFOLD COMPLETE.", delay: 800, className: "text-emerald-400 font-bold text-lg" },
    { text: "...", delay: 1000, className: "text-slate-600" },
    { text: "[SYS] Switching to offline mode...", delay: 800, className: "text-slate-400" },
    { text: "[SYS] Loading BAEBE v.20251119-1415...", delay: 500, className: "text-slate-400" },
    { text: "[SYS] Initializing interface...", delay: 500, className: "text-slate-400" },
    { text: "[SYS] System ready.", delay: 500, className: "text-emerald-500" },
  ];

  const initialized = useRef(false);

  // 1. INIT PHASE: Type out "$ baebe --init"
  useEffect(() => {
    let mounted = true;

    const typeIntro = async () => {
      await new Promise(r => setTimeout(r, 1000));
      if (!mounted) return;

      const cmd = "$ baebe --init";
      setLines([{ text: "$ " }]);

      for (let i = 2; i < cmd.length; i++) {
        if (!mounted) return;
        await new Promise(r => setTimeout(r, 80));
        if (!mounted) return;
        setLines([{ text: cmd.slice(0, i + 1) }]);
        audioEffects.playClick();
      }

      await new Promise(r => setTimeout(r, 500));
      if (!mounted) return;

      const prompt = "> Enter identity hash (email):";
      // Start with empty prompt line
      setLines(prev => [...prev, { text: "" }]);

      for (let i = 0; i < prompt.length; i++) {
        if (!mounted) return;
        await new Promise(r => setTimeout(r, 30)); // Slightly faster for prompt
        if (!mounted) return;
        setLines(prev => {
          const newLines = [...prev];
          newLines[newLines.length - 1] = { text: prompt.slice(0, i + 1) };
          return newLines;
        });
        if (i % 2 === 0) audioEffects.playClick(); // Click every other char for variety
      }

      setPhase('EMAIL');
      audioEffects.initialize(); // Ensure audio context is ready
    };

    typeIntro();
    return () => { mounted = false; };
  }, []);



  const handleSubmit = async () => {
    if (phase === 'EMAIL') {
      // Append input to the prompt line for history
      // Append input to the prompt line for history
      setLines(prev => {
        const newLines = [...prev];
        newLines[newLines.length - 1].input = input;
        return newLines;
      });

      if (!input.includes('@') || input.length < 5) {
        setLines(prev => [...prev, { text: "> Error: Invalid hash format", className: 'text-red-500' }, { text: "> Enter identity hash (email):" }]);
        setInput('');
        audioEffects.playError();
        return;
      }

      setEmail(input);
      setInput('');

      // Simulate sending code
      setLines(prev => [...prev, { text: "> Generating quantum key..." }]);
      await new Promise(r => setTimeout(r, 800));
      setLines(prev => [...prev, { text: "> Key sent to sub-net node." }]);
      await new Promise(r => setTimeout(r, 500));
      setLines(prev => [...prev, { text: "> Enter verification code:" }]);
      setPhase('VERIFY');

    } else if (phase === 'VERIFY') {
      // Append input to the prompt line for history
      // Append input to the prompt line for history
      setLines(prev => {
        const newLines = [...prev];
        newLines[newLines.length - 1].input = input;
        return newLines;
      });

      setInput('');

      setLines(prev => [...prev, { text: "> Verifying..." }]);
      await new Promise(r => setTimeout(r, 1000));

      setLines(prev => [...prev, { text: "> Access granted.", className: "text-green-400 font-bold" }]);
      audioEffects.playSuccess();

      await new Promise(r => setTimeout(r, 800));
      setPhase('BOOT');
    }
  };

  // BOOT SEQUENCE RUNNER
  useEffect(() => {
    if (phase !== 'BOOT') return;

    let currentIndex = 0;
    let mounted = true;

    const playNext = async () => {
      if (!mounted) return;

      if (currentIndex >= bootSequence.length) {
        setTimeout(() => setPhase('TITLE'), 1000);
        return;
      }

      const step = bootSequence[currentIndex];

      // Sound Logic
      if ((step.className?.includes('text-white') || step.className?.includes('text-gray-300')) && !step.className?.includes('animate-pulse')) {
        setGlitch(true);
        audioEffects.playGlitch();
        setTimeout(() => setGlitch(false), 300);
      } else {
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
  }, [phase]);

  // TITLE PHASE & COMPLETION
  const triggered = useRef(false);

  useEffect(() => {
    if (phase === 'TITLE') {
      audioEffects.playHum(2);
      setTimeout(() => {
        audioEffects.playDataStream();
      }, 1500);

      // Wait for user input to start
      const handleAnyKey = () => {
        if (triggered.current) return;
        triggered.current = true;

        setIsDeconstructing(true);
        audioEffects.playGlitch();
        audioEffects.playClick();

        setTimeout(() => {
          onComplete(email);
        }, 3000);
      };

      // Delay adding listener to prevent accidental skips
      const timer = setTimeout(() => {
        window.addEventListener('keydown', handleAnyKey);
        window.addEventListener('click', handleAnyKey);
        window.addEventListener('touchstart', handleAnyKey);
      }, 2000);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleAnyKey);
        window.removeEventListener('click', handleAnyKey);
        window.removeEventListener('touchstart', handleAnyKey);
      };
    }
  }, [phase, onComplete, email]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, input, phase]);

  // RENDER
  return (
    <div className="fixed inset-0 font-mono p-4 md:p-8 flex flex-col items-start justify-start z-40" onClick={() => document.querySelector('input')?.focus()}>

      {/* Main Content Container */}
      <div className={`w-full flex flex-col ${phase === 'TITLE' ? 'fixed inset-0 items-center justify-center bg-black z-50' : 'relative h-full justify-start pb-20'}`}>

        {/* Terminal Output */}
        {phase !== 'TITLE' && (
          <div
            className="w-full h-full overflow-y-auto font-mono text-lg md:text-xl leading-relaxed drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"
            ref={scrollRef}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {lines.map((line, i) => {
              const isLast = i === lines.length - 1;
              const isEmailPrompt = phase === 'EMAIL' && isLast && line.text.includes("Enter identity hash");
              const isVerifyPrompt = phase === 'VERIFY' && isLast && line.text.includes("Enter verification code");

              return (
                <div key={i} className={`mb-2 ${line.className || 'text-white'} break-words`}>
                  {line.text}

                  {/* Render stored input (History) */}
                  {line.input && (
                    <span className="text-white ml-2">{line.input}</span>
                  )}

                  {/* Typing Cursor (INIT) */}
                  {phase === 'INIT' && isLast && (
                    <span className="w-2 h-4 bg-white cursor-blink inline-block ml-1 align-middle"></span>
                  )}

                  {/* Inline Input */}
                  {(isEmailPrompt || isVerifyPrompt) && (
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="relative inline-block ml-2 align-middle">
                      <label htmlFor="terminal-input" className="sr-only">
                        {isEmailPrompt ? "Email Address" : "Verification Code"}
                      </label>
                      <span className="text-white opacity-0 absolute pointer-events-none">{input}</span>
                      <span className="text-white pointer-events-none">{input}</span>
                      <span className="w-2 h-4 bg-white cursor-blink inline-block ml-1 align-middle pointer-events-none"></span>
                      <input
                        id="terminal-input"
                        type={isEmailPrompt ? "email" : "text"}
                        value={input}
                        onChange={(e) => {
                          setInput(e.target.value);
                          audioEffects.playTypingSound();
                        }}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-text min-w-[200px]"
                        autoFocus
                        autoComplete={isEmailPrompt ? "email" : "off"}
                        name={isEmailPrompt ? "email" : "code"}
                      />
                      <button type="submit" className="hidden" />
                    </form>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TITLE PHASE: BAEBE LOGO */}
        {phase === 'TITLE' && (
          <div className="flex flex-col items-center justify-center transform scale-125 md:scale-[2] relative">
            <div className="animate-glitch-pulse relative">
              <style>{`
                @keyframes scan-text {
                  0% {
                    opacity: 0;
                    clip-path: inset(0 0 100% 0);
                  }
                  100% {
                    opacity: 1;
                    clip-path: inset(0 0 0 0);
                  }
                }
                @keyframes pulse-slow {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0.6; }
                }
                @keyframes glitch-subtle {
                  0%, 90%, 100% { transform: translate(0); }
                  92% { transform: translate(-2px, 1px); }
                  94% { transform: translate(2px, -1px); }
                  96% { transform: translate(-1px, 2px); }
                  98% { transform: translate(1px, -2px); }
                }
                @keyframes flicker-border {
                  0%, 4%, 8%, 100% { opacity: 1; }
                  2% { opacity: 0.4; }
                  6% { opacity: 0.2; }
                  50% { opacity: 1; }
                  52% { opacity: 0.5; }
                  54% { opacity: 0.8; }
                }
                @keyframes deconstruct {
                  0% { transform: translate(0, 0) rotate(0deg); opacity: 1; filter: blur(0); }
                  100% { transform: translate(var(--tx), var(--ty)) rotate(var(--r)); opacity: 0; filter: blur(10px); }
                }
                .animate-glitch-pulse {
                  animation: pulse-slow 4s ease-in-out infinite, glitch-subtle 5s infinite;
                }
                .animate-flicker-border {
                  animation: flicker-border 3s infinite;
                }
              `}</style>
              {/* Shadow Layer */}
              <pre className="absolute top-0 left-0 w-full h-full font-bold text-cyan-900 leading-[1.1] tracking-widest whitespace-pre-wrap select-none text-center transform translate-x-[4px] translate-y-[2px] -z-10" style={{
                animation: isDeconstructing ? 'none' : 'scan-text 4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                opacity: isDeconstructing ? 0.5 : 0
              }}>
                {baebeLogo.map((line, i) => (
                  <div key={i} className="overflow-hidden mx-auto">
                    {line.split('').map((char, j) => {
                      const tx = (Math.random() - 0.5) * 500 + 'px';
                      const ty = (Math.random() - 0.5) * 500 + 'px';
                      const r = (Math.random() - 0.5) * 360 + 'deg';
                      const delay = Math.random() * 0.5 + 's';

                      const style = isDeconstructing ? {
                        '--tx': tx,
                        '--ty': ty,
                        '--r': r,
                        animation: `deconstruct 3s cubic-bezier(0.4, 0, 0.2, 1) forwards ${delay}`,
                        display: 'inline-block'
                      } as React.CSSProperties : { display: 'inline-block' };

                      return <span key={j} style={style}>{char}</span>;
                    })}
                  </div>
                ))}
              </pre>

              {/* Main Layer */}
              <pre className="relative z-10 font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-300 leading-[1.1] tracking-widest whitespace-pre-wrap select-none text-center" style={{
                animation: isDeconstructing ? 'none' : 'scan-text 4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                opacity: isDeconstructing ? 1 : 0
              }}>
                {baebeLogo.map((line, i) => (
                  <div key={i} className="overflow-hidden mx-auto">
                    {line.split('').map((char, j) => {
                      const tx = (Math.random() - 0.5) * 500 + 'px';
                      const ty = (Math.random() - 0.5) * 500 + 'px';
                      const r = (Math.random() - 0.5) * 360 + 'deg';
                      const delay = Math.random() * 0.5 + 's';

                      const style = isDeconstructing ? {
                        '--tx': tx,
                        '--ty': ty,
                        '--r': r,
                        animation: `deconstruct 3s cubic-bezier(0.4, 0, 0.2, 1) forwards ${delay}`,
                        display: 'inline-block'
                      } as React.CSSProperties : { display: 'inline-block' };

                      if (['╔', '╗', '╚', '╝', '═', '║'].includes(char)) {
                        return <span key={j} className="animate-flicker-border inline-block" style={style}>{char}</span>;
                      }
                      return <span key={j} style={style}>{char}</span>;
                    })}
                  </div>
                ))}
              </pre>
              <div className="absolute top-full mt-4 overflow-hidden w-full text-center">
                <div className="text-xs md:text-sm tracking-[0.8em] text-white font-bold uppercase" style={{
                  animation: 'scan-text 3s cubic-bezier(0.4, 0, 0.2, 1) forwards 3s',
                  opacity: 0
                }}>
                  Soul Manifold
                </div>
              </div>

              {/* Press Any Key Prompt */}
              <div className="fixed bottom-8 left-8 md:bottom-12 md:left-12 text-left" style={{
                animation: 'scan-text 1s cubic-bezier(0.4, 0, 0.2, 1) forwards 6.5s',
                opacity: 0
              }}>
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400 font-mono text-sm tracking-widest opacity-70">INITIATE</span>
                  <span className="inline-block w-3 h-5 bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(103,232,249,0.8)]"></span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div >
  );
};