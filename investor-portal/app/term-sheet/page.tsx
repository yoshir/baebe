'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'

export default function TermSheetPage() {
  const router = useRouter()
  
  useEffect(() => {
    const confirmed = localStorage.getItem('emailConfirmed')
    if (confirmed !== 'true') {
      router.push('/')
    }
  }, [router])

  const [formData, setFormData] = useState({
    investorName: '',
    investorTitle: '',
    investorCompany: '',
    investorAddress: '',
    investorEmail: '',
    investmentAmount: '',
    valuation: '',
    investmentType: 'equity',
    equityPercentage: '',
    liquidationPreference: '1x',
    participationRights: 'non-participating',
    antiDilution: 'none',
    boardSeats: '0',
    proRataRights: false,
    informationRights: false,
    coSaleRights: false,
    dragAlongRights: false,
    vestingSchedule: '',
    closingDate: '',
    conditions: '',
    additionalTerms: '',
  })
  const [generated, setGenerated] = useState(false)

  const generateTermSheet = () => {
    if (!formData.investorName || !formData.investmentAmount || !formData.valuation) {
      alert('Please fill in required fields (Investor Name, Investment Amount, and Valuation)')
      return
    }
    setGenerated(true)
  }

  const termSheetContent = `TERM SHEET
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

RE: Term Sheet for Investment in Optimal Anarchy

Dear Optimal Anarchy Team,

This Term Sheet sets forth the proposed terms and conditions for an investment by ${formData.investorName || '[Investor Name]'}${formData.investorCompany ? ` (on behalf of ${formData.investorCompany})` : ''} (the "Investor") in Optimal Anarchy, a Delaware C Corporation (the "Company").

**PRIORITY PROCESSING:** Submission of this Term Sheet provides priority processing and moves the Investor to the front of the line for investment consideration, due diligence, and closing.

---

## 1. INVESTMENT AMOUNT
   The Investor proposes to invest ${formData.investmentAmount || '[Amount]'} in the Company.

## 2. VALUATION
   ${formData.valuation ? `Pre-money valuation: ${formData.valuation}` : '[Valuation to be specified]'}
   ${formData.equityPercentage ? `Post-investment equity: ${formData.equityPercentage}%` : ''}

## 3. INVESTMENT STRUCTURE
   - Investment Type: ${formData.investmentType === 'equity' ? 'Equity Investment' : formData.investmentType === 'convertible' ? 'Convertible Note' : formData.investmentType === 'safe' ? 'SAFE (Simple Agreement for Future Equity)' : 'Equity Investment'}
   - Company Structure: Delaware C Corporation
   - IP Ownership: All IP owned by Optimal Anarchy; Investor receives equity stake in the company
   - Investor Rights: As part owners of the company, investors have a stake in the IP portfolio

## 4. SECURITY TYPE
   ${formData.investmentType === 'equity' ? 'Series [X] Preferred Stock' : formData.investmentType === 'convertible' ? 'Convertible Note' : formData.investmentType === 'safe' ? 'SAFE' : 'Preferred Stock'}

## 5. LIQUIDATION PREFERENCE
   ${formData.liquidationPreference || '1x'} non-participating liquidation preference

## 6. PARTICIPATION RIGHTS
   ${formData.participationRights === 'participating' ? 'Participating preferred (double-dip)' : 'Non-participating preferred'}

## 7. ANTI-DILUTION PROTECTION
   ${formData.antiDilution === 'none' ? 'None' : formData.antiDilution === 'broad' ? 'Broad-based weighted average' : formData.antiDilution === 'narrow' ? 'Narrow-based weighted average' : formData.antiDilution === 'full' ? 'Full ratchet' : 'None'}

## 8. BOARD RIGHTS
   ${formData.boardSeats === '0' ? 'No board seat' : formData.boardSeats === '1' ? 'One board seat' : `${formData.boardSeats} board seats`}
   ${formData.boardSeats !== '0' ? 'Board observer rights' : ''}

## 9. INVESTOR RIGHTS
   ${formData.proRataRights ? '✓ Pro rata rights for future rounds' : 'No pro rata rights'}
   ${formData.informationRights ? '✓ Information rights (financial statements, cap table)' : 'No information rights'}
   ${formData.coSaleRights ? '✓ Co-sale rights' : 'No co-sale rights'}
   ${formData.dragAlongRights ? '✓ Drag-along rights' : 'No drag-along rights'}

## 10. VESTING
   ${formData.vestingSchedule || 'Standard 4-year vesting with 1-year cliff (if applicable)'}

## 11. CLOSING CONDITIONS
   This investment is subject to:
   - Completion of satisfactory due diligence
   - Execution of definitive investment documents
   - Approval by the Company's board of directors
   - ${formData.conditions || 'Any other conditions mutually agreed upon'}

## 12. PROPOSED CLOSING DATE
   ${formData.closingDate || 'Within 60-90 days of execution of definitive agreements'}

## 13. ADDITIONAL TERMS
   ${formData.additionalTerms || 'None at this time.'}

## 14. CONFIDENTIALITY
   The Investor acknowledges that all information provided by the Company is confidential and subject to the Non-Disclosure Agreement executed between the parties.

## 15. BINDING AND NON-BINDING PROVISIONS
   This Term Sheet is non-binding except for:
   - Confidentiality provisions (Section 14)
   - Exclusivity provisions (if any)
   - The obligation to negotiate in good faith toward definitive agreements

   All other terms are non-binding and subject to negotiation in definitive investment documents.

## 16. PRIORITY PROCESSING
   By submitting this Term Sheet, the Investor acknowledges that:
   - This Term Sheet provides priority processing over LOI submissions
   - The Company will prioritize review and response to this Term Sheet
   - Due diligence and closing will be expedited for Term Sheet submissions
   - The Investor moves to the front of the investment consideration queue

## 17. NEXT STEPS
   Upon acceptance of this Term Sheet, the parties agree to:
   - Proceed immediately with due diligence (priority processing)
   - Negotiate definitive investment documents on an expedited timeline
   - Work toward closing the investment within the proposed timeline
   - Provide priority access to IP review, financials, and founder discussions

---

This Term Sheet expresses the Investor's serious interest in investing in Optimal Anarchy and becoming part of the team that defines the future of AI-native entertainment.

**By submitting a Term Sheet, the Investor receives priority processing and moves to the front of the investment consideration queue.**

We look forward to working with you to finalize this investment opportunity on an expedited basis.

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
Date: ________________________

---

**PRIORITY PROCESSING ACKNOWLEDGMENT**

By submitting this Term Sheet, the Investor understands that:
- Term Sheet submissions receive priority processing over LOI submissions
- Response time will be expedited (typically within 24-48 hours)
- Due diligence will be prioritized
- Closing timeline will be accelerated
- Access to IP review and financials will be prioritized`

  if (generated) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <Link href="/term-sheet" className="text-hacker-green/70 hover:text-hacker-green transition-colors">
              ← Edit Term Sheet
            </Link>
            <button
              onClick={() => {
                const blob = new Blob([termSheetContent], { type: 'text/plain' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `Term-Sheet-Optimal-Anarchy-${format(new Date(), 'yyyy-MM-dd')}.txt`
                a.click()
              }}
              className="hacker-button"
            >
              Download Term Sheet
            </button>
          </div>

          <div className="hacker-card mb-6 border-yellow-500/50 border-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-500 text-2xl">⚡</span>
              <h2 className="text-2xl font-bold text-yellow-500">Priority Processing</h2>
            </div>
            <p className="text-hacker-green/90 mb-2">
              <strong>Term Sheet submissions receive priority processing:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-hacker-green/80 ml-4">
              <li>Expedited response time (typically 24-48 hours)</li>
              <li>Priority due diligence scheduling</li>
              <li>Accelerated closing timeline</li>
              <li>Priority access to IP review and financials</li>
              <li>Moves to front of investment consideration queue</li>
            </ul>
          </div>

          <div className="hacker-card">
            <div className="mb-6">
              <h1 className="text-3xl font-bold hacker-glow mb-2">Term Sheet</h1>
              <p className="text-sm text-hacker-green/60">
                Generated: {format(new Date(), 'MMMM dd, yyyy')}
              </p>
            </div>

            <div className="p-6 bg-hacker-darker border border-hacker-green/30">
              <pre className="text-sm text-hacker-green/90 whitespace-pre-wrap font-mono leading-relaxed">
                {termSheetContent}
              </pre>
            </div>

            <div className="mt-6 p-4 bg-hacker-green/10 border border-hacker-green/30">
              <p className="text-sm text-hacker-green/90">
                <strong>Next Steps:</strong> Review the Term Sheet, download and sign, then submit to Optimal Anarchy 
                via email or through the investor portal. Our team will prioritize review and respond within 24-48 hours.
              </p>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => {
                  const blob = new Blob([termSheetContent], { type: 'text/plain' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = `Term-Sheet-Optimal-Anarchy-${format(new Date(), 'yyyy-MM-dd')}.txt`
                  a.click()
                }}
                className="hacker-button flex-1"
              >
                Download Term Sheet
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
        <Link href="/pitch" className="inline-block mb-8 text-hacker-green/70 hover:text-hacker-green transition-colors">
          ← Back to Pitch
        </Link>

        <div className="terminal-line mb-8">
          <span className="terminal-prompt">$</span> generate_term_sheet --priority
        </div>

        <div className="hacker-card mb-8 border-yellow-500/50 border-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-500 text-2xl">⚡</span>
            <h1 className="text-4xl font-bold text-yellow-500">Term Sheet</h1>
          </div>
          <p className="text-hacker-green/80 mb-4">
            Create a Term Sheet to express your investment interest with <strong className="text-yellow-500">priority processing</strong>. 
            Term Sheet submissions move to the front of the line and receive expedited review and response.
          </p>
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 mb-4">
            <p className="text-sm text-yellow-400 mb-2">
              <strong>⚡ Priority Processing Benefits:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-hacker-green/90 ml-4">
              <li>Expedited response time (24-48 hours vs. standard processing)</li>
              <li>Priority due diligence scheduling</li>
              <li>Accelerated closing timeline</li>
              <li>Priority access to IP review and financials</li>
              <li>Moves to front of investment consideration queue</li>
            </ul>
          </div>
          <div className="p-4 bg-hacker-green/10 border border-hacker-green/30">
            <p className="text-sm text-hacker-green/90">
              <strong>Note:</strong> This Term Sheet is non-binding except for confidentiality and exclusivity provisions. 
              Final terms will be negotiated in definitive investment documents. Term Sheets receive priority processing over LOI submissions.
            </p>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); generateTermSheet(); }} className="space-y-6">
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
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Investment Amount *</label>
                  <input
                    type="text"
                    required
                    className="hacker-input w-full"
                    value={formData.investmentAmount}
                    onChange={(e) => setFormData({...formData, investmentAmount: e.target.value})}
                    placeholder="e.g., $500,000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Pre-Money Valuation *</label>
                  <input
                    type="text"
                    required
                    className="hacker-input w-full"
                    value={formData.valuation}
                    onChange={(e) => setFormData({...formData, valuation: e.target.value})}
                    placeholder="e.g., $10M"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
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
                  <label className="block text-sm font-bold mb-2">Post-Investment Equity %</label>
                  <input
                    type="text"
                    className="hacker-input w-full"
                    value={formData.equityPercentage}
                    onChange={(e) => setFormData({...formData, equityPercentage: e.target.value})}
                    placeholder="e.g., 5%"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Liquidation Preference</label>
                  <select
                    className="hacker-input w-full"
                    value={formData.liquidationPreference}
                    onChange={(e) => setFormData({...formData, liquidationPreference: e.target.value})}
                  >
                    <option value="1x">1x Non-Participating</option>
                    <option value="1x-participating">1x Participating</option>
                    <option value="2x">2x Non-Participating</option>
                    <option value="2x-participating">2x Participating</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Anti-Dilution Protection</label>
                  <select
                    className="hacker-input w-full"
                    value={formData.antiDilution}
                    onChange={(e) => setFormData({...formData, antiDilution: e.target.value})}
                  >
                    <option value="none">None</option>
                    <option value="broad">Broad-Based Weighted Average</option>
                    <option value="narrow">Narrow-Based Weighted Average</option>
                    <option value="full">Full Ratchet</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Board Seats</label>
                <select
                  className="hacker-input w-full"
                  value={formData.boardSeats}
                  onChange={(e) => setFormData({...formData, boardSeats: e.target.value})}
                >
                  <option value="0">No board seat</option>
                  <option value="1">One board seat</option>
                  <option value="observer">Board observer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-4">Investor Rights</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-5 h-5 border-hacker-green bg-transparent"
                      checked={formData.proRataRights}
                      onChange={(e) => setFormData({...formData, proRataRights: e.target.checked})}
                    />
                    <span className="text-sm text-hacker-green/80">Pro rata rights for future rounds</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-5 h-5 border-hacker-green bg-transparent"
                      checked={formData.informationRights}
                      onChange={(e) => setFormData({...formData, informationRights: e.target.checked})}
                    />
                    <span className="text-sm text-hacker-green/80">Information rights (financial statements, cap table)</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-5 h-5 border-hacker-green bg-transparent"
                      checked={formData.coSaleRights}
                      onChange={(e) => setFormData({...formData, coSaleRights: e.target.checked})}
                    />
                    <span className="text-sm text-hacker-green/80">Co-sale rights</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-5 h-5 border-hacker-green bg-transparent"
                      checked={formData.dragAlongRights}
                      onChange={(e) => setFormData({...formData, dragAlongRights: e.target.checked})}
                    />
                    <span className="text-sm text-hacker-green/80">Drag-along rights</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Vesting Schedule (if applicable)</label>
                <input
                  type="text"
                  className="hacker-input w-full"
                  value={formData.vestingSchedule}
                  onChange={(e) => setFormData({...formData, vestingSchedule: e.target.value})}
                  placeholder="e.g., 4-year vesting with 1-year cliff"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Proposed Closing Date</label>
                <input
                  type="text"
                  className="hacker-input w-full"
                  value={formData.closingDate}
                  onChange={(e) => setFormData({...formData, closingDate: e.target.value})}
                  placeholder="e.g., Within 60-90 days"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Closing Conditions</label>
                <textarea
                  className="hacker-input w-full h-24 resize-none"
                  value={formData.conditions}
                  onChange={(e) => setFormData({...formData, conditions: e.target.value})}
                  placeholder="Any specific closing conditions or requirements"
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
            <button type="submit" className="hacker-button flex-1 border-yellow-500/50 hover:border-yellow-500">
              Generate Term Sheet (Priority Processing)
            </button>
            <Link href="/loi" className="hacker-button">
              Or Create LOI Instead
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}


