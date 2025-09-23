// services/archivo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Archivo } from '../models/archivo.model';
import { ArchivoRelacion } from '../models/archivo-relacion.model';
import { environment } from '../../environments/environment.prod';

import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs'; 

@Injectable({ providedIn: 'root' })
export class ArchivoService {
  private baseUrl = `${environment.apiBase}/archivos/`;
  private uploadUrl = this.baseUrl + 'archivos/upload'; // verifica esta ruta en tu API

  constructor(private http: HttpClient) {}

  subirArchivo(file: File): Observable<{ ruta: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ ruta: string }>(this.uploadUrl, formData);
  }

  crearArchivo(metadata: Archivo): Observable<Archivo> {
    return this.http.post<Archivo>(this.baseUrl, metadata);
  }

  relacionarArchivo(payload: {
    archivo_id: number;
    pozo_id?: number;
    medicion_id?: number;
    recibo_luz_id?: number;
    modificacion_reparacion_id?: number;
  }): Observable<any> {
    return this.http.post(`${environment.apiBase}/archivos_relaciones/`, payload);
  }

  // services/archivo.service.ts


obtenerArchivosRelacionados(pozoId: number) {
  return this.http
    .get<any[]>(`${environment.apiBase}/archivos_relaciones/?pozo_id=${pozoId}`)
    .pipe(
      map(rows =>
        rows.map(r => ({
          // IDs claves: backend ya envía ambos
          relacion_id: r.relacion_id, // id de la relación
          archivo_id:  r.id,          // id del archivo (según tu respuesta)

          // campos para la tabla
          nombre_archivo: r.nombre_archivo,
          tipo_archivo:   r.tipo_archivo,
          ruta_archivo:   r.ruta_archivo,
          categoria:      r.categoria,
          descripcion:    r.descripcion,
          fecha_subida:   r.fecha_subida,

          _borrando: false
        }) as ArchivoRelacion)
      )
    );
}



  // --- ELIMINAR ---

// archivo.service.ts

eliminarRelacion(relacionId: number) {
  return this.http.delete<void>(`${environment.apiBase}/archivos_relaciones/${relacionId}`);
}

eliminarArchivo(archivoId: number) {
  return this.http.delete<void>(`${environment.apiBase}/archivos/${archivoId}`);
}

eliminarRelacionYArchivo(relacionId: number, archivoId: number) {
  return this.eliminarRelacion(relacionId).pipe(
    switchMap(() => this.eliminarArchivo(archivoId))
  );
}

}
