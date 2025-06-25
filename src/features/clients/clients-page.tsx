import { useState } from "react";
import { useForm } from "react-hook-form";

import { ClientFormDialog } from "./components/client-form-dialog";
import { CLIENTS_CONSTANTS, mockClients } from "./constants/clients.constants";
import type { Client } from "./types/clients.types";
import { withEntityLayout } from "@/components/shared/with-entity-layout";
import { useClientColumns } from "./hooks/useClientColumns";
import { getDialogActionLabel, getDialogTitle } from "@/utils/dialogUtils";

function RawClientsPage() {
  return null;
}

export const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<Client>();
  const columns = useClientColumns();

  const handleClose = () => {
    setOpen(false);
    setEditingClient(null);
    form.reset();
  };

  const handleSubmit = (data: Client) => {
    if (editingClient) {
      setClients((prev) =>
        prev.map((client) =>
          client.id === editingClient.id ? { ...data, id: client.id } : client
        )
      );
    } else {
      setClients((prev) => [...prev, { ...data, id: Date.now().toString() }]);
    }

    handleClose();
  };

  const handleAdd = () => {
    setEditingClient(null);
    form.reset();
    setOpen(true);
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    form.reset(client);
    setOpen(true);
  };

  const handleDelete = (client: Client) => {
    setClients((prev) => prev.filter((c) => c.id !== client.id));
  };

  const Wrapped = withEntityLayout(RawClientsPage, {
    title: CLIENTS_CONSTANTS.PAGE_TITLE,
    subtitle: CLIENTS_CONSTANTS.PAGE_SUBTITLE,
    createLabel: CLIENTS_CONSTANTS.CREATE_LABEL,
    columns,
    data: clients,
    onCreate: handleAdd,
    onDelete: handleDelete,
    onEdit: handleEdit,
  });

  return (
    <>
      <Wrapped />
      <ClientFormDialog
        confirmButtonTitle={getDialogActionLabel(editingClient, "Cliente")}
        dialogTitle={getDialogTitle(editingClient, "Cliente", "fullName")}
        editing={editingClient}
        form={form}
        open={open}
        onClose={handleClose}
        onSubmit={form.handleSubmit(handleSubmit)}
      />
    </>
  );
};
