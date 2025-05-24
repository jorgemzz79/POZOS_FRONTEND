import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MotorService } from '../../../services/motor.service';
import { Motor } from '../../../models/motor.model';

@Component({
  standalone: true,
  selector: 'app-motor',
  templateUrl: './motor.component.html',
  styleUrls: ['./motor.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class MotorComponent implements OnInit {
  @Input() pozoId!: number;
  motor: Motor | null = null;
  editando = false;
  formData: Motor = {} as Motor;

  constructor(private motorService: MotorService) {}

  ngOnInit(): void {
    this.motorService.getMotorPorPozo(this.pozoId).subscribe({
      next: (data) => {
        this.motor = data[0] || null;
      },
      error: () => {
        this.motor = null;
      }
    });
  }

  editar(): void {
    if (this.motor) {
      this.formData = { ...this.motor };
      this.editando = true;
    }
  }

  crear(): void {
    this.formData = {
      motor: '',
      velocidad: '',
      voltaje: '',
      corriente: '',
      marca: '',
      modelo: '',
      tipo: '',
      diametro_descarga: '',
      estado: 'activo',
      fotos: '',
      descripcion: '',
      pozo_id: this.pozoId
    };
    this.editando = true;
  }

  guardar(): void {
    if (this.motor) {
      this.motorService.actualizarMotor(this.motor.id!, this.formData).subscribe((resp) => {
        this.motor = resp;
        this.editando = false;
      });
    } else {
      this.motorService.crearMotor(this.formData).subscribe((nuevo) => {
        this.motor = nuevo;
        this.editando = false;
      });
    }
  }

  cancelar(): void {
    this.editando = false;
  }

  eliminar(): void {
    if (this.motor && confirm('¿Estás seguro de eliminar este motor?')) {
      this.motorService.eliminarMotor(this.motor.id!).subscribe(() => {
        this.motor = null;
      });
    }
  }
}
