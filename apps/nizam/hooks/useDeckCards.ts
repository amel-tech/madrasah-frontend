import { useCallback, useEffect, useState } from 'react'
import type { FlashcardResponse } from '@madrasah/services/tedrisat'

interface UseDeckCardsResult {
  cards: FlashcardResponse[] | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useDeckCards(deckId: string): UseDeckCardsResult {
  const [cards, setCards] = useState<FlashcardResponse[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCards = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Direct service call using TedrisatAdapter
      const result = await fetch(`/api/decks/${deckId}/cards`)

      if (!result.ok) {
        const errorData = await result.json()
        setError(errorData.error)
        setCards(null)
      }
      else {
        setCards(await result.json())
      }
    }
    catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cards')
      setCards(null)
    }
    finally {
      setLoading(false)
    }
  }, [deckId])

  useEffect(() => {
    if (deckId) {
      fetchCards()
    }
  }, [deckId, fetchCards])

  return {
    cards,
    loading,
    error,
    refetch: fetchCards,
  }
}
