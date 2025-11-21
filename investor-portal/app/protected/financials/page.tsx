'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function FinancialsPage() {
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
          <span className="terminal-prompt">$</span> cat financial_projections.txt
        </div>

        <div className="hacker-card mb-8">
          <h1 className="text-3xl font-bold hacker-glow mb-4">Financial Projections</h1>
          <p className="text-hacker-green/80 mb-4">
            Detailed financial models, unit economics, and revenue projections for Optimal Anarchy.
          </p>
        </div>

        <div className="hacker-card">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Financial Models</h2>
              <p className="text-hacker-green/80 mb-4">
                As a Partner tier member, you have access to detailed financial projections and unit economics.
              </p>
              <div className="p-4 bg-hacker-darker border border-hacker-green/30">
                <p className="text-sm text-hacker-green/70 mb-4">
                  <strong>Access Instructions:</strong> Complete the NDA during investor signup, then 
                  contact us to receive access to the financial models and projections.
                </p>
                <div className="flex gap-4">
                  <Link href="/signup" className="hacker-button text-sm">
                    Complete NDA
                  </Link>
                  <Link href="/book-call" className="hacker-button text-sm">
                    Request Financials
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









