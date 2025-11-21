'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function IPExcerptPage() {
  const [accessLevel, setAccessLevel] = useState<number | null>(null)
  const [ndaAccepted, setNdaAccepted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const level = localStorage.getItem('accessLevel')
    const nda = localStorage.getItem('ndaAccepted')
    
    if (!level || parseInt(level) < 1) {
      router.push('/purchase-access')
      return
    }
    
    setAccessLevel(parseInt(level))
    setNdaAccepted(nda === 'true')
  }, [router])

  const handleAcceptNDA = () => {
    localStorage.setItem('ndaAccepted', 'true')
    setNdaAccepted(true)
  }

  if (!accessLevel || accessLevel < 1) {
    return null
  }

  if (!ndaAccepted) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/protected" className="inline-block mb-8 text-hacker-green/70 hover:text-hacker-green transition-colors">
            ← Back to Protected Content
          </Link>

          <div className="terminal-line mb-8">
            <span className="terminal-prompt">$</span> access_ip_excerpt --require_nda
          </div>

          <div className="hacker-card mb-8 border-red-500 border-2">
            <h1 className="text-3xl font-bold hacker-glow mb-4">NDA Required for IP Access</h1>
            <p className="text-hacker-green/80 mb-6">
              To access the IP excerpt, you must accept the Non-Disclosure Agreement. 
              This protects our unpublished entertainment intellectual property.
            </p>
            
            <div className="p-6 bg-hacker-darker border border-hacker-green/30 mb-6">
              <h2 className="text-xl font-bold mb-4">NDA Summary</h2>
              <div className="space-y-3 text-sm text-hacker-green/80">
                <p>
                  <strong className="text-red-500">Entertainment IP is STRICTLY CONFIDENTIAL:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You cannot share, discuss, or disclose any novel content, screenplay content, character names, storylines, or plot points</li>
                  <li>You cannot post, publish, or distribute any IP content in any form</li>
                  <li>Entertainment IP is protected by copyright and trade secret law</li>
                </ul>
                <p className="mt-4">
                  <strong className="text-hacker-green">Company Information is NOT CONFIDENTIAL:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You may freely discuss Optimal Anarchy as a company and investment opportunity</li>
                  <li>You may discuss business model, technology platform, and market opportunity</li>
                  <li>This NDA restricts only Entertainment IP disclosure, not company discussions</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-red-500/10 border border-red-500/50 mb-6">
              <p className="text-sm text-red-400">
                <strong>⚠️ CRITICAL:</strong> Unauthorized disclosure of Entertainment IP may result in:
                copyright infringement claims, trade secret misappropriation claims, significant monetary damages, 
                injunctive relief, and attorneys' fees.
              </p>
            </div>

            <div className="flex items-start gap-3 mb-6">
              <input
                type="checkbox"
                id="nda-check"
                checked={ndaAccepted}
                onChange={(e) => setNdaAccepted(e.target.checked)}
                className="mt-1 w-5 h-5 border-hacker-green bg-transparent"
              />
              <label htmlFor="nda-check" className="text-sm text-hacker-green/90">
                <strong>I acknowledge and agree:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1 text-hacker-green/80">
                  <li>I have read and understood the Non-Disclosure Agreement</li>
                  <li>I will NOT disclose, share, or leak any Entertainment IP content</li>
                  <li>I understand that Entertainment IP is strictly confidential</li>
                  <li>I understand that Company Information may be discussed freely</li>
                  <li>I understand that unauthorized disclosure may result in legal action</li>
                </ul>
              </label>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAcceptNDA}
                disabled={!ndaAccepted}
                className="hacker-button flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Accept NDA & Access IP Excerpt
              </button>
              <Link href="/signup" className="hacker-button">
                View Full NDA
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/protected" className="inline-block mb-8 text-hacker-green/70 hover:text-hacker-green transition-colors">
          ← Back to Protected Content
        </Link>

        <div className="terminal-line mb-8">
          <span className="terminal-prompt">$</span> cat ip_excerpt.txt
        </div>

        <div className="hacker-card mb-8">
          <h1 className="text-3xl font-bold hacker-glow mb-4">First IP Excerpt</h1>
          <p className="text-hacker-green/80 mb-4">
            Excerpt from our first novel in development. This demonstrates our execution speed 
            and creative capabilities.
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
              <h2 className="text-xl font-bold mb-4">IP Excerpt Access</h2>
              <p className="text-hacker-green/80 mb-4">
                As a paid access member who has accepted the NDA, you have access to an excerpt 
                from our first IP in development.
              </p>
              <div className="p-4 bg-hacker-darker border border-hacker-green/30">
                <p className="text-sm text-hacker-green/70 mb-4">
                  <strong>Note:</strong> The full IP excerpt will be available here once you've accepted the NDA 
                  and your access code has been validated. Contact us to request access to specific chapters or sections.
                </p>
                <p className="text-sm text-hacker-green/60">
                  For Insider tier ($499): Preview chapters available<br/>
                  For Partner tier ($1,999): Full novel access available<br/>
                  For Strategic tier ($9,999): Full IP portfolio access available
                </p>
              </div>
            </div>

            <div className="p-4 bg-hacker-green/10 border border-hacker-green/30">
              <p className="text-sm text-hacker-green/90">
                <strong>Next Steps:</strong> Contact us to arrange access to specific excerpts or chapters 
                based on your access tier. You can book a call or email us through the investor portal.
              </p>
            </div>

            <div className="flex gap-4">
              <Link href="/book-call" className="hacker-button">
                Request IP Access
              </Link>
              <Link href="/protected" className="hacker-button">
                Back to Protected Content
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}









