'use client'

import { useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@madrasah/ui/components/table'

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowUpdate?: (updatedRow: TData) => Promise<boolean> | void
  onRowClick?: (row: TData) => void
  onRowDelete?: (id: number) => Promise<boolean> | void
  options?: TableOptions<TData>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowUpdate,
  onRowClick,
  onRowDelete,
  options,
}: DataTableProps<TData, TValue>) {
  const [loadingCells, setLoadingCells] = useState<Set<string>>(new Set())

  // Enhanced update function that handles loading state
  const handleRowUpdate = async (updatedRow: TData, cellId?: string) => {
    if (!onRowUpdate) return

    // If cellId is provided, track loading for that specific cell
    if (cellId) {
      setLoadingCells(prev => new Set([...prev, cellId]))
    }

    try {
      const result = onRowUpdate(updatedRow)

      // If it's a promise, wait for it to complete
      if (result instanceof Promise) {
        await result
      }
    }
    finally {
      // Remove loading state for the cell
      if (cellId) {
        setLoadingCells((prev) => {
          const newSet = new Set(prev)
          newSet.delete(cellId)
          return newSet
        })
      }
    }
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      size: 500,
      minSize: 50,
      maxSize: 300,
    },
    meta: {
      updateData: handleRowUpdate,
      onRowClick: onRowClick,
      onRowDelete: onRowDelete,
      loadingCells: loadingCells,
    },
    ...options,
  })

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length
            ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className={onRowClick ? 'cursor-pointer hover:bg-muted/50' : ''}
                    onClick={() => onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell
                        key={cell.id}
                        style={{ width: cell.column.getSize() }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )
            : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
        </TableBody>
      </Table>
    </div>
  )
}
