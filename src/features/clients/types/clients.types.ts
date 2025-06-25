import type { GenderEnum, LevelEnum, SourceEnum } from "@/types/entities.types";

export type Client = {
  address?: string;
  birthday?: string;
  city?: string;
  country?: string;
  createdAt?: string;
  email?: string;
  fullName: string;
  gender?: GenderEnum;
  id?: string;
  isActive?: boolean;
  level?: LevelEnum;
  notes?: string;
  phone?: string;
  points?: number;
  province?: string;
  source?: SourceEnum;
  tags?: string[];
  tenantId?: string;
  updatedAt?: string;
};
