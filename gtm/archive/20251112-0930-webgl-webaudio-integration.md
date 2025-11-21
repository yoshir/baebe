# BAEBE: WebGL & Web Audio Integration
## Immersive Visual & Audio Experience Architecture

**Version:** v.20251112-0930  
**Last Updated:** 2025-11-12  
**Platform:** Browser-based (WebGL 2.0, Web Audio API)  
**Goal:** Immersive 3D visualizations and frequency-based audio experiences

---

## Design Philosophy

**Core Principle:** Use WebGL and Web Audio to create visceral, immersive experiences that make abstract concepts (resonance, frequency, dimensional phasing) tangible and emotionally resonant.

**Integration Strategy:**
- **Progressive Enhancement**: Works without WebGL/Audio, enhanced with it
- **Performance First**: Optimized for free tier hosting, efficient rendering
- **Narrative Cohesion**: Visual/audio directly tied to story elements
- **Network Effects**: Shared visual/audio experiences create community bonds
- **Accessibility**: Fallbacks for users without WebGL/Audio support

---

## WebGL Architecture

### Core Use Cases

**1. Resonance Visualization**
- 3D representation of collective resonance
- Particle systems showing participant connections
- Frequency waves, energy fields
- Real-time updates as resonance changes

**2. World State Rendering**
- 3D map of BAEBE's world (O1 Tower, Undercity, Sanctuaries)
- Visual representation of world state changes
- Environmental effects (yellow haze, toxic fog)
- Converted zones vs. free zones

**3. Resonant Fade Effects**
- Visual representation of dimensional phasing
- Double-exposure, temporal distortion
- Reality glitching, probability state visualization
- Baebe's ability made visible

**4. Shard Collection Visualization**
- 3D shard fragments floating in space
- Collection progress, missing pieces
- Trading interface, shard connections
- Memory synthesis visualization

**5. Puzzle Collaboration Board**
- 3D puzzle pieces in shared space
- Real-time collaboration visualization
- See others working, progress indicators
- Completion celebrations

**6. Frequency Storm Events**
- Immersive 3D experience during storms
- Particle explosions, energy waves
- Synchronized across all participants
- Narrative event visualization

### Technology Stack

**WebGL Framework:**
- **Three.js** (primary) - Most mature, large ecosystem
- **React Three Fiber** - React integration, declarative
- **@react-three/drei** - Helpers, controls, effects
- **@react-three/postprocessing** - Visual effects

**Alternative (Lighter):**
- **Babylon.js** - More features, larger bundle
- **PixiJS** - 2D/WebGL hybrid, very performant

**Recommendation:** Three.js + React Three Fiber for React integration and ecosystem.

### Core Components

```typescript
// components/webgl/ResonanceVisualization.tsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Particles } from '@react-three/drei'
import { useResonance } from '@/hooks/useResonance'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

export function ResonanceVisualization() {
  const { resonance, activeCount } = useResonance()
  const particlesRef = useRef<THREE.Points>(null)
  
  // Generate particles based on active participants
  const particles = useMemo(() => {
    const count = activeCount * 10 // 10 particles per participant
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    
    return positions
  }, [activeCount])
  
  // Animate particles based on resonance
  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      const time = state.clock.elapsedTime
      
      for (let i = 0; i < positions.length; i += 3) {
        // Create wave effect based on resonance
        const wave = Math.sin(time + i * 0.01) * (resonance / 100)
        positions[i + 1] += wave * 0.01
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })
  
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]} // Adaptive pixel ratio
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Resonance field - color changes with level */}
      <mesh>
        <sphereGeometry args={[5, 32, 32]} />
        <meshStandardMaterial
          color={new THREE.Color().setHSL(resonance / 100, 0.8, 0.5)}
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>
      
      {/* Participant particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color={new THREE.Color().setHSL(resonance / 100, 1, 0.6)}
        />
      </points>
      
      <OrbitControls enableDamping dampingFactor={0.05} />
      <Environment preset="night" />
    </Canvas>
  )
}
```

```typescript
// components/webgl/WorldStateMap.tsx
export function WorldStateMap() {
  const { state } = useWorldState()
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  
  const locations = useMemo(() => {
    return [
      {
        id: 'o1-tower',
        name: 'O1 Tower',
        position: [0, 5, 0],
        status: state?.o1_tower_status || 'active',
        color: '#00FFFF' // Cyan
      },
      {
        id: 'undercity',
        name: 'Undercity',
        position: [-5, -3, 0],
        status: state?.undercity_status || 'active',
        color: '#FFB347' // Amber
      },
      {
        id: 'sanctuary',
        name: 'Sanctuary',
        position: [5, -3, 0],
        status: state?.sanctuary_status || 'protected',
        color: '#90EE90' // Light green
      }
    ]
  }, [state])
  
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0A0E27" />
      </mesh>
      
      {/* Location markers */}
      {locations.map(loc => (
        <LocationMarker
          key={loc.id}
          location={loc}
          selected={selectedLocation === loc.id}
          onClick={() => setSelectedLocation(loc.id)}
        />
      ))}
      
      {/* Connection lines between locations */}
      <Connections locations={locations} />
      
      {/* Environmental effects */}
      <FogEffect intensity={state?.haze_level || 0.3} />
      
      <OrbitControls />
    </Canvas>
  )
}
```

```typescript
// components/webgl/ResonantFadeEffect.tsx
export function ResonantFadeEffect({ active, intensity }: { active: boolean, intensity: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current && active) {
      // Temporal distortion - shift between probability states
      const time = state.clock.elapsedTime
      const phase = Math.sin(time * 2) * intensity
      
      // Position shift (dimensional phasing)
      meshRef.current.position.x = Math.sin(time) * phase
      meshRef.current.position.y = Math.cos(time) * phase
      
      // Opacity flicker (reality glitching)
      const material = meshRef.current.material as THREE.MeshStandardMaterial
      material.opacity = 0.5 + Math.sin(time * 5) * 0.3
    }
  })
  
  if (!active) return null
  
  return (
    <EffectComposer>
      <Bloom intensity={intensity} />
      <ChromaticAberration offset={[intensity * 0.01, intensity * 0.01]} />
      <Vignette eskil={false} offset={0.1} darkness={0.5} />
    </EffectComposer>
  )
}
```

```typescript
// components/webgl/ShardCollection3D.tsx
export function ShardCollection3D({ shards, collected }: ShardCollectionProps) {
  const shardRefs = useRef<THREE.Group[]>([])
  
  // Arrange shards in 3D space
  const positions = useMemo(() => {
    const radius = 5
    const count = shards.length
    return shards.map((_, i) => {
      const angle = (i / count) * Math.PI * 2
      return [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 2
      ]
    })
  }, [shards])
  
  return (
    <Canvas camera={{ position: [0, 0, 15] }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} />
      
      {shards.map((shard, i) => (
        <ShardFragment
          key={shard.id}
          position={positions[i]}
          shard={shard}
          collected={collected.includes(shard.id)}
          ref={(el) => shardRefs.current[i] = el}
        />
      ))}
      
      {/* Connection lines between collected shards */}
      <ShardConnections shards={shards} collected={collected} />
      
      <OrbitControls />
    </Canvas>
  )
}

function ShardFragment({ shard, collected, ...props }: ShardFragmentProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.y += 0.01
      
      // Collected shards glow
      if (collected) {
        const material = meshRef.current.material as THREE.MeshStandardMaterial
        material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime) * 0.3
      }
    }
  })
  
  return (
    <mesh ref={meshRef} {...props}>
      <icosahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial
        color={collected ? '#00FFFF' : '#666666'}
        emissive={collected ? '#00FFFF' : '#000000'}
        emissiveIntensity={collected ? 0.5 : 0}
        transparent
        opacity={collected ? 1 : 0.5}
      />
    </mesh>
  )
}
```

### Performance Optimization

```typescript
// hooks/useWebGLPerformance.ts
export function useWebGLPerformance() {
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high')
  
  useEffect(() => {
    // Detect device capabilities
    const gl = document.createElement('canvas').getContext('webgl2')
    if (!gl) {
      setQuality('low')
      return
    }
    
    // Check GPU capabilities
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      // Mobile GPUs = lower quality
      if (renderer.includes('Mali') || renderer.includes('Adreno') || renderer.includes('PowerVR')) {
        setQuality('medium')
      }
    }
    
    // Check frame rate
    let lastTime = performance.now()
    let frameCount = 0
    
    const checkFPS = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime >= lastTime + 1000) {
        const fps = frameCount
        frameCount = 0
        lastTime = currentTime
        
        if (fps < 30 && quality === 'high') {
          setQuality('medium')
        } else if (fps < 20 && quality === 'medium') {
          setQuality('low')
        }
      }
      
      requestAnimationFrame(checkFPS)
    }
    
    checkFPS()
  }, [quality])
  
  return quality
}

// Adaptive rendering
export function AdaptiveCanvas({ children, ...props }) {
  const quality = useWebGLPerformance()
  
  const canvasProps = useMemo(() => {
    switch (quality) {
      case 'high':
        return { dpr: [1, 2], antialias: true }
      case 'medium':
        return { dpr: 1, antialias: false }
      case 'low':
        return { dpr: 0.75, antialias: false, performance: 'low' }
    }
  }, [quality])
  
  return (
    <Canvas {...props} {...canvasProps}>
      {children}
    </Canvas>
  )
}
```

---

## Web Audio Architecture

### Core Use Cases

**1. Taivalu's Resonance**
- Frequency manipulation that creates physical sensation
- Harmonic frequencies, sub-bass
- Real-time generation based on resonance level
- Empathy virus audio effects

**2. Frequency Storm Events**
- Synchronized audio experiences
- Layered frequencies, building intensity
- Community-wide audio events
- Narrative audio cues

**3. Environmental Soundscape**
- O1 zones: Synthetic, precise, denoised
- Undercity: Grainy, compressed, lo-fi
- Sanctuaries: Natural, warm, analog
- Dynamic mixing based on location

**4. Resonant Fade Audio**
- Frequency shifts, phase cancellation
- Temporal audio distortion
- Reality glitching sounds
- Dimensional phasing audio

**5. Interactive Frequency Tuner**
- Users can manipulate frequencies
- Discover hidden content through tuning
- Collaborative frequency experiments
- Resonance contribution through audio

**6. Memory Flash Audio**
- Warm analog tape hiss
- Distant voices, echoes
- Ayumi's voice, past moments
- Emotional audio triggers

### Technology Stack

**Web Audio API:**
- Native browser API (no dependencies)
- AudioContext, AudioNodes, AudioWorklet
- Real-time audio processing
- Frequency analysis, synthesis

**Libraries (Optional):**
- **Tone.js** - Higher-level audio framework
- **Howler.js** - Audio playback, spatial audio
- **Pizzicato** - Sound synthesis
- **Wavesurfer.js** - Waveform visualization

**Recommendation:** Native Web Audio API for control, Tone.js for complex synthesis.

### Core Components

```typescript
// hooks/useResonanceAudio.ts
import { useEffect, useRef } from 'react'
import { useResonance } from './useResonance'

export function useResonanceAudio() {
  const { resonance, activeCount } = useResonance()
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  
  useEffect(() => {
    // Initialize AudioContext (requires user interaction)
    const initAudio = async () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext()
        
        // Resume if suspended (browser autoplay policy)
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume()
        }
      }
    }
    
    initAudio()
    
    return () => {
      // Cleanup
      if (oscillatorRef.current) {
        oscillatorRef.current.stop()
        oscillatorRef.current.disconnect()
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])
  
  useEffect(() => {
    if (!audioContextRef.current || resonance === 0) return
    
    const ctx = audioContextRef.current
    
    // Create oscillator for resonance frequency
    // Resonance maps to frequency: 0-100 → 60-120 Hz (sub-bass range)
    const frequency = 60 + (resonance / 100) * 60
    const amplitude = resonance / 100 * 0.1 // Keep volume low
    
    // Create oscillator
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.type = 'sine' // Pure tone
    oscillator.frequency.value = frequency
    
    gainNode.gain.value = amplitude
    
    // Connect: oscillator → gain → destination
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.start()
    
    oscillatorRef.current = oscillator
    gainNodeRef.current = gainNode
    
    // Animate frequency based on resonance changes
    const animate = () => {
      if (oscillator && gainNode) {
        const targetFreq = 60 + (resonance / 100) * 60
        const targetGain = (resonance / 100) * 0.1
        
        oscillator.frequency.exponentialRampToValueAtTime(
          targetFreq,
          ctx.currentTime + 0.1
        )
        gainNode.gain.exponentialRampToValueAtTime(
          targetGain,
          ctx.currentTime + 0.1
        )
      }
    }
    
    const interval = setInterval(animate, 100)
    
    return () => {
      clearInterval(interval)
      if (oscillator) {
        oscillator.stop()
        oscillator.disconnect()
      }
      if (gainNode) {
        gainNode.disconnect()
      }
    }
  }, [resonance])
  
  return { audioContext: audioContextRef.current }
}
```

```typescript
// hooks/useFrequencyStorm.ts
export function useFrequencyStorm() {
  const { stormActive, stormLevel } = useFrequencyStormState()
  const audioContextRef = useRef<AudioContext | null>(null)
  const sourcesRef = useRef<AudioBufferSourceNode[]>([])
  
  useEffect(() => {
    if (!stormActive || !audioContextRef.current) return
    
    const ctx = audioContextRef.current
    const sources: AudioBufferSourceNode[] = []
    
    // Create layered frequencies for storm
    // Multiple oscillators at different frequencies
    const frequencies = [
      60,   // Sub-bass
      120,  // Bass
      240,  // Low mid
      480,  // Mid
      960,  // High mid
    ]
    
    frequencies.forEach((freq, i) => {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      const filter = ctx.createBiquadFilter()
      
      oscillator.type = 'sine'
      oscillator.frequency.value = freq
      
      // Filter creates resonance effect
      filter.type = 'peaking'
      filter.frequency.value = freq
      filter.Q.value = 10
      filter.gain.value = stormLevel / 10
      
      gainNode.gain.value = (stormLevel / 100) * 0.05 * (1 / (i + 1))
      
      oscillator.connect(filter)
      filter.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      oscillator.start()
      sources.push(oscillator as any)
    })
    
    sourcesRef.current = sources
    
    // Storm duration: 5 minutes
    const duration = 300000 // ms
    
    // Fade out at end
    setTimeout(() => {
      sources.forEach(source => {
        const gainNode = source.gainNode
        if (gainNode) {
          gainNode.gain.exponentialRampToValueAtTime(
            0.001,
            ctx.currentTime + 2
          )
        }
        source.stop(ctx.currentTime + 2)
      })
    }, duration - 2000)
    
    return () => {
      sources.forEach(source => {
        try {
          source.stop()
          source.disconnect()
        } catch (e) {
          // Already stopped
        }
      })
      sourcesRef.current = []
    }
  }, [stormActive, stormLevel])
  
  return { stormActive, stormLevel }
}
```

```typescript
// hooks/useEnvironmentalSoundscape.ts
export function useEnvironmentalSoundscape(location: string) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const sourcesRef = useRef<AudioBufferSourceNode[]>([])
  
  useEffect(() => {
    const initAudio = async () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext()
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume()
        }
      }
    }
    
    initAudio()
    
    return () => {
      sourcesRef.current.forEach(source => {
        try {
          source.stop()
          source.disconnect()
        } catch (e) {}
      })
      sourcesRef.current = []
    }
  }, [])
  
  useEffect(() => {
    if (!audioContextRef.current) return
    
    const ctx = audioContextRef.current
    
    // Load and play environmental audio based on location
    const loadEnvironment = async () => {
      // Stop previous sources
      sourcesRef.current.forEach(source => {
        try {
          source.stop()
          source.disconnect()
        } catch (e) {}
      })
      sourcesRef.current = []
      
      let audioFile: string
      let processing: (source: AudioBufferSourceNode, ctx: AudioContext) => void
      
      switch (location) {
        case 'o1-tower':
          audioFile = '/audio/environments/o1-zone.mp3'
          processing = (source, ctx) => {
            // Denoise, precise, synthetic
            const filter = ctx.createBiquadFilter()
            filter.type = 'lowpass'
            filter.frequency.value = 8000
            filter.Q.value = 1
            source.connect(filter)
            filter.connect(ctx.destination)
          }
          break
          
        case 'undercity':
          audioFile = '/audio/environments/undercity.mp3'
          processing = (source, ctx) => {
            // Grainy, compressed, lo-fi
            const compressor = ctx.createDynamicsCompressor()
            compressor.threshold.value = -24
            compressor.knee.value = 30
            compressor.ratio.value = 12
            compressor.attack.value = 0.003
            compressor.release.value = 0.25
            
            // Add distortion
            const distortion = ctx.createWaveShaper()
            distortion.curve = makeDistortionCurve(20)
            distortion.oversample = '4x'
            
            source.connect(distortion)
            distortion.connect(compressor)
            compressor.connect(ctx.destination)
          }
          break
          
        case 'sanctuary':
          audioFile = '/audio/environments/sanctuary.mp3'
          processing = (source, ctx) => {
            // Natural, warm, analog
            const filter = ctx.createBiquadFilter()
            filter.type = 'lowpass'
            filter.frequency.value = 12000
            filter.Q.value = 0.5
            
            // Slight reverb
            const convolver = ctx.createConvolver()
            // Load impulse response for reverb
            
            source.connect(filter)
            filter.connect(convolver)
            convolver.connect(ctx.destination)
          }
          break
          
        default:
          return
      }
      
      // Load audio file
      const response = await fetch(audioFile)
      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer)
      
      // Create looping source
      const playLoop = () => {
        const source = ctx.createBufferSource()
        source.buffer = audioBuffer
        source.loop = true
        
        processing(source, ctx)
        
        source.start()
        sourcesRef.current.push(source)
      }
      
      playLoop()
    }
    
    loadEnvironment()
  }, [location])
  
  return { audioContext: audioContextRef.current }
}

function makeDistortionCurve(amount: number): Float32Array {
  const samples = 44100
  const curve = new Float32Array(samples)
  const deg = Math.PI / 180
  
  for (let i = 0; i < samples; i++) {
    const x = (i * 2) / samples - 1
    curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x))
  }
  
  return curve
}
```

```typescript
// components/audio/FrequencyTuner.tsx
export function FrequencyTuner() {
  const audioContextRef = useRef<AudioContext | null>(null)
  const [frequency, setFrequency] = useState(440) // A4
  const [amplitude, setAmplitude] = useState(0.1)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const [detectedContent, setDetectedContent] = useState<string | null>(null)
  
  useEffect(() => {
    const initAudio = async () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext()
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume()
        }
      }
      
      // Create analyser for frequency detection
      const analyser = audioContextRef.current.createAnalyser()
      analyser.fftSize = 2048
      analyserRef.current = analyser
    }
    
    initAudio()
  }, [])
  
  useEffect(() => {
    if (!audioContextRef.current) return
    
    const ctx = audioContextRef.current
    
    // Create oscillator
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    const analyser = analyserRef.current!
    
    oscillator.type = 'sine'
    oscillator.frequency.value = frequency
    gainNode.gain.value = amplitude
    
    oscillator.connect(gainNode)
    gainNode.connect(analyser)
    analyser.connect(ctx.destination)
    
    oscillator.start()
    oscillatorRef.current = oscillator
    
    // Analyze frequency for hidden content
    const checkFrequency = () => {
      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      analyser.getByteFrequencyData(dataArray)
      
      // Check if frequency matches known content frequencies
      const content = detectContentAtFrequency(frequency)
      if (content) {
        setDetectedContent(content)
      }
    }
    
    const interval = setInterval(checkFrequency, 100)
    
    return () => {
      clearInterval(interval)
      if (oscillator) {
        oscillator.stop()
        oscillator.disconnect()
      }
      if (gainNode) {
        gainNode.disconnect()
      }
    }
  }, [frequency, amplitude])
  
  return (
    <div className="frequency-tuner">
      <input
        type="range"
        min="20"
        max="20000"
        value={frequency}
        onChange={(e) => setFrequency(Number(e.target.value))}
      />
      <span>{frequency} Hz</span>
      
      {detectedContent && (
        <div className="detected-content">
          Content unlocked: {detectedContent}
        </div>
      )}
      
      <FrequencyVisualizer analyser={analyserRef.current} />
    </div>
  )
}

function detectContentAtFrequency(freq: number): string | null {
  // Known frequencies that unlock content
  const contentFrequencies: Record<number, string> = {
    432: 'ayumi-memory-001',
    528: 'taivalu-performance',
    639: 'resonance-storm',
    741: 'sanctuary-location',
    852: 'angel-encounter',
  }
  
  // Check within 5 Hz tolerance
  for (const [contentFreq, content] of Object.entries(contentFrequencies)) {
    if (Math.abs(freq - Number(contentFreq)) < 5) {
      return content
    }
  }
  
  return null
}
```

```typescript
// components/audio/ResonantFadeAudio.tsx
export function ResonantFadeAudio({ active, intensity }: ResonantFadeAudioProps) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const sourcesRef = useRef<AudioNode[]>([])
  
  useEffect(() => {
    if (!active || !audioContextRef.current) return
    
    const ctx = audioContextRef.current
    
    // Create phase cancellation effect (dimensional phasing)
    const createPhaseShift = () => {
      const oscillator1 = ctx.createOscillator()
      const oscillator2 = ctx.createOscillator()
      const gainNode1 = ctx.createGain()
      const gainNode2 = ctx.createGain()
      const delayNode = ctx.createDelay()
      
      // Two oscillators slightly out of phase
      oscillator1.type = 'sine'
      oscillator1.frequency.value = 440
      oscillator2.type = 'sine'
      oscillator2.frequency.value = 440.5 // Slight detune
      
      delayNode.delayTime.value = 0.01 * intensity
      
      oscillator1.connect(gainNode1)
      oscillator2.connect(delayNode)
      delayNode.connect(gainNode2)
      
      gainNode1.gain.value = 0.1 * (1 - intensity)
      gainNode2.gain.value = 0.1 * intensity
      
      gainNode1.connect(ctx.destination)
      gainNode2.connect(ctx.destination)
      
      oscillator1.start()
      oscillator2.start()
      
      sourcesRef.current.push(oscillator1, oscillator2, delayNode)
    }
    
    // Create frequency shift (temporal distortion)
    const createFrequencyShift = () => {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      oscillator.type = 'sawtooth'
      oscillator.frequency.value = 200
      
      // Animate frequency (reality glitching)
      const animate = () => {
        const time = ctx.currentTime
        const shift = Math.sin(time * 2) * intensity * 50
        oscillator.frequency.exponentialRampToValueAtTime(
          200 + shift,
          time + 0.1
        )
      }
      
      const interval = setInterval(animate, 100)
      
      gainNode.gain.value = 0.05 * intensity
      
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      oscillator.start()
      
      sourcesRef.current.push(oscillator)
      
      return () => clearInterval(interval)
    }
    
    createPhaseShift()
    const cleanup = createFrequencyShift()
    
    return () => {
      cleanup?.()
      sourcesRef.current.forEach(source => {
        try {
          if (source instanceof OscillatorNode) {
            source.stop()
          }
          source.disconnect()
        } catch (e) {}
      })
      sourcesRef.current = []
    }
  }, [active, intensity])
  
  return null // Audio only, no visual
}
```

### Audio Worklet for Advanced Processing

```typescript
// audio-worklets/resonance-processor.ts
// AudioWorklet processor for real-time resonance processing

class ResonanceProcessor extends AudioWorkletProcessor {
  private resonanceLevel: number = 0
  
  constructor() {
    super()
    
    // Listen for resonance updates from main thread
    this.port.onmessage = (event) => {
      if (event.data.resonance !== undefined) {
        this.resonanceLevel = event.data.resonance
      }
    }
  }
  
  process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: any) {
    const output = outputs[0]
    const input = inputs[0]
    
    // Process audio with resonance-based effects
    for (let channel = 0; channel < output.length; channel++) {
      const inputChannel = input[channel] || new Float32Array(output[channel].length)
      const outputChannel = output[channel]
      
      for (let i = 0; i < outputChannel.length; i++) {
        // Apply resonance-based processing
        const resonanceGain = this.resonanceLevel / 100
        const processed = inputChannel[i] * (1 + resonanceGain * 0.1)
        
        // Add subtle frequency modulation
        const modulation = Math.sin(i * 0.01) * resonanceGain * 0.05
        outputChannel[i] = processed + modulation
      }
    }
    
    return true
  }
}

registerProcessor('resonance-processor', ResonanceProcessor)
```

---

## Integration with Persistent Experience

### Real-Time Synchronization

```typescript
// Sync WebGL/Audio with server state
export function useSynchronizedExperience() {
  const { resonance, activeCount } = useResonance()
  const { state: worldState } = useWorldState()
  const { stormActive, stormLevel } = useFrequencyStorm()
  
  // WebGL updates
  useEffect(() => {
    // Update 3D scene when resonance changes
    // (handled by React Three Fiber reactivity)
  }, [resonance, activeCount])
  
  // Audio updates
  useEffect(() => {
    // Update audio when resonance changes
    // (handled by useResonanceAudio hook)
  }, [resonance])
  
  // Synchronized events
  useEffect(() => {
    if (stormActive) {
      // Trigger both visual and audio storm
      triggerVisualStorm(stormLevel)
      triggerAudioStorm(stormLevel)
    }
  }, [stormActive, stormLevel])
  
  return {
    resonance,
    activeCount,
    worldState,
    stormActive,
    stormLevel
  }
}
```

### Progressive Enhancement

```typescript
// components/ExperienceWrapper.tsx
export function ExperienceWrapper({ children }) {
  const [webglSupported, setWebglSupported] = useState(false)
  const [audioSupported, setAudioSupported] = useState(false)
  
  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    setWebglSupported(!!gl)
    
    // Check Web Audio support
    setAudioSupported(!!window.AudioContext || !!(window as any).webkitAudioContext)
  }, [])
  
  if (!webglSupported && !audioSupported) {
    // Fallback: 2D canvas + HTML5 audio
    return <FallbackExperience>{children}</FallbackExperience>
  }
  
  return (
    <EnhancedExperience
      webglEnabled={webglSupported}
      audioEnabled={audioSupported}
    >
      {children}
    </EnhancedExperience>
  )
}
```

### Performance Monitoring

```typescript
// hooks/useWebGLPerformance.ts (extended)
export function useWebGLPerformance() {
  const [fps, setFps] = useState(60)
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high')
  
  useFrame((state) => {
    // Measure FPS
    const delta = state.clock.getDelta()
    const currentFPS = 1 / delta
    setFps(currentFPS)
    
    // Adjust quality based on performance
    if (currentFPS < 30 && quality === 'high') {
      setQuality('medium')
    } else if (currentFPS < 20 && quality === 'medium') {
      setQuality('low')
    }
  })
  
  return { fps, quality, setQuality }
}
```

---

## Asset Management

### Audio Files

```
/public/audio/
  /environments/
    o1-zone.mp3
    undercity.mp3
    sanctuary.mp3
  /taivalu/
    performance-001.mp3
    performance-002.mp3
  /events/
    resonance-storm.mp3
    memory-flash.mp3
  /fx/
    resonant-fade.mp3
    shard-discovery.mp3
```

### 3D Models (Optional)

```
/public/models/
  shard-fragment.glb
  o1-tower.glb
  undercity-entrance.glb
```

### Optimization

- **Audio**: Compress to MP3/OGG, use appropriate bitrates
- **3D Models**: Use GLB format, optimize geometry
- **Textures**: Compress, use appropriate resolutions
- **Lazy Loading**: Load assets on demand
- **CDN**: Serve from Vercel Edge Network

---

## Accessibility & Fallbacks

### WebGL Fallbacks

```typescript
// 2D Canvas fallback
export function Fallback2DVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resonance } = useResonance()
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Draw 2D visualization
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw resonance circle
      ctx.beginPath()
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        (resonance / 100) * 100,
        0,
        Math.PI * 2
      )
      ctx.fillStyle = `hsl(${resonance}, 80%, 50%)`
      ctx.fill()
    }
    
    draw()
  }, [resonance])
  
  return <canvas ref={canvasRef} width={800} height={600} />
}
```

### Audio Fallbacks

```typescript
// HTML5 Audio fallback
export function FallbackAudio({ src, loop }: AudioProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  
  return (
    <audio
      ref={audioRef}
      src={src}
      loop={loop}
      preload="auto"
      controls={false}
    />
  )
}
```

---

## Implementation Checklist

- [ ] Set up Three.js + React Three Fiber
- [ ] Create ResonanceVisualization component
- [ ] Create WorldStateMap component
- [ ] Create ResonantFadeEffect component
- [ ] Create ShardCollection3D component
- [ ] Set up Web Audio API hooks
- [ ] Create useResonanceAudio hook
- [ ] Create useFrequencyStorm hook
- [ ] Create useEnvironmentalSoundscape hook
- [ ] Create FrequencyTuner component
- [ ] Create ResonantFadeAudio component
- [ ] Implement performance monitoring
- [ ] Add progressive enhancement
- [ ] Create fallback components
- [ ] Optimize assets
- [ ] Test on various devices
- [ ] Add accessibility features

---

**Document Status:** Technical Design  
**Implementation Priority:** High  
**Estimated Development Time:** 6-8 weeks  
**Dependencies:** Three.js, React Three Fiber, Web Audio API support

