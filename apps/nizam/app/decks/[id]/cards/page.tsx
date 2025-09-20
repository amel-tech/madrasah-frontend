'use client'

import { useState, useEffect, use } from 'react'
import * as XLSX from 'xlsx'

import { columns } from './components/columns'
import { DataTable } from '~/components/data-table'
import { TableHeader } from './components/table-header'
import { useQuery } from '~/hooks/useQuery'
import { useApi } from '~/hooks/useApi'
import { faker } from '@madrasah/msw/tedrisat'
import { Card } from '@madrasah/services/tedrisat'

type SpreadsheetCardRepresentation = {
  id: number
  type: 'hadeeth' | 'vocabulary'
  author: string
  is_public: boolean
  front: string
  back: string
  note: string
  image_source: string
}

export default function DeckCardsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  const { api } = useApi()
  const { data: cards, error, isLoading, refetch } = useQuery(api => api.getDeckCards(id))
  const [localCards, setLocalCards] = useState(cards)

  // Sync local cards with server data
  useEffect(() => {
    setLocalCards(cards)
  }, [cards])

  if (error) {
    return <div>Error loading cards</div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }

  const onRowUpdate = async (updatedRow: Card) => {
    if (!api) return

    // Optimistically update local state
    setLocalCards(prev =>
      prev?.map(card =>
        card.id === updatedRow.id ? updatedRow : card,
      ) || [],
    )

    try {
      const response = await api.updateCard(updatedRow.id, updatedRow)
      if (response.error) {
        console.error('Failed to update card:', response.error)
        // Rollback on error
        setLocalCards(cards)
      }
      else {
        console.log('Card updated successfully:', response.data)
        // Optionally refetch to ensure consistency
        // refetch();
      }
    }
    catch (error) {
      console.error('Failed to update card:', error)
      // Rollback on error
      setLocalCards(cards)
    }
  }

  const onDeckFileImport = async (file: File) => {
    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0] || ''
    const worksheet = workbook.Sheets[sheetName]

    // TODO: make an error popup
    // TODO: add i18n
    if (!worksheet) {
      return console.error('No worksheet found in the uploaded file')
    }

    const json = XLSX.utils.sheet_to_json<SpreadsheetCardRepresentation>(worksheet)
    const cardsToImport: Card[] = json.map(row => ({
      ...row,
      id: row.id,
      author: row.author,
      type: row.type,
      image_source: row.image_source,
      is_public: row.is_public,
      content: {
        front: row.front,
        back: row.back,
        note: row.note,
      },
      deck_id: Number(id),
    }))

    try {
      const response = await api?.createCard(cardsToImport)
      if (response?.error) {
        console.error('Failed to import cards:', response.error)
      }
      else {
        console.log('Cards imported successfully:', response?.data)
        refetch()
      }
    }
    catch (error) {
      console.error('Failed to import cards:', error)
    }
  }

  const onClickDownloadSampleFile = () => {
    const sampleCards: SpreadsheetCardRepresentation[] = Array.from({ length: 5 }).map(() => {
      const sampleCard = faker.tedrisat.card()
      return {
        ...sampleCard,
        id: sampleCard.id,
        author: sampleCard.author,
        front: sampleCard?.content?.front || 'Front word',
        back: sampleCard?.content?.back || 'Back word',
        note: sampleCard?.content?.note || 'Note',
      }
    })

    const worksheet = XLSX.utils.json_to_sheet(sampleCards)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SampleCards')
    XLSX.writeFile(workbook, 'sample_cards.xlsx')
  }

  return (
    <div className="container py-10">
      <TableHeader onClickDownloadSampleFile={onClickDownloadSampleFile} onDeckFileImport={onDeckFileImport} />
      <DataTable
        columns={columns}
        data={localCards || []}
        onRowUpdate={onRowUpdate}
      />
    </div>
  )
}
