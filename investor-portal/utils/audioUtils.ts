// Audio utility for high-tech psychological thriller sound effects

let audioContext: AudioContext | null = null

// Initialize audio context (requires user interaction)
export function initAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    audioContext = new AudioContextClass()
  }
  
  // Resume if suspended (requires user interaction)
  if (audioContext.state === 'suspended') {
    audioContext.resume().catch(() => {
      // Silently fail if user hasn't interacted yet
    })
  }
  
  return audioContext
}

// Generate a low-frequency click for keystrokes
// Subtle, low, technical - like a soft keyboard click
export function playKeystrokeSound(volume: number = 0.15) {
  const ctx = initAudioContext()
  if (!ctx) return

  try {
    // Create a short, low-frequency click
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    const filterNode = ctx.createBiquadFilter()
    
    oscillator.connect(filterNode)
    filterNode.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    // Low-frequency click
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(200, ctx.currentTime) // Low frequency
    oscillator.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.01) // Slight drop
    
    // Lowpass filter for muffled, low click
    filterNode.type = 'lowpass'
    filterNode.frequency.setValueAtTime(300, ctx.currentTime)
    filterNode.Q.value = 1 // Low Q for smooth, muffled character
    
    // Very short attack, quick decay - sharp click
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.001) // Instant attack
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03) // Quick decay
    
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.03)
    
  } catch (error) {
    // Silently fail if audio can't be played
    console.debug('Audio playback failed:', error)
  }
}

// Play a low-frequency click for actions - subtle, low, technical
export function playActionSound(volume: number = 0.2) {
  const ctx = initAudioContext()
  if (!ctx) return

  try {
    // Create a low-frequency click with slight frequency variation
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    const filterNode = ctx.createBiquadFilter()
    
    oscillator.connect(filterNode)
    filterNode.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    // Low-frequency click - slightly lower than keystroke
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(180, ctx.currentTime) // Low frequency
    oscillator.frequency.exponentialRampToValueAtTime(130, ctx.currentTime + 0.02) // Slight drop
    
    // Lowpass filter for muffled, low click
    filterNode.type = 'lowpass'
    filterNode.frequency.setValueAtTime(250, ctx.currentTime)
    filterNode.Q.value = 1.2 // Low Q for smooth, muffled character
    
    // Quick attack, brief sustain, clean decay
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.002) // Quick attack
    gainNode.gain.setValueAtTime(volume, ctx.currentTime + 0.03) // Brief sustain
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05) // Clean decay
    
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.05)
    
  } catch (error) {
    console.debug('Audio playback failed:', error)
  }
}

// Play static + modem boot sound for glitch/pseudocode effect
export function playModemStaticSound(volume: number = 0.3, duration: number = 0.1) {
  const ctx = initAudioContext()
  if (!ctx) return

  try {
    // Create multiple noise sources for static effect
    const bufferSize = ctx.sampleRate * duration
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    
    // Generate white noise (static)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3 // White noise
    }
    
    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = buffer
    
    // Modem-like tones (14,400 baud modem handshake sequence)
    const modemTones: OscillatorNode[] = []
    const modemFrequencies = [1200, 2400, 14400] // Common modem frequencies
    
    // Create modem tone oscillators
    modemFrequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      
      osc.type = 'sine'
      osc.frequency.value = freq
      
      // Stagger the tones like a modem handshake
      gain.gain.setValueAtTime(0, ctx.currentTime + index * 0.01)
      gain.gain.linearRampToValueAtTime(volume * 0.2, ctx.currentTime + index * 0.01 + 0.005)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.01 + duration)
      
      osc.connect(gain)
      gain.connect(ctx.destination)
      
      osc.start(ctx.currentTime + index * 0.01)
      osc.stop(ctx.currentTime + index * 0.01 + duration)
      
      modemTones.push(osc)
    })
    
    // Filter the noise to sound more like modem static
    const noiseFilter = ctx.createBiquadFilter()
    noiseFilter.type = 'bandpass'
    noiseFilter.frequency.value = 2000
    noiseFilter.Q.value = 2
    
    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0, ctx.currentTime)
    noiseGain.gain.linearRampToValueAtTime(volume * 0.4, ctx.currentTime + 0.001)
    noiseGain.gain.exponentialRampToValueAtTime(volume * 0.2, ctx.currentTime + duration * 0.5)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    
    noiseSource.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    
    noiseSource.start(ctx.currentTime)
    noiseSource.stop(ctx.currentTime + duration)
    
  } catch (error) {
    console.debug('Audio playback failed:', error)
  }
}

