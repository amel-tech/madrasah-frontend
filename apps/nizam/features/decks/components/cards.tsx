'use client'

import { useMemo, useState } from 'react'
import { updateFlashcard, deleteFlashcard, getSampleFile, uploadFile, exportCards } from '~/features/decks/actions'
import { useTranslations } from 'next-intl'

import { DataTable } from '~/components/data-table'
import { CardsTableHeader } from './cards-table-header'
import { ImportErrorsDialog } from './import-errors-dialog'
import { FlashcardDeckResponse, FlashcardResponse, instanceOfBulkFlashcardErrorResponse } from '@madrasah/services/tedrisat'
import type { BulkFlashcardErrorResponse } from '@madrasah/services/tedrisat'
import { toastHelper } from '@madrasah/ui/lib/toast-helper'
import { downloadBase64File } from '~/features/decks/utils/download-base64-file'
import { useFlashcardColumns } from '~/features/decks/hooks/useFlashcardColumns'
import { createDefaultColumn } from '~/components/data-table/editable'

export default function DeckCards({
  deck,
  cards,
}: {
  deck: FlashcardDeckResponse
  cards: FlashcardResponse[]
}) {
  const t = useTranslations('nizam')
  const columns = useFlashcardColumns()
  const [importErrors, setImportErrors] = useState<BulkFlashcardErrorResponse | null>(null)

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
    toastHelper.error({
      title: t('DeckCards.updateError'),
      description: result.error,
    })
    return false
  }

  const onDeckFileImport = async (file: File) => {
    const result = await uploadFile(deck.id, file)
    if (result.success) {
      toastHelper.success({ title: t('DeckCards.cardsImported'), description: t('DeckCards.cardsImportedDescription', { count: result.data.count }) })
    }
    else if (result.errorBody && instanceOfBulkFlashcardErrorResponse(result.errorBody)) {
      setImportErrors(result.errorBody)
    }
    else {
      toastHelper.error({ title: t('DeckCards.updateError'), description: result.error })
    }
  }

  const onRowDelete = async (id: string) => {
    const result = await deleteFlashcard(id, deck.id)
    if (result.success) {
      toastHelper.success({ title: t('DeckCards.cardDeleted'), description: t('DeckCards.cardDeletedDescription', { id }) }, { cardId: id })
      return true
    }
    toastHelper.error({
      title: t('DeckCards.deleteError'),
      description: result.error,
    })
    return false
  }

  const onClickExportCards = async (format: 'csv' | 'xlsx') => {
    const result = await exportCards(deck.id, format)
    if (!result.success) {
      toastHelper.error({ title: t('DeckCards.updateError'), description: result.error })
      return
    }
    downloadBase64File(result.data, `cards.${format}`, format)
  }

  const onClickDownloadSampleFile = async (format: 'csv' | 'xlsx') => {
    const result = await getSampleFile(format)
    if (!result.success) {
      toastHelper.error({ title: t('DeckCards.updateError'), description: result.error })
      return
    }
    downloadBase64File(result.data, `sample.${format}`, format)
  }

  const defaultColumn = useMemo(() => {
    return createDefaultColumn<FlashcardResponse>()
  }, [])

  return (
    <div>
      <ImportErrorsDialog errors={importErrors} onClose={() => setImportErrors(null)} />
      <CardsTableHeader
        title={deck.title}
        description={deck.description || ''}
        onClickDownloadSampleFile={onClickDownloadSampleFile}
        onClickExportCards={onClickExportCards}
        onDeckFileImport={onDeckFileImport}
      />
      <DataTable
        columns={columns}
        data={cards}
        onRowUpdate={onRowUpdate}
        defaultColumn={defaultColumn}
        onRowDelete={onRowDelete}
      />
    </div>
  )
}
