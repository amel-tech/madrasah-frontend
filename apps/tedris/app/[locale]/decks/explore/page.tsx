import { env } from '~/env'
import {
  createServerTedrisatAPIs,
  type FlashcardDeckResponse,
} from '@madrasah/services/tedrisat'
import { auth } from '~/lib/auth_options'
import { ExploreDecksPage } from '~/features/flashcards/components/explore-decks-page'

async function getAllDecks(): Promise<FlashcardDeckResponse[]> {
  try {
    const session = await auth()
    const token = session?.accessToken
    const { decks } = await createServerTedrisatAPIs(token, env.TEDRISAT_API_BASE_URL)
    return decks.getAllFlashcardDecks()
  }
  catch (error) {
    console.error('Error fetching decks:', error)
    return []
  }
}

async function getUserDecks(): Promise<FlashcardDeckResponse[]> {
  try {
    const session = await auth()
    const token = session?.accessToken
    if (!token) return []
    const API = await createServerTedrisatAPIs(token, env.TEDRISAT_API_BASE_URL)
    return API.decks.getAllFlashcardDecksByUser()
  }
  catch (error) {
    console.error('Error fetching user decks:', error)
    return []
  }
}

export default async function Page() {
  const [decks, userDecks] = await Promise.all([
    getAllDecks(),
    getUserDecks(),
  ])

  const userDeckIds = new Set(userDecks.map(deck => deck.id))

  return (
    <ExploreDecksPage
      initialDecks={decks}
      userDeckIds={Array.from(userDeckIds)}
    />
  )
}
