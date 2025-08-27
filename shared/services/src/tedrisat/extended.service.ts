import { createConfiguredFetcher, type APIConfig } from '../core/client'
import type { User } from '@madrasah/types'

export const extendedApiService = (config: APIConfig) => {
  const client = createConfiguredFetcher(config)

  return {
    getUsers: () => {
      return client<User[]>('/users')
    },

    createAnnouncement: (announcementContent: { title: string, message: string }) => {
      return client<{ success: boolean, id: number }>('/announcements', {
        method: 'POST',
        body: JSON.stringify(announcementContent),
      })
    },
  }
}
