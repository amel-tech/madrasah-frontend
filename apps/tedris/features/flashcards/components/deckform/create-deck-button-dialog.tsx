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
import DeckMetaForm, { IDeckMeta } from './deck-meta-form'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Form } from '@madrasah/ui/custom/form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { deckMetaFormSchema } from '../../validations/deck-meta-form-schema'

export default function CreateDeckButtonDialog() {
  const router = useRouter()

  const form = useForm<z.infer<typeof deckMetaFormSchema>>({
    resolver: zodResolver(deckMetaFormSchema),
    defaultValues: {
      name: '',
      description: '',
      tags: [''],
      is_public: false,
    },
  })

  const onSubmit = (data: IDeckMeta) => {
    // handle form submission logic here
    console.log('Deck Meta:', data)
    router.push('/cards/decks/create')
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
