'use client'

import { useMemo } from 'react'
import { updateFlashcard, deleteFlashcard } from '~/features/flashcards/actions'

import { FlashcardResponse } from '@madrasah/services/tedrisat'
import { toastHelper } from '@madrasah/ui/lib/toast-helper'
import { useFlashcardColumns } from './columns'
import { DataTable } from '~/components/data-table'
import { createDefaultColumn } from '~/components/data-table/editable'

export default function DeckCards({
  deckId,
  flashcards,
}: {
  deckId: string
  flashcards: FlashcardResponse[] | undefined
}) {
  const columns = useFlashcardColumns()

  const onRowUpdate = async (updatedRow: FlashcardResponse) => {
    try {
      // Pass deckId to server action for revalidatePath
      const response = await updateFlashcard(updatedRow.id, {
        contentFront: updatedRow.contentFront,
        contentBack: updatedRow.contentBack,
      })

      if (response) {
        toastHelper.success({
          title: 'Card Updated',
          description: 'Flashcard was updated successfully.',
        })
        return true
      }
      else {
        toastHelper.error({
          title: 'Update Failed',
          description: 'Failed to update the flashcard. Please try again.',
        })
        return false
      }
    }
    catch (error) {
      console.error('Error updating flashcard:', error)
      toastHelper.error({
        title: 'Update Error',
        description: 'An error occurred while updating the flashcard.',
      })
      return false
    }
  }

  const onRowDelete = async (id: string) => {
    try {
      // Pass deckId to server action for automatic revalidatePath
      const response = await deleteFlashcard(id, deckId)
      if (response) {
        toastHelper.success({ title: 'Card Deleted', description: `Card with ID ${id} was deleted.` }, { cardId: id })
        return true
      }
      return false
    }
    catch (error) {
      console.error('Error deleting flashcard:', error)
      toastHelper.error({ title: 'Delete Error', description: 'Failed to delete the flashcard.' })
      return false
    }
  }

  const defaultColumn = useMemo(() => {
    return createDefaultColumn<FlashcardResponse>()
  }, [])

  return (
    <div>
      <DataTable
        columns={columns}
        data={flashcards || []}
        onRowUpdate={onRowUpdate}
        defaultColumn={defaultColumn}
        onRowDelete={onRowDelete}
      />
    </div>
  )
}
