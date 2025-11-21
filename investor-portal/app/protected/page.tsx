'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { accessTiers } from '@/lib/accessTiers'

export default function ProtectedContentPage() {
  const [accessLevel, setAccessLevel] = useState<number | null>(null)
  const [accessTier, setAccessTier] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const level = localStorage.getItem('accessLevel')
    const tier = localStorage.getItem('accessTier')
    
    if (!level || !tier) {
      router.push('/enter-code')
      return
    }
    
    setAccessLevel(parseInt(level))
    setAccessTier(tier)
  }, [router])

  if (!accessLevel || !accessTier) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-hacker-green">Loading...</div>
      </div>
    )
  }

  const currentTier = accessTiers.find(t => t.id === accessTier)
  const hasAccess = (requiredLevel: number) => accessLevel >= requiredLevel

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-hacker-green/70 hover:text-hacker-green transition-colors">
            ← Back to Portal
          </Link>
          <div className="text-sm text-hacker-green/60">
            Access Level: <span className="text-hacker-green">{currentTier?.name}</span>
          </div>
        </div>

        <div className="terminal-line mb-8">
          <span className="terminal-prompt">$</span> access_granted --tier {currentTier?.name}
        </div>

        <div className="hacker-card mb-8">
          <h1 className="text-4xl font-bold hacker-glow mb-4">Protected Content</h1>
          <p className="text-hacker-green/80 mb-4">
            Welcome to the exclusive content area. Your access level determines what content you can view.
          </p>
          <div className="p-4 bg-hacker-green/10 border border-hacker-green/30">
            <p className="text-sm text-hacker-green/90">
              <strong>Current Access:</strong> {currentTier?.name} Tier (Level {accessLevel})
            </p>
          </div>
        </div>

        {/* Tier 1 Content - Explorer */}
        <div className="hacker-card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Explorer Tier Content</h2>
            {hasAccess(1) ? (
              <span className="text-xs px-3 py-1 bg-hacker-green/20 border border-hacker-green text-hacker-green">
                ACCESS GRANTED
              </span>
            ) : (
              <span className="text-xs px-3 py-1 bg-red-500/20 border border-red-500 text-red-500">
                UPGRADE REQUIRED
              </span>
            )}
          </div>
          {hasAccess(1) ? (
            <div className="space-y-4 text-hacker-green/80">
              <p>You have access to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Full pitch document</li>
                <li>Company overview and business model</li>
                <li>Market opportunity analysis</li>
                <li>Basic investment information</li>
              </ul>
              <div className="mt-4">
                <Link href="/pitch" className="hacker-button">
                  View Full Pitch
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-hacker-green/60">
              <p>Upgrade to Explorer tier to access this content.</p>
              <Link href="/purchase-access" className="inline-block mt-4 hacker-button">
                Purchase Access
              </Link>
            </div>
          )}
        </div>

        {/* Tier 2 Content - Insider */}
        <div className="hacker-card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Insider Tier Content</h2>
            {hasAccess(2) ? (
              <span className="text-xs px-3 py-1 bg-hacker-green/20 border border-hacker-green text-hacker-green">
                ACCESS GRANTED
              </span>
            ) : (
              <span className="text-xs px-3 py-1 bg-red-500/20 border border-red-500 text-red-500">
                UPGRADE REQUIRED
              </span>
            )}
          </div>
          {hasAccess(2) ? (
            <div className="space-y-4 text-hacker-green/80">
              <p>You have access to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Detailed technology stack documentation</li>
                <li>IP development pipeline details</li>
                <li>First IP preview (novel chapters)</li>
                <li>Execution timeline and roadmap</li>
                <li>Competitive analysis</li>
              </ul>
              <div className="mt-4 p-4 bg-hacker-darker border border-hacker-green/30">
                <h3 className="font-bold mb-2">First IP Excerpt</h3>
                <p className="text-sm text-hacker-green/70 mb-4">
                  Access to excerpt from our first novel in development. Requires NDA acceptance. 
                  This demonstrates our execution speed and creative capabilities.
                </p>
                <Link href="/protected/ip-excerpt" className="hacker-button text-sm">
                  View IP Excerpt (NDA Required)
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-hacker-green/60">
              <p>Upgrade to Insider tier ($499) to access detailed technology documentation, IP preview, and competitive analysis.</p>
              <Link href="/purchase-access" className="inline-block mt-4 hacker-button">
                Upgrade to Insider
              </Link>
            </div>
          )}
        </div>

        {/* Tier 3 Content - Partner */}
        <div className="hacker-card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Partner Tier Content</h2>
            {hasAccess(3) ? (
              <span className="text-xs px-3 py-1 bg-hacker-green/20 border border-hacker-green text-hacker-green">
                ACCESS GRANTED
              </span>
            ) : (
              <span className="text-xs px-3 py-1 bg-red-500/20 border border-red-500 text-red-500">
                UPGRADE REQUIRED
              </span>
            )}
          </div>
          {hasAccess(3) ? (
            <div className="space-y-4 text-hacker-green/80">
              <p>You have access to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Financial projections and unit economics</li>
                <li>Full first IP review (complete novel access)</li>
                <li>Term sheet templates</li>
                <li>Direct email access to founders</li>
                <li>Priority call scheduling</li>
                <li>Early adopter investor benefits</li>
              </ul>
              <div className="mt-4 space-y-4">
                <div className="p-4 bg-hacker-darker border border-hacker-green/30">
                  <h3 className="font-bold mb-2">Full IP Review</h3>
                  <p className="text-sm text-hacker-green/70 mb-4">
                    Complete access to the first novel in development. Requires NDA acceptance. 
                    Review our execution speed and quality.
                  </p>
                  <Link href="/protected/ip-excerpt" className="hacker-button text-sm">
                    Access Full IP (NDA Required)
                  </Link>
                </div>
                <div className="p-4 bg-hacker-darker border border-hacker-green/30">
                  <h3 className="font-bold mb-2">Financial Projections</h3>
                  <p className="text-sm text-hacker-green/70 mb-4">
                    Detailed financial models, unit economics, and revenue projections.
                  </p>
                  <Link href="/protected/financials" className="hacker-button text-sm">
                    View Financials
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-hacker-green/60">
              <p>Upgrade to Partner tier ($1,999) to access financials, full IP review, and founder access.</p>
              <Link href="/purchase-access" className="inline-block mt-4 hacker-button">
                Upgrade to Partner
              </Link>
            </div>
          )}
        </div>

        {/* Tier 4 Content - Strategic */}
        <div className="hacker-card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Strategic Tier Content</h2>
            {hasAccess(4) ? (
              <span className="text-xs px-3 py-1 bg-hacker-green/20 border border-hacker-green text-hacker-green">
                ACCESS GRANTED
              </span>
            ) : (
              <span className="text-xs px-3 py-1 bg-red-500/20 border border-red-500 text-red-500">
                UPGRADE REQUIRED
              </span>
            )}
          </div>
          {hasAccess(4) ? (
            <div className="space-y-4 text-hacker-green/80">
              <p>You have access to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Co-development opportunities</li>
                <li>Advisory role consideration</li>
                <li>Platform beta access</li>
                <li>Custom partnership proposals</li>
                <li>Board observer opportunities</li>
                <li>Exclusive investor events</li>
              </ul>
              <div className="mt-4 p-4 bg-hacker-darker border border-hacker-green/30">
                <h3 className="font-bold mb-2">Strategic Partnership Portal</h3>
                <p className="text-sm text-hacker-green/70 mb-4">
                  Access to co-development opportunities, advisory roles, and custom partnership proposals.
                </p>
                <Link href="/protected/strategic" className="hacker-button text-sm">
                  Access Strategic Portal
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-hacker-green/60">
              <p>Upgrade to Strategic tier ($9,999) to access co-development opportunities, advisory roles, and exclusive events.</p>
              <Link href="/purchase-access" className="inline-block mt-4 hacker-button">
                Upgrade to Strategic
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

