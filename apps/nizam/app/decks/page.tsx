'use client'

import { useRouter } from 'next/navigation'
import { columns } from './components/columns'
import { DataTable } from '~/components/data-table'
import { useQuery } from '~/hooks/useQuery'
import { Deck } from '@madrasah/services/tedrisat'

export default function DecksPage() {
  const router = useRouter()
  const { data: decks, error, isLoading } = useQuery(api => api.getDecks())

  const handleRowClick = (deck: Deck) => {
    router.push(`/decks/${deck.id}/cards`)
  }

  if (error) {
    return <div>Error loading cards</div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container py-10">
      <DataTable
        columns={columns}
        data={decks || []}
        onRowClick={handleRowClick}
      />
    </div>
  )
}
