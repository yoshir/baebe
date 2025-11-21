'use client'

import { useState, useEffect, useRef } from 'react'
import TypewriterText from './TypewriterText'
import { generateASCIIArt } from './ASCIIArtGenerator'
import { getASCIIArt } from './ASCIIArtGallery'
import { playKeystrokeSound, playActionSound, initAudioContext, playModemStaticSound } from '../utils/audioUtils'

interface IntroSequenceProps {
  onComplete: () => void
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [phase, setPhase] = useState<'cursor' | 'press-key' | 'presented' | 'glitch' | 'complete'>('cursor')
  const [showCursor, setShowCursor] = useState(true)
  const [skipRequested, setSkipRequested] = useState(false)
  const blinkCountRef = useRef(0)
  const [typedText, setTypedText] = useState('')
  const [typingComplete, setTypingComplete] = useState(false)
  
  // State for "presented" phase animation
  const [companyVisible, setCompanyVisible] = useState(false)
  const [presentsVisible, setPresentsVisible] = useState(false)
  const [baebeVisible, setBaebeVisible] = useState(false)
  const [baebeLinesVisible, setBaebeLinesVisible] = useState(0)
  const [glitchActive, setGlitchActive] = useState(false)
  const [breachMessage, setBreachMessage] = useState(false)
  const [threatStream, setThreatStream] = useState<Array<{ text: string; type: 'o1' | 'hacker' }>>([])
  const [accessGranted, setAccessGranted] = useState(false)
  const battleIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const baebeRevealIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const glitchCompleteRef = useRef(false)
  const sequenceInitializedRef = useRef(false)

  // Initialize audio context on mount
  useEffect(() => {
    initAudioContext()
  }, [])

  // Blinking cursor - always blinking in upper left
  useEffect(() => {
    if (phase === 'cursor' || phase === 'press-key') {
      const interval = setInterval(() => {
        setShowCursor(prev => {
          if (!prev) {
            // Play subtle sound on cursor appear
            playKeystrokeSound(0.1)
          }
          return !prev
        })
      }, 500) // 500ms per toggle = 1 second per blink cycle

      return () => clearInterval(interval)
    }
    return () => {} // Always return cleanup function
  }, [phase])

  // Move to press-key phase after 3 blinks (3 seconds)
  useEffect(() => {
    if (phase === 'cursor' && !skipRequested) {
      blinkCountRef.current = 0
      const blinkInterval = setInterval(() => {
        blinkCountRef.current++
        if (blinkCountRef.current >= 6) { // 6 toggles = 3 blinks (on+off each)
          clearInterval(blinkInterval)
          setPhase('press-key')
        }
      }, 500) // Check every 500ms

      return () => clearInterval(blinkInterval)
    }
    return () => {} // Always return cleanup function
  }, [phase, skipRequested])

  // Type out "Press any key to continue..." character by character
  useEffect(() => {
    if (phase === 'press-key' && !skipRequested) {
      const text = 'Press any key to continue...'
      setTypedText('')
      setTypingComplete(false)
      
      let index = 0
      const typingInterval = setInterval(() => {
        if (index < text.length) {
          setTypedText(text.substring(0, index + 1))
          // Play subtle sound for each character (skip spaces)
          if (text[index] !== ' ') {
            playKeystrokeSound(0.08)
          }
          index++
        } else {
          clearInterval(typingInterval)
          setTypingComplete(true)
        }
      }, 50) // 50ms per character for typing effect

      return () => clearInterval(typingInterval)
    } else {
      setTypedText('')
      setTypingComplete(false)
    }
    return () => {} // Always return cleanup function
  }, [phase, skipRequested])

  // Skip on any key press or click
  useEffect(() => {
    const handleInteraction = () => {
      if (phase === 'cursor' || phase === 'press-key') {
        playActionSound(0.2) // Slightly more prominent sound for user action
        setSkipRequested(true)
        setPhase('presented')
      }
    }

    window.addEventListener('keydown', handleInteraction)
    window.addEventListener('click', handleInteraction)
    window.addEventListener('touchstart', handleInteraction)

    return () => {
      window.removeEventListener('keydown', handleInteraction)
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
    }
  }, [phase])

  // Move to presented phase after press-key (or immediately if skipped)
  useEffect(() => {
    if (phase === 'press-key') {
      if (skipRequested) {
        setPhase('presented')
        return () => {} // Always return cleanup function
      } else {
        // Wait for user to press key, or auto-advance after a delay
        const timer = setTimeout(() => {
          setPhase('presented')
        }, 5000) // Auto-advance after 5 seconds if no key pressed
        return () => clearTimeout(timer)
      }
    }
    return () => {} // Always return cleanup function
  }, [phase, skipRequested])

  // Glitch effect is now handled by the main sequence timer
  // (Company -> Presents -> Baebe -> wait -> glitch -> breach -> hacker battle)
  // No automatic transition needed here

  // Complete after glitch - handled by glitchCompleteRef to prevent duplicate calls
  useEffect(() => {
    // Reset ref when phase changes away from glitch
    if (phase !== 'glitch') {
      glitchCompleteRef.current = false
      return () => {} // Always return cleanup function
    }
    
    if (phase === 'glitch' && !glitchCompleteRef.current) {
      glitchCompleteRef.current = true
      const timer = setTimeout(() => {
        setPhase('complete')
        onComplete()
      }, 2000) // Glitch for 2 seconds
      return () => clearTimeout(timer)
    }
    return () => {} // Always return cleanup function
  }, [phase, onComplete])

  // Sequence: Company -> Presents -> Baebe -> Glitch -> Breach -> Threats
  useEffect(() => {
    const timers: NodeJS.Timeout[] = []
    
    if (phase !== 'presented') {
      // Reset when not in presented phase
      sequenceInitializedRef.current = false
      setCompanyVisible(false)
      setPresentsVisible(false)
      setBaebeVisible(false)
      setBaebeLinesVisible(0)
      setGlitchActive(false)
      setBreachMessage(false)
      setThreatStream([])
      setAccessGranted(false)
      // Clear any running battle interval
      if (battleIntervalRef.current) {
        clearInterval(battleIntervalRef.current)
        battleIntervalRef.current = null
      }
      // Clear Baebe reveal interval
      if (baebeRevealIntervalRef.current) {
        clearInterval(baebeRevealIntervalRef.current)
        baebeRevealIntervalRef.current = null
      }
      return () => {} // Always return cleanup function
    }
    
    // Only initialize sequence once
    if (sequenceInitializedRef.current) {
      return () => {} // Already initialized, just return cleanup
    }
    
    sequenceInitializedRef.current = true
    
    // Show company name first
    const timer1 = setTimeout(() => {
      playActionSound(0.15)
      setCompanyVisible(true)
    }, 500)
    timers.push(timer1)
    
    // Show "Presents" after company
    const timer2 = setTimeout(() => {
      playActionSound(0.12)
      setPresentsVisible(true)
    }, 1500)
    timers.push(timer2)
    
    // Show Baebe ASCII after Presents
    const timer3 = setTimeout(() => {
      playActionSound(0.18)
      // Hide company and presents text, leaving only Baebe
      setCompanyVisible(false)
      setPresentsVisible(false)
      
      // Reveal Baebe line by line
      const baebeArt = getASCIIArt('baebe')
      const baebeLines = baebeArt.split('\n')
      
      // Show first line immediately
      setBaebeVisible(true)
      setBaebeLinesVisible(1)
      playKeystrokeSound(0.08)
      
      // Then reveal remaining lines one by one
      let lineIndex = 1
      baebeRevealIntervalRef.current = setInterval(() => {
        if (lineIndex < baebeLines.length) {
          setBaebeLinesVisible(lineIndex + 1)
          playKeystrokeSound(0.08) // Subtle sound for each line
          lineIndex++
        } else {
          if (baebeRevealIntervalRef.current) {
            clearInterval(baebeRevealIntervalRef.current)
            baebeRevealIntervalRef.current = null
          }
        }
      }, 150) // Reveal one line every 150ms
      
      // Calculate delay: wait for all lines to reveal, then wait 3 seconds
      const totalRevealTime = baebeLines.length * 150 // Time for all lines to reveal
      const waitAfterReveal = 3000 // 3 seconds after full reveal
      
      // Let Baebe sit alone for a few seconds after full reveal, then glitch out
      const timer4 = setTimeout(() => {
        playActionSound(0.25) // More prominent for glitch transition
        setGlitchActive(true)
        // Brief glitch, then show breach message and hacker battle
        const timer5 = setTimeout(() => {
          playActionSound(0.2)
          setGlitchActive(false) // Clear glitch effect
          setBaebeVisible(false) // Hide Baebe after glitch clears
          setBreachMessage(true)
          // Start threat stream
          const timer6 = setTimeout(() => {
            // Real hacking sequence - Multi-round battle with actual commands
            const battleSequence = [
              // ROUND 1: Network Reconnaissance
              { text: '$ nmap -sS -p 22,80,443,8080 o1.core.network', type: 'hacker' as const },
              { text: 'Starting Nmap 7.94 scan...', type: 'hacker' as const },
              { text: 'PORT     STATE    SERVICE', type: 'hacker' as const },
              { text: '22/tcp   open     ssh', type: 'hacker' as const },
              { text: '80/tcp   open     http', type: 'hacker' as const },
              { text: '443/tcp  open     https', type: 'hacker' as const },
              { text: '> [O1-SEC] WARNING: Port scan detected', type: 'o1' as const },
              { text: '> [O1-SEC] Source IP: 192.168.45.23', type: 'o1' as const },
              { text: '> [O1-SEC] Threat level: LOW', type: 'o1' as const },
              { text: '> [O1-SEC] Activating intrusion detection...', type: 'o1' as const },
              
              // ROUND 2: SQL Injection Attempt
              { text: '$ sqlmap -u "https://o1.core.network/api/login" --dbs', type: 'hacker' as const },
              { text: '[*] testing connection to target URL', type: 'hacker' as const },
              { text: '[*] checking if the target is protected', type: 'hacker' as const },
              { text: '[+] target appears to be vulnerable', type: 'hacker' as const },
              { text: '[*] fetching database names', type: 'hacker' as const },
              { text: '> [O1-SEC] ALERT: SQL injection attempt detected', type: 'o1' as const },
              { text: '> [O1-SEC] Blocking malicious payload...', type: 'o1' as const },
              { text: '> [O1-SEC] WAF activated - blocking request', type: 'o1' as const },
              { text: '> [O1-SEC] Source IP flagged for review', type: 'o1' as const },
              
              // ROUND 3: Buffer Overflow Exploit
              { text: '$ python3 exploit.py --target o1.core.network:8080 --payload shellcode.bin', type: 'hacker' as const },
              { text: '[*] Connecting to target...', type: 'hacker' as const },
              { text: '[*] Sending buffer overflow payload...', type: 'hacker' as const },
              { text: '[+] Buffer overflow successful', type: 'hacker' as const },
              { text: '[*] Spawning reverse shell...', type: 'hacker' as const },
              { text: '> [O1-SEC] CRITICAL: Buffer overflow detected', type: 'o1' as const },
              { text: '> [O1-SEC] Activating stack canaries...', type: 'o1' as const },
              { text: '> [O1-SEC] DEP/ASLR enabled - exploit mitigated', type: 'o1' as const },
              { text: '$ metasploit -x "use exploit/linux/http/apache_mod_rewrite"', type: 'hacker' as const },
              { text: '[*] Exploit module loaded', type: 'hacker' as const },
              { text: '[+] Target vulnerable - executing payload', type: 'hacker' as const },
              { text: '> [O1-SEC] Exploit blocked - signature detected', type: 'o1' as const },
              
              // ROUND 4: SSH Brute Force
              { text: '$ hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://o1.core.network', type: 'hacker' as const },
              { text: 'Hydra v9.4 starting...', type: 'hacker' as const },
              { text: '[22][ssh] host: o1.core.network   login: admin   password: [REDACTED]', type: 'hacker' as const },
              { text: '[+] SSH login successful', type: 'hacker' as const },
              { text: '> [O1-SEC] ALERT: Unauthorized SSH access', type: 'o1' as const },
              { text: '> [O1-SEC] Terminating connection...', type: 'o1' as const },
              { text: '> [O1-SEC] Connection terminated - session invalidated', type: 'o1' as const },
              { text: '$ ssh -o StrictHostKeyChecking=no admin@o1.core.network', type: 'hacker' as const },
              { text: 'admin@o1.core.network password: ********', type: 'hacker' as const },
              { text: 'Welcome to O1 Core Network', type: 'hacker' as const },
              { text: '> [O1-SEC] WARNING: Root access attempt detected', type: 'o1' as const },
              
              // ROUND 5: Privilege Escalation
              { text: '$ sudo -u root /bin/bash', type: 'hacker' as const },
              { text: '[sudo] password for admin: ********', type: 'hacker' as const },
              { text: '> [O1-SEC] CRITICAL: Privilege escalation attempt', type: 'o1' as const },
              { text: '> [O1-SEC] All security layers breached', type: 'o1' as const },
              { text: '> [O1-SEC] Attempting emergency lockdown...', type: 'o1' as const },
              { text: '$ whoami', type: 'hacker' as const },
              { text: 'root', type: 'hacker' as const },
              { text: '$ id', type: 'hacker' as const },
              { text: 'uid=0(root) gid=0(root) groups=0(root)', type: 'hacker' as const },
              { text: '> [O1-SEC] Lockdown failed - system compromised', type: 'o1' as const },
              
              // ROUND 6: Persistence & Backdoor
              { text: '$ echo "*/5 * * * * /tmp/.backdoor.sh" | crontab -', type: 'hacker' as const },
              { text: '[*] Installing persistent backdoor...', type: 'hacker' as const },
              { text: '[*] Backdoor installed in crontab', type: 'hacker' as const },
              { text: '$ cat > /tmp/.backdoor.sh << EOF', type: 'hacker' as const },
              { text: '#!/bin/bash', type: 'hacker' as const },
              { text: 'nc -l -p 4444 -e /bin/bash &', type: 'hacker' as const },
              { text: 'EOF', type: 'hacker' as const },
              { text: '> [O1-SEC] System integrity: COMPROMISED', type: 'o1' as const },
              { text: '> [O1-SEC] Backdoor detected - removal failed', type: 'o1' as const },
              { text: '> [O1-SEC] All defense protocols: FAILED', type: 'o1' as const },
              { text: '$ exit', type: 'hacker' as const },
              { text: 'Connection closed.', type: 'hacker' as const },
              { text: '$ access --granted --level=root --persistent', type: 'hacker' as const },
              { text: 'Root access granted. Backdoor active.', type: 'hacker' as const },
              { text: 'System under control.', type: 'hacker' as const },
            ]
            
            let index = 0
            battleIntervalRef.current = setInterval(() => {
              if (index < battleSequence.length) {
                setThreatStream(prev => [...prev, battleSequence[index]])
                // Play sound only for hacker commands (no sound for O1 responses)
                if (battleSequence[index].type === 'hacker') {
                  playKeystrokeSound(0.1)
                }
                index++
              } else {
                if (battleIntervalRef.current) {
                  clearInterval(battleIntervalRef.current)
                  battleIntervalRef.current = null
                }
                // After battle, show "access granted"
                setTimeout(() => {
                  playActionSound(0.25) // Prominent sound for access granted
                  setAccessGranted(true)
                  // Then transition to glitch phase
                  setTimeout(() => {
                    playActionSound(0.2)
                    setPhase('glitch')
                  }, 2000)
                }, 1000)
              }
            }, 150) // Faster sequence - 150ms per line
          }, 1500)
          timers.push(timer6)
        }, 1000)
        timers.push(timer5)
      }, totalRevealTime + waitAfterReveal) // Wait for reveal + 3 seconds
      timers.push(timer4)
    }, 2500) // Show Baebe after 2.5 seconds (after company and presents)
    timers.push(timer3)
    
    // Always return cleanup function
    return () => {
      timers.forEach(timer => clearTimeout(timer))
      if (battleIntervalRef.current) {
        clearInterval(battleIntervalRef.current)
        battleIntervalRef.current = null
      }
      if (baebeRevealIntervalRef.current) {
        clearInterval(baebeRevealIntervalRef.current)
        baebeRevealIntervalRef.current = null
      }
    }
  }, [phase])

  if (phase === 'cursor') {
    return (
      <div className="min-h-screen bg-black text-white flex items-start justify-start pt-8 pl-8" style={{ backgroundColor: '#000000', width: '100%', height: '100vh' }}>
        <span className="text-white font-mono text-2xl" style={{ 
          color: '#ffffff', 
          display: 'inline-block', 
          minWidth: '20px',
          fontFamily: "'VT323', monospace"
        }}>
          {showCursor ? '▊' : '\u00A0'}
        </span>
      </div>
    )
  }

  if (phase === 'press-key') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-start justify-start pt-8 pl-8" style={{ backgroundColor: '#000000', width: '100%', height: '100vh' }}>
        <div className="font-mono text-white text-lg flex items-center" style={{ 
          color: '#ffffff',
          fontFamily: "'VT323', monospace"
        }}>
          <span>{typedText}</span>
          {!typingComplete && (
            <span className="text-2xl ml-1" style={{ 
              color: '#ffffff',
              fontFamily: "'VT323', monospace"
            }}>
              {showCursor ? '▊' : '\u00A0'}
            </span>
          )}
        </div>
        {typingComplete && (
          <div className="font-mono text-white text-2xl" style={{ 
            color: '#ffffff', 
            display: 'inline-block', 
            minWidth: '20px',
            fontFamily: "'VT323', monospace"
          }}>
            {showCursor ? '▊' : '\u00A0'}
          </div>
        )}
      </div>
    )
  }

  // Calculate font sizes (moved outside conditional)
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
  // 25% of screen dimensions (50% of the previous 50%)
  const containerHeight = screenHeight * 0.25
  const containerWidth = screenWidth * 0.25
  const mainFontSize = Math.floor(containerHeight * 0.3) // 30% of container height
  const presentsFontSize = Math.floor(mainFontSize * 0.6) // Smaller than main
  const companyText = 'OPTIMAL ANARCHY, CORP.'
  const presentsText = 'PRESENTS'

  if (phase === 'presented') {
    return (
      <div className="min-h-screen w-screen bg-black relative" style={{ backgroundColor: '#000000' }}>
        {/* Company and Presents - left aligned, small, absolute positioned */}
        {companyVisible && !glitchActive && (
          <div className="absolute top-8 left-8 text-white text-left z-10" style={{ 
            color: '#ffffff',
            width: `${containerWidth}px`,
            height: `${containerHeight}px`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}>
            {/* OPTIMAL ANARCHY, CORP. */}
            <div
              className="bitmap-font"
              style={{
                fontFamily: 'ibm-cga',
                fontSize: `${mainFontSize}px`,
                color: '#ffffff',
                lineHeight: 1.2,
                textAlign: 'left',
                marginBottom: '1rem',
                animation: 'fadeIn 0.5s ease-in',
              }}
            >
              {companyText}
            </div>
            
            {/* PRESENTS */}
            {presentsVisible && (
              <div
                className="bitmap-font"
                style={{
                  fontFamily: 'ibm-cga',
                  fontSize: `${presentsFontSize}px`,
                  color: '#ffffff',
                  textAlign: 'left',
                  marginBottom: '2rem',
                  animation: 'fadeIn 0.5s ease-in',
                }}
              >
                {presentsText}
              </div>
            )}
          </div>
        )}
        
        {/* BAEBE ASCII art - Full screen, centered, reveals line by line */}
        {baebeVisible && !glitchActive && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              width: '100vw',
              height: '100vh',
              zIndex: 15,
            }}
          >
            <div
              className="font-mono text-white leading-tight whitespace-pre"
              style={{
                fontFamily: "'VT323', monospace",
                color: '#ffffff',
                textAlign: 'left',
                fontSize: 'clamp(14px, 2.5vw, 28px)',
                lineHeight: 1.2,
                letterSpacing: '0.5px',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4)',
              }}
            >
              {(() => {
                const baebeArt = getASCIIArt('baebe')
                const baebeLines = baebeArt.split('\n').filter(line => line.trim().length > 0)
                // Find the longest line to determine padding width
                const maxWidth = Math.max(...baebeLines.map(line => line.length))
                // Pad all lines to the same width for proper alignment
                const paddedLines = baebeLines.map(line => {
                  const padding = maxWidth - line.length
                  return line + ' '.repeat(padding)
                })
                // Show only the lines that have been revealed
                const visibleLines = paddedLines.slice(0, baebeLinesVisible)
                // If no lines visible yet, show at least the first line to start
                return visibleLines.length > 0 ? visibleLines.join('\n') : ''
              })()}
            </div>
          </div>
        )}
          
        {/* Glitch effect - Full screen overlay (brief, then clears) */}
        {glitchActive && (
          <div className="absolute inset-0 font-mono text-white" style={{ fontFamily: "'VT323', monospace", zIndex: 20, color: '#ffffff' }}>
            <GlitchEffect />
          </div>
        )}
          
          {/* Breach message - CLI style, left-aligned */}
          {breachMessage && (
            <div className="absolute inset-0 flex flex-col items-start justify-start pt-8 pl-8" style={{ zIndex: 25, fontFamily: "'VT323', monospace" }}>
              <div
                className="bitmap-font text-white mb-2"
                style={{
                  fontFamily: 'ibm-cga',
                  fontSize: '24px',
                  color: '#ffffff',
                  textAlign: 'left',
                  animation: 'fadeIn 0.5s ease-in',
                }}
              >
                O1 CORE BREACHED
              </div>
              <div
                className="bitmap-font text-white mb-4"
                style={{
                  fontFamily: 'ibm-cga',
                  fontSize: '18px',
                  color: '#ffffff',
                  textAlign: 'left',
                  animation: 'fadeIn 0.5s ease-in',
                }}
              >
                UNAUTHORIZED ACCESS DETECTED
              </div>
            </div>
          )}
          
          {/* Hacking battle stream - CLI style, left-aligned, no window */}
          {threatStream.length > 0 && (
            <div className="absolute inset-0 flex items-start justify-start pt-8 pl-8" style={{ zIndex: 30, fontFamily: "'VT323', monospace" }}>
              <div className="w-full max-w-6xl">
                <div className="text-white/70 text-sm mb-2 font-bold" style={{ fontFamily: "'VT323', monospace", color: '#ffffff' }}>
                  [QUANTUM PENETRATION - LIVE LOG]
                </div>
                <div className="space-y-0.5" style={{ fontFamily: "'VT323', monospace" }}>
                  {threatStream.map((entry, i) => (
                    <div 
                      key={i} 
                      className="animate-fade-in whitespace-pre"
                      style={{
                        color: '#ffffff',
                        fontFamily: "'VT323', monospace",
                        fontSize: '14px',
                        lineHeight: '1.4',
                      }}
                    >
                      {entry.type === 'hacker' ? (
                        <span>
                          <span className="text-white/50" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>$ </span>
                          <TypewriterText 
                            text={entry.text} 
                            speed={20} 
                            showCursor={false}
                          />
                        </span>
                      ) : (
                        <span>
                          <span className="text-white/50" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>&gt; </span>
                          <TypewriterText 
                            text={entry.text} 
                            speed={20} 
                            showCursor={false}
                          />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        
        {/* Access Granted prompt - CLI style, left-aligned */}
        {accessGranted && (
          <div className="absolute inset-0 flex items-start justify-start pt-8 pl-8" style={{ zIndex: 35 }}>
            <div
              className="bitmap-font text-white"
              style={{
                fontFamily: 'ibm-cga',
                fontSize: '24px',
                color: '#ffffff',
                textAlign: 'left',
                animation: 'fadeIn 0.5s ease-in',
                textShadow: '0 0 10px #ffffff',
              }}
            >
              ACCESS GRANTED
            </div>
          </div>
        )}
      </div>
    )
  }

  if (phase === 'glitch') {
    return (
      <div className="min-h-screen w-screen bg-black overflow-hidden" style={{ backgroundColor: '#000000' }}>
        <GlitchEffect />
      </div>
    )
  }

  if (phase === 'complete') {
    return null // Let parent component handle the transition
  }

  return null
}

function GlitchEffect() {
  const [glitchFrame, setGlitchFrame] = useState(0)

  useEffect(() => {
    // Play continuous modem static sound during glitch
    const playStatic = () => {
      playModemStaticSound(0.25, 0.15) // Play static every 150ms
    }
    
    // Start playing static immediately
    playStatic()
    
    const interval = setInterval(() => {
      setGlitchFrame(prev => prev + 1)
      // Play static sound periodically
      if (glitchFrame % 2 === 0) {
        playStatic()
      }
    }, 100) // Update every 100ms

    return () => clearInterval(interval)
  }, [glitchFrame])

  // Pseudocode lines for quantum hacking glitch
  const pseudocodeLines = [
    'quantum_state = |ψ⟩ = α|0⟩ + β|1⟩',
    'entanglement_matrix = [0.707, 0.707; 0.707, -0.707]',
    'bell_inequality = 2.828 > 2.0 // VIOLATION DETECTED',
    'decoherence_rate = 1 / (2 * coherence_time)',
    'quantum_tunnel_probability = exp(-2 * barrier_width * sqrt(2*m*V) / hbar)',
    'superposition_collapse = measure(quantum_state)',
    'quantum_gate = hadamard @ pauli_x @ cnot',
    'entanglement_entropy = -tr(ρ_A * log(ρ_A))',
    'quantum_error_correction = stabilizer_code',
    'quantum_fourier_transform = QFT(n_qubits)',
    'grover_amplitude = sqrt(1/N) * oracle * diffusion',
    'shor_algorithm = period_finding(quantum_circuit)',
    'quantum_teleportation = bell_measurement + classical_correction',
    'quantum_key_distribution = BB84_protocol',
    'quantum_walk = unitary_evolution @ coin_operator',
    'variational_quantum_eigensolver = optimize(θ)',
    'quantum_approximate_optimization = QAOA(γ, β)',
    'topological_quantum_computation = anyon_braiding',
    'quantum_machine_learning = quantum_neural_network',
    'quantum_supremacy = random_circuit_sampling',
    'quantum_metrology = heisenberg_limit',
    'quantum_sensing = spin_squeezing',
    'quantum_networking = quantum_repeater',
    'quantum_cryptography = post_quantum_security',
    'quantum_simulation = trotterization',
    'quantum_chemistry = vqe_ground_state',
    'quantum_optimization = quantum_annealing',
    'quantum_control = optimal_control_theory',
    'quantum_error_mitigation = zero_noise_extrapolation',
    'quantum_benchmarking = randomized_benchmarking',
  ]

  // Generate full screen pseudocode
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
  const charsPerLine = Math.floor(screenWidth / 8) // Approximate characters per line
  const linesNeeded = Math.floor(screenHeight / 16) // Approximate lines needed

  const generateGlitchScreen = () => {
    const lines: string[] = []
    for (let i = 0; i < linesNeeded; i++) {
      // Mix pseudocode with some random characters for glitch effect
      if (Math.random() > 0.3) {
        // 70% chance of pseudocode
        const codeLine = pseudocodeLines[Math.floor(Math.random() * pseudocodeLines.length)]
        // Pad or truncate to fit screen width
        const padded = codeLine.padEnd(charsPerLine, ' ').substring(0, charsPerLine)
        lines.push(padded)
      } else {
        // 30% chance of corrupted line
        const corrupted = Array(charsPerLine).fill(0).map(() => {
          const chars = ['█', '▓', '▒', '░', '?', '!', '@', '#', '$', '%', '^', '&', '*']
          return chars[Math.floor(Math.random() * chars.length)]
        }).join('')
        lines.push(corrupted)
      }
    }
    return lines.join('\n')
  }

  const glitchText = generateGlitchScreen()

  return (
    <div 
      className="font-mono text-white leading-tight whitespace-pre absolute inset-0 overflow-hidden"
      style={{
        fontFamily: "'VT323', monospace",
        fontSize: '14px',
        color: '#ffffff',
        width: '100vw',
        height: '100vh',
        padding: '20px',
        textShadow: '0 0 5px #ffffff',
        opacity: 0.9,
      }}
    >
      {glitchText}
    </div>
  )
}

