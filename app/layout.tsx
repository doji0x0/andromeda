import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Andromeda | Influencer Marketing Across the Arab World',
  description: 'Andromeda connects brands and creators across Sudan and the Arab world with managed influencer campaigns — sourcing, contracts, and reporting, all in one place.',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#071A2F',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-[#071A2F]">
      <body className="antialiased">{children}</body>
    </html>
  )
}
