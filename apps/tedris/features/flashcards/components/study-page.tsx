import FlashCardList from '~/features/flashcards/components/flashcard-list'
import type { FlashcardResponse } from '@madrasah/services/tedrisat'

export function StudyPage({ cards }: { cards: FlashcardResponse[] }) {
  return (
    <div className="h-full">
      <FlashCardList cards={cards} />
    </div>
  )
}
