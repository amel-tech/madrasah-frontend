'use client'

import { EditableCell } from './editable-cell'
import { ColumnDef } from '@tanstack/react-table'
import { FlashcardResponse } from '@madrasah/services/tedrisat'
import { Button } from '@madrasah/ui/components/button'
import { TrashIcon } from '@madrasah/icons'

export const columns: ColumnDef<FlashcardResponse>[] = [
  {
    id: 'front',
    accessorFn: row => row.contentFront,
    header: 'Front face',
    cell: props => (
      <EditableCell
        className="w-full truncate font-medium"
        {...props}
      />
    ),
  },
  {
    id: 'back',
    accessorFn: row => row.contentBack,
    header: 'Back face',
    cell: props => (
      <EditableCell
        {...props}
      />
    ),
    size: 300,
    minSize: 200,
    maxSize: 400,
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const onRowDelete = table.options.meta?.onRowDelete

      return (
        <div className="flex items-center justify-center">
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation()
              onRowDelete?.(row.original.id)
            }}
            disabled={!onRowDelete}
          >
            <TrashIcon size={24} />
          </Button>
        </div>
      )
    },
    size: 50,
    minSize: 50,
    maxSize: 100,
  },
]
