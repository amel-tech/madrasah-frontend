import DeckDetailClient from './deck-detail-client'

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

async function isDeckInCollection(deckId: string): Promise<boolean> {
  try {
    const session = await auth()
    const token = session?.accessToken

    if (!token) return false

    const API = await createServerTedrisatAPIs(token, env.TEDRISAT_API_BASE_URL)

    const userDecks = await API.decks.getAllFlashcardDecksByUser()
    return userDecks.some(deck => deck.id === deckId)
  }
  catch (error) {
    console.error('Error checking if deck is in collection:', error)
    return false
  }
}

export default async function DeckDetailPage({ params }: {
  params: Promise<{
    id: string
  }>
}) {
  const { id } = await params

  const [deck, cards, isInCollection] = await Promise.all([
    getDeck(id),
    getDeckCards(id),
    isDeckInCollection(id),
  ])

  if (!deck) {
    notFound()
  }

  return (
    <DeckDetailClient deck={deck} cards={cards} isInCollection={isInCollection} />
  )
}
