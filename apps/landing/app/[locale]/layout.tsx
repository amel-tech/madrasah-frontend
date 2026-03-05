import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter, Playfair_Display, IBM_Plex_Sans_Arabic, Amiri } from 'next/font/google'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '~/lib/i18n/routing'
import '@madrasah/ui/globals.css'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Madrasa | A New Era of Islamic Education',
  description: 'Bridging centuries of tradition with the possibilities of the future. An immersive digital sanctuary for seekers of knowledge.',
}

const inter = Inter({ subsets: ['latin'] })

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans-arabic',
  display: 'swap',
})

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-display-arabic',
  display: 'swap',
})

const RTL_LOCALES = ['ar']

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const isRtl = RTL_LOCALES.includes(locale)
  const fontClasses = isRtl
    ? `${ibmPlexSansArabic.className} ${amiri.variable} ${playfairDisplay.variable}`
    : `${inter.className} ${playfairDisplay.variable}`

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
      <body className={fontClasses}>
        <NextIntlClientProvider>
          {children as any}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
