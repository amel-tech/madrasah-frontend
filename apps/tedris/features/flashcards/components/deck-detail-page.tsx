'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Button } from '@madrasah/ui/components/button'
import { Badge } from '@madrasah/ui/components/badge'
import {
  CardsIcon,
  StarIcon,
  StudentIcon,
  ArrowRightIcon,
  BookmarkSimpleIcon,
} from '@madrasah/icons'
import { toastHelper } from '@madrasah/ui/lib/toast-helper'

import type {
  FlashcardDeckResponse,
  FlashcardResponse,
} from '@madrasah/services/tedrisat'
import { SampleCards } from '~/features/flashcards/components/sample-cards'
import { addDeckToCollection, removeDeckFromCollection } from '~/features/flashcards/actions'

const MOCK_TAGS = ['arabic', 'hadith']
const MOCK_AUTHOR = 'Imam Yousef'
const MOCK_RATING = 0
const MOCK_STUDENTS = 0

export function DeckDetailPage({
  deck,
  cards,
  isInCollection: initialIsInCollection,
}: {
  deck: FlashcardDeckResponse
  cards: FlashcardResponse[]
  isInCollection: boolean
}) {
  const t = useTranslations('tedris')
  const [isInCollection, setIsInCollection] = useState(initialIsInCollection)
  const [isProcessing, setIsProcessing] = useState(false)
  const cardCount = cards.length
  const sampleCards = cards.slice(0, 8)
  const tags = MOCK_TAGS
  const author = MOCK_AUTHOR
  const rating = MOCK_RATING
  const students = MOCK_STUDENTS

  const handleToggleCollection = async () => {
    setIsProcessing(true)
    try {
      isInCollection
        ? await removeDeckFromCollection(deck.id)
        : await addDeckToCollection(deck.id)
      setIsInCollection(!isInCollection)
      toastHelper.success({
        title: isInCollection ? t('DeckCard.removedFromCollection') : t('DeckCard.addedToCollection'),
        description: isInCollection
          ? t('DeckCard.removedFromCollectionDescription')
          : t('DeckCard.addedToCollectionDescription'),
      })
    }
    catch (error) {
      toastHelper.error({
        title: t('DeckCard.error'),
        description: error instanceof Error
          ? error.message
          : t('DeckCard.errorDescription', {
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
    <div className="mx-auto px-4 pb-8">
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{deck.title}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">
                {author.charAt(0).toUpperCase()}
              </div>
              <span className="text-md text-muted-foreground">
                {t('DeckDetailClient.by')}
                {' '}
                {author}
              </span>
            </div>

            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <CardsIcon size={16} />
                <span>
                  {cardCount}
                  {' '}
                  {t('DeckDetailClient.cards')}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <StarIcon size={16} />
                <span>
                  {rating}
                  {' '}
                  {t('DeckDetailClient.rating')}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <StudentIcon size={16} />
                <span>
                  {students}
                  {' '}
                  {t('DeckDetailClient.students')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            {cardCount > 0
              ? (
                  <Link href={`/decks/study/${deck.id}`}>
                    <Button size="lg" className="gap-2">
                      {t('DeckDetailClient.practiceNow')}
                      <ArrowRightIcon size={20} />
                    </Button>
                  </Link>
                )
              : (
                  <Button size="lg" className="gap-2" disabled>
                    {t('DeckDetailClient.practiceNow')}
                    <ArrowRightIcon size={20} />
                  </Button>
                )}
            <Button
              size="lg"
              variant={isInCollection ? 'default' : 'outline'}
              className="gap-2"
              onClick={handleToggleCollection}
              disabled={isProcessing}
            >
              <BookmarkSimpleIcon size={20} weight={isInCollection ? 'fill' : 'regular'} />
              {isProcessing
                ? (isInCollection ? t('DeckDetailClient.removing') : t('DeckDetailClient.adding'))
                : (isInCollection ? t('DeckDetailClient.removeFromCollection') : t('DeckDetailClient.addToMyCollection'))}
            </Button>
          </div>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {deck.description && (
          <div className="mb-8">
            <p className="text-muted-foreground leading-relaxed">
              {deck.description}
            </p>
          </div>
        )}
      </div>

      {cardCount > 0
        ? (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">{t('DeckDetailClient.sampleCards')}</h2>
              <SampleCards cards={sampleCards} />
            </div>
          )
        : (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">{t('DeckDetailClient.sampleCards')}</h2>
              <div className="flex flex-col items-center justify-center py-12 px-4 bg-muted rounded-lg border-2 border-dashed">
                <CardsIcon size={48} className="text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">{t('DeckDetailClient.noCardsInDeck')}</p>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  {t('DeckDetailClient.noCardsDescription')}
                </p>
              </div>
            </div>
          )}
    </div>
  )
}
