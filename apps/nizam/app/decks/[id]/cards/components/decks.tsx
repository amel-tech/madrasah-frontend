'use client'

import { useState } from 'react'
import * as XLSX from 'xlsx'
import { updateFlashcard, createFlashcards, deleteFlashcard } from '../actions'

import { columns } from './columns'
import { DataTable } from '~/components/data-table'
import { TableHeader } from './table-header'
import { FlashcardResponse, FlashcardResponseTypeEnum } from '@madrasah/services/tedrisat'
import { toastHelper } from '@madrasah/ui/lib/toast-helper'

type SpreadsheetCardRepresentation = {
  id: number
  type: FlashcardResponseTypeEnum
  contentFront: string
  contentBack: string
  is_public?: boolean
}

export default function DeckCards({
  deckId,
  flashcards,
}: {
  deckId: string
  flashcards: FlashcardResponse[] | undefined
}) {
  const [localCards, setLocalCards] = useState<FlashcardResponse[]>(flashcards || [])

  const onRowUpdate = async (updatedRow: FlashcardResponse) => {
    const response = await updateFlashcard(updatedRow.id, {
      contentFront: updatedRow.contentFront,
      contentBack: updatedRow.contentBack,
    })

    if (response) {
      setLocalCards(prevCards => prevCards.map(card => card.id === updatedRow.id ? updatedRow : card))
    }

    return response
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
      id: index,
      type: row.type,
      contentFront: row.contentFront,
      contentBack: row.contentBack,
      deckId: Number(deckId),
      authorId: 1,
    }))

    await createFlashcards(Number(deckId), cardsToImport)
    setLocalCards(prevCards => [...prevCards, ...cardsToImport])
    toastHelper.success({ title: 'Cards Imported', description: `${cardsToImport.length} cards were imported successfully.` })
  }

  const onRowDelete = async (id: number) => {
    const response = await deleteFlashcard(id)
    if (response) {
      setLocalCards(prevCards => prevCards.filter(card => card.id !== id))
      toastHelper.success({ title: 'Card Deleted', description: `Card with ID ${id} was deleted.` }, { cardId: id })
    }
    return response
  }

  const onClickDownloadSampleFile = async () => {
    const sampleCards: SpreadsheetCardRepresentation[] = Array.from({ length: 5 }).map((_, index) => {
      return {
        id: index,
        type: FlashcardResponseTypeEnum.Vocabulary,
        contentFront: `Front word ${index + 1}`,
        contentBack: `Back word ${index + 1}`,
        deckId: Number(deckId),
        is_public: true,
      }
    })

    const worksheet = XLSX.utils.json_to_sheet(sampleCards)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SampleCards')
    await XLSX.writeFile(workbook, 'sample_cards.xlsx')
  }

  return (
    <div>
      <TableHeader onClickDownloadSampleFile={onClickDownloadSampleFile} onDeckFileImport={onDeckFileImport} />
      <DataTable
        columns={columns}
        data={localCards || []}
        onRowUpdate={onRowUpdate}
        onRowDelete={onRowDelete}
      />
    </div>
  )
}
