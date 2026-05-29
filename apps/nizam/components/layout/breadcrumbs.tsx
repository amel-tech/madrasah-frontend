'use client'

import {
  Breadcrumbs as UiBreadcrumbs,
  type BreadcrumbEntry,
} from '@madrasah/ui/components/breadcrumb'
import { useTranslations } from 'next-intl'
import { useBreadcrumb } from '~/hooks/useBreadcrumb'
import { NavigationRouteType } from './nav-routes'

interface BreadcrumbsProps {
  routes: {
    navMain: NavigationRouteType[]
  }
}

export function Breadcrumbs({ routes }: BreadcrumbsProps) {
  const t = useTranslations('nizam')
  const breadcrumbs = useBreadcrumb(routes)

  const items: BreadcrumbEntry[] = [
    { label: t('Breadcrumbs.home'), href: '/' },
    ...breadcrumbs.map(crumb => ({ label: crumb.title, href: crumb.url })),
  ]

  return <UiBreadcrumbs items={items} />
}
