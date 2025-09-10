'use client'

import { BookBookmarkIcon, BookOpenIcon } from '@madrasah/icons'
import { MouseEvent, TouchEvent, useState } from 'react'

import { toDisplay } from '../utils/flashCardUtils'
import { Card } from '@madrasah/services/tedrisat'

import { useFlashCards } from '../hooks/useFlashCards'
import FlashCardComponent from './flashcard'

export default function FlashCardContent(card: Card) {
  const [flipped, setFlipped] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const data = toDisplay(card)
  const { isCardMemorized } = useFlashCards()
  const memorized = isCardMemorized(data.id)

  const handleTouchStart = (e: TouchEvent | MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX
    setTouchStart(clientX ?? null)
  }

  const handleTouchEnd = (e: TouchEvent | MouseEvent) => {
    if (touchStart === null) return

    const touchEnd
      = 'changedTouches' in e ? e.changedTouches[0]?.clientX : e.clientX
    if (touchEnd === undefined) return

    const diff = touchStart - touchEnd

    if (Math.abs(diff) > 50) setFlipped(prev => !prev)
    setTouchStart(null)
  }

  const handleCardFlip = () => setFlipped(prev => !prev)

  return (
    <div className="relative h-[500px] w-full">
      <div
        className={`absolute w-full transition-transform duration-500 ease-in-out ${flipped ? 'rotate-y-180' : ''}`}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
      >
        {/* Ön Yüz */}
        <div
          className="backface-hidden absolute w-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <FlashCardComponent className="mx-auto">
            {/* TODO: is this needed? */}
            <Header title="Card" />
            <p className="whitespace-pre-wrap break-words text-lg text-gray-400 sm:text-xl">
              {data.content.front}
            </p>
            <CardActions
              onFlip={handleCardFlip}
              memorized={memorized}
              onToggleMemorized={() =>
                console.log('memorized')
                // toggleMemorized({ id: data.id, type: data.type })}
              }
            />
          </FlashCardComponent>
        </div>

        {/* Arka Yüz */}
        <div
          className="rotate-y-180 backface-hidden absolute w-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <FlashCardComponent>
            <Header title="Card" />
            <p className="text-primary whitespace-pre-wrap break-words text-lg font-semibold sm:text-xl">
              {data.content.back}
            </p>
            <CardActions
              onFlip={handleCardFlip}
              memorized={memorized}
              onToggleMemorized={() =>
                console.log('memorized')
                // toggleMemorized({ id: data.id, type: data.type })
              }
            />
          </FlashCardComponent>
        </div>
      </div>
    </div>
  )
}

function Header({ title = '' }: { title?: string }) {
  return (
    <div className="text-primary mb-4 flex items-center justify-center gap-2">
      <BookOpenIcon size={20} />
      <h3 className="text-base font-semibold sm:text-lg">{title ?? ''}</h3>
    </div>
  )
}

type CardActionsProps = {
  onFlip: () => void
  memorized: boolean
  onToggleMemorized: () => void
}

function CardActions({
  onFlip,
  memorized,
  onToggleMemorized,
}: CardActionsProps) {
  return (
    <div className="mt-4 flex flex-col items-center gap-4">
      <button
        onClick={onFlip}
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full p-2 transition-colors"
      >
        <BookOpenIcon size={20} />
      </button>
      <button
        onClick={onToggleMemorized}
        className={`flex items-center gap-2 rounded-full px-3 py-2 transition-colors ${
          memorized
            ? 'bg-green-500 text-white hover:bg-green-600'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <BookBookmarkIcon size={16} />
        <span className="text-sm font-medium">
          {memorized ? 'Tekrarla' : 'Ezberledim'}
        </span>
      </button>
    </div>
  )
}
