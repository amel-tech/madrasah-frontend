'use client'

import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { FlashcardDeckResponse } from '@madrasah/services/tedrisat'
import { createInputColumn } from '~/components/data-table/editable'
import { useTranslations } from 'next-intl'

export function useDecksColumns() {
  const t = useTranslations('nizam')

  return React.useMemo<ColumnDef<FlashcardDeckResponse>[]>(() => [
    {
      accessorKey: 'title',
      header: t('DecksPage.Table.titleColumn'),
      cell: ({ row }) => row.original.title,
    },
    createInputColumn<FlashcardDeckResponse>(
      'description',
      { header: t('DecksPage.Table.descriptionColumn'),
      },
      {
        placeholder: 'Enter deck description...',
      },
    ),
  ], [])
}
