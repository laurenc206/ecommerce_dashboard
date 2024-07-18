"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"
import { Check } from "lucide-react"

export type CategoryColumn = {
  id: string
  name: string
  billboardLabel: string
  isLocked: boolean
  createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ( { row }) => row.original.billboardLabel,
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
