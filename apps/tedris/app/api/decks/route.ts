import { NextResponse } from 'next/server'
import { env } from '~/env'
import { createServerTedrisatAPIs } from '@madrasah/services/tedrisat'
import { auth } from '~/lib/auth_options'

export async function GET() {
  try {
    // Check if mocking is enabled
    // Direct API usage - no wrapper layers
    const session = await auth()
    const { decks } = await createServerTedrisatAPIs(session?.accessToken, env.TEDRISAT_API_BASE_URL)

    const result = await decks.getAllFlashcardDecks({
      include: ['tags', 'flashcards'],
    })

    return NextResponse.json({ data: result, error: null })
  }
  catch (error) {
    console.error('Error fetching decks:', error)
    return NextResponse.json(
      { data: null, error: 'Failed to fetch decks' },
      { status: 500 },
    )
  }
}
