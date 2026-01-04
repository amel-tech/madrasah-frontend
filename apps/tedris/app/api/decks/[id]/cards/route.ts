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
    const API = await createServerTedrisatAPIs(session?.accessToken, env.TEDRISAT_API_BASE_URL)

    const result = await API.cards.getFlashcardByDeckId({ deckId: id })
    return NextResponse.json(result || [])
  }
  catch (error) {
    console.error('Error fetching cards:', error)
    return NextResponse.json([], { status: 500 })
  }
}
