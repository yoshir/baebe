# Available 80s Pixel Fonts

## ✅ Currently Available Fonts

### 1. **IBM VGA 8x16** (Px437_IBM_VGA_8x16.ttf)
**File:** `ibm-vga-8x16.ttf`
**Style:** Classic IBM VGA terminal font - most common 80s PC font
**Best for:** General terminal/CLI text, most authentic 80s look
**Size:** 8x16 pixels per character

### 2. **IBM EGA 8x14** (Px437_IBM_EGA_8x14.ttf)
**File:** `ibm-ega-8x14.ttf`
**Style:** IBM EGA graphics adapter font
**Best for:** Slightly smaller text, good for compact displays
**Size:** 8x14 pixels per character

### 3. **IBM CGA** (Px437_IBM_CGA.ttf)
**File:** `ibm-cga.ttf`
**Style:** IBM Color Graphics Adapter font
**Best for:** Early 80s PC aesthetic, gaming look
**Size:** 8x8 pixels per character

## 📋 More Fonts Available in pcface-main

The `pcface-main` folder contains many more IBM PC fonts:
- `Px437_IBM_MDA.ttf` - Monochrome Display Adapter
- `Px437_IBM_Model30r0.ttf` - IBM Model 30 font
- `Px437_IBM_PGC.ttf` - Professional Graphics Controller
- `Px437_IBM_VGA_9x14.ttf` - VGA 9x14 variant
- `Px437_IBM_VGA_9x16.ttf` - VGA 9x16 variant
- `Px437_Verite_8x16.ttf` - Verite font variant
- `Px437_IBM_BIOS.ttf` - BIOS font

## 🚀 Quick Start

### Option 1: Use IBM VGA 8x16 (Recommended)

Add to `app/globals.css`:
```css
@font-face {
  font-family: 'ibm-vga';
  src: url('/fonts/ibm-vga-8x16.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
```

Then use:
```tsx
<div className="bitmap-font" style={{ fontFamily: 'ibm-vga' }}>
  OPTIMAL ANARCHY CORP
</div>
```

### Option 2: Use Multiple Fonts

Add all three:
```css
@font-face {
  font-family: 'ibm-vga';
  src: url('/fonts/ibm-vga-8x16.ttf') format('truetype');
  font-display: block;
}

@font-face {
  font-family: 'ibm-ega';
  src: url('/fonts/ibm-ega-8x14.ttf') format('truetype');
  font-display: block;
}

@font-face {
  font-family: 'ibm-cga';
  src: url('/fonts/ibm-cga.ttf') format('truetype');
  font-display: block;
}
```

## 🎨 Font Comparison

| Font | Size | Best Use Case |
|------|------|---------------|
| IBM VGA 8x16 | 8x16 | General terminal text, most readable |
| IBM EGA 8x14 | 8x14 | Compact displays, slightly smaller |
| IBM CGA | 8x8 | Early 80s aesthetic, gaming look |

## 💡 Testing

Test each font:
```tsx
<div style={{ fontFamily: 'ibm-vga', fontSize: '16px', color: '#00ff41' }}>
  IBM VGA: OPTIMAL ANARCHY CORP
</div>
<div style={{ fontFamily: 'ibm-ega', fontSize: '14px', color: '#00ff41' }}>
  IBM EGA: OPTIMAL ANARCHY CORP
</div>
<div style={{ fontFamily: 'ibm-cga', fontSize: '8px', color: '#00ff41' }}>
  IBM CGA: OPTIMAL ANARCHY CORP
</div>
```




