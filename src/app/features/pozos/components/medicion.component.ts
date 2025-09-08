import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicionService } from '../../../services/medicion.service';
import { Medicion } from '../../../models/medicion.model';
import { Unidad } from '../../../models/unidad.model';

@Component({
  selector: 'app-medicion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medicion.component.html'
})
export class MedicionComponent implements OnInit {
  @Input() pozoId!: number;
  mediciones: Medicion[] = [];
  unidades: Unidad[] = [];
  medicion: Medicion = this.crearMedicionVacia();
  mostrarFormulario = false;
  constructor(private medicionService: MedicionService) {}

  ngOnInit(): void {
    this.obtenerUnidades();
    this.obtenerMediciones();
  }

  crearMedicionVacia(): Medicion {
    return {
      pozo_id: this.pozoId,
      tipo_medicion: '',
      valor: 0,
      unidad_id: 0,
      fecha: new Date().toISOString()
    };
  }

  obtenerUnidades(): void {
    this.medicionService.getUnidades().subscribe({
      next: (data) => this.unidades = data
    });
  }

  obtenerMediciones(): void {
    if (!this.pozoId) return;
    this.medicionService.getMedicionesPorPozo(this.pozoId).subscribe({
      next: (data) => this.mediciones = data
    });
  }

  guardarMedicion(): void {
    this.medicion.pozo_id = this.pozoId;

    if (!this.medicion.tipo_medicion || !this.medicion.valor || !this.medicion.unidad_id || !this.medicion.fecha) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    if (this.medicion.id) {
      this.medicionService.actualizarMedicion(this.medicion.id, this.medicion).subscribe({
        next: (actualizada) => {
          const i = this.mediciones.findIndex(m => m.id === actualizada.id);
          if (i !== -1) this.mediciones[i] = actualizada;
          this.medicion = this.crearMedicionVacia();
        }
      });
    } else {
      this.medicionService.crearMedicion(this.medicion).subscribe({
        next: (nueva) => {
          this.mediciones.push(nueva);
          this.medicion = this.crearMedicionVacia();
        }
      });
    }
  }

  editarMedicion(m: Medicion): void {
  this.medicion = { ...m };
  this.mostrarFormulario = true; // Mostrar formulario cuando se edita
}

  cancelarEdicion(): void {
    this.medicion = this.crearMedicionVacia();
  }

  eliminarMedicion(id: number): void {
    if (confirm('¿Eliminar esta medición?')) {
      this.medicionService.eliminarMedicion(id).subscribe(() => {
        this.mediciones = this.mediciones.filter(m => m.id !== id);
      });
    }
  }

  getAbreviatura(unidadId: number): string {
    const unidad = this.unidades.find(u => u.id === unidadId);
    return unidad ? unidad.abreviatura : '';
  }
}
