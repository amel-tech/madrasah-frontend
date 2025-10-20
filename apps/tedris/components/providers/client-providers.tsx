'use client'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from '@madrasah/ui/components/sonner'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster />
    </SessionProvider>
  )
}
