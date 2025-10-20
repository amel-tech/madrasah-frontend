import { useCallback, useMemo } from 'react'
import { usePathname } from 'next/navigation'

interface Route {
  title: string
  url: string
  items?: Route[]
}

export function useBreadcrumb(routes: { navMain: Route[] }) {
  const pathname = usePathname()

  const findBreadcrumbs = useCallback(
    (routes: Route[], path: string): Route[] => {
      for (const route of routes) {
        if (path.startsWith(route.url)) {
          const childBreadcrumbs = route.items
            ? findBreadcrumbs(route.items, path)
            : []
          return [route, ...childBreadcrumbs]
        }
      }
      return []
    },
    [],
  )

  const breadcrumbs = useMemo(() => {
    return findBreadcrumbs(routes.navMain, pathname)
  }, [pathname, routes, findBreadcrumbs])

  return breadcrumbs
}
