# Bitmap Fonts Directory

Place bitmap font files here (WOFF, WOFF2, TTF, or OTF format).

## Recommended Fonts

1. **Gohufont** - Terminal bitmap font (used by github-readme-terminal)
   - Download: https://github.com/koemaeda/gohufont-ttf
   - Convert to WOFF/WOFF2 for web use

2. **PCFace** - IBM PC OEM font style
   - Download: https://github.com/susam/pcface

3. **Terminus** - Classic terminal bitmap font
   - Download: https://files.ax86.net/terminus-ttf/

## Converting Fonts for Web

Use tools like:
- https://cloudconvert.com/ttf-to-woff2
- https://www.fontsquirrel.com/tools/webfont-generator

Or use command line:
```bash
# Using fonttools (pip install fonttools)
pyftsubset font.ttf --output-file=font.woff2 --flavor=woff2
```

## Usage

After placing font files here, add @font-face declarations in `app/globals.css`:

```css
@font-face {
  font-family: 'bitmap-terminal';
  src: url('/fonts/gohufont.woff2') format('woff2'),
       url('/fonts/gohufont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
```

Then use with the `BitmapFontRenderer` component or `.bitmap-font` CSS class.






