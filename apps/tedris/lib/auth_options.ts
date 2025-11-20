import { AuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import KeycloakProvider from 'next-auth/providers/keycloak'
import { env } from '~/env'

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
/**
 * @param  {JWT} token
 */
const refreshAccessToken = async (token: JWT) => {
  try {
    if (Date.now() > token.refreshTokenExpireIn) throw Error

    const url = `${env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      method: 'POST',
      body: new URLSearchParams({
        client_id: env.KEYCLOAK_CLIENT_ID ?? '',
        client_secret: env.KEYCLOAK_CLIENT_SECRET ?? '',
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      }),
    })

    const refreshedTokens = await response.json()

    if (!response.ok) throw refreshedTokens

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpired: Date.now() + (refreshedTokens.expires_in - 15) * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      refreshTokenExpireIn:
        Date.now() + (refreshedTokens.refresh_expires_in - 15) * 1000,
    }
  }
  catch (error) {
    console.log('refreshToken error: ', error)

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: env.KEYCLOAK_CLIENT_ID ?? '',
      clientSecret: env.KEYCLOAK_CLIENT_SECRET ?? '',
      issuer: env.KEYCLOAK_ISSUER ?? '',
      idToken: true,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.accessTokenExpired = (account.expires_at - 15) * 1000
        token.refreshToken = account.refresh_token
        token.idToken = account.id_token
        // remove 15 seconds to avoid edge cases
        token.refreshTokenExpireIn = Date.now() + (account.refresh_expires_in - 15) * 1000
        token.user = user
        return token
      }

      if (Date.now() < token.accessTokenExpired) {
        return token
      }

      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.idToken = token.idToken as string
      return session
    },
  },
}
export default authOptions
