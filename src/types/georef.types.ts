export interface GeorefResponse<T> {
  cantidad: number;
  inicio: number;
  parametros: Record<string, unknown>;
  total: number;
  provincias?: Provincia[];
  municipios?: Municipio[];
  localidades?: Localidad[];
}

export interface Provincia {
  id: string;
  nombre: string;
  centroide: {
    lat: number;
    lon: number;
  };
}

export interface Municipio {
  id: string;
  nombre: string;
  provincia: {
    id: string;
    nombre: string;
  };
}

export interface Localidad {
  id: string;
  nombre: string;
  provincia: {
    id: string;
    nombre: string;
  };
  municipio?: {
    id: string;
    nombre: string;
  };
}
