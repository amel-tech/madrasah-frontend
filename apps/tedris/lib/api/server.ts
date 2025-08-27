import 'server-only';

import { cookies } from 'next/headers';
import { env } from '~/env';

// Import the new factory function for better type safety
import { createTedrisatAPI, type APIConfig } from '@madrasah/services/tedrisat';

/**
 * Creates API configuration for the current request
 */
const createAPIConfig = async (): Promise<APIConfig> => {
  const token = (await cookies()).get('auth-token')?.value;
  
  return {
    baseUrl: env.TEDRISAT_API_BASE_URL,
    token,
  };
};

// Type for the API instance to avoid inference issues
type APIServiceType = ReturnType<typeof createTedrisatAPI>;

/**
 * Server-side API instance that automatically handles authentication for each request.
 * Uses the new Orval-generated functions with proper type safety.
 */
export const api: APIServiceType = new Proxy({} as APIServiceType, {
  get<K extends keyof APIServiceType>(_, propKey: K) {
    return async (...args: Parameters<APIServiceType[K]>) => {
      const config = await createAPIConfig();
      const apiInstance = createTedrisatAPI(config);
      const method = apiInstance[propKey];
      
      if (typeof method === 'function') {
        return (method as Function)(...args);
      }
      
      return undefined;
    };
  },
});