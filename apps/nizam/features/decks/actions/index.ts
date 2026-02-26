'use server'

import { CreateFlashcardDeckDto, BulkFlashcardErrorResponseFromJSON, ResponseError, createServerTedrisatAPIs } from '@madrasah/services/tedrisat'
import type { BulkFlashcardErrorResponse, BulkFlashcardResponse } from '@madrasah/services/tedrisat'
import { revalidatePath } from 'next/cache'
import { authenticatedAction } from '~/lib/authenticated-action'
import { auth } from '~/lib/auth_options'
import { env } from '~/env'

export const createFlashcardDeck = async (deckData: CreateFlashcardDeckDto) => {
  return authenticatedAction(async ({ decks }) => {
    const response = await decks.createFlashcardDeck({
      createFlashcardDeckDto: deckData,
    })
    revalidatePath(`/decks`)
    return response
  })
}

export const updateFlashcardDeck = async (deckId: string, updatedDeck: {
  title?: string
  description?: string
}) => {
  return authenticatedAction(async ({ decks }) => {
    await decks.updateFlashcardDeck({
      id: deckId,
      updateFlashcardDeckDto: {
        title: updatedDeck.title,
        description: updatedDeck.description,
      },
    })
    revalidatePath(`/decks`)
    return true
  })
}

export const deleteFlashcardDeck = async (deckId: string) => {
  return authenticatedAction(async ({ decks }) => {
    const response = await decks.deleteFlashcardDeck({
      id: deckId,
    })
    revalidatePath(`/decks`)
    return response
  })
}

export const updateFlashcard = async (cardId: string, updatedCard: {
  contentFront?: string
  contentBack?: string
}) => {
  return authenticatedAction(({ cards }) => {
    return cards.updateFlashcard({
      id: cardId,
      updateFlashcardDto: {
        contentBack: updatedCard.contentBack,
        contentFront: updatedCard.contentFront,
      },
    })
  })
}

export const uploadFile = async (deckId: string, blob: Blob): Promise<
  | { success: true, data: BulkFlashcardResponse }
  | { success: false, error: string }
  | { success: false, error: string, errorData: BulkFlashcardErrorResponse }
> => {
  const session = await auth()
  if (!session?.accessToken) return { success: false, error: 'Unauthorized: No access token found' }

  const api = await createServerTedrisatAPIs(session.accessToken, env.TEDRISAT_API_BASE_URL)

  try {
    const response = await api.cards.importsCardRaw({ deckId, file: blob })
    const data = await response.value()
    return { success: true, data }
  }
  catch (error) {
    if (error instanceof ResponseError) {
      try {
        const errorData = BulkFlashcardErrorResponseFromJSON(await error.response.json())
        return { success: false, error: errorData.errorMessage, errorData }
      }
      catch {
        return { success: false, error: error.response.statusText || 'Request failed' }
      }
    }
    return { success: false, error: error instanceof Error ? error.message : 'An unexpected error occurred.' }
  }
}

export const deleteFlashcard = async (cardId: string, deckId?: string) => {
  return authenticatedAction(async ({ cards }) => {
    await cards.deleteFlashcard({ id: cardId })
    revalidatePath(`/decks/${deckId}/cards`)
    return true
  })
}

export const getSampleFile = async (format: 'csv' | 'xlsx') => {
  return authenticatedAction(async ({ cards }) => {
    const result = await cards.getSampleFileRaw({ format })
    const buffer = await result.raw.arrayBuffer()
    return Buffer.from(buffer).toString('base64')
  })
}

export const exportCards = async (deckId: string, format: 'csv' | 'xlsx') => {
  return authenticatedAction(async ({ cards }) => {
    const result = await cards.exportCardsRaw({ deckId, format })
    const buffer = await result.raw.arrayBuffer()
    return Buffer.from(buffer).toString('base64')
  })
}
