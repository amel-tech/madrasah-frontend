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
    const result = await updateFlashcard(updatedRow.id, {
      contentFront: updatedRow.contentFront,
      contentBack: updatedRow.contentBack,
    })
    if (result.success) {
      toastHelper.success({
        title: t('DeckCards.cardUpdated'),
        description: t('DeckCards.cardUpdatedDescription'),
      })
      return true
    }
    else {
      toastHelper.error({
        title: t('DeckCards.updateError'),
        description: t('DeckCards.updateErrorDescription'),
      })
    }
    return false
  }

  const onRowDelete = async (id: string) => {
    const result = await deleteFlashcard(id, deckId)
    if (result.success) {
      toastHelper.success({ title: t('DeckCards.cardDeleted'), description: t('DeckCards.cardDeletedDescription', { id }) }, { cardId: id })
      return true
    }
    else {
      toastHelper.error({
        title: t('DeckCards.deleteError'),
        description: t('DeckCards.deleteErrorDescription'),
      })
    }
    return false
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
