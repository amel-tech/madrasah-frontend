'use client'

import { Button } from '@madrasah/ui/components/button'
import { signIn } from 'next-auth/react'
import { useLocale } from 'next-intl'

const KeycloakLogin = () => {
  const locale = useLocale()
  const onClick = () => {
    signIn('keycloak', { redirect: true }, { ui_locales: locale })
  }
  return <Button onClick={onClick}>Giriş Yap</Button>
}

export default KeycloakLogin
