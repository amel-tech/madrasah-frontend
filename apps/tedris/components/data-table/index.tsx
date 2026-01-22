'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
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
  defaultColumn?: Partial<ColumnDef<TData, TValue>>
  onRowUpdate?: (updatedRow: TData) => Promise<boolean> | void
  onRowClick?: (row: TData) => void
  onRowDelete?: (id: string) => Promise<boolean> | void
  options?: TableOptions<TData>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  defaultColumn,
  onRowUpdate,
  onRowClick,
  onRowDelete,
  options,
}: DataTableProps<TData, TValue>) {
  const t = useTranslations('tedris')
  const [tableData, setTableData] = useState<TData[]>(data)
  const [loadingCells, setLoadingCells] = useState<Set<string>>(new Set())

  // Update table data when props change
  useState(() => {
    setTableData(data)
  })

  useEffect(() => {
    setTableData(data)
  }, [data])

  // TanStack Table style updateData function
  const handleUpdateData = async (rowIndex: number, columnId: string, value: unknown) => {
    const cellId = `${rowIndex}-${columnId}`

    // Track loading for this specific cell
    setLoadingCells(prev => new Set([...prev, cellId]))

    try {
      if (onRowUpdate) {
        const updatedRow = {
          ...tableData[rowIndex],
          [columnId]: value,
        }

        const result = onRowUpdate(updatedRow as TData)
        if (result instanceof Promise) {
          await result
        }
      }
    }
    catch (error) {
      // Revert optimistic update on error
      setTableData(data)
      console.error('Failed to update row:', error)
    }
    finally {
      // Remove loading state for the cell
      setLoadingCells((prev) => {
        const newSet = new Set(prev)
        newSet.delete(cellId)
        return newSet
      })
    }
  }

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: (defaultColumn as Partial<ColumnDef<TData, unknown>>) || {
      size: 200,
      minSize: 50,
      maxSize: 200,
    },
    meta: {
      updateData: handleUpdateData,
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
                    {t('DataTable.noResults')}
                  </TableCell>
                </TableRow>
              )}
        </TableBody>
      </Table>
    </div>
  )
}
