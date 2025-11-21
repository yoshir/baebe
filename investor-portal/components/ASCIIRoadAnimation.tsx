'use client'

import { useState, useEffect } from 'react'

interface ASCIIRoadAnimationProps {
  duration?: number
}

export default function ASCIIRoadAnimation({ duration = 5000 }: ASCIIRoadAnimationProps) {
  const [frame, setFrame] = useState(0)
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setFrame(prev => prev + 1)
    }, 100)

    const timeout = setTimeout(() => {
      setIsRunning(false)
    }, duration)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [isRunning, duration])

  // Road frames - creates illusion of forward movement
  const roadFrames = [
    `
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
    ║      ██  ██      ██      ██      ██  ██                 ║
    ║        ██  ██  ██          ██  ██  ██                   ║
    ║          ██  ██              ██  ██                      ║
    ║                                                           ║
    ║              ═══════════════════                          ║
    ║              ═══════════════════                          ║
    ║              ═══════════════════                          ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
    `,
    `
    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║                  ████████████████                        ║
    ║                ██              ██                         ║
    ║              ██    ██      ██    ██                       ║
    ║            ██    ██████  ██████    ██                     ║
    ║          ██    ██  ██  ██  ██  ██    ██                  ║
    ║        ██    ██    ██  ██    ██    ██  ██                ║
    ║      ██    ██      ██████      ██    ██  ██              ║
    ║    ██  ██        ██  ██        ██  ██                    ║
    ║    ██  ██      ██      ██      ██  ██                    ║
    ║      ██  ██  ██          ██  ██  ██                     ║
    ║        ██  ██              ██  ██                        ║
    ║                                                           ║
    ║            ═══════════════════                            ║
    ║            ═══════════════════                            ║
    ║            ═══════════════════                            ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
    `,
    `
    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║                ████████████████                           ║
    ║              ██              ██                             ║
    ║            ██    ██      ██    ██                          ║
    ║          ██    ██████  ██████    ██                        ║
    ║        ██    ██  ██  ██  ██  ██    ██                     ║
    ║      ██    ██    ██  ██    ██    ██  ██                   ║
    ║    ██    ██      ██████      ██    ██  ██                 ║
    ║  ██  ██        ██  ██        ██  ██                      ║
    ║  ██  ██      ██      ██      ██  ██                      ║
    ║    ██  ██  ██          ██  ██  ██                        ║
    ║      ██  ██              ██  ██                           ║
    ║                                                           ║
    ║          ═══════════════════                              ║
    ║          ═══════════════════                              ║
    ║          ═══════════════════                              ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
    `
  ]

  // Road with moving perspective - creates forward movement illusion
  const generateRoadFrame = (offset: number) => {
    const roadLines = []
    const centerX = 30
    const maxWidth = 20
    const numLines = 18
    
    for (let i = 0; i < numLines; i++) {
      const distance = (i + offset) % numLines
      const normalizedDistance = distance / numLines
      const roadWidth = Math.max(2, maxWidth * (1 - normalizedDistance * 0.8))
      const leftEdge = Math.floor(centerX - roadWidth / 2)
      const rightEdge = Math.ceil(centerX + roadWidth / 2)
      
      let line = '║'
      for (let j = 0; j < 60; j++) {
        if (j < leftEdge || j > rightEdge) {
          line += '░' // Roadside
        } else if (i % 4 === 0 && j === centerX) {
          line += '│' // Center line dashes
        } else {
          line += ' ' // Road surface
        }
      }
      line += '║'
      roadLines.push(line)
    }
    
    return `
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
${roadLines.join('\n')}
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `
  }

  const roadFrame = generateRoadFrame(frame * 0.2)

  return (
    <div className="font-mono text-hacker-green text-xs leading-tight whitespace-pre" style={{ fontFamily: "'VT323', monospace" }}>
      {roadFrame}
    </div>
  )
}

