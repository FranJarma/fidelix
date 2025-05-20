"use client";

import { useState } from "react";

import type { Client } from "../types/clients";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SourceEnum } from "@/types/sources";

interface Props {
  children: React.ReactNode;
  onCreate: (client: Client) => void;
}

export function ClientFormDialog({ children, onCreate }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleSubmit = () => {
    const client: Client = {
      ...form,
      id: Date.now(),
      points: 0,
      level: "bronce",
      source: SourceEnum.ON_SITE,
    };
    onCreate(client);
    setForm({ name: "", lastName: "", email: "", phone: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="space-y-4">
        <div className="space-y-2">
          <Label>Nombre</Label>
          <Input
            value={form.name}
            onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Apellido</Label>
          <Input
            value={form.lastName}
            onChange={e => setForm(f => ({ ...f, apellido: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Teléfono</Label>
          <Input
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))}
          />
        </div>
        <Button className="w-full" onClick={handleSubmit}>
          Guardar Cliente
        </Button>
      </DialogContent>
    </Dialog>
  );
}
