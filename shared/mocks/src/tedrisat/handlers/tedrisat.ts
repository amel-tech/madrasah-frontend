import { http, HttpResponse } from 'msw'
import { MockApiHandlers } from '../../types'

import { faker } from '../faker'
import type { Card, Deck, Tag, TedrisatService } from '@madrasah/services/tedrisat'

/**
* This is a factory function that creates HTTP handlers for mocking API endpoints.
*/
export const tedrisatHandlers = (baseUrl: string): MockApiHandlers<TedrisatService> => {
  if (!baseUrl) {
    throw new Error('Base URL is required to create mock API handlers.')
  }

  const handlers: MockApiHandlers<TedrisatService> = {
    getDashboard: http.get(`${baseUrl}/decks/dashboard`, (): HttpResponse<{ decks: Deck[], tags: Tag[], explore: Deck[] }> => {
      const decks = faker.helpers.multiple((_, index) => faker.tedrisat.deck(index + 1), { count: 4 })
      const tags = faker.helpers.multiple((_, index) => faker.tedrisat.tag(index + 1), { count: 10 })
      const explore = faker.helpers.multiple((_, index) => faker.tedrisat.deck(index + 1), { count: 8 })

      return HttpResponse.json({ decks, tags, explore })
    }),
    getDecksSelf: http.get(`${baseUrl}/decks/self`, (): HttpResponse<Deck[]> => {
      const decks = faker.helpers.multiple((_, index) => faker.tedrisat.deck(index + 1), { count: 4 })
      return HttpResponse.json(decks)
    }),
    getDecks: http.get(`${baseUrl}/decks`, (): HttpResponse<Deck[]> => {
      const decks = faker.helpers.multiple((_, index) => faker.tedrisat.deck(index + 1), { count: 8 })
      return HttpResponse.json(decks)
    }),
    getDeck: http.get(`${baseUrl}/decks/:id`, ({ params: { id } }): HttpResponse<Deck> => {
      const deck = faker.tedrisat.deck(Number(id))
      return HttpResponse.json(deck)
    }),
    getDeckCards: http.get(`${baseUrl}/decks/:id/cards`, (): HttpResponse<Card[]> => {
      const cards = faker.helpers.multiple((_, index) => faker.tedrisat.card(index + 1), { count: 10 })
      return HttpResponse.json(cards)
    }),
    getTags: http.get(`${baseUrl}/tags`, (): HttpResponse<Tag[]> => {
      const lists = faker.helpers.multiple((_, index) => faker.tedrisat.tag(index + 1), { count: 12 })
      return HttpResponse.json(lists)
    }),

  }

  return handlers
}
