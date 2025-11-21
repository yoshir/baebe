'use client'

import { useState, useEffect } from 'react'

interface ASCIIArtSequenceProps {
  type: 'mystery_unlocked' | 'character' | 'system' | 'world'
  mysteryNumber?: number
  characterName?: string
}

export default function ASCIIArtSequence({ 
  type, 
  mysteryNumber,
  characterName 
}: ASCIIArtSequenceProps) {
  const [currentLine, setCurrentLine] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const asciiArt = {
    mystery_unlocked: `
    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║  ███╗   ███╗██╗   ██╗███████╗████████╗███████╗██████╗     ║
    ║  ████╗ ████║╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔════╝██╔══██╗    ║
    ║  ██╔████╔██║ ╚████╔╝ ███████╗   ██║   █████╗  ██████╔╝    ║
    ║  ██║╚██╔╝██║  ╚██╔╝  ╚════██║   ██║   ██╔══╝  ██╔══██╗    ║
    ║  ██║ ╚═╝ ██║   ██║   ███████║   ██║   ███████╗██║  ██║    ║
    ║  ╚═╝     ╚═╝   ╚═╝   ╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝    ║
    ║                                                           ║
    ║  ██╗   ██╗██╗ ██████╗████████╗ ██████╗ ██████╗ ██╗   ██╗  ║
    ║  ██║   ██║██║██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗╚██╗ ██╔╝  ║
    ║  ██║   ██║██║██║        ██║   ██║   ██║██████╔╝ ╚████╔╝   ║
    ║  ╚██╗ ██╔╝██║██║        ██║   ██║   ██║██╔══██╗  ╚██╔╝    ║
    ║   ╚████╔╝ ██║╚██████╗   ██║   ╚██████╔╝██║  ██║   ██║     ║
    ║    ╚═══╝  ╚═╝ ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝   ╚═╝     ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
    `,
    character: `
    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║                    ████████████████                      ║
    ║                  ██              ██                        ║
    ║                ██    ██      ██    ██                    ║
    ║              ██    ██████  ██████    ██                  ║
    ║            ██    ██  ██  ██  ██  ██    ██                ║
    ║          ██    ██    ██  ██    ██    ██  ██              ║
    ║        ██    ██      ██████      ██    ██  ██            ║
    ║      ██  ██        ██  ██        ██  ██                  ║
    ║      ██  ██      ██      ██      ██  ██                   ║
    ║        ██  ██  ██          ██  ██  ██                     ║
    ║          ██  ██              ██  ██                      ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
    `,
    system: `
    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║          ╔═══════════════════════╗                       ║
    ║          ║      O1 NETWORK       ║                       ║
    ║          ║      CORE SYSTEM      ║                       ║
    ║          ╚═══════╦═══════════════╝                       ║
    ║                  │                                         ║
    ║        ┌─────────┼─────────┐                              ║
    ║        │         │         │                               ║
    ║     ╔══╧══╗   ╔══╧══╗   ╔══╧══╗                            ║
    ║     ║Node ║   ║Node ║   ║Node ║                            ║
    ║     ║ #1  ║   ║ #2  ║   ║ #3  ║                            ║
    ║     ╚═════╝   ╚═════╝   ╚═════╝                            ║
    ║        │         │         │                               ║
    ║        ▼         ▼         ▼                               ║
    ║     ┌─────┐   ┌─────┐   ┌─────┐                             ║
    ║     │User │   │User │   │User │                            ║
    ║     │ #1  │   │ #2  │   │ #3  │                            ║
    ║     └─────┘   └─────┘   └─────┘                             ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
    `,
    world: `
    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║  BAEBE WORLD MAP                                          ║
    ║                                                           ║
    ║      [O1 TOWER]                                           ║
    ║           │                                                ║
    ║           │                                                ║
    ║           ▼                                                ║
    ║      [UNDERCITY]                                          ║
    ║           │                                                ║
    ║           │                                                ║
    ║           ▼                                                ║
    ║    [SANCTUARY ZONES]                                      ║
    ║                                                           ║
    ║  O1 Zones: ████████████ (75% converted)                  ║
    ║  Free Zones: ████ (25% remaining)                         ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
    `
  }

  const art = asciiArt[type] || asciiArt.mystery_unlocked
  const lines = art.split('\n').filter(line => line.trim())

  useEffect(() => {
    if (currentLine >= lines.length) {
      setIsComplete(true)
      return
    }

    const timer = setTimeout(() => {
      setCurrentLine(prev => prev + 1)
    }, 50) // Scroll speed

    return () => clearTimeout(timer)
  }, [currentLine, lines.length])

  return (
    <div className="font-mono text-hacker-green text-xs leading-tight whitespace-pre overflow-hidden" style={{ fontFamily: "'VT323', monospace" }}>
      {lines.slice(0, currentLine).map((line, i) => (
        <div key={i} className="animate-fade-in">
          {line}
        </div>
      ))}
      {!isComplete && (
        <span className="text-hacker-green animate-pulse">▊</span>
      )}
    </div>
  )
}



