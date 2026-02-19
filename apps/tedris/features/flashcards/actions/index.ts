'use server'

import { revalidatePath } from 'next/cache'
import { CreateFlashcardDeckDto, CreateFlashcardDtoTypeEnum } from '@madrasah/services/tedrisat'
import { authenticatedAction } from '~/lib/authenticated-action'

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
