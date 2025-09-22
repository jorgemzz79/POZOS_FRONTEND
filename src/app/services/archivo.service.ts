import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Archivo } from '../models/archivo.model';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {
  private baseUrl = `${environment.apiBase}/archivos/`;
  private uploadUrl = this.baseUrl + 'archivos/upload';

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

  obtenerArchivosRelacionados(pozoId: number): Observable<Archivo[]> {
    return this.http.get<Archivo[]>(`${environment.apiBase}/archivos_relaciones/?pozo_id=${pozoId}`);
  }
}
