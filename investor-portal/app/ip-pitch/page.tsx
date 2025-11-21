'use client'

import Link from 'next/link'
import TerminalWindow from '@/components/TerminalWindow'
import TypingAnimation from '@/components/TypingAnimation'

const pseudoCode = [
  { text: '$ cat baebe.ip', delay: 500, type: 'command' as const },
  { text: '', delay: 300, type: 'newline' as const },
  { text: '', delay: 500, type: 'newline' as const },
  { text: '// BAEBE - A Sci-Fi Thriller', delay: 100, type: 'comment' as const },
  { text: '', delay: 500, type: 'newline' as const },
  { text: '', delay: 500, type: 'newline' as const },
  { text: 'class Story {', delay: 100, type: 'text' as const },
  { text: '  constructor() {', delay: 100, type: 'text' as const },
  { text: '    this.format = "multi-platform";', delay: 100, type: 'text' as const },
  { text: '    this.narrative = "unified";', delay: 100, type: 'text' as const },
  { text: '    this.medium = ["novel", "screenplay", "game"];', delay: 100, type: 'text' as const },
  { text: '  }', delay: 100, type: 'text' as const },
  { text: '', delay: 800, type: 'newline' as const },
  { text: '  generate() {', delay: 100, type: 'text' as const },
  { text: '    return {', delay: 100, type: 'text' as const },
  { text: '      world: "post-human",', delay: 100, type: 'text' as const },
  { text: '      protagonist: "Baebe",', delay: 100, type: 'text' as const },
  { text: '      theme: "consciousness",', delay: 100, type: 'text' as const },
  { text: '      conflict: "network vs. humanity"', delay: 100, type: 'text' as const },
  { text: '    };', delay: 100, type: 'text' as const },
  { text: '  }', delay: 100, type: 'text' as const },
  { text: '}', delay: 100, type: 'text' as const },
  { text: '', delay: 1500, type: 'newline' as const },
  { text: '', delay: 500, type: 'newline' as const },
  { text: '// First IP in Development', delay: 100, type: 'comment' as const },
  { text: '', delay: 500, type: 'newline' as const },
  { text: 'const baebe = new Story();', delay: 100, type: 'text' as const },
  { text: 'baebe.generate();', delay: 100, type: 'text' as const },
  { text: '', delay: 1000, type: 'newline' as const },
  { text: '', delay: 500, type: 'newline' as const },
  { text: '// Status: IN PRODUCTION', delay: 100, type: 'comment' as const },
  { text: '', delay: 500, type: 'newline' as const },
  { text: '// Format: Novel → Screenplay → Game', delay: 100, type: 'comment' as const },
  { text: '', delay: 500, type: 'newline' as const },
  { text: '// Execution Speed: UNPRECEDENTED', delay: 100, type: 'comment' as const },
  { text: '', delay: 2000, type: 'newline' as const },
  { text: '', delay: 500, type: 'newline' as const },
  { text: '// This is not theoretical.', delay: 100, type: 'comment' as const },
  { text: '', delay: 500, type: 'newline' as const },
  { text: '// This is proof of execution.', delay: 100, type: 'comment' as const },
  { text: '', delay: 2000, type: 'newline' as const },
  { text: '', delay: 500, type: 'newline' as const },
  { text: '$ view_preview --access investor', delay: 500, type: 'command' as const },
  { text: '', delay: 300, type: 'newline' as const },
  { text: '// Access granted. Review available upon NDA acceptance.', delay: 100, type: 'comment' as const },
  { text: '', delay: 500, type: 'newline' as const },
]

export default function IPPitchPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* More prominent video background for IP pitch */}
      <div className="fixed inset-0 z-0 opacity-40 grayscale brightness-40">
        <div className="w-full h-full bg-gradient-to-br from-black via-hacker-gray to-black"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-4xl">
        <TerminalWindow title="baebe.ip">
          <div className="space-y-4">
            <TypingAnimation content={pseudoCode} />
            
            <div className="mt-8 pt-6 border-t border-hacker-green/30">
              <Link 
                href="/" 
                className="text-hacker-green/70 hover:text-hacker-green transition-colors font-mono text-sm"
              >
                ← Back to Investor Portal
              </Link>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </div>
  )
}









