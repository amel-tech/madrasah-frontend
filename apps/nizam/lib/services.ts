import 'server-only'

import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { TedrisatService, createTedrisatClient } from '@madrasah/services/tedrisat'
import { env } from '~/env'

export const getAuthenticatedApiService = (cookies: ReadonlyRequestCookies): TedrisatService => {
  const token = cookies.get('next-auth.session-token')?.value

  const client = createTedrisatClient({
    baseUrl: env.TEDRISAT_API_BASE_URL,
    token: token,
  })

  return new TedrisatService(client)
}
