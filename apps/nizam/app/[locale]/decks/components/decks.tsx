'use client'

import { useRouter } from 'next/navigation'
import { useDecksColumns } from './columns'
import { DataTable } from '~/components/data-table'
import { FlashcardDeckResponse } from '@madrasah/services/tedrisat'
import { createDefaultColumn } from '~/components/data-table/editable'

export default function Decks({
  decks,
}: {
  decks: FlashcardDeckResponse[]
}) {
  const router = useRouter()
  const columns = useDecksColumns()

  const handleRowClick = (row: FlashcardDeckResponse) => {
    router.push(`/decks/${row.id}/cards`)
  }

  const defaultColumn = createDefaultColumn<FlashcardDeckResponse>()

  return (
    <div>
      <DataTable
        columns={columns}
        data={decks}
        defaultColumn={defaultColumn}
        onRowClick={handleRowClick}
      />
    </div>
  )
}
