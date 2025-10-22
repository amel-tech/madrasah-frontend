import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon, CaretDownIcon } from "@madrasah/icons"

import { cn } from "@madrasah/ui/lib/utils"
import { Badge } from "../components/badge"

const tagsInputVariants = cva(
  "flex min-h-9 w-full flex-wrap gap-2 rounded-md border border-input bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
  {
    variants: {
      variant: {
        default: "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        destructive: "border-destructive focus-within:border-destructive focus-within:ring-destructive/20 dark:focus-within:ring-destructive/40",
      },
      size: {
        default: "min-h-9 px-3 py-2",
        sm: "min-h-8 px-2.5 py-1.5 text-sm",
        lg: "min-h-10 px-4 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const tagVariants = cva(
  "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

interface TagsInputProps
  extends Omit<React.ComponentProps<"div">, "onChange" | "value">,
  VariantProps<typeof tagsInputVariants> {
  value?: string[]
  defaultValue?: string[]
  onChange?: (tags: string[]) => void
  onTagAdd?: (tag: string) => void
  onTagRemove?: (tag: string, index: number) => void
  placeholder?: string
  maxTags?: number
  allowDuplicates?: boolean
  tagVariant?: VariantProps<typeof tagVariants>["variant"]
  suggestions?: string[]
  separators?: string[]
  disabled?: boolean
  readOnly?: boolean
  autoFocus?: boolean
  name?: string
  id?: string
  showDropdownTrigger?: boolean
  dropdownPlaceholder?: string
}

const TagsInput = React.forwardRef<HTMLDivElement, TagsInputProps>(
  (
    {
      className,
      variant,
      size,
      value,
      defaultValue = [],
      onChange,
      onTagAdd,
      onTagRemove,
      placeholder = "Type and press Enter to add tags...",
      maxTags,
      allowDuplicates = false,
      tagVariant = "default",
      suggestions = [],
      separators = [",", ";"],
      disabled = false,
      readOnly = false,
      autoFocus = false,
      name,
      id,
      showDropdownTrigger = false,
      dropdownPlaceholder = "",
      ...props
    },
    ref,
  ) => {
    const [tags, setTags] = React.useState<string[]>(value || defaultValue)
    const [inputValue, setInputValue] = React.useState("")
    const [activeTagIndex, setActiveTagIndex] = React.useState<number | null>(null)
    const [showSuggestions, setShowSuggestions] = React.useState(false)
    const [activeSuggestionIndex, setActiveSuggestionIndex] = React.useState(0)
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)

    const inputRef = React.useRef<HTMLInputElement>(null)
    const containerRef = React.useRef<HTMLDivElement>(null)

    // Controlled vs uncontrolled
    const isControlled = value !== undefined
    const currentTags = isControlled ? value : tags

    // Filter suggestions based on input or show all for dropdown
    const filteredSuggestions = React.useMemo(() => {
      if (isDropdownOpen && !inputValue.trim()) {
        // Show all available suggestions when dropdown is opened without input
        return suggestions.filter(
          suggestion => allowDuplicates || !currentTags.includes(suggestion),
        )
      }
      if (!inputValue.trim()) return []
      return suggestions.filter(
        suggestion =>
          suggestion.toLowerCase().includes(inputValue.toLowerCase())
          && (allowDuplicates || !currentTags.includes(suggestion)),
      )
    }, [inputValue, suggestions, currentTags, allowDuplicates, isDropdownOpen])

    const updateTags = React.useCallback(
      (newTags: string[]) => {
        if (!isControlled) {
          setTags(newTags)
        }
        onChange?.(newTags)
      },
      [isControlled, onChange],
    )

    const addTag = React.useCallback(
      (tag: string) => {
        const trimmedTag = tag.trim()
        if (!trimmedTag) return

        if (maxTags && currentTags.length >= maxTags) return
        if (!allowDuplicates && currentTags.includes(trimmedTag)) return

        const newTags = [...currentTags, trimmedTag]
        updateTags(newTags)
        onTagAdd?.(trimmedTag)
        setInputValue("")
        setShowSuggestions(false)
        setIsDropdownOpen(false)
        setActiveSuggestionIndex(0)
      },
      [currentTags, maxTags, allowDuplicates, updateTags, onTagAdd],
    )

    const removeTag = React.useCallback(
      (index: number) => {
        const tagToRemove = currentTags[index] || ""
        const newTags = currentTags.filter((_, i) => i !== index)
        updateTags(newTags)
        onTagRemove?.(tagToRemove, index)
        setActiveTagIndex(null)
        inputRef.current?.focus()
      },
      [currentTags, updateTags, onTagRemove],
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)
      const shouldShow = (newValue.trim().length > 0 || isDropdownOpen) && filteredSuggestions.length > 0
      setShowSuggestions(shouldShow)
      setActiveSuggestionIndex(0)
    }

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return

      switch (e.key) {
        case "Enter":
        case "Tab":
          e.preventDefault()
          if (showSuggestions && filteredSuggestions[activeSuggestionIndex]) {
            addTag(filteredSuggestions[activeSuggestionIndex])
          }
          else if (inputValue.trim()) {
            addTag(inputValue)
          }
          break

        case "Backspace":
          if (!inputValue && currentTags.length > 0) {
            if (activeTagIndex !== null) {
              removeTag(activeTagIndex)
            }
            else {
              setActiveTagIndex(currentTags.length - 1)
            }
          }
          break

        case "Delete":
          if (activeTagIndex !== null) {
            removeTag(activeTagIndex)
          }
          break

        case "ArrowLeft":
          if (!inputValue && currentTags.length > 0) {
            e.preventDefault()
            setActiveTagIndex(prev =>
              prev === null ? currentTags.length - 1 : Math.max(0, prev - 1),
            )
          }
          break

        case "ArrowRight":
          if (!inputValue && activeTagIndex !== null) {
            e.preventDefault()
            if (activeTagIndex === currentTags.length - 1) {
              setActiveTagIndex(null)
              inputRef.current?.focus()
            }
            else {
              setActiveTagIndex(activeTagIndex + 1)
            }
          }
          break

        case "ArrowDown":
          if (showSuggestions) {
            e.preventDefault()
            setActiveSuggestionIndex(prev =>
              prev < filteredSuggestions.length - 1 ? prev + 1 : 0,
            )
          }
          break

        case "ArrowUp":
          if (showSuggestions) {
            e.preventDefault()
            setActiveSuggestionIndex(prev =>
              prev > 0 ? prev - 1 : filteredSuggestions.length - 1,
            )
          }
          break

        case "Escape":
          setShowSuggestions(false)
          setIsDropdownOpen(false)
          setActiveTagIndex(null)
          break

        default:
          // Handle separators
          if (separators.includes(e.key)) {
            e.preventDefault()
            if (inputValue.trim()) {
              addTag(inputValue)
            }
          }
          break
      }
    }

    const handleContainerClick = () => {
      if (!disabled && !readOnly) {
        inputRef.current?.focus()
        // Show dropdown when container is clicked, like a select
        if (suggestions.length > 0) {
          setShowSuggestions(true)
          if (!inputValue.trim()) {
            setIsDropdownOpen(true)
          }
        }
      }
    }

    const handleSuggestionClick = (suggestion: string) => {
      addTag(suggestion)
      inputRef.current?.focus()
    }

    const handleDropdownToggle = () => {
      if (disabled || readOnly) return

      const newIsOpen = !isDropdownOpen
      setIsDropdownOpen(newIsOpen)

      if (newIsOpen) {
        setShowSuggestions(suggestions.length > 0)
        setActiveSuggestionIndex(0)
        inputRef.current?.focus()
      }
      else {
        setShowSuggestions(false)
      }
    }

    React.useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus()
      }
    }, [autoFocus])

    // Sync external value changes
    React.useEffect(() => {
      if (isControlled && value) {
        setTags(value)
      }
    }, [value, isControlled])

    return (
      <div className="relative">
        <div
          ref={ref}
          data-slot="tags-input"
          className={cn(tagsInputVariants({ variant, size }), className)}
          onClick={handleContainerClick}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (disabled || readOnly) return
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              inputRef.current?.focus()
            }
          }}
          tabIndex={disabled || readOnly ? -1 : 0}
          role="button"
          aria-disabled={disabled || readOnly}
          {...props}
        >
          {currentTags.map((tag, index) => (
            <Badge
              key={`${tag}-${index}`}
              variant={tagVariant}
              className={cn(
                "cursor-default select-none",
                activeTagIndex === index && "ring-2 ring-ring ring-offset-1",
                !disabled && !readOnly && "group",
              )}
              onClick={(e) => {
                e.stopPropagation()
                if (!disabled && !readOnly) {
                  setActiveTagIndex(index)
                }
              }}
            >
              {tag}
              {!disabled && !readOnly && (
                <button
                  type="button"
                  className="ml-1 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-ring"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeTag(index)
                  }}
                  aria-label={`Remove ${tag} tag`}
                >
                  <XIcon className="size-3" />
                </button>
              )}
            </Badge>
          ))}

          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onFocus={() => {
              setActiveTagIndex(null)
              // Show dropdown on focus if there are suggestions available
              if (suggestions.length > 0) {
                setShowSuggestions(true)
                if (!inputValue.trim()) {
                  setIsDropdownOpen(true)
                }
              }
            }}
            onBlur={(e) => {
              // Don't hide if clicking on dropdown trigger or suggestions
              const relatedTarget = e.relatedTarget as HTMLElement
              if (relatedTarget && containerRef.current?.contains(relatedTarget)) {
                return
              }
              // Delay hiding suggestions to allow clicking
              setTimeout(() => {
                setShowSuggestions(false)
                setIsDropdownOpen(false)
              }, 150)
            }}
            placeholder={currentTags.length === 0 ? placeholder : ""}
            disabled={disabled}
            readOnly={readOnly}
            name={name}
            id={id}
            className="flex-1 min-w-[120px] bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
            aria-label="Add tags"
            aria-describedby={`${id}-description`}
            aria-expanded={showSuggestions}
            aria-autocomplete="list"
            role="combobox"
            aria-controls={showSuggestions ? `${id}-suggestions` : undefined}
          />

          {/* Dropdown trigger button */}
          {showDropdownTrigger && suggestions.length > 0 && (
            <button
              type="button"
              className={cn(
                "ml-2 flex items-center justify-center rounded-sm p-1 transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-ring",
                disabled || readOnly ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
              )}
              onClick={handleDropdownToggle}
              disabled={disabled || readOnly}
              aria-label={isDropdownOpen ? "Close suggestions" : "Open suggestions"}
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
            >
              <CaretDownIcon
                className={cn(
                  "size-4 transition-transform duration-200",
                  isDropdownOpen && "rotate-180",
                )}
              />
            </button>
          )}

          {/* Hidden input for form submission */}
          {name && (
            <input
              type="hidden"
              name={name}
              value={currentTags.join(",")}
            />
          )}
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div
            ref={containerRef}
            className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-popover shadow-md animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
            role="listbox"
            id={`${id}-suggestions`}
          >
            <div className="p-1">
              {isDropdownOpen && !inputValue.trim() && dropdownPlaceholder && (
                <div className="px-2 py-1.5 text-xs text-muted-foreground border-b border-border mb-1">
                  {dropdownPlaceholder}
                </div>
              )}
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={suggestion}
                  type="button"
                  className={cn(
                    "w-full text-left px-2 py-1.5 text-sm rounded-sm transition-colors focus:outline-none",
                    index === activeSuggestionIndex
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent hover:text-accent-foreground",
                  )}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={() => setActiveSuggestionIndex(index)}
                  role="option"
                  aria-selected={index === activeSuggestionIndex}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Screen reader description */}
        <div id={`${id}-description`} className="sr-only">
          Use Enter, Tab, or comma to add tags. Use Backspace to remove the last tag. Use arrow keys to navigate between tags.
        </div>
      </div>
    )
  },
)

TagsInput.displayName = "TagsInput"

export { TagsInput, tagsInputVariants, tagVariants }
export type { TagsInputProps }
