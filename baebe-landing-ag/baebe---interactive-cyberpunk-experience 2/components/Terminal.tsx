import React, { useState, useEffect, useRef } from 'react';
import { UserProgress, TerminalLine } from '../types';
import { audioEffects } from '../utils/audioEffects';

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

    audioEffects.playClick();
    const cmd = input;
    setInput('');
    await onCommand(cmd);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    // Occasional typing sound (not every keystroke to keep it subtle)
    if (Math.random() > 0.7) {
      audioEffects.playTypingSound();
    }
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
        {lines.map((line) => (
          <div key={line.id} className={`${line.type === 'error' ? 'text-white font-bold bg-red-900/20' : line.type === 'input' ? 'text-gray-400 opacity-80 mt-2' : line.type === 'story' ? 'text-gray-300 leading-loose py-2 max-w-3xl' : 'text-white'}`}>
            {line.type === 'input' && <span className="mr-2">$</span>}
            <span className="whitespace-pre-wrap break-words">
              {line.type === 'input' || line.type === 'story' ? line.text : renderText(line.text)}
            </span>
          </div>
        ))}
        {isTyping && <div className="animate-pulse text-white">...</div>}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-800 pt-2 bg-black z-10">
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-white mr-2 font-bold">{user.resonanceLevel >= 3 ? 'res-' + user.resonanceLevel + '$' : '$'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
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