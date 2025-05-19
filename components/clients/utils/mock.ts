import { SourceEnum } from "@/types/sources";
import type { Client } from "../types/clients";

export const mockClients: Client[] = [
  {
    id: 1,
    name: "María",
    lastName: "González",
    email: "maria@example.com",
    phone: "+54 911 1234 5678",
    level: "oro",
    points: 1200,
    source: SourceEnum.LANDING_PAGE,
  },
  {
    id: 2,
    name: "Juan",
    lastName: "Pérez",
    email: "juan@example.com",
    phone: "+54 911 2345 6789",
    level: "plata",
    points: 850,
    source: SourceEnum.LANDING_PAGE,
  },
  {
    id: 3,
    name: "Ana",
    lastName: "Rodríguez",
    email: "ana@example.com",
    phone: "+54 911 3456 7890",
    level: "bronce",
    points: 430,
    source: SourceEnum.INSTAGRAM,
  },
];
