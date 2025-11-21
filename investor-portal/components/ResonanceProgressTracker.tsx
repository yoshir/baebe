'use client'

import { useState, useEffect } from 'react'

interface ProgressData {
  chapters: number[]
  shards: number[]
  achievements: string[]
  lostChaptersUnlocked: number
}

interface ResonanceProgressTrackerProps {
  userId?: string
  showFullDetails?: boolean
}

export default function ResonanceProgressTracker({ 
  userId, 
  showFullDetails = true 
}: ResonanceProgressTrackerProps) {
  const [progress, setProgress] = useState<ProgressData>({
    chapters: [],
    shards: [],
    achievements: [],
    lostChaptersUnlocked: 0
  })

  useEffect(() => {
    // Load progress from localStorage
    const stored = localStorage.getItem('baebeProgress')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setProgress(parsed)
      } catch (e) {
        console.error('Failed to parse progress:', e)
      }
    }
  }, [])

  // Calculate resonance level based on chapters read
  const resonanceLevel = Math.floor(progress.chapters.length / 2)
  const totalChapters = 20 // Total chapters in novel
  const progressPercent = (progress.chapters.length / totalChapters) * 100

  // Calculate lost chapters unlocked (5 shards = 1 lost chapter)
  const lostChaptersUnlocked = Math.floor(progress.shards.length / 5)
  const totalLostChapters = 7

  const lostChapters = [
    'The Game',
    'Baebe in the Park',
    'Ayumi\'s Escape',
    'Shadow\'s Origin',
    'Empathy Virus Risk Assessment',
    'Ghost Protocol White Paper',
    'Kess: Child Scavenger'
  ]

  const achievements = [
    { id: 'prologue', name: 'The Unraveling', unlocked: progress.chapters.includes(0) },
    { id: 'chapter1', name: 'The Drop', unlocked: progress.chapters.includes(1) },
    { id: 'early-adopter', name: 'Early Adopter', unlocked: progress.achievements.includes('early-adopter') },
    { id: 'founding', name: 'Founding Resonance', unlocked: progress.achievements.includes('founding') },
    { id: 'complete', name: 'Complete Resonance', unlocked: progress.chapters.length >= totalChapters },
  ]

  const saveProgress = (newProgress: ProgressData) => {
    setProgress(newProgress)
    localStorage.setItem('baebeProgress', JSON.stringify(newProgress))
  }

  const collectShard = (shardId: number) => {
    if (!progress.shards.includes(shardId)) {
      const newProgress = {
        ...progress,
        shards: [...progress.shards, shardId]
      }
      saveProgress(newProgress)
    }
  }

  const unlockChapter = (chapterId: number) => {
    if (!progress.chapters.includes(chapterId)) {
      const newProgress = {
        ...progress,
        chapters: [...progress.chapters, chapterId]
      }
      // Auto-collect shard when chapter is read
      collectShard(chapterId)
      saveProgress(newProgress)
    }
  }

  const unlockAchievement = (achievementId: string) => {
    if (!progress.achievements.includes(achievementId)) {
      const newProgress = {
        ...progress,
        achievements: [...progress.achievements, achievementId]
      }
      saveProgress(newProgress)
    }
  }

  // Expose functions globally for Substack integration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).baebeProgress = {
        collectShard,
        unlockChapter,
        unlockAchievement,
        getProgress: () => progress
      }
    }
  }, [progress])

  return (
    <div className="hacker-card p-6 space-y-6">
      <div className="border-b border-hacker-green/30 pb-4">
        <h2 className="text-2xl font-bold text-hacker-green mb-2">
          BAEBE: Resonance Progress
        </h2>
        <p className="text-hacker-green/70 text-sm">
          Track your journey through the story. Collect shards, unlock lost chapters.
        </p>
      </div>

      {/* Resonance Level */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-hacker-green">
            Resonance Level: {resonanceLevel}
          </h3>
          <span className="text-sm text-hacker-green/70">
            {progress.chapters.length}/{totalChapters} Chapters
          </span>
        </div>
        <div className="w-full h-6 bg-hacker-darker border border-hacker-green/30 rounded overflow-hidden">
          <div 
            className="h-full bg-hacker-green transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-hacker-green/60">
          {progressPercent.toFixed(0)}% Complete
        </p>
      </div>

      {/* Shard Collection */}
      {showFullDetails && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-hacker-green">
              Shards Collected: {progress.shards.length}/20
            </h3>
            <span className="text-xs text-hacker-green/70">
              {lostChaptersUnlocked}/{totalLostChapters} Lost Chapters Unlocked
            </span>
          </div>
          <div className="grid grid-cols-10 gap-2">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className={`w-8 h-8 border-2 rounded flex items-center justify-center text-xs font-mono ${
                  progress.shards.includes(i)
                    ? 'bg-hacker-green border-hacker-green text-black'
                    : 'border-hacker-green/30 text-hacker-green/30'
                }`}
              >
                {progress.shards.includes(i) ? '✓' : '○'}
              </div>
            ))}
          </div>
          <p className="text-xs text-hacker-green/60">
            Collect 5 shards to unlock 1 lost chapter
          </p>
        </div>
      )}

      {/* Lost Chapters */}
      {showFullDetails && lostChaptersUnlocked > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-hacker-green">
            Lost Chapters Unlocked
          </h3>
          <div className="space-y-1">
            {lostChapters.slice(0, lostChaptersUnlocked).map((chapter, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-hacker-green/80 text-sm"
              >
                <span className="text-hacker-green">✓</span>
                <span>{chapter}</span>
              </div>
            ))}
          </div>
          {lostChaptersUnlocked < totalLostChapters && (
            <p className="text-xs text-hacker-green/60">
              {5 - (progress.shards.length % 5)} more shards to unlock next lost chapter
            </p>
          )}
        </div>
      )}

      {/* Achievements */}
      {showFullDetails && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-hacker-green">
            Achievements: {progress.achievements.length}/{achievements.length}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-2 border rounded text-xs ${
                  achievement.unlocked
                    ? 'border-hacker-green bg-hacker-green/10 text-hacker-green'
                    : 'border-hacker-green/30 text-hacker-green/50'
                }`}
              >
                {achievement.unlocked ? '✓' : '○'} {achievement.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="pt-4 border-t border-hacker-green/30 space-y-2">
        <p className="text-xs text-hacker-green/70">
          Read chapters on Substack to collect shards and unlock lost chapters.
        </p>
        <a
          href="https://baebe.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-hacker-green text-black font-mono text-sm hover:bg-hacker-green/80 transition-colors"
        >
          Read on Substack →
        </a>
      </div>
    </div>
  )
}

