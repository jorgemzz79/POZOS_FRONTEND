import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchivoService } from '../../../services/archivo.service';
import { Archivo } from '../../../models/archivo.model';
import { ArchivoExtPipe } from '../../../pipes/archivo-ext.pipe';
import { ViewChild } from '@angular/core';
import { PreviewModalComponent } from '../../../shared/preview-modal/preview-modal.component';


@Component({
  
  standalone: true,
  selector: 'app-lista-archivos',
  templateUrl: './lista-archivos.component.html',
  styleUrls: ['./lista-archivos.component.scss'],
  imports: [
    CommonModule,
    ArchivoExtPipe, // Asegura que esté declarado en el @Component para que funcione
    PreviewModalComponent // 👈 lo agregas aquí
  ]
})
export class ListaArchivosComponent implements OnInit {

  @ViewChild(PreviewModalComponent) modalPreview!: PreviewModalComponent;
  @Input() pozoId!: number;
  archivos: Archivo[] = [];
  cargando: boolean = true;

  constructor(private archivoService: ArchivoService) {}

  ngOnInit(): void {
    if (this.pozoId) {
      this.archivoService.obtenerArchivosRelacionados(this.pozoId).subscribe({
        next: (data) => {
          this.archivos = data;
          this.cargando = false;
        },
        error: () => {
          this.cargando = false;
          this.archivos = [];
        }
      });
    }
  }

verArchivo(ruta: string): void {
  const partes = ruta.split('/');
  const carpeta = partes[1];
  const archivo = partes[2];
  const url = `http://172.16.3.115:8000/archivos/ver-archivo/${carpeta}/${archivo}`;

  const extension = archivo.split('.').pop()?.toLowerCase();
  const tipo = ['jpg', 'jpeg', 'png', 'gif'].includes(extension || '') ? 'imagen' : 'pdf';

  this.modalPreview.abrir(url, tipo as 'imagen' | 'pdf');
}

}
