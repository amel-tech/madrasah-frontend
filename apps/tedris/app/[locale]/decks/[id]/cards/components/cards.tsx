'use client'

import { useMemo } from 'react'
import { updateFlashcard, deleteFlashcard } from '~/features/flashcards/actions'
import { useTranslations } from 'next-intl'

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
  const t = useTranslations('tedris')
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
          title: t('DeckCards.cardUpdated'),
          description: t('DeckCards.cardUpdatedDescription'),
        })
        return true
      }
      else {
        toastHelper.error({
          title: t('DeckCards.updateFailed'),
          description: t('DeckCards.updateFailedDescription'),
        })
        return false
      }
    }
    catch (error) {
      console.error('Error updating flashcard:', error)
      toastHelper.error({
        title: t('DeckCards.updateError'),
        description: t('DeckCards.updateErrorDescription'),
      })
      return false
    }
  }

  const onRowDelete = async (id: string) => {
    try {
      // Pass deckId to server action for automatic revalidatePath
      const response = await deleteFlashcard(id, deckId)
      if (response !== undefined) {
        toastHelper.success({ title: t('DeckCards.cardDeleted'), description: t('DeckCards.cardDeletedDescription', { id }) }, { cardId: id })
        return true
      }
      return false
    }
    catch (error) {
      console.error('Error deleting flashcard:', error)
      toastHelper.error({ title: t('DeckCards.deleteError'), description: t('DeckCards.deleteErrorDescription') })
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
