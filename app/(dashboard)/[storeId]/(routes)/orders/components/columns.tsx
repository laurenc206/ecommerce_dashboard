"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export type OrderColumn = {
  id: string
  phone: string
  address: string
  isPaid: boolean
  totalPrice: string
  products: string
  createdAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => 
    <div className="flex items-center min-w-[150px]">
      {row.getValue("products")}
    </div>
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => 
      <div className="flex items-center min-w-[150px]">
        {row.getValue("address")}
      </div>
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => {
      return (
        <div className="-ml-4 line-clamp-1 min-w-[130px]">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Price
          <ArrowUpDown className="w-4 h-4 ml-2"/>
        </Button>
        </div>
      )
    },
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
]
