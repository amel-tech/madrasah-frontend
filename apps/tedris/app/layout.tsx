import { type Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@madrasah/ui/globals.css'

const inter = Inter({ subsets: ['latin'] })
import { Header } from '~/components/header/header'
import { ClientProviders } from '~/components/providers/client-providers'
import { TabView } from '~/components/tab-view'

export const metadata: Metadata = {
  title: 'Madrasah - Online Medrese',
  description: 'Online Medrese Projesi',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="min-h-svh h-full">
      <body className={`${inter.className} h-full flex flex-col`}>
        <ClientProviders>
          <Header />
          <TabView>{children}</TabView>
        </ClientProviders>
      </body>
    </html>
  )
}
