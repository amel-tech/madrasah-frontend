import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

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

async function getMyDecks(): Promise<FlashcardDeckResponse[]> {
  try {
    const session = await auth()
    const token = session?.accessToken

    const API = await createServerTedrisatAPIs(token, env.TEDRISAT_API_BASE_URL)

    return API.decks.getAllFlashcardDecksByUser()
  }
  catch (error) {
    console.error('Error fetching my decks:', error)
  }
}

export default async function Page() {
  const t = await getTranslations('tedris')
  const [decks, myDecks] = await Promise.all([
    getDecks(),
    getMyDecks(),
  ])

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
