"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  title: string
  member: "Jack" | "Daniel" | "John"
  email: string,
  contribution: string,
  mi: string,
  gi: string,
  co:string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "contribution",
    header: "Contribution",
  },
  {
    accessorKey: "member",
    header: "Member",
  },
  {
    accessorKey: "mi",
    header: "Mi",
  },
  {
    accessorKey: "gr",
    header: "Gr",
  },
  {
    accessorKey: "co",
    header: "Co",
  }
]
