'use client'

import { useState, useEffect } from 'react'

interface TypingItem {
  text: string
  delay: number
  type: 'command' | 'comment' | 'output' | 'text' | 'newline'
}

interface TypingAnimationProps {
  content: TypingItem[]
  onComplete?: () => void
}

export default function TypingAnimation({ content, onComplete }: TypingAnimationProps) {
  const [displayedContent, setDisplayedContent] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex >= content.length) {
      setIsComplete(true)
      if (onComplete) {
        setTimeout(onComplete, 1000)
      }
      return
    }

    const item = content[currentIndex]
    
    const timeout = setTimeout(() => {
      if (item.type === 'newline') {
        setDisplayedContent(prev => prev + '<br>')
      } else if (item.type === 'command') {
        setDisplayedContent(prev => prev + `<span class="text-hacker-green"><span class="opacity-70">$</span> <span>${item.text.replace('$ ', '')}</span></span><br>`)
      } else if (item.type === 'comment') {
        setDisplayedContent(prev => prev + `<span class="text-hacker-green/60">${item.text}</span><br>`)
      } else if (item.type === 'output') {
        setDisplayedContent(prev => prev + `<span class="text-hacker-green">${item.text}</span><br>`)
      } else {
        // Regular text - append to last line
        setDisplayedContent(prev => {
          const lines = prev.split('<br>')
          const lastLine = lines[lines.length - 2] || ''
          lines[lines.length - 2] = lastLine + item.text
          return lines.join('<br>') + '<br>'
        })
      }
      
      setCurrentIndex(prev => prev + 1)
    }, item.delay)

    return () => clearTimeout(timeout)
  }, [currentIndex, content, onComplete])

  return (
    <div className="font-mono text-hacker-green text-base leading-relaxed" style={{ fontFamily: "'VT323', monospace" }}>
      <div 
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: displayedContent }}
      />
      {!isComplete && (
        <span className="inline-block w-0.5 h-4 bg-hacker-green animate-pulse ml-1">|</span>
      )}
    </div>
  )
}

