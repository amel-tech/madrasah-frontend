import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { env } from '~/env'
import { createServerTedrisatAPIs } from '@madrasah/services/tedrisat'

export async function GET(
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params

    const cookieStore = await cookies()
    const { decks } = await createServerTedrisatAPIs(cookieStore, env.TEDRISAT_API_BASE_URL)

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
