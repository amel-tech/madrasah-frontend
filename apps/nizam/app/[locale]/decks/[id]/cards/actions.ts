'use server'

import { revalidatePath } from 'next/cache'
import { CreateFlashcardDtoTypeEnum } from '@madrasah/services/tedrisat'
import { authenticatedAction } from '~/lib/authenticated-action'

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
