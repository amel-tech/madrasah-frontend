'use client'
import { CaretRightIcon } from '@madrasah/icons'
import { useTranslations } from 'next-intl'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@madrasah/ui/components/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@madrasah/ui/components/sidebar'
import { cn } from '@madrasah/ui/lib/utils'
import { NavigationRouteType } from './nav-routes'

export function NavMain({
  items,
}: {
  items: NavigationRouteType[]
}) {
  const t = useTranslations('nizam')
  const getTranslatedTitle = (title: string) => {
    // Map route titles to translation keys
    if (title === 'Decks') return t('NavRoutes.decks')
    return title
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t('NavMain.content')}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(item => {
          const translatedTitle = getTranslatedTitle(item.title)
          return (
            <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={translatedTitle}>
                  <a href={item.url}>
                    {item.icon && <item.icon />}
                    <span className={cn(
                      'flex items-center gap-2',
                      item.isActive ? 'text-brand-primary font-medium' : '',
                    )}
                    >
                      {translatedTitle}
                    </span>
                  </a>
                </SidebarMenuButton>
                {item.items?.length
                  ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="data-[state=open]:rotate-90">
                            <CaretRightIcon />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map(subItem => {
                              const translatedSubTitle = getTranslatedTitle(subItem.title)
                              return (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild>
                                    <a href={subItem.url}>
                                      <span
                                        className={cn(
                                          'flex items-center gap-2',
                                          subItem.isActive ? 'text-brand-primary font-semibold' : '',
                                        )}
                                      >
                                        {translatedSubTitle}
                                      </span>
                                    </a>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              )
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    )
                  : null}
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
