import DeckCards from './components/decks'

import { createServerTedrisatAPIs } from '@madrasah/services/tedrisat'
import { env } from '~/env'
import { cookies } from 'next/headers'

export default async function DeckCardsPage({
  params,
}: {
  params: Promise<{
    id: string
  }>
}) {
  const { id } = await params

  const cookieStore = await cookies()
  const { decks } = await createServerTedrisatAPIs(cookieStore, env.TEDRISAT_API_BASE_URL)

  const result = await decks.getFlashcardDeckWithCards({ id: Number(id) })

  return <DeckCards deckId={id} flashcards={result.flashcards} />
}
