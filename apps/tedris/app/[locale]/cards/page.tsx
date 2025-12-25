import Link from 'next/link'

import { Button } from '@madrasah/ui/components/button'

import DeckCard from '~/features/flashcards/components/deck/deck-card'

import { env } from '~/env'
import {
  createServerTedrisatAPIs,
  type FlashcardDeckResponse,
} from '@madrasah/services/tedrisat'
import CreateDeckButtonDialog from '~/features/flashcards/components/deckform/create-deck-button-dialog'
import { auth } from '~/lib/auth_options'

async function getDecks(): Promise<FlashcardDeckResponse[]> {
  try {
    const session = await auth()
    const token = session?.accessToken

    const { decks } = await createServerTedrisatAPIs(token, env.TEDRISAT_API_BASE_URL)

    return decks.getAllFlashcardDecks()
  }
  catch (error) {
    console.error('Error fetching decks:', error)
    return []
  }
}

async function getTags(): Promise<[]> {
  return []
}

export default async function Page() {
  const [decks] = await Promise.all([
    getDecks(),
    getTags(),
  ])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Button variant="default" size="sm" className="mr-2">
            all
          </Button>
          <Button variant="secondary" size="sm" className="mr-2">
            public
          </Button>
          <Button variant="secondary" size="sm" className="mr-2">
            private
          </Button>
        </div>
        <CreateDeckButtonDialog />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {decks?.map(deck => (
          <Link href={`/cards/decks/${deck.id}`} key={deck.id}>
            <DeckCard
              title={deck.title}
              cardCount={0}
            />
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">explore</h1>
        <p className="text-sm">see all</p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {decks?.map(deck => (
          <Link href={`/cards/decks/${deck.id}`} key={deck.id}>
            <DeckCard
              key={deck.id}
              title={deck.title}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
