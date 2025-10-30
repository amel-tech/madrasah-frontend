import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Skeleton } from '@madrasah/ui/components/skeleton'
import { cn } from '@madrasah/ui/lib/utils'
import { Switch } from '@madrasah/ui/components/switch'

export const EditableSwitch: React.FC<{
  value: boolean
  onChange: (value: boolean) => void
  onBlur: () => void
  disabled?: boolean
  className?: string
  isLoading?: boolean
}> = ({ value, onChange, onBlur, disabled, className, isLoading }) => {
  if (isLoading) {
    return (
      <Skeleton className={cn('h-8 w-full', className)} />
    )
  }

  const handleChange = (checked: boolean) => {
    onChange(checked)
  }

  return (
    <Switch
      checked={value}
      disabled={disabled}
      onCheckedChange={handleChange}
      onBlur={onBlur}
    />
  )
}

export function createSwitchColumn<TData>(
  accessorKey: keyof TData,
  columnDef: ColumnDef<TData>,
  options: {
    value: keyof TData
    options?: Array<{ value: boolean, label: string }>
    optionsProvider?: (data: TData[], rowIndex: number) => Array<{ value: boolean, label: string }>
    placeholder?: string
    disabled?: boolean
    className?: string
  },
): ColumnDef<TData> {
  return {
    accessorKey: accessorKey as string,
    ...columnDef,
    meta: {
      inputType: 'switch',
      ...options,
    },
  }
}
