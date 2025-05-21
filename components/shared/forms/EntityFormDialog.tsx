"use client";

import * as React from "react";
import { FiCheck } from "react-icons/fi";

import { EntityFormDialogProps } from "./types/entityFormDialog";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ACTIONS_CONSTS } from "@/constants/actions";
import { FormFieldTypeEnum, FormModeEnum } from "@/types/forms";

export function EntityFormDialog<T>({
  children,
  confirmMessage = ACTIONS_CONSTS.CONFIRM_ACTION,
  fields,
  initialValues = {},
  mode = FormModeEnum.CREATE,
  onClose,
  onSubmit,
  open,
  title,
}: EntityFormDialogProps<T>) {
  const [formState, setFormState] = React.useState<Record<string, any>>(initialValues);

  const handleChange = (name: string, value: any) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const id = (initialValues as any)?.id ?? Date.now();
    onSubmit({ ...formState, id } as T);
    if (onClose) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="space-y-4">
        <DialogTitle>{title}</DialogTitle>

        {fields.map(({ label, name, options, type = "text" }) => (
          <div className="space-y-2" key={name}>
            <Label htmlFor={name}>{label}</Label>

            {type === FormFieldTypeEnum.SELECT && options ? (
              <Select value={formState[name] || ""} onValueChange={val => handleChange(name, val)}>
                <SelectTrigger>
                  <SelectValue placeholder={`Seleccionar ${label.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                  {options.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : type === FormFieldTypeEnum.TEXTAREA ? (
              <textarea
                className="w-full rounded-md border border-input bg-background p-2 text-sm shadow-sm"
                id={name}
                value={formState[name] || ""}
                onChange={e => handleChange(name, e.target.value)}
              />
            ) : (
              <Input
                id={name}
                type={type}
                value={formState[name] || ""}
                onChange={e => handleChange(name, e.target.value)}
              />
            )}
          </div>
        ))}

        <Button className="w-full" onClick={handleSubmit}>
          <FiCheck className="mr-2" />
          {mode === FormModeEnum.EDIT ? ACTIONS_CONSTS.UPDATE_ACTION : confirmMessage}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
