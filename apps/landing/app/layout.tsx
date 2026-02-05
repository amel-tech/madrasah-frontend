import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@madrasah/ui/globals.css'

export const metadata: Metadata = {
  title: 'Madrasah',
  description: 'Beyond Borders, Bound to Knowledge',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
