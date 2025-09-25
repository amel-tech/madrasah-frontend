import FlashCardList from '~/features/flashcards/components/flashcard-list'
import { Card } from '@madrasah/services/tedrisat'
import { getTedrisatMock } from '~/lib/mock-data'

export default async function Page({ params }: {
  params: Promise<{
    id: string
  }>
}) {
  const { id } = await params
  const tedrisatMock = await getTedrisatMock()
  const { cards = [] } = tedrisatMock

  console.log('Deck ID:', id) // Debugging line to check the id value
  console.log('Cards:', cards) // Debugging line to check the cards array

  const filteredCards = cards.filter(card => card.deck_id === Number(id)) as Card[]

  return (
    <div className="flex items-center justify-center h-full">
      <FlashCardList cards={filteredCards} />
    </div>
  )
}
