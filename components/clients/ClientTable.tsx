"use client";

import { FiBell, FiTrash } from "react-icons/fi";

import { clientColumns } from "./constants/clients";
import type { ClientTableProps } from "./types/clients";

import { DataTable } from "@/components/ui/datatable";

export function ClientTable({ data, onDelete, onEdit, onNotify }: ClientTableProps) {
  return (
    <DataTable
      data={data}
      columns={clientColumns}
      rowKey="id"
      searchablePlaceholder="Buscar cliente..."
      onRowClick={onEdit}
      bulkActions={[
        { id: "delete", label: "Eliminar", icon: <FiTrash />, onClick: onDelete },
        { id: "notify", label: "Notificar", icon: <FiBell />, onClick: onNotify },
      ]}
    />
  );
}
