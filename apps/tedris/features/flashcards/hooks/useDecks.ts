import { useState, useEffect } from 'react'
import type { FlashcardDeckResponse } from '@madrasah/services/tedrisat'

interface UseDecksResult {
  decks: FlashcardDeckResponse[] | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useDecks(): UseDecksResult {
  const [decks, setDecks] = useState<FlashcardDeckResponse[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDecks = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/decks')
      const result = await response.json()

      if (result.error) {
        setError(result.error)
        setDecks(null)
      }
      else {
        setDecks(result.data)
      }
    }
    catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch decks')
      setDecks(null)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDecks()
  }, [])

  return {
    decks,
    loading,
    error,
    refetch: fetchDecks,
  }
}
