'use client'

import { CaretLeftIcon, CaretRightIcon } from '@madrasah/icons'
import { useState } from 'react'

import FlashCardContent from './flashcard-content'
import { FlashcardResponse } from '@madrasah/services/tedrisat'

type FlashCardListProps = {
  cards: FlashcardResponse[]
}

export default function FlashCardList({ cards }: FlashCardListProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [key, setKey] = useState(0)

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : cards.length - 1))
    setKey(prev => prev + 1)
  }

  const handleNext = () => {
    setCurrentIndex(prev => (prev < cards.length - 1 ? prev + 1 : 0))
    setKey(prev => prev + 1)
  }

  if (!cards.length) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <p className="text-gray-500">Henüz kart bulunmuyor.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center">
      {cards[currentIndex] && (
        <FlashCardContent key={key} {...cards[currentIndex]} />
      )}
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handlePrevious}
          className="rounded-full p-2 transition-colors hover:bg-gray-100"
        >
          <CaretLeftIcon size={24} />
        </button>
        <span className="text-sm text-gray-500">
          {currentIndex + 1}
          {' '}
          /
          {cards.length}
        </span>
        <button
          onClick={handleNext}
          className="rounded-full p-2 transition-colors hover:bg-gray-100"
        >
          <CaretRightIcon size={24} />
        </button>
      </div>
    </div>
  )
}
