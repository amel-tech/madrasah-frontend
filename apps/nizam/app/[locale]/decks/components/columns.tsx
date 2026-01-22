'use client'

import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { FlashcardDeckResponse } from '@madrasah/services/tedrisat'
import { createInputColumn } from '~/components/data-table/editable'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
} from '@madrasah/ui/components/alert-dialog'
import { Button } from '@madrasah/ui/components/button'
import { EyeIcon, TrashIcon } from '@madrasah/icons'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

export function useDecksColumns() {
  const router = useRouter()
  const t = useTranslations('nizam')

  return React.useMemo<ColumnDef<FlashcardDeckResponse>[]>(() => [
    createInputColumn<FlashcardDeckResponse>(
      'title',
      { header: t('DecksPage.Table.titleColumn') },
      {
        placeholder: t('DecksColumns.titlePlaceholder'),
        className: 'font-medium',
      },
    ),
    createInputColumn<FlashcardDeckResponse>(
      'description',
      { header: t('DecksPage.Table.descriptionColumn'),
      },
      {
        placeholder: t('DecksColumns.descriptionPlaceholder'),
        className: 'font-medium',
      },
    ),
    {
      id: 'actions',
      cell: ({ row, table }) => (
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            onClick={() => {
              router.push(`/decks/${row.original.id}/cards`)
            }}
          >
            <EyeIcon
              size={16}
            />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild onClick={e => e.stopPropagation()}>
              <Button variant="outline">
                <TrashIcon size={16} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {t('DecksColumns.areYouSure')}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {t('DecksColumns.deleteConfirmation')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={e => e.stopPropagation()}>{t('TableHeader.cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={
                  (event) => {
                    event.stopPropagation()
                    table.options.meta?.onRowDelete?.(row.original.id)
                  }
                }
                >
                  {t('DecksColumns.delete')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
      enableSorting: false,
      enableColumnFilter: false,
    },
  ], [router, t])
}
