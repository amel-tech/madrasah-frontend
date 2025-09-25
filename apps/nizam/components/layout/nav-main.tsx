'use client'
import { CaretRightIcon } from '@madrasah/icons'

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
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Content</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(item => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title}>
                <a href={item.url}>
                  {item.icon && <item.icon />}
                  <span className={cn(
                    'flex items-center gap-2',
                    item.isActive ? 'text-brand-primary font-medium' : '',
                  )}
                  >
                    {item.title}
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
                          {item.items?.map(subItem => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>
                                  <span
                                    className={cn(
                                      'flex items-center gap-2',
                                      subItem.isActive ? 'text-brand-primary font-semibold' : '',
                                    )}
                                  >
                                    {subItem.title}
                                  </span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  )
                : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
