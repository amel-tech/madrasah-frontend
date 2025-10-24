import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@madrasah/ui/components/select'
import { Skeleton } from '@madrasah/ui/components/skeleton'
import { cn } from '@madrasah/ui/lib/utils'

export const EditableSelect: React.FC<{
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  options: Array<{ value: string, label: string }>
  placeholder?: string
  disabled?: boolean
  className?: string
  isLoading?: boolean
}> = ({ value, onChange, onBlur, options, placeholder, disabled, className, isLoading }) => {
  if (isLoading) {
    return (
      <Skeleton className={cn('h-8 w-full', className)} />
    )
  }

  return (
    <Select
      value={value}
      onValueChange={onChange}
      onOpenChange={open => !open && onBlur()}
      disabled={disabled}
    >
      <SelectTrigger className={cn('border border-transparent shadow-none focus-visible:border focus-visible:border-gray-200', className)}>
        <SelectValue placeholder={placeholder || 'Select...'} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function createSelectColumn<TData>(
  accessorKey: keyof TData,
  columnDef: ColumnDef<TData>,
  options: {
    value: keyof TData
    options?: Array<{ value: string, label: string }>
    optionsProvider?: (data: TData[], rowIndex: number) => Array<{ value: string, label: string }>
    placeholder?: string
    disabled?: boolean
    className?: string
  },
): ColumnDef<TData> {
  return {
    accessorKey: accessorKey as string,
    ...columnDef,
    meta: {
      inputType: 'select',
      ...options,
    },
  }
}
