import React from "react"
import { Label } from "@madrasah/ui/components/label"
import { Textarea } from "@madrasah/ui/components/textarea"
import { cn } from "@madrasah/ui/lib/utils"
import { FormField, FormItem } from "./form"
import { Control, FieldValues, Path } from "react-hook-form"

interface IATFormGroupTextAreaProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  label?: string
  wrapperClass?: string
  placeholder?: string
  required?: boolean
  rows?: number
  control: Control<T>
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
  control,
  inputClassName = "",
  onChange,
}: IATFormGroupTextAreaProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
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
            className={`${inputClassName} ${error ? "border-red-500 focus-visible:border-red-500" : ""}`}
            {...field}
            {...(onChange && { onChange: onChange })}
          />
          {error && (<small className="text-red-500 text-xs">{error.message}</small>)}
        </FormItem>
      )}
    />
  )
}

export default ATFormGroupTextArea
