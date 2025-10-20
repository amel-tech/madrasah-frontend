'use server'

import { cookies } from 'next/headers'
import { CreateFlashcardDtoTypeEnum, createServerTedrisatAPIs } from '@madrasah/services/tedrisat'
import { env } from '~/env'

export const updateFlashcard = async (cardId: number, updatedCard: {
  contentFront?: string
  contentBack?: string
}) => {
  const cookieStore = await cookies()
  const { cards } = await createServerTedrisatAPIs(cookieStore, env.TEDRISAT_API_BASE_URL)

  try {
    await cards.updateFlashcard({
      id: cardId,
      updateFlashcardDto: {
        contentBack: updatedCard.contentBack,
        contentFront: updatedCard.contentFront,
      },
    })
    return true
  }
  catch (error) {
    console.log('Error updating flashcard:', error)
    return false
  }
}

export const createFlashcards = async (deckId: number, newCards: {
  contentFront: string
  contentBack: string
}[]) => {
  const cookieStore = await cookies()
  const { cards } = await createServerTedrisatAPIs(cookieStore, env.TEDRISAT_API_BASE_URL)

  try {
    const response = await cards.createFlashcards({
      deckId,
      createFlashcardDto: newCards.map(card => ({
        type: CreateFlashcardDtoTypeEnum.Hadeeth,
        contentFront: card.contentFront,
        contentBack: card.contentBack,
      })),
    })
    return response
  }
  catch (error) {
    console.log('Error creating flashcards:', error)
    return false
  }
}

export const deleteFlashcard = async (cardId: number) => {
  const cookieStore = await cookies()
  const { cards } = await createServerTedrisatAPIs(cookieStore, env.TEDRISAT_API_BASE_URL)

  try {
    await cards.deleteFlashcard({ id: cardId })
    return true
  }
  catch (error) {
    console.log('Error deleting flashcard:', error)
    return false
  }
}
