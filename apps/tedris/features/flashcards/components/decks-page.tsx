import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import { Button } from '@madrasah/ui/components/button'

import DeckCard from '~/features/flashcards/components/deck/deck-card'
import CreateDeckButtonDialog from '~/features/flashcards/components/deckform/create-deck-button-dialog'
import type { FlashcardDeckResponse } from '@madrasah/services/tedrisat'

export async function DecksPage({
  decks,
  myDecks,
}: {
  decks: FlashcardDeckResponse[]
  myDecks: FlashcardDeckResponse[] | undefined
}) {
  const t = await getTranslations('tedris')

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Button variant="default" size="sm" className="mr-2">
            {t('DecksPage.all')}
          </Button>
          <Button variant="secondary" size="sm" className="mr-2">
            {t('DecksPage.public')}
          </Button>
          <Button variant="secondary" size="sm" className="mr-2">
            {t('DecksPage.private')}
          </Button>
        </div>
        <CreateDeckButtonDialog />
      </div>
      {
        myDecks?.length
          ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {myDecks?.slice(0, 4).map(deck => (
                  <Link href={`/decks/${deck.id}`} key={deck.id}>
                    <DeckCard
                      deckId={deck.id}
                      title={deck.title}
                      cardCount={0}
                      isInCollection={true}
                    />
                  </Link>
                ))}
              </div>
            )
          : (
              <div className="flex items-center justify-center py-12 text-muted-foreground">
                <p>{t('DecksPage.noDecksInCollection')}</p>
              </div>
            )
      }
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">{t('DecksPage.explore')}</h1>
        <Link href="/decks/explore">
          <Button variant="secondary" size="sm">
            <p className="text-sm">{t('DecksPage.seeAll')}</p>
          </Button>
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {decks?.slice(0, 4).map((deck) => {
          const isInCollection = myDecks?.some(myDeck => myDeck.id === deck.id) ?? false
          return (
            <Link href={`/decks/${deck.id}`} key={deck.id}>
              <DeckCard
                deckId={deck.id}
                title={deck.title}
                isInCollection={isInCollection}
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
