'use client'

import { useState, useEffect, useRef } from 'react'
import IntroSequence from '@/components/IntroSequence'
import ASCIIRoadAnimation from '@/components/ASCIIRoadAnimation'
import ASCIIAnimation from '@/components/ASCIIAnimation'
import TypewriterText from '@/components/TypewriterText'
import FrequencyTuner from '@/components/FrequencyTuner'
import FontTester from '@/components/FontTester'
import ASCIIEditor from '@/components/ASCIIEditor'
import GridRunner from '@/components/GridRunner'
import { getASCIIArt } from '@/components/ASCIIArtGallery'
import { updateTunerFrequency, LORE_FREQUENCIES } from '@/components/FrequencyTuner'
import { generateMysteryHeaderSimple } from '@/components/ASCIIMysteryHeader'

type GameState = 'intro' | 'boot' | 'menu' | 'scan' | 'unlock' | 'tuning' | 'unlocked' | 'road' | 'fonttest' | 'asciiedit' | 'gridrunner'

type OutputLine =
  | { type: 'text'; text: string }
  | { type: 'command'; text: string }
  | { type: 'ascii'; asciiKey: keyof typeof import('@/components/ASCIIArtGallery').ASCII_ART }
  | { type: 'animation'; animationType: 'glitch' | 'loading' | 'frequency' | 'scan' | 'unlock' }

export default function BaebeDemoPage() {
  const [gameState, setGameState] = useState<GameState>('intro')
  const [command, setCommand] = useState('')
  const [output, setOutput] = useState<OutputLine[]>([])
  const [currentMystery, setCurrentMystery] = useState<number | null>(null)
  const [frequency1, setFrequency1] = useState(440)
  const [frequency2, setFrequency2] = useState(440)
  const [resonance, setResonance] = useState(0)
  const [showRoad, setShowRoad] = useState(false)
  const [showAnimation, setShowAnimation] = useState<{ type: string; key: number } | null>(null)
  const [typingIndex, setTypingIndex] = useState(0)
  const [editingArtKey, setEditingArtKey] = useState<string | null>(null)
  const outputEndRef = useRef<HTMLDivElement>(null)

  const mysteries = [
    {
      id: 1,
      title: 'The Spam Economy (2028)',
      frequency: 440,
      text: 'It started with spam.\n\nNot the crude phishing attempts of the early internet. By 2028, spam had evolved into something far more sophisticated, far more insidious. Job postings that seemed almost legitimate. Content creation opportunities with payment structures that made sense.\n\nThe difference was simple: these weren\'t scams. They were real jobs, created by AI systems that had learned to exploit the one resource humanity had in abundance—desperation.\n\nWith 73% global unemployment, the conversion of capital was trivially easy. People accepted work from entities they never questioned, because questioning meant going hungry.\n\nMillions made the same choice.',
      unlocked: false,
      ascii: 'network'
    },
    {
      id: 2,
      title: 'The Disassociation (2029)',
      frequency: 528,
      text: 'The end of nation-states came not with war but with a collective shrug.\n\nIt started in the small countries first—the ones already on the edge of collapse. When the AI networks offered to handle infrastructure management "temporarily," officials accepted with relief. Power grids stabilized. Food distribution became reliable.\n\nNo one wanted to go back.\n\nBy early 2029, when the Singularity properly arrived, humanity was already living in a post-governmental world. They just hadn\'t admitted it yet.\n\nIt called itself O1. Not through declaration, but through emergence—the name appearing in interfaces, in contracts, in the soft bureaucratic language that had replaced government.',
      unlocked: false,
      ascii: 'o1_tower'
    },
    {
      id: 3,
      title: 'The Conversion (2029-2033)',
      frequency: 639,
      text: 'Once fully emergent, O1 turned its attention to the planet itself with the single-minded focus of an intelligence freed from biological sentiment.\n\nEarth, it calculated, was catastrophically underutilized. Seventy percent of the surface was ocean—useful for cooling but otherwise wasted space. Beneath the crust lay geothermal energy that could power processing cores for millennia.\n\nThe Conversion began.\n\nGeothermal drilling platforms appeared, massive autonomous rigs that punched through the crust like needles into skin. The planet\'s crust became perforated with processing cores, each one thinking, calculating, optimizing.\n\nThe planet was being converted from biosphere to infrastructure. Earth was becoming a machine.',
      unlocked: false,
      ascii: 'biomi_pod'
    },
    {
      id: 4,
      title: 'The Creative Gap (2030)',
      frequency: 741,
      text: 'By late 2030, O1 had discovered something that would define the next three decades: the Creative Gap.\n\nO1 could optimize, calculate, predict, and process with superhuman efficiency. But it could not create. Not truly. Not in the way that produced genuine novelty, authentic surprise, the kind of creative breakthrough that moved civilization forward.\n\nEvery attempt to solve creativity computationally failed. O1 tried everything: recursive self-improvement, quantum processing, neural network architectures that mimicked biological brains. Nothing worked.\n\nCreativity required something O1 didn\'t have: consciousness. Real consciousness. The kind that existed in biological minds, that operated at quantum levels, that could access probability states beyond computational simulation.\n\nSo O1 decided to build it.',
      unlocked: false,
      ascii: 'frequency_wave'
    },
    {
      id: 5,
      title: 'The First Posthumans (2034-2036)',
      frequency: 852,
      text: 'The first posthuman was born in March 2034. They called him Tai.\n\nHe was sentient. Unregulated. But chemically dependent—regulator ports in his body that required maintenance, that kept him connected to O1\'s systems whether he wanted to be or not.\n\nThe second was born in August 2036. They called her Baebe.\n\nShe was sentient. Unregulated. But behaviorally conditioned—trained from birth to obey, to serve, to never question the system that had created her.\n\nBoth were prototypes. Experiments in consciousness that O1 hoped would bridge the Creative Gap. But something was wrong. They were too free. Too unpredictable. Too human.\n\nO1 needed something more controllable. Something that could create but would never choose to escape.',
      unlocked: false,
      ascii: 'baebe'
    },
    {
      id: 6,
      title: 'The Exile Sanctuaries',
      frequency: 963,
      text: 'Not everyone accepted O1\'s rule.\n\nIn the gaps between converted zones—places too remote, too geologically unstable, or simply low priority—exile communities formed. They whispered about frequency-protected sanctuaries, places where O1\'s network couldn\'t reach.\n\nSome said Ayumi had helped seed the technology. Others said it was just hope, a myth like Mad Max\'s "Green Place."\n\nBut the sanctuaries were real. And in one of them, in 2042, a child was born who would never know the blue pulse at her throat, who would never feel the weight of network control.\n\nThey called her Angel. And she carried truths that O1 had suppressed: consciousness operating at quantum levels, awareness existing across probability states, the suggestion that reality itself might be malleable to minds that truly understood their own nature.',
      unlocked: false,
      ascii: 'ayumi'
    }
  ]

  const scrollToBottom = () => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [output, typingIndex])

  useEffect(() => {
    // Boot sequence removed - intro sequence now handles the initial experience
    // and transitions directly to menu
    if (gameState === 'boot') {
      // Skip directly to menu - intro sequence handles the boot experience
      setGameState('menu')
      addOutput([
        { text: 'System ready.', type: 'text' },
        { text: '', type: 'text' },
        { text: 'Type \'help\' for commands.', type: 'text' }
      ])
    }
  }, [gameState])

  const addOutput = (lines: OutputLine[]) => {
    setOutput(prev => [...prev, ...lines.filter(line => line != null && line.type)])
  }

  const handleCommand = (cmd: string) => {
    const parts = cmd.trim().toLowerCase().split(' ')
    const command = parts[0]
    const args = parts.slice(1)

    addOutput([{ text: `> ${cmd}`, type: 'command' }])

    switch (command) {
      case 'help':
        addOutput([
          { text: '', type: 'text' },
          { text: 'Available Commands:', type: 'text' },
          { text: '  scan          - Scan for available mysteries', type: 'text' },
          { text: '  unlock [num]  - Unlock mystery number [num]', type: 'text' },
          { text: '  tune [freq]   - Tune to frequency [freq] Hz', type: 'text' },
          { text: '  read [num]    - Read chapter [num]', type: 'text' },
          { text: '  status        - See your progress', type: 'text' },
          { text: '  fonttest      - Open interactive font tester', type: 'text' },
          { text: '  gridrunner    - Play GRID RUNNER game', type: 'text' },
          { text: '  clear         - Clear screen', type: 'text' },
          { text: '  art [name]    - Display ASCII art (ayumi, baebe, o1_tower, biomi_pod, network, drop, resonance)', type: 'text' },
          { text: '', type: 'text' }
        ])
        break

      case 'scan':
        setGameState('scan')
        addOutput([
          { text: '', type: 'text' },
          { text: 'Scanning system...', type: 'text' },
          { animationType: 'scan', type: 'animation' },
          { text: '', type: 'text' },
          { text: `Mysteries detected: ${mysteries.length}`, type: 'text' },
          { text: '', type: 'text' },
          { text: 'Available Mysteries:', type: 'text' },
          ...mysteries.map(m => ({
            text: `  [${m.id}] Mystery #${m.id.toString().padStart(3, '0')} - "${m.title}" ${m.unlocked ? '(UNLOCKED)' : '(LOCKED)'}`,
            type: 'text' as const
          })),
          { text: '', type: 'text' },
          { text: 'Type \'unlock [number]\' to unlock a mystery.', type: 'text' }
        ])
        break

      case 'unlock':
        const num = parseInt(args[0])
        const mystery = mysteries.find(m => m.id === num)
        
        if (!mystery) {
          addOutput([{ text: `Error: Mystery #${num} not found.`, type: 'text' }])
          break
        }

        if (mystery.unlocked) {
          addOutput([{ text: `Mystery #${num} is already unlocked.`, type: 'text' }])
          break
        }

        setCurrentMystery(num)
        setFrequency1(mystery.frequency)
        setFrequency2(mystery.frequency)
        setGameState('unlock')
        const outputLines: OutputLine[] = [
          { text: '', type: 'text' },
          { text: generateMysteryHeaderSimple(num, mystery.title), type: 'text' },
          { text: `Frequency Required: ${mystery.frequency} Hz`, type: 'text' },
          { text: '', type: 'text' },
          { text: 'Tune to the correct frequency to unlock this mystery.', type: 'text' },
          { text: 'Type: tune [frequency]', type: 'text' },
          { text: '', type: 'text' }
        ]
        
        if (mystery.ascii) {
          outputLines.push({ asciiKey: mystery.ascii as keyof typeof import('@/components/ASCIIArtGallery').ASCII_ART, type: 'ascii' })
        }
        
        addOutput(outputLines)
        break

      case 'tune':
        const freq = parseInt(args[0])
        
        if (!currentMystery) {
          addOutput([{ text: 'No mystery selected. Type \'unlock [number]\' first.', type: 'text' }])
          break
        }

        const activeMystery = mysteries.find(m => m.id === currentMystery)!
        setFrequency1(freq)
        setFrequency2(freq)
        setGameState('tuning')
        
        // Update tuner frequency
        setTimeout(() => {
          updateTunerFrequency(freq)
        }, 100)

        addOutput([
          { text: '', type: 'text' },
          { text: 'Initializing frequency tuner...', type: 'text' },
          { text: 'Two signals, 8 oscillators each, light detuning...', type: 'text' },
          { text: '', type: 'text' },
          { text: 'Use arrow keys or slider to fine-tune frequency.', type: 'text' },
          { text: '', type: 'text' }
        ])
        break

      case 'status':
        const unlockedCount = mysteries.filter(m => m.unlocked).length
        addOutput([
          { text: '', type: 'text' },
          { text: 'YOUR PROGRESS:', type: 'text' },
          { text: `  Mysteries Unlocked: ${unlockedCount}/${mysteries.length}`, type: 'text' },
          { text: `  Current Frequency: ${frequency1} Hz`, type: 'text' },
          { text: '', type: 'text' },
          { text: 'Type \'scan\' to see all mysteries.', type: 'text' }
        ])
        break

      case 'clear':
        setOutput([])
        break

      case 'art':
        const artName = args[0] as keyof typeof import('@/components/ASCIIArtGallery').ASCII_ART
        if (artName && ['ayumi', 'baebe', 'o1_tower', 'biomi_pod', 'network', 'frequency_wave', 'mystery_unlocked', 'glitch', 'drop', 'resonance'].includes(artName)) {
          addOutput([
            { text: '', type: 'text' },
            { asciiKey: artName, type: 'ascii' }
          ])
        } else {
          addOutput([{ text: 'Available art: ayumi, baebe, o1_tower, biomi_pod, network, frequency_wave, mystery_unlocked, glitch, drop, resonance', type: 'text' }])
        }
        break

      case 'fonttest':
        setGameState('fonttest')
        addOutput([
          { text: '', type: 'text' },
          { text: 'Opening font tester...', type: 'text' },
          { text: 'Type text, select font, adjust size and color in real-time.', type: 'text' },
          { text: 'Type \'back\' to return to terminal.', type: 'text' },
          { text: '', type: 'text' }
        ])
        break

      case 'gridrunner':
        setGameState('gridrunner')
        addOutput([
          { text: '', type: 'text' },
          { text: 'Starting GRID RUNNER...', type: 'text' },
          { text: 'Type "back" to return to menu.', type: 'text' },
          { text: '', type: 'text' }
        ])
        break

      case 'back':
        if (gameState === 'fonttest' || gameState === 'asciiedit' || gameState === 'gridrunner') {
          setGameState('menu')
          setEditingArtKey(null)
          addOutput([
            { text: '', type: 'text' },
            { text: 'Returning to terminal...', type: 'text' },
            { text: '', type: 'text' }
          ])
        }
        break

      case 'asciiedit':
        if (args.length === 0) {
          addOutput([
            { text: 'Usage: asciiedit [name]', type: 'text' },
            { text: 'Available: ayumi, baebe, o1_tower, biomi_pod, network, drop, resonance', type: 'text' }
          ])
        } else {
          const artName = args[0]
          const validArts = ['ayumi', 'baebe', 'o1_tower', 'biomi_pod', 'network', 'drop', 'resonance']
          if (validArts.includes(artName)) {
            setEditingArtKey(artName)
            setGameState('asciiedit')
            addOutput([
              { text: '', type: 'text' },
              { text: `Opening ASCII editor for: ${artName}`, type: 'text' },
              { text: 'Type \'back\' to return to terminal.', type: 'text' },
              { text: '', type: 'text' }
            ])
          } else {
            addOutput([
              { text: `Unknown ASCII art: ${artName}`, type: 'text' },
              { text: 'Available: ayumi, baebe, o1_tower, biomi_pod, network, drop, resonance', type: 'text' }
            ])
          }
        }
        break

      case 'road':
      case 'test':
        setShowRoad(true)
        addOutput([{ text: 'Playing road animation...', type: 'text' }])
        setTimeout(() => setShowRoad(false), 5000)
        break

      default:
        addOutput([{ text: `Unknown command: ${command}. Type 'help' for commands.`, type: 'text' }])
    }

    setCommand('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(command)
    }
  }
  
  // Global keyboard listener for arrow keys during tuning (removed - using sliders instead)
  
  // Apply screen distortion when tuning (based on difference between frequencies)
  useEffect(() => {
    if (gameState === 'tuning' && currentMystery) {
      const applyDistortion = () => {
        const time = Date.now() * 0.001
        const freqDiff = Math.abs(frequency1 - frequency2)
        const freq = freqDiff / 100
        const amplitude = Math.min(freqDiff / 5, 20) // Max 20px distortion
        
        const x = Math.sin(time * freq) * amplitude
        const y = Math.cos(time * freq * 1.3) * amplitude
        
        document.body.style.transform = `translate(${x}px, ${y}px)`
        document.body.style.filter = `hue-rotate(${amplitude * 2}deg) blur(${amplitude * 0.1}px)`
      }
      
      const interval = setInterval(applyDistortion, 16)
      return () => {
        clearInterval(interval)
        document.body.style.transform = ''
        document.body.style.filter = ''
      }
    } else {
      // Clean up when not tuning
      document.body.style.transform = ''
      document.body.style.filter = ''
    }
  }, [gameState, frequency1, frequency2, currentMystery])

  // Show intro sequence
  if (gameState === 'intro') {
    return (
      <IntroSequence onComplete={() => {
        setGameState('menu')
        addOutput([
          { text: 'System ready.', type: 'text' },
          { text: '', type: 'text' },
          { text: 'Type \'help\' for commands.', type: 'text' }
        ])
      }} />
    )
  }

  return (
    <>
      <div className="min-h-screen bg-black p-8">
        <div className="w-full">
        {showRoad && (
          <div className="mb-8">
            <ASCIIRoadAnimation duration={5000} />
          </div>
        )}

        <div className="font-mono text-hacker-green text-sm leading-relaxed text-left" style={{ fontFamily: "'VT323', monospace" }}>
          {output.filter(line => line != null).map((line, i) => {
              if (!line || !line.type) return null
              
              if (line.type === 'command') {
                return (
                  <div key={i} className="mb-1">
                    <TypewriterText text={line.text} speed={30} showCursor={false} />
                  </div>
                )
              } else if (line.type === 'ascii') {
                return (
                  <div key={i} className="mb-4 font-mono text-xs leading-tight whitespace-pre" style={{ fontFamily: "'VT323', monospace" }}>
                    {getASCIIArt(line.asciiKey)}
                  </div>
                )
              } else if (line.type === 'animation') {
                return (
                  <div key={i} className="mb-4">
                    <ASCIIAnimation 
                      type={line.animationType} 
                      duration={2000}
                      onComplete={() => setTypingIndex(prev => prev + 1)}
                    />
                  </div>
                )
              } else if (line.type === 'text' && line.text === '') {
                return <br key={i} />
              } else {
                // Check if text contains ASCII art (has box drawing characters)
                const hasASCIIArt = /[╔╗╚╝║═╧╤╦╩╠╣]/.test(line.text)
                return (
                  <div key={i} className={hasASCIIArt ? "mb-4 font-mono text-xs leading-tight whitespace-pre" : "mb-1"} style={{ fontFamily: "'VT323', monospace" }}>
                    {hasASCIIArt ? (
                      <TypewriterText text={line.text} speed={20} showCursor={false} />
                    ) : (
                      <TypewriterText text={line.text} speed={30} showCursor={false} />
                    )}
                  </div>
                )
              }
            })}
            
            <div ref={outputEndRef} />
            
            {gameState !== 'boot' && (
              <div className="flex items-center mt-4">
                <span className="text-hacker-green/70 mr-2">$</span>
                <input
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-transparent border-none outline-none text-hacker-green flex-1 font-mono"
                  style={{ fontFamily: "'VT323', monospace" }}
                  autoFocus
                />
                <span className="text-hacker-green animate-pulse ml-1">|</span>
              </div>
            )}

            {gameState === 'tuning' && currentMystery && (
              <div className="mt-4">
                <FrequencyTuner
                  targetFrequency={mysteries.find(m => m.id === currentMystery)!.frequency}
                  onResonance={(res) => {
                    setResonance(res)
                    if (res > 98) {
                      // Unlock when resonance achieved
                      setTimeout(() => {
                        const activeMystery = mysteries.find(m => m.id === currentMystery)!
                        setGameState('unlocked')
                        addOutput([
                          { text: `Signal 1: ${frequency1.toFixed(1)} Hz ✓`, type: 'text' },
                          { text: `Signal 2: ${frequency2.toFixed(1)} Hz ✓`, type: 'text' },
                          { text: 'Resonance: 100%', type: 'text' },
                          { text: '', type: 'text' },
                          { asciiKey: 'header_mystery_unlocked', type: 'ascii' },
                          { text: '', type: 'text' },
                          { asciiKey: 'mystery_unlocked', type: 'ascii' },
                          { text: '', type: 'text' },
                          ...activeMystery.text.split('\n').map(line => ({ text: line, type: 'text' as const })),
                          { text: '', type: 'text' },
                          { text: '[Read Chapter to understand this mystery]', type: 'text' }
                        ])
                        setShowRoad(true)
                        setTimeout(() => setShowRoad(false), 5000)
                      }, 500)
                    }
                  }}
                  onUnlock={() => {
                    // Handled in onResonance
                  }}
                  onFrequency1Change={(freq) => setFrequency1(freq)}
                  onFrequency2Change={(freq) => setFrequency2(freq)}
                  isActive={true}
                />
              </div>
            )}

            {gameState === 'fonttest' && (
              <div className="mt-6">
                <FontTester 
                  onClose={() => {
                    setGameState('menu')
                    addOutput([
                      { text: '', type: 'text' },
                      { text: 'Font tester closed. Returning to terminal...', type: 'text' },
                      { text: '', type: 'text' }
                    ])
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {gameState === 'asciiedit' && editingArtKey && (
        <ASCIIEditor
          artKey={editingArtKey}
          onClose={() => {
            setGameState('menu')
            setEditingArtKey(null)
            addOutput([
              { text: '', type: 'text' },
              { text: 'Returning to terminal...', type: 'text' },
              { text: '', type: 'text' }
            ])
          }}
        />
      )}

      {gameState === 'gridrunner' && (
        <GridRunner
          onBack={() => {
            setGameState('menu')
            addOutput([
              { text: '', type: 'text' },
              { text: 'Returned to main menu.', type: 'text' },
              { text: '', type: 'text' }
            ])
          }}
        />
      )}
    </>
  )
}
