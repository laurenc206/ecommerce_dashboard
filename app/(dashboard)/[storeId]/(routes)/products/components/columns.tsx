"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"
import { Check } from "lucide-react"

export type ProductColumn = {
  id: string
  name: string
  price: string
  size: string | undefined
  category: string
  subcategory: string
  color: string | undefined
  isFeatured: boolean
  isArchived: boolean
  isLocked: boolean
  createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
    cell: ({ row }) => 
      <div className="flex items-center">
        { row.getValue("isArchived") ? <Check /> : null}
      </div>
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
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "subcategory",
    header: "Subcategory",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) =>  
      <div className="flex items-center gap-x-2">
        {row.original.color}
        { row.getValue("color") != null && 
        <div className="h-6 w-6 rounded-full border"
             style={{ backgroundColor: row.original.color }} /> }
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
