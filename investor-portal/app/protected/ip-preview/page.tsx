'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function IPPreviewPage() {
  const [accessLevel, setAccessLevel] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    const level = localStorage.getItem('accessLevel')
    if (!level || parseInt(level) < 2) {
      router.push('/enter-code')
      return
    }
    setAccessLevel(parseInt(level))
  }, [router])

  if (!accessLevel || accessLevel < 2) {
    return null
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/protected" className="inline-block mb-8 text-hacker-green/70 hover:text-hacker-green transition-colors">
          ← Back to Protected Content
        </Link>

        <div className="terminal-line mb-8">
          <span className="terminal-prompt">$</span> cat ip_preview.txt
        </div>

        <div className="hacker-card mb-8">
          <h1 className="text-3xl font-bold hacker-glow mb-4">First IP Preview</h1>
          <p className="text-hacker-green/80 mb-4">
            Preview chapters from our first novel in development. This demonstrates our execution speed 
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
              <h2 className="text-xl font-bold mb-2">Preview Access</h2>
              <p className="text-hacker-green/80 mb-4">
                As an Insider tier member, you have access to preview chapters. 
                Partner tier members have access to the complete novel.
              </p>
              <div className="p-4 bg-hacker-darker border border-hacker-green/30">
                <p className="text-sm text-hacker-green/70 mb-4">
                  <strong>Note:</strong> Preview content will be available here once you've accepted the NDA 
                  and your access code has been validated. Contact us to request access to specific chapters.
                </p>
                <Link href="/signup" className="hacker-button text-sm">
                  Complete NDA to Access
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}









