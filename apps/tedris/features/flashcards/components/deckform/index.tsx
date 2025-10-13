import React from 'react'

import { Button } from '@madrasah/ui/components/button'
import ATFormGroupTextArea from '@madrasah/ui/custom/form-group-text-area'
import FlashCard from '../flashcard'
import { useRouter } from 'next/navigation'
import { CaretLeftIcon } from '@madrasah/icons'
import { useFieldArray, useForm } from 'react-hook-form'
import { Form } from '@madrasah/ui/custom/form'
import z from 'zod'

import { deckCardsFormSchema } from '~/features/flashcards/validations/deck-cards-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'

interface IDeckFormProps {
  id?: number
}

interface ICard {
  content: {
    front: string
    back: string
  }
}

function DeckForm({ id }: IDeckFormProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof deckCardsFormSchema>>({
    resolver: zodResolver(deckCardsFormSchema),
    defaultValues: {
      cards: [
        {
          content: {
            front: '',
            back: '',
          },
        },
      ],
    },
  })

  const onAddCard = () => {
    append({
      content: {
        front: '',
        back: '',
      },
    })
  }

  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'cards',
  })

  const onSubmit = (data: { cards: ICard[] }) => {
    if (id) {
      console.log('update: ', data)
    }
    else {
      console.log('create: ', data)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center mb-4">
            <div
              onClick={() => router.back()}
              className="cursor-pointer flex items-center gap-2"
            >
              <CaretLeftIcon />
              Back
            </div>
            <Button type="submit">Save</Button>
          </div>

          <div>
            <h4 className="mb-4">CARDS</h4>
            {fields.map((_, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 mb-8">
                <FlashCard>
                  <ATFormGroupTextArea
                    name={`cards.${index}.content.front`}
                    placeholder="Front Text"
                    control={form.control}
                  />
                </FlashCard>
                <FlashCard>
                  <ATFormGroupTextArea
                    name={`cards.${index}.content.back`}
                    placeholder="Back Text"
                    control={form.control}
                  />
                </FlashCard>
              </div>
            ))}
            <Button variant="secondary" className="w-full" onClick={onAddCard}>
              Add Card
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default DeckForm
