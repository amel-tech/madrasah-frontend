import { useState, useEffect } from 'react'
import type { FlashcardResponse } from '@madrasah/services/tedrisat'

interface UseDeckCardsResult {
  cards: FlashcardResponse[] | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useDeckCards(deckId: string): UseDeckCardsResult {
  const [cards, setCards] = useState<FlashcardResponse[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCards = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/decks/${deckId}/cards`)
      const result = await response.json()

      if (result.error) {
        setError(result.error)
        setCards(null)
      }
      else {
        setCards(result.data)
      }
    }
    catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cards')
      setCards(null)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (deckId) {
      fetchCards()
    }
  }, [deckId])

  return {
    cards,
    loading,
    error,
    refetch: fetchCards,
  }
}
