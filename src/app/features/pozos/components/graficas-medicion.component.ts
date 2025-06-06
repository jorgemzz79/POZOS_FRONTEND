import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { MedicionService } from '../../../services/medicion.service';
import { Medicion } from '../../../models/medicion.model';
import { firstValueFrom } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-graficas-medicion',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #grafica></canvas>`,
})
export class GraficasMedicionComponent implements AfterViewInit {
  @ViewChild('grafica') grafica!: ElementRef<HTMLCanvasElement>;
  @Input() pozoId!: number;

  constructor(private medicionService: MedicionService) {}

  async ngAfterViewInit() {
    if (!this.pozoId) return;

    const mediciones: Medicion[] = await firstValueFrom(
      this.medicionService.getMedicionesPorPozo(this.pozoId)
    );

    const labels = mediciones.map(m => new Date(m.fecha).toLocaleDateString());
    const valores = mediciones.map(m => m.valor);

    new Chart(this.grafica.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Medición',
          data: valores,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          x: {
            display: true,
            title: { display: true, text: 'Fecha' }
          },
          y: {
            display: true,
            title: { display: true, text: 'Valor' }
          }
        }
      }
    });
  }
}
