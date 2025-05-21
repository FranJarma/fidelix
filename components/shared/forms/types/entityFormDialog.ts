import { FormFieldTypeEnum, FormModeEnum } from "@/types/forms";

export type Field = {
  label: string;
  name: string;
  options?: { label: string; value: string }[];
  type?: FormFieldTypeEnum;
};

export interface EntityFormDialogProps<T> {
  children?: React.ReactNode;
  confirmMessage?: string;
  fields: Field[];
  initialValues?: Partial<T>;
  mode: FormModeEnum;
  onClose?: () => void;
  onSubmit: (values: T) => void;
  open?: boolean;
  title: string;
}
