'use client'

import { useMemo } from 'react'
import * as XLSX from 'xlsx'
import { updateFlashcard, createFlashcards, deleteFlashcard } from '../actions'
import { useTranslations } from 'next-intl'

import { DataTable } from '~/components/data-table'
import { TableHeader } from './table-header'
import { FlashcardDeckResponse, FlashcardResponse, FlashcardResponseTypeEnum } from '@madrasah/services/tedrisat'
import { toastHelper } from '@madrasah/ui/lib/toast-helper'
import { useFlashcardColumns } from './columns'
import { createDefaultColumn } from '~/components/data-table/editable'

type SpreadsheetCardRepresentation = {
  id: string
  type: FlashcardResponseTypeEnum
  contentFront: string
  contentBack: string
  is_public?: boolean
}

export default function DeckCards({
  deck,
  cards,
}: {
  deck: FlashcardDeckResponse
  cards: FlashcardResponse[]
}) {
  const t = useTranslations('nizam')
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

  const onDeckFileImport = async (file: File) => {
    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0] || ''
    const worksheet = workbook.Sheets[sheetName]

    if (!worksheet) {
      return console.error('No worksheet found in the uploaded file')
    }

    const json = XLSX.utils.sheet_to_json<SpreadsheetCardRepresentation>(worksheet)
    const cardsToImport: FlashcardResponse[] = json.map((row, index) => ({
      id: index.toString(),
      type: row.type,
      contentFront: row.contentFront,
      contentBack: row.contentBack,
      deckId: deck.id,
      authorId: '1',
    }))

    await createFlashcards(deck.id, cardsToImport)
    toastHelper.success({ title: t('DeckCards.cardsImported'), description: t('DeckCards.cardsImportedDescription', { count: cardsToImport.length }) })
  }

  const onRowDelete = async (id: string) => {
    try {
      // Pass deckId to server action for automatic revalidatePath
      const response = await deleteFlashcard(id, deck.id)
      if (response) {
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

  const onClickDownloadSampleFile = async () => {
    const sampleCards: SpreadsheetCardRepresentation[] = Array.from({ length: 5 }).map((_, index) => {
      return {
        id: index.toString(),
        type: FlashcardResponseTypeEnum.Vocabulary,
        contentFront: t('SampleFile.frontWord', { index: index + 1 }),
        contentBack: t('SampleFile.backWord', { index: index + 1 }),
        deckId: deck.id,
        is_public: true,
      }
    })

    const worksheet = XLSX.utils.json_to_sheet(sampleCards)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SampleCards')
    await XLSX.writeFile(workbook, 'sample_cards.xlsx')
  }

  const defaultColumn = useMemo(() => {
    return createDefaultColumn<FlashcardResponse>()
  }, [])

  return (
    <div>
      <TableHeader
        title={deck.title}
        description={deck.description || ''}
        onClickDownloadSampleFile={onClickDownloadSampleFile}
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
