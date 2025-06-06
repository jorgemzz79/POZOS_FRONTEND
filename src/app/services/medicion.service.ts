import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicion } from '../models/medicion.model';
import { Unidad } from '../models/unidad.model';

@Injectable({
  providedIn: 'root'
})
export class MedicionService {
  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getMedicionesPorPozo(pozoId: number): Observable<Medicion[]> {
    return this.http.get<Medicion[]>(`${this.baseUrl}/mediciones/pozos/${pozoId}/mediciones`);
  }

  crearMedicion(medicion: Medicion): Observable<Medicion> {
    return this.http.post<Medicion>(`${this.baseUrl}/mediciones/pozos/${medicion.pozo_id}/mediciones`, medicion);
  }

  actualizarMedicion(id: number, medicion: Medicion): Observable<Medicion> {
    return this.http.put<Medicion>(`${this.baseUrl}/mediciones/mediciones/${id}`, medicion);
  }

  eliminarMedicion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/mediciones/mediciones/${id}`);
  }

  getUnidades(): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(`${this.baseUrl}/unidades/`);
  }
}
