"use client";

import DeleteItem from "@/components/common/delete/DeleteItem";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { deleteUser } from "@/lib/userUtils";
import { IService } from "@/services/serviceService";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, PenBoxIcon } from "lucide-react";

import Link from "next/link";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnService: ColumnDef<IService>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon">
              {user.id && (
                <Link href={`/usuario/${user.id}`}>
                  <PenBoxIcon className="h-4 w-4 text-primary" />
                </Link>
              )}
            </Button>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "serviceDescription",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descrição
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "unit",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Unida de Medida
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{row.original.work?.workDescription}</span>;
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status?
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Função
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "delete",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <>
          <div className="flex gap-1">
            <DeleteItem
              itemName={user.serviceDescription}
              deleteFunction={() => deleteUser(user.id)}
            />
          </div>
        </>
      );
    },
  },
];
