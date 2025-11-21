'use client'

import { useState, useEffect } from 'react'
import { getASCIIArt } from './ASCIIArtGallery'

interface ASCIIEditorProps {
  artKey: string
  onClose: () => void
  onSave?: (art: string) => void
}

export default function ASCIIEditor({ artKey, onClose, onSave }: ASCIIEditorProps) {
  const [art, setArt] = useState('')
  const [preview, setPreview] = useState('')

  useEffect(() => {
    // Load current ASCII art
    const currentArt = getASCIIArt(artKey as any)
    setArt(currentArt)
    // Apply padding for preview
    const lines = currentArt.split('\n').filter(line => line.trim().length > 0)
    if (lines.length > 0) {
      const maxWidth = Math.max(...lines.map(line => line.length))
      const paddedLines = lines.map(line => {
        const padding = maxWidth - line.length
        return line + ' '.repeat(padding)
      })
      setPreview(paddedLines.join('\n'))
    } else {
      setPreview('')
    }
  }, [artKey])

  useEffect(() => {
    // Update preview as user types
    // Apply same padding logic as intro sequence for accurate preview
    const lines = art.split('\n').filter(line => line.trim().length > 0)
    if (lines.length > 0) {
      const maxWidth = Math.max(...lines.map(line => line.length))
      const paddedLines = lines.map(line => {
        const padding = maxWidth - line.length
        return line + ' '.repeat(padding)
      })
      setPreview(paddedLines.join('\n'))
    } else {
      setPreview('')
    }
  }, [art])

  const handleCopy = () => {
    // Copy to clipboard in a format ready to paste back to me
    // Format: just the raw ASCII art lines, one per line
    const lines = art.split('\n').filter(line => line.trim().length > 0)
    const formatted = lines.join('\n')
    
    navigator.clipboard.writeText(formatted).then(() => {
      alert(`ASCII art copied! You can paste it back to me.`)
    }).catch(() => {
      alert('Failed to copy. Please select and copy manually.')
    })
  }

  const handleCopyRaw = () => {
    // Copy just the raw ASCII art
    navigator.clipboard.writeText(art).then(() => {
      alert('Raw ASCII art copied to clipboard!')
    })
  }

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col p-8" style={{ fontFamily: "'VT323', monospace" }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-hacker-green text-2xl">ASCII Art Editor: {artKey}</h2>
        <button
          onClick={onClose}
          className="text-hacker-green hover:text-white border border-hacker-green px-4 py-2"
        >
          Close
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-8 flex-1">
        {/* Editor */}
        <div className="flex flex-col">
          <label className="text-hacker-green mb-2">Edit ASCII Art:</label>
          <textarea
            value={art}
            onChange={(e) => setArt(e.target.value)}
            className="flex-1 bg-black border border-hacker-green text-hacker-green p-4 font-mono text-sm resize-none"
            style={{ fontFamily: "'VT323', monospace" }}
            spellCheck={false}
          />
          <div className="mt-4 flex gap-4">
            <button
              onClick={handleCopy}
              className="text-hacker-green hover:text-white border border-hacker-green px-4 py-2"
            >
              Copy Code
            </button>
            <button
              onClick={handleCopyRaw}
              className="text-hacker-green/70 hover:text-white border border-hacker-green/50 px-4 py-2"
            >
              Copy Raw
            </button>
            <button
              onClick={() => {
                setArt('')
                setPreview('')
              }}
              className="text-red-500 hover:text-white border border-red-500 px-4 py-2"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col">
          <label className="text-hacker-green mb-2">Preview (as it appears in browser):</label>
          <div className="flex-1 bg-black border border-hacker-green p-4 overflow-auto flex items-center justify-center">
            <div
              className="font-mono text-hacker-green leading-tight whitespace-pre"
              style={{
                fontFamily: "'VT323', monospace",
                fontSize: 'clamp(14px, 2.5vw, 28px)',
                lineHeight: 1.2,
                letterSpacing: '0.5px',
                textShadow: '0 0 10px rgba(0, 255, 65, 0.8), 0 0 20px rgba(0, 255, 65, 0.4)',
                textAlign: 'left',
              }}
            >
              {preview || '(empty)'}
            </div>
          </div>
          <div className="mt-4 text-hacker-green/70 text-xs">
            Lines: {art.split('\n').filter(l => l.trim().length > 0).length} | Characters: {art.length}
          </div>
        </div>
      </div>
    </div>
  )
}

