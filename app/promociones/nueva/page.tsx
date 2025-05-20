"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";

import { ArrowLeft, Bell, Calendar, Gift, Percent, QrCode, Star, Tag } from "lucide-react";

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

export default function NuevaPromocionPage() {
  const [promocion, setPromocion] = useState({
    nombre: "",
    descripcion: "",
    tipo: "2x1",
    fechaInicio: "",
    fechaFin: "",
    horaInicio: "00:00",
    horaFin: "23:59",
    limite: "",
    segmento: "todos",
    valor: "",
    condicion: "",
    notificarCreacion: true,
    notificarRecordatorio: false,
    diasRecordatorio: "1",
    activa: true,
    productos: [] as string[],
  });

  const handleChange = (field: string, value: any) => {
    setPromocion(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí iría la lógica para crear la promoción
    console.log("Promoción a crear:", promocion);

    toast({
      title: "Promoción creada",
      description: "La promoción ha sido creada correctamente.",
    });
  };

  // Lista de productos disponibles para la promoción
  const productosDisponibles = [
    { id: "1", nombre: "Café Americano" },
    { id: "2", nombre: "Café Latte" },
    { id: "3", nombre: "Cappuccino" },
    { id: "4", nombre: "Espresso" },
    { id: "5", nombre: "Muffin de Chocolate" },
    { id: "6", nombre: "Croissant" },
    { id: "7", nombre: "Sandwich de Jamón y Queso" },
    { id: "8", nombre: "Ensalada César" },
  ];

  return (
    <div className="flex h-full flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center gap-4 px-4">
          <SidebarTrigger />
          <Link
            href="/promociones"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver</span>
          </Link>
          <h1 className="text-xl font-bold">Nueva Promoción</h1>
        </div>
      </header>
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-3xl">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Crear Nueva Promoción</CardTitle>
                <CardDescription>
                  Configura los detalles de tu nueva promoción para tus clientes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre de la promoción</Label>
                    <Input
                      id="nombre"
                      placeholder="Ej: 2x1 en Cafés"
                      value={promocion.nombre}
                      onChange={e => handleChange("nombre", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descripcion">Descripción</Label>
                    <Textarea
                      id="descripcion"
                      placeholder="Describe los detalles de la promoción"
                      value={promocion.descripcion}
                      onChange={e => handleChange("descripcion", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tipo de promoción</Label>
                    <RadioGroup
                      value={promocion.tipo}
                      onValueChange={value => handleChange("tipo", value)}
                      className="grid grid-cols-1 gap-4 md:grid-cols-2"
                    >
                      <div className="flex items-center space-x-2 rounded-md border p-4">
                        <RadioGroupItem value="2x1" id="2x1" />
                        <Label htmlFor="2x1" className="flex cursor-pointer items-center gap-2">
                          <Tag className="h-4 w-4" />
                          <span>2x1</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-4">
                        <RadioGroupItem value="descuento" id="descuento" />
                        <Label
                          htmlFor="descuento"
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <Percent className="h-4 w-4" />
                          <span>Descuento</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-4">
                        <RadioGroupItem value="gratis" id="gratis" />
                        <Label htmlFor="gratis" className="flex cursor-pointer items-center gap-2">
                          <Gift className="h-4 w-4" />
                          <span>Producto gratis</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-4">
                        <RadioGroupItem value="puntos" id="puntos" />
                        <Label htmlFor="puntos" className="flex cursor-pointer items-center gap-2">
                          <Star className="h-4 w-4" />
                          <span>Puntos</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {promocion.tipo === "descuento" && (
                    <div className="space-y-2">
                      <Label htmlFor="valor">Porcentaje de descuento</Label>
                      <div className="flex items-center">
                        <Input
                          id="valor"
                          type="number"
                          min="1"
                          max="100"
                          placeholder="Ej: 20"
                          value={promocion.valor}
                          onChange={e => handleChange("valor", e.target.value)}
                          required
                          className="w-24"
                        />
                        <span className="ml-2">%</span>
                      </div>
                    </div>
                  )}

                  {promocion.tipo === "puntos" && (
                    <div className="space-y-2">
                      <Label htmlFor="valor">Cantidad de puntos</Label>
                      <Input
                        id="valor"
                        type="number"
                        min="1"
                        placeholder="Ej: 100"
                        value={promocion.valor}
                        onChange={e => handleChange("valor", e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Productos aplicables</Label>
                    <div className="max-h-48 space-y-2 overflow-y-auto rounded-md border p-4">
                      {productosDisponibles.map(producto => (
                        <div key={producto.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`producto-${producto.id}`}
                            checked={promocion.productos.includes(producto.id)}
                            onCheckedChange={checked => {
                              if (checked) {
                                handleChange("productos", [...promocion.productos, producto.id]);
                              } else {
                                handleChange(
                                  "productos",
                                  promocion.productos.filter(id => id !== producto.id),
                                );
                              }
                            }}
                          />
                          <Label htmlFor={`producto-${producto.id}`} className="cursor-pointer">
                            {producto.nombre}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {(promocion.tipo === "2x1" || promocion.tipo === "gratis") && (
                    <div className="space-y-2">
                      <Label htmlFor="condicion">Condición (opcional)</Label>
                      <Textarea
                        id="condicion"
                        placeholder="Ej: Con la compra de cualquier plato principal"
                        value={promocion.condicion}
                        onChange={e => handleChange("condicion", e.target.value)}
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fechaInicio">Fecha de inicio</Label>
                      <div className="relative">
                        <Input
                          id="fechaInicio"
                          type="date"
                          value={promocion.fechaInicio}
                          onChange={e => handleChange("fechaInicio", e.target.value)}
                          required
                        />
                        <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fechaFin">Fecha de fin</Label>
                      <div className="relative">
                        <Input
                          id="fechaFin"
                          type="date"
                          value={promocion.fechaFin}
                          onChange={e => handleChange("fechaFin", e.target.value)}
                          required
                        />
                        <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="horaInicio">Hora de inicio</Label>
                      <Input
                        id="horaInicio"
                        type="time"
                        value={promocion.horaInicio}
                        onChange={e => handleChange("horaInicio", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="horaFin">Hora de fin</Label>
                      <Input
                        id="horaFin"
                        type="time"
                        value={promocion.horaFin}
                        onChange={e => handleChange("horaFin", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="limite">Límite de usos (opcional)</Label>
                    <Input
                      id="limite"
                      type="number"
                      placeholder="Sin límite"
                      value={promocion.limite}
                      onChange={e => handleChange("limite", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="segmento">Segmento de clientes</Label>
                    <Select
                      value={promocion.segmento}
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

                  <div className="space-y-2">
                    <Label>Estado de la promoción</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="activa"
                        checked={promocion.activa}
                        onCheckedChange={checked => handleChange("activa", checked)}
                      />
                      <Label htmlFor="activa">Activar promoción inmediatamente</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Opciones de notificación</Label>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="flex items-center space-x-2 rounded-md border p-4">
                        <Checkbox
                          id="notificarCreacion"
                          checked={promocion.notificarCreacion}
                          onCheckedChange={checked => handleChange("notificarCreacion", checked)}
                        />
                        <Label
                          htmlFor="notificarCreacion"
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <Bell className="h-4 w-4" />
                          <span>Notificar al crear</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-4">
                        <Checkbox
                          id="notificarRecordatorio"
                          checked={promocion.notificarRecordatorio}
                          onCheckedChange={checked =>
                            handleChange("notificarRecordatorio", checked)
                          }
                        />
                        <Label
                          htmlFor="notificarRecordatorio"
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <Bell className="h-4 w-4" />
                          <span>Enviar recordatorio</span>
                        </Label>
                      </div>
                    </div>
                  </div>

                  {promocion.notificarRecordatorio && (
                    <div className="space-y-2 border-l-2 border-muted pl-6">
                      <Label htmlFor="diasRecordatorio">Días antes de expirar</Label>
                      <Select
                        value={promocion.diasRecordatorio}
                        onValueChange={value => handleChange("diasRecordatorio", value)}
                      >
                        <SelectTrigger id="diasRecordatorio">
                          <SelectValue placeholder="Selecciona los días" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 día antes</SelectItem>
                          <SelectItem value="2">2 días antes</SelectItem>
                          <SelectItem value="3">3 días antes</SelectItem>
                          <SelectItem value="5">5 días antes</SelectItem>
                          <SelectItem value="7">7 días antes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" type="button" asChild>
                      <Link href="/promociones">Cancelar</Link>
                    </Button>
                    <div className="space-x-2">
                      <Button variant="outline" type="button">
                        <QrCode className="mr-2 h-4 w-4" />
                        Vista previa QR
                      </Button>
                      <Button type="submit">Crear promoción</Button>
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
