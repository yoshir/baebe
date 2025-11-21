import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Optimal Anarchy | Investor Portal',
  description: 'AI-Native Full-Stack Entertainment Company - Investor Access',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}









