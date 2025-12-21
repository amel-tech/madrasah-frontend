import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Input } from '@madrasah/ui/components/input'
import { Skeleton } from '@madrasah/ui/components/skeleton'
import { cn } from '@madrasah/ui/lib/utils'

export const EditableInput: React.FC<{
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  placeholder?: string
  disabled?: boolean
  className?: string
  isLoading?: boolean
}> = ({ value, onChange, onBlur, placeholder, disabled, className, isLoading }) => {
  if (isLoading) {
    return (
      <Skeleton className={cn('h-8 w-full', className)} />
    )
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onBlur()
    }
  }

  return (
    <Input
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      onClick={e => e.stopPropagation()}
      className={cn('border border-transparent shadow-none focus-visible:ring-0 p-1 hover:border hover:border-gray-200', className)}
    />
  )
}

export function createInputColumn<TData>(
  accessorKey: keyof TData,
  columnDef: ColumnDef<TData>,
  options?: {
    placeholder?: string
    disabled?: boolean
    className?: string
  },
): ColumnDef<TData> {
  return {
    accessorKey: accessorKey as string,
    ...columnDef,
    meta: {
      inputType: 'input',
      ...options,
    },
  }
}
