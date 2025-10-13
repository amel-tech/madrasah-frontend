import React from "react"
import { Label } from "../components/label"
import { Input } from "../components/input"
import { FieldValues, Path, Control } from "react-hook-form"
import { FormField, FormItem } from "./form"

interface IATFormGroupProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  label?: string
  wrapperClass?: string
  placeholder?: string
  required?: boolean
  control: Control<T>
  type?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

function ATFormGroup<T extends FieldValues = FieldValues>({
  name,
  label,
  wrapperClass = "mb-4",
  placeholder,
  type = "text",
  control,
  required,
  onChange,
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
          <Input
            key={name as string}
            type={type}
            placeholder={placeholder}
            {...field}
            className={error ? "border-red-500 focus-visible:border-red-500" : ""}
            {...(onChange && { onChange: onChange })}
          />
          {error && (<small className="text-red-500 text-xs">{error.message}</small>)}
        </FormItem>
      )}
    />

  )
}

export default ATFormGroup
