import Link from 'next/link'

import { Button } from '@madrasah/ui/components/button'

import DeckCard from '~/features/flashcards/components/deck/deck-card'

import { env } from '~/env'
import {
  createServerTedrisatAPIs,
  type FlashcardDeckResponse,
} from '@madrasah/services/tedrisat'
import CreateDeckButtonDialog from '~/features/flashcards/components/deckform/create-deck-button-dialog'
import { getTranslations } from 'next-intl/server'
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

export default async function Page() {
  const decks = await getDecks()

  const t = await getTranslations('tedris')

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Button variant="default" size="sm" className="mr-2">
            {t('CardsPage.filterAll')}
          </Button>
          <Button variant="secondary" size="sm" className="mr-2">
            {t('CardsPage.filterPublic')}
          </Button>
          <Button variant="secondary" size="sm" className="mr-2">
            {t('CardsPage.filterPrivate')}
          </Button>
        </div>
        <CreateDeckButtonDialog />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {decks?.map(deck => (
          <Link href={`/decks/${deck.id}`} key={deck.id}>
            <DeckCard
              deckId={deck.id}
              title={deck.title}
              cardCount={0}
            />
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">{t('CardsPage.exploreTitle')}</h1>
        <p className="text-sm">{t('CardsPage.seeAll')}</p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {decks?.map(deck => (
          <Link href={`/decks/${deck.id}`} key={deck.id}>
            <DeckCard
              deckId={deck.id}
              title={deck.title}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
