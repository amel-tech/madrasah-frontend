import { cookies } from 'next/headers'

import FlashCardList from '~/features/flashcards/components/flashcard-list'
import { env } from '~/env'
import { createServerTedrisatAPIs, FlashcardResponse } from '@madrasah/services/tedrisat'

async function getDeckCards(deckId: string): Promise<FlashcardResponse[]> {
  const cookieStore = await cookies()
  const { decks } = await createServerTedrisatAPIs(cookieStore, env.TEDRISAT_API_BASE_URL)

  const deck = await decks.getFlashcardDeckWithCards({
    id: Number(deckId),
    include: ['flashcards'],
  })

  return deck.flashcards || []
}

export default async function Page({ params }: {
  params: Promise<{
    id: string
  }>
}) {
  const { id } = await params
  const cards = await getDeckCards(id)

  return (
    <div className="flex items-center justify-center h-full">
      <FlashCardList cards={cards} />
    </div>
  )
}
