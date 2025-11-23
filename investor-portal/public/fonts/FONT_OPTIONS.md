# 80s Pixel Font Options

Here are several free/open-source 80s-style pixel fonts you can download:

## 1. **Gohufont** ⭐ Recommended
**Style:** Clean terminal bitmap font (used by github-readme-terminal)
**Source:** https://github.com/koemaeda/gohufont-ttf
**Download:** 
- Go to: https://github.com/koemaeda/gohufont-ttf/releases
- Download: `gohufont-11.ttf` or `gohufont-14.ttf`
- Perfect for terminal/CLI aesthetic

## 2. **Terminus**
**Style:** Classic Linux terminal font, very readable
**Source:** https://files.ax86.net/terminus-ttf/
**Download:**
- Direct link: https://files.ax86.net/terminus-ttf/terminus-ttf-4.49.1.zip
- Extract and use `TerminusTTF-4.49.1.ttf`
- Great for retro terminal look

## 3. **PCFace** (IBM PC OEM Style)
**Style:** Authentic IBM PC terminal font from the 80s
**Source:** https://github.com/susam/pcface
**Download:**
- Go to: https://github.com/susam/pcface/releases
- Download the TTF file
- Most authentic 80s terminal look

## 4. **Perfect DOS VGA 437**
**Style:** Exact replica of DOS VGA font
**Source:** https://github.com/SolidHal/Perfect-DOS-VGA-437
**Download:**
- Go to: https://github.com/SolidHal/Perfect-DOS-VGA-437/releases
- Download the TTF file
- Perfect for DOS/retro PC aesthetic

## 5. **More Perfect DOS VGA**
**Style:** Enhanced DOS VGA font with more characters
**Source:** https://github.com/SolidHal/More-Perfect-DOS-VGA
**Download:**
- Go to: https://github.com/SolidHal/More-Perfect-DOS-VGA/releases
- Download the TTF file
- Better character coverage than Perfect DOS

## 6. **C64 Pro Mono**
**Style:** Commodore 64 style font
**Source:** Various sources (search for "C64 Pro Mono")
**Download:**
- Search for "C64 Pro Mono TTF" or check font repositories
- Great for 80s gaming aesthetic

## Quick Setup Instructions

1. **Download** any of the fonts above (TTF format)
2. **Place** the `.ttf` file in `investor-portal/public/fonts/`
3. **Convert to WOFF2** (optional, for better web performance):
   - Use: https://cloudconvert.com/ttf-to-woff2
   - Or command line: `pyftsubset font.ttf --output-file=font.woff2 --flavor=woff2`
4. **Add @font-face** in `app/globals.css`:
   ```css
   @font-face {
     font-family: 'gohufont';
     src: url('/fonts/gohufont-11.ttf') format('truetype');
     font-weight: normal;
     font-style: normal;
     font-display: block;
   }
   ```
5. **Use** with `.bitmap-font` class or `BitmapFontRenderer` component

## Recommended for Your Project

**Best for terminal/CLI:** Gohufont or Terminus
**Best for authentic 80s DOS:** Perfect DOS VGA 437 or More Perfect DOS VGA
**Best for gaming aesthetic:** C64 Pro Mono







