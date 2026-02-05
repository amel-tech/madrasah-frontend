'use client'

import { useState, useEffect } from 'react'
import {
  CardsIcon,
  StarIcon,
  StudentIcon,
  BookmarkSimpleIcon,
} from '@madrasah/icons'
import { Card } from '@madrasah/ui/components/card'
import { toastHelper } from '@madrasah/ui/lib/toast-helper'
import { addDeckToCollection, removeDeckFromCollection } from '~/features/flashcards/actions'
import { useTranslations } from 'next-intl'

type Props = {
  deckId: string
  title: string
  cardCount?: number
  downloadCount?: number
  description?: string
  author?: string
  rating?: number
  isInCollection?: boolean
}

function DeckCard({
  deckId,
  title,
  author,
  cardCount,
  rating,
  downloadCount,
  description,
  isInCollection: initialIsInCollection = false,
}: Props) {
  const t = useTranslations('tedris')
  const [isInCollection, setIsInCollection] = useState(initialIsInCollection)
  const [isProcessing, setIsProcessing] = useState(false)

  // Sync state when prop changes
  useEffect(() => {
    setIsInCollection(initialIsInCollection)
  }, [initialIsInCollection])

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsProcessing(true)
    try {
      const success = isInCollection
        ? await removeDeckFromCollection(deckId)
        : await addDeckToCollection(deckId)

      if (success) {
        setIsInCollection(!isInCollection)
        toastHelper.success({
          title: isInCollection ? t('DeckCard.removedFromCollection') : t('DeckCard.addedToCollection'),
          description: isInCollection
            ? t('DeckCard.removedFromCollectionDescription')
            : t('DeckCard.addedToCollectionDescription'),
        })
      }
      else {
        toastHelper.error({
          title: isInCollection ? t('DeckCard.failedToRemove') : t('DeckCard.failedToAdd'),
          description: isInCollection
            ? t('DeckCard.failedToRemoveDescription')
            : t('DeckCard.failedToAddDescription'),
        })
      }
    }
    catch (error) {
      console.error('Error toggling deck collection:', error)
      toastHelper.error({
        title: t('DeckCard.error'),
        description: t('DeckCard.errorDescription', {
          action: isInCollection ? 'removing' : 'adding',
          preposition: isInCollection ? 'from' : 'to',
        }),
      })
    }
    finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card className="p-6 gap-0 hover:bg-neutral-100 has-[.bookmark-icon:hover]:bg-white cursor-pointer transition-all duration-200 ease-in-out h-full">
      <div className="flex justify-between items-center ">
        <div className="font-medium">{title}</div>
        <button
          type="button"
          onClick={handleBookmarkClick}
          disabled={isProcessing}
          className="bookmark-icon cursor-pointer hover:bg-neutral-300 h-8 w-8 flex justify-center items-center rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <BookmarkSimpleIcon size={20} weight={isInCollection ? 'fill' : 'regular'} />
        </button>
      </div>
      <div className="text-sm mb-2">
        {t('DeckCard.by')}
        {' '}
        {author}
      </div>
      <div className="flex items-center mb-2 text-sm">
        <div className="text-neutral-tertiary flex items-center mr-4">
          <CardsIcon className="inline-block mr-1" size={14} />
          {cardCount || 0}
        </div>
        <div className="text-neutral-tertiary flex items-center mr-4">
          <StarIcon className="inline-block mr-1" size={14} />
          {rating || 0}
        </div>
        <div className="text-neutral-tertiary flex items-center mr-4">
          <StudentIcon className="inline-block mr-1" size={14} />
          {downloadCount || 0}
        </div>
      </div>
      <div className="text-sm text-neutral-tertiary">{description}</div>
    </Card>
  )
}

export default DeckCard
