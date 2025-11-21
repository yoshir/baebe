# Optimal Anarchy Investor Portal

A Next.js application for the Optimal Anarchy investor portal, featuring a hacker aesthetic design and comprehensive investment tools.

## Features

- **Pitch Documentation**: Full pitch document with markdown rendering
- **Investor Registration**: Signup form with integrated NDA
- **Call Booking**: Schedule calls with the founding team
- **Letter of Intent Generator**: Create and download LOI documents
- **NDA Protection**: Strong IP protection language for entertainment industry

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Markdown
- Date-fns

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
investor-portal/
├── app/
│   ├── page.tsx          # Home page
│   ├── pitch/
│   │   └── page.tsx      # Pitch document page
│   ├── signup/
│   │   └── page.tsx      # Investor registration
│   ├── book-call/
│   │   └── page.tsx      # Call booking
│   └── loi/
│       └── page.tsx      # Letter of Intent generator
├── lib/
│   ├── pitchContent.ts   # Full pitch markdown content
│   └── ndaContent.ts     # NDA document content
└── components/           # Reusable components (if needed)
```

## Design System

The portal uses a "hacker" aesthetic with:
- Dark background (#000000, #0a0a0a)
- Green terminal text (#00ff41)
- Monospace fonts
- Glowing effects
- Terminal-style UI elements

## Legal Documents

- **NDA**: Comprehensive Non-Disclosure Agreement with strong IP protection language
- **LOI Template**: Letter of Intent template for investment expressions

## Notes

- All forms currently log to console - integrate with backend in production
- NDA and LOI are generated client-side - consider server-side generation for production
- Pitch content is loaded from TypeScript file - consider API or markdown file in production









