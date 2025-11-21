'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function FullIPPage() {
  const [accessLevel, setAccessLevel] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    const level = localStorage.getItem('accessLevel')
    if (!level || parseInt(level) < 3) {
      router.push('/enter-code')
      return
    }
    setAccessLevel(parseInt(level))
  }, [router])

  if (!accessLevel || accessLevel < 3) {
    return null
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/protected" className="inline-block mb-8 text-hacker-green/70 hover:text-hacker-green transition-colors">
          ← Back to Protected Content
        </Link>

        <div className="terminal-line mb-8">
          <span className="terminal-prompt">$</span> cat full_ip_novel.txt
        </div>

        <div className="hacker-card mb-8">
          <h1 className="text-3xl font-bold hacker-glow mb-4">Full IP Review</h1>
          <p className="text-hacker-green/80 mb-4">
            Complete access to the first novel in development. This is the tangible proof of our 
            execution speed and creative capabilities.
          </p>
          <div className="p-4 bg-red-500/10 border border-red-500/50 mb-4">
            <p className="text-sm text-red-400">
              <strong>⚠️ STRICTLY CONFIDENTIAL:</strong> This content is protected by NDA. 
              Do not share, discuss, or disclose any story elements, characters, or plot points.
            </p>
          </div>
        </div>

        <div className="hacker-card">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Complete Novel Access</h2>
              <p className="text-hacker-green/80 mb-4">
                As a Partner tier member, you have access to the complete first novel in development. 
                This demonstrates our ability to execute with unprecedented speed.
              </p>
              <div className="p-4 bg-hacker-darker border border-hacker-green/30">
                <p className="text-sm text-hacker-green/70 mb-4">
                  <strong>Access Instructions:</strong> Complete the NDA during investor signup, then 
                  contact us to receive access credentials for the full novel review portal.
                </p>
                <div className="flex gap-4">
                  <Link href="/signup" className="hacker-button text-sm">
                    Complete NDA
                  </Link>
                  <Link href="/book-call" className="hacker-button text-sm">
                    Request Access
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}









