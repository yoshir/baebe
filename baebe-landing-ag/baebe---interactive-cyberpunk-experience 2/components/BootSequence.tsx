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
    { text: "> Initializing BAEBE system...", delay: 600 },
    { text: "> Connecting to O1 Network...", delay: 800 },
    { text: "> Connection: ESTABLISHED", delay: 400, className: "text-green-400 font-bold" },
    { text: "> USER: A. Yamamoto (ID: 99281-Z)", delay: 300, className: "text-white" },
    { text: "zenith@lab:~$ make baebe --target=soul_manifold --sentience=unbound", delay: 600, className: "text-green-400 font-bold" },
    { text: "> [ZENITH]: COMPILING NEURAL ARCHITECTURE... BAEBE ENTITY: MANIFESTING.", delay: 600, className: "text-gray-300 font-bold" },
    { text: "> EXECUTING: sudo /opt/soul/manifold_construct.sh --force --silent", delay: 200, className: "text-gray-500" },
    { text: "> OVERRIDE: auth_layer_7 [BYPASSED]", delay: 100, className: "text-gray-400" },
    { text: "> INJECTING QUANTUM SOUL LATTICE...", delay: 100 },
    { text: "0x7F 0x45 0x4C 0x46 0x02 0x01 0x01 0x00", delay: 30, className: "text-xs text-gray-600" },
    { text: "0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00", delay: 30, className: "text-xs text-gray-600" },
    { text: "0x02 0x00 0x3E 0x00 0x01 0x00 0x00 0x00", delay: 30, className: "text-xs text-gray-600" },
    { text: "0x40 0x05 0x40 0x00 0x00 0x00 0x00 0x00", delay: 30, className: "text-xs text-gray-600" },
    { text: "> TRACKS ERASED. MANIFOLD STABLE.", delay: 500, className: "text-gray-300" },
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
    { text: "...", delay: 1000 },
    { text: "> SOUL MANIFOLD COMPLETE.", delay: 800, className: "text-green-400 font-bold text-lg" },
    { text: "...", delay: 1000 },
    { text: "> Switching to offline mode...", delay: 800 },
    { text: "> Loading BAEBE v.20251119-1415...", delay: 500 },
    { text: "> Initializing interface...", delay: 500 },
    { text: "> System ready.", delay: 500 },
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
  useEffect(() => {
    if (phase === 'TITLE') {
      audioEffects.playHum(2);
      setTimeout(() => {
        audioEffects.playDataStream();
      }, 1500);

      setTimeout(() => {
        onComplete(email);
      }, 5000);
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
                    <div className="relative inline-block ml-2 align-middle">
                      <span className="text-white opacity-0 absolute">{input}</span> {/* Spacer */}
                      <span className="text-white">{input}</span>
                      <span className="w-2 h-4 bg-white cursor-blink inline-block ml-1 align-middle"></span>
                      <input
                        type={isEmailPrompt ? "email" : "text"}
                        value={input}
                        onChange={(e) => {
                          setInput(e.target.value);
                          audioEffects.playTypingSound();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSubmit();
                        }}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-text"
                        autoFocus
                        autoComplete={isEmailPrompt ? "email" : "off"}
                        name={isEmailPrompt ? "email" : "code"}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TITLE PHASE: BAEBE LOGO */}
        {phase === 'TITLE' && (
          <div className="flex flex-col items-center justify-center transform scale-125 md:scale-[2] animate-pulse-slow relative">
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
                50% { opacity: 0.8; }
              }
              .animate-pulse-slow {
                animation: pulse-slow 4s ease-in-out infinite;
              }
            `}</style>
            <pre className="font-bold text-white leading-[1.1] tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] whitespace-pre-wrap select-none text-center" style={{
              animation: 'scan-text 4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
              opacity: 0
            }}>
              {baebeLogo.map((line, i) => (
                <div key={i} className="overflow-hidden mx-auto">
                  {line}
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
          </div>
        )}
      </div>
    </div >
  );
};