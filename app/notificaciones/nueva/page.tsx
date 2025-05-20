"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";

import { ArrowLeft, Bell, Calendar, Send, Tag, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

export default function NuevaNotificacionPage() {
  const [notificacion, setNotificacion] = useState({
    titulo: "",
    mensaje: "",
    tipo: "promocion",
    programada: false,
    fechaEnvio: "",
    horaEnvio: "",
    segmento: "todos",
    promocionRelacionada: "",
    enviarPush: true,
    enviarEmail: true,
  });

  const handleChange = (field: string, value: any) => {
    setNotificacion(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí iría la lógica para enviar la notificación
    console.log("Notificación a enviar:", notificacion);

    toast({
      title: "Notificación creada",
      description: notificacion.programada
        ? "La notificación ha sido programada correctamente."
        : "La notificación ha sido enviada correctamente.",
    });
  };

  return (
    <div className="flex h-full flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center gap-4 px-4">
          <SidebarTrigger />
          <Link
            href="/notificaciones"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver</span>
          </Link>
          <h1 className="text-xl font-bold">Nueva Notificación</h1>
        </div>
      </header>
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-3xl">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Crear Nueva Notificación</CardTitle>
                <CardDescription>
                  Configura los detalles de la notificación que quieres enviar a tus clientes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título de la notificación</Label>
                    <Input
                      id="titulo"
                      placeholder="Ej: Nueva promoción disponible"
                      value={notificacion.titulo}
                      onChange={e => handleChange("titulo", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensaje">Mensaje</Label>
                    <Textarea
                      id="mensaje"
                      placeholder="Escribe el contenido de la notificación"
                      value={notificacion.mensaje}
                      onChange={e => handleChange("mensaje", e.target.value)}
                      required
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tipo de notificación</Label>
                    <RadioGroup
                      value={notificacion.tipo}
                      onValueChange={value => handleChange("tipo", value)}
                      className="grid grid-cols-1 gap-4 md:grid-cols-3"
                    >
                      <div className="flex items-center space-x-2 rounded-md border p-4">
                        <RadioGroupItem value="promocion" id="promocion" />
                        <Label
                          htmlFor="promocion"
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <Tag className="h-4 w-4" />
                          <span>Promoción</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-4">
                        <RadioGroupItem value="recordatorio" id="recordatorio" />
                        <Label
                          htmlFor="recordatorio"
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <Bell className="h-4 w-4" />
                          <span>Recordatorio</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-4">
                        <RadioGroupItem value="informativa" id="informativa" />
                        <Label
                          htmlFor="informativa"
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <Users className="h-4 w-4" />
                          <span>Informativa</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="programada"
                      checked={notificacion.programada}
                      onCheckedChange={checked => handleChange("programada", checked)}
                    />
                    <Label htmlFor="programada">Programar envío</Label>
                  </div>

                  {notificacion.programada && (
                    <div className="grid grid-cols-1 gap-4 border-l-2 border-muted pl-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="fechaEnvio">Fecha de envío</Label>
                        <div className="relative">
                          <Input
                            id="fechaEnvio"
                            type="date"
                            value={notificacion.fechaEnvio}
                            onChange={e => handleChange("fechaEnvio", e.target.value)}
                            required={notificacion.programada}
                          />
                          <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="horaEnvio">Hora de envío</Label>
                        <Input
                          id="horaEnvio"
                          type="time"
                          value={notificacion.horaEnvio}
                          onChange={e => handleChange("horaEnvio", e.target.value)}
                          required={notificacion.programada}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="segmento">Segmento de clientes</Label>
                    <Select
                      value={notificacion.segmento}
                      onValueChange={value => handleChange("segmento", value)}
                    >
                      <SelectTrigger id="segmento">
                        <SelectValue placeholder="Selecciona un segmento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos los clientes</SelectItem>
                        <SelectItem value="nuevos">Clientes nuevos</SelectItem>
                        <SelectItem value="frecuentes">Clientes frecuentes</SelectItem>
                        <SelectItem value="inactivos">Clientes inactivos</SelectItem>
                        <SelectItem value="bronce">Nivel Bronce</SelectItem>
                        <SelectItem value="plata">Nivel Plata</SelectItem>
                        <SelectItem value="oro">Nivel Oro</SelectItem>
                        <SelectItem value="platino">Nivel Platino</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {notificacion.tipo === "promocion" && (
                    <div className="space-y-2">
                      <Label htmlFor="promocionRelacionada">Promoción relacionada</Label>
                      <Select
                        value={notificacion.promocionRelacionada}
                        onValueChange={value => handleChange("promocionRelacionada", value)}
                      >
                        <SelectTrigger id="promocionRelacionada">
                          <SelectValue placeholder="Selecciona una promoción" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">2x1 en Cafés</SelectItem>
                          <SelectItem value="2">30% de descuento</SelectItem>
                          <SelectItem value="3">Postre gratis</SelectItem>
                          <SelectItem value="4">Acumula puntos dobles</SelectItem>
                          <SelectItem value="5">50% en segunda compra</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Canales de envío</Label>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="flex items-center space-x-2 rounded-md border p-4">
                        <Checkbox
                          id="enviarPush"
                          checked={notificacion.enviarPush}
                          onCheckedChange={checked => handleChange("enviarPush", checked)}
                        />
                        <Label htmlFor="enviarPush" className="flex-1 cursor-pointer">
                          Notificación Push
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-4">
                        <Checkbox
                          id="enviarEmail"
                          checked={notificacion.enviarEmail}
                          onCheckedChange={checked => handleChange("enviarEmail", checked)}
                        />
                        <Label htmlFor="enviarEmail" className="flex-1 cursor-pointer">
                          Email
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" type="button" asChild>
                      <Link href="/notificaciones">Cancelar</Link>
                    </Button>
                    <div className="space-x-2">
                      <Button variant="outline" type="button">
                        Vista previa
                      </Button>
                      <Button type="submit">
                        <Send className="mr-2 h-4 w-4" />
                        {notificacion.programada ? "Programar notificación" : "Enviar notificación"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </main>
    </div>
  );
}
