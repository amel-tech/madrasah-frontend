import React from "react"
import { Label } from "@madrasah/ui/components/label"
import { cn } from "@madrasah/ui/lib/utils"
import { FormField, FormItem } from "./form"
import { Control, FieldValues, Path } from "react-hook-form"
import { TagsInput, type TagsInputProps } from "./tags-input"

interface IATFormGroupTagsInputProps<T extends FieldValues = FieldValues>
  extends Omit<TagsInputProps, "id" | "value" | "onChange" | "name"> {
  name: Path<T>
  label?: string
  wrapperClass?: string
  description?: string
  required?: boolean
  control: Control<T>
}

function ATFormGroupTagsInput<T extends FieldValues = FieldValues>({
  name,
  label,
  wrapperClass = "mb-4",
  description,
  required,
  control,
  className,
  ...rest
}: IATFormGroupTagsInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={cn(wrapperClass)}>
          {label && (
            <Label htmlFor={name as string} className="mb-3">
              {label}
              {required && <span className="text-red-500">*</span>}
            </Label>
          )}

          {description && (
            <p className="text-sm text-muted-foreground mb-2">
              {description}
            </p>
          )}

          <TagsInput
            id={name}
            value={field.value || []}
            onChange={field.onChange}
            className={cn(
              error && "border-red-500 focus-within:border-red-500",
              className,
            )}
            variant={error ? "destructive" : "default"}
            {...rest}
          />

          {error && (
            <small className="text-red-500 text-xs">{error.message}</small>
          )}
        </FormItem>
      )}
    />
  )
}

export default ATFormGroupTagsInput
export type { IATFormGroupTagsInputProps }
