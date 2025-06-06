export interface Medicion {
  id?: number;
  pozo_id: number;
  fecha: string;
  valor: number;
  tipo_medicion: string;
  unidad_id: number;
  unidad?: {
    id: number;
    nombre: string;
    abreviatura: string;
  };
}
