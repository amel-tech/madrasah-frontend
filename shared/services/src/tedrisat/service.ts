import { createTedrisatClient } from './client'
import { Card, List } from './types'

type HttpClient = ReturnType<typeof createTedrisatClient>

export class TedrisatService {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  async getCards() {
    return this.client<Card[]>('/cards')
  }

  async getCard(id: number) {
    return this.client<Card>(`/cards/${id}`)
  }

  async getLists() {
    return this.client<List[]>('/lists')
  }

  async getList(id: number) {
    return this.client<List>(`/lists/${id}`)
  }

  async getListCards(id: number) {
    return this.client<Card[]>(`/lists/${id}/cards`)
  }
}
