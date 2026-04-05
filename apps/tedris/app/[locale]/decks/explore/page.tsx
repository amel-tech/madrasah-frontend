import { ExploreDecksPage } from '~/features/flashcards/components/explore-decks-page'
import { getDecks, getMyDecks, parseDeckFilter } from '~/features/flashcards/actions'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  const { filter: filterParam } = await searchParams
  const filter = await parseDeckFilter(filterParam)

  const [decks, userDecks] = await Promise.all([
    getDecks(filter),
    getMyDecks('all'),
  ])

  const userDeckIds = new Set((userDecks ?? []).map(deck => deck.id))

  return (
    <ExploreDecksPage
      initialDecks={decks}
      userDeckIds={Array.from(userDeckIds)}
      filter={filter}
    />
  )
}
