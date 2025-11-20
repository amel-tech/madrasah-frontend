import { createServerTedrisatAPIs } from '@madrasah/services/tedrisat'
import { env } from '~/env'
import Decks from './components/decks'
import { getServerSession } from 'next-auth'
import authOptions from '~/lib/auth_options'

export default async function DeckCardsPage() {
  const session = await getServerSession(authOptions)
  const token = session?.accessToken

  const { decks } = await createServerTedrisatAPIs(token, env.TEDRISAT_API_BASE_URL)
  const result = await decks.getAllFlashcardDecks()

  return <Decks decks={result} />
}
