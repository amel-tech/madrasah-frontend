'use server'

import { cookies } from 'next/headers'
import { createServerTedrisatAPIs, CreateFlashcardDeckDto } from '@madrasah/services/tedrisat'
import { env } from '~/env'
import { revalidatePath } from 'next/cache'

export const createFlashcardDeck = async (deckData: CreateFlashcardDeckDto) => {
  const cookieStore = await cookies()
  const { decks } = await createServerTedrisatAPIs(cookieStore, env.TEDRISAT_API_BASE_URL)

  try {
    const response = await decks.createFlashcardDeck({
      createFlashcardDeckDto: deckData,
    })

    revalidatePath(`/decks`)

    return { success: true, data: response }
  }
  catch (error) {
    console.error('Error creating flashcard deck:', error)
    return { success: false, error: 'Failed to create deck' }
  }
}

export const updateFlashcardDeck = async (deckId: number, updatedDeck: {
  title?: string
  description?: string
}) => {
  const cookieStore = await cookies()
  const { decks } = await createServerTedrisatAPIs(cookieStore, env.TEDRISAT_API_BASE_URL)

  try {
    await decks.updateFlashcardDeck({
      id: deckId,
      updateFlashcardDeckDto: {
        title: updatedDeck.title,
        description: updatedDeck.description,
      },
    })

    revalidatePath(`/decks`)

    return true
  }
  catch (error) {
    console.log('Error updating flashcard deck:', error)
    return false
  }
}

export const deleteFlashcardDeck = async (deckId: number) => {
  const cookieStore = await cookies()
  const { decks } = await createServerTedrisatAPIs(cookieStore, env.TEDRISAT_API_BASE_URL)

  try {
    const response = await decks.deleteFlashcardDeck({
      id: deckId,
    })

    revalidatePath(`/decks`)

    return { success: true, data: response }
  }
  catch (error) {
    console.error('Error deleting flashcard deck:', error)
    return { success: false, error: 'Failed to delete deck' }
  }
}
