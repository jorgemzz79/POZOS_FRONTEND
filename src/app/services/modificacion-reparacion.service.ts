import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { ModificacionReparacion } from '../models/modificacion-reparacion.model';

@Injectable({
  providedIn: 'root'
})
export class ModificacionReparacionService {
  private baseUrl = `${environment.apiBase}/modificaciones_reparaciones/`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getModificacionesPorPozo(pozoId: number): Observable<ModificacionReparacion[]> {
    return this.http.get<ModificacionReparacion[]>(`${this.baseUrl}pozo/${pozoId}`, {
      headers: this.getAuthHeaders()
    });
  }

  crearModificacion(data: ModificacionReparacion): Observable<ModificacionReparacion> {
    return this.http.post<ModificacionReparacion>(this.baseUrl, data, {
      headers: this.getAuthHeaders()
    });
  }

  actualizarModificacion(id: number, data: ModificacionReparacion): Observable<ModificacionReparacion> {
    return this.http.put<ModificacionReparacion>(`${this.baseUrl}${id}`, data, {
      headers: this.getAuthHeaders()
    });
  }

  eliminarModificacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
