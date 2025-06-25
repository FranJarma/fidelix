import { useEffect } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

type UseResetFormProps<T extends FieldValues> = {
  defaultValues: T;
  editing: T | null;
  form: UseFormReturn<T>;
  open: boolean;
};

export function useResetForm<T extends FieldValues>({
  defaultValues,
  editing,
  form,
  open,
}: UseResetFormProps<T>) {
  useEffect(() => {
    if (open && !editing) {
      form.reset(defaultValues);
    }
  }, [open, editing, form, defaultValues]);
}
