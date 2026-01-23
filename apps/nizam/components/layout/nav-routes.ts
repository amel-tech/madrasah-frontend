import { Icon, TableIcon } from '@madrasah/icons'

export type NavigationRouteType = {
  title: string
  url: string
  isActive?: boolean
  icon?: Icon
  items?: NavigationRouteType[]
}

// Note: This file is used for route configuration.
// The actual title display should use i18n in the component that renders these routes.
// For now, we keep the hard-coded string here as it's just a configuration object.
// The component using this should translate the title when displaying it.
export const routes: {
  navMain: NavigationRouteType[]
} = {
  navMain: [
    {
      title: 'Decks',
      url: '/decks',
      icon: TableIcon,
    },
  ],
}
