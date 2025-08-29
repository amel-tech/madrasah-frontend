import { http, HttpResponse } from 'msw'
import { db } from '../db'
import { MockApiHandlers } from '../../types'

import type { Card, TedrisatService } from '@madrasah/services/tedrisat'

/**
* This is a factory function that creates HTTP handlers for mocking API endpoints.
*/
export const tedrisatHandlers = (baseUrl: string): MockApiHandlers<TedrisatService> => {
  if (!baseUrl) {
    throw new Error('Base URL is required to create mock API handlers.')
  }

  const handlers: MockApiHandlers<TedrisatService> = {
    getCards: http.get(`${baseUrl}/cards`, (): HttpResponse<Card[]> => {
      const cards = db.card.getAll()
      return HttpResponse.json(cards)
    }),
    getCard: http.get(`${baseUrl}/cards/:id`, ({ params: { id } }): HttpResponse<Card> => {
      const card = db.card.findFirst({
        where: { id: { equals: Number(id) } },
      })
      return HttpResponse.json(card)
    }),
    createCard: http.post(`${baseUrl}/cards`, async (req) => {
      const card = await req.request.json() as Card
      db.card.create(card)
      return HttpResponse.json(card)
    }),

    getListCards: http.get(`${baseUrl}/cards/list`, () => {
      const cards = db.card.getAll()
      return HttpResponse.json(cards)
    }),
    getLists: http.get(`${baseUrl}/lists`, () => {
      const lists = db.list.getAll()
      return HttpResponse.json(lists)
    }),
    getList: http.get(`${baseUrl}/lists/:id`, ({ params: { id } }) => {
      const list = db.list.findFirst({
        where: { id: { equals: Number(id) } },
      })
      return HttpResponse.json(list)
    }),
  }

  return handlers
}
