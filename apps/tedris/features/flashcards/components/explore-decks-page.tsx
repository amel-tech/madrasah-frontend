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

const DECKS_PER_PAGE = 16

export function ExploreDecksPage({
  initialDecks,
  userDeckIds,
}: {
  initialDecks: FlashcardDeckResponse[]
  userDeckIds: string[]
}) {
  const t = useTranslations('tedris')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('title-asc')
  const [filterBy, setFilterBy] = useState<FilterOption>('all')
  const [displayedCount, setDisplayedCount] = useState(DECKS_PER_PAGE)
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery)
  const observerTarget = useRef<HTMLDivElement>(null)
  const userDeckIdsSet = useMemo(() => new Set(userDeckIds), [userDeckIds])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300)
    return () => clearTimeout(handler)
  }, [searchQuery])

  const filteredAndSortedDecks = useMemo(() => {
    let filtered = [...initialDecks]
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase()
      filtered = filtered.filter((deck) => {
        const titleMatch = deck.title?.toLowerCase().includes(query)
        const descriptionMatch = deck.description?.toLowerCase().includes(query)
        return titleMatch || descriptionMatch
      })
    }
    if (filterBy === 'public') {
      filtered = filtered.filter(deck => deck.isPublic)
    }
    else if (filterBy === 'private') {
      filtered = filtered.filter(deck => !deck.isPublic)
    }
    filtered.sort((a, b) => {
      const titleA = a.title?.toLowerCase() || ''
      const titleB = b.title?.toLowerCase() || ''
      if (sortBy === 'title-asc') {
        return titleA.localeCompare(titleB)
      }
      return titleB.localeCompare(titleA)
    })
    return filtered
  }, [initialDecks, debouncedSearchQuery, sortBy, filterBy])

  const displayedDecks = useMemo(() => {
    return filteredAndSortedDecks.slice(0, displayedCount)
  }, [filteredAndSortedDecks, displayedCount])

  useEffect(() => {
    setDisplayedCount(DECKS_PER_PAGE)
  }, [debouncedSearchQuery, sortBy, filterBy])

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
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
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

      <div className="mb-4 text-sm text-muted-foreground">
        {filteredAndSortedDecks.length}
        {' '}
        {filteredAndSortedDecks.length === 1 ? t('ExploreDecksClient.deck') : t('ExploreDecksClient.decks')}
        {' '}
        {t('ExploreDecksClient.found')}
      </div>

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

      {displayedCount < filteredAndSortedDecks.length && (
        <div ref={observerTarget} className="h-20 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">{t('ExploreDecksClient.loadingMore')}</p>
        </div>
      )}
    </div>
  )
}
