import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PozoService } from '../../../services/pozo.service';
import { Pozo } from '../../../models/pozo.model';
import { Router, RouterModule } from '@angular/router'; // 👈 IMPORTANTE

@Component({
  standalone: true,
  selector: 'app-pozos-page',
  imports: [CommonModule, RouterModule], // 👈 IMPORTANTE
  templateUrl: './pozos-page.component.html',
  styleUrls: ['./pozos-page.component.scss']
})
export class PozosPageComponent implements OnInit {
  pozos: Pozo[] = [];

  constructor(
    private pozoService: PozoService,
    private router: Router // 👈 NECESARIO para logout
  ) {}

  ngOnInit(): void {
    this.pozoService.getPozos().subscribe({
      next: (data) => this.pozos = data,
      error: (err) => console.error('Error al cargar pozos', err)
    });
  }

  logout(): void {
    localStorage.removeItem('token');        // 🔐 Borra el token
    this.router.navigate(['/login']);        // 🔁 Redirige al login
  }
}
