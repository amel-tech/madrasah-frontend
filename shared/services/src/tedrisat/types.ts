export type Card = {
  id: number
  type: 'hadeeth' | 'vocabulary'
  author_id: number
  is_public: boolean
  image_source: string
  content: any
}

export type List = {
  id: number
  author_id: number
  title: string
  description: string
  is_public: boolean
}
