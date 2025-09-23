import React from "react"
import { Label } from "../components/label"
import { Input } from "../components/input"

interface IATFormGroupProps {
  id: string
  label?: string
  wrapperClass?: string
  placeholder?: string
  required?: boolean
  type?: string
  value: string | number
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

function ATFormGroup({
  id,
  label,
  wrapperClass = "mb-4",
  placeholder,
  type = "text",
  required,
  value,
  onChange,
}: IATFormGroupProps) {
  return (
    <div className={wrapperClass}>
      {label && (
        <Label htmlFor={id} className="mb-3">
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Input
        key={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default ATFormGroup
