import { FiPlus } from "react-icons/fi";

import { ClientFormDialog, ClientStatistics, ClientTable } from "@/components/clients";
import { CLIENTS_CONSTS } from "@/components/clients/constants/clients";
import type { Client } from "@/components/clients/types/clients";
import { mockClients } from "@/components/clients/utils/mock";
import { EntityLayout } from "@/components/shared/layout/entity-layout/EntityLayout";
import { Button } from "@/components/ui/button";
import { useEntityManager } from "@/hooks/useEntityManager";
import { FormModeEnum } from "@/types/forms";

export function ClientsPage() {
  const {
    create,
    editing,
    items: clients,
    notify,
    remove,
    setEditing,
    update,
  } = useEntityManager<Client>(mockClients);

  return (
    <EntityLayout
      title={CLIENTS_CONSTS.CLIENTS_PAGE_TITLE}
      subtitle={CLIENTS_CONSTS.CLIENTS_PAGE_SUBTITLE}
      createLabel={CLIENTS_CONSTS.CREATE_CLIENT}
      createComponent={
        <ClientFormDialog
          mode={FormModeEnum.CREATE}
          title={CLIENTS_CONSTS.CREATE_CLIENT}
          onSubmit={create}
        >
          <Button size="sm">
            <FiPlus className="mr-2 h-4 w-4" />
            {CLIENTS_CONSTS.CREATE_CLIENT}
          </Button>
        </ClientFormDialog>
      }
      impactNotifications={<ClientStatistics clients={clients} />}
    >
      <ClientTable data={clients} onEdit={setEditing} onDelete={remove} onNotify={notify} />

      {editing && (
        <ClientFormDialog
          mode={FormModeEnum.EDIT}
          initialValues={editing}
          title={CLIENTS_CONSTS.EDIT_CLIENT}
          onSubmit={update}
        />
      )}
    </EntityLayout>
  );
}
