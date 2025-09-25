import { MockData } from '@madrasah/mocks/tedrisat/generate-mock.js'

// Utility for fetching mock data
let cachedMockData: MockData | null = null

export async function getTedrisatMock(): Promise<MockData> {
  // Return cached data if available (for performance)
  if (cachedMockData) {
    return cachedMockData
  }

  try {
    // For build time, use file system access instead of fetch
    if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_BASE_URL) {
      // During build, import the JSON directly to avoid fetch issues
      const fs = await import('fs')
      const path = await import('path')
      const filePath = path.join(process.cwd(), 'public/mocks/tedrisat.json')
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const data = JSON.parse(fileContent)
      cachedMockData = data
      return data
    }

    const baseUrl = process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com'

    const response = await fetch(`${baseUrl}/mocks/tedrisat.json`, {
      // Add cache headers for production
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch mock data: ${response.status}`)
    }

    const data = await response.json()
    cachedMockData = data
    return data
  }
  catch (error) {
    console.error('Error fetching mock data:', error)
    // Return empty structure as fallback
    return {
      cards: [],
      decks: [],
      tags: [],
      metadata: {
        generatedAt: new Date().toISOString(),
        totalRecords: 0,
        relationships: {
          decks_count: 0,
          cards_count: 0,
          tags_count: 0,
          cards_with_deck_relations: 0,
        },
      },
    }
  }
}
