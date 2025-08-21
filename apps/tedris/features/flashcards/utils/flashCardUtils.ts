'use client';

import { FlashCard, FlashCardType, FlashCardUIModel } from '@madrasah/types';

const titles: Record<FlashCardType, string> = {
  [FlashCardType.Hadith]: 'Hadis Ezber Kartı',
  [FlashCardType.Vocab]: 'Arapça Ezber Kartı',
  [FlashCardType.Any]: 'Ezber Kartı',
};

export function toDisplay(card: FlashCard): FlashCardUIModel {
  switch (card.type) {
    case FlashCardType.Hadith:
      return {
        id: card.id,
        type: card.type,
        question: card.partialText,
        value: card.fullText,
        title: titles.hadith,
      };
    case FlashCardType.Vocab:
      return {
        id: card.id,
        type: card.type,
        question: card.arabic,
        value: card.translation,
        title: titles.vocab,
      };
    default:
      throw new Error('Unexpected object: ' + card);
  }
}
