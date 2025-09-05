import { Icon, TableIcon } from '@madrasah/icons'

export type NavigationRouteType = {
  title: string
  url: string
  isActive?: boolean
  icon?: Icon
  items?: NavigationRouteType[]
}

export const routes: {
  navMain: NavigationRouteType[]
} = {
  navMain: [
    {
      title: 'Cards',
      url: '/cards',
      icon: TableIcon,
    },
  ],
}
