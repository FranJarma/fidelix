"use client";

import { useState } from "react";
import { FiBell, FiPlus, FiTrash } from "react-icons/fi";

import { clientColumns } from "../constants/columns";
import type { Client } from "../types/clients";
import { mockClients } from "../utils/mock";
import { ClientStatistics } from "./ClientStatistics";

import { EntityFormDialog } from "@/components/shared/forms/EntityFormDialog";
import { EntityLayout } from "@/components/shared/layout/entity-layout/EntityLayout";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const handleCreate = (newClient: Client) => {
    setClients(prev => [...prev, newClient]);
  };

  const handleUpdate = (updated: Client) => {
    setClients(prev => prev.map(c => (c.id === updated.id ? updated : c)));
    setEditingClient(null);
  };

  const handleDelete = (selected: Client[]) => {
    setClients(prev => prev.filter(c => !selected.some(r => r.id === c.id)));
  };

  const handleNotify = (selected: Client[]) => {
    alert(`Notificando a ${selected.length} cliente(s)`);
  };

  return (
    <EntityLayout
      title="Clientes"
      subtitle="Gestión de Clientes"
      createLabel="Crear Cliente"
      createComponent={
        <EntityFormDialog<Client>
          title="Crear Cliente"
          mode="create"
          fields={[
            { name: "name", label: "Nombre" },
            { name: "lastName", label: "Apellido" },
            { name: "email", label: "Email" },
            { name: "phone", label: "Teléfono" },
          ]}
          onSubmit={handleCreate}
        >
          <Button size="sm">
            <FiPlus className="mr-2 h-4 w-4" />
            Crear Cliente
          </Button>
        </EntityFormDialog>
      }
      impactNotifications={<ClientStatistics clients={clients} />}
    >
      <DataTable
        data={clients}
        columns={clientColumns}
        rowKey="id"
        searchablePlaceholder="Buscar cliente..."
        onRowClick={client => setEditingClient(client)}
        bulkActions={[
          {
            id: "delete",
            label: "Eliminar",
            icon: <FiTrash />,
            onClick: handleDelete,
          },
          {
            id: "notify",
            label: "Notificar",
            icon: <FiBell />,
            onClick: handleNotify,
          },
        ]}
      />

      <EntityFormDialog<Client>
        title="Editar Cliente"
        mode="edit"
        open={!!editingClient}
        initialValues={editingClient ?? {}}
        fields={[
          { name: "name", label: "Nombre" },
          { name: "lastName", label: "Apellido" },
          { name: "email", label: "Email" },
          { name: "phone", label: "Teléfono" },
        ]}
        onSubmit={handleUpdate}
        onClose={() => setEditingClient(null)}
      />
    </EntityLayout>
  );
}
