import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unidad } from '../models/unidad.model';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  private baseUrl = 'http://127.0.0.1:8000/unidades/';

  constructor(private http: HttpClient) {}

  getUnidades(): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(this.baseUrl);
  }

  getUnidad(id: number): Observable<Unidad> {
    return this.http.get<Unidad>(`${this.baseUrl}${id}`);
  }

  crearUnidad(unidad: Unidad): Observable<Unidad> {
    return this.http.post<Unidad>(this.baseUrl, unidad);
  }
}
