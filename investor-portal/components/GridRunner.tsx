'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface GridRunnerProps {
  onBack: () => void
}

interface GameState {
  currentWorld: number
  currentLevel: number
  playerPosition: { x: number; y: number }
  playerForm: 'beep' | 'tone' | 'spark'
  collectedShards: string[]
  unlockedWorlds: number[]
  credits: number
  gameMode: 'menu' | 'playing' | 'paused' | 'gameover' | 'victory'
}

interface Player {
  x: number
  y: number
  vx: number
  vy: number
  onGround: boolean
  form: 'beep' | 'tone' | 'spark'
  width: number
  height: number
}

interface Tile {
  x: number
  y: number
  type: 'empty' | 'wall' | 'platform' | 'shard' | 'exit'
}

// Apple II color palette
const COLORS = {
  background: '#000000',
  walls: '#FF6600',
  player: '#FFFF00',
  collectibles: '#00FF00',
  text: '#00FF00',
  ui: '#00FF00',
}

// Game constants
const TILE_SIZE = 16
const BASE_WIDTH = 280
const BASE_HEIGHT = 192
const PLAYER_SIZE = 16
const GRAVITY = 0.5
const JUMP_FORCE = -8
const MOVE_SPEED = 2

export default function GridRunner({ onBack }: GridRunnerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const [gameState, setGameState] = useState<GameState>({
    currentWorld: 1,
    currentLevel: 1,
    playerPosition: { x: 40, y: 40 },
    playerForm: 'beep',
    collectedShards: [],
    unlockedWorlds: [1],
    credits: 0,
    gameMode: 'menu',
  })
  const [player, setPlayer] = useState<Player>({
    x: 40,
    y: 40,
    vx: 0,
    vy: 0,
    onGround: false,
    form: 'beep',
    width: PLAYER_SIZE,
    height: PLAYER_SIZE,
  })
  const [keys, setKeys] = useState<Set<string>>(new Set())
  const [scale, setScale] = useState(2)
  const [showTouchControls, setShowTouchControls] = useState(false)

  // Simple level data (grid-based)
  const levelData = useRef<Tile[][]>([])

  // Initialize level
  const initLevel = useCallback(() => {
    const width = Math.floor(BASE_WIDTH / TILE_SIZE)
    const height = Math.floor(BASE_HEIGHT / TILE_SIZE)
    const tiles: Tile[][] = []

    // Create simple level: walls around edges, platforms, exit
    for (let y = 0; y < height; y++) {
      tiles[y] = []
      for (let x = 0; x < width; x++) {
        if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
          tiles[y][x] = { x, y, type: 'wall' }
        } else if (x === width - 2 && y === height - 2) {
          tiles[y][x] = { x, y, type: 'exit' }
        } else if (Math.random() < 0.1 && x > 2 && y > 2) {
          tiles[y][x] = { x, y, type: 'shard' }
        } else {
          tiles[y][x] = { x, y, type: 'empty' }
        }
      }
    }

    // Add some platforms
    for (let i = 0; i < 5; i++) {
      const px = Math.floor(Math.random() * (width - 4)) + 2
      const py = Math.floor(Math.random() * (height - 4)) + 2
      if (tiles[py] && tiles[py][px] && tiles[py][px].type === 'empty') {
        tiles[py][px] = { x: px, y: py, type: 'platform' }
      }
    }

    levelData.current = tiles
  }, [])

  // Calculate responsive scale
  useEffect(() => {
    const calculateScale = () => {
      if (!canvasRef.current) return
      const container = canvasRef.current.parentElement
      if (!container) return

      const containerWidth = container.clientWidth
      const containerHeight = container.clientHeight

      // Calculate scale to fit container while maintaining aspect ratio
      const scaleX = Math.floor(containerWidth / BASE_WIDTH)
      const scaleY = Math.floor(containerHeight / BASE_HEIGHT)
      const newScale = Math.max(1, Math.min(scaleX, scaleY, 4)) // Max 4x scale

      setScale(newScale)
      setShowTouchControls(window.innerWidth < 768) // Show on mobile
    }

    calculateScale()
    window.addEventListener('resize', calculateScale)
    return () => window.removeEventListener('resize', calculateScale)
  }, [])

  // Keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && gameState.gameMode === 'playing') {
        setGameState(prev => ({ ...prev, gameMode: 'paused' }))
        return
      }
      setKeys(prev => new Set(prev).add(e.key.toLowerCase()))
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys(prev => {
        const newKeys = new Set(prev)
        newKeys.delete(e.key.toLowerCase())
        return newKeys
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [gameState.gameMode])

  // Game loop - separate render loop
  useEffect(() => {
    if (gameState.gameMode !== 'playing') {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      return
    }

    const render = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Clear canvas
      ctx.fillStyle = COLORS.background
      ctx.fillRect(0, 0, BASE_WIDTH, BASE_HEIGHT)

      // Draw tiles
      for (let y = 0; y < levelData.current.length; y++) {
        for (let x = 0; x < levelData.current[y]?.length; x++) {
          const tile = levelData.current[y][x]
          if (!tile) continue

          ctx.fillStyle =
            tile.type === 'wall' || tile.type === 'platform'
              ? COLORS.walls
              : tile.type === 'shard'
                ? COLORS.collectibles
                : tile.type === 'exit'
                  ? COLORS.collectibles
                  : COLORS.background

          if (tile.type !== 'empty') {
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
          }
        }
      }

      // Draw player
      ctx.fillStyle = COLORS.player
      ctx.fillRect(player.x - PLAYER_SIZE / 2, player.y - PLAYER_SIZE / 2, PLAYER_SIZE, PLAYER_SIZE)

      // Draw UI
      ctx.fillStyle = COLORS.text
      ctx.font = '12px monospace'
      ctx.fillText(`Shards: ${gameState.collectedShards.length}`, 10, 20)
      ctx.fillText(`Credits: ${gameState.credits}`, 10, 35)

      animationFrameRef.current = requestAnimationFrame(render)
    }

    animationFrameRef.current = requestAnimationFrame(render)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [gameState.gameMode, player, gameState.collectedShards.length, gameState.credits])

  // Physics update loop
  useEffect(() => {
    if (gameState.gameMode !== 'playing') return

    const physicsInterval = setInterval(() => {
      setPlayer(prev => {
        let { x, y, vx, vy, onGround } = prev

        // Handle input
        if (keys.has('arrowleft') || keys.has('a')) {
          vx = -MOVE_SPEED
        } else if (keys.has('arrowright') || keys.has('d')) {
          vx = MOVE_SPEED
        } else {
          vx *= 0.8 // Friction
        }

        // Jump
        if ((keys.has(' ') || keys.has('arrowup') || keys.has('w')) && onGround) {
          vy = JUMP_FORCE
          onGround = false
        }

        // Apply gravity
        vy += GRAVITY

        // Update position
        x += vx
        y += vy

        // Collision detection (simple)
        const tileX = Math.floor(x / TILE_SIZE)
        const tileY = Math.floor((y + PLAYER_SIZE / 2) / TILE_SIZE)

        // Check ground collision
        if (tileY < levelData.current.length && levelData.current[tileY]) {
          const tile = levelData.current[tileY][tileX]
          if (tile && (tile.type === 'wall' || tile.type === 'platform')) {
            y = tileY * TILE_SIZE - PLAYER_SIZE
            vy = 0
            onGround = true
          } else {
            onGround = false
          }
        }

        // Boundary checks
        x = Math.max(PLAYER_SIZE, Math.min(BASE_WIDTH - PLAYER_SIZE, x))
        y = Math.max(PLAYER_SIZE, Math.min(BASE_HEIGHT - PLAYER_SIZE, y))

        // Check shard collection
        if (tileY < levelData.current.length && levelData.current[tileY]) {
          const tile = levelData.current[tileY][tileX]
          if (tile && tile.type === 'shard') {
            // Collect shard
            levelData.current[tileY][tileX] = { ...tile, type: 'empty' }
            setGameState(prev => ({
              ...prev,
              collectedShards: [...prev.collectedShards, `shard-${tileX}-${tileY}`],
              credits: prev.credits + 5,
            }))
          }

          // Check exit
          if (tile && tile.type === 'exit') {
            setGameState(prev => ({
              ...prev,
              gameMode: 'victory',
              credits: prev.credits + 10,
            }))
          }
        }

        return { ...prev, x, y, vx, vy, onGround }
      })
    }, 16) // ~60fps

    return () => clearInterval(physicsInterval)
  }, [gameState.gameMode, keys])

  // Initialize on mount
  useEffect(() => {
    initLevel()
  }, [initLevel])

  const startGame = () => {
    setGameState(prev => ({ ...prev, gameMode: 'playing' }))
    setPlayer({
      x: 40,
      y: 40,
      vx: 0,
      vy: 0,
      onGround: false,
      form: 'beep',
      width: PLAYER_SIZE,
      height: PLAYER_SIZE,
    })
    initLevel()
  }

  const handleTouchControl = (direction: 'left' | 'right' | 'up') => {
    if (direction === 'left') {
      setKeys(prev => new Set(prev).add('arrowleft'))
      setTimeout(() => setKeys(prev => {
        const newKeys = new Set(prev)
        newKeys.delete('arrowleft')
        return newKeys
      }), 100)
    } else if (direction === 'right') {
      setKeys(prev => new Set(prev).add('arrowright'))
      setTimeout(() => setKeys(prev => {
        const newKeys = new Set(prev)
        newKeys.delete('arrowright')
        return newKeys
      }), 100)
    } else if (direction === 'up') {
      setKeys(prev => new Set(prev).add(' '))
      setTimeout(() => setKeys(prev => {
        const newKeys = new Set(prev)
        newKeys.delete(' ')
        return newKeys
      }), 100)
    }
  }

  const canvasWidth = BASE_WIDTH * scale
  const canvasHeight = BASE_HEIGHT * scale

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-2 sm:p-4">
      {/* Game Canvas */}
      <div className="relative" style={{ width: canvasWidth, height: canvasHeight }}>
        <canvas
          ref={canvasRef}
          width={BASE_WIDTH}
          height={BASE_HEIGHT}
          className="border-2 border-green-500"
          style={{
            width: `${canvasWidth}px`,
            height: `${canvasHeight}px`,
            imageRendering: 'pixelated',
          }}
        />

        {/* Menu Overlay */}
        {gameState.gameMode === 'menu' && (
          <div className="absolute inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center text-green-500 font-mono">
            <h2 className="text-2xl sm:text-3xl mb-4 text-center">GRID RUNNER</h2>
            <p className="text-sm sm:text-base mb-2 text-center px-4">
              You should be you. You&apos;re okay.
            </p>
            <p className="text-sm sm:text-base mb-6 text-center px-4">
              The world is not 0 or 1.
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2 bg-green-500 text-black font-bold hover:bg-green-400 transition-colors text-sm sm:text-base"
            >
              Start Game
            </button>
            <button
              onClick={onBack}
              className="mt-4 px-6 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-colors text-sm sm:text-base"
            >
              Back to Menu
            </button>
          </div>
        )}

        {/* Pause Overlay */}
        {gameState.gameMode === 'paused' && (
          <div className="absolute inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center text-green-500 font-mono">
            <h2 className="text-2xl sm:text-3xl mb-4">PAUSED</h2>
            <button
              onClick={() => setGameState(prev => ({ ...prev, gameMode: 'playing' }))}
              className="px-6 py-2 bg-green-500 text-black font-bold hover:bg-green-400 transition-colors text-sm sm:text-base"
            >
              Resume
            </button>
            <button
              onClick={onBack}
              className="mt-4 px-6 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-colors text-sm sm:text-base"
            >
              Quit
            </button>
          </div>
        )}

        {/* Victory Overlay */}
        {gameState.gameMode === 'victory' && (
          <div className="absolute inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center text-green-500 font-mono">
            <h2 className="text-2xl sm:text-3xl mb-4">LEVEL COMPLETE!</h2>
            <p className="text-sm sm:text-base mb-2">
              Shards: {gameState.collectedShards.length}
            </p>
            <p className="text-sm sm:text-base mb-6">
              Credits: {gameState.credits}
            </p>
            <button
              onClick={() => {
                setGameState(prev => ({ ...prev, gameMode: 'menu', currentLevel: prev.currentLevel + 1 }))
                initLevel()
              }}
              className="px-6 py-2 bg-green-500 text-black font-bold hover:bg-green-400 transition-colors text-sm sm:text-base"
            >
              Next Level
            </button>
            <button
              onClick={onBack}
              className="mt-4 px-6 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-colors text-sm sm:text-base"
            >
              Back to Menu
            </button>
          </div>
        )}
      </div>

      {/* Mobile Touch Controls */}
      {showTouchControls && gameState.gameMode === 'playing' && (
        <div className="mt-4 flex flex-col items-center gap-2">
          <button
            onTouchStart={(e) => {
              e.preventDefault()
              handleTouchControl('up')
            }}
            className="w-16 h-16 bg-green-500 text-black font-bold rounded-full text-xl touch-none"
          >
            ↑
          </button>
          <div className="flex gap-4">
            <button
              onTouchStart={(e) => {
                e.preventDefault()
                handleTouchControl('left')
              }}
              className="w-16 h-16 bg-green-500 text-black font-bold rounded-full text-xl touch-none"
            >
              ←
            </button>
            <button
              onTouchStart={(e) => {
                e.preventDefault()
                handleTouchControl('right')
              }}
              className="w-16 h-16 bg-green-500 text-black font-bold rounded-full text-xl touch-none"
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      {gameState.gameMode === 'playing' && !showTouchControls && (
        <div className="mt-4 text-green-500 font-mono text-xs sm:text-sm text-center px-4">
          <p>Arrow Keys / WASD to move | Space to jump | ESC to pause</p>
        </div>
      )}
    </div>
  )
}

