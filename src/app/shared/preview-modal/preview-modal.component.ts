import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../../app/pipes/safe-url.pipe'; // Asegúrate que este pipe esté definido correctamente

@Component({
  selector: 'app-preview-modal',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './preview-modal.component.html',
  styleUrls: ['./preview-modal.component.scss']
})
export class PreviewModalComponent {
  @Input() archivoUrl: string = '';
  @Input() tipo: 'imagen' | 'pdf' = 'imagen';
  visible: boolean = false;

  abrir(url: string, tipo: 'imagen' | 'pdf') {
    this.archivoUrl = url;
    this.tipo = tipo;
    this.visible = true;
    console.log('📁 Preview:', url, tipo);
  }

  cerrar() {
    this.visible = false;
    this.archivoUrl = '';
  }

  esImagen(): boolean {
    return this.tipo === 'imagen';
  }
}
