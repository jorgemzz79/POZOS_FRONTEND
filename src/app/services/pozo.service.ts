import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pozo } from '../models/pozo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PozoService {
  private baseUrl = 'http://127.0.0.1:8000/pozos/'; // ajusta según tu backend

  constructor(private http: HttpClient) {}

  getPozos(): Observable<Pozo[]> {
    return this.http.get<Pozo[]>(this.baseUrl);
  }

  // Puedes agregar aquí métodos POST, PUT, DELETE más adelante
  getPozoPorId(id: number): Observable<Pozo> {
  return this.http.get<Pozo>(`${this.baseUrl}${id}`);
}

eliminarPozo(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}${id}`);
}


crearPozo(pozo: Pozo): Observable<Pozo> {
  return this.http.post<Pozo>(this.baseUrl, pozo);
}

actualizarPozo(id: number, pozo: Pozo): Observable<Pozo> {
  return this.http.put<Pozo>(`${this.baseUrl}${id}`, pozo);
}


}
