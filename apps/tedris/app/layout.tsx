import { type Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import '@madrasah/ui/globals.css'

const inter = Inter({ subsets: ['latin'] })
import { Header } from '~/components/header/header'
import { ClientProviders } from '~/components/providers/client-providers'
import { TabView } from '~/components/tab-view/TabView'

export const metadata: Metadata = {
  title: 'Madrasah - Online Medrese',
  description: 'Online Medrese Projesi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <ClientProviders>
          <Header />
          <TabView>{children}</TabView>
        </ClientProviders>
      </body>
    </html>
  )
}
