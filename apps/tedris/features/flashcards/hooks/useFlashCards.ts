import { useState, useEffect } from 'react'
import { FlashcardResponse } from '@madrasah/services/tedrisat'

export function useFlashCards() {
  const [cards, setCards] = useState<{
    id: FlashcardResponse['id']
    type: FlashcardResponse['type']
  }[]>([])

  useEffect(() => {
    const savedCards = localStorage.getItem('memorizedCards')

    if (savedCards) {
      try {
        const parsedCards = JSON.parse(savedCards)
        if (parsedCards && parsedCards.length > 0) {
          setCards(parsedCards)
          return
        }
      }
      catch (error) {
        console.error('Error parsing saved cards:', error)
      }
    }
  }, [])

  useEffect(() => {
    if (cards?.length > 0) {
      localStorage.setItem('memorizedCards', JSON.stringify(cards))
    }
  }, [cards])

  const addMemorizedCard = ({
    id,
    type,
  }: {
    id: FlashcardResponse['id']
    type: FlashcardResponse['type']
  }) => {
    const newCard = {
      id: id,
      type: type,
    }
    setCards(prev => [...prev, newCard])
  }

  const removeMemorizedCard = (id: string | number) => {
    setCards(prev => prev.filter(card => card.id !== id))
  }

  const isCardMemorized = (id: string | number) => {
    return cards.some(c => c.id === id)
  }

  const toggleMemorized = ({ id, type }: {
    id: FlashcardResponse['id']
    type: FlashcardResponse['type']
  }) => {
    if (isCardMemorized(id)) {
      removeMemorizedCard(id)
    }
    else {
      addMemorizedCard({
        id,
        type,
      })
    }
  }

  return {
    cards,
    removeMemorizedCard,
    isCardMemorized,
    toggleMemorized,
  }
}
