import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Client } from "../types/clients";

export const clientColumns: ColumnDef<Client>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(val) => table.toggleAllPageRowsSelected(!!val)}
        aria-label="Seleccionar todo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(val) => row.toggleSelected(!!val)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fullName",
    header: "Nombre Completo",
    cell: ({ row }) => (
      <span className="font-medium">
        {`${row.original.name} ${row.original.lastName}`}
      </span>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: true,
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
    enableSorting: true,
  },
  {
    accessorKey: "level",
    header: "Nivel",
  },
  {
    accessorKey: "points",
    header: "Puntos",
    cell: ({ row }) => `${row.original.points} pts`,
  },
  {
    accessorKey: "source",
    header: "Fuente",
  },
];
