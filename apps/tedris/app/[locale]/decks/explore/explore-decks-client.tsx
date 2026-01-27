'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Input } from '@madrasah/ui/components/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@madrasah/ui/components/select'
import { MagnifyingGlassIcon } from '@madrasah/icons'

import DeckCard from '~/features/flashcards/components/deck/deck-card'
import type { FlashcardDeckResponse } from '@madrasah/services/tedrisat'

type SortOption = 'title-asc' | 'title-desc'
type FilterOption = 'all' | 'public' | 'private'

interface ExploreDecksClientProps {
  initialDecks: FlashcardDeckResponse[]
  userDeckIds: string[]
}

const DECKS_PER_PAGE = 16

export default function ExploreDecksClient({ initialDecks, userDeckIds }: ExploreDecksClientProps) {
  const t = useTranslations('tedris')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('title-asc')
  const [filterBy, setFilterBy] = useState<FilterOption>('all')
  const [displayedCount, setDisplayedCount] = useState(DECKS_PER_PAGE)
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery)
  const observerTarget = useRef<HTMLDivElement>(null)
  const userDeckIdsSet = useMemo(() => new Set(userDeckIds), [userDeckIds])

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [searchQuery])

  // Filter and sort decks
  const filteredAndSortedDecks = useMemo(() => {
    let filtered = [...initialDecks]

    // Apply search filter
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase()
      filtered = filtered.filter((deck) => {
        const titleMatch = deck.title?.toLowerCase().includes(query)
        const descriptionMatch = deck.description?.toLowerCase().includes(query)
        return titleMatch || descriptionMatch
      })
    }

    // Apply visibility filter
    if (filterBy === 'public') {
      filtered = filtered.filter(deck => deck.isPublic)
    }
    else if (filterBy === 'private') {
      filtered = filtered.filter(deck => !deck.isPublic)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const titleA = a.title?.toLowerCase() || ''
      const titleB = b.title?.toLowerCase() || ''

      if (sortBy === 'title-asc') {
        return titleA.localeCompare(titleB)
      }
      else {
        return titleB.localeCompare(titleA)
      }
    })

    return filtered
  }, [initialDecks, debouncedSearchQuery, sortBy, filterBy])

  // Get displayed decks based on displayedCount
  const displayedDecks = useMemo(() => {
    return filteredAndSortedDecks.slice(0, displayedCount)
  }, [filteredAndSortedDecks, displayedCount])

  // Reset displayed count when filters change
  useEffect(() => {
    setDisplayedCount(DECKS_PER_PAGE)
  }, [debouncedSearchQuery, sortBy, filterBy])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayedCount < filteredAndSortedDecks.length) {
          setDisplayedCount(prev => Math.min(prev + DECKS_PER_PAGE, filteredAndSortedDecks.length))
        }
      },
      { threshold: 0.1 },
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [displayedCount, filteredAndSortedDecks.length])

  return (
    <div className="w-full">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search Input */}
        <div className="relative flex-1">
          <MagnifyingGlassIcon
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={20}
          />
          <Input
            type="text"
            placeholder={t('ExploreDecksClient.searchPlaceholder')}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Sort and Filter Controls */}
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={value => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder={t('ExploreDecksClient.sortBy')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title-asc">{t('ExploreDecksClient.titleAsc')}</SelectItem>
              <SelectItem value="title-desc">{t('ExploreDecksClient.titleDesc')}</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filterBy}
            onValueChange={value => setFilterBy(value as FilterOption)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={t('ExploreDecksClient.filter')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('ExploreDecksClient.all')}</SelectItem>
              <SelectItem value="public">{t('ExploreDecksClient.public')}</SelectItem>
              <SelectItem value="private">{t('ExploreDecksClient.private')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-muted-foreground">
        {filteredAndSortedDecks.length}
        {' '}
        {filteredAndSortedDecks.length === 1 ? t('ExploreDecksClient.deck') : t('ExploreDecksClient.decks')}
        {' '}
        {t('ExploreDecksClient.found')}
      </div>

      {/* Deck Grid */}
      {displayedDecks.length > 0
        ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {displayedDecks.map(deck => (
                <Link href={`/decks/${deck.id}`} key={deck.id}>
                  <DeckCard
                    deckId={deck.id}
                    title={deck.title}
                    description={deck.description}
                    cardCount={0}
                    isInCollection={userDeckIdsSet.has(deck.id)}
                  />
                </Link>
              ))}
            </div>
          )
        : (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              <p>{t('ExploreDecksClient.noDecksFound')}</p>
            </div>
          )}

      {/* Infinite Scroll Trigger */}
      {displayedCount < filteredAndSortedDecks.length && (
        <div ref={observerTarget} className="h-20 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">{t('ExploreDecksClient.loadingMore')}</p>
        </div>
      )}
    </div>
  )
}
