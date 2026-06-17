'use client'

import {
  SidebarMenu,
  SidebarMenuButton,
} from '@madrasah/ui/components/sidebar'
import { SignInIcon } from '@madrasah/icons'
import { signIn } from 'next-auth/react'
import { useLocale, useTranslations } from 'next-intl'

const KeycloakLogin = () => {
  const t = useTranslations('nizam')
  const locale = useLocale()
  const handleButtonClick = () => {
    signIn('keycloak', { redirect: true }, { ui_locales: locale })
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
        <span className="truncate font-medium">{t('KeycloakLogin.signIn')}</span>
      </SidebarMenuButton>
    </SidebarMenu>
  )
}

export default KeycloakLogin
