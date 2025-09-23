export interface ArchivoRelacion {
  relacion_id: number;
  archivo_id: number;
  nombre_archivo: string;
  tipo_archivo: string;
  ruta_archivo: string;
  categoria?: string;
  descripcion?: string;
  fecha_subida?: string;
  _borrando?: boolean;
}