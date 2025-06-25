import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE = "https://apis.datos.gob.ar/georef/api";

type Resource = "provincias" | "municipios" | "localidades";

interface Params {
  provincia?: string;
  nombre?: string;
  max?: number;
  departamento?: string;
}

interface GeorefResponse<T> {
  provincias?: T[];
  municipios?: T[];
  localidades?: T[];
  cantidad: number;
  inicio: number;
  total: number;
}

export function useGeorefApi<T>(
  resource: Resource,
  params: Params = {},
  enabled = true,
  sortKey = "nombre"
) {
  const queryKey = [resource, params];

  const queryFn = async (): Promise<T[]> => {
    const url = new URL(`${API_BASE}/${resource}`);
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value.toString());
    });

    if (!params.max) {
      url.searchParams.append("max", "1000");
    }

    const response = await axios.get<GeorefResponse<T>>(url.toString());
    const rawData = response.data[resource]?.sort() ?? [];

    const sortedData = [...rawData].sort((a: any, b: any) =>
      a[sortKey].localeCompare(b[sortKey])
    );

    return sortedData;
  };

  const { data, isLoading, isError, error } = useQuery<T[]>({
    queryKey,
    queryFn,
    enabled,
    staleTime: Infinity,
  });

  return {
    data: data ?? [],
    loading: isLoading,
    error: isError ? (error as Error) : null,
  };
}
