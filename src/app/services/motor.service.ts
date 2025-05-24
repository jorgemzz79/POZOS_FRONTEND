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

  getMotorPorId(motorId: number): Observable<Motor> {
    return this.http.get<Motor>(`${this.baseUrl}${motorId}`);
  }

  getMotorPorPozo(pozoId: number): Observable<Motor[]> {
    return this.http.get<Motor[]>(this.baseUrl + `?pozo_id=${pozoId}`);
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
}
