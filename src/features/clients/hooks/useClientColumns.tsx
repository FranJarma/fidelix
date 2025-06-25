import type { ColumnDef } from "@tanstack/react-table";
import type { Client } from "../types/clients.types";
import {
  ClientAddressCell,
  ClientLevelCell,
  ClientSourceCell,
} from "../components/client-table-cells";

export const useClientColumns = (): ColumnDef<Client>[] => {
  return [
    {
      accessorKey: "fullName",
      header: "Nombre completo",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Teléfono",
    },
    {
      accessorKey: "address",
      header: "Dirección",
      cell: ({ row }) => (
        <ClientAddressCell
          address={row.original.address}
          city={row.original.city}
          country={row.original.country}
        />
      ),
    },
    {
      accessorKey: "points",
      header: "Puntos",
    },
    {
      accessorKey: "level",
      header: "Nivel",
      cell: ({ row }) => <ClientLevelCell level={row.original.level} />,
    },
    {
      accessorKey: "source",
      header: "Origen",
      cell: ({ row }) => <ClientSourceCell source={row.original.source} />,
    },
    {
      accessorKey: "isActive",
      header: "Activo",
      cell: ({ row }) => (row.original.isActive ? "Sí" : "No"),
    },
  ];
};
