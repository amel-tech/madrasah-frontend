import { type Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@madrasah/ui/globals.css'

const inter = Inter({ subsets: ['latin'] })
import { Header } from '~/components/header/header'
import { ClientProviders } from '~/components/providers/client-providers'
import { TabView } from '~/components/tab-view'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '~/lib/i18n/routing'
import { setRequestLocale } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Madrasah - Online Medrese',
  description: 'Online Medrese Projesi',
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html lang="tr" className="min-h-svh h-full">
      <body className={`${inter.className} h-full flex flex-col`}>
        <NextIntlClientProvider>
          <ClientProviders>
            <Header />
            <TabView>{children}</TabView>
          </ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
