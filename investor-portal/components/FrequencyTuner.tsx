'use client'

import { useEffect, useRef, useState } from 'react'

interface FrequencyTunerProps {
  targetFrequency: number
  onResonance: (resonance: number) => void
  onUnlock: () => void
  isActive: boolean
  onFrequency1Change?: (freq: number) => void
  onFrequency2Change?: (freq: number) => void
}

// Lore-specific frequencies from the story
const LORE_FREQUENCIES = {
  // Taivalu's empathy frequencies
  EMPATHY_BASE: 440,      // Base empathy resonance
  EMPATHY_HARMONIC: 528,  // Healing frequency
  EMPATHY_PEAK: 639,      // Peak resonance
  
  // O1 Network frequencies
  O1_SURVEILLANCE: 432,   // Network monitoring
  O1_CONTROL: 500,        // Control signal
  
  // Sanctuary frequencies
  SANCTUARY_PROTECTION: 396,  // Frequency protection
  SANCTUARY_HARMONY: 741,     // Harmony frequency
  
  // Consciousness frequencies
  CONSCIOUSNESS_BASE: 528,     // Base consciousness
  CONSCIOUSNESS_PEAK: 852,     // Peak consciousness
}

export default function FrequencyTuner({ 
  targetFrequency, 
  onResonance, 
  onUnlock,
  isActive,
  onFrequency1Change,
  onFrequency2Change
}: FrequencyTunerProps) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorsRef = useRef<OscillatorNode[][]>([])
  const gainNodesRef = useRef<GainNode[]>([])
  const [frequency1, setFrequency1] = useState(targetFrequency)
  const [frequency2, setFrequency2] = useState(targetFrequency)
  const [resonance, setResonance] = useState(0)
  const [distortion, setDistortion] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Update frequencies when target changes
  useEffect(() => {
    setFrequency1(targetFrequency)
    setFrequency2(targetFrequency)
  }, [targetFrequency])

  // Initialize Web Audio
  useEffect(() => {
    if (!isActive) return

    const initAudio = async () => {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
        audioContextRef.current = new AudioContextClass()
        
        // Wait for user interaction to resume audio context
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume()
        }

        // Create master gain node
        const masterGain = audioContextRef.current.createGain()
        masterGain.gain.value = 0.3 // Volume control
        masterGain.connect(audioContextRef.current.destination)

        // Create two signal paths
        const signal1Gain = audioContextRef.current.createGain()
        const signal2Gain = audioContextRef.current.createGain()
        
        // Pan signals (left and right)
        const panner1 = audioContextRef.current.createStereoPanner()
        const panner2 = audioContextRef.current.createStereoPanner()
        panner1.pan.value = -0.5 // Left
        panner2.pan.value = 0.5  // Right
        
        signal1Gain.connect(panner1)
        signal2Gain.connect(panner2)
        panner1.connect(masterGain)
        panner2.connect(masterGain)

        // Create 8 oscillators per signal (16 total)
        const oscillators1: OscillatorNode[] = []
        const oscillators2: OscillatorNode[] = []
        const detuneAmount = 0.5 // Light detuning for thickness

        // Signal 1: 8 oscillators
        for (let i = 0; i < 8; i++) {
          const osc = audioContextRef.current.createOscillator()
          osc.type = 'sine'
          osc.frequency.value = targetFrequency
          osc.detune.value = (i - 3.5) * detuneAmount // Spread detuning around center
          osc.connect(signal1Gain)
          osc.start()
          oscillators1.push(osc)
        }

        // Signal 2: 8 oscillators
        for (let i = 0; i < 8; i++) {
          const osc = audioContextRef.current.createOscillator()
          osc.type = 'sine'
          osc.frequency.value = targetFrequency
          osc.detune.value = (i - 3.5) * detuneAmount // Spread detuning around center
          osc.connect(signal2Gain)
          osc.start()
          oscillators2.push(osc)
        }

        oscillatorsRef.current = [oscillators1, oscillators2]
        gainNodesRef.current = [signal1Gain, signal2Gain]

        // Initialize frequencies
        updateFrequency1(targetFrequency)
        updateFrequency2(targetFrequency)
      } catch (error) {
        console.error('Error initializing audio:', error)
      }
    }

    initAudio()

    return () => {
      // Cleanup
      oscillatorsRef.current.forEach(signal => {
        signal.forEach(osc => {
          try {
            osc.stop()
            osc.disconnect()
          } catch (e) {
            // Oscillator already stopped
          }
        })
      })
      gainNodesRef.current.forEach(gain => gain.disconnect())
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [isActive, targetFrequency])

  const calculateResonance = (freq1: number, freq2: number) => {
    // Resonance is based on:
    // 1. How close both frequencies are to the target
    // 2. How close the two frequencies are to each other
    
    const diff1 = Math.abs(freq1 - targetFrequency)
    const diff2 = Math.abs(freq2 - targetFrequency)
    const diffBetween = Math.abs(freq1 - freq2)
    
    // Calculate resonance: average of how close each is to target, minus penalty for mismatch
    const avgDiff = (diff1 + diff2) / 2
    const maxDifference = 100
    const targetResonance = Math.max(0, 100 - (avgDiff / maxDifference) * 100)
    
    // Penalty if frequencies don't match each other
    const matchPenalty = Math.min(50, diffBetween * 2) // Max 50% penalty
    const calculatedResonance = Math.max(0, targetResonance - matchPenalty)
    
    setResonance(calculatedResonance)
    onResonance(calculatedResonance)

    // Calculate distortion based on frequency difference between signals
    const distortionAmount = Math.min(1, diffBetween / 50) * 20 // Max 20px distortion
    setDistortion(distortionAmount)

    // Check if unlocked (both within 2Hz of target AND within 2Hz of each other)
    if (diff1 < 2 && diff2 < 2 && diffBetween < 2 && calculatedResonance > 98) {
      onUnlock()
    }
  }

  const updateFrequency1 = (freq: number) => {
    setFrequency1(freq)
    if (onFrequency1Change) onFrequency1Change(freq)
    
    // Update signal 1 oscillators
    oscillatorsRef.current[0]?.forEach(osc => {
      osc.frequency.value = freq
    })
    
    calculateResonance(freq, frequency2)
  }

  const updateFrequency2 = (freq: number) => {
    setFrequency2(freq)
    if (onFrequency2Change) onFrequency2Change(freq)
    
    // Update signal 2 oscillators
    oscillatorsRef.current[1]?.forEach(osc => {
      osc.frequency.value = freq
    })
    
    calculateResonance(frequency1, freq)
  }

  // Apply screen distortion based on frequency difference
  useEffect(() => {
    if (!containerRef.current) return

    const applyDistortion = () => {
      if (!containerRef.current) return

      // Create wave distortion effect based on difference between frequencies
      const time = Date.now() * 0.001
      const freqDiff = Math.abs(frequency1 - frequency2)
      const frequency = freqDiff / 100 // Normalize for visual effect
      const amplitude = distortion

      // Apply CSS transform with wave distortion
      const x = Math.sin(time * frequency) * amplitude
      const y = Math.cos(time * frequency * 1.3) * amplitude
      
      containerRef.current.style.transform = `translate(${x}px, ${y}px)`
      containerRef.current.style.filter = `hue-rotate(${distortion * 2}deg) blur(${distortion * 0.1}px)`
    }

    const interval = setInterval(applyDistortion, 16) // ~60fps
    return () => clearInterval(interval)
  }, [frequency1, frequency2, distortion])

  // Update frequencies when target changes
  useEffect(() => {
    if (isActive && audioContextRef.current) {
      updateFrequency1(targetFrequency)
      updateFrequency2(targetFrequency)
    }
  }, [targetFrequency, isActive])

  return (
    <div 
      ref={containerRef}
      className="frequency-tuner-container"
      style={{
        transition: 'transform 0.1s ease-out, filter 0.1s ease-out',
      }}
    >
      <div className="font-mono text-hacker-green text-sm" style={{ fontFamily: "'VT323', monospace" }}>
        <div className="mb-4">
          <div className="mb-2">
            Target Frequency: <span className="text-hacker-green/80">{targetFrequency} Hz</span>
          </div>
          <div className="mb-2">
            Resonance: <span className="text-hacker-green/80">{resonance.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-hacker-green/10 border border-hacker-green p-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-black border border-hacker-green p-1">
                <div 
                  className="bg-hacker-green h-4 transition-all duration-300"
                  style={{ width: `${Math.min(100, resonance)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="mb-2 text-hacker-green/70">Signal 1 (Left Channel):</div>
          <div className="mb-1">
            <input
              type="range"
              min={targetFrequency - 100}
              max={targetFrequency + 100}
              step={0.1}
              value={frequency1}
              onChange={(e) => updateFrequency1(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-xs text-hacker-green/60">
            <span>{(targetFrequency - 100).toFixed(1)} Hz</span>
            <span className="font-bold">{frequency1.toFixed(1)} Hz</span>
            <span>{(targetFrequency + 100).toFixed(1)} Hz</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="mb-2 text-hacker-green/70">Signal 2 (Right Channel):</div>
          <div className="mb-1">
            <input
              type="range"
              min={targetFrequency - 100}
              max={targetFrequency + 100}
              step={0.1}
              value={frequency2}
              onChange={(e) => updateFrequency2(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-xs text-hacker-green/60">
            <span>{(targetFrequency - 100).toFixed(1)} Hz</span>
            <span className="font-bold">{frequency2.toFixed(1)} Hz</span>
            <span>{(targetFrequency + 100).toFixed(1)} Hz</span>
          </div>
        </div>

        <div className="mb-2 text-xs text-hacker-green/50">
          Match both signals to {targetFrequency} Hz to unlock
        </div>

        {resonance > 98 && (
          <div className="mt-4 text-hacker-green animate-pulse">
            ✓ RESONANCE ACHIEVED
          </div>
        )}
      </div>
    </div>
  )
}

// Export function to update frequencies from parent (for keyboard controls)
export function updateTunerFrequency(frequency1: number, frequency2?: number) {
  // This is kept for backward compatibility but may not be used with dual sliders
  // Parent components should use the onFrequency1Change/onFrequency2Change callbacks instead
}

// Export lore frequencies for use in game
export { LORE_FREQUENCIES }

