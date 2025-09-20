import { http, HttpResponse } from 'msw'
import { MockApiHandlers } from '../../types'

import { faker } from '../faker'
import type { Card, Deck, Tag, TedrisatService } from '@madrasah/services/tedrisat'
import { db } from '../db'

/**
* This is a factory function that creates HTTP handlers for mocking API endpoints.
*/
export const tedrisatHandlers = (baseUrl: string): MockApiHandlers<TedrisatService> => {
  if (!baseUrl) {
    throw new Error('Base URL is required to create mock API handlers.')
  }

  const handlers: MockApiHandlers<TedrisatService> = {
    getCard: http.get(`${baseUrl}/cards/:id`, ({ params: { id } }): HttpResponse<Card> => {
      const card = db.card.findFirst({
        where: { id: { equals: Number(id) } },
      })
      return HttpResponse.json(card)
    }),
    createCard: http.post(`${baseUrl}/card`, async ({ request }): Promise<HttpResponse<Card[]>> => {
      const body = await request.json() as Card[]
      if (!body) return HttpResponse.error()

      const createdCards = body.map(card => db.card.create(card))
      return HttpResponse.json(createdCards)
    }),
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
      const decks = db.deck.findMany({})
      return HttpResponse.json(decks)
    }),
    getDeck: http.get(`${baseUrl}/decks/:id`, ({ params: { id } }): HttpResponse<Deck> => {
      const deck = faker.tedrisat.deck(Number(id))
      return HttpResponse.json(deck)
    }),
    getDeckCards: http.get(`${baseUrl}/decks/:id/cards`, ({
      params: { id },
    }): HttpResponse<Card[]> => {
      const cards = db.card.findMany({
        where: { deck_id: { equals: Number(id) } },
      })
      console.log(`Fetched ${cards.length} cards for deck ID ${id}`)
      return HttpResponse.json(cards)
    }),
    getTags: http.get(`${baseUrl}/tags`, (): HttpResponse<Tag[]> => {
      const lists = faker.helpers.multiple((_, index) => faker.tedrisat.tag(index + 1), { count: 12 })
      return HttpResponse.json(lists)
    }),
    updateCard: http.put(`${baseUrl}/cards/:id`, async ({ params: { id }, request }) => {
      console.log('Updating card:', id)
      const body = await request.json() as Partial<Card>
      if (!body) return HttpResponse.error()

      const updatedCard = db.card.update({
        where: { id: { equals: Number(id) } },
        data: body,
      })

      if (!updatedCard) {
        return new HttpResponse(JSON.stringify({ error: 'Card not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      return HttpResponse.json(updatedCard)
    }),
  }

  return handlers
}
