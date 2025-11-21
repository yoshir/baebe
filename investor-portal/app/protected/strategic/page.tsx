'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function StrategicPage() {
  const [accessLevel, setAccessLevel] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    const level = localStorage.getItem('accessLevel')
    if (!level || parseInt(level) < 4) {
      router.push('/enter-code')
      return
    }
    setAccessLevel(parseInt(level))
  }, [router])

  if (!accessLevel || accessLevel < 4) {
    return null
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/protected" className="inline-block mb-8 text-hacker-green/70 hover:text-hacker-green transition-colors">
          ← Back to Protected Content
        </Link>

        <div className="terminal-line mb-8">
          <span className="terminal-prompt">$</span> cat strategic_portal.txt
        </div>

        <div className="hacker-card mb-8">
          <h1 className="text-3xl font-bold hacker-glow mb-4">Strategic Partnership Portal</h1>
          <p className="text-hacker-green/80 mb-4">
            As a Strategic tier member, you have access to co-development opportunities, advisory roles, 
            and exclusive partnership proposals.
          </p>
        </div>

        <div className="hacker-card">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Strategic Opportunities</h2>
              <div className="space-y-4 text-hacker-green/80">
                <div className="p-4 bg-hacker-darker border border-hacker-green/30">
                  <h3 className="font-bold mb-2">Co-Development Opportunities</h3>
                  <p className="text-sm text-hacker-green/70 mb-4">
                    Explore joint development of IP with shared equity participation.
                  </p>
                  <Link href="/book-call" className="hacker-button text-sm">
                    Schedule Discussion
                  </Link>
                </div>
                <div className="p-4 bg-hacker-darker border border-hacker-green/30">
                  <h3 className="font-bold mb-2">Advisory Role Consideration</h3>
                  <p className="text-sm text-hacker-green/70 mb-4">
                    Discuss advisory opportunities and governance participation.
                  </p>
                  <Link href="/book-call" className="hacker-button text-sm">
                    Express Interest
                  </Link>
                </div>
                <div className="p-4 bg-hacker-darker border border-hacker-green/30">
                  <h3 className="font-bold mb-2">Platform Beta Access</h3>
                  <p className="text-sm text-hacker-green/70 mb-4">
                    Early access to our platform as it develops.
                  </p>
                  <Link href="/book-call" className="hacker-button text-sm">
                    Request Beta Access
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









