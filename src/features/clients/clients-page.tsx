import { useState } from "react";
import { useForm } from "react-hook-form";

import { ClientFormDialog } from "./components/client-form-dialog";
import {
  CLIENTS_CONSTANTS,
  getClientsColumns,
  mockClients,
} from "./constants/clients.constants";
import type { Client } from "./types/clients.types";

import { withEntityLayout } from "@/components/shared/with-entity-layout";
import { FORM_CONSTANTS } from "@/constants/form.constants";

function RawClientsPage() {
  return null;
}

export const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<Client>();

  const handleClose = () => {
    setOpen(false);
    setEditingClient(null);
    form.reset();
  };

  const handleSubmit = (data: Client) => {
    if (editingClient) {
      setClients((prev) =>
        prev.map((client) =>
          client.id === editingClient.id ? { ...data, id: client.id } : client,
        ),
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
    columns: getClientsColumns(),
    data: clients,
    onCreate: handleAdd,
    onDelete: handleDelete,
    onEdit: handleEdit,
    renderFormDialog: (
      <ClientFormDialog
        editing={editingClient}
        form={form}
        open={open}
        confirmButtonTitle={
          editingClient
            ? FORM_CONSTANTS.EDIT_LABEL
            : FORM_CONSTANTS.CONFIRM_LABEL
        }
        dialogTitle={
          editingClient
            ? CLIENTS_CONSTANTS.EDIT_LABEL
            : CLIENTS_CONSTANTS.CREATE_LABEL
        }
        onClose={handleClose}
        onSubmit={form.handleSubmit(handleSubmit)}
      />
    ),
  });

  return <Wrapped />;
};
