import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'archivoExt',
  standalone: true
})
export class ArchivoExtPipe implements PipeTransform {
  transform(tipo: string): string {
    if (!tipo) return '📁';

    if (tipo.includes('pdf')) return '📄';
    if (tipo.includes('image')) return '🖼️';
    if (tipo.includes('word')) return '📘';
    if (tipo.includes('excel') || tipo.includes('spreadsheet')) return '📊';
    if (tipo.includes('zip') || tipo.includes('rar')) return '🗜️';
    if (tipo.includes('text')) return '📃';

    return '📁'; // ícono por defecto
  }
}
