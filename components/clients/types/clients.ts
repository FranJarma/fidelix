import { SourceEnum } from "@/types/sources";

export interface Client {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  level: "oro" | "plata" | "bronce";
  points: number;
  source: SourceEnum;
}
