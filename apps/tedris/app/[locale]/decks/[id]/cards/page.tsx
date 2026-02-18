import { createServerTedrisatAPIs } from '@madrasah/services/tedrisat'
import { env } from '~/env'
import { auth } from '~/lib/auth_options'
import { DeckCardsPage } from '~/features/flashcards/components/deck-cards-page'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const session = await auth()
  const token = session?.accessToken
  const API = await createServerTedrisatAPIs(token, env.TEDRISAT_API_BASE_URL)

  const cards = await API.cards.getFlashcardByDeckId({ deckId: id })

  return (
    <DeckCardsPage
      deckId={id}
      flashcards={cards || []}
    />
  )
}
