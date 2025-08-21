import { FlashCard, FlashCardType, HadithCard, VocabCard } from '@madrasah/types'
import FlashCardList from '~/features/flashcards/components/flashcardList'

const hadith: HadithCard = {
  id: 'asd',
  fullText: 'لاَيَقْبَلُ اللّٰهُ اِيمَانًا بِلاَعَمَلٍ وَلاَعَمَلاً بِلاَاِيمَانٍ',
  partialText: 'لاَيَقْبَلُ اللّٰهُ اِيمَانًا وَلاَعَمَلاً بِلاَاِيمَانٍ',
  type: FlashCardType.Hadith,
}

const vocab: VocabCard = {
  id: 2,
  arabic: 'نعم',
  translation: 'evet',
  type: FlashCardType.Vocab,
}

const arr: FlashCard[] = [vocab, hadith]

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <FlashCardList cards={arr} />
    </div>
  )
}
