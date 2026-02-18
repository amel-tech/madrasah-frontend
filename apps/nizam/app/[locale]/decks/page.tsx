import { createServerTedrisatAPIs } from '@madrasah/services/tedrisat'
import { env } from '~/env'
import Decks from '~/features/decks/components/decks'
import { auth } from '~/lib/auth_options'

export default async function DeckCardsPage() {
  const session = await auth()

  const { decks } = await createServerTedrisatAPIs(session?.accessToken, env.TEDRISAT_API_BASE_URL)

  const result = await decks.getAllFlashcardDecks()

  return <Decks decks={result} />
}
