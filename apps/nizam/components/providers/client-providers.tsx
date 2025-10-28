'use client'
import { Toaster } from '@madrasah/ui/components/sonner'
import { SessionProvider } from 'next-auth/react'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster />
    </SessionProvider>
  )
}
