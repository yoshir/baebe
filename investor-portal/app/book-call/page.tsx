'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function BookCallPage() {
  const router = useRouter()

  useEffect(() => {
    const confirmed = localStorage.getItem('emailConfirmed')
    if (confirmed !== 'true') {
      router.push('/')
    }
  }, [router])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    preferredDate: '',
    preferredTime: '',
    timezone: 'America/Los_Angeles',
    callType: 'investment',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would integrate with a calendar booking system
    console.log('Call booking submitted:', formData)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="hacker-card max-w-2xl text-center">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold hacker-glow mb-4">Call Scheduled</h1>
          <p className="text-hacker-green/80 mb-6">
            Your call request has been received. We'll confirm the meeting time and send calendar invites within 24 hours.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/" className="hacker-button">
              Return to Portal
            </Link>
            <Link href="/loi" className="hacker-button">
              Create Letter of Intent
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/pitch" className="inline-block mb-8 text-hacker-green/70 hover:text-hacker-green transition-colors">
          ← Back to Pitch
        </Link>

        <div className="terminal-line mb-8">
          <span className="terminal-prompt">$</span> schedule_call --with-founders
        </div>

        <div className="hacker-card mb-8">
          <h1 className="text-4xl font-bold hacker-glow mb-4">Book a Call</h1>
          <p className="text-hacker-green/80 mb-4">
            Schedule a call with the Optimal Anarchy founding team to discuss investment opportunities, 
            review the first IP, and explore partnership possibilities.
          </p>
          <div className="p-4 bg-hacker-green/10 border border-hacker-green/30">
            <p className="text-sm text-hacker-green/90">
              <strong>Available Times:</strong> Monday-Friday, 9 AM - 6 PM PST<br/>
              <strong>Duration:</strong> 30-60 minutes<br/>
              <strong>Format:</strong> Video call (Zoom/Google Meet)
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="hacker-card">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  className="hacker-input w-full"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  className="hacker-input w-full"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2">Company / Organization</label>
                <input
                  type="text"
                  className="hacker-input w-full"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="hacker-card">
            <h2 className="text-2xl font-bold mb-6">Call Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Call Type *</label>
                <select
                  required
                  className="hacker-input w-full"
                  value={formData.callType}
                  onChange={(e) => setFormData({...formData, callType: e.target.value})}
                >
                  <option value="investment">Investment Discussion</option>
                  <option value="ip-review">IP Review & Evaluation</option>
                  <option value="partnership">Partnership Discussion</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Preferred Date *</label>
                  <input
                    type="date"
                    required
                    className="hacker-input w-full"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Preferred Time *</label>
                  <select
                    required
                    className="hacker-input w-full"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                  >
                    <option value="">Select...</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Timezone</label>
                <select
                  className="hacker-input w-full"
                  value={formData.timezone}
                  onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                >
                  <option value="America/Los_Angeles">Pacific Time (PST/PDT)</option>
                  <option value="America/New_York">Eastern Time (EST/EDT)</option>
                  <option value="America/Chicago">Central Time (CST/CDT)</option>
                  <option value="America/Denver">Mountain Time (MST/MDT)</option>
                  <option value="Europe/London">London (GMT/BST)</option>
                  <option value="Asia/Tokyo">Tokyo (JST)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Additional Notes</label>
                <textarea
                  className="hacker-input w-full h-32 resize-none"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Any specific topics you'd like to discuss, questions, or additional information..."
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="hacker-button flex-1">
              Request Call
            </button>
            <Link href="/" className="hacker-button">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}


