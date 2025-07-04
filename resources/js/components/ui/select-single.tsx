"use client"

import { Check, ChevronDown, ChevronLeft, ChevronRight, Search, X } from "lucide-react"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { createPortal } from "react-dom"

interface Option {
  value: string
  label: string
  group?: string
}

interface SingleSelectProps {
  isPending?: boolean
  options: Option[]
  placeholder?: string
  onChange: (selectedOption: string) => void
  value?: string
  className?: string
  disabled?: boolean
  itemsPerPage?: number
  maxHeight?: number
  allowClear?: boolean
}

type DropdownPosition = "bottom" | "top" | "modal"

export const SelectSingle: React.FC<SingleSelectProps> = ({
  value,
  options,
  placeholder = "Sélectionner une option...",
  onChange,
  className,
  disabled = false,
  itemsPerPage = 8,
  isPending = false,
  maxHeight = 280,
  allowClear = true,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    options.find((option) => option.value === value),
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

  // Update selected option when value prop changes
  useEffect(() => {
    const newSelected = options.find((option) => option.value === value)
    if (newSelected?.value !== selectedOption?.value) {
      setSelectedOption(newSelected)
    }
  }, [value, options])

  // Group options if they have a group property
  const groupedOptions = React.useMemo(() => {
    const groups: Record<string, Option[]> = {}
    const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))

    filteredOptions.forEach((option) => {
      const group = option.group || "Autres"
      groups[group] = groups[group] || []
      groups[group].push(option)
    })

    return groups
  }, [options, searchTerm])

  // Flat list of filtered options
  const filteredOptions = React.useMemo(
    () => options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase())),
    [options, searchTerm],
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
            selectOption(currentItems[highlightedIndex])
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

  const selectOption = (option: Option) => {
    setSelectedOption(option)
    onChange(option.value)
    setIsOpen(false)
    setSearchTerm("")
    setHighlightedIndex(-1)
  }

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (disabled || isPending) return
    setSelectedOption(undefined)
    onChange("")
  }

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
          <h3 className="font-medium text-sm">Sélectionner une option</h3>
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
              {mode === "list" ? "Liste" : mode === "grid" ? "Grille" : "Groupes"}
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
                        selectedOption?.value === option.value && "bg-muted/70",
                      )}
                      onClick={() => selectOption(option)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      role="option"
                      aria-selected={selectedOption?.value === option.value}
                    >
                      <span className="truncate pr-2">{option.label}</span>
                      {selectedOption?.value === option.value && (
                        <Check size={16} className="text-primary flex-shrink-0" />
                      )}
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
                        "p-2 cursor-pointer flex items-center justify-between rounded-sm text-sm",
                        "transition-colors hover:bg-muted/50",
                        highlightedIndex === index && "bg-muted",
                        selectedOption?.value === option.value && "bg-muted/70",
                      )}
                      onClick={() => selectOption(option)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      role="option"
                      aria-selected={selectedOption?.value === option.value}
                    >
                      <span className="truncate text-xs pr-1">{option.label}</span>
                      {selectedOption?.value === option.value && (
                        <Check size={14} className="text-primary flex-shrink-0" />
                      )}
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
                              selectedOption?.value === option.value && "bg-muted/70",
                            )}
                            onClick={() => selectOption(option)}
                            role="option"
                            aria-selected={selectedOption?.value === option.value}
                          >
                            <span className="truncate pr-2">{option.label}</span>
                            {selectedOption?.value === option.value && (
                              <Check size={16} className="text-primary flex-shrink-0" />
                            )}
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
            Aucune option trouvée
          </div>
        )}
      </div>

      {/* Footer info */}
      {filteredOptions.length > 0 && (
        <div className="flex-shrink-0 p-2 border-t bg-muted/10 text-xs text-muted-foreground text-center">
          {filteredOptions.length} option{filteredOptions.length > 1 ? "s" : ""} disponible
          {filteredOptions.length > 1 ? "s" : ""}
          {selectedOption && " • " + selectedOption.label + " sélectionné"}
        </div>
      )}
    </div>
  )

  if (isPending) {
    return <Skeleton className="h-10 w-full rounded-md" />
  }

  const dropdown = (
    <div
      ref={dropdownRef}
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
          "flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm",
          "ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          "transition-colors hover:border-muted-foreground/50",
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
        aria-haspopup="listbox"
      >
        <div className="flex-1 flex items-center min-w-0">
          {!selectedOption ? (
            <span className="text-muted-foreground truncate">{placeholder}</span>
          ) : (
            <span className="truncate">{selectedOption.label}</span>
          )}
        </div>

        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
          {selectedOption && allowClear && !disabled && !isPending && (
            <X
              size={16}
              className="cursor-pointer text-muted-foreground hover:text-destructive transition-colors"
              onClick={clearSelection}
              aria-label="Effacer la sélection"
            />
          )}
          <ChevronDown
            size={16}
            className={cn("text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")}
          />
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
