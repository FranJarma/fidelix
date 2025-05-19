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
import { Bell, Plus, QrCode, Tag } from "lucide-react";
import Link from "next/link";

export default function PromocionesPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <SidebarTrigger />
          <h1 className="text-xl font-bold">Promociones</h1>
        </div>
      </header>
      <div className="flex justify-between items-center px-6 pt-6 pb-2">
        <h2 className="text-lg font-medium">Gestión de Promociones</h2>
        <Button asChild>
          <Link href="/promociones/nueva">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Promoción
          </Link>
        </Button>
      </div>
      <main className="flex-1 p-6 space-y-6">
        <Tabs defaultValue="activas" className="space-y-4">
          <TabsList>
            <TabsTrigger value="activas">Activas</TabsTrigger>
            <TabsTrigger value="programadas">Programadas</TabsTrigger>
            <TabsTrigger value="finalizadas">Finalizadas</TabsTrigger>
          </TabsList>
          <TabsContent value="activas" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {promocionesActivas.map((promocion) => (
                <PromocionCard key={promocion.id} promocion={promocion} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="programadas" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {promocionesProgramadas.map((promocion) => (
                <PromocionCard key={promocion.id} promocion={promocion} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="finalizadas" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {promocionesFinalizadas.map((promocion) => (
                <PromocionCard key={promocion.id} promocion={promocion} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

interface Promocion {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: string;
  fechaInicio: string;
  fechaFin: string;
  usos: number;
  estado: string;
}

function PromocionCard({ promocion }: { promocion: Promocion }) {
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div
            className={`p-2 rounded-md ${getPromocionColor(promocion.tipo)}`}
          >
            {getPromocionIcon(promocion.tipo)}
          </div>
          <div
            className={`px-2 py-1 text-xs rounded-full ${getEstadoColor(promocion.estado)}`}
          >
            {promocion.estado}
          </div>
        </div>
        <CardTitle className="mt-2">{promocion.nombre}</CardTitle>
        <CardDescription>{promocion.descripcion}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground">Inicio:</div>
            <div className="font-medium">{promocion.fechaInicio}</div>
            <div className="text-muted-foreground">Fin:</div>
            <div className="font-medium">{promocion.fechaFin}</div>
            <div className="text-muted-foreground">Usos:</div>
            <div className="font-medium">{promocion.usos}</div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <QrCode className="mr-2 h-4 w-4" />
              Ver QR
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Bell className="mr-2 h-4 w-4" />
              Notificar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

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

function getEstadoColor(estado: string) {
  switch (estado) {
    case "Activa":
      return "bg-green-100 text-green-800";
    case "Programada":
      return "bg-blue-100 text-blue-800";
    case "Finalizada":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// Datos de ejemplo
const promocionesActivas = [
  {
    id: 1,
    nombre: "2x1 en Cafés",
    descripcion: "Lleva 2 cafés por el precio de 1",
    tipo: "2x1",
    fechaInicio: "01/05/2025",
    fechaFin: "31/05/2025",
    usos: 124,
    estado: "Activa",
  },
  {
    id: 2,
    nombre: "30% de descuento",
    descripcion: "En todos los productos de temporada",
    tipo: "descuento",
    fechaInicio: "01/05/2025",
    fechaFin: "15/05/2025",
    usos: 87,
    estado: "Activa",
  },
  {
    id: 3,
    nombre: "Postre gratis",
    descripcion: "Con la compra de cualquier plato principal",
    tipo: "gratis",
    fechaInicio: "10/05/2025",
    fechaFin: "20/05/2025",
    usos: 56,
    estado: "Activa",
  },
];

const promocionesProgramadas = [
  {
    id: 4,
    nombre: "Acumula puntos dobles",
    descripcion: "Por cada $100 de compra",
    tipo: "puntos",
    fechaInicio: "01/06/2025",
    fechaFin: "15/06/2025",
    usos: 0,
    estado: "Programada",
  },
  {
    id: 5,
    nombre: "50% en segunda compra",
    descripcion: "Aplica en productos seleccionados",
    tipo: "descuento",
    fechaInicio: "01/06/2025",
    fechaFin: "30/06/2025",
    usos: 0,
    estado: "Programada",
  },
];

const promocionesFinalizadas = [
  {
    id: 6,
    nombre: "Bebida gratis",
    descripcion: "Con la compra de cualquier sándwich",
    tipo: "gratis",
    fechaInicio: "01/04/2025",
    fechaFin: "30/04/2025",
    usos: 203,
    estado: "Finalizada",
  },
  {
    id: 7,
    nombre: "2x1 en postres",
    descripcion: "Todos los postres de la carta",
    tipo: "2x1",
    fechaInicio: "01/04/2025",
    fechaFin: "15/04/2025",
    usos: 156,
    estado: "Finalizada",
  },
];
