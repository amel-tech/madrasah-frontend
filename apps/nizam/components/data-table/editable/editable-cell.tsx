import { ColumnDef, CellContext } from '@tanstack/react-table'
import React from 'react'

import { EditableInput } from './editable-input'
import { EditableSelect } from './editable-select'
import { EditableTextarea } from './editable-textarea'
import { EditableSwitch } from './editable-switch'

export function EditableCell<TData>(props: CellContext<TData, unknown>) {
  const { getValue, row: { index }, column: { id }, table, column: { columnDef } } = props
  const [initialValue, setInitialValue] = React.useState(getValue())
  const [value, setValue] = React.useState(initialValue)

  // Get column configuration
  const meta = columnDef.meta
  const inputType = meta?.inputType || 'input'
  const options = meta?.options || []
  const optionsProvider = meta?.optionsProvider
  const placeholder = meta?.placeholder
  const disabled = meta?.disabled
  const className = meta?.className

  // Check if this cell is currently loading
  const cellId = `${index}-${id}`
  const isLoading = table.options.meta?.loadingCells?.has(cellId) || false

  // Get dynamic options if provider is available
  const dynamicOptions = optionsProvider
    ? optionsProvider(table.options.data || [], index)
    : options

  // When the input is blurred, we'll call our table meta's updateData function
  const handleSave = () => {
    // Only trigger update if the value has actually changed
    if (value !== initialValue) {
      table.options.meta?.updateData(index, id, value)
      setInitialValue(value)
    }
  }

  // If the initialValue is changed externally, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleChange = (newValue: string | boolean) => {
    setValue(newValue)
  }

  // Render different input types based on configuration
  switch (inputType) {
    case 'select':
      return (
        <EditableSelect
          value={value as string}
          onChange={handleChange}
          onBlur={handleSave}
          options={dynamicOptions}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          className={className}
          isLoading={isLoading}
        />
      )
    case 'textarea':
      return (
        <EditableTextarea
          value={value as string}
          onChange={handleChange}
          onBlur={handleSave}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          className={className}
          isLoading={isLoading}
        />
      )
    case 'switch':
      return (
        <EditableSwitch
          value={value as boolean}
          onChange={handleChange}
          onBlur={handleSave}
          disabled={disabled || isLoading}
          className={className}
          isLoading={isLoading}
        />
      )
    case 'input':
    default:
      return (
        <EditableInput
          value={value as string}
          onChange={handleChange}
          onBlur={handleSave}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          className={className}
          isLoading={isLoading}
        />
      )
  }
}

export function createDefaultColumn<TData>(): Partial<ColumnDef<TData>> {
  return {
    cell: props => <EditableCell {...props} />,
  }
}
