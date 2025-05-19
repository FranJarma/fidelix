"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  Calendar,
  Download,
  LineChart,
  PieChart,
  RefreshCcw,
  TrendingUp,
  Users,
  Tag,
  Bell,
  ShoppingBag,
} from "lucide-react";

export default function EstadisticasPage() {
  const [periodo, setPeriodo] = useState("mes");

  return (
    <div className="flex flex-col h-full">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <SidebarTrigger />
          <h1 className="text-xl font-bold">Estadísticas</h1>
        </div>
      </header>
      <div className="flex justify-between items-center px-6 pt-6 pb-2">
        <h2 className="text-lg font-medium">Panel de Estadísticas</h2>
        <div className="flex items-center gap-4">
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Seleccionar periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semana">Última semana</SelectItem>
              <SelectItem value="mes">Último mes</SelectItem>
              <SelectItem value="trimestre">Último trimestre</SelectItem>
              <SelectItem value="año">Último año</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Actualizar
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>
      <main className="flex-1 pb-6 px-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Clientes Totales
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <div className="flex items-center pt-1">
                <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600">+12%</span>
                <span className="text-xs text-muted-foreground ml-1">
                  vs periodo anterior
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Ventas Totales
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€24,320</div>
              <div className="flex items-center pt-1">
                <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600">+8%</span>
                <span className="text-xs text-muted-foreground ml-1">
                  vs periodo anterior
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Promociones Activas
              </CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <div className="flex items-center pt-1">
                <span className="text-xs text-muted-foreground">
                  3 finalizan esta semana
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Tasa de Conversión
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32%</div>
              <div className="flex items-center pt-1">
                <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600">+4%</span>
                <span className="text-xs text-muted-foreground ml-1">
                  vs periodo anterior
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="ventas" className="space-y-4">
          <TabsList>
            <TabsTrigger value="ventas">Ventas</TabsTrigger>
            <TabsTrigger value="clientes">Clientes</TabsTrigger>
            <TabsTrigger value="promociones">Promociones</TabsTrigger>
            <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
          </TabsList>

          <TabsContent value="ventas" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Ventas por Periodo</CardTitle>
                  <CardDescription>
                    Evolución de ventas en el tiempo
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full bg-muted rounded-md">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <LineChart className="h-10 w-10 mb-2" />
                      <p>Gráfico de ventas por periodo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Ventas por Categoría</CardTitle>
                  <CardDescription>
                    Distribución de ventas por categoría de producto
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full bg-muted rounded-md">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <PieChart className="h-10 w-10 mb-2" />
                      <p>Gráfico de ventas por categoría</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-hover md:col-span-2">
                <CardHeader>
                  <CardTitle>Ventas por Día de la Semana</CardTitle>
                  <CardDescription>
                    Análisis de ventas según el día de la semana
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full bg-muted rounded-md">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <BarChart3 className="h-10 w-10 mb-2" />
                      <p>Gráfico de ventas por día de la semana</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clientes" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Nuevos Clientes</CardTitle>
                  <CardDescription>
                    Evolución de nuevos registros
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full bg-muted rounded-md">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <LineChart className="h-10 w-10 mb-2" />
                      <p>Gráfico de nuevos clientes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Distribución por Nivel</CardTitle>
                  <CardDescription>
                    Clientes por nivel de fidelización
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full bg-muted rounded-md">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <PieChart className="h-10 w-10 mb-2" />
                      <p>Gráfico de distribución por nivel</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-hover md:col-span-2">
                <CardHeader>
                  <CardTitle>Retención de Clientes</CardTitle>
                  <CardDescription>
                    Tasa de retención y frecuencia de compra
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full bg-muted rounded-md">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <BarChart3 className="h-10 w-10 mb-2" />
                      <p>Gráfico de retención de clientes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="promociones" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Uso de Promociones</CardTitle>
                  <CardDescription>
                    Número de usos por promoción
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full bg-muted rounded-md">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <BarChart3 className="h-10 w-10 mb-2" />
                      <p>Gráfico de uso de promociones</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Efectividad por Tipo</CardTitle>
                  <CardDescription>
                    Tasa de conversión por tipo de promoción
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full bg-muted rounded-md">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <PieChart className="h-10 w-10 mb-2" />
                      <p>Gráfico de efectividad por tipo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-hover md:col-span-2">
                <CardHeader>
                  <CardTitle>Impacto en Ventas</CardTitle>
                  <CardDescription>
                    Incremento de ventas por promoción
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full bg-muted rounded-md">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <LineChart className="h-10 w-10 mb-2" />
                      <p>Gráfico de impacto en ventas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notificaciones" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Tasa de Apertura</CardTitle>
                  <CardDescription>
                    Porcentaje de notificaciones abiertas
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full bg-muted rounded-md">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <LineChart className="h-10 w-10 mb-2" />
                      <p>Gráfico de tasa de apertura</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Conversión por Notificación</CardTitle>
                  <CardDescription>
                    Tasa de conversión por tipo de notificación
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full bg-muted rounded-md">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <BarChart3 className="h-10 w-10 mb-2" />
                      <p>Gráfico de conversión por notificación</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-hover md:col-span-2">
                <CardHeader>
                  <CardTitle>Mejor Hora de Envío</CardTitle>
                  <CardDescription>
                    Tasa de apertura según hora del día
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full bg-muted rounded-md">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <BarChart3 className="h-10 w-10 mb-2" />
                      <p>Gráfico de mejor hora de envío</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Mejores Clientes</CardTitle>
              <CardDescription>Por volumen de compras</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mejoresClientes.map((cliente, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">
                          {cliente.nombre} {cliente.apellido}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {cliente.nivel}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">€{cliente.compras}</p>
                      <p className="text-xs text-muted-foreground">
                        {cliente.transacciones} transacciones
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Promociones Más Usadas</CardTitle>
              <CardDescription>Por número de redenciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {promocionesPopulares.map((promocion, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${getPromocionColor(promocion.tipo)} text-white`}
                      >
                        <Tag className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{promocion.nombre}</p>
                        <p className="text-xs text-muted-foreground">
                          {promocion.tipo}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{promocion.usos} usos</p>
                      <p className="text-xs text-muted-foreground">
                        {promocion.conversion}% conversión
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Notificaciones Efectivas</CardTitle>
              <CardDescription>Por tasa de conversión</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notificacionesEfectivas.map((notificacion, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white">
                        <Bell className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{notificacion.titulo}</p>
                        <p className="text-xs text-muted-foreground">
                          {notificacion.fecha}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{notificacion.conversion}%</p>
                      <p className="text-xs text-muted-foreground">
                        {notificacion.aperturas} aperturas
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

// Función para obtener el color de la promoción
function getPromocionColor(tipo: string) {
  switch (tipo) {
    case "2x1":
      return "bg-blue-500";
    case "descuento":
      return "bg-green-500";
    case "gratis":
      return "bg-purple-500";
    case "puntos":
      return "bg-orange-500";
    default:
      return "bg-gray-500";
  }
}

// Datos de ejemplo
const mejoresClientes = [
  {
    nombre: "Carlos",
    apellido: "López",
    nivel: "Platino",
    compras: 2450,
    transacciones: 20,
  },
  {
    nombre: "María",
    apellido: "González",
    nivel: "Oro",
    compras: 1820,
    transacciones: 12,
  },
  {
    nombre: "Juan",
    apellido: "Pérez",
    nivel: "Plata",
    compras: 980,
    transacciones: 8,
  },
  {
    nombre: "Ana",
    apellido: "Rodríguez",
    nivel: "Bronce",
    compras: 560,
    transacciones: 5,
  },
  {
    nombre: "Laura",
    apellido: "Martínez",
    nivel: "Bronce",
    compras: 320,
    transacciones: 3,
  },
];

const promocionesPopulares = [
  { nombre: "2x1 en Cafés", tipo: "2x1", usos: 124, conversion: 68 },
  { nombre: "30% de descuento", tipo: "descuento", usos: 87, conversion: 52 },
  { nombre: "Postre gratis", tipo: "gratis", usos: 56, conversion: 45 },
  { nombre: "Acumula puntos", tipo: "puntos", usos: 203, conversion: 38 },
  { nombre: "2x1 en postres", tipo: "2x1", usos: 156, conversion: 32 },
];

const notificacionesEfectivas = [
  {
    titulo: "Promoción 2x1 en Cafés",
    fecha: "01/05/2025",
    conversion: 68,
    aperturas: 856,
  },
  {
    titulo: "30% de descuento",
    fecha: "01/05/2025",
    conversion: 52,
    aperturas: 743,
  },
  {
    titulo: "Postre gratis",
    fecha: "10/05/2025",
    conversion: 45,
    aperturas: 912,
  },
  {
    titulo: "Acumula puntos dobles",
    fecha: "01/06/2025",
    conversion: 38,
    aperturas: 624,
  },
  {
    titulo: "50% en segunda compra",
    fecha: "01/06/2025",
    conversion: 32,
    aperturas: 512,
  },
];
