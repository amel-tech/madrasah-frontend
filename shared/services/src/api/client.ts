import { createHttpClient } from '../core/httpClient'

export interface APIConfig {
  baseUrl: string
  token?: string
}

export const createAPIClient = (config: APIConfig) => {
  return createHttpClient(config.baseUrl, {
    headers: {
      Authorization: `Bearer ${config.token}`,
    },
  })
}
