'use server'

import { CreateFlashcardDeckDto, createServerTedrisatAPIs } from '@madrasah/services/tedrisat'
import { cookies } from 'next/headers'
import { env } from '~/env'

export const createFlashCardDeck = async (createFlashcardDeckDto: CreateFlashcardDeckDto) => {
  const cookieStore = await cookies()

  const { decks } = await createServerTedrisatAPIs(cookieStore, env.TEDRISAT_API_BASE_URL!)

  try {
    await decks.createFlashcardDeck({
      createFlashcardDeckDto,
    })

    return true
  }
  catch (error) {
    console.log('Error creating flashcard deck:', error)
    return false
  }
}
