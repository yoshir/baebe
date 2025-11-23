# Download Guide for 80s Pixel Fonts

Since direct downloads can be tricky, here's a step-by-step guide to get the best 80s pixel fonts:

## 🎯 Recommended Fonts (Pick 2-3)

### 1. **Gohufont** ⭐ Best for Terminal/CLI
**Why:** Used by github-readme-terminal, clean and readable
**Download:**
1. Go to: https://github.com/koemaeda/gohufont-ttf
2. Click "Releases" on the right
3. Download `gohufont-ttf-2.1.tar.gz`
4. Extract and find `gohufont-11.ttf` or `gohufont-14.ttf`
5. Copy to this folder: `investor-portal/public/fonts/`

### 2. **Perfect DOS VGA 437** ⭐ Best for Authentic DOS Look
**Why:** Exact replica of DOS VGA font from the 80s
**Download:**
1. Go to: https://github.com/SolidHal/Perfect-DOS-VGA-437
2. Click "Releases" on the right
3. Download the latest release zip
4. Extract and find the `.ttf` file
5. Copy to this folder: `investor-portal/public/fonts/`

### 3. **Terminus** ⭐ Best for Readability
**Why:** Classic Linux terminal font, very clear
**Download:**
1. Go to: https://files.ax86.net/terminus-ttf/
2. Download: `terminus-ttf-4.49.1.zip`
3. Extract and find `TerminusTTF-4.49.1.ttf`
4. Copy to this folder: `investor-portal/public/fonts/`

### 4. **PCFace** (IBM PC OEM Style)
**Why:** Authentic IBM PC terminal font
**Download:**
1. Go to: https://github.com/susam/pcface
2. The repository contains font files
3. Look for `.ttf` or `.bdf` files
4. Copy to this folder: `investor-portal/public/fonts/`

## 📦 After Downloading

1. **Place TTF files** in `investor-portal/public/fonts/`
2. **Optional: Convert to WOFF2** for better web performance:
   - Use: https://cloudconvert.com/ttf-to-woff2
   - Or install fonttools: `pip install fonttools`
   - Then: `pyftsubset font.ttf --output-file=font.woff2 --flavor=woff2`

3. **Add @font-face** in `app/globals.css`:
   ```css
   @font-face {
     font-family: 'gohufont';
     src: url('/fonts/gohufont-11.ttf') format('truetype');
     font-weight: normal;
     font-style: normal;
     font-display: block;
   }
   ```

4. **Use** with `.bitmap-font` class or `BitmapFontRenderer` component

## 🎨 Font Comparison

| Font | Style | Best For |
|------|-------|----------|
| Gohufont | Clean terminal | Modern terminal aesthetic |
| Perfect DOS VGA | Authentic DOS | 80s PC/DOS look |
| Terminus | Classic Linux | Maximum readability |
| PCFace | IBM PC OEM | Most authentic 80s terminal |

## 💡 Quick Test

After adding a font, test it:
```tsx
<div className="bitmap-font" style={{ fontSize: '24px' }}>
  OPTIMAL ANARCHY CORP
</div>
```







