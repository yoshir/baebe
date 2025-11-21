'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import TerminalWindow from '@/components/TerminalWindow'
import TypingAnimation from '@/components/TypingAnimation'
import { teaserContent } from '@/lib/pitchContent'

const typingContent = [
  { text: '$ optimal_anarchy --init', delay: 500, type: 'command' as const },
  { text: '', delay: 300, type: 'newline' as const },
  { text: 'Initializing investor portal...', delay: 800, type: 'output' as const },
  { text: '', delay: 300, type: 'newline' as const },
]

export default function HomePage() {
  const [showForm, setShowForm] = useState(false)
  const [email, setEmail] = useState('')
  const [emailConfirmed, setEmailConfirmed] = useState(false)
  const router = useRouter()

  // Check if user already has email confirmed
  useEffect(() => {
    const storedEmail = localStorage.getItem('investorEmail')
    const confirmed = localStorage.getItem('emailConfirmed')
    if (storedEmail && confirmed === 'true') {
      router.push('/pitch')
    }
  }, [router])

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    // Store email
    localStorage.setItem('investorEmail', email)
    localStorage.setItem('emailConfirmed', 'true')
    
    // Redirect to full pitch
    router.push('/pitch')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Subtle video background */}
      <div className="fixed inset-0 z-0 opacity-20 grayscale brightness-30">
        <div className="w-full h-full bg-gradient-to-br from-black via-hacker-gray to-black"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-4xl">
        <TerminalWindow title="investor-portal">
          <div className="space-y-6">
            <TypingAnimation 
              content={typingContent}
              onComplete={() => setShowForm(true)}
            />
            
            {showForm && (
              <div className="mt-8 space-y-6 animate-fade-in">
                {/* One paragraph pitch */}
                <div className="text-hacker-green/90 leading-relaxed">
                  <p className="mb-4">
                    Optimal Anarchy is building the first full-stack, AI-native entertainment company—creating 
                    unified IP packages (novels, graphic novels, screenplays, video games) from single narrative 
                    cores. We're not using AI as a tool; we're creating entertainment IP that is fundamentally 
                    designed for the AI era, with agentic workflows that accelerate creation and engage early 
                    audiences to test markets. Our first IP is in active development right now, demonstrating 
                    unprecedented execution speed.
                  </p>
                </div>
                
                {/* Email form */}
                <div className="text-hacker-green">
                  <span className="opacity-70">$</span> <span>enter_email</span>
                </div>
                
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="investor@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-hacker-green text-hacker-green font-mono px-2 py-2 focus:outline-none focus:ring-0 placeholder:text-hacker-green/40"
                      autoFocus
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="px-6 py-2 border border-hacker-green text-hacker-green bg-transparent hover:bg-hacker-green hover:text-black transition-all font-mono"
                  >
                    [ENTER] Continue to Full Pitch
                  </button>
                </form>
              </div>
            )}
          </div>
        </TerminalWindow>
      </div>
    </div>
  )
}
