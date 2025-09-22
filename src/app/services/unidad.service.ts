import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unidad } from '../models/unidad.model';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  private baseUrl = `${environment.apiBase}/unidades/`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getUnidades(): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(this.baseUrl, {
      headers: this.getAuthHeaders()
    });
  }

  getUnidad(id: number): Observable<Unidad> {
    return this.http.get<Unidad>(`${this.baseUrl}${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  crearUnidad(unidad: Unidad): Observable<Unidad> {
    return this.http.post<Unidad>(this.baseUrl, unidad, {
      headers: this.getAuthHeaders()
    });
  }
}
