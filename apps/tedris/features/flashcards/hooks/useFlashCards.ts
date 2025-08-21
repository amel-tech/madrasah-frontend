import { useState, useEffect } from 'react';
import { BaseFlashCard } from '@madrasah/types';

interface FlashCard extends BaseFlashCard {
  lastReviewed: string;
}

export function useFlashCards() {
  const [cards, setCards] = useState<FlashCard[]>([]);

  useEffect(() => {
    const savedCards = localStorage.getItem('memorizedCards');

    if (savedCards) {
      try {
        const parsedCards = JSON.parse(savedCards);
        if (parsedCards && parsedCards.length > 0) {
          setCards(parsedCards);
          return;
        }
      } catch (error) {
        console.error('Error parsing saved cards:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (cards?.length > 0) {
      localStorage.setItem('memorizedCards', JSON.stringify(cards));
    }
  }, [cards]);

  const addMemorizedCard = ({ id, type }: BaseFlashCard) => {
    const newCard: FlashCard = {
      id: id,
      type: type,
      lastReviewed: new Date().toISOString(),
    };
    setCards((prev) => [...prev, newCard]);
  };

  const removeMemorizedCard = (id: string | number) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const isCardMemorized = (id: string | number) => {
    return cards.some((c) => c.id === id);
  };

  const toggleMemorized = ({ id, type }: BaseFlashCard) => {
    if (isCardMemorized(id)) {
      removeMemorizedCard(id);
    } else {
      addMemorizedCard({ id, type });
    }
  };

  return {
    cards,
    addMemorizedCard,
    removeMemorizedCard,
    isCardMemorized,
    toggleMemorized,
  };
}
