import { env } from '~/env'
import {
  createServerTedrisatAPIs,
  type FlashcardDeckResponse,
} from '@madrasah/services/tedrisat'
import { auth } from '~/lib/auth_options'
import { CardsPage } from '~/features/flashcards/components/cards-page'

async function getDecks(): Promise<FlashcardDeckResponse[]> {
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

export default async function Page() {
  const decks = await getDecks()
  return <CardsPage decks={decks} />
}
