'use client'

import { BookOpenIcon, CheckIcon, EyeIcon, RepeatIcon } from '@madrasah/icons'
import { MouseEvent, TouchEvent, useEffect, useRef, useState } from 'react'
import { Kbd } from '@madrasah/ui/components/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@madrasah/ui/components/tooltip'

import { toDisplay } from '../utils/flashCardUtils'

import { useFlashCards } from '../hooks/useFlashCards'
import FlashCardComponent from './flashcard'
import { FlashcardResponse } from '@madrasah/services/tedrisat'
import { Button } from '@madrasah/ui/components/button'

export default function FlashCardContent(card: FlashcardResponse) {
  const [flipped, setFlipped] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const data = toDisplay(card)
  const { isCardMemorized, toggleMemorized } = useFlashCards()
  const memorized = isCardMemorized(data.id)

  const frontfaceRef = useRef<HTMLDivElement>(null)
  const backfaceRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    // get the height of frontface and backface and set the height of container to the max height
    const frontHeight = frontfaceRef.current?.offsetHeight || 0
    const backHeight = backfaceRef.current?.offsetHeight || 0

    if (containerRef.current) {
      containerRef.current.style.height = flipped ? `${backHeight}px` : `${frontHeight}px`
    }
  }, [flipped, data])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Space') {
        e.preventDefault()
        handleCardFlip()
      }
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        toggleMemorized({ id: data.id, type: data.type })
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [data.id, flipped, toggleMemorized])

  return (
    <div className="relative" style={{ perspective: '1000px' }}>
      <div
        className={`w-full transition-transform duration-500 ease-in-out ${flipped ? 'rotate-y-180' : ''}`}
        style={{
          transformStyle: 'preserve-3d',
        }}
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
      >
        {/* Ön Yüz */}
        <div
          className="backface-hidden absolute w-full"
          ref={frontfaceRef}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <FlashCardComponent className="mx-auto">
            {/* TODO: is this needed? */}
            <Header title="Card" />
            <p className="whitespace-pre-wrap break-words text-lg text-gray-400 sm:text-xl">
              {data.contentFront}
            </p>
            <CardActions
              onFlip={handleCardFlip}
              memorized={memorized}
              onToggleMemorized={() => toggleMemorized({ id: data.id, type: data.type })}

            />
          </FlashCardComponent>
        </div>

        {/* Arka Yüz */}
        <div
          className="rotate-y-180 backface-hidden absolute w-full"
          ref={backfaceRef}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <FlashCardComponent className="mx-auto">
            <Header title="Card" />
            <p className="text-primary whitespace-pre-wrap break-words text-md font-semibold sm:text-lg">
              {data.contentBack}
            </p>
            <CardActions
              onFlip={handleCardFlip}
              memorized={memorized}
              onToggleMemorized={() =>
                toggleMemorized({ id: data.id, type: data.type })}
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
    <div className="mt-4 flex flex-row justify-center items-center gap-4">
      <Tooltip delayDuration={750}>
        <TooltipTrigger asChild>
          <Button
            onClick={onFlip}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full p-2 transition-colors"
          >
            <EyeIcon size={20} />
            Flip

          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center gap-2">
            Flip the card
            {' '}
            <Kbd>Space</Kbd>
          </div>
        </TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={750}>
        <TooltipTrigger asChild>
          <Button
            onClick={onToggleMemorized}
            className={`flex items-center gap-2 rounded-full px-3 py-2 transition-colors ${memorized
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {
              memorized ? <RepeatIcon size={16} /> : <CheckIcon size={16} />
            }
            <span className="text-sm font-medium">
              {memorized ? 'Repeat' : 'Mark as Memorized'}
            </span>
          </Button>

        </TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center gap-2">
            {memorized ? 'Mark as to review later' : 'Mark as memorized'}
            {' '}
            <Kbd>Enter</Kbd>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
