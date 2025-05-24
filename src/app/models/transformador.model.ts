export interface Transformador {
  id?: number;
  ubicacion: string;
  kva: number;
  voltage_primario: number;
  voltage_secundario: string;
  marca: string;
  serie: string;
  bomba: string;
  modelo: string;
  serie_bomba: string;
  pozo_id: number;
}