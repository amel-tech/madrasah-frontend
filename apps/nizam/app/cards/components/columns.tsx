'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MemoryCard } from '@madrasah/types'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<MemoryCard>[] = [
  {
    accessorKey: 'front',
    header: 'Front face',
  },
  {
    accessorKey: 'back',
    header: 'Back face',
  },
  {
    accessorKey: 'note',
    header: 'Note',
  },
]
