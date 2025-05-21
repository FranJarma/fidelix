"use client";

import { EntityFormDialog } from "../shared/forms/EntityFormDialog";
import type { Client, ClientFormDialogProps } from "./types/clients";

import { Button } from "@/components/ui/button";
import { FormFieldTypeEnum } from "@/types/forms";
import { LevelEnum } from "@/types/levels";
import { SourceEnum } from "@/types/sources";

export function ClientFormDialog({
  children,
  initialValues,
  mode,
  onSubmit,
  title,
}: ClientFormDialogProps) {
  return (
    <EntityFormDialog<Client>
      title={title}
      mode={mode}
      initialValues={initialValues}
      onSubmit={onSubmit}
      fields={[
        { name: "name", label: "Nombre" },
        { name: "lastName", label: "Apellido" },
        { name: "email", label: "Email", type: FormFieldTypeEnum.EMAIL },
        { name: "phone", label: "Teléfono" },
        {
          name: "level",
          label: "Nivel",
          type: FormFieldTypeEnum.SELECT,
          options: Object.values(LevelEnum).map(val => ({ label: val, value: val })),
        },
        {
          name: "source",
          label: "Fuente",
          type: FormFieldTypeEnum.SELECT,
          options: Object.values(SourceEnum).map(val => ({ label: val, value: val })),
        },
      ]}
    >
      {children ?? <Button size="sm">{title}</Button>}
    </EntityFormDialog>
  );
}
