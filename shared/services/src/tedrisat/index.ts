export * from './types'
import { type APIConfig, setGlobalConfig } from '../core/client'
import * as generated from './generated/tedrisatServiceAPI'
import { extendedApiService } from './extended.service'

/**
 * Factory function that creates a fully typed API service instance.
 * Sets global config for the customFetcher to handle baseUrl and authentication.
 */
export function createAPIService(config: APIConfig) {
  // Set the global config so customFetcher can use it
  setGlobalConfig(config)

  const extendedFunctions = extendedApiService(config)

  return {
    ...generated,
    ...extendedFunctions,
  }
}

// For backward compatibility, keep the class but make it a wrapper
export class APIService {
  private _api: ReturnType<typeof createAPIService>

  constructor(config: APIConfig) {
    this._api = createAPIService(config)

    // Proxy all methods to the typed API
    Object.keys(this._api).forEach((key) => {
      (this as any)[key] = (this._api as any)[key]
    })
  }
}

// Export the factory function as the preferred way to create API instances
export { createAPIService as createTedrisatAPI, type APIConfig }
