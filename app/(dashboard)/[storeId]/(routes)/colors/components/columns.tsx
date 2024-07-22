"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"
import { ArrowUpDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export type ColorColumn = {
  id: string
  name: string
  value: string
  isLocked: boolean
  createdAt: string
}

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="-ml-4">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="w-4 h-4 ml-2"/>
        </Button>
        </div>
      )
    },
    cell: ({ row }) => 
      <div className="line-clamp-1 w-max pr-5">
        {row.getValue("name")}
      </div>
  },  
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-x-2 pr-5 w-max">
          <div className="uppercase">
          {row.original.value}
          </div>
          <div className="h-6 w-6 rounded-full border"
               style={{ backgroundColor: row.original.value }} 
          />
        </div>
    )
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