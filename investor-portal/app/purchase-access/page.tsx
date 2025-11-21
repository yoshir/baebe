'use client'

import { useState } from 'react'
import Link from 'next/link'
import { accessTiers, generateAccessCode, type AccessTier } from '@/lib/accessTiers'

export default function PurchaseAccessPage() {
  const [selectedTier, setSelectedTier] = useState<AccessTier | null>(null)
  const [processing, setProcessing] = useState(false)
  const [purchased, setPurchased] = useState(false)
  const [accessCode, setAccessCode] = useState('')

  const handlePurchase = async (tier: AccessTier) => {
    setProcessing(true)
    
    // In production, integrate with Stripe or payment processor
    // For now, simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const code = generateAccessCode(tier.id)
    setAccessCode(code)
    setPurchased(true)
    setProcessing(false)
    
    // Store in localStorage for session
    localStorage.setItem('accessCode', code)
    localStorage.setItem('accessTier', tier.id)
    localStorage.setItem('accessLevel', tier.accessLevel.toString())
  }

  if (purchased && accessCode) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="hacker-card max-w-2xl text-center">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold hacker-glow mb-4">Access Granted</h1>
          <div className="mb-6 p-6 bg-hacker-darker border border-hacker-green hacker-border">
            <p className="text-sm text-hacker-green/60 mb-2">Your Access Code:</p>
            <p className="text-2xl font-mono font-bold hacker-glow mb-4">{accessCode}</p>
            <p className="text-xs text-hacker-green/50">
              Save this code - you'll need it to access protected content
            </p>
          </div>
          <p className="text-hacker-green/80 mb-6">
            Thank you for supporting Optimal Anarchy. Your contribution helps fund our operations 
            and IP development. You now have access to all content in the {selectedTier?.name} tier.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/" className="hacker-button">
              Return to Portal
            </Link>
            <Link href="/protected" className="hacker-button">
              Access Protected Content
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-block mb-8 text-hacker-green/70 hover:text-hacker-green transition-colors">
          ← Back to Portal
        </Link>

        <div className="terminal-line mb-8">
          <span className="terminal-prompt">$</span> purchase_access --fund-operations
        </div>

        <div className="hacker-card mb-8">
          <h1 className="text-4xl font-bold hacker-glow mb-4">Purchase Access</h1>
          <p className="text-hacker-green/80 mb-4">
            Support Optimal Anarchy's operations and IP development by purchasing access to exclusive content. 
            This is not an investment—it's a way to fund our current operations while gaining deeper insights 
            into our vision and execution.
          </p>
          <div className="p-4 bg-hacker-green/10 border border-hacker-green/30">
            <p className="text-sm text-hacker-green/90">
              <strong>How it works:</strong> Choose a tier, make a one-time payment, and receive an access code 
              that unlocks exclusive content. Your contribution directly funds our IP development and platform building.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {accessTiers.map((tier) => (
            <div
              key={tier.id}
              className={`hacker-card cursor-pointer transition-all ${
                selectedTier?.id === tier.id
                  ? 'border-hacker-green shadow-[0_0_20px_rgba(0,255,65,0.5)] scale-105'
                  : 'hover:border-hacker-green/70'
              }`}
              onClick={() => setSelectedTier(tier)}
            >
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold hacker-glow mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold mb-2">
                  ${tier.price.toLocaleString()}
                </div>
                <p className="text-sm text-hacker-green/70 mb-4">{tier.description}</p>
              </div>

              <ul className="space-y-2 mb-6 text-sm">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-hacker-green">✓</span>
                    <span className="text-hacker-green/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePurchase(tier)
                }}
                disabled={processing}
                className="hacker-button w-full"
              >
                {processing && selectedTier?.id === tier.id ? 'Processing...' : 'Purchase Access'}
              </button>
            </div>
          ))}
        </div>

        <div className="hacker-card">
          <h2 className="text-2xl font-bold mb-4">Why Purchase Access?</h2>
          <div className="space-y-4 text-hacker-green/80">
            <div>
              <strong className="text-hacker-green">Fund Operations:</strong> Your payment directly supports 
              our IP development, technology platform building, and operational expenses.
            </div>
            <div>
              <strong className="text-hacker-green">No Strings Attached:</strong> This is not an investment 
              commitment. You're simply purchasing access to information while supporting our mission.
            </div>
            <div>
              <strong className="text-hacker-green">Early Access:</strong> Get deeper insights into our 
              execution, IP development, and strategic direction before making an investment decision.
            </div>
            <div>
              <strong className="text-hacker-green">Support Innovation:</strong> Help us build the future 
              of entertainment while gaining exclusive access to our progress.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}









