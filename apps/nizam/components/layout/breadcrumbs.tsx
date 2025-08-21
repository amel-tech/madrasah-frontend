'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@madrasah/ui/components/breadcrumb'
import { useBreadcrumb } from '~/hooks/useBreadcrumb'
import { NavigationRouteType } from './nav-routes'

interface BreadcrumbsProps {
  routes: {
    navMain: NavigationRouteType[]
  }
}

export function Breadcrumbs({ routes }: BreadcrumbsProps) {
  const breadcrumbs = useBreadcrumb(routes)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbPage>
        </BreadcrumbItem>
        {breadcrumbs.length > 0
          && <BreadcrumbSeparator />}
        {breadcrumbs.map((breadcrumb, index) => (
          <BreadcrumbItem key={breadcrumb.url}>
            {index < breadcrumbs.length - 1
              ? (
                  <>
                    <BreadcrumbLink href={breadcrumb.url}>
                      {breadcrumb.title}
                    </BreadcrumbLink>

                    <BreadcrumbSeparator />
                  </>
                )
              : (
                  <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
