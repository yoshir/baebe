'use client'

import { useEffect, useRef, useState } from 'react'

interface BitmapFontRendererProps {
  text: string
  fontSize?: number
  color?: string
  fontFamily?: string
  className?: string
}

/**
 * BitmapFontRenderer - Renders text using bitmap fonts
 * 
 * Two modes:
 * 1. CSS mode: Uses @font-face with bitmap font files (WOFF/TTF)
 * 2. Canvas mode: Renders from font sprite sheets (for more control)
 */
export default function BitmapFontRenderer({
  text,
  fontSize = 16,
  color = '#00ff41',
  fontFamily = 'bitmap-terminal',
  className = ''
}: BitmapFontRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [useCanvas, setUseCanvas] = useState(false)

  // For now, use CSS mode (simpler)
  // Canvas mode can be added later if needed for sprite sheet rendering
  
  return (
    <div 
      className={`bitmap-font ${className}`}
      style={{
        fontFamily: fontFamily,
        fontSize: `${fontSize}px`,
        color: color,
        imageRendering: 'pixelated',
        WebkitFontSmoothing: 'none',
        MozOsxFontSmoothing: 'unset',
        textRendering: 'optimizeSpeed',
        fontFeatureSettings: 'normal',
        fontVariantLigatures: 'none',
        letterSpacing: '0.05em',
        lineHeight: 1.2,
      }}
    >
      {text}
    </div>
  )
}

/**
 * Load a bitmap font file and make it available via CSS
 * Call this function to dynamically load bitmap fonts
 */
export async function loadBitmapFont(
  fontName: string,
  fontUrl: string,
  fontFormat: 'woff' | 'woff2' | 'ttf' | 'otf' = 'woff'
): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if font is already loaded
    if (document.fonts.check(`16px "${fontName}"`)) {
      resolve()
      return
    }

    // Create @font-face rule
    const fontFace = new FontFace(
      fontName,
      `url(${fontUrl}) format('${fontFormat}')`
    )

    fontFace.load().then((loadedFont) => {
      document.fonts.add(loadedFont)
      resolve()
    }).catch((error) => {
      console.error(`Failed to load bitmap font ${fontName}:`, error)
      reject(error)
    })
  })
}






