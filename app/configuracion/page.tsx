"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";

import { CreditCard, Plus, Save, Trash2, Upload } from "lucide-react";

import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

interface LoyaltyBenefit {
  beneficio: string;
  compras: number;
  descripcion: string;
}

interface BusinessConfig {
  address: string;
  businessType: string;
  email: string;
  logo: string;
  loyaltyCard: {
    benefits: LoyaltyBenefit[];
    color: string;
    subtitle: string;
    textColor: string;
    title: string;
    totalSlots: number;
  };
  name: string;
  phone: string;
  plan: "Standard" | "Gold" | "Premium";
  primaryColor: string;
  website: string;
}

export default function ConfiguracionPage() {
  const { setThemeColor } = useTheme();
  const [config, setConfig] = useState<BusinessConfig>({
    name: "FidelizaClientes",
    address: "Calle Principal 123, Madrid",
    businessType: "Cafetería",
    logo: "/placeholder.svg?height=80&width=80",
    plan: "Gold",
    phone: "+34 612 345 678",
    email: "contacto@fidelizaclientes.com",
    website: "www.fidelizaclientes.com",
    primaryColor: "#1e40af", // Color primario por defecto (azul)
    loyaltyCard: {
      color: "#1e40af",
      textColor: "#ffffff",
      title: "Tarjeta de Fidelización",
      subtitle: "Acumula compras y obtén beneficios exclusivos",
      totalSlots: 10,
      benefits: [
        {
          compras: 3,
          beneficio: "10% de descuento",
          descripcion: "En tu próxima compra",
        },
        {
          compras: 5,
          beneficio: "30% de descuento",
          descripcion: "En productos seleccionados",
        },
        {
          compras: 10,
          beneficio: "50% de descuento",
          descripcion: "En cualquier producto",
        },
      ],
    },
  });

  // Para la vista previa de la tarjeta
  const [previewCompras, setPreviewCompras] = useState(3);

  // Guardar configuración en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem(
      "businessConfig",
      JSON.stringify({
        name: config.name,
        logo: config.logo,
        primaryColor: config.primaryColor,
      }),
    );

    // Actualizar el color primario en toda la aplicación
    setThemeColor(config.primaryColor);
  }, [config.name, config.logo, config.primaryColor, setThemeColor]);

  // Función para actualizar la configuración
  const updateConfig = (key: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // Función para actualizar la tarjeta de fidelización
  const updateLoyaltyCard = (key: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      loyaltyCard: {
        ...prev.loyaltyCard,
        [key]: value,
      },
    }));
  };

  // Función para añadir un nuevo beneficio
  const addBenefit = () => {
    const newBenefit: LoyaltyBenefit = {
      compras: 1,
      beneficio: "Nuevo beneficio",
      descripcion: "Descripción del beneficio",
    };

    updateLoyaltyCard("benefits", [...config.loyaltyCard.benefits, newBenefit]);
  };

  // Función para eliminar un beneficio
  const removeBenefit = (index: number) => {
    const newBenefits = [...config.loyaltyCard.benefits];
    newBenefits.splice(index, 1);
    updateLoyaltyCard("benefits", newBenefits);
  };

  // Función para actualizar un beneficio
  const updateBenefit = (index: number, field: keyof LoyaltyBenefit, value: any) => {
    const newBenefits = [...config.loyaltyCard.benefits];
    newBenefits[index] = {
      ...newBenefits[index],
      [field]: value,
    };
    updateLoyaltyCard("benefits", newBenefits);
  };

  // Función para guardar cambios
  const saveChanges = () => {
    toast({
      title: "Configuración guardada",
      description: "Los cambios han sido guardados correctamente.",
    });
  };

  // Función para obtener el beneficio actual según las compras
  const getCurrentBenefit = (compras: number): LoyaltyBenefit | null => {
    // Ordenamos los beneficios por número de compras (descendente)
    const sortedBenefits = [...config.loyaltyCard.benefits].sort((a, b) => b.compras - a.compras);

    // Encontramos el primer beneficio que requiere menos o igual número de compras que las actuales
    for (const benefit of sortedBenefits) {
      if (compras >= benefit.compras) {
        return benefit;
      }
    }

    return null;
  };

  // Función para obtener el próximo beneficio según las compras
  const getNextBenefit = (compras: number): LoyaltyBenefit | null => {
    // Ordenamos los beneficios por número de compras (ascendente)
    const sortedBenefits = [...config.loyaltyCard.benefits].sort((a, b) => a.compras - b.compras);

    // Encontramos el primer beneficio que requiere más compras que las actuales
    for (const benefit of sortedBenefits) {
      if (compras < benefit.compras) {
        return benefit;
      }
    }

    return null;
  };

  return (
    <div className="flex h-full flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center gap-4 px-4">
          <SidebarTrigger />
          <h1 className="text-xl font-bold">Configuración</h1>
        </div>
      </header>
      <div className="flex items-center justify-between px-6 pb-2 pt-6">
        <h2 className="text-lg font-medium">Ajustes del Negocio</h2>
        <Button onClick={saveChanges}>
          <Save className="mr-2 h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>
      <main className="flex-1 overflow-auto px-6 pb-6">
        <Tabs defaultValue="negocio" className="space-y-6">
          <TabsList>
            <TabsTrigger value="negocio">Negocio</TabsTrigger>
            <TabsTrigger value="apariencia">Apariencia</TabsTrigger>
            <TabsTrigger value="tarjeta">Tarjeta de Fidelización</TabsTrigger>
            <TabsTrigger value="plan">Plan</TabsTrigger>
            <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
          </TabsList>

          <TabsContent value="negocio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información del Negocio</CardTitle>
                <CardDescription>Configura la información básica de tu negocio.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Nombre del Negocio</Label>
                    <Input
                      id="business-name"
                      value={config.name}
                      onChange={e => updateConfig("name", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="business-type">Tipo de Negocio</Label>
                    <Select
                      value={config.businessType}
                      onValueChange={value => updateConfig("businessType", value)}
                    >
                      <SelectTrigger id="business-type">
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cafetería">Cafetería</SelectItem>
                        <SelectItem value="Restaurante">Restaurante</SelectItem>
                        <SelectItem value="Tienda">Tienda</SelectItem>
                        <SelectItem value="Peluquería">Peluquería</SelectItem>
                        <SelectItem value="Gimnasio">Gimnasio</SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="business-address">Dirección</Label>
                    <Textarea
                      id="business-address"
                      value={config.address}
                      onChange={e => updateConfig("address", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="business-phone">Teléfono</Label>
                      <Input
                        id="business-phone"
                        value={config.phone}
                        onChange={e => updateConfig("phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="business-email">Email</Label>
                      <Input
                        id="business-email"
                        type="email"
                        value={config.email}
                        onChange={e => updateConfig("email", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="business-website">Sitio Web</Label>
                    <Input
                      id="business-website"
                      value={config.website}
                      onChange={e => updateConfig("website", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Logo del Negocio</CardTitle>
                <CardDescription>
                  Sube el logo de tu negocio. Se mostrará en el sidebar y en la tarjeta de
                  fidelización.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-6 md:flex-row">
                  <div className="relative h-32 w-32 overflow-hidden rounded-lg border">
                    <Image
                      src={config.logo || "/placeholder.svg"}
                      alt="Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                      <Button variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Subir Logo
                      </Button>
                      <Button variant="outline" className="text-destructive hover:text-destructive">
                        Eliminar
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Formatos permitidos: JPG, PNG. Tamaño máximo: 2MB.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="apariencia" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personalización de Apariencia</CardTitle>
                <CardDescription>
                  Personaliza los colores y el aspecto de tu plataforma.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Color Primario</Label>
                    <div className="flex items-center gap-4">
                      <input
                        type="color"
                        value={config.primaryColor}
                        onChange={e => updateConfig("primaryColor", e.target.value)}
                        className="h-10 w-10 cursor-pointer rounded-md"
                      />
                      <Input
                        value={config.primaryColor}
                        onChange={e => updateConfig("primaryColor", e.target.value)}
                        className="flex-1"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Este color se aplicará a botones, enlaces y elementos destacados en toda la
                      plataforma.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Previsualización</Label>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="rounded-md border p-4">
                          <h3 className="mb-2 font-medium">Elementos de la interfaz</h3>
                          <div className="space-y-2">
                            <Button
                              style={{ backgroundColor: config.primaryColor }}
                              className="w-full transition-colors"
                            >
                              Botón Primario
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full border-primary text-primary hover:bg-primary/10"
                            >
                              Botón Secundario
                            </Button>
                            <div className="flex items-center space-x-2">
                              <Switch id="preview-switch" />
                              <Label htmlFor="preview-switch">Toggle</Label>
                            </div>
                            <div
                              className="h-2 rounded-full"
                              style={{ backgroundColor: config.primaryColor }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="rounded-md border p-4">
                          <h3 className="mb-2 font-medium">Efectos hover</h3>
                          <div className="space-y-2">
                            <div
                              className="rounded-md border p-4 transition-colors hover:shadow-md"
                              style={
                                {
                                  "--hover-color": `${config.primaryColor}10`,
                                } as React.CSSProperties
                              }
                              onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = `${config.primaryColor}10`;
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = "";
                              }}
                            >
                              Hover en tarjetas
                            </div>
                            <div
                              className="rounded-md border p-4 transition-colors"
                              style={
                                {
                                  "--hover-color": `${config.primaryColor}10`,
                                } as React.CSSProperties
                              }
                              onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = `${config.primaryColor}10`;
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = "";
                              }}
                            >
                              Hover en elementos del menú
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Paletas predefinidas</Label>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                      <ColorPaletteButton
                        color="#1e40af"
                        onClick={() => updateConfig("primaryColor", "#1e40af")}
                        isSelected={config.primaryColor === "#1e40af"}
                      />
                      <ColorPaletteButton
                        color="#0891b2"
                        onClick={() => updateConfig("primaryColor", "#0891b2")}
                        isSelected={config.primaryColor === "#0891b2"}
                      />
                      <ColorPaletteButton
                        color="#059669"
                        onClick={() => updateConfig("primaryColor", "#059669")}
                        isSelected={config.primaryColor === "#059669"}
                      />
                      <ColorPaletteButton
                        color="#7c3aed"
                        onClick={() => updateConfig("primaryColor", "#7c3aed")}
                        isSelected={config.primaryColor === "#7c3aed"}
                      />
                      <ColorPaletteButton
                        color="#db2777"
                        onClick={() => updateConfig("primaryColor", "#db2777")}
                        isSelected={config.primaryColor === "#db2777"}
                      />
                      <ColorPaletteButton
                        color="#ea580c"
                        onClick={() => updateConfig("primaryColor", "#ea580c")}
                        isSelected={config.primaryColor === "#ea580c"}
                      />
                      <ColorPaletteButton
                        color="#d97706"
                        onClick={() => updateConfig("primaryColor", "#d97706")}
                        isSelected={config.primaryColor === "#d97706"}
                      />
                      <ColorPaletteButton
                        color="#4b5563"
                        onClick={() => updateConfig("primaryColor", "#4b5563")}
                        isSelected={config.primaryColor === "#4b5563"}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tarjeta" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personalización de Tarjeta</CardTitle>
                    <CardDescription>
                      Personaliza el aspecto de la tarjeta de fidelización.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-title">Título de la Tarjeta</Label>
                        <Input
                          id="card-title"
                          value={config.loyaltyCard.title}
                          onChange={e => updateLoyaltyCard("title", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="card-subtitle">Subtítulo</Label>
                        <Input
                          id="card-subtitle"
                          value={config.loyaltyCard.subtitle}
                          onChange={e => updateLoyaltyCard("subtitle", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Color de Fondo</Label>
                        <div className="flex items-center gap-4">
                          <input
                            type="color"
                            value={config.loyaltyCard.color}
                            onChange={e => updateLoyaltyCard("color", e.target.value)}
                            className="h-10 w-10 cursor-pointer rounded-md"
                          />
                          <Input
                            value={config.loyaltyCard.color}
                            onChange={e => updateLoyaltyCard("color", e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Color del Texto</Label>
                        <div className="flex items-center gap-4">
                          <input
                            type="color"
                            value={config.loyaltyCard.textColor}
                            onChange={e => updateLoyaltyCard("textColor", e.target.value)}
                            className="h-10 w-10 cursor-pointer rounded-md"
                          />
                          <Input
                            value={config.loyaltyCard.textColor}
                            onChange={e => updateLoyaltyCard("textColor", e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="total-slots">Número Total de Slots</Label>
                        <div className="flex items-center gap-4">
                          <Input
                            id="total-slots"
                            type="number"
                            min="1"
                            max="20"
                            value={config.loyaltyCard.totalSlots}
                            onChange={e =>
                              updateLoyaltyCard("totalSlots", Number.parseInt(e.target.value) || 10)
                            }
                            className="w-20"
                          />
                          <span className="text-sm text-muted-foreground">
                            Número de compras necesarias para completar la tarjeta
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Beneficios por Compras</CardTitle>
                      <CardDescription>
                        Define los beneficios según el número de compras acumuladas.
                      </CardDescription>
                    </div>
                    <Button size="sm" variant="outline" onClick={addBenefit}>
                      <Plus className="mr-1 h-4 w-4" /> Añadir
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {config.loyaltyCard.benefits.length === 0 ? (
                        <div className="py-4 text-center text-muted-foreground">
                          No hay beneficios configurados. Añade uno para comenzar.
                        </div>
                      ) : (
                        config.loyaltyCard.benefits.map((benefit, index) => (
                          <div key={index} className="space-y-3 rounded-md border p-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">Beneficio {index + 1}</h4>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 text-destructive"
                                onClick={() => removeBenefit(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Eliminar</span>
                              </Button>
                            </div>
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <Label htmlFor={`compras-${index}`}>Compras necesarias</Label>
                                <Input
                                  id={`compras-${index}`}
                                  type="number"
                                  min="1"
                                  max={config.loyaltyCard.totalSlots}
                                  value={benefit.compras}
                                  onChange={e =>
                                    updateBenefit(
                                      index,
                                      "compras",
                                      Number.parseInt(e.target.value) || 1,
                                    )
                                  }
                                />
                              </div>
                              <div className="space-y-1">
                                <Label htmlFor={`beneficio-${index}`}>Beneficio</Label>
                                <Input
                                  id={`beneficio-${index}`}
                                  value={benefit.beneficio}
                                  onChange={e => updateBenefit(index, "beneficio", e.target.value)}
                                />
                              </div>
                              <div className="space-y-1">
                                <Label htmlFor={`descripcion-${index}`}>Descripción</Label>
                                <Input
                                  id={`descripcion-${index}`}
                                  value={benefit.descripcion}
                                  onChange={e =>
                                    updateBenefit(index, "descripcion", e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Vista Previa</CardTitle>
                    <CardDescription>Así se verá tu tarjeta de fidelización.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center space-y-6 p-6">
                    <div
                      className="flex aspect-[1.6/1] w-full max-w-md flex-col justify-between rounded-xl p-6 shadow-lg"
                      style={{
                        backgroundColor: config.loyaltyCard.color,
                        color: config.loyaltyCard.textColor,
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold">{config.loyaltyCard.title}</h3>
                          <p className="text-sm opacity-90">{config.loyaltyCard.subtitle}</p>
                        </div>
                        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white/20">
                          <Image
                            src={config.logo || "/placeholder.svg"}
                            alt="Logo"
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                      </div>

                      <div className="mt-auto">
                        <div className="mb-1 text-sm opacity-80">Cliente</div>
                        <div className="text-lg font-bold">Juan Pérez</div>

                        {/* Slots de compras */}
                        <div className="mb-1 mt-3 flex items-center justify-between">
                          <span className="text-sm opacity-80">
                            Compras acumuladas: {previewCompras}
                          </span>
                          {getCurrentBenefit(previewCompras) && (
                            <span className="rounded-full bg-white/20 px-2 py-1 text-sm font-bold">
                              {getCurrentBenefit(previewCompras)?.beneficio}
                            </span>
                          )}
                        </div>
                        <div className="mt-1 grid grid-cols-10 gap-1">
                          {Array.from({
                            length: config.loyaltyCard.totalSlots,
                          }).map((_, i) => (
                            <div
                              key={i}
                              className={`h-3 rounded-full ${i < previewCompras ? "bg-white" : "bg-white/20"}`}
                            ></div>
                          ))}
                        </div>

                        {/* Próximo beneficio */}
                        {getNextBenefit(previewCompras) && (
                          <div className="mt-2 text-xs opacity-80">
                            Próximo beneficio: {getNextBenefit(previewCompras)?.beneficio} (
                            {getNextBenefit(previewCompras)?.compras - previewCompras} compras más)
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="w-full space-y-2">
                      <Label>Simular compras acumuladas</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={[previewCompras]}
                          min={0}
                          max={config.loyaltyCard.totalSlots}
                          step={1}
                          onValueChange={value => setPreviewCompras(value[0])}
                        />
                        <span className="w-8 text-center">{previewCompras}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ejemplo de Beneficios</CardTitle>
                    <CardDescription>Resumen de los beneficios configurados.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {config.loyaltyCard.benefits.length === 0 ? (
                        <div className="py-4 text-center text-muted-foreground">
                          No hay beneficios configurados.
                        </div>
                      ) : (
                        config.loyaltyCard.benefits
                          .sort((a, b) => a.compras - b.compras)
                          .map((benefit, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 rounded-md border p-3"
                            >
                              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                {benefit.compras}
                              </div>
                              <div>
                                <h4 className="font-medium">{benefit.beneficio}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {benefit.descripcion}
                                </p>
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="plan" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Plan Actual</CardTitle>
                <CardDescription>Gestiona tu plan de suscripción.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="rounded-lg bg-muted p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary p-3 text-primary-foreground">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Plan Actual</p>
                        <p className="text-lg font-medium">{config.plan}</p>
                      </div>
                      <div className="ml-auto">
                        <Badge
                          className={config.plan === "Premium" ? "bg-purple-600" : "bg-yellow-500"}
                        >
                          {config.plan}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Selecciona un Plan</Label>
                    <RadioGroup
                      defaultValue={config.plan}
                      onValueChange={value => updateConfig("plan", value)}
                      className="grid grid-cols-1 gap-4 md:grid-cols-3"
                    >
                      <div className="flex flex-col items-start space-y-2 rounded-md border p-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Standard" id="plan-standard" />
                          <Label htmlFor="plan-standard" className="font-medium">
                            Standard
                          </Label>
                        </div>
                        <p className="pl-6 text-sm text-muted-foreground">Hasta 500 clientes</p>
                        <p className="mt-2 text-xl font-bold">€29/mes</p>
                      </div>
                      <div className="flex flex-col items-start space-y-2 rounded-md border border-yellow-500 p-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Gold" id="plan-gold" />
                          <Label htmlFor="plan-gold" className="font-medium">
                            Gold
                          </Label>
                        </div>
                        <p className="pl-6 text-sm text-muted-foreground">Hasta 2000 clientes</p>
                        <p className="mt-2 text-xl font-bold">€59/mes</p>
                      </div>
                      <div className="flex flex-col items-start space-y-2 rounded-md border border-purple-500 p-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Premium" id="plan-premium" />
                          <Label htmlFor="plan-premium" className="font-medium">
                            Premium
                          </Label>
                        </div>
                        <p className="pl-6 text-sm text-muted-foreground">Clientes ilimitados</p>
                        <p className="mt-2 text-xl font-bold">€99/mes</p>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button className="w-full">Actualizar Plan</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notificaciones" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Notificaciones</CardTitle>
                <CardDescription>
                  Configura cómo y cuándo se envían las notificaciones a tus clientes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notificaciones Push</Label>
                        <p className="text-sm text-muted-foreground">
                          Enviar notificaciones push a los clientes
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notificaciones por Email</Label>
                        <p className="text-sm text-muted-foreground">
                          Enviar notificaciones por email
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notificaciones Automáticas</Label>
                        <p className="text-sm text-muted-foreground">
                          Enviar notificaciones automáticas para promociones
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Recordatorios</Label>
                        <p className="text-sm text-muted-foreground">
                          Enviar recordatorios de promociones a punto de expirar
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label>Frecuencia de Notificaciones</Label>
                    <div className="space-y-5">
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <Label>Máximo de notificaciones por semana</Label>
                          <span>3</span>
                        </div>
                        <Slider defaultValue={[3]} max={7} step={1} />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <Label>Hora preferida de envío</Label>
                          <span>14:00</span>
                        </div>
                        <Slider defaultValue={[14]} max={23} step={1} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// Componente Badge
function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`rounded-full px-2 py-1 text-xs font-medium text-white ${className}`}>
      {children}
    </span>
  );
}

// Componente Separator
function Separator() {
  return <div className="my-4 h-px bg-border" />;
}

// Componente para los botones de paleta de colores
function ColorPaletteButton({
  color,
  isSelected,
  onClick,
}: {
  color: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`aspect-square w-full rounded-md transition-all ${isSelected ? "ring-2 ring-offset-2" : "hover:scale-105"}`}
      style={{ backgroundColor: color, ringColor: color }}
      onClick={onClick}
      aria-label={`Seleccionar color ${color}`}
    />
  );
}
