import 'server-only'; // Bu kodun istemciye gitmesini engeller

import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { APIService, createAPIClient } from '@madrasah/services/api';
import { env } from '~/env';

export const getAuthenticatedApiService = (cookies: ReadonlyRequestCookies): APIService => {
  const token = cookies.get('next-auth.session-token')?.value;

  const client = createAPIClient({
    baseUrl: env.TEDRISAT_API_BASE_URL,
    token: token,
  });

  return new APIService(client);
};