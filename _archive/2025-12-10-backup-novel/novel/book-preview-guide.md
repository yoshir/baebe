# Book Preview Guide - See Your Novel as a Printed Book

**Version:** v.20250115-1230  
**Purpose:** Preview your novel exactly as it will appear when printed

---

## 🎯 What You Want

- See text layout on actual book pages
- Preview cover, spine, and back cover
- Test different fonts and formatting
- See how it looks in print (not just on screen)

---

## 🏆 Best Tools for Accurate Print Preview

### 1. **Vellum** (Mac Only) - ⭐ RECOMMENDED

**Why it's the best:**
- Shows **exactly** how your book will look printed
- Real-time preview of pages
- Multiple font choices
- Export to print-ready PDF
- Industry standard for self-publishers

**Cost:** $249 (one-time, Mac only)

**How to use:**
1. Import your markdown files
2. Choose "Novel" format
3. Select fonts (Georgia, Minion, Palatino, etc.)
4. Preview pages in real-time
5. See facing pages (left/right spread)
6. Export to PDF for print

**Download:** https://www.vellum.pub/

---

### 2. **Atticus** (Cross-Platform)

**Why it's good:**
- Works on Mac, Windows, Linux
- 3D book preview (cover, spine, back)
- Cloud sync
- Multiple export formats

**Cost:** $147 (one-time) or subscription

**Download:** https://www.atticus.io/

---

### 3. **Pandoc + PDF Viewer** (Free)

**What I've set up for you:**
- Script to convert all chapters to PDF
- Proper book formatting (5.5" × 8.5")
- Professional typography
- Two-page spread view

**How to use:**

1. **Install dependencies:**
   ```bash
   brew install pandoc
   brew install --cask basictex
   ```

2. **Run the script:**
   ```bash
   cd novel
   ./pandoc-book-script.sh baebe-preview.pdf
   ```

3. **View in two-page spread:**
   - Open the PDF
   - View → Two Page Scrolling (or Two-Up Continuous)
   - This shows facing pages like a real book

4. **Check print settings:**
   - File → Print
   - Choose "Two-Sided" if your printer supports it
   - See exactly how pages will look

---

### 4. **3D Book Preview** (Visual Reference)

**What I've created:**
- `book-3d-preview.html` - Shows your book in 3D
- See cover, spine, and back cover together
- Adjust fonts and formatting in real-time
- Visual reference (not for final print)

**How to use:**
```bash
cd novel
open book-3d-preview.html
```

---

## 📐 Standard Book Dimensions

### Trade Paperback (Most Common)
- **Size:** 5.5" × 8.5" (or 6" × 9")
- **Margins:** 0.75" all around
- **Font Size:** 10-12pt
- **Line Height:** 1.5-1.6
- **Font:** Serif (Georgia, Garamond, Minion)

### Mass Market Paperback
- **Size:** 4.25" × 6.875"
- **Margins:** 0.5" all around
- **Font Size:** 9-10pt

---

## 🎨 Font Recommendations for Novels

### Serif Fonts (Traditional)
- **Georgia** - Web-safe, very readable
- **Garamond** - Classic, elegant
- **Minion Pro** - Professional, warm
- **Palatino** - Friendly, readable
- **Baskerville** - Traditional, formal

### Sans-Serif (Modern)
- **Helvetica Neue** - Clean, modern
- **Arial** - Web-safe

---

## ✅ What to Check in Your Preview

1. **Page Layout:**
   - [ ] Margins look good (not too tight/loose)
   - [ ] Text doesn't feel cramped
   - [ ] White space is balanced

2. **Typography:**
   - [ ] Font size is readable (10-12pt)
   - [ ] Line height is comfortable (1.5-1.6)
   - [ ] Paragraph spacing looks right
   - [ ] Chapter headings stand out

3. **Page Breaks:**
   - [ ] No awkward page breaks mid-paragraph
   - [ ] Chapters start on right-hand pages
   - [ ] No orphaned lines at page bottom

4. **Overall Feel:**
   - [ ] Looks like a real book
   - [ ] Professional appearance
   - [ ] Easy to read

---

## 🚀 Quick Start

### Option A: Free (Pandoc)
```bash
# Install
brew install pandoc
brew install --cask basictex

# Generate preview
cd novel
./pandoc-book-script.sh

# Open and view in two-page spread
open baebe-book-preview.pdf
```

### Option B: Professional (Vellum)
1. Download Vellum
2. Import your markdown files
3. Choose fonts and formatting
4. Preview in real-time
5. Export to PDF

### Option C: Visual Reference (3D Preview)
```bash
cd novel
open book-3d-preview.html
```

---

## 💡 Pro Tips

1. **View in Two-Page Spread:**
   - This is how readers see your book
   - Check facing pages work together
   - Ensure chapters start on right pages

2. **Print a Test Page:**
   - Print one page to see actual ink on paper
   - Check if font size feels right
   - Verify margins look good

3. **Compare to Real Books:**
   - Grab a book from your shelf
   - Compare font size, margins, spacing
   - Match what feels comfortable

4. **Check Different Sections:**
   - Preview beginning, middle, and end
   - Ensure consistency throughout
   - Check chapter transitions

---

## 📚 Additional Resources

- **Vellum Help:** https://www.vellum.pub/help/
- **Pandoc Manual:** https://pandoc.org/MANUAL.html
- **Book Typography Guide:** https://practicaltypography.com/
- **Print-on-Demand Guides:**
  - KDP (Amazon): https://kdp.amazon.com/
  - IngramSpark: https://www.ingramspark.com/

---

## 🎯 My Recommendation

**For accurate print preview:**
1. **Start with Pandoc** (free, I've set it up)
2. **If you like it, consider Vellum** ($249, but worth it for professional results)
3. **Use 3D preview** for visual reference and showing others

The Pandoc script I created will give you a realistic preview of how your text will lay out on printed pages. View it in two-page spread mode to see facing pages like a real book.


