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
    cell: ({ row }) => 
      <div className="line-clamp-1 w-max pr-5">
        {row.getValue("name")}
      </div>
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => 
      <div className="line-clamp-1 w-max pr-5">
        {row.original.categoryName}
      </div>
  },
  {
    accessorKey: "isLocked",
    header: "Locked",
    cell: ({ row }) => 
      <div className="flex items-center min-w-[60px]">
        { row.getValue("isLocked") ? <Check className="w-4 sm:w-5"/> : null}
      </div>
  }, 
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => 
      <div className="line-clamp-1 w-max">
        {row.getValue("createdAt")}
      </div>
  },
  {
    id: "actions",
    cell: ({ row }) => 
      <div className="flex items-center min-w-[40px] justify-center">
        <CellAction data={row.original}/>
      </div>
  }
]
