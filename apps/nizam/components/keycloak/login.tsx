'use client'

import {
  SidebarMenu,
  SidebarMenuButton,
} from '@madrasah/ui/components/sidebar'
import { SignInIcon } from '@madrasah/icons'
import { signIn } from 'next-auth/react'

const KeycloakLogin = () => {
  const handleButtonClick = () => {
    signIn('keycloak')
  }

  return (
    <SidebarMenu>
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
        onClick={handleButtonClick}
      >
        <span>
          <SignInIcon size={20} />
        </span>
        <span className="truncate font-medium">Sign In</span>
      </SidebarMenuButton>
    </SidebarMenu>
  )
}

export default KeycloakLogin
