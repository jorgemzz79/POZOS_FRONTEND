import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class MotorComponent implements OnChanges {
  @Input() pozoId!: number;
  motores: Motor[] = [];
  editando = false;
  formData: Motor = {} as Motor;

  constructor(private motorService: MotorService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pozoId'] && this.pozoId > 0) {
      this.cargarMotores();
    }
  }

  cargarMotores(): void {
  console.log('Buscando motores del pozo', this.pozoId);  // 👈 VERIFICA ESTO
  this.motorService.getMotoresPorPozo(this.pozoId).subscribe({
    next: (data) => {
      console.log('Motores recibidos:', data);  // 👈 VERIFICA SI LLEGA ALGO
      this.motores = data;
    },
    error: (error) => {
      console.error('Error al cargar motores', error);
    }
  });
}

  editar(motor: Motor): void {
    this.formData = { ...motor };
    this.editando = true;
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
    if (this.formData.id) {
      this.motorService.actualizarMotor(this.formData.id, this.formData).subscribe((resp) => {
        this.cargarMotores();
        this.editando = false;
      });
    } else {
      this.motorService.crearMotor(this.formData).subscribe((nuevo) => {
        this.cargarMotores();
        this.editando = false;
      });
    }
  }

  cancelar(): void {
    this.editando = false;
  }

  eliminar(motorId: number): void {
    if (confirm('¿Estás seguro de eliminar este motor?')) {
      this.motorService.eliminarMotor(motorId).subscribe(() => {
        this.cargarMotores();
      });
    }
  }
}
