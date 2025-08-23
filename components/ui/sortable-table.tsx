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

  const sortedData = useMemo(() => {
    if (!sortField || !sortDirection) return data

    return [...data].sort((a, b) => {
      const aValue = getNestedValue(a, sortField)
      const bValue = getNestedValue(b, sortField)

      if (aValue === null || aValue === undefined) return 1
      if (bValue === null || bValue === undefined) return -1

      let comparison = 0
      if (typeof aValue === "number" && typeof bValue === "number") {
        comparison = aValue - bValue
      } else {
        const aStr = String(aValue).toLowerCase()
        const bStr = String(bValue).toLowerCase()
        comparison = aStr.localeCompare(bStr)
      }

      return sortDirection === "desc" ? -comparison : comparison
    })
  }, [data, sortField, sortDirection])

  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((current, key) => current?.[key], obj)
  }

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
          {sortedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={cn(
                rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50",
                "hover:bg-gray-100 transition-colors",
                rowClassName
              )}
            >
              {columns.map((column) => {
                const value = getNestedValue(row, String(column.key))
                return (
                  <td
                    key={String(column.key)}
                    className={cn(
                      "px-4 py-4 text-sm text-gray-900",
                      column.className
                    )}
                  >
                    {column.render ? column.render(value, row) : value || "N/A"}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}