'use client'

import { HadithCard as HadithCardType } from '../types'
import { useState, TouchEvent, MouseEvent } from 'react'
import { BookOpenIcon, BookBookmarkIcon } from '@madrasah/icons'
import FlashCard from './flashcard'
import { useFlashCards } from '../hooks/useFlashCards'

type HadithCardProps = HadithCardType

export default function HadithCard({
  id,
  fullText,
  partialText,
  type,
}: HadithCardProps) {
  const [flipped, setFlipped] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const { toggleMemorized, isCardMemorized } = useFlashCards()
  const memorized = isCardMemorized(id)

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
    <div className="relative w-full h-[500px]">
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
          className="absolute backface-hidden w-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <FlashCard>
            <Header />
            <p className="text-lg sm:text-xl whitespace-pre-wrap break-words text-gray-400">
              {partialText}
            </p>
            <CardActions
              onFlip={handleCardFlip}
              memorized={memorized}
              onToggleMemorized={() => toggleMemorized({ id, type })}
            />
          </FlashCard>
        </div>

        {/* Arka Yüz */}
        <div
          className="absolute rotate-y-180 backface-hidden w-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <FlashCard>
            <Header />
            <p className="text-lg sm:text-xl whitespace-pre-wrap break-words text-primary font-semibold">
              {fullText}
            </p>
            <CardActions
              onFlip={handleCardFlip}
              memorized={memorized}
              onToggleMemorized={() => toggleMemorized({ id, type })}
            />
          </FlashCard>
        </div>
      </div>
    </div>
  )
}

function Header() {
  return (
    <div className="flex items-center justify-center gap-2 text-primary mb-4">
      <BookOpenIcon size={20} />
      <h3 className="text-base sm:text-lg font-semibold">Hadis Kartı</h3>
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
        className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
      >
        <BookOpenIcon size={20} />
      </button>
      <button
        onClick={onToggleMemorized}
        className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors ${
          memorized
            ? 'bg-green-500 text-white hover:bg-green-600'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <BookBookmarkIcon size={16} />
        <span className="text-sm font-medium">
          {memorized ? 'Ezberlendi' : 'Ezberle'}
        </span>
      </button>
    </div>
  )
}
