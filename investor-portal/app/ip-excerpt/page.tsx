'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function IPExcerptPage() {
  const router = useRouter()
  const [ndaAccepted, setNdaAccepted] = useState(false)

  useEffect(() => {
    const confirmed = localStorage.getItem('emailConfirmed')
    const nda = localStorage.getItem('ndaAccepted')
    
    if (confirmed !== 'true') {
      router.push('/')
      return
    }
    
    if (nda === 'true') {
      setNdaAccepted(true)
    } else {
      router.push('/signup')
    }
  }, [router])

  if (!ndaAccepted) {
    return null
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/signup" className="inline-block mb-8 text-hacker-green/70 hover:text-hacker-green transition-colors">
          ← Back
        </Link>

        <div className="terminal-line mb-8">
          <span className="terminal-prompt">$</span> cat baebe_excerpt.md
        </div>

        <div className="hacker-card mb-8 border-red-500 border-2">
          <p className="text-sm text-red-400 mb-4">
            <strong>⚠️ CONFIDENTIAL - ENTERTAINMENT IP:</strong> This content is protected by NDA. 
            Do not share, copy, or disclose any portion of this IP excerpt.
          </p>
        </div>

        <div className="hacker-card prose prose-invert max-w-none mb-8">
          <h1 className="text-4xl font-bold hacker-glow mb-6">BAEBE - IP Excerpt</h1>
          <p className="text-hacker-green/80 mb-4">
            This is an excerpt from our first novel in active development. It demonstrates our execution speed 
            and creative capabilities. We welcome your honest feedback.
          </p>
          
          {/* IP Excerpt Content - Replace with actual excerpt */}
          <div className="mt-8 space-y-6 text-hacker-green/90">
            <p className="text-sm text-hacker-green/60 italic">
              [IP Excerpt content will be displayed here]
            </p>
            <p className="text-sm text-hacker-green/60">
              This is where the actual novel excerpt would appear. The content is protected by the NDA you signed.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="hacker-card text-center">
          <h3 className="text-2xl font-bold hacker-glow mb-4">What's Next?</h3>
          <div className="flex gap-4 justify-center">
            <Link href="/review" className="hacker-button">
              Give Honest Review
            </Link>
            <Link href="/book-call" className="hacker-button">
              Book a Call
            </Link>
            <Link href="/term-sheet" className="hacker-button border-yellow-500/50 hover:border-yellow-500">
              Send Term Sheet
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}








