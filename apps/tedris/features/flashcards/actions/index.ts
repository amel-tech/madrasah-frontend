'use server'

import { revalidatePath } from 'next/cache'
import {
  CreateFlashcardDeckDto,
  CreateFlashcardDtoTypeEnum,
  createServerTedrisatAPIs,
  type FlashcardDeckResponse,
} from '@madrasah/services/tedrisat'
import { authenticatedAction } from '~/lib/authenticated-action'
import { auth } from '~/lib/auth_options'
import { env } from '~/env'

export type DeckFilter = 'all' | 'public' | 'private'

export const parseDeckFilter = async (value: string | undefined): Promise<DeckFilter> => {
  if (value === 'public' || value === 'private') return value
  return 'all'
}

const deckFilterToIsPublic = (filter: DeckFilter): boolean | undefined => {
  if (filter === 'public') return true
  if (filter === 'private') return false
  return undefined
}

export const getDecks = async (filter: DeckFilter): Promise<FlashcardDeckResponse[]> => {
  const isPublic = deckFilterToIsPublic(filter)
  try {
    const session = await auth()
    const token = session?.accessToken
    const { decks } = await createServerTedrisatAPIs(token, env.TEDRISAT_API_BASE_URL)
    return decks.getAllFlashcardDecks(isPublic === undefined ? {} : { isPublic })
  }
  catch (error) {
    console.error('Error fetching decks:', error)
    return []
  }
}

export const getMyDecks = async (filter: DeckFilter): Promise<FlashcardDeckResponse[] | undefined> => {
  const isPublic = deckFilterToIsPublic(filter)
  try {
    const session = await auth()
    const token = session?.accessToken
    if (!token) return undefined
    const API = await createServerTedrisatAPIs(token, env.TEDRISAT_API_BASE_URL)
    const all = await API.decks.getAllFlashcardDecksByUser()
    if (isPublic === undefined) return all
    return all.filter(deck => deck.isPublic === isPublic)
  }
  catch (error) {
    console.error('Error fetching my decks:', error)
    return undefined
  }
}

export const createFlashCardDeck = async (createFlashcardDeckDto: CreateFlashcardDeckDto) => {
  return authenticatedAction(async ({ decks }) => {
    const response = await decks.createFlashcardDeckRaw({
      createFlashcardDeckDto,
    })
    return response.value()
  })
}

export const updateFlashcard = async (cardId: string, updatedCard: {
  contentFront?: string
  contentBack?: string
}) => {
  return authenticatedAction(async ({ cards }) => {
    const response = await cards.updateFlashcardRaw({
      id: cardId,
      updateFlashcardDto: {
        contentBack: updatedCard.contentBack,
        contentFront: updatedCard.contentFront,
      },
    })
    return response.value()
  })
}

export const createFlashcards = async (deckId: string, newCards: {
  contentFront: string
  contentBack: string
}[]) => {
  return authenticatedAction(async ({ cards }) => {
    const response = await cards.createFlashcards({
      deckId,
      createFlashcardDto: newCards.map(card => ({
        type: CreateFlashcardDtoTypeEnum.Hadeeth,
        contentFront: card.contentFront,
        contentBack: card.contentBack,
      })),
    })
    revalidatePath(`/decks/${deckId}/cards`)
    return response
  })
}

export const deleteFlashcard = async (cardId: string, deckId?: string) => {
  return authenticatedAction(async ({ cards }) => {
    await cards.deleteFlashcardRaw({ id: cardId })
    revalidatePath(`/decks/${deckId}/cards`)
    return true
  })
}

export const addDeckToCollection = async (deckId: string) => {
  return authenticatedAction(async ({ decks }) => {
    await decks.createFlashcardDeckUser({ id: deckId })
    revalidatePath(`/decks/${deckId}`)
    return true
  })
}

export const removeDeckFromCollection = async (deckId: string) => {
  return authenticatedAction(async ({ decks }) => {
    await decks.deleteFlashcardDeckUser({ id: deckId })
    revalidatePath(`/decks/${deckId}`)
    return true
  })
}
