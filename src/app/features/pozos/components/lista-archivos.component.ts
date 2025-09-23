// lista-archivos.component.ts
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchivoService } from '../../../services/archivo.service';
import { ArchivoExtPipe } from '../../../pipes/archivo-ext.pipe';
import { PreviewModalComponent } from '../../../shared/preview-modal/preview-modal.component';
import { environment } from '../../../../environments/environment.prod';
import { ArchivoRelacion } from '../../../models/archivo-relacion.model';

@Component({
  standalone: true,
  selector: 'app-lista-archivos',
  templateUrl: './lista-archivos.component.html',
  styleUrls: ['./lista-archivos.component.scss'],
  imports: [CommonModule, ArchivoExtPipe, PreviewModalComponent]
})
export class ListaArchivosComponent implements OnInit {

  @ViewChild(PreviewModalComponent) modalPreview!: PreviewModalComponent;
  @Input() pozoId!: number;

  cargando = true;
  archivos: ArchivoRelacion[] = [];

  constructor(private archivoService: ArchivoService) {}

  ngOnInit(): void {
    if (this.pozoId) this.cargarLista();
  }

  private cargarLista(): void {
    this.cargando = true;
    this.archivoService.obtenerArchivosRelacionados(this.pozoId).subscribe({
      next: (data) => { this.archivos = data; this.cargando = false; },
      error: () => { this.archivos = []; this.cargando = false; }
    });
  }

  verArchivo(ruta: string): void {
    const partes = ruta.split('/');
    const carpeta = partes[1];
    const archivo = partes[2];
    const url = `${environment.apiBase}/archivos/ver-archivo/${carpeta}/${archivo}`;

    const extension = archivo.split('.').pop()?.toLowerCase();
    const tipo = ['jpg', 'jpeg', 'png', 'gif'].includes(extension || '') ? 'imagen' : 'pdf';
    this.modalPreview.abrir(url, tipo as 'imagen' | 'pdf');
  }

 eliminar(archivo: ArchivoRelacion): void {
  if (!archivo.relacion_id || !archivo.archivo_id) {
    console.error('Faltan IDs para eliminar', { archivo });
    alert('No se encontró la relación o el archivo para borrar.');
    return;
  }

  if (!confirm(`¿Eliminar la relación y el archivo "${archivo.nombre_archivo}"?`)) return;

  archivo._borrando = true;

  this.archivoService
    .eliminarRelacionYArchivo(Number(archivo.relacion_id), Number(archivo.archivo_id))
    .subscribe({
      next: () => this.cargarLista(), // si ya tienes este método, refresca por pozoId
      error: (e) => { console.error(e); alert('No se pudo eliminar.'); archivo._borrando = false; }
    });
}
}
