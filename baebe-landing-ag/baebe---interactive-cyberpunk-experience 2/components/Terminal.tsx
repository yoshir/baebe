import React, { useState, useEffect, useRef } from 'react';
import { UserProgress, TerminalLine } from '../types';

interface TerminalProps {
  user: UserProgress;
  onCommand: (cmd: string) => Promise<void>;
  lines: TerminalLine[];
  isTyping: boolean;
}

export const Terminal: React.FC<TerminalProps> = ({ user, onCommand, lines, isTyping }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const cmd = input;
    setInput('');
    await onCommand(cmd);
  };

  const handleTextClick = (text: string) => {
    // If user clicks on [Action], execute it
    const match = text.match(/^\[(.*?)\]$/);
    if (match) {
      onCommand(match[1]);
    }
  };

  // Helper to render text with clickable brackets
  const renderText = (text: string) => {
    // Split by bracketed groups like [Subscribe]
    const parts = text.split(/(\[.*?\])/g);
    return parts.map((part, i) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        return (
          <span
            key={i}
            onClick={() => handleTextClick(part)}
            className="cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  // Auto-focus input unless user selects text
  useEffect(() => {
    const handleFocus = () => {
      if (!window.getSelection()?.toString()) {
        inputRef.current?.focus();
      }
    }
    window.addEventListener('click', handleFocus);
    return () => window.removeEventListener('click', handleFocus);
  }, []);

  return (
    <div className="h-screen w-full bg-black text-white font-mono p-2 md:p-4 flex flex-col overflow-hidden text-sm md:text-base leading-relaxed">
      {/* Screen Content */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto mb-2 space-y-1 pb-4 pr-2 scrollbar-thin"
      >
        {lines.map((line) => {
          const getLineStyle = (type: string) => {
            switch (type) {
              case 'error': return 'text-rose-500 font-bold bg-rose-900/10 border-l-2 border-rose-500 pl-2';
              case 'input': return 'text-slate-200 mt-2';
              case 'story': return 'text-slate-100 leading-loose py-2 max-w-3xl border-l-2 border-slate-700 pl-4 my-2';
              case 'system': return 'text-cyan-500 font-bold mt-1';
              case 'warning': return 'text-amber-500';
              default: return 'text-emerald-400';
            }
          };

          return (
            <div key={line.id} className={`${getLineStyle(line.type)} break-words`}>
              {line.type === 'input' && <span className="mr-2 bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] font-bold">zenith@i0:~$</span>}
              <span className="whitespace-pre-wrap">
                {line.type === 'input' || line.type === 'story' ? line.text : renderText(line.text)}
              </span>
            </div>
          );
        })}
        {isTyping && <div className="animate-pulse text-white">...</div>}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-800 pt-2 bg-black z-10">
        <form onSubmit={handleSubmit} className="flex items-center">
          <div className="flex items-center">
            <span className="mr-2 bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] font-bold">zenith@i0:~$</span>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white caret-white"
            autoFocus
            disabled={isTyping}
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      </div>

      {/* Status Bar */}
      <div className="mt-2 flex justify-between text-xs text-gray-500 uppercase border-t border-gray-800 pt-1">
        <div>Resonance: {user.resonanceLevel}</div>
        <div>Shards: {user.shards}/50</div>
        <div>{user.subscription === 'NONE' ? 'OFFLINE' : 'CONNECTED'}</div>
      </div>


    </div>
  );
};