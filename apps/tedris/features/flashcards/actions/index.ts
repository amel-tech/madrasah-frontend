'use server'

import { revalidatePath } from 'next/cache'
import { CreateFlashcardDeckDto, createServerTedrisatAPIs, CreateFlashcardDtoTypeEnum, ResponseError } from '@madrasah/services/tedrisat'
import { getErrorMessage } from '@madrasah/services/utils'
import { env } from '~/env'
import { auth } from '~/lib/auth_options'

export const createFlashCardDeck = async (createFlashcardDeckDto: CreateFlashcardDeckDto) => {
  const session = await auth()
  const { decks } = await createServerTedrisatAPIs(session?.accessToken, env.TEDRISAT_API_BASE_URL)
  try {
    const response = await decks.createFlashcardDeckRaw({
      createFlashcardDeckDto,
    })

    return response.value()
  }
  catch (error) {
    if (error instanceof ResponseError) {
      const errorBody = await error.response.json()
      const message = getErrorMessage(errorBody)
      throw new Error(message)
    }
    throw error
  }
}

export const updateFlashcard = async (cardId: string, updatedCard: {
  contentFront?: string
  contentBack?: string
}) => {
  const session = await auth()
  const { cards } = await createServerTedrisatAPIs(session?.accessToken, env.TEDRISAT_API_BASE_URL)

  try {
    const response = await cards.updateFlashcardRaw({
      id: cardId,
      updateFlashcardDto: {
        contentBack: updatedCard.contentBack,
        contentFront: updatedCard.contentFront,
      },
    })

    return response.value()
  }
  catch (error) {
    if (error instanceof ResponseError) {
      const errorBody = await error.response.json()
      const message = getErrorMessage(errorBody)
      throw new Error(message)
    }
    throw error
  }
}

export const createFlashcards = async (deckId: string, newCards: {
  contentFront: string
  contentBack: string
}[]) => {
  const session = await auth()
  const { cards } = await createServerTedrisatAPIs(session?.accessToken, env.TEDRISAT_API_BASE_URL)

  try {
    const response = await cards.createFlashcards({
      deckId,
      createFlashcardDto: newCards.map(card => ({
        type: CreateFlashcardDtoTypeEnum.Hadeeth,
        contentFront: card.contentFront,
        contentBack: card.contentBack,
      })),
    })
    // Revalidate the cards page to refresh server-side data
    revalidatePath(`/decks/${deckId}/cards`)
    return response
  }
  catch (error) {
    if (error instanceof ResponseError) {
      const errorBody = await error.response.json()
      const message = getErrorMessage(errorBody)
      throw new Error(message)
    }
    throw error
  }
}

export const deleteFlashcard = async (cardId: string, deckId?: string) => {
  const session = await auth()
  const { cards } = await createServerTedrisatAPIs(session?.accessToken, env.TEDRISAT_API_BASE_URL)

  try {
    const response = await cards.deleteFlashcardRaw({ id: cardId })
    // Revalidate the cards page to refresh server-side data
    revalidatePath(`/decks/${deckId}/cards`)
    return response.value()
  }
  catch (error) {
    if (error instanceof ResponseError) {
      const errorBody = await error.response.json()
      const message = getErrorMessage(errorBody)
      throw new Error(message)
    }
    throw error
  }
}
