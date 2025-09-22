import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pozo } from '../models/pozo.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PozoService {
  private baseUrl = `${environment.apiBase}/pozos/`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getPozos(): Observable<Pozo[]> {
    return this.http.get<Pozo[]>(this.baseUrl, {
      headers: this.getAuthHeaders()
    });
  }

  getPozoPorId(id: number): Observable<Pozo> {
    return this.http.get<Pozo>(`${this.baseUrl}${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  eliminarPozo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  crearPozo(pozo: Pozo): Observable<Pozo> {
    return this.http.post<Pozo>(this.baseUrl, pozo, {
      headers: this.getAuthHeaders()
    });
  }

  actualizarPozo(id: number, pozo: Pozo): Observable<Pozo> {
    return this.http.put<Pozo>(`${this.baseUrl}${id}`, pozo, {
      headers: this.getAuthHeaders()
    });
  }
}
