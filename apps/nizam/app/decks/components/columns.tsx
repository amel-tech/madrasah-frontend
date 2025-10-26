'use client'

import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { FlashcardDeckResponse } from '@madrasah/services/tedrisat'
import { createInputColumn } from '~/components/data-table/editable'

export function useDecksColumns() {
  return React.useMemo<ColumnDef<FlashcardDeckResponse>[]>(() => [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => row.original.title,
    },
    createInputColumn<FlashcardDeckResponse>(
      'description',
      { header: 'Description' },
      {
        placeholder: 'Enter deck description...',
      },
    ),
  ], [])
}
