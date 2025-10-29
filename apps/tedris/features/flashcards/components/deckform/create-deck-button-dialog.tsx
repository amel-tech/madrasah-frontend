'use client'

import { PlusIcon } from '@madrasah/icons'
import { Button } from '@madrasah/ui/components/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@madrasah/ui/components/dialog'
import DeckMetaForm from './deck-meta-form'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Form } from '@madrasah/ui/custom/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toastHelper } from '@madrasah/ui/lib/toast-helper'
import z from 'zod'
import { deckMetaFormSchema } from '../../validations/deck-meta-form-schema'
import { createFlashCardDeck } from '~/features/flashcards/actions'
import { CreateFlashcardDeckDto } from '@madrasah/services/tedrisat'

export default function CreateDeckButtonDialog() {
  const router = useRouter()

  const form = useForm<z.infer<typeof deckMetaFormSchema>>({
    resolver: zodResolver(deckMetaFormSchema),
    defaultValues: {
      title: '',
      description: '',
      tagIds: [],
      isPublic: false,
    },
  })

  const onSubmit = async (data: CreateFlashcardDeckDto) => {
    // handle form submission logic here
    try {
      const response = await createFlashCardDeck(data)
      const id = response?.id || null

      if (response) {
        toastHelper.success({
          title: 'Card Created',
          description: 'Flashcard was created successfully.',
        })

        router.push(`/cards/decks/${id}/cards`)
      }
      else {
        toastHelper.error({
          title: 'Creation Failed',
          description: 'Failed to create the flashcard. Please try again.',
        })
        return false
      }
    }
    catch (error) {
      console.error('Error updating flashcard:', error)
      toastHelper.error({
        title: 'Creation Error',
        description: 'An error occurred while creating the flashcard.',
      })
      return false
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="text-white">
          <PlusIcon weight="bold" />
          create new deck
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[620px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="mb-6">
              <DialogTitle>New Deck</DialogTitle>
            </DialogHeader>
            <DeckMetaForm control={form.control} />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Create Deck</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
