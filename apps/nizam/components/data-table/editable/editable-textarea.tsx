import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Skeleton } from '@madrasah/ui/components/skeleton'
import { cn } from '@madrasah/ui/lib/utils'
import { Textarea } from '@madrasah/ui/components/textarea'

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
    <Textarea
      defaultValue={value}
      onChange={e => onChange(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={disabled}
      className={cn('border border-transparent shadow-none focus-visible:ring-0 p-1 hover:border hover:border-gray-200 resize-none', className)}
    >
    </Textarea>
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
