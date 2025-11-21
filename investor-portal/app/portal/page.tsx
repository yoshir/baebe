'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function PortalPage() {
  const [name, setName] = useState('')
  const router = useRouter()

  useEffect(() => {
    const storedName = localStorage.getItem('investorName')
    const storedEmail = localStorage.getItem('investorEmail')
    
    if (!storedName || !storedEmail) {
      router.push('/')
      return
    }
    
    setName(storedName)
  }, [router])

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-bold hacker-glow mb-4">OPTIMAL ANARCHY</h1>
          <p className="text-xl text-hacker-green/80 mb-2">
            AI-Native Full-Stack Entertainment Company
          </p>
          <p className="text-sm text-hacker-green/60">
            Welcome, {name || 'Investor'}
          </p>
        </div>

        {/* Terminal line */}
        <div className="terminal-line mb-8">
          <span className="terminal-prompt">$</span> investor_portal --access_granted
        </div>

        {/* Warning banner */}
        <div className="hacker-card mb-8 border-red-500 border-2">
          <p className="text-sm text-red-400">
            <strong>⚠️ RESTRICTED ACCESS:</strong> This portal contains proprietary information and intellectual property. 
            Access is restricted to qualified investors only.
          </p>
        </div>

        {/* Navigation cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/pitch" className="hacker-card hover:border-hacker-green hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] transition-all group">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold hacker-glow group-hover:scale-105 transition-transform">
                READ INITIAL PITCH
              </h2>
              <span className="text-hacker-green/50 group-hover:text-hacker-green transition-colors">
                →
              </span>
            </div>
            <p className="text-sm text-hacker-green/70">
              Review the initial pitch (free access)
            </p>
          </Link>

          <Link href="/ip-pitch" className="hacker-card hover:border-hacker-green hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] transition-all group">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold hacker-glow group-hover:scale-105 transition-transform">
                VIEW FIRST IP: BAEBE
              </h2>
              <span className="text-hacker-green/50 group-hover:text-hacker-green transition-colors">
                →
              </span>
            </div>
            <p className="text-sm text-hacker-green/70">
              Preview our first IP in development
            </p>
          </Link>

          <Link href="/purchase-access" className="hacker-card hover:border-hacker-green hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] transition-all group border-yellow-500/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold hacker-glow group-hover:scale-105 transition-transform">
                PURCHASE ACCESS
              </h2>
              <span className="text-yellow-500/50 group-hover:text-yellow-500 transition-colors">
                $
              </span>
            </div>
            <p className="text-sm text-hacker-green/70">
              Unlock full pitch, NDA, and IP excerpt ($99-$9,999)
            </p>
          </Link>

          <Link href="/enter-code" className="hacker-card hover:border-hacker-green hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] transition-all group">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold hacker-glow group-hover:scale-105 transition-transform">
                ENTER ACCESS CODE
              </h2>
              <span className="text-hacker-green/50 group-hover:text-hacker-green transition-colors">
                →
              </span>
            </div>
            <p className="text-sm text-hacker-green/70">
              Already have an access code? Enter it here
            </p>
          </Link>

          <Link href="/signup" className="hacker-card hover:border-hacker-green hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] transition-all group">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold hacker-glow group-hover:scale-105 transition-transform">
                INVESTOR SIGNUP
              </h2>
              <span className="text-hacker-green/50 group-hover:text-hacker-green transition-colors">
                →
              </span>
            </div>
            <p className="text-sm text-hacker-green/70">
              Register as investor and complete NDA
            </p>
          </Link>

          <Link href="/book-call" className="hacker-card hover:border-hacker-green hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] transition-all group">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold hacker-glow group-hover:scale-105 transition-transform">
                BOOK CALL
              </h2>
              <span className="text-hacker-green/50 group-hover:text-hacker-green transition-colors">
                →
              </span>
            </div>
            <p className="text-sm text-hacker-green/70">
              Schedule a call with the founding team
            </p>
          </Link>

          <Link href="/loi" className="hacker-card hover:border-hacker-green hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] transition-all group">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold hacker-glow group-hover:scale-105 transition-transform">
                LETTER OF INTENT
              </h2>
              <span className="text-hacker-green/50 group-hover:text-hacker-green transition-colors">
                →
              </span>
            </div>
            <p className="text-sm text-hacker-green/70">
              Generate and submit your Letter of Intent (gets you in line)
            </p>
          </Link>

          <Link href="/term-sheet" className="hacker-card hover:border-yellow-500 hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] transition-all group border-yellow-500/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-yellow-500 group-hover:scale-105 transition-transform">
                TERM SHEET
              </h2>
              <span className="text-yellow-500/50 group-hover:text-yellow-500 transition-colors">
                ⚡
              </span>
            </div>
            <p className="text-sm text-hacker-green/70">
              Generate and submit your Term Sheet (moves you to the front)
            </p>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-hacker-green/50 mt-12">
          <p>© 2025 Optimal Anarchy. All rights reserved.</p>
          <p className="mt-2">Unauthorized access is prohibited.</p>
        </div>
      </div>
    </div>
  )
}









