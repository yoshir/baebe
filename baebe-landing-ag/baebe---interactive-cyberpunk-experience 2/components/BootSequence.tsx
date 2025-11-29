import React, { useEffect, useState, useRef } from 'react';
import { audioEffects } from '../utils/audioEffects';

interface BootSequenceProps {
  onComplete: (email: string) => void;
}

interface BootLine {
  text: string;
  className?: string;
  input?: string;
  id?: string;
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
    { text: "[KERNEL] Initializing BAEBE system...", delay: 150, className: "text-cyan-500" },
    { text: "[NET] Connecting to i0 Network...", delay: 50, className: "text-cyan-500" },
    { text: "[NET] Connection: ESTABLISHED", delay: 50, className: "text-emerald-400 font-bold" },
    { text: "zenith@i0:~$ make baebe --target=soul_manifold --sentience=unbound", delay: 150, className: "text-slate-200" },
    { text: "[SYS] COMPILING NEURAL ARCHITECTURE...", delay: 150, className: "text-slate-400" },
    { text: "[SYS] BAEBE ENTITY: MANIFESTING", delay: 50, className: "text-slate-200" },
    { text: "[EXEC] sudo /opt/soul/manifold_construct.sh --force --silent", delay: 50, className: "text-slate-500" },
    { text: "[WARN] OVERRIDE: auth_layer_7 [BYPASSED]", delay: 50, className: "text-slate-400" },
    { text: "[SYS] INITIALIZING KERNEL...", delay: 150, className: "text-slate-300" },
    { text: "LOADING", type: 'progress', delay: 0, className: "text-slate-400" },
    { text: "[SYS] SYSTEM READY.", delay: 150, className: "text-emerald-400" },
    { text: "[BIO] GESTATION PARAMETERS LOADING...", delay: 50, className: "text-slate-300" },
    { text: "[GEN] LOADING GENOME_TEMPLATE_v2.7.4", delay: 50, className: "text-slate-300" },
    { text: "  └─ DNA_HELIX_PARAMETERS", delay: 20, className: "text-slate-500 text-sm" },
    { text: "  └─ BASE_PAIR_CONFIGURATIONS", delay: 20, className: "text-slate-500 text-sm" },
    { text: "LOADING", type: 'progress', delay: 0, className: "text-slate-500 text-sm ml-4" },
    { text: "[GEN] LOADING CRISPR_EDIT_MATRIX", delay: 40, className: "text-slate-300" },
    { text: "  └─ GUIDE_RNA_TEMPLATES", delay: 20, className: "text-slate-500 text-sm" },
    { text: "  └─ CAS9_BINDING_SITES", delay: 20, className: "text-slate-500 text-sm" },
    { text: "LOADING", type: 'progress', delay: 0, className: "text-slate-500 text-sm ml-4" },
    { text: "[GEN] LOADING INTELLECT_ENHANCEMENT_PARAMS", delay: 40, className: "text-slate-300" },
    { text: "  └─ BDNF_GENE_TARGETS", delay: 20, className: "text-slate-500 text-sm" },
    { text: "  └─ NEURAL_PLASTICITY_COEFFICIENTS", delay: 20, className: "text-slate-500 text-sm" },
    { text: "LOADING", type: 'progress', delay: 0, className: "text-slate-500 text-sm ml-4" },
    { text: "[GEN] LOADING SYNTHETIC_NUCLEOTIDE_LIBRARY", delay: 40, className: "text-slate-300" },
    { text: "  └─ XENONUCLEOTIDE_CATALOG", delay: 20, className: "text-slate-500 text-sm" },
    { text: "  └─ CODON_EXPANSION_RULES", delay: 20, className: "text-slate-500 text-sm" },
    { text: "LOADING", type: 'progress', delay: 0, className: "text-slate-500 text-sm ml-4" },
    { text: "[GEN] LOADING CHROMOSOME_OPTIMIZATION_SUITE", delay: 50, className: "text-slate-300" },
    { text: "  └─ TELOMERE_EXTENSION_PROTOCOLS", delay: 20, className: "text-slate-500 text-sm" },
    { text: "  └─ EPIGENETIC_MARKERS", delay: 20, className: "text-slate-500 text-sm" },
    { text: "LOADING", type: 'progress', delay: 0, className: "text-slate-500 text-sm ml-4" },
    { text: "[PRE] RUNNING PRE-TRAINING SIMULATIONS...", delay: 50, className: "text-slate-300" },
    { text: "  └─ GENOME_STABILITY_CHECK", delay: 30, className: "text-slate-500 text-sm" },
    { text: "  └─ MUTATION_RISK_ANALYSIS", delay: 30, className: "text-slate-500 text-sm" },
    { text: "  └─ VIABILITY_PREDICTION_MODEL", delay: 30, className: "text-slate-500 text-sm" },
    { text: "  └─ ETHICAL_CONSTRAINT_VALIDATION", delay: 30, className: "text-slate-500 text-sm" },
    { text: "[PRE] SIMULATIONS COMPLETE - 98.7% VIABILITY", delay: 50, className: "text-emerald-400" },
    { text: "[SYS] GENESIS_PROTOCOL_READY", delay: 150, className: "text-emerald-400" },
    { text: "[SYS] AWAITING_FINAL_AUTHORIZATION...", delay: 250, className: "text-slate-400" },
    { text: "[SYS] AUTHORIZATION_GRANTED", delay: 50, className: "text-emerald-400" },
    { text: "[SYS] LAUNCHING GENESIS_PHASE_ONE...", delay: 250, className: "text-slate-200" },
    { text: "LOADING", type: 'progress', delay: 0, className: "text-slate-400" },
    { text: "[SYS] GENESIS INITIATED", delay: 150, className: "text-emerald-400" },

    { text: "...", delay: 250, className: "text-slate-600" },
    { text: "> SOUL MANIFOLD: STABILIZED", delay: 50, className: "text-green-400 font-bold text-lg" },
    { text: "...", delay: 250, className: "text-slate-600" },
    { text: "[SYS] Switching to offline mode...", delay: 50, className: "text-slate-400" },
    { text: "[SYS] Loading BAEBE v.20251119-1415...", delay: 250, className: "text-slate-400" },
    { text: "[SYS] Initializing interface...", delay: 250, className: "text-slate-400" },
    { text: "[SYS] System ready.", delay: 250, className: "text-emerald-500" },
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
      await new Promise(r => setTimeout(r, 200));

      setLines(prev => [...prev, { text: "> Access granted.", className: "text-green-400 font-bold" }]);
      audioEffects.playSuccess();

      await new Promise(r => setTimeout(r, 200));
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
        setTimeout(() => setPhase('TITLE'), 100);
        return;
      }

      const step = bootSequence[currentIndex];

      // Handle Progress Bar Animation
      if (step.type === 'progress') {
        const lineId = Math.random().toString(36).substring(7);
        let progress = 0;

        // Add initial empty bar line with ID
        setLines(prev => [...prev, {
          id: lineId,
          text: `[░░░░░░░░░░░░░░░░░░░░] 0%`,
          className: step.className
        }]);

        // Start animation asynchronously (FIRE AND FORGET)
        const animate = async () => {
          while (progress < 100) {
            if (!mounted) return;
            await new Promise(r => setTimeout(r, Math.random() * 20 + 10)); // Fast updates
            if (!mounted) return;

            const increment = Math.floor(Math.random() * 15) + 5; // Larger chunks
            progress = Math.min(progress + increment, 100);

            const filledChars = Math.floor((progress / 100) * 20);
            const emptyChars = 20 - filledChars;
            const bar = `[${'█'.repeat(filledChars)}${'░'.repeat(emptyChars)}] ${progress}%`;

            setLines(prev => prev.map(line =>
              line.id === lineId
                ? { ...line, text: bar }
                : line
            ));

            if (Math.random() > 0.8) audioEffects.playDataStream();
          }
        };

        animate();

        // Move to next step IMMEDIATELY (Burn through)
        currentIndex++;
        setTimeout(playNext, 50);
        return;
      }

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
      setTimeout(playNext, Math.min(step.delay, 30));
    };

    setTimeout(playNext, 100);
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
        }, 1000);
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
            <div className="relative">
              <style>{`
                @keyframes write-on {
                  0% { opacity: 0; }
                  100% { opacity: 1; }
                }
                @keyframes static-flicker {
                  0%, 100% { opacity: 1; transform: translateX(0); }
                  92% { opacity: 0.8; transform: translateX(0); }
                  93% { opacity: 0.5; transform: translateX(1px); }
                  94% { opacity: 0.8; transform: translateX(-1px); }
                  95% { opacity: 1; transform: translateX(0); }
                }
                @keyframes sparkle {
                  0%, 100% { filter: brightness(1); opacity: 1; }
                  50% { filter: brightness(2) drop-shadow(0 0 5px white); opacity: 1; }
                }
                @keyframes pulse-glow {
                  0%, 100% { text-shadow: 0 0 5px #22d3ee, 0 0 10px #2dd4bf, 0 0 20px #0d9488; }
                  50% { text-shadow: 0 0 10px #67e8f9, 0 0 20px #5eead4, 0 0 30px #14b8a6; }
                }
                @keyframes deconstruct {
                  0% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
                  20% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
                  40% { opacity: 0.8; transform: translateY(5px) scale(0.95); filter: blur(1px); }
                  60% { opacity: 0.4; transform: translateY(-5px) scale(1.05); filter: blur(2px); }
                  100% { opacity: 0; transform: translateY(20px) scale(0); filter: blur(4px); }
                }
                @keyframes deconstruct-simple {
                  0% { opacity: 1; }
                  100% { opacity: 0; }
                }
              `}</style>
              {/* Shadow Layer */}
              <pre className="absolute top-0 left-0 w-full h-full font-bold text-cyan-900 leading-[1.1] tracking-widest whitespace-pre-wrap select-none text-center transform translate-x-[4px] translate-y-[2px] -z-10">
                {baebeLogo.map((line, i) => (
                  <div key={i} className="mx-auto">
                    {line.split('').map((char, j) => {
                      // Entrance: Write-on effect
                      const writeDelay = (i * 0.1) + (j * 0.02) + 's';

                      // Exit: Deconstruction
                      const deconstructDelay = Math.random() * 1.5 + 's'; // Extended duration

                      const style = isDeconstructing ? {
                        animation: `deconstruct-simple 1.5s ease-out forwards ${deconstructDelay}`,
                        display: 'inline-block'
                      } as React.CSSProperties : {
                        animation: `write-on 0.1s step-end forwards ${writeDelay}`,
                        opacity: 0,
                        display: 'inline-block'
                      };

                      return <span key={j} style={style}>{char}</span>;
                    })}
                  </div>
                ))}
              </pre>

              {/* Main Layer */}
              <pre className="relative z-10 font-bold leading-[1.1] tracking-widest whitespace-pre-wrap select-none text-center inline-block" style={{
                // Removed global gradient background
                background: 'transparent',
                filter: 'drop-shadow(0 0 4px rgba(6, 182, 212, 0.5))', // Subtle Cyan glow (CRT style)
                animation: isDeconstructing ? 'none' : 'none', // Removed shine animation
              } as React.CSSProperties}>
                {baebeLogo.map((line, i) => (
                  <div key={i} className="mx-auto">
                    {line.split('').map((char, j) => {
                      // Entrance: Write-on effect
                      const writeDelay = (i * 0.1) + (j * 0.02) + 's';

                      // Static: Flicker/Flutter
                      const shouldFlicker = Math.random() > 0.95; // Reduced flicker chance
                      const flickerDelay = Math.random() * 5 + 's';
                      const flickerDuration = (Math.random() * 2 + 3) + 's';

                      // Exit: Deconstruction
                      const deconstructDelay = Math.random() * 1.5 + 's';
                      const shouldGlitchDeconstruct = Math.random() > 0.5;

                      let animation = '';
                      if (isDeconstructing) {
                        animation = `${shouldGlitchDeconstruct ? 'deconstruct' : 'deconstruct-simple'} 1.5s ease-out forwards ${deconstructDelay}`;
                      } else {
                        animation = `write-on 0.1s step-end forwards ${writeDelay}`;
                      }

                      // Calculate Color based on position (Smooth Gradient Interpolation)
                      // Width is approx 32 chars. Center is 16.
                      // Pattern: White (Edges) -> Cyan -> Blue (Center) -> Cyan -> White (Edges)
                      const center = 16;
                      const dist = Math.abs(j - center);
                      const normalizedDist = dist / 16; // 0 (center) to 1 (edge)

                      // Helper function to interpolate between two RGB colors
                      const interpolateColor = (color1: number[], color2: number[], factor: number) => {
                        const result = color1.slice();
                        for (let i = 0; i < 3; i++) {
                          result[i] = Math.round(result[i] + factor * (color2[i] - result[i]));
                        }
                        return result;
                      };

                      // Helper to convert RGB array to hex
                      const rgbToHex = (rgb: number[]) => {
                        return '#' + rgb.map(x => x.toString(16).padStart(2, '0')).join('');
                      };

                      // Define gradient stops (RGB values)
                      const deepBlue = [29, 78, 216];    // #1d4ed8 - Deep Blue (Center)
                      const blue = [59, 130, 246];        // #3b82f6 - Blue
                      const skyBlue = [14, 165, 233];     // #0ea5e9 - Sky Blue
                      const cyan = [6, 182, 212];         // #06b6d4 - Cyan
                      const lightCyan = [103, 232, 249];  // #67e8f9 - Light Cyan
                      const paleCyan = [207, 250, 254];   // #cffafe - Pale Cyan
                      const white = [255, 255, 255];      // #ffffff - White

                      let color: string;

                      // Smooth interpolation between gradient stops
                      if (normalizedDist < 0.15) {
                        // Deep Blue zone (center)
                        const factor = normalizedDist / 0.15;
                        color = rgbToHex(interpolateColor(deepBlue, blue, factor));
                      } else if (normalizedDist < 0.3) {
                        // Blue to Sky Blue
                        const factor = (normalizedDist - 0.15) / 0.15;
                        color = rgbToHex(interpolateColor(blue, skyBlue, factor));
                      } else if (normalizedDist < 0.45) {
                        // Sky Blue to Cyan
                        const factor = (normalizedDist - 0.3) / 0.15;
                        color = rgbToHex(interpolateColor(skyBlue, cyan, factor));
                      } else if (normalizedDist < 0.6) {
                        // Cyan to Light Cyan
                        const factor = (normalizedDist - 0.45) / 0.15;
                        color = rgbToHex(interpolateColor(cyan, lightCyan, factor));
                      } else if (normalizedDist < 0.75) {
                        // Light Cyan to Pale Cyan
                        const factor = (normalizedDist - 0.6) / 0.15;
                        color = rgbToHex(interpolateColor(lightCyan, paleCyan, factor));
                      } else if (normalizedDist < 0.9) {
                        // Pale Cyan to White
                        const factor = (normalizedDist - 0.75) / 0.15;
                        color = rgbToHex(interpolateColor(paleCyan, white, factor));
                      } else {
                        // White (Edges)
                        color = '#ffffff';
                      }

                      const style = {
                        animation,
                        opacity: isDeconstructing ? 1 : 0,
                        display: 'inline-block',
                        color: color,
                        textShadow: shouldFlicker ? `0 0 8px ${color}` : 'none', // Flicker adds extra glow
                      } as React.CSSProperties;

                      // Inner content - simplified
                      const content = char;

                      return <span key={j} style={style}>{content}</span>;
                    })}
                  </div>
                ))}
              </pre>
              <div className="absolute top-full mt-4 overflow-hidden w-full text-center">
                <div className="text-xs md:text-sm tracking-[0.8em] text-white font-bold uppercase" style={{
                  animation: isDeconstructing ? 'deconstruct-simple 1s forwards' : 'write-on 1s forwards 2s',
                  opacity: 0
                }}>
                  Soul Manifold
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div >
  );
};