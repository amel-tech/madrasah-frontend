'use client'

import { useRouter } from 'next/navigation'
import { columns } from './components/columns'
import { DataTable } from '~/components/data-table'
import { Deck } from '@madrasah/services/tedrisat'
import { getTedrisatMock } from '~/lib/mock-data'
import { useEffect, useState } from 'react'

export default function DecksPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [decks, setDecks] = useState<Deck[]>([])

  useEffect(() => {
    async function loadMockData() {
      try {
        const mockData = await getTedrisatMock()
        setDecks(mockData.decks)
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

  const handleRowClick = (deck: Deck) => {
    router.push(`/decks/${deck.id}/cards`)
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
