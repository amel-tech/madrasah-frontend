'use client'

import {
  BookOpenIcon,
  CheckIcon,
  CircleNotchIcon,
  EyeIcon,
  RepeatIcon,
} from '@madrasah/icons'
import { MouseEvent, TouchEvent, useEffect, useRef, useState } from 'react'
import { Kbd } from '@madrasah/ui/components/kbd'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@madrasah/ui/components/tooltip'
import { useTranslations } from 'next-intl'

import { toDisplay } from '../utils/flashCardUtils'

import FlashCardComponent from './flashcard'
import { FlashcardResponse } from '@madrasah/services/tedrisat'
import { Button } from '@madrasah/ui/components/button'

type FlashCardContentProps = {
  card: FlashcardResponse
  memorized: boolean
  isPending: boolean
  onToggleMemorized: () => void
}

export default function FlashCardContent({
  card,
  memorized,
  isPending,
  onToggleMemorized,
}: FlashCardContentProps) {
  const t = useTranslations('tedris')
  const [flipped, setFlipped] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const data = toDisplay(card)

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
      containerRef.current.style.height = flipped
        ? `${backHeight}px`
        : `${frontHeight}px`
    }
  }, [flipped, data])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Space') {
        e.preventDefault()
        handleCardFlip()
      }
      if (e.key === 'Enter' && !isPending) {
        e.preventDefault()
        onToggleMemorized()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isPending, onToggleMemorized])

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
          <FlashCardComponent className="mx-auto overflow-hidden px-4 pt-4 pb-0 sm:px-6 sm:pt-6 sm:pb-0">
            <Header title={t('FlashCardContent.card')} />
            <p className="font-scheherazade whitespace-pre-wrap break-words text-xl text-gray-500">
              {data.contentFront}
            </p>

            <CardActions
              onFlip={handleCardFlip}
              memorized={memorized}
              isPending={isPending}
              onToggleMemorized={onToggleMemorized}
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
          <FlashCardComponent className="mx-auto overflow-hidden px-4 pt-4 pb-0 sm:px-6 sm:pt-6 sm:pb-0">
            <Header title={t('FlashCardContent.card')} />
            <p className="text-[var(--text-color-brand-primary)] whitespace-pre-wrap break-words text-md font-semibold sm:text-lg">
              {data.contentBack}
            </p>
            <CardActions
              onFlip={handleCardFlip}
              memorized={memorized}
              isPending={isPending}
              onToggleMemorized={onToggleMemorized}
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
  isPending: boolean
  onToggleMemorized: () => void
}

function CardActions({
  onFlip,
  memorized,
  isPending,
  onToggleMemorized,
}: CardActionsProps) {
  const t = useTranslations('tedris')
  return (
    <div className="mt-6 -mx-4 grid w-auto grid-cols-2 overflow-hidden border-t sm:-mx-6">
      <Tooltip delayDuration={750}>
        <TooltipTrigger asChild>
          <Button
            onClick={onFlip}
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 w-full rounded-none px-4 transition-colors"
          >
            <EyeIcon size={20} />
            {t('FlashCardContent.flip')}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center gap-2">
            {t('FlashCardContent.flipTooltip')}
            {' '}
            <Kbd>Space</Kbd>
          </div>
        </TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={750}>
        <TooltipTrigger asChild>
          <Button
            onClick={onToggleMemorized}
            disabled={isPending}
            className={`h-12 w-full rounded-none px-4 transition-colors ${
              memorized
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isPending
              ? (
                  <CircleNotchIcon className="h-4 w-4 animate-spin" />
                )
              : memorized
                ? (
                    <RepeatIcon size={16} />
                  )
                : (
                    <CheckIcon size={16} />
                  )}
            <span className="text-sm font-medium">
              {isPending
                ? t('FlashCardContent.updating')
                : memorized
                  ? t('FlashCardContent.repeat')
                  : t('FlashCardContent.markAsMemorized')}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center gap-2">
            {memorized
              ? t('FlashCardContent.markAsToReviewLater')
              : t('FlashCardContent.markAsMemorizedTooltip')}
            {' '}
            <Kbd>Enter</Kbd>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
