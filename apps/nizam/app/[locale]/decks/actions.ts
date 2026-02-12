'use server'

import { CreateFlashcardDeckDto } from '@madrasah/services/tedrisat'
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
