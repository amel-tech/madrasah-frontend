'use client'

import { useMemo } from 'react'
import * as XLSX from 'xlsx'
import { updateFlashcard, createFlashcards, deleteFlashcard } from '~/features/decks/actions'
import { useTranslations } from 'next-intl'

import { DataTable } from '~/components/data-table'
import { CardsTableHeader } from './cards-table-header'
import { FlashcardDeckResponse, FlashcardResponse, FlashcardResponseTypeEnum } from '@madrasah/services/tedrisat'
import { toastHelper } from '@madrasah/ui/lib/toast-helper'
import { useFlashcardColumns } from '~/features/decks/hooks/useFlashcardColumns'
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

  const onDeckFileImport = async (file: File) => {
    try {
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data, { type: 'array' })
      const sheetName = workbook.SheetNames[0] || ''
      const worksheet = workbook.Sheets[sheetName]

      if (!worksheet) {
        toastHelper.error({
          title: t('DeckCards.updateError'),
          description: 'No worksheet found in the uploaded file',
        })
        return
      }

      const json = XLSX.utils.sheet_to_json<SpreadsheetCardRepresentation>(worksheet)
      const cardsToImport = json.map(row => ({
        contentFront: row.contentFront,
        contentBack: row.contentBack,
      }))

      await createFlashcards(deck.id, cardsToImport)
      toastHelper.success({ title: t('DeckCards.cardsImported'), description: t('DeckCards.cardsImportedDescription', { count: cardsToImport.length }) })
    }
    catch (error) {
      toastHelper.error({
        title: t('DeckCards.updateError'),
        description: error instanceof Error ? error.message : 'Failed to import cards.',
      })
    }
  }

  const onRowDelete = async (id: string) => {
    try {
      await deleteFlashcard(id, deck.id)
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
      <CardsTableHeader
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
