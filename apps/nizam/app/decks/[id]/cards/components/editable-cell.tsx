import { CellContext } from '@tanstack/react-table'
import { useState } from 'react'
import { Input } from '@madrasah/ui/components/input'
import { cn } from '@madrasah/ui/lib/utils'
import { FlashcardResponse } from '@madrasah/services/tedrisat'
import { Skeleton } from '@madrasah/ui/components/skeleton'

export function EditableCell({
  getValue,
  row,
  column,
  table,
  className,
}: CellContext<FlashcardResponse, unknown> & { className?: string }) {
  const initialValue = getValue<string>()
  const [value, setValue] = useState<string>(initialValue || '')
  const [isEditing, setIsEditing] = useState(false)

  // Generate cell loading key for this specific cell
  const cellId = `${row.original.id}-${column.id}`
  const isLoading = table.options.meta?.loadingCells?.has(cellId) || false

  const onBlur = async () => {
    setIsEditing(false)
    if (value !== initialValue && table.options.meta?.updateData) {
      const updatedRow = { ...row.original }
      // Handle nested content structure
      if (column.id === 'front') {
        updatedRow.contentFront = value
      }
      else if (column.id === 'back') {
        updatedRow.contentBack = value
      }

      // Pass the cellId to track loading for this specific cell
      await table.options.meta.updateData(updatedRow, cellId)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onBlur()
    }
    else if (e.key === 'Escape') {
      setValue(initialValue)
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <Input
        className={cn(className, 'truncate font-medium px-2')}
        style={{ width: column.getSize() - 16 }} // Adjust for padding
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        disabled={isLoading}
        autoFocus
      />
    )
  }

  return (
    <div
      onClick={() => !isLoading && setIsEditing(true)}
      style={{ width: column.getSize() - 16 }} // Adjust for padding
      className={cn(
        className,
        !isLoading && 'border border-transparent hover:cursor-text hover:bg-neutral-secondary hover:border hover:border-neutral-primary',
        'truncate font-medium py-1 rounded min-h-[32px] flex items-center relative px-2',
      )}
    >
      {isLoading
        ? <Skeleton className={cn(className, 'h-8 w-full p-0 m-0 bg-neutral-primary')} />
        : value || 'Click to edit...'}
    </div>
  )
}
