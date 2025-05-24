import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PozoService } from '../../../services/pozo.service';
import { Pozo } from '../../../models/pozo.model';
import { RouterModule } from '@angular/router'; // 👈 IMPORTANTE

@Component({
  standalone: true,
  selector: 'app-pozos-page',
    imports: [CommonModule, RouterModule], // 👈 AGREGA RouterModule AQUÍ
  templateUrl: './pozos-page.component.html',
  styleUrls: ['./pozos-page.component.scss']
})
export class PozosPageComponent implements OnInit {
  pozos: Pozo[] = [];

  constructor(private pozoService: PozoService) {}

  ngOnInit(): void {
    this.pozoService.getPozos().subscribe({
      next: (data) => this.pozos = data,
      error: (err) => console.error('Error al cargar pozos', err)
    });
  }
}
