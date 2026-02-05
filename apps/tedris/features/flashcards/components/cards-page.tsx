import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import { Button } from '@madrasah/ui/components/button'

import DeckCard from '~/features/flashcards/components/deck/deck-card'
import CreateDeckButtonDialog from '~/features/flashcards/components/deckform/create-deck-button-dialog'
import type { FlashcardDeckResponse } from '@madrasah/services/tedrisat'

export async function CardsPage({ decks }: { decks: FlashcardDeckResponse[] }) {
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
