import React, { useState } from 'react'

import { Button } from '@madrasah/ui/components/button'
import ATFormGroup from '@madrasah/ui/custom/form-group'
import ATFormGroupTextArea from '@madrasah/ui/custom/form-group-text-area'
import FlashCard from '../flashcard'
import { useRouter } from 'next/navigation'
import { CaretLeftIcon } from '@madrasah/icons'
import { Card } from '@madrasah/services/tedrisat'
import DeckMetaForm from './deck-meta-form'

interface IDeckFormProps {
  id?: number
}

function DeckForm({ id }: IDeckFormProps) {
  const router = useRouter()
  const [deckMeta, setDeckMeta] = useState({
    name: '',
    description: '',
    tags: [] as string[],
    is_public: false,
  })

  const [cards, setCards] = useState([
    {
      front: '',
      frontNote: '',
      back: '',
      backNote: '',
      categories: '',
      frontLanguage: '',
      backLanguage: '',
      difficulty: '',
    },
  ])

  const onChangeCardField = (index: number, field: string, value: string) => {
    setCards(prevCards =>
      prevCards.map((card, i) =>
        i === index ? { ...card, [field]: value } : card,
      ),
    )
  }

  const addCard = () => {
    setCards(prevCards => [
      ...prevCards,
      {
        front: '',
        frontNote: '',
        back: '',
        backNote: '',
        categories: '',
        frontLanguage: '',
        backLanguage: '',
        difficulty: '',
      },
    ])
  }

  const onSubmit = () => {
    const normalizedForm = {
      ...deckMeta,
      cards,
    }

    const oldCards = JSON.parse(localStorage.getItem('flashCards')) || []

    if (!id) {
      localStorage.setItem(
        'flashCards',
        JSON.stringify([...oldCards, normalizedForm]),
      )
    }
    else {
      const updatedCards = oldCards.map((card: Card) =>
        card.id === id ? normalizedForm : card,
      )
      localStorage.setItem('flashCards', JSON.stringify(updatedCards))
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div
          onClick={() => router.back()}
          className="cursor-pointer flex items-center gap-2"
        >
          <CaretLeftIcon />
          Back
        </div>
        <Button onClick={onSubmit}>Save</Button>
      </div>

      <div className="mb-8">
        <h4 className="mb-6">DECK</h4>
        <DeckMetaForm deckMeta={deckMeta} setDeckMeta={setDeckMeta} />
      </div>

      <div>
        <h4 className="mb-4">CARDS</h4>
        {cards.map((card, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 mb-8">
            <FlashCard>
              <ATFormGroupTextArea
                id={`${index}-front`}
                placeholder="Front Text"
                value={card.front}
                onChange={e =>
                  onChangeCardField(index, 'front', e.target.value)}
              />
              <ATFormGroupTextArea
                id={`${index}-frontNote`}
                placeholder="Front Note"
                value={card.frontNote}
                onChange={e =>
                  onChangeCardField(index, 'frontNote', e.target.value)}
              />
            </FlashCard>
            <FlashCard>
              <ATFormGroupTextArea
                id={`${index}-back`}
                placeholder="Back Text"
                value={card.back}
                onChange={e =>
                  onChangeCardField(index, 'back', e.target.value)}
              />
              <ATFormGroupTextArea
                id={`${index}-backNote`}
                placeholder="Back Note"
                value={card.backNote}
                onChange={e =>
                  onChangeCardField(index, 'backNote', e.target.value)}
              />
            </FlashCard>
            <div className="card-actions">
              <ATFormGroup
                id={`${index}-categories`}
                label="Categories"
                placeholder="hadith abdest abdestin sunnetleri"
                value={card.categories}
                onChange={e =>
                  onChangeCardField(index, 'categories', e.target.value)}
              />
              <ATFormGroup
                id={`${index}-difficulty`}
                label="Difficulty"
                placeholder="Zorluk"
                value={card.difficulty}
                onChange={e =>
                  onChangeCardField(index, 'difficulty', e.target.value)}
              />
            </div>
          </div>
        ))}
        <Button variant="secondary" className="w-full" onClick={addCard}>
          Add Card
        </Button>
      </div>
    </>
  )
}

export default DeckForm
