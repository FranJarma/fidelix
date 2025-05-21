import { FormModeEnum } from "@/types/forms";
import type { LevelEnum } from "@/types/levels";
import type { SourceEnum } from "@/types/sources";

export type Client = {
  email: string;
  id: number;
  lastName: string;
  level: LevelEnum;
  name: string;
  phone: string;
  points: number;
  source: SourceEnum;
};

export type ClientFormProps = Omit<Client, "id">;

export type ClientFormDialogProps = {
  children?: React.ReactNode;
  initialValues?: Client;
  mode: FormModeEnum;
  onSubmit: (client: Client) => void;
  title: string;
};

export type ClientTableProps = {
  data: Client[];
  onDelete: (selected: Client[]) => void;
  onEdit: (client: Client) => void;
  onNotify: (selected: Client[]) => void;
};
