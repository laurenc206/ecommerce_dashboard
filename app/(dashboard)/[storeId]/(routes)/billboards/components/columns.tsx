"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"
import { Check } from "lucide-react"

export type BillboardColumn = {
  id: string
  label: string
  isFeatured: boolean
  isLocked: boolean
  createdAt: string
}

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) => 
      <div className="flex items-center">
        { row.getValue("isFeatured") ? <Check /> : null}
      </div>
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
