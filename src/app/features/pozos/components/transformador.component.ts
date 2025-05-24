import { Component, Input, OnInit } from '@angular/core';
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
export class TransformadorComponent implements OnInit {
  @Input() pozoId!: number;
  transformador: Transformador | null = null;
  editando = false;
  formData: Transformador = {} as Transformador;

  constructor(private transformadorService: TransformadorService) {}

  ngOnInit(): void {
    this.transformadorService.getTransformadorPorPozo(this.pozoId).subscribe({
      next: (data) => {
        this.transformador = data[0] || null;
      },
      error: () => {
        this.transformador = null;
      }
    });
  }

  editar(): void {
    if (this.transformador) {
      this.formData = { ...this.transformador };
      this.editando = true;
    }
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
    this.editando = true;
  }

  guardar(): void {
    if (this.transformador) {
      this.transformadorService.actualizarTransformador(this.transformador.id!, this.formData).subscribe((resp) => {
        this.transformador = resp;
        this.editando = false;
      });
    } else {
      this.transformadorService.crearTransformador(this.formData).subscribe((nuevo) => {
        this.transformador = nuevo;
        this.editando = false;
      });
    }
  }

  cancelar(): void {
    this.editando = false;
  }

  eliminar(): void {
    if (this.transformador && confirm('¿Eliminar este transformador?')) {
      this.transformadorService.eliminarTransformador(this.transformador.id!).subscribe(() => {
        this.transformador = null;
      });
    }
  }
}
