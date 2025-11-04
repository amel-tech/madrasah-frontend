import React from "react"
import { Label } from "../components/label"
import { FieldValues, Path, Control } from "react-hook-form"
import { FormField, FormItem } from "./form"
import { Tabs, TabsList, TabsTrigger } from "../components/tabs"

interface IATFormGroupProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  label?: string
  wrapperClass?: string
  required?: boolean
  control: Control<T>
  tabs: TabOption[]
  type?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

interface TabOption {
  value: string | boolean
  label: string
}

function ATFormGroupTabs<T extends FieldValues = FieldValues>({
  name,
  label,
  wrapperClass = "mb-4",
  control,
  tabs,
  required,
  ...rest
}: IATFormGroupProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={wrapperClass}>
          {label && (
            <Label htmlFor={name as string} className="mb-3">
              {label}
              {required && <span className="text-red-500">*</span>}
            </Label>
          )}
          <Tabs
            value={String(field.value)}
            onValueChange={(opt) => {
              if (opt === "true") return field.onChange(true)
              if (opt === "false") return field.onChange(false)
              field.onChange(opt)
            }}
            className="w-[400px]"
            {...rest}
          >
            <TabsList>
              {tabs.map(tab => (
                <TabsTrigger key={tab.label} value={String(tab.value)}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          {error && (<small className="text-red-500 text-xs">{error.message}</small>)}
        </FormItem>
      )}
    />

  )
}

export default ATFormGroupTabs
