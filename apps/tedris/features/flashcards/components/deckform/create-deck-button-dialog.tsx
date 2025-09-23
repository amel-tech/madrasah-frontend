'use client'
import { useState } from 'react'

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

export default function CreateDeckButtonDialog() {
  const router = useRouter()

  const [deckMeta, setDeckMeta] = useState({
    name: '',
    description: '',
    tags: [] as string[],
    is_public: false,
  })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // handle form submission logic here
    console.log('Deck Meta:', deckMeta)
    router.push('/cards/decks/create')
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="default" size="sm" className="text-white">
            <PlusIcon weight="bold" />
            create new deck
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[620px]">
          <DialogHeader className="mb-6">
            <DialogTitle>New Deck</DialogTitle>
          </DialogHeader>
          <DeckMetaForm deckMeta={deckMeta} setDeckMeta={setDeckMeta} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={onSubmit}>Create Deck</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
