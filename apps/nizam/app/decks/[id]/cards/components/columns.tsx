'use client'

import { useState } from 'react'
import { ColumnDef, CellContext } from '@tanstack/react-table'
import { Card } from '@madrasah/services/tedrisat'
import { Input } from '@madrasah/ui/components/input'
import { cn } from '@madrasah/ui/lib/utils'

// Editable Cell Component
function EditableCell({
  getValue,
  row,
  column,
  table,
  className,
}: CellContext<Card, unknown> & { className?: string }) {
  const initialValue = getValue<string>()
  const [value, setValue] = useState<string>(initialValue || '')
  const [isEditing, setIsEditing] = useState(false)

  const onBlur = () => {
    setIsEditing(false)
    if (value !== initialValue && table.options.meta?.updateData) {
      const updatedRow = { ...row.original }
      // Handle nested content structure
      if (column.id === 'front') {
        updatedRow.content.front = value
      }
      else if (column.id === 'back') {
        updatedRow.content.back = value
      }
      else if (column.id === 'note') {
        updatedRow.content.note = value
      }
      table.options.meta.updateData(updatedRow)
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
        className={cn(className, 'truncate font-medium')}
        style={{ width: column.getSize() - 16 }} // Adjust for padding
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        autoFocus
      />
    )
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      style={{ width: column.getSize() - 16 }} // Adjust for padding
      className={cn(className, 'truncate font-medium cursor-pointer hover:bg-muted/50 p-1 rounded min-h-[32px] flex items-center')}
    >
      {value || 'Click to edit...'}
    </div>
  )
}

export const columns: ColumnDef<Card>[] = [
  {
    id: 'front',
    accessorFn: row => row.content?.front,
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
    accessorFn: row => row.content?.back,
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
    id: 'note',
    accessorFn: row => row.content?.note,
    header: 'Note',
    cell: props => (
      <EditableCell
        {...props}
      />
    ),
    size: 250,
    minSize: 150,
    maxSize: 300,
  },
]
