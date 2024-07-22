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
    cell: ({ row }) => 
      <div className="line-clamp-1 min-w-[200px] md:min-w-[300px] lg:min-w-[400px] w-full break-all text-ellipsis pr-5">
        {row.getValue("name")}
      </div>
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
    cell: ({ row }) => 
        <div className="flex items-center min-w-[60px]">
          { row.getValue("isArchived") ? <Check className="w-4 sm:w-5"/> : null}
        </div>
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) => 
      <div className="flex items-center min-w-[60px]">
        { row.getValue("isFeatured") ? <Check className="w-4 sm:w-5"/> : null}
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
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => 
      <div className="line-clamp-1 w-max pr-5">
        {row.getValue("price")}
      </div>
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => 
      <div className="line-clamp-1 w-max pr-5">
        {row.getValue("category")}
      </div>
  },
  {
    accessorKey: "subcategory",
    header: "Subcategory",
    cell: ({ row }) => 
      <div className="line-clamp-1 w-max pr-5">
        {row.getValue("subcategory")}
      </div>
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => 
      <div className="line-clamp-1 w-max pr-5">
        {row.getValue("size")}
      </div>
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) =>  
      <div className="flex items-center gap-x-2 line-clamp-1 pr-5">
        {row.original.color}
        { row.getValue("color") != null && 
        <div className="h-6 w-6 rounded-full border"
             style={{ backgroundColor: row.original.color }} /> }
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
