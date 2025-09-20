import { useSession } from 'next-auth/react'
import { useMemo } from 'react'
import { TedrisatService, createTedrisatClient } from '@madrasah/services/tedrisat'
import { env } from '~/env'

/**
 * React hook that provides an authenticated API service instance based on the current user's session.
 *
 * This hook uses the NextAuth `useSession` hook to determine the authentication status and access token.
 * If the user is authenticated, it creates and memoizes an `APIService` instance with the user's access token.
 * If the user is not authenticated or the session is loading, it returns `null` for the API service.
 *
 * @returns An object containing:
 *   - `api`: An instance of `APIService` if authenticated, otherwise `null`.
 *   - `status`: The current authentication status, which can be `'loading'`, `'authenticated'`, or `'unauthenticated'`.
 */
export const useApi = (): { api: TedrisatService | null, status: 'loading' | 'authenticated' | 'unauthenticated' } => {
  const { data: session, status } = useSession()

  const accessToken = session?.accessToken as string | undefined

  const apiServiceInstance = useMemo(() => {
    if (status !== 'authenticated' || !accessToken) {
      return null
    }

    const client = createTedrisatClient({
      baseUrl: env.NEXT_PUBLIC_TEDRISAT_API_BASE_URL!,
      token: accessToken,
    })

    return new TedrisatService(client)
  }, [accessToken, status])

  return { api: apiServiceInstance, status }
}
