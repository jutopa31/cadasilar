"use client"

import React, { useState, useMemo } from "react"
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ColumnDef<T> {
  key: keyof T | string
  label: string
  sortable?: boolean
  render?: (value: any, row: T) => React.ReactNode
  className?: string
}

export interface SortableTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  className?: string
  headerClassName?: string
  rowClassName?: string
  emptyMessage?: string
}

type SortDirection = "asc" | "desc" | null

export function SortableTable<T extends Record<string, any>>({
  data,
  columns,
  className,
  headerClassName,
  rowClassName,
  emptyMessage = "No data available"
}: SortableTableProps<T>) {
  // Input validation
  if (!Array.isArray(data)) {
    console.warn("SortableTable: data prop must be an array")
    return (
      <div className="flex items-center justify-center py-12 text-red-500">
        Error: Invalid data format
      </div>
    )
  }

  if (!Array.isArray(columns) || columns.length === 0) {
    console.warn("SortableTable: columns prop must be a non-empty array")
    return (
      <div className="flex items-center justify-center py-12 text-red-500">
        Error: No columns defined
      </div>
    )
  }

  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const handleSort = (key: string, sortable: boolean = true) => {
    if (!sortable) return

    if (sortField === key) {
      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else if (sortDirection === "desc") {
        setSortField(null)
        setSortDirection(null)
      } else {
        setSortDirection("asc")
      }
    } else {
      setSortField(key)
      setSortDirection("asc")
    }
  }

  const getNestedValue = (obj: any, path: string): any => {
    try {
      if (!obj || !path) return null
      return path.split('.').reduce((current, key) => {
        if (current === null || current === undefined) return null
        return current[key]
      }, obj)
    } catch (error) {
      console.warn("Error accessing nested value:", error)
      return null
    }
  }

  const sortedData = useMemo(() => {
    if (!sortField || !sortDirection || !Array.isArray(data)) return data

    try {
      return [...data].sort((a, b) => {
        // Safely get values
        const aValue = getNestedValue(a, sortField)
        const bValue = getNestedValue(b, sortField)

        // Handle null/undefined values
        if (aValue === null || aValue === undefined) {
          if (bValue === null || bValue === undefined) return 0
          return 1
        }
        if (bValue === null || bValue === undefined) return -1

        // Handle different types
        let comparison = 0
        
        // Check if both are numbers (including string numbers)
        const aNum = Number(aValue)
        const bNum = Number(bValue)
        const aIsNum = !isNaN(aNum) && isFinite(aNum)
        const bIsNum = !isNaN(bNum) && isFinite(bNum)
        
        if (aIsNum && bIsNum) {
          comparison = aNum - bNum
        } else {
          // String comparison - safely convert to string
          try {
            const aStr = String(aValue || "").toLowerCase()
            const bStr = String(bValue || "").toLowerCase()
            comparison = aStr.localeCompare(bStr)
          } catch (error) {
            console.warn("Error in string comparison:", error)
            return 0
          }
        }

        return sortDirection === "desc" ? -comparison : comparison
      })
    } catch (error) {
      console.error("Error sorting data:", error)
      return data // Return original data if sorting fails
    }
  }, [data, sortField, sortDirection])

  const getSortIcon = (key: string, sortable: boolean = true) => {
    if (!sortable) return null
    
    if (sortField === key) {
      return sortDirection === "asc" ? (
        <ChevronUp className="w-4 h-4" />
      ) : (
        <ChevronDown className="w-4 h-4" />
      )
    }
    return <ChevronsUpDown className="w-4 h-4 opacity-50" />
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-500">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className={cn("min-w-full table-auto", className)}>
        <thead className={cn("bg-gray-50", headerClassName)}>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={cn(
                  "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                  column.sortable !== false ? "cursor-pointer hover:bg-gray-100 select-none" : "",
                  column.className
                )}
                onClick={() => handleSort(String(column.key), column.sortable)}
              >
                <div className="flex items-center gap-2">
                  {column.label}
                  {getSortIcon(String(column.key), column.sortable)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((row, rowIndex) => {
            // Generate a unique key
            const uniqueKey = row?.record_id || row?.id || rowIndex
            return (
              <tr
                key={`row-${uniqueKey}`}
                className={cn(
                  rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50",
                  "hover:bg-gray-100 transition-colors",
                  rowClassName
                )}
              >
                {columns.map((column) => {
                  let cellContent
                  try {
                    const value = getNestedValue(row, String(column.key))
                    if (column.render) {
                      cellContent = column.render(value, row)
                    } else {
                      cellContent = value !== null && value !== undefined ? value : "N/A"
                    }
                  } catch (error) {
                    console.warn(`Error rendering cell ${column.key}:`, error)
                    cellContent = "Error"
                  }

                  return (
                    <td
                      key={`${uniqueKey}-${String(column.key)}`}
                      className={cn(
                        "px-4 py-4 text-sm text-gray-900",
                        column.className
                      )}
                    >
                      {cellContent}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}