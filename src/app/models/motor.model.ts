export interface Motor {
  id?: number;
  motor: string;
  velocidad: string;
  voltaje: string;
  corriente: string;
  marca: string;
  modelo: string;
  tipo: string;
  diametro_descarga: string;
  estado: 'activo' | 'inactivo';
  fotos: string;
  descripcion: string;
  pozo_id: number;
}