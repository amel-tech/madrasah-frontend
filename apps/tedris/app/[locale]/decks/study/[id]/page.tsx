import FlashCardList from '~/features/flashcards/components/flashcard-list'

import { env } from '~/env'
import {
  createServerTedrisatAPIs,
  type FlashcardDeckResponse,
  type FlashcardResponse,
} from '@madrasah/services/tedrisat'
import { auth } from '~/lib/auth_options'
import { notFound } from 'next/navigation'

async function getDeck(deckId: string): Promise<FlashcardDeckResponse | null> {
  try {
    const session = await auth()
    const token = session?.accessToken

    const { decks } = await createServerTedrisatAPIs(token, env.TEDRISAT_API_BASE_URL)

    const deck = await decks.getFlashcardDeckById({ id: deckId })
    return deck || null
  }
  catch (error) {
    console.error('Error fetching deck:', error)
    return null
  }
}

async function getDeckCards(deckId: string): Promise<FlashcardResponse[]> {
  try {
    const session = await auth()
    const token = session?.accessToken

    const API = await createServerTedrisatAPIs(token, env.TEDRISAT_API_BASE_URL)

    const cards = await API.cards.getFlashcardByDeckId({ deckId })

    return cards || []
  }
  catch (error) {
    console.error('Error fetching deck cards:', error)
    return []
  }
}

export default async function StudyPage({ params }: {
  params: Promise<{
    id: string
  }>
}) {
  const { id } = await params

  const [deck, cards] = await Promise.all([
    getDeck(id),
    getDeckCards(id),
  ])

  if (!deck) {
    notFound()
  }

  return (
    <div className="h-full">
      <FlashCardList cards={cards} />
    </div>
  )
}
