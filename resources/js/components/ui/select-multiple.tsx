"use client"

import { Check, ChevronDown, ChevronLeft, ChevronRight, Loader2, Search, X } from "lucide-react"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { createPortal } from "react-dom"

interface Option {
  value: string
  label: string
  group?: string
}

interface MultipleSelectProps {
  options: Option[]
  placeholder?: string
  onChange: (selectedOptions: string[]) => void
  values?: string[]
  isPending?: boolean
  className?: string
  disabled?: boolean
  itemsPerPage?: number
  maxHeight?: number
}

type DropdownPosition = "bottom" | "top" | "modal"

export const SelectMultiple: React.FC<MultipleSelectProps> = ({
  values = [],
  options,
  placeholder = "Sélectionner les options...",
  onChange,
  isPending = false,
  className,
  disabled = false,
  itemsPerPage = 8,
  maxHeight = 280,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    values.map((value) => options.find((option) => option.value === value)).filter(Boolean) as Option[],
  )
  const [searchTerm, setSearchTerm] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
  const [currentPage, setCurrentPage] = useState(0)
  const [viewMode, setViewMode] = useState<"list" | "grid" | "grouped">("list")
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>("bottom")
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({})

  const wrapperRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Calculate dropdown position based on available space
  const calculateDropdownPosition = useCallback(() => {
    if (!wrapperRef.current) return

    const rect = wrapperRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const spaceBelow = viewportHeight - rect.bottom
    const spaceAbove = rect.top
    const dropdownHeight = maxHeight + 60 // Add padding for controls

    // If there's enough space below, show dropdown below
    if (spaceBelow >= dropdownHeight) {
      setDropdownPosition("bottom")
      setDropdownStyle({
        top: "100%",
        left: 0,
        right: 0,
        maxHeight: `${Math.min(maxHeight, spaceBelow - 20)}px`,
      })
    }
    // If there's enough space above, show dropdown above
    else if (spaceAbove >= dropdownHeight) {
      setDropdownPosition("top")
      setDropdownStyle({
        bottom: "100%",
        left: 0,
        right: 0,
        maxHeight: `${Math.min(maxHeight, spaceAbove - 20)}px`,
      })
    }
    // Otherwise, show as modal
    else {
      setDropdownPosition("modal")
      setDropdownStyle({
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: Math.min(400, window.innerWidth - 40),
        maxHeight: `${Math.min(maxHeight, viewportHeight - 100)}px`,
        zIndex: 9999,
      })
    }
  }, [maxHeight])

  // Update selected options when values prop changes
  useEffect(() => {
    const newSelected = values
      .map((value) => options.find((option) => option.value === value))
      .filter((option): option is Option => !!option)

    const isSame =
      newSelected.length === selectedOptions.length &&
      newSelected.every((opt) => selectedOptions.find((s) => s.value === opt.value))

    if (!isSame) {
      setSelectedOptions(newSelected)
    }
  }, [values, options])

  // Filter out selected options from available options
  const availableOptions = React.useMemo(() => {
    const selectedValues = new Set(selectedOptions.map((opt) => opt.value))
    return options.filter((option) => !selectedValues.has(option.value))
  }, [options, selectedOptions])

  // Group available options if they have a group property
  const groupedOptions = React.useMemo(() => {
    const groups: Record<string, Option[]> = {}
    const filteredOptions = availableOptions.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    filteredOptions.forEach((option) => {
      const group = option.group || "Autres"
      groups[group] = groups[group] || []
      groups[group].push(option)
    })

    return groups
  }, [availableOptions, searchTerm])

  // Flat list of filtered available options
  const filteredOptions = React.useMemo(
    () => availableOptions.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase())),
    [availableOptions, searchTerm],
  )

  // Calculate total pages
  const totalPages = Math.ceil(filteredOptions.length / itemsPerPage)

  // Get current page items
  const currentItems = React.useMemo(() => {
    const startIndex = currentPage * itemsPerPage
    return filteredOptions.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredOptions, currentPage, itemsPerPage])

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(0)
    setHighlightedIndex(-1)
  }, [searchTerm])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        if (dropdownPosition === "modal") {
          // For modal, check if click is outside the dropdown itself
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false)
            setSearchTerm("")
            setHighlightedIndex(-1)
          }
        } else {
          setIsOpen(false)
          setSearchTerm("")
          setHighlightedIndex(-1)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [dropdownPosition])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setHighlightedIndex((prev) => {
            if (prev < currentItems.length - 1) return prev + 1
            if (currentPage < totalPages - 1) {
              setCurrentPage((prev) => prev + 1)
              return 0
            }
            return prev
          })
          break
        case "ArrowUp":
          e.preventDefault()
          setHighlightedIndex((prev) => {
            if (prev > 0) return prev - 1
            if (currentPage > 0) {
              setCurrentPage((prev) => prev - 1)
              return itemsPerPage - 1
            }
            return prev
          })
          break
        case "Enter":
          e.preventDefault()
          if (highlightedIndex >= 0 && currentItems[highlightedIndex]) {
            toggleOption(currentItems[highlightedIndex])
          }
          break
        case "Escape":
          e.preventDefault()
          setIsOpen(false)
          setSearchTerm("")
          setHighlightedIndex(-1)
          break
      }
    }

    if (isOpen) document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, highlightedIndex, currentItems, currentPage, totalPages])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Calculate position when dropdown opens
  useEffect(() => {
    if (isOpen) {
      calculateDropdownPosition()

      // Recalculate on window resize
      const handleResize = () => calculateDropdownPosition()
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [isOpen, calculateDropdownPosition])

  const toggleDropdown = () => {
    if (disabled || isPending) return
    setIsOpen(!isOpen)
    setHighlightedIndex(-1)
    setSearchTerm("")
    setCurrentPage(0)
  }

  const toggleOption = useCallback(
    (option: Option) => {
      if (disabled || isPending) return

      const updatedSelection = [...selectedOptions, option]
      setSelectedOptions(updatedSelection)
      onChange(updatedSelection.map((opt) => opt.value))

      // Reset search and pagination after selection
      setSearchTerm("")
      setCurrentPage(0)
      setHighlightedIndex(-1)
    },
    [selectedOptions, onChange, disabled, isPending],
  )

  const removeOption = useCallback(
    (e: React.MouseEvent, option: Option) => {
      e.stopPropagation()
      if (disabled || isPending) return
      const updatedSelection = selectedOptions.filter((item) => item.value !== option.value)
      setSelectedOptions(updatedSelection)
      onChange(updatedSelection.map((opt) => opt.value))
    },
    [selectedOptions, onChange, disabled, isPending],
  )

  const clearAll = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (disabled || isPending) return
      setSelectedOptions([])
      onChange([])
    },
    [onChange, disabled, isPending],
  )

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1)
      setHighlightedIndex(-1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
      setHighlightedIndex(-1)
    }
  }

  const renderDropdownContent = () => (
    <div className="flex flex-col h-full">
      {/* Header with close button for modal */}
      {dropdownPosition === "modal" && (
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-medium text-sm">Sélectionner les options</h3>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsOpen(false)}>
            <X size={14} />
          </Button>
        </div>
      )}

      {/* Search */}
      <div className="p-3 border-b">
        <div className="relative">
          <Search size={16} className="absolute left-2.5 top-2.5 text-muted-foreground" />
          <Input
            ref={searchInputRef}
            className="pl-8 h-8"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      {/* View mode and pagination controls */}
      <div className="flex justify-between items-center p-2 border-b bg-muted/20">
        <div className="flex gap-1">
          {["list", "grid", "grouped"].map((mode) => (
            <Button
              key={mode}
              type="button"
              variant="ghost"
              size="sm"
              className={cn("h-6 px-2 text-xs capitalize", viewMode === mode && "bg-muted")}
              onClick={() => setViewMode(mode as any)}
            >
              {mode}
            </Button>
          ))}
        </div>

        {(viewMode === "list" || viewMode === "grid") && totalPages > 1 && (
          <div className="flex items-center gap-1 text-xs">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={prevPage}
              disabled={currentPage === 0}
            >
              <ChevronLeft size={12} />
            </Button>
            <span className="text-muted-foreground px-1">
              {currentPage + 1}/{totalPages}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
            >
              <ChevronRight size={12} />
            </Button>
          </div>
        )}
      </div>

      {/* Options list */}
      <div
        className="overflow-hidden"
        style={{
          height: `${Math.max(120, Math.min(200, maxHeight - 140))}px`,
        }}
      >
        {filteredOptions.length > 0 ? (
          <>
            {/* List View */}
            {viewMode === "list" && (
              <div className="h-full overflow-y-auto">
                <div className="p-1">
                  {currentItems.map((option, index) => (
                    <div
                      key={option.value}
                      className={cn(
                        "px-3 py-2 cursor-pointer flex justify-between items-center rounded-sm",
                        "transition-colors text-sm hover:bg-muted/50",
                        highlightedIndex === index && "bg-muted",
                      )}
                      onClick={() => toggleOption(option)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      role="option"
                      aria-selected={false}
                    >
                      <span className="truncate pr-2">{option.label}</span>
                      <Check size={16} className="text-primary opacity-0 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Grid View */}
            {viewMode === "grid" && (
              <div className="h-full overflow-y-auto">
                <div className="p-1 grid grid-cols-2 gap-1">
                  {currentItems.map((option, index) => (
                    <div
                      key={option.value}
                      className={cn(
                        "p-2 cursor-pointer flex items-center rounded-sm text-sm",
                        "transition-colors hover:bg-muted/50",
                        highlightedIndex === index && "bg-muted",
                      )}
                      onClick={() => toggleOption(option)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      role="option"
                      aria-selected={false}
                    >
                      <span className="truncate text-xs">{option.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Grouped View */}
            {viewMode === "grouped" && (
              <div className="h-full overflow-y-auto">
                <div className="p-1">
                  {Object.entries(groupedOptions).map(([group, items]) => (
                    <div key={group} className="mb-2 last:mb-0">
                      <div className="text-xs font-medium text-muted-foreground px-2 py-1 bg-muted/30 rounded-sm mb-1 sticky top-0 z-10">
                        {group}
                      </div>
                      <div>
                        {items.map((option) => (
                          <div
                            key={option.value}
                            className={cn(
                              "px-3 py-1.5 cursor-pointer flex justify-between items-center rounded-sm mb-0.5",
                              "transition-colors text-sm hover:bg-muted/50",
                            )}
                            onClick={() => toggleOption(option)}
                            role="option"
                            aria-selected={false}
                          >
                            <span className="truncate pr-2">{option.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-center text-muted-foreground text-sm">
            {searchTerm ? "Aucune option trouvée" : "Toutes les options sont sélectionnées"}
          </div>
        )}
      </div>

      {/* Footer info */}
      {filteredOptions.length > 0 && (
        <div className="flex-shrink-0 p-2 border-t bg-muted/10 text-xs text-muted-foreground text-center">
          {selectedOptions.length} sélectionné{selectedOptions.length > 1 ? "s" : ""} • {filteredOptions.length}{" "}
          disponible{filteredOptions.length > 1 ? "s" : ""}
        </div>
      )}
    </div>
  )

  const dropdown = (
    <div
      ref={dropdownRef}
      id="select-multiple-dropdown"
      className={cn(
        "bg-popover border rounded-md shadow-lg transition-all duration-200",
        dropdownPosition === "modal" ? "fixed" : "absolute z-50",
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
        dropdownPosition === "top" && "origin-bottom",
        dropdownPosition === "bottom" && "origin-top",
        dropdownPosition === "modal" && "origin-center",
      )}
      style={dropdownStyle}
    >
      {isOpen && !disabled && !isPending && renderDropdownContent()}
    </div>
  )

  return (
    <div className={cn("relative w-full", className)} ref={wrapperRef}>
      <div
        className={cn(
          "flex min-h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm",
          "ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          isOpen && "ring-2 ring-ring ring-offset-2",
          (disabled || isPending) && "cursor-not-allowed opacity-50",
          !disabled && !isPending && "cursor-pointer",
        )}
        onClick={toggleDropdown}
        tabIndex={disabled || isPending ? -1 : 0}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled && !isPending) {
            e.preventDefault()
            toggleDropdown()
          }
        }}
        aria-expanded={isOpen}
        aria-controls="select-multiple-dropdown"
        aria-multiselectable="true"
      >
        <div className="flex-1 flex items-center gap-2 min-w-0">
          {isPending ? (
            <div className="flex items-center text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Chargement...</span>
            </div>
          ) : selectedOptions.length === 0 ? (
            <div className="text-muted-foreground truncate">{placeholder}</div>
          ) : (
            <div className="flex flex-wrap gap-1 min-w-0 flex-1">
              {selectedOptions.slice(0, 3).map((option) => (
                <div
                  key={option.value}
                  className="flex items-center gap-1 bg-muted/60 rounded-sm px-2 py-0.5 text-xs max-w-[120px]"
                >
                  <span className="truncate">{option.label}</span>
                  <X
                    size={12}
                    className="flex-shrink-0 cursor-pointer text-muted-foreground hover:text-destructive"
                    onClick={(e) => removeOption(e, option)}
                    aria-label={`Supprimer ${option.label}`}
                  />
                </div>
              ))}
              {selectedOptions.length > 3 && (
                <div className="flex items-center bg-muted/40 rounded-sm px-2 py-0.5 text-xs">
                  <span>+{selectedOptions.length - 3} autres</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
          {selectedOptions.length > 0 && !disabled && !isPending && (
            <X
              size={16}
              className="cursor-pointer text-muted-foreground hover:text-destructive"
              onClick={clearAll}
              aria-label="Tout supprimer"
            />
          )}
          <ChevronDown size={16} className={cn("text-muted-foreground transition-transform", isOpen && "rotate-180")} />
        </div>
      </div>

      {/* Render dropdown - either in place or as portal for modal */}
      {dropdownPosition === "modal" && typeof window !== "undefined"
        ? createPortal(
            <>
              {/* Modal backdrop */}
              {isOpen && <div className="fixed inset-0 bg-black/20 z-[9998]" onClick={() => setIsOpen(false)} />}
              {dropdown}
            </>,
            document.body,
          )
        : dropdown}
    </div>
  )
}
