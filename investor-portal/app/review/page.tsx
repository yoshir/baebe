'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ReviewPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    overallRating: '',
    executionSpeed: '',
    creativeQuality: '',
    marketPotential: '',
    feedback: '',
    investmentInterest: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const confirmed = localStorage.getItem('emailConfirmed')
    if (confirmed !== 'true') {
      router.push('/')
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, submit to backend
    console.log('Review submitted:', formData)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="hacker-card max-w-2xl text-center">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold hacker-glow mb-4">Thank You</h1>
          <p className="text-hacker-green/80 mb-6">
            Your honest review has been received. We appreciate your feedback and will use it to improve our IP development.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/book-call" className="hacker-button">
              Book a Call
            </Link>
            <Link href="/term-sheet" className="hacker-button border-yellow-500/50 hover:border-yellow-500">
              Send Term Sheet
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/ip-excerpt" className="inline-block mb-8 text-hacker-green/70 hover:text-hacker-green transition-colors">
          ← Back to IP Excerpt
        </Link>

        <div className="terminal-line mb-8">
          <span className="terminal-prompt">$</span> submit_review --honest_feedback
        </div>

        <div className="hacker-card mb-8">
          <h1 className="text-4xl font-bold hacker-glow mb-4">Give Your Honest Review</h1>
          <p className="text-hacker-green/80 mb-4">
            We value your honest feedback on our IP excerpt. Your review helps us improve and demonstrates 
            your engagement with our work. Be candid—we want to know what you really think.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="hacker-card">
            <h2 className="text-2xl font-bold mb-6">Review Questions</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Overall Rating *</label>
                <select
                  required
                  className="hacker-input w-full"
                  value={formData.overallRating}
                  onChange={(e) => setFormData({...formData, overallRating: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="excellent">Excellent - Ready for market</option>
                  <option value="good">Good - Needs minor refinement</option>
                  <option value="fair">Fair - Needs significant work</option>
                  <option value="poor">Poor - Major concerns</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Execution Speed Assessment *</label>
                <select
                  required
                  className="hacker-input w-full"
                  value={formData.executionSpeed}
                  onChange={(e) => setFormData({...formData, executionSpeed: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="impressive">Impressive - Faster than expected</option>
                  <option value="good">Good - Meets expectations</option>
                  <option value="average">Average - As expected</option>
                  <option value="concerning">Concerning - Slower than expected</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Creative Quality *</label>
                <select
                  required
                  className="hacker-input w-full"
                  value={formData.creativeQuality}
                  onChange={(e) => setFormData({...formData, creativeQuality: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="exceptional">Exceptional - Standout quality</option>
                  <option value="strong">Strong - Professional quality</option>
                  <option value="adequate">Adequate - Needs improvement</option>
                  <option value="weak">Weak - Significant concerns</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Market Potential *</label>
                <select
                  required
                  className="hacker-input w-full"
                  value={formData.marketPotential}
                  onChange={(e) => setFormData({...formData, marketPotential: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="high">High - Strong commercial potential</option>
                  <option value="moderate">Moderate - Some potential</option>
                  <option value="low">Low - Limited potential</option>
                  <option value="uncertain">Uncertain - Hard to assess</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Detailed Feedback *</label>
                <textarea
                  required
                  className="hacker-input w-full h-32 resize-none"
                  value={formData.feedback}
                  onChange={(e) => setFormData({...formData, feedback: e.target.value})}
                  placeholder="Be honest and specific. What worked? What didn't? What concerns do you have?"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Investment Interest</label>
                <select
                  className="hacker-input w-full"
                  value={formData.investmentInterest}
                  onChange={(e) => setFormData({...formData, investmentInterest: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="very-interested">Very Interested - Ready to discuss terms</option>
                  <option value="interested">Interested - Need more information</option>
                  <option value="maybe">Maybe - Need to see more</option>
                  <option value="not-interested">Not Interested - Not a fit</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="hacker-button flex-1">
              Submit Honest Review
            </button>
            <Link href="/ip-excerpt" className="hacker-button">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}








