import { createServerTedrisatAPIs } from '@madrasah/services/tedrisat'
import { env } from '~/env'
import { cookies } from 'next/headers'
import Decks from './components/decks'

export default async function DeckCardsPage() {
  const cookieStore = await cookies()
  const { decks } = await createServerTedrisatAPIs(cookieStore, env.TEDRISAT_API_BASE_URL)
  const result = await decks.getAllFlashcardDecks()

  return <Decks decks={result} />
}
