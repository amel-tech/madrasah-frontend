import Link from 'next/link'

import { PlusIcon } from '@madrasah/icons/ssr'
import { Button } from '@madrasah/ui/components/button'

import DeckCard from '~/features/flashcards/components/deck/deck-card'
import { getTedrisatMock } from '~/lib/mock-data'

export default async function Page() {
  const tedrisatMock = await getTedrisatMock()
  const { decks = [], tags = [] } = tedrisatMock

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
        <div>
          <Link href="/cards/decks/create">
            <Button variant="default" size="sm" className="text-white">
              <PlusIcon weight="bold" />
              create new deck
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {decks?.map(deck => (
          <Link href={`/cards/decks/${deck.id}`} key={deck.id}>
            <DeckCard
              title={deck.title}
              author={deck.author}
              cardCount={deck.stats.cards_count}
              rating={deck.stats.rating}
              downloadCount={deck.stats.downloads_count}
              description={deck.description}
            />
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">explore</h1>
        <p className="text-sm">see all</p>
      </div>
      <div className="mb-6">
        {tags.map(tag => (
          <span
            key={tag.id}
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
              author={deck.author}
              cardCount={deck.stats.cards_count}
              rating={deck.stats.rating}
              downloadCount={deck.stats.downloads_count}
              description={deck.description}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
