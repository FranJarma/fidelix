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
import { Bell, Plus, Send, Users } from "lucide-react";
import Link from "next/link";

export default function NotificacionesPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <SidebarTrigger />
          <h1 className="text-xl font-bold">Notificaciones</h1>
        </div>
      </header>
      <div className="flex justify-between items-center px-6 pt-6 pb-2">
        <h2 className="text-lg font-medium">Panel de Notificaciones</h2>
        <Button asChild>
          <Link href="/notificaciones/nueva">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Notificación
          </Link>
        </Button>
      </div>
      <main className="flex-1 pb-6 px-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Enviadas
              </CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground">
                +12% desde el mes pasado
              </p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Tasa de Apertura
              </CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">
                +5% desde el mes pasado
              </p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Tasa de Conversión
              </CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32%</div>
              <p className="text-xs text-muted-foreground">
                +4% desde el mes pasado
              </p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Usuarios Activos
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">856</div>
              <p className="text-xs text-muted-foreground">
                +8% desde el mes pasado
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="enviadas" className="space-y-4">
          <TabsList>
            <TabsTrigger value="enviadas">Enviadas</TabsTrigger>
            <TabsTrigger value="programadas">Programadas</TabsTrigger>
            <TabsTrigger value="plantillas">Plantillas</TabsTrigger>
          </TabsList>
          <TabsContent value="enviadas" className="space-y-4">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Notificaciones Enviadas</CardTitle>
                <CardDescription>
                  Historial de notificaciones enviadas a tus clientes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notificacionesEnviadas.map((notificacion) => (
                    <div
                      key={notificacion.id}
                      className="flex items-start gap-4 p-4 border rounded-lg"
                    >
                      <div className="p-2 rounded-md bg-blue-500">
                        <Bell className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{notificacion.titulo}</h3>
                          <span className="text-xs text-muted-foreground">
                            {notificacion.fecha}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notificacion.mensaje}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="h-3 w-3" />
                            <span>
                              {notificacion.destinatarios} destinatarios
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Bell className="h-3 w-3" />
                            <span>{notificacion.aperturas} aperturas</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="programadas" className="space-y-4">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Notificaciones Programadas</CardTitle>
                <CardDescription>
                  Notificaciones que se enviarán automáticamente en fechas
                  futuras.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notificacionesProgramadas.map((notificacion) => (
                    <div
                      key={notificacion.id}
                      className="flex items-start gap-4 p-4 border rounded-lg"
                    >
                      <div className="p-2 rounded-md bg-green-500">
                        <Bell className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{notificacion.titulo}</h3>
                          <span className="text-xs text-muted-foreground">
                            Programada: {notificacion.fechaEnvio}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notificacion.mensaje}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="h-3 w-3" />
                            <span>
                              {notificacion.destinatarios} destinatarios
                            </span>
                          </div>
                          <div className="flex justify-end mt-2">
                            <Button variant="outline" size="sm">
                              <Send className="mr-2 h-3 w-3" />
                              Enviar ahora
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="plantillas" className="space-y-4">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Plantillas de Notificaciones</CardTitle>
                <CardDescription>
                  Plantillas predefinidas para enviar notificaciones
                  rápidamente.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {plantillasNotificaciones.map((plantilla) => (
                    <div key={plantilla.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{plantilla.nombre}</h3>
                        <div className="p-1 rounded-md bg-purple-500">
                          <Bell className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {plantilla.descripcion}
                      </p>
                      <div className="p-3 bg-muted rounded-md text-sm mb-4">
                        {plantilla.contenido}
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                        <Button size="sm">Usar</Button>
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
const notificacionesEnviadas = [
  {
    id: 1,
    titulo: "Promoción 2x1 en Cafés",
    mensaje:
      "¡Aprovecha nuestra promoción 2x1 en cafés! Válida hasta el 31 de mayo.",
    fecha: "Hoy, 10:23 AM",
    destinatarios: 1248,
    aperturas: 856,
  },
  {
    id: 2,
    titulo: "30% de descuento en productos de temporada",
    mensaje:
      "Disfruta de un 30% de descuento en todos nuestros productos de temporada. ¡No te lo pierdas!",
    fecha: "Ayer, 3:45 PM",
    destinatarios: 1248,
    aperturas: 743,
  },
  {
    id: 3,
    titulo: "Postre gratis con tu plato principal",
    mensaje:
      "Por tiempo limitado, lleva un postre gratis con la compra de cualquier plato principal.",
    fecha: "14 May, 11:30 AM",
    destinatarios: 1248,
    aperturas: 912,
  },
];

const notificacionesProgramadas = [
  {
    id: 1,
    titulo: "Acumula puntos dobles",
    mensaje:
      "A partir del 1 de junio, acumula puntos dobles por cada $100 de compra.",
    fechaEnvio: "31/05/2025",
    destinatarios: 1248,
  },
  {
    id: 2,
    titulo: "50% en segunda compra",
    mensaje:
      "Durante junio, obtén un 50% de descuento en tu segunda compra de productos seleccionados.",
    fechaEnvio: "01/06/2025",
    destinatarios: 1248,
  },
];

const plantillasNotificaciones = [
  {
    id: 1,
    nombre: "Promoción de descuento",
    descripcion: "Plantilla para anunciar descuentos",
    contenido:
      "¡Hola [nombre]! Disfruta de un [porcentaje]% de descuento en [productos]. Válido hasta [fecha].",
  },
  {
    id: 2,
    nombre: "Promoción 2x1",
    descripcion: "Plantilla para promociones 2x1",
    contenido:
      "¡Hola [nombre]! Aprovecha nuestra promoción 2x1 en [productos]. Válido hasta [fecha].",
  },
  {
    id: 3,
    nombre: "Producto gratis",
    descripcion: "Plantilla para productos gratis",
    contenido:
      "¡Hola [nombre]! Lleva [producto] gratis con la compra de [condición]. Válido hasta [fecha].",
  },
  {
    id: 4,
    nombre: "Recordatorio de puntos",
    descripcion: "Plantilla para recordar puntos acumulados",
    contenido:
      "¡Hola [nombre]! Tienes [puntos] puntos acumulados. ¡Canjéalos antes de [fecha]!",
  },
];
