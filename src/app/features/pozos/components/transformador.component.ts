import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransformadorService } from '../../../services/transformador.service';
import { Transformador } from '../../../models/transformador.model';

@Component({
  standalone: true,
  selector: 'app-transformador',
  templateUrl: './transformador.component.html',
  styleUrls: ['./transformador.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class TransformadorComponent implements OnChanges {
  @Input() pozoId!: number;
  transformadores: Transformador[] = [];
  editando = false;
  formData: Transformador = {} as Transformador;
  editIndex: number | null = null;

  constructor(private transformadorService: TransformadorService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pozoId'] && this.pozoId > 0) {
      this.cargarTransformadores();
    }
  }

  cargarTransformadores(): void {
    this.transformadorService.getTransformadoresPorPozo(this.pozoId).subscribe({
      next: (data) => {
        this.transformadores = data;
      },
      error: () => {
        this.transformadores = [];
      }
    });
  }

  editar(index: number): void {
    this.editIndex = index;
    this.formData = { ...this.transformadores[index] };
    this.editando = true;
  }

  crear(): void {
    this.formData = {
      ubicacion: '',
      kva: 0,
      voltage_primario: 0,
      voltage_secundario: '',
      marca: '',
      serie: '',
      bomba: '',
      modelo: '',
      serie_bomba: '',
      pozo_id: this.pozoId
    };
    this.editIndex = null;
    this.editando = true;
  }

  guardar(): void {
    if (this.editIndex !== null) {
      // Actualizar
      const id = this.transformadores[this.editIndex].id!;
      this.transformadorService.actualizarTransformador(id, this.formData).subscribe((resp) => {
        this.transformadores[this.editIndex!] = resp;
        this.editando = false;
      });
    } else {
      // Crear nuevo
      this.transformadorService.crearTransformador(this.formData).subscribe((nuevo) => {
        this.transformadores.push(nuevo);
        this.editando = false;
      });
    }
  }

  cancelar(): void {
    this.editando = false;
  }

  eliminar(index: number): void {
    const transformador = this.transformadores[index];
    if (confirm('¿Eliminar este transformador?')) {
      this.transformadorService.eliminarTransformador(transformador.id!).subscribe(() => {
        this.transformadores.splice(index, 1);
      });
    }
  }
}
