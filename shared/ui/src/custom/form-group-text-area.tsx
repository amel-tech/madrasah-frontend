import React from "react"
import { Label } from "../components/label"
import { Textarea } from "../components/textarea"
import { cn } from "../lib/utils"

interface IATFormGroupTextAreaProps {
  id: string
  label?: string
  wrapperClass?: string
  placeholder?: string
  rows?: number
  inputClassName?: string
  value: string | number
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

function ATFormGroupTextArea({
  id,
  label,
  wrapperClass = "mb-6",
  placeholder,
  rows = 4,
  inputClassName = "",
  value,
  onChange,
}: IATFormGroupTextAreaProps) {
  return (
    <div className={cn(wrapperClass)}>
      {label && (
        <Label htmlFor={id} className="mb-3">
          {label}
        </Label>
      )}

      <Textarea
        key={id}
        placeholder={placeholder}
        rows={rows}
        className={inputClassName}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default ATFormGroupTextArea
