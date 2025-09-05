import { columns } from './components/columns'
import { MemoryCard } from '@madrasah/types'
import { DataTable } from './components/data-table'

async function getData(): Promise<MemoryCard[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      front: 'Front of card 1',
      back: 'Back of card 1',
      note: 'Note for card 1',
      type: 'hadith',
    },
  ]
}

export default async function CardsPage() {
  const data = await getData()

  return (
    <div className="container py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
