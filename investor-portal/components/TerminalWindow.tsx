'use client'

import { ReactNode } from 'react'
import { getASCIIArt } from './ASCIIArtGallery'

interface TerminalWindowProps {
  title: string
  children: ReactNode
  className?: string
  useASCII?: boolean
}

export default function TerminalWindow({ title, children, className = '', useASCII = true }: TerminalWindowProps) {
  const asciiTitle = useASCII && title === 'BAEBE SYSTEM' ? getASCIIArt('header_baebe_system') : null
  
  return (
    <div className={`w-full max-w-4xl bg-black/85 border border-hacker-green shadow-[0_0_30px_rgba(0,255,65,0.3)] rounded ${className}`}>
      <div className="bg-hacker-green/10 px-4 py-2 flex items-center gap-2 border-b border-hacker-green">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        {asciiTitle ? (
          <div className="ml-auto font-mono text-[8px] text-hacker-green leading-[0.7] whitespace-pre">
            {asciiTitle}
          </div>
        ) : (
          <span className="ml-auto text-sm text-hacker-green/80 font-mono">{title}</span>
        )}
      </div>
      <div className="p-6 min-h-[500px]">
        {children}
      </div>
    </div>
  )
}





