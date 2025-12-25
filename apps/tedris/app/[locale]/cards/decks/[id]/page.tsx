import FlashCardList from '~/features/flashcards/components/flashcard-list'
import { env } from '~/env'
import { createServerTedrisatAPIs, FlashcardResponse } from '@madrasah/services/tedrisat'
import { auth } from '~/lib/auth_options'

async function getDeckCards(deckId: string): Promise<FlashcardResponse[]> {
  const session = await auth()
  const token = session?.accessToken

  const API = await createServerTedrisatAPIs(token, env.TEDRISAT_API_BASE_URL)

  const cards = await API.cards.getFlashcardByDeckId({ deckId })

  return cards || []
}

export default async function Page({ params }: {
  params: Promise<{
    id: string
  }>
}) {
  const { id } = await params
  const cards = await getDeckCards(id)

  return (
    <div className="h-full">
      <FlashCardList cards={cards} />
    </div>
  )
}
