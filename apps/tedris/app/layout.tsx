import { type Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@madrasah/ui/globals.css'

const inter = Inter({ subsets: ['latin'] })
import { Header } from '~/components/header/header'
import { ClientProviders } from '~/components/providers/client-providers'
import { TabView } from '~/components/tab-view/TabView'
import { MSWComponent } from '~/components/msw-component'
import { MockIndicator } from '~/components/mock-indicator'
import { env } from '~/env'

export const metadata: Metadata = {
  title: 'Madrasah - Online Medrese',
  description: 'Online Medrese Projesi',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (process.env.NEXT_RUNTIME === 'nodejs' && env.API_MOCKING === 'enabled' && process.env.NODE_ENV === 'development') {
    const { server } = await import('../mocks/server')
    server.listen({ onUnhandledRequest: 'bypass' })
  }

  return (
    <html lang="tr">
      <body className={inter.className}>
        <MSWComponent />
        <MockIndicator />
        <ClientProviders>
          <Header />
          <TabView>{children}</TabView>
        </ClientProviders>
      </body>
    </html>
  )
}
