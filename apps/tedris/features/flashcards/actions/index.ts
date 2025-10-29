'use server'

import { revalidatePath } from 'next/cache'
import { CreateFlashcardDeckDto, createServerTedrisatAPIs, CreateFlashcardDtoTypeEnum } from '@madrasah/services/tedrisat'
import { cookies } from 'next/headers'
import { env } from '~/env'

export const createFlashCardDeck = async (createFlashcardDeckDto: CreateFlashcardDeckDto) => {
  const cookieStore = await cookies()

  const { decks } = await createServerTedrisatAPIs(cookieStore, env.TEDRISAT_API_BASE_URL!)

  try {
    return await decks.createFlashcardDeck({
      createFlashcardDeckDto,
    })
  }
  catch (error) {
    console.log('Error creating flashcard deck:', error)
    return null
  }
}

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
    revalidatePath(`/decks/${deckId}/cards`)
    return response
  }
  catch (error) {
    console.log('Error creating flashcards:', error)
    return false
  }
}

export const deleteFlashcard = async (cardId: number, deckId?: string) => {
  const cookieStore = await cookies()
  const { cards } = await createServerTedrisatAPIs(cookieStore, env.TEDRISAT_API_BASE_URL)

  try {
    await cards.deleteFlashcard({ id: cardId })

    // Revalidate the cards page to refresh server-side data
    revalidatePath(`/decks/${deckId}/cards`)
    return true
  }
  catch (error) {
    console.log('Error deleting flashcard:', error)
    return false
  }
}
