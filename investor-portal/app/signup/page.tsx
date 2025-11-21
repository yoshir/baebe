'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ndaContent } from '@/lib/ndaContent'

export default function SignupPage() {
  const [ndaAccepted, setNdaAccepted] = useState(false)
  const [showNda, setShowNda] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const confirmed = localStorage.getItem('emailConfirmed')
    if (confirmed !== 'true') {
      router.push('/')
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ndaAccepted) {
      alert('You must accept the NDA to proceed')
      return
    }
    // Store NDA acceptance
    localStorage.setItem('ndaAccepted', 'true')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="hacker-card max-w-2xl text-center">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold hacker-glow mb-4">NDA Accepted</h1>
          <p className="text-hacker-green/80 mb-6">
            Thank you. You now have access to the IP excerpt and can provide your honest review.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/ip-excerpt" className="hacker-button">
              Read IP Excerpt
            </Link>
            <Link href="/review" className="hacker-button">
              Give Honest Review
            </Link>
            <Link href="/book-call" className="hacker-button">
              Book a Call
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/pitch" className="inline-block mb-8 text-hacker-green/70 hover:text-hacker-green transition-colors">
          ← Back to Pitch
        </Link>

        <div className="terminal-line mb-8">
          <span className="terminal-prompt">$</span> sign_nda --access_ip
        </div>

        <div className="hacker-card mb-8">
          <h1 className="text-4xl font-bold hacker-glow mb-4">Sign NDA to Access IP Excerpt</h1>
          <p className="text-hacker-green/80 mb-6">
            To read an excerpt from our first IP in development, please review and accept our Non-Disclosure Agreement. 
            This protects our entertainment IP while allowing you to evaluate our execution.
          </p>
        </div>

        {/* NDA Section */}
        <div className="hacker-card border-red-500 border-2 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-red-500">Non-Disclosure Agreement</h2>
            <button
              type="button"
              onClick={() => setShowNda(!showNda)}
              className="hacker-button text-sm"
            >
              {showNda ? 'Hide NDA' : 'View Full NDA'}
            </button>
          </div>

          {showNda && (
            <div className="mb-6 p-4 bg-hacker-darker border border-hacker-green/30 max-h-96 overflow-y-auto">
              <pre className="text-xs text-hacker-green/80 whitespace-pre-wrap font-mono">
                {ndaContent}
              </pre>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="nda-accept"
                required
                checked={ndaAccepted}
                onChange={(e) => setNdaAccepted(e.target.checked)}
                className="mt-1 w-5 h-5 border-hacker-green bg-transparent"
              />
              <label htmlFor="nda-accept" className="text-sm text-hacker-green/90">
                <strong className="text-red-500">I acknowledge and agree:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1 text-hacker-green/80">
                  <li>I have read and understood the Non-Disclosure Agreement</li>
                  <li><strong>Entertainment IP Protection:</strong> I will NOT disclose, share, or leak any novel content, screenplay content, character names, storylines, plot points, or any entertainment IP materials</li>
                  <li><strong>Company Information:</strong> I understand that I MAY freely discuss Optimal Anarchy as a company, the investment opportunity, and business information</li>
                  <li>I understand that unauthorized disclosure of Entertainment IP may result in legal action and damages</li>
                  <li>I agree to be bound by all terms of the NDA</li>
                </ul>
              </label>
            </div>

            <div className="p-4 bg-red-500/10 border border-red-500/50">
              <p className="text-sm text-red-400 mb-2">
                <strong>⚠️ CRITICAL - Entertainment IP Protection:</strong> This NDA protects unpublished entertainment intellectual property. 
                Unauthorized disclosure may constitute copyright infringement and trade secret misappropriation.
              </p>
              <p className="text-sm text-hacker-green/70">
                <strong>✓ Permitted:</strong> You may freely discuss Optimal Anarchy as a company and the investment opportunity. 
                This NDA restricts only Entertainment IP disclosure.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-4">
          <button type="submit" className="hacker-button flex-1">
            Accept NDA & Access IP
          </button>
          <Link href="/pitch" className="hacker-button">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  )
}
