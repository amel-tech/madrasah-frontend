import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { createTextareaColumn } from '~/components/data-table/editable'
import { FlashcardResponse } from '@madrasah/services/tedrisat'
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
import { TrashIcon } from '@madrasah/icons'
import { Button } from '@madrasah/ui/components/button'
import { useTranslations } from 'next-intl'

export function useFlashcardColumns() {
  const t = useTranslations('nizam.DeckCardsPage.Columns')

  return React.useMemo<ColumnDef<FlashcardResponse>[]>(() => [
    createTextareaColumn(
      'contentFront',
      { header: t('frontFace') },
      {
        placeholder: t('frontPlaceholder'),
        className: '!text-lg',
      },
    ),
    createTextareaColumn(
      'contentBack',
      { header: t('backFace') },
      {
        placeholder: t('backPlaceholder'),
        className: 'font-light text-sm',
      },
    ),
    {
      id: 'actions',
      size: 10,
      cell: ({ row, table }) => (
        <div className="flex gap-2 justify-end">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <TrashIcon size={16} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This card and all associated information will be deleted. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('cancelButton')}</AlertDialogCancel>
                <AlertDialogAction onClick={
                  () => table.options.meta?.onRowDelete?.(row.original.id)
                }
                >
                  {t('deleteButton')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
      enableSorting: false,
      enableColumnFilter: false,
    },
  ], [t])
}
