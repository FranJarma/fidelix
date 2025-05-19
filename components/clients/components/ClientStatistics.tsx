import { FiUsers, FiUserPlus, FiStar } from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Client } from "../types/clients";

interface ClientStatisticsProps {
  clients: Client[];
}

export function ClientStatistics({ clients }: ClientStatisticsProps) {
  const total = clients.length;
  const newClientsThisMonth = 3;
  const levelCounts = clients.reduce(
    (acc, client) => {
      acc[client.level] += 1;
      return acc;
    },
    { oro: 0, plata: 0, bronce: 0 },
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Clientes
          </CardTitle>
          <FiUsers className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total}</div>
          <p className="text-xs text-muted-foreground">Clientes registrados</p>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Nuevos este mes</CardTitle>
          <FiUserPlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{newClientsThisMonth}</div>
          <p className="text-xs text-muted-foreground">Ingresos recientes</p>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Clientes por Nivel
          </CardTitle>
          <FiStar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-1">
            <li>🟡 Oro: {levelCounts.oro}</li>
            <li>⚪ Plata: {levelCounts.plata}</li>
            <li>🟠 Bronce: {levelCounts.bronce}</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
