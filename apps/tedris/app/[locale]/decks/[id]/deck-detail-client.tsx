'use client'

import { useState } from 'react'
import Link from 'next/link'

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
import SampleCards from './sample-cards'
import { addDeckToCollection, removeDeckFromCollection } from '~/features/flashcards/actions'

interface DeckDetailClientProps {
  deck: FlashcardDeckResponse
  cards: FlashcardResponse[]
  isInCollection: boolean
}

// TODO: These fields should come from the API when available
// For now, using placeholders or calculated values
const MOCK_TAGS = ['arabic', 'hadith']
const MOCK_AUTHOR = 'Imam Yousef'
const MOCK_RATING = 0
const MOCK_STUDENTS = 0

export default function DeckDetailClient({ deck, cards, isInCollection: initialIsInCollection }: DeckDetailClientProps) {
  const [isInCollection, setIsInCollection] = useState(initialIsInCollection)
  const [isProcessing, setIsProcessing] = useState(false)
  const cardCount = cards.length
  const sampleCards = cards.slice(0, 8)

  // TODO: Get actual tags, author, rating, students from API
  const tags = MOCK_TAGS
  const author = MOCK_AUTHOR
  const rating = MOCK_RATING
  const students = MOCK_STUDENTS

  const handleToggleCollection = async () => {
    setIsProcessing(true)
    try {
      const success = isInCollection
        ? await removeDeckFromCollection(deck.id)
        : await addDeckToCollection(deck.id)

      if (success) {
        setIsInCollection(!isInCollection)
        toastHelper.success({
          title: isInCollection ? 'Removed from Collection' : 'Added to Collection',
          description: isInCollection
            ? 'Deck has been removed from your collection successfully.'
            : 'Deck has been added to your collection successfully.',
        })
      }
      else {
        toastHelper.error({
          title: isInCollection ? 'Failed to Remove' : 'Failed to Add',
          description: isInCollection
            ? 'Failed to remove deck from your collection. Please try again.'
            : 'Failed to add deck to your collection. Please try again.',
        })
      }
    }
    catch (error) {
      console.error('Error toggling deck collection:', error)
      toastHelper.error({
        title: 'Error',
        description: `An error occurred while ${isInCollection ? 'removing' : 'adding'} the deck ${isInCollection ? 'from' : 'to'} your collection.`,
      })
    }
    finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="mx-auto px-4 pb-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{deck.title}</h1>

            {/* Author */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">
                {author.charAt(0).toUpperCase()}
              </div>
              <span className="text-md text-muted-foreground">
                by
                {' '}
                {author}
              </span>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <CardsIcon size={16} />
                <span>
                  {cardCount}
                  {' '}
                  cards
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <StarIcon size={16} />
                <span>
                  {rating}
                  {' '}
                  rating
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <StudentIcon size={16} />
                <span>
                  {students}
                  {' '}
                  students
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            {cardCount > 0
              ? (
                  <Link href={`/decks/study/${deck.id}`}>
                    <Button size="lg" className="gap-2">
                      Practice Now
                      <ArrowRightIcon size={20} />
                    </Button>
                  </Link>
                )
              : (
                  <Button size="lg" className="gap-2" disabled>
                    Practice Now
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
                ? (isInCollection ? 'Removing...' : 'Adding...')
                : (isInCollection ? 'Remove from collection' : 'Add to my collection')}
            </Button>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Description */}
        {deck.description && (
          <div className="mb-8">
            <p className="text-muted-foreground leading-relaxed">
              {deck.description}
            </p>
          </div>
        )}

      </div>

      {/* Sample Cards Section */}
      {cardCount > 0
        ? (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">Sample Cards</h2>
              <SampleCards cards={sampleCards} />
            </div>
          )
        : (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">Sample Cards</h2>
              <div className="flex flex-col items-center justify-center py-12 px-4 bg-muted rounded-lg border-2 border-dashed">
                <CardsIcon size={48} className="text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">No cards in this deck</p>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  This deck doesn&apos;t have any flashcards yet. Add some cards to start practicing.
                </p>
              </div>
            </div>
          )}
    </div>
  )
}
