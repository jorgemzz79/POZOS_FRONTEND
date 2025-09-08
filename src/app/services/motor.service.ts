import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Motor } from '../models/motor.model';

@Injectable({
  providedIn: 'root'
})
export class MotorService {
  private baseUrl = 'http://172.16.3.115:8000/motores/';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getMotorPorId(motorId: number): Observable<Motor> {
    return this.http.get<Motor>(`${this.baseUrl}${motorId}`, {
      headers: this.getAuthHeaders()
    });
  }

  getMotorPorPozo(pozoId: number): Observable<Motor> {
    return this.http.get<Motor>(`${this.baseUrl}pozo/${pozoId}`, {
      headers: this.getAuthHeaders()
    });
  }

  crearMotor(motor: Motor): Observable<Motor> {
    return this.http.post<Motor>(this.baseUrl, motor, {
      headers: this.getAuthHeaders()
    });
  }

  actualizarMotor(id: number, motor: Motor): Observable<Motor> {
    return this.http.put<Motor>(`${this.baseUrl}${id}`, motor, {
      headers: this.getAuthHeaders()
    });
  }

  eliminarMotor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  getMotoresPorPozo(pozoId: number): Observable<Motor[]> {
    return this.http.get<Motor[]>(`${this.baseUrl}pozo/${pozoId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
