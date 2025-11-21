'use client'

import { useState } from 'react'

interface FontTesterProps {
  onClose?: () => void
}

const AVAILABLE_FONTS = [
  { name: 'IBM VGA 8x16', value: 'ibm-vga', size: 16 },
  { name: 'IBM EGA 8x14', value: 'ibm-ega', size: 14 },
  { name: 'IBM CGA 8x8', value: 'ibm-cga', size: 10 },
  { name: 'System Mono', value: 'Menlo, Monaco, Consolas', size: 14 },
]

export default function FontTester({ onClose }: FontTesterProps) {
  const [inputText, setInputText] = useState('OPTIMAL ANARCHY CORP')
  const [selectedFont, setSelectedFont] = useState('ibm-vga')
  const [fontSize, setFontSize] = useState(16)
  const [textColor, setTextColor] = useState('#00ff41')

  const currentFont = AVAILABLE_FONTS.find(f => f.value === selectedFont) || AVAILABLE_FONTS[0]

  return (
    <div className="w-full space-y-4">
      <div className="border border-hacker-green/50 p-4 bg-hacker-gray/30">
        <div className="mb-4">
          <label className="block text-hacker-green text-sm mb-2 font-mono" style={{ fontFamily: "'VT323', monospace" }}>
            Enter Text:
          </label>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full bg-hacker-darker border border-hacker-green text-hacker-green px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-hacker-green"
            style={{ fontFamily: "'VT323', monospace" }}
            placeholder="Type your text here..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-hacker-green text-sm mb-2 font-mono" style={{ fontFamily: "'VT323', monospace" }}>
            Select Font:
          </label>
          <select
            value={selectedFont}
            onChange={(e) => {
              setSelectedFont(e.target.value)
              const font = AVAILABLE_FONTS.find(f => f.value === e.target.value)
              if (font) {
                setFontSize(font.size)
              }
            }}
            className="w-full bg-hacker-darker border border-hacker-green text-hacker-green px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-hacker-green"
            style={{ fontFamily: "'VT323', monospace" }}
          >
            {AVAILABLE_FONTS.map(font => (
              <option key={font.value} value={font.value} className="bg-hacker-darker">
                {font.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-hacker-green text-sm mb-2 font-mono" style={{ fontFamily: "'VT323', monospace" }}>
            Font Size: {fontSize}px
          </label>
          <input
            type="range"
            min="8"
            max="48"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: '#00ff41' }}
          />
        </div>

        <div className="mb-4">
          <label className="block text-hacker-green text-sm mb-2 font-mono" style={{ fontFamily: "'VT323', monospace" }}>
            Text Color:
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="h-10 w-20 border border-hacker-green cursor-pointer"
            />
            <input
              type="text"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="flex-1 bg-hacker-darker border border-hacker-green text-hacker-green px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-hacker-green"
              placeholder="#00ff41"
            />
          </div>
        </div>
      </div>

      <div className="border border-hacker-green p-6 bg-black min-h-[200px] flex items-center justify-center">
        <div
          className="bitmap-font"
          style={{
            fontFamily: selectedFont,
            fontSize: `${fontSize}px`,
            color: textColor,
            textAlign: 'center',
            wordBreak: 'break-word',
          }}
        >
          {inputText || 'Type something above...'}
        </div>
      </div>

      <div className="text-hacker-green/70 text-xs font-mono" style={{ fontFamily: "'VT323', monospace" }}>
        <div>Font: {currentFont.name}</div>
        <div>Size: {fontSize}px</div>
        <div>Color: {textColor}</div>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="px-4 py-2 border border-hacker-green text-hacker-green bg-transparent hover:bg-hacker-green hover:text-hacker-darker transition-all font-mono text-sm"
          style={{ fontFamily: "'VT323', monospace" }}
        >
          Close Tester
        </button>
      )}
    </div>
  )
}

