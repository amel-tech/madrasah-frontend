'use client'

import { useRouter } from 'next/navigation'
import { columns } from './columns'
import { DataTable } from '~/components/data-table'
import { FlashcardDeckResponse } from '@madrasah/services/tedrisat'

export default function Decks({
  decks,
}: {
  decks: FlashcardDeckResponse[]
}) {
  const router = useRouter()

  const handleRowClick = (deck: FlashcardDeckResponse) => {
    router.push(`/decks/${deck.id}/cards`)
  }

  return (
    <div>
      <DataTable
        columns={columns}
        data={decks}
        onRowClick={handleRowClick}
      />
    </div>
  )
}
