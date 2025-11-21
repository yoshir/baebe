'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { fullPitchContent } from '@/lib/pitchContent'

export default function PitchPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')

  useEffect(() => {
    const storedEmail = localStorage.getItem('investorEmail')
    const confirmed = localStorage.getItem('emailConfirmed')
    
    if (!storedEmail || confirmed !== 'true') {
      router.push('/')
      return
    }
    
    setEmail(storedEmail)
  }, [router])

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="terminal-line mb-2">
            <span className="terminal-prompt">$</span> cat full_pitch.md
          </div>
          <p className="text-sm text-hacker-green/60">
            Email: {email}
          </p>
        </div>

        {/* Full Pitch Content */}
        <div className="hacker-card prose prose-invert max-w-none mb-8">
          <div className="markdown-content text-hacker-green/90">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-4xl font-bold hacker-glow mb-6 mt-8" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-3xl font-bold hacker-glow mb-4 mt-6 border-b border-hacker-green/30 pb-2" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-2xl font-bold mb-3 mt-4" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-2 ml-4" {...props} />,
                li: ({node, ...props}) => <li className="text-hacker-green/80" {...props} />,
                strong: ({node, ...props}) => <strong className="text-hacker-green hacker-glow" {...props} />,
                code: ({node, ...props}) => <code className="bg-hacker-darker px-2 py-1 border border-hacker-green/30 text-hacker-green" {...props} />,
                hr: ({node, ...props}) => <hr className="border-hacker-green/30 my-8" {...props} />,
              }}
            >
              {fullPitchContent}
            </ReactMarkdown>
          </div>
        </div>

        {/* Call to Action */}
        <div className="hacker-card text-center border-yellow-500/50 border-2 mb-8">
          <h3 className="text-2xl font-bold hacker-glow mb-4">Next Steps</h3>
          <p className="text-hacker-green/80 mb-6">
            Ready to move forward? Choose your path:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/signup" className="hacker-button">
              Sign NDA & Read IP Excerpt
            </Link>
            <Link href="/term-sheet" className="hacker-button border-yellow-500/50 hover:border-yellow-500">
              Send Term Sheet
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
