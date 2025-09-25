'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Deck } from '@madrasah/services/tedrisat'

export const columns: ColumnDef<Deck>[] = [
  {
    id: 'author',
    accessorFn: row => row.author,
    header: 'Author',
  },
  {
    id: 'title',
    accessorFn: row => row.title,
    header: 'Title',
  },
  {
    id: 'description',
    accessorFn: row => row.description,
    header: 'Description',
    size: 300,
    minSize: 150,
    maxSize: 400,
  },
]
