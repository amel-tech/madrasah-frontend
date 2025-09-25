'use client'

import { AppSidebar } from '~/components/layout/app-sidebar'
import { Separator } from '@madrasah/ui/components/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@madrasah/ui/components/sidebar'
import { Breadcrumbs } from './breadcrumbs'

import { routes } from './nav-routes'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="container flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumbs routes={routes} />
          </div>
        </header>
        <main className="relative block">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
