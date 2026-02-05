import DeckCards from '~/features/decks/components/cards'

import { createServerTedrisatAPIs } from '@madrasah/services/tedrisat'
import { env } from '~/env'
import { auth } from '~/lib/auth_options'

export default async function DeckCardsPage({
  params,
}: {
  params: Promise<{
    id: string
  }>
}) {
  const { id } = await params

  const session = await auth()
  const token = session?.accessToken

  const API = await createServerTedrisatAPIs(token, env.TEDRISAT_API_BASE_URL)

  const [deck, cards] = await Promise.all([
    API.decks.getFlashcardDeckById({ id }),
    API.cards.getFlashcardByDeckId({ deckId: id }),
  ])

  return <DeckCards deck={deck} cards={cards || []} />
}
