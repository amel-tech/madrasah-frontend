import React from "react"
import { Label } from "../components/label"
import { Textarea } from "../components/textarea"
import { cn } from "../lib/utils"
import { FormField, FormItem } from "./form"
import { FieldValues, Path, UseFormReturn } from "react-hook-form"

interface IATFormGroupTextAreaProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  label?: string
  wrapperClass?: string
  placeholder?: string
  required?: boolean
  rows?: number
  form: UseFormReturn<T>
  inputClassName?: string
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
}

function ATFormGroupTextArea<T extends FieldValues = FieldValues>({
  name,
  label,
  wrapperClass = "mb-4",
  placeholder,
  required,
  rows = 4,
  form,
  inputClassName = "",
  onChange,
}: IATFormGroupTextAreaProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(wrapperClass)}>
          {label && (
            <Label htmlFor={name} className="mb-3">
              {label}
              {required && <span className="text-red-500">*</span>}
            </Label>
          )}

          <Textarea
            key={name}
            placeholder={placeholder}
            rows={rows}
            className={inputClassName}
            {...field}
            {...(onChange && { onChange: onChange })}
          />
        </FormItem>
      )}
    />
  )
}

export default ATFormGroupTextArea
