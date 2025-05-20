import { SourceEnum } from "@/types/sources";

export interface Client {
  email: string;
  id: number;
  lastName: string;
  level: "oro" | "plata" | "bronce";
  name: string;
  phone: string;
  points: number;
  source: SourceEnum;
}
