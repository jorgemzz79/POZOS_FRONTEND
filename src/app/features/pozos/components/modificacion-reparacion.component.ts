import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModificacionReparacionService } from '../../../services/modificacion-reparacion.service';
import { ModificacionReparacion } from '../../../models/modificacion-reparacion.model';

@Component({
  standalone: true,
  selector: 'app-modificacion-reparacion',
  templateUrl: './modificacion-reparacion.component.html',
  styleUrls: ['./modificacion-reparacion.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class ModificacionReparacionComponent implements OnChanges {
  @Input() pozoId!: number;

  modificaciones: ModificacionReparacion[] = [];
  editando = false;
  cargando = false;
  mensajeError = '';
  formData: ModificacionReparacion = {} as ModificacionReparacion;

  constructor(private modificacionService: ModificacionReparacionService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pozoId'] && this.pozoId > 0) {
      this.cargarModificaciones();
    }
  }

  cargarModificaciones(): void {
    this.cargando = true;
    this.mensajeError = '';

    this.modificacionService.getModificacionesPorPozo(this.pozoId).subscribe({
      next: (data) => {
        this.modificaciones = data;
        this.cargando = false;
      },
      error: () => {
        this.modificaciones = [];
        this.cargando = false;
        this.mensajeError = 'No se pudieron cargar las modificaciones y reparaciones.';
      }
    });
  }

  crear(): void {
    this.formData = {
      tipo_modificacion: '',
      descripcion_modificacion_reparacion: '',
      fecha: this.obtenerFechaActual(),
      responsable: '',
      pozo_id: this.pozoId
    };
    this.mensajeError = '';
    this.editando = true;
  }

  editar(modificacion: ModificacionReparacion): void {
    this.formData = {
      ...modificacion,
      fecha: this.formatearFechaParaInput(modificacion.fecha),
      pozo_id: modificacion.pozo_id || this.pozoId
    };
    this.mensajeError = '';
    this.editando = true;
  }

  guardar(): void {
    if (!this.pozoId) {
      this.mensajeError = 'No se encontró el pozo para guardar el registro.';
      return;
    }

    const payload: ModificacionReparacion = {
      ...this.formData,
      pozo_id: this.pozoId
    };

    if (payload.id) {
      this.modificacionService.actualizarModificacion(payload.id, payload).subscribe({
        next: () => {
          this.editando = false;
          this.cargarModificaciones();
        },
        error: () => {
          this.mensajeError = 'No se pudo actualizar el registro.';
        }
      });
      return;
    }

    this.modificacionService.crearModificacion(payload).subscribe({
      next: () => {
        this.editando = false;
        this.cargarModificaciones();
      },
      error: () => {
        this.mensajeError = 'No se pudo crear el registro.';
      }
    });
  }

  cancelar(): void {
    this.editando = false;
    this.mensajeError = '';
  }

  eliminar(modificacion: ModificacionReparacion): void {
    if (!modificacion.id) {
      this.mensajeError = 'No se encontró el registro para eliminar.';
      return;
    }

    if (confirm('¿Eliminar esta modificación o reparación?')) {
      this.modificacionService.eliminarModificacion(modificacion.id).subscribe({
        next: () => this.cargarModificaciones(),
        error: () => {
          this.mensajeError = 'No se pudo eliminar el registro.';
        }
      });
    }
  }

  private obtenerFechaActual(): string {
    return new Date().toISOString().slice(0, 10);
  }

  private formatearFechaParaInput(fecha: string): string {
    return fecha ? fecha.slice(0, 10) : this.obtenerFechaActual();
  }
}
