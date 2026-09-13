import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Andromeda | Influence Beyond Borders',
  description: 'Andromeda connects brands with the right creators to create meaningful impact across the GCC.',
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
