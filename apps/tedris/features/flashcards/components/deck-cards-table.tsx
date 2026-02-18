'use client'

import { useMemo } from 'react'
import { updateFlashcard, deleteFlashcard } from '~/features/flashcards/actions'
import { useTranslations } from 'next-intl'

import { FlashcardResponse } from '@madrasah/services/tedrisat'
import { toastHelper } from '@madrasah/ui/lib/toast-helper'
import { useFlashcardColumns } from '~/features/flashcards/hooks/useFlashcardColumns'
import { DataTable } from '~/components/data-table'
import { createDefaultColumn } from '~/components/data-table/editable'

export function DeckCardsTable({
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
      await updateFlashcard(updatedRow.id, {
        contentFront: updatedRow.contentFront,
        contentBack: updatedRow.contentBack,
      })
      toastHelper.success({
        title: t('DeckCards.cardUpdated'),
        description: t('DeckCards.cardUpdatedDescription'),
      })
      return true
    }
    catch (error) {
      toastHelper.error({
        title: t('DeckCards.updateError'),
        description: error instanceof Error ? error.message : t('DeckCards.updateErrorDescription'),
      })
      return false
    }
  }

  const onRowDelete = async (id: string) => {
    try {
      await deleteFlashcard(id, deckId)
      toastHelper.success({ title: t('DeckCards.cardDeleted'), description: t('DeckCards.cardDeletedDescription', { id }) }, { cardId: id })
      return true
    }
    catch (error) {
      toastHelper.error({
        title: t('DeckCards.deleteError'),
        description: error instanceof Error ? error.message : t('DeckCards.deleteErrorDescription'),
      })
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
