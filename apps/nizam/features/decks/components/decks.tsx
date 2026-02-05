'use client'

import { useDecksColumns } from '~/features/decks/hooks/useDecksColumns'
import { DataTable } from '~/components/data-table'
import { FlashcardDeckResponse } from '@madrasah/services/tedrisat'
import { createDefaultColumn } from '~/components/data-table/editable'
import { DecksTableHeader } from './decks-table-header'
import { deleteFlashcardDeck, updateFlashcardDeck } from '~/features/decks/actions'
import { toastHelper } from '@madrasah/ui/lib/toast-helper'

export default function Decks({
  decks,
}: {
  decks: FlashcardDeckResponse[]
}) {
  const columns = useDecksColumns()

  const handleRowDelete = async (id: string) => {
    try {
      await deleteFlashcardDeck(id)
      toastHelper.success({ title: 'Card Deleted', description: `Card with ID ${id} was deleted.` }, { cardId: id })
      return true
    }
    catch (error) {
      toastHelper.error({
        title: 'Delete Error',
        description: error instanceof Error ? error.message : 'Failed to delete the flashcard.',
      })
      return false
    }
  }

  const handleRowUpdate = async (updatedRow: FlashcardDeckResponse) => {
    try {
      await updateFlashcardDeck(updatedRow.id, {
        title: updatedRow.title,
        description: updatedRow.description,
      })
      toastHelper.success({
        title: 'Card Updated',
        description: 'Flashcard was updated successfully.',
      })
      return true
    }
    catch (error) {
      toastHelper.error({
        title: 'Update Error',
        description: error instanceof Error ? error.message : 'An error occurred while updating the flashcard.',
      })
      return false
    }
  }

  const defaultColumn = createDefaultColumn<FlashcardDeckResponse>()

  return (
    <div>
      <DecksTableHeader />
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
