'use client'

import { useCallback, useEffect, useState, useTransition } from 'react'
import type { FlashcardResponse } from '@madrasah/services/tedrisat'
import { updateFlashcardProgress } from '../actions'

function deriveMemorized(cards: FlashcardResponse[]): Set<string> {
  return new Set(
    cards
      .filter(c => c.progress?.some(p => p.status === 'MASTERED'))
      .map(c => c.id),
  )
}

/**
 * Derives memorized state from server-provided `card.progress` data.
 * A card is "memorized" if it has a progress entry with status 'MASTERED'.
 * Uses local state with optimistic updates and persists via the server action.
 */
export function useFlashCards(cards: FlashcardResponse[]) {
  const [memorized, setMemorized] = useState(() => deriveMemorized(cards))
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setMemorized(deriveMemorized(cards))
  }, [cards])

  const isCardMemorized = useCallback(
    (id: string) => memorized.has(id),
    [memorized],
  )

  const toggleMemorized = useCallback(
    (id: string) => {
      const wasMemorized = memorized.has(id)
      const newStatus = wasMemorized ? ('NEW' as const) : ('MASTERED' as const)

      // Optimistic: update local state immediately
      setMemorized((prev) => {
        const next = new Set(prev)
        if (wasMemorized) {
          next.delete(id)
        }
        else {
          next.add(id)
        }
        return next
      })

      // Persist to server
      startTransition(async () => {
        const result = await updateFlashcardProgress([
          { flashcardId: id, status: newStatus },
        ])

        if (result.success === false) {
          console.error('Failed to update progress:', result.error)
          // Revert on failure
          setMemorized((prev) => {
            const reverted = new Set(prev)
            if (wasMemorized) {
              reverted.add(id)
            }
            else {
              reverted.delete(id)
            }
            return reverted
          })
        }
      })
    },
    [memorized],
  )

  return {
    memorized,
    isCardMemorized,
    toggleMemorized,
    isPending,
  }
}
