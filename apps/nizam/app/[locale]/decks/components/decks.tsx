'use client'

import { useDecksColumns } from './columns'
import { DataTable } from '~/components/data-table'
import { FlashcardDeckResponse } from '@madrasah/services/tedrisat'
import { createDefaultColumn } from '~/components/data-table/editable'
import { TableHeader } from './table-header'
import { deleteFlashcardDeck, updateFlashcardDeck } from '../actions'
import { toastHelper } from '@madrasah/ui/lib/toast-helper'

export default function Decks({
  decks,
}: {
  decks: FlashcardDeckResponse[]
}) {
  const columns = useDecksColumns()

  const handleRowDelete = async (id: string) => {
    try {
      const response = await deleteFlashcardDeck(id)
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

  const handleRowUpdate = async (updatedRow: FlashcardDeckResponse) => {
    try {
      // Pass deckId to server action for revalidatePath
      const response = await updateFlashcardDeck(updatedRow.id, {
        title: updatedRow.title,
        description: updatedRow.description,
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

  const defaultColumn = createDefaultColumn<FlashcardDeckResponse>()

  return (
    <div>
      <TableHeader />
      <DataTable
        columns={columns}
        data={decks}
        defaultColumn={defaultColumn}
        onRowDelete={handleRowDelete}
        onRowUpdate={handleRowUpdate}
      />
    </div>
  )
}
