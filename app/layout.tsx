import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { AppShell } from '@/components/layout/AppShell'
import './globals.css'

// Display font: headings, card titles, hero text
const spaceGrotesk = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

// Body font: UI text, descriptions, labels
const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
})

// Mono font: numbers, XP, streaks, stats, timers, system labels
const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'AscendOS',
  description: 'Personal self-improvement command center',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
