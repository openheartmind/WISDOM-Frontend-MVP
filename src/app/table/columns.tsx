"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  title: string
  owner: "Jack" | "Daniel" | "John"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "owner",
    header: "Owner",
  }
]
