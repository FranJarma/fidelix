"use client";

import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FiCheck } from "react-icons/fi";

interface Field {
  name: string;
  label: string;
  type?: string;
}

interface EntityFormDialogProps<T> {
  confirmMessage?: string;
  title: string;
  mode?: "create" | "edit";
  initialValues?: Partial<T>;
  fields: Field[];
  open?: boolean;
  onSubmit: (values: T) => void;
  onClose?: () => void;
  children?: React.ReactNode;
}

export function EntityFormDialog<T>({
  confirmMessage = "Confirmar",
  title,
  initialValues = {},
  fields,
  open,
  onSubmit,
  onClose,
  children,
}: EntityFormDialogProps<T>) {
  const [formState, setFormState] = React.useState<Record<string, any>>({});

  React.useEffect(() => {
    if (open && initialValues) {
      setFormState(initialValues);
    }
  }, [open]);

  const handleChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit({
      ...formState,
      id: formState.id || Date.now(),
    } as T);
    if (onClose) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="space-y-4">
        <DialogTitle title={title}>{title}</DialogTitle>
        {fields.map((field) => (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              type={field.type || "text"}
              value={formState[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          </div>
        ))}
        <Button className="w-full" onClick={handleSubmit}>
          <FiCheck />
          {confirmMessage}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
