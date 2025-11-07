import Link from 'next/link'

import { Button } from '@madrasah/ui/components/button'

import DeckCard from '~/features/flashcards/components/deck/deck-card'

import { cookies } from 'next/headers'
import { env } from '~/env'
import {
  createServerTedrisatAPIs,
  type FlashcardDeckResponse,
  type FlashcardTagResponse,
} from '@madrasah/services/tedrisat'
import CreateDeckButtonDialog from '~/features/flashcards/components/deckform/create-deck-button-dialog'
import { getTranslations } from 'next-intl/server'

async function getDecks(): Promise<FlashcardDeckResponse[]> {
  try {
    const cookieStore = await cookies()
    const { decks } = await createServerTedrisatAPIs(cookieStore, env.TEDRISAT_API_BASE_URL)

    return decks.getAllFlashcardDecks({
      include: ['tags', 'flashcards'],
    })
  }
  catch (error) {
    console.error('Error fetching decks:', error)
    return []
  }
}

async function getTags(): Promise<FlashcardTagResponse[]> {
  try {
    // Extract tags from decks (since there's no dedicated tags endpoint)
    const cookieStore = await cookies()
    const { decks } = await createServerTedrisatAPIs(cookieStore, env.TEDRISAT_API_BASE_URL)

    const deckList = await decks.getAllFlashcardDecks({
      include: ['tags'],
    })

    // Extract unique tags
    const allTags = deckList
      .flatMap(deck => deck.tags || [])
      .filter((tag, index, self) =>
        index === self.findIndex(t => t.title === tag.title),
      )

    return allTags
  }
  catch (error) {
    console.error('Error fetching tags:', error)
    return []
  }
}

export default async function Page() {
  const [decks, tags] = await Promise.all([
    getDecks(),
    getTags(),
  ])

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
          <Link href={`/cards/decks/${deck.id}`} key={deck.id}>
            <DeckCard
              title={deck.title}
              cardCount={deck.flashcards.length}
            />
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">{t('CardsPage.exploreTitle')}</h1>
        <p className="text-sm">{t('CardsPage.seeAll')}</p>
      </div>
      <div className="mb-6">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-neutral-300 px-3 py-2 mr-4 text-sm rounded-xs inline-block"
          >
            {tag.title}
          </span>
        ))}
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
