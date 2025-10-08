import React from "react"
import { Label } from "../components/label"
import { Input } from "../components/input"
import { FieldValues, UseFormReturn, Path } from "react-hook-form"
import { FormField, FormItem } from "./form"

interface IATFormGroupProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  label?: string
  wrapperClass?: string
  placeholder?: string
  required?: boolean
  form: UseFormReturn<T>
  type?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

function ATFormGroup<T extends FieldValues = FieldValues>({
  name,
  label,
  wrapperClass = "mb-4",
  placeholder,
  type = "text",
  form,
  required,
  onChange,
}: IATFormGroupProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={wrapperClass}>
          {label && (
            <Label htmlFor={name as string} className="mb-3">
              {label}
              {required && <span className="text-red-500">*</span>}
            </Label>
          )}
          <Input
            key={name as string}
            type={type}
            placeholder={placeholder}
            {...field}
            {...(onChange && { onChange: onChange })}
          />
        </FormItem>
      )}
    />

  )
}

export default ATFormGroup
