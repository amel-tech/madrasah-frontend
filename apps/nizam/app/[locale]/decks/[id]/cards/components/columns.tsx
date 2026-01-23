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
  const t = useTranslations('nizam')
  return React.useMemo<ColumnDef<FlashcardResponse>[]>(() => [
    createTextareaColumn(
      'contentFront',
      { header: t('FlashcardColumns.frontFace') },
      {
        placeholder: t('FlashcardColumns.frontFacePlaceholder'),
        className: '!text-lg',
      },
    ),
    createTextareaColumn(
      'contentBack',
      { header: t('FlashcardColumns.backFace') },
      {
        placeholder: t('FlashcardColumns.backFacePlaceholder'),
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
                  {t('FlashcardColumns.areYouSure')}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {t('FlashcardColumns.deleteConfirmation')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('TableHeader.cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={
                  () => table.options.meta?.onRowDelete?.(row.original.id)
                }
                >
                  {t('FlashcardColumns.delete')}
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
