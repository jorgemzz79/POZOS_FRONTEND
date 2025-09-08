import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArchivoService } from '../../../services/archivo.service';
import { Archivo } from '../../../models/archivo.model';

@Component({
  standalone: true,
  selector: 'app-archivo',
  templateUrl: './archivo.component.html',
  styleUrls: ['./archivo.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class ArchivoComponent {
  @Input() pozoId!: number;

  archivoSeleccionado: File | null = null;
  categoria: string = '';
  descripcion: string = '';
  mensaje: string = '';
  subiendo: boolean = false;
  mostrarFormulario = false;
  constructor(private archivoService: ArchivoService) {}

  onFileChange(event: any): void {
    this.archivoSeleccionado = event.target.files[0] || null;
  }

  subir(): void {
  if (!this.archivoSeleccionado || !this.pozoId || !this.categoria.trim()) {
    this.mensaje = 'Faltan datos obligatorios';
    return;
  }

  this.subiendo = true;

  this.archivoService.subirArchivo(this.archivoSeleccionado).subscribe({
    next: (respuesta) => {
      if (!respuesta?.ruta) {
        this.mensaje = 'Respuesta inválida del servidor al subir archivo';
        this.subiendo = false;
        return;
      }

      const archivoMetadata: Archivo = {
        nombre_archivo: this.archivoSeleccionado!.name,
        tipo_archivo: this.archivoSeleccionado!.type,
        ruta_archivo: respuesta.ruta,
        categoria: this.categoria,
        descripcion: this.descripcion
      };

      this.archivoService.crearArchivo(archivoMetadata).subscribe({
        next: (archivoCreado) => {
          this.archivoService.relacionarArchivo({
            archivo_id: archivoCreado.id!,
            pozo_id: this.pozoId
          }).subscribe({
            next: () => {
              this.mensaje = 'Archivo subido y relacionado con éxito';
              this.resetForm();
            },
            error: () => {
              this.mensaje = 'Error al relacionar archivo';
              this.subiendo = false;
            }
          });
        },
        error: () => {
          this.mensaje = 'Error al guardar metadatos';
          this.subiendo = false;
        }
      });
    },
    error: () => {
      this.mensaje = 'Error al subir el archivo';
      this.subiendo = false;
    }
  });
}
resetForm(): void {
  this.archivoSeleccionado = null;
  this.categoria = '';
  this.descripcion = '';
  this.subiendo = false;
  // Limpia el input del archivo
  const input = document.querySelector<HTMLInputElement>('input[type="file"]');
  if (input) input.value = '';
}
}
