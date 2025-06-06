import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transformador } from '../models/transformador.model';

@Injectable({
  providedIn: 'root'
})
export class TransformadorService {
  private baseUrl = 'http://127.0.0.1:8000/transformadores/';

  constructor(private http: HttpClient) {}

  // 🔸 Obtener TODOS los transformadores de un pozo
  getTransformadoresPorPozo(pozoId: number): Observable<Transformador[]> {
    return this.http.get<Transformador[]>(`${this.baseUrl}?pozo_id=${pozoId}`);
  }

  // 🔸 Obtener un transformador por ID
  getTransformador(id: number): Observable<Transformador> {
    return this.http.get<Transformador>(`${this.baseUrl}${id}`);
  }

  // 🔸 Crear nuevo transformador
  crearTransformador(data: Transformador): Observable<Transformador> {
    return this.http.post<Transformador>(this.baseUrl, data);
  }

  // 🔸 Actualizar transformador existente
  actualizarTransformador(id: number, data: Transformador): Observable<Transformador> {
    return this.http.put<Transformador>(`${this.baseUrl}${id}`, data);
  }

  // 🔸 Eliminar transformador
  eliminarTransformador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`);
  }
}
