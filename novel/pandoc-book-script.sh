#!/bin/bash

# BAEBE Book Preview Script
# Converts markdown chapters to a print-ready PDF using Pandoc
# Usage: ./pandoc-book-script.sh [output-filename.pdf]

OUTPUT_FILE="${1:-baebe-book-preview.pdf}"

echo "📚 Building BAEBE book preview..."
echo "Output: $OUTPUT_FILE"
echo ""

# Check if pandoc is installed
if ! command -v pandoc &> /dev/null; then
    echo "❌ Pandoc is not installed."
    echo "Install with: brew install pandoc"
    exit 1
fi

# Check if xelatex is available (for better font support)
PDF_ENGINE="xelatex"
if ! command -v xelatex &> /dev/null; then
    echo "⚠️  xelatex not found, trying pdflatex..."
    PDF_ENGINE="pdflatex"
    if ! command -v pdflatex &> /dev/null; then
        echo "❌ No LaTeX engine found. Install BasicTeX:"
        echo "   brew install --cask basictex"
        exit 1
    fi
fi

# Build the book in order
echo "📖 Collecting chapters..."

# Create temporary file with all content
TEMP_FILE=$(mktemp)

# Add YAML front matter for title page
cat > "$TEMP_FILE" << 'EOF'
---
title: "BAEBE"
subtitle: "A Novel"
author: "Your Name"
date: "2025"
documentclass: book
classoption: [11pt,twoside,openright]
geometry: "paperwidth=5.5in,paperheight=8.5in,margin=0.75in"
fontfamily: Georgia
fontsize: 11pt
linestretch: 1.6
mainfont: Georgia
---

\newpage

EOF

# Add prologue
if [ -f "00-prologue/prologue-the-unraveling.md" ]; then
    echo "  ✓ Adding prologue..."
    cat "00-prologue/prologue-the-unraveling.md" >> "$TEMP_FILE"
    echo "" >> "$TEMP_FILE"
    echo "\newpage" >> "$TEMP_FILE"
    echo "" >> "$TEMP_FILE"
fi

# Add Part I chapters
echo "  ✓ Adding Part I chapters..."
for chapter in part-i-chains/chapter-*.md; do
    if [ -f "$chapter" ]; then
        echo "    - $(basename $chapter)"
        cat "$chapter" >> "$TEMP_FILE"
        echo "" >> "$TEMP_FILE"
        echo "\newpage" >> "$TEMP_FILE"
        echo "" >> "$TEMP_FILE"
    fi
done

# Add Part II chapters
if [ -d "part-ii-truth" ]; then
    echo "  ✓ Adding Part II chapters..."
    for chapter in part-ii-truth/chapter-*.md; do
        if [ -f "$chapter" ]; then
            echo "    - $(basename $chapter)"
            cat "$chapter" >> "$TEMP_FILE"
            echo "" >> "$TEMP_FILE"
            echo "\newpage" >> "$TEMP_FILE"
            echo "" >> "$TEMP_FILE"
        fi
    done
fi

# Add Part III chapters
if [ -d "part-iii-transcendence" ]; then
    echo "  ✓ Adding Part III chapters..."
    for chapter in part-iii-transcendence/chapter-*.md; do
        if [ -f "$chapter" ]; then
            echo "    - $(basename $chapter)"
            cat "$chapter" >> "$TEMP_FILE"
            echo "" >> "$TEMP_FILE"
            echo "\newpage" >> "$TEMP_FILE"
            echo "" >> "$TEMP_FILE"
        fi
    done
fi

# Convert to PDF with book formatting
echo ""
echo "🖨️  Converting to PDF (this may take a minute)..."
pandoc "$TEMP_FILE" \
    -o "$OUTPUT_FILE" \
    --pdf-engine="$PDF_ENGINE" \
    --template=pandoc-book-template.tex \
    -V geometry:margin=0.75in \
    -V geometry:paperwidth=5.5in \
    -V geometry:paperheight=8.5in \
    -V fontfamily=Georgia \
    -V fontsize=11pt \
    -V linestretch=1.6 \
    -V documentclass=book \
    -V classoption=11pt,twoside,openright \
    --toc-depth=2 \
    -V pagestyle=fancy

# Cleanup
rm "$TEMP_FILE"

if [ -f "$OUTPUT_FILE" ]; then
    echo ""
    echo "✅ Success! Created: $OUTPUT_FILE"
    echo ""
    echo "📖 Open with:"
    echo "   open $OUTPUT_FILE"
    echo ""
    echo "💡 Tips:"
    echo "   - View in two-page spread mode to see facing pages"
    echo "   - Use Print Preview to see exact page layout"
    echo "   - Check margins, font size, and line spacing"
else
    echo ""
    echo "❌ Failed to create PDF. Check errors above."
    exit 1
fi
