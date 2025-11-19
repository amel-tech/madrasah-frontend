import FlashCardList from '~/features/flashcards/components/flashcard-list'
import { env } from '~/env'
import { createServerTedrisatAPIs, FlashcardResponse } from '@madrasah/services/tedrisat'
import authOptions from '~/lib/auth_options'
import { getServerSession } from 'next-auth'

async function getDeckCards(deckId: string): Promise<FlashcardResponse[]> {
  const session = await getServerSession(authOptions)
  const token = session?.accessToken

  const { decks } = await createServerTedrisatAPIs(token, env.TEDRISAT_API_BASE_URL)

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
    <div className="h-full">
      <FlashCardList cards={cards} />
    </div>
  )
}
