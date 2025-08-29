export type Card = {
  id: number
  author_id: number
  is_public: boolean
  content: any
  type: 'hadeeth' | 'vocabulary'
  image_source: string
}

export type List = {
  id: number
  author_id: number
  title: string
  description: string
  is_public: boolean
}
