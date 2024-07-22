"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"
import { ArrowUpDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

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
    header: ({ column }) => {
      return (
        <div className="-ml-4">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Label
          <ArrowUpDown className="w-4 h-4 ml-2"/>
        </Button>
        </div>
      )
    },
    cell: ({ row }) => 
      <div className="line-clamp-1 w-max pr-5">
        {row.getValue("label")}
      </div>
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) => 
      <div className="flex items-center min-w-[60px] pr-5">
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
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div className="-ml-4">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="w-4 h-4 ml-2"/>
        </Button>
        </div>
      )
    },
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
