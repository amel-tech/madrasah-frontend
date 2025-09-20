export type Card = {
  id: number
  type: 'hadeeth' | 'vocabulary'
  is_public: boolean
  author: string
  content: {
    front?: string
    back?: string
    note?: string
  }
  image_source: string
  deck_id?: number
}

export type Deck = {
  id: number
  author: string
  title: string
  description: string
  stats: {
    cards_count?: number
    downloads_count?: number
    rating?: number
  }
  is_public: boolean
}

export type Tag = {
  id: number
  title: string
}
