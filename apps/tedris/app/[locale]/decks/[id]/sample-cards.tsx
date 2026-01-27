'use client'

import { Card } from '@madrasah/ui/components/card'
import { toDisplay } from '~/features/flashcards/utils/flashCardUtils'
import type { FlashcardResponse } from '@madrasah/services/tedrisat'

interface SampleCardsProps {
  cards: FlashcardResponse[]
}

export default function SampleCards({ cards }: SampleCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const data = toDisplay(card)

        return (
          <Card
            key={card.id || index}
            className="p-4 min-h-[200px] flex flex-col justify-center"
          >
            {/* Front side content */}
            <div className="mb-3">
              <p className="text-sm text-muted-foreground mb-2">Question</p>
              <p className="text-base font-medium line-clamp-3">
                {data.contentFront || 'No content'}
              </p>
            </div>

            {/* Back side content */}
            <div className="pt-3 border-t">
              <p className="text-sm text-muted-foreground mb-2">Answer</p>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {data.contentBack || 'No answer'}
              </p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
