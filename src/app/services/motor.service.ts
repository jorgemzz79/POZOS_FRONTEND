import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Motor } from '../models/motor.model';

@Injectable({
  providedIn: 'root'
})
export class MotorService {
  private baseUrl = 'http://127.0.0.1:8000/motores/';

  constructor(private http: HttpClient) {}

  // 🔹 Obtener motor por su ID (si ya lo conoces)
  getMotorPorId(motorId: number): Observable<Motor> {
    return this.http.get<Motor>(`${this.baseUrl}${motorId}`);
  }

  // ✅ Obtener motor por pozo_id (el nuevo endpoint correcto)
  getMotorPorPozo(pozoId: number): Observable<Motor> {
    return this.http.get<Motor>(`${this.baseUrl}pozo/${pozoId}`);
  }

  crearMotor(motor: Motor): Observable<Motor> {
    return this.http.post<Motor>(this.baseUrl, motor);
  }

  actualizarMotor(id: number, motor: Motor): Observable<Motor> {
    return this.http.put<Motor>(`${this.baseUrl}${id}`, motor);
  }

  eliminarMotor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`);
  }

  // 🔹 Nuevo método para obtener todos los motores de un pozo
getMotoresPorPozo(pozoId: number): Observable<Motor[]> {
  return this.http.get<Motor[]>(`${this.baseUrl}pozo/${pozoId}`);
}


}
