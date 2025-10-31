'use client'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from '@madrasah/ui/components/sonner'
import { NextIntlClientProvider } from 'next-intl'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale="en">
      <SessionProvider>
        {children}
        <Toaster />
      </SessionProvider>
    </NextIntlClientProvider>
  )
}
