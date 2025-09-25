'use client'

import { useState, useEffect, use } from 'react'
import * as XLSX from 'xlsx'

import { columns } from './components/columns'
import { DataTable } from '~/components/data-table'
import { TableHeader } from './components/table-header'
import { getTedrisatMock } from '~/lib/mock-data'
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
  params: Promise<{
    id: string
  }>
}) {
  const { id } = use(params)

  const [localCards, setLocalCards] = useState<Card[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Sync local cards with server data
  useEffect(() => {
    async function loadMockData() {
      try {
        const data = await getTedrisatMock()
        setLocalCards(data.cards as Card[])
      }
      catch (error) {
        console.error('Failed to load mock data:', error)
      }
      finally {
        setIsLoading(false)
      }
    }

    loadMockData()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const onRowUpdate = async (updatedRow: Card) => {
    console.log('Row updated:', updatedRow)
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

    setLocalCards(prevCards => [...prevCards, ...cardsToImport])
  }

  const onClickDownloadSampleFile = () => {
    const sampleCards: SpreadsheetCardRepresentation[] = Array.from({ length: 5 }).map(() => {
      const sampleCard = localCards[0] || {
        id: 1,
        author: 'Sample Author',
        type: 'vocabulary' as const,
        is_public: true,
        content: { front: 'Front word', back: 'Back word', note: 'Note' },
        image_source: '',
        deck_id: Number(id),
      }
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
