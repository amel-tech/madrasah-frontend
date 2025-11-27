import DeckCards from './components/cards'

import { createServerTedrisatAPIs } from '@madrasah/services/tedrisat'
import { env } from '~/env'
import { auth } from '~/lib/auth_options'

export default async function DeckCardsPage({
  params,
}: {
  params: Promise<{
    id: string
  }>
}) {
  const { id } = await params

  const session = await auth()
  const token = session?.accessToken

  const { decks } = await createServerTedrisatAPIs(token, env.TEDRISAT_API_BASE_URL)

  const result = await decks.getFlashcardDeckWithCards({ id: Number(id) })

  return <DeckCards deck={result} />
}
