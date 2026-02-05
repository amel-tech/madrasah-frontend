import { env } from '~/env'
import {
  createServerTedrisatAPIs,
  type FlashcardDeckResponse,
} from '@madrasah/services/tedrisat'
import { auth } from '~/lib/auth_options'
import { DecksPage } from '~/features/flashcards/components/decks-page'

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

async function getMyDecks(): Promise<FlashcardDeckResponse[] | undefined> {
  try {
    const session = await auth()
    const token = session?.accessToken
    if (!token) return undefined
    const API = await createServerTedrisatAPIs(token, env.TEDRISAT_API_BASE_URL)
    return API.decks.getAllFlashcardDecksByUser()
  }
  catch (error) {
    console.error('Error fetching my decks:', error)
    return undefined
  }
}

export default async function Page() {
  const [decks, myDecks] = await Promise.all([
    getDecks(),
    getMyDecks(),
  ])

  return <DecksPage decks={decks} myDecks={myDecks} />
}
