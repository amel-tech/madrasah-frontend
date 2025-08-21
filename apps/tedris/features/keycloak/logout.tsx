'use client'
import { SessionProvider, signOut, useSession } from 'next-auth/react'
import { Button } from '@madrasah/ui/components/button'
import { env } from '~/env'

const KeycloakLogoutButton = () => {
  const session = useSession()
  const signOutWithRedirect = async () => {
    const idtoken = session.data?.idToken
    // TODO: Exception yönetimi eklenmeli NEXT_PUBLIC_KEYCLOAK_CLIENT_ID, NEXT_PUBLIC_NEXTAUTH_URL ve idtoken için
    const params = new URLSearchParams({
      client_id: env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID ?? '',
      post_logout_redirect_uri: env.NEXT_PUBLIC_NEXTAUTH_URL ?? '',
      id_token_hint: idtoken ?? '',
    })
    const keycloakLogoutUrl = `${env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/logout?${params.toString()}`
    await signOut({ redirect: false, callbackUrl: keycloakLogoutUrl })
    window.location.href = keycloakLogoutUrl
  }
  return <Button onClick={() => signOutWithRedirect()}>ÇIKIŞ YAP</Button>
}
const KeycloakLogout = () => {
  // TODO:Session Provider should not to be there. It must be move global provider of app context.
  return (
    <SessionProvider>
      <KeycloakLogoutButton />
    </SessionProvider>
  )
}
export default KeycloakLogout
