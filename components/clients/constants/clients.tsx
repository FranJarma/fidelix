import { Client } from "../types/clients";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export const CLIENTS_CONSTS = {
  CLIENT_CREATED: "Cliente creado",
  CLIENT_DELETED_CONFIRM_PLURAL: "¿Está seguro que desea eliminar estos clientes?",
  CLIENT_DELETED_CONFIRM: "¿Está seguro que desea eliminar este cliente?",
  CLIENT_DELETED_ERROR_DESCRIPTION_PLURAL: "No se pudo eliminar los clientes",
  CLIENT_DELETED_ERROR_DESCRIPTION_SINGLE: "No se pudo eliminar el cliente",
  CLIENT_DELETED_ERROR_DESCRIPTION: "No se pudo eliminar el cliente",
  CLIENT_DELETED_ERROR_MESSAGE_PLURAL: "No se pudo eliminar los clientes",
  CLIENT_DELETED_ERROR_MESSAGE: "No se pudo eliminar el cliente",
  CLIENT_DELETED_ERROR_PLURAL: "Error al eliminar clientes",
  CLIENT_DELETED_ERROR_TITLE_PLURAL: "Error",
  CLIENT_DELETED_ERROR_TITLE: "Error",
  CLIENT_DELETED_ERROR: "Error al eliminar cliente",
  CLIENT_DELETED_PLURAL: "Clientes eliminados",
  CLIENT_DELETED_SUCCESS_PLURAL: "Clientes eliminados",
  CLIENT_DELETED_SUCCESS: "Cliente eliminado",
  CLIENT_DELETED: "Cliente eliminado",
  CLIENT_NOT_FOUND: "Cliente no encontrado",
  CLIENT_NOT_SELECTED: "Seleccione un cliente",
  CLIENT_SELECTED_PLURAL: "Clientes seleccionados",
  CLIENT_SELECTED: "Cliente seleccionado",
  CLIENT_UPDATED: "Cliente actualizado",
  CLIENTS_PAGE_TITLE: "Clientes",
  CLIENTS_PAGE_SUBTITLE: "Gestión de clientes",
  CREATE_CLIENT: "Crear cliente",
  EDIT_CLIENT: "Editar cliente",
};

export const clientColumns: ColumnDef<Client>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={val => table.toggleAllPageRowsSelected(!!val)}
        aria-label="Seleccionar todo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={val => row.toggleSelected(!!val)}
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
      <span className="font-medium">{`${row.original.name} ${row.original.lastName}`}</span>
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
