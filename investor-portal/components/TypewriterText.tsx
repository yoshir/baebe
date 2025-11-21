'use client'

import { useState, useEffect } from 'react'

interface TypewriterTextProps {
  text: string
  speed?: number
  onComplete?: () => void
  className?: string
  showCursor?: boolean
}

export default function TypewriterText({ 
  text, 
  speed = 30, 
  onComplete,
  className = '',
  showCursor = true
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!text || text.length === 0) {
      setIsComplete(true)
      if (onComplete) {
        setTimeout(onComplete, 100)
      }
      return
    }

    if (displayedText.length >= text.length) {
      setIsComplete(true)
      if (onComplete) {
        setTimeout(onComplete, 100)
      }
      return
    }

    const timer = setTimeout(() => {
      setDisplayedText(text.slice(0, displayedText.length + 1))
    }, speed)

    return () => clearTimeout(timer)
  }, [displayedText, text, speed, onComplete])

  return (
    <span className={className} style={{ fontFamily: "'VT323', monospace" }}>
      {displayedText}
      {showCursor && !isComplete && (
        <span className="inline-block w-0.5 h-4 bg-hacker-green animate-pulse ml-1">|</span>
      )}
    </span>
  )
}

