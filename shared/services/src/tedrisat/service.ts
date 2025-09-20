import { createTedrisatClient } from './client'
import { Card, Tag, Deck } from './types'

type HttpClient = ReturnType<typeof createTedrisatClient>

export class TedrisatService {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  async getDashboard() {
    return this.client<{ decks: Deck[], tags: Tag[], explore: Deck[] }>('/decks/dashboard')
  }

  async createCard(body: Card[]) {
    return this.client<Card[]>(`/card`, { method: 'POST', body: JSON.stringify(body) })
  }

  async getCard(id: number) {
    return this.client<Card>(`/cards/${id}`)
  }

  async updateCard(id: number, body: Partial<Card>) {
    return this.client<Card>(`/cards/${id}`, { method: 'PUT', body: JSON.stringify(body) })
  }

  async getDecksSelf() {
    return this.client<Deck[]>('/decks/self')
  }

  async getDecks() {
    return this.client<Deck[]>(`/decks`)
  }

  async getDeck(id: string) {
    return this.client<Deck>(`/decks/${id}`)
  }

  async getDeckCards(id: string) {
    return this.client<Card[]>(`/decks/${id}/cards`)
  }

  async getTags() {
    return this.client<Tag[]>('/tags/')
  }
}
