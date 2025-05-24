import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PozoService } from '../../../services/pozo.service';
import { Pozo } from '../../../models/pozo.model';

@Component({
  standalone: true,
  selector: 'app-pozo-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './pozo-form.component.html',
  styleUrls: ['./pozo-form.component.scss']
})
export class PozoFormComponent implements OnInit {
  form!: FormGroup;
  editando = false;
  pozoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pozoService: PozoService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre_pozo: ['', Validators.required],
      comunidad: [''],
      fecha_perforacion: [''],
      domicilio: [''],
      latitud: [0],
      longitud: [0],
      altitud: [0],
      profundidad: [0],
      gasto_actual_id: [0],
      diametro_ademe: [''],
      longitud_ademe_ciego: [''],
      longitud_ademe_ranurado: [''],
      tren_descarga: [''],
      concesion: ['']
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editando = true;
      this.pozoId = +idParam;
      this.pozoService.getPozoPorId(this.pozoId).subscribe((data) => {
        this.form.patchValue(data);
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) return;

    const datos = this.form.value as Pozo;

    if (this.editando && this.pozoId !== null) {
      this.pozoService.actualizarPozo(this.pozoId, datos).subscribe(() => {
        alert('Pozo actualizado');
        this.router.navigate(['/pozos']);
      });
    } else {
      this.pozoService.crearPozo(datos).subscribe(() => {
        alert('Pozo creado');
        this.router.navigate(['/pozos']);
      });
    }
  }
}
