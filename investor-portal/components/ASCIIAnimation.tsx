'use client'

import { useState, useEffect } from 'react'
import { getASCIIArt } from './ASCIIArtGallery'

interface ASCIIAnimationProps {
  type: 'glitch' | 'loading' | 'frequency' | 'scan' | 'unlock'
  duration?: number
  onComplete?: () => void
}

export default function ASCIIAnimation({ 
  type, 
  duration = 3000,
  onComplete 
}: ASCIIAnimationProps) {
  const [frame, setFrame] = useState(0)
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    if (!isRunning) return

    // For scan animation, use faster updates for smoother progress bar
    const intervalTime = type === 'scan' ? 50 : 100
    const interval = setInterval(() => {
      setFrame(prev => prev + 1)
    }, intervalTime)

    const timeout = setTimeout(() => {
      setIsRunning(false)
      if (onComplete) {
        onComplete()
      }
    }, duration)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [isRunning, duration, onComplete, type])

  const renderAnimation = () => {
    switch (type) {
      case 'glitch':
        return renderGlitch(frame)
      case 'loading':
        return renderLoading(frame)
      case 'frequency':
        return renderFrequency(frame)
      case 'scan':
        return renderScan(frame)
      case 'unlock':
        return renderUnlock(frame)
      default:
        return ''
    }
  }

  return (
    <div className="font-mono text-hacker-green text-xs leading-tight whitespace-pre" style={{ fontFamily: "'VT323', monospace" }}>
      {renderAnimation()}
    </div>
  )
}

function renderGlitch(frame: number) {
  const glitchChars = ['█', '▓', '▒', '░', ' ', '║', '╗', '╝', '╚', '╔']
  const lines = getASCIIArt('glitch').split('\n')
  
  return lines.map((line, i) => {
    if (frame % 3 === 0 && i > 2 && i < lines.length - 2) {
      const chars = line.split('')
      const glitchCount = Math.floor(Math.random() * 5)
      for (let j = 0; j < glitchCount; j++) {
        const pos = Math.floor(Math.random() * chars.length)
        chars[pos] = glitchChars[Math.floor(Math.random() * glitchChars.length)]
      }
      return chars.join('')
    }
    return line
  }).join('\n')
}

function renderLoading(frame: number) {
  const dots = '.'.repeat((frame % 4))
  return `
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║              LOADING${dots.padEnd(3, ' ')}                          ║
║                                                           ║
║              [${'█'.repeat((frame % 20) / 2).padEnd(10, '░')}]              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `
}

function renderFrequency(frame: number) {
  const waveHeight = Math.sin(frame * 0.2) * 10 + 10
  const bars = Math.floor(waveHeight / 2)
  return `
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║  Frequency: ${'▓'.repeat(bars).padEnd(20, '░')}  ║
║                                                           ║
║        ${'▁'.repeat(Math.floor(Math.sin(frame * 0.1) * 10 + 10))}                                    ║
║      ${'▂'.repeat(Math.floor(Math.sin(frame * 0.1 + 0.5) * 10 + 10))}                                    ║
║    ${'▃'.repeat(Math.floor(Math.sin(frame * 0.1 + 1) * 10 + 10))}                                    ║
║  ${'▄'.repeat(Math.floor(Math.sin(frame * 0.1 + 1.5) * 10 + 10))}                                    ║
║                                                           ║
║  Resonance: ${'█'.repeat(bars).padEnd(20, '░')}  ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `
}

function renderScan(frame: number) {
  // Calculate progress from 0 to 100 over 3 seconds (60 frames at 50ms per frame)
  const totalFrames = 60 // 3 seconds at 50ms per frame
  const progress = Math.min(100, Math.floor((frame / totalFrames) * 100))
  const barWidth = 40
  const filled = Math.floor((progress / 100) * barWidth)
  const empty = barWidth - filled
  
  // Create progress bar like npm: [████████░░░░░░░░░░░░] 40%
  const progressBar = '█'.repeat(filled) + '░'.repeat(empty)
  
  // Scanning messages that change as progress increases
  let status = 'Initializing scan...'
  if (progress > 20) status = 'Scanning network nodes...'
  if (progress > 40) status = 'Analyzing data streams...'
  if (progress > 60) status = 'Detecting mysteries...'
  if (progress > 80) status = 'Finalizing results...'
  if (progress >= 100) status = 'Scan complete!'
  
  return `
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║                    SCANNING SYSTEM...                     ║
║                                                           ║
║  ${status.padEnd(55)} ║
║                                                           ║
║  [${progressBar}] ${progress.toString().padStart(3, ' ')}% ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `
}

function renderUnlock(frame: number) {
  const progress = Math.min(100, (frame * 5))
  return `
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║              UNLOCKING MYSTERY...                         ║
║                                                           ║
║              [${'█'.repeat(Math.floor(progress / 5)).padEnd(20, '░')}]              ║
║                                                           ║
║              ${progress.toString().padStart(3, ' ')}% Complete                          ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `
}


