'use client'

import { ColumnDef } from '@tanstack/react-table'
import { FlashcardDeckResponse } from '@madrasah/services/tedrisat'

export const columns: ColumnDef<FlashcardDeckResponse>[] = [
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
