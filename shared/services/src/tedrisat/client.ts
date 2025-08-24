import { createHttpClient } from '../core/httpClient'

export interface APIConfig {
  baseUrl: string
  token?: string
}

export const createTedrisatClient = (config: APIConfig) => {
  return createHttpClient(config.baseUrl, {
    headers: {
      Authorization: `Bearer ${config.token}`,
    },
  })
}
