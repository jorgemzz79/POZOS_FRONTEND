import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PozoService } from '../../../services/pozo.service';
import { Pozo } from '../../../models/pozo.model';
import { MotorComponent } from '../components/motor.component';
import { TransformadorComponent } from '../components/transformador.component';


@Component({
  standalone: true,
  selector: 'app-pozo-detalle',
  templateUrl: './pozo-detalle.component.html',
  styleUrls: ['./pozo-detalle.component.scss'],
  imports: [CommonModule, RouterModule, MotorComponent, TransformadorComponent ],

})
export class PozoDetalleComponent implements OnInit {
  pozo!: Pozo;
  cargando = true;
  mostrarMotor = false;  // o true si quieres que se abra por defecto
  mostrarTransformador = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pozoService: PozoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.pozoService.getPozoPorId(id).subscribe({
        next: (data) => {
          this.pozo = data;
          this.cargando = false;
        },
        error: () => {
          alert('Pozo no encontrado');
          this.router.navigate(['/pozos']);
        }
      });
    }
  }

  eliminarPozo(): void {
    if (confirm('¿Estás seguro de eliminar este pozo?')) {
      this.pozoService.eliminarPozo(this.pozo.id).subscribe(() => {
        alert('Pozo eliminado');
        this.router.navigate(['/pozos']);
      });
    }
  }
}
