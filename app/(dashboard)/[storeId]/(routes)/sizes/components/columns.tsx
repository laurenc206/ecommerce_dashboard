"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"
import { Check } from "lucide-react"

export type SizeColumn = {
  id: string
  name: string
  value: string
  isLocked: boolean
  createdAt: string
}

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },  
  {
    accessorKey: "value",
    header: "Value",
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
