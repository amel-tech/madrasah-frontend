import DeckCards from './components/cards'

import { createServerTedrisatAPIs } from '@madrasah/services/tedrisat'
import { env } from '~/env'
import authOptions from '~/lib/auth_options'
import { getServerSession } from 'next-auth'

export default async function DeckCardsPage({
  params,
}: {
  params: Promise<{
    id: string
  }>
}) {
  const { id } = await params

  const session = await getServerSession(authOptions)
  const token = session?.accessToken
  const { decks } = await createServerTedrisatAPIs(token, env.TEDRISAT_API_BASE_URL)

  const result = await decks.getFlashcardDeckWithCards({ id: Number(id) })

  return <DeckCards deckId={id} flashcards={result.flashcards} />
}
