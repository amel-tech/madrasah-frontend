import { PlusIcon } from '@madrasah/icons'
import { Button } from '@madrasah/ui/components/button'
import Link from 'next/link'
import DeckCard from '~/features/flashcards/components/deck/deckcard'

const mockDecks = [
  {
    id: '1',
    title: 'Arabic Advanced Deck',
    author: 'Imam Yousef',
    cardCount: 730,
    rating: 4.8,
    downloadCount: 317,
    description:
      'Master advanced Arabic with this essential deck. Features high-frequency words, complex grammar and..',
  },
  {
    id: '2',
    title: 'Arabic Advanced Deck',
    author: 'Imam Yousef',
    cardCount: 730,
    rating: 4.8,
    downloadCount: 317,
    description:
      'Master advanced Arabic with this essential deck. Features high-frequency words, complex grammar and..',
  },
  {
    id: '3',
    title: 'Arabic Advanced Deck',
    author: 'Imam Yousef',
    cardCount: 730,
    rating: 4.8,
    downloadCount: 317,
    description:
      'Master advanced Arabic with this essential deck. Features high-frequency words, complex grammar and..',
  },
  {
    id: '4',
    title: 'Arabic Advanced Deck',
    author: 'Imam Yousef',
    cardCount: 730,
    rating: 4.8,
    downloadCount: 317,
    description:
      'Master advanced Arabic with this essential deck. Features high-frequency words, complex grammar and..',
  },
]

const mockExplore = [
  {
    id: '1',
    title: 'Arabic Advanced Deck',
    author: 'Imam Yousef',
    cardCount: 730,
    rating: 4.8,
    downloadCount: 317,
    description:
      'Master advanced Arabic with this essential deck. Features high-frequency words, complex grammar and..',
  },
  {
    id: '2',
    title: 'Arabic Advanced Deck',
    author: 'Imam Yousef',
    cardCount: 730,
    rating: 4.8,
    downloadCount: 317,
    description:
      'Master advanced Arabic with this essential deck. Features high-frequency words, complex grammar and..',
  },
  {
    id: '3',
    title: 'Arabic Advanced Deck',
    author: 'Imam Yousef',
    cardCount: 730,
    rating: 4.8,
    downloadCount: 317,
    description:
      'Master advanced Arabic with this essential deck. Features high-frequency words, complex grammar and..',
  },
  {
    id: '4',
    title: 'Arabic Advanced Deck',
    author: 'Imam Yousef',
    cardCount: 730,
    rating: 4.8,
    downloadCount: 317,
    description:
      'Master advanced Arabic with this essential deck. Features high-frequency words, complex grammar and..',
  },
  {
    id: '5',
    title: 'Arabic Advanced Deck',
    author: 'Imam Yousef',
    cardCount: 730,
    rating: 4.8,
    downloadCount: 317,
    description:
      'Master advanced Arabic with this essential deck. Features high-frequency words, complex grammar and..',
  },
  {
    id: '6',
    title: 'Arabic Advanced Deck',
    author: 'Imam Yousef',
    cardCount: 730,
    rating: 4.8,
    downloadCount: 317,
    description:
      'Master advanced Arabic with this essential deck. Features high-frequency words, complex grammar and..',
  },
  {
    id: '7',
    title: 'Arabic Advanced Deck',
    author: 'Imam Yousef',
    cardCount: 730,
    rating: 4.8,
    downloadCount: 317,
    description:
      'Master advanced Arabic with this essential deck. Features high-frequency words, complex grammar and..',
  },
  {
    id: '8',
    title: 'Arabic Advanced Deck',
    author: 'Imam Yousef',
    cardCount: 730,
    rating: 4.8,
    downloadCount: 317,
    description:
      'Master advanced Arabic with this essential deck. Features high-frequency words, complex grammar and..',
  },
]

const mockTags = [
  { id: '1', title: 'hadith' },
  { id: '2', title: 'aqidah' },
  { id: '3', title: 'fiqh' },
  { id: '4', title: 'tafseer' },
  { id: '5', title: 'seerah' },
  { id: '6', title: 'quran' },
  { id: '7', title: 'usul al-fiqh' },
  { id: '8', title: 'tasawwuf' },
  { id: '9', title: 'arabic' },
  { id: '10', title: 'history' },
  { id: '11', title: 'advanced' },
  { id: '12', title: 'beginner' },
  { id: '13', title: 'intermediate' },
]

export default function Page() {
  return (
    <div className="min-h-svh">
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
        {mockDecks.map(deck => (
          <Link href={`/cards/decks/${deck.id}`} key={deck.id}>
            <DeckCard
              title={deck.title}
              author={deck.author}
              cardCount={deck.cardCount}
              rating={deck.rating}
              downloadCount={deck.downloadCount}
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
        {mockTags.map(tag => (
          <span
            key={tag.id}
            className="bg-neutral-300 px-3 py-2 mr-4 text-sm rounded-xs inline-block"
          >
            {tag.title}
          </span>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {mockExplore.map(deck => (
          <DeckCard
            key={deck.id}
            title={deck.title}
            author={deck.author}
            cardCount={deck.cardCount}
            rating={deck.rating}
            downloadCount={deck.downloadCount}
            description={deck.description}
          />
        ))}
      </div>
    </div>
  )
}
