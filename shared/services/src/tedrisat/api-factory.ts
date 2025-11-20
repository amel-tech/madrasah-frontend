import {
  Configuration,
  FlashcardDecksApi,
  FlashcardCardsApi,
  TedrisatServiceApi,
} from './generated'

export interface TedrisatAPIConfig {
  baseUrl: string
  token?: string
}

/**
 * Factory to create authenticated Tedrisat API clients
 * Direct usage of generated OpenAPI clients
 */
export function createTedrisatAPIs(config: TedrisatAPIConfig) {
  const configuration = new Configuration({
    basePath: config.baseUrl,
    headers: config.token
      ? {
          Authorization: `Bearer ${config.token}`,
        }
      : undefined,
  })

  return {
    decks: new FlashcardDecksApi(configuration),
    cards: new FlashcardCardsApi(configuration),
    service: new TedrisatServiceApi(configuration),
  }
}

/**
 * Convenience function for server-side usage with token
 */
export async function createServerTedrisatAPIs(
  token: string | undefined,
  baseUrl: string,
) {
  return createTedrisatAPIs({ baseUrl, token })
}
