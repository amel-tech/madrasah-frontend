'use server'

import { CreateFlashcardDeckDto, CreateFlashcardDtoTypeEnum } from '@madrasah/services/tedrisat'
import { revalidatePath } from 'next/cache'
import { authenticatedAction } from '~/lib/authenticated-action'

export const createFlashcardDeck = async (deckData: CreateFlashcardDeckDto) => {
  return authenticatedAction(async ({ decks }) => {
    const response = await decks.createFlashcardDeck({
      createFlashcardDeckDto: deckData,
    })
    revalidatePath(`/decks`)
    return { success: true, data: response }
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
    return { success: true, data: response }
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
    await cards.deleteFlashcard({ id: cardId })
    revalidatePath(`/decks/${deckId}/cards`)
    return true
  })
}
