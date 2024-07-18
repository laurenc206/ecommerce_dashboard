"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"
import { Check } from "lucide-react"

export type SubcategoryColumn = {
  id: string
  name: string
  categoryName: string
  createdAt: string
}

export const columns: ColumnDef<SubcategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => row.original.categoryName,
  },
  {
    accessorKey: "isLocked",
    header: "Locked",
    cell: ({ row }) => 
      <div className="flex items-center">
        { row.getValue("isLocked") ? <Check /> : null}
      </div>
  }, 
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original}/>
  }
]
