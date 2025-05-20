import { BarChart3, Bell, Tag, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  return (
    <div className="flex h-full flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center gap-4 px-4">
          <SidebarTrigger />
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
      </header>
      <main className="flex-1 space-y-6 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground">+12% desde el mes pasado</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Promociones Activas</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">3 finalizan esta semana</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Notificaciones Enviadas</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">452</div>
              <p className="text-xs text-muted-foreground">+24% desde el mes pasado</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32%</div>
              <p className="text-xs text-muted-foreground">+4% desde el mes pasado</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="promociones" className="space-y-4">
          <TabsList>
            <TabsTrigger value="promociones">Promociones</TabsTrigger>
            <TabsTrigger value="clientes">Clientes Recientes</TabsTrigger>
            <TabsTrigger value="actividad">Actividad Reciente</TabsTrigger>
          </TabsList>
          <TabsContent value="promociones" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Promociones Activas</CardTitle>
                <CardDescription>Gestiona tus promociones actuales y crea nuevas.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {promociones.map(promocion => (
                  <div
                    key={promocion.id}
                    className="card-hover flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`rounded-md p-2 ${getPromocionColor(promocion.tipo)}`}>
                        {getPromocionIcon(promocion.tipo)}
                      </div>
                      <div>
                        <h3 className="font-medium">{promocion.nombre}</h3>
                        <p className="text-sm text-muted-foreground">{promocion.descripcion}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{promocion.usos} usos</span>
                      <Button variant="outline" size="sm">
                        Ver
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="clientes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Clientes Recientes</CardTitle>
                <CardDescription>
                  Los últimos clientes registrados en tu plataforma.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientes.map(cliente => (
                    <div
                      key={cliente.id}
                      className="card-hover flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                          <span className="font-medium">
                            {cliente.nombre.charAt(0)}
                            {cliente.apellido.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {cliente.nombre} {cliente.apellido}
                          </h3>
                          <p className="text-sm text-muted-foreground">{cliente.email}</p>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          {cliente.compras} compras
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="actividad" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>Las últimas acciones realizadas en la plataforma.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {actividades.map(actividad => (
                    <div
                      key={actividad.id}
                      className="card-hover flex items-start gap-4 rounded-lg border p-4"
                    >
                      <div className={`rounded-md p-2 ${getActividadColor(actividad.tipo)}`}>
                        {getActividadIcon(actividad.tipo)}
                      </div>
                      <div>
                        <h3 className="font-medium">{actividad.titulo}</h3>
                        <p className="text-sm text-muted-foreground">{actividad.descripcion}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{actividad.fecha}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// Datos de ejemplo
const promociones = [
  {
    id: 1,
    nombre: "2x1 en Cafés",
    descripcion: "Lleva 2 cafés por el precio de 1",
    tipo: "2x1",
    usos: 124,
  },
  {
    id: 2,
    nombre: "30% de descuento",
    descripcion: "En todos los productos de temporada",
    tipo: "descuento",
    usos: 87,
  },
  {
    id: 3,
    nombre: "Postre gratis",
    descripcion: "Con la compra de cualquier plato principal",
    tipo: "gratis",
    usos: 56,
  },
  {
    id: 4,
    nombre: "Acumula puntos",
    descripcion: "Por cada $100 de compra",
    tipo: "puntos",
    usos: 203,
  },
];

const clientes = [
  {
    id: 1,
    nombre: "María",
    apellido: "González",
    email: "maria@ejemplo.com",
    compras: 12,
  },
  {
    id: 2,
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan@ejemplo.com",
    compras: 8,
  },
  {
    id: 3,
    nombre: "Ana",
    apellido: "Rodríguez",
    email: "ana@ejemplo.com",
    compras: 5,
  },
  {
    id: 4,
    nombre: "Carlos",
    apellido: "López",
    email: "carlos@ejemplo.com",
    compras: 3,
  },
];

const actividades = [
  {
    id: 1,
    titulo: "Nueva promoción creada",
    descripcion: "Se ha creado la promoción '2x1 en Cafés'",
    tipo: "promocion",
    fecha: "Hoy, 10:23 AM",
  },
  {
    id: 2,
    titulo: "Notificación enviada",
    descripcion: "Se ha enviado una notificación a 248 clientes",
    tipo: "notificacion",
    fecha: "Ayer, 3:45 PM",
  },
  {
    id: 3,
    titulo: "Nuevo cliente registrado",
    descripcion: "María González se ha registrado en la plataforma",
    tipo: "cliente",
    fecha: "Ayer, 11:30 AM",
  },
  {
    id: 4,
    titulo: "Promoción redimida",
    descripcion: "Juan Pérez ha redimido la promoción '30% de descuento'",
    tipo: "redencion",
    fecha: "15 May, 2:15 PM",
  },
];

// Funciones auxiliares para iconos y colores
function getPromocionIcon(tipo: string) {
  switch (tipo) {
    case "2x1":
      return <Tag className="h-4 w-4 text-white" />;
    case "descuento":
      return <Tag className="h-4 w-4 text-white" />;
    case "gratis":
      return <Tag className="h-4 w-4 text-white" />;
    case "puntos":
      return <Tag className="h-4 w-4 text-white" />;
    default:
      return <Tag className="h-4 w-4 text-white" />;
  }
}

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

function getActividadIcon(tipo: string) {
  switch (tipo) {
    case "promocion":
      return <Tag className="h-4 w-4 text-white" />;
    case "notificacion":
      return <Bell className="h-4 w-4 text-white" />;
    case "cliente":
      return <Users className="h-4 w-4 text-white" />;
    case "redencion":
      return <Tag className="h-4 w-4 text-white" />;
    default:
      return <Tag className="h-4 w-4 text-white" />;
  }
}

function getActividadColor(tipo: string) {
  switch (tipo) {
    case "promocion":
      return "bg-blue-500";
    case "notificacion":
      return "bg-yellow-500";
    case "cliente":
      return "bg-green-500";
    case "redencion":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
}
