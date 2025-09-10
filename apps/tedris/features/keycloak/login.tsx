'use client'

import { Button } from '@madrasah/ui/components/button'
import { signIn } from 'next-auth/react'

const KeycloakLogin = () => {
  const onClick = () => {
    signIn('keycloak')
  }
  return <Button onClick={onClick}>Giriş Yap</Button>
}

export default KeycloakLogin
