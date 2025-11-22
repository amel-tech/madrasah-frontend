import { NextResponse } from 'next/server'
import { env } from '~/env'
import { createServerTedrisatAPIs } from '@madrasah/services/tedrisat'
import { auth } from '~/lib/auth_options'

export async function GET(
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params

    const session = await auth()
    const { decks } = await createServerTedrisatAPIs(session?.accessToken, env.TEDRISAT_API_BASE_URL)

    const result = await decks.getFlashcardDeckWithCards({ id: Number(id) })
    const card = result || null

    if (!card) {
      return NextResponse.json(
        { error: 'Card not found' },
        { status: 404 },
      )
    }

    return NextResponse.json(card)
  }
  catch (error) {
    console.error('Error fetching card:', error)
    return NextResponse.json(
      { error: 'Failed to fetch card' },
      { status: 500 },
    )
  }
}
