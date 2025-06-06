export interface Pozo {
  id: number;
  nombre_pozo: string;
  comunidad: string;
  fecha_perforacion: string; // o Date si lo manejas como objeto
  domicilio: string;
  latitud: number;
  longitud: number;
  altitud: number;
  profundidad: number;
  gasto_actual_id: number;
  diametro_ademe: number;
  longitud_ademe_ciego: number;
  longitud_ademe_ranurado: number;
  tren_descarga: string;
  concesion: string;
}
