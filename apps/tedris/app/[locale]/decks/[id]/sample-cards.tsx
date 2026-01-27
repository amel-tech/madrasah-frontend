'use client'

import { Card } from '@madrasah/ui/components/card'
import { toDisplay } from '~/features/flashcards/utils/flashCardUtils'
import type { FlashcardResponse } from '@madrasah/services/tedrisat'
import { useTranslations } from 'next-intl'

interface SampleCardsProps {
  cards: FlashcardResponse[]
}

export default function SampleCards({ cards }: SampleCardsProps) {
  const t = useTranslations('tedris')
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
              <p className="text-sm text-muted-foreground mb-2">{t('SampleCards.question')}</p>
              <p className="text-base font-medium line-clamp-3">
                {data.contentFront || t('SampleCards.noContent')}
              </p>
            </div>

            {/* Back side content */}
            <div className="pt-3 border-t">
              <p className="text-sm text-muted-foreground mb-2">{t('SampleCards.answer')}</p>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {data.contentBack || t('SampleCards.noAnswer')}
              </p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
