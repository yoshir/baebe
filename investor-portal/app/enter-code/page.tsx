'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { validateAccessCode, accessTiers } from '@/lib/accessTiers'

export default function EnterCodePage() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [validating, setValidating] = useState(false)
  const router = useRouter()

  // Check for existing access code
  useEffect(() => {
    const storedCode = localStorage.getItem('accessCode')
    if (storedCode) {
      setCode(storedCode)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setValidating(true)

    // Validate access code
    const result = validateAccessCode(code.trim())
    
    setTimeout(() => {
      if (result.valid && result.tier) {
        // Store access in localStorage
        localStorage.setItem('accessCode', code.trim())
        localStorage.setItem('accessTier', result.tier.id)
        localStorage.setItem('accessLevel', result.tier.accessLevel.toString())
        
        // Redirect to protected content
        router.push('/protected')
      } else {
        setError('Invalid access code. Please check and try again.')
        setValidating(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <Link href="/" className="inline-block mb-8 text-hacker-green/70 hover:text-hacker-green transition-colors">
          ← Back to Portal
        </Link>

        <div className="terminal-line mb-8">
          <span className="terminal-prompt">$</span> access_code --enter
        </div>

        <div className="hacker-card">
          <h1 className="text-4xl font-bold hacker-glow mb-4">Enter Access Code</h1>
          <p className="text-hacker-green/80 mb-6">
            Enter your access code to unlock exclusive content. If you don't have a code, 
            you can <Link href="/purchase-access" className="text-hacker-green underline">purchase access</Link>.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">Access Code</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase())
                  setError('')
                }}
                className="hacker-input w-full text-2xl font-mono text-center tracking-widest"
                placeholder="XXXX-XXXX-XXXX"
                disabled={validating}
              />
              {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={validating || !code.trim()}
              className="hacker-button w-full"
            >
              {validating ? 'Validating...' : 'Access Content'}
            </button>
          </form>

          <div className="mt-8 p-4 bg-hacker-green/10 border border-hacker-green/30">
            <p className="text-sm text-hacker-green/90 mb-2">
              <strong>Don't have an access code?</strong>
            </p>
            <Link href="/purchase-access" className="text-hacker-green underline text-sm">
              Purchase access to support operations and unlock exclusive content →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}









