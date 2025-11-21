# Book Preview Setup Guide

**Version:** v.20250115-1200  
**Purpose:** Preview your novel in book format without InDesign

---

## Quick Start Options

### Option 1: HTML Preview (Easiest - Works Now)

1. **Open the HTML file:**
   ```bash
   open novel/book-preview.html
   ```

2. **Or serve locally (to load markdown files):**
   ```bash
   cd novel
   python3 -m http.server 8000
   # Then open http://localhost:8000/book-preview.html
   ```

3. **Use Print Preview:**
   - Click "Print Preview" button
   - Or press Cmd+P (Mac) / Ctrl+P (Windows)
   - Choose "Save as PDF" to create a PDF

### Option 2: Pandoc (Professional - Best Quality)

**Install Pandoc:**
```bash
# Mac (using Homebrew)
brew install pandoc

# Or download from: https://pandoc.org/installing.html
```

**Convert your novel to PDF:**
```bash
cd novel

# Single chapter
pandoc 00-prologue/prologue-the-unraveling.md \
  -o prologue-preview.pdf \
  --pdf-engine=xelatex \
  -V geometry:margin=0.75in \
  -V fontfamily=Georgia \
  -V fontsize=11pt \
  -V linestretch=1.6

# Full book (combine all chapters)
pandoc 00-prologue/prologue-the-unraveling.md \
       part-i-chains/chapter-01-the-drop_v02.md \
       part-i-chains/chapter-02-awakening-and-landing.md \
       -o baebe-full-preview.pdf \
       --pdf-engine=xelatex \
       -V geometry:margin=0.75in \
       -V fontfamily=Georgia \
       -V fontsize=11pt \
       -V linestretch=1.6
```

**Note:** Pandoc requires LaTeX. Install:
```bash
# Mac
brew install --cask basictex
# Then install fonts
sudo tlmgr update --self
sudo tlmgr install collection-fontsrecommended
```

### Option 3: Vellum (Mac Only - Industry Standard)

**Best for:** Professional book formatting, multiple export formats

1. **Download:** https://www.vellum.pub/
2. **Cost:** $249 (one-time)
3. **Features:**
   - Drag & drop markdown files
   - Multiple font choices
   - Automatic formatting
   - Export to PDF, EPUB, MOBI
   - Print-ready layouts

**How to use:**
1. Import your markdown files
2. Choose book format (novel, memoir, etc.)
3. Select fonts and styles
4. Preview in real-time
5. Export to PDF

### Option 4: Atticus (Cross-Platform Alternative)

**Best for:** Cross-platform, cloud sync

1. **Download:** https://www.atticus.io/
2. **Cost:** $147 (one-time) or subscription
3. **Features:**
   - Works on Mac, Windows, Linux
   - Cloud sync
   - Multiple export formats
   - Professional templates

---

## Recommended Fonts for Novels

### Serif (Traditional Book Look)
- **Georgia** - Web-safe, readable
- **Garamond** - Classic, elegant
- **Minion Pro** - Professional
- **Palatino** - Warm, readable
- **Baskerville** - Traditional

### Sans-Serif (Modern Look)
- **Helvetica Neue** - Clean, modern
- **Arial** - Web-safe
- **Open Sans** - Friendly, readable

### Monospace (Terminal/Tech Aesthetic)
- **Courier New** - Classic typewriter
- **Monaco** - Mac terminal
- **Consolas** - Windows terminal

---

## Standard Book Dimensions

### Trade Paperback (Most Common)
- **Size:** 5.5" × 8.5" (or 6" × 9")
- **Margins:** 0.75" all around
- **Font Size:** 10-12pt
- **Line Height:** 1.5-1.6

### Mass Market Paperback
- **Size:** 4.25" × 6.875"
- **Margins:** 0.5" all around
- **Font Size:** 9-10pt

### Hardcover
- **Size:** 6" × 9" (standard)
- **Margins:** 0.75" - 1" all around
- **Font Size:** 11-12pt

---

## Quick Reference: Print Preview Settings

When using Print Preview (Cmd+P / Ctrl+P):

1. **Layout:** Portrait
2. **Paper Size:** Letter (8.5" × 11") or Custom (5.5" × 8.5")
3. **Margins:** Custom (0.75" all around)
4. **Scale:** 100%
5. **Background Graphics:** Enabled (for styling)
6. **Headers/Footers:** Disable (or customize)

---

## Next Steps

1. **Try HTML preview first** - Easiest, works immediately
2. **If you like it, try Pandoc** - Free, professional quality
3. **For final polish, consider Vellum** - Industry standard, worth the investment

---

## Troubleshooting

**Markdown files won't load in HTML preview:**
- Use a local server (see Option 1)
- Or manually copy markdown content into the HTML

**Pandoc errors:**
- Make sure LaTeX is installed
- Try using `--pdf-engine=wkhtmltopdf` instead (requires wkhtmltopdf)

**Fonts not showing:**
- Install system fonts
- Or use web-safe fonts (Georgia, Arial, etc.)

---

## Additional Resources

- **Pandoc Manual:** https://pandoc.org/MANUAL.html
- **Vellum Tutorials:** https://www.vellum.pub/help/
- **Book Typography Guide:** https://practicaltypography.com/



