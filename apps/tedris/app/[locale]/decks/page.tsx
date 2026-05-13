import { DecksPage } from '~/features/flashcards/components/decks-page'
import { getDecks, getMyDecks, parseDeckFilter } from '~/features/flashcards/actions'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  const { filter: filterParam } = await searchParams
  const filter = await parseDeckFilter(filterParam)

  const [decks, myDecks] = await Promise.all([
    getDecks(filter),
    getMyDecks(filter),
  ])

  return <DecksPage decks={decks} myDecks={myDecks} filter={filter} />
}
