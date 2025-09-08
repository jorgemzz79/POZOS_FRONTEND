import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transformador } from '../models/transformador.model';

@Injectable({
  providedIn: 'root'
})
export class TransformadorService {
  private baseUrl = 'http://172.16.3.115:8000/transformadores/';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getTransformadoresPorPozo(pozoId: number): Observable<Transformador[]> {
    return this.http.get<Transformador[]>(`${this.baseUrl}pozo/${pozoId}`, {
      headers: this.getAuthHeaders()
    });
  }

  getTransformador(id: number): Observable<Transformador> {
    return this.http.get<Transformador>(`${this.baseUrl}${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  crearTransformador(data: Transformador): Observable<Transformador> {
    return this.http.post<Transformador>(this.baseUrl, data, {
      headers: this.getAuthHeaders()
    });
  }

  actualizarTransformador(id: number, data: Transformador): Observable<Transformador> {
    return this.http.put<Transformador>(`${this.baseUrl}${id}`, data, {
      headers: this.getAuthHeaders()
    });
  }

  eliminarTransformador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
