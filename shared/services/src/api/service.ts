import { createAPIClient } from './client'
import { Post } from './types'

type HttpClient = ReturnType<typeof createAPIClient>

export class APIService {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  async getPosts() {
    return this.client<Post[]>('/posts')
  }
}
