import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Skeleton } from '@madrasah/ui/components/skeleton'
import { cn } from '@madrasah/ui/lib/utils'

export const EditableTextarea: React.FC<{
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
      <Skeleton className={cn('h-16 w-full', className)} />
    )
  }

  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={disabled}
      className={cn('border-0 shadow-none focus-visible:ring-0 p-1 resize-none', className)}
      rows={2}
    />
  )
}

export function createTextareaColumn<TData>(
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
      inputType: 'textarea',
      ...options,
    },
  }
}
