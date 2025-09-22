import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicion } from '../models/medicion.model';
import { Unidad } from '../models/unidad.model';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MedicionService {
  private baseUrl = `${environment.apiBase}`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getMedicionesPorPozo(pozoId: number): Observable<Medicion[]> {
    return this.http.get<Medicion[]>(`${this.baseUrl}/mediciones/pozos/${pozoId}/mediciones`, {
      headers: this.getAuthHeaders()
    });
  }

  crearMedicion(medicion: Medicion): Observable<Medicion> {
    return this.http.post<Medicion>(`${this.baseUrl}/mediciones/pozos/${medicion.pozo_id}/mediciones`, medicion, {
      headers: this.getAuthHeaders()
    });
  }

  actualizarMedicion(id: number, medicion: Medicion): Observable<Medicion> {
    return this.http.put<Medicion>(`${this.baseUrl}/mediciones/mediciones/${id}`, medicion, {
      headers: this.getAuthHeaders()
    });
  }

  eliminarMedicion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/mediciones/mediciones/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  getUnidades(): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(`${this.baseUrl}/unidades/`, {
      headers: this.getAuthHeaders()
    });
  }
}
