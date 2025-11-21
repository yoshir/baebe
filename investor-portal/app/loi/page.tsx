'use client'

import { useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'

export default function LOIPage() {
  const [formData, setFormData] = useState({
    investorName: '',
    investorTitle: '',
    investorCompany: '',
    investorAddress: '',
    investorEmail: '',
    investmentAmount: '',
    investmentType: 'equity',
    proposedTerms: '',
    timeline: '',
    additionalTerms: '',
  })
  const [generated, setGenerated] = useState(false)

  const generateLOI = () => {
    if (!formData.investorName || !formData.investmentAmount) {
      alert('Please fill in required fields (Investor Name and Investment Amount)')
      return
    }
    setGenerated(true)
  }

  const loiContent = `LETTER OF INTENT
Investment in Optimal Anarchy (Delaware C Corporation)

Date: ${format(new Date(), 'MMMM dd, yyyy')}

To: Optimal Anarchy (Delaware C Corporation)
Attn: Founding Team

From: ${formData.investorName || '[Investor Name]'}
${formData.investorTitle ? `Title: ${formData.investorTitle}` : ''}
${formData.investorCompany ? `Company: ${formData.investorCompany}` : ''}
${formData.investorAddress ? `Address: ${formData.investorAddress}` : ''}
${formData.investorEmail ? `Email: ${formData.investorEmail}` : ''}

---

RE: Letter of Intent to Invest in Optimal Anarchy

Dear Optimal Anarchy Team,

This Letter of Intent ("LOI") sets forth the preliminary terms and conditions under which ${formData.investorName || '[Investor Name]'}${formData.investorCompany ? ` (on behalf of ${formData.investorCompany})` : ''} (the "Investor") proposes to make an investment in Optimal Anarchy, a Delaware C Corporation (the "Company").

1. INVESTMENT AMOUNT
   The Investor proposes to invest ${formData.investmentAmount || '[Amount]'} in the Company's ${formData.investmentType === 'equity' ? 'equity' : formData.investmentType === 'convertible' ? 'convertible note' : 'equity'} round.

2. INVESTMENT STRUCTURE
   - Investment Type: ${formData.investmentType === 'equity' ? 'Equity Investment' : formData.investmentType === 'convertible' ? 'Convertible Note' : 'Equity Investment'}
   - Company Structure: Delaware C Corporation
   - IP Ownership: All IP owned by Optimal Anarchy; Investor receives equity stake in the company
   - Investor Rights: As part owners of the company, investors have a stake in the IP portfolio

3. PROPOSED TERMS
   ${formData.proposedTerms || 'To be negotiated based on company valuation and terms.'}

4. TIMELINE
   ${formData.timeline || 'Investor intends to complete due diligence and finalize investment within 60-90 days of execution of definitive agreements.'}

5. CONDITIONS
   This LOI is subject to:
   - Completion of satisfactory due diligence
   - Execution of definitive investment documents
   - Approval by the Company's board of directors
   - Any other conditions mutually agreed upon

6. ADDITIONAL TERMS
   ${formData.additionalTerms || 'None at this time.'}

7. CONFIDENTIALITY
   The Investor acknowledges that all information provided by the Company is confidential and subject to the Non-Disclosure Agreement executed between the parties.

8. NON-BINDING NATURE
   This LOI is non-binding and does not create any legal obligation to complete the investment, except for the confidentiality provisions and the obligation to negotiate in good faith.

9. EXCLUSIVITY
   The Investor requests a [X] day exclusivity period to complete due diligence and negotiate definitive agreements.

10. NEXT STEPS
    Upon acceptance of this LOI, the parties agree to:
    - Proceed with due diligence
    - Negotiate definitive investment documents
    - Work toward closing the investment within the proposed timeline

---

This LOI expresses the Investor's serious interest in investing in Optimal Anarchy and becoming part of the team that defines the future of AI-native entertainment.

We look forward to working with you to finalize this investment opportunity.

Sincerely,

${formData.investorName || '[Investor Name]'}
${formData.investorTitle || ''}
${formData.investorCompany || ''}

Date: ${format(new Date(), 'MMMM dd, yyyy')}

---

ACCEPTANCE

Optimal Anarchy (Delaware C Corporation)

By: ___________________________
Name: ________________________
Title: _______________________
Date: ________________________`

  if (generated) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <Link href="/loi" className="text-hacker-green/70 hover:text-hacker-green transition-colors">
              ← Edit LOI
            </Link>
            <button
              onClick={() => {
                const blob = new Blob([loiContent], { type: 'text/plain' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `LOI-Optimal-Anarchy-${format(new Date(), 'yyyy-MM-dd')}.txt`
                a.click()
              }}
              className="hacker-button"
            >
              Download LOI
            </button>
          </div>

          <div className="hacker-card">
            <div className="mb-6">
              <h1 className="text-3xl font-bold hacker-glow mb-2">Letter of Intent</h1>
              <p className="text-sm text-hacker-green/60">
                Generated: {format(new Date(), 'MMMM dd, yyyy')}
              </p>
            </div>

            <div className="p-6 bg-hacker-darker border border-hacker-green/30">
              <pre className="text-sm text-hacker-green/90 whitespace-pre-wrap font-mono leading-relaxed">
                {loiContent}
              </pre>
            </div>

            <div className="mt-6 p-4 bg-hacker-green/10 border border-hacker-green/30">
              <p className="text-sm text-hacker-green/90 mb-2">
                <strong>Next Steps:</strong> Review the LOI, download and sign, then submit to Optimal Anarchy 
                via email or through the investor portal. Our team will review and respond within 48 hours.
              </p>
              <p className="text-sm text-yellow-400">
                <strong>⚡ Want faster processing?</strong> Submit a <Link href="/term-sheet" className="underline">Term Sheet</Link> instead 
                to move to the front of the line with priority processing.
              </p>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => {
                  const blob = new Blob([loiContent], { type: 'text/plain' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = `LOI-Optimal-Anarchy-${format(new Date(), 'yyyy-MM-dd')}.txt`
                  a.click()
                }}
                className="hacker-button flex-1"
              >
                Download LOI
              </button>
              <Link href="/" className="hacker-button">
                Return to Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-block mb-8 text-hacker-green/70 hover:text-hacker-green transition-colors">
          ← Back to Portal
        </Link>

        <div className="terminal-line mb-8">
          <span className="terminal-prompt">$</span> generate_loi --template optimal_anarchy
        </div>

        <div className="hacker-card mb-8">
          <h1 className="text-4xl font-bold hacker-glow mb-4">Letter of Intent</h1>
          <p className="text-hacker-green/80 mb-4">
            Create a Letter of Intent (LOI) to express your interest in investing in Optimal Anarchy. 
            This LOI positions you as a potential investor and initiates the investment discussion process.
          </p>
          <div className="p-4 bg-hacker-green/10 border border-hacker-green/30 mb-4">
            <p className="text-sm text-hacker-green/90">
              <strong>Note:</strong> This LOI is non-binding and serves as a preliminary expression of interest. 
              Final terms will be negotiated in definitive investment documents.
            </p>
          </div>
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/50">
            <p className="text-sm text-yellow-400 mb-2">
              <strong>⚡ Priority Processing:</strong>
            </p>
            <p className="text-sm text-hacker-green/90">
              <strong>LOI:</strong> Gets you in line for investment consideration and due diligence.<br/>
              <strong>Term Sheet:</strong> Moves you to the front of the line with priority processing and faster response times.
            </p>
            <Link href="/term-sheet" className="inline-block mt-3 text-yellow-400 hover:text-yellow-300 underline text-sm">
              Submit a Term Sheet instead for faster processing →
            </Link>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); generateLOI(); }} className="space-y-6">
          <div className="hacker-card">
            <h2 className="text-2xl font-bold mb-6">Investor Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Investor Name *</label>
                <input
                  type="text"
                  required
                  className="hacker-input w-full"
                  value={formData.investorName}
                  onChange={(e) => setFormData({...formData, investorName: e.target.value})}
                  placeholder="Full legal name"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Title / Role</label>
                  <input
                    type="text"
                    className="hacker-input w-full"
                    value={formData.investorTitle}
                    onChange={(e) => setFormData({...formData, investorTitle: e.target.value})}
                    placeholder="e.g., Managing Partner, CEO"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Company / Organization</label>
                  <input
                    type="text"
                    className="hacker-input w-full"
                    value={formData.investorCompany}
                    onChange={(e) => setFormData({...formData, investorCompany: e.target.value})}
                    placeholder="e.g., ABC Ventures"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Address</label>
                <textarea
                  className="hacker-input w-full h-24 resize-none"
                  value={formData.investorAddress}
                  onChange={(e) => setFormData({...formData, investorAddress: e.target.value})}
                  placeholder="Full mailing address"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Email Address</label>
                <input
                  type="email"
                  className="hacker-input w-full"
                  value={formData.investorEmail}
                  onChange={(e) => setFormData({...formData, investorEmail: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="hacker-card">
            <h2 className="text-2xl font-bold mb-6">Investment Terms</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Investment Amount *</label>
                <input
                  type="text"
                  required
                  className="hacker-input w-full"
                  value={formData.investmentAmount}
                  onChange={(e) => setFormData({...formData, investmentAmount: e.target.value})}
                  placeholder="e.g., $500,000 or $1M - $2M"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Investment Type</label>
                <select
                  className="hacker-input w-full"
                  value={formData.investmentType}
                  onChange={(e) => setFormData({...formData, investmentType: e.target.value})}
                >
                  <option value="equity">Equity Investment</option>
                  <option value="convertible">Convertible Note</option>
                  <option value="safe">SAFE (Simple Agreement for Future Equity)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Proposed Terms</label>
                <textarea
                  className="hacker-input w-full h-32 resize-none"
                  value={formData.proposedTerms}
                  onChange={(e) => setFormData({...formData, proposedTerms: e.target.value})}
                  placeholder="Any specific terms, valuation expectations, or conditions (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Proposed Timeline</label>
                <textarea
                  className="hacker-input w-full h-24 resize-none"
                  value={formData.timeline}
                  onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                  placeholder="e.g., Complete due diligence within 60 days, close within 90 days"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Additional Terms or Conditions</label>
                <textarea
                  className="hacker-input w-full h-32 resize-none"
                  value={formData.additionalTerms}
                  onChange={(e) => setFormData({...formData, additionalTerms: e.target.value})}
                  placeholder="Any additional terms, conditions, or requests (optional)"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="hacker-button flex-1">
              Generate Letter of Intent
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

