"use client";

import * as React from "react";
import { FiCheck } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Field {
  label: string;
  name: string;
  type?: string;
}

interface EntityFormDialogProps<T> {
  children?: React.ReactNode;
  confirmMessage?: string;
  fields: Field[];
  initialValues?: Partial<T>;
  mode?: "create" | "edit";
  onClose?: () => void;
  onSubmit: (values: T) => void;
  open?: boolean;
  title: string;
}

export function EntityFormDialog<T>({
  children,
  confirmMessage = "Confirmar",
  fields,
  initialValues = {},
  onClose,
  onSubmit,
  open,
  title,
}: EntityFormDialogProps<T>) {
  const [formState, setFormState] = React.useState<Record<string, any>>({});

  React.useEffect(() => {
    if (open && initialValues) {
      setFormState(initialValues);
    }
  }, [open]);

  const handleChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
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
        {fields.map(field => (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              type={field.type || "text"}
              value={formState[field.name] || ""}
              onChange={e => handleChange(field.name, e.target.value)}
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
