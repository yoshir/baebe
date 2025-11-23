'use client'

export default function FontPreviewPage() {
  const sampleText = "OPTIMAL ANARCHY CORP"
  const sampleTextLong = "The quick brown fox jumps over the lazy dog. 0123456789 !@#$%^&*()"

  return (
    <div className="min-h-screen bg-black p-8">
      <h1 className="text-hacker-green text-2xl mb-8 font-mono">80s Pixel Font Preview</h1>
      
      <div className="space-y-12">
        {/* IBM VGA 8x16 */}
        <section>
          <h2 className="text-hacker-green text-xl mb-4 font-mono">IBM VGA 8x16 (Recommended)</h2>
          <div className="space-y-4">
            <div className="bitmap-font" style={{ fontFamily: 'ibm-vga', fontSize: '16px', color: '#00ff41' }}>
              {sampleText}
            </div>
            <div className="bitmap-font" style={{ fontFamily: 'ibm-vga', fontSize: '14px', color: '#00ff41' }}>
              {sampleTextLong}
            </div>
            <div className="bitmap-font" style={{ fontFamily: 'ibm-vga', fontSize: '24px', color: '#00ff41' }}>
              LARGE TEXT
            </div>
          </div>
        </section>

        {/* IBM EGA 8x14 */}
        <section>
          <h2 className="text-hacker-green text-xl mb-4 font-mono">IBM EGA 8x14</h2>
          <div className="space-y-4">
            <div className="bitmap-font" style={{ fontFamily: 'ibm-ega', fontSize: '14px', color: '#00ff41' }}>
              {sampleText}
            </div>
            <div className="bitmap-font" style={{ fontFamily: 'ibm-ega', fontSize: '12px', color: '#00ff41' }}>
              {sampleTextLong}
            </div>
            <div className="bitmap-font" style={{ fontFamily: 'ibm-ega', fontSize: '20px', color: '#00ff41' }}>
              LARGE TEXT
            </div>
          </div>
        </section>

        {/* IBM CGA */}
        <section>
          <h2 className="text-hacker-green text-xl mb-4 font-mono">IBM CGA (8x8 - Gaming Style)</h2>
          <div className="space-y-4">
            <div className="bitmap-font" style={{ fontFamily: 'ibm-cga', fontSize: '8px', color: '#00ff41' }}>
              {sampleText}
            </div>
            <div className="bitmap-font" style={{ fontFamily: 'ibm-cga', fontSize: '10px', color: '#00ff41' }}>
              {sampleTextLong}
            </div>
            <div className="bitmap-font" style={{ fontFamily: 'ibm-cga', fontSize: '16px', color: '#00ff41' }}>
              LARGE TEXT
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section>
          <h2 className="text-hacker-green text-xl mb-4 font-mono">Side-by-Side Comparison</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-hacker-green/70 text-sm mb-2 font-mono">IBM VGA 8x16</div>
              <div className="bitmap-font" style={{ fontFamily: 'ibm-vga', fontSize: '16px', color: '#00ff41' }}>
                OPTIMAL ANARCHY CORP
              </div>
            </div>
            <div>
              <div className="text-hacker-green/70 text-sm mb-2 font-mono">IBM EGA 8x14</div>
              <div className="bitmap-font" style={{ fontFamily: 'ibm-ega', fontSize: '14px', color: '#00ff41' }}>
                OPTIMAL ANARCHY CORP
              </div>
            </div>
            <div>
              <div className="text-hacker-green/70 text-sm mb-2 font-mono">IBM CGA 8x8</div>
              <div className="bitmap-font" style={{ fontFamily: 'ibm-cga', fontSize: '10px', color: '#00ff41' }}>
                OPTIMAL ANARCHY CORP
              </div>
            </div>
          </div>
        </section>

        {/* Usage Example */}
        <section>
          <h2 className="text-hacker-green text-xl mb-4 font-mono">Usage in Code</h2>
          <pre className="bg-hacker-gray p-4 text-hacker-green text-sm font-mono overflow-x-auto">
{`// Using CSS class
<div className="bitmap-font">
  OPTIMAL ANARCHY CORP
</div>

// Using inline style
<div style={{ fontFamily: 'ibm-vga', fontSize: '16px' }}>
  OPTIMAL ANARCHY CORP
</div>

// Using BitmapFontRenderer component
import BitmapFontRenderer from '@/components/BitmapFontRenderer'

<BitmapFontRenderer 
  text="OPTIMAL ANARCHY CORP"
  fontSize={16}
  fontFamily="ibm-vga"
/>`}
          </pre>
        </section>
      </div>
    </div>
  )
}







